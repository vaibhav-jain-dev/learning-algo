# Design The Reddit API

## Problem Statement

Design a social news aggregation and discussion platform like Reddit with subreddits, posts, comments, voting, and content moderation.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff4500;">

### Core Requirements
- **Subreddits**: Community creation and management
- **Posts**: Text, links, images, videos with voting
- **Comments**: Threaded discussions with voting
- **Voting System**: Upvotes/downvotes with karma
- **Feed Generation**: Home, popular, subreddit feeds
- **Moderation**: Content rules, spam detection, banning

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">REDDIT SYSTEM ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │    CloudFront   │
                              │      (CDN)      │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
             ┌───────────┐      ┌───────────┐      ┌───────────┐
             │  Web App  │      │Mobile API │      │   OAuth   │
             │  (Next.js)│      │  Gateway  │      │  Server   │
             └─────┬─────┘      └─────┬─────┘      └───────────┘
                   │                  │
                   └────────┬─────────┘
                            ▼
             ┌──────────────────────────────┐
             │        API Gateway           │
             │   (Rate Limiting, Auth)      │
             └──────────────┬───────────────┘
                            │
    ┌───────────────────────┼───────────────────────┐
    │                       │                       │
    ▼                       ▼                       ▼
┌─────────┐          ┌───────────┐          ┌───────────┐
│  Post   │          │  Comment  │          │   Vote    │
│ Service │          │  Service  │          │  Service  │
└────┬────┘          └─────┬─────┘          └─────┬─────┘
     │                     │                      │
     │                     │                      │
┌────┴────┐          ┌─────┴─────┐          ┌─────┴─────┐
│Subreddit│          │   User    │          │   Feed    │
│ Service │          │  Service  │          │  Service  │
└─────────┘          └───────────┘          └───────────┘
     │                     │                      │
     └─────────────────────┼──────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │PostgreSQL│ │  Redis   │ │   S3     │
        │ (Data)   │ │ (Cache)  │ │ (Media)  │
        └──────────┘ └──────────┘ └──────────┘
```

</div>

---

## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 10,000 - 100,000 monthly active
- **Posts**: 10,000 posts/day
- **Comments**: 50,000 comments/day
- **Budget**: $500 - $2,000/month

### Monolithic Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│                     REDDIT MONOLITH                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  MODULES                                 ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   ││
│  │  │Subreddits│ │  Posts   │ │ Comments │ │  Votes   │   ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   ││
│  │  │  Users   │ │  Feeds   │ │  Search  │ │   Mods   │   ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   ││
│  └─────────────────────────────────────────────────────────┘│
│                            │                                 │
│  ┌─────────────────────────┴───────────────────────────────┐│
│  │                    DATA ACCESS                           ││
│  └─────────────────────────────────────────────────────────┘│
└──────────────────────────────┬──────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    ┌─────────┐          ┌─────────┐          ┌─────────┐
    │PostgreSQL│          │  Redis  │          │   S3    │
    └─────────┘          └─────────┘          └─────────┘
```

</div>

#### Data Model

```sql
-- Core Tables
CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_by INT REFERENCES users(id),
    subscriber_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    subreddit_id INT REFERENCES subreddits(id),
    author_id INT REFERENCES users(id),
    title VARCHAR(300) NOT NULL,
    content TEXT,
    url VARCHAR(2000),
    post_type VARCHAR(20), -- text, link, image, video
    score INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id),
    parent_id INT REFERENCES comments(id), -- For threading
    author_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    score INT DEFAULT 0,
    depth INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE votes (
    user_id INT REFERENCES users(id),
    target_type VARCHAR(10), -- 'post' or 'comment'
    target_id INT,
    vote_type SMALLINT, -- 1 or -1
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, target_type, target_id)
);
```

#### Abstract Code

