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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Geospatial indexing**: Geohash vs H3
2. **Real-time location at scale**: Tiered updates
3. **Matching algorithm**: Batch vs immediate
4. **Surge pricing**: Supply/demand modeling
5. **ETA prediction**: ML-based approach

### Common Follow-ups

- How do you handle driver going offline mid-trip?
- How do you calculate accurate ETAs?
- How do you prevent fraud (fake rides)?
- How do you handle cross-city rides?

</div>
