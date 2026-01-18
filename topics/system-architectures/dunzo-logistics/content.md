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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f39c12;">

### 1. "How do you optimize multi-stop routes?"

**What They're Probing**: Understanding of TSP variants, real-world constraints, computational complexity trade-offs

**Strong Answer**:
> "Multi-stop routing in logistics is a Precedence-Constrained TSP - pickups must happen before their corresponding drops. At scale, exact solutions are NP-hard, so we use heuristics: Nearest Neighbor for initial route, then 2-opt/3-opt improvements. We integrate with OSRM or Google OR-Tools for road-network-aware routing. For real-time recalculation when new orders come in, we use insertion heuristics rather than full re-optimization. Key insight: we pre-compute travel time matrices between frequent pickup points during off-peak hours."

**When Simpler Works**:
> "For < 3 stops per partner, simple point-to-point routing works fine. Instacart's early days used basic A-to-B navigation. Only batch when you have predictable high-density areas."

---

### 2. "Why not just use Google Maps routing API for everything?"

**What They're Probing**: Cost awareness, understanding of API limitations, ability to build vs. buy

**Strong Answer**:
> "Google Maps charges $5-10 per 1000 route requests. At 100K orders/day with re-routing, that's $15K-30K/month just for routing. Plus, Google's API doesn't handle multi-stop optimization with precedence constraints. We use OSRM (Open Source Routing Machine) for base routing - it's free and we can customize for two-wheeler traffic patterns. Google Maps is used for geocoding and customer-facing ETA display where accuracy perception matters more."

**When Simpler Works**:
> "For < 1000 orders/day, Google Maps API is fine. The $300-500/month cost is cheaper than engineering time to set up OSRM. DoorDash used Google Maps until they hit 10K+ daily orders."

---

### 3. "How do you handle rider assignment at scale?"

**What They're Probing**: Distributed systems knowledge, consistency vs. availability trade-offs, real-world matching systems

**Strong Answer**:
> "The core challenge is preventing double-assignment - two orders grabbing the same rider. We use Redis-based distributed locks with short TTLs (30s). The matching algorithm runs in city-sharded services - Bangalore dispatchers never compete with Mumbai dispatchers. Within a city, we partition by zones. For the actual matching, we use a scoring function: distance (40%), partner rating (20%), acceptance rate (25%), current load (15%). At peak times, we switch from 'best match' to 'good enough match' - first partner within 2km who can accept."

**When Simpler Works**:
> "For < 50 orders/hour, manual dispatcher assignment works fine. Many local courier services use WhatsApp groups where a human dispatcher posts orders and riders claim them. FIFO assignment (first available rider gets next order) works until you hit 200+ concurrent orders."

---

### 4. "How do you ensure delivery partner earnings are fair and predictable?"

**What They're Probing**: Understanding of gig economy dynamics, incentive design, operational sustainability

**Strong Answer**:
> "Partner earnings directly affect supply reliability. We guarantee minimum hourly earnings during peak slots if they maintain 80%+ acceptance rate. The earnings model combines: base fare + distance pay + time pay + tips + surge bonus. We show partners estimated earnings before accepting. Key insight: partners optimize for earnings-per-hour, not per-order. We batch orders to increase their efficiency rather than having them wait. Weekly earning summaries and gamified milestones (complete 50 orders for bonus) improve retention."

**When Simpler Works**:
> "Fixed per-delivery rate works for low-volume operations. Many local delivery services pay flat $3-5 per delivery regardless of distance. Complexity is only needed when you have variable distances and want to optimize partner utilization."

---

### 5. "What happens when a partner cancels mid-delivery?"

**What They're Probing**: Failure handling, customer experience protection, operational resilience

**Strong Answer**:
> "This is a critical failure mode. First, we detect it through GPS anomalies (stationary too long, moving away from destination) before explicit cancellation. When detected: (1) immediately notify customer with honest ETA, (2) find replacement partner with priority boost, (3) if package picked up, new partner must go to current partner's last known location. We maintain 'rescue rider' pool in high-demand areas - partners who specifically handle reassignments with bonus pay. The order stays in a special 'in-transit-reassigning' state with extra monitoring."

