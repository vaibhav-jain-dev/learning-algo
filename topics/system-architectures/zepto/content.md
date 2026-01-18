# Design Zepto (Quick Commerce)

## Problem Statement

Design a 10-minute grocery delivery platform with dark stores, real-time inventory, and optimized last-mile delivery.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff6b35;">

### Core Requirements
- **10-minute delivery**: Promise and fulfill ultra-fast delivery
- **Dark Stores**: Strategically located micro-fulfillment centers
- **Real-time Inventory**: Accurate stock across stores
- **Order Management**: Picking, packing, dispatch
- **Delivery Assignment**: Optimal rider allocation
- **Customer Experience**: Tracking, support, refunds

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">QUICK COMMERCE ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │    Customer     │
                              │   Mobile App    │
                              └────────┬────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────┐
                    │        API GATEWAY               │
                    └──────────────────┬───────────────┘
                                       │
    ┌──────────────────────────────────┼──────────────────────────────────┐
    │                                  │                                  │
    ▼                                  ▼                                  ▼
┌─────────────┐              ┌─────────────────┐              ┌─────────────────┐
│  CATALOG    │              │    ORDER        │              │   DELIVERY      │
│  SERVICE    │              │   SERVICE       │              │   SERVICE       │
│             │              │                 │              │                 │
│ - Products  │              │ - Cart          │              │ - Assignment    │
│ - Pricing   │              │ - Checkout      │              │ - Tracking      │
│ - Search    │              │ - Status        │              │ - ETA           │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                              │                               │
       │                     ┌────────▼────────┐                      │
       │                     │   FULFILLMENT   │                      │
       │                     │    SERVICE      │                      │
       │                     │                 │                      │
       │                     │ - Pick/Pack     │                      │
       │                     │ - Dark Store    │                      │
       │                     │ - Inventory     │                      │
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

## Dark Store Operations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">10-MINUTE DELIVERY BREAKDOWN</h4>

```
┌─────────────────────────────────────────────────────────────┐
│              10-MINUTE DELIVERY TIMELINE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Order Placed ─────────────────────────────────► Delivered  │
│       │                                               │      │
│       ▼                                               │      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 0:00-0:30 │ Order Processing                            ││
│  │           │ - Payment verification                      ││
│  │           │ - Dark store assignment                     ││
│  │           │ - Picker notification                       ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 0:30-3:00 │ Picking & Packing                          ││
│  │           │ - Picker receives order on device           ││
│  │           │ - Optimized picking route                   ││
│  │           │ - Scan & bag items                          ││
│  │           │ - Quality check                             ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 3:00-4:00 │ Dispatch                                    ││
│  │           │ - Rider assignment                          ││
│  │           │ - Handover to rider                         ││
│  │           │ - Route calculation                         ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 4:00-10:00│ Last-mile Delivery                         ││
│  │           │ - Average 2km radius from dark store        ││
│  │           │ - Real-time tracking                        ││
│  │           │ - Customer notification                     ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Key Enablers:                                               │
│  - Dark stores within 2km of most customers                 │
│  - Pre-positioned inventory (2000-3000 SKUs)               │
│  - Optimized store layout for fast picking                  │
│  - Dedicated rider fleet (not gig economy)                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Dark Stores**: 5-20
- **Orders**: 1,000 - 10,000/day
- **Riders**: 50-200
- **SKUs**: 2,000-3,000 per store
- **Budget**: $10,000 - $50,000/month

### Monolithic Architecture

```python
class OrderService:
    def create_order(self, customer_id, items, address):
        # Find nearest dark store with inventory
        store = self.find_best_store(address, items)
        if not store:
            raise NoServiceableStore()

        with transaction.atomic():
            # Reserve inventory
            for item in items:
                reserved = Inventory.objects.filter(
                    store_id=store.id,
                    sku=item.sku,
                    available__gte=item.quantity
                ).update(
                    available=F('available') - item.quantity,
                    reserved=F('reserved') + item.quantity
                )
                if not reserved:
                    raise OutOfStock(item.sku)

            # Create order
            order = Order.objects.create(
                customer_id=customer_id,
                store_id=store.id,
                status='pending',
                items=items,
                delivery_address=address,
                estimated_delivery=now() + timedelta(minutes=10)
            )

            # Process payment
            payment = PaymentService().charge(customer_id, order.total)
            order.payment_id = payment.id
            order.status = 'confirmed'
            order.save()

            # Notify picker
            self.assign_to_picker(order)

            return order

    def find_best_store(self, address, items):
        """Find nearest store with all items in stock."""
        customer_location = geocode(address)

        nearby_stores = Store.objects.filter(
            location__distance_lte=(customer_location, D(km=3))
        ).order_by('location')

        for store in nearby_stores:
            if self.has_inventory(store.id, items):
                return store

        return None
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Real-time Inventory Management

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
INVENTORY SYNC ARCHITECTURE

