# Design The Uber API

## Problem Statement

Design a ride-hailing platform that matches riders with drivers, handles real-time location tracking, and manages dynamic pricing.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #000000;">

### Core Requirements
- **Ride Matching**: Connect riders with nearby drivers
- **Real-time Tracking**: GPS location updates
- **Dynamic Pricing**: Surge pricing based on demand
- **ETA Calculation**: Accurate arrival estimates
- **Payments**: Trip fare calculation and processing
- **Driver/Rider Ratings**: Two-way rating system

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">UBER SYSTEM ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │   Mobile Apps   │
                              │ Rider │ Driver  │
                              └────────┬────────┘
                                       │
                                       │ WebSocket + REST
                                       ▼
                    ┌──────────────────────────────────┐
                    │        API GATEWAY               │
                    │  (Auth, Rate Limit, Routing)     │
                    └──────────────────┬───────────────┘
                                       │
    ┌──────────────────────────────────┼──────────────────────────────────┐
    │                                  │                                  │
    ▼                                  ▼                                  ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│  LOCATION   │              │    MATCHING     │              │     TRIP        │
│  SERVICE    │              │    SERVICE      │              │    SERVICE      │
│             │              │                 │              │                 │
│ - GPS       │──────────────│ - Find drivers  │──────────────│ - Create trip   │
│ - Updates   │              │ - Optimize      │              │ - Track status  │
│ - Geofence  │              │ - Dispatch      │              │ - End trip      │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                              │                               │
       ▼                              ▼                               ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│   SUPPLY    │              │    PRICING      │              │    PAYMENT      │
│  SERVICE    │              │    SERVICE      │              │    SERVICE      │
│             │              │                 │              │                 │
│ - Driver    │              │ - Surge         │              │ - Calculate     │
│   status    │              │ - ETA           │              │ - Charge        │
│ - Shifts    │              │ - Fare          │              │ - Split         │
└─────────────┘              └─────────────────┘              └─────────────────┘
       │                              │                               │
       └──────────────────────────────┼───────────────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │    KAFKA      │
                              │  Event Bus    │
                              └───────────────┘
```

</div>

---

## Geospatial Indexing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">GEOHASH-BASED DRIVER LOOKUP</h4>

```
World Map → Geohash Grid (varying precision)

┌─────────────────────────────────────────────────────────────┐
│                        GEOHASH SYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Geohash: "9q8yy" represents a grid cell                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Precision  │ Cell Size  │ Use Case                      ││
│  ├────────────┼────────────┼───────────────────────────────┤│
│  │ 4 chars    │ ~40km      │ City-level clustering        ││
│  │ 5 chars    │ ~5km       │ Neighborhood supply          ││
│  │ 6 chars    │ ~1km       │ Driver matching radius       ││
│  │ 7 chars    │ ~150m      │ Precise pickup location      ││
│  └────────────┴────────────┴───────────────────────────────┘│
│                                                              │
│  Driver Location Storage (Redis):                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ GEOADD drivers:available lng lat driver_id              ││
│  │                                                          ││
│  │ Finding nearby drivers:                                  ││
│  │ GEORADIUS drivers:available lng lat 2 km WITHDIST       ││
│  │ → Returns drivers within 2km sorted by distance         ││
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
- **Drivers**: 500 - 5,000
- **Rides**: 1,000 - 10,000/day
- **Cities**: 1-3
- **Budget**: $5,000 - $20,000/month

### Monolithic Architecture

