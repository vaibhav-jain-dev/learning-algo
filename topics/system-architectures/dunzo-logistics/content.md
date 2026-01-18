# Design Dunzo Logistics

## Problem Statement

Design a hyperlocal delivery platform that enables pick-up and drop services, grocery delivery, and package delivery within a city.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #00c853;">

### Core Requirements
- **Multi-category Delivery**: Groceries, food, packages, documents
- **Real-time Tracking**: Live location of delivery partners
- **Route Optimization**: Efficient multi-stop routing
- **Partner Management**: Onboarding, earnings, performance
- **Dynamic Pricing**: Distance, time, demand-based
- **Merchant Integration**: Store inventory, order management

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">HYPERLOCAL DELIVERY ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │    Customers    │
                              │   Mobile App    │
                              └────────┬────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
     ┌───────────┐              ┌───────────┐              ┌───────────┐
     │ Customer  │              │  Partner  │              │ Merchant  │
     │   App     │              │   App     │              │   App     │
     └─────┬─────┘              └─────┬─────┘              └─────┬─────┘
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      │
                       ┌──────────────▼──────────────┐
                       │        API GATEWAY          │
                       └──────────────┬──────────────┘
                                      │
    ┌─────────────────────────────────┼─────────────────────────────────┐
    │                                 │                                 │
    ▼                                 ▼                                 ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│   ORDER     │              │    DISPATCH     │              │   TRACKING      │
│  SERVICE    │              │    SERVICE      │              │   SERVICE       │
│             │              │                 │              │                 │
│ - Create    │──────────────│ - Matching      │──────────────│ - Location      │
│ - Pricing   │              │ - Assignment    │              │ - ETA           │
│ - Status    │              │ - Batching      │              │ - History       │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                     ┌────────▼────────┐                      │
       │                     │     ROUTING     │                      │
       │                     │    SERVICE      │                      │
       │                     │                 │                      │
       │                     │ - Optimization  │                      │
       │                     │ - Multi-stop    │                      │
       │                     │ - Traffic       │                      │
       │                     └────────┬────────┘                      │
       │                              │                               │
       └──────────────────────────────┼───────────────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │    KAFKA      │
                              └───────────────┘
```

</div>

---

## Order Flow

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">HYPERLOCAL DELIVERY FLOW</h4>

```
┌─────────────────────────────────────────────────────────────┐
│                    ORDER LIFECYCLE                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Customer places order                                       │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ ORDER CREATION                                           ││
│  │                                                          ││
│  │ - Validate addresses (pickup + drops)                   ││
│  │ - Calculate distance and route                          ││
│  │ - Apply dynamic pricing                                  ││
│  │ - Reserve payment                                        ││
│  └─────────────────────────────────────────────────────────┘│
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PARTNER MATCHING                                         ││
│  │                                                          ││
│  │ Find best partner based on:                             ││
│  │ - Distance to pickup                                    ││
│  │ - Current load (active orders)                          ││
│  │ - Partner rating/performance                            ││
│  │ - Vehicle type requirements                             ││
│  │                                                          ││
│  │ Matching radius: 3km → 5km → 7km (expanding circles)   ││
│  └─────────────────────────────────────────────────────────┘│
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PICKUP PHASE                                             ││
│  │                                                          ││
│  │ - Partner accepts/rejects                               ││
│  │ - Navigate to pickup                                    ││
│  │ - Confirm pickup with OTP/photo                         ││
│  └─────────────────────────────────────────────────────────┘│
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ DELIVERY PHASE                                           ││
│  │                                                          ││
│  │ - Optimized route to drop(s)                            ││
│  │ - Real-time tracking shared with customer               ││
│  │ - Confirm delivery with OTP/photo                       ││
│  └─────────────────────────────────────────────────────────┘│
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ COMPLETION                                               ││
│  │                                                          ││
│  │ - Process payment                                        ││
│  │ - Update partner earnings                               ││
│  │ - Request ratings                                        ││
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
- **Cities**: 1-3
- **Partners**: 100-1,000
- **Orders**: 1,000-10,000/day
- **Budget**: $5,000 - $25,000/month

### Monolithic Architecture

