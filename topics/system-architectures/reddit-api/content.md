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

<!-- API Gateway Layer -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); text-align: center;">
<div style="font-size: 1.1rem;">API Gateway</div>
<div style="font-size: 0.75rem; opacity: 0.9; margin-top: 4px;">Load Balancer + Rate Limiting</div>
</div>
</div>

<!-- Arrow down -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #64748b;"></div>
</div>

<!-- Core Services Layer -->
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
<div style="font-weight: 600;">POST SERVICE</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">PostgreSQL (sharded)</div>
</div>
<div style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);">
<div style="font-weight: 600;">COMMENT SERVICE</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">PostgreSQL (sharded)</div>
</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
<div style="font-weight: 600;">VOTE SERVICE</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">Redis + Cassandra</div>
</div>
</div>

<!-- Arrow down -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #64748b;"></div>
</div>

<!-- Kafka Event Bus -->
<div style="display: flex; justify-content: center; margin: 20px 0;">
<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 16px 48px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); text-align: center;">
<div style="font-size: 1.1rem;">KAFKA Event Bus</div>
<div style="font-size: 0.75rem; opacity: 0.9; margin-top: 4px;">Async Message Queue</div>
</div>
</div>

<!-- Arrow down -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #64748b;"></div>
</div>

<!-- Consumer Services Layer -->
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);">
<div style="font-weight: 600;">FEED SERVICE</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">Redis + Cassandra</div>
</div>
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
<div style="font-weight: 600;">SEARCH SERVICE</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">Elasticsearch</div>
</div>
<div style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 16px 20px; border-radius: 12px; min-width: 150px; text-align: center; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);">
<div style="font-weight: 600;">NOTIFICATION</div>
<div style="font-size: 0.75rem; margin-top: 8px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">Redis + Firebase</div>
</div>
</div>

</div>

### Feed Generation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">FEED RANKING ALGORITHM</h4>

<!-- Hot Score Algorithm Formula -->
<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px; color: #e2e8f0; font-family: monospace;">
<div style="font-weight: 600; color: #f59e0b; margin-bottom: 16px;">Hot Score Algorithm (Reddit-style):</div>
<div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
<span style="color: #22c55e;">score</span> = log10(max(|ups - downs|, 1))
</div>
<div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
<span style="color: #3b82f6;">order</span> = sign(ups - downs)
</div>
<div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
<span style="color: #a855f7;">seconds</span> = epoch_seconds(created_at) - 1134028003
</div>
<div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px;">
<span style="color: #ef4444;">hot_score</span> = round(score + order * seconds / 45000, 7)
</div>
</div>

<!-- Hot Score Factors Box -->
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px;">
<div style="font-weight: 700; color: #92400e; text-align: center; margin-bottom: 16px; font-size: 1.1rem;">HOT SCORE FACTORS</div>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #22c55e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">+</div>
<div style="color: #78350f;"><strong>Vote Score:</strong> Higher = Better</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">&#9201;</div>
<div style="color: #78350f;"><strong>Time Decay:</strong> Newer = Better</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #a855f7; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">&#8644;</div>
<div style="color: #78350f;"><strong>Controversy:</strong> Balanced = Featured</div>
</div>
</div>
</div>

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

<!-- Comment Tree Structure Diagram -->
<div style="margin-bottom: 24px;">
<div style="font-weight: 600; color: #1e293b; margin-bottom: 16px;">Comment Tree Structure:</div>

<!-- Post -->
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; font-weight: 500;">
Post: "What's your favorite programming language?"
</div>

<!-- Comment 1 -->
<div style="margin-left: 0; border-left: 3px solid #22c55e; padding-left: 16px; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #166534; font-weight: 600;">Comment 1</span>
<span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">depth: 0</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">score: 150</span>
</div>
<!-- Reply 1.1 -->
<div style="margin-left: 20px; border-left: 3px solid #a855f7; padding-left: 16px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 8px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #7c3aed; font-weight: 500;">Reply 1.1</span>
<span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">depth: 1</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">score: 45</span>
</div>
<!-- Reply 1.1.1 -->
<div style="margin-left: 20px; border-left: 3px solid #ec4899; padding-left: 16px; margin-top: 6px;">
<div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 6px 10px; border-radius: 8px; display: inline-flex; align-items: center; gap: 10px; font-size: 0.9rem;">
<span style="color: #be185d; font-weight: 500;">Reply 1.1.1</span>
<span style="background: #ec4899; color: white; padding: 2px 6px; border-radius: 12px; font-size: 0.65rem;">depth: 2</span>
<span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 12px; font-size: 0.65rem;">score: 12</span>
</div>
</div>
</div>
<!-- Reply 1.2 -->
<div style="margin-left: 20px; border-left: 3px solid #a855f7; padding-left: 16px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 8px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #7c3aed; font-weight: 500;">Reply 1.2</span>
<span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">depth: 1</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">score: 30</span>
</div>
</div>
</div>