```python
# Simple ride matching service
class RideService:
    def __init__(self, redis, db, maps_api):
        self.redis = redis
        self.db = db
        self.maps = maps_api

    def request_ride(self, rider_id, pickup_lat, pickup_lng, dropoff_lat, dropoff_lng):
        # Find nearby available drivers
        nearby_drivers = self.redis.georadius(
            'drivers:available',
            pickup_lng, pickup_lat,
            radius=5,  # km
            unit='km',
            withdist=True,
            sort='ASC',
            count=10
        )

        if not nearby_drivers:
            raise NoDriversAvailable()

        # Calculate fare estimate
        distance = self.maps.get_distance(
            (pickup_lat, pickup_lng),
            (dropoff_lat, dropoff_lng)
        )
        fare = self.calculate_fare(distance)

        # Create ride request
        ride = Ride.create(
            rider_id=rider_id,
            pickup=(pickup_lat, pickup_lng),
            dropoff=(dropoff_lat, dropoff_lng),
            estimated_fare=fare,
            status='pending'
        )

        # Send request to nearest driver
        for driver_id, dist in nearby_drivers:
            if self.offer_ride_to_driver(driver_id, ride):
                return ride

        raise NoDriverAccepted()

    def update_driver_location(self, driver_id, lat, lng):
        # Update in Redis geospatial index
        self.redis.geoadd('drivers:active', lng, lat, driver_id)

        # If driver is available, also update available index
        if self.is_driver_available(driver_id):
            self.redis.geoadd('drivers:available', lng, lat, driver_id)

        # Publish location update for real-time tracking
        self.redis.publish(f'driver:{driver_id}:location', f'{lat},{lng}')
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 10M - 50M
- **Drivers**: 500K - 2M
- **Rides**: 5M - 20M/day
- **Cities**: 100+
- **Budget**: $5M - $20M/month

### Microservices with City Sharding

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │   Global Gateway   │
                         │   (Route by City)  │
                         └─────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   NYC REGION    │       │   SF REGION     │       │  LONDON REGION  │
│                 │       │                 │       │                 │
│ ┌─────────────┐ │       │ ┌─────────────┐ │       │ ┌─────────────┐ │
│ │  Location   │ │       │ │  Location   │ │       │ │  Location   │ │
│ │  Service    │ │       │ │  Service    │ │       │ │  Service    │ │
│ └─────────────┘ │       │ └─────────────┘ │       │ └─────────────┘ │
│ ┌─────────────┐ │       │ ┌─────────────┐ │       │ ┌─────────────┐ │
│ │  Matching   │ │       │ │  Matching   │ │       │ │  Matching   │ │
│ │  Service    │ │       │ │  Service    │ │       │ │  Service    │ │
│ └─────────────┘ │       │ └─────────────┘ │       │ └─────────────┘ │
│ ┌─────────────┐ │       │ ┌─────────────┐ │       │ ┌─────────────┐ │
│ │   Redis     │ │       │ │   Redis     │ │       │ │   Redis     │ │
│ │  (Drivers)  │ │       │ │  (Drivers)  │ │       │ │  (Drivers)  │ │
│ └─────────────┘ │       │ └─────────────┘ │       │ └─────────────┘ │
└─────────────────┘       └─────────────────┘       └─────────────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
             ┌───────────┐  ┌───────────┐  ┌───────────┐
             │  Global   │  │  Global   │  │  Global   │
             │  Payment  │  │   User    │  │ Analytics │
             │  Service  │  │  Service  │  │  Service  │
             └───────────┘  └───────────┘  └───────────┘
```

</div>

### Matching Algorithm

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│              DISPATCH OPTIMIZATION                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Goal: Minimize total wait time across all riders           │
│                                                              │
│  Factors considered:                                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 1. Distance to pickup                                   ││
│  │ 2. Driver rating                                        ││
│  │ 3. Driver acceptance rate                               ││
│  │ 4. Vehicle type match                                   ││
│  │ 5. Driver heading direction                             ││
│  │ 6. Current supply/demand in area                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Algorithm: Hungarian Algorithm for batch matching          │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  Every 2 seconds:                                       ││
│  │  1. Collect pending ride requests                       ││
│  │  2. Get available drivers in relevant areas             ││
│  │  3. Build cost matrix (rider × driver)                  ││
│  │  4. Solve assignment problem                            ││
│  │  5. Dispatch optimal matches                            ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

### Surge Pricing

