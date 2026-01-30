# Design Tinder: Location-Based Dating Platform

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #fe3c72;">

## Problem Statement

Design a location-based dating application that enables users to discover potential matches within their geographic proximity, express interest through swipe mechanics, form mutual matches, and communicate in real-time.

### Functional Requirements
- **Profile Management**: User profiles with photos, bio, preferences (age range, distance, gender)
- **Discovery Engine**: Surface potential matches based on location, preferences, and algorithmic ranking
- **Swipe Mechanics**: Left (pass), Right (like), Super Like with rate limiting
- **Match Detection**: Identify and notify mutual likes in real-time
- **Real-Time Messaging**: Bi-directional chat between matched users with read receipts
- **Premium Features**: Boost, See Who Likes You, Rewind, Passport (location change)

### Non-Functional Requirements
- **Latency**: Discovery results < 100ms P99, match notification < 500ms
- **Availability**: 99.9% uptime (8.76 hours downtime/year)
- **Scale**: 75M MAU, 2B+ swipes/day, 50M+ matches/day
- **Privacy**: Location fuzzing, GDPR compliance, data encryption at rest

</div>

---

## Core Architecture Overview

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">TINDER SYSTEM ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Client Layer -->
<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border: 2px solid #fe3c72;">
<div style="color: #fe3c72; font-weight: bold; margin-bottom: 12px; text-align: center;">CLIENT LAYER</div>
<div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 1px solid #484f58; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">iOS App</div>
<div style="color: #8b949e; font-size: 11px;">Swift + CoreLocation</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #484f58; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">Android App</div>
<div style="color: #8b949e; font-size: 11px;">Kotlin + FusedLocation</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #484f58; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #1e293b; font-weight: bold; font-size: 13px;">Web App</div>
<div style="color: #8b949e; font-size: 11px;">React + WebSocket</div>
</div>
</div>
</div>

<!-- API Gateway -->
<div style="display: flex; justify-content: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 16px 40px; text-align: center;">
<div style="color: white; font-weight: bold;">API Gateway</div>
<div style="color: rgba(255,255,255,0.8); font-size: 11px;">Rate Limiting | Auth | Request Routing | TLS Termination</div>
</div>
</div>

<!-- Core Services -->
<div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 13px;">Profile Service</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 6px;">PostgreSQL + S3</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 13px;">Discovery Service</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 6px;">Elasticsearch + Redis Geo</div>
</div>

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9a825 100%); border-radius: 10px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 13px;">Matching Service</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 6px;">Redis + Bloom Filters</div>
</div>

<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 10px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 13px;">Chat Service</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 6px;">Cassandra + WebSocket</div>
</div>

<div style="background: linear-gradient(135deg, #6e40c9 0%, #8957e5 100%); border-radius: 10px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 13px;">Notification Service</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 6px;">FCM + APNS</div>
</div>

</div>

<!-- Event Bus -->
<div style="display: flex; justify-content: center;">
<div style="background: #21262d; border: 2px solid #484f58; border-radius: 10px; padding: 14px 60px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold;">Apache Kafka</div>
<div style="color: #8b949e; font-size: 11px;">Event Streaming | Swipe Events | Match Events | Analytics</div>
</div>
</div>

<!-- Data Layer -->
<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border: 2px solid #484f58;">
<div style="color: #8b949e; font-weight: bold; margin-bottom: 12px; text-align: center;">DATA LAYER</div>
<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 1px solid #238636; border-radius: 6px; padding: 10px 16px;">
<span style="color: #3fb950; font-size: 12px;">PostgreSQL (Profiles)</span>
</div>
<div style="background: #f1f5f9; border: 1px solid #f0883e; border-radius: 6px; padding: 10px 16px;">
<span style="color: #f0883e; font-size: 12px;">Cassandra (Swipes/Chat)</span>
</div>
<div style="background: #f1f5f9; border: 1px solid #da3633; border-radius: 6px; padding: 10px 16px;">
<span style="color: #f85149; font-size: 12px;">Redis Cluster (Cache/Geo)</span>
</div>
<div style="background: #f1f5f9; border: 1px solid #8957e5; border-radius: 6px; padding: 10px 16px;">
<span style="color: #a371f7; font-size: 12px;">Elasticsearch (Discovery)</span>
</div>
</div>
</div>

</div>
</div>

---

## 1. Geolocation Indexing Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #3fb950;">

### The Fundamental Challenge

When a user in Manhattan opens Tinder at 8pm on Friday, they expect to see nearby profiles instantly. With 150,000 active users in NYC, we need to efficiently answer: "Find all users within 10 miles of coordinates (40.7589, -73.9851) matching my preferences."

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Naive Approach Failure</div>
<div style="color: #1e293b; font-size: 13px;">
Computing haversine distance to 150K users = 150K floating-point calculations per request.
At 1000 concurrent requests: 150M calculations/second. Latency: ~500ms. Unacceptable.
</div>
</div>

### Geospatial Indexing Strategies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

#### Strategy 1: Geohashing

Geohashing converts 2D coordinates into a 1D string by interleaving latitude and longitude bits. Adjacent cells share common prefixes, enabling efficient range queries.

```
Manhattan coordinates: (40.7589, -73.9851)
Geohash (precision 7): "dr5ru7c"

Precision levels:
- 4 chars: ~39km x 19km cell
- 5 chars: ~4.9km x 4.9km cell
- 6 chars: ~1.2km x 610m cell
- 7 chars: ~153m x 153m cell
```

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 12px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold;">Key Insight</div>
<div style="color: #1e293b; font-size: 13px;">
For a 10-mile radius search, we use precision 5 (4.9km cells). We query the user's cell plus all 8 adjacent cells to handle boundary cases. This reduces candidate set from 150K to ~8K users in 9 cells.
</div>
</div>

**Edge Case - Boundary Problem**: A user at the edge of cell "dr5ru" searching 1km might miss users 100m away in cell "dr5rv". Solution: Always query adjacent cells (9-cell pattern).

**Edge Case - Polar Distortion**: Geohash cells distort near poles (elongate meridionally). For apps targeting polar regions, use [[S2 Geometry]](/topic/geospatial/s2-geometry) or [[H3]](/topic/geospatial/h3-indexing).

#### Strategy 2: R-Tree Index (PostGIS)

R-Trees organize spatial data in hierarchical bounding rectangles. PostGIS implements this via GIST indexes.

```sql
-- Create spatial index
CREATE INDEX idx_users_location ON users
USING GIST(location);

-- Query users within 16km (10 miles)
SELECT id, name,
       ST_Distance(location::geography,
                   ST_SetSRID(ST_MakePoint(-73.9851, 40.7589), 4326)::geography) as distance_m
FROM users
WHERE ST_DWithin(
    location::geography,
    ST_SetSRID(ST_MakePoint(-73.9851, 40.7589), 4326)::geography,
    16093  -- meters (10 miles)
)
AND gender = 'female' AND age BETWEEN 25 AND 35
ORDER BY location <-> ST_SetSRID(ST_MakePoint(-73.9851, 40.7589), 4326)
LIMIT 1000;
```

**Performance**: PostGIS handles 100K users with ~15ms query time using proper indexing. No geohashing complexity needed until 500K+ users per region.

#### Strategy 3: Redis Geo Commands

Redis provides native geospatial indexing using sorted sets with geohash-encoded scores.

```python
# Add user locations
redis.geoadd("user_locations",
             -73.9851, 40.7589, "user:12345",
             -73.9875, 40.7612, "user:67890")

# Query users within 10 miles
nearby = redis.georadius(
    "user_locations",
    -73.9851, 40.7589,
    10, unit="mi",
    withdist=True,
    count=1000,
    sort="ASC"
)
# Returns: [("user:12345", 0.0), ("user:67890", 0.15), ...]
```

**Trade-off**: Redis Geo is extremely fast (~3ms for 100K users) but lacks complex filtering. You get user IDs, then must filter by preferences in application code.

</div>

### Location Update Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Critical Design Decision**: How frequently should we update user locations?

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px;">Continuous Updates</div>
<div style="color: #8b949e; font-size: 12px;">Every GPS change triggers update</div>
<div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Pros: Always accurate</div>
<div style="color: #f85149; font-size: 12px;">Cons: 1000s of writes/user/day, battery drain</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #1f6feb; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Significant Movement</div>
<div style="color: #8b949e; font-size: 12px;">Update when moved 500m+ from last location</div>
<div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Pros: Balanced accuracy/efficiency</div>
<div style="color: #f0883e; font-size: 12px;">Cons: Slight staleness in dense areas</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">On App Open</div>
<div style="color: #8b949e; font-size: 12px;">Update only when user opens app</div>
<div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Pros: Minimal writes</div>
<div style="color: #f85149; font-size: 12px;">Cons: Stale data for inactive users</div>
</div>
</div>