<!-- Comment 2 -->
<div style="margin-left: 0; border-left: 3px solid #22c55e; padding-left: 16px; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #166534; font-weight: 600;">Comment 2</span>
<span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">depth: 0</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">score: 120</span>
</div>
<!-- Reply 2.1 -->
<div style="margin-left: 20px; border-left: 3px solid #a855f7; padding-left: 16px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 8px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #7c3aed; font-weight: 500;">Reply 2.1</span>
<span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">depth: 1</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">score: 25</span>
</div>
</div>
</div>

<!-- Comment 3 -->
<div style="margin-left: 0; border-left: 3px solid #22c55e; padding-left: 16px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px;">
<span style="color: #166534; font-weight: 600;">Comment 3</span>
<span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">depth: 0</span>
<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">score: 80</span>
</div>
</div>
</div>

<!-- Storage Strategy -->
<div style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border: 2px solid #0ea5e9; border-radius: 12px; padding: 16px;">
<div style="font-weight: 700; color: #0369a1; margin-bottom: 12px;">Storage Strategy:</div>
<div style="display: flex; flex-direction: column; gap: 8px; color: #0c4a6e;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #0ea5e9; color: white; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">/1/1.1/1.1.1</span>
<span>Materialized Path</span>
</div>
<div>Allows efficient subtree queries</div>
<div>Easy depth calculation</div>
</div>
</div>

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

<!-- Global Reddit Infrastructure Diagram -->
<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 24px; border: 3px solid #475569;">
<div style="text-align: center; color: #f1f5f9; font-weight: 700; font-size: 1.2rem; margin-bottom: 20px;">GLOBAL REDDIT INFRASTRUCTURE</div>

<!-- Global Traffic Manager -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 14px 28px; border-radius: 10px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">
<div>Global Traffic Manager</div>
</div>
</div>

<!-- Arrow down -->
<div style="display: flex; justify-content: center; margin: 12px 0;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #94a3b8;"></div>
</div>

<!-- Regional Clusters -->
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 24px;">
<!-- US-EAST -->
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; padding: 16px; min-width: 140px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
<div style="color: white; font-weight: 700; text-align: center; margin-bottom: 12px;">US-EAST</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; margin-bottom: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">EKS Cluster</div>
</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">Cassandra</div>
<div style="color: rgba(255,255,255,0.8); font-size: 0.7rem;">(Multi-Master)</div>
</div>
</div>

<!-- EU-WEST -->
<div style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); border-radius: 12px; padding: 16px; min-width: 140px; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);">
<div style="color: white; font-weight: 700; text-align: center; margin-bottom: 12px;">EU-WEST</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; margin-bottom: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">EKS Cluster</div>
</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">Cassandra</div>
<div style="color: rgba(255,255,255,0.8); font-size: 0.7rem;">Replica</div>
</div>
</div>

<!-- AP-EAST -->
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; padding: 16px; min-width: 140px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
<div style="color: white; font-weight: 700; text-align: center; margin-bottom: 12px;">AP-EAST</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; margin-bottom: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">EKS Cluster</div>
</div>
<div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px; text-align: center;">
<div style="color: white; font-size: 0.85rem; font-weight: 500;">Cassandra</div>
<div style="color: rgba(255,255,255,0.8); font-size: 0.7rem;">Replica</div>
</div>
</div>
</div>

<!-- Replication arrows -->
<div style="display: flex; justify-content: center; gap: 60px; margin-bottom: 20px;">
<div style="color: #94a3b8; font-size: 0.8rem;">&#8644; Replication &#8644;</div>
</div>

<!-- Global Services -->
<div style="background: linear-gradient(135deg, #475569 0%, #334155 100%); border-radius: 12px; padding: 16px; border: 2px solid #64748b;">
<div style="color: #f1f5f9; font-weight: 600; text-align: center; margin-bottom: 12px;">GLOBAL SERVICES</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 500;">Kafka (Global)</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 500;">S3 (Global)</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 500;">Aurora Global</div>
<div style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 500;">Redis Global</div>
</div>
</div>
</div>

</div>

### Vote Aggregation at Scale

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">HIGH-THROUGHPUT VOTING SYSTEM</h4>

<!-- Vote Flow Diagram -->
<div style="margin-bottom: 24px;">
<div style="text-align: center; color: #64748b; font-weight: 500; margin-bottom: 16px;">Vote Flow (2B votes/day = 23K votes/second)</div>

