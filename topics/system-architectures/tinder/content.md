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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #fe3c72;">

### 1. "Why pre-compute recommendation stacks instead of computing on-demand?"

**What They're Probing**: Understanding of latency vs. freshness trade-offs, caching strategies, and user experience optimization.

**Strong Answer**:
> "Pre-computing reduces API latency from ~500ms to ~50ms for the swipe experience. Users swipe fast - they expect instant card loads. We compute stacks during off-peak hours or when users update preferences, storing top 500 candidates in Redis. The trade-off is freshness - a user who just joined won't appear immediately. We mitigate this by recomputing stacks every 1-4 hours for active users and invalidating on significant events like preference changes or location updates."

**When Simpler Works**:
For < 50K users per region, on-demand computation with good geo-indexing (PostGIS or Redis Geo) is perfectly acceptable. The latency difference (200ms vs 50ms) is imperceptible at this scale, and you avoid the complexity of background jobs and cache invalidation.

---

### 2. "How do you prevent showing someone a user already swiped on?"

**What They're Probing**: Understanding of space-efficient data structures, trade-offs between accuracy and performance.

**Strong Answer**:
> "At scale, storing every swipe relationship in a database and querying it becomes prohibitive - a user with 10K swipes would require a massive NOT IN clause. We use Bloom filters in Redis - they give O(1) lookup with ~1% false positive rate (showing someone already swiped, which we catch client-side) but no false negatives. For right-swipes specifically, we maintain a sorted set for match checking. The Bloom filter uses ~10KB per user for 10K swipes vs. 80KB+ for explicit storage."

**When Simpler Works**:
For < 10K total users, just use a simple `NOT IN (SELECT target_id FROM swipes WHERE user_id = ?)` query. PostgreSQL handles this fine with proper indexing. Bloom filters add operational complexity that's not justified until you're processing millions of swipes.

---

### 3. "Why ELO scoring instead of just random matching within preferences?"

**What They're Probing**: Understanding of matching quality, engagement metrics, and business value of recommendations.

**Strong Answer**:
> "Random matching leads to poor engagement - highly desirable users get overwhelmed with likes they won't reciprocate, while others rarely get matches. ELO creates 'leagues' - users are shown to others with similar desirability scores, dramatically increasing mutual match probability. When a high-ELO user swipes right on you, your score increases. This also incentivizes good behavior - complete profiles, quality photos. The business impact is 3-5x higher match rates, which directly correlates with retention."

**When Simpler Works**:
Bumble started with simple random matching within radius. For niche dating apps (< 100K users), random with recency bias (show recently active users first) works well. ML-based scoring only becomes valuable when you have enough data to train meaningful models - typically 1M+ swipes.

---

### 4. "How do you handle the race condition when two users swipe right simultaneously?"

**What They're Probing**: Distributed systems knowledge, consistency guarantees, practical problem-solving.

**Strong Answer**:
> "Without coordination, both likes get recorded but neither detects the match. We use deterministic locking - create a lock key using sorted user IDs (`match:{min_id}:{max_id}`) so both requests compete for the same lock. Inside the lock, we check-then-create atomically. Alternative: use WATCH/MULTI in Redis for optimistic locking, or accept eventual consistency - a background job reconciles unmatched mutual likes every few minutes. At Tinder scale, they likely use a dedicated matching service with single-writer per user-pair guarantee."

**When Simpler Works**:
For apps with < 100K daily swipes, a simple background job that runs every minute to find mutual likes works perfectly. The probability of two users swiping at the exact same millisecond is low, and a 60-second delay in match notification is acceptable for most use cases.

---

### 5. "How do you efficiently find users within a geographic radius?"

**What They're Probing**: Geo-spatial indexing knowledge, trade-offs between different approaches.