┌─────────────────────────────────────────────────────────────┐
│                INVENTORY DATA FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Dark Store Operations:                                      │
│                                                              │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │   Receiving     │    │    Picking      │                 │
│  │ (Add inventory) │    │ (Reduce for     │                 │
│  │                 │    │  orders)        │                 │
│  └────────┬────────┘    └────────┬────────┘                 │
│           │                      │                           │
│           ▼                      ▼                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              INVENTORY EVENT STREAM                      ││
│  │                                                          ││
│  │  Events:                                                 ││
│  │  - stock_received(store, sku, qty)                      ││
│  │  - stock_reserved(store, sku, qty, order_id)            ││
│  │  - stock_picked(store, sku, qty, order_id)              ││
│  │  - stock_returned(store, sku, qty, reason)              ││
│  │  - stock_expired(store, sku, qty)                       ││
│  │                                                          ││
│  └────────────────────────┬────────────────────────────────┘│
│                           │                                  │
│           ┌───────────────┴───────────────┐                 │
│           ▼                               ▼                 │
│  ┌─────────────────┐             ┌─────────────────┐        │
│  │ Inventory DB    │             │  Redis Cache    │        │
│  │ (Source of      │             │  (Real-time     │        │
│  │  truth)         │             │   availability) │        │
│  └─────────────────┘             └─────────────────┘        │
│                                                              │
│  Cache Strategy:                                             │
│  - Read from Redis for app/website                          │
│  - Write-through to both DB and Redis                       │
│  - TTL: None (invalidate on change)                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

### Rider Assignment Algorithm

```python
class RiderAssignmentService:
    """
    Optimal rider assignment considering:
    - Distance to store
    - Current orders (batching)
    - Rider efficiency score
    - Break/shift timing
    """

    def assign_rider(self, order):
        store = order.store
        available_riders = self.get_available_riders(store.id)

        if not available_riders:
            # Wait for rider to become available
            self.queue_for_assignment(order)
            return None

        # Score each rider
        scored_riders = []
        for rider in available_riders:
            score = self.calculate_score(rider, order)
            scored_riders.append((rider, score))

        # Pick best rider
        best_rider, _ = max(scored_riders, key=lambda x: x[1])

        # Assign order
        Assignment.create(
            order_id=order.id,
            rider_id=best_rider.id,
            assigned_at=now()
        )

        # Notify rider
        self.notify_rider(best_rider, order)

        return best_rider

    def calculate_score(self, rider, order):
        # Distance factor (closer is better)
        distance = haversine(rider.location, order.store.location)
        distance_score = max(0, 100 - distance * 20)  # 0-100

        # Efficiency factor
        efficiency_score = rider.efficiency_rating * 20  # 0-100

        # Batching opportunity
        current_orders = self.get_rider_orders(rider.id)
        batch_score = 0
        if current_orders:
            # Check if destinations are close
            for existing in current_orders:
                if haversine(existing.destination, order.destination) < 0.5:
                    batch_score = 20
                    break

        return distance_score + efficiency_score + batch_score
```

</div>
</div>

---

## Phase 3: Zepto Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Dark Stores**: 500+
- **Orders**: 1M+/day
- **Riders**: 50,000+
- **Cities**: 50+
- **Peak load**: 10K orders/minute