**Tinder's Approach**: Hybrid strategy. Update on app open, plus significant movement detection (500m threshold) while app is active. Background location updates every 15 minutes for users who opted into "Show me to people nearby even when inactive."

</div>

### Location Privacy Mechanisms

<div style="background: rgba(248, 81, 73, 0.15); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 16px 0;">
<div style="color: #f85149; font-weight: bold; font-size: 15px; margin-bottom: 12px;">CRITICAL: Never Expose Exact Coordinates</div>

<div style="color: #1e293b; font-size: 13px; line-height: 1.8;">

**Trilateration Attack**: If an attacker can see exact distances from multiple spoofed locations, they can triangulate a user's precise location. Three distance measurements from different points uniquely identify a position.

**Mitigation Strategies**:

1. **Display Fuzzing**: Show "2 miles away" (rounded) instead of "2.3 miles"
2. **Coordinate Jittering**: Add random offset (100-500m) to displayed location
3. **Threshold Binning**: "< 1 mile", "1-5 miles", "5-10 miles", "10+ miles"
4. **API Response Sanitization**: Never return lat/lng in API responses

```python
def get_display_distance(actual_distance_km):
    """Convert precise distance to privacy-safe display string."""
    if actual_distance_km < 1.6:  # 1 mile
        return "Less than a mile away"
    elif actual_distance_km < 8:  # 5 miles
        return f"{round(actual_distance_km / 1.6)} miles away"  # Round to nearest mile
    elif actual_distance_km < 16:
        return "5-10 miles away"
    else:
        return f"{round(actual_distance_km / 1.6 / 5) * 5}+ miles away"  # Round to nearest 5
```

</div>
</div>

</div>

### Interview Questions: Geolocation Indexing

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8957e5;">

#### Level 1: "How do you efficiently find users within a geographic radius?"

**What They're Testing**: Basic understanding of geospatial indexing.

**Strong Answer**:
> "The naive approach of computing haversine distance to every user is O(n) and doesn't scale. Instead, I'd use spatial indexing. For moderate scale (< 500K users/region), PostGIS with an R-Tree GIST index handles radius queries in ~15ms with `ST_DWithin`. For higher scale, I'd use geohashing: convert lat/lng to a string prefix, store users by geohash in Redis or Cassandra, and query the user's cell plus 8 adjacent cells. This reduces the candidate set by 90%+ before applying exact distance filtering. Redis GEORADIUS is another option - it's faster (~3ms) but lacks preference filtering, so you filter in application code."

---

#### Level 2: "What happens when a user is at the boundary of a geohash cell?"

**What They're Testing**: Understanding of edge cases in spatial algorithms.

**Strong Answer**:
> "This is the geohash boundary problem. A user at the edge of cell 'dr5ru' might be 50 meters from someone in adjacent cell 'dr5rv', but a single-cell query would miss them. The solution is the 9-cell pattern: always query the target cell plus all 8 adjacent cells. For a 10-mile radius with precision-5 geohashes (4.9km cells), this over-fetches by ~20%, but ensures no boundary misses.

> A subtler issue is geohash discontinuities - adjacent geohashes don't always share prefixes due to the Z-curve encoding. For example, 'u000' and 'tzzz' are spatially adjacent but share no prefix. I maintain a precomputed adjacency lookup table for the geohash prefixes we use, or use a library like `python-geohash` that handles neighbor calculation correctly."

---

#### Level 3: "How would you handle location updates for 75 million monthly active users while minimizing write amplification and maintaining freshness?"

**What They're Testing**: System design at scale, write optimization, consistency trade-offs.

**Strong Answer**:
> "At 75M MAU with average 3 location updates/day, that's 225M location updates daily, or ~2,600 writes/second sustained with 10x peaks during prime time (26K writes/second).

> **Architecture**: Locations go to Redis Geo first (in-memory, handles 100K+ writes/second). A background sync job batches Redis updates to Cassandra every 5 minutes for durability. Discovery queries hit Redis, not Cassandra.

> **Write Reduction Strategies**:
> 1. **Movement threshold**: Only update if moved 500m from last recorded position. Reduces writes by ~70%.
> 2. **Time bucketing**: At most one update per 15-minute window per user.
> 3. **Geohash stability**: Update Cassandra partition only if geohash prefix changed (user moved to new cell). Redis handles fine-grained updates.

> **Freshness Trade-off**: A user who moved 400m won't reflect in the index for up to 15 minutes. For dating apps, this is acceptable - we're not ride-sharing. We show 'Last active: 10 minutes ago' which sets user expectations.

> **Hot Spot Handling**: Manhattan at 8pm Friday has 150K users updating. We shard Redis by geohash prefix (first 3 chars), spreading NYC across ~30 shards. Cassandra partitions by user_id with a secondary index on geohash for regional queries.

> **Failure Mode**: If Redis geo cluster fails, we fall back to querying Cassandra directly with eventual consistency (data up to 5 minutes stale). Discovery latency increases from 50ms to 200ms but system remains available."

</div>

---

