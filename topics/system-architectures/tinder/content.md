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

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

  <!-- Mobile Apps -->
  <div style="background: linear-gradient(135deg, #fe3c72 0%, #ff6b6b 100%); border-radius: 12px; padding: 16px 32px; text-align: center; box-shadow: 0 4px 15px rgba(254, 60, 114, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 14px;">Mobile Apps</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 12px;">iOS | Android</div>
  </div>

  <!-- Connection Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: 3px; height: 20px; background: linear-gradient(to bottom, #fe3c72, #58a6ff);"></div>
    <div style="color: #8b949e; font-size: 11px; padding: 4px 8px; background: #21262d; border-radius: 4px;">REST + WebSocket</div>
    <div style="width: 3px; height: 20px; background: linear-gradient(to bottom, #58a6ff, #58a6ff);"></div>
    <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>
  </div>

  <!-- API Gateway -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 48px; text-align: center; box-shadow: 0 4px 15px rgba(31, 111, 235, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 14px;">API GATEWAY</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Auth, Rate Limit</div>
  </div>

  <!-- Arrow down -->
  <div style="width: 3px; height: 30px; background: #58a6ff;"></div>

  <!-- Services Row -->
  <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">

    <!-- Profile Service -->
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px; min-width: 160px; text-align: center; box-shadow: 0 4px 15px rgba(35, 134, 54, 0.3);">
      <div style="color: white; font-weight: bold; font-size: 14px; margin-bottom: 8px;">PROFILE SERVICE</div>
      <div style="color: rgba(255,255,255,0.85); font-size: 12px; text-align: left;">
        <div>- Photos</div>
        <div>- Bio</div>
        <div>- Preferences</div>
      </div>
    </div>

    <!-- Discovery Service -->
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px; min-width: 160px; text-align: center; box-shadow: 0 4px 15px rgba(137, 87, 229, 0.3);">
      <div style="color: white; font-weight: bold; font-size: 14px; margin-bottom: 8px;">DISCOVERY SERVICE</div>
      <div style="color: rgba(255,255,255,0.85); font-size: 12px; text-align: left;">
        <div>- Recommend</div>
        <div>- Filter</div>
        <div>- Location</div>
      </div>
    </div>

    <!-- Matching Service -->
    <div style="background: linear-gradient(135deg, #f0883e 0%, #f9a825 100%); border-radius: 12px; padding: 20px; min-width: 160px; text-align: center; box-shadow: 0 4px 15px rgba(240, 136, 62, 0.3);">
      <div style="color: white; font-weight: bold; font-size: 14px; margin-bottom: 8px;">MATCHING SERVICE</div>
      <div style="color: rgba(255,255,255,0.85); font-size: 12px; text-align: left;">
        <div>- Like/Pass</div>
        <div>- Match check</div>
        <div>- Notify</div>
      </div>
    </div>

  </div>

  <!-- Arrow down -->
  <div style="width: 3px; height: 20px; background: #58a6ff;"></div>

  <!-- Chat Service -->
  <div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 20px; min-width: 180px; text-align: center; box-shadow: 0 4px 15px rgba(218, 54, 51, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 14px; margin-bottom: 8px;">CHAT SERVICE</div>
    <div style="color: rgba(255,255,255,0.85); font-size: 12px; text-align: left; display: inline-block;">
      <div>- Messages</div>
      <div>- Read receipts</div>
      <div>- Media</div>
    </div>
  </div>

  <!-- Arrow down -->
  <div style="width: 3px; height: 20px; background: #58a6ff;"></div>

  <!-- Kafka -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #484f58; border-radius: 12px; padding: 16px 48px; text-align: center;">
    <div style="color: #58a6ff; font-weight: bold; font-size: 14px;">KAFKA</div>
    <div style="color: #8b949e; font-size: 11px;">Event Streaming</div>
  </div>

</div>

</div>

---

## Discovery Algorithm

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">RECOMMENDATION ENGINE</h4>

<div style="border: 2px solid #f0883e; border-radius: 12px; overflow: hidden;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #f0883e 0%, #f9a825 100%); padding: 12px 20px; text-align: center;">
    <span style="color: white; font-weight: bold; font-size: 16px;">TINDER RECOMMENDATION PIPELINE</span>
  </div>

  <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">

    <!-- Step 1 -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 20px; border-left: 4px solid #238636;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #238636; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">1</div>
        <span style="color: #238636; font-weight: bold; font-size: 15px;">CANDIDATE GENERATION</span>
      </div>
      <div style="color: #c9d1d9; font-size: 13px; line-height: 1.6;">
        <div style="margin-bottom: 8px;"><strong style="color: #8b949e;">Filter by:</strong></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; padding-left: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #238636;">&#9679;</span> Location (within radius preference)</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #238636;">&#9679;</span> Age range (user preference)</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #238636;">&#9679;</span> Gender preference</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #238636;">&#9679;</span> Not already swiped</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #238636;">&#9679;</span> Not blocked/reported</div>
        </div>
        <div style="margin-top: 12px; background: #238636; color: white; padding: 8px 16px; border-radius: 6px; display: inline-block; font-size: 12px;">
          Result: ~1,000-10,000 candidates
        </div>
      </div>
    </div>

    <!-- Arrow -->
    <div style="display: flex; justify-content: center;">
      <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #8957e5;"></div>
    </div>

    <!-- Step 2 -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 20px; border-left: 4px solid #8957e5;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #8957e5; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">2</div>
        <span style="color: #a371f7; font-weight: bold; font-size: 15px;">SCORING</span>
      </div>
      <div style="color: #c9d1d9; font-size: 13px; line-height: 1.6;">
        <div style="margin-bottom: 12px;"><strong style="color: #8b949e;">For each candidate, calculate score:</strong></div>
        <div style="background: #161b22; border-radius: 8px; padding: 12px 16px; font-family: monospace; font-size: 12px; margin-bottom: 16px;">
          <span style="color: #79c0ff;">score</span> = w1 * <span style="color: #ffa657;">elo_compatibility</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + w2 * <span style="color: #ffa657;">recency_boost</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + w3 * <span style="color: #ffa657;">activity_level</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + w4 * <span style="color: #ffa657;">mutual_interests</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + w5 * <span style="color: #ffa657;">photo_quality_score</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + w6 * <span style="color: #ffa657;">profile_completeness</span>
        </div>
        <div style="background: rgba(137, 87, 229, 0.15); border: 1px solid #8957e5; border-radius: 8px; padding: 12px;">
          <div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">ELO System:</div>
          <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px;">
            <div>&#8226; Each user has a hidden "desirability" score</div>
            <div>&#8226; Updated based on who swipes right on them</div>
            <div>&#8226; Similar ELO users shown to each other</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Arrow -->
    <div style="display: flex; justify-content: center;">
      <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #1f6feb;"></div>
    </div>

    <!-- Step 3 -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 20px; border-left: 4px solid #1f6feb;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1f6feb; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">3</div>
        <span style="color: #58a6ff; font-weight: bold; font-size: 15px;">RANKING & DIVERSITY</span>
      </div>
      <div style="color: #c9d1d9; font-size: 13px; line-height: 1.8;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">&#9679;</span> Shuffle top candidates slightly (avoid stale stack)</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">&#9679;</span> Boost users who liked you first (increase match rate)</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">&#9679;</span> Add variety (don't show all similar profiles)</div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">&#9679;</span> Premium users get slight boost</div>
        </div>
      </div>
    </div>

  </div>
</div>

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

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

  <!-- API Gateway -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 40px; text-align: center; box-shadow: 0 4px 15px rgba(31, 111, 235, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 15px;">API Gateway</div>
  </div>

  <!-- Arrow -->
  <div style="width: 3px; height: 24px; background: #58a6ff;"></div>

  <!-- Core Services Row -->
  <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

    <!-- Profile Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #238636; border-radius: 12px; padding: 20px; min-width: 150px; text-align: center;">
      <div style="color: #238636; font-weight: bold; font-size: 13px; margin-bottom: 12px;">PROFILE SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="background: #238636; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">PostgreSQL</div>
        <div style="background: #238636; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">S3 (photos)</div>
      </div>
    </div>

    <!-- Discovery Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #8957e5; border-radius: 12px; padding: 20px; min-width: 150px; text-align: center;">
      <div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 12px;">DISCOVERY SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="background: #8957e5; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Elasticsearch</div>
        <div style="background: #8957e5; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Redis Geo</div>
      </div>
    </div>

    <!-- Matching Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; min-width: 150px; text-align: center;">
      <div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 12px;">MATCHING SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="background: #f0883e; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Redis</div>
        <div style="background: #f0883e; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px;">PostgreSQL</div>
      </div>
    </div>

  </div>

  <!-- Arrow -->
  <div style="width: 3px; height: 24px; background: #58a6ff;"></div>

  <!-- Kafka -->
  <div style="background: linear-gradient(135deg, #30363d 0%, #484f58 100%); border-radius: 12px; padding: 14px 60px; text-align: center; border: 2px solid #58a6ff;">
    <div style="color: #58a6ff; font-weight: bold; font-size: 15px;">Kafka</div>
    <div style="color: #8b949e; font-size: 11px;">Event Bus</div>
  </div>

  <!-- Arrow -->
  <div style="width: 3px; height: 24px; background: #58a6ff;"></div>

  <!-- Consumer Services Row -->
  <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

    <!-- Chat Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #da3633; border-radius: 12px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 10px;">CHAT SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="background: #da3633; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Cassandra</div>
        <div style="background: #da3633; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Redis</div>
      </div>
    </div>

    <!-- ML Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #a371f7; font-weight: bold; font-size: 12px; margin-bottom: 10px;">ML SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="background: #8957e5; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px;">PyTorch</div>
      </div>
    </div>

    <!-- Notification Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 16px; min-width: 120px; text-align: center;">
      <div style="color: #3fb950; font-weight: bold; font-size: 12px; margin-bottom: 10px;">NOTIF. SERVICE</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="background: #238636; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px;">FCM / APNS</div>
      </div>
    </div>

  </div>

</div>

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

<div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="color: #58a6ff; font-weight: bold; font-size: 15px; margin-bottom: 20px; text-align: center;">Match Detection Flow</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

  <!-- Trigger -->
  <div style="background: linear-gradient(135deg, #fe3c72 0%, #ff6b6b 100%); border-radius: 10px; padding: 14px 28px; text-align: center; box-shadow: 0 4px 15px rgba(254, 60, 114, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 13px;">User A swipes right on User B</div>
  </div>

  <!-- Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: 3px; height: 16px; background: #58a6ff;"></div>
    <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #58a6ff;"></div>
  </div>

  <!-- Check Step -->
  <div style="background: #161b22; border: 2px solid #8957e5; border-radius: 10px; padding: 20px; max-width: 400px; width: 100%;">
    <div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Check if B already liked A</div>
    <div style="background: #0d1117; border-radius: 6px; padding: 10px 14px; font-family: monospace; font-size: 12px; color: #79c0ff; margin-bottom: 12px;">
      Redis: ZSCORE likes:{B} {A}
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); color: white; padding: 8px 16px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 12px;">
      If exists → IT'S A MATCH!
    </div>
  </div>

  <!-- Conditional Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="color: #8b949e; font-size: 11px; background: #21262d; padding: 4px 10px; border-radius: 4px;">(if match)</div>
    <div style="width: 3px; height: 12px; background: #3fb950;"></div>
    <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #3fb950;"></div>
  </div>

  <!-- Match Actions -->
  <div style="background: #161b22; border: 2px solid #3fb950; border-radius: 10px; padding: 20px; max-width: 400px; width: 100%;">
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #238636; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">1</div>
        <span style="color: #c9d1d9; font-size: 13px;">Create match record</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #238636; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">2</div>
        <span style="color: #c9d1d9; font-size: 13px;">Create chat conversation</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #238636; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">3</div>
        <span style="color: #c9d1d9; font-size: 13px;">Publish to Kafka: <code style="background: #0d1117; padding: 2px 6px; border-radius: 4px; color: #79c0ff;">match_events</code></span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #238636; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">4</div>
        <span style="color: #c9d1d9; font-size: 13px;">Notification service sends push to both users</span>
      </div>
    </div>
  </div>

</div>

</div>

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

<div style="color: #a371f7; font-weight: bold; font-size: 16px; text-align: center; margin-bottom: 24px;">TINDER GLOBAL ARCHITECTURE</div>

<div style="border: 2px solid #484f58; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 24px;">

  <!-- Edge Layer -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #58a6ff; border-radius: 10px; padding: 20px;">
    <div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center;">EDGE LAYER</div>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <div style="background: #161b22; border: 1px solid #58a6ff; border-radius: 6px; padding: 10px 20px; color: #c9d1d9; font-size: 12px;">CDN for profile photos</div>
      <div style="background: #161b22; border: 1px solid #58a6ff; border-radius: 6px; padding: 10px 20px; color: #c9d1d9; font-size: 12px;">Edge caching for discovery results</div>
    </div>
  </div>

  <!-- Arrow -->
  <div style="display: flex; justify-content: center;">
    <div style="width: 3px; height: 20px; background: #8957e5;"></div>
  </div>

  <!-- Regional Clusters -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #8957e5; border-radius: 10px; padding: 20px;">
    <div style="color: #a371f7; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">REGIONAL CLUSTERS</div>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">

      <!-- US-WEST -->
      <div style="background: #161b22; border: 2px solid #238636; border-radius: 8px; padding: 16px; min-width: 140px;">
        <div style="color: #3fb950; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 10px;">US-WEST</div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #8b949e;">
          <div>Discovery</div>
          <div>Match</div>
          <div>Chat</div>
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #30363d; color: #238636;">Cassandra (regional)</div>
        </div>
      </div>

      <!-- EU-WEST -->
      <div style="background: #161b22; border: 2px solid #1f6feb; border-radius: 8px; padding: 16px; min-width: 140px;">
        <div style="color: #58a6ff; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 10px;">EU-WEST</div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #8b949e;">
          <div>Discovery</div>
          <div>Match</div>
          <div>Chat</div>
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #30363d; color: #1f6feb;">Cassandra (regional)</div>
        </div>
      </div>

      <!-- AP-SOUTH -->
      <div style="background: #161b22; border: 2px solid #f0883e; border-radius: 8px; padding: 16px; min-width: 140px;">
        <div style="color: #f0883e; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 10px;">AP-SOUTH</div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #8b949e;">
          <div>Discovery</div>
          <div>Match</div>
          <div>Chat</div>
          <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #30363d; color: #f0883e;">Cassandra (regional)</div>
        </div>
      </div>

    </div>
  </div>

  <!-- Arrow -->
  <div style="display: flex; justify-content: center;">
    <div style="width: 3px; height: 20px; background: #fe3c72;"></div>
  </div>

  <!-- Global Layer -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #fe3c72; border-radius: 10px; padding: 20px;">
    <div style="color: #fe3c72; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">GLOBAL LAYER</div>
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #161b22 0%, #21262d 100%); border: 2px solid #da3633; border-radius: 8px; padding: 14px 20px; text-align: center;">
        <div style="color: #f85149; font-weight: bold; font-size: 12px;">User Profiles</div>
        <div style="color: #8b949e; font-size: 10px;">(Global)</div>
      </div>
      <div style="background: linear-gradient(135deg, #161b22 0%, #21262d 100%); border: 2px solid #238636; border-radius: 8px; padding: 14px 20px; text-align: center;">
        <div style="color: #3fb950; font-weight: bold; font-size: 12px;">Payment Service</div>
        <div style="color: #8b949e; font-size: 10px;">(Stripe)</div>
      </div>
      <div style="background: linear-gradient(135deg, #161b22 0%, #21262d 100%); border: 2px solid #a371f7; border-radius: 8px; padding: 14px 20px; text-align: center;">
        <div style="color: #a371f7; font-weight: bold; font-size: 12px;">Analytics</div>
        <div style="color: #8b949e; font-size: 10px;">(Spark)</div>
      </div>
    </div>
  </div>

</div>

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

<div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.15); border: 1px solid #f85149; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
  <span style="color: #f85149; font-weight: bold;">Problem:</span>
  <span style="color: #c9d1d9;"> Both users swipe right simultaneously</span>
</div>

<!-- Two Users Flow -->
<div style="display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">

  <!-- User A Flow -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); color: white; padding: 10px 24px; border-radius: 8px; font-weight: bold; font-size: 13px;">User A</div>
    <div style="width: 2px; height: 12px; background: #58a6ff;"></div>
    <div style="color: #8b949e; font-size: 11px; text-align: center;">Swipe right on B</div>
    <div style="width: 2px; height: 12px; background: #58a6ff;"></div>
    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #58a6ff;"></div>
    <div style="background: #161b22; border: 2px solid #8957e5; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #a371f7; font-size: 12px;">Check B liked A?</div>
    </div>
    <div style="width: 2px; height: 12px; background: #da3633;"></div>
    <div style="color: #f85149; font-size: 11px;">No (not yet in DB)</div>
    <div style="width: 2px; height: 12px; background: #da3633;"></div>
    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #da3633;"></div>
    <div style="background: #161b22; border: 2px solid #f0883e; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #f0883e; font-size: 12px;">Store like</div>
    </div>
  </div>

  <!-- User B Flow -->
  <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); color: white; padding: 10px 24px; border-radius: 8px; font-weight: bold; font-size: 13px;">User B</div>
    <div style="width: 2px; height: 12px; background: #3fb950;"></div>
    <div style="color: #8b949e; font-size: 11px; text-align: center;">Swipe right on A</div>
    <div style="width: 2px; height: 12px; background: #3fb950;"></div>
    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #3fb950;"></div>
    <div style="background: #161b22; border: 2px solid #8957e5; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #a371f7; font-size: 12px;">Check A liked B?</div>
    </div>
    <div style="width: 2px; height: 12px; background: #da3633;"></div>
    <div style="color: #f85149; font-size: 11px;">No (not yet in DB)</div>
    <div style="width: 2px; height: 12px; background: #da3633;"></div>
    <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #da3633;"></div>
    <div style="background: #161b22; border: 2px solid #f0883e; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #f0883e; font-size: 12px;">Store like</div>
    </div>
  </div>