```python
class SurgePricingService:
    def calculate_surge_multiplier(self, geohash):
        """
        Calculate surge based on supply/demand ratio.
        """
        # Get demand (ride requests in last 5 min)
        demand = self.redis.get(f'demand:{geohash}:5min') or 0

        # Get supply (available drivers)
        supply = self.redis.scard(f'drivers:{geohash}:available') or 1

        # Calculate ratio
        ratio = demand / max(supply, 1)

        # Map to surge multiplier
        if ratio < 1.0:
            return 1.0  # No surge
        elif ratio < 1.5:
            return 1.2  # Light surge
        elif ratio < 2.0:
            return 1.5  # Medium surge
        elif ratio < 3.0:
            return 2.0  # Heavy surge
        else:
            return min(ratio, 3.0)  # Cap at 3x

    def get_fare_estimate(self, pickup, dropoff, vehicle_type):
        geohash = calculate_geohash(pickup, precision=5)
        surge = self.calculate_surge_multiplier(geohash)

        base_fare = self.get_base_fare(vehicle_type)
        distance_fare = self.calculate_distance_fare(pickup, dropoff)
        time_fare = self.calculate_time_fare(pickup, dropoff)

        total = (base_fare + distance_fare + time_fare) * surge

        return {
            'fare_range': (total * 0.9, total * 1.1),
            'surge_multiplier': surge,
            'breakdown': {
                'base': base_fare,
                'distance': distance_fare,
                'time': time_fare
            }
        }
```

</div>
</div>

---

## Phase 3: Uber Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 100M+
- **Drivers**: 5M+
- **Rides**: 20M+/day
- **Location updates**: 1M+/second
- **Cities**: 1000+

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         UBER GLOBAL ARCHITECTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    EDGE LAYER                             │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
    │  │  │ Edge PoP    │  │ Edge PoP    │  │ Edge PoP    │ ...   │ │
    │  │  │ (WebSocket  │  │ (WebSocket  │  │ (WebSocket  │       │ │
    │  │  │  termination)│  │  termination)│  │  termination)│       │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                RING POP (Peer-to-Peer)                    │ │
    │  │                                                           │ │
    │  │  Consistent hashing for stateful services                │ │
    │  │  - Driver state distributed across nodes                 │ │
    │  │  - Location indexed by geohash                           │ │
    │  │  - No central coordinator                                │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                REGIONAL SERVICES                          │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Dispatch   │  │   Pricing   │  │    Routing      │   │ │
    │  │  │  Service    │  │   Service   │  │    Service      │   │ │
    │  │  │  (H3 Index) │  │  (ML-based) │  │ (OSRM/Valhalla) │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                GLOBAL SERVICES                            │ │
    │  │                                                           │ │
    │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
    │  │  │ Payment  │  │   User   │  │  Driver  │  │ Analytics│ │ │
    │  │  │ (Stripe) │  │ Profiles │  │ Profiles │  │  (Spark) │ │ │
    │  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### H3 Hexagonal Grid

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│              H3 HEXAGONAL INDEXING (Uber)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Why hexagons over squares?                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - All neighbors are equidistant (6 neighbors)           ││
│  │ - Better approximation of circular search radius        ││
│  │ - Hierarchical: each hex contains 7 child hexes         ││
│  │ - No edge/corner ambiguity                              ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Resolution Levels:                                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Res 7  │ ~5km edge   │ City-wide supply/demand         ││
│  │ Res 8  │ ~2km edge   │ Neighborhood matching           ││
│  │ Res 9  │ ~500m edge  │ Pickup zone                     ││
│  │ Res 10 │ ~100m edge  │ Precise location                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Hierarchical Query:                                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 1. Get user's H3 cell (res 9)                           ││
│  │ 2. Get k-ring neighbors (1-2 rings)                     ││
│  │ 3. Query drivers in those cells                         ││
│  │ 4. If not enough, expand to parent cell (res 8)         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Uber Uses | Trade-offs |
|-----------|-------------|-----------|------------|
| **Geo Index** | ElastiCache Redis | H3 + Ringpop | Custom: Better control, Scale |
| **Database** | Aurora/DynamoDB | MySQL + Schemaless | Custom: Historical reasons |
| **Maps** | Location Service | Google Maps + Own | Mix: Cost optimization |
| **Real-time** | API Gateway WS | Custom Edge | Custom: Lower latency |
| **ML** | SageMaker | Michelangelo | Custom: ML platform |
| **Stream** | Kinesis | Kafka | Kafka: Better for scale |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Location Update Scale

