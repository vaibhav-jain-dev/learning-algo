# Design Tinder

## Problem Statement

Design a location-based dating app that matches users based on preferences, location, and swipe behavior.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #fe3c72;">

### Core Requirements
- **Profile Management**: Photos, bio, preferences
- **Discovery**: Show potential matches based on location/preferences
- **Swipe Mechanics**: Left (pass) / Right (like) / Super Like
- **Matching**: Mutual likes create matches
- **Chat**: Real-time messaging between matches
- **Boost/Premium**: Paid features

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">TINDER SYSTEM ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │   Mobile Apps   │
                              │  iOS │ Android  │
                              └────────┬────────┘
                                       │
                                       │ REST + WebSocket
                                       ▼
                    ┌──────────────────────────────────┐
                    │        API GATEWAY               │
                    │   (Auth, Rate Limit)             │
                    └──────────────────┬───────────────┘
                                       │
    ┌──────────────────────────────────┼──────────────────────────────────┐
    │                                  │                                  │
    ▼                                  ▼                                  ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│   PROFILE   │              │   DISCOVERY     │              │    MATCHING     │
│   SERVICE   │              │    SERVICE      │              │    SERVICE      │
│             │              │                 │              │                 │
│ - Photos    │──────────────│ - Recommend     │──────────────│ - Like/Pass     │
│ - Bio       │              │ - Filter        │              │ - Match check   │
│ - Prefs     │              │ - Location      │              │ - Notify        │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                              ▼                               │
       │                     ┌─────────────────┐                      │
       │                     │   CHAT SERVICE  │                      │
       │                     │                 │                      │
       │                     │ - Messages      │                      │
       │                     │ - Read receipts │                      │
       │                     │ - Media         │                      │
       │                     └────────┬────────┘                      │
       │                              │                               │
       └──────────────────────────────┼───────────────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │    KAFKA      │
                              └───────────────┘