</div>

<!-- Result -->
<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 8px; padding: 14px; text-align: center; margin-bottom: 20px;">
  <span style="color: #f85149; font-weight: bold;">Result:</span>
  <span style="color: #c9d1d9;"> Both likes stored, but no match created!</span>
</div>

<!-- Solution -->
<div style="background: rgba(56, 139, 253, 0.1); border: 2px solid #58a6ff; border-radius: 8px; padding: 16px;">
  <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Solution: Use distributed lock or deterministic ordering</div>
  <div style="background: #0d1117; border-radius: 6px; padding: 12px 16px; font-family: monospace; font-size: 12px; color: #c9d1d9;">
    <span style="color: #ff7b72;">if</span> user_a.id &lt; user_b.id:<br>
    &nbsp;&nbsp;&nbsp;&nbsp;lock_key = <span style="color: #a5d6ff;">f"match:{user_a.id}:{user_b.id}"</span><br>
    <span style="color: #ff7b72;">else</span>:<br>
    &nbsp;&nbsp;&nbsp;&nbsp;lock_key = <span style="color: #a5d6ff;">f"match:{user_b.id}:{user_a.id}"</span><br><br>
    <span style="color: #ff7b72;">with</span> redis.lock(lock_key):<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #8b949e;"># Check and create match atomically</span>
  </div>
