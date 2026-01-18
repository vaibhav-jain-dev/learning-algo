# Design Facebook News Feed

## Problem Statement

Design a personalized news feed system that shows relevant posts from friends, pages, and groups in real-time.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #1877f2;">

### Core Requirements
- **Feed Generation**: Personalized content ranking
- **Real-time Updates**: New posts appear without refresh
- **Social Graph**: Friends, followers, pages, groups
- **Content Types**: Text, images, videos, links, stories
- **Engagement**: Likes, comments, shares, reactions
- **Notifications**: Activity updates

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">NEWS FEED ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │     CDN         │
                              │  (Static/Media) │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
             ┌───────────┐      ┌───────────┐      ┌───────────┐
             │  Web App  │      │Mobile App │      │Messenger  │
             └─────┬─────┘      └─────┬─────┘      └───────────┘
                   │                  │
                   └────────┬─────────┘
                            ▼
             ┌──────────────────────────────┐
             │        API Gateway           │
             └──────────────┬───────────────┘
                            │
    ┌───────────────────────┼───────────────────────┐
    │                       │                       │
    ▼                       ▼                       ▼
┌─────────┐          ┌───────────┐          ┌───────────┐
│  Post   │          │   Feed    │          │  Social   │
│ Service │─────────▶│  Service  │◀─────────│   Graph   │
└────┬────┘          └─────┬─────┘          └───────────┘
     │                     │
     │              ┌──────┴──────┐
     │              ▼             ▼
     │      ┌───────────┐  ┌───────────┐
     │      │  Ranking  │  │  Cache    │
     │      │  Service  │  │  Layer    │
     │      └───────────┘  └───────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│              KAFKA EVENT BUS            │
└─────────────────────────────────────────┘
```

</div>

---

## Feed Generation Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">PUSH vs PULL vs HYBRID</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">

<!-- Push -->
<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 12px 0; text-align: center;">Push (Fan-out on Write)</h5>

```
User A posts
     │
     ▼
Fan out to all
A's followers
     │
┌────┼────┐
▼    ▼    ▼
B's  C's  D's
Feed Feed Feed
```

<p style="color: #7ee787; font-size: 12px;">Pros: Fast reads</p>
<p style="color: #f85149; font-size: 12px;">Cons: Slow writes, storage heavy</p>
</div>

<!-- Pull -->
<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0; text-align: center;">Pull (Fan-in on Read)</h5>

```
User B requests feed
        │
        ▼
  Fetch posts from
  all B follows
        │
   ┌────┼────┐
   ▼    ▼    ▼
  A's  C's  D's
 Posts Posts Posts
        │
        ▼
    Merge & Rank
```

<p style="color: #7ee787; font-size: 12px;">Pros: Less storage</p>
<p style="color: #f85149; font-size: 12px;">Cons: Slow reads</p>
</div>

<!-- Hybrid -->
<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 12px 0; text-align: center;">Hybrid (Facebook's Approach)</h5>

```
Celebrity posts → Pull
Normal user → Push

┌─────────────────────┐
│ User has < 1000     │
│ followers → PUSH    │
├─────────────────────┤
│ User has > 1000     │
│ followers → PULL    │
│ on read for them    │
└─────────────────────┘
```

<p style="color: #7ee787; font-size: 12px;">Best of both worlds</p>
</div>

</div>
</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Monolithic (Pull-based)

```python
class FeedService:
    def get_feed(self, user_id, limit=20):
        # Get friends
        friends = db.query("""
            SELECT friend_id FROM friendships
            WHERE user_id = %s
        """, user_id)

        # Get posts from friends (last 7 days)
        posts = db.query("""
            SELECT * FROM posts
            WHERE author_id IN %s
            AND created_at > NOW() - INTERVAL '7 days'
            ORDER BY created_at DESC
            LIMIT %s
        """, tuple(friends), limit * 2)

        # Simple chronological ranking
        return posts[:limit]
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Feed Ranking Algorithm

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
EdgeRank Algorithm (Simplified):

