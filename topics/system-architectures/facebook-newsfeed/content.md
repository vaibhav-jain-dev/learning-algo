# Design Facebook News Feed

## Problem Statement

Design a personalized news feed system that aggregates, ranks, and delivers relevant content from a user's social connections in near real-time at massive scale.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #1877f2;">

### Core Requirements

| Requirement | Target | Implication |
|-------------|--------|-------------|
| **Feed Generation** | < 200ms p99 latency | Pre-computation required at scale |
| **Freshness** | < 30s for close friends | Tiered consistency model |
| **Personalization** | Engagement-optimized ranking | ML pipeline with 10K+ features |
| **Scale** | 2B+ DAU, 100K+ QPS | Distributed architecture essential |
| **Availability** | 99.99% uptime | Graceful degradation patterns |

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #1a1a2e 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f0883e;">

### Critical Assumptions

**Assumption 1: Read-Heavy Workload**
- Typical ratio: 100:1 reads to writes
- Users scroll feed 10-50x more often than they post
- **Design Impact**: Optimize for read path; accept write amplification

**Assumption 2: Power Law Distribution**
- 1% of users (celebrities) have 99% of followers
- Most users have < 500 friends
- **Design Impact**: Hybrid fan-out strategy mandatory

**Assumption 3: Eventual Consistency Acceptable**
- Users tolerate 30-60 second delays for others' content
- Only own posts require immediate visibility
- **Design Impact**: Aggressive caching with tiered TTLs

**Assumption 4: Engagement Over Completeness**
- Users prefer relevant subset over complete chronological list
- Missing low-relevance posts is acceptable
- **Design Impact**: Aggressive filtering and ranking

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Feed System Component Flow

<div style="display: grid; grid-template-columns: 1fr; gap: 16px;">

<div style="background: linear-gradient(135deg, #1f6feb22 0%, #1f6feb11 100%); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 16px 0;">Layer 1: Ingestion Layer</h4>

**Components**: API Gateway, Post Service, Event Bus

**Responsibilities**:
- Validate and persist new posts
- Emit events for downstream processing
- Handle media upload coordination

**Key Metrics**: Write latency p99 < 500ms, durability 99.999%
</div>

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 16px 0;">Layer 2: Fan-out Layer</h4>

**Components**: Fan-out Service, Social Graph Service, User Segmentation

**Responsibilities**:
- Determine fan-out strategy per post
- Execute async writes to follower feeds
- Handle celebrity vs normal user bifurcation

**Key Metrics**: Fan-out completion < 5s for 99% of posts
</div>

<div style="background: linear-gradient(135deg, #8957e522 0%, #8957e511 100%); border: 1px solid #8957e5; border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 16px 0;">Layer 3: Aggregation Layer</h4>

**Components**: Feed Aggregator, Content Sources, Merge Service

**Responsibilities**:
- Collect posts from push-based feeds
- Pull celebrity posts on demand
- Merge ads, suggested content, friend posts

**Key Metrics**: Aggregation latency < 50ms
</div>

<div style="background: linear-gradient(135deg, #f0883e22 0%, #f0883e11 100%); border: 1px solid #f0883e; border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 16px 0;">Layer 4: Ranking Layer</h4>

**Components**: Feature Store, ML Inference, Ranking Models

**Responsibilities**:
- Extract real-time features
- Score candidates using ML models
- Apply business rules and filters

**Key Metrics**: Ranking latency < 100ms, model freshness < 1 hour
</div>

<div style="background: linear-gradient(135deg, #f8514922 0%, #f8514911 100%); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">Layer 5: Serving Layer</h4>

**Components**: Feed Cache, CDN, Real-time Updates

**Responsibilities**:
- Cache pre-computed feeds
- Serve with sub-50ms latency
- Push updates via WebSocket/SSE

**Key Metrics**: Cache hit rate > 99%, serving latency p99 < 100ms
</div>

</div>
</div>

---

## Fan-out Strategies: The Core Design Decision

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Fan-out-on-Write (Push Model)

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 24px; margin: 16px 0;">

**Mechanism**: When a user posts, immediately write the post ID to every follower's pre-computed feed list.

```python
class FanOutOnWriteService:
    """
    Push model: Write amplification in exchange for O(1) reads.

    CRITICAL INSIGHT: This is NOT about copying post content.
    We only fan out post IDs (8 bytes each). Content is fetched
    separately and cached.
    """

    def on_post_created(self, post: Post):
        # Step 1: Persist the post (source of truth)
        self.post_store.save(post)

        # Step 2: Get follower list (from social graph cache)
        followers = self.social_graph.get_followers(
            post.author_id,
            max_count=self.FANOUT_LIMIT  # Typically 10K-50K
        )

        # Step 3: Async fan-out to avoid blocking write
        for batch in self._batch(followers, size=1000):
            self.queue.enqueue(FanOutJob(
                post_id=post.id,
                follower_ids=batch,
                post_timestamp=post.created_at
            ))

    def execute_fanout(self, job: FanOutJob):
        """
        Executed by background workers.

        DATA STRUCTURE: Each user's feed is a sorted set in Redis.
        Score = timestamp, Member = post_id
        """
        pipeline = self.redis.pipeline()

        for follower_id in job.follower_ids:
            feed_key = f"feed:{follower_id}"

            # ZADD with timestamp as score
            pipeline.zadd(feed_key, {job.post_id: job.post_timestamp})

            # Trim to keep only recent N posts (memory management)
            pipeline.zremrangebyrank(feed_key, 0, -self.MAX_FEED_SIZE)

        pipeline.execute()
```

**Trade-off Analysis**:

| Aspect | Impact | Mitigation |
|--------|--------|------------|
| Write Amplification | O(followers) writes per post | Async processing, batching |
| Storage Cost | 8 bytes x followers x posts | TTL-based expiration, trimming |
| Latency on Write | Can take seconds for popular users | Queue-based async processing |
| Read Performance | O(1) - just fetch pre-computed list | This is the benefit |
| Consistency | Followers see post at different times | Accept eventual consistency |

</div>

### Fan-out-on-Read (Pull Model)

<div style="background: linear-gradient(135deg, #1f6feb22 0%, #1f6feb11 100%); border: 1px solid #1f6feb; border-radius: 12px; padding: 24px; margin: 16px 0;">

**Mechanism**: When a user requests their feed, dynamically fetch posts from all accounts they follow and merge/rank on the fly.

```python
class FanOutOnReadService:
    """
    Pull model: Read amplification in exchange for O(1) writes.

    CRITICAL INSIGHT: This model is actually viable at scale
    with aggressive caching. Twitter used this for years.
    """

    def get_feed(self, user_id: str, limit: int = 20) -> List[Post]:
        # Step 1: Get accounts this user follows
        following = self.social_graph.get_following(user_id)

        # Step 2: Fetch recent posts from each (with caching)
        candidate_posts = []

        # OPTIMIZATION: Parallel fetch with connection pooling
        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = {
                executor.submit(
                    self._get_user_posts_cached,
                    followed_id,
                    since=time.time() - 7 * 86400  # Last 7 days
                ): followed_id
                for followed_id in following
            }

            for future in as_completed(futures, timeout=0.2):
                try:
                    posts = future.result()
                    candidate_posts.extend(posts)
                except TimeoutError:
                    # Skip slow sources - graceful degradation
                    pass

        # Step 3: Merge and rank
        ranked = self.ranker.rank(user_id, candidate_posts)

        return ranked[:limit]

    def _get_user_posts_cached(self, user_id: str, since: float) -> List[Post]:
        """
        CACHING STRATEGY: User's posts are user-agnostic.
        One cache entry serves ALL followers of that user.

        This is why pull model scales better than intuition suggests.
        """
        cache_key = f"posts:{user_id}:recent"

        cached = self.cache.get(cache_key)
        if cached:
            return [p for p in cached if p.created_at > since]

        posts = self.post_store.get_by_author(user_id, limit=100)
        self.cache.set(cache_key, posts, ttl=60)  # 1 minute TTL

        return [p for p in posts if p.created_at > since]
```