**Strong Answer**:
> "Three main approaches: (1) PostGIS with R-tree indexes - excellent for complex geo queries and small-medium scale. (2) Geohashing - convert lat/lng to string prefixes, query by prefix for approximate bounding box, then filter. Works great with key-value stores. (3) S2 Geometry (Google) or H3 (Uber) - hierarchical cell-based indexing with better precision at poles. At Tinder scale, we'd use a specialized geo index like Elasticsearch or Redis Geo for hot data, with pre-computed regional sharding - users in NYC only query the NYC shard."

**When Simpler Works**:
For < 10K users per city, PostGIS with `ST_DWithin` is more than sufficient. A single query like `SELECT * FROM users WHERE ST_DWithin(location, user_location, 50000)` returns users within 50km in milliseconds. No geohashing, no specialized indexes needed.

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

| Problem | Technology Choice | Why This Over Alternatives | When to Reconsider |
|---------|-------------------|---------------------------|-------------------|
| **Geo Queries** | PostGIS / Redis Geo | Native spatial indexing, mature, well-documented | > 1M location updates/hour: Consider Tile38 or custom sharding |
| **Swipe Storage** | DynamoDB / Cassandra | High write throughput, horizontal scaling | < 1M daily swipes: PostgreSQL is fine |
| **Already-Swiped Check** | Bloom Filter (Redis) | O(1) lookup, 10x space savings | < 10K users: Simple SQL NOT IN clause |
| **Recommendations** | Elasticsearch + ML | Full-text search + scoring, faceted filtering | < 50K users: PostGIS with ORDER BY scoring |
| **Match Detection** | Redis Sorted Sets | Fast mutual-like check, atomic operations | < 100K matches/day: PostgreSQL triggers |
| **Chat Messages** | Cassandra / ScyllaDB | Write-optimized, time-series friendly | < 10M messages/month: PostgreSQL JSONB |
| **Push Notifications** | FCM + APNS | Industry standard, reliable delivery | Always use these - no simpler alternative |
| **Photo Storage** | S3 + CloudFront CDN | Scalable, global distribution, cheap | Cloudflare R2 for cost savings at scale |
| **Real-time Comms** | WebSocket + Redis Pub/Sub | Bi-directional, low latency | < 10K concurrent: Long polling works |

### Database Selection Guide

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        CHOOSE YOUR DATABASE                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  User Profiles & Preferences                                                  │
│  └─→ PostgreSQL (ACID, complex queries, PostGIS for location)               │
│                                                                               │
│  Swipe History (Write-Heavy)                                                  │
│  └─→ < 10M swipes: PostgreSQL with partitioning                              │
│  └─→ > 10M swipes: Cassandra/DynamoDB (append-only, TTL support)             │
│                                                                               │
│  Chat Messages                                                                │
│  └─→ < 100M messages: PostgreSQL with partitioning by conversation_id        │
│  └─→ > 100M messages: Cassandra (time-series optimized, wide rows)           │
│                                                                               │
│  Real-time State (Online status, typing indicators)                          │
│  └─→ Always Redis (TTL, pub/sub, ephemeral data)                             │
│                                                                               │
│  Recommendation Cache                                                         │
│  └─→ Redis (fast reads, TTL, list operations)                                │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$200/Month Dating App" Architecture

For a niche dating app (professionals, specific communities, regional focus) with < 10K users:

```python
# This is ALL you need - single PostgreSQL + PostGIS instance

class SimpleDatingApp:
    """
    Stack: PostgreSQL + PostGIS + Redis (optional) + S3
    Cost: ~$200/month (managed Postgres + small Redis + S3)
    Handles: 10K users, 100K swipes/day easily
    """

    def get_recommendations(self, user_id, limit=20):
        """No ML, no pre-computation, no Elasticsearch. Just SQL."""
        return self.db.query("""
            SELECT u.*,
                   ST_Distance(u.location, me.location) / 1000 as distance_km,
                   CASE
                       WHEN u.last_active > NOW() - INTERVAL '1 hour' THEN 100
                       WHEN u.last_active > NOW() - INTERVAL '1 day' THEN 50
                       ELSE 0
                   END as recency_score
            FROM users u
            CROSS JOIN users me
            WHERE me.id = %s
              AND u.id != %s
              AND u.gender = me.looking_for
              AND u.looking_for = me.gender
              AND u.age BETWEEN me.age_min AND me.age_max
              AND me.age BETWEEN u.age_min AND u.age_max
              AND ST_DWithin(u.location, me.location, me.radius_meters)
              AND u.id NOT IN (SELECT target_id FROM swipes WHERE user_id = %s)
            ORDER BY recency_score DESC, distance_km ASC
            LIMIT %s
        """, user_id, user_id, user_id, limit)

    def swipe(self, user_id, target_id, direction):
        """Simple transactional match detection - no race conditions."""
        with self.db.transaction():
            self.db.insert('swipes', {
                'user_id': user_id,
                'target_id': target_id,
                'direction': direction
            })

            if direction == 'right':
                # Check for mutual like in same transaction
                mutual = self.db.query_one("""
                    SELECT 1 FROM swipes
                    WHERE user_id = %s AND target_id = %s AND direction = 'right'
                """, target_id, user_id)

                if mutual:
                    match = self.db.insert('matches', {
                        'user_a': min(user_id, target_id),
                        'user_b': max(user_id, target_id)
                    })
                    return {'matched': True, 'match_id': match.id}

        return {'matched': False}
```

### When You DON'T Need These Technologies

| Over-Engineering | Reality Check |
|------------------|---------------|
| **Geohashing / S2 Cells** | PostGIS `ST_DWithin` handles 10K users in < 50ms. Geohashing adds complexity without benefit until 100K+ users per region. |
| **Bloom Filters** | `NOT IN (subquery)` is fine until you have users with 50K+ swipes. Index on `(user_id, target_id)` makes this fast. |
| **Cassandra for Swipes** | PostgreSQL with monthly partitions handles 100M swipes easily. Cassandra operational overhead isn't worth it until 1B+ swipes. |
| **ML Recommendation Engine** | Recency + distance + mutual preference filters give 80% of the value. ML matters when you have millions of users and swipe data to learn from. |
| **Pre-computed Stacks** | With proper indexing, on-demand queries return in 100-200ms. Pre-computation is premature optimization until latency becomes a measured problem. |
| **Microservices** | A well-structured monolith handles 100K users. Split when team size (> 10 engineers) or specific scaling needs require it. |
| **Kafka Event Streaming** | PostgreSQL LISTEN/NOTIFY or simple background jobs handle async work until you need cross-service event streaming. |

### Real-World "Simple" Examples

<div style="background: #161b22; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 3px solid #58a6ff;">

**Bumble's Early Days**: Started with simple random matching within radius. No ELO, no ML. Added sophistication after proving product-market fit.

**Hinge**: Initially just Facebook friends-of-friends with basic filters. Recommendation engine came much later.

**Coffee Meets Bagel**: One curated match per day - no complex discovery algorithm needed. Simple business logic, simple tech.

**The League**: Launched with a waitlist and manual curation. "AI-powered matching" came after they had data to train on.

</div>

### Decision Flowchart: Do You Need It?

```
                          ┌─────────────────────────────┐
                          │ How many users in a city?   │
                          └─────────────┬───────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
              < 10K users         10K - 100K          > 100K users
                    │                   │                   │
                    ▼                   ▼                   ▼
         ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
         │ PostgreSQL +     │  │ PostgreSQL +     │  │ Specialized Geo  │
         │ PostGIS is fine  │  │ Redis caching    │  │ Index + Sharding │
         │                  │  │ Consider Bloom   │  │ ML Ranking       │
         │ Simple SQL       │  │ Filters for      │  │ Pre-computed     │
         │ queries work     │  │ swipe checks     │  │ stacks           │
         └──────────────────┘  └──────────────────┘  └──────────────────┘
```

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Critical Trade-offs in Dating App Design