</div>

</div>

### 2. Location Privacy

<div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f0883e; border-radius: 12px; overflow: hidden; margin: 16px 0;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #f0883e 0%, #f9a825 100%); padding: 12px 20px; text-align: center;">
    <span style="color: white; font-weight: bold; font-size: 15px;">LOCATION FUZZING</span>
  </div>

  <div style="padding: 24px;">

    <!-- Warning -->
    <div style="background: rgba(248, 81, 73, 0.15); border: 1px solid #f85149; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; text-align: center;">
      <span style="color: #f85149; font-weight: bold;">Never expose exact coordinates!</span>
    </div>

    <!-- Display Distance -->
    <div style="margin-bottom: 20px;">
      <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Display distance as:</div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <div style="background: #161b22; border: 1px solid #3fb950; border-radius: 6px; padding: 10px 16px; color: #3fb950; font-size: 13px;">"< 1 mile away"</div>
        <div style="background: #161b22; border: 1px solid #58a6ff; border-radius: 6px; padding: 10px 16px; color: #58a6ff; font-size: 13px;">"2 miles away" (rounded)</div>
        <div style="background: #161b22; border: 1px solid #a371f7; border-radius: 6px; padding: 10px 16px; color: #a371f7; font-size: 13px;">"5+ miles away"</div>
      </div>
    </div>

    <!-- Storage Rules -->
    <div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Storage:</div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #238636; width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;"></div>
        <span style="color: #c9d1d9; font-size: 13px;">Store <strong style="color: #3fb950;">precise location</strong> (for matching)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;"></div>
        <span style="color: #c9d1d9; font-size: 13px;">Display <strong style="color: #58a6ff;">fuzzy location</strong> (for UI)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #f0883e; width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;"></div>
        <span style="color: #c9d1d9; font-size: 13px;">Add <strong style="color: #f0883e;">random offset (100-500m)</strong> for display</span>
      </div>
    </div>

  </div>