**When Simpler Works**:
> "For valuable packages, some services just have the partner return to pickup point and restart. For food delivery, cancellation often means refund + reorder rather than complex reassignment - sometimes simpler for customer experience."

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

| Decision | Options Considered | Chosen | Why |
|----------|-------------------|--------|-----|
| **Partner Location Store** | PostgreSQL, Redis, MongoDB | Redis GEOADD | O(log N) radius queries, TTL for stale detection, 10K writes/sec |
| **Order Queue** | RabbitMQ, SQS, Kafka | Kafka | Order matters for batching, replay for debugging, city-partitioned topics |
| **Route Optimization** | Google OR-Tools, OSRM, Custom | OSRM + OR-Tools | OSRM for road network, OR-Tools for TSP solving - best of both |
| **ETA Prediction** | Rule-based, ML, Hybrid | Hybrid | ML for accuracy, rules as fallback, A/B tested improvements |
| **Assignment Algorithm** | FIFO, Nearest, Scored | Scored | Balances partner experience, customer wait time, operational efficiency |
| **Real-time Updates** | Polling, WebSocket, SSE | WebSocket | Bi-directional needed for partner app, SSE for customer tracking |

### When to Upgrade Technology

```
┌─────────────────────────────────────────────────────────────┐
│  TECHNOLOGY EVOLUTION TRIGGERS                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PostgreSQL Location Queries → Redis GEO                    │
│  Trigger: > 100 location queries/second                     │
│  Sign: Database CPU > 70% during peak                       │
│                                                              │
│  Simple Distance Matching → ML-based Scoring                │
│  Trigger: > 500 partners in single city                     │
│  Sign: Partner utilization variance > 40%                   │
│                                                              │
│  Google Maps API → Self-hosted OSRM                         │
│  Trigger: > $5000/month in Maps API costs                   │
│  Sign: Route API calls > 500K/month                         │
│                                                              │
│  Monolithic Dispatch → City-sharded Services                │
│  Trigger: > 3 cities with different peak patterns           │
│  Sign: One city's surge affecting another's performance     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Reality Check: You Probably Don't Need This Complexity

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #00c853;">

**For < 50 orders/hour**: Manual assignment by dispatcher works fine
- WhatsApp group with available riders
- Dispatcher calls/texts assignment
- Simple spreadsheet for tracking

**For < 200 orders/day**: FIFO assignment is enough
- First available partner gets next order
- No scoring, no ML, no optimization
- Basic distance filter (< 5km from pickup)

**For single city, < 1000 orders/day**: Monolith is fine
- No microservices needed
- Single PostgreSQL database
- Basic caching with Redis

</div>

### When You DON'T Need ML Route Optimization

| Scenario | Simple Alternative | Why It Works |
|----------|-------------------|--------------|
| Single pickup, single drop | Google Maps directions | No optimization needed |
| < 3 stops per route | Fixed order (P1→D1→P2→D2) | Marginal improvement not worth compute |
| Predictable routes | Pre-computed route templates | Same store → same areas daily |
| Low-density areas | Nearest neighbor heuristic | Optimal isn't much better |

### The "$300/Month Delivery Platform" Stack

```
┌─────────────────────────────────────────────────────────────┐
│  STARTUP STACK (Works up to 500 orders/day)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend: React/Flutter app                   $0           │
│  Backend: Single Node.js/Django server         $50/mo       │
│  Database: Managed PostgreSQL (basic)          $50/mo       │
│  Maps: Google Maps API (free tier + basic)     $100/mo      │
│  SMS/Notifications: Twilio                     $50/mo       │
│  Hosting: Single VPS or basic cloud            $50/mo       │
│                                                              │
│  Total: ~$300/month                                          │
│                                                              │
│  Assignment: Manual or simple FIFO queue                    │
│  Routing: Google Maps Directions API                        │
│  Tracking: Store lat/lng in PostgreSQL, poll every 30s     │
│  Batching: Manual by dispatcher                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Real-World Examples of Simpler Approaches

**DoorDash (early days)**:
- Simple zone-based assignment for most markets
- Driver claims orders from a list rather than push assignment
- No ML routing until 2018

**Postmates (pre-Uber acquisition)**:
- Manual dispatch in new cities for first 6 months
- Simple radius-based matching
- Drivers used personal Google Maps

