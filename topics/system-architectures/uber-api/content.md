# Design The Uber API

## Problem Statement

Design a ride-hailing platform that matches riders with drivers in real-time, handles millions of concurrent location updates, implements dynamic pricing based on supply-demand economics, and maintains ride state consistency across distributed services.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #00d4aa;">

### Core Requirements

- **Rider-Driver Matching**: Sub-second geospatial queries to find optimal driver assignments
- **Real-time Location Tracking**: Process 1M+ GPS updates per second with minimal latency
- **Dynamic Surge Pricing**: Market-clearing prices that balance supply and demand
- **ETA Calculation**: Accurate arrival predictions accounting for traffic, weather, and historical patterns
- **Ride State Machine**: Consistent state transitions across distributed services with failure recovery
- **Payment Processing**: Fare calculation, authorization, and eventual settlement

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">UBER SYSTEM ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: bold; color: white; font-size: 14px;">Mobile Apps</div>
<div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px;">Rider App | Driver App</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; color: #8b949e;">
<div style="width: 2px; height: 20px; background: #8b949e;"></div>
<div style="font-size: 11px; padding: 4px 8px; background: #21262d; border-radius: 4px;">WebSocket + REST</div>
<div style="width: 2px; height: 20px; background: #8b949e;"></div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px 48px; text-align: center; width: 80%; max-width: 500px;">
<div style="font-weight: bold; color: white; font-size: 16px;">API GATEWAY</div>
<div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px;">Authentication | Rate Limiting | Geographic Routing</div>
</div>

<div style="color: #8b949e; font-size: 16px;">&#9660;</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">LOCATION SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; GPS ingestion pipeline<br/>
&#8226; H3/Geohash indexing<br/>
&#8226; Real-time tracking
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">DISPATCH SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; Batch matching<br/>
&#8226; Hungarian algorithm<br/>
&#8226; Supply optimization
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #1d4ed8; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">TRIP SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; State machine<br/>
&#8226; Event sourcing<br/>
&#8226; Ride lifecycle
</div>
</div>

</div>

<div style="color: #8b949e; font-size: 16px;">&#9660;</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #3fb950; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">PRICING SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; Surge calculation<br/>
&#8226; Fare estimation<br/>
&#8226; Dynamic pricing
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #f85149; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">ETA SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; Route calculation<br/>
&#8226; Traffic prediction<br/>
&#8226; ML-based estimates
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #db61a2; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
<div style="color: #db61a2; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">PAYMENT SERVICE</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
&#8226; Authorization<br/>
&#8226; Capture/Settlement<br/>
&#8226; Split payments
</div>
</div>

</div>

<div style="color: #8b949e; font-size: 16px;">&#9660;</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 48px; text-align: center;">
<div style="font-weight: bold; color: white; font-size: 14px;">Event Bus (Kafka)</div>
<div style="color: rgba(255,255,255,0.8); font-size: 11px; margin-top: 4px;">ride_events | location_updates | pricing_changes | trip_state_transitions</div>
</div>

</div>
</div>

---

## 1. Geospatial Indexing

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Core Assumption**: Driver locations are ephemeral and change every 2-10 seconds, requiring in-memory indexing rather than disk-based spatial databases for real-time queries.</span>

### The Fundamental Problem

When a rider requests a ride at coordinates (40.758, -73.985), the system must find available drivers within a configurable radius (typically 2-5km) in under 50ms. With 5 million active drivers globally updating locations every 4 seconds, this creates **1.25 million writes per second** to the geospatial index.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">GEOSPATIAL INDEXING STRATEGIES</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-top: 4px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Geohash</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Encoding:</strong> Base32 string from lat/lng interleaving<br/>
<strong>Precision:</strong> Each character adds ~5 bits<br/>
<strong>6 chars:</strong> ~1.2km x 0.6km cell<br/>
<strong>Query:</strong> Prefix matching in Redis
</div>
<div style="background: #161b22; border-radius: 6px; padding: 10px; margin-top: 12px; font-family: monospace; font-size: 11px; color: #1d4ed8;">
"dr5ru7" = Times Square area
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-top: 4px solid #a371f7;">
<div style="color: #a371f7; font-weight: bold; font-size: 14px; margin-bottom: 12px;">H3 Hexagons (Uber)</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Shape:</strong> Hexagonal cells<br/>
<strong>Neighbors:</strong> All 6 equidistant<br/>
<strong>Hierarchy:</strong> 7 children per parent<br/>
<strong>Resolution 9:</strong> ~174m edge length
</div>
<div style="background: #161b22; border-radius: 6px; padding: 10px; margin-top: 12px; font-family: monospace; font-size: 11px; color: #a371f7;">
892a100d2c3ffff = hex cell ID
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-top: 4px solid #3fb950;">
<div style="color: #3fb950; font-weight: bold; font-size: 14px; margin-bottom: 12px;">S2 Cells (Google)</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Shape:</strong> Quadrilateral cells<br/>
<strong>Projection:</strong> Cube face mapping<br/>
<strong>Hierarchy:</strong> 4 children per parent<br/>
<strong>Level 16:</strong> ~150m cell size
</div>
<div style="background: #161b22; border-radius: 6px; padding: 10px; margin-top: 12px; font-family: monospace; font-size: 11px; color: #3fb950;">
89c2847c = S2 cell token
</div>
</div>

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">Why H3 Over Geohash for Uber Scale</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<div style="color: #3fb950; font-size: 12px; margin-bottom: 8px;">H3 Advantages:</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.8;">
&#8226; Uniform neighbor distances (no diagonal distortion)<br/>
&#8226; Better circle approximation for radius queries<br/>
&#8226; Efficient k-ring expansion algorithm<br/>
&#8226; Smooth hierarchical aggregation for analytics
</div>
</div>
<div>
<div style="color: #f85149; font-size: 12px; margin-bottom: 8px;">Geohash Edge Cases:</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.8;">
&#8226; Neighbors at corners require 8-cell lookup<br/>
&#8226; Grid cells vary in size by latitude<br/>
&#8226; Boundary discontinuities at prime meridian<br/>
&#8226; Diagonal neighbors are farther than adjacent
</div>
</div>
</div>
</div>

</div>
</div>

### Redis Geospatial Implementation

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Redis stores all data in memory, making it expensive at scale (~$0.02/driver/month) but providing sub-millisecond query latency that disk-based solutions cannot match.</span>

```python
class GeospatialDriverIndex:
    """
    Redis-backed geospatial index for real-time driver lookup.
    Uses GEOADD/GEORADIUS internally, which are O(N+log(M)) where
    N = returned elements, M = total elements in the sorted set.
    """

    def __init__(self, redis_cluster, h3_resolution=9):
        self.redis = redis_cluster
        self.h3_res = h3_resolution
        self.ttl_seconds = 300  # Driver expires if no update in 5 min

    def update_driver_location(self, driver_id: str, lat: float, lng: float,
                                status: str, vehicle_type: str):
        """
        Atomic update of driver position across multiple indices.

        Internal mechanism:
        1. GEOADD uses geohash internally (52-bit integer encoding)
        2. Stored in a sorted set with geohash as score
        3. GEORADIUS uses binary search on sorted scores
        """
        pipe = self.redis.pipeline()

        # Primary geospatial index - all active drivers
        pipe.geoadd('drivers:active', lng, lat, driver_id)
        pipe.expire('drivers:active', self.ttl_seconds)

        # Status-specific index for fast filtering
        if status == 'available':
            pipe.geoadd('drivers:available', lng, lat, driver_id)
            pipe.geoadd(f'drivers:available:{vehicle_type}', lng, lat, driver_id)
            # Remove from other status indices
            pipe.zrem('drivers:on_trip', driver_id)
        elif status == 'on_trip':
            pipe.geoadd('drivers:on_trip', lng, lat, driver_id)
            pipe.zrem('drivers:available', driver_id)
            pipe.zrem(f'drivers:available:{vehicle_type}', driver_id)

        # H3 cell index for batch operations and surge calculation
        h3_cell = h3.geo_to_h3(lat, lng, self.h3_res)
        pipe.sadd(f'h3:{h3_cell}:drivers', driver_id)
        pipe.expire(f'h3:{h3_cell}:drivers', self.ttl_seconds)

        # Store driver metadata for matching
        pipe.hset(f'driver:{driver_id}', mapping={
            'lat': lat, 'lng': lng, 'status': status,
            'vehicle_type': vehicle_type, 'updated_at': time.time()
        })

        pipe.execute()

    def find_nearby_drivers(self, lat: float, lng: float, radius_km: float,
                           vehicle_type: str = None, limit: int = 20) -> List[Dict]:
        """
        Find available drivers within radius, sorted by distance.

        Edge case handling:
        - Empty results: Expand radius incrementally
        - Too many results: Return closest N
        - Stale drivers: Filter by updated_at
        """
        key = f'drivers:available:{vehicle_type}' if vehicle_type else 'drivers:available'

        # GEORADIUS returns (member, distance) tuples sorted ASC by distance
        results = self.redis.georadius(
            key, lng, lat, radius_km, unit='km',
            withdist=True, withcoord=True,
            sort='ASC', count=limit * 2  # Over-fetch for filtering
        )

        drivers = []
        now = time.time()

        for driver_id, distance, (driver_lng, driver_lat) in results:
            # Verify driver is still fresh
            driver_data = self.redis.hgetall(f'driver:{driver_id}')
            if not driver_data:
                continue

            updated_at = float(driver_data.get('updated_at', 0))
            if now - updated_at > 60:  # Stale if >60s old
                continue

            drivers.append({
                'driver_id': driver_id,
                'distance_km': distance,
                'lat': driver_lat,
                'lng': driver_lng,
                'vehicle_type': driver_data.get('vehicle_type'),
                'freshness_seconds': now - updated_at
            })

            if len(drivers) >= limit:
                break

        return drivers
```