## 2. Recommendation Engine Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### The Multi-Stage Recommendation Pipeline

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Stage 1 -->
<div style="background: #f1f5f9; border-left: 4px solid #238636; border-radius: 0 8px 8px 0; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #238636; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
<span style="color: #3fb950; font-weight: bold; font-size: 15px;">CANDIDATE GENERATION</span>
<span style="color: #8b949e; font-size: 12px;">(1M users -> 10K candidates)</span>
</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.7;">
<strong>Filters Applied:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>Geographic proximity (within user's radius preference)</li>
<li>Age range match (both directions: I want 25-35, they want my age)</li>
<li>Gender/orientation compatibility</li>
<li>Already swiped exclusion (via [[Bloom Filter]](/topic/data-structures/bloom-filter))</li>
<li>Blocked/reported users exclusion</li>
<li>Active within last 7 days (configurable)</li>
</ul>
<strong>Data Source:</strong> Elasticsearch with geo_distance query + filters
</div>
</div>

<!-- Stage 2 -->
<div style="background: #f1f5f9; border-left: 4px solid #8957e5; border-radius: 0 8px 8px 0; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #8957e5; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
<span style="color: #a371f7; font-weight: bold; font-size: 15px;">SCORING & RANKING</span>
<span style="color: #8b949e; font-size: 12px;">(10K candidates -> 500 ranked)</span>
</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.7;">

**Scoring Formula:**
```
score = w1 * elo_compatibility
      + w2 * recency_boost
      + w3 * activity_score
      + w4 * mutual_interest_score
      + w5 * photo_quality_score
      + w6 * profile_completeness
      + w7 * inverse_distance
      + w8 * they_liked_you_boost
```

**Weight Calibration:** A/B tested continuously. Current production weights are proprietary, but `elo_compatibility` and `they_liked_you_boost` typically dominate (w1, w8 > 0.25).

</div>
</div>

<!-- Stage 3 -->
<div style="background: #f1f5f9; border-left: 4px solid #1f6feb; border-radius: 0 8px 8px 0; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #1f6feb; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
<span style="color: #58a6ff; font-weight: bold; font-size: 15px;">DIVERSIFICATION & ORDERING</span>
<span style="color: #8b949e; font-size: 12px;">(500 ranked -> 100 served)</span>
</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.7;">
<strong>Goals:</strong>
<ul style="margin: 8px 0; padding-left: 20px;">
<li><strong>Diversity injection:</strong> Don't show 20 similar profiles in a row (vary by distance, looks, interests)</li>
<li><strong>Exploration vs. exploitation:</strong> Mix high-confidence matches with experimental recommendations</li>
<li><strong>Novelty:</strong> Prioritize profiles the user hasn't seen recently</li>
<li><strong>Business rules:</strong> Boost premium users, insert "They liked you" profiles (for premium subscribers)</li>
</ul>
</div>
</div>

<!-- Stage 4 -->
<div style="background: #f1f5f9; border-left: 4px solid #f0883e; border-radius: 0 8px 8px 0; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #f0883e; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
<span style="color: #f0883e; font-weight: bold; font-size: 15px;">CACHING & SERVING</span>
<span style="color: #8b949e; font-size: 12px;">(Pre-compute for active users)</span>
</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.7;">
<strong>Pre-computed Stacks:</strong> For users active in last 24 hours, compute and cache top 500 candidates in Redis.
<br><br>
<strong>Cache Key:</strong> <code>stack:{user_id}</code><br>
<strong>TTL:</strong> 2-4 hours (varies by user activity level)<br>
<strong>Invalidation Triggers:</strong> Preference change, significant location move, exhausted stack
</div>
</div>

</div>
</div>

### The ELO Desirability System

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="background: rgba(137, 87, 229, 0.15); border: 1px solid #8957e5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">Assumption</div>
<div style="color: #1e293b; font-size: 13px;">
Users have varying levels of "desirability" that can be inferred from swipe patterns. Matching users with similar desirability scores increases mutual match probability and overall user satisfaction.
</div>
</div>

**How ELO Works in Dating Apps:**

Borrowed from chess rating systems, ELO assigns each user a score (typically 1000-2500 range) that represents their relative attractiveness on the platform.

```python
class ELOSystem:
    K_FACTOR = 32  # How much a single interaction affects score

    def calculate_expected_score(self, rating_a, rating_b):
        """Probability that user A would be liked by user B."""
        return 1.0 / (1.0 + 10 ** ((rating_b - rating_a) / 400))

    def update_ratings(self, liker_rating, likee_rating, was_right_swipe):
        """
        Update ELO scores based on swipe outcome.

        If high-ELO user likes low-ELO user: low-ELO gains more points
        If low-ELO user likes high-ELO user: expected, minimal change
        If high-ELO user passes on low-ELO user: expected, minimal change
        If low-ELO user passes on high-ELO user: high-ELO loses points
        """
        expected = self.calculate_expected_score(likee_rating, liker_rating)
        actual = 1.0 if was_right_swipe else 0.0

        # Likee's score changes based on whether they received a like
        new_likee_rating = likee_rating + self.K_FACTOR * (actual - expected)

        return new_likee_rating
```

**Why ELO Matters - Real Scenario:**
> Without ELO: Sarah (very attractive) gets 5,000 likes/day. She can only review 100 profiles. 4,900 users get no response - terrible experience.
>
> With ELO: Sarah (ELO: 2200) primarily sees other high-ELO users (2000-2400). She swipes on 100, matches with 40. Meanwhile, average users (ELO: 1200) see each other and have 25%+ mutual match rates instead of 0.5%.

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 12px; margin: 12px 0;">
<div style="color: #f85149; font-weight: bold;">Trade-off: "Leagues" Controversy</div>
<div style="color: #1e293b; font-size: 13px;">
ELO creates implicit "leagues" which can feel discriminatory. Tinder officially moved away from pure ELO in 2019, replacing it with a multi-factor "desirability" score that includes profile engagement, message response rates, and behavioral signals. The concept remains - they just don't call it ELO anymore.
</div>
</div>

</div>

### Cold Start Problem

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Problem**: New user Alex joins. No swipe history, no ELO, no engagement data. How do we recommend profiles to Alex, and how do we show Alex to others?

**Solutions:**

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">

<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 8px; padding: 16px; flex: 1; min-width: 250px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px;">New User Boost</div>
<div style="color: #1e293b; font-size: 12px;">
Show new users to a diverse range of ELO brackets for first 48 hours. Track who swipes right on them to quickly calibrate their actual score. Within 100 incoming swipes, we have enough signal.
</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #1f6feb; border-radius: 8px; padding: 16px; flex: 1; min-width: 250px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Profile Proxy Signals</div>
<div style="color: #1e293b; font-size: 12px;">
Use profile completeness, photo count, bio length, verified status, connected social accounts as initial scoring proxy. More complete profiles start with higher initial scores.
</div>
</div>

<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 8px; padding: 16px; flex: 1; min-width: 250px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Photo Quality ML</div>
<div style="color: #1e293b; font-size: 12px;">
Run ML models on uploaded photos to assess quality (lighting, resolution, face visibility, smile detection). This gives an initial attractiveness proxy before behavioral data exists.
</div>
</div>

</div>

</div>

</div>

### Interview Questions: Recommendation Engine

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8957e5;">

#### Level 1: "Why not just show random profiles that match user preferences?"

**What They're Testing**: Understanding of recommendation quality impact on user engagement.

**Strong Answer**:
> "Random matching within preferences gives maybe 2-3% mutual match rate. Users swipe through 100 profiles, get 2 matches, most don't respond. Terrible experience, high churn.
>
> With intelligent ranking - particularly matching users by 'desirability scores' - mutual match rates jump to 15-25%. Users see profiles more likely to match back. When Sarah (attractive) matches with someone, that someone is more likely to be in her 'league' and respond. This 5-10x improvement in match quality directly impacts retention and session length.
>
> Additionally, smart ranking lets us optimize for business goals: boost premium users, surface 'who liked you' for conversion, and A/B test different ranking strategies."

---

#### Level 2: "How do you handle the cold start problem for new users?"

**What They're Testing**: Understanding of ML bootstrapping, proxy signals.

**Strong Answer**:
> "Cold start is dual-sided: recommending TO new users and recommending new users TO others.
>
> **For recommendations TO new users**: We use a combination of popularity-based defaults (show profiles that are broadly liked in their area) plus exploration. The first 50 profiles shown are diverse - varied ELO ranges, distances, appearance types - to gather preference signals quickly. As the user swipes, we learn their taste and personalize rapidly.
>
> **For showing new users TO others**: New user boost gives elevated visibility for 48 hours. We also use proxy signals: profile completeness score, photo quality ML assessment, verified status, connected social accounts. A user with 6 photos, a bio, verified phone, and connected Instagram starts higher than a user with 1 blurry photo and no bio.
>
> **Feedback loop**: Within ~100 incoming swipes (usually 24-48 hours for active users), we have enough signal to calibrate their actual desirability score. The boost decays as confidence in their score increases."

---

#### Level 3: "Design a system that prevents ELO score manipulation while maintaining responsive score updates."

**What They're Testing**: Adversarial thinking, system gaming, consistency at scale.

**Strong Answer**:
> "ELO manipulation attacks include: creating fake accounts to boost friends, coordinated swiping rings, rapid account recreation to exploit new-user boosts, and bot-driven mass right-swiping to artificially inflate scores.
>
> **Defense Layers:**
>
> 1. **Rate Limiting**: Cap swipes per day (free: 100, premium: unlimited but flagged after 500). Suspicious velocity triggers shadowban.
>
> 2. **Graph Analysis**: If 10 accounts always swipe right on each other and create accounts from similar IPs/devices, that's a ring. Use [[Graph Databases]](/topic/databases/graph-databases) to detect unusual connectivity patterns. Discount swipes from flagged accounts.
>
> 3. **Score Change Dampening**: Instead of immediate ELO updates, batch them hourly. Single-swipe impact is minimal. Score changes are capped per day (e.g., max +/- 50 points/day regardless of swipe volume).
>
> 4. **Confidence Weighting**: Swipes from accounts with high engagement history (messages sent, matches maintained) count more than swipes from inactive accounts.
>
> 5. **Sybil Resistance**: New accounts in 'probation' period. Their outgoing swipes don't affect others' scores until they demonstrate legitimate behavior (phone verified, photo verified, messaged matches).
>
> 6. **Anomaly Detection**: ML model trained on historical manipulation patterns flags suspicious score trajectories for human review.
>
> **Trade-off**: These defenses add latency to score updates (hours vs. seconds) and computational overhead. We accept that new users take longer to find their 'true' score in exchange for manipulation resistance."

</div>

---

## 3. Swipe Mechanics Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #da3633;">

### Swipe Data Model

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
# Swipe event schema
{
    "swipe_id": "uuid",
    "swiper_id": "user_123",
    "swiped_id": "user_456",
    "direction": "right",  # left, right, super_like
    "timestamp": "2025-01-22T20:15:30Z",
    "context": {
        "position_in_stack": 3,      # Was this profile #3 in their deck?
        "time_viewing_profile": 4.2,  # Seconds spent before swiping
        "photos_viewed": 4,           # How many photos did they look at?
        "session_swipe_count": 15     # 15th swipe this session
    }
}
```

**Why Store Context?** This metadata powers ML models for recommendation improvement. A right-swipe after 8 seconds of viewing all 6 photos is a stronger positive signal than a 0.5-second right-swipe.

</div>

### Storage Architecture for Swipes

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

At 2B+ swipes/day, storage strategy is critical.

<div style="background: #f1f5f9; border: 2px solid #f0883e; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Cassandra Schema for Swipes</div>

```sql
-- Partition by swiper, cluster by timestamp for efficient "my swipe history"
CREATE TABLE swipes_by_swiper (
    swiper_id UUID,
    swiped_at TIMESTAMP,
    swiped_id UUID,
    direction TEXT,
    PRIMARY KEY ((swiper_id), swiped_at, swiped_id)
) WITH CLUSTERING ORDER BY (swiped_at DESC)
  AND default_time_to_live = 15552000;  -- 180 days TTL

-- Partition by swiped user for "who swiped on me" (premium feature)
CREATE TABLE swipes_by_swiped (
    swiped_id UUID,
    swiped_at TIMESTAMP,
    swiper_id UUID,
    direction TEXT,
    PRIMARY KEY ((swiped_id), swiped_at, swiper_id)
) WITH CLUSTERING ORDER BY (swiped_at DESC);

-- Right swipes only - for match detection
CREATE TABLE likes (
    liker_id UUID,
    liked_id UUID,
    liked_at TIMESTAMP,
    PRIMARY KEY ((liker_id), liked_id)
);
```

</div>

**Design Decision - TTL on Swipes:**

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 12px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold;">Assumption</div>
<div style="color: #1e293b; font-size: 13px;">
Old swipes (> 6 months) have diminishing value. User preferences change, people's photos update, relationships end. Setting 180-day TTL on swipe data means users might see profiles they passed on long ago - this is a feature, not a bug. It gives second chances.
</div>
</div>

**Trade-off**: Some users find it annoying to see the same profiles again. Premium feature "Never show me this person again" stores permanent blocks in a separate table without TTL.

</div>

### Bloom Filters for "Already Swiped" Check

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**The Problem**: When generating recommendations, we must exclude profiles the user already swiped on. Checking against 20,000+ swipe records per user is slow.

**Solution**: [[Bloom Filters]](/topic/data-structures/bloom-filter) - probabilistic data structures for set membership.

```python
import redis

class SwipeTracker:
    def __init__(self, redis_client):
        self.redis = redis_client
        # Target: 1% false positive rate, expected 20K items per filter
        # Size: ~24KB per user (20,000 items * 10 bits/item)

    def record_swipe(self, swiper_id: str, swiped_id: str, direction: str):
        """Record a swipe in the bloom filter."""
        # Add to bloom filter (for "already swiped" check)
        self.redis.execute_command(
            'BF.ADD', f'swipes:bloom:{swiper_id}', swiped_id
        )

        # If right swipe, also store in sorted set (for match detection)
        if direction == 'right':
            self.redis.zadd(
                f'likes:{swiper_id}',
                {swiped_id: time.time()}
            )
            # Keep only last 10,000 likes (memory management)
            self.redis.zremrangebyrank(f'likes:{swiper_id}', 0, -10001)

    def has_swiped(self, swiper_id: str, target_id: str) -> bool:
        """
        Check if user already swiped on target.

        Returns:
            True = definitely swiped OR false positive (1% chance)
            False = definitely NOT swiped
        """
        return self.redis.execute_command(
            'BF.EXISTS', f'swipes:bloom:{swiper_id}', target_id
        )

    def filter_candidates(self, swiper_id: str, candidates: list) -> list:
        """Remove already-swiped candidates from recommendation list."""
        # Batch check with pipeline for efficiency
        pipe = self.redis.pipeline()
        for candidate_id in candidates:
            pipe.execute_command(
                'BF.EXISTS', f'swipes:bloom:{swiper_id}', candidate_id
            )
        results = pipe.execute()

        return [
            candidates[i] for i, swiped in enumerate(results)
            if not swiped
        ]
```

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px;">Bloom Filter Pros</div>
<ul style="color: #1e293b; font-size: 12px; margin: 0; padding-left: 16px;">
<li>O(1) lookup, ~0.1ms</li>
<li>Space efficient: ~24KB vs 160KB for explicit set</li>
<li>No false negatives guaranteed</li>
</ul>
</div>

<div style="background: #f1f5f9; border: 2px solid #f85149; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Bloom Filter Cons</div>
<ul style="color: #1e293b; font-size: 12px; margin: 0; padding-left: 16px;">
<li>~1% false positives (user might miss a profile they never swiped)</li>
<li>Can't remove items (use Cuckoo filter if needed)</li>
<li>Must rebuild if corrupted</li>
</ul>
</div>
</div>

**Edge Case - Filter Rebuild**: If Redis loses bloom filter data, users see profiles they already swiped on. Mitigation: Nightly job rebuilds bloom filters from Cassandra swipe history for active users.

</div>

### Rate Limiting Swipes

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Business Requirement**: Free users get 100 right-swipes per 12-hour window. Premium users: unlimited. Super Likes: 1/day free, 5/day premium.

```python
class SwipeRateLimiter:
    def __init__(self, redis_client):
        self.redis = redis_client

    def check_and_record_swipe(self, user_id: str, is_premium: bool,
                                direction: str) -> tuple[bool, dict]:
        """
        Check if user can swipe and record if allowed.

        Returns: (allowed: bool, info: dict)
        """
        now = time.time()
        window_key = f"swipes:window:{user_id}"
        super_key = f"super:window:{user_id}"

        if direction == 'super_like':
            # Check super like limit
            super_count = self.redis.get(super_key) or 0
            super_limit = 5 if is_premium else 1

            if int(super_count) >= super_limit:
                ttl = self.redis.ttl(super_key)
                return False, {"reason": "super_limit", "reset_in": ttl}

            # Record super like
            pipe = self.redis.pipeline()
            pipe.incr(super_key)
            pipe.expire(super_key, 86400)  # 24 hour window
            pipe.execute()
            return True, {"super_remaining": super_limit - int(super_count) - 1}

        if direction == 'right':
            if is_premium:
                return True, {"unlimited": True}

            # Check right swipe limit for free users
            right_count = self.redis.get(window_key) or 0

            if int(right_count) >= 100:
                ttl = self.redis.ttl(window_key)
                return False, {
                    "reason": "like_limit",
                    "reset_in": ttl,
                    "upsell": "Get Tinder Gold for unlimited likes!"
                }

            # Record right swipe
            pipe = self.redis.pipeline()
            pipe.incr(window_key)
            pipe.expire(window_key, 43200)  # 12 hour window
            pipe.execute()
            return True, {"likes_remaining": 100 - int(right_count) - 1}

        # Left swipes always allowed
        return True, {}
```

<div style="background: rgba(240, 136, 62, 0.15); border: 1px solid #f0883e; border-radius: 8px; padding: 12px; margin: 12px 0;">
<div style="color: #f0883e; font-weight: bold;">Trade-off: Strictness vs. User Experience</div>
<div style="color: #1e293b; font-size: 13px;">
Hard limits frustrate users but drive premium conversions. Soft limits (slow down swiping speed after 100) are more user-friendly but less monetizable. Tinder uses hard limits. Bumble uses soft limits with "out of swipes" messaging.
</div>
</div>

</div>

</div>

### Interview Questions: Swipe Mechanics

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8957e5;">

#### Level 1: "How do you prevent showing someone a user they already swiped on?"

**What They're Testing**: Understanding of efficient set membership testing.

**Strong Answer**:
> "At scale, we can't query the swipes table for every candidate - that's O(n) per recommendation request. Instead, we use Bloom filters. When a user swipes, we add the target to their Bloom filter. When generating recommendations, we check each candidate against the filter in O(1) time.
>
> Bloom filters have ~1% false positive rate - meaning 1% of the time, we incorrectly think someone was swiped on when they weren't. This is acceptable because the cost is just a missed recommendation, not a bad match. There are no false negatives, so we never show a profile they definitely swiped on.
>
> For right-swipes specifically, we also store in a Redis sorted set because we need exact membership for match detection - can't tolerate false positives there."

---

#### Level 2: "What happens when a user's Bloom filter gets corrupted or lost?"

**What They're Testing**: Failure handling, data recovery strategies.

**Strong Answer**:
> "If the Bloom filter is lost, users will see profiles they already swiped on. This is annoying but not catastrophic - they'll just swipe the same direction again or block if they don't like the person.
>
> **Recovery Strategy:**
> 1. **Detection**: Monitor Bloom filter miss rates. If a user suddenly has 50% of their swipes on 'new' profiles marked as duplicates by the backend, their filter might be corrupted.
>
> 2. **Rebuild**: Nightly job scans Cassandra swipe history for active users and rebuilds their Bloom filters. For on-demand rebuild, we can trigger it if corruption is detected.
>
> 3. **Graceful Degradation**: If Redis Bloom filter module is completely down, fall back to querying Cassandra directly with a subquery: `WHERE swiped_id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = ?)`. Slower but functional.
>
> 4. **Client-side Cache**: Mobile app caches recently swiped IDs locally. This catches most duplicates even if server-side filter fails."

---

#### Level 3: "Design the data pipeline for ingesting 2 billion swipes per day while maintaining sub-second match notification latency."

**What They're Testing**: High-throughput event processing, exactly-once semantics, latency guarantees.

**Strong Answer**:
> "2B swipes/day = ~23K swipes/second average, with 5-10x peaks during primetime (115K-230K/second).
>
> **Architecture:**
>
> 1. **Ingestion Layer**: Swipes hit an API Gateway that does auth and basic validation, then immediately writes to Kafka topic `swipes_raw` (partitioned by swiper_id for ordering). Response to client: 'swipe recorded' in < 50ms.
>
> 2. **Match Detection Stream Processor**: Kafka Streams application consumes `swipes_raw`. For right-swipes, it checks Redis sorted set `likes:{swiped_user}` to see if they already liked us. If mutual like found, publishes to `matches` topic and to `notifications` topic.
>
> 3. **Persistence Worker**: Separate Kafka consumer writes swipes to Cassandra in batches (1000 swipes per batch). Cassandra handles ~100K writes/second easily with proper cluster sizing.
>
> 4. **Bloom Filter Updater**: Another consumer updates Redis Bloom filters for 'already swiped' tracking.
>
> **Match Notification Path (latency-critical):**
> - Swipe -> Kafka (5ms) -> Stream Processor checks Redis (10ms) -> Match detected -> Notification topic (5ms) -> Push notification service -> FCM/APNS (100-500ms)
> - Total: < 600ms from swipe to push notification
>
> **Exactly-Once Semantics**: Kafka consumer uses idempotent writes to Cassandra (swipe_id is unique key). Redis updates are idempotent (ZADD, BF.ADD). Match creation checks for existing match before creating.
>
> **Backpressure**: If Cassandra slows down, Kafka consumer lag increases but match detection (Redis path) remains fast. We alert on consumer lag > 5 minutes."

</div>

---

## 4. Match Detection Algorithm

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #fe3c72;">

### The Simultaneous Swipe Race Condition

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.15); border: 2px solid #f85149; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">The Race Condition Scenario</div>
<div style="color: #1e293b; font-size: 13px;">
At 9:47:32.150pm, Sarah and Mike both swipe right on each other from different phones simultaneously:

1. Sarah's request hits Server A: "Did Mike like me?" -> Query returns NO (Mike's like not yet persisted)
2. Mike's request hits Server B: "Did Sarah like me?" -> Query returns NO (Sarah's like not yet persisted)
3. Both servers persist the likes
4. **Result**: Both likes stored, but neither server detected the match. Sarah and Mike never find out they matched.
</div>
</div>

**Probability**: With 50M matches/day, even 0.01% race condition rate = 5,000 lost matches daily.

</div>

### Solution 1: Deterministic Distributed Locking

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
import redis
from contextlib import contextmanager

class MatchDetector:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.lock_ttl = 5  # 5 second lock timeout

    def _get_lock_key(self, user_a: str, user_b: str) -> str:
        """
        Deterministic lock key - same regardless of who swipes first.
        Critical: sorted order ensures both directions use same lock.
        """
        sorted_ids = sorted([user_a, user_b])
        return f"match_lock:{sorted_ids[0]}:{sorted_ids[1]}"

    @contextmanager
    def _acquire_lock(self, lock_key: str):
        """Acquire distributed lock with timeout."""
        lock = self.redis.lock(lock_key, timeout=self.lock_ttl)
        acquired = lock.acquire(blocking=True, blocking_timeout=3)
        if not acquired:
            raise TimeoutError(f"Could not acquire lock {lock_key}")
        try:
            yield
        finally:
            lock.release()

    def process_right_swipe(self, swiper_id: str, swiped_id: str) -> dict:
        """
        Process a right swipe with race-condition-safe match detection.
        """
        lock_key = self._get_lock_key(swiper_id, swiped_id)

        with self._acquire_lock(lock_key):
            # Step 1: Record this like
            self.redis.zadd(
                f"likes:{swiper_id}",
                {swiped_id: time.time()}
            )

            # Step 2: Check for mutual like (within lock, so atomic)
            mutual_like = self.redis.zscore(
                f"likes:{swiped_id}",
                swiper_id
            )

            if mutual_like is not None:
                # It's a match!
                match_id = self._create_match(swiper_id, swiped_id)
                self._notify_match(match_id, swiper_id, swiped_id)
                return {"matched": True, "match_id": match_id}

            return {"matched": False}

    def _create_match(self, user_a: str, user_b: str) -> str:
        """Create match record (idempotent)."""
        match_id = f"match:{min(user_a, user_b)}:{max(user_a, user_b)}"

        # Check if match already exists (idempotency)
        if self.redis.exists(match_id):
            return match_id

        # Create match
        match_data = {
            "user_a": min(user_a, user_b),
            "user_b": max(user_a, user_b),
            "created_at": time.time()
        }
        self.redis.hset(match_id, mapping=match_data)

        # Publish match event
        self.kafka.produce("matches", match_data)

        return match_id
```

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 12px; margin: 12px 0;">
<div style="color: #58a6ff; font-weight: bold;">Key Insight: Deterministic Lock Key</div>
<div style="color: #1e293b; font-size: 13px;">
By sorting user IDs, we ensure that regardless of who swipes first (Sarah->Mike or Mike->Sarah), both requests compete for the same lock: <code>match_lock:mike_123:sarah_456</code>. One request wins, completes the check, then the other request proceeds and finds the match.
</div>
</div>