**Local Courier Services**:
- Fixed pricing regardless of distance
- Daily route planning by human dispatcher
- Phone calls for status updates

### Questions to Ask Before Building Complexity

```
Before building ML-based dispatch:
□ Do we have > 500 concurrent active partners?
□ Is partner utilization variance > 30%?
□ Do we have 3+ months of historical data?

Before building real-time route optimization:
□ Do partners regularly have 3+ stops?
□ Are we losing > 5% revenue to inefficient routing?
□ Do we have traffic data integration?

Before sharding by city:
□ Do we have > 3 cities?
□ Are cities in different timezones with different peaks?
□ Is single database CPU > 60% at peak?

Before building custom routing engine:
□ Are Maps API costs > $5000/month?
□ Do we need vehicle-specific routing (bikes vs cars)?
□ Is Google's routing inadequate for our geography?
```

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Critical Trade-offs in Logistics Platform Design

| Trade-off | Option A | Option B | Our Choice | Mitigation |
|-----------|----------|----------|------------|------------|
| **Partner Experience vs Customer Wait** | Prioritize partner convenience (accept/reject freely) | Force-assign orders | Soft assignment with incentives | Bonus for quick acceptance, penalty-free rejection limit |
| **ETA Accuracy vs Commitment** | Optimistic ETA (better conversion) | Padded ETA (always on time) | Adaptive padding based on confidence | Under-promise, over-deliver with live updates |
| **Batching Efficiency vs Freshness** | Wait longer for better batches | Dispatch immediately | Time-boxed batching (5 min max) | Priority override for perishables, customer choice |
| **Cost vs Coverage** | Minimize partner payments | Guarantee earnings | Zone-based guarantees | Higher guarantees in underserved areas only |
| **Consistency vs Availability** | Strong consistency for assignment | Accept some double-assignment | Optimistic locking with reconciliation | Automated conflict resolution, customer notification |

### Failure Mode Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  FAILURE MODES AND MITIGATIONS                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FAILURE: Redis location cache goes down                    │
│  Impact: Can't find nearby partners                         │
│  Mitigation: Fallback to PostgreSQL with last known         │
│  RTO: 30 seconds with automatic failover                    │
│                                                              │
│  FAILURE: Partner app loses connectivity                    │
│  Impact: Stale location, missed assignments                 │
│  Mitigation: Offline queue, SMS fallback for critical       │
│  RTO: Partner reconnects or manual reassignment             │
│                                                              │
│  FAILURE: Kafka consumer lag                                │
│  Impact: Delayed order processing                           │
│  Mitigation: Auto-scaling consumers, priority queue bypass  │
│  RTO: < 2 minutes with lag alerting at 1000 messages        │
│                                                              │
│  FAILURE: ML ETA model returns outliers                     │
│  Impact: Unrealistic customer expectations                  │
│  Mitigation: Rule-based bounds checking, fallback to avg    │
│  RTO: Immediate with outlier detection                      │
│                                                              │
│  FAILURE: Payment gateway timeout                           │
│  Impact: Order stuck in pending                             │
│  Mitigation: Async payment, proceed with delivery           │
│  RTO: Retry queue with 3x attempts over 5 minutes           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Scaling Bottlenecks and Solutions

| Bottleneck | Symptom | Threshold | Solution |
|------------|---------|-----------|----------|
| Location writes | Redis latency > 10ms | 10K writes/sec | Redis cluster, batch writes |
| Assignment queries | Partner search > 500ms | 1K queries/sec | Pre-indexed zones, caching |
| Route calculation | OSRM timeout | 100 routes/sec | OSRM cluster, pre-computation |
| Order database | Transaction conflicts | 5K orders/min | Sharding by city, read replicas |
| WebSocket connections | Memory exhaustion | 50K connections | Sticky sessions, connection pooling |

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Dispatch algorithm**: Matching partners to orders with scoring
2. **Route optimization**: Multi-stop TSP with precedence constraints
3. **ETA accuracy**: ML-based predictions with confidence intervals
4. **Order batching**: Combining nearby orders within time windows
5. **Partner incentives**: Earnings, bonuses, gamification
6. **Failure handling**: Mid-delivery cancellations, reassignment
7. **City-based scaling**: When and how to shard by geography