**Trade-off Analysis**:

| Aspect | Impact | Mitigation |
|--------|--------|------------|
| Read Amplification | O(following) fetches per request | Parallel fetch, aggressive caching |
| Read Latency | Higher baseline (50-200ms) | Pre-computation for active users |
| Storage Cost | Minimal - no feed duplication | This is the benefit |
| Write Performance | O(1) - just persist the post | This is the benefit |
| Cache Efficiency | High - one entry serves many readers | Celebrity posts cached once, read millions of times |

</div>

### Hybrid Model (Facebook/Twitter Approach)

<div style="background: linear-gradient(135deg, #8957e522 0%, #8957e511 100%); border: 1px solid #8957e5; border-radius: 12px; padding: 24px; margin: 16px 0;">

**Mechanism**: Use push for normal users, pull for celebrities. The threshold is tunable based on write capacity.

```python
class HybridFanOutService:
    """
    Hybrid model: Best of both worlds.

    KEY INSIGHT: The threshold isn't arbitrary. It's derived from:
    - Write capacity (IOPS available for fan-out)
    - Celebrity post frequency
    - Acceptable fan-out completion time
    """

    # Threshold tuning formula:
    # max_followers = (write_capacity * acceptable_delay) / posts_per_second
    # Example: (100K IOPS * 5 seconds) / 100 posts/sec = 5000 followers
    CELEBRITY_THRESHOLD = 10_000

    def on_post_created(self, post: Post):
        author = self.user_store.get(post.author_id)
        follower_count = self.social_graph.get_follower_count(post.author_id)

        if follower_count < self.CELEBRITY_THRESHOLD:
            # Normal user: full fan-out
            self._push_to_followers(post, limit=None)
        else:
            # Celebrity: limited fan-out + indexing for pull
            self._index_celebrity_post(post)

            # Optional: push to "super fans" (high engagement followers)
            super_fans = self.engagement_service.get_top_fans(
                post.author_id,
                limit=1000
            )
            self._push_to_followers(post, follower_ids=super_fans)

    def get_feed(self, user_id: str, limit: int = 20) -> List[Post]:
        # Step 1: Get pre-computed feed (from push)
        push_feed = self._get_cached_feed(user_id)

        # Step 2: Get celebrities this user follows
        celebrities_followed = self.social_graph.get_following(
            user_id,
            filter=lambda u: u.follower_count >= self.CELEBRITY_THRESHOLD
        )

        # Step 3: Pull celebrity posts (heavily cached)
        celebrity_posts = []
        for celeb_id in celebrities_followed:
            posts = self._get_celebrity_posts_cached(celeb_id)
            celebrity_posts.extend(posts)

        # Step 4: Merge and rank
        all_candidates = push_feed + celebrity_posts
        ranked = self.ranker.rank(user_id, all_candidates)

        return ranked[:limit]

    def _get_celebrity_posts_cached(self, celeb_id: str) -> List[Post]:
        """
        CRITICAL OPTIMIZATION: Celebrity posts have user-agnostic cache.

        Cache key does NOT include viewer_id because:
        - Post content is same for all viewers
        - Personalization happens in ranking layer
        - One cache entry serves millions of requests

        This is why pull works for celebrities despite huge follower counts.
        """
        cache_key = f"celeb_posts:{celeb_id}"

        cached = self.cache.get(cache_key)
        if cached:
            return cached

        posts = self.post_store.get_by_author(celeb_id, limit=50)

        # Longer TTL for celebrities (content changes less frequently per-user)
        self.cache.set(cache_key, posts, ttl=300)  # 5 minutes

        return posts
```

**Threshold Determination Deep Dive**:

```python
def calculate_optimal_threshold(
    write_capacity_iops: int,
    target_fanout_time_seconds: float,
    posts_per_second: float,
    safety_margin: float = 0.7
) -> int:
    """
    Derive celebrity threshold from system capacity.

    Formula: threshold = (capacity * time * margin) / post_rate

    Example calculation:
    - Write capacity: 100,000 IOPS
    - Target fan-out time: 5 seconds
    - Posts per second: 1,000
    - Safety margin: 70%

    threshold = (100,000 * 5 * 0.7) / 1,000 = 350 followers

    But this seems too low! The trick is:
    - Not all posts fan out simultaneously
    - Fan-out is batched (1000 writes per batch = 1 IOPS)
    - Most users are inactive at any given time

    Adjusted: threshold = (100,000 * 5 * 0.7 * 1000) / 1,000 = 350,000

    In practice, companies use 1,000 - 50,000 based on:
    - Twitter: ~1,000 (conservative, prioritizes write speed)
    - Instagram: ~10,000 (balanced)
    - Facebook: Dynamic based on user activity patterns
    """
    raw_threshold = (write_capacity_iops * target_fanout_time_seconds * safety_margin) / posts_per_second

    # Adjust for batching efficiency
    batch_multiplier = 1000  # Writes per batch

    return int(raw_threshold * batch_multiplier)
```

</div>
</div>

---

## Ranking Algorithms

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Evolution of Feed Ranking

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Phase 1: Chronological (Pre-2009)**
- Simply sort by timestamp
- Works for small networks
- Breaks down with high follow counts

**Phase 2: EdgeRank (2009-2013)**
- Affinity x Weight x Decay formula
- Hand-tuned coefficients
- Limited personalization

**Phase 3: Machine Learning (2013-Present)**
- Neural networks with 10,000+ features
- Real-time feature computation
- Continuous model updates

</div>

### EdgeRank: The Foundation

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class EdgeRankScorer:
    """
    Facebook's original ranking algorithm (simplified).

    Score = SUM(affinity * weight * decay) for all edges

    An "edge" is any connection between user and content:
    - Friend posted it
    - Friend liked it
    - Friend commented on it
    - User tagged in it
    """

    # Content type weights (hand-tuned based on engagement data)
    CONTENT_WEIGHTS = {
        'video': 1.5,      # Highest engagement
        'photo': 1.2,
        'link': 1.0,
        'status': 0.8,
        'share': 0.7,      # Lower originality
    }

    # Interaction type weights
    INTERACTION_WEIGHTS = {
        'comment': 1.0,    # Highest signal
        'share': 0.8,
        'reaction': 0.5,
        'click': 0.3,
        'view': 0.1,       # Weakest signal
    }

    def calculate_score(self, viewer_id: str, post: Post) -> float:
        """
        Calculate EdgeRank score for a single post.

        INSIGHT: This runs for potentially thousands of posts
        per feed request. Must be < 1ms per post.
        """
        total_score = 0.0

        # Get all edges connecting viewer to this post
        edges = self._get_edges(viewer_id, post)

        for edge in edges:
            affinity = self._calculate_affinity(viewer_id, edge.source_user_id)
            weight = self._calculate_weight(edge.edge_type, post.content_type)
            decay = self._calculate_decay(edge.timestamp)

            total_score += affinity * weight * decay

        return total_score

    def _calculate_affinity(self, viewer_id: str, author_id: str) -> float:
        """
        Affinity score: How close is the viewer to this person?

        Based on historical interaction patterns:
        - How often does viewer interact with author's content?
        - How often do they message?
        - Profile visits, tags, mutual friends

        STORAGE: Pre-computed in a feature store, updated hourly.
        Key: (viewer_id, author_id) -> affinity_score
        """
        cache_key = f"affinity:{viewer_id}:{author_id}"

        affinity = self.feature_store.get(cache_key)
        if affinity is None:
            # Fallback: compute from recent interactions
            affinity = self._compute_affinity_realtime(viewer_id, author_id)

        return affinity

    def _calculate_decay(self, timestamp: datetime) -> float:
        """
        Time decay: Older content is less relevant.

        Formula: 1 / (1 + hours_old ^ decay_factor)

        TUNING: decay_factor determines how quickly relevance drops
        - 1.0: Gentle decay (1 day old = 0.04 score)
        - 1.5: Moderate decay (1 day old = 0.008 score)
        - 2.0: Aggressive decay (1 day old = 0.002 score)
        """
        hours_old = (datetime.now() - timestamp).total_seconds() / 3600
        decay_factor = 1.5

        return 1.0 / (1.0 + hours_old ** decay_factor)