### Interview Questions: Geospatial Indexing

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "Why use Redis GEORADIUS instead of PostgreSQL PostGIS?"

**What they're probing**: Understanding of latency requirements and memory vs. disk trade-offs.

**Strong Answer**:

> "The fundamental difference is memory access patterns. Redis stores the entire geohash-encoded sorted set in RAM, making GEORADIUS a binary search operation completing in microseconds. PostGIS ST_DWithin must hit disk for the R-tree index, adding milliseconds of I/O latency even with SSD storage."

**Concrete comparison**:
- Redis GEORADIUS on 100K drivers: **0.3-0.5ms**
- PostGIS ST_DWithin on 100K drivers with GIST index: **15-30ms**
- At 10K ride requests/second, Redis needs 5 connections; PostGIS needs 150+ connection pool

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Design choice**: Use Redis for hot path (driver lookup), PostGIS for complex spatial analytics (airport zones, surge regions).</span>

---

#### Level 2: "What happens at geohash cell boundaries? A driver at the edge might be closer than one in the same cell."

**What they're probing**: Edge case awareness and algorithm understanding.

**Strong Answer**:

> "Geohash has the 'edge problem' - two adjacent points might have completely different geohash prefixes if they straddle a cell boundary. The solution is neighbor cell expansion."

**Implementation detail**:

```python
def get_candidate_cells(center_geohash: str, precision: int = 6) -> List[str]:
    """
    Return the target cell plus all 8 neighbors to handle boundary cases.

    For geohash "dr5ru7", neighbors might be:
    dr5ru4, dr5ru5, dr5ru6, dr5rud, dr5ruk, dr5rus, dr5rut, dr5rue
    """
    neighbors = geohash.neighbors(center_geohash)
    return [center_geohash] + list(neighbors.values())
```

**H3 handles this better**: With hexagonal cells, all 6 neighbors are equidistant from the center. The k-ring function returns all cells within k steps efficiently, avoiding the corner-distance problem of square grids.

---

#### Level 3: "How do you handle the case where a rider is at the exact boundary of two sharded Redis clusters?"

**What they're probing**: Distributed systems thinking and sharding strategy.

**Strong Answer**:

> "This is the crux of geographic sharding. If we shard by city or region, boundary riders need cross-shard queries. There are three approaches."