```
┌─────────────────────────────────────────────────────────────┐
│           HANDLING 1M LOCATION UPDATES/SECOND                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Challenge: 5M drivers × 1 update/5 sec = 1M updates/sec   │
│                                                              │
│  Solution: Tiered Update Strategy                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  On active trip:                                        ││
│  │  └── Update every 2-4 seconds (real-time tracking)      ││
│  │                                                          ││
│  │  Available, high demand area:                           ││
│  │  └── Update every 5-10 seconds                          ││
│  │                                                          ││
│  │  Available, low demand area:                            ││
│  │  └── Update every 30-60 seconds                         ││
│  │                                                          ││
│  │  Offline/idle:                                          ││
│  │  └── No updates (significant motion triggers update)     ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Consistency for Ride State

```python
# Ride state machine with distributed locking
class RideStateMachine:
    STATES = ['pending', 'driver_assigned', 'driver_arrived',
              'trip_started', 'trip_ended', 'paid', 'cancelled']

    TRANSITIONS = {
        'pending': ['driver_assigned', 'cancelled'],
        'driver_assigned': ['driver_arrived', 'cancelled'],
        'driver_arrived': ['trip_started', 'cancelled'],
        'trip_started': ['trip_ended'],
        'trip_ended': ['paid'],
    }

    def transition(self, ride_id, new_state):
        with self.distributed_lock(f'ride:{ride_id}'):
            ride = self.db.get_ride(ride_id)

            if new_state not in self.TRANSITIONS.get(ride.state, []):
                raise InvalidTransition(ride.state, new_state)

            ride.state = new_state
            ride.updated_at = now()
            self.db.save(ride)

            # Emit event for other services
            self.kafka.produce('ride_events', {
                'ride_id': ride_id,
                'old_state': ride.state,
                'new_state': new_state,
                'timestamp': now()
            })