</div>

### Solution 2: Event Sourcing with Asynchronous Reconciliation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

For extreme scale (>100K swipes/second), synchronous locking creates contention. Alternative: eventually consistent match detection.

```python
class AsyncMatchDetector:
    """
    Event-sourced approach: swipes are immutable events.
    A stream processor detects matches asynchronously.
    """

    def process_swipe(self, swiper_id: str, swiped_id: str, direction: str):
        """Write swipe event to Kafka immediately - no locking."""
        event = {
            "event_id": str(uuid.uuid4()),
            "swiper_id": swiper_id,
            "swiped_id": swiped_id,
            "direction": direction,
            "timestamp": time.time()
        }

        # Partition by pair (sorted) so both directions go to same partition
        partition_key = f"{min(swiper_id, swiped_id)}:{max(swiper_id, swiped_id)}"
        self.kafka.produce("swipes", key=partition_key, value=event)

        return {"status": "recorded"}

    # Kafka Streams processor
    def match_detector_processor(self):
        """
        Runs as Kafka Streams application.
        Maintains in-memory state of recent right-swipes.
        """
        # State store: map of (pair_key) -> list of swipe events
        state_store = {}  # In practice, use Kafka Streams state store

        for event in kafka_consumer("swipes"):
            if event["direction"] != "right":
                continue

            pair_key = f"{min(event['swiper_id'], event['swiped_id'])}:" \
                       f"{max(event['swiper_id'], event['swiped_id'])}"

            if pair_key not in state_store:
                state_store[pair_key] = []

            state_store[pair_key].append(event)

            # Check if we have both directions
            swipers = {e["swiper_id"] for e in state_store[pair_key]}
            if len(swipers) == 2:
                # Match detected!
                self.create_match(event["swiper_id"], event["swiped_id"])
                del state_store[pair_key]  # Clean up
```

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
<div style="background: #f1f5f9; border: 2px solid #238636; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px;">Pros</div>
<ul style="color: #1e293b; font-size: 12px; margin: 0; padding-left: 16px;">
<li>No distributed locking overhead</li>
<li>Scales linearly with partitions</li>
<li>Swipe latency unaffected by match detection</li>
</ul>
</div>