### City-Sharded Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    ZEPTO CITY-BASED ARCHITECTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    GLOBAL LAYER                           │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │   User      │  │   Payment   │  │    Analytics    │   │ │
    │  │  │  Service    │  │   Service   │  │    (Spark)      │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                  CITY CLUSTERS                            │ │
    │  │                                                           │ │
    │  │  Each city is an independent operational unit            │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
    │  │  │  MUMBAI     │  │  BANGALORE  │  │   DELHI     │       │ │
    │  │  │             │  │             │  │             │       │ │
    │  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │       │ │
    │  │  │ │ Orders  │ │  │ │ Orders  │ │  │ │ Orders  │ │       │ │
    │  │  │ │ Inven.  │ │  │ │ Inven.  │ │  │ │ Inven.  │ │       │ │
    │  │  │ │ Riders  │ │  │ │ Riders  │ │  │ │ Riders  │ │       │ │
    │  │  │ │ Stores  │ │  │ │ Stores  │ │  │ │ Stores  │ │       │ │
    │  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │       │ │
    │  │  │             │  │             │  │             │       │ │
    │  │  │ 100 stores  │  │  80 stores  │  │ 120 stores  │       │ │
    │  │  │ 5K riders   │  │  4K riders  │  │  6K riders  │       │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
    │  │                                                           │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    DATA LAYER                             │ │
    │  │                                                           │ │
    │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │ │
    │  │  │ Aurora   │  │  Redis   │  │  Kafka   │  │    S3    │ │ │
    │  │  │(Sharded) │  │ Cluster  │  │ Cluster  │  │          │ │ │
    │  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Demand Forecasting

```python
class DemandForecastService:
    """
    Predict demand to pre-position inventory.
    """

    def forecast_demand(self, store_id, sku, days_ahead=7):
        # Get historical data
        history = self.get_sales_history(store_id, sku, days=90)

        # Features
        features = {
            'day_of_week': [],
            'is_weekend': [],
            'is_holiday': [],
            'weather_forecast': [],
            'nearby_events': [],
            'historical_sales': [],
        }

        # ML model prediction
        prediction = self.ml_model.predict(features)

        # Apply safety stock
        safety_stock = prediction * 0.2  # 20% buffer

        return {
            'predicted_demand': prediction,
            'recommended_stock': prediction + safety_stock,
            'confidence': self.calculate_confidence(history)
        }

    def optimize_replenishment(self, store_id):
        """
        Generate replenishment orders for a store.
        """
        all_skus = self.get_store_skus(store_id)
        replenishment = []

        for sku in all_skus:
            current = self.get_current_stock(store_id, sku)
            forecast = self.forecast_demand(store_id, sku, days_ahead=3)

            if current < forecast['recommended_stock']:
                replenishment.append({
                    'sku': sku,
                    'current': current,
                    'needed': forecast['recommended_stock'] - current,
                    'priority': 'high' if current < forecast['predicted_demand'] else 'normal'
                })

        return replenishment
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Orders DB** | Aurora | Vitess | Aurora: Simpler |
| **Inventory Cache** | ElastiCache | Redis Enterprise | ElastiCache: Managed |
| **Rider Tracking** | Location Service | Custom + Redis Geo | Custom: More control |
| **Demand ML** | SageMaker | Vertex AI | SageMaker: Integrated |
| **Events** | Kinesis/MSK | Kafka | MSK: Kafka compatible |
| **Maps** | Location Service | Google Maps | Google: Better in India |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Inventory Consistency

```
Challenge: Prevent overselling with high concurrency

Solution: Optimistic locking with Redis

┌─────────────────────────────────────────────────────────────┐
│  INVENTORY RESERVATION                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MULTI                                                       │
│    WATCH inventory:{store}:{sku}                            │
│    qty = GET inventory:{store}:{sku}                        │
│    if qty >= order_qty:                                     │
│      MULTI                                                   │
│        DECRBY inventory:{store}:{sku} order_qty             │
│        SADD reservations:{order_id} {sku}:{qty}             │
│        EXPIRE reservations:{order_id} 900  # 15 min TTL     │
│      EXEC                                                    │
│                                                              │
│  If EXEC returns nil → concurrent modification, retry       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Order State Machine

