# Design The Reddit API

## Problem Statement

Design a social news aggregation and discussion platform like Reddit with subreddits, posts, comments, voting, and content moderation.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff4500;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">REDDIT SYSTEM ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

<!-- CDN Layer -->
<div style="background: linear-gradient(135deg, #ff4500 0%, #dc2626 100%); border-radius: 12px; padding: 16px 32px; text-align: center; color: white;">
  <strong>CloudFront (CDN)</strong>
</div>

<div style="color: #ff4500; font-size: 24px;">↓</div>

<!-- Client Apps -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>Web App</strong><br><span style="font-size: 11px;">(Next.js)</span>
  </div>
  <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>Mobile API</strong><br><span style="font-size: 11px;">Gateway</span>
  </div>
  <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>OAuth</strong><br><span style="font-size: 11px;">Server</span>
  </div>
</div>

<div style="color: #ff4500; font-size: 24px;">↓</div>

<!-- API Gateway -->
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; padding: 16px 32px; text-align: center; color: white;">
  <strong>API Gateway</strong><br><span style="font-size: 12px;">Rate Limiting, Auth</span>
</div>

<div style="color: #ff4500; font-size: 24px;">↓</div>

<!-- Services Layer -->
<div style="background: #f1f5f9; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; width: 100%; max-width: 600px;">
  <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 16px;">
    <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #1d4ed8;">Post</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
    <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #1d4ed8;">Comment</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
    <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #1d4ed8;">Vote</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
  </div>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
    <div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #16a34a;">Subreddit</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
    <div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #16a34a;">User</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
    <div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center;"><strong style="color: #16a34a;">Feed</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
  </div>
</div>

<div style="color: #ff4500; font-size: 24px;">↓</div>

<!-- Data Layer -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>PostgreSQL</strong><br><span style="font-size: 11px;">(Data)</span>
  </div>
  <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>Redis</strong><br><span style="font-size: 11px;">(Cache)</span>
  </div>
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>S3</strong><br><span style="font-size: 11px;">(Media)</span>
  </div>
</div>

</div>

</div>

---

## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 10,000 - 100,000 monthly active
- **Posts**: 10,000 posts/day
- **Comments**: 50,000 comments/day
- **Budget**: $500 - $2,000/month

### Monolithic Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

<!-- Monolith Container -->
<div style="background: #f1f5f9; border: 2px solid #ff4500; border-radius: 16px; padding: 20px; width: 100%; max-width: 600px;">
  <h4 style="text-align: center; color: #dc2626; margin: 0 0 16px 0;">REDDIT MONOLITH</h4>

  <!-- Modules Layer -->
  <div style="background: #fff7ed; border: 1px solid #f59e0b; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
    <div style="text-align: center; color: #d97706; font-weight: bold; margin-bottom: 12px;">MODULES</div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 8px;">
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Subreddits</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Posts</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Comments</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Votes</strong></div>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Users</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Feeds</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Search</strong></div>
      <div style="background: white; border-radius: 6px; padding: 6px 12px; text-align: center;"><strong style="color: #d97706; font-size: 12px;">Mods</strong></div>
    </div>
  </div>

  <!-- Data Access Layer -->
  <div style="background: #faf5ff; border: 1px solid #7c3aed; border-radius: 12px; padding: 12px; text-align: center;">
    <strong style="color: #7c3aed;">DATA ACCESS</strong>
  </div>
</div>

<div style="color: #ff4500; font-size: 24px;">↓</div>

<!-- Databases -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>PostgreSQL</strong>
  </div>
  <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>Redis</strong>
  </div>
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
    <strong>S3</strong>
  </div>
</div>

</div>

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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 5M - 50M monthly active
- **Posts**: 500K posts/day
- **Votes**: 50M votes/day
- **Budget**: $50,000 - $200,000/month

### Microservices Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 500M+ monthly active
- **Posts**: 10M posts/day
- **Votes**: 2B votes/day
- **Budget**: $5M+/month

### Global Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff4500;">

### 1. "Why not show real-time vote counts?"

<div style="background: rgba(255, 69, 0, 0.1); border: 1px solid #ff4500; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Understanding of eventual consistency trade-offs, performance at scale, and user experience pragmatism.