### Common Follow-ups

- How do you handle partner unavailability mid-delivery?
- How do you implement cash-on-delivery reconciliation?
- How do you handle multi-vendor orders (multiple pickups)?
- What's your approach to demand prediction for partner positioning?
- How do you prevent fraud (fake deliveries, GPS spoofing)?

</div>

---

## Red Flags vs Impressive Statements

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Red Flags (What NOT to Say)

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

| Statement | Why It's a Red Flag |
|-----------|-------------------|
| "We'll use ML for everything from day one" | Over-engineering; no data to train on initially |
| "Microservices from the start" | Premature optimization for a delivery startup |
| "Real-time tracking updates every second" | Unnecessary battery drain and server load |
| "We'll build our own maps/routing engine" | Reinventing the wheel without clear justification |
| "Strong consistency for all operations" | Doesn't understand availability requirements |
| "Partners will always accept assignments" | Ignores real-world gig economy dynamics |
| "We'll just use Google Maps for routing" | Doesn't understand cost implications at scale |
| "The algorithm finds the optimal route" | TSP is NP-hard; we use heuristics |

</div>

### Impressive Statements (What Shows Depth)

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #00c853;">

| Statement | Why It Impresses |
|-----------|-----------------|
| "For < 50 orders/hour, manual dispatch with WhatsApp works fine" | Shows pragmatic scaling understanding |
| "We use OSRM for routing to avoid $20K/month Google Maps bills" | Cost-aware architecture |
| "DoorDash uses simple zone-based assignment for most markets" | Industry research and realistic benchmarking |
| "The scoring function weights: distance 40%, rating 20%, acceptance 25%, load 15%" | Specific, thoughtful design |
| "We switch from 'best match' to 'good enough' during surge" | Understands graceful degradation |
| "Partners optimize for earnings-per-hour, not per-delivery" | Human factors consideration |
| "Redis GEO with 60s TTL - partner is offline if no update" | Precise technical reasoning |
| "Route optimization is precedence-constrained TSP - we use 2-opt heuristics" | Correct problem classification |
| "We batch location writes to PostgreSQL every minute, serve real-time from Redis only" | Understands CQRS patterns |
| "At 100K orders/day, Google Maps routing costs $15-30K/month" | Quantified decision making |

</div>

### The "10x Engineer" Answer Pattern

```
1. ACKNOWLEDGE COMPLEXITY
   "This is essentially a real-time matching marketplace with
    geographical constraints..."

2. START SIMPLE
   "For MVP, FIFO assignment with basic distance filtering
    handles 80% of cases..."

3. IDENTIFY TRIGGERS
   "When we hit 500+ concurrent partners, simple matching
    creates utilization variance..."

4. PROPOSE EVOLUTION
   "Then we introduce scored matching, but keep FIFO as
    fallback during system stress..."

5. QUANTIFY TRADE-OFFS
   "ML routing saves ~15% distance but adds 200ms latency
    and requires 3 months of training data..."

6. SHOW INDUSTRY AWARENESS
   "This is similar to how Uber evolved from simple dispatch
    to their Marketplace team's algorithms..."
```

</div>

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### Numbers to Remember

| Metric | Threshold | Action |
|--------|-----------|--------|
| Orders/hour | < 50 | Manual dispatch is fine |
| Orders/day | < 200 | FIFO assignment works |
| Partners/city | < 500 | No ML matching needed |
| Stops/route | < 3 | No route optimization needed |
| Cities | < 3 | Single deployment works |
| Maps API cost | < $5K/mo | Keep using Google |
| Location updates | 5-10 seconds | Standard for active partners |
| Assignment timeout | 30 seconds | Partner must respond |
| Batch window | 5 minutes max | Customer patience limit |
| Redis GEO TTL | 60 seconds | Mark partner offline |

### Tech Stack Quick Reference

| Scale | Database | Cache | Queue | Routing |
|-------|----------|-------|-------|---------|
| Startup | PostgreSQL | None | None | Google Maps |
| Growth | PostgreSQL + Read Replicas | Redis | SQS/RabbitMQ | Google Maps + OSRM |
| Scale | Sharded PostgreSQL | Redis Cluster | Kafka | OSRM + OR-Tools |

</div>