</div>

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #fe3c72;">

### 1. "Why pre-compute recommendation stacks instead of computing on-demand?"

**What They're Probing**: Understanding of latency vs. freshness trade-offs, caching strategies, and user experience optimization.

**Strong Answer**:

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Step-by-Step Explanation:**

1. **The Latency Problem**: When a user opens Tinder in NYC at 8pm on Friday, we need to show profiles instantly. On-demand computation requires:
   - Geo query to find ~50,000 potential matches within 25 miles
   - Filter by preferences (age 25-35, women seeking men, etc.) -> ~8,000 candidates
   - Check "already swiped" against their history of ~5,000 swipes
   - Score each candidate using ML model (ELO compatibility, recency, etc.)
   - Sort and return top 100

   **Total time: 400-800ms** - users notice this delay as "laggy swiping"

2. **The Pre-computation Solution**:
   - Background job runs every 1-4 hours for active users
   - Computes and stores top 500 candidates in Redis: `stack:user_123 -> [user_456, user_789, ...]`
   - When user opens app, we just `LRANGE stack:user_123 0 20` -> **~5ms response**

3. **Real Scenario - Cache Miss Handling**:
   > "When Sarah opens the app for the first time today in Manhattan, we check Redis for her stack. If it's missing or stale (>4 hours old), we serve a 'loading' animation for 200ms while triggering async recomputation. Meanwhile, we return her last cached results or fall back to a simplified on-demand query (just geo + preferences, no ML scoring). She gets profiles in <300ms while her fresh stack computes in the background."

4. **Numbers That Matter**:
   - Pre-computed latency: **P50: 8ms, P99: 45ms**
   - On-demand latency: **P50: 350ms, P99: 1200ms**
   - Stack recomputation: runs every **2 hours** for users active in last 24h
   - Stack size: **500 candidates** (~4KB in Redis)
   - Cache hit rate: **~92%** for active users

5. **Failure Scenario**:
   > "If Redis cluster fails, we degrade gracefully to on-demand queries. Users experience slower (~400ms) but functional recommendations. We alert on cache hit rate dropping below 80% and auto-scale computation workers when recomputation queue grows."

</div>

**When Simpler Works**:
For < 50K users per region, on-demand computation with good geo-indexing (PostGIS or Redis Geo) is perfectly acceptable. The latency difference (200ms vs 50ms) is imperceptible at this scale, and you avoid the complexity of background jobs and cache invalidation.

---

### 2. "How do you prevent showing someone a user already swiped on?"

**What They're Probing**: Understanding of space-efficient data structures, trade-offs between accuracy and performance.

**Strong Answer**:

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Step-by-Step Explanation:**

