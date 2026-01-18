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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border-left: 4px solid #f0883e;">

### Q1: Push vs Pull vs Hybrid - When do you use each?

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Strong Answer:**

| Model | When to Use | Real Example |
|-------|-------------|--------------|
| **Pull** | < 100K users, simple social graph | Early-stage startup, internal tools |
| **Push** | All users have < 1000 followers | Private communities, Slack-like apps |
| **Hybrid** | Mix of normal users + celebrities | Twitter, Facebook, Instagram |

```
Decision Tree:

Do users have highly uneven follower counts?
├── No (everyone ~similar) → PUSH is simpler
└── Yes (celebrities exist)
    └── What % are celebrities?
        ├── < 1% → Hybrid (push for most, pull for celebrities)
        └── > 10% → Consider pure PULL with aggressive caching
```

**When Simpler Works:** For a B2B SaaS with 50K users where everyone follows ~20 teammates, pure push with a simple Redis list is perfect. Don't over-engineer.

</div>

### Q2: Why not just query friends' posts directly with a JOIN?

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Strong Answer:**

**Actually, you CAN for small scale - and should!**

```sql
-- This is FINE for < 100K users with proper indexing
SELECT p.* FROM posts p
JOIN friendships f ON p.author_id = f.friend_id
WHERE f.user_id = :current_user
  AND p.created_at > NOW() - INTERVAL '7 days'
ORDER BY p.created_at DESC
LIMIT 50;
```

**When this breaks down:**
- User follows 500+ people
- Posts table > 100M rows
- 99th percentile latency matters (p99 > 500ms)
- Query load exceeds 10K QPS