**Approach 1: Overlapping shards** (Uber's actual approach)
- Each shard owns cells plus a buffer zone of neighboring cells
- Query hits primary shard; if near boundary, also query neighbor shard
- De-duplicate results by driver_id

**Approach 2: Consistent hashing by H3 cell**
- Drivers sharded by H3 cell ID, not geography
- Query fans out to multiple shards based on k-ring cells
- Higher latency but simpler boundary handling

**Approach 3: Global index with regional replicas**
- Single source of truth, read replicas per region
- Replication lag means stale reads for recently-moved drivers
- Simpler architecture, higher infrastructure cost

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Overlapping shards add operational complexity but provide predictable latency. Consistent hashing is simpler but has unpredictable fan-out.</span>

</div>

See also: [[Consistent Hashing]](/topics/distributed-systems/consistent-hashing), [[Redis Cluster]](/topics/databases/redis)

---

## 2. Driver Matching (Dispatch)

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Core Assumption**: The naive "assign nearest driver" approach leads to globally suboptimal outcomes. Assigning driver A to rider 1 might make driver B's assignment to rider 2 much worse.</span>

### The Matching Problem

At any moment in Manhattan, there might be 500 pending ride requests and 300 available drivers. The goal is to minimize **total pickup time across all riders**, not just for any individual rider. This is the classic **assignment problem** from combinatorial optimization.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #a371f7; text-align: center; margin: 0 0 24px 0;">BATCH MATCHING ARCHITECTURE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 16px;">Matching Pipeline (Every 2 Seconds)</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: center;">

<div style="background: #161b22; border-radius: 8px; padding: 14px 18px; text-align: center; border-top: 3px solid #f0883e;">
<div style="color: #f0883e; font-size: 20px; font-weight: bold;">1</div>
<div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Collect Pending<br/>Requests</div>
</div>

<div style="color: #8b949e;">&#8594;</div>

<div style="background: #161b22; border-radius: 8px; padding: 14px 18px; text-align: center; border-top: 3px solid #58a6ff;">
<div style="color: #1d4ed8; font-size: 20px; font-weight: bold;">2</div>
<div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Query Available<br/>Drivers</div>
</div>

<div style="color: #8b949e;">&#8594;</div>

<div style="background: #161b22; border-radius: 8px; padding: 14px 18px; text-align: center; border-top: 3px solid #3fb950;">
<div style="color: #3fb950; font-size: 20px; font-weight: bold;">3</div>
<div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Build Cost<br/>Matrix</div>
</div>

<div style="color: #8b949e;">&#8594;</div>

<div style="background: #161b22; border-radius: 8px; padding: 14px 18px; text-align: center; border-top: 3px solid #a371f7;">
<div style="color: #a371f7; font-size: 20px; font-weight: bold;">4</div>
<div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Hungarian<br/>Algorithm</div>
</div>

<div style="color: #8b949e;">&#8594;</div>

<div style="background: #161b22; border-radius: 8px; padding: 14px 18px; text-align: center; border-top: 3px solid #db61a2;">
<div style="color: #db61a2; font-size: 20px; font-weight: bold;">5</div>
<div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Dispatch<br/>Assignments</div>
</div>

</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 12px;">Cost Matrix Construction</div>
<div style="color: #c9d1d9; font-size: 13px; line-height: 1.8;">

Each cell (i, j) represents the "cost" of assigning driver j to rider i:

<div style="background: #161b22; border-radius: 8px; padding: 16px; margin-top: 12px; font-family: monospace; font-size: 12px;">
cost[i][j] = (0.50 * pickup_eta_minutes) +<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(0.20 * driver_rating_penalty) +<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(0.15 * heading_misalignment) +<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(0.10 * time_since_last_trip) +<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(0.05 * vehicle_type_mismatch)
</div>

</div>
</div>

</div>
</div>

### Hungarian Algorithm Implementation

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: The Hungarian algorithm is O(n^3) which seems expensive, but for a 500x300 matrix, it completes in ~50ms. The optimization savings far exceed the computation cost.</span>

```python
from scipy.optimize import linear_sum_assignment
import numpy as np

class BatchDispatcher:
    """
    Implements Uber-style batch matching using the Hungarian algorithm.

    Key insight: Instead of matching riders one-at-a-time (greedy),
    we collect requests over a short window and solve globally.
    """

    def __init__(self, geo_index, eta_service, batch_interval_ms=2000):
        self.geo_index = geo_index
        self.eta_service = eta_service
        self.batch_interval = batch_interval_ms / 1000
        self.pending_requests = []
        self.weights = {
            'eta': 0.50,
            'driver_rating': 0.20,
            'heading_alignment': 0.15,
            'idle_time': 0.10,
            'vehicle_match': 0.05
        }

    def compute_cost_matrix(self, requests: List[RideRequest],
                           drivers: List[Driver]) -> np.ndarray:
        """
        Build NxM cost matrix where N=riders, M=drivers.

        Edge cases:
        - More riders than drivers: Some riders won't be matched
        - More drivers than riders: Some drivers stay idle
        - Infinite cost: Driver can't serve this rider (wrong vehicle type)
        """
        n_riders = len(requests)
        n_drivers = len(drivers)

        # Initialize with high cost (will be filtered out)
        INF = 1e9
        cost_matrix = np.full((n_riders, n_drivers), INF)

        for i, request in enumerate(requests):
            for j, driver in enumerate(drivers):
                # Vehicle type constraint
                if request.vehicle_type and driver.vehicle_type != request.vehicle_type:
                    continue  # Leave as INF

                # ETA component (primary factor)
                eta_minutes = self.eta_service.get_pickup_eta(
                    driver.lat, driver.lng,
                    request.pickup_lat, request.pickup_lng
                )

                # Normalize ETA to 0-1 scale (assume max 15 min pickup)
                eta_score = min(eta_minutes / 15.0, 1.0)

                # Driver rating component (penalize low ratings)
                # Rating 5.0 = 0 penalty, Rating 4.0 = 0.2 penalty
                rating_penalty = max(0, (5.0 - driver.rating) / 5.0)

                # Heading alignment (driver moving toward pickup is better)
                heading_score = self._compute_heading_score(
                    driver.lat, driver.lng, driver.heading,
                    request.pickup_lat, request.pickup_lng
                )

                # Idle time (fairness: prefer drivers waiting longer)
                # Normalize to 0-1 scale (max 30 min idle)
                idle_minutes = (time.time() - driver.last_trip_end) / 60
                idle_score = 1.0 - min(idle_minutes / 30.0, 1.0)

                # Compute weighted cost
                cost = (
                    self.weights['eta'] * eta_score +
                    self.weights['driver_rating'] * rating_penalty +
                    self.weights['heading_alignment'] * heading_score +
                    self.weights['idle_time'] * idle_score
                )

                cost_matrix[i][j] = cost

        return cost_matrix

    def solve_assignment(self, requests: List[RideRequest],
                        drivers: List[Driver]) -> List[Tuple[RideRequest, Driver]]:
        """
        Use Hungarian algorithm to find optimal assignment.

        Returns list of (request, driver) pairs.
        Unmatched requests will have driver=None.
        """
        if not requests or not drivers:
            return []

        cost_matrix = self.compute_cost_matrix(requests, drivers)

        # Hungarian algorithm returns row_indices, col_indices
        # where assignment is row_indices[k] -> col_indices[k]
        row_ind, col_ind = linear_sum_assignment(cost_matrix)

        assignments = []
        matched_requests = set()

        for i, j in zip(row_ind, col_ind):
            # Skip if cost is infinite (no valid assignment)
            if cost_matrix[i][j] >= 1e8:
                continue

            assignments.append((requests[i], drivers[j]))
            matched_requests.add(i)

        # Add unmatched requests with None driver
        for i, request in enumerate(requests):
            if i not in matched_requests:
                assignments.append((request, None))

        return assignments

    def _compute_heading_score(self, driver_lat, driver_lng, driver_heading,
                               pickup_lat, pickup_lng) -> float:
        """
        Score 0 if driver heading toward pickup, 1 if heading away.

        This matters because a driver heading away needs to turn around,
        adding time and potentially missing the rider.
        """
        if driver_heading is None:
            return 0.5  # Unknown heading, neutral score

        # Compute bearing from driver to pickup
        bearing_to_pickup = self._compute_bearing(
            driver_lat, driver_lng, pickup_lat, pickup_lng
        )

        # Compute angle difference
        angle_diff = abs(driver_heading - bearing_to_pickup)
        angle_diff = min(angle_diff, 360 - angle_diff)  # Handle wraparound

        # Normalize: 0 degrees = 0 score, 180 degrees = 1 score
        return angle_diff / 180.0
```

### Interview Questions: Driver Matching

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #a371f7;">

#### Level 1: "Why batch matching instead of assigning drivers immediately as requests come in?"

**What they're probing**: Understanding of global vs. local optimization.

**Strong Answer**:

> "Consider this scenario: Rider A is at 42nd St, Rider B is at 34th St. Driver X is at 38th St (equidistant). With greedy matching, whoever requests first gets Driver X. But if Rider A requests first, and Driver Y is at 40th St heading south, the global optimum is A->Y and B->X, saving 4 blocks total travel."

**Concrete example**:
- Greedy: A->X (4 blocks), B->next_driver (8 blocks) = **12 blocks total**
- Batched: A->Y (2 blocks), B->X (4 blocks) = **6 blocks total**

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Batching adds 1-2 seconds latency (half the batch window) but reduces average pickup time by 15-25% at scale.</span>

---

#### Level 2: "What if a driver gets assigned but goes offline before accepting? How do you handle assignment failures?"

**What they're probing**: Failure handling and state consistency.

**Strong Answer**:

> "This is the 'optimistic assignment' problem. We use a three-phase protocol with timeouts."

**Protocol**:
1. **Assignment Phase** (0-2s): Driver app receives push notification
2. **Acceptance Window** (2-17s): Driver has 15 seconds to tap 'Accept'
3. **Confirmation Phase** (17-20s): Server confirms assignment or triggers re-match

**Failure modes**:
- **No response**: Request returns to pending queue, eligible for next batch
- **Explicit decline**: Immediate re-match, track decline rate for driver scoring
- **Connection lost**: Detect via heartbeat, auto-decline after 8 seconds

**State machine transitions**:
```
PENDING -> OFFERED -> { ACCEPTED | DECLINED | TIMEOUT }
                               |
                               v
                         DRIVER_ASSIGNED
```

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Design choice**: We don't lock the driver during the offer window. If they accept another ride (from a different platform), they simply won't accept ours.</span>

---

#### Level 3: "How do you prevent drivers from gaming the system - like declining short rides to wait for airport trips?"

**What they're probing**: Incentive design and adversarial thinking.

**Strong Answer**:

> "This is an economics problem as much as a technical one. We use a combination of information hiding, acceptance rate scoring, and positive incentives."

**Technical mechanisms**:

1. **Information hiding**: Driver sees pickup location but NOT destination until they accept. This prevents cherry-picking high-value rides.

2. **Acceptance rate tracking**:
   ```python
   def compute_driver_score(driver_id):
       recent_offers = get_last_50_offers(driver_id)
       acceptance_rate = sum(o.accepted for o in recent_offers) / len(recent_offers)

       # Penalty for low acceptance increases matching cost
       if acceptance_rate < 0.85:
           return base_score * (1 + (0.85 - acceptance_rate) * 2)
       return base_score
   ```

3. **Consecutive decline penalty**: After 3 declines, driver is temporarily deprioritized (soft timeout).

4. **Quest incentives**: "Complete 20 rides today for $50 bonus" encourages accepting all rides.

5. **Destination mode** (legitimate): Allow 2 destination-filtered rides per day, reducing need to game.

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Strict penalties reduce gaming but also reduce driver supply. Balance via A/B testing on driver churn vs. rider experience metrics.</span>

</div>

See also: [[Hungarian Algorithm]](/topics/algorithms/hungarian-algorithm), [[Assignment Problem]](/topics/algorithms/assignment-problem)

---

## 3. Surge Pricing

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Core Assumption**: Surge pricing is a market-clearing mechanism, not a profit-maximization tool. The goal is to balance supply and demand, not to extract maximum revenue during high-demand periods.</span>

### The Economics of Surge

When demand exceeds supply, surge pricing serves two economic functions:
1. **Demand reduction**: Price-sensitive riders delay their trip or choose alternatives
2. **Supply increase**: Drivers in nearby areas see the surge and drive toward it

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f85149; text-align: center; margin: 0 0 24px 0;">SURGE PRICING MECHANISM</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Supply Measurement</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Metric:</strong> Available drivers in H3 cell (resolution 8)<br/>
<strong>Window:</strong> Current snapshot<br/>
<strong>Calculation:</strong> Count of status='available' drivers<br/>
<strong>Adjustment:</strong> +20% for drivers heading toward cell
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">Demand Measurement</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Metric:</strong> Ride requests in H3 cell<br/>
<strong>Window:</strong> Trailing 5-minute average<br/>
<strong>Calculation:</strong> Requests + predicted_requests<br/>
<strong>Adjustment:</strong> Weight recent requests higher (decay)
</div>
</div>

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 12px;">Surge Multiplier Calculation</div>
<div style="background: #161b22; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px; color: #c9d1d9;">
ratio = demand / max(supply, 1)<br/><br/>
if ratio &lt; 1.0: multiplier = 1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Oversupply<br/>
if ratio 1.0-1.3: multiplier = 1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Balanced<br/>
if ratio 1.3-1.6: multiplier = 1.25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Light surge<br/>
if ratio 1.6-2.0: multiplier = 1.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Moderate surge<br/>
if ratio 2.0-2.5: multiplier = 1.75&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Heavy surge<br/>
if ratio 2.5-3.5: multiplier = 2.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Very heavy surge<br/>
if ratio &gt; 3.5: multiplier = 2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Cap (regulatory)
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Surge Smoothing</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
Raw surge calculation can oscillate rapidly. Apply exponential moving average:
<div style="background: #161b22; border-radius: 6px; padding: 12px; margin-top: 8px; font-family: monospace; font-size: 11px;">
smoothed_surge = alpha * new_surge + (1 - alpha) * prev_surge<br/>
where alpha = 0.3 (30% weight to new value)
</div>
This prevents "surge whiplash" where prices jump dramatically between refreshes.
</div>
</div>

</div>
</div>

### Surge Pricing Implementation

```python
class SurgePricingService:
    """
    Calculates and applies surge multipliers based on real-time supply/demand.

    Key insight: Surge is calculated per geographic cell, not globally.
    Times Square and Harlem can have different surge levels simultaneously.
    """

    def __init__(self, redis, h3_resolution=8):
        self.redis = redis
        self.h3_res = h3_resolution
        self.demand_window_seconds = 300  # 5 minutes
        self.smoothing_alpha = 0.3

        # Surge lookup table (ratio -> multiplier)
        self.surge_table = [
            (1.0, 1.0), (1.3, 1.0), (1.6, 1.25), (2.0, 1.5),
            (2.5, 1.75), (3.5, 2.0), (float('inf'), 2.5)
        ]

    def record_ride_request(self, lat: float, lng: float):
        """
        Increment demand counter for this cell.
        Uses a sliding window with per-second granularity.
        """
        h3_cell = h3.geo_to_h3(lat, lng, self.h3_res)
        current_second = int(time.time())

        # Increment counter for current second
        key = f'surge:demand:{h3_cell}:{current_second}'
        self.redis.incr(key)
        self.redis.expire(key, self.demand_window_seconds + 60)

    def get_demand(self, h3_cell: str) -> float:
        """
        Calculate demand as weighted sum of recent requests.
        More recent requests weighted higher (exponential decay).
        """
        now = int(time.time())
        total_demand = 0.0
        total_weight = 0.0

        for offset in range(self.demand_window_seconds):
            key = f'surge:demand:{h3_cell}:{now - offset}'
            count = int(self.redis.get(key) or 0)

            # Exponential decay: recent seconds count more
            weight = math.exp(-offset / 120)  # 2-minute half-life
            total_demand += count * weight
            total_weight += weight

        return total_demand / total_weight if total_weight > 0 else 0

    def get_supply(self, h3_cell: str) -> int:
        """
        Count available drivers in cell and immediate neighbors.

        Edge case: A driver at cell boundary serves both cells,
        so we check the k-ring of neighboring cells.
        """
        cells = h3.k_ring(h3_cell, 1)  # Center + 6 neighbors
        supply = 0

        for cell in cells:
            drivers = self.redis.scard(f'h3:{cell}:available_drivers')
            supply += drivers

        # Discount neighbor cells (they might go elsewhere)
        # Simple heuristic: full weight for center, 50% for neighbors
        center_supply = self.redis.scard(f'h3:{h3_cell}:available_drivers')
        neighbor_supply = supply - center_supply

        return center_supply + int(neighbor_supply * 0.5)

    def calculate_surge(self, lat: float, lng: float) -> dict:
        """
        Calculate surge multiplier for a given location.

        Returns:
            {
                'multiplier': 1.5,
                'demand': 45,
                'supply': 30,
                'h3_cell': '882a100d63fffff',
                'expires_at': 1699123456
            }
        """
        h3_cell = h3.geo_to_h3(lat, lng, self.h3_res)

        demand = self.get_demand(h3_cell)
        supply = self.get_supply(h3_cell)

        # Calculate raw ratio
        ratio = demand / max(supply, 1)

        # Look up multiplier from table
        raw_multiplier = 1.0
        for threshold, mult in self.surge_table:
            if ratio <= threshold:
                raw_multiplier = mult
                break

        # Apply smoothing to prevent oscillation
        prev_key = f'surge:multiplier:{h3_cell}'
        prev_multiplier = float(self.redis.get(prev_key) or raw_multiplier)

        smoothed = (self.smoothing_alpha * raw_multiplier +
                   (1 - self.smoothing_alpha) * prev_multiplier)

        # Round to nearest 0.25 for cleaner display
        final_multiplier = round(smoothed * 4) / 4
        final_multiplier = max(1.0, min(2.5, final_multiplier))

        # Cache the result
        self.redis.setex(prev_key, 60, final_multiplier)

        return {
            'multiplier': final_multiplier,
            'demand': round(demand, 1),
            'supply': supply,
            'h3_cell': h3_cell,
            'expires_at': int(time.time()) + 60
        }

    def calculate_fare(self, pickup: Tuple[float, float],
                       dropoff: Tuple[float, float],
                       vehicle_type: str) -> dict:
        """
        Calculate total fare with surge applied.

        Components:
        - Base fare: Fixed amount per ride
        - Distance fare: Per-km rate
        - Time fare: Per-minute rate
        - Surge: Multiplier on distance + time components
        - Fees: Booking fee, airport fee, tolls (not surged)
        """
        surge_info = self.calculate_surge(pickup[0], pickup[1])
        multiplier = surge_info['multiplier']

        # Get rates for vehicle type
        rates = self.get_rates(vehicle_type)

        # Calculate distance and time
        distance_km = self.maps_service.get_distance(pickup, dropoff)
        duration_minutes = self.maps_service.get_duration(pickup, dropoff)

        # Base components
        base_fare = rates['base_fare']
        distance_fare = distance_km * rates['per_km']
        time_fare = duration_minutes * rates['per_minute']

        # Apply surge to distance and time only
        surged_distance = distance_fare * multiplier
        surged_time = time_fare * multiplier

        # Fixed fees (not surged)
        booking_fee = rates['booking_fee']

        total = base_fare + surged_distance + surged_time + booking_fee

        # Apply minimum fare
        total = max(total, rates['minimum_fare'])

        return {
            'estimated_fare': round(total, 2),
            'fare_range': (round(total * 0.9, 2), round(total * 1.1, 2)),
            'surge_multiplier': multiplier,
            'breakdown': {
                'base_fare': base_fare,
                'distance_fare': round(surged_distance, 2),
                'time_fare': round(surged_time, 2),
                'booking_fee': booking_fee
            },
            'surge_expires_at': surge_info['expires_at']
        }
```

### Interview Questions: Surge Pricing

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "How do you prevent surge from oscillating wildly - spiking to 3x then crashing to 1x every few minutes?"

**What they're probing**: Signal processing and control systems thinking.

**Strong Answer**:

> "Oscillation happens when the surge calculation is too responsive. A surge spike drives riders away, supply catches up, surge drops, riders flood back - rinse and repeat. The solution is damping through exponential smoothing."

**Smoothing formula**:
```python
new_surge = alpha * calculated_surge + (1 - alpha) * previous_surge
# where alpha = 0.3 means 30% weight on new value
```

**Additional stabilization techniques**:
1. **Minimum dwell time**: Surge can't change more than 0.25x per minute
2. **Directional hysteresis**: Takes more imbalance to increase surge than to decrease
3. **Rounded buckets**: Display 1.0x, 1.25x, 1.5x... not 1.37x

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Smoothing means surge responds slower to real demand spikes. Balance via tuning alpha based on market characteristics.</span>

---

#### Level 2: "A concert just ended and 10,000 people need rides in 15 minutes. How do you handle this predictable surge?"

**What they're probing**: Proactive vs. reactive systems, prediction integration.

**Strong Answer**:

> "This is where ML prediction integrates with surge. We know about the concert from: event APIs, historical data from same venue, and real-time signals like parking lot exits."

**Proactive surge mechanism**:

1. **Pre-surge notification** (T-30 min): Push to drivers: "High demand expected at Madison Square Garden in 30 min"

2. **Staged surge ramp** (T-15 min): Gradually increase surge to 1.5x before event ends, attracting drivers without shocking riders

3. **Geofencing**: Create temporary surge zone around venue, separate from general city surge

4. **Queue management**: "3,500 people waiting. Your estimated wait: 12 minutes. Price locked at current 1.75x"

```python
class PredictiveSurge:
    def check_scheduled_events(self, h3_cell: str) -> Optional[float]:
        """
        Query event database for scheduled high-demand events.
        Returns predicted demand multiplier for next 30 minutes.
        """
        events = self.event_db.query(
            cell=h3_cell,
            time_range=(now(), now() + timedelta(minutes=30))
        )

        if not events:
            return None

        # Estimate attendees becoming ride requests
        total_expected_riders = sum(
            e.attendance * e.rideshare_propensity
            for e in events
        )

        # Current supply baseline
        current_supply = self.get_supply(h3_cell)

        # Return predicted ratio, capped
        return min(total_expected_riders / max(current_supply, 10), 5.0)
```

---

#### Level 3: "Regulators say surge pricing is exploitative. How do you design surge that's defensible from ethical and regulatory perspectives?"

**What they're probing**: Systems thinking beyond pure engineering - ethics, regulation, stakeholder management.

**Strong Answer**:

> "The core defense is that surge is a market-clearing mechanism, not profit extraction. Without surge, you get no-cars-available during high demand - which is worse for riders."

**Defensible design principles**:

1. **Price caps**: Hard cap at 2.5x-3.0x (regulatory compliance in many cities)

2. **Transparency**: Show exact surge amount before booking, with countdown to potential decrease

3. **Emergency override**: Disable surge during declared emergencies (hurricanes, terrorist attacks)

4. **Low-income protection**: Partner with transit agencies for surge-free essential trips

5. **Price lock guarantee**: Once rider accepts, price is locked even if surge increases

6. **Wait-for-lower option**: "Wait 10 minutes and pay estimated 1.5x instead of current 2.0x"

**Audit trail for regulators**:
```python
class SurgeAuditLog:
    def log_surge_event(self, cell, old_surge, new_surge, demand, supply):
        """
        Every surge change is logged with full context for regulatory audits.
        """
        self.db.insert({
            'timestamp': now(),
            'h3_cell': cell,
            'old_multiplier': old_surge,
            'new_multiplier': new_surge,
            'demand_count': demand,
            'supply_count': supply,
            'ratio': demand / max(supply, 1),
            'emergency_mode': self.is_emergency_active(),
            'event_id': self.get_active_event(cell)
        })
```

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Design choice**: Surge is applied to driver-controllable components (distance, time) but not fixed fees (booking fee, tolls). This ensures drivers benefit from surge, aligning incentives.</span>

</div>

See also: [[Market Mechanisms]](/topics/economics/market-mechanisms), [[Dynamic Pricing]](/topics/system-design/dynamic-pricing)

---

## 4. ETA Calculation

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Core Assumption**: Google Maps ETA is accurate for driving time, but Uber's ETA must account for: driver acceptance time, walking to vehicle, traffic changes during ride, and pickup location complexity (airport terminals, stadium exits).</span>

### Components of Uber ETA

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">ETA DECOMPOSITION</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px;">
<div style="color: #c9d1d9; font-size: 13px; line-height: 1.8;">
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #f0883e; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">1</div>
<div><strong style="color: #f0883e;">Matching Latency</strong> - Time to find and assign driver (2-5 seconds)</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #58a6ff; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">2</div>
<div><strong style="color: #1d4ed8;">Driver Acceptance</strong> - Time for driver to see and accept (8-15 seconds)</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #3fb950; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">3</div>
<div><strong style="color: #3fb950;">Pickup Drive Time</strong> - Driver traveling to rider (2-10 minutes)</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #a371f7; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">4</div>
<div><strong style="color: #a371f7;">Pickup Complexity</strong> - Finding exact spot, parking (0-5 minutes)</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #db61a2; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">5</div>
<div><strong style="color: #db61a2;">Trip Drive Time</strong> - Actual ride to destination (variable)</div>
</div>
</div>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Pickup ETA (shown before booking)</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Data sources:</strong><br/>
&#8226; Nearest available drivers (real-time)<br/>
&#8226; Historical pickup times for this cell<br/>
&#8226; Current traffic conditions<br/>
&#8226; Location type (street, airport, stadium)
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 12px;">Trip ETA (shown after booking)</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Data sources:</strong><br/>
&#8226; Real-time traffic (Google/Mapbox API)<br/>
&#8226; Historical trip times for route<br/>
&#8226; Time-of-day patterns<br/>
&#8226; Special events affecting traffic
</div>
</div>

</div>

</div>
</div>

### ETA Prediction Service

```python
class ETAService:
    """
    Multi-layer ETA prediction combining real-time and historical data.

    Architecture:
    - Layer 1: Cached cell-to-cell estimates (fast, approximate)
    - Layer 2: Real-time routing API (accurate, expensive)
    - Layer 3: ML model adjustments (personalized, learned biases)
    """

    def __init__(self, redis, routing_api, ml_model):
        self.redis = redis
        self.routing_api = routing_api
        self.ml_model = ml_model
        self.h3_res = 8  # ~500m cells for caching

    def get_pickup_eta(self, rider_lat: float, rider_lng: float) -> dict:
        """
        Estimate time until driver arrives at rider location.

        This is shown on the home screen before booking and must be
        fast (<50ms) even at scale.
        """
        rider_cell = h3.geo_to_h3(rider_lat, rider_lng, self.h3_res)

        # Get nearest available drivers
        nearby_drivers = self.geo_index.find_nearby_drivers(
            rider_lat, rider_lng, radius_km=5, limit=10
        )

        if not nearby_drivers:
            return {
                'eta_minutes': None,
                'status': 'no_drivers',
                'message': 'No drivers available nearby'
            }

        # Calculate ETA to each driver, take minimum
        etas = []
        for driver in nearby_drivers[:5]:  # Check top 5
            driver_cell = h3.geo_to_h3(driver['lat'], driver['lng'], self.h3_res)

            # Try cache first
            cached_eta = self._get_cached_cell_eta(driver_cell, rider_cell)

            if cached_eta:
                etas.append(cached_eta + self._get_acceptance_buffer())
            else:
                # Fall back to real-time routing (expensive)
                route_eta = self.routing_api.get_eta(
                    (driver['lat'], driver['lng']),
                    (rider_lat, rider_lng)
                )
                etas.append(route_eta + self._get_acceptance_buffer())

                # Cache for future requests
                self._cache_cell_eta(driver_cell, rider_cell, route_eta)

        min_eta = min(etas)

        # Apply ML adjustment for this location
        adjustment = self.ml_model.predict_eta_bias(
            rider_cell, time_of_day=datetime.now().hour,
            day_of_week=datetime.now().weekday()
        )

        final_eta = max(1, round(min_eta + adjustment))

        return {
            'eta_minutes': final_eta,
            'status': 'available',
            'driver_count': len(nearby_drivers),
            'confidence': self._calculate_confidence(etas)
        }

    def get_trip_eta(self, pickup: Tuple[float, float],
                     dropoff: Tuple[float, float],
                     departure_time: datetime = None) -> dict:
        """
        Estimate total trip duration from pickup to dropoff.

        This is shown during fare estimation and must account for
        traffic patterns at the expected departure time.
        """
        departure_time = departure_time or datetime.now()

        # Get real-time routing with traffic
        route = self.routing_api.get_route(
            pickup, dropoff,
            departure_time=departure_time,
            traffic=True
        )

        base_eta = route['duration_minutes']

        # Apply historical bias for this route
        pickup_cell = h3.geo_to_h3(pickup[0], pickup[1], self.h3_res)
        dropoff_cell = h3.geo_to_h3(dropoff[0], dropoff[1], self.h3_res)

        historical_bias = self._get_historical_bias(
            pickup_cell, dropoff_cell,
            departure_time.hour, departure_time.weekday()
        )

        # Account for pickup location complexity
        pickup_complexity = self._get_pickup_complexity(pickup_cell)

        adjusted_eta = base_eta + historical_bias + pickup_complexity

        return {
            'eta_minutes': round(adjusted_eta),
            'distance_km': route['distance_km'],
            'route_polyline': route['polyline'],
            'traffic_level': route['traffic_level'],
            'eta_range': (
                round(adjusted_eta * 0.85),
                round(adjusted_eta * 1.15)
            )
        }

    def _get_pickup_complexity(self, cell: str) -> float:
        """
        Some locations are inherently harder to navigate:
        - Airports: Terminal identification, waiting areas
        - Stadiums: Crowd egress, restricted pickup zones
        - Hotels: Valet areas, underground parking
        """
        complexity = self.redis.hget('pickup_complexity', cell)
        if complexity:
            return float(complexity)

        # Default based on historical data for this cell
        avg_wait = self._calculate_historical_wait(cell)
        return avg_wait

    def _get_cached_cell_eta(self, origin_cell: str, dest_cell: str) -> Optional[float]:
        """
        Cache key includes time bucket to account for traffic patterns.
        15-minute buckets balance freshness vs. cache hit rate.
        """
        time_bucket = int(time.time() / 900)  # 15-minute buckets
        cache_key = f'eta:{origin_cell}:{dest_cell}:{time_bucket}'

        cached = self.redis.get(cache_key)
        return float(cached) if cached else None

    def _cache_cell_eta(self, origin_cell: str, dest_cell: str, eta: float):
        time_bucket = int(time.time() / 900)
        cache_key = f'eta:{origin_cell}:{dest_cell}:{time_bucket}'

        # Cache for 20 minutes (overlaps with next bucket for smoothness)
        self.redis.setex(cache_key, 1200, eta)
```

### Interview Questions: ETA Calculation

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "Why not just use Google Maps API for all ETA calculations?"

**What they're probing**: Cost awareness and understanding of API limitations.

**Strong Answer**:

> "At Uber scale, Google Maps API would cost over $150 million per year. More importantly, Google's ETA doesn't account for Uber-specific factors."

**Cost calculation**:
- Google Directions API: $5 per 1,000 requests
- Uber: 20M trips/day, each needing ~5 ETA calls (display, confirmation, re-routes)
- 100M API calls/day = $500K/day = **$182M/year** just for routing

**Uber-specific factors Google doesn't know**:
- This airport terminal has a 4-minute average pickup delay
- This driver has a 95% acceptance rate (low re-match probability)
- Rush hour on this specific road is 20% worse than Google predicts
- Concert just ended 2 blocks away

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Design choice**: Use Google Maps for turn-by-turn navigation (hard to replicate), but self-hosted OSRM/Valhalla + ML models for ETA prediction.</span>

---

#### Level 2: "How do you handle ETA updates during a trip when traffic conditions change?"

**What they're probing**: Real-time systems and user experience trade-offs.

**Strong Answer**:

> "ETA updates must balance accuracy with stability. Constantly changing ETAs create anxiety and distrust."

**Update strategy**:

1. **Continuous background calculation**: Route service recalculates every 60 seconds
2. **Threshold-based display update**: Only update shown ETA if change > 2 minutes
3. **Directional bias**: More willing to show increase (sets expectation) than decrease
4. **Event-driven recalculation**: Immediate update if driver deviates from route

```python
def should_update_displayed_eta(current_display: int, new_calculation: int) -> bool:
    diff = new_calculation - current_display

    # Always update if significant increase (>2 min)
    if diff > 2:
        return True

    # Only update decrease if very significant (>3 min)
    if diff < -3:
        return True

    # Otherwise, keep stable display
    return False
```

**Edge case - traffic jam**:
- If ETA increases by >10 minutes suddenly, show notification: "Heavy traffic ahead. New ETA: X minutes"
- Offer alternate route if available with trade-off explanation

---

#### Level 3: "How do you train an ML model to improve ETA predictions when ground truth (actual trip time) has survivorship bias?"

**What they're probing**: ML systems thinking, data quality awareness.

**Strong Answer**:

> "The survivorship bias problem: we only have actual trip times for completed trips. Cancelled trips, driver no-shows, and rider bailouts are missing from training data."

**Bias sources**:
1. Long ETA predictions cause riders to cancel -> we never see actual time
2. Surge pricing during high-demand deflects price-sensitive riders
3. Drivers reject trips to unfamiliar areas -> those routes under-represented

**Mitigation strategies**:

1. **Inverse propensity weighting**: Upweight samples from under-represented routes
   ```python
   weight = 1.0 / prediction_to_booking_ratio(route)
   ```

2. **Simulated trips**: Occasionally route empty vehicles on under-sampled routes to get ground truth

3. **Censored regression**: Model cancellation as right-censored data (trip would have taken >= predicted time)

4. **Multi-task learning**: Jointly predict ETA and cancellation probability; high cancellation probability routes get regularization toward conservative (longer) ETAs

5. **A/B testing with holdout**: Randomly show some users +1/-1 minute biased ETA, measure actual completion

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: More aggressive ETA (showing lower times) increases booking rate but also cancellation rate and rider dissatisfaction when ETA is missed.</span>

</div>

See also: [[Time Series Prediction]](/topics/ml/time-series), [[Routing Algorithms]](/topics/algorithms/dijkstra)

---

## 5. Ride State Machine

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Core Assumption**: A ride's state must be consistent across all services (trip, payment, driver app, rider app) even when network partitions occur. We use event sourcing with idempotent state transitions.</span>

### State Machine Definition

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #db61a2; text-align: center; margin: 0 0 24px 0;">RIDE STATE MACHINE</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #8b949e; text-align: center; min-width: 100px;">
<div style="color: #8b949e; font-size: 12px; font-weight: bold;">PENDING</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">Searching</div>
</div>

<div style="color: #8b949e; display: flex; align-items: center;">&#8594;</div>

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #f0883e; text-align: center; min-width: 100px;">
<div style="color: #f0883e; font-size: 12px; font-weight: bold;">OFFERED</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">Sent to driver</div>
</div>

<div style="color: #8b949e; display: flex; align-items: center;">&#8594;</div>

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #58a6ff; text-align: center; min-width: 100px;">
<div style="color: #1d4ed8; font-size: 12px; font-weight: bold;">ACCEPTED</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">Driver en route</div>
</div>

<div style="color: #8b949e; display: flex; align-items: center;">&#8594;</div>

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #a371f7; text-align: center; min-width: 100px;">
<div style="color: #a371f7; font-size: 12px; font-weight: bold;">ARRIVED</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">At pickup</div>
</div>

<div style="color: #8b949e; display: flex; align-items: center;">&#8594;</div>

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #3fb950; text-align: center; min-width: 100px;">
<div style="color: #3fb950; font-size: 12px; font-weight: bold;">IN_PROGRESS</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">Trip active</div>
</div>

<div style="color: #8b949e; display: flex; align-items: center;">&#8594;</div>

<div style="background: #21262d; border-radius: 8px; padding: 12px 16px; border-top: 3px solid #db61a2; text-align: center; min-width: 100px;">
<div style="color: #db61a2; font-size: 12px; font-weight: bold;">COMPLETED</div>
<div style="color: #6e7681; font-size: 10px; margin-top: 4px;">At destination</div>
</div>

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Cancellation States (from any pre-trip state)</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<div style="background: #3d1f1f; border-radius: 6px; padding: 8px 14px;">
<span style="color: #f85149; font-size: 11px;">CANCELLED_BY_RIDER</span>
</div>
<div style="background: #3d1f1f; border-radius: 6px; padding: 8px 14px;">
<span style="color: #f85149; font-size: 11px;">CANCELLED_BY_DRIVER</span>
</div>
<div style="background: #3d1f1f; border-radius: 6px; padding: 8px 14px;">
<span style="color: #f85149; font-size: 11px;">CANCELLED_NO_DRIVERS</span>
</div>
<div style="background: #3d1f1f; border-radius: 6px; padding: 8px 14px;">
<span style="color: #f85149; font-size: 11px;">CANCELLED_PAYMENT_FAILED</span>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">Valid State Transitions</div>
<div style="color: #c9d1d9; font-size: 12px; font-family: monospace; line-height: 2;">
PENDING &rarr; OFFERED | CANCELLED_NO_DRIVERS<br/>
OFFERED &rarr; ACCEPTED | PENDING (timeout/decline) | CANCELLED_BY_RIDER<br/>
ACCEPTED &rarr; ARRIVED | CANCELLED_BY_RIDER | CANCELLED_BY_DRIVER<br/>
ARRIVED &rarr; IN_PROGRESS | CANCELLED_BY_RIDER (fee) | CANCELLED_BY_DRIVER<br/>
IN_PROGRESS &rarr; COMPLETED<br/>
COMPLETED &rarr; (terminal state)
</div>
</div>

</div>
</div>

### Event Sourced Implementation

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional, List
import time

class RideState(Enum):
    PENDING = "pending"
    OFFERED = "offered"
    ACCEPTED = "accepted"
    ARRIVED = "arrived"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED_BY_RIDER = "cancelled_by_rider"
    CANCELLED_BY_DRIVER = "cancelled_by_driver"
    CANCELLED_NO_DRIVERS = "cancelled_no_drivers"
    CANCELLED_PAYMENT_FAILED = "cancelled_payment_failed"

@dataclass
class RideEvent:
    """
    Immutable event representing a state transition.
    Events are the source of truth; current state is derived.
    """
    event_id: str
    ride_id: str
    event_type: str
    timestamp: float
    actor_id: str  # driver_id, rider_id, or "system"
    metadata: dict

    # For idempotency
    idempotency_key: str

class RideStateMachine:
    """
    Event-sourced state machine for ride lifecycle.

    Design principles:
    1. Events are immutable and append-only
    2. Current state is derived by replaying events
    3. State transitions are validated before event creation
    4. Idempotency keys prevent duplicate transitions
    """

    VALID_TRANSITIONS = {
        RideState.PENDING: {RideState.OFFERED, RideState.CANCELLED_NO_DRIVERS},
        RideState.OFFERED: {RideState.ACCEPTED, RideState.PENDING,
                           RideState.CANCELLED_BY_RIDER},
        RideState.ACCEPTED: {RideState.ARRIVED, RideState.CANCELLED_BY_RIDER,
                            RideState.CANCELLED_BY_DRIVER},
        RideState.ARRIVED: {RideState.IN_PROGRESS, RideState.CANCELLED_BY_RIDER,
                           RideState.CANCELLED_BY_DRIVER},
        RideState.IN_PROGRESS: {RideState.COMPLETED},
        RideState.COMPLETED: set(),  # Terminal
        RideState.CANCELLED_BY_RIDER: set(),  # Terminal
        RideState.CANCELLED_BY_DRIVER: set(),  # Terminal
        RideState.CANCELLED_NO_DRIVERS: set(),  # Terminal
        RideState.CANCELLED_PAYMENT_FAILED: set(),  # Terminal
    }

    def __init__(self, event_store, distributed_lock, kafka_producer):
        self.event_store = event_store
        self.lock = distributed_lock
        self.kafka = kafka_producer

    def transition(self, ride_id: str, new_state: RideState,
                   actor_id: str, metadata: dict = None,
                   idempotency_key: str = None) -> RideEvent:
        """
        Attempt state transition with distributed locking.

        Failure modes handled:
        - Invalid transition: Raise InvalidTransitionError
        - Duplicate request: Return existing event (idempotent)
        - Lock timeout: Raise RetryableError
        - Event store failure: Raise and let caller retry
        """
        lock_key = f"ride_lock:{ride_id}"

        with self.lock.acquire(lock_key, timeout_ms=5000):
            # Check idempotency
            if idempotency_key:
                existing = self.event_store.get_by_idempotency_key(
                    ride_id, idempotency_key
                )
                if existing:
                    return existing  # Already processed

            # Get current state by replaying events
            events = self.event_store.get_events(ride_id)
            current_state = self._derive_state(events)

            # Validate transition
            if new_state not in self.VALID_TRANSITIONS.get(current_state, set()):
                raise InvalidTransitionError(
                    f"Cannot transition from {current_state} to {new_state}"
                )

            # Create event
            event = RideEvent(
                event_id=generate_uuid(),
                ride_id=ride_id,
                event_type=f"ride.{new_state.value}",
                timestamp=time.time(),
                actor_id=actor_id,
                metadata=metadata or {},
                idempotency_key=idempotency_key or generate_uuid()
            )

            # Persist event (source of truth)
            self.event_store.append(event)

            # Publish to Kafka for other services
            self.kafka.produce(
                topic='ride_events',
                key=ride_id,
                value=event.to_dict()
            )

            return event

    def _derive_state(self, events: List[RideEvent]) -> RideState:
        """
        Derive current state by replaying events in order.

        This is the event sourcing pattern: state is not stored,
        it's computed from the event log.
        """
        if not events:
            return RideState.PENDING

        # Events are ordered by timestamp
        latest_event = events[-1]
        state_str = latest_event.event_type.replace("ride.", "")

        return RideState(state_str)

    def get_ride_history(self, ride_id: str) -> List[dict]:
        """
        Return full audit trail of ride state changes.
        Useful for customer support and dispute resolution.
        """
        events = self.event_store.get_events(ride_id)

        return [{
            'state': e.event_type.replace("ride.", ""),
            'timestamp': e.timestamp,
            'actor': e.actor_id,
            'metadata': e.metadata
        } for e in events]


class RideSaga:
    """
    Orchestrates multi-service operations with compensation.

    A ride request involves:
    1. Payment authorization
    2. Driver matching
    3. Trip creation
    4. Notifications

    If any step fails, previous steps must be compensated (rolled back).
    """

    def __init__(self, payment_svc, matching_svc, trip_svc, notification_svc):
        self.payment = payment_svc
        self.matching = matching_svc
        self.trip = trip_svc
        self.notification = notification_svc

    def execute_ride_request(self, rider_id: str, pickup: tuple,
                             dropoff: tuple, vehicle_type: str) -> dict:
        """
        Execute ride request as a saga with compensation.
        """
        compensation_stack = []

        try:
            # Step 1: Authorize payment
            fare_estimate = self.trip.estimate_fare(pickup, dropoff, vehicle_type)
            auth = self.payment.authorize(
                rider_id,
                amount=fare_estimate['max_fare'],
                reason='ride_authorization'
            )
            compensation_stack.append(
                lambda: self.payment.void_authorization(auth.id)
            )

            # Step 2: Find and assign driver
            driver = self.matching.find_and_assign(
                pickup, vehicle_type,
                max_wait_seconds=120
            )
            compensation_stack.append(
                lambda: self.matching.release_driver(driver.id)
            )

            # Step 3: Create trip record
            trip = self.trip.create(
                rider_id=rider_id,
                driver_id=driver.id,
                pickup=pickup,
                dropoff=dropoff,
                payment_auth_id=auth.id,
                fare_estimate=fare_estimate
            )
            # Trip creation is the commit point - no compensation after this

            # Step 4: Send notifications (best effort, no compensation)
            self.notification.send_ride_confirmed(rider_id, trip.id, driver)
            self.notification.send_pickup_request(driver.id, trip.id, pickup)

            return {
                'trip_id': trip.id,
                'driver': driver.to_dict(),
                'fare_estimate': fare_estimate,
                'status': 'driver_assigned'
            }

        except NoDriversAvailable:
            # Compensate in reverse order
            for compensate in reversed(compensation_stack):
                try:
                    compensate()
                except Exception as e:
                    # Log compensation failure, don't re-raise
                    logger.error(f"Compensation failed: {e}")

            raise

        except Exception as e:
            # Compensate for any unexpected failure
            for compensate in reversed(compensation_stack):
                try:
                    compensate()
                except Exception as comp_error:
                    logger.error(f"Compensation failed: {comp_error}")

            raise
```

### Interview Questions: Ride State Machine

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #db61a2;">

#### Level 1: "Why use event sourcing instead of just updating the ride status in a database?"

**What they're probing**: Understanding of audit requirements and temporal queries.

**Strong Answer**:

> "Event sourcing provides an immutable audit log that's critical for a financial system like Uber. When a rider disputes a cancellation fee, we need to prove exactly what happened and when."

**Benefits over CRUD**:

1. **Complete audit trail**: "Driver accepted at 2:15:03, arrived at 2:22:47, rider cancelled at 2:23:12" - proves fee is valid

2. **Temporal queries**: "What was the state at 2:20?" - impossible with UPDATE-in-place

3. **Debugging**: Replay events to reproduce exact system state during incident

4. **Decoupling**: Other services (payment, analytics) subscribe to events rather than polling database

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Trade-off**: Event sourcing requires more storage and state derivation is O(n) in event count. Optimize with snapshots every ~50 events.</span>

---

#### Level 2: "The driver's phone dies mid-trip. How does the state machine handle this?"

**What they're probing**: Failure handling, eventual consistency, timeout management.

**Strong Answer**:

> "Driver connectivity loss is a common failure mode. The state machine must distinguish between 'driver offline' and 'driver crashed' while keeping the trip functional."

**Detection mechanism**:
```python
def check_driver_heartbeat(trip_id: str):
    """
    Driver app sends heartbeat every 4 seconds during active trip.
    After 3 missed heartbeats (12 seconds), mark as 'connection_lost'.
    """
    last_heartbeat = redis.get(f'heartbeat:{trip.driver_id}')
    seconds_since = time.time() - float(last_heartbeat or 0)

    if seconds_since > 12:
        return 'connection_lost'
    return 'connected'
```

**Recovery flow**:

1. **Immediate** (0-30s): Rider app shows "Driver connection interrupted - tracking may be delayed". Continue trip using last known heading and speed.

2. **Short outage** (30s-5min): Mark trip as 'degraded_tracking'. Rider app uses its own GPS + cached route to estimate position.

3. **Extended outage** (>5min):
   - If rider reaches destination (detected via rider GPS): Prompt "Did you arrive safely?"
   - If rider stuck: Enable direct phone call to driver (VOIP backup)

4. **Trip completion**: When driver reconnects, sync last known position. Calculate fare from:
   - Cached route distance (if rider confirmed completion)
   - Rider GPS track (if available)
   - Estimated time based on route

**State machine impact**: Trip stays in IN_PROGRESS. We add a `connectivity_status` field but don't change core state.

---

#### Level 3: "How do you handle the case where both rider and driver try to cancel simultaneously, and your distributed lock has a bug?"

**What they're probing**: Race condition handling, CAP theorem understanding, practical distributed systems.

**Strong Answer**:

> "This is the classic distributed state mutation problem. Even with locks, network partitions can cause dual-cancel. The solution is conflict resolution policy, not perfect prevention."

**Scenario**:
- Rider presses 'Cancel' at T=0.000
- Driver presses 'Cancel' at T=0.001
- Lock bug allows both to proceed

**Detection**:
```python
def detect_conflicting_events(ride_id: str) -> List[RideEvent]:
    events = event_store.get_events(ride_id)

    # Find events within 5-second window with conflicting states
    terminal_events = [e for e in events if 'cancelled' in e.event_type]

    if len(terminal_events) > 1:
        return terminal_events
    return []
```

**Resolution policy** (business rule, not technical):

1. **Timestamp wins**: Earlier cancel is "real", later is ignored
2. **Rider favored**: If within 100ms, treat as rider-initiated (no cancellation fee)
3. **Both events stored**: Never delete events, add `superseded_by` field
4. **Async reconciliation**: Background job detects conflicts, creates `reconciliation_event`

**Implementation**:
```python
def reconcile_conflicting_cancels(events: List[RideEvent]) -> RideEvent:
    # Sort by timestamp
    sorted_events = sorted(events, key=lambda e: e.timestamp)
    winner = sorted_events[0]

    # Mark losers as superseded
    for loser in sorted_events[1:]:
        event_store.update_metadata(
            loser.event_id,
            {'superseded_by': winner.event_id, 'reason': 'race_condition'}
        )

    # Emit reconciliation event for audit
    return RideEvent(
        event_type='ride.reconciliation',
        metadata={
            'winner': winner.event_id,
            'losers': [e.event_id for e in sorted_events[1:]],
            'policy': 'timestamp_wins'
        }
    )
```

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Design choice**: Accept that race conditions will happen. Design for detection and resolution, not prevention. This is more robust than trying to build a "perfect" distributed lock.</span>

</div>

See also: [[Event Sourcing]](/topics/distributed-systems/event-sourcing), [[Saga Pattern]](/topics/distributed-systems/saga-pattern), [[Distributed Locking]](/topics/distributed-systems/distributed-locking)

---

## System Integration Summary

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #a371f7; text-align: center; margin: 0 0 24px 0;">END-TO-END RIDE FLOW</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #f0883e; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
<div style="color: #f0883e; font-weight: bold;">Rider Opens App</div>
</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Geospatial Query</strong>: Find nearest drivers (Redis GEORADIUS)<br/>
<strong>ETA Service</strong>: Calculate pickup ETA (cached cell-to-cell + ML adjustment)<br/>
<strong>Surge Service</strong>: Get current multiplier for location (H3 cell ratio)<br/>
<strong>Display</strong>: "3 min away | 1.25x surge"
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #58a6ff; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
<div style="color: #1d4ed8; font-weight: bold;">Rider Requests Ride</div>
</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Payment Service</strong>: Authorize estimated fare<br/>
<strong>Trip Service</strong>: Create ride record (state: PENDING)<br/>
<strong>Dispatch Service</strong>: Add to next matching batch<br/>
<strong>State Event</strong>: ride.pending published to Kafka
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #a371f7;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #a371f7; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
<div style="color: #a371f7; font-weight: bold;">Batch Matching (Every 2s)</div>
</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Dispatch Service</strong>: Collect pending requests + available drivers<br/>
<strong>Cost Matrix</strong>: Build rider x driver cost matrix with weighted factors<br/>
<strong>Hungarian Algorithm</strong>: Solve optimal assignment<br/>
<strong>State Event</strong>: ride.offered published, driver app notified
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #3fb950; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
<div style="color: #3fb950; font-weight: bold;">Driver Accepts + Trip</div>
</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Location Service</strong>: Track driver position every 4 seconds<br/>
<strong>ETA Service</strong>: Continuously update arrival estimate<br/>
<strong>State Events</strong>: ride.accepted &rarr; ride.arrived &rarr; ride.in_progress<br/>
<strong>Real-time</strong>: WebSocket push to rider app with driver location
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #db61a2;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #db61a2; color: #0d1117; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
<div style="color: #db61a2; font-weight: bold;">Trip Completion</div>
</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong>Fare Service</strong>: Calculate final fare (distance + time + surge)<br/>
<strong>Payment Service</strong>: Capture authorized amount<br/>
<strong>State Event</strong>: ride.completed published<br/>
<strong>Analytics</strong>: Trip data to data warehouse for ML training
</div>
</div>

</div>
</div>

---

## Technology Decision Matrix

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | MVP Choice | Scale Choice | Trigger to Upgrade |
|-----------|-----------|--------------|-------------------|
| **Geospatial Index** | PostgreSQL PostGIS | Redis + H3 | >1K concurrent drivers |
| **Driver Matching** | Greedy nearest | Hungarian batch | >100 concurrent requests |
| **Surge Calculation** | Simple ratio | ML-predicted + smoothed | >10K requests/hour |
| **ETA Prediction** | Google Maps API | Self-hosted OSRM + ML | >$10K/month API cost |
| **State Management** | PostgreSQL CRUD | Event sourcing + Kafka | Audit/compliance needs |
| **Real-time Comms** | HTTP polling | WebSocket + Redis Pub/Sub | >1s freshness requirement |

</div>

---

## Scaling Milestones

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Phase 1: College Town MVP ($300/month)

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Assumption**: 50 drivers, 500 rides/day, single city</span>

- **Infrastructure**: DigitalOcean droplet, managed PostgreSQL+PostGIS
- **Architecture**: Monolithic Django/Rails app
- **Matching**: Simple nearest-available driver
- **Maps**: Google Maps API (~$200/month)
- **Real-time**: HTTP polling every 5 seconds

### Phase 2: Regional Player ($50K/month)

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Assumption**: 5K drivers, 50K rides/day, 5 cities</span>

- **Infrastructure**: AWS with Redis ElastiCache, Aurora PostgreSQL
- **Architecture**: Beginning microservices (Location, Trip, Payment)
- **Matching**: Batch matching with weighted scoring
- **Maps**: Mix of Google + OSRM for bulk calculations
- **Real-time**: WebSockets for active trips

### Phase 3: Uber Scale ($10M+/month)

<span style="background: linear-gradient(135deg, #00d4aa22 0%, #00d4aa11 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #00d4aa;">**Assumption**: 5M drivers, 20M rides/day, 1000+ cities</span>

- **Infrastructure**: Multi-region with geographic sharding
- **Architecture**: Full microservices, Ringpop for stateful services
- **Matching**: Hungarian algorithm + ML optimization
- **Maps**: Fully self-hosted with ML-enhanced ETA
- **Real-time**: Edge PoPs with WebSocket termination

</div>
</div>

---

## Interview Red Flags vs. Strong Signals

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

<div style="background: #3d1f1f; border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 16px;">Red Flags</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 2;">
&#8226; "We need H3 hexagons from day one"<br/>
&#8226; "Use Kafka for all messaging"<br/>
&#8226; "Build our own maps engine"<br/>
&#8226; "ML-based surge from the start"<br/>
&#8226; "Microservices before PMF"<br/>
&#8226; "Exactly-once for locations"<br/>
&#8226; "Distributed transactions for matching"
</div>
</div>

<div style="background: #1f3d2d; border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 16px;">Strong Signals</div>
<div style="color: #c9d1d9; font-size: 12px; line-height: 2;">
&#8226; "Start with PostGIS, migrate at 1K drivers"<br/>
&#8226; "Kafka for trip events, Redis for ephemeral"<br/>
&#8226; "Google Maps API until $10K/month"<br/>
&#8226; "Surge is ratio math, ML for prediction"<br/>
&#8226; "Monolith, extract as team grows"<br/>
&#8226; "Locations are idempotent, latest wins"<br/>
&#8226; "Optimistic locking with fast recovery"
</div>
</div>

</div>

</div>

---

## Further Reading

- [[Consistent Hashing]](/topics/distributed-systems/consistent-hashing) - Understand geographic sharding
- [[Event Sourcing]](/topics/distributed-systems/event-sourcing) - Deep dive on event-driven state
- [[Rate Limiting]](/topics/system-design/rate-limiting) - API gateway protection patterns
- [[WebSocket Architecture]](/topics/networking/websockets) - Real-time communication at scale
- [[Hungarian Algorithm]](/topics/algorithms/hungarian-algorithm) - Optimal assignment problem
- [[Geohash]](/topics/algorithms/geohash) - Spatial indexing fundamentals