```python
class OrderService:
    def create_order(self, customer_id, pickup, drops, category):
        # Validate addresses
        pickup_geo = self.geocode(pickup)
        drops_geo = [self.geocode(d) for d in drops]

        # Calculate route
        route = self.calculate_route(pickup_geo, drops_geo)

        # Calculate price
        base_price = self.get_base_price(category)
        distance_price = route.distance_km * self.price_per_km
        time_price = route.estimated_minutes * self.price_per_minute

        # Apply surge if applicable
        surge = self.get_surge_multiplier(pickup_geo)

        total = (base_price + distance_price + time_price) * surge

        # Create order
        order = Order.create(
            customer_id=customer_id,
            pickup=pickup_geo,
            drops=drops_geo,
            route=route,
            category=category,
            price=total,
            surge_multiplier=surge,
            status='PENDING'
        )

        # Reserve payment
        PaymentService().reserve(customer_id, total)

        # Start partner matching
        self.dispatch_service.find_partner(order)

        return order


class DispatchService:
    def find_partner(self, order):
        """Find and assign best available partner."""
        search_radius = 3  # km

        while search_radius <= 10:
            partners = self.get_available_partners(
                order.pickup,
                radius_km=search_radius
            )

            if partners:
                # Score and rank partners
                scored = []
                for partner in partners:
                    score = self.calculate_partner_score(partner, order)
                    scored.append((partner, score))

                scored.sort(key=lambda x: x[1], reverse=True)

                # Try to assign to top partners
                for partner, _ in scored[:5]:
                    if self.offer_order(partner, order):
                        return

            # Expand search radius
            search_radius += 2
            time.sleep(10)

        # No partner found - notify customer
        self.notify_no_partner(order)

    def calculate_partner_score(self, partner, order):
        # Distance score (closer is better)
        distance = haversine(partner.location, order.pickup)
        distance_score = max(0, 100 - distance * 10)

        # Rating score
        rating_score = partner.rating * 20

        # Acceptance rate score
        acceptance_score = partner.acceptance_rate * 50

        # Current load penalty
        current_orders = len(partner.active_orders)
        load_penalty = current_orders * 20

        return distance_score + rating_score + acceptance_score - load_penalty
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Route Optimization

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
MULTI-STOP ROUTE OPTIMIZATION

┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  Problem: Partner has multiple orders to deliver            │
│                                                              │
│  Example:                                                    │
│  - Order A: Pickup P1 → Drop D1                            │
│  - Order B: Pickup P2 → Drop D2                            │
│  - Order C: Pickup P3 → Drop D3                            │
│                                                              │
│  Naive Route:                                                │
│  P1 → D1 → P2 → D2 → P3 → D3                               │
│  Total: 15 km                                               │
│                                                              │
│  Optimized Route (TSP-like):                                │
│  P1 → P2 → P3 → D2 → D1 → D3                               │
│  Total: 10 km                                               │
│                                                              │
│  Constraints:                                                │
│  - Pickup must happen before drop for same order           │
│  - Consider time windows                                    │
│  - Capacity limits                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Algorithm: Modified TSP with precedence constraints
- Use Google OR-Tools / OSRM for routing
- Heuristic: Nearest neighbor with 2-opt improvement
```

</div>

### Order Batching

```python
class BatchingService:
    """
    Combine multiple orders for single partner.
    """

    def find_batchable_orders(self, order):
        """Find orders that can be batched together."""
        pending_orders = Order.query.filter(
            Order.status == 'PENDING',
            Order.created_at > now() - timedelta(minutes=5)
        ).all()

        batchable = []
        for candidate in pending_orders:
            if self.can_batch(order, candidate):
                batchable.append(candidate)

        return batchable

    def can_batch(self, order_a, order_b):
        # Same general area
        pickup_distance = haversine(order_a.pickup, order_b.pickup)
        if pickup_distance > 2:  # km
            return False

        # Drops in similar direction
        drop_distance = haversine(order_a.drops[0], order_b.drops[0])
        if drop_distance > 3:  # km
            return False

        # Same category (can't batch food with documents)
        if order_a.category != order_b.category:
            return False

        # Time window compatible
        time_diff = abs((order_a.created_at - order_b.created_at).total_seconds())
        if time_diff > 300:  # 5 minutes
            return False

        return True

    def create_batch(self, orders):
        # Calculate optimized route
        route = self.optimize_route(orders)

        # Create batch
        batch = Batch.create(
            orders=[o.id for o in orders],
            optimized_route=route,
            estimated_time=route.total_time
        )

        # Update orders
        for order in orders:
            order.batch_id = batch.id
            order.save()

        return batch
```

### Partner Location Tracking

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│                LOCATION TRACKING PIPELINE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Partner App                                                 │
│       │                                                      │
│       │ GPS update every 5 seconds (when active)            │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────┐                                        │
│  │ Location Service│                                        │
│  │ (WebSocket)     │                                        │
│  └────────┬────────┘                                        │
│           │                                                  │
│           │ Batch updates every 3 seconds                   │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    REDIS                                 ││
│  │                                                          ││
│  │  GEOADD partners:active lng lat partner_id              ││
│  │  HSET partner:{id}:location lat lng timestamp speed     ││
│  │                                                          ││
│  │  TTL: 60 seconds (consider offline if no update)        ││
│  └─────────────────────────────────────────────────────────┘│
│           │                                                  │
│           │ Publish location changes                        │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   KAFKA                                  ││
│  │  Topic: partner.locations                                ││
│  │                                                          ││
│  │  Consumers:                                              ││
│  │  - ETA Calculator                                       ││
│  │  - Customer Tracker                                      ││
│  │  - Analytics                                             ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