<!-- Client -->
<div style="display: flex; justify-content: center; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 24px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
<div style="font-weight: 600;">Client</div>
<div style="font-size: 0.8rem; opacity: 0.9;">(Vote +1)</div>
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #64748b;"></div>
</div>

<!-- Vote Service with annotation -->
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 12px 24px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
<div style="font-weight: 600;">Vote Service</div>
<div style="font-size: 0.8rem; opacity: 0.9;">(Stateless)</div>
</div>
<div style="background: #dcfce7; padding: 8px 12px; border-radius: 8px; border-left: 3px solid #22c55e; font-size: 0.85rem; color: #166534;">
Optimistic update to Redis<br/>(immediate response)
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #64748b;"></div>
</div>

<!-- Kafka Topic with annotation -->
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 12px 24px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
<div style="font-weight: 600;">Kafka Topic</div>
<div style="font-size: 0.8rem; opacity: 0.9;">(Buffer)</div>
</div>
<div style="background: #fee2e2; padding: 8px 12px; border-radius: 8px; border-left: 3px solid #ef4444; font-size: 0.85rem; color: #991b1b;">
votes.raw<br/>(partitioned by post_id)
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #64748b;"></div>
</div>

<!-- Vote Aggregator with annotation -->
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white; padding: 12px 24px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);">
<div style="font-weight: 600;">Vote Aggregator</div>
</div>
<div style="background: #f3e8ff; padding: 8px 12px; border-radius: 8px; border-left: 3px solid #a855f7; font-size: 0.85rem; color: #6b21a8;">
Micro-batch aggregation<br/>(every 100ms)
</div>
</div>

<!-- Arrow -->
<div style="display: flex; justify-content: center; margin: 8px 0;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #64748b;"></div>
</div>

<!-- Storage Layer -->
<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 12px 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
<div style="font-weight: 600;">Cassandra</div>
<div style="font-size: 0.8rem; opacity: 0.9;">(Persist)</div>
</div>
<div style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: white; padding: 12px 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);">
<div style="font-weight: 600;">Redis</div>
<div style="font-size: 0.8rem; opacity: 0.9;">(Cache)</div>
</div>
</div>

<!-- Benefits -->
<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 16px;">
<div style="font-weight: 700; color: #166534; margin-bottom: 8px;">Benefits:</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px;">
<div style="display: flex; align-items: center; gap: 6px; color: #166534;">
<span style="color: #22c55e;">&#10003;</span> Immediate feedback (optimistic)
</div>
<div style="display: flex; align-items: center; gap: 6px; color: #166534;">
<span style="color: #22c55e;">&#10003;</span> High throughput (batching)
</div>
<div style="display: flex; align-items: center; gap: 6px; color: #166534;">
<span style="color: #22c55e;">&#10003;</span> Eventual consistency (acceptable)
</div>
</div>
</div>
</div>

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

<!-- Vote Consistency Diagram -->
<div style="margin-bottom: 16px;">
<div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); padding: 10px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<span style="font-weight: 600; color: #991b1b;">Problem:</span>
<span style="color: #7f1d1d;"> Duplicate votes from race conditions</span>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<span style="font-weight: 600; color: #166534;">Solution:</span>
<span style="color: #14532d;"> Idempotency key</span>
</div>
</div>

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 20px; color: #e2e8f0; font-family: monospace; font-size: 0.9rem;">
<div style="color: #a855f7; font-weight: 600; margin-bottom: 12px;">Vote Request:</div>
<div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
<div>{</div>
<div style="padding-left: 16px;"><span style="color: #3b82f6;">"user_id"</span>: <span style="color: #22c55e;">"u123"</span>,</div>
<div style="padding-left: 16px;"><span style="color: #3b82f6;">"target"</span>: <span style="color: #22c55e;">"post:456"</span>,</div>
<div style="padding-left: 16px;"><span style="color: #3b82f6;">"value"</span>: <span style="color: #f59e0b;">1</span>,</div>
<div style="padding-left: 16px;"><span style="color: #3b82f6;">"idempotency_key"</span>: <span style="color: #22c55e;">"u123:post:456:v1"</span> <span style="color: #f59e0b;">&larr; unique key</span></div>
<div>}</div>
</div>
<div style="color: #ec4899; font-weight: 600; margin-bottom: 8px;">Redis:</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
<code style="background: rgba(34, 197, 94, 0.2); padding: 4px 8px; border-radius: 4px;">SETNX idempotency:u123:post:456:v1</code>
<span style="color: #22c55e; font-weight: 600;">&rarr; 1 (success)</span>
</div>
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
<code style="background: rgba(239, 68, 68, 0.2); padding: 4px 8px; border-radius: 4px;">SETNX idempotency:u123:post:456:v1</code>
<span style="color: #ef4444; font-weight: 600;">&rarr; 0 (duplicate)</span>
</div>
</div>
</div>
</div>