```

**EdgeRank Limitations**:

| Limitation | Problem | ML Solution |
|------------|---------|-------------|
| Hand-tuned weights | Suboptimal, doesn't adapt | Learned weights from data |
| Linear combination | Can't capture interactions | Neural networks capture non-linear patterns |
| Same weights for all users | No personalization | Per-user or segment models |
| Limited features | Missing important signals | 10,000+ features |
| No feedback loop | Stale over time | Online learning |

</div>

### Modern ML-Based Ranking

<div style="background: linear-gradient(135deg, #1f6feb22 0%, #1f6feb11 100%); border: 1px solid #1f6feb; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class MLRankingPipeline:
    """
    Production ranking pipeline with multiple stages.

    ARCHITECTURE: Multi-stage funnel for efficiency

    Stage 1: Candidate Generation (1000s -> 500)
    - Simple rules + lightweight models
    - Sub-millisecond per candidate

    Stage 2: First-Pass Ranking (500 -> 50)
    - Lightweight neural network
    - ~1ms per candidate

    Stage 3: Final Ranking (50 -> 20)
    - Heavy model with all features
    - ~10ms per candidate

    This funnel is CRITICAL for latency at scale.
    """

    def rank(self, viewer_id: str, candidates: List[Post], limit: int = 20) -> List[Post]:
        # Stage 1: Lightweight filtering
        filtered = self._candidate_generation(viewer_id, candidates)

        # Stage 2: First-pass ranking
        first_pass = self._first_pass_ranking(viewer_id, filtered)

        # Stage 3: Final ranking with full features
        final = self._final_ranking(viewer_id, first_pass[:50])

        # Post-processing: diversity, deduplication
        processed = self._post_process(final)

        return processed[:limit]

    def _candidate_generation(self, viewer_id: str, candidates: List[Post]) -> List[Post]:
        """
        Stage 1: Reduce candidate set using cheap signals.

        Rules-based filtering:
        - Remove posts viewer has seen
        - Remove posts from blocked users
        - Remove posts below quality threshold
        - Time-based filtering (e.g., < 7 days old)
        """
        filtered = []

        seen_posts = self.seen_service.get_seen_posts(viewer_id)
        blocked_users = self.privacy_service.get_blocked_users(viewer_id)

        for post in candidates:
            if post.id in seen_posts:
                continue
            if post.author_id in blocked_users:
                continue
            if post.quality_score < self.MIN_QUALITY_THRESHOLD:
                continue
            if post.age_hours > 168:  # 7 days
                continue

            filtered.append(post)

        return filtered[:500]  # Cap for next stage

    def _first_pass_ranking(self, viewer_id: str, candidates: List[Post]) -> List[Post]:
        """
        Stage 2: Lightweight neural network scoring.

        Model: Two-tower architecture
        - User tower: embeds viewer preferences
        - Item tower: embeds post characteristics
        - Score = dot product of embeddings

        Latency budget: 10ms total for 500 candidates
        """
        # Fetch pre-computed user embedding
        user_embedding = self.feature_store.get_user_embedding(viewer_id)

        # Batch compute post embeddings (vectorized)
        post_embeddings = self.item_tower.embed_batch([p.id for p in candidates])

        # Dot product scoring (extremely fast with numpy)
        scores = np.dot(post_embeddings, user_embedding)

        # Sort by score
        scored = list(zip(candidates, scores))
        scored.sort(key=lambda x: x[1], reverse=True)

        return [post for post, score in scored]

    def _final_ranking(self, viewer_id: str, candidates: List[Post]) -> List[Post]:
        """
        Stage 3: Full-featured ranking model.

        Feature categories:
        1. User features (who is viewing)
        2. Author features (who posted)
        3. Post features (what content)
        4. Context features (when/where viewing)
        5. Interaction features (viewer-author history)
        6. Network features (mutual friends, groups)

        Total: 10,000+ features
        Model: Deep neural network (transformer-based)
        Latency budget: 50ms total for 50 candidates
        """
        features_batch = []

        for post in candidates:
            features = self._extract_all_features(viewer_id, post)
            features_batch.append(features)

        # Batch inference
        scores = self.ranking_model.predict_batch(features_batch)

        scored = list(zip(candidates, scores))
        scored.sort(key=lambda x: x[1], reverse=True)

        return [post for post, score in scored]

    def _extract_all_features(self, viewer_id: str, post: Post) -> Dict:
        """
        Feature extraction for final ranking.

        CRITICAL: Features must be pre-computed or very fast to compute.
        Database queries here would kill latency.
        """
        return {
            # User features (from feature store)
            'viewer_age_bucket': self.feature_store.get(f'user:{viewer_id}:age_bucket'),
            'viewer_activity_level': self.feature_store.get(f'user:{viewer_id}:activity'),
            'viewer_content_preferences': self.feature_store.get(f'user:{viewer_id}:prefs'),

            # Author features
            'author_follower_count_log': math.log1p(post.author.follower_count),
            'author_post_frequency': self.feature_store.get(f'user:{post.author_id}:post_freq'),
            'author_avg_engagement': self.feature_store.get(f'user:{post.author_id}:avg_eng'),

            # Post features
            'post_type': post.content_type,
            'post_length': len(post.content),
            'has_media': post.has_media,
            'has_link': post.has_link,
            'post_hour': post.created_at.hour,
            'post_day_of_week': post.created_at.weekday(),

            # Real-time engagement (computed in streaming pipeline)
            'likes_velocity': self.realtime_store.get(f'post:{post.id}:like_velocity'),
            'comments_velocity': self.realtime_store.get(f'post:{post.id}:comment_velocity'),
            'current_likes': post.like_count,
            'current_comments': post.comment_count,

            # Interaction features
            'viewer_author_affinity': self.feature_store.get(f'affinity:{viewer_id}:{post.author_id}'),
            'viewer_author_interactions_30d': self.feature_store.get(f'interactions:{viewer_id}:{post.author_id}:30d'),
            'mutual_friends_count': self.feature_store.get(f'mutual:{viewer_id}:{post.author_id}'),

            # Context features
            'viewer_platform': self.context.platform,
            'viewer_time_of_day': datetime.now().hour,
            'viewer_session_depth': self.context.posts_seen_in_session,
        }
```

**Multi-Objective Ranking**:

```python
class MultiObjectiveRanker:
    """
    Real ranking optimizes multiple objectives simultaneously.

    Objectives:
    1. Engagement (clicks, likes, comments, shares)
    2. Time spent (dwell time on content)
    3. User satisfaction (from surveys, not leaving app)
    4. Content diversity (avoid filter bubbles)
    5. Business metrics (ad revenue, not covered here)

    CHALLENGE: These objectives can conflict!
    - Clickbait maximizes clicks but hurts satisfaction
    - Controversial content maximizes engagement but harms platform
    """

    def compute_final_score(self, viewer_id: str, post: Post, predictions: Dict) -> float:
        """
        Combine multiple predicted outcomes into single score.

        Formula: score = sum(weight_i * prediction_i)

        Weights are tuned via:
        - A/B testing different combinations
        - Optimizing for long-term retention
        - Manual adjustment for policy reasons
        """
        # Model predictions for different engagement types
        p_click = predictions['probability_click']
        p_like = predictions['probability_like']
        p_comment = predictions['probability_comment']
        p_share = predictions['probability_share']
        p_hide = predictions['probability_hide']  # Negative signal

        # Dwell time prediction
        expected_dwell_time = predictions['expected_dwell_time_seconds']

        # Weighted combination
        engagement_score = (
            0.3 * p_click +
            0.2 * p_like +
            0.3 * p_comment +  # Comments weighted high (strong signal)
            0.2 * p_share
        )

        # Normalize dwell time (cap at 60 seconds)
        dwell_score = min(expected_dwell_time / 60.0, 1.0)

        # Penalty for predicted negative actions
        negative_penalty = 0.5 * p_hide

        # Final score
        final_score = (
            0.6 * engagement_score +
            0.3 * dwell_score -
            0.1 * negative_penalty
        )

        return final_score
```