**Strong Answer**:
> "Real-time vote counts at Reddit's scale (2B votes/day) would require synchronous writes and invalidation across all cache layers for every vote. The user doesn't actually need millisecond accuracy - seeing '1.2k upvotes' vs '1,247 upvotes' doesn't change behavior. We can batch vote aggregations every 100ms, giving us 10x write throughput while maintaining a 'feels real-time' experience. The key insight is that votes are high-write, low-consistency-requirement data - perfect for eventual consistency."

**When Simpler Works**:
> "At 10K users, store vote counts directly in the post row. A PostgreSQL `UPDATE posts SET score = score + 1` with row-level locking handles hundreds of concurrent votes fine. Add Redis caching when you hit 1000+ votes/second on hot posts."

</div>

### 2. "How does the hot ranking algorithm actually work?"

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Algorithm design thinking, understanding of decay functions, and ability to explain complex math simply.

**Strong Answer**:
> "Reddit's hot score combines logarithmic vote scaling with linear time decay. The formula `log10(score) + (timestamp / 45000)` means a post needs 10x more votes to overcome 12.5 hours of age. This creates natural content cycling - viral content rises fast but decays predictably. The logarithm prevents vote brigading from dominating (10,000 votes isn't 10x better than 1,000). I'd precompute hot scores on write, store in a sorted set, and recalculate periodically for older posts."

**When Simpler Works**:
> "For a small community forum, `ORDER BY (upvotes - downvotes) * 0.5 + EXTRACT(EPOCH FROM created_at) / 86400` gives you decent hot ranking. Add a materialized view refreshed every 5 minutes. No Kafka, no precomputation needed until you're generating 10K+ posts/day."

</div>

### 3. "Why separate read and write paths for voting?"

<div style="background: rgba(46, 160, 67, 0.1); border: 1px solid #2ea043; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What They're Probing**: CQRS understanding, performance optimization strategies, and recognizing when complexity pays off.

**Strong Answer**:
> "Votes have asymmetric read/write patterns: writes are bursty (viral posts), reads are constant (every page view shows scores). CQRS lets us optimize each path independently. Writes go to Kafka for buffering and batch processing - we can absorb 100K vote spikes without database pressure. Reads come from Redis with eventual consistency. The separation also enables different scaling: add more Kafka partitions for write throughput, add Redis replicas for read capacity. The key is the write path updates the read model asynchronously."

**When Simpler Works**:
> "Below 1M monthly users, a single PostgreSQL instance handles both paths. Use `SELECT ... FOR UPDATE SKIP LOCKED` for vote deduplication, and application-level caching with a 30-second TTL. The complexity of CQRS adds operational overhead that isn't worth it until you're seeing clear database contention."

</div>

### 4. "How do you handle the 'thundering herd' on viral posts?"

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Cache stampede prevention, rate limiting strategies, and graceful degradation thinking.

**Strong Answer**:
> "Three-layer defense: First, probabilistic cache refresh - instead of all requests hitting DB when cache expires, use `if random() < 0.01 and ttl < 10s: refresh_async()`. Second, request coalescing - use a distributed lock so only one request fetches from DB while others wait on the same promise. Third, stale-while-revalidate - serve slightly stale data while refreshing in background. For truly viral posts (100K+ concurrent), we circuit-break to sampling mode: show top 200 comments only, disable real-time updates, and use edge caching with 30-second TTL."

**When Simpler Works**:
> "For a forum with occasional popular threads, simple cache-aside with mutex is enough: `if cache miss: if acquire_lock(): fetch_and_cache() else: wait_for_cache()`. The singleflight pattern in Go or similar constructs handle this elegantly without distributed locks."

</div>

### 5. "Why use Cassandra for votes instead of PostgreSQL?"

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

**What They're Probing**: Database selection rationale, understanding of write patterns, and cost-benefit analysis.

**Strong Answer**:
> "Votes are append-heavy, time-series-like data with a simple access pattern: write once, read by user+target compound key. Cassandra excels here because: 1) Linear write scaling - add nodes for more throughput without sharding complexity. 2) Tunable consistency - we can use LOCAL_QUORUM for writes and ONE for reads. 3) Natural TTL support for vote history cleanup. 4) No single-point-of-failure - important when votes are happening 24/7. PostgreSQL would require manual sharding and has write amplification from its MVCC model that hurts at this scale."

