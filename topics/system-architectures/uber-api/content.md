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

<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">

  <!-- Mobile Apps -->
  <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px 32px; text-align: center;">
    <div style="font-weight: bold; color: white; font-size: 14px;">Mobile Apps</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px;">Rider | Driver</div>
  </div>

  <!-- Connection Arrow -->
  <div style="display: flex; flex-direction: column; align-items: center; color: #8b949e;">
    <div style="width: 2px; height: 20px; background: #8b949e;"></div>
    <div style="font-size: 11px; padding: 4px 8px; background: #21262d; border-radius: 4px;">WebSocket + REST</div>
    <div style="width: 2px; height: 20px; background: #8b949e;"></div>
    <div style="font-size: 16px;">&#9660;</div>
  </div>

  <!-- API Gateway -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px 48px; text-align: center; width: 80%; max-width: 500px;">
    <div style="font-weight: bold; color: white; font-size: 16px;">API GATEWAY</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px;">Auth, Rate Limit, Routing</div>
  </div>

  <!-- Arrow -->
  <div style="color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Core Services Row -->
  <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%;">

    <!-- Location Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">LOCATION SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; GPS Updates<br/>
        &#8226; Real-time tracking<br/>
        &#8226; Geofence detection
      </div>
    </div>

    <!-- Matching Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">MATCHING SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; Find drivers<br/>
        &#8226; Optimize dispatch<br/>
        &#8226; Assignment logic
      </div>
    </div>

    <!-- Trip Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">TRIP SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; Create trip<br/>
        &#8226; Track status<br/>
        &#8226; End trip
      </div>
    </div>

  </div>

  <!-- Arrow -->
  <div style="color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Secondary Services Row -->
  <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%;">

    <!-- Supply Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #3fb950; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">SUPPLY SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; Driver status<br/>
        &#8226; Shift management<br/>
        &#8226; Availability
      </div>
    </div>

    <!-- Pricing Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f85149; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">PRICING SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; Surge pricing<br/>
        &#8226; ETA calculation<br/>
        &#8226; Fare estimation
      </div>
    </div>

    <!-- Payment Service -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #db61a2; border-radius: 12px; padding: 16px; flex: 1; min-width: 150px; max-width: 200px;">
      <div style="color: #db61a2; font-weight: bold; font-size: 13px; margin-bottom: 8px; text-align: center;">PAYMENT SERVICE</div>
      <div style="color: #8b949e; font-size: 11px; line-height: 1.6;">
        &#8226; Calculate fare<br/>
        &#8226; Process charge<br/>
        &#8226; Split payments
      </div>
    </div>

  </div>

  <!-- Arrow -->
  <div style="color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Kafka Event Bus -->
  <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px 48px; text-align: center;">
    <div style="font-weight: bold; color: white; font-size: 14px;">KAFKA Event Bus</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 11px; margin-top: 4px;">Async messaging & event streaming</div>
  </div>

</div>

</div>

---

## Geospatial Indexing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">GEOHASH-BASED DRIVER LOOKUP</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Header Section -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
    <div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">How Geohash Works</div>
    <div style="color: #c9d1d9; font-size: 13px;">
      A geohash like <code style="background: #161b22; padding: 2px 6px; border-radius: 4px; color: #58a6ff;">"9q8yy"</code> represents a specific grid cell on Earth's surface. Longer strings = smaller, more precise areas.
    </div>
  </div>

  <!-- Precision Table -->
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #3fb950;">
      <div style="color: #3fb950; font-weight: bold; font-size: 18px;">4 chars</div>
      <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">~40km cell</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">City-level clustering</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #1f6feb;">
      <div style="color: #1f6feb; font-weight: bold; font-size: 18px;">5 chars</div>
      <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">~5km cell</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">Neighborhood supply</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #a371f7;">
      <div style="color: #a371f7; font-weight: bold; font-size: 18px;">6 chars</div>
      <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">~1km cell</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">Driver matching radius</div>
    </div>
  </div>

  <!-- Redis Commands Section -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
    <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Redis Geospatial Commands</div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="background: #161b22; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px;">
        <span style="color: #f0883e;">GEOADD</span> <span style="color: #c9d1d9;">drivers:available lng lat driver_id</span>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px;">
        <span style="color: #f0883e;">GEORADIUS</span> <span style="color: #c9d1d9;">drivers:available lng lat 2 km WITHDIST</span>
        <div style="color: #8b949e; margin-top: 8px; font-family: sans-serif;">&#8594; Returns drivers within 2km sorted by distance</div>
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

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

  <!-- Global Gateway -->
  <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px 40px; text-align: center;">
    <div style="font-weight: bold; color: white; font-size: 15px;">Global Gateway</div>
    <div style="color: rgba(255,255,255,0.8); font-size: 11px; margin-top: 4px;">Route by City</div>
  </div>

  <!-- Arrow -->
  <div style="color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Regional Clusters -->
  <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; width: 100%;">

    <!-- NYC Region -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; flex: 1; min-width: 180px; max-width: 220px;">
      <div style="color: #f0883e; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">NYC REGION</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #58a6ff; font-size: 11px;">Location Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #a371f7; font-size: 11px;">Matching Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #f85149; font-size: 11px;">Redis (Drivers)</div>
        </div>
      </div>
    </div>

    <!-- SF Region -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 20px; flex: 1; min-width: 180px; max-width: 220px;">
      <div style="color: #3fb950; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">SF REGION</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #58a6ff; font-size: 11px;">Location Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #a371f7; font-size: 11px;">Matching Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #f85149; font-size: 11px;">Redis (Drivers)</div>
        </div>
      </div>
    </div>

    <!-- London Region -->
    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 20px; flex: 1; min-width: 180px; max-width: 220px;">
      <div style="color: #a371f7; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">LONDON REGION</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #58a6ff; font-size: 11px;">Location Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #a371f7; font-size: 11px;">Matching Service</div>
        </div>
        <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
          <div style="color: #f85149; font-size: 11px;">Redis (Drivers)</div>
        </div>
      </div>
    </div>

  </div>

  <!-- Arrow -->
  <div style="color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Global Services -->
  <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
      <div style="color: #db61a2; font-size: 12px; font-weight: bold;">Global Payment</div>
    </div>
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
      <div style="color: #58a6ff; font-size: 12px; font-weight: bold;">Global User</div>
    </div>
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
      <div style="color: #3fb950; font-size: 12px; font-weight: bold;">Global Analytics</div>
    </div>
  </div>