| Trade-off | Option A | Option B | Mitigation Strategy |
|-----------|----------|----------|---------------------|
| **Freshness vs. Latency** | Real-time queries (fresh, slow) | Pre-computed stacks (fast, stale) | Hybrid: pre-compute + real-time top-up. Invalidate on major events (new user nearby, preference change). |
| **Accuracy vs. Speed** | Exact distance calculation | Geohash bounding box | Filter by geohash first, then exact distance for final set. Accept 5% over-fetch. |
| **Space vs. Certainty** | Store all swipes explicitly | Bloom filter (probabilistic) | Bloom for "already swiped" check, explicit storage for right-swipes (need for matching). |
| **Consistency vs. Availability** | Lock on every swipe (safe, slow) | Optimistic updates (fast, race risk) | Lock only for match creation, not swipe recording. Background reconciliation for edge cases. |
| **Privacy vs. Features** | Fuzzy location only | Precise location for better matches | Store precise, display fuzzy. Never expose coordinates via API. |

### Scaling Challenges & Solutions

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     SCALING CHALLENGE MATRIX                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CHALLENGE: Hot Spots (Everyone in NYC on Friday night)                    │
│  ├─ Problem: Single geo shard overloaded                                   │
│  ├─ Solution: Sub-city sharding (Manhattan, Brooklyn separate)             │
│  └─ Fallback: Queue requests, serve from cache, degrade gracefully         │
│                                                                             │
│  CHALLENGE: Celebrity Problem (1 user gets 100K likes/day)                 │
│  ├─ Problem: Their profile causes hot partition                            │
│  ├─ Solution: Replicate hot profiles, rate limit incoming likes            │
│  └─ Fallback: Verified accounts with special handling                      │
│                                                                             │
│  CHALLENGE: Global Users Traveling                                          │
│  ├─ Problem: User in Tokyo was in NYC yesterday, data in wrong region      │
│  ├─ Solution: Profile data global, discovery regional, async migration     │
│  └─ Fallback: Accept 1-hour delay for cross-region recommendations         │
│                                                                             │
│  CHALLENGE: Swipe Velocity (Power users: 1000+ swipes/day)                 │
│  ├─ Problem: Exhaust pre-computed stack quickly                            │
│  ├─ Solution: Larger stacks for active users, real-time fallback           │
│  └─ Fallback: "No more people nearby" message, suggest expanding radius    │
│                                                                             │
│  CHALLENGE: New User Cold Start                                             │
│  ├─ Problem: No swipe history = no ELO = bad recommendations               │
│  ├─ Solution: Boost new users, use profile completeness as proxy           │
│  └─ Fallback: Show to diverse audience, learn quickly from responses       │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### Failure Mode Analysis

| Component Failure | User Impact | Mitigation | Recovery |
|-------------------|-------------|------------|----------|
| **Redis (Stack Cache) Down** | Slow recommendations (~500ms vs 50ms) | Fall back to on-demand queries | Auto-heal, repopulate cache gradually |
| **Geo Index Down** | No new recommendations | Serve from last cached stack | Read replica failover, cache extends |
| **Match Service Down** | Swipes work, matches delayed | Queue swipes in Kafka, process later | Catch up on backlog, notify delayed matches |
| **Chat Service Down** | Can't message matches | Show "temporarily unavailable", queue messages | Deliver queued messages on recovery |
| **ML Ranking Down** | Less optimal recommendations | Fall back to recency + distance sorting | Graceful degradation, nobody notices |

### Cost Optimization Strategies

<div style="background: #161b22; border-radius: 8px; padding: 16px; margin: 16px 0;">

**Early Stage (< $5K/month)**:
- Single PostgreSQL instance with read replicas
- Minimal Redis (just for sessions and hot data)
- S3 + CloudFront for images
- Serverless functions for background jobs