<div style="background: #f1f5f9; border: 2px solid #f85149; border-radius: 8px; padding: 16px; flex: 1; min-width: 200px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Cons</div>
<ul style="color: #1e293b; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Match notification delay (50-500ms after swipe)</li>
<li>More complex architecture</li>
<li>State store management</li>
</ul>
</div>
</div>

</div>

### Background Reconciliation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

Even with good match detection, edge cases exist. A nightly job catches orphaned mutual likes:

```python
def reconcile_orphaned_matches():
    """
    Find pairs where both users liked each other but no match exists.
    Run nightly during low-traffic hours.
    """
    query = """
    SELECT l1.liker_id as user_a, l1.liked_id as user_b
    FROM likes l1
    JOIN likes l2 ON l1.liker_id = l2.liked_id AND l1.liked_id = l2.liker_id
    LEFT JOIN matches m ON
        (m.user_a = LEAST(l1.liker_id, l1.liked_id) AND
         m.user_b = GREATEST(l1.liker_id, l1.liked_id))
    WHERE m.match_id IS NULL
    AND l1.liker_id < l1.liked_id  -- Avoid duplicates
    """

    orphaned = cassandra.execute(query)

    for row in orphaned:
        create_match(row.user_a, row.user_b)
        notify_delayed_match(row.user_a, row.user_b)

    metrics.record("orphaned_matches_reconciled", len(orphaned))
```

