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

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

<!-- Customer Layer -->
<div style="background: linear-gradient(135deg, #2d5a27 0%, #3d7a37 100%); border-radius: 12px; padding: 16px 32px; border: 2px solid #4ade80; text-align: center;">
<div style="color: #4ade80; font-weight: bold; font-size: 14px;">CUSTOMERS</div>
<div style="color: #d1fae5; font-size: 12px;">Mobile App</div>
</div>

<div style="color: #6b7280; font-size: 24px;">|</div>

<!-- Three Apps Row -->
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 100%); border-radius: 10px; padding: 14px 20px; border: 2px solid #60a5fa; text-align: center; min-width: 100px;">
<div style="color: #60a5fa; font-weight: bold; font-size: 13px;">Customer App</div>
</div>
<div style="background: linear-gradient(135deg, #4a2c1a 0%, #6b3d24 100%); border-radius: 10px; padding: 14px 20px; border: 2px solid #f97316; text-align: center; min-width: 100px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px;">Partner App</div>
</div>
<div style="background: linear-gradient(135deg, #3d1f5a 0%, #5a2d8a 100%); border-radius: 10px; padding: 14px 20px; border: 2px solid #a855f7; text-align: center; min-width: 100px;">
<div style="color: #a855f7; font-weight: bold; font-size: 13px;">Merchant App</div>
</div>
</div>

<div style="color: #6b7280; font-size: 24px;">|</div>

<!-- API Gateway -->
<div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 12px; padding: 16px 48px; border: 2px solid #9ca3af; text-align: center;">
<div style="color: #e5e7eb; font-weight: bold; font-size: 14px;">API GATEWAY</div>
</div>

<div style="color: #6b7280; font-size: 24px;">|</div>

<!-- Core Services Row -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 12px; padding: 16px; border: 2px solid #3b82f6; min-width: 140px;">
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 8px;">ORDER SERVICE</div>
<div style="color: #93c5fd; font-size: 11px; line-height: 1.6;">
- Create orders<br/>
- Calculate pricing<br/>
- Manage status
</div>
</div>

<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 12px; padding: 16px; border: 2px solid #f97316; min-width: 140px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 8px;">DISPATCH SERVICE</div>
<div style="color: #fed7aa; font-size: 11px; line-height: 1.6;">
- Partner matching<br/>
- Assignment logic<br/>
- Order batching
</div>
</div>

<div style="background: linear-gradient(135deg, #1a3d2d 0%, #2a5a3d 100%); border-radius: 12px; padding: 16px; border: 2px solid #22c55e; min-width: 140px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 8px;">TRACKING SERVICE</div>
<div style="color: #bbf7d0; font-size: 11px; line-height: 1.6;">
- Live location<br/>
- ETA calculation<br/>
- Trip history
</div>
</div>

</div>

<div style="color: #6b7280; font-size: 24px;">|</div>

<!-- Routing Service -->
<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 12px; padding: 16px 24px; border: 2px solid #a855f7; text-align: center;">
<div style="color: #a855f7; font-weight: bold; font-size: 13px; margin-bottom: 6px;">ROUTING SERVICE</div>
<div style="color: #e9d5ff; font-size: 11px;">Route Optimization | Multi-stop | Traffic Analysis</div>
</div>

<div style="color: #6b7280; font-size: 24px;">|</div>

<!-- Kafka -->
<div style="background: linear-gradient(135deg, #1f1f1f 0%, #2f2f2f 100%); border-radius: 12px; padding: 14px 40px; border: 2px solid #fbbf24; text-align: center;">
<div style="color: #fbbf24; font-weight: bold; font-size: 14px;">KAFKA</div>
<div style="color: #fef3c7; font-size: 11px;">Event Streaming</div>
</div>

</div>

</div>

---

## Order Flow

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">HYPERLOCAL DELIVERY FLOW</h4>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 24px; border: 2px solid #6b7280;">

<div style="color: #e5e7eb; font-weight: bold; font-size: 16px; text-align: center; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #374151;">ORDER LIFECYCLE</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<!-- Step 1: Order Creation -->
<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 8px;">1. ORDER CREATION</div>
<div style="color: #bfdbfe; font-size: 12px; line-height: 1.8;">
- Validate addresses (pickup + drops)<br/>
- Calculate distance and route<br/>
- Apply dynamic pricing (surge multiplier)<br/>
- Reserve payment authorization
</div>
</div>