</div>
</div>

---

## Caching Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Multi-Layer Cache Architecture

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Cache Hierarchy** (See [[caching]](/topics/system-design/caching) for fundamentals):

| Layer | Location | Latency | Size | Purpose |
|-------|----------|---------|------|---------|
| L1 | Client/CDN Edge | < 10ms | 1KB/user | Prefetched next page |
| L2 | Regional Cache | < 20ms | 10KB/user | User's ranked feed |
| L3 | Central Cache | < 50ms | 100KB/user | Post content, user data |
| L4 | Database | < 200ms | Unlimited | Source of truth |

</div>

### Feed Cache Implementation

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class FeedCacheService:
    """
    Multi-tier feed caching with intelligent invalidation.

    INSIGHT: Different cache tiers serve different purposes:
    - Feed ID list: Changes frequently, short TTL
    - Post content: Changes rarely, long TTL
    - User metadata: Medium frequency, medium TTL

    Separating these allows independent scaling and invalidation.
    """

    def __init__(self):
        # Regional cache (close to users)
        self.feed_cache = Redis(cluster='regional')

        # Central cache (shared across regions)
        self.content_cache = Redis(cluster='central')

        # Local in-memory cache (per-server)
        self.local_cache = TTLCache(maxsize=10000, ttl=10)

    def get_feed(self, user_id: str, page: int = 0, page_size: int = 20) -> List[Post]:
        """
        Get user's feed with multi-layer caching.

        Cache strategy:
        1. Check if we have pre-computed ranked feed (post IDs)
        2. Hydrate post IDs with content (separate cache)
        3. Apply real-time filters (seen, blocked, deleted)
        """

        # Step 1: Get ranked post IDs
        feed_ids = self._get_feed_ids_cached(user_id, page, page_size)

        if not feed_ids:
            # Cache miss: compute feed on demand
            feed_ids = self._compute_and_cache_feed(user_id)

        # Step 2: Hydrate with post content (batch fetch)
        posts = self._hydrate_posts(feed_ids)

        # Step 3: Apply real-time filters
        posts = self._apply_realtime_filters(user_id, posts)

        return posts

    def _get_feed_ids_cached(self, user_id: str, page: int, page_size: int) -> List[str]:
        """
        Fetch pre-computed feed from cache.

        DATA STRUCTURE: Sorted set in Redis
        - Score: ranking score (not timestamp!)
        - Member: post_id

        Using ZREVRANGE for pagination:
        - Page 0: positions 0-19
        - Page 1: positions 20-39
        - etc.
        """
        feed_key = f"feed:{user_id}:ranked"

        start = page * page_size
        end = start + page_size - 1

        return self.feed_cache.zrevrange(feed_key, start, end)

    def _hydrate_posts(self, post_ids: List[str]) -> List[Post]:
        """
        Fetch post content with batched cache lookup.

        OPTIMIZATION: Use MGET for batch retrieval
        - 20 individual GETs: ~20ms
        - 1 MGET with 20 keys: ~2ms

        Cache key design for content:
        - key: post:{post_id}
        - value: serialized Post object
        - TTL: 1 hour (content rarely changes)
        """
        # Try local cache first (sub-millisecond)
        posts = {}
        missing_ids = []

        for post_id in post_ids:
            local_key = f"post:{post_id}"
            if local_key in self.local_cache:
                posts[post_id] = self.local_cache[local_key]
            else:
                missing_ids.append(post_id)

        # Batch fetch missing from Redis
        if missing_ids:
            cache_keys = [f"post:{pid}" for pid in missing_ids]
            cached_values = self.content_cache.mget(cache_keys)

            db_missing = []
            for post_id, cached in zip(missing_ids, cached_values):
                if cached:
                    post = Post.deserialize(cached)
                    posts[post_id] = post
                    self.local_cache[f"post:{post_id}"] = post
                else:
                    db_missing.append(post_id)

            # Fetch remaining from database
            if db_missing:
                db_posts = self.post_store.get_batch(db_missing)
                for post in db_posts:
                    posts[post.id] = post
                    # Populate cache
                    self.content_cache.setex(
                        f"post:{post.id}",
                        3600,  # 1 hour TTL
                        post.serialize()
                    )
                    self.local_cache[f"post:{post.id}"] = post

        # Return in original order
        return [posts[pid] for pid in post_ids if pid in posts]

    def invalidate_feed(self, user_id: str, reason: str):
        """
        Invalidate a user's cached feed.

        WHEN TO INVALIDATE:
        - User follows/unfollows someone
        - User changes privacy settings
        - User marks content as not interested
        - New post from high-affinity connection

        WHEN NOT TO INVALIDATE (use append instead):
        - New post from normal connection
        - Engagement updates (likes, comments)
        - These can be appended or handled at read time
        """
        feed_key = f"feed:{user_id}:ranked"

        # Delete the cached feed
        self.feed_cache.delete(feed_key)

        # Track invalidation for monitoring
        self.metrics.increment(
            'feed_cache_invalidation',
            tags={'reason': reason}
        )
```

</div>

### Cache Stampede Prevention

<div style="background: linear-gradient(135deg, #f0883e22 0%, #f0883e11 100%); border: 1px solid #f0883e; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class StampedePreventionCache:
    """
    Prevent thundering herd on cache expiration.

    PROBLEM: When a popular cache entry expires:
    - 1000s of requests hit simultaneously
    - All see cache miss
    - All compute expensive operation
    - Database overwhelmed

    SOLUTIONS implemented here:
    1. Locking (only one request computes)
    2. Probabilistic early refresh
    3. Stale-while-revalidate
    """

    def get_with_lock(self, key: str, compute_fn: Callable, ttl: int) -> Any:
        """
        Solution 1: Distributed locking.

        Only one request computes on cache miss.
        Others wait or return stale data.
        """
        # Try to get from cache
        cached = self.cache.get(key)
        if cached:
            return cached

        # Try to acquire lock
        lock_key = f"lock:{key}"
        lock_acquired = self.cache.set(lock_key, "1", nx=True, ex=10)

        if lock_acquired:
            try:
                # We have the lock - compute and cache
                value = compute_fn()
                self.cache.setex(key, ttl, value)
                return value
            finally:
                self.cache.delete(lock_key)
        else:
            # Another request is computing - wait briefly
            for _ in range(10):
                time.sleep(0.05)  # 50ms
                cached = self.cache.get(key)
                if cached:
                    return cached

            # Timeout - compute anyway (fallback)
            return compute_fn()

    def get_with_early_refresh(self, key: str, compute_fn: Callable, ttl: int) -> Any:
        """
        Solution 2: Probabilistic early refresh.

        Before cache expires, some requests randomly refresh it.
        Spreads recomputation load, prevents thundering herd.

        Formula: refresh_probability = (ttl_remaining / early_window) * base_probability
        """
        cached = self.cache.get(key)
        ttl_remaining = self.cache.ttl(key)

        if cached:
            # Probabilistic early refresh
            early_window = 60  # Start considering refresh 60s before expiry

            if ttl_remaining < early_window:
                # Probability increases as we approach expiration
                refresh_prob = (1 - ttl_remaining / early_window) * 0.1

                if random.random() < refresh_prob:
                    # Refresh in background
                    self._refresh_async(key, compute_fn, ttl)

            return cached

        # Cache miss - compute and cache
        value = compute_fn()
        self.cache.setex(key, ttl, value)
        return value

    def get_stale_while_revalidate(self, key: str, compute_fn: Callable,
                                    ttl: int, stale_ttl: int) -> Any:
        """
        Solution 3: Stale-while-revalidate pattern.

        Keep two TTLs:
        - Fresh TTL: Data is fresh, serve directly
        - Stale TTL: Data is stale but usable, serve while refreshing

        This is what CDNs do with stale-while-revalidate header.
        """
        cache_key = f"data:{key}"
        meta_key = f"meta:{key}"

        cached = self.cache.get(cache_key)
        meta = self.cache.get(meta_key)  # Contains fresh_until timestamp

        if cached:
            if meta and meta['fresh_until'] > time.time():
                # Still fresh
                return cached
            else:
                # Stale but usable - refresh async
                self._refresh_async(key, compute_fn, ttl)
                return cached

        # No cached data - must compute
        value = compute_fn()
        self.cache.setex(cache_key, ttl + stale_ttl, value)
        self.cache.setex(meta_key, ttl + stale_ttl, {
            'fresh_until': time.time() + ttl
        })
        return value
```