1. **The Storage Challenge**:
   - Average active user swipes on **50-100 profiles/day**
   - Power users swipe **500-1000/day**
   - After 6 months, a user might have **15,000+ swipe records**
   - With 10M users, that's **potentially 150 billion swipe relationships**

2. **Why Bloom Filters Work**:
   - A Bloom filter is a probabilistic data structure that can tell you:
     - "Definitely NOT swiped" (100% accurate)
     - "Probably swiped" (~1% false positive rate)
   - For 10,000 swipes with 1% false positive rate: **~12KB per user**
   - Explicit storage for same: **80KB+ per user** (8 bytes per user_id)

3. **Real Scenario - Swipe Check Flow**:
   > "When we generate recommendations for Mike in Brooklyn, we pull 5,000 candidate profiles from our geo index. Before scoring, we run each candidate_id through Mike's Bloom filter stored in Redis: `BF.EXISTS swipes:mike_123 candidate_456`. This takes ~0.1ms per check. Of 5,000 candidates, ~4,200 pass the filter (not previously swiped). The ~1% false positives (42 profiles Mike actually swiped on) get caught by a secondary check in the client app, which maintains a local SQLite cache of recent swipes."

4. **Data Structure Details**:
   ```
   Bloom Filter (Redis):
   - Key: swipes:{user_id}
   - Size: ~12KB for 10K items at 1% FP rate
   - Operations: BF.ADD (on swipe), BF.EXISTS (on filter)

   Sorted Set (for right-swipes only):
   - Key: likes:{user_id}
   - Score: timestamp
   - Used for: match detection
   - We keep only last 10,000 right-swipes (ZREMRANGEBYRANK)
   ```

5. **Numbers That Matter**:
   - Bloom filter check: **O(1), ~0.1ms**
   - SQL NOT IN with 10K swipes: **O(n), ~50-200ms**
   - False positive rate: **1%** (configurable, trade-off with size)
   - Space savings: **~85%** compared to explicit storage

6. **Failure Scenario**:
   > "If the Bloom filter gets corrupted or lost, users might see profiles they already swiped on. This is annoying but not catastrophic - the client-side cache catches most, and the backend swipes table is the source of truth. We rebuild Bloom filters from the swipes table during nightly maintenance."

</div>

**When Simpler Works**:
For < 10K total users, just use a simple `NOT IN (SELECT target_id FROM swipes WHERE user_id = ?)` query. PostgreSQL handles this fine with proper indexing. Bloom filters add operational complexity that's not justified until you're processing millions of swipes.

---

### 3. "Why ELO scoring instead of just random matching within preferences?"

**What They're Probing**: Understanding of matching quality, engagement metrics, and business value of recommendations.

**Strong Answer**:

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Step-by-Step Explanation:**

1. **The ELO System Explained**:
   - Originally from chess, adapted for dating apps
   - **ELO score ranges from 0-2400** (like chess ratings)
   - New users start at **1200** (middle of the range)
   - Score changes based on WHO swipes right on you and WHO you swipe right on

2. **How ELO Updates Work**:
   > "When Emma (ELO: 1800) swipes right on Jake (ELO: 1400), Jake's score increases by ~15 points because a 'higher-ranked' user showed interest. If Jake swipes right back, Emma's score increases by only ~5 points (expected outcome). But if low-ELO users consistently swipe right on Emma and she ignores them, her score stays stable - no penalty for being selective."

3. **Real Scenario - Why Leagues Matter**:
   > "Without ELO, imagine showing supermodel profiles to everyone. The supermodel gets 10,000 likes/day, can only review 100, matches with 5. Meanwhile, 9,995 users get no response - terrible experience. With ELO 'leagues', the supermodel (ELO: 2200) primarily sees other high-ELO users (2000-2400). They swipe on 50, match with 15. Regular users (ELO: 1100-1300) see each other and have 30%+ mutual match rates instead of 0.1%."

4. **Scoring Formula (Simplified)**:
   ```
   final_score =
     0.35 * elo_compatibility     // How close are your ELO scores?
   + 0.20 * recency_boost         // Active in last 24h? +bonus
   + 0.15 * mutual_interests      // Shared interests/tags
   + 0.10 * photo_quality_score   // ML-assessed photo quality
   + 0.10 * profile_completeness  // Bio, job, education filled?
   + 0.10 * distance_penalty      // Closer = better
   ```

5. **Numbers That Matter**:
   - Random matching mutual match rate: **~2-5%**
   - ELO-based matching mutual match rate: **~15-25%**
   - User retention improvement: **3-5x** (users who match stay longer)
   - ELO recalculation frequency: **real-time on swipe, batch normalize daily**

6. **Failure Scenario - Cold Start Problem**:
   > "New user Alex joins with no swipe history. We can't calculate their 'true' ELO yet. Solution: Start at 1200, but give them a 'new user boost' - show them to a diverse range of ELO brackets for first 48 hours. Track who swipes right on them to quickly calibrate their actual ELO. Within 100 swipes received, we have enough signal to place them accurately. Premium feature 'Boost' temporarily inflates your visibility score by 3x, essentially letting you 'borrow' higher ELO for 30 minutes."

</div>

**When Simpler Works**:
Bumble started with simple random matching within radius. For niche dating apps (< 100K users), random with recency bias (show recently active users first) works well. ML-based scoring only becomes valuable when you have enough data to train meaningful models - typically 1M+ swipes.

---

### 4. "How do you handle the race condition when two users swipe right simultaneously?"

**What They're Probing**: Distributed systems knowledge, consistency guarantees, practical problem-solving.

**Strong Answer**:

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Step-by-Step Explanation:**

1. **The Race Condition Illustrated**:
   > "At 9:47:32.150pm, both Sarah and Mike swipe right on each other from different phones. Sarah's request hits Server A in us-east-1. Mike's hits Server B in us-east-2. Both check 'did they like me?' at the exact same millisecond - both get 'No' because neither write has committed yet. Both store their likes. Result: Two likes in the database, zero matches created. Sarah and Mike never find out they matched."