<div style="text-align: center; color: #6b7280; font-size: 18px;">v</div>

<!-- Step 2: Partner Matching -->
<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #f97316;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">2. PARTNER MATCHING</div>
<div style="color: #fed7aa; font-size: 12px; line-height: 1.8;">
Find best partner based on:<br/>
- Distance to pickup location<br/>
- Current load (active orders)<br/>
- Partner rating/performance score<br/>
- Vehicle type requirements<br/><br/>
<span style="color: #fbbf24;">Matching radius: 3km -> 5km -> 7km (expanding circles)</span>
</div>
</div>

<div style="text-align: center; color: #6b7280; font-size: 18px;">v</div>

<!-- Step 3: Pickup Phase -->
<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 13px; margin-bottom: 8px;">3. PICKUP PHASE</div>
<div style="color: #e9d5ff; font-size: 12px; line-height: 1.8;">
- Partner accepts/rejects offer (30s timeout)<br/>
- Navigate to pickup location<br/>
- Confirm pickup with OTP/photo verification
</div>
</div>

<div style="text-align: center; color: #6b7280; font-size: 18px;">v</div>

<!-- Step 4: Delivery Phase -->
<div style="background: linear-gradient(135deg, #1a3d2d 0%, #2a5a3d 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">4. DELIVERY PHASE</div>
<div style="color: #bbf7d0; font-size: 12px; line-height: 1.8;">
- Optimized route to drop location(s)<br/>
- Real-time tracking shared with customer<br/>
- Confirm delivery with OTP/photo
</div>
</div>

<div style="text-align: center; color: #6b7280; font-size: 18px;">v</div>

<!-- Step 5: Completion -->
<div style="background: linear-gradient(135deg, #3d3d1f 0%, #5a5a2d 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #eab308;">
<div style="color: #eab308; font-weight: bold; font-size: 13px; margin-bottom: 8px;">5. COMPLETION</div>
<div style="color: #fef9c3; font-size: 12px; line-height: 1.8;">
- Process final payment<br/>
- Update partner earnings<br/>
- Request ratings from both parties
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

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; text-align: center; margin-bottom: 20px;">MULTI-STOP ROUTE OPTIMIZATION</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; border: 2px solid #6b7280; margin-bottom: 20px;">

<div style="color: #e5e7eb; font-weight: bold; margin-bottom: 12px;">Problem: Partner has multiple orders to deliver</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #4d2f2f 100%); border-radius: 8px; padding: 14px; border: 1px solid #ef4444;">
<div style="color: #ef4444; font-weight: bold; font-size: 12px; margin-bottom: 8px;">NAIVE ROUTE</div>
<div style="color: #fecaca; font-size: 11px; line-height: 1.8;">
Order A: Pickup P1 -> Drop D1<br/>
Order B: Pickup P2 -> Drop D2<br/>
Order C: Pickup P3 -> Drop D3<br/><br/>
Route: P1 -> D1 -> P2 -> D2 -> P3 -> D3<br/>
<span style="color: #f87171; font-weight: bold;">Total: 15 km</span>
</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 14px; border: 1px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 12px; margin-bottom: 8px;">OPTIMIZED ROUTE (TSP-like)</div>
<div style="color: #bbf7d0; font-size: 11px; line-height: 1.8;">
Batch pickups, then optimize drops<br/><br/>
Route: P1 -> P2 -> P3 -> D2 -> D1 -> D3<br/><br/>
<span style="color: #4ade80; font-weight: bold;">Total: 10 km (33% savings)</span>
</div>
</div>

</div>

<div style="background: linear-gradient(135deg, #3d3d1f 0%, #4d4d2f 100%); border-radius: 8px; padding: 14px; border: 1px solid #eab308; margin-top: 16px;">
<div style="color: #eab308; font-weight: bold; font-size: 12px; margin-bottom: 8px;">CONSTRAINTS</div>
<div style="color: #fef9c3; font-size: 11px; line-height: 1.8;">
- Pickup must happen before drop for same order (precedence)<br/>
- Consider time windows (food freshness, customer availability)<br/>
- Capacity limits (weight, size, vehicle type)
</div>
</div>

</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 14px; border: 1px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">ALGORITHM</div>
<div style="color: #bfdbfe; font-size: 11px; line-height: 1.8;">
Modified TSP with precedence constraints<br/>
- Use Google OR-Tools / OSRM for routing<br/>
- Heuristic: Nearest neighbor with 2-opt improvement
</div>
</div>

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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; border: 2px solid #6b7280;">