```
┌─────────────────────────────────────────────────────────────┐
│              ORDER STATE TRANSITIONS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  placed → confirmed → picking → packed → dispatched →       │
│                       ↓                          ↓          │
│                  out_of_stock              delivered        │
│                       ↓                          ↓          │
│                  cancelled                   completed       │
│                                                              │
│  State stored in:                                            │
│  - PostgreSQL (source of truth)                             │
│  - Redis (for fast reads)                                   │
│  - Kafka (for event streaming)                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff6b35;">

### 1. "How do you guarantee 10-minute delivery?"

**What They're Probing**: Understanding of end-to-end latency budgeting, operational constraints, and realistic system design.

**Strong Answer**:
> "The 10-minute promise is really a carefully orchestrated budget: 30 seconds for order processing and store assignment, 2-3 minutes for picking and packing with optimized store layouts, 1 minute for dispatch and rider handover, and 5-6 minutes for last-mile delivery within a 2km radius. The key enablers are dark store density (one store per 2-3 sq km in dense areas), limited SKU count (2,000-3,000 items enabling faster picking), dedicated rider fleet (not gig workers who might decline orders), and pre-computed delivery zones. We also build in buffer by showing 10 minutes but targeting 8 internally."

**When Simpler Works**: "For a startup doing 50-100 orders/day, you don't need this precision. A simple 30-minute promise with manual dispatch works fine. The 10-minute promise only makes sense when you have the density to support dark stores every 2-3 km."

---

### 2. "Why dark stores over traditional warehouses or retail partnerships?"

**What They're Probing**: Understanding of the unit economics and operational trade-offs in quick commerce.

**Strong Answer**:
> "Dark stores are purpose-built for speed, not browsing. Key advantages: (1) Layout optimized for picking routes - items arranged by order frequency, not customer shopping patterns; (2) No retail overhead - no cashiers, displays, or customer-facing staff; (3) Predictable inventory - we control what's stocked, unlike retail partners with their own priorities; (4) Smaller footprint - 2,000 sq ft vs 20,000+ for supermarkets, enabling more locations. The math: a dark store serving a 2km radius can handle 500-1000 orders/day with 5-8 pickers. Traditional retail partnerships fail because their operations aren't optimized for our picking speeds."

**When Simpler Works**: "For launching in a new city with unknown demand, partnering with existing kiranas or retail stores for the first 3-6 months makes sense. You validate demand before committing to dark store leases. Many quick commerce players started with store partnerships before building their own network."

---

### 3. "How do you handle inventory accuracy in real-time?"

**What They're Probing**: Understanding of distributed systems challenges, eventual consistency, and practical solutions.

**Strong Answer**:
> "Inventory accuracy is our biggest technical challenge. We use a multi-layer approach: (1) Redis as the real-time availability layer with atomic decrements on reservation; (2) PostgreSQL as the source of truth, updated asynchronously; (3) Kafka for event sourcing all inventory movements. The tricky part is handling discrepancies - physical counts don't match system counts due to theft, damage, or scanning errors. We run cycle counts throughout the day, and pickers flag mismatches during picking. When a picker can't find an item, we immediately decrement the system count and trigger a stock audit. We accept 2-3% shrinkage as a cost of doing business."

**When Simpler Works**: "For less than 100 orders/day per store, a simple spreadsheet-based inventory with manual updates after each order works fine. Real-time sync adds complexity that isn't justified until you're doing concurrent orders where race conditions actually matter."

---

### 4. "How do you optimize rider assignment and routing?"

**What They're Probing**: Algorithm design, real-world constraints, and understanding of last-mile logistics.

**Strong Answer**:
> "Rider assignment is a multi-objective optimization problem. We consider: (1) Distance to store - riders closest to the store get priority; (2) Current load - can we batch with existing orders going the same direction?; (3) Rider efficiency scores - historical on-time performance; (4) Shift timing - don't assign to riders about to end shift. For routing, we use Google Maps for directions but maintain our own historical travel time data because Maps doesn't account for building entry times, elevator waits, or parking challenges. We've found that predicted travel time is more important than distance - a 1.5km route through traffic can be slower than a 2.5km route on clear roads."

**When Simpler Works**: "Most quick commerce apps actually use simple FIFO order assignment - first available rider gets the next order. Sophisticated optimization only matters when you have 50+ riders per zone competing for orders. For smaller operations, manual dispatcher assignment with a WhatsApp group works surprisingly well."

---

### 5. "How do you handle demand spikes during festivals or events?"

**What They're Probing**: Capacity planning, graceful degradation, and operational resilience.

**Strong Answer**:
> "Festival handling is 80% preparation, 20% real-time response. Preparation includes: ML-based demand forecasting using historical festival data, pre-positioning extra inventory 2-3 days before, hiring temporary riders, and pre-scaling infrastructure. Real-time response includes: dynamic delivery time promises (showing 15-20 minutes instead of 10 when overwhelmed), surge pricing to dampen demand, temporarily hiding low-margin items to simplify picking, and circuit breakers that stop accepting orders when queue depth exceeds thresholds. The key insight is that it's better to promise 20 minutes and deliver in 15 than promise 10 and deliver in 25."

**When Simpler Works**: "For a small operation, just turn off ordering when you're overwhelmed. A 'temporarily closed' message is better than angry customers waiting 45 minutes. You don't need sophisticated demand forecasting until you're operating at scale where prediction accuracy actually impacts your P&L."

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix: When to Use What

| Requirement | Simple Solution | When to Upgrade | Advanced Solution |
|-------------|-----------------|-----------------|-------------------|
| **Order Management** | PostgreSQL + REST API | > 1,000 orders/day | Event-driven with Kafka |
| **Inventory Sync** | DB triggers + polling | > 100 concurrent orders | Redis + event sourcing |
| **Rider Assignment** | FIFO queue | > 50 riders per zone | ML-based scoring |
| **Demand Forecasting** | Moving averages | > 10 stores | ML with external features |
| **Real-time Tracking** | Polling every 30s | Customer expectation | WebSocket + GPS streaming |
| **Store Selection** | Nearest store | Multiple stores overlap | Inventory-aware routing |

### Technology Selection Rationale

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY DECISION TREE                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Orders/Day < 500?                                                       │
│       │                                                                  │
│       ├── YES → Monolith + PostgreSQL + Simple Queue                    │
│       │         (Total cost: ~$500/month)                               │
│       │                                                                  │
│       └── NO → Orders/Day < 10,000?                                     │
│                    │                                                     │
│                    ├── YES → Add Redis caching + Basic event streaming  │
│                    │         (Total cost: ~$2,000/month)                │
│                    │                                                     │
│                    └── NO → Full microservices + City sharding          │
│                             (Total cost: ~$50,000+/month)               │
│                                                                          │
│  Key Insight: Most startups over-engineer from day one.                 │
│  Zepto ran on a relatively simple stack for their first year.           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Why Specific Technologies?

| Technology | Why Chosen | What It Replaces |
|------------|------------|------------------|
| **Kafka over RabbitMQ** | Need event replay for inventory reconciliation, multi-consumer patterns | Simple job queues |
| **Redis over Memcached** | Geospatial queries for rider location, atomic operations for inventory | Database-only reads |
| **Aurora over plain PostgreSQL** | Auto-scaling reads for catalog, cross-AZ for reliability | Manual replication |
| **City Sharding over Global DB** | Latency requirements, blast radius isolation, compliance | Single global database |

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$500/Month Delivery App"

Before building Zepto-scale infrastructure, consider what actually works for smaller operations:

```
┌─────────────────────────────────────────────────────────────────────────┐
│              MINIMUM VIABLE QUICK COMMERCE STACK                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  For < 100 orders/day per store:                                        │
│                                                                          │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐   │
│  │   Shopify/      │     │   Google        │     │   WhatsApp      │   │
│  │   WooCommerce   │────▶│   Sheets        │────▶│   Business      │   │
│  │   ($29/month)   │     │   (Free)        │     │   (Free)        │   │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘   │
│        │                       │                        │               │
│        │                       │                        │               │
│        ▼                       ▼                        ▼               │
│   Order intake           Inventory            Rider coordination       │
│                          tracking                                       │
│                                                                          │
│  Total monthly cost: $29-100                                            │
│  Handles: 50-200 orders/day                                             │
│  Delivery time: 30-45 minutes (still impressive!)                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### When You DON'T Need ML Demand Forecasting