</div>

</div>

### Interview Questions: Match Detection

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8957e5;">

#### Level 1: "How do you detect when two users have mutually liked each other?"

**What They're Testing**: Basic understanding of mutual relationship detection.

**Strong Answer**:
> "When User A swipes right on User B, I check if User B previously liked User A. I store right-swipes in a Redis sorted set keyed by liker: `likes:{user_a}` contains `{user_b: timestamp}`. The match check is: `ZSCORE likes:{user_b} {user_a}` - if it returns a score, B liked A, so it's a match.
>
> This is O(1) lookup in Redis. When a match is found, we create a match record, initialize a chat conversation, and send push notifications to both users."

---

#### Level 2: "What happens if both users swipe right at the exact same moment?"

**What They're Testing**: Race condition awareness, distributed systems thinking.

**Strong Answer**:
> "This is the simultaneous swipe race condition. If both requests check for mutual likes before either persists their own like, neither detects the match.
>
> **Solution: Deterministic distributed locking.** Before checking and writing, acquire a lock keyed by the sorted user ID pair: `match_lock:{min(a,b)}:{max(a,b)}`. Regardless of who swipes first, both requests compete for the same lock. One wins, completes the check-and-write atomically, then releases. The other acquires the lock, writes their like, checks for mutual, and finds the match.
>
> Lock TTL is 5 seconds to prevent deadlocks if a server crashes while holding it. At our scale, lock contention is minimal - the probability of two specific users swiping at the exact same moment is very low."

---

#### Level 3: "How would you handle match detection at 100K swipes/second while guaranteeing no matches are lost and notifications arrive within 500ms?"

**What They're Testing**: Extreme scale architecture, exactly-once guarantees, latency optimization.

**Strong Answer**:
> "At 100K swipes/second, synchronous locking creates contention. I'd use an event-sourced architecture:
>
> **Swipe Path (latency-optimized):**
> - Client -> API Gateway -> Write to Kafka `swipes` topic -> Return success
> - Latency: < 20ms
> - Kafka partitioned by sorted user pair, so both directions of a potential match go to the same partition
>
> **Match Detection (Kafka Streams):**
> - Stream processor consumes `swipes` topic
> - Maintains local RocksDB state store of recent right-swipes by user pair
> - When second right-swipe arrives for a pair, match is detected
> - Publishes to `matches` topic, triggers notification
>
> **Why this guarantees no lost matches:**
> - Kafka provides exactly-once semantics with idempotent producers and transactional consumers
> - Same partition for both swipes = processed by same stream processor instance = consistent state
> - If processor crashes, Kafka Streams replays from checkpoint with state recovery
>
> **Notification Latency:**
> - Match detected -> Kafka `notifications` topic -> Notification service -> FCM/APNS
> - Kafka internal latency: ~10-50ms
> - FCM/APNS: ~100-300ms
> - Total: < 400ms typical, < 500ms P99
>
> **Backpressure handling:**
> - If notification service is slow, matches queue up in Kafka topic
> - Swipe processing is decoupled - users can keep swiping
> - We alert if notification lag exceeds 1 minute"

</div>

---

## 5. Real-Time Messaging Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### Chat Architecture Overview

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 16px;">

<!-- Client Connection -->
<div style="background: #21262d; border: 2px solid #fe3c72; border-radius: 8px; padding: 16px;">
<div style="color: #fe3c72; font-weight: bold; margin-bottom: 8px;">Client Connection Layer</div>
<div style="color: #1e293b; font-size: 13px;">
WebSocket connections from mobile/web clients. Each connection authenticated via JWT and registered with a Connection Manager that tracks which server handles which user.
</div>
</div>

<!-- WebSocket Servers -->
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #f1f5f9; border: 1px solid #58a6ff; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-size: 12px;">WS Server 1</div>
<div style="color: #8b949e; font-size: 10px;">10K connections</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #58a6ff; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-size: 12px;">WS Server 2</div>
<div style="color: #8b949e; font-size: 10px;">10K connections</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #58a6ff; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-size: 12px;">WS Server N</div>
<div style="color: #8b949e; font-size: 10px;">10K connections</div>
</div>
</div>

<!-- Redis Pub/Sub -->
<div style="background: #21262d; border: 2px solid #da3633; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Redis Pub/Sub (Message Fanout)</div>
<div style="color: #1e293b; font-size: 13px;">
When User A on Server 1 sends a message to User B on Server 3, the message is published to Redis channel <code>user:{user_b}</code>. Server 3 subscribes to that channel and delivers to User B's WebSocket.
</div>
</div>

<!-- Message Storage -->
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #f1f5f9; border: 1px solid #8957e5; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #a371f7; font-size: 12px;">Cassandra</div>
<div style="color: #8b949e; font-size: 10px;">Message persistence</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #f0883e; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #f0883e; font-size: 12px;">Redis</div>
<div style="color: #8b949e; font-size: 10px;">Recent messages cache</div>
</div>
<div style="background: #f1f5f9; border: 1px solid #3fb950; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #3fb950; font-size: 12px;">S3</div>
<div style="color: #8b949e; font-size: 10px;">Media attachments</div>
</div>
</div>

</div>
</div>

### Message Data Model

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
# Message schema
{
    "message_id": "uuid",
    "conversation_id": "match_123_456",  # Derived from match
    "sender_id": "user_123",
    "recipient_id": "user_456",
    "content": {
        "type": "text",  # text, image, gif, location
        "text": "Hey! How's your day going?",
        "media_url": null  # S3 URL for media messages
    },
    "sent_at": "2025-01-22T20:30:00Z",
    "delivered_at": null,  # Set when recipient's device ACKs
    "read_at": null,       # Set when recipient views
    "status": "sent"       # sent, delivered, read
}
```

**Cassandra Schema:**

```sql
-- Messages by conversation (for loading chat history)
CREATE TABLE messages_by_conversation (
    conversation_id TEXT,
    sent_at TIMESTAMP,
    message_id UUID,
    sender_id UUID,
    content TEXT,  -- JSON
    status TEXT,
    PRIMARY KEY ((conversation_id), sent_at, message_id)
) WITH CLUSTERING ORDER BY (sent_at DESC);

-- Conversations by user (for inbox)
CREATE TABLE conversations_by_user (
    user_id UUID,
    last_message_at TIMESTAMP,
    conversation_id TEXT,
    other_user_id UUID,
    last_message_preview TEXT,
    unread_count INT,
    PRIMARY KEY ((user_id), last_message_at, conversation_id)
) WITH CLUSTERING ORDER BY (last_message_at DESC);
```

</div>

### WebSocket Connection Management

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```python
class ConnectionManager:
    """
    Tracks which WebSocket server handles which user.
    Enables cross-server message delivery via Redis Pub/Sub.
    """

    def __init__(self, redis_client, server_id):
        self.redis = redis_client
        self.server_id = server_id
        self.local_connections = {}  # user_id -> WebSocket

    async def register_connection(self, user_id: str, websocket):
        """User connected to this server."""
        # Store locally
        self.local_connections[user_id] = websocket

        # Register in Redis (for cross-server routing)
        self.redis.hset(
            "user_connections",
            user_id,
            json.dumps({
                "server_id": self.server_id,
                "connected_at": time.time()
            })
        )

        # Subscribe to user's channel for incoming messages
        await self.subscribe_to_user_channel(user_id)

        # Update online status
        self.redis.setex(f"online:{user_id}", 300, "1")  # 5 min TTL

    async def subscribe_to_user_channel(self, user_id: str):
        """Subscribe to Redis Pub/Sub for messages to this user."""
        pubsub = self.redis.pubsub()
        await pubsub.subscribe(f"user_messages:{user_id}")

        async for message in pubsub.listen():
            if message["type"] == "message":
                await self.deliver_to_local_connection(
                    user_id,
                    json.loads(message["data"])
                )

    async def send_message(self, sender_id: str, recipient_id: str, content: dict):
        """Send a message, routing to correct server."""
        message = {
            "message_id": str(uuid.uuid4()),
            "sender_id": sender_id,
            "recipient_id": recipient_id,
            "content": content,
            "sent_at": time.time()
        }

        # Persist to Cassandra
        await self.persist_message(message)

        # Check if recipient is connected locally
        if recipient_id in self.local_connections:
            await self.deliver_to_local_connection(recipient_id, message)
        else:
            # Publish to Redis for cross-server delivery
            self.redis.publish(
                f"user_messages:{recipient_id}",
                json.dumps(message)
            )

        return message