<div style="color: #e5e7eb; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #374151;">LOCATION TRACKING PIPELINE</div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<!-- Partner App -->
<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 8px; padding: 12px; border: 1px solid #f97316; text-align: center;">
<div style="color: #f97316; font-weight: bold; font-size: 12px;">Partner App</div>
<div style="color: #fed7aa; font-size: 10px;">GPS update every 5 seconds (when active)</div>
</div>

<div style="text-align: center; color: #6b7280;">v</div>

<!-- Location Service -->
<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 12px; border: 1px solid #3b82f6; text-align: center;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px;">Location Service (WebSocket)</div>
<div style="color: #bfdbfe; font-size: 10px;">Batch updates every 3 seconds</div>
</div>

<div style="text-align: center; color: #6b7280;">v</div>

<!-- Redis -->
<div style="background: linear-gradient(135deg, #3d1f1f 0%, #4d2f2f 100%); border-radius: 8px; padding: 14px; border: 1px solid #ef4444;">
<div style="color: #ef4444; font-weight: bold; font-size: 12px; margin-bottom: 8px; text-align: center;">REDIS</div>
<div style="color: #fecaca; font-size: 10px; font-family: monospace; line-height: 1.8;">
GEOADD partners:active lng lat partner_id<br/>
HSET partner:{id}:location lat lng timestamp speed<br/>
<span style="color: #fbbf24;">TTL: 60 seconds (offline if no update)</span>
</div>
</div>

<div style="text-align: center; color: #6b7280;">v (Publish location changes)</div>

<!-- Kafka -->
<div style="background: linear-gradient(135deg, #1f1f1f 0%, #2f2f2f 100%); border-radius: 8px; padding: 14px; border: 1px solid #fbbf24;">
<div style="color: #fbbf24; font-weight: bold; font-size: 12px; margin-bottom: 8px; text-align: center;">KAFKA</div>
<div style="color: #fef3c7; font-size: 10px;">
Topic: partner.locations<br/><br/>
<span style="font-weight: bold;">Consumers:</span> ETA Calculator | Customer Tracker | Analytics
</div>
</div>

</div>

</div>

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

<div style="color: #a855f7; font-weight: bold; font-size: 16px; text-align: center; margin-bottom: 20px;">DUNZO MULTI-CITY ARCHITECTURE</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; border: 2px solid #6b7280;">

<!-- Global Layer -->
<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 10px; padding: 16px; border: 2px solid #3b82f6; margin-bottom: 16px;">
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 12px;">GLOBAL LAYER</div>
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #60a5fa;">
<div style="color: #60a5fa; font-size: 11px; font-weight: bold;">User Service</div>
</div>
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #22c55e;">
<div style="color: #22c55e; font-size: 11px; font-weight: bold;">Payment Service</div>
</div>
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #f97316;">
<div style="color: #f97316; font-size: 11px; font-weight: bold;">Marketing Service</div>
</div>
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #ec4899;">
<div style="color: #ec4899; font-size: 11px; font-weight: bold;">Merchant Platform</div>
</div>
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #eab308;">
<div style="color: #eab308; font-size: 11px; font-weight: bold;">Partner Platform</div>
</div>
<div style="background: #0d1117; border-radius: 6px; padding: 8px 14px; border: 1px solid #a855f7;">
<div style="color: #a855f7; font-size: 11px; font-weight: bold;">Analytics Platform</div>
</div>
</div>
</div>

<div style="text-align: center; color: #6b7280; margin: 12px 0;">|</div>

<!-- City Clusters -->
<div style="background: linear-gradient(135deg, #2d1f3d 0%, #3d2f4d 100%); border-radius: 10px; padding: 16px; border: 2px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 12px;">CITY CLUSTERS</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #22c55e; min-width: 120px; text-align: center;">
<div style="color: #22c55e; font-weight: bold; font-size: 12px; margin-bottom: 6px;">BANGALORE</div>
<div style="color: #bbf7d0; font-size: 10px; line-height: 1.6;">Order | Dispatch | Track</div>
<div style="color: #4ade80; font-size: 10px; margin-top: 6px; font-weight: bold;">15K partners</div>
</div>

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #f97316; min-width: 120px; text-align: center;">
<div style="color: #f97316; font-weight: bold; font-size: 12px; margin-bottom: 6px;">MUMBAI</div>
<div style="color: #fed7aa; font-size: 10px; line-height: 1.6;">Order | Dispatch | Track</div>
<div style="color: #fb923c; font-size: 10px; margin-top: 6px; font-weight: bold;">12K partners</div>
</div>

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #3b82f6; min-width: 120px; text-align: center;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 6px;">DELHI</div>
<div style="color: #bfdbfe; font-size: 10px; line-height: 1.6;">Order | Dispatch | Track</div>
<div style="color: #60a5fa; font-size: 10px; margin-top: 6px; font-weight: bold;">10K partners</div>
</div>