```

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### 1. "Why geohashing over PostGIS for driver lookup?"

**What they're probing**: Do you understand the trade-offs between specialized geospatial databases vs. simpler indexing schemes?

**Strong Answer**:
> "PostGIS is excellent for complex geospatial queries - polygons, routes, spatial joins. But for Uber's core use case - 'find drivers within X km' - it's overkill. Geohash with Redis gives us O(1) lookups via prefix matching, stores naturally in any key-value store, and handles the 'nearby' query perfectly. PostGIS would require maintaining a separate PostgreSQL cluster, dealing with connection pooling at scale, and paying the overhead of a full query planner for every simple radius search."

**When simpler works**: "For < 1,000 concurrent drivers in a city, PostGIS with a simple `ST_DWithin` query and a spatial index is perfectly fine. The complexity of geohash sharding isn't worth it until you're processing 10K+ location updates per second."

---

### 2. "How do you match riders to drivers at scale without creating hotspots?"

**What they're probing**: Understanding of distributed systems, avoiding single points of contention, and batch optimization.

**Strong Answer**:
> "The naive approach - lock driver, assign, unlock - creates massive contention. Instead, we batch: every 2 seconds, collect all pending requests and available drivers in a region, build a cost matrix considering distance, ETA, driver rating, and heading direction, then solve the assignment problem using the Hungarian algorithm. This turns N sequential lock operations into one batch computation. We partition by geohash prefix so each matching service instance handles a geographic region independently."

**When simpler works**: "For a city with 50 concurrent ride requests, simple first-come-first-served with optimistic locking works fine. The Hungarian algorithm optimization only matters when you're matching thousands of riders to thousands of drivers simultaneously."

---

### 3. "Why not just use Google Maps API for everything - routing, ETA, geocoding?"

**What they're probing**: Cost awareness, vendor lock-in understanding, and knowing when to build vs. buy.

**Strong Answer**:
> "At Uber's scale, Google Maps would cost hundreds of millions per year. More importantly, Google's ETA predictions don't account for Uber-specific factors like driver acceptance patterns, historical pickup times at specific venues, or surge-induced supply shifts. Uber uses Google for hard problems like turn-by-turn navigation rendering, but runs their own routing engine (based on OSRM/Valhalla) for ETA calculations and dispatch decisions, training ML models on their actual trip data."

**When simpler works**: "For a startup doing 1,000 rides/day, Google Maps API costs maybe $500-1,000/month and gives you world-class routing instantly. Build your own when API costs exceed engineering costs, typically around 50K-100K daily requests."

---

### 4. "Explain surge pricing without making it sound predatory"

**What they're probing**: Can you explain supply/demand economics and algorithmic fairness?

**Strong Answer**:
> "Surge pricing is fundamentally simple: `demand / supply` ratio mapped to a multiplier. High demand + low supply = higher prices, which does two things: (1) reduces demand from price-sensitive riders, and (2) incentivizes more drivers to come online or drive to that area. It's a real-time market equilibrium mechanism. The key insight is that without surge, you get *no* rides during peak times instead of expensive rides. We cap multipliers, show prices upfront, and let riders wait for surge to drop."

**Don't overcomplicate it**: "Uber's surge is literally `if demand/supply > 1.5: multiplier = 1.2`. There's ML for prediction and smoothing, but the core is a ratio. Don't design a complex ML system when the interviewer asks about surge."

---

### 5. "How do you handle a driver's phone dying mid-trip?"

**What they're probing**: Edge cases, graceful degradation, and user experience under failure.

**Strong Answer**:
> "Multiple fallback layers: (1) Client-side caching - the rider's app has the route and last known driver location, shows 'connection issues' but continues navigation guidance. (2) Timeout detection - if no location update for 60 seconds, the system marks the trip as 'uncertain' and alerts support. (3) Rider-side tracking - we can approximate progress from rider's GPS. (4) Recovery flow - when driver reconnects, reconcile state from trip start point, rider feedback, and payment authorization. The trip doesn't fail; we gracefully degrade and recover."

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix: Ride-Hailing Infrastructure

| Decision | Option A | Option B | Choose A When | Choose B When |
|----------|----------|----------|---------------|---------------|
| **Driver Location Store** | Redis GEOADD | PostGIS | >1K drivers, simple radius queries | Complex spatial queries, <1K drivers |
| **Geospatial Index** | Geohash | H3 Hexagons | Starting out, good enough | Need uniform distance to neighbors, Uber-scale |
| **Message Queue** | Redis Pub/Sub | Kafka | <10K msg/sec, simple fanout | Need replay, >10K msg/sec, event sourcing |
| **Matching** | Greedy nearest | Hungarian algorithm | <100 concurrent requests | >100 concurrent, optimize globally |
| **Maps/Routing** | Google Maps API | Self-hosted OSRM | <50K requests/day, fast MVP | >50K requests/day, custom ETA models |
| **Real-time Comms** | Polling | WebSockets | Mobile-unfriendly, MVP | Production apps, battery efficiency |

### Why Redis for Geospatial (Not PostgreSQL)?

```
┌─────────────────────────────────────────────────────────────┐
│                    REDIS GEOSPATIAL                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GEOADD drivers:available -122.4194 37.7749 "driver_123"   │
│  GEORADIUS drivers:available -122.42 37.78 5 km            │
│                                                              │
│  Pros:                                                       │
│  ├── Sub-millisecond reads                                  │
│  ├── Built-in sorted results by distance                   │
│  ├── Atomic operations (no locks needed)                   │
│  ├── Naturally fits real-time update patterns              │
│  └── Horizontal scaling via Redis Cluster                  │
│                                                              │
│  Cons:                                                       │
│  ├── Memory-bound (all data in RAM)                        │
│  ├── No complex spatial queries (polygons, routes)         │
│  └── Limited to radius/box searches                        │
│                                                              │
│  Break-even: ~$0.02/driver/month in memory costs           │
│  PostGIS: Better when you need ST_Contains, ST_Intersects  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Why Kafka Over SQS/Redis Pub/Sub?