</div>

</div>

### Matching Algorithm

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Header -->
  <div style="text-align: center;">
    <div style="color: #a371f7; font-weight: bold; font-size: 16px; margin-bottom: 8px;">DISPATCH OPTIMIZATION</div>
    <div style="color: #8b949e; font-size: 13px;">Goal: Minimize total wait time across all riders</div>
  </div>

  <!-- Factors Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #f0883e;">
      <div style="color: #f0883e; font-size: 20px; font-weight: bold;">1</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Distance to pickup</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #58a6ff;">
      <div style="color: #58a6ff; font-size: 20px; font-weight: bold;">2</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Driver rating</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #3fb950;">
      <div style="color: #3fb950; font-size: 20px; font-weight: bold;">3</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Acceptance rate</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #a371f7;">
      <div style="color: #a371f7; font-size: 20px; font-weight: bold;">4</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Vehicle type match</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #db61a2;">
      <div style="color: #db61a2; font-size: 20px; font-weight: bold;">5</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Heading direction</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center; border-left: 3px solid #f85149;">
      <div style="color: #f85149; font-size: 20px; font-weight: bold;">6</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Supply/demand ratio</div>
    </div>
  </div>

  <!-- Algorithm Steps -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-top: 3px solid #58a6ff;">
    <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Hungarian Algorithm - Batch Matching (every 2 seconds)</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; color: #0d1117; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">1</div>
        <div style="color: #c9d1d9; font-size: 13px;">Collect pending ride requests</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; color: #0d1117; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">2</div>
        <div style="color: #c9d1d9; font-size: 13px;">Get available drivers in relevant areas</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; color: #0d1117; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">3</div>
        <div style="color: #c9d1d9; font-size: 13px;">Build cost matrix (rider x driver)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; color: #0d1117; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">4</div>
        <div style="color: #c9d1d9; font-size: 13px;">Solve assignment problem</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #58a6ff; color: #0d1117; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">5</div>
        <div style="color: #c9d1d9; font-size: 13px;">Dispatch optimal matches</div>
      </div>
    </div>
  </div>

</div>

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