</div>

### 2. Hot Posts Problem

<!-- Hot Posts Handling Diagram -->
<div style="margin-bottom: 16px;">
<div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 10px 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
<span style="font-weight: 600; color: #92400e;">Scenario:</span>
<span style="color: #78350f;"> Viral post with 100K comments/minute</span>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 10px 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
<span style="font-weight: 600; color: #1e40af;">Solution:</span>
<span style="color: #1e3a8a;"> Tiered caching + sampling</span>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 12px; text-align: center; font-weight: 700;">HOT POST HANDLING</div>

<!-- Tier 1 -->
<div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Tier 1</div>
<div style="color: #166534; font-weight: 600;">Edge Cache (30s TTL)</div>
</div>
<div style="display: flex; gap: 8px; margin-left: 24px; flex-wrap: wrap;">
<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Top 100 comments</span>
<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Score approximation</span>
</div>
</div>

<!-- Tier 2 -->
<div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Tier 2</div>
<div style="color: #92400e; font-weight: 600;">Regional Cache (5min TTL)</div>
</div>
<div style="display: flex; gap: 8px; margin-left: 24px; flex-wrap: wrap;">
<span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Full comment tree</span>
<span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Accurate scores</span>
</div>
</div>

<!-- Tier 3 -->
<div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Tier 3</div>
<div style="color: #1e40af; font-weight: 600;">Database</div>
</div>
<div style="display: flex; gap: 8px; margin-left: 24px;">
<span style="background: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Source of truth</span>
</div>
</div>

<!-- Comment sampling -->
<div style="padding: 16px; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
<div style="color: #7c3aed; font-weight: 600; margin-bottom: 8px;">Comment sampling for display:</div>
<div style="display: flex; flex-direction: column; gap: 6px; color: #6b21a8; font-size: 0.9rem;">
<div>&bull; Show top 200 only</div>
<div>&bull; "Load more" fetches from cache</div>
<div>&bull; Real-time updates via WebSocket</div>
</div>
</div>
</div>
</div>

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

<!-- Alternatives Analysis Diagram -->
<div style="margin-top: 16px;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 16px; font-size: 1.1rem;">Alternatives Analysis:</div>

<!-- Adjacency List -->
<div style="border-left: 3px solid #64748b; padding-left: 16px; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 8px;">
<div style="font-weight: 600; color: #334155; margin-bottom: 8px;">Adjacency List (parent_id only)</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">Simple writes</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">CON</span>
<span style="color: #991b1b;">Recursive queries for tree loading (N+1 or CTE)</span>
</div>
<div style="color: #64748b; font-style: italic; margin-top: 4px;">Good for: &lt; 100K comments, shallow nesting</div>
</div>
</div>
</div>

<!-- Nested Sets -->
<div style="border-left: 3px solid #64748b; padding-left: 16px; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 8px;">
<div style="font-weight: 600; color: #334155; margin-bottom: 8px;">Nested Sets (left/right integers)</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">CON</span>
<span style="color: #991b1b;">Expensive writes (rebalancing)</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">Single query for subtrees</span>
</div>
<div style="color: #64748b; font-style: italic; margin-top: 4px;">Good for: Read-heavy, rarely-changing trees</div>
</div>
</div>
</div>

<!-- Closure Table -->
<div style="border-left: 3px solid #64748b; padding-left: 16px; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 12px 16px; border-radius: 8px;">
<div style="font-weight: 600; color: #334155; margin-bottom: 8px;">Closure Table (ancestor/descendant pairs)</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">CON</span>
<span style="color: #991b1b;">O(depth) storage overhead</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">Fast subtree queries</span>
</div>
<div style="color: #64748b; font-style: italic; margin-top: 4px;">Good for: Deep trees with frequent subtree operations</div>
</div>
</div>
</div>

<!-- Materialized Path - CHOSEN -->
<div style="border-left: 4px solid #22c55e; padding-left: 16px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 16px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="font-weight: 700; color: #166534;">Materialized Path ("/1/2/3/")</div>
<span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">CHOSEN</span>
</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">Single-query subtree (LIKE 'path%')</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">Easy depth calculation (count slashes)</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">PRO</span>
<span style="color: #166534;">No joins needed</span>
</div>
<div style="background: rgba(255,255,255,0.6); padding: 8px 12px; border-radius: 6px; margin-top: 8px; color: #78350f;">
<strong>Trade-off:</strong> Path length limits, string operations
</div>
</div>
</div>
</div>
</div>

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