**Growth Stage ($5K - $50K/month)**:
- Managed Elasticsearch for discovery
- Dedicated Redis cluster
- Consider Cassandra for swipes if PostgreSQL partitioning struggles
- CDN costs become significant - optimize image sizes

**Scale Stage (> $50K/month)**:
- Reserved instances everywhere (40% savings)
- Multi-region with regional data residency
- Custom ML infrastructure (SageMaker or self-hosted)
- Aggressive caching to reduce compute

</div>

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Matching Algorithm**: ELO-based scoring creates "leagues" that increase mutual match probability
2. **Geo Indexing**: PostGIS for simple, geohashing/S2 for scale, explain the trade-offs
3. **Swipe Storage**: Bloom filters for space efficiency, explicit storage for match-critical data
4. **Match Race Condition**: Deterministic locking with sorted user IDs
5. **Privacy**: Location fuzzing, never expose coordinates, GDPR compliance

### Common Follow-ups & Strong Answers

| Question | Key Points to Hit |
|----------|-------------------|
| "How do you prevent fake profiles?" | Photo verification (selfie matching), phone verification, ML-based behavior analysis, manual review queue for reported accounts |
| "How do you handle users traveling?" | Profile data is global, discovery is regional, async migration when location changes significantly, cache invalidation on major moves |
| "How do you implement Super Like?" | Special swipe type with notification, limited daily quota, increases visibility in target's stack, stored separately for analytics |
| "How do you implement Boost?" | Temporarily increase user's score multiplier, regional leaderboard for boosted users, time-boxed (30 min), monetization lever |
| "How do you handle message moderation?" | ML classification for harassment, user reporting, human review queue, progressive punishment (warning → shadowban → ban) |

### Red Flags (What NOT to Say)

<div style="background: rgba(248, 81, 73, 0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 8px;">

- "We'd use microservices from day one" - Shows lack of pragmatism
- "Just query all users and filter in memory" - Doesn't understand scale
- "Store exact GPS coordinates and display to users" - Privacy nightmare
- "Use a single global database for everything" - Ignores latency
- "Cassandra for everything because it scales" - Wrong tool for relational data
- "We don't need to handle race conditions, they're rare" - Red flag for distributed systems
- "Machine learning will solve the matching problem" - Hand-wavy, needs specifics
- "Just use Firebase" - Shows limited backend architecture knowledge

</div>

### Impressive Statements (What TO Say)

<div style="background: rgba(56, 139, 253, 0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 8px;">

- "For < 10K users per city, PostGIS with ST_DWithin is sufficient - no geohashing needed"
- "Bloom filters give us O(1) already-swiped checks with ~1% false positive rate, which is acceptable since we just filter client-side"
- "ELO scoring increases match rates 3-5x compared to random because it creates compatible leagues"
- "We use deterministic locking with sorted user IDs to prevent the simultaneous-swipe race condition"
- "Pre-computed stacks reduce P99 latency from 500ms to 50ms, but we trade off freshness - we mitigate with hourly recomputation for active users"
- "At early stage, I'd start with a monolith and PostgreSQL - Bumble started with simple random matching, sophistication came later"
- "Location fuzzing is critical - we store precise for matching but display rounded distances and add random offset"
- "The hot-user problem (celebrities) requires special handling - we replicate their profile data and rate-limit incoming likes"

</div>

### Architecture Evolution Narrative

When explaining your design, frame it as an evolution:

```
Phase 1: "Start simple - PostgreSQL + PostGIS + Redis. Handle 50K users easily."
    │
    ▼
Phase 2: "As we grow, add Elasticsearch for discovery, Bloom filters for swipes."
    │
    ▼
Phase 3: "At scale, pre-compute recommendation stacks, add ML ranking, shard by region."
```

This shows you understand pragmatic engineering and can match solutions to actual needs.

</div>