</div>
</div>

</div>

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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="color: #f97316; font-weight: bold; margin-bottom: 12px;">Challenge: Multiple dispatchers trying to assign same partner</div>
<div style="color: #22c55e; font-weight: bold; margin-bottom: 16px;">Solution: Distributed lock on partner</div>

<div style="color: #e5e7eb; font-weight: bold; font-size: 13px; text-align: center; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #374151;">PARTNER ASSIGNMENT FLOW</div>

<div style="display: flex; flex-direction: column; gap: 10px;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 11px;">STEP 1: Acquire Lock</div>
<div style="color: #bfdbfe; font-size: 11px; font-family: monospace;">SETNX partner_lock:{id} order_id EX 30</div>
</div>

<div style="background: linear-gradient(135deg, #3d3d1f 0%, #4d4d2f 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #eab308;">
<div style="color: #eab308; font-weight: bold; font-size: 11px;">STEP 2: If Lock Acquired</div>
<div style="color: #fef9c3; font-size: 11px;">- Check partner still available<br/>- Send offer to partner app<br/>- Wait for response (30s timeout)</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 11px;">STEP 3: If Partner Accepts</div>
<div style="color: #bbf7d0; font-size: 11px;">- Create assignment<br/>- Update partner status<br/>- Release lock</div>
</div>

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #4d2f2f 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #ef4444;">
<div style="color: #ef4444; font-weight: bold; font-size: 11px;">STEP 4: If Partner Rejects/Timeout</div>
<div style="color: #fecaca; font-size: 11px;">- Release lock<br/>- Try next partner in scored list</div>
</div>

</div>

</div>

### 2. Location Update at Scale

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="color: #f97316; font-weight: bold; margin-bottom: 12px;">50K partners x 1 update/5s = 10K updates/second</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 11px; margin-bottom: 6px;">Ingestion</div>
<div style="color: #bfdbfe; font-size: 10px;">Redis Streams for high-throughput writes</div>
</div>

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 11px; margin-bottom: 6px;">Persistence</div>
<div style="color: #bbf7d0; font-size: 10px;">Batch writes to PostgreSQL every minute</div>
</div>

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #f97316;">
<div style="color: #f97316; font-weight: bold; font-size: 11px; margin-bottom: 6px;">Real-time</div>
<div style="color: #fed7aa; font-size: 10px;">Served from Redis only (hot data)</div>
</div>

<div style="background: #0d1117; border-radius: 8px; padding: 12px; border: 1px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 11px; margin-bottom: 6px;">Historical</div>
<div style="color: #e9d5ff; font-size: 10px;">TimescaleDB for time-series analytics</div>
</div>

</div>

</div>

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f39c12;">

### 1. "How do you optimize multi-stop routes?"

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

### 2. "Why not just use Google Maps routing API for everything?"

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

### 3. "How do you handle rider assignment at scale?"

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

### 4. "How do you ensure delivery partner earnings are fair and predictable?"

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

### 5. "What happens when a partner cancels mid-delivery?"

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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="color: #e5e7eb; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #374151;">TECHNOLOGY EVOLUTION TRIGGERS</div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #3b82f6;">
<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px;">PostgreSQL Location Queries -> Redis GEO</div>
</div>
<div style="color: #bfdbfe; font-size: 11px; margin-top: 6px;">
<strong>Trigger:</strong> > 100 location queries/second<br/>
<strong>Sign:</strong> Database CPU > 70% during peak
</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #22c55e;">
<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
<div style="color: #22c55e; font-weight: bold; font-size: 12px;">Simple Distance Matching -> ML-based Scoring</div>
</div>
<div style="color: #bbf7d0; font-size: 11px; margin-top: 6px;">
<strong>Trigger:</strong> > 500 partners in single city<br/>
<strong>Sign:</strong> Partner utilization variance > 40%
</div>
</div>