<div style="text-align: center; margin-bottom: 24px;">
  <div style="color: #a371f7; font-weight: bold; font-size: 18px;">UBER GLOBAL ARCHITECTURE</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Edge Layer -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
    <div style="color: #f0883e; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">EDGE LAYER</div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #161b22; border-radius: 8px; padding: 12px 20px; text-align: center;">
        <div style="color: #c9d1d9; font-size: 12px; font-weight: bold;">Edge PoP</div>
        <div style="color: #8b949e; font-size: 10px;">WebSocket termination</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px 20px; text-align: center;">
        <div style="color: #c9d1d9; font-size: 12px; font-weight: bold;">Edge PoP</div>
        <div style="color: #8b949e; font-size: 10px;">WebSocket termination</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px 20px; text-align: center;">
        <div style="color: #c9d1d9; font-size: 12px; font-weight: bold;">Edge PoP</div>
        <div style="color: #8b949e; font-size: 10px;">WebSocket termination</div>
      </div>
      <div style="color: #8b949e; display: flex; align-items: center; font-size: 20px;">...</div>
    </div>
  </div>

  <!-- Arrow -->
  <div style="text-align: center; color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Ring Pop Layer -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
    <div style="color: #58a6ff; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 12px;">RING POP (Peer-to-Peer)</div>
    <div style="color: #8b949e; font-size: 12px; text-align: center; line-height: 1.8;">
      Consistent hashing for stateful services<br/>
      Driver state distributed across nodes<br/>
      Location indexed by geohash<br/>
      No central coordinator
    </div>
  </div>

  <!-- Arrow -->
  <div style="text-align: center; color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Regional Services -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 20px;">
    <div style="color: #3fb950; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">REGIONAL SERVICES</div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #161b22; border-radius: 8px; padding: 14px 20px; text-align: center; border-top: 3px solid #f0883e;">
        <div style="color: #f0883e; font-size: 12px; font-weight: bold;">Dispatch</div>
        <div style="color: #8b949e; font-size: 10px;">(H3 Index)</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 14px 20px; text-align: center; border-top: 3px solid #a371f7;">
        <div style="color: #a371f7; font-size: 12px; font-weight: bold;">Pricing</div>
        <div style="color: #8b949e; font-size: 10px;">(ML-based)</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 14px 20px; text-align: center; border-top: 3px solid #58a6ff;">
        <div style="color: #58a6ff; font-size: 12px; font-weight: bold;">Routing</div>
        <div style="color: #8b949e; font-size: 10px;">(OSRM/Valhalla)</div>
      </div>
    </div>
  </div>

  <!-- Arrow -->
  <div style="text-align: center; color: #8b949e; font-size: 16px;">&#9660;</div>

  <!-- Global Services -->
  <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border: 2px solid #a371f7; border-radius: 12px; padding: 20px;">
    <div style="color: #a371f7; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">GLOBAL SERVICES</div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #161b22; border-radius: 8px; padding: 12px 18px; text-align: center;">
        <div style="color: #db61a2; font-size: 11px; font-weight: bold;">Payment (Stripe)</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px 18px; text-align: center;">
        <div style="color: #58a6ff; font-size: 11px; font-weight: bold;">User Profiles</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px 18px; text-align: center;">
        <div style="color: #3fb950; font-size: 11px; font-weight: bold;">Driver Profiles</div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px 18px; text-align: center;">
        <div style="color: #f0883e; font-size: 11px; font-weight: bold;">Analytics (Spark)</div>
      </div>
    </div>
  </div>

</div>

</div>

### H3 Hexagonal Grid

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #a371f7; font-weight: bold; font-size: 16px;">H3 HEXAGONAL INDEXING (Uber)</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Why Hexagons -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
    <div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Why hexagons over squares?</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950; font-size: 16px;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">All neighbors equidistant (6 neighbors)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950; font-size: 16px;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Better circular search approximation</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950; font-size: 16px;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Hierarchical: 7 child hexes each</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950; font-size: 16px;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">No edge/corner ambiguity</div>
      </div>
    </div>
  </div>

  <!-- Resolution Levels -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #f85149;">
      <div style="color: #f85149; font-weight: bold; font-size: 16px;">Res 7</div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">~5km edge</div>
      <div style="color: #c9d1d9; font-size: 10px; margin-top: 8px;">City-wide supply/demand</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #f0883e;">
      <div style="color: #f0883e; font-weight: bold; font-size: 16px;">Res 8</div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">~2km edge</div>
      <div style="color: #c9d1d9; font-size: 10px; margin-top: 8px;">Neighborhood matching</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #58a6ff;">
      <div style="color: #58a6ff; font-weight: bold; font-size: 16px;">Res 9</div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">~500m edge</div>
      <div style="color: #c9d1d9; font-size: 10px; margin-top: 8px;">Pickup zone</div>
    </div>
    <div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center; border-top: 3px solid #3fb950;">
      <div style="color: #3fb950; font-weight: bold; font-size: 16px;">Res 10</div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">~100m edge</div>
      <div style="color: #c9d1d9; font-size: 10px; margin-top: 8px;">Precise location</div>
    </div>
  </div>

  <!-- Hierarchical Query -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
    <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Hierarchical Query Strategy</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px;">1</div>
        <div style="color: #c9d1d9; font-size: 12px;">Get user's H3 cell (resolution 9)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px;">2</div>
        <div style="color: #c9d1d9; font-size: 12px;">Get k-ring neighbors (1-2 rings)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px;">3</div>
        <div style="color: #c9d1d9; font-size: 12px;">Query drivers in those cells</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px;">4</div>
        <div style="color: #c9d1d9; font-size: 12px;">If not enough, expand to parent cell (res 8)</div>
      </div>
    </div>
  </div>

</div>

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