```python
class VotingService:
    def vote(self, user_id, target_type, target_id, vote_type):
        with transaction.atomic():
            # Get existing vote
            existing = Vote.objects.filter(
                user_id=user_id,
                target_type=target_type,
                target_id=target_id
            ).first()

            score_delta = vote_type
            if existing:
                if existing.vote_type == vote_type:
                    # Remove vote (toggle off)
                    existing.delete()
                    score_delta = -vote_type
                else:
                    # Change vote
                    score_delta = vote_type * 2
                    existing.vote_type = vote_type
                    existing.save()
            else:
                Vote.objects.create(
                    user_id=user_id,
                    target_type=target_type,
                    target_id=target_id,
                    vote_type=vote_type
                )

            # Update score
            if target_type == 'post':
                Post.objects.filter(id=target_id).update(
                    score=F('score') + score_delta
                )
            else:
                Comment.objects.filter(id=target_id).update(
                    score=F('score') + score_delta
                )

            # Update user karma (async in production)
            self.update_author_karma(target_type, target_id, score_delta)
```

</div>
</div>

---

## Phase 2: Medium User Phase

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 5M - 50M monthly active
- **Posts**: 500K posts/day
- **Votes**: 50M votes/day
- **Budget**: $50,000 - $200,000/month

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    ┌────────────────────┐
                    │    API Gateway     │
                    └─────────┬──────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    POST     │       │   COMMENT   │       │    VOTE     │
│   SERVICE   │       │   SERVICE   │       │   SERVICE   │
│             │       │             │       │             │
│  PostgreSQL │       │  PostgreSQL │       │   Redis     │
│  (sharded)  │       │  (sharded)  │       │ + Cassandra │
└──────┬──────┘       └──────┬──────┘       └──────┬──────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                     ┌───────▼───────┐
                     │    KAFKA      │
                     │  Event Bus    │
                     └───────┬───────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    FEED     │       │   SEARCH    │       │NOTIFICATION │
│   SERVICE   │       │   SERVICE   │       │   SERVICE   │
│             │       │             │       │             │
│   Redis +   │       │Elasticsearch│       │   Redis +   │
│   Cassandra │       │             │       │   Firebase  │
└─────────────┘       └─────────────┘       └─────────────┘
```

</div>

### Feed Generation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">FEED RANKING ALGORITHM</h4>

```
Hot Score Algorithm (Reddit-style):

score = log10(max(|ups - downs|, 1))

order = sign(ups - downs)

seconds = epoch_seconds(created_at) - 1134028003

hot_score = round(score + order * seconds / 45000, 7)

                    ┌─────────────────────────────────────┐
                    │         HOT SCORE FACTORS           │
                    ├─────────────────────────────────────┤
                    │  Vote Score: Higher = Better        │
                    │  Time Decay: Newer = Better         │
                    │  Controversy: Balanced = Featured   │
                    └─────────────────────────────────────┘
```

```python
# Feed generation with caching
class FeedService:
    def get_home_feed(self, user_id, page=1, limit=25):
        cache_key = f"feed:home:{user_id}:{page}"

        # Try cache first
        cached = redis.get(cache_key)
        if cached:
            return json.loads(cached)

        # Get user subscriptions
        subscriptions = self.get_subscriptions(user_id)

        # Fetch top posts from each subreddit
        posts = Post.objects.filter(
            subreddit_id__in=subscriptions,
            created_at__gte=now() - timedelta(days=7)
        ).order_by('-hot_score')[:limit * 3]  # Over-fetch

        # Apply personalization
        ranked_posts = self.personalize(user_id, posts)[:limit]

        # Cache result
        redis.setex(cache_key, 60, json.dumps(ranked_posts))

        return ranked_posts

    def personalize(self, user_id, posts):
        # Get user preferences from ML model
        user_vector = self.get_user_embedding(user_id)

        for post in posts:
            post_vector = self.get_post_embedding(post.id)
            post.relevance_score = cosine_similarity(user_vector, post_vector)

        return sorted(posts, key=lambda p: p.hot_score * p.relevance_score, reverse=True)
```

</div>

### Comment Threading

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
Comment Tree Structure:

Post: "What's your favorite programming language?"
│
├── Comment 1 (depth: 0, score: 150)
│   ├── Reply 1.1 (depth: 1, score: 45)
│   │   └── Reply 1.1.1 (depth: 2, score: 12)
│   └── Reply 1.2 (depth: 1, score: 30)
│
├── Comment 2 (depth: 0, score: 120)
│   └── Reply 2.1 (depth: 1, score: 25)
│
└── Comment 3 (depth: 0, score: 80)

Storage Strategy:
- Materialized Path: /1/1.1/1.1.1
- Allows efficient subtree queries
- Easy depth calculation
```