<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #f97316;">
<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
<div style="color: #f97316; font-weight: bold; font-size: 12px;">Google Maps API -> Self-hosted OSRM</div>
</div>
<div style="color: #fed7aa; font-size: 11px; margin-top: 6px;">
<strong>Trigger:</strong> > $5000/month in Maps API costs<br/>
<strong>Sign:</strong> Route API calls > 500K/month
</div>
</div>

<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #a855f7;">
<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
<div style="color: #a855f7; font-weight: bold; font-size: 12px;">Monolithic Dispatch -> City-sharded Services</div>
</div>
<div style="color: #e9d5ff; font-size: 11px; margin-top: 6px;">
<strong>Trigger:</strong> > 3 cities with different peak patterns<br/>
<strong>Sign:</strong> One city's surge affecting another's performance
</div>
</div>

</div>

</div>

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
| < 3 stops per route | Fixed order (P1->D1->P2->D2) | Marginal improvement not worth compute |
| Predictable routes | Pre-computed route templates | Same store -> same areas daily |
| Low-density areas | Nearest neighbor heuristic | Optimal isn't much better |

### The "$300/Month Delivery Platform" Stack

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="color: #e5e7eb; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #374151;">STARTUP STACK (Works up to 500 orders/day)</div>

<div style="display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-bottom: 16px;">

<div style="color: #60a5fa; font-size: 12px;">Frontend: React/Flutter app</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$0</div>

<div style="color: #60a5fa; font-size: 12px;">Backend: Single Node.js/Django server</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$50/mo</div>

<div style="color: #60a5fa; font-size: 12px;">Database: Managed PostgreSQL (basic)</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$50/mo</div>

<div style="color: #60a5fa; font-size: 12px;">Maps: Google Maps API (free tier + basic)</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$100/mo</div>

<div style="color: #60a5fa; font-size: 12px;">SMS/Notifications: Twilio</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$50/mo</div>

<div style="color: #60a5fa; font-size: 12px;">Hosting: Single VPS or basic cloud</div>
<div style="color: #4ade80; font-size: 12px; text-align: right;">$50/mo</div>

</div>

<div style="border-top: 1px solid #374151; padding-top: 12px; display: flex; justify-content: space-between;">
<div style="color: #fbbf24; font-weight: bold; font-size: 14px;">Total:</div>
<div style="color: #fbbf24; font-weight: bold; font-size: 14px;">~$300/month</div>
</div>

<div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">
<div style="color: #9ca3af; font-size: 11px; line-height: 1.8;">
<strong>Assignment:</strong> Manual or simple FIFO queue<br/>
<strong>Routing:</strong> Google Maps Directions API<br/>
<strong>Tracking:</strong> Store lat/lng in PostgreSQL, poll every 30s<br/>
<strong>Batching:</strong> Manual by dispatcher
</div>
</div>

</div>

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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="display: grid; gap: 16px;">

<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Before building ML-based dispatch:</div>
<div style="color: #e9d5ff; font-size: 11px; line-height: 1.8;">
- Do we have > 500 concurrent active partners?<br/>
- Is partner utilization variance > 30%?<br/>
- Do we have 3+ months of historical data?
</div>
</div>

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Before building real-time route optimization:</div>
<div style="color: #bfdbfe; font-size: 11px; line-height: 1.8;">
- Do partners regularly have 3+ stops?<br/>
- Are we losing > 5% revenue to inefficient routing?<br/>
- Do we have traffic data integration?
</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Before sharding by city:</div>
<div style="color: #bbf7d0; font-size: 11px; line-height: 1.8;">
- Do we have > 3 cities?<br/>
- Are cities in different timezones with different peaks?<br/>
- Is single database CPU > 60% at peak?
</div>
</div>

<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #f97316;">
<div style="color: #f97316; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Before building custom routing engine:</div>
<div style="color: #fed7aa; font-size: 11px; line-height: 1.8;">
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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="color: #e5e7eb; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #374151;">FAILURE MODES AND MITIGATIONS</div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #4d2f2f 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #ef4444;">
<div style="color: #ef4444; font-weight: bold; font-size: 12px;">FAILURE: Redis location cache goes down</div>
<div style="color: #fecaca; font-size: 11px; margin-top: 6px; line-height: 1.6;">
<strong>Impact:</strong> Can't find nearby partners<br/>
<strong>Mitigation:</strong> Fallback to PostgreSQL with last known locations<br/>
<strong>RTO:</strong> 30 seconds with automatic failover
</div>
</div>