```
┌─────────────────────────────────────────────────────────────┐
│                    KAFKA FOR RIDE EVENTS                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Key ride-hailing requirements:                             │
│                                                              │
│  1. Event Replay                                            │
│     └── "Reconstruct trip state after service restart"     │
│     └── Redis Pub/Sub: Messages lost if no subscriber      │
│     └── Kafka: Retained for days, replay anytime           │
│                                                              │
│  2. Multiple Consumers                                       │
│     └── Trip service, Analytics, Fraud detection, Billing  │
│     └── Each consumes independently at own pace            │
│                                                              │
│  3. Ordering Guarantees                                      │
│     └── Partition by trip_id = all events for a trip       │
│         processed in order by same consumer                │
│                                                              │
│  4. Throughput                                               │
│     └── 1M+ events/sec with proper partitioning            │
│                                                              │
│  When SQS is fine: <10K events/sec, no replay needed       │
│  When Redis Pub/Sub is fine: Ephemeral notifications only  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The $300/Month Ride-Hailing MVP

**Scenario**: Local ride service for a college town, 50 drivers, 500 rides/day

```
┌─────────────────────────────────────────────────────────────┐
│              STARTUP STACK (~$300/month)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Infrastructure:                                             │
│  ├── Single $80/month DigitalOcean droplet (4GB RAM)       │
│  ├── Managed PostgreSQL $15/month (with PostGIS)           │
│  ├── Redis Cloud free tier (30MB, plenty for 50 drivers)   │
│  └── Google Maps API ~$200/month (at 500 rides/day)        │
│                                                              │
│  Architecture:                                               │
│  ├── Monolithic Django/Rails app                           │
│  ├── PostGIS for driver locations (ST_DWithin queries)     │
│  ├── Simple polling every 5 seconds for location updates   │
│  ├── Greedy "assign nearest driver" matching               │
│  └── Twilio for SMS notifications ($0.01/message)          │
│                                                              │
│  What you DON'T need:                                        │
│  ├── Kafka (use PostgreSQL NOTIFY or simple polling)       │
│  ├── H3 hexagonal indexing (geohash or even raw PostGIS)   │
│  ├── WebSockets (polling is fine for 50 drivers)           │
│  ├── Microservices (monolith until 10+ engineers)          │
│  └── ML-based ETA (Google Maps API is accurate enough)     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### When PostGIS is Enough

| Scale | PostGIS Performance | Recommendation |
|-------|---------------------|----------------|
| < 1,000 drivers | ~5ms for radius query | PostGIS is great |
| 1,000 - 10,000 drivers | ~20-50ms | PostGIS still works |
| 10,000 - 100,000 drivers | 100ms+ without optimization | Consider Redis |
| > 100,000 drivers | Need sharding | Redis + geohash/H3 |

**PostGIS query that handles 90% of use cases**:
```sql
-- Find available drivers within 5km
SELECT driver_id,
       ST_Distance(location, ST_SetSRID(ST_MakePoint(-122.42, 37.78), 4326)) as distance
FROM drivers
WHERE status = 'available'
  AND ST_DWithin(
    location,
    ST_SetSRID(ST_MakePoint(-122.42, 37.78), 4326),
    5000  -- meters
  )
ORDER BY distance
LIMIT 10;

-- With spatial index: CREATE INDEX idx_drivers_location ON drivers USING GIST(location);
-- This is sub-10ms for 10K drivers with proper indexing
```

### When You DON'T Need H3 Hexagonal Indexing

```
┌─────────────────────────────────────────────────────────────┐
│              H3 vs SIMPLER ALTERNATIVES                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  H3 hexagons solve:                                          │
│  ├── Uniform neighbor distances (all 6 neighbors equal)    │
│  ├── Hierarchical aggregation (zoom in/out smoothly)       │
│  └── Edge case handling at grid boundaries                 │
│                                                              │
│  But you probably don't need H3 if:                         │
│  ├── Single city operation (no global scale)               │
│  ├── < 50,000 concurrent drivers                           │
│  ├── Not doing ML on spatial aggregates                    │
│  └── Simple "find nearby" is your main query               │
│                                                              │
│  Simpler alternatives:                                       │
│  ├── Redis GEORADIUS (built-in, no library needed)         │
│  ├── Simple geohash prefix matching                        │
│  ├── PostGIS ST_DWithin with spatial index                 │
│  └── Even lat/lon bounding box for MVP!                    │
│                                                              │
│  Bounding box query (simplest possible):                    │
│  SELECT * FROM drivers                                       │
│  WHERE lat BETWEEN 37.7 AND 37.8                            │
│    AND lng BETWEEN -122.5 AND -122.4                        │
│    AND status = 'available';                                │
│  -- Works fine for < 1000 drivers, ~1ms with B-tree index  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Surge Pricing - Keep It Simple

**What Uber actually does** (simplified):
```python
def calculate_surge(geohash_region):
    # Count ride requests in last 5 minutes
    demand = redis.get(f"requests:{geohash_region}:5min") or 0

    # Count available drivers
    supply = redis.scard(f"drivers:{geohash_region}:available") or 1

    ratio = demand / max(supply, 1)

    # Simple mapping - no ML needed for basic surge
    if ratio < 1.0: return 1.0
    if ratio < 1.5: return 1.25
    if ratio < 2.0: return 1.5
    if ratio < 3.0: return 2.0
    return min(2.5, ratio * 0.8)  # Cap at 2.5x