<div style="background: #21262d; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #f0883e;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #f0883e; font-weight: bold; font-size: 16px;">HANDLING 1M LOCATION UPDATES/SECOND</div>
  <div style="color: #8b949e; font-size: 13px; margin-top: 8px;">Challenge: 5M drivers x 1 update/5 sec = 1M updates/sec</div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

  <div style="color: #58a6ff; font-weight: bold; font-size: 14px;">Solution: Tiered Update Strategy</div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
      <div style="color: #f85149; font-weight: bold; font-size: 12px;">On Active Trip</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">Update every 2-4 seconds</div>
      <div style="color: #8b949e; font-size: 10px; margin-top: 4px;">(real-time tracking required)</div>
    </div>
    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-left: 3px solid #f0883e;">
      <div style="color: #f0883e; font-weight: bold; font-size: 12px;">Available, High Demand</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">Update every 5-10 seconds</div>
      <div style="color: #8b949e; font-size: 10px; margin-top: 4px;">(matching accuracy needed)</div>
    </div>
    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-left: 3px solid #58a6ff;">
      <div style="color: #58a6ff; font-weight: bold; font-size: 12px;">Available, Low Demand</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">Update every 30-60 seconds</div>
      <div style="color: #8b949e; font-size: 10px; margin-top: 4px;">(battery optimization)</div>
    </div>
    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-left: 3px solid #3fb950;">
      <div style="color: #3fb950; font-weight: bold; font-size: 12px;">Offline/Idle</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 8px;">No updates</div>
      <div style="color: #8b949e; font-size: 10px; margin-top: 4px;">(significant motion triggers)</div>
    </div>
  </div>

</div>

</div>

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

> "PostGIS is excellent for complex geospatial queries - polygons, routes, spatial joins. But for Uber's core use case - 'find drivers within X km' - it's overkill."

**Step-by-step breakdown:**

1. **The Query Pattern**: When a rider opens the app at Times Square (40.758, -73.985), we need to find available drivers within 2-5km. This happens millions of times per minute globally.

2. **How Geohash Works**: The coordinates get encoded to a string like `"dr5ru7"`. All locations sharing the prefix `"dr5ru"` are in the same ~1km grid cell. Finding nearby drivers becomes a simple string prefix search - O(1) in Redis.

3. **Why Redis Wins Here**:
   - `GEORADIUS drivers:available -73.985 40.758 2 km` returns sorted results in <1ms
   - No connection pooling overhead (unlike PostgreSQL)
   - No query planner cost for simple lookups
   - Horizontal scaling via Redis Cluster

4. **Concrete Numbers**:
   - PostGIS `ST_DWithin` on 10,000 drivers: ~20-50ms with spatial index
   - Redis GEORADIUS on 10,000 drivers: ~0.5ms
   - At 100K requests/second, that 20ms adds up to 2,000 concurrent PostgreSQL connections

5. **When PostGIS is Better**: Airport pickup zones (polygons), route-based queries ("drivers heading toward JFK"), complex spatial joins for analytics. Use PostGIS for offline processing, Redis for real-time matching.

**Failure scenario**: If Redis cluster goes down, fall back to PostgreSQL with degraded latency (50ms instead of 1ms). The system stays functional but matching is slower.

**When simpler works**: "For < 1,000 concurrent drivers in a city, PostGIS with a simple `ST_DWithin` query and a spatial index is perfectly fine. The complexity of geohash sharding isn't worth it until you're processing 10K+ location updates per second."

---

### 2. "How do you match riders to drivers at scale without creating hotspots?"

**What they're probing**: Understanding of distributed systems, avoiding single points of contention, and batch optimization.

**Strong Answer**:

> "The naive approach - lock driver, assign, unlock - creates massive contention. Instead, we batch."

**Step-by-step with real scenario:**

1. **The Problem at Times Square on New Year's Eve**:
   - 500 ride requests in 2 seconds
   - 200 available drivers in the area
   - Naive approach: 500 sequential lock attempts, 300 failures, retries cascade
   - Result: 30+ second matching times, angry riders

2. **Batch Matching Solution**:
   - Every 2 seconds, collect ALL pending requests in a geohash region
   - Get ALL available drivers in that region + neighbors
   - Build a cost matrix: 500 riders x 200 drivers = 100,000 cells
   - Each cell = weighted score (distance: 50%, ETA: 20%, driver rating: 15%, heading: 15%)

3. **Hungarian Algorithm in Action**:
   - Solves the assignment problem optimally in O(n^3)
   - For 500x200 matrix: ~50ms computation
   - Assigns driver D1 to rider R1, D2 to R2, etc.
   - All 200 drivers assigned in one atomic batch

4. **Geographic Partitioning**:
   - Manhattan is split into ~50 geohash regions
   - Each matching service instance owns 5-10 regions
   - No cross-region coordination needed
   - Times Square (geohash `dr5ru`) is handled by one instance

5. **Concrete Numbers**:
   - H3 hexagon at resolution 9 is ~0.1 km^2 (about 2 city blocks)
   - Typical batch: 20-100 riders, 50-200 drivers
   - Computation time: 10-50ms per batch
   - Matching latency: average 1-2 seconds (half a batch window)

**Failure scenario**: If the matching service crashes mid-batch, all pending requests stay in `pending` state. The next batch picks them up 2 seconds later. Riders see "Finding your driver..." for 4 seconds instead of 2.

**When simpler works**: "For a city with 50 concurrent ride requests, simple first-come-first-served with optimistic locking works fine. The Hungarian algorithm optimization only matters when you're matching thousands of riders to thousands of drivers simultaneously."

---

### 3. "Why not just use Google Maps API for everything - routing, ETA, geocoding?"

**What they're probing**: Cost awareness, vendor lock-in understanding, and knowing when to build vs. buy.