2. **Solution 1: Deterministic Distributed Locking**:
   ```python
   def process_swipe(user_a, user_b, direction):
       if direction != 'right':
           return store_swipe(user_a, user_b, 'left')

       # Deterministic lock key - same key regardless of who swipes first
       lock_key = f"match:{min(user_a, user_b)}:{max(user_a, user_b)}"

       with redis.lock(lock_key, timeout=5):  # 5 second lock timeout
           # Store the like first
           store_like(user_a, user_b)

           # Now check for mutual like
           if has_liked(user_b, user_a):
               match = create_match(user_a, user_b)
               notify_both_users(match)
               return {'matched': True, 'match_id': match.id}

       return {'matched': False}
   ```

3. **Real Scenario - Lock Contention**:
   > "Sarah's request acquires lock `match:mike_456:sarah_123`. Mike's request tries to acquire the same lock, waits 50ms, then proceeds. Sarah's transaction completes: like stored, no match found (Mike hasn't liked yet). Lock released. Mike's request acquires lock, stores like, checks for Sarah's like - FOUND! Match created, both notified. Total time: ~150ms for Mike, ~100ms for Sarah. Both get push notification: 'It's a Match!'"

4. **Solution 2: Event Sourcing with Reconciliation**:
   > "Alternative approach for extreme scale: Don't try to detect matches synchronously. Write swipes to Kafka immediately (no locking). A dedicated 'Match Detector' service consumes the swipe stream, maintains in-memory state of recent likes, detects matches within 50ms of both swipes arriving. Trades immediate consistency for higher throughput. Used when you're processing 100K+ swipes/second."

5. **Numbers That Matter**:
   - Lock acquisition time: **P50: 2ms, P99: 50ms**
   - Lock timeout: **5 seconds** (prevents deadlocks)
   - Probability of actual collision: **~0.01%** of right-swipes
   - Match notification latency: **< 200ms** from second swipe

6. **Failure Scenario**:
   > "Redis cluster hosting locks goes down. We fail-open: swipes still process, but match detection uses fallback mode. A background reconciliation job runs every 60 seconds, scanning for 'orphaned mutual likes' - pairs where both users liked each other but no match record exists. These get matched retroactively. Users might wait 1-2 minutes for match notification instead of instant, but no matches are lost."

</div>

**When Simpler Works**:
For apps with < 100K daily swipes, a simple background job that runs every minute to find mutual likes works perfectly. The probability of two users swiping at the exact same millisecond is low, and a 60-second delay in match notification is acceptable for most use cases.

---

### 5. "How do you efficiently find users within a geographic radius?"

**What They're Probing**: Geo-spatial indexing knowledge, trade-offs between different approaches.

**Strong Answer**:

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 10px; padding: 20px; margin: 16px 0;">

**Step-by-Step Explanation:**

1. **The Geospatial Challenge**:
   > "When Lisa opens Tinder in Manhattan, she wants to see people within 10 miles. Manhattan has ~100,000 active Tinder users. We need to find all users where: distance(Lisa's location, their location) <= 10 miles. Naive approach: calculate distance to all 100K users, filter. That's 100K haversine calculations - way too slow (~500ms)."

2. **Approach 1: PostGIS with R-Tree Index** (Best for < 100K users/region):
   ```sql
   -- Create spatial index
   CREATE INDEX idx_users_location ON users USING GIST(location);

   -- Query users within 16km (10 miles)
   SELECT * FROM users
   WHERE ST_DWithin(
       location,
       ST_SetSRID(ST_MakePoint(-73.985, 40.748), 4326)::geography,
       16000  -- meters
   )
   AND gender = 'male'
   AND age BETWEEN 25 AND 35
   LIMIT 1000;

   -- Execution time: ~15ms for 50K users in region
   ```

3. **Approach 2: Geohashing** (For distributed key-value stores):
   > "Geohashing converts lat/lng to a string like 'dr5ru7'. Longer prefixes = smaller areas. Users in Manhattan might have geohashes starting with 'dr5r'. We store users in Redis sets by geohash prefix: `SET geo:dr5r -> [user_1, user_2, ...]`. To find nearby users, we query adjacent geohash cells (9 cells for complete coverage) and filter by exact distance."

   **Trade-off**: ~10-15% over-fetch (bounding box vs circle), but works with any database.