```

**Don't overcomplicate**: Surge pricing is supply/demand ratio with a lookup table. ML is used for *predicting* future surge, not calculating current surge.

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Trade-offs in Ride-Hailing Systems

```
┌─────────────────────────────────────────────────────────────┐
│                    TRADE-OFF MATRIX                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. CONSISTENCY vs AVAILABILITY (Driver Assignment)         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Problem: Two riders might be assigned the same driver   ││
│  │                                                          ││
│  │ Option A: Strong consistency (distributed lock)         ││
│  │ └── Pro: Never double-book                              ││
│  │ └── Con: Higher latency, lock contention                ││
│  │                                                          ││
│  │ Option B: Optimistic concurrency (assign, then verify)  ││
│  │ └── Pro: Fast, no blocking                              ││
│  │ └── Con: Occasional conflicts need resolution           ││
│  │                                                          ││
│  │ Uber's approach: Optimistic with fast conflict detect   ││
│  │ └── Assign driver, driver confirms within 15 sec        ││
│  │ └── If conflict, reassign immediately (rare at scale)   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  2. FRESHNESS vs COST (Location Updates)                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Problem: More updates = better accuracy but higher cost ││
│  │                                                          ││
│  │ Mitigation: Adaptive update frequency                   ││
│  │ ├── On active trip: every 2-4 seconds                   ││
│  │ ├── Available in busy area: every 10 seconds            ││
│  │ ├── Available in quiet area: every 30-60 seconds        ││
│  │ └── Idle: only on significant movement (>100m)          ││
│  │                                                          ││
│  │ Result: 10x reduction in updates, minimal UX impact     ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  3. ACCURACY vs SPEED (ETA Calculation)                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Problem: Accurate ETAs need traffic data, slow compute  ││
│  │                                                          ││
│  │ Mitigation: Tiered calculation                          ││
│  │ ├── Display: Cached estimate, refresh every 30 sec      ││
│  │ ├── Matching: Pre-computed zone-to-zone estimates       ││
│  │ └── Final confirmation: Real routing API call           ││
│  │                                                          ││
│  │ Cache key: (origin_geohash, dest_geohash, time_bucket)  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  4. FAIRNESS vs EFFICIENCY (Driver Matching)                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Problem: Always picking nearest driver starves others   ││
│  │                                                          ││
│  │ Mitigation: Weighted scoring                            ││
│  │ score = 0.5 * distance_score                            ││
│  │       + 0.2 * time_since_last_ride                      ││
│  │       + 0.2 * driver_rating                             ││
│  │       + 0.1 * heading_alignment                         ││
│  │                                                          ││
│  │ Result: Slightly longer ETAs, happier driver ecosystem  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Failure Mode Mitigations

| Failure | Impact | Mitigation |
|---------|--------|------------|
| **Redis cluster down** | No driver matching | Fallback to PostgreSQL, degraded mode |
| **Kafka lag** | Delayed analytics, billing | Trip service writes to both Kafka and sync DB |
| **Maps API timeout** | No ETA shown | Cached estimates, straight-line fallback |
| **Driver app crash** | Lost trip state | Rider-side tracking, automatic recovery flow |
| **Payment failure** | Can't end trip | Complete trip, queue payment retry |
| **Surge calculation error** | Wrong pricing | Circuit breaker defaults to 1.0x (no surge) |

### Data Consistency Strategy