**When Simpler Works**:
> "PostgreSQL with a partitioned votes table (by month) handles 10M votes/day comfortably. Use `INSERT ... ON CONFLICT DO UPDATE` for idempotency. The operational simplicity of one database type beats Cassandra's performance until you're genuinely hitting PostgreSQL's write limits. I'd consider Cassandra only after seeing sustained 5K+ writes/second."

</div>

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix

| Decision Point | Options Considered | Chosen | Rationale |
|----------------|-------------------|--------|-----------|
| **Vote Storage** | PostgreSQL, DynamoDB, Cassandra | Cassandra (scale) / PostgreSQL (start) | Write throughput at scale; start simple |
| **Comment Threading** | Adjacency List, Nested Sets, Closure Table, Materialized Path | Materialized Path | Balance of read/write performance; easy depth queries |
| **Feed Ranking** | Real-time calculation, Pre-computed scores, Hybrid | Hybrid with Redis Sorted Sets | Hot scores pre-computed on write; personalization at read time |
| **Caching Layer** | Memcached, Redis, Redis Cluster | Redis Cluster | Sorted sets for feeds, pub/sub for real-time, Lua for atomic ops |
| **Search** | PostgreSQL FTS, Elasticsearch, Algolia | Elasticsearch | Faceted search, relevance tuning, horizontal scaling |
| **Event Streaming** | RabbitMQ, Kafka, AWS Kinesis | Kafka | Replay capability, partitioning by subreddit, exactly-once semantics |

### Technology Justification Deep Dive

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Why Materialized Path for Comments?**

```
Alternatives Analysis:
├── Adjacency List (parent_id only)
│   ├── ✅ Simple writes
│   ├── ❌ Recursive queries for tree loading (N+1 or CTE)
│   └── Good for: < 100K comments, shallow nesting
│
├── Nested Sets (left/right integers)
│   ├── ❌ Expensive writes (rebalancing)
│   ├── ✅ Single query for subtrees
│   └── Good for: Read-heavy, rarely-changing trees
│
├── Closure Table (ancestor/descendant pairs)
│   ├── ❌ O(depth) storage overhead
│   ├── ✅ Fast subtree queries
│   └── Good for: Deep trees with frequent subtree operations
│
└── Materialized Path ("/1/2/3/")  ← CHOSEN
    ├── ✅ Single-query subtree (LIKE 'path%')
    ├── ✅ Easy depth calculation (count slashes)
    ├── ✅ No joins needed
    └── Trade-off: Path length limits, string operations
```

</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### PostgreSQL JSONB for Comments

<div style="background: rgba(46, 160, 67, 0.1); border: 1px solid #2ea043; border-radius: 12px; padding: 20px; margin: 16px 0;">

**When It Works**: Under 1M total comments, posts with < 500 comments average

```sql
-- Store entire comment tree as JSONB
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    comments JSONB DEFAULT '[]',  -- Denormalized tree
    comment_count INT DEFAULT 0
);

-- Fetch post with all comments in one query
SELECT * FROM posts WHERE id = 123;

-- Add comment (PostgreSQL 14+)
UPDATE posts
SET comments = jsonb_insert(
    comments,
    '{0,replies,0}',  -- Path to insert
    '{"author": "user1", "text": "Great post!", "replies": []}'
)
WHERE id = 123;
```

**Why It Breaks**: JSONB updates rewrite the entire column. At 500+ comments, you're moving megabytes per comment. Switch to normalized tables with materialized path when you see post sizes exceeding 100KB regularly.

</div>

### When You Don't Need Redis for Votes

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**When It Works**: Under 100K daily active users, < 1M votes/day

```sql
-- Votes directly in PostgreSQL
CREATE TABLE votes (
    user_id INT,
    post_id INT,
    vote_type SMALLINT,  -- 1 or -1
    PRIMARY KEY (user_id, post_id)
);

-- Atomic vote with score update
WITH vote_change AS (
    INSERT INTO votes (user_id, post_id, vote_type)
    VALUES (123, 456, 1)
    ON CONFLICT (user_id, post_id) DO UPDATE
    SET vote_type = EXCLUDED.vote_type
    RETURNING
        vote_type - COALESCE(
            (SELECT vote_type FROM votes WHERE user_id = 123 AND post_id = 456),
            0
        ) as delta
)
UPDATE posts SET score = score + (SELECT delta FROM vote_change)
WHERE id = 456;
```

**Why It Breaks**: Row-level locks on hot posts cause contention. When you see `lock wait` times exceeding 50ms on popular posts, introduce Redis for optimistic counting with async reconciliation.