```python
# Efficient comment loading
class CommentService:
    def get_comments(self, post_id, sort='best', max_depth=10):
        # Load top-level comments
        root_comments = Comment.objects.filter(
            post_id=post_id,
            parent_id=None
        ).order_by(self.get_sort_key(sort))[:200]

        # Batch load all children up to max_depth
        all_ids = [c.id for c in root_comments]
        children = self.load_children_batch(all_ids, max_depth)

        # Build tree structure
        return self.build_tree(root_comments, children)

    def load_children_batch(self, parent_ids, max_depth):
        """Load children using recursive CTE"""
        query = """
        WITH RECURSIVE comment_tree AS (
            SELECT *, 1 as depth FROM comments WHERE parent_id = ANY(%s)
            UNION ALL
            SELECT c.*, ct.depth + 1
            FROM comments c
            JOIN comment_tree ct ON c.parent_id = ct.id
            WHERE ct.depth < %s
        )
        SELECT * FROM comment_tree ORDER BY depth, score DESC
        """
        return Comment.objects.raw(query, [parent_ids, max_depth])
```

</div>

</div>
</div>

---

## Phase 3: High User Base Phase

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 500M+ monthly active
- **Posts**: 10M posts/day
- **Votes**: 2B votes/day
- **Budget**: $5M+/month

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

```
                         GLOBAL REDDIT INFRASTRUCTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │                    ┌──────────────────┐                        │
    │                    │  Global Traffic  │                        │
    │                    │    Manager       │                        │
    │                    └────────┬─────────┘                        │
    │                             │                                  │
    │         ┌───────────────────┼───────────────────┐              │
    │         ▼                   ▼                   ▼              │
    │   ┌──────────┐        ┌──────────┐        ┌──────────┐        │
    │   │  US-EAST │        │  EU-WEST │        │  AP-EAST │        │
    │   │  Region  │        │  Region  │        │  Region  │        │
    │   │          │        │          │        │          │        │
    │   │┌────────┐│        │┌────────┐│        │┌────────┐│        │
    │   ││  EKS   ││        ││  EKS   ││        ││  EKS   ││        │
    │   ││Cluster ││        ││Cluster ││        ││Cluster ││        │
    │   │└────────┘│        │└────────┘│        │└────────┘│        │
    │   │          │        │          │        │          │        │
    │   │┌────────┐│        │┌────────┐│        │┌────────┐│        │
    │   ││Cassandra│◀──────▶││Cassandra│◀──────▶││Cassandra││        │
    │   ││ (Multi-││        ││ Replica ││        ││ Replica ││        │
    │   ││ Master)││        │└────────┘│        │└────────┘│        │
    │   │└────────┘│        │          │        │          │        │
    │   └──────────┘        └──────────┘        └──────────┘        │
    │                                                                │
    │   ┌────────────────────────────────────────────────────────┐  │
    │   │              GLOBAL SERVICES                            │  │
    │   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │  │
    │   │  │  Kafka   │  │   S3     │  │ Aurora   │  │ Redis  │  │  │
    │   │  │ (Global) │  │ (Global) │  │ Global   │  │ Global │  │  │
    │   │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │  │
    │   └────────────────────────────────────────────────────────┘  │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Vote Aggregation at Scale

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">HIGH-THROUGHPUT VOTING SYSTEM</h4>

```
Vote Flow (2B votes/day = 23K votes/second):

    ┌─────────────┐
    │   Client    │
    │  (Vote +1)  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ Vote Service│ ◀── Optimistic update to Redis
    │  (Stateless)│     (immediate response)
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ Kafka Topic │ ◀── votes.raw (partitioned by post_id)
    │  (Buffer)   │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  Vote       │ ◀── Micro-batch aggregation
    │  Aggregator │     (every 100ms)
    └──────┬──────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌─────────┐
│Cassandra│ │  Redis  │
│(Persist)│ │ (Cache) │
└─────────┘ └─────────┘

Benefits:
- Immediate feedback (optimistic)
- High throughput (batching)
- Eventual consistency (acceptable)
```

```go
// Vote aggregator (Kafka consumer)
type VoteAggregator struct {
    buffer    map[string]*VoteCount
    flushLock sync.Mutex
}