```python
# Pattern: Saga with compensation for ride lifecycle
class RideSaga:
    def execute_ride_request(self, rider_id, pickup, dropoff):
        try:
            # Step 1: Reserve payment authorization
            auth = self.payment_service.authorize(rider_id, estimated_fare)

            # Step 2: Find and assign driver
            driver = self.matching_service.assign_driver(pickup)

            # Step 3: Create trip record
            trip = self.trip_service.create(rider_id, driver.id, pickup, dropoff)

            return trip

        except DriverNotFound:
            # Compensation: Release payment auth
            self.payment_service.void(auth.id)
            raise

        except TripCreationFailed:
            # Compensation: Release driver, void payment
            self.matching_service.release_driver(driver.id)
            self.payment_service.void(auth.id)
            raise
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Geospatial indexing**: Start with PostGIS/Redis GEORADIUS, mention H3 as scale optimization
2. **Real-time location at scale**: Tiered update frequency based on driver state
3. **Matching algorithm**: Greedy for MVP, Hungarian algorithm for optimization at scale
4. **Surge pricing**: It's just supply/demand ratio - don't overcomplicate
5. **ETA prediction**: Caching + ML, but Google Maps API for MVP

### Common Follow-ups

- How do you handle driver going offline mid-trip? (Graceful degradation, rider-side tracking)
- How do you calculate accurate ETAs? (Cached zone-to-zone + real-time for confirmation)
- How do you prevent fraud (fake rides)? (ML on trip patterns, driver/rider verification)
- How do you handle cross-city rides? (Global user service, regional dispatch)

---

### Red Flags (What NOT to Say)

<div style="background: #3d1f1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #f85149;">

| Red Flag | Why It's Bad | Better Answer |
|----------|--------------|---------------|
| "We need H3 hexagons from day one" | Over-engineering for scale you don't have | "Start with Redis GEORADIUS, H3 when we hit 100K drivers" |
| "Use Kafka for everything" | Not every message needs replay/ordering | "Kafka for trip events, Redis Pub/Sub for ephemeral notifications" |
| "Build our own maps from scratch" | Massive undertaking, years of work | "Google Maps API initially, own routing engine when costs justify" |
| "ML-based surge pricing" | Surge is simple math, ML is for prediction | "Supply/demand ratio for current surge, ML for predicting future demand" |
| "Microservices from the start" | Premature complexity | "Monolith first, extract services as team grows past 10 engineers" |
| "Exactly-once delivery for locations" | Locations are idempotent, latest wins | "At-least-once is fine, locations naturally dedupe by timestamp" |
| "Distributed transactions for ride assignment" | Too slow, not necessary | "Optimistic locking with fast conflict resolution" |

</div>

---

### Impressive Statements

<div style="background: #1f3d2d; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #3fb950;">

**Show depth with these insights:**

> "For < 1,000 drivers, PostGIS with a spatial index and simple `ST_DWithin` queries gives you sub-10ms lookups. You don't need Redis geospatial until you're processing 10K+ location updates per second."

> "Surge pricing is literally `demand / supply` mapped to a multiplier table. The complexity is in *predicting* future surge for driver positioning, not calculating current surge."

> "The real challenge isn't finding the nearest driver - it's global optimization. Assigning driver A to rider 1 might make driver B's assignment to rider 2 worse. That's why batch matching with the Hungarian algorithm matters at scale."

> "Uber's Ringpop solves a specific problem: stateful services without a central coordinator. For most companies, Redis Cluster or even a simple load balancer with sticky sessions is fine."

> "H3 hexagons matter when you need uniform neighbor distances for ML features. If you're just doing radius queries, geohash or even Redis GEORADIUS is simpler and equally effective."

> "The $300/month MVP stack: DigitalOcean droplet, PostgreSQL with PostGIS, Google Maps API, and a monolithic Django app. This handles 500 rides/day easily."

> "Location updates don't need strong consistency - they're naturally idempotent. The latest update always wins, so at-least-once delivery with client timestamps is perfect."

</div>

---

### Scaling Triggers Cheat Sheet

| Metric | Trigger Point | Action |
|--------|---------------|--------|
| Concurrent drivers | > 1,000 | Move from PostGIS to Redis geospatial |
| Location updates/sec | > 10,000 | Implement tiered update frequency |
| Rides per day | > 10,000 | Add Kafka for event streaming |
| Cities | > 10 | Implement city-based sharding |
| Engineers | > 10 | Start extracting microservices |
| Maps API cost | > $10K/month | Evaluate self-hosted OSRM |
| Matching latency | > 500ms | Implement batch matching algorithm |

</div>