</div>

### TAO: Facebook's Graph-Aware Cache

<div style="background: linear-gradient(135deg, #8957e522 0%, #8957e511 100%); border: 1px solid #8957e5; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class TAOCache:
    """
    Simplified TAO (The Associations and Objects) implementation.

    TAO is Facebook's distributed data store optimized for social graph.

    KEY INSIGHTS:
    1. Objects (nodes) and Associations (edges) are first-class citizens
    2. Write-through caching with async replication
    3. Read-after-write consistency via leader forwarding
    4. Extremely high cache hit rate (99.8%+)

    Why TAO exists:
    - Social graphs have predictable access patterns
    - Most queries are: "get friends of X", "get posts by X"
    - Generic databases aren't optimized for these patterns
    """

    def __init__(self):
        # Leader cache: handles writes, ensures consistency
        self.leader_cache = Redis(cluster='leader')

        # Follower caches: handle reads, replicated from leader
        self.follower_caches = [
            Redis(cluster=f'follower_{i}')
            for i in range(5)
        ]

        # Persistent storage
        self.db = MySQL(cluster='social_graph')

    # ===== Object Operations =====

    def get_object(self, object_id: str, object_type: str) -> Dict:
        """
        Get an object (user, post, page, etc.)

        Read path:
        1. Check local follower cache
        2. If miss, fetch from leader (for consistency)
        3. If leader miss, fetch from DB
        """
        cache_key = f"obj:{object_type}:{object_id}"

        # Try follower cache (local, fast)
        follower = self._get_local_follower()
        cached = follower.get(cache_key)
        if cached:
            return json.loads(cached)

        # Try leader cache
        cached = self.leader_cache.get(cache_key)
        if cached:
            # Populate follower cache
            follower.setex(cache_key, 3600, cached)
            return json.loads(cached)

        # Fetch from DB
        obj = self.db.query(
            f"SELECT * FROM {object_type}s WHERE id = %s",
            object_id
        )

        if obj:
            # Write through to leader
            self.leader_cache.setex(cache_key, 3600, json.dumps(obj))
            # Async replicate to followers
            self._replicate_to_followers(cache_key, obj)

        return obj

    def update_object(self, object_id: str, object_type: str, updates: Dict):
        """
        Update an object with write-through caching.

        Write path:
        1. Write to DB (source of truth)
        2. Write to leader cache
        3. Async invalidate follower caches

        CONSISTENCY: Read-after-write guaranteed by reading from leader
        for recently-written data.
        """
        cache_key = f"obj:{object_type}:{object_id}"

        # Write to DB first
        self.db.update(object_type + 's', object_id, updates)

        # Get updated object
        updated = self.db.get(object_type + 's', object_id)

        # Write to leader cache
        self.leader_cache.setex(cache_key, 3600, json.dumps(updated))

        # Async invalidate followers (they'll fetch from leader on next read)
        self._invalidate_followers_async(cache_key)

        return updated

    # ===== Association Operations =====

    def get_associations(self, source_id: str, assoc_type: str,
                         limit: int = 100) -> List[Dict]:
        """
        Get associations (edges) from an object.

        Example: get_associations(user_id, 'friend') -> list of friends

        DATA STRUCTURE: Sorted set for each (source_id, assoc_type)
        - Score: timestamp or sort order
        - Member: destination_id

        This is THE core operation for social graphs.
        Called billions of times per day.
        """
        cache_key = f"assoc:{source_id}:{assoc_type}"

        # Try cache
        cached = self._get_from_any_cache(cache_key)
        if cached:
            return json.loads(cached)[:limit]

        # Fetch from DB
        associations = self.db.query(
            """
            SELECT destination_id, data, timestamp
            FROM associations
            WHERE source_id = %s AND type = %s
            ORDER BY timestamp DESC
            LIMIT %s
            """,
            source_id, assoc_type, limit
        )

        # Cache the result
        self.leader_cache.setex(cache_key, 3600, json.dumps(associations))

        return associations

    def add_association(self, source_id: str, assoc_type: str,
                        dest_id: str, data: Dict = None):
        """
        Add an association (edge).

        Example: add_association(user_a, 'friend', user_b)

        BIDIRECTIONAL: For symmetric relationships (friends),
        we add both directions. Caller handles this.
        """
        cache_key = f"assoc:{source_id}:{assoc_type}"

        # Write to DB
        self.db.insert('associations', {
            'source_id': source_id,
            'type': assoc_type,
            'destination_id': dest_id,
            'data': json.dumps(data) if data else None,
            'timestamp': time.time()
        })

        # Invalidate cache (will be repopulated on next read)
        self.leader_cache.delete(cache_key)
        self._invalidate_followers_async(cache_key)

        # For count caches, increment atomically
        count_key = f"assoc_count:{source_id}:{assoc_type}"
        self.leader_cache.incr(count_key)

    def get_association_count(self, source_id: str, assoc_type: str) -> int:
        """
        Get count of associations (e.g., friend count, follower count).

        Counts are cached separately from the actual list because:
        - Counts are requested more often
        - Counts don't need the full list data
        - Counts can be updated atomically
        """
        count_key = f"assoc_count:{source_id}:{assoc_type}"

        cached = self.leader_cache.get(count_key)
        if cached:
            return int(cached)

        # Compute from DB
        count = self.db.query(
            "SELECT COUNT(*) FROM associations WHERE source_id = %s AND type = %s",
            source_id, assoc_type
        )[0][0]

        self.leader_cache.setex(count_key, 3600, str(count))
        return count