</div>

### Simpler Alternatives Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

| Full Solution | Simpler Alternative | Switch When |
|--------------|---------------------|-------------|
| Kafka + Vote Aggregator | PostgreSQL triggers | > 5K votes/second sustained |
| Elasticsearch | PostgreSQL pg_trgm + GIN | > 10M searchable posts |
| Redis Sorted Sets for feeds | Materialized views | > 1M feed generations/day |
| Cassandra for votes | Partitioned PostgreSQL | > 50M votes/day |
| CDN + Edge caching | Nginx proxy_cache | > 10K requests/second |
| Microservices | Modular monolith | Team > 20 engineers |

</div>

### The $300/month Forum

<div style="background: rgba(255, 69, 0, 0.1); border: 1px solid #ff4500; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Scenario**: 50K monthly users, 1K posts/day, 10K comments/day

```
Architecture:
├── Single $150/month managed PostgreSQL (db.t3.medium)
│   ├── Posts, comments, votes, users - all in one DB
│   ├── Materialized view for hot feed (refresh every 5 min)
│   └── pg_trgm extension for search
│
├── $100/month application server (2 vCPU, 4GB RAM)
│   ├── Rails/Django/Next.js monolith
│   ├── In-process caching (Rails.cache / Django cache)
│   └── Background jobs for email, notifications
│
├── $50/month Redis (cache.t3.micro)
│   ├── Session storage
│   ├── Rate limiting
│   └── Hot post cache
│
└── Cloudflare Free Tier
    ├── CDN for static assets
    └── Basic DDoS protection

Performance Expectations:
- 500 concurrent users: No problem
- 100ms average response time
- Search across 100K posts: < 200ms
- Comment threads 1000 deep: Works with recursive CTE
```

**Growth Triggers**:
- Database CPU > 70% sustained → Add read replica
- Application memory > 3GB → Upgrade or add instance
- Redis hit rate < 80% → Increase cache size
- Search latency > 500ms → Consider Elasticsearch

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Trade-off | Choice Made | What We Lose | Mitigation |
|-----------|-------------|--------------|------------|
| **Vote Consistency** | Eventual (100ms lag) | Real-time accuracy | Optimistic UI updates; reconcile on refresh |
| **Comment Loading** | Lazy load children | Full tree view | "Load more replies" with prefetch hints |
| **Feed Freshness** | 60s cache TTL | Instant new post visibility | WebSocket push for subscribed subreddits |
| **Search Indexing** | Async (5-30s delay) | Immediate searchability | Show "Post submitted" with direct link |
| **Media Processing** | Async transcode | Immediate media display | Progressive loading with blur placeholder |

</div>

### Mitigation Strategies Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
EVENTUAL CONSISTENCY MITIGATION
================================

Problem: User votes, refreshes, doesn't see their vote

Solutions (layered):
├── 1. Optimistic UI
│   └── Immediately show vote in client state
│
├── 2. Write-through to session
│   └── Store user's recent votes in Redis session
│   └── Merge with server response: user_votes ∪ cached_votes
│
├── 3. Read-your-writes consistency
│   └── After write, read from primary for 5 seconds
│   └── Cookie: "last_write_ts=1234567890"
│
└── 4. Sticky sessions for hot content
    └── Route user to same cache node for 60s
    └── Ensures they see their own writes

CACHE INVALIDATION STRATEGY
===========================

Problem: Stale feeds, outdated scores, phantom content

Approach: Event-driven selective invalidation

post.created →
  ├── Invalidate subreddit feed cache
  ├── Invalidate author's profile cache
  └── Queue for follower feed fan-out

post.voted →
  ├── Update score in sorted set (not invalidate)
  └── Rerank only if score crosses threshold

comment.created →
  ├── Increment post.comment_count (atomic)
  ├── Invalidate post detail cache
  └── Don't touch feed caches (count is denormalized)
