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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **10-minute promise**: How to reliably achieve it
2. **Inventory accuracy**: Real-time sync challenges
3. **Dark store placement**: Optimization for coverage
4. **Rider efficiency**: Batching, routing
5. **Demand prediction**: ML for stock optimization

### Common Follow-ups

- How do you handle out-of-stock during picking?
- How do you optimize dark store layout?
- How do you handle peak hours (festivals)?

</div>