**Strong Answer**:

> "At Uber's scale, Google Maps would cost hundreds of millions per year. More importantly, Google's ETA predictions don't account for Uber-specific factors."

**Detailed breakdown:**

1. **Cost Calculation at Scale**:
   - Google Directions API: $5 per 1,000 requests
   - Uber: 20M trips/day = 20M routing requests minimum
   - Plus ETA checks, re-routing, driver navigation
   - Realistic: 100M API calls/day = $500K/day = $180M/year just for routing

2. **Why Google's ETA is Wrong for Uber**:
   - Google predicts: "Drive from A to B takes 12 minutes"
   - But Uber needs: "Driver accepting, driving to pickup, waiting, then to destination"
   - Uber-specific factors Google doesn't know:
     - This pickup spot at Madison Square Garden has a 3-minute average wait
     - This driver has 95% acceptance rate (vs. 60% for others)
     - Surge pricing just started, more drivers heading to this area

3. **Hybrid Approach (What Uber Actually Does)**:
   - **Google Maps**: Turn-by-turn navigation rendering (hard to build)
   - **Self-hosted OSRM/Valhalla**: Route calculation, basic ETA
   - **Custom ML models**: ETA prediction trained on Uber trip data
   - **Mapbox/own tiles**: Map rendering in driver app

4. **Build vs. Buy Decision Tree**:
   - < 10K API calls/day: Just use Google ($50/day)
   - 10K-100K calls/day: Google is fine, focus on product ($500/day)
   - 100K-1M calls/day: Evaluate OSRM, savings ~$10K/month
   - > 1M calls/day: Self-host is mandatory, Google is $150K+/month

**When simpler works**: "For a startup doing 1,000 rides/day, Google Maps API costs maybe $500-1,000/month and gives you world-class routing instantly. Build your own when API costs exceed engineering costs, typically around 50K-100K daily requests."

---

### 4. "Explain surge pricing without making it sound predatory"

**What they're probing**: Can you explain supply/demand economics and algorithmic fairness?

**Strong Answer**:

> "Surge pricing is fundamentally simple: `demand / supply` ratio mapped to a multiplier."

**Step-by-step explanation with real scenario:**

1. **The Times Square Problem at 11:45 PM on New Year's Eve**:
   - Demand: 2,000 ride requests in geohash `dr5ru` in last 5 minutes
   - Supply: 50 available drivers in that cell
   - Ratio: 2,000 / 50 = 40 (extremely high)

2. **The Surge Calculation**:
   ```
   ratio = demand / max(supply, 1)

   if ratio < 1.0:  surge = 1.0x  (more drivers than riders)
   if ratio 1.0-1.5: surge = 1.2x (slight imbalance)
   if ratio 1.5-2.0: surge = 1.5x (moderate imbalance)
   if ratio 2.0-3.0: surge = 2.0x (significant imbalance)
   if ratio > 3.0:   surge = 2.5x (capped to prevent extremes)
   ```

3. **What Surge Actually Does**:
   - **Reduces demand**: Price-sensitive riders wait 10 minutes for surge to drop
   - **Increases supply**: Drivers 2 miles away see "3x surge in Times Square" and drive over
   - **Result**: 15 minutes later, supply up to 200 drivers, demand down to 500, surge drops to 1.5x

4. **The Alternative Without Surge**:
   - 2,000 riders competing for 50 drivers
   - First 50 get rides (lucky)
   - Other 1,950 see "No drivers available" (terrible UX)
   - Drivers have no incentive to work peak hours

5. **Concrete Numbers**:
   - Surge is calculated per H3 cell (resolution 8, ~2km)
   - Updated every 30-60 seconds
   - Smoothed to prevent oscillation (exponential moving average)
   - Displayed upfront: "Your ride will cost $45 (2.0x surge)"

6. **Fairness Mechanisms**:
   - Cap at 2.5-3x in most cities (regulatory)
   - Surge alerts: "Prices are higher than usual"
   - Wait option: "Wait 10 min for lower price?"
   - Price lock: Once you accept, price is locked

**Failure scenario**: If surge calculation service fails, default to 1.0x (no surge). This might cause "no drivers available" in high-demand areas, but it's better than overcharging due to a bug.

**Don't overcomplicate it**: "Uber's surge is literally `if demand/supply > 1.5: multiplier = 1.2`. There's ML for prediction and smoothing, but the core is a ratio. Don't design a complex ML system when the interviewer asks about surge."

---

### 5. "How do you handle a driver's phone dying mid-trip?"

**What they're probing**: Edge cases, graceful degradation, and user experience under failure.

**Strong Answer**:

> "Multiple fallback layers ensure the trip continues even without driver connectivity."

**Step-by-step failure handling:**

1. **Immediate Detection** (0-30 seconds):
   - Driver app sends location every 4 seconds during active trip
   - Server expects heartbeat within 15-second window
   - After 2 missed heartbeats (30 sec), mark connection as "uncertain"