**The real problem isn't the JOIN - it's:**
1. Ranking needs to consider 1000+ features (can't do in SQL)
2. Need sub-50ms response times
3. Can't index for every user's friend set

**Impressive nuance:** "I'd start with the JOIN approach, monitor p99 latency, and only add fanout when we see queries taking > 200ms or user complaints about staleness."

</div>

### Q3: How do you handle celebrities with millions of followers?

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Strong Answer:**

```
The Celebrity Problem:

Taylor Swift posts → 200M followers
Push model: Write to 200M feed caches = DISASTER
- 200M writes take minutes
- Massive storage: 200M × 8 bytes = 1.6GB per post
- She posts 5x/day = 8GB/day just for her

Solution: DON'T fan out celebrities
```

**Hybrid Approach:**

```python
CELEBRITY_THRESHOLD = 10_000  # Followers

def on_new_post(post, author):
    follower_count = get_follower_count(author.id)

    if follower_count < CELEBRITY_THRESHOLD:
        # Normal user: push to all followers' feeds
        fan_out_to_followers(post, author.id)
    else:
        # Celebrity: just index the post, pull on read
        index_celebrity_post(post)
        # Optionally: push to "super engaged" followers only
        push_to_top_fans(post, author.id, limit=1000)

def get_feed(user_id):
    # Get pre-computed feed (from push)
    feed = get_cached_feed(user_id)

    # Merge in celebrity posts (pull)
    celebrities_followed = get_celebrities_user_follows(user_id)
    celebrity_posts = fetch_recent_posts(celebrities_followed)

    # Merge, rank, return
    return rank(feed + celebrity_posts)
```

**Key insight:** The threshold isn't fixed - Twitter uses ~1000, Instagram uses ~10000. Tune based on your write capacity.

</div>

### Q4: How do you keep feeds fresh without killing your database?

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Strong Answer:**

**Reality check:** Most feeds don't need real-time. 30-second staleness is fine.

```
Feed Freshness Tiers:

┌─────────────────────────────────────────────────────────┐
│ Tier 1: Truly Real-time (< 1 second)                    │
│ - User's OWN posts (read-your-writes)                   │
│ - Direct messages                                        │
│ - @ mentions                                             │
│ └── Solution: Write-through + WebSocket push            │
├─────────────────────────────────────────────────────────┤
│ Tier 2: Near Real-time (< 30 seconds)                   │
│ - Close friends' posts                                   │
│ - Breaking news                                          │
│ └── Solution: Short TTL cache (30s) + background refresh│
├─────────────────────────────────────────────────────────┤
│ Tier 3: Eventually Consistent (< 5 minutes)             │
│ - General feed content                                   │
│ - Suggested posts                                        │
│ └── Solution: Pre-computed feeds, refresh on scroll     │
└─────────────────────────────────────────────────────────┘
```

**Impressive statement:** "Twitter's home timeline isn't truly real-time - there's typically a 30-second to 2-minute delay, and users don't notice. We should define our freshness SLA before over-engineering."

</div>

### Q5: How do you handle a post going viral?

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Strong Answer:**

```
Viral Post Problem:

Regular post: 100 views/hour → no problem
Viral post: 10M views/hour → thundering herd

What breaks:
1. Post record hot-spotted in DB
2. Engagement counters overwhelmed
3. Cache invalidation storms
```

**Solutions:**

```python
# 1. Counter sharding for engagement
class ViralPostCounter:
    SHARD_COUNT = 100

    def increment_likes(self, post_id):
        # Distribute writes across shards
        shard = hash(f"{post_id}:{random.randint(0, self.SHARD_COUNT)}")
        redis.incr(f"likes:{post_id}:shard:{shard}")

    def get_likes(self, post_id):
        # Aggregate shards (can cache this)
        total = 0
        for i in range(self.SHARD_COUNT):
            total += redis.get(f"likes:{post_id}:shard:{i}") or 0
        return total

# 2. Content caching with probabilistic refresh
def get_viral_post(post_id):
    cached = cache.get(post_id)
    if cached:
        # Probabilistic early refresh (avoid thundering herd)
        ttl_remaining = cache.ttl(post_id)
        if ttl_remaining < 10 and random.random() < 0.1:
            refresh_cache_async(post_id)  # Background refresh
        return cached

    # Cache miss - fetch and cache
    post = db.get(post_id)
    cache.setex(post_id, ttl=60, value=post)
    return post
```

**Key insight:** Viral content should be detected and promoted to a "hot content" cache tier with longer TTLs and edge caching.

</div>

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

| Decision | Options | Choose When | Avoid When |
|----------|---------|-------------|------------|
| **Graph Storage** | PostgreSQL + JOINs | < 1M edges, simple queries | Need 2+ hop traversals at scale |
| | Redis Adjacency Lists | Read-heavy, < 100M edges | Complex graph algorithms |
| | Neo4j / Neptune | Complex traversals, recommendations | Simple friend lists only |
| | TAO-like (custom) | Facebook scale, read-heavy | < 100M users |
| **Feed Storage** | PostgreSQL | < 100K users, simple feeds | High-write fanout |
| | Redis Lists | Push model, fast reads | Need complex queries |
| | Cassandra | High write throughput, time-series | Complex aggregations |
| **Ranking** | SQL ORDER BY | Chronological or single-factor | ML-based ranking |
| | Application-layer scoring | < 10K candidates, simple rules | Need real-time ML |
| | Feature store + ML model | Personalization matters, scale | < 1M users |
| **Real-time** | Polling (30s) | Simple, < 10K concurrent users | Latency-sensitive |
| | Long polling | Medium scale, simpler than WS | Need true push |
| | WebSockets | True real-time, bidirectional | Stateless requirement |
| | SSE | One-way push, simpler than WS | Need bidirectional |

</div>

### Why Not Alternatives?

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Why Not Pure PostgreSQL at Scale?</h5>

- JOINs across billions of rows = seconds, not milliseconds
- Can't shard easily when data is interconnected
- Indexing every possible query pattern is impractical

**But PostgreSQL IS fine for:** < 1M users, can get you to Series B
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Why Not Pure Redis?</h5>

- Memory costs at scale (1TB+ of feed data)
- No complex queries (ranking, filtering)
- Persistence/durability concerns

**But Redis IS fine for:** Hot feed cache, real-time counters
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Why Not GraphQL Subscriptions?</h5>

- Complexity of subscription management at scale
- Hard to cache effectively
- Connection state management overhead

**But GraphQL IS fine for:** Flexible client queries, developer experience
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Why Not Elasticsearch for Feeds?</h5>

- Near-real-time indexing (1-second delay)
- Complex write patterns for updates
- Overkill for simple chronological feeds

**But ES IS fine for:** Search within posts, content discovery
</div>

</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$200/Month Social Feed" Architecture

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 20px; margin: 16px 0;">

**For startups with < 100K users, this is often all you need:**

```
Simple Architecture ($200/month on Railway/Render):

┌─────────────────────────────────────────────────────────┐
│                                                          │
│   Single PostgreSQL Instance (with proper indexes)      │
│                                                          │
│   ┌─────────────┐     ┌─────────────┐                   │
│   │   users     │     │   posts     │                   │
│   │   (50K)     │────▶│   (500K)    │                   │
│   └─────────────┘     └─────────────┘                   │
│          │                   │                           │
│          ▼                   │                           │
│   ┌─────────────┐           │                           │
│   │ friendships │◀──────────┘                           │
│   │   (200K)    │                                        │
│   └─────────────┘                                        │
│                                                          │
│   + Redis for session cache ($20/month)                 │
│   + Simple Node.js/Rails backend                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

```sql
-- This query handles 90% of social feed use cases
-- With proper indexing, executes in < 50ms for most users

CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_friendships_user ON friendships(user_id);

SELECT p.id, p.content, p.created_at, u.name, u.avatar
FROM posts p
JOIN friendships f ON p.author_id = f.friend_id
JOIN users u ON p.author_id = u.id
WHERE f.user_id = :current_user
  AND p.created_at > NOW() - INTERVAL '7 days'
ORDER BY p.created_at DESC
LIMIT 20;

-- Add OFFSET for pagination (or keyset pagination for better perf)
```

**This scales to:**
- 100K users
- 500K posts
- 1M friendships
- 1000 QPS with read replicas

</div>

### When You DON'T Need Fanout

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Scenario | Why Fanout Is Overkill | Better Approach |
|----------|------------------------|-----------------|
| **< 100K users** | JOINs are fast enough | Pull with caching |
| **All users follow < 100 people** | Pull query is cheap | Cached pull |
| **Chronological feed only** | No complex ranking needed | Simple SQL + cache |
| **Users check feed < 1x/day** | Freshness doesn't matter | Compute on demand |
| **Internal company tool** | 1000 users max | Basic PostgreSQL |
| **Content is ephemeral (24h)** | Limited post volume | Time-partitioned queries |

</div>

### When You DON'T Need Real-time

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Hot take: Most "real-time" requirements are fake.**

```
Reality Check:

Twitter: 30 seconds - 2 minutes delay ✓ (users don't complain)
LinkedIn: Minutes of delay ✓ (it's not a chat app)
Facebook: Seconds for close friends, minutes for others ✓

What actually needs real-time:
- Chat/messaging (< 1 second)
- Collaborative editing (< 100ms)
- Gaming (< 50ms)

What doesn't:
- News feeds (30 seconds is fine)
- Notifications (5 seconds is fine)
- Activity streams (minutes are fine)
```

**Simple polling works:**

```javascript
// This is fine for 90% of social apps
setInterval(async () => {
  const newPostCount = await fetch('/api/feed/new-count');
  if (newPostCount > 0) {
    showBanner(`${newPostCount} new posts`);
  }
}, 30000); // Every 30 seconds
```

**Cost comparison:**
- WebSocket infrastructure: Complex, stateful, ~$500/month for 10K concurrent
- Polling every 30s: Stateless, cacheable, ~$50/month for same scale

</div>

### Complexity vs Scale Cheat Sheet

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
Users          Architecture                    Monthly Cost
─────────────────────────────────────────────────────────────
< 10K          PostgreSQL + Redis cache         $50-100
               (Just use Supabase/Firebase)

10K - 100K     PostgreSQL + Read replicas       $200-500
               + Redis + Simple ranking

100K - 1M      Dedicated cache layer            $1,000-5,000
               + Background fanout
               + Basic ML ranking

1M - 10M       Hybrid push/pull                 $10,000-50,000
               + Kafka for events
               + ML ranking pipeline

10M+           Full Facebook architecture       $100,000+
               + Custom everything
               (You'll need a team of 50+)
```

**The Instagram insight:** Instagram served 100M users with a team of 13 engineers using PostgreSQL + Redis + memcached. Don't over-architect.

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs

<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 16px 0;">

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 16px 0;">Trade-off 1: Write Amplification vs Read Latency</h4>

| Approach | Write Cost | Read Cost | Storage |
|----------|------------|-----------|---------|
| Full Fanout | O(followers) per post | O(1) | High |
| No Fanout | O(1) per post | O(following) | Low |
| Hybrid | O(non-celebrity followers) | O(celebrities followed) | Medium |

**Mitigation:**
- Async fanout with Kafka (don't block writes)
- Batch fanout writes (reduce IOPS)
- Time-bounded fanout (only to active users)

```python
# Only fanout to users who logged in last 7 days
active_followers = get_followers_active_since(author_id, days=7)
for follower_batch in batch(active_followers, size=1000):
    kafka.produce('fanout_jobs', {
        'post_id': post.id,
        'followers': follower_batch
    })
```
</div>

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 16px 0;">Trade-off 2: Freshness vs Cost</h4>

| Freshness | Approach | Cost Multiplier |
|-----------|----------|-----------------|
| Real-time (< 1s) | WebSocket + push | 10x |
| Near real-time (< 30s) | Short-lived cache | 3x |
| Eventual (< 5min) | Long-lived cache | 1x |

**Mitigation:**
- Tiered freshness (close friends = fresh, others = cached)
- Client-side optimistic updates
- "New posts" indicator instead of auto-refresh

```python
# Tiered cache TTL based on relationship
def get_cache_ttl(viewer_id, author_id):
    relationship = get_relationship_strength(viewer_id, author_id)
    if relationship > 0.8:  # Close friend
        return 30  # seconds
    elif relationship > 0.3:  # Regular friend
        return 300  # 5 minutes
    else:  # Acquaintance
        return 900  # 15 minutes
```
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 16px 0;">Trade-off 3: Personalization vs Simplicity</h4>

| Ranking | Complexity | Benefit | When to Use |
|---------|------------|---------|-------------|
| Chronological | Low | Predictable | Simple apps, time-sensitive content |
| Rule-based scoring | Medium | Some personalization | MVP, 10K-1M users |
| ML-based ranking | High | High engagement | 1M+ users, ad-supported |

**Mitigation for ML complexity:**
- Start with simple features (recency, engagement count)
- Use pre-trained embeddings
- A/B test before full rollout
- Fallback to chronological if ML fails

```python
# Progressive ranking complexity
def rank_feed(user_id, posts):
    try:
        # Try ML ranking
        return ml_ranker.rank(user_id, posts, timeout_ms=50)
    except TimeoutError:
        # Fallback to simple scoring
        return simple_rank(posts)
    except Exception:
        # Ultimate fallback: chronological
        return sorted(posts, key=lambda p: p.created_at, reverse=True)
```
</div>

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 16px 0;">Trade-off 4: Consistency vs Availability</h4>

| Scenario | Priority | Approach |
|----------|----------|----------|
| User's own posts | Consistency | Read-your-writes |
| Friends' posts | Availability | Eventual consistency OK |
| Engagement counts | Availability | Approximate counts fine |
| Deleted content | Consistency | Synchronous propagation |

**Mitigation:**
- Session-level consistency for own content
- Async replication for others' content
- Tombstone markers for deletes (propagate within 1 min)

```python
def get_feed(user_id, session_token):
    # Get cached feed
    feed = cache.get(f"feed:{user_id}")

    # Merge user's recent posts (read-your-writes)
    user_recent = get_user_recent_posts(user_id, session_token)

    # Combine and re-rank
    merged = merge_feeds(feed, user_recent)
    return remove_deleted(merged)  # Filter tombstones
```
</div>

</div>

### Risk Mitigation Matrix

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

| Risk | Impact | Mitigation | Monitoring |
|------|--------|------------|------------|
| Cache stampede | High (DB overload) | Locking + probabilistic refresh | Cache hit rate, DB CPU |
| Celebrity post storm | High (write amplification) | Threshold-based hybrid | Fanout queue depth |
| Stale feed | Medium (user complaints) | Tiered TTL + manual refresh | Freshness p99 |
| Ranking model failure | Medium (bad experience) | Fallback to chronological | Ranking latency, errors |
| Hot partition | High (availability) | Consistent hashing + rebalancing | Partition size variance |
| Viral content | Medium (hot spot) | Content-aware caching | Request concentration |

</div>

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Key Discussion Framework

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Start simple, evolve with scale:**

1. **Clarify scale** - "How many users? Posts per day? Read:write ratio?"
2. **Start with simplest solution** - "For 50K users, PostgreSQL with proper indexes handles this easily"
3. **Identify bottlenecks** - "As we scale, the JOIN becomes expensive at 1M+ users"
4. **Introduce complexity only when needed** - "At that point, we'd introduce fanout for non-celebrities"
5. **Discuss trade-offs explicitly** - "This trades write amplification for read latency"

</div>

### Impressive Statements to Make

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Topic | Impressive Statement |
|-------|---------------------|
| **Scale awareness** | "Instagram served 100M users with 13 engineers on PostgreSQL - we shouldn't over-architect for 100K users" |
| **Push vs Pull** | "The threshold for hybrid isn't fixed - Twitter uses ~1000 followers, Instagram ~10000. We'd tune based on our write capacity" |
| **Real-time** | "Twitter's timeline has 30-second to 2-minute delays and users don't notice. We should define our freshness SLA before adding WebSockets" |
| **Ranking** | "I'd start with engagement count × recency as a simple score, then add ML when we have enough data to train on" |
| **Fanout** | "For < 100K users, just query friends' posts with a JOIN - no fanout needed. The complexity isn't worth it yet" |
| **Caching** | "The 99.8% cache hit rate TAO achieves means most users never hit the database - that's the real scaling insight" |
| **Trade-offs** | "Every optimization has a cost. Fanout gives O(1) reads but O(n) writes. We need to know our read:write ratio first" |

</div>

### Red Flags to Avoid

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Red Flag | Why It's Bad | What to Say Instead |
|----------|--------------|---------------------|
| "We need Kafka from day one" | Over-engineering for unknown scale | "We'd add Kafka when our event volume exceeds what a simple queue can handle" |
| "Push to all followers always" | Ignores celebrity problem | "We'd use hybrid - push for < 10K followers, pull for celebrities" |
| "Real-time updates are essential" | Usually not true | "Most feeds tolerate 30-second delays. What's our actual freshness requirement?" |
| "We need a graph database" | Often overkill | "PostgreSQL handles friend-of-friend queries fine until 10M+ edges" |
| "ML ranking from the start" | No data to train on | "We'd start with rule-based scoring, add ML when we have engagement data" |
| "WebSockets for everything" | Complex + expensive | "Polling every 30s is simpler and works for most social feeds" |
| Jumping to distributed systems | Shows inexperience | "Let me start with a simple architecture that works at 100K users, then evolve" |
| Not mentioning caching | Misses key optimization | "Caching is critical - most feed reads should never hit the database" |

</div>

### Common Follow-up Questions & Strong Answers

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Q: How do you handle users with 1M+ followers?**
> "Don't fan out their posts. Mark them as 'celebrity' based on a follower threshold (say, 10K). Their posts get pulled at read time and cached aggressively. The cache key would be user-agnostic so all readers share the same cache entry."

**Q: How do you ensure feed freshness?**
> "Define tiers: user's own posts = immediate (read-your-writes), close friends = 30 seconds (short TTL), others = 5 minutes (standard TTL). Most users won't notice anything beyond this."

**Q: How do you inject ads into the feed?**
> "Ads are just another content source in the aggregation layer. We'd fetch top-ranked ads separately, then interleave them (e.g., every 5th position) during final assembly. Ads have their own ranking based on targeting and bid price."

**Q: How do you handle viral content?**
> "Detect viral posts by engagement velocity (likes per minute). Promote them to a special 'hot content' cache with longer TTL and edge caching. Use sharded counters for engagement to avoid hot-spotting the database."

**Q: What happens when a user unfollows someone?**
> "For push model: we don't immediately remove their posts from the cached feed (expensive). Instead, we filter them out at read time. The cache naturally expires, and new feed generations won't include them."

**Q: How do you handle post deletions?**
> "Write a tombstone marker, invalidate the author's cache, and let fanout propagate the deletion. For immediate consistency, filter tombstones at read time. Full propagation might take 1-2 minutes."

</div>

### The 5-Minute Answer Structure

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
Minute 1: Clarify & Scope
├── "What scale are we designing for?"
├── "What's the read:write ratio?"
└── "What's the freshness requirement?"

Minute 2: Simple Architecture
├── PostgreSQL for posts + users + friendships
├── Redis for feed cache
└── "This handles 100K users easily"

Minute 3: Scaling Bottlenecks
├── "At 1M users, the friend JOIN gets slow"
├── "At 10M, we need fanout for writes"
└── "Celebrities need special handling"

Minute 4: Evolved Architecture
├── Hybrid push/pull model
├── Tiered caching
└── Background ranking pipeline

Minute 5: Trade-offs & Alternatives
├── "Write amplification vs read latency"
├── "Consistency vs availability choices"
└── "Why not [alternative]? Because..."
```

</div>

</div>