```

</div>

### Message Delivery Guarantees

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

**Challenge**: User might be offline, on flaky connection, or switching between WiFi and cellular.

<div style="display: flex; flex-direction: column; gap: 16px; margin: 16px 0;">

<div style="background: #f1f5f9; border-left: 4px solid #238636; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px;">At-Least-Once Delivery</div>
<div style="color: #1e293b; font-size: 13px;">
Messages are persisted to Cassandra before sending. If WebSocket delivery fails, the message remains stored. When user reconnects, they query for messages since their last seen timestamp.
</div>
</div>

<div style="background: #f1f5f9; border-left: 4px solid #1f6feb; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Delivery ACK</div>
<div style="color: #1e293b; font-size: 13px;">
Client sends ACK when message is received and displayed. Server updates <code>delivered_at</code> timestamp. Sender sees checkmark change from "sent" to "delivered."
</div>
</div>

<div style="background: #f1f5f9; border-left: 4px solid #f0883e; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Read Receipts</div>
<div style="color: #1e293b; font-size: 13px;">
When recipient scrolls chat to view messages, client sends "read" event with list of message IDs. Server updates <code>read_at</code> timestamps and notifies sender (if online) via WebSocket.
</div>
</div>

<div style="background: #f1f5f9; border-left: 4px solid #da3633; border-radius: 0 8px 8px 0; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Offline Queue + Push</div>
<div style="color: #1e293b; font-size: 13px;">
If recipient is offline (no WebSocket, no Redis entry), message is queued and a push notification is sent via FCM/APNS. On app open, client syncs from last known message timestamp.
</div>
</div>

</div>

```python
async def handle_message_ack(self, user_id: str, message_ids: list, ack_type: str):
    """
    Handle delivery/read acknowledgments from client.
    """
    timestamp = time.time()

    for message_id in message_ids:
        # Update message status in Cassandra
        if ack_type == "delivered":
            await self.cassandra.execute(
                "UPDATE messages SET delivered_at = ?, status = 'delivered' "
                "WHERE message_id = ?",
                timestamp, message_id
            )
        elif ack_type == "read":
            await self.cassandra.execute(
                "UPDATE messages SET read_at = ?, status = 'read' "
                "WHERE message_id = ?",
                timestamp, message_id
            )

        # Notify sender of status change (if online)
        message = await self.get_message(message_id)
        sender_id = message["sender_id"]

        status_update = {
            "type": "message_status",
            "message_id": message_id,
            "status": ack_type,
            "timestamp": timestamp
        }

        if sender_id in self.local_connections:
            await self.deliver_to_local_connection(sender_id, status_update)
        else:
            self.redis.publish(f"user_messages:{sender_id}", json.dumps(status_update))
```

</div>

### Typing Indicators

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="background: rgba(56, 139, 253, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
<div style="color: #58a6ff; font-weight: bold;">Design Choice</div>
<div style="color: #1e293b; font-size: 13px;">
Typing indicators are ephemeral - we don't persist them. They flow directly through Redis Pub/Sub with short TTL. If lost, the worst case is the other person doesn't see "typing..." for a moment.
</div>
</div>

```python
async def send_typing_indicator(self, sender_id: str, recipient_id: str, is_typing: bool):
    """
    Send typing indicator. Ephemeral - not persisted.
    """
    indicator = {
        "type": "typing",
        "sender_id": sender_id,
        "is_typing": is_typing,
        "timestamp": time.time()
    }

    # Direct publish - no persistence
    self.redis.publish(f"user_messages:{recipient_id}", json.dumps(indicator))

    # Set/clear typing flag with short TTL (auto-expire if client disconnects)
    if is_typing:
        self.redis.setex(
            f"typing:{sender_id}:{recipient_id}",
            5,  # 5 second TTL
            "1"
        )
    else:
        self.redis.delete(f"typing:{sender_id}:{recipient_id}")
```

</div>

### Message Moderation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.15); border: 1px solid #f85149; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Safety Requirement</div>
<div style="color: #1e293b; font-size: 13px;">
Dating apps are targets for harassment, scams, and inappropriate content. All messages must be filterable for safety.
</div>
</div>

**Moderation Pipeline:**

1. **Pre-send ML Classification**: Message content run through toxicity classifier before delivery. High-confidence harassment blocked immediately with warning to sender.

2. **Post-send Async Analysis**: All messages queued for deeper analysis (scam detection, underage content detection). Flagged content triggers human review.

3. **User Reporting**: "Report message" button queues message + context for human moderators.

4. **Progressive Enforcement**: Warning -> Shadow-ban (messages sent but not delivered) -> Account suspension.

```python
class MessageModerator:
    async def pre_send_check(self, message: dict) -> tuple[bool, str]:
        """
        Quick pre-send safety check.
        Returns (allowed, reason).
        """
        content = message["content"].get("text", "")

        # Fast keyword blocklist
        if self.contains_blocked_keywords(content):
            return False, "Message contains prohibited content"

        # ML toxicity check (< 50ms)
        toxicity_score = await self.toxicity_model.predict(content)
        if toxicity_score > 0.9:
            self.log_violation(message, "high_toxicity")
            return False, "Message flagged for review"

        return True, ""

    async def post_send_analysis(self, message: dict):
        """
        Async deep analysis after message sent.
        """
        # Queue for analysis pipeline
        await self.kafka.produce("messages_for_analysis", message)