```

</div>

### Failure Modes & Recovery

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Failure | Impact | Detection | Recovery |
|---------|--------|-----------|----------|
| Redis cluster down | No caching, DB overload | Health checks, latency spike | Circuit breaker → serve stale, shed load |
| Kafka lag > 10s | Vote counts delayed | Consumer lag metrics | Scale consumers, increase batch size |
| PostgreSQL replica lag | Stale reads | Replication lag monitor | Route to primary, alert on-call |
| S3 unavailable | No media | 5xx from CloudFront | Serve placeholder, queue retry |
| Elasticsearch down | Search broken | Health endpoint | Fallback to PostgreSQL pg_trgm |

</div>

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Vote count accuracy**: Eventual consistency is acceptable - users don't need millisecond precision
2. **Feed personalization**: Balance relevance vs freshness vs diversity - avoid filter bubbles
3. **Spam detection**: Layered approach - rate limits → heuristics → ML → community reports
4. **Rate limiting**: Token bucket per-user, sliding window per-IP, separate limits for reads/writes
5. **Moderation at scale**: Automod rules + ML flagging + human review queue with SLAs

### Common Follow-ups

- **"How would you handle a subreddit going viral?"** → Edge caching, request coalescing, graceful degradation
- **"How do you prevent vote manipulation?"** → Device fingerprinting, velocity limits, graph analysis for bot rings
- **"How would you implement Reddit Premium?"** → Feature flags, separate CDN tier, no-ads rendering path

### Red Flags to Avoid

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Red Flag | Why It's Bad | Better Approach |
|----------|--------------|-----------------|
| "We need Kafka from day one" | Over-engineering; PostgreSQL LISTEN/NOTIFY works for 90% of cases | "Start with PostgreSQL notifications, add Kafka when we need replay or multi-consumer" |
| "Microservices because Netflix uses them" | Cargo culting; ignores team size and operational cost | "Modular monolith with clear boundaries, extract services when team/scale demands" |
| "Real-time vote counts via WebSocket" | Massive fan-out cost for low-value feature | "Polling with smart refresh, WebSocket only for user's own actions" |
| "Shard by user_id for everything" | Wrong access patterns; posts are accessed by subreddit, not author | "Shard votes by post_id, posts by subreddit, users stay unsharded longest" |
| "NoSQL because we need scale" | SQL scales fine with proper indexing and read replicas | "PostgreSQL to 10TB, evaluate migration at clear pain points" |
| "Cache everything for 1 hour" | Stale data, cache invalidation nightmares | "Tiered TTLs based on data volatility: user profiles 1hr, feeds 60s, scores 5s" |

</div>

### Impressive Statements

<div style="background: rgba(46, 160, 67, 0.1); border: 1px solid #2ea043; border-radius: 12px; padding: 20px; margin: 16px 0;">

| Topic | Statement | Why It Impresses |
|-------|-----------|------------------|
| **Consistency** | "For votes, we can accept a 100ms consistency window because the UX cost of stronger consistency exceeds the value of real-time accuracy" | Shows cost-benefit thinking, not just technical knowledge |
| **Scaling** | "I'd keep everything in PostgreSQL until we see specific bottlenecks - premature optimization with specialized databases adds operational complexity without proven benefit" | Demonstrates pragmatism and operational awareness |
| **Caching** | "Cache invalidation is harder than caching - I'd use event-driven selective invalidation rather than TTL-based expiry to maintain consistency guarantees" | Shows deep understanding of distributed systems challenges |
| **Trade-offs** | "The hot ranking formula trades computational complexity for content freshness - we precompute on write to shift work from the read path" | Demonstrates understanding of read/write trade-offs |
| **Failure modes** | "When Redis fails, we circuit-break to database with rate limiting rather than complete outage - graceful degradation over hard failure" | Shows production mindset and resilience thinking |
| **Growth** | "At 10K users, I'd use PostgreSQL JSONB for comments. At 1M, normalize to tables with materialized paths. At 100M, consider comment service with Cassandra" | Demonstrates ability to right-size solutions |

</div>

### Closing Strong

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**"What would you build first?"**

> "The core voting and feed loop - that's Reddit's flywheel. A user can vote, see updated scores, and get a personalized feed. Everything else (awards, chat, video) are features on top. I'd nail the data model for posts, comments, and votes, get the hot ranking working, then iterate. Shipping a working MVP in PostgreSQL + Redis beats architecting a perfect distributed system that takes 6 months to build."

**"Where does this design break?"**

> "Three places: First, single-subreddit hotspots - r/all or viral AMAs can overwhelm any caching strategy; we'd need request sampling and edge compute. Second, real-time features like chat and live threads require WebSocket infrastructure we haven't designed. Third, global latency - this design assumes single-region; multi-region would need conflict resolution for votes and eventually consistent subreddit state."

</div>

</div>