| Situation | Simple Alternative | Why It's Enough |
|-----------|-------------------|-----------------|
| < 500 SKUs | Manual reorder points | Store manager knows the patterns |
| Stable demand | 2-week moving average | No significant variance to predict |
| Single store | Spreadsheet tracking | One person can monitor everything |
| New market | Conservative stocking + quick reorders | No historical data anyway |

**Reality Check**: Most quick commerce players in India use simple rule-based reordering:
- "Reorder when stock < 3 days of average sales"
- "Order 1.5x last week's sales for next week"
- ML adds maybe 5-10% improvement, but costs 10x in complexity

### When Simple FIFO Order Assignment Works

```python
# This handles 90% of real-world scenarios
class SimpleRiderAssignment:
    def assign_order(self, order):
        # Get riders at the store
        available_riders = Rider.objects.filter(
            current_store=order.store,
            status='available'
        ).order_by('last_delivery_time')  # FIFO

        if available_riders:
            rider = available_riders.first()
            rider.assign(order)
            return rider

        # No rider? Just queue it
        order.status = 'waiting_for_rider'
        order.save()
        return None
```

**When this breaks down**:
- More than 50 concurrent riders per zone (coordination overhead)
- Delivery radius > 3km (route optimization matters)
- Order batching required (multi-drop deliveries)