Score = Σ (Affinity × Weight × Decay)

┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  Affinity: How close is user to content creator?            │
│  ├── Interaction frequency                                   │
│  ├── Profile visits                                          │
│  ├── Tags in photos                                          │
│  └── Mutual friends                                          │
│                                                              │
│  Weight: Content type importance                             │
│  ├── Video: 1.5x                                             │
│  ├── Photo: 1.2x                                             │
│  ├── Status: 1.0x                                            │
│  └── Link: 0.8x                                              │
│                                                              │
│  Decay: Time since posted                                    │
│  └── 1 / (1 + time_hours^1.5)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

```python
class RankingService:
    def rank_posts(self, user_id, posts):
        user_profile = self.get_user_profile(user_id)

        for post in posts:
            # Calculate affinity score
            affinity = self.calculate_affinity(user_id, post.author_id)

            # Content type weight
            weight = self.content_weights.get(post.type, 1.0)

            # Time decay
            hours_old = (now() - post.created_at).total_seconds() / 3600
            decay = 1 / (1 + hours_old ** 1.5)

            # Engagement boost
            engagement = log10(1 + post.likes + post.comments * 2 + post.shares * 3)

            # Final score
            post.score = affinity * weight * decay * engagement

        return sorted(posts, key=lambda p: p.score, reverse=True)
```

</div>

### Pre-computed Feed Cache

```python
# Feed pre-computation job (runs every few minutes)
class FeedPrecomputer:
    def precompute_feeds(self, user_batch):
        for user_id in user_batch:
            # Get candidate posts
            candidates = self.get_candidates(user_id)

            # Rank posts
            ranked = self.ranking_service.rank(user_id, candidates)

            # Store in cache
            redis.setex(
                f"feed:{user_id}",
                ttl=300,  # 5 minutes
                value=json.dumps([p.id for p in ranked[:500]])
            )
```

</div>
</div>

---

## Phase 3: High Scale (Facebook Scale)

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Architecture at Scale

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    FACEBOOK FEED ARCHITECTURE
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │  ┌─────────────────────────────────────────────────┐   │
    │  │              AGGREGATOR LAYER                    │   │
    │  │                                                  │   │
    │  │   Collects posts from multiple sources:         │   │
    │  │   - Friends' posts                              │   │
    │  │   - Pages you follow                            │   │
    │  │   - Groups you're in                            │   │
    │  │   - Ads                                         │   │
    │  │   - Suggested content                           │   │
    │  └─────────────────────────────────────────────────┘   │
    │                          │                              │
    │                          ▼                              │
    │  ┌─────────────────────────────────────────────────┐   │
    │  │              RANKING LAYER (ML)                  │   │
    │  │                                                  │   │
    │  │   Neural network considers:                      │   │
    │  │   - 10,000+ features per post                   │   │
    │  │   - User embedding                              │   │
    │  │   - Post embedding                              │   │
    │  │   - Context (time, device, location)            │   │
    │  │   - Historical engagement                       │   │
    │  └─────────────────────────────────────────────────┘   │
    │                          │                              │
    │                          ▼                              │
    │  ┌─────────────────────────────────────────────────┐   │
    │  │              FILTERING LAYER                     │   │
    │  │                                                  │   │
    │  │   - Duplicate removal                           │   │
    │  │   - Policy violations                           │   │
    │  │   - User preferences (hide, snooze)             │   │
    │  │   - Seen content                                │   │
    │  └─────────────────────────────────────────────────┘   │
    │                          │                              │
    │                          ▼                              │
    │  ┌─────────────────────────────────────────────────┐   │
    │  │              CACHE LAYER                         │   │
    │  │                                                  │   │
    │  │   - User's pre-computed feed (TAO)              │   │
    │  │   - Hot content cache                           │   │
    │  │   - Session state                               │   │
    │  └─────────────────────────────────────────────────┘   │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