</div>
</div>

---

## Phase 3: Dunzo Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Cities**: 25+
- **Partners**: 50,000+
- **Orders**: 1M+/day
- **Merchants**: 100,000+

### City-Based Microservices

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    DUNZO MULTI-CITY ARCHITECTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    GLOBAL LAYER                           │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │   User      │  │   Payment   │  │    Marketing    │   │ │
    │  │  │  Service    │  │   Service   │  │    Service      │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Merchant   │  │   Partner   │  │    Analytics    │   │ │
    │  │  │  Platform   │  │  Platform   │  │    Platform     │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                   CITY CLUSTERS                           │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
    │  │  │  BANGALORE  │  │   MUMBAI    │  │    DELHI    │       │ │
    │  │  │             │  │             │  │             │       │ │
    │  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │       │ │
    │  │  │ │ Order   │ │  │ │ Order   │ │  │ │ Order   │ │       │ │
    │  │  │ │Dispatch │ │  │ │Dispatch │ │  │ │Dispatch │ │       │ │
    │  │  │ │ Track   │ │  │ │ Track   │ │  │ │ Track   │ │       │ │
    │  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │       │ │
    │  │  │             │  │             │  │             │       │ │
    │  │  │ 15K partners│  │ 12K partners│  │ 10K partners│       │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
    │  │                                                           │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### ML-Based ETA Prediction

```python
class ETAService:
    """
    Machine learning based ETA prediction.
    """

    def predict_eta(self, origin, destination, time_of_day):
        # Features
        features = {
            'distance': self.calculate_distance(origin, destination),
            'hour': time_of_day.hour,
            'day_of_week': time_of_day.weekday(),
            'is_peak_hour': self.is_peak_hour(time_of_day),
            'weather': self.get_weather(origin),
            'traffic_index': self.get_traffic_index(origin, destination),
            'historical_avg': self.get_historical_avg(origin, destination, time_of_day),
            'zone_congestion': self.get_zone_congestion(origin),
        }

        # ML model prediction
        predicted_minutes = self.ml_model.predict(features)

        # Add buffer based on confidence
        confidence = self.ml_model.predict_confidence(features)
        buffer = (1 - confidence) * 5  # 0-5 min buffer

        return {
            'eta_minutes': int(predicted_minutes + buffer),
            'confidence': confidence,
            'traffic_level': features['traffic_index']
        }

    def update_live_eta(self, order_id, partner_location):
        """Update ETA based on current partner location."""
        order = Order.get(order_id)
        remaining_stops = self.get_remaining_stops(order)

        total_eta = 0
        current_location = partner_location

        for stop in remaining_stops:
            eta = self.predict_eta(current_location, stop, now())
            stop_time = 3 if stop.is_pickup else 2  # minutes
            total_eta += eta['eta_minutes'] + stop_time
            current_location = stop

        return total_eta
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Location** | Location Service | Google Maps Platform | Google: Better in India |
| **Routing** | - | OSRM, Valhalla | OSRM: Free, customizable |
| **Database** | Aurora | CockroachDB | Aurora: Managed |
| **Cache** | ElastiCache | Redis Enterprise | ElastiCache: Simpler |
| **ML** | SageMaker | Vertex AI | SageMaker: AWS native |
| **Events** | MSK | Kafka | MSK: Managed Kafka |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Order Assignment Consistency

```
Challenge: Multiple dispatchers trying to assign same partner

Solution: Distributed lock on partner

┌─────────────────────────────────────────────────────────────┐
│  PARTNER ASSIGNMENT FLOW                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Acquire lock: SETNX partner_lock:{id} order_id EX 30   │
│                                                              │
│  2. If lock acquired:                                        │
│     - Check partner still available                         │
│     - Send offer to partner app                             │
│     - Wait for response (30s timeout)                       │
│                                                              │
│  3. If partner accepts:                                      │
│     - Create assignment                                      │
│     - Update partner status                                  │
│     - Release lock                                           │
│                                                              │
│  4. If partner rejects or timeout:                          │
│     - Release lock                                           │
│     - Try next partner                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Location Update at Scale

```
50K partners × 1 update/5s = 10K updates/second

Strategy:
- Use Redis Streams for ingestion
- Batch writes to PostgreSQL every minute
- Real-time served from Redis only
- Historical from time-series database (TimescaleDB)
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Dispatch algorithm**: Matching partners to orders
2. **Route optimization**: Multi-stop TSP variant
3. **ETA accuracy**: ML-based predictions
4. **Order batching**: Combining nearby orders
5. **Partner incentives**: Earnings, bonuses, gamification

### Common Follow-ups

- How do you handle partner unavailability mid-delivery?
- How do you implement cash-on-delivery?
- How do you handle multi-vendor orders?

</div>