### The "Just Use Firebase" Starter Pack

For MVPs and early validation:

| Component | Firebase Solution | Limitations |
|-----------|------------------|-------------|
| Orders | Firestore | 1 write/sec per document |
| Real-time updates | Firebase Realtime DB | Sufficient for < 1000 users |
| Auth | Firebase Auth | Free tier covers most startups |
| Notifications | FCM | Free and reliable |
| Hosting | Firebase Hosting | Static frontend only |

**Total cost**: $0-50/month for first 10,000 users

**Migration trigger**: When you hit Firestore write limits or need complex queries

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Critical Trade-offs in Quick Commerce

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TRADE-OFF DECISION MATRIX                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. INVENTORY ACCURACY vs. ORDER SPEED                                  │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  Option A: Real-time sync (Redis + DB)                                  │
│  ├── Pro: Never oversell                                                │
│  ├── Con: Added latency (~50ms per item check)                         │
│  └── Mitigation: Optimistic UI, async verification                     │
│                                                                          │
│  Option B: Eventual consistency with compensation                       │
│  ├── Pro: Faster checkout                                               │
│  ├── Con: ~2-3% orders need substitution                               │
│  └── Mitigation: Good substitution UX, proactive customer comms        │
│                                                                          │
│  Recommendation: Option B for most cases. Customers prefer              │
│  fast checkout with occasional substitution over slow checkout.         │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  2. DEDICATED RIDERS vs. GIG FLEET                                      │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  Dedicated Fleet:                                                        │
│  ├── Pro: Reliable availability, trained staff, brand control          │
│  ├── Con: Fixed cost even during low demand                            │
│  └── Unit economics: Works at > 8 orders/rider/hour                    │
│                                                                          │
│  Gig Fleet (Dunzo/Porter model):                                        │
│  ├── Pro: Variable cost, scales with demand                            │
│  ├── Con: Lower reliability, order rejection                           │
│  └── Unit economics: Works for < 5 orders/rider/hour                   │
│                                                                          │
│  Hybrid Approach:                                                        │
│  └── 70% dedicated for base load, 30% gig for peaks                    │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  3. DELIVERY PROMISE vs. OPERATIONAL REALITY                            │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  Aggressive Promise (10 min):                                           │
│  ├── Pro: Market differentiation, customer delight when met            │
│  ├── Con: Customer anger when missed, rider pressure                   │
│  └── Mitigation: Under-promise (show 12), over-deliver (target 9)      │
│                                                                          │
│  Conservative Promise (20-30 min):                                      │
│  ├── Pro: Always meet expectations, less operational stress            │
│  ├── Con: Less competitive, lower perceived value                      │
│  └── Best for: New markets, limited rider availability                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Mitigation Strategies Table

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Dark store lease locked in, demand doesn't materialize** | High ($50K+/year) | Medium | Start with retail partnerships, convert to dark stores after demand validation |
| **Inventory shrinkage exceeds 3%** | Medium | High | Cycle counts, CCTV, picker accountability scoring |
| **Rider attrition during peak demand** | High | Medium | Retention bonuses, guaranteed minimum earnings |
| **Single store outage** | Medium | Low | Auto-failover to nearby store, customer notification |
| **Payment gateway downtime** | High | Low | Multiple gateway fallback, COD as backup |

### Cost-Benefit Analysis