4. **Approach 3: S2/H3 Hierarchical Cells** (Google/Uber's approach):
   > "S2 Geometry divides Earth into hierarchical cells at 30 levels. Level 14 cells are ~1km x 1km. For a 10-mile radius, we compute which S2 cells intersect our search circle (typically 50-200 cells), query users in those cells. Better than geohashing because cells are uniform size globally (geohashes distort near poles)."

5. **Real Scenario - NYC Friday Night**:
   > "At 9pm Friday, we have 150,000 active users in NYC metro area. Lisa in Midtown requests recommendations. We: (1) Look up her location's geohash prefix 'dr5ru', (2) Query adjacent cells + her cell for candidates, (3) Get ~8,000 users from Redis geo index in 3ms, (4) Apply preference filters (age, gender) -> 2,500 candidates, (5) Exact distance filter (PostGIS on hot data) -> 1,800 within radius, (6) Score and rank top 500. Total: ~45ms."

6. **Numbers That Matter**:
   - PostGIS ST_DWithin: **~15ms** for 50K users
   - Redis GEORADIUS: **~3ms** for 100K users
   - Geohash cell lookup: **~1ms** per cell, typically query 9-15 cells
   - S2 cell coverage for 10-mile radius: **~100-200 cells**

7. **Failure Scenario**:
   > "Geo index becomes stale because location update service is down. Users see outdated 'distance' values (John shows '2 miles away' but he moved to Brooklyn). We mitigate with: (1) TTL on location data - after 6 hours, show '? miles away', (2) Client sends location with each request, we update opportunistically, (3) Distance shown is always 'fuzzy' (rounded) for privacy anyway, so small errors are hidden."

</div>

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

<div style="border: 2px solid #58a6ff; border-radius: 12px; overflow: hidden; margin: 16px 0;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 14px 20px; text-align: center;">
    <span style="color: white; font-weight: bold; font-size: 16px;">CHOOSE YOUR DATABASE</span>
  </div>

  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); padding: 24px; display: flex; flex-direction: column; gap: 16px;">

    <!-- User Profiles -->
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      <div style="background: #161b22; border: 2px solid #238636; border-radius: 8px; padding: 12px 16px; min-width: 200px;">
        <div style="color: #3fb950; font-weight: bold; font-size: 13px;">User Profiles & Preferences</div>
      </div>
      <div style="color: #8b949e; font-size: 20px; display: flex; align-items: center;">&#8594;</div>
      <div style="background: #238636; color: white; border-radius: 6px; padding: 10px 16px; font-size: 12px;">
        <strong>PostgreSQL</strong> (ACID, complex queries, PostGIS for location)
      </div>
    </div>

    <!-- Swipe History -->
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      <div style="background: #161b22; border: 2px solid #f0883e; border-radius: 8px; padding: 12px 16px; min-width: 200px;">
        <div style="color: #f0883e; font-weight: bold; font-size: 13px;">Swipe History (Write-Heavy)</div>
      </div>
      <div style="color: #8b949e; font-size: 20px; display: flex; align-items: center;">&#8594;</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #f0883e; color: white; border-radius: 6px; padding: 8px 14px; font-size: 11px;">
          <strong>&lt; 10M swipes:</strong> PostgreSQL with partitioning
        </div>
        <div style="background: #da3633; color: white; border-radius: 6px; padding: 8px 14px; font-size: 11px;">
          <strong>&gt; 10M swipes:</strong> Cassandra/DynamoDB (append-only, TTL)
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      <div style="background: #161b22; border: 2px solid #8957e5; border-radius: 8px; padding: 12px 16px; min-width: 200px;">
        <div style="color: #a371f7; font-weight: bold; font-size: 13px;">Chat Messages</div>
      </div>
      <div style="color: #8b949e; font-size: 20px; display: flex; align-items: center;">&#8594;</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #8957e5; color: white; border-radius: 6px; padding: 8px 14px; font-size: 11px;">
          <strong>&lt; 100M messages:</strong> PostgreSQL with partitioning
        </div>
        <div style="background: #6e40c9; color: white; border-radius: 6px; padding: 8px 14px; font-size: 11px;">
          <strong>&gt; 100M messages:</strong> Cassandra (time-series, wide rows)
        </div>
      </div>
    </div>

    <!-- Real-time State -->
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      <div style="background: #161b22; border: 2px solid #58a6ff; border-radius: 8px; padding: 12px 16px; min-width: 200px;">
        <div style="color: #58a6ff; font-weight: bold; font-size: 13px;">Real-time State</div>
        <div style="color: #8b949e; font-size: 10px;">(Online status, typing indicators)</div>
      </div>
      <div style="color: #8b949e; font-size: 20px; display: flex; align-items: center;">&#8594;</div>
      <div style="background: #1f6feb; color: white; border-radius: 6px; padding: 10px 16px; font-size: 12px;">
        <strong>Always Redis</strong> (TTL, pub/sub, ephemeral data)
      </div>
    </div>

    <!-- Recommendation Cache -->
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      <div style="background: #161b22; border: 2px solid #fe3c72; border-radius: 8px; padding: 12px 16px; min-width: 200px;">
        <div style="color: #fe3c72; font-weight: bold; font-size: 13px;">Recommendation Cache</div>
      </div>
      <div style="color: #8b949e; font-size: 20px; display: flex; align-items: center;">&#8594;</div>
      <div style="background: linear-gradient(135deg, #fe3c72 0%, #ff6b6b 100%); color: white; border-radius: 6px; padding: 10px 16px; font-size: 12px;">
        <strong>Redis</strong> (fast reads, TTL, list operations)
      </div>
    </div>

  </div>
</div>

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