func (va *VoteAggregator) ProcessBatch(votes []Vote) {
    va.flushLock.Lock()
    defer va.flushLock.Unlock()

    // Aggregate votes in memory
    for _, vote := range votes {
        key := fmt.Sprintf("%s:%d", vote.TargetType, vote.TargetID)
        if va.buffer[key] == nil {
            va.buffer[key] = &VoteCount{}
        }
        va.buffer[key].Delta += vote.Value
    }
}

func (va *VoteAggregator) Flush() {
    va.flushLock.Lock()
    buffer := va.buffer
    va.buffer = make(map[string]*VoteCount)
    va.flushLock.Unlock()

    // Batch update to Cassandra
    batch := cassandra.NewBatch()
    for key, count := range buffer {
        batch.Query(
            "UPDATE scores SET score = score + ? WHERE id = ?",
            count.Delta, key,
        )
    }
    cassandra.ExecuteBatch(batch)

    // Update Redis cache
    pipe := redis.Pipeline()
    for key, count := range buffer {
        pipe.IncrBy(fmt.Sprintf("score:%s", key), count.Delta)
    }
    pipe.Exec()
}
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Posts/Comments DB** | Aurora PostgreSQL | CockroachDB | Aurora: Managed, Cockroach: Multi-region native |
| **Vote Storage** | DynamoDB | Cassandra | DynamoDB: Simpler, Cassandra: Better write throughput |
| **Cache** | ElastiCache Redis | Redis Enterprise | ElastiCache: Managed, Enterprise: Multi-active |
| **Feed Storage** | ElastiCache + DynamoDB | Cassandra | DynamoDB: Less ops, Cassandra: Better for time-series |
| **Search** | OpenSearch | Algolia | OpenSearch: Control, Algolia: Better relevance |
| **Media** | S3 + CloudFront | Cloudflare R2 | S3: Ecosystem, R2: No egress fees |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Vote Consistency

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
Problem: Duplicate votes from race conditions

Solution: Idempotency key

┌─────────────────────────────────────────────────────────────┐
│  Vote Request:                                               │
│  {                                                           │
│    "user_id": "u123",                                       │
│    "target": "post:456",                                    │
│    "value": 1,                                               │
│    "idempotency_key": "u123:post:456:v1"  ← unique key      │
│  }                                                           │
│                                                              │
│  Redis: SETNX idempotency:u123:post:456:v1 → 1 (success)   │
│         SETNX idempotency:u123:post:456:v1 → 0 (duplicate) │
└─────────────────────────────────────────────────────────────┘
```

</div>

### 2. Hot Posts Problem

```
Scenario: Viral post with 100K comments/minute

Solution: Tiered caching + sampling

┌─────────────────────────────────────────┐
│           HOT POST HANDLING             │
├─────────────────────────────────────────┤
│                                          │
│  Tier 1: Edge Cache (30s TTL)           │
│  ├── Top 100 comments                   │
│  └── Score approximation                │
│                                          │
│  Tier 2: Regional Cache (5min TTL)      │
│  ├── Full comment tree                  │
│  └── Accurate scores                    │
│                                          │
│  Tier 3: Database                        │
│  └── Source of truth                    │
│                                          │
│  Comment sampling for display:           │
│  - Show top 200 only                    │
│  - "Load more" fetches from cache       │
│  - Real-time updates via WebSocket      │
└─────────────────────────────────────────┘
```

### 3. Subreddit Sharding

```python
# Consistent hashing for subreddit sharding
class SubredditRouter:
    def __init__(self, num_shards=256):
        self.num_shards = num_shards
        self.ring = ConsistentHashRing(num_shards)

    def get_shard(self, subreddit_id):
        # Hash subreddit ID to shard
        return self.ring.get_node(str(subreddit_id))

    def get_connection(self, subreddit_id):
        shard = self.get_shard(subreddit_id)
        return self.connections[shard]
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Vote count accuracy**: Eventual consistency is acceptable
2. **Feed personalization**: Balance relevance vs freshness
3. **Spam detection**: ML models + community moderation
4. **Rate limiting**: Per-user and per-IP limits

### Common Follow-ups

- How would you handle a subreddit going viral?
- How do you prevent vote manipulation?
- How would you implement Reddit Premium features?

</div>