```
┌─────────────────────────────────────────────────────────────────────────┐
│           FEATURE COST-BENEFIT FOR QUICK COMMERCE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Feature              │ Dev Cost │ Ops Cost │ Revenue Impact │ Priority │
│  ─────────────────────┼──────────┼──────────┼────────────────┼──────────│
│  Real-time tracking   │ Medium   │ Low      │ +15% retention │ P0       │
│  ML demand forecast   │ High     │ High     │ +5% margin     │ P2       │
│  Order batching       │ Medium   │ Low      │ +10% rider eff │ P1       │
│  Dynamic pricing      │ Medium   │ Medium   │ +8% revenue    │ P1       │
│  Voice ordering       │ High     │ Medium   │ +2% orders     │ P3       │
│  Subscription model   │ Low      │ Low      │ +20% retention │ P0       │
│                                                                          │
│  Rule of thumb: Build P0 first, validate P1 with A/B tests,            │
│  defer P2/P3 until you have the engineering bandwidth.                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **10-minute promise**: How to reliably achieve it through operational excellence, not just technology
2. **Inventory accuracy**: Real-time sync challenges and acceptable trade-offs
3. **Dark store placement**: Optimization for coverage vs. unit economics
4. **Rider efficiency**: Batching, routing, and the dedicated vs. gig trade-off
5. **Demand prediction**: When ML helps vs. when simple rules suffice

### Red Flags (What NOT to Say)

<div style="background: #3d1f1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #ff4444;">

| Red Flag Statement | Why It's Bad | Better Alternative |
|--------------------|--------------|-------------------|
| "We'll use microservices from day one" | Over-engineering for unproven demand | "Start monolithic, extract services as bottlenecks emerge" |
| "ML will optimize everything" | ML is expensive and needs data you don't have | "Rule-based systems first, ML when we have 6 months of data" |
| "We'll build our own maps/routing" | Massive undertaking, Google/MapmyIndia exist | "Use Google Maps API, build custom layer for building-level data" |
| "Real-time sync for all inventory" | Overkill for most scenarios | "Eventual consistency with compensation for edge cases" |
| "We need blockchain for supply chain" | Buzzword with no practical benefit here | "Simple event sourcing gives us the audit trail we need" |
| "100% availability guarantee" | Unrealistic and expensive | "99.9% with graceful degradation for the 0.1%" |

</div>

### Impressive Statements (What TO Say)

<div style="background: #1f3d1f; border-radius: 8px; padding: 16px; margin: 16px 0; border-left: 4px solid #44ff44;">

| Impressive Statement | Why It Works |
|---------------------|--------------|
| "The 10-minute promise is a latency budget distributed across 5 operations" | Shows systems thinking |
| "Dark stores work because of negative selection - we deliberately limit SKUs" | Shows understanding of constraints as features |
| "Inventory accuracy of 97% is acceptable if we have good substitution UX" | Shows practical trade-off thinking |
| "We'd start with retail partnerships to validate demand before dark store investment" | Shows business awareness |
| "FIFO assignment handles 90% of cases; optimization only matters at scale" | Shows you won't over-engineer |
| "City sharding is about blast radius, not just scale" | Shows distributed systems depth |
| "The hard problem isn't the algorithm, it's the last 50 meters - building entry, parking" | Shows real-world awareness |

</div>

### Common Follow-up Questions

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 8px; padding: 16px; margin: 16px 0;">

**Operational Questions**:
- How do you handle out-of-stock discovered during picking? → Substitution flow + proactive customer notification
- How do you optimize dark store layout? → Heat mapping of pick frequency, zone-based arrangement
- How do you handle peak hours (festivals)? → Demand forecasting + dynamic promises + surge pricing

**Technical Deep Dives**:
- How do you prevent inventory overselling? → Redis atomic operations + compensation for edge cases
- How do you handle rider GPS accuracy issues? → Kalman filtering + confidence scoring
- What's your caching strategy? → Redis for hot data, CDN for catalog images, no cache for inventory counts

**Business Questions**:
- What's the unit economics breakdown? → Delivery fee + platform fee - rider cost - dark store cost
- How do you decide where to open a new dark store? → Population density + competitor presence + rental costs
- Why not partner with BigBasket/Grofers? → Speed differentiation, control over experience

</div>

### The "Show Your Thinking" Framework

When asked an open-ended question, structure your response:

```
1. CLARIFY: "Let me confirm - we're designing for [X orders/day] in [Y cities]?"

2. CONSTRAINTS: "The key constraints are:
   - 10-minute delivery promise
   - 2-3km delivery radius per store
   - 2000-3000 SKUs per store"

3. APPROACH: "I'd break this into three phases:
   - Phase 1: Validate with 1-2 stores, simple stack
   - Phase 2: Expand to 20 stores, add real-time systems
   - Phase 3: City sharding, ML optimization"

4. TRADE-OFFS: "The key trade-off is [X] vs [Y].
   I'd choose [X] because [reason], accepting [downside]"

5. WHAT I'D SKIP: "For this scale, I'd skip [feature] because
   [simpler alternative] works until [trigger condition]"
```

</div>