<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #f97316;">
<div style="color: #f97316; font-weight: bold; font-size: 12px;">FAILURE: Partner app loses connectivity</div>
<div style="color: #fed7aa; font-size: 11px; margin-top: 6px; line-height: 1.6;">
<strong>Impact:</strong> Stale location, missed assignments<br/>
<strong>Mitigation:</strong> Offline queue, SMS fallback for critical orders<br/>
<strong>RTO:</strong> Partner reconnects or manual reassignment
</div>
</div>

<div style="background: linear-gradient(135deg, #3d3d1f 0%, #4d4d2f 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #eab308;">
<div style="color: #eab308; font-weight: bold; font-size: 12px;">FAILURE: Kafka consumer lag</div>
<div style="color: #fef9c3; font-size: 11px; margin-top: 6px; line-height: 1.6;">
<strong>Impact:</strong> Delayed order processing<br/>
<strong>Mitigation:</strong> Auto-scaling consumers, priority queue bypass<br/>
<strong>RTO:</strong> < 2 minutes with lag alerting at 1000 messages
</div>
</div>

<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 12px;">FAILURE: ML ETA model returns outliers</div>
<div style="color: #e9d5ff; font-size: 11px; margin-top: 6px; line-height: 1.6;">
<strong>Impact:</strong> Unrealistic customer expectations<br/>
<strong>Mitigation:</strong> Rule-based bounds checking, fallback to historical avg<br/>
<strong>RTO:</strong> Immediate with outlier detection
</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 14px; border-left: 3px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 12px;">FAILURE: Payment gateway timeout</div>
<div style="color: #bbf7d0; font-size: 11px; margin-top: 6px; line-height: 1.6;">
<strong>Impact:</strong> Order stuck in pending<br/>
<strong>Mitigation:</strong> Async payment, proceed with delivery on credit<br/>
<strong>RTO:</strong> Retry queue with 3x attempts over 5 minutes
</div>
</div>

</div>

</div>

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

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #1f2937 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #6b7280;">

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #3b82f6;">
<div style="color: #3b82f6; font-weight: bold; font-size: 11px;">1. ACKNOWLEDGE COMPLEXITY</div>
<div style="color: #bfdbfe; font-size: 11px; margin-top: 4px;">"This is essentially a real-time matching marketplace with geographical constraints..."</div>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #2f4d3d 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #22c55e;">
<div style="color: #22c55e; font-weight: bold; font-size: 11px;">2. START SIMPLE</div>
<div style="color: #bbf7d0; font-size: 11px; margin-top: 4px;">"For MVP, FIFO assignment with basic distance filtering handles 80% of cases..."</div>
</div>

<div style="background: linear-gradient(135deg, #4a2c1a 0%, #5a3c2a 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #f97316;">
<div style="color: #f97316; font-weight: bold; font-size: 11px;">3. IDENTIFY TRIGGERS</div>
<div style="color: #fed7aa; font-size: 11px; margin-top: 4px;">"When we hit 500+ concurrent partners, simple matching creates utilization variance..."</div>
</div>

<div style="background: linear-gradient(135deg, #3d1f5a 0%, #4d2f6a 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #a855f7;">
<div style="color: #a855f7; font-weight: bold; font-size: 11px;">4. PROPOSE EVOLUTION</div>
<div style="color: #e9d5ff; font-size: 11px; margin-top: 4px;">"Then we introduce scored matching, but keep FIFO as fallback during system stress..."</div>
</div>

<div style="background: linear-gradient(135deg, #3d3d1f 0%, #4d4d2f 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #eab308;">
<div style="color: #eab308; font-weight: bold; font-size: 11px;">5. QUANTIFY TRADE-OFFS</div>
<div style="color: #fef9c3; font-size: 11px; margin-top: 4px;">"ML routing saves ~15% distance but adds 200ms latency and requires 3 months of training data..."</div>
</div>

<div style="background: linear-gradient(135deg, #3d1f3d 0%, #4d2f4d 100%); border-radius: 8px; padding: 12px; border-left: 3px solid #ec4899;">
<div style="color: #ec4899; font-weight: bold; font-size: 11px;">6. SHOW INDUSTRY AWARENESS</div>
<div style="color: #fbcfe8; font-size: 11px; margin-top: 4px;">"This is similar to how Uber evolved from simple dispatch to their Marketplace team's algorithms..."</div>
</div>

</div>

</div>

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