2. **Rider App Compensation** (30-60 seconds):
   - Rider app has cached: route polyline, driver info, destination
   - UI shows: "Driver connection interrupted - tracking may be delayed"
   - Rider's GPS approximates position along cached route
   - ETA continues counting down based on original estimate

3. **Trip State Preservation**:
   - Last known driver location: 40.751, -73.992 (5th Ave & 34th St)
   - Trip start location: 40.758, -73.985 (Times Square)
   - Elapsed time: 8 minutes
   - Estimated remaining: 12 minutes to JFK

4. **Automatic Recovery Flow** (when driver reconnects):
   - Driver app syncs current GPS: 40.642, -73.788 (now at JFK)
   - Server detects 20-minute gap, requests trip reconciliation
   - Compare: rider's tracked path, driver's reconnection point, expected route
   - If rider at destination: auto-complete trip, calculate fare from cached data

5. **Manual Resolution** (if ambiguous):
   - Both apps prompt: "Confirm trip details"
   - Rider: "Did you arrive at JFK?" [Yes] [No, trip ended early]
   - Driver: "Did trip complete normally?" [Yes] [Had issues]
   - Disputes go to support with all cached data

6. **Fare Calculation During Outage**:
   - Distance: Calculated from cached route (not actual GPS)
   - Time: Start time to estimated end time
   - Rider sees: "Fare calculated from planned route due to connection issues"

**Failure scenario escalation**: If driver never reconnects:
- Trip marked as "incomplete" after 2 hours
- Rider not charged until resolution
- Support contacts both parties
- GPS data from rider's phone helps estimate actual trip

**The trip doesn't fail; we gracefully degrade and recover.**

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

<div style="background: #21262d; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #f85149;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #f85149; font-weight: bold; font-size: 16px;">REDIS GEOSPATIAL</div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

  <!-- Commands -->
  <div style="background: #161b22; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px;">
    <div><span style="color: #f0883e;">GEOADD</span> <span style="color: #c9d1d9;">drivers:available -122.4194 37.7749 "driver_123"</span></div>
    <div style="margin-top: 8px;"><span style="color: #f0883e;">GEORADIUS</span> <span style="color: #c9d1d9;">drivers:available -122.42 37.78 5 km</span></div>
  </div>

  <!-- Pros/Cons Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <div style="color: #3fb950; font-weight: bold; margin-bottom: 12px;">Pros</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #3fb950;">&#10003;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Sub-millisecond reads</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #3fb950;">&#10003;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Built-in sorted by distance</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #3fb950;">&#10003;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Atomic operations (no locks)</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #3fb950;">&#10003;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Horizontal scaling via Cluster</div>
        </div>
      </div>
    </div>
    <div>
      <div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">Cons</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #f85149;">&#10007;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Memory-bound (all data in RAM)</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #f85149;">&#10007;</div>
          <div style="color: #c9d1d9; font-size: 12px;">No complex spatial queries</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="color: #f85149;">&#10007;</div>
          <div style="color: #c9d1d9; font-size: 12px;">Limited to radius/box searches</div>
        </div>
      </div>
    </div>
  </div>

  <div style="background: #161b22; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #8b949e;">Break-even: ~$0.02/driver/month in memory costs</span><br/>
    <span style="color: #58a6ff; font-size: 12px;">PostGIS: Better for ST_Contains, ST_Intersects</span>
  </div>

</div>

</div>

### Why Kafka Over SQS/Redis Pub/Sub?

<div style="background: #21262d; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #a371f7;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #a371f7; font-weight: bold; font-size: 16px;">KAFKA FOR RIDE EVENTS</div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

  <!-- Requirements Grid -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">

    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-top: 3px solid #f0883e;">
      <div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">1. Event Replay</div>
      <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
        "Reconstruct trip state after service restart"<br/>
        <span style="color: #f85149;">Redis Pub/Sub: Lost if no subscriber</span><br/>
        <span style="color: #3fb950;">Kafka: Retained for days</span>
      </div>
    </div>

    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-top: 3px solid #58a6ff;">
      <div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 8px;">2. Multiple Consumers</div>
      <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
        Trip service, Analytics, Fraud detection, Billing<br/>
        Each consumes independently at own pace
      </div>
    </div>

    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-top: 3px solid #3fb950;">
      <div style="color: #3fb950; font-weight: bold; font-size: 13px; margin-bottom: 8px;">3. Ordering Guarantees</div>
      <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
        Partition by trip_id = all events for a trip processed in order
      </div>
    </div>

    <div style="background: #161b22; border-radius: 8px; padding: 16px; border-top: 3px solid #a371f7;">
      <div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 8px;">4. Throughput</div>
      <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
        1M+ events/sec with proper partitioning
      </div>
    </div>

  </div>

  <div style="background: #161b22; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #8b949e;">When SQS is fine: <10K events/sec, no replay needed</span><br/>
    <span style="color: #8b949e;">When Redis Pub/Sub is fine: Ephemeral notifications only</span>
  </div>

</div>

</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The $300/Month Ride-Hailing MVP