<div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

  <!-- Question -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 16px 32px; text-align: center; box-shadow: 0 4px 15px rgba(31, 111, 235, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 14px;">How many users in a city?</div>
  </div>

  <!-- Arrows branching out -->
  <div style="display: flex; gap: 60px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">

    <!-- < 10K Branch -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div style="width: 3px; height: 20px; background: #3fb950;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #3fb950;"></div>
      <div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: bold;">&lt; 10K users</div>
      <div style="width: 3px; height: 16px; background: #3fb950;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #3fb950;"></div>
      <div style="background: #161b22; border: 2px solid #238636; border-radius: 10px; padding: 16px; text-align: center; max-width: 180px;">
        <div style="color: #3fb950; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PostgreSQL + PostGIS is fine</div>
        <div style="color: #8b949e; font-size: 11px; line-height: 1.5;">Simple SQL queries work</div>
      </div>
    </div>

    <!-- 10K - 100K Branch -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div style="width: 3px; height: 20px; background: #f0883e;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #f0883e;"></div>
      <div style="background: #f0883e; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: bold;">10K - 100K</div>
      <div style="width: 3px; height: 16px; background: #f0883e;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #f0883e;"></div>
      <div style="background: #161b22; border: 2px solid #f0883e; border-radius: 10px; padding: 16px; text-align: center; max-width: 180px;">
        <div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PostgreSQL + Redis caching</div>
        <div style="color: #8b949e; font-size: 11px; line-height: 1.5;">Consider Bloom Filters for swipe checks</div>
      </div>
    </div>

    <!-- > 100K Branch -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div style="width: 3px; height: 20px; background: #da3633;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #da3633;"></div>
      <div style="background: #da3633; color: white; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: bold;">&gt; 100K users</div>
      <div style="width: 3px; height: 16px; background: #da3633;"></div>
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #da3633;"></div>
      <div style="background: #161b22; border: 2px solid #da3633; border-radius: 10px; padding: 16px; text-align: center; max-width: 180px;">
        <div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 8px;">Specialized Geo Index + Sharding</div>
        <div style="color: #8b949e; font-size: 11px; line-height: 1.5;">ML Ranking, Pre-computed stacks</div>
      </div>
    </div>

  </div>

</div>

</div>

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

<div style="border: 2px solid #f0883e; border-radius: 12px; overflow: hidden; margin: 16px 0;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #f0883e 0%, #f9a825 100%); padding: 14px 20px; text-align: center;">
    <span style="color: white; font-weight: bold; font-size: 16px;">SCALING CHALLENGE MATRIX</span>
  </div>

  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); padding: 20px; display: flex; flex-direction: column; gap: 16px;">

    <!-- Hot Spots -->
    <div style="background: #161b22; border-left: 4px solid #da3633; border-radius: 8px; padding: 16px;">
      <div style="color: #f85149; font-weight: bold; font-size: 14px; margin-bottom: 10px;">Hot Spots (Everyone in NYC on Friday night)</div>
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
        <div style="display: flex; gap: 8px;"><span style="color: #f85149;">Problem:</span><span style="color: #c9d1d9;">Single geo shard overloaded</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #3fb950;">Solution:</span><span style="color: #c9d1d9;">Sub-city sharding (Manhattan, Brooklyn separate)</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #58a6ff;">Fallback:</span><span style="color: #c9d1d9;">Queue requests, serve from cache, degrade gracefully</span></div>
      </div>
    </div>

    <!-- Celebrity Problem -->
    <div style="background: #161b22; border-left: 4px solid #a371f7; border-radius: 8px; padding: 16px;">
      <div style="color: #a371f7; font-weight: bold; font-size: 14px; margin-bottom: 10px;">Celebrity Problem (1 user gets 100K likes/day)</div>
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
        <div style="display: flex; gap: 8px;"><span style="color: #f85149;">Problem:</span><span style="color: #c9d1d9;">Their profile causes hot partition</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #3fb950;">Solution:</span><span style="color: #c9d1d9;">Replicate hot profiles, rate limit incoming likes</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #58a6ff;">Fallback:</span><span style="color: #c9d1d9;">Verified accounts with special handling</span></div>
      </div>
    </div>

    <!-- Global Users -->
    <div style="background: #161b22; border-left: 4px solid #1f6feb; border-radius: 8px; padding: 16px;">
      <div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 10px;">Global Users Traveling</div>
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
        <div style="display: flex; gap: 8px;"><span style="color: #f85149;">Problem:</span><span style="color: #c9d1d9;">User in Tokyo was in NYC yesterday, data in wrong region</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #3fb950;">Solution:</span><span style="color: #c9d1d9;">Profile data global, discovery regional, async migration</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #58a6ff;">Fallback:</span><span style="color: #c9d1d9;">Accept 1-hour delay for cross-region recommendations</span></div>
      </div>
    </div>

    <!-- Swipe Velocity -->
    <div style="background: #161b22; border-left: 4px solid #238636; border-radius: 8px; padding: 16px;">
      <div style="color: #3fb950; font-weight: bold; font-size: 14px; margin-bottom: 10px;">Swipe Velocity (Power users: 1000+ swipes/day)</div>
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
        <div style="display: flex; gap: 8px;"><span style="color: #f85149;">Problem:</span><span style="color: #c9d1d9;">Exhaust pre-computed stack quickly</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #3fb950;">Solution:</span><span style="color: #c9d1d9;">Larger stacks for active users, real-time fallback</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #58a6ff;">Fallback:</span><span style="color: #c9d1d9;">"No more people nearby" message, suggest expanding radius</span></div>
      </div>
    </div>

    <!-- Cold Start -->
    <div style="background: #161b22; border-left: 4px solid #f0883e; border-radius: 8px; padding: 16px;">
      <div style="color: #f0883e; font-weight: bold; font-size: 14px; margin-bottom: 10px;">New User Cold Start</div>
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
        <div style="display: flex; gap: 8px;"><span style="color: #f85149;">Problem:</span><span style="color: #c9d1d9;">No swipe history = no ELO = bad recommendations</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #3fb950;">Solution:</span><span style="color: #c9d1d9;">Boost new users, use profile completeness as proxy</span></div>
        <div style="display: flex; gap: 8px;"><span style="color: #58a6ff;">Fallback:</span><span style="color: #c9d1d9;">Show to diverse audience, learn quickly from responses</span></div>
      </div>
    </div>

  </div>
</div>

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

<div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

  <!-- Phase 1 -->
  <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px 24px; text-align: center; max-width: 500px; width: 100%; box-shadow: 0 4px 15px rgba(35, 134, 54, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 13px; margin-bottom: 6px;">Phase 1</div>
    <div style="color: rgba(255,255,255,0.9); font-size: 12px;">"Start simple - PostgreSQL + PostGIS + Redis. Handle 50K users easily."</div>
  </div>

  <!-- Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: 3px; height: 16px; background: linear-gradient(to bottom, #238636, #1f6feb);"></div>
    <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #1f6feb;"></div>
  </div>

  <!-- Phase 2 -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 16px 24px; text-align: center; max-width: 500px; width: 100%; box-shadow: 0 4px 15px rgba(31, 111, 235, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 13px; margin-bottom: 6px;">Phase 2</div>
    <div style="color: rgba(255,255,255,0.9); font-size: 12px;">"As we grow, add Elasticsearch for discovery, Bloom filters for swipes."</div>
  </div>

  <!-- Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: 3px; height: 16px; background: linear-gradient(to bottom, #1f6feb, #8957e5);"></div>
    <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #8957e5;"></div>
  </div>

  <!-- Phase 3 -->
  <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px 24px; text-align: center; max-width: 500px; width: 100%; box-shadow: 0 4px 15px rgba(137, 87, 229, 0.3);">
    <div style="color: white; font-weight: bold; font-size: 13px; margin-bottom: 6px;">Phase 3</div>
    <div style="color: rgba(255,255,255,0.9); font-size: 12px;">"At scale, pre-compute recommendation stacks, add ML ranking, shard by region."</div>
  </div>

</div>

</div>

<div style="background: rgba(56, 139, 253, 0.1); border-left: 4px solid #58a6ff; padding: 12px 16px; margin-top: 16px; border-radius: 8px;">
  <span style="color: #c9d1d9; font-size: 13px;">This shows you understand pragmatic engineering and can match solutions to actual needs.</span>
</div>

</div>