```

</div>

### Real-time Updates

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
New Post Event Flow:

    User A posts
         │
         ▼
    ┌─────────────┐
    │ Post Service│
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │   Kafka     │ ──────┬──────────────────┐
    │  new_posts  │       │                  │
    └─────────────┘       │                  │
           │              │                  │
           ▼              ▼                  ▼
    ┌─────────────┐ ┌─────────────┐  ┌─────────────┐
    │ Feed Writer │ │  Notifier   │  │ Analytics   │
    │  Service    │ │  Service    │  │  Service    │
    └──────┬──────┘ └─────────────┘  └─────────────┘
           │
           ▼
    ┌─────────────────────────────────────┐
    │ For each online follower:            │
    │                                      │
    │  1. Check if within threshold        │
    │     (< 5000 followers)               │
    │                                      │
    │  2. Invalidate feed cache            │
    │                                      │
    │  3. Push WebSocket notification      │
    │     "New posts available"            │
    └─────────────────────────────────────┘
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Facebook Uses |
|-----------|-------------|-------------|---------------|
| **Social Graph** | Neptune | Neo4j, TigerGraph | TAO (custom) |
| **Feed Cache** | ElastiCache | Redis Cluster | Memcached (custom) |
| **Posts DB** | Aurora | Vitess, CockroachDB | MySQL (Vitess) |
| **ML Ranking** | SageMaker | TensorFlow Serving | FBLearner |
| **Real-time** | Kinesis | Kafka | Custom |
| **CDN** | CloudFront | Fastly | Custom CDN |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Social Graph Storage (TAO)

```
Facebook's TAO: Graph-aware caching layer

┌─────────────────────────────────────────┐
│              TAO Architecture            │
├─────────────────────────────────────────┤
│                                          │
│  Edges: (user_1, FRIEND, user_2)        │
│  Objects: (post_id, {title, content})   │
│                                          │
│  Cache Hierarchy:                        │
│  ┌─────────────┐                        │
│  │ Leader Cache│ ◀── Writes             │
│  └──────┬──────┘                        │
│         │ async replicate               │
│  ┌──────▼──────┐                        │
│  │Follower Cache│ ◀── Reads             │
│  └─────────────┘                        │
│                                          │
│  Benefits:                               │
│  - Read-after-write consistency         │
│  - < 1ms cache hits                     │
│  - 99.8% cache hit rate                 │
└─────────────────────────────────────────┘
```

### 2. Feed Consistency

```
Problem: User sees stale feed after posting

Solution: Read-your-writes consistency

┌─────────────────────────────────────────┐
│  When user creates post:                 │
│                                          │
│  1. Write to database                    │
│  2. Invalidate user's own feed cache    │
│  3. Return post with local timestamp    │
│                                          │
│  When user loads feed:                   │
│                                          │
│  1. Check for local pending posts       │
│  2. Merge with cached feed              │
│  3. Re-rank if needed                   │
└─────────────────────────────────────────┘
```

### 3. Thundering Herd Prevention

```python
# Cache stampede prevention
class FeedCache:
    def get_feed(self, user_id):
        cache_key = f"feed:{user_id}"
        lock_key = f"feed_lock:{user_id}"

        # Try cache
        cached = redis.get(cache_key)
        if cached:
            return json.loads(cached)

        # Acquire lock (prevent stampede)
        if redis.set(lock_key, "1", nx=True, ex=10):
            try:
                # Compute feed
                feed = self.compute_feed(user_id)
                redis.setex(cache_key, 300, json.dumps(feed))
                return feed
            finally:
                redis.delete(lock_key)
        else:
            # Wait for other request to populate cache
            time.sleep(0.1)
            return self.get_feed(user_id)  # Retry
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Push vs Pull trade-offs**: Discuss celebrity problem
2. **Ranking algorithm**: Multi-factor scoring
3. **Real-time updates**: WebSocket vs polling
4. **Graph traversal optimization**: Caching strategies
5. **Content diversity**: Avoid echo chambers

### Common Follow-ups

- How do you handle users with 1M+ friends?
- How do you ensure feed freshness?
- How do you inject ads into the feed?
- How do you handle viral content?

</div>