**Scenario**: Local ride service for a college town, 50 drivers, 500 rides/day

<div style="background: #21262d; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #3fb950;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #3fb950; font-weight: bold; font-size: 16px;">STARTUP STACK (~$300/month)</div>
</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

  <!-- Infrastructure -->
  <div>
    <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Infrastructure</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
      <div style="background: #161b22; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #c9d1d9; font-size: 12px;">DigitalOcean Droplet (4GB)</span>
        <span style="color: #3fb950; font-size: 12px; font-weight: bold;">$80</span>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #c9d1d9; font-size: 12px;">Managed PostgreSQL + PostGIS</span>
        <span style="color: #3fb950; font-size: 12px; font-weight: bold;">$15</span>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #c9d1d9; font-size: 12px;">Redis Cloud (free tier)</span>
        <span style="color: #3fb950; font-size: 12px; font-weight: bold;">$0</span>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #c9d1d9; font-size: 12px;">Google Maps API</span>
        <span style="color: #3fb950; font-size: 12px; font-weight: bold;">~$200</span>
      </div>
    </div>
  </div>

  <!-- Architecture -->
  <div>
    <div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Architecture</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Monolithic Django/Rails app</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">PostGIS for driver locations (ST_DWithin queries)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Simple polling every 5 seconds for location</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Greedy "assign nearest driver" matching</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Twilio for SMS notifications ($0.01/message)</div>
      </div>
    </div>
  </div>

  <!-- What You DON'T Need -->
  <div>
    <div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">What you DON'T need</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <div style="background: #3d1f1f; border-radius: 6px; padding: 6px 12px;">
        <span style="color: #f85149; font-size: 11px;">Kafka</span>
      </div>
      <div style="background: #3d1f1f; border-radius: 6px; padding: 6px 12px;">
        <span style="color: #f85149; font-size: 11px;">H3 hexagonal indexing</span>
      </div>
      <div style="background: #3d1f1f; border-radius: 6px; padding: 6px 12px;">
        <span style="color: #f85149; font-size: 11px;">WebSockets</span>
      </div>
      <div style="background: #3d1f1f; border-radius: 6px; padding: 6px 12px;">
        <span style="color: #f85149; font-size: 11px;">Microservices</span>
      </div>
      <div style="background: #3d1f1f; border-radius: 6px; padding: 6px 12px;">
        <span style="color: #f85149; font-size: 11px;">ML-based ETA</span>
      </div>
    </div>
  </div>

</div>

</div>

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

<div style="background: #21262d; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #a371f7;">

<div style="text-align: center; margin-bottom: 20px;">
  <div style="color: #a371f7; font-weight: bold; font-size: 16px;">H3 vs SIMPLER ALTERNATIVES</div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

  <!-- What H3 Solves -->
  <div>
    <div style="color: #3fb950; font-weight: bold; margin-bottom: 12px;">H3 hexagons solve:</div>
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Uniform neighbor distances (all 6 neighbors equal)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Hierarchical aggregation (zoom in/out smoothly)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #3fb950;">&#10003;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Edge case handling at grid boundaries</div>
      </div>
    </div>
  </div>

  <!-- When You Don't Need H3 -->
  <div>
    <div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">You probably don't need H3 if:</div>
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #f0883e;">&#8226;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Single city operation (no global scale)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #f0883e;">&#8226;</div>
        <div style="color: #c9d1d9; font-size: 12px;">< 50,000 concurrent drivers</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #f0883e;">&#8226;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Not doing ML on spatial aggregates</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #f0883e;">&#8226;</div>
        <div style="color: #c9d1d9; font-size: 12px;">Simple "find nearby" is your main query</div>
      </div>
    </div>
  </div>

  <!-- Simpler Alternatives -->
  <div>
    <div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Simpler alternatives:</div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <div style="background: #161b22; border-radius: 6px; padding: 8px 14px;">
        <span style="color: #58a6ff; font-size: 11px;">Redis GEORADIUS (built-in)</span>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 8px 14px;">
        <span style="color: #58a6ff; font-size: 11px;">Simple geohash prefix</span>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 8px 14px;">
        <span style="color: #58a6ff; font-size: 11px;">PostGIS ST_DWithin</span>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 8px 14px;">
        <span style="color: #58a6ff; font-size: 11px;">Lat/lon bounding box</span>
      </div>
    </div>
  </div>

  <!-- Bounding Box Query -->
  <div style="background: #161b22; border-radius: 8px; padding: 16px;">
    <div style="color: #8b949e; font-size: 11px; margin-bottom: 8px;">Bounding box query (simplest possible):</div>
    <div style="font-family: monospace; font-size: 11px; color: #c9d1d9;">
      SELECT * FROM drivers<br/>
      WHERE lat BETWEEN 37.7 AND 37.8<br/>
      &nbsp;&nbsp;AND lng BETWEEN -122.5 AND -122.4<br/>
      &nbsp;&nbsp;AND status = 'available';
    </div>
    <div style="color: #3fb950; font-size: 10px; margin-top: 8px;">Works fine for < 1000 drivers, ~1ms with B-tree index</div>
  </div>