```

**TAO Performance Characteristics**:

| Metric | Value | How Achieved |
|--------|-------|--------------|
| Cache hit rate | 99.8% | Graph locality, pre-fetching |
| Read latency | < 1ms | In-memory cache, optimized data structures |
| Write latency | < 10ms | Write-through, async replication |
| Consistency | Read-after-write | Leader forwarding for recent writes |
| Availability | 99.99% | Multi-datacenter replication |

</div>
</div>

---

## Social Graph Traversal

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Graph Storage Patterns

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Storage Options** (See [[graph-databases]](/topics/databases/graph-databases) for more):

| Approach | Pros | Cons | Use When |
|----------|------|------|----------|
| Adjacency List in RDBMS | Simple, ACID | Slow multi-hop | < 10M edges |
| Redis Sorted Sets | Fast reads, easy scaling | Memory cost | Hot data, < 1B edges |
| Graph DB (Neo4j) | Complex traversals | Operational complexity | Recommendation systems |
| Custom (TAO) | Optimized for social | Build cost | Facebook scale |

</div>

### Efficient Friend-of-Friend Queries

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class SocialGraphService:
    """
    Social graph operations optimized for feed generation.

    KEY INSIGHT: Most feed operations need only 1-hop traversals.
    Friend-of-friend (2-hop) is expensive but rarely needed for feeds.
    """

    def __init__(self):
        self.tao = TAOCache()
        self.follower_count_cache = Redis(cluster='counts')

    def get_friends(self, user_id: str) -> List[str]:
        """
        1-hop: Get direct friends.

        This is the most common operation. Must be < 5ms.

        Implementation: Single cache lookup (TAO association query)
        """
        return self.tao.get_associations(user_id, 'friend')

    def get_friends_of_friends(self, user_id: str, limit: int = 1000) -> List[str]:
        """
        2-hop: Get friends of friends (excluding direct friends).

        Used for: People You May Know, Suggested follows
        NOT used for: Feed generation (too expensive)

        OPTIMIZATION: This is expensive, so we:
        1. Limit first-hop to top 50 friends (by interaction)
        2. Limit second-hop to 50 per friend
        3. Batch all second-hop queries
        4. Deduplicate at the end
        """
        # Get direct friends (limited)
        direct_friends = set(self.get_friends(user_id)[:50])

        # Batch fetch friends-of-friends
        fof_set = set()

        # Batch query all friends' friends lists
        with ThreadPoolExecutor(max_workers=20) as executor:
            futures = {
                executor.submit(self.get_friends, friend_id): friend_id
                for friend_id in direct_friends
            }

            for future in as_completed(futures):
                try:
                    friend_friends = future.result()[:50]
                    fof_set.update(friend_friends)
                except Exception:
                    pass  # Skip failures

        # Remove self and direct friends
        fof_set.discard(user_id)
        fof_set -= direct_friends

        return list(fof_set)[:limit]

    def get_mutual_friends(self, user_a: str, user_b: str) -> List[str]:
        """
        Get mutual friends between two users.

        Used for: Displaying "N mutual friends", ranking suggestions

        OPTIMIZATION: Use set intersection at cache layer

        For Redis: SINTER friends:{user_a} friends:{user_b}
        Single network round trip, O(min(n,m)) complexity
        """
        friends_a = set(self.get_friends(user_a))
        friends_b = set(self.get_friends(user_b))

        return list(friends_a & friends_b)

    def get_mutual_friends_count(self, user_a: str, user_b: str) -> int:
        """
        Get count of mutual friends (without fetching all).

        OPTIMIZATION: Pre-compute for common pairs.

        For high-interaction pairs, cache the count:
        mutual_count:{sorted(user_a, user_b)} -> count
        """
        cache_key = f"mutual_count:{':'.join(sorted([user_a, user_b]))}"

        cached = self.follower_count_cache.get(cache_key)
        if cached:
            return int(cached)

        # Compute
        count = len(self.get_mutual_friends(user_a, user_b))

        # Cache for 1 hour (friendships don't change that often)
        self.follower_count_cache.setex(cache_key, 3600, count)

        return count

    def calculate_affinity(self, viewer_id: str, author_id: str) -> float:
        """
        Calculate relationship strength for ranking.

        Affinity is a 0-1 score representing how "close" two users are.

        Signals used:
        1. Direct connection (friend/following)
        2. Mutual friends count
        3. Interaction history
        4. Profile visits
        5. Time since last interaction
        """
        # Check direct relationship
        is_friend = self._is_friend(viewer_id, author_id)
        is_following = self._is_following(viewer_id, author_id)

        if not is_friend and not is_following:
            return 0.0  # No relationship

        # Get signals from feature store
        mutual_count = self.get_mutual_friends_count(viewer_id, author_id)
        interaction_count = self._get_interaction_count(viewer_id, author_id, days=30)
        days_since_interaction = self._get_days_since_interaction(viewer_id, author_id)

        # Compute affinity score
        # Formula is typically learned from engagement data
        affinity = 0.0

        # Base score for direct connection
        affinity += 0.3 if is_friend else 0.1

        # Mutual friends boost (log scale to avoid domination)
        affinity += 0.2 * math.log1p(mutual_count) / 5.0

        # Interaction recency boost
        affinity += 0.3 * math.log1p(interaction_count) / 4.0

        # Decay based on time since interaction
        recency_decay = 1.0 / (1.0 + days_since_interaction / 7.0)
        affinity += 0.2 * recency_decay

        return min(affinity, 1.0)  # Cap at 1.0
```

</div>

### Graph Partitioning for Scale

<div style="background: linear-gradient(135deg, #f0883e22 0%, #f0883e11 100%); border: 1px solid #f0883e; border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class GraphPartitioningStrategy:
    """
    Partition social graph across multiple shards.

    CHALLENGE: Social graphs are not easily partitionable.
    - Friends are scattered across partitions
    - Any query might need data from multiple partitions

    SOLUTIONS:
    1. User-based sharding (most common)
    2. Geographic sharding (for regional data)
    3. Hybrid with replication of hot edges
    """

    # Strategy 1: Consistent hashing by user ID
    def get_partition_for_user(self, user_id: str) -> int:
        """
        User-based sharding: All of a user's data on one shard.

        PRO: User's own data is always local
        CON: Friend's data requires cross-shard queries

        In practice: Use caching (TAO) to hide cross-shard latency
        """
        hash_value = self._hash(user_id)
        return hash_value % self.NUM_PARTITIONS

    # Strategy 2: Edge colocation
    def get_partition_for_edge(self, source_id: str, dest_id: str) -> int:
        """
        Edge colocation: Store edge with source user.

        Query pattern: Usually fetch all edges from one user.
        "Get all friends of user X" is one partition read.
        "Get all users who friended X" might need all partitions.

        TRADE-OFF: Choose based on access pattern.
        Outgoing edges (friends) stored with source.
        Incoming edges (followers) require reverse index.
        """
        return self.get_partition_for_user(source_id)

    # Strategy 3: Reverse index for incoming edges
    def add_edge_with_reverse(self, source_id: str, dest_id: str, edge_type: str):
        """
        Store edge in two places:
        1. Forward index: (source, type) -> [destinations]
        2. Reverse index: (dest, type) -> [sources]

        Example for "A follows B":
        Forward: following:A -> [B, ...]   (on A's shard)
        Reverse: followers:B -> [A, ...]   (on B's shard)

        This trades write amplification for read locality.
        """
        # Forward edge (user A's outgoing)
        forward_partition = self.get_partition_for_user(source_id)
        self.partitions[forward_partition].add_edge(
            source_id, edge_type, dest_id
        )

        # Reverse edge (user B's incoming)
        reverse_partition = self.get_partition_for_user(dest_id)
        self.partitions[reverse_partition].add_edge(
            dest_id, f"reverse_{edge_type}", source_id
        )