```

</div>

---

## Discovery Algorithm

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">RECOMMENDATION ENGINE</h4>

```
┌─────────────────────────────────────────────────────────────┐
│              TINDER RECOMMENDATION PIPELINE                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: CANDIDATE GENERATION                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Filter by:                                               ││
│  │ - Location (within radius preference)                   ││
│  │ - Age range (user preference)                           ││
│  │ - Gender preference                                     ││
│  │ - Not already swiped                                    ││
│  │ - Not blocked/reported                                  ││
│  │                                                          ││
│  │ Result: ~1000-10000 candidates                          ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  Step 2: SCORING                                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ For each candidate, calculate score:                    ││
│  │                                                          ││
│  │ score = w1 * elo_compatibility                          ││
│  │       + w2 * recency_boost                              ││
│  │       + w3 * activity_level                             ││
│  │       + w4 * mutual_interests                           ││
│  │       + w5 * photo_quality_score                        ││
│  │       + w6 * profile_completeness                       ││
│  │                                                          ││
│  │ ELO System:                                              ││
│  │ - Each user has a hidden "desirability" score           ││
│  │ - Updated based on who swipes right on them             ││
│  │ - Similar ELO users shown to each other                 ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  Step 3: RANKING & DIVERSITY                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - Shuffle top candidates slightly (avoid stale stack)  ││
│  │ - Boost users who liked you first (increase match rate) ││
│  │ - Add variety (don't show all similar profiles)        ││
│  │ - Premium users get slight boost                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 10,000 - 100,000
- **Swipes**: 500K - 5M/day
- **Matches**: 10K - 100K/day
- **Budget**: $3,000 - $15,000/month

### Monolithic Architecture

```python
class DiscoveryService:
    def get_recommendations(self, user_id, limit=100):
        user = self.db.get_user(user_id)

        # Get user's location (from Redis or recent update)
        location = self.redis.get(f'location:{user_id}')

        # Find candidates within radius using PostGIS
        candidates = self.db.query("""
            SELECT u.*, ST_Distance(u.location, %s) as distance
            FROM users u
            WHERE u.id != %s
            AND u.gender = %s
            AND u.looking_for = %s
            AND u.age BETWEEN %s AND %s
            AND ST_DWithin(u.location, %s, %s)
            AND u.id NOT IN (
                SELECT target_id FROM swipes WHERE user_id = %s
            )
            ORDER BY u.last_active DESC
            LIMIT %s
        """, location, user_id, user.looking_for, user.gender,
             user.age_min, user.age_max, location, user.radius * 1000,
             user_id, limit * 2)

        # Simple scoring
        scored = []
        for candidate in candidates:
            score = self.calculate_score(user, candidate)
            scored.append((candidate, score))

        # Sort by score and return
        scored.sort(key=lambda x: x[1], reverse=True)
        return [c for c, s in scored[:limit]]

    def process_swipe(self, user_id, target_id, direction):
        # Record swipe
        self.db.insert('swipes', {
            'user_id': user_id,
            'target_id': target_id,
            'direction': direction,
            'created_at': now()
        })

        # Check for match if it's a right swipe
        if direction == 'right':
            reverse_swipe = self.db.query_one("""
                SELECT * FROM swipes
                WHERE user_id = %s AND target_id = %s AND direction = 'right'
            """, target_id, user_id)

            if reverse_swipe:
                # It's a match!
                match = self.create_match(user_id, target_id)
                self.notify_users(user_id, target_id, match)
                return {'matched': True, 'match_id': match.id}

        return {'matched': False}
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    API Gateway     │
                         └─────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
 ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
 │   PROFILE     │        │   DISCOVERY   │        │   MATCHING    │
 │   SERVICE     │        │   SERVICE     │        │   SERVICE     │
 │               │        │               │        │               │
 │ PostgreSQL    │        │ Elasticsearch │        │    Redis      │
 │ + S3 (photos) │        │ + Redis Geo   │        │ + PostgreSQL  │
 └───────────────┘        └───────────────┘        └───────────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                           ┌───────▼───────┐
                           │    Kafka      │
                           └───────┬───────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
                   ▼               ▼               ▼
           ┌───────────┐   ┌───────────┐   ┌───────────┐
           │   CHAT    │   │    ML     │   │  NOTIF.   │
           │  SERVICE  │   │  SERVICE  │   │  SERVICE  │
           │           │   │           │   │           │
           │ Cassandra │   │  PyTorch  │   │   FCM/    │
           │ + Redis   │   │           │   │   APNS    │
           └───────────┘   └───────────┘   └───────────┘
```

</div>

### Swipe Storage Optimization

```python
# Bloom filter for "already swiped" check
class SwipeTracker:
    def __init__(self, redis):
        self.redis = redis

    def has_swiped(self, user_id, target_id):
        """
        Use Bloom filter for fast "already swiped" check.
        False positive rate: ~1% (acceptable - just filter extra)
        """
        return self.redis.bf_exists(f'swipes:{user_id}', target_id)

    def record_swipe(self, user_id, target_id, direction):
        pipe = self.redis.pipeline()

        # Add to Bloom filter
        pipe.bf_add(f'swipes:{user_id}', target_id)

        # Store in sorted set for right swipes (for match checking)
        if direction == 'right':
            pipe.zadd(f'likes:{user_id}', {target_id: time.time()})
            # Keep only last 10000 likes
            pipe.zremrangebyrank(f'likes:{user_id}', 0, -10001)

        pipe.execute()

        # Also write to Kafka for permanent storage
        self.kafka.produce('swipes', {
            'user_id': user_id,
            'target_id': target_id,
            'direction': direction,
            'timestamp': time.time()
        })
```

### Real-time Match Notification

```
Match Detection Flow:

User A swipes right on User B
           │
           ▼
┌─────────────────────────────────────────┐
│  Check if B already liked A             │
│                                          │
│  Redis: ZSCORE likes:{B} {A}            │
│                                          │
│  If exists → IT'S A MATCH!              │
└─────────────────────────────────────────┘
           │
           ▼ (if match)
┌─────────────────────────────────────────┐
│  1. Create match record                 │
│  2. Create chat conversation            │
│  3. Publish to Kafka: match_events      │
│  4. Notification service sends push     │
│     to both users                       │
└─────────────────────────────────────────┘
```

</div>
</div>

---

## Phase 3: Tinder Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 75M+ monthly active
- **Swipes**: 2B+/day
- **Matches**: 50M+/day
- **Messages**: 500M+/day

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         TINDER GLOBAL ARCHITECTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    EDGE LAYER                             │ │
    │  │  CDN for profile photos                                   │ │
    │  │  Edge caching for discovery results                       │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │              REGIONAL CLUSTERS                            │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  US-WEST    │  │  EU-WEST    │  │    AP-SOUTH     │   │ │
    │  │  │             │  │             │  │                 │   │ │
    │  │  │ Discovery   │  │ Discovery   │  │  Discovery      │   │ │
    │  │  │ Match       │  │ Match       │  │  Match          │   │ │
    │  │  │ Chat        │  │ Chat        │  │  Chat           │   │ │
    │  │  │             │  │             │  │                 │   │ │
    │  │  │ Cassandra   │  │ Cassandra   │  │  Cassandra      │   │ │
    │  │  │ (regional)  │  │ (regional)  │  │  (regional)     │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  │                                                           │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    GLOBAL LAYER                           │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │   User      │  │  Payment    │  │    Analytics    │   │ │
    │  │  │  Profiles   │  │  Service    │  │    (Spark)      │   │ │
    │  │  │  (Global)   │  │  (Stripe)   │  │                 │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Pre-computed Stacks

```python
class StackPrecomputer:
    """
    Pre-compute recommendation stacks for active users.
    Reduces latency from ~500ms to ~50ms.
    """

    def compute_stack(self, user_id):
        user = self.get_user(user_id)

        # Get candidates using geo index
        candidates = self.geo_index.query(
            lat=user.lat,
            lng=user.lng,
            radius=user.radius,
            gender=user.looking_for,
            age_range=(user.age_min, user.age_max),
            limit=10000
        )

        # Filter already swiped (Bloom filter)
        candidates = [c for c in candidates
                      if not self.swipe_tracker.has_swiped(user_id, c.id)]

        # Score and rank
        scored = self.ml_ranker.score(user, candidates)

        # Store pre-computed stack
        stack = [c.id for c, score in sorted(scored, reverse=True)[:500]]
        self.redis.setex(f'stack:{user_id}', ttl=3600, value=json.dumps(stack))

        return stack

    def get_stack(self, user_id, offset=0, limit=10):
        """Get pre-computed stack with pagination."""
        stack = self.redis.get(f'stack:{user_id}')

        if not stack:
            # Compute on-demand if not cached
            stack = self.compute_stack(user_id)

        return stack[offset:offset + limit]
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Geo Index** | ElastiCache + OpenSearch | Redis Geo, Tile38 | OpenSearch: Better queries |
| **Swipes** | DynamoDB | Cassandra | Cassandra: Better write throughput |
| **Photos** | S3 + CloudFront | Cloudflare R2 | S3: Ecosystem |
| **Chat** | DynamoDB + WS | Cassandra + WS | Custom: More control |
| **ML** | SageMaker | Vertex AI, Custom | SageMaker: Managed |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Match Consistency

```
Problem: Both users swipe right simultaneously

     User A                           User B
        │                                │
        │ Swipe right on B               │ Swipe right on A
        │                                │
        ▼                                ▼
    ┌────────┐                      ┌────────┐
    │Check B │                      │Check A │
    │liked A?│                      │liked B?│
    └────┬───┘                      └────┬───┘
         │                               │
         │ No (not yet in DB)            │ No (not yet in DB)
         │                               │
         ▼                               ▼
    ┌────────┐                      ┌────────┐
    │Store   │                      │Store   │
    │like    │                      │like    │
    └────────┘                      └────────┘

Result: Both likes stored, but no match created!

Solution: Use distributed lock or deterministic ordering

if user_a.id < user_b.id:
    lock_key = f"match:{user_a.id}:{user_b.id}"
else:
    lock_key = f"match:{user_b.id}:{user_a.id}"

with redis.lock(lock_key):
    # Check and create match atomically
```

### 2. Location Privacy

```
┌─────────────────────────────────────────────────────────────┐
│               LOCATION FUZZING                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Never expose exact coordinates!                            │
│                                                              │
│  Display distance as:                                        │
│  - "< 1 mile away"                                          │
│  - "2 miles away" (rounded)                                 │
│  - "5+ miles away"                                          │
│                                                              │
│  Storage:                                                    │
│  - Store precise location (for matching)                    │
│  - Display fuzzy location (for UI)                          │
│  - Add random offset (100-500m) for display                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Matching algorithm**: ELO-based vs ML-based
2. **Geo indexing**: How to find nearby users efficiently
3. **Swipe storage**: Bloom filters for space efficiency
4. **Match race condition**: Handling simultaneous swipes
5. **Privacy**: Location fuzzing, data protection

### Common Follow-ups

- How do you prevent fake profiles?
- How do you handle users traveling?
- How do you implement Super Like / Boost?

</div>