```

</div>

</div>

### Interview Questions: Real-Time Messaging

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8957e5;">

#### Level 1: "How do you deliver a message between two users who are connected to different servers?"

**What They're Testing**: Understanding of WebSocket connection management and message routing.

**Strong Answer**:
> "Each WebSocket server maintains local connections and registers them in a shared store (Redis). When User A on Server 1 sends a message to User B on Server 3:
>
> 1. Server 1 looks up which server handles User B by checking Redis: `HGET user_connections user_b`
> 2. If different server, Server 1 publishes the message to Redis Pub/Sub channel `user_messages:{user_b}`
> 3. Server 3 is subscribed to that channel and receives the message
> 4. Server 3 pushes the message to User B's WebSocket
>
> Redis Pub/Sub provides the fan-out mechanism. The alternative is direct server-to-server communication, but Pub/Sub is simpler and doesn't require service discovery between WebSocket servers."

---

#### Level 2: "How do you handle message delivery when the recipient is offline?"

**What They're Testing**: Offline sync, push notifications, delivery guarantees.

**Strong Answer**:
> "Messages are always persisted to Cassandra before any delivery attempt - this is the source of truth.
>
> **Delivery flow:**
> 1. Persist to Cassandra with status 'sent'
> 2. Check if recipient has active WebSocket (Redis `online:{user_id}` key exists)
> 3. If online: deliver via WebSocket, wait for ACK, update to 'delivered'
> 4. If offline: Queue push notification via FCM/APNS with message preview
>
> **On reconnect:**
> - Client sends last message timestamp they have for each conversation
> - Server returns all messages since that timestamp
> - Client sends batch ACK for received messages
>
> **Edge case - notification then comes online:**
> User receives push, opens app before we can deliver via WebSocket. The app sync on open handles this - they pull all undelivered messages."

---

#### Level 3: "Design a chat system that handles 500 million messages per day with sub-second delivery latency and exactly-once delivery semantics."

**What They're Testing**: Scale architecture, consistency guarantees, failure handling.

**Strong Answer**:
> "500M messages/day = ~5,800 messages/second average, 30K+ at peak.
>
> **Architecture:**
>
> **Connection Tier:**
> - WebSocket servers behind load balancer with sticky sessions
> - Each server handles 10K concurrent connections
> - 50+ servers for 500K concurrent users (typical for 75M MAU app)
> - Connection registry in Redis Cluster (sharded by user_id hash)
>
> **Message Flow:**
> 1. Client -> WebSocket Server -> Kafka `messages` topic (partitioned by conversation_id)
> 2. Kafka Consumer -> Cassandra (batch writes, 1000 messages/batch)
> 3. Kafka Consumer -> Redis Pub/Sub (for online delivery)
> 4. If recipient offline -> Kafka `notifications` topic -> Push service
>
> **Exactly-Once Semantics:**
> - Client assigns message_id (UUID) before sending
> - Server uses message_id as idempotency key in Cassandra
> - Kafka consumers use idempotent writes
> - If client doesn't receive ACK, it retries with same message_id
> - Cassandra's lightweight transactions prevent duplicates: `INSERT IF NOT EXISTS`
>
> **Latency Path (online recipient):**
> - Client -> WebSocket Server: 20ms
> - Server -> Redis Pub/Sub -> Recipient's Server: 10ms
> - Server -> Recipient's WebSocket: 20ms
> - Total: ~50ms typical, < 200ms P99
>
> **Failure Handling:**
> - WebSocket server crash: Clients reconnect to different server, sync from last timestamp
> - Redis Pub/Sub down: Messages queue in Kafka, delivered on Redis recovery
> - Cassandra slow: Messages queue in Kafka, delivery continues via Redis (eventual persistence)
> - Client says 'delivered' but ACK lost: Deduplication on sync handles duplicate delivery"

</div>

---

## Technology Selection Matrix

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

| Component | Technology | Why This Choice | When to Reconsider |
|-----------|------------|-----------------|-------------------|
| **User Profiles** | PostgreSQL | ACID compliance, complex queries, [[PostGIS]](/topic/databases/postgis) for location | > 100M users: shard or use [[Vitess]](/topic/databases/vitess) |
| **Swipe Storage** | Cassandra | Write-optimized, horizontal scaling, TTL support | < 10M swipes: PostgreSQL with partitioning |
| **Geo Index** | Redis Geo + Elasticsearch | Sub-ms queries, flexible filtering | < 100K users/region: PostGIS alone |
| **Already Swiped** | Redis [[Bloom Filters]](/topic/data-structures/bloom-filter) | O(1) lookup, space efficient | < 10K swipes/user: SQL NOT IN |
| **Match Detection** | Redis Sorted Sets + Locks | Atomic operations, sub-ms latency | Event sourcing at > 100K swipes/sec |
| **Chat Messages** | Cassandra | Time-series optimized, wide rows | < 100M messages: PostgreSQL JSONB |
| **Real-time Delivery** | WebSocket + Redis Pub/Sub | Bi-directional, cross-server fanout | < 10K concurrent: Long polling |
| **Event Streaming** | Apache Kafka | Exactly-once, replay capability | < 10K events/sec: Redis Streams |
| **Push Notifications** | FCM + APNS | Industry standard, reliable | No alternative at scale |
| **Photo Storage** | S3 + CloudFront CDN | Scalable, global distribution | Cloudflare R2 for cost savings |
| **ML Inference** | SageMaker / Custom | Managed or full control | TensorFlow Serving for OSS |

</div>

---

## Scaling Evolution

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Phase 1 -->
<div style="background: #21262d; border: 2px solid #238636; border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold;">Phase 1: MVP</div>
<span style="color: #8b949e;">< 50K users</span>
</div>
<div style="color: #1e293b; font-size: 13px;">

**Stack**: PostgreSQL + PostGIS + Redis + S3

**Architecture**: Monolith on 2-3 servers

**Discovery**: SQL query with `ST_DWithin`, ordered by `last_active`

**Swipe Check**: `NOT IN (SELECT target_id FROM swipes WHERE user_id = ?)`

**Chat**: PostgreSQL + simple WebSocket server

**Cost**: ~$500-1,000/month

**Key Insight**: Don't over-engineer. Bumble started with random matching. Prove product-market fit first.

</div>
</div>

<!-- Phase 2 -->
<div style="background: #21262d; border: 2px solid #1f6feb; border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #1f6feb; color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold;">Phase 2: Growth</div>
<span style="color: #8b949e;">50K - 1M users</span>
</div>
<div style="color: #1e293b; font-size: 13px;">

**Stack**: PostgreSQL + Elasticsearch + Redis Cluster + Cassandra + Kafka

**Architecture**: Microservices - separate Profile, Discovery, Matching, Chat services

**Discovery**: Elasticsearch with geo_distance + ML scoring

**Swipe Check**: Redis Bloom Filters

**Chat**: Cassandra + WebSocket cluster + Redis Pub/Sub

**Cost**: ~$10,000-30,000/month

**Key Insight**: Split services when team grows (> 8 engineers) or when specific bottlenecks emerge.

</div>
</div>

<!-- Phase 3 -->
<div style="background: #21262d; border: 2px solid #8957e5; border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #8957e5; color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold;">Phase 3: Scale</div>
<span style="color: #8b949e;">> 10M users</span>
</div>
<div style="color: #1e293b; font-size: 13px;">

**Stack**: Global PostgreSQL (Vitess/CockroachDB) + Regional Elasticsearch + Redis Cluster + Cassandra Multi-DC + Kafka

**Architecture**: Multi-region deployment with regional data residency

**Discovery**: Pre-computed stacks + real-time fallback

**Swipe Check**: Bloom Filters + event sourcing for match detection

**Chat**: Regional Cassandra clusters + cross-region async replication

**Cost**: ~$100,000-500,000/month

**Key Insight**: Optimize for regional latency. Users don't need global consistency - just fast local experience.

</div>
</div>

</div>
</div>

---

## Cross-References

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Related System Designs
- [[Design Bumble]](/topic/system-architectures/bumble) - Similar dating app with women-first messaging
- [[Design Instagram]](/topic/system-architectures/instagram) - Photo storage and CDN at scale
- [[Design WhatsApp]](/topic/system-architectures/whatsapp) - Real-time messaging deep dive
- [[Design Uber]](/topic/system-architectures/uber) - Geolocation at extreme scale

### Data Structures & Algorithms
- [[Bloom Filters]](/topic/data-structures/bloom-filter) - Probabilistic set membership
- [[Geohashing]](/topic/algorithms/geohashing) - Spatial indexing technique
- [[ELO Rating System]](/topic/algorithms/elo-rating) - Competitive ranking algorithm

### Infrastructure
- [[Redis Pub/Sub]](/topic/infrastructure/redis-pubsub) - Real-time message fanout
- [[Cassandra Data Modeling]](/topic/databases/cassandra) - Write-heavy workloads
- [[Kafka Streams]](/topic/infrastructure/kafka-streams) - Stream processing
- [[WebSocket Architecture]](/topic/infrastructure/websockets) - Bi-directional communication

</div>

---

## Interview Checklist

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Points to Hit

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #238636; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">1</div>
<span style="color: #1e293b;">Start simple - PostGIS handles 100K users, no geohashing needed early</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #1f6feb; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">2</div>
<span style="color: #1e293b;">ELO/desirability scoring increases mutual match rates 3-5x vs. random</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #8957e5; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">3</div>
<span style="color: #1e293b;">Bloom filters for swipe deduplication: O(1) check, 1% acceptable false positive rate</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f0883e; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">4</div>
<span style="color: #1e293b;">Deterministic locking with sorted user IDs prevents simultaneous swipe race condition</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #da3633; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">5</div>
<span style="color: #1e293b;">Location privacy is critical - never expose exact coordinates, use fuzzing</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #6e40c9; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">6</div>
<span style="color: #1e293b;">Pre-computed stacks reduce P99 latency from 500ms to 50ms at scale</span>
</div>

</div>

### Red Flags to Avoid

<div style="background: rgba(248, 81, 73, 0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 8px;">

- "Microservices from day one" - shows lack of pragmatism
- "Store exact GPS and display to users" - privacy nightmare
- "Cassandra for everything" - wrong tool for relational data
- "Race conditions are rare, don't need to handle" - distributed systems red flag
- "ML will solve matching" - hand-wavy without specifics
- "Just use Firebase" - limited backend architecture knowledge

</div>

### Impressive Statements

<div style="background: rgba(56, 139, 253, 0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 8px;">

- "For < 50K users per city, PostGIS with ST_DWithin is sufficient - no geohashing needed"
- "We use deterministic locking with sorted user IDs to prevent the simultaneous-swipe race condition"
- "At early stage, I'd start with a monolith - Bumble started with simple random matching"
- "Bloom filters give us O(1) already-swiped checks with ~1% false positive rate, which is acceptable"
- "The hot-user problem requires special handling - we replicate their profile and rate-limit incoming likes"
- "Pre-computed stacks trade freshness for latency - we mitigate with hourly recomputation for active users"

</div>

</div>