```

**Partition Strategy Comparison**:

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| User-based | Simple, local user data | Cross-shard for friends | Most social apps |
| Edge-based | Locality for edge queries | Complex rebalancing | Graph analytics |
| Geographic | Low latency in region | Complex consistency | Global apps |
| Hybrid | Balanced trade-offs | Complex to implement | Facebook scale |

</div>
</div>

---

## Interview Deep Dive: 3-Level Recursive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border-left: 4px solid #f0883e;">

### Section 1: Fan-out Strategy Questions

<div style="background: linear-gradient(135deg, #23863622 0%, #23863611 100%); border: 1px solid #238636; border-radius: 12px; padding: 24px; margin: 16px 0;">

#### Level 1: "Explain the difference between fan-out-on-write and fan-out-on-read."

**Strong Answer**:

"Fan-out-on-write pushes content to followers' pre-computed feeds at write time. When a user posts, we write the post ID to every follower's feed list. This gives O(1) reads but O(N) writes where N is follower count.

Fan-out-on-read computes the feed at read time by fetching posts from all accounts the user follows. This gives O(1) writes but O(M) reads where M is following count.

The key trade-off is write amplification versus read latency. Push is better for read-heavy workloads with bounded follower counts. Pull is better for write-heavy workloads or when users have millions of followers."

---

#### Level 2: "You mentioned the celebrity problem with push. How exactly does the hybrid model handle a user with 10 million followers posting?"

**Strong Answer**:

"For users above a threshold like 10,000 followers, we don't fan out their posts at write time. Instead, we index the post in a celebrity posts store and pull it at read time.

When a user requests their feed, we:
1. Fetch their pre-computed feed from the push pipeline (posts from normal users they follow)
2. Identify which celebrities they follow
3. Pull recent posts from those celebrities from the celebrity posts cache
4. Merge both sets and rank together

The celebrity posts cache is user-agnostic, meaning one cache entry serves all 10 million followers. This is why pull actually scales better for celebrities. We might get 10 million reads per post, but they all hit the same cache entry.

For super fans who engage frequently with the celebrity, we might still push to them to improve their experience, but that's a small subset."

---

#### Level 3: "What happens if a celebrity's cached posts expire and millions of followers request their feed simultaneously? How do you prevent thundering herd?"

**Strong Answer**:

"This is the cache stampede problem. Several mitigations work together:

**First, probabilistic early refresh**: Before the cache expires, we give some requests a small probability of refreshing it. If TTL is 5 minutes and we're at 4.5 minutes remaining, random requests with 10% probability trigger a background refresh. This spreads the recomputation.

**Second, locking with stale serving**: When cache misses, we try to acquire a distributed lock. Only the winner computes. Others either wait briefly or get stale data if available. We use a soft TTL (data is stale but usable) and hard TTL (data must be refreshed).

**Third, request coalescing**: At the cache layer, multiple concurrent requests for the same key are collapsed into one. We use a promise or future pattern where the first request creates a promise, and subsequent requests await the same promise.

**Fourth, separate freshness tracking**: The content itself has a long TTL, but we track 'fresh_until' separately. This lets us serve 'stale' data while refreshing, following the stale-while-revalidate pattern.

In practice, celebrity posts are so frequently accessed that cache misses are rare. The real scenario is more about handling bursts when a celebrity posts, not cache expiration."

</div>

### Section 2: Ranking Algorithm Questions

<div style="background: linear-gradient(135deg, #1f6feb22 0%, #1f6feb11 100%); border: 1px solid #1f6feb; border-radius: 12px; padding: 24px; margin: 16px 0;">

#### Level 1: "How would you rank posts in a news feed?"

**Strong Answer**:

"I'd use a multi-stage ranking funnel:

1. **Candidate generation**: Collect posts from followed accounts, filter obvious non-starters like seen content or blocked users. This reduces thousands of candidates to hundreds.

2. **Lightweight scoring**: Apply a simple model or heuristic to score candidates. Something like: affinity_with_author * recency_decay * content_type_weight * log(engagement). This reduces to top 50-100.

3. **Final ranking**: Apply a full ML model with rich features including user preferences, content embeddings, interaction history, and context. Rank the top candidates.

4. **Post-processing**: Apply diversity rules (don't show 5 posts from same person consecutively), business rules (ad placement), and freshness boosts.

For a startup, I'd start with just stage 1 and 2 using hand-tuned weights. ML comes later when we have engagement data to train on."

---

#### Level 2: "You mentioned a multi-stage funnel. Why not just apply the full ML model to all candidates?"

**Strong Answer**:

"Latency and cost constraints make it impractical.

Let's do the math: A user might have 1,000 following and each posted 10 times in the last week. That's 10,000 candidate posts. If our full model takes 10ms per candidate, we'd need 100 seconds just for ranking, which is obviously unacceptable.

The funnel approach exploits the fact that we only need the top 20 posts. We don't need to precisely score the 8,000th best post. So we use cheap signals to discard obviously low-quality candidates early.

Stage 1 uses rules costing microseconds per candidate. Stage 2 uses a lightweight model maybe 0.1ms per candidate, like a two-tower embedding dot product. Stage 3 uses the expensive model but only on 50-100 candidates.

Total: rules on 10,000 (10ms) + lightweight on 500 (50ms) + full model on 50 (500ms) equals roughly 560ms, which is acceptable for pre-computation. For real-time serving, we'd cache the results.

There's also a technique called model distillation where we train a smaller model to mimic the expensive model's outputs. The student model runs faster but captures most of the teacher's accuracy."

---

#### Level 3: "Your ranking model needs features like 'interaction history between viewer and author'. How do you compute this feature at serving time without introducing latency?"

**Strong Answer**:

"This is where the feature store comes in. We pre-compute features in batch pipelines and store them for real-time lookup.

For interaction history between users A and B, we have a streaming pipeline that processes engagement events. When A likes, comments, or shares B's content, we update a feature in the store:

```
Key: interaction:{viewer_id}:{author_id}:30d
Value: {likes: 5, comments: 2, shares: 1, last_interaction: timestamp}
```

This runs on a stream processing system like Kafka plus Flink. Events flow in, aggregations update, and results go to a low-latency store like Redis or a specialized feature store like Feast or Tecton.

At serving time, fetching this feature is a simple key-value lookup, under 1ms. We batch multiple feature lookups using MGET.

For sparse pairs where A and B rarely interact, we don't store anything. The absence of data is the feature, meaning no recent interactions.

There's a freshness trade-off: streaming updates have seconds of delay, batch updates might be hours old. For critical features like 'did user just block this person', we might have a real-time check. For interaction history, a few minutes of staleness is acceptable."

</div>

### Section 3: Caching Strategy Questions

<div style="background: linear-gradient(135deg, #8957e522 0%, #8957e511 100%); border: 1px solid #8957e5; border-radius: 12px; padding: 24px; margin: 16px 0;">

#### Level 1: "How would you cache the news feed?"

**Strong Answer**:

"I'd use a multi-layer cache strategy:

**Layer 1 - Client/CDN**: The device or CDN edge caches the next page of feed. When user scrolls, the next page is already there. TTL is short, maybe 1 minute.

**Layer 2 - Feed Cache**: Redis stores the user's pre-computed ranked feed as a sorted set. Key is `feed:{user_id}`, values are post IDs scored by rank. TTL is 5-15 minutes.

**Layer 3 - Content Cache**: Post content is cached separately from feed ordering. Key is `post:{post_id}`, value is the full post object. TTL is 1 hour since content rarely changes.

**Layer 4 - Database**: Source of truth. Only hit on cache misses.

Separating feed ordering from content is crucial. When someone new posts, I might invalidate your feed ordering, but I don't need to invalidate cached post content."

---

#### Level 2: "What happens when a user you follow unfollows you or blocks you? How does this affect the cache?"

**Strong Answer**:

"This is where cache invalidation gets nuanced. Let's break down different scenarios:

**User A unfollows User B**: A's feed cache should stop showing B's posts. But immediate invalidation is expensive. Instead, we filter at read time. When fetching A's feed, we also fetch A's current following list. Posts from users not in that list are filtered out. The feed cache naturally refreshes on TTL, and new generations won't include B.

**User A blocks User B**: More urgent. B's content should disappear immediately from A's feed. We invalidate A's feed cache and add B to a blocked users cache. At read time, we always filter against the blocked list. We also prevent B from seeing A's content going forward.

**User B deletes a post**: We write a tombstone marker and invalidate the post content cache. At feed read time, we filter out tombstones. For push-model feeds, we could asynchronously remove the post ID from affected feeds, but that's expensive. Usually we just let it be filtered at read time.

The principle is: consistency-critical operations like blocks need immediate effect through read-time filtering. Less critical operations like unfollows can be eventually consistent through cache expiration."

---

#### Level 3: "You're caching user-specific feeds. At Facebook scale with 2 billion users, how do you even fit this in memory? What's the storage strategy?"

**Strong Answer**:

"We don't cache everyone's feed. The insight is that most users are not active at any given time.

**Active user caching**: We only maintain cached feeds for users who've been active in the last 30 minutes. When a user opens the app, we check for their cached feed. If missing or stale, we compute and cache it. When they close the app, we let the cache expire naturally.

**Memory budget math**: Let's say 5% of 2B users are active in a 30-minute window. That's 100M users. Each feed stores 500 post IDs at 8 bytes each, that's 4KB per feed. Total: 400GB. That's achievable with a Redis cluster.

**Feed content is separate**: We're only caching post IDs, not content. Post content is cached by post_id, which is user-agnostic. 1 billion posts at 2KB each is 2TB. Still manageable across a cluster.

**Tiered storage**: Hot feeds in memory via Redis. Warm feeds on SSD via RocksDB. Cold feeds recomputed on demand. We track access patterns and demote unused feeds.

**Compression**: Feed lists compress well since they're sorted integers. Run-length encoding or delta encoding can reduce size by 50-70%.

**Geographic distribution**: Users in Europe hit European cache clusters. This reduces cross-region latency and distributes the storage load.

The real scaling secret is that most data is cold. 99.8% cache hit rate means we almost never hit the database. The 0.2% misses are spread across time and easily handled by database capacity."

</div>

### Section 4: Social Graph Questions

<div style="background: linear-gradient(135deg, #f0883e22 0%, #f0883e11 100%); border: 1px solid #f0883e; border-radius: 12px; padding: 24px; margin: 16px 0;">

#### Level 1: "How would you store the social graph for a Facebook-like application?"

**Strong Answer**:

"The social graph has two main entities: nodes like users, pages, and groups, and edges like friendships, follows, and memberships.

For moderate scale up to 100M users, I'd use PostgreSQL with proper indexing:
- Users table for nodes
- Relationships table for edges with source_id, type, dest_id, and timestamps
- Indexes on (source_id, type) for outgoing edge queries

For larger scale, I'd use a dedicated graph-aware system. Options include:
- Neo4j or Amazon Neptune for complex traversals
- Redis sorted sets for high-performance simple queries
- Custom solution like Facebook's TAO for extreme scale

The choice depends on query patterns. If we mostly do one-hop queries like 'get friends', Redis is sufficient and fast. If we need multi-hop traversals like 'friends of friends who also like X', a graph database helps."

---

#### Level 2: "For the 'People You May Know' feature, you need friends-of-friends. How do you make that efficient?"

**Strong Answer**:

"Friends-of-friends is a 2-hop traversal. If a user has 500 friends and each friend has 500 friends, we're potentially looking at 250,000 candidates. This is expensive.

**Optimization 1 - Limit first hop**: Don't fetch ALL friends. Fetch the 50 friends the user interacts with most. This captures the most relevant social circle.

**Optimization 2 - Batch second hop**: Fetch all 50 friends' friend lists in parallel using a connection pool. This turns sequential queries into parallel ones.

**Optimization 3 - Pre-computation**: For active users, pre-compute friend-of-friend suggestions daily in a batch job. Store the top 100 suggestions. At serving time, just fetch the pre-computed list.

**Optimization 4 - Sampling**: Instead of exact computation, sample. Randomly select 20% of friends and 20% of their friends. With enough samples, we get statistically representative results much faster.

**Optimization 5 - Local caching**: Friends lists are relatively stable. Cache them aggressively. The second-hop queries often hit cache.

The key insight is that 'People You May Know' doesn't need to be real-time or exact. A few hours of staleness is fine. Pre-computation during off-peak hours handles most of the work."

---

#### Level 3: "How do you partition the social graph across multiple database shards while maintaining query efficiency for friendship lookups?"

**Strong Answer**:

"Graph partitioning is fundamentally hard because graphs don't partition cleanly. Any edge might cross partition boundaries.

**Strategy 1 - User-based sharding**: Partition by user_id. All of User A's outgoing edges are on A's shard. Simple to implement but cross-shard queries needed for 'who follows A' queries.

**Strategy 2 - Bidirectional edge storage**: Store each edge twice.
- Forward: A's shard stores 'A follows B'
- Reverse: B's shard stores 'B is followed by A'

This trades write amplification for read locality. 'Get who A follows' is one shard. 'Get who follows A' is also one shard. But every follow action writes to two shards.

**Strategy 3 - Caching hides partition boundaries**: With 99.8% cache hit rate, cross-shard queries rarely happen. TAO is essentially a distributed cache that hides the complexity of the underlying MySQL shards.

**Strategy 4 - Locality-aware placement**: Users who interact frequently should be on the same shard. Run graph clustering algorithms offline to identify communities. Place communities together. This is how Facebook does it with their 'Tao Perf' optimization.

**Strategy 5 - Accept some cross-shard queries**: For friend-of-friend, crossing shards is unavoidable. But by batching queries and using parallel fetches, we hide the latency. 50 parallel queries to different shards with 5ms each still complete in 5ms wall-clock time.

The practical answer is: use user-based sharding with bidirectional edges, hide latency with caching, and batch cross-shard queries. This handles 99% of cases. The remaining 1% of complex traversals go to offline processing."

</div>
</div>

---

## Cross-Referenced Concepts

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Related System Design Topics

| Concept | Relevance | Link |
|---------|-----------|------|
| **Caching** | Multi-layer caching for feeds and content | [[caching]](/topics/system-design/caching) |
| **Message Queues** | Async fan-out processing | [[message-queues]](/topics/system-design/message-queues) |
| **Rate Limiting** | Protecting ranking and fan-out services | [[rate-limiting]](/topics/system-design/rate-limiting) |
| **Consistent Hashing** | Graph partitioning, cache distribution | [[consistent-hashing]](/topics/algorithms/consistent-hashing) |
| **CAP Theorem** | Consistency vs availability trade-offs | [[cap-theorem]](/topics/system-design/cap-theorem) |
| **Load Balancing** | Distributing feed requests | [[load-balancing]](/topics/system-design/load-balancing) |
| **CDN** | Edge caching for feed content | [[cdn]](/topics/system-design/cdn) |
| **Graph Databases** | Social graph storage options | [[graph-databases]](/topics/databases/graph-databases) |

### Related System Architectures

| System | Shared Patterns | Link |
|--------|-----------------|------|
| **Twitter Timeline** | Fan-out, ranking, real-time updates | [[twitter]](/topics/system-architectures/twitter) |
| **Instagram Feed** | Photo-heavy ranking, stories | [[instagram]](/topics/system-architectures/instagram) |
| **YouTube Recommendations** | ML ranking, candidate generation | [[youtube]](/topics/system-architectures/youtube) |
| **Notification System** | Fan-out, real-time delivery | [[notification-system]](/topics/system-architectures/notification-system) |

</div>

---

## Design Decision Summary

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #1a1a2e 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border-left: 4px solid #a371f7;">

### When to Use Each Pattern

| Scale | Fan-out | Ranking | Cache | Graph Storage |
|-------|---------|---------|-------|---------------|
| **< 100K users** | Pull only | Chronological or simple scoring | Redis for hot data | PostgreSQL |
| **100K - 1M** | Push for most | Rule-based scoring | Redis cluster | PostgreSQL + Redis |
| **1M - 100M** | Hybrid push/pull | Lightweight ML | Multi-tier cache | Redis + Graph DB |
| **100M+** | Hybrid with dynamic threshold | Full ML pipeline | TAO-like system | Custom distributed |

### Key Trade-offs to Articulate

| Trade-off | Choose A When | Choose B When |
|-----------|---------------|---------------|
| **Push vs Pull** | Bounded follower counts, read-heavy | Celebrity users, write-heavy |
| **Freshness vs Cost** | Users expect real-time | 30-60 seconds delay acceptable |
| **Personalization vs Simplicity** | Ad-supported, engagement critical | Startup, building MVP |
| **Consistency vs Availability** | User's own content | Others' content |
| **Memory vs Compute** | Read latency critical | Memory costs prohibitive |

### Red Flags in Interviews

| Red Flag | Why It's Wrong | Better Answer |
|----------|----------------|---------------|
| "Always use push model" | Ignores celebrity problem | "Hybrid with threshold tuning" |
| "Real-time is required" | Usually not true | "Define freshness SLA first" |
| "Graph DB for everything" | Often overkill | "PostgreSQL until 10M+ edges" |
| "Full ML ranking from start" | No data to train | "Start with rules, add ML later" |
| "Cache everything forever" | Memory and staleness | "Tiered TTL by data type" |

</div>