</div>

</div>

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

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">

  <!-- Trade-off 1: Consistency vs Availability -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
    <div style="color: #f85149; font-weight: bold; font-size: 14px; margin-bottom: 12px;">1. CONSISTENCY vs AVAILABILITY (Driver Assignment)</div>
    <div style="color: #8b949e; font-size: 12px; margin-bottom: 16px;">Problem: Two riders might be assigned the same driver</div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
      <div style="background: #161b22; border-radius: 8px; padding: 14px;">
        <div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Option A: Strong Consistency</div>
        <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
          <span style="color: #3fb950;">Pro:</span> Never double-book<br/>
          <span style="color: #f85149;">Con:</span> Higher latency, lock contention
        </div>
      </div>
      <div style="background: #161b22; border-radius: 8px; padding: 14px;">
        <div style="color: #a371f7; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Option B: Optimistic Concurrency</div>
        <div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
          <span style="color: #3fb950;">Pro:</span> Fast, no blocking<br/>
          <span style="color: #f85149;">Con:</span> Occasional conflicts need resolution
        </div>
      </div>
    </div>

    <div style="background: #1f3d2d; border-radius: 8px; padding: 12px;">
      <div style="color: #3fb950; font-weight: bold; font-size: 11px;">Uber's approach: Optimistic with fast conflict detection</div>
      <div style="color: #c9d1d9; font-size: 11px; margin-top: 4px;">Assign driver, driver confirms within 15 sec. If conflict, reassign immediately (rare at scale)</div>
    </div>
  </div>

  <!-- Trade-off 2: Freshness vs Cost -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #f0883e;">
    <div style="color: #f0883e; font-weight: bold; font-size: 14px; margin-bottom: 12px;">2. FRESHNESS vs COST (Location Updates)</div>
    <div style="color: #8b949e; font-size: 12px; margin-bottom: 16px;">Problem: More updates = better accuracy but higher cost</div>

    <div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Mitigation: Adaptive update frequency</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
      <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 11px; font-weight: bold;">Active trip</div>
        <div style="color: #c9d1d9; font-size: 10px;">2-4 seconds</div>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f0883e; font-size: 11px; font-weight: bold;">Busy area</div>
        <div style="color: #c9d1d9; font-size: 10px;">10 seconds</div>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #58a6ff; font-size: 11px; font-weight: bold;">Quiet area</div>
        <div style="color: #c9d1d9; font-size: 10px;">30-60 seconds</div>
      </div>
      <div style="background: #161b22; border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #3fb950; font-size: 11px; font-weight: bold;">Idle</div>
        <div style="color: #c9d1d9; font-size: 10px;">On movement only</div>
      </div>
    </div>
    <div style="color: #3fb950; font-size: 11px; margin-top: 12px;">Result: 10x reduction in updates, minimal UX impact</div>
  </div>

  <!-- Trade-off 3: Accuracy vs Speed -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
    <div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">3. ACCURACY vs SPEED (ETA Calculation)</div>
    <div style="color: #8b949e; font-size: 12px; margin-bottom: 16px;">Problem: Accurate ETAs need traffic data, slow compute</div>

    <div style="color: #a371f7; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Mitigation: Tiered calculation</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">1</div>
        <div style="color: #c9d1d9; font-size: 12px;"><strong>Display:</strong> Cached estimate, refresh every 30 sec</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">2</div>
        <div style="color: #c9d1d9; font-size: 12px;"><strong>Matching:</strong> Pre-computed zone-to-zone estimates</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: #58a6ff; color: #0d1117; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">3</div>
        <div style="color: #c9d1d9; font-size: 12px;"><strong>Final confirmation:</strong> Real routing API call</div>
      </div>
    </div>
    <div style="background: #161b22; border-radius: 6px; padding: 10px; margin-top: 12px;">
      <span style="color: #8b949e; font-size: 11px;">Cache key: (origin_geohash, dest_geohash, time_bucket)</span>
    </div>
  </div>

  <!-- Trade-off 4: Fairness vs Efficiency -->
  <div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #3fb950;">
    <div style="color: #3fb950; font-weight: bold; font-size: 14px; margin-bottom: 12px;">4. FAIRNESS vs EFFICIENCY (Driver Matching)</div>
    <div style="color: #8b949e; font-size: 12px; margin-bottom: 16px;">Problem: Always picking nearest driver starves others</div>

    <div style="color: #db61a2; font-weight: bold; font-size: 12px; margin-bottom: 12px;">Mitigation: Weighted scoring</div>
    <div style="background: #161b22; border-radius: 8px; padding: 14px; font-family: monospace; font-size: 11px; color: #c9d1d9;">
      score = 0.5 * distance_score<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 0.2 * time_since_last_ride<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 0.2 * driver_rating<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 0.1 * heading_alignment
    </div>
    <div style="color: #3fb950; font-size: 11px; margin-top: 12px;">Result: Slightly longer ETAs, happier driver ecosystem</div>
  </div>

</div>

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
