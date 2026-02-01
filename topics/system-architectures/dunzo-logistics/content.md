# Design Dunzo Logistics

## Table of Contents {#toc}

<div class="diagram-container" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);">
<div style="width: 100%; max-width: 800px;">

### Overview
- [Problem Statement](#problem-statement)
- [High-Level Architecture](#high-level-architecture)
- [Order Flow](#order-flow)

### Scaling Phases
- [Phase 1: Starting Phase](#phase-1-starting-phase)
- [Phase 2: Medium Scale](#phase-2-medium-scale)
- [Phase 3: Dunzo Scale](#phase-3-dunzo-scale)

### Technical Deep Dives
- [AWS Technologies & Alternatives](#aws-technologies-alternatives)
- [Distributed Systems Considerations](#distributed-systems)
- [Scaling Strategies](#scaling-strategies)
- [Edge Cases & Failure Modes](#edge-cases-failure-modes)

### Interview Preparation
- [Interview Deep Dive Questions](#interview-deep-dive)
- [Why This Technology?](#why-this-technology)
- [When Simpler Solutions Work](#simpler-solutions)
- [Trade-off Analysis & Mitigation](#trade-off-analysis)
- [Interview Tips](#interview-tips)
- [Red Flags vs Impressive Statements](#red-flags-impressive)
- [Quick Reference Card](#quick-reference)

</div>
</div>

---

## Problem Statement {#problem-statement}

Design a hyperlocal delivery platform that enables pick-up and drop services, grocery delivery, and package delivery within a city.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #00c853;">

### Core Requirements {#core-requirements}
- **Multi-category Delivery**: Groceries, food, packages, documents
- **Real-time Tracking**: Live location of delivery partners
- **Route Optimization**: Efficient multi-stop routing
- **Partner Management**: Onboarding, earnings, performance
- **Dynamic Pricing**: Distance, time, demand-based
- **Merchant Integration**: Store inventory, order management

</div>

---

## High-Level Architecture {#high-level-architecture}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0; width: 100%;">HYPERLOCAL DELIVERY ARCHITECTURE</h4>

<!-- Customer Layer -->
<div class="flow-box success">
<div class="flow-box-title">CUSTOMERS</div>
<div class="flow-box-subtitle">Mobile App</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Three Apps Row -->
<div class="flow-row">
<div class="flow-box info">
<div class="flow-box-title">Customer App</div>
</div>
<div class="flow-box orange">
<div class="flow-box-title">Partner App</div>
</div>
<div class="flow-box purple">
<div class="flow-box-title">Merchant App</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- API Gateway -->
<div class="flow-box neutral">
<div class="flow-box-title">API GATEWAY</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Core Services Row -->
<div class="flow-row">

<div class="flow-box primary">
<div class="flow-box-title">ORDER SERVICE</div>
<div class="flow-box-subtitle">Create orders | Calculate pricing | Manage status</div>
</div>

<div class="flow-box warning">
<div class="flow-box-title">DISPATCH SERVICE</div>
<div class="flow-box-subtitle">Partner matching | Assignment | Order batching</div>
</div>

<div class="flow-box success">
<div class="flow-box-title">TRACKING SERVICE</div>
<div class="flow-box-subtitle">Live location | ETA calculation | Trip history</div>
</div>

</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Routing Service -->
<div class="flow-box purple">
<div class="flow-box-title">ROUTING SERVICE</div>
<div class="flow-box-subtitle">Route Optimization | Multi-stop | Traffic Analysis</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Kafka -->
<div class="flow-box warning" style="background: linear-gradient(135deg, #1f1f1f 0%, #2f2f2f 100%); color: #fbbf24; border-color: #fbbf24;">
<div class="flow-box-title">KAFKA</div>
<div class="flow-box-subtitle" style="color: #fef3c7;">Event Streaming</div>
</div>

</div>
</div>

---

## Order Flow {#order-flow}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0; width: 100%;">ORDER LIFECYCLE</h4>

<!-- Step 1: Order Creation -->
<div class="data-card data-card-accent info" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">1. ORDER CREATION</span>
<span class="diagram-badge info">INITIATE</span>
</div>
<div class="data-card-description">
- Validate addresses (pickup + drops)<br/>
- Calculate distance and route<br/>
- Apply dynamic pricing (surge multiplier)<br/>
- Reserve payment authorization
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Step 2: Partner Matching -->
<div class="data-card data-card-accent warning" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">2. PARTNER MATCHING</span>
<span class="diagram-badge warning">DISPATCH</span>
</div>
<div class="data-card-description">
Find best partner based on:<br/>
- Distance to pickup location<br/>
- Current load (active orders)<br/>
- Partner rating/performance score<br/>
- Vehicle type requirements<br/><br/>
<strong style="color: #f59e0b;">Matching radius: 3km -> 5km -> 7km (expanding circles)</strong>
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Step 3: Pickup Phase -->
<div class="data-card data-card-accent purple" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">3. PICKUP PHASE</span>
<span class="diagram-badge purple">COLLECT</span>
</div>
<div class="data-card-description">
- Partner accepts/rejects offer (30s timeout)<br/>
- Navigate to pickup location<br/>
- Confirm pickup with OTP/photo verification
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Step 4: Delivery Phase -->
<div class="data-card data-card-accent success" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">4. DELIVERY PHASE</span>
<span class="diagram-badge success">TRANSIT</span>
</div>
<div class="data-card-description">
- Optimized route to drop location(s)<br/>
- Real-time tracking shared with customer<br/>
- Confirm delivery with OTP/photo
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Step 5: Completion -->
<div class="data-card data-card-accent orange" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">5. COMPLETION</span>
<span class="diagram-badge orange">DONE</span>
</div>
<div class="data-card-description">
- Process final payment<br/>
- Update partner earnings<br/>
- Request ratings from both parties
</div>
</div>
</div>

</div>
</div>

---

## Phase 1: Starting Phase {#phase-1-starting-phase}

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions {#phase1-assumptions}
- **Cities**: 1-3
- **Partners**: 100-1,000
- **Orders**: 1,000-10,000/day
- **Budget**: $5,000 - $25,000/month

### Monolithic Architecture {#phase1-architecture}

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

## Phase 2: Medium Scale {#phase-2-medium-scale}

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Route Optimization {#route-optimization}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0; width: 100%;">MULTI-STOP ROUTE OPTIMIZATION</h4>

<div style="width: 100%; max-width: 600px; margin-bottom: 20px;">
<p style="text-align: center; color: #64748b; font-weight: 600;">Problem: Partner has multiple orders to deliver</p>
</div>

<div class="flow-row" style="width: 100%;">

<div class="data-card data-card-accent error" style="flex: 1; min-width: 250px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">NAIVE ROUTE</span>
<span class="diagram-badge error">INEFFICIENT</span>
</div>
<div class="data-card-description">
Order A: Pickup P1 -> Drop D1<br/>
Order B: Pickup P2 -> Drop D2<br/>
Order C: Pickup P3 -> Drop D3<br/><br/>
Route: P1 -> D1 -> P2 -> D2 -> P3 -> D3<br/>
<strong style="color: #ef4444;">Total: 15 km</strong>
</div>
</div>
</div>

<div class="data-card data-card-accent success" style="flex: 1; min-width: 250px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">OPTIMIZED ROUTE (TSP-like)</span>
<span class="diagram-badge success">EFFICIENT</span>
</div>
<div class="data-card-description">
Batch pickups, then optimize drops<br/><br/>
Route: P1 -> P2 -> P3 -> D2 -> D1 -> D3<br/><br/>
<strong style="color: #10b981;">Total: 10 km (33% savings)</strong>
</div>
</div>
</div>

</div>

<div class="data-card data-card-accent warning" style="width: 100%; max-width: 600px; margin-top: 20px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">CONSTRAINTS</span>
</div>
<div class="data-card-description">
- Pickup must happen before drop for same order (precedence)<br/>
- Consider time windows (food freshness, customer availability)<br/>
- Capacity limits (weight, size, vehicle type)
</div>
</div>
</div>

<div class="data-card data-card-accent info" style="width: 100%; max-width: 600px; margin-top: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">ALGORITHM</span>
</div>
<div class="data-card-description">
Modified TSP with precedence constraints<br/>
- Use Google OR-Tools / OSRM for routing<br/>
- Heuristic: Nearest neighbor with 2-opt improvement
</div>
</div>
</div>

</div>
</div>

### Order Batching {#order-batching}

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

### Partner Location Tracking {#location-tracking}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0; width: 100%;">LOCATION TRACKING PIPELINE</h4>

<!-- Partner App -->
<div class="flow-box orange">
<div class="flow-box-title">Partner App</div>
<div class="flow-box-subtitle">GPS update every 5 seconds (when active)</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Location Service -->
<div class="flow-box primary">
<div class="flow-box-title">Location Service (WebSocket)</div>
<div class="flow-box-subtitle">Batch updates every 3 seconds</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- Redis -->
<div class="flow-box error">
<div class="flow-box-title">REDIS</div>
<div class="flow-box-subtitle" style="font-family: monospace; font-size: 10px;">
GEOADD partners:active lng lat partner_id<br/>
HSET partner:{id}:location lat lng timestamp speed<br/>
<strong style="color: #fbbf24;">TTL: 60 seconds (offline if no update)</strong>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>
<p style="color: #64748b; font-size: 12px; margin: 0;">Publish location changes</p>

<!-- Kafka -->
<div class="flow-box warning" style="background: linear-gradient(135deg, #1f1f1f 0%, #2f2f2f 100%); color: #fbbf24; border-color: #fbbf24;">
<div class="flow-box-title">KAFKA</div>
<div class="flow-box-subtitle" style="color: #fef3c7;">
Topic: partner.locations<br/><br/>
<strong>Consumers:</strong> ETA Calculator | Customer Tracker | Analytics
</div>
</div>

</div>
</div>

</div>
</div>

---

## Phase 3: Dunzo Scale {#phase-3-dunzo-scale}

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Assumptions {#phase3-assumptions}
- **Cities**: 25+
- **Partners**: 50,000+
- **Orders**: 1M+/day
- **Merchants**: 100,000+

### City-Based Microservices {#city-microservices}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #a855f7; text-align: center; margin: 0 0 24px 0; width: 100%;">DUNZO MULTI-CITY ARCHITECTURE</h4>

<!-- Global Layer -->
<div class="data-card" style="width: 100%; max-width: 700px; border: 2px solid #3b82f6;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title" style="color: #3b82f6;">GLOBAL LAYER</span>
</div>
<div class="flow-row" style="margin-top: 12px;">
<span class="diagram-badge info">User Service</span>
<span class="diagram-badge success">Payment Service</span>
<span class="diagram-badge orange">Marketing Service</span>
<span class="diagram-badge pink">Merchant Platform</span>
<span class="diagram-badge warning">Partner Platform</span>
<span class="diagram-badge purple">Analytics Platform</span>
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<!-- City Clusters -->
<div class="data-card" style="width: 100%; max-width: 700px; border: 2px solid #a855f7;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title" style="color: #a855f7;">CITY CLUSTERS</span>
</div>
<div class="flow-row" style="margin-top: 12px;">

<div class="flow-box success" style="min-width: 150px;">
<div class="flow-box-title">BANGALORE</div>
<div class="flow-box-subtitle">Order | Dispatch | Track</div>
<div style="margin-top: 8px;"><span class="diagram-badge success">15K partners</span></div>
</div>

<div class="flow-box orange" style="min-width: 150px;">
<div class="flow-box-title">MUMBAI</div>
<div class="flow-box-subtitle">Order | Dispatch | Track</div>
<div style="margin-top: 8px;"><span class="diagram-badge orange">12K partners</span></div>
</div>

<div class="flow-box info" style="min-width: 150px;">
<div class="flow-box-title">DELHI</div>
<div class="flow-box-subtitle">Order | Dispatch | Track</div>
<div style="margin-top: 8px;"><span class="diagram-badge info">10K partners</span></div>
</div>

</div>
</div>
</div>

</div>
</div>

### ML-Based ETA Prediction {#ml-eta-prediction}

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

## AWS Technologies & Alternatives {#aws-technologies-alternatives}

<div class="diagram-container">

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

## Distributed Systems Considerations {#distributed-systems}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### 1. Order Assignment Consistency {#assignment-consistency}

<div class="data-card data-card-accent warning" style="margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title" style="color: #f97316;">Challenge</span>
</div>
<div class="data-card-description">Multiple dispatchers trying to assign same partner</div>
</div>
</div>

<div class="data-card data-card-accent success" style="margin-bottom: 24px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title" style="color: #10b981;">Solution</span>
</div>
<div class="data-card-description">Distributed lock on partner</div>
</div>
</div>

<div class="flow-diagram" style="padding: 0;">

<h5 style="text-align: center; color: #64748b; margin-bottom: 16px;">PARTNER ASSIGNMENT FLOW</h5>

<div class="data-card data-card-accent info" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">STEP 1: Acquire Lock</div>
<div class="data-card-description" style="font-family: monospace;">SETNX partner_lock:{id} order_id EX 30</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<div class="data-card data-card-accent warning" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">STEP 2: If Lock Acquired</div>
<div class="data-card-description">
- Check partner still available<br/>
- Send offer to partner app<br/>
- Wait for response (30s timeout)
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<div class="data-card data-card-accent success" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">STEP 3: If Partner Accepts</div>
<div class="data-card-description">
- Create assignment<br/>
- Update partner status<br/>
- Release lock
</div>
</div>
</div>

<div class="flow-arrow vertical">&#x2193;</div>

<div class="data-card data-card-accent error" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">STEP 4: If Partner Rejects/Timeout</div>
<div class="data-card-description">
- Release lock<br/>
- Try next partner in scored list
</div>
</div>
</div>

</div>

### 2. Location Update at Scale {#location-scale}

<div class="data-card data-card-accent warning" style="margin: 24px 0;">
<div class="data-card-content">
<div class="data-card-title" style="color: #f97316;">50K partners x 1 update/5s = 10K updates/second</div>
</div>
</div>

<div class="flow-row" style="gap: 12px;">

<div class="flow-box info" style="flex: 1;">
<div class="flow-box-title">Ingestion</div>
<div class="flow-box-subtitle">Redis Streams for high-throughput writes</div>
</div>

<div class="flow-box success" style="flex: 1;">
<div class="flow-box-title">Persistence</div>
<div class="flow-box-subtitle">Batch writes to PostgreSQL every minute</div>
</div>

<div class="flow-box orange" style="flex: 1;">
<div class="flow-box-title">Real-time</div>
<div class="flow-box-subtitle">Served from Redis only (hot data)</div>
</div>

<div class="flow-box purple" style="flex: 1;">
<div class="flow-box-title">Historical</div>
<div class="flow-box-subtitle">TimescaleDB for time-series analytics</div>
</div>

</div>

</div>
</div>

---

## Scaling Strategies {#scaling-strategies}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### Horizontal Scaling Approach {#horizontal-scaling}

<div class="flow-diagram" style="padding: 0; margin-bottom: 24px;">

<div class="flow-row">
<div class="flow-box primary" style="flex: 1;">
<div class="flow-box-title">Geographic Sharding</div>
<div class="flow-box-subtitle">Partition by city/region</div>
</div>
<div class="flow-box success" style="flex: 1;">
<div class="flow-box-title">Read Replicas</div>
<div class="flow-box-subtitle">Scale read-heavy operations</div>
</div>
<div class="flow-box warning" style="flex: 1;">
<div class="flow-box-title">Caching Layers</div>
<div class="flow-box-subtitle">Redis for hot data</div>
</div>
</div>

</div>

### Database Scaling Strategy {#db-scaling}

| Scale Level | Orders/Day | Strategy | Database Setup |
|-------------|------------|----------|----------------|
| **Startup** | < 10K | Single instance | PostgreSQL primary |
| **Growth** | 10K-100K | Read replicas | 1 primary + 2 replicas |
| **Scale** | 100K-500K | Functional sharding | Separate DBs per domain |
| **Enterprise** | 500K+ | Geographic sharding | DB cluster per city |

### Caching Strategy {#caching-strategy}

<div class="data-card data-card-accent info" style="margin: 16px 0;">
<div class="data-card-content">
<div class="data-card-title">Multi-Layer Cache Architecture</div>
<div class="data-card-description">

**L1 - Application Cache (in-memory)**
- Partner availability status
- Recent order lookups
- TTL: 5-10 seconds

**L2 - Redis Cache (distributed)**
- Partner locations (GEOADD)
- Active order details
- Session data
- TTL: 30-60 seconds

**L3 - CDN Cache (edge)**
- Static merchant data
- Menu/catalog information
- TTL: 5-15 minutes

</div>
</div>
</div>

### Event-Driven Architecture {#event-driven}

```python
class EventDrivenDispatch:
    """
    Kafka-based event-driven dispatch system for scale.
    """

    TOPICS = {
        'order_created': 'orders.created',
        'partner_available': 'partners.availability',
        'location_updated': 'partners.locations',
        'assignment_completed': 'dispatch.assignments'
    }

    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=['kafka-1:9092', 'kafka-2:9092'],
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            acks='all',  # Wait for all replicas
            retries=3
        )

    def publish_order_created(self, order):
        """Publish order for async processing."""
        event = {
            'event_type': 'ORDER_CREATED',
            'order_id': order.id,
            'pickup': order.pickup.to_dict(),
            'drops': [d.to_dict() for d in order.drops],
            'category': order.category,
            'created_at': order.created_at.isoformat(),
            'city_id': order.city_id  # For partitioning
        }

        # Partition by city for locality
        self.producer.send(
            self.TOPICS['order_created'],
            key=order.city_id.encode(),
            value=event
        )

    def consume_and_dispatch(self, city_id):
        """City-specific consumer for order dispatch."""
        consumer = KafkaConsumer(
            self.TOPICS['order_created'],
            bootstrap_servers=['kafka-1:9092'],
            group_id=f'dispatch-{city_id}',
            auto_offset_reset='earliest'
        )

        for message in consumer:
            order_event = json.loads(message.value)
            if order_event['city_id'] == city_id:
                self.process_dispatch(order_event)
```

### Auto-Scaling Configuration {#auto-scaling}

<div class="flow-row" style="gap: 12px; margin: 16px 0;">

<div class="data-card data-card-accent info" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">API Gateway</div>
<div class="data-card-description">
Scale on: Request rate<br/>
Min: 2, Max: 20<br/>
Target: 1000 RPS/instance
</div>
</div>
</div>

<div class="data-card data-card-accent success" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Dispatch Workers</div>
<div class="data-card-description">
Scale on: Queue depth<br/>
Min: 3, Max: 50<br/>
Target: < 100 pending orders
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Location Service</div>
<div class="data-card-description">
Scale on: WebSocket connections<br/>
Min: 2, Max: 30<br/>
Target: 5K connections/instance
</div>
</div>
</div>

</div>

### Load Shedding Strategy {#load-shedding}

```python
class LoadShedder:
    """
    Graceful degradation during high load.
    """

    def __init__(self, redis_client):
        self.redis = redis_client
        self.thresholds = {
            'normal': 0.7,      # 70% capacity
            'elevated': 0.85,   # 85% capacity
            'critical': 0.95    # 95% capacity
        }

    def get_system_load(self):
        """Calculate current system load."""
        metrics = {
            'cpu': self.get_avg_cpu_usage(),
            'memory': self.get_avg_memory_usage(),
            'queue_depth': self.get_dispatch_queue_depth(),
            'latency_p99': self.get_api_latency_p99()
        }

        # Weighted average
        return (
            metrics['cpu'] * 0.3 +
            metrics['memory'] * 0.2 +
            min(metrics['queue_depth'] / 1000, 1) * 0.3 +
            min(metrics['latency_p99'] / 500, 1) * 0.2
        )

    def should_shed_load(self, request_type):
        """Determine if request should be shed."""
        load = self.get_system_load()

        if load < self.thresholds['normal']:
            return False  # Accept all requests

        if load >= self.thresholds['critical']:
            # Only accept critical requests
            return request_type not in ['payment', 'emergency']

        if load >= self.thresholds['elevated']:
            # Shed non-essential requests
            return request_type in ['analytics', 'recommendations', 'promotions']

        return False

    def apply_degraded_mode(self, order):
        """Apply degraded processing during high load."""
        return {
            'skip_ml_scoring': True,      # Use simple distance matching
            'reduce_batch_wait': True,    # Don't wait for batching
            'simplified_eta': True,       # Use historical avg, not ML
            'skip_promotions': True       # Don't calculate discounts
        }
```

</div>
</div>

---

## Edge Cases & Failure Modes {#edge-cases-failure-modes}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### Critical Failure Scenarios {#critical-failures}

<div class="flow-diagram" style="padding: 0;">

<div class="data-card data-card-accent error" style="width: 100%; margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: Partner Cancels Mid-Delivery</span>
<span class="diagram-badge error">CRITICAL</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Customer has been charged, package in transit<br/>
<strong>Detection:</strong> GPS anomaly, explicit cancellation, connectivity loss > 3 min<br/>
<strong>Recovery:</strong> Rescue protocol - find nearby partner within 1-2km radius<br/>
<strong>SLA:</strong> Reassignment within 4 minutes, 94% rescue success rate
</div>
</div>
</div>

<div class="data-card data-card-accent error" style="width: 100%; margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: Redis Location Cache Down</span>
<span class="diagram-badge error">HIGH</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Cannot find nearby partners for assignment<br/>
<strong>Detection:</strong> Health check failure, connection timeouts<br/>
<strong>Recovery:</strong> Fallback to PostgreSQL with last known locations (stale but functional)<br/>
<strong>RTO:</strong> 30 seconds with automatic failover
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="width: 100%; margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: Partner App Loses Connectivity</span>
<span class="diagram-badge warning">MEDIUM</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Stale location data, missed assignment offers<br/>
<strong>Detection:</strong> No GPS update for 60+ seconds<br/>
<strong>Recovery:</strong> Mark partner as "unreachable", queue SMS notification, offline order queue<br/>
<strong>RTO:</strong> Partner reconnects or manual reassignment after 2 minutes
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="width: 100%; margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: Kafka Consumer Lag</span>
<span class="diagram-badge warning">MEDIUM</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Delayed order processing, customer waiting<br/>
<strong>Detection:</strong> Consumer lag > 1000 messages, processing time > 30s<br/>
<strong>Recovery:</strong> Auto-scaling consumers, priority queue bypass for urgent orders<br/>
<strong>RTO:</strong> < 2 minutes with proper alerting
</div>
</div>
</div>

<div class="data-card data-card-accent info" style="width: 100%; margin-bottom: 16px;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: ML ETA Model Returns Outliers</span>
<span class="diagram-badge info">LOW</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Unrealistic customer expectations (ETA: 2 min for 10km)<br/>
<strong>Detection:</strong> ETA outside 2 standard deviations from historical average<br/>
<strong>Recovery:</strong> Rule-based bounds checking, fallback to distance-based calculation<br/>
<strong>RTO:</strong> Immediate with outlier detection
</div>
</div>
</div>

<div class="data-card data-card-accent info" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">FAILURE: Payment Gateway Timeout</span>
<span class="diagram-badge info">LOW</span>
</div>
<div class="data-card-description">
<strong>Impact:</strong> Order stuck in pending state<br/>
<strong>Detection:</strong> Payment API response > 5 seconds<br/>
<strong>Recovery:</strong> Async payment processing, proceed with delivery on credit for trusted customers<br/>
<strong>RTO:</strong> Retry queue with 3x attempts over 5 minutes
</div>
</div>
</div>

</div>

### Edge Case Handling {#edge-case-handling}

<div style="margin-top: 24px;">

#### 1. No Partners Available {#no-partners}

```python
class NoPartnerHandler:
    """Handle scenarios when no partners are available."""

    def handle_no_partner(self, order):
        strategies = [
            self.expand_search_radius,      # 3km -> 5km -> 7km -> 10km
            self.offer_incentive_bonus,     # Extra Rs 50 for accepting
            self.wait_and_retry,            # Wait 2 min, retry
            self.suggest_scheduled_delivery, # Offer later time slot
            self.refund_and_apologize       # Last resort
        ]

        for strategy in strategies:
            result = strategy(order)
            if result.success:
                return result

        return self.escalate_to_operations(order)

    def expand_search_radius(self, order, max_radius=10):
        for radius in [3, 5, 7, 10]:
            partners = self.find_partners(order.pickup, radius)
            if partners:
                return StrategyResult(
                    success=True,
                    partners=partners,
                    extra_eta=self.calculate_extra_eta(radius)
                )
        return StrategyResult(success=False)
```

#### 2. Duplicate Order Detection {#duplicate-orders}

```python
class DuplicateOrderDetector:
    """Prevent accidental duplicate orders."""

    def is_duplicate(self, customer_id, order_details):
        # Check for recent similar orders
        recent_orders = Order.query.filter(
            Order.customer_id == customer_id,
            Order.created_at > now() - timedelta(minutes=5),
            Order.status.in_(['PENDING', 'ASSIGNED', 'IN_TRANSIT'])
        ).all()

        for existing in recent_orders:
            similarity = self.calculate_similarity(existing, order_details)
            if similarity > 0.9:  # 90% similar
                return True, existing

        return False, None

    def calculate_similarity(self, existing, new):
        pickup_match = haversine(existing.pickup, new['pickup']) < 0.1  # 100m
        drop_match = haversine(existing.drops[0], new['drops'][0]) < 0.1
        category_match = existing.category == new['category']

        return (pickup_match + drop_match + category_match) / 3
```

#### 3. GPS Spoofing Detection {#gps-spoofing}

```python
class GPSSpoofingDetector:
    """Detect fraudulent GPS manipulation."""

    def validate_location_update(self, partner_id, new_location):
        history = self.get_recent_locations(partner_id, minutes=5)

        if not history:
            return True  # First update

        last_location = history[-1]

        # Check 1: Impossible speed
        time_diff = (new_location.timestamp - last_location.timestamp).seconds
        distance = haversine(last_location, new_location)
        speed_kmh = (distance / time_diff) * 3600 if time_diff > 0 else 0

        if speed_kmh > 120:  # > 120 km/h on two-wheeler
            self.flag_suspicious(partner_id, 'IMPOSSIBLE_SPEED', speed_kmh)
            return False

        # Check 2: Location jump (teleportation)
        if distance > 5 and time_diff < 60:  # 5km in < 1 min
            self.flag_suspicious(partner_id, 'LOCATION_JUMP', distance)
            return False

        # Check 3: Stationary but claiming movement
        if self.is_pattern_suspicious(history + [new_location]):
            self.flag_suspicious(partner_id, 'PATTERN_ANOMALY')
            return False

        return True
```

#### 4. Order Value Mismatch {#value-mismatch}

```python
class OrderValueValidator:
    """Handle discrepancies in order value."""

    def validate_merchant_order(self, order, merchant_confirmation):
        discrepancy = abs(order.estimated_value - merchant_confirmation.actual_value)
        discrepancy_pct = discrepancy / order.estimated_value

        if discrepancy_pct <= 0.1:  # < 10% difference
            return self.proceed_with_adjustment(order, merchant_confirmation)

        if discrepancy_pct <= 0.25:  # 10-25% difference
            return self.request_customer_confirmation(order, merchant_confirmation)

        # > 25% difference - likely wrong order
        return self.escalate_to_support(order, merchant_confirmation)
```

</div>

### Disaster Recovery {#disaster-recovery}

<div class="flow-row" style="gap: 12px; margin-top: 24px;">

<div class="data-card data-card-accent error" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Complete City Outage</div>
<div class="data-card-description">
<strong>RTO:</strong> 15 minutes<br/>
<strong>RPO:</strong> 30 seconds<br/>
<strong>Action:</strong> Failover to backup region, notify all active partners/customers
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Database Corruption</div>
<div class="data-card-description">
<strong>RTO:</strong> 30 minutes<br/>
<strong>RPO:</strong> 5 minutes<br/>
<strong>Action:</strong> Point-in-time recovery, replay Kafka events
</div>
</div>
</div>

<div class="data-card data-card-accent info" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Third-Party API Failure</div>
<div class="data-card-description">
<strong>RTO:</strong> Immediate<br/>
<strong>RPO:</strong> N/A<br/>
<strong>Action:</strong> Circuit breaker, fallback to cached/degraded mode
</div>
</div>
</div>

</div>

</div>
</div>

---

## Interview Deep Dive Questions {#interview-deep-dive}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f39c12;">

### 1. "How do you optimize multi-stop routes?" {#question-route-optimization}

**What They're Probing**: Understanding of TSP variants, real-world constraints, computational complexity trade-offs

**Strong Answer**:

> "Multi-stop routing in hyperlocal logistics is fundamentally a **Precedence-Constrained Traveling Salesman Problem (PC-TSP)** - one of the most computationally challenging problems in operations research. Let me walk you through our approach with a concrete scenario.
>
> **Real-World Scenario**: Imagine a partner has accepted 3 orders simultaneously:
> - **Order A**: Pick up medicines from Apollo Pharmacy (P1) and deliver to Mrs. Sharma (D1) - 2.3 km away
> - **Order B**: Pick up groceries from BigBasket hub (P2) and deliver to Mr. Patel (D2) - 1.8 km away
> - **Order C**: Pick up documents from a law firm (P3) and deliver to a bank (D3) - 3.1 km away
>
> **The Naive Approach** would be sequential: P1->D1->P2->D2->P3->D3, covering approximately 15.2 km and taking 48 minutes.
>
> **Our Optimized Approach** considers **50+ variables** including:
> - **Geographic clustering**: P1 and P3 are only 400m apart, so batch those pickups
> - **Traffic patterns**: The route from D2 to D3 passes through a high-congestion zone at 6pm - avoid during peak
> - **Time sensitivity**: Medicines have higher priority than documents
> - **Road network topology**: One-way streets, no-entry zones, construction areas
> - **Partner vehicle type**: Two-wheeler can take shortcuts a car cannot
>
> **Step-by-step optimization**:
> 1. **Build a distance matrix**: Pre-compute travel times between all 6 points (P1, P2, P3, D1, D2, D3) = 30 pairs
> 2. **Apply precedence constraints**: P1 must come before D1, P2 before D2, P3 before D3
> 3. **Generate initial solution**: Use Nearest Neighbor heuristic - start at partner location, go to closest unvisited point respecting precedence
> 4. **Improve with 2-opt/3-opt**: Iteratively swap edges to reduce total distance
> 5. **Apply Or-opt moves**: Relocate single stops or pairs to better positions
>
> **Optimized route**: Partner Location -> P1 -> P3 -> P2 -> D2 -> D1 -> D3, covering only 10.1 km (33% reduction) and 32 minutes.
>
> **Technical implementation**: We use Google OR-Tools for the constraint solver, with OSRM providing the road-network-aware distance matrix. The entire optimization runs in under 200ms for up to 8 stops. For real-time recalculation when new orders arrive mid-route, we use **insertion heuristics** rather than full re-optimization - finding the best position to insert the new pickup-drop pair takes only 15ms.
>
> **Key insight for interviews**: We pre-compute travel time matrices between the top 500 pickup points (stores, restaurants, hubs) during off-peak hours. This cached matrix handles 70% of routes instantly without calling the routing API."

**When Simpler Works**:
> "For partners with fewer than 3 stops, optimization provides marginal benefit - maybe 500m savings. We use simple point-to-point Google Maps directions. Instacart operated this way until 2016. The complexity is only justified when you have high-density areas with consistent multi-stop routes."

---

### 2. "Why not just use Google Maps routing API for everything?" {#question-google-maps}

**What They're Probing**: Cost awareness, understanding of API limitations, ability to build vs. buy

**Strong Answer**:

> "This is a classic build-vs-buy decision where the answer changes dramatically with scale. Let me break down the economics and technical limitations.
>
> **Cost Analysis at Scale**:
> - Google Maps Directions API: $5 per 1,000 requests (after free tier)
> - Routes API with optimization: $10 per 1,000 requests
>
> **Concrete calculation for Dunzo-scale (100K orders/day)**:
> - Initial route calculation: 100K requests/day
> - Real-time re-routing (average 3x per order due to traffic/delays): 300K requests/day
> - ETA updates every 2 minutes for 30-minute average delivery: 1.5M requests/day
> - **Total**: ~2M API calls/day = 60M/month = **$300K-600K/year just for routing**
>
> **Technical Limitations of Google Maps API**:
> 1. **No precedence constraints**: Google's optimization assumes you can visit waypoints in any order. It doesn't understand that pickup P1 MUST happen before drop D1. We'd need to post-process and potentially invalidate their optimization.
>
> 2. **Limited waypoints**: The API caps at 25 waypoints per request. For batched orders with 8+ stops, we need multiple calls and manual stitching.
>
> 3. **No vehicle-specific routing for two-wheelers**: Google optimizes for cars. In Indian cities, two-wheelers can use service roads, narrow lanes, and shortcuts that cut 20% off car routes.
>
> 4. **Rate limits**: 50 requests/second default limit causes queueing during surge periods.
>
> **Our Hybrid Approach**:
> - **OSRM (Open Source Routing Machine)** self-hosted for base routing: Handles 500+ requests/second on a $200/month server, unlimited usage
> - **Custom two-wheeler profile**: We trained OSRM with GPS traces from 10,000 actual delivery trips to learn rider shortcuts
> - **Google Maps only for**: Customer-facing ETA display (trust factor), geocoding (address to coordinates), and new city launches before we have local data
>
> **When to switch**:
> - **< 1,000 orders/day**: Google Maps is fine. $300-500/month is cheaper than DevOps overhead for OSRM
> - **1,000-10,000 orders/day**: Hybrid approach - OSRM for internal routing, Google for customer display
> - **> 10,000 orders/day**: Full OSRM with Google only for geocoding
>
> **DoorDash case study**: They used pure Google Maps until 2017 (~5K orders/day in SF), then built their own routing engine. Their routing costs dropped 85% while accuracy improved because they incorporated restaurant preparation time and driver wait patterns that Google couldn't model."

**When Simpler Works**:
> "For a startup doing 500 orders/day, the $200/month Google Maps bill is nothing compared to the 2 engineering weeks to set up OSRM correctly. Premature optimization here is a real trap - I've seen startups spend 3 months building custom routing before product-market fit."

---

### 3. "How do you handle rider assignment at scale?" {#question-rider-assignment}

**What They're Probing**: Distributed systems knowledge, consistency vs. availability trade-offs, real-world matching systems

**Strong Answer**:

> "Rider assignment is the heart of any delivery platform - it's essentially a **real-time distributed auction system** where orders compete for riders and riders compete for orders. The core challenge is preventing **double-assignment** while maintaining sub-second response times.
>
> **The Double-Assignment Problem in Detail**:
> Imagine at 7:15 PM, Order #A and Order #B are both created within 50ms of each other. Both orders identify Rider #123 as the best match (he's equidistant from both pickups). Without coordination:
> - Dispatcher process 1 checks: 'Is Rider #123 available?' -> Yes
> - Dispatcher process 2 checks: 'Is Rider #123 available?' -> Yes (race condition!)
> - Both send assignment offers to Rider #123
> - Rider accepts Order #A
> - Order #B thinks it's assigned but rider never shows -> customer waiting 15+ minutes
>
> **Our Multi-Layer Solution**:
>
> **Layer 1: Geographic Sharding**
> - India is divided into 25 city clusters
> - Bangalore dispatchers NEVER compete with Mumbai dispatchers (different Redis instances, different Kafka partitions)
> - Within Bangalore, we further partition into 12 zones (~50 sq km each)
> - **Benefit**: 90% of matching happens within a single zone with no cross-zone coordination
>
> **Layer 2: Distributed Locking**
> ```
> SETNX rider_lock:123 order_id_A EX 30
> ```
> - Lock TTL: 30 seconds (covers offer + acceptance window)
> - If lock fails, immediately try next-best rider (pre-computed list of top 5)
> - Lock is released on: acceptance, rejection, or timeout
>
> **Layer 3: Scoring Algorithm (50+ features)**
> The scoring function weights:
> - **Distance to pickup (40%)**: Closer riders provide faster pickup, better customer experience
> - **Acceptance rate (25%)**: Riders who frequently reject waste matching cycles
> - **Current load (15%)**: Riders with 1 active order can take a second; riders with 2 are at capacity
> - **Rating (10%)**: Higher-rated riders for premium customers or high-value orders
> - **Earnings balance (10%)**: If a rider has had a slow hour, boost their score to maintain fair earnings distribution
>
> **Concrete Example**:
> Order: Pickup from Koramangala, drop to Indiranagar (4 km)
> Available riders within 3km radius: 8 riders
>
> | Rider | Distance | Accept Rate | Current Orders | Rating | Score |
> |-------|----------|-------------|----------------|--------|-------|
> | R1 | 0.8 km | 92% | 0 | 4.8 | 87.2 |
> | R2 | 1.2 km | 88% | 1 | 4.9 | 71.5 |
> | R3 | 0.5 km | 65% | 0 | 4.2 | 68.3 |
>
> R1 wins despite R3 being closer because R3's low acceptance rate (65%) suggests they might reject this order too.
>
> **Layer 4: Graceful Degradation**
> During surge (Friday 8 PM dinner rush):
> - Switch from 'best match' to 'good enough match'
> - Accept first rider within 2 km with >70% acceptance rate
> - Skip scoring computation entirely
> - **Result**: Matching time drops from 400ms to 50ms, throughput increases 8x
>
> **Failure Scenarios**:
> 1. **Redis lock server down**: Fall back to PostgreSQL advisory locks (slower but consistent)
> 2. **Rider app loses connectivity during assignment**: Order goes to 'pending_confirmation' state, auto-reassign after 60 seconds
> 3. **Zone server overload**: Spill to adjacent zone's rider pool (riders near zone boundaries can serve both)"

**When Simpler Works**:
> "For < 50 orders/hour, a human dispatcher with a WhatsApp group is more reliable than any algorithm. I've seen local courier services where the dispatcher literally calls the nearest rider. FIFO assignment (first available rider gets next order) works fine until you hit 200+ concurrent orders - that's when utilization variance becomes a problem worth solving."

---

### 4. "How do you ensure delivery partner earnings are fair and predictable?" {#question-partner-earnings}

**What They're Probing**: Understanding of gig economy dynamics, incentive design, operational sustainability

**Strong Answer**:

> "Partner earnings directly drive **supply reliability** - if riders can't make predictable income, they churn to competitors or quit gig work entirely. This is the #1 operational challenge for any delivery platform. Let me walk through our comprehensive earnings framework.
>
> **The Core Insight**: Partners optimize for **earnings-per-hour**, not earnings-per-delivery. A $5 delivery that takes 45 minutes is worse than a $3 delivery that takes 15 minutes.
>
> **Multi-Component Earnings Model**:
>
> **1. Base Fare**: Fixed amount per delivery category
> - Documents: Rs 25 ($0.30)
> - Groceries: Rs 35 ($0.42)
> - Food: Rs 40 ($0.48) - higher because of wait times at restaurants
>
> **2. Distance Pay**: Rs 8/km ($0.10/km) for distance beyond first 2 km
> - Example: 6 km delivery = Rs 8 * 4 = Rs 32 extra
>
> **3. Time Pay**: Rs 2/minute ($0.024/min) for wait time > 5 minutes
> - Compensates for slow restaurant prep, customer not answering door
>
> **4. Surge Bonus**: 1.2x - 2.5x multiplier during high demand
> - Friday 7-9 PM: 1.5x
> - Rain: 2.0x
> - Cricket match ending: 1.8x
>
> **5. Tips**: 100% go to partner (platform takes no cut)
>
> **6. Incentives**: Gamified bonuses
> - Complete 10 orders before 2 PM: Rs 100 bonus
> - 50 orders in a week: Rs 500 bonus
> - Perfect 5-star week: Rs 200 bonus
>
> **Concrete Earnings Example**:
> Rahul works 8 hours on a Friday:
> - Completes 12 deliveries
> - Base fares: Rs 420
> - Distance pay: Rs 180
> - Wait time pay: Rs 45
> - Surge bonuses: Rs 95
> - Tips: Rs 120
> - Daily incentive (12 orders): Rs 150
> - **Total: Rs 1,010 (~$12) for 8 hours = Rs 126/hour**
>
> **Minimum Guarantee System**:
> - During peak slots (12-2 PM, 7-10 PM), we guarantee Rs 150/hour if rider maintains:
>   - 80%+ acceptance rate
>   - < 5% cancellation rate
>   - Online for full slot duration
> - If Rahul only earned Rs 800 organically in 8 peak hours (Rs 100/hour), we top up Rs 400 to reach Rs 150/hour guaranteed minimum
>
> **Batching for Efficiency**:
> When user orders from 3 different stores in same area (common for party prep), we batch them:
> - Single partner picks up from all 3 stores
> - Partner earns 3x base fare but only 1x distance (since drops are close)
> - Partner completes 3 orders in 40 minutes instead of 3 separate trips taking 90 minutes
> - **Earnings jump from Rs 20/order to Rs 35/order equivalent**
>
> **Transparency Features**:
> - Before accepting, partner sees: estimated earnings, pickup/drop locations, expected time
> - Weekly earnings summary email with breakdown
> - 'Earnings estimator' in app: 'If you work 6 PM - 10 PM today, you'll likely earn Rs 500-650'
>
> **Anti-Gaming Measures**:
> - GPS verification at pickup/drop (prevents fake deliveries)
> - Photo proof of delivery
> - Customer confirmation codes
> - AI detection of anomalous patterns (same rider, same customer, repeated orders)"

**When Simpler Works**:
> "For low-volume local delivery services, a flat Rs 50 per delivery regardless of distance works fine. The complexity of variable pricing only matters when you have partners choosing between orders and you need to incentivize less desirable deliveries (long distance, bad weather, difficult parking areas)."

---

### 5. "What happens when a partner cancels mid-delivery?" {#question-mid-delivery-cancel}

**What They're Probing**: Failure handling, customer experience protection, operational resilience

**Strong Answer**:

> "Mid-delivery cancellation is our most critical failure mode - the customer has already been charged, they're expecting delivery, and their package is literally in transit with someone who's abandoning it. This scenario occurs in 0.3% of orders but generates 15% of customer complaints. Here's our comprehensive playbook.
>
> **Detection Before Explicit Cancellation** (catching issues early):
>
> 1. **GPS Anomaly Detection**:
>    - Partner stationary > 8 minutes not at a stop location -> Alert
>    - Partner moving away from destination -> Alert
>    - Partner's heading consistently opposite to route -> Alert
>    - GPS signal lost > 3 minutes -> Alert
>
> 2. **Behavioral Signals**:
>    - Partner opens 'Cancel' screen but doesn't confirm (hesitation)
>    - Partner calls support -> Route to 'save the delivery' team
>    - Partner's speed suddenly drops to 0 in non-traffic area
>
> **The Rescue Protocol** (step-by-step):
>
> **T+0 (Cancellation detected)**:
> - Order enters 'IN_TRANSIT_REASSIGNING' state
> - Customer notification: 'Your delivery partner had an emergency. We're assigning a new partner immediately. Your order is safe.'
> - Do NOT show 'cancelled' status - customer sees 'Finding new partner...'
>
> **T+30 seconds**:
> - Query for rescue partners within 1 km of last known package location
> - Rescue partners are specially flagged riders who:
>   - Get 1.5x pay for rescue missions
>   - Have 95%+ acceptance rate
>   - Are pre-positioned in high-incident areas
>
> **T+60 seconds**:
> - If no rescue partner, expand to 2 km radius
> - Parallel: Customer gets callback from support with personal update
>
> **T+2 minutes**:
> - If still unassigned, escalate to 'Critical' queue
> - Operations team manually calls nearby partners
>
> **Package Handoff Scenarios**:
>
> **Scenario A: Package still with original partner (most common - 70% of cases)**
> - Original partner is contacted and asked to wait at current location
> - Rescue partner navigates to meet original partner
> - Handoff verified via OTP exchange
> - Original partner gets partial payment (for work completed) minus penalty
>
> **Scenario B: Original partner unreachable (25% of cases)**
> - Track last known location from GPS history
> - Rescue partner goes to that location
> - If package not found, escalate to 'Lost Package' protocol
>
> **Scenario C: High-value or sensitive package (5% of cases)**
> - Medicines, legal documents, electronics > Rs 5000
> - Operations manager personally calls original partner
> - If unrecoverable within 10 minutes, initiate refund + replacement order
> - Insurance claim process begins
>
> **Real Example**:
> Order #45231: Customer ordered birthday cake for delivery at 7 PM party
> - 6:42 PM: Partner picks up cake from bakery
> - 6:51 PM: Partner's phone dies (common in summer heat)
> - 6:54 PM: GPS lost alert triggers
> - 6:55 PM: System detects partner was heading correct direction, likely phone issue not abandonment
> - 6:56 PM: Rescue partner Priya assigned, estimated at last location in 8 minutes
> - 6:58 PM: Customer called proactively, told 7:15 PM new ETA
> - 7:02 PM: Original partner's phone comes back online (was charging at a tea stall)
> - 7:03 PM: System detects original partner moving again, cancels rescue assignment
> - 7:11 PM: Original partner delivers cake, only 11 minutes late
> - 7:12 PM: Customer gets Rs 50 credit for inconvenience
>
> **Post-Incident Analysis**:
> - Every mid-delivery cancellation is reviewed
> - Partner gets 'incident' flag on profile (3 incidents = suspension)
> - If cancellation was due to accident/emergency, partner is not penalized and gets wellness check
>
> **Metrics We Track**:
> - Average reassignment time: 4.2 minutes
> - Successful rescue rate: 94%
> - Customer churn after mid-delivery incident: 12% (vs 3% baseline)
> - NPS for rescued orders: 42 (vs 67 normal) - so we proactively offer credits"

**When Simpler Works**:
> "For valuable items (jewelry, electronics, documents), some services just have the partner return to the pickup point and restart fresh. For food delivery specifically, cancellation usually means refund + reorder rather than complex mid-route reassignment - by the time you rescue the food, it's cold anyway. Sometimes simpler is better for customer experience."

</div>

---

## Why This Technology? {#why-this-technology}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### Technology Decision Matrix {#tech-decision-matrix}

| Decision | Options Considered | Chosen | Why |
|----------|-------------------|--------|-----|
| **Partner Location Store** | PostgreSQL, Redis, MongoDB | Redis GEOADD | O(log N) radius queries, TTL for stale detection, 10K writes/sec |
| **Order Queue** | RabbitMQ, SQS, Kafka | Kafka | Order matters for batching, replay for debugging, city-partitioned topics |
| **Route Optimization** | Google OR-Tools, OSRM, Custom | OSRM + OR-Tools | OSRM for road network, OR-Tools for TSP solving - best of both |
| **ETA Prediction** | Rule-based, ML, Hybrid | Hybrid | ML for accuracy, rules as fallback, A/B tested improvements |
| **Assignment Algorithm** | FIFO, Nearest, Scored | Scored | Balances partner experience, customer wait time, operational efficiency |
| **Real-time Updates** | Polling, WebSocket, SSE | WebSocket | Bi-directional needed for partner app, SSE for customer tracking |

### When to Upgrade Technology {#when-to-upgrade}

<div class="flow-diagram" style="padding: 0; gap: 12px;">

<div class="data-card data-card-accent info" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">PostgreSQL Location Queries -> Redis GEO</span>
</div>
<div class="data-card-description">
<strong>Trigger:</strong> > 100 location queries/second<br/>
<strong>Sign:</strong> Database CPU > 70% during peak
</div>
</div>
</div>

<div class="data-card data-card-accent success" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">Simple Distance Matching -> ML-based Scoring</span>
</div>
<div class="data-card-description">
<strong>Trigger:</strong> > 500 partners in single city<br/>
<strong>Sign:</strong> Partner utilization variance > 40%
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">Google Maps API -> Self-hosted OSRM</span>
</div>
<div class="data-card-description">
<strong>Trigger:</strong> > $5000/month in Maps API costs<br/>
<strong>Sign:</strong> Route API calls > 500K/month
</div>
</div>
</div>

<div class="data-card data-card-accent purple" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-header">
<span class="data-card-title">Monolithic Dispatch -> City-sharded Services</span>
</div>
<div class="data-card-description">
<strong>Trigger:</strong> > 3 cities with different peak patterns<br/>
<strong>Sign:</strong> One city's surge affecting another's performance
</div>
</div>
</div>

</div>

</div>
</div>

---

## When Simpler Solutions Work {#simpler-solutions}

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Reality Check: You Probably Don't Need This Complexity {#reality-check}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #00c853;">

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

### When You DON'T Need ML Route Optimization {#no-ml-needed}

| Scenario | Simple Alternative | Why It Works |
|----------|-------------------|--------------|
| Single pickup, single drop | Google Maps directions | No optimization needed |
| < 3 stops per route | Fixed order (P1->D1->P2->D2) | Marginal improvement not worth compute |
| Predictable routes | Pre-computed route templates | Same store -> same areas daily |
| Low-density areas | Nearest neighbor heuristic | Optimal isn't much better |

### The "$300/Month Delivery Platform" Stack {#budget-stack}

<div class="diagram-container">
<div style="width: 100%;">

<h4 style="text-align: center; color: #64748b; margin-bottom: 16px;">STARTUP STACK (Works up to 500 orders/day)</h4>

| Component | Cost |
|-----------|------|
| Frontend: React/Flutter app | $0 |
| Backend: Single Node.js/Django server | $50/mo |
| Database: Managed PostgreSQL (basic) | $50/mo |
| Maps: Google Maps API (free tier + basic) | $100/mo |
| SMS/Notifications: Twilio | $50/mo |
| Hosting: Single VPS or basic cloud | $50/mo |
| **Total** | **~$300/month** |

<div style="margin-top: 16px; color: #64748b; font-size: 14px;">
<strong>Assignment:</strong> Manual or simple FIFO queue<br/>
<strong>Routing:</strong> Google Maps Directions API<br/>
<strong>Tracking:</strong> Store lat/lng in PostgreSQL, poll every 30s<br/>
<strong>Batching:</strong> Manual by dispatcher
</div>

</div>
</div>

### Real-World Examples of Simpler Approaches {#simpler-examples}

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

### Questions to Ask Before Building Complexity {#complexity-questions}

<div class="flow-row" style="gap: 12px;">

<div class="data-card data-card-accent purple" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Before building ML-based dispatch:</div>
<div class="data-card-description">
- Do we have > 500 concurrent active partners?<br/>
- Is partner utilization variance > 30%?<br/>
- Do we have 3+ months of historical data?
</div>
</div>
</div>

<div class="data-card data-card-accent info" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Before building real-time route optimization:</div>
<div class="data-card-description">
- Do partners regularly have 3+ stops?<br/>
- Are we losing > 5% revenue to inefficient routing?<br/>
- Do we have traffic data integration?
</div>
</div>
</div>

</div>

<div class="flow-row" style="gap: 12px; margin-top: 12px;">

<div class="data-card data-card-accent success" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Before sharding by city:</div>
<div class="data-card-description">
- Do we have > 3 cities?<br/>
- Are cities in different timezones with different peaks?<br/>
- Is single database CPU > 60% at peak?
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="flex: 1;">
<div class="data-card-content">
<div class="data-card-title">Before building custom routing engine:</div>
<div class="data-card-description">
- Are Maps API costs > $5000/month?<br/>
- Do we need vehicle-specific routing (bikes vs cars)?<br/>
- Is Google's routing inadequate for our geography?
</div>
</div>
</div>

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation {#trade-off-analysis}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### Critical Trade-offs in Logistics Platform Design {#critical-tradeoffs}

| Trade-off | Option A | Option B | Our Choice | Mitigation |
|-----------|----------|----------|------------|------------|
| **Partner Experience vs Customer Wait** | Prioritize partner convenience (accept/reject freely) | Force-assign orders | Soft assignment with incentives | Bonus for quick acceptance, penalty-free rejection limit |
| **ETA Accuracy vs Commitment** | Optimistic ETA (better conversion) | Padded ETA (always on time) | Adaptive padding based on confidence | Under-promise, over-deliver with live updates |
| **Batching Efficiency vs Freshness** | Wait longer for better batches | Dispatch immediately | Time-boxed batching (5 min max) | Priority override for perishables, customer choice |
| **Cost vs Coverage** | Minimize partner payments | Guarantee earnings | Zone-based guarantees | Higher guarantees in underserved areas only |
| **Consistency vs Availability** | Strong consistency for assignment | Accept some double-assignment | Optimistic locking with reconciliation | Automated conflict resolution, customer notification |

### Failure Mode Analysis {#failure-mode-analysis}

<div class="flow-diagram" style="padding: 0; gap: 12px;">

<div class="data-card data-card-accent error" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">FAILURE: Redis location cache goes down</div>
<div class="data-card-description">
<strong>Impact:</strong> Can't find nearby partners<br/>
<strong>Mitigation:</strong> Fallback to PostgreSQL with last known locations<br/>
<strong>RTO:</strong> 30 seconds with automatic failover
</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">FAILURE: Partner app loses connectivity</div>
<div class="data-card-description">
<strong>Impact:</strong> Stale location, missed assignments<br/>
<strong>Mitigation:</strong> Offline queue, SMS fallback for critical orders<br/>
<strong>RTO:</strong> Partner reconnects or manual reassignment
</div>
</div>
</div>

<div class="data-card data-card-accent orange" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">FAILURE: Kafka consumer lag</div>
<div class="data-card-description">
<strong>Impact:</strong> Delayed order processing<br/>
<strong>Mitigation:</strong> Auto-scaling consumers, priority queue bypass<br/>
<strong>RTO:</strong> < 2 minutes with lag alerting at 1000 messages
</div>
</div>
</div>

<div class="data-card data-card-accent purple" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">FAILURE: ML ETA model returns outliers</div>
<div class="data-card-description">
<strong>Impact:</strong> Unrealistic customer expectations<br/>
<strong>Mitigation:</strong> Rule-based bounds checking, fallback to historical avg<br/>
<strong>RTO:</strong> Immediate with outlier detection
</div>
</div>
</div>

<div class="data-card data-card-accent success" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">FAILURE: Payment gateway timeout</div>
<div class="data-card-description">
<strong>Impact:</strong> Order stuck in pending<br/>
<strong>Mitigation:</strong> Async payment, proceed with delivery on credit<br/>
<strong>RTO:</strong> Retry queue with 3x attempts over 5 minutes
</div>
</div>
</div>

</div>

### Scaling Bottlenecks and Solutions {#scaling-bottlenecks}

| Bottleneck | Symptom | Threshold | Solution |
|------------|---------|-----------|----------|
| Location writes | Redis latency > 10ms | 10K writes/sec | Redis cluster, batch writes |
| Assignment queries | Partner search > 500ms | 1K queries/sec | Pre-indexed zones, caching |
| Route calculation | OSRM timeout | 100 routes/sec | OSRM cluster, pre-computation |
| Order database | Transaction conflicts | 5K orders/min | Sharding by city, read replicas |
| WebSocket connections | Memory exhaustion | 50K connections | Sticky sessions, connection pooling |

</div>
</div>

---

## Interview Tips {#interview-tips}

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points {#key-discussion-points}

1. **Dispatch algorithm**: Matching partners to orders with scoring
2. **Route optimization**: Multi-stop TSP with precedence constraints
3. **ETA accuracy**: ML-based predictions with confidence intervals
4. **Order batching**: Combining nearby orders within time windows
5. **Partner incentives**: Earnings, bonuses, gamification
6. **Failure handling**: Mid-delivery cancellations, reassignment
7. **City-based scaling**: When and how to shard by geography

### Common Follow-ups {#common-followups}

- How do you handle partner unavailability mid-delivery?
- How do you implement cash-on-delivery reconciliation?
- How do you handle multi-vendor orders (multiple pickups)?
- What's your approach to demand prediction for partner positioning?
- How do you prevent fraud (fake deliveries, GPS spoofing)?

</div>

---

## Red Flags vs Impressive Statements {#red-flags-impressive}

<div class="diagram-container">
<div style="width: 100%; max-width: 800px;">

### Red Flags (What NOT to Say) {#red-flags}

<div class="data-card data-card-accent error" style="margin-bottom: 24px;">
<div class="data-card-content">

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
</div>

### Impressive Statements (What Shows Depth) {#impressive-statements}

<div class="data-card data-card-accent success" style="margin-bottom: 24px;">
<div class="data-card-content">

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
</div>

### The "10x Engineer" Answer Pattern {#answer-pattern}

<div class="flow-diagram" style="padding: 0; gap: 12px;">

<div class="data-card data-card-accent info" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">1. ACKNOWLEDGE COMPLEXITY</div>
<div class="data-card-description">"This is essentially a real-time matching marketplace with geographical constraints..."</div>
</div>
</div>

<div class="data-card data-card-accent success" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">2. START SIMPLE</div>
<div class="data-card-description">"For MVP, FIFO assignment with basic distance filtering handles 80% of cases..."</div>
</div>
</div>

<div class="data-card data-card-accent warning" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">3. IDENTIFY TRIGGERS</div>
<div class="data-card-description">"When we hit 500+ concurrent partners, simple matching creates utilization variance..."</div>
</div>
</div>

<div class="data-card data-card-accent purple" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">4. PROPOSE EVOLUTION</div>
<div class="data-card-description">"Then we introduce scored matching, but keep FIFO as fallback during system stress..."</div>
</div>
</div>

<div class="data-card data-card-accent orange" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">5. QUANTIFY TRADE-OFFS</div>
<div class="data-card-description">"ML routing saves ~15% distance but adds 200ms latency and requires 3 months of training data..."</div>
</div>
</div>

<div class="data-card data-card-accent pink" style="width: 100%;">
<div class="data-card-content">
<div class="data-card-title">6. SHOW INDUSTRY AWARENESS</div>
<div class="data-card-description">"This is similar to how Uber evolved from simple dispatch to their Marketplace team's algorithms..."</div>
</div>
</div>

</div>

</div>
</div>

---

## Quick Reference Card {#quick-reference}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

### Numbers to Remember {#numbers-to-remember}

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

### Tech Stack Quick Reference {#tech-stack-reference}

| Scale | Database | Cache | Queue | Routing |
|-------|----------|-------|-------|---------|
| Startup | PostgreSQL | None | None | Google Maps |
| Growth | PostgreSQL + Read Replicas | Redis | SQS/RabbitMQ | Google Maps + OSRM |
| Scale | Sharded PostgreSQL | Redis Cluster | Kafka | OSRM + OR-Tools |

</div>
