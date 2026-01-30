# Design Zepto (Quick Commerce Platform)

## Problem Statement

Design a 10-minute grocery delivery platform operating through strategically located dark stores, managing real-time inventory across thousands of SKUs, optimizing last-mile delivery with dedicated rider fleets, and predicting hyper-local demand patterns to maintain service level agreements.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff6b35;">

### Core Requirements

| Requirement | Specification | Why It Matters |
|-------------|---------------|----------------|
| **Delivery SLA** | 10 minutes from order to doorstep | Core value proposition; customer acquisition depends on this promise |
| **Dark Store Network** | Micro-fulfillment centers within 2km of customers | Enables speed; traditional warehouses cannot meet 10-min SLA |
| **Real-time Inventory** | Sub-second accuracy across 2,000-3,000 SKUs per store | Prevents overselling; maintains customer trust |
| **Order Orchestration** | Picking, packing, dispatch in under 4 minutes | Leaves 6 minutes for last-mile; the tightest constraint |
| **Delivery Assignment** | Optimal rider allocation with batching | Unit economics depend on rider utilization |
| **Demand Prediction** | Store-SKU level forecasting | Stockouts kill conversion; overstocking kills margins |

</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

### Key Assumptions (Explicitly Stated)

> **Assumption 1**: Customers value speed over selection. Dark stores stock 2,000-3,000 SKUs vs. 50,000+ in supermarkets.

> **Assumption 2**: Dense urban areas provide sufficient order density to justify dark store economics (minimum 300+ orders/day/store).

> **Assumption 3**: Dedicated rider fleet (not gig workers) is essential for reliability despite higher fixed costs.

> **Assumption 4**: Customers accept substitutions for out-of-stock items rather than order cancellation.

> **Assumption 5**: Weather, traffic, and building access time variability can be absorbed within the 10-minute promise through buffer management.

</div>

---

## Quick Commerce: The Business Model Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### What Makes Quick Commerce Different

Quick commerce fundamentally inverts traditional retail economics. Instead of optimizing for **selection breadth** (more SKUs = more customers), it optimizes for **fulfillment velocity** (faster delivery = higher willingness to pay).

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0;">
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
<h4 style="color: #a78bfa; margin: 0 0 12px 0;">Traditional E-commerce</h4>

- Large central warehouse (100,000+ sq ft)
- 50,000+ SKUs
- Next-day or same-day delivery
- Optimize for selection and price
- Low delivery cost per order
- Works for planned purchases

</div>
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #1f3d2d 0%, #1a2e1a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
<h4 style="color: #4ade80; margin: 0 0 12px 0;">Quick Commerce</h4>

- Network of dark stores (2,000-3,000 sq ft each)
- 2,000-3,000 SKUs per store
- 10-minute delivery
- Optimize for speed and convenience
- Higher delivery cost, higher margins
- Captures impulse and urgent purchases

</div>
</div>

### The Unit Economics Reality

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Per-Order Economics (Mature Market)**:

| Line Item | Amount | Notes |
|-----------|--------|-------|
| Average Order Value | INR 450 (~$5.50) | Lower than traditional grocery |
| Gross Margin on Products | INR 90 (20%) | Convenience store pricing |
| Delivery Fee | INR 25-35 | Often waived for subscription |
| Platform Fee | INR 5-10 | Small item fee for low AOV |
| **Revenue per Order** | INR 120-135 | |
| Rider Cost per Delivery | INR 35-50 | Dedicated fleet |
| Dark Store Cost per Order | INR 20-30 | Rent, staff, utilities amortized |
| Packing Materials | INR 5-8 | |
| Payment Gateway | INR 5-10 | 1-2% of transaction |
| **Cost per Order** | INR 65-98 | |
| **Contribution Margin** | INR 22-70 | Highly variable by market |

**Break-even requires**: 400+ orders/day/store at current unit economics

</div>

### The 10-Minute Promise: Latency Budget Breakdown

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #3b82f6;">
<h4 style="color: #60a5fa; margin: 0 0 20px 0; text-align: center;">10-MINUTE DELIVERY LATENCY BUDGET</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; font-weight: bold; color: #60a5fa;">0:00 - 0:30</div>
<div style="color: #94a3b8; margin-top: 8px;">Order Processing</div>
<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Payment, store assignment, picker notification</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; font-weight: bold; color: #60a5fa;">0:30 - 3:00</div>
<div style="color: #94a3b8; margin-top: 8px;">Picking & Packing</div>
<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Optimized route, scan items, quality check</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; font-weight: bold; color: #60a5fa;">3:00 - 4:00</div>
<div style="color: #94a3b8; margin-top: 8px;">Dispatch</div>
<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Rider assignment, handover, route calculation</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; font-weight: bold; color: #60a5fa;">4:00 - 10:00</div>
<div style="color: #94a3b8; margin-top: 8px;">Last-Mile Delivery</div>
<div style="font-size: 12px; color: #64748b; margin-top: 4px;">2km radius, building entry, handover</div>
</div>

</div>

<div style="margin-top: 20px; padding: 16px; background: #0f172a; border-radius: 8px;">
<strong style="color: #f59e0b;">Critical Insight:</strong> The picking phase (2.5 minutes) is the most controllable variable. Store layout optimization can reduce this to 1.5 minutes, providing crucial buffer for delivery variability.
</div>

</div>

</div>

### Interview Questions: Quick Commerce Business Model

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

#### Level 1: "How does quick commerce differ from traditional e-commerce delivery?"

**What They're Testing**: Basic understanding of the business model and value proposition.

**Strong Answer**:
> "Quick commerce inverts traditional e-commerce priorities. Traditional e-commerce optimizes for selection (50,000+ SKUs) and price, accepting longer delivery windows. Quick commerce optimizes for speed (10 minutes) and convenience, accepting limited selection (2,000-3,000 SKUs) and higher prices. The key architectural difference is distributed dark stores instead of centralized warehouses. Each dark store serves a 2km radius, enabling the 10-minute promise that's impossible from a central warehouse 20km away. The target use case is different too - planned grocery trips vs. impulse and urgent purchases like forgotten ingredients, baby supplies, or late-night cravings."

---

#### Level 2: "What happens to unit economics if average order value drops from INR 450 to INR 250?"

**What They're Testing**: Understanding of the economic sensitivities and mitigation strategies.

**Strong Answer**:
> "A drop from INR 450 to INR 250 AOV is catastrophic without intervention. Gross margin drops from ~INR 90 to ~INR 50, but delivery costs remain fixed at INR 35-50. The contribution margin becomes negative or barely positive.

> Mitigation strategies include: (1) **Minimum order value** - refuse orders below INR 199 or charge higher delivery fee; (2) **Small basket fee** - INR 30-40 surcharge for orders below threshold; (3) **Subscription model** - Zepto Pass at INR 49/month provides unlimited free delivery, locking in repeat customers with higher lifetime value; (4) **Product mix optimization** - promote higher-margin categories like ready-to-eat, private label, and fresh produce; (5) **Order batching** - deliver 2-3 nearby orders in one trip, reducing per-order delivery cost.

> The subscription model is particularly powerful - Zepto reports that Pass subscribers order 3-4x more frequently than non-subscribers, and the predictable revenue stream improves unit economics significantly."

---

#### Level 3: "Design the real-time pricing engine that adjusts delivery fees based on current demand, rider availability, and weather conditions."

**What They're Testing**: Systems design depth, algorithm design, and understanding of dynamic pricing trade-offs.

**Strong Answer**:
> "The pricing engine needs to balance three objectives: maximize revenue, maintain rider fleet utilization, and preserve customer trust.

> **Architecture**: The pricing service consumes real-time signals from multiple sources - order queue depth per store, rider GPS positions, weather API, time of day, and historical demand patterns. It runs as a stateless service with pricing calculations memoized in Redis for sub-10ms response.

> **Pricing Algorithm**:
> ```python
> def calculate_delivery_fee(store_id, customer_location, timestamp):
>     base_fee = 25  # INR
>
>     # Demand multiplier (1.0 - 2.5x)
>     queue_depth = get_order_queue_depth(store_id)
>     demand_multiplier = min(2.5, 1.0 + (queue_depth / 20) * 0.5)
>
>     # Supply multiplier (1.0 - 2.0x)
>     available_riders = get_available_riders(store_id)
>     expected_orders_next_10min = predict_demand(store_id, timestamp, window=10)
>     supply_ratio = available_riders / max(expected_orders_next_10min, 1)
>     supply_multiplier = max(1.0, 2.0 - supply_ratio)
>
>     # Weather multiplier (1.0 - 1.5x)
>     weather = get_weather(store_id)
>     weather_multiplier = 1.0 + (0.5 if weather.is_raining else 0)
>
>     # Distance multiplier (1.0 - 1.3x for edge of service area)
>     distance = haversine(store_location, customer_location)
>     distance_multiplier = 1.0 + max(0, (distance - 1.5) / 1.5) * 0.3
>
>     # Apply multipliers with cap
>     surge_fee = base_fee * demand_multiplier * supply_multiplier * weather_multiplier * distance_multiplier
>     return min(surge_fee, 99)  # Hard cap at INR 99
> ```

> **Trust Preservation**: (1) Never surge for subscription customers - they paid for predictability; (2) Show estimated delivery time increasing before showing surge pricing - customers accept 'busy' more than 'expensive'; (3) Implement price anchoring - show original price crossed out; (4) Rate limiting on price changes - maximum 2 changes per hour per zone to avoid perception of gaming.

> **Edge Cases**: (1) Store closure - route to nearest store but don't surge; (2) Citywide weather event - implement region-wide multiplier cap; (3) Flash sales creating artificial demand - exclude promotional orders from demand signal; (4) Rider strike/shortage - implement circuit breaker that stops new orders rather than infinite surge."

**Cross-references**: [[rate-limiting]](/system-design/rate-limiting), [[dynamic-pricing]](/system-design/dynamic-pricing), [[circuit-breakers]](/system-design/circuit-breakers)

</div>

---

## Dark Store Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### What Is a Dark Store?

A dark store is a micro-fulfillment center designed exclusively for online order fulfillment - no walk-in customers. The "dark" refers to the absence of a retail storefront, not the lighting.

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #3b82f6;">
<h4 style="color: #60a5fa; margin: 0 0 20px 0; text-align: center;">DARK STORE PHYSICAL LAYOUT</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">

<div style="background: #1a365d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Zone A: Fast-Moving</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Top 200 SKUs (milk, bread, eggs). Closest to packing station. 60% of picks.</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Zone B: Medium-Moving</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Next 500 SKUs. Slightly further. 25% of picks.</div>
</div>

<div style="background: #1e4d5f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Zone C: Slow-Moving</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Remaining 1,500+ SKUs. Furthest from station. 15% of picks.</div>
</div>

<div style="background: #2d3748; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Cold Storage</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Dairy, frozen, fresh produce. Temperature-controlled zones.</div>
</div>

<div style="background: #374151; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Packing Station</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">3-5 stations. Barcode scanners, bags, thermal printers.</div>
</div>

<div style="background: #4b5563; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #93c5fd;">Dispatch Bay</div>
<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Rider waiting area. Order handover. GPS device sync.</div>
</div>

</div>

<div style="margin-top: 20px; padding: 16px; background: #0f172a; border-radius: 8px;">
<strong style="color: #22c55e;">Design Principle:</strong> Layout is optimized for picker efficiency, not customer browsing. A picker should be able to fulfill a 10-item order in under 90 seconds by minimizing walking distance.
</div>

</div>

### Dark Store Placement Strategy

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Location Selection Algorithm**:

```python
class DarkStorePlacementOptimizer:
    """
    Multi-objective optimization for dark store placement.

    Trade-off: Coverage vs. Unit Economics
    - More stores = better coverage = higher fixed costs
    - Fewer stores = worse delivery times = customer churn
    """

    def score_location(self, candidate_location, existing_stores, demand_data):
        # Coverage score: How many potential customers within 2km?
        population_density = self.get_population_in_radius(candidate_location, 2.0)
        existing_coverage = self.calculate_overlap(candidate_location, existing_stores)
        coverage_score = population_density * (1 - existing_coverage)

        # Demand score: Historical order density in this area
        historical_orders = demand_data.get_orders_in_radius(candidate_location, 2.0)
        demand_score = historical_orders / population_density  # Orders per capita

        # Competition score: Proximity to competitor dark stores
        competitor_distance = self.nearest_competitor_distance(candidate_location)
        competition_score = min(1.0, competitor_distance / 3.0)  # Normalize

        # Real estate score: Rental cost vs. budget
        rent_per_sqft = self.get_rent(candidate_location)
        rent_score = max(0, 1 - (rent_per_sqft / self.max_acceptable_rent))

        # Road connectivity score: Easy rider access
        road_score = self.calculate_road_accessibility(candidate_location)

        # Weighted combination
        return (
            coverage_score * 0.30 +
            demand_score * 0.25 +
            competition_score * 0.15 +
            rent_score * 0.20 +
            road_score * 0.10
        )

    def optimize_network(self, city, target_store_count, existing_stores):
        """
        Greedy algorithm with local search refinement.

        1. Generate candidate locations (grid + high-demand areas)
        2. Iteratively add highest-scoring location
        3. After each addition, re-score remaining candidates
        4. Apply local search to fine-tune final positions
        """
        candidates = self.generate_candidates(city, resolution=500)  # 500m grid
        selected = list(existing_stores)

        while len(selected) < target_store_count:
            # Score all candidates considering current selection
            scored = [(c, self.score_location(c, selected, demand_data))
                      for c in candidates]
            best = max(scored, key=lambda x: x[1])

            selected.append(best[0])
            candidates.remove(best[0])

            # Remove candidates that would create >50% overlap
            candidates = [c for c in candidates
                          if self.calculate_overlap(c, selected) < 0.5]

        # Local search refinement
        return self.local_search_optimize(selected)
```

**Key Trade-off**: A store serving a 2km radius has ~12.5 sq km coverage. In dense urban areas, this means 50,000-200,000 potential customers. But only a fraction order frequently. The sweet spot is placing stores where order density justifies the fixed costs (~INR 3-5 lakh/month).

</div>

### Store Operations System Design

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8b5cf6;">
<h4 style="color: #a78bfa; margin: 0 0 20px 0; text-align: center;">DARK STORE OPERATIONS SYSTEM</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Store Management Service</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Store metadata (location, capacity, hours)</li>
<li>Zone configuration</li>
<li>Staff scheduling</li>
<li>Real-time status (open/closed/busy)</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Picker Management</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Picker app with optimized pick lists</li>
<li>Walking route optimization</li>
<li>Performance tracking (picks/hour)</li>
<li>Substitution authorization</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Receiving System</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Inbound shipment scheduling</li>
<li>Barcode scanning for receipt</li>
<li>Expiry date tracking</li>
<li>Put-away location assignment</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Quality Control</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Expiry monitoring (FEFO enforcement)</li>
<li>Temperature logging for cold chain</li>
<li>Damage reporting</li>
<li>Cycle count scheduling</li>
</ul>
</div>

</div>

</div>

</div>

### Interview Questions: Dark Store Architecture

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

#### Level 1: "Why use dark stores instead of partnering with existing retail stores?"

**What They're Testing**: Understanding of operational constraints and why purpose-built infrastructure matters.

**Strong Answer**:
> "Dark stores provide three critical advantages over retail partnerships:

> **1. Layout Optimization**: Dark stores are organized by pick frequency (60% of picks from 10% of SKUs in Zone A), not by customer shopping patterns. A retail store places milk at the back to force customers past other products. A dark store places milk at the front because pickers need speed, not upselling.

> **2. Operational Control**: With retail partners, you inherit their inventory accuracy (often 85-90%), their staffing constraints, and their priorities. When a retail store is busy with walk-in customers, your online orders wait. Dark stores have a single mission: fulfill online orders as fast as possible.

> **3. Predictable Capacity**: A dark store can process 500-1,000 orders/day with known throughput. Retail stores have variable capacity based on foot traffic. You can't promise 10-minute delivery if your fulfillment is contending with a Saturday afternoon shopping rush."

---

#### Level 2: "How do you handle the cold start problem when opening a dark store in a new area with no demand data?"

**What They're Testing**: Understanding of bootstrapping strategies and how to make decisions under uncertainty.

**Strong Answer**:
> "The cold start problem for dark stores has both demand-side and supply-side challenges.

> **Demand-Side Bootstrap**:
> - **Pre-launch marketing**: Acquire customer waitlist via geo-targeted ads. Convert waitlist to day-one orders with launch discounts.
> - **Partner data**: If entering a city where you already operate, extrapolate from demographically similar neighborhoods.
> - **Proxy signals**: Food delivery order density (Swiggy/Zomato), apartment density, income levels, and competitor presence all correlate with quick commerce demand.

> **Supply-Side Bootstrap**:
> - **Conservative SKU selection**: Start with 1,500 SKUs (top sellers only) instead of 2,500. Lower inventory investment, faster turns.
> - **Higher safety stock**: Accept higher inventory cost initially. Stockouts kill a new store's reputation before it starts.
> - **Hybrid sourcing**: Partner with a nearby kirana for slow-moving items. Pick from kirana when needed, avoiding inventory commitment.

> **Data Collection Strategy**:
> - First 2 weeks: Log every search query, including items not found. This reveals demand for SKUs you don't carry.
> - Track substitution acceptance rates to understand category elasticity.
> - Monitor delivery time distribution to tune zone boundaries.

> **Exit Criteria**: If daily orders remain below 150 after 8 weeks of operation with marketing support, consider closing or relocating. The fixed costs don't justify the investment."

---

#### Level 3: "Design the picker routing algorithm that generates optimal pick paths through the store, considering picking efficiency, bag weight limits, and fragile item handling."

**What They're Testing**: Algorithm design, constraint handling, and real-world operational awareness.

**Strong Answer**:
> "This is a variant of the Traveling Salesman Problem with additional constraints. Given that TSP is NP-hard and we need sub-second routing for each order, we use a zone-based heuristic with constraint layering.

> **Algorithm Design**:

> ```python
> class PickerRoutingEngine:
>     def generate_pick_route(self, order_items, store_layout):
>         # Phase 1: Categorize items by handling constraints
>         fragile = [i for i in order_items if i.is_fragile]
>         heavy = [i for i in order_items if i.weight > 2.0]  # kg
>         cold_chain = [i for i in order_items if i.requires_refrigeration]
>         standard = [i for i in order_items if i not in fragile + heavy + cold_chain]
>
>         # Phase 2: Generate bag assignments
>         bags = self.assign_to_bags(order_items, max_bag_weight=8.0)
>         # Constraint: Fragile items must be on top (packed last, picked last)
>         # Constraint: Cold items should be bagged together
>
>         # Phase 3: Generate zone-based route
>         # Visit zones in order: Zone C -> Zone B -> Zone A -> Cold Storage
>         # This ensures fragile items (often in Zone A) are picked last
>
>         route = []
>         for zone in ['C', 'B', 'A']:
>             zone_items = [i for i in order_items if i.zone == zone and not i.is_fragile]
>             # Within zone: nearest-neighbor heuristic
>             zone_route = self.nearest_neighbor_route(zone_items, store_layout)
>             route.extend(zone_route)
>
>         # Add cold storage items (picked just before packing to minimize temp exposure)
>         cold_route = self.nearest_neighbor_route(cold_chain, store_layout)
>         route.extend(cold_route)
>
>         # Add fragile items last
>         fragile_route = self.nearest_neighbor_route(fragile, store_layout)
>         route.extend(fragile_route)
>
>         return route
>
>     def assign_to_bags(self, items, max_bag_weight):
>         """
>         Bin packing with constraints:
>         - Max weight per bag: 8kg
>         - Fragile items in separate bag or on top
>         - Cold items together
>         - Heavy items at bottom
>         """
>         bags = []
>         current_bag = Bag()
>
>         # Sort: heavy -> standard -> cold -> fragile
>         sorted_items = sorted(items, key=lambda i: (
>             i.is_fragile * 100 +  # Fragile last
>             i.requires_refrigeration * 10 +  # Cold before fragile
>             -i.weight  # Heavy first within category
>         ))
>
>         for item in sorted_items:
>             if current_bag.weight + item.weight > max_bag_weight:
>                 bags.append(current_bag)
>                 current_bag = Bag()
>             current_bag.add(item)
>
>         if current_bag.items:
>             bags.append(current_bag)
>
>         return bags
> ```

> **Real-World Considerations**:
> - **Picker ergonomics**: Route should minimize backtracking. Even if an item is closer, don't send the picker backward.
> - **Aisle congestion**: During peak times, multiple pickers may be in the same aisle. The system should load-balance across aisles.
> - **Location uncertainty**: Items might not be in their designated location. Picker app should show alternative locations.
> - **Learning from deviations**: Track when pickers deviate from suggested routes. If they consistently find better paths, update the layout model.

> **Performance Target**: Route generation must complete in under 50ms to not add latency to order processing."

**Cross-references**: [[traveling-salesman]](/algorithms/tsp), [[bin-packing]](/algorithms/bin-packing), [[nearest-neighbor]](/algorithms/greedy)

</div>

---

## Delivery Optimization System

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Last-Mile Delivery: The Hidden Complexity

The "last mile" is actually the "last 50 meters" problem. Getting to the neighborhood is straightforward with Google Maps. Getting into the building, finding the right apartment, and completing the handover - that's where 40% of delivery time variability originates.

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #ef4444;">
<h4 style="color: #f87171; margin: 0 0 20px 0; text-align: center;">DELIVERY TIME VARIABILITY SOURCES</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">

<div style="background: #7f1d1d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fca5a5;">Traffic</div>
<div style="font-size: 24px; color: #fecaca; margin: 8px 0;">30%</div>
<div style="font-size: 12px; color: #fca5a5;">Predictable with historical data + real-time signals</div>
</div>

<div style="background: #7f1d1d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fca5a5;">Building Access</div>
<div style="font-size: 24px; color: #fecaca; margin: 8px 0;">25%</div>
<div style="font-size: 12px; color: #fca5a5;">Security checks, gate codes, elevator wait times</div>
</div>

<div style="background: #7f1d1d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fca5a5;">Customer Availability</div>
<div style="font-size: 24px; color: #fecaca; margin: 8px 0;">20%</div>
<div style="font-size: 12px; color: #fca5a5;">Not answering calls, wrong address, not home</div>
</div>

<div style="background: #7f1d1d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fca5a5;">Parking/Navigation</div>
<div style="font-size: 24px; color: #fecaca; margin: 8px 0;">15%</div>
<div style="font-size: 12px; color: #fca5a5;">Finding building entrance, parking bike</div>
</div>

<div style="background: #7f1d1d; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fca5a5;">Weather</div>
<div style="font-size: 24px; color: #fecaca; margin: 8px 0;">10%</div>
<div style="font-size: 12px; color: #fca5a5;">Rain reduces speed, visibility, safety</div>
</div>

</div>

</div>

### Rider Assignment Algorithm

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Multi-Objective Optimization Problem**:

```python
class RiderAssignmentService:
    """
    Optimal rider assignment considering multiple objectives:
    - Minimize customer wait time
    - Maximize rider utilization
    - Enable order batching
    - Respect rider constraints (shift end, break time)

    Design Choice: We use a scoring function rather than strict optimization
    because real-world constraints are fuzzy and change frequently.
    """

    def assign_rider(self, order, available_riders):
        if not available_riders:
            return self.queue_for_assignment(order)

        scored_riders = []
        for rider in available_riders:
            score = self.calculate_assignment_score(rider, order)
            scored_riders.append((rider, score))

        # Pick highest scoring rider
        best_rider, best_score = max(scored_riders, key=lambda x: x[1])

        # Threshold check: Don't assign if score is too low
        # This prevents bad assignments when it's better to wait
        if best_score < self.minimum_assignment_threshold:
            return self.queue_for_assignment(order)

        return self.create_assignment(best_rider, order)

    def calculate_assignment_score(self, rider, order):
        """
        Scoring function with weights tuned via A/B testing.

        Trade-off: These weights balance customer experience (speed)
        vs. operational efficiency (batching, utilization).
        """

        # Distance score: Closer riders score higher
        # Uses actual travel time, not straight-line distance
        travel_time = self.estimate_travel_time(rider.location, order.store.location)
        distance_score = max(0, 100 - travel_time * 10)  # 0-100

        # Batching opportunity: Can we combine with rider's current delivery?
        batch_score = 0
        if rider.current_order:
            # Check if this order's destination is near current order's destination
            destination_distance = haversine(
                order.delivery_location,
                rider.current_order.delivery_location
            )
            if destination_distance < 0.3:  # 300 meters
                batch_score = 30  # Significant bonus for batching
            elif destination_distance < 0.5:
                batch_score = 15

        # Efficiency score: Historical performance
        efficiency_score = rider.average_delivery_rating * 10  # 0-50

        # Shift timing penalty: Don't assign to riders near shift end
        time_until_shift_end = (rider.shift_end - now()).minutes
        if time_until_shift_end < 20:  # Less than 20 min left
            shift_penalty = -30
        elif time_until_shift_end < 10:
            shift_penalty = -50  # Strongly discourage
        else:
            shift_penalty = 0

        # Load balancing: Slight penalty for riders with many recent deliveries
        # Prevents burning out top performers
        recent_delivery_count = rider.deliveries_last_hour
        load_penalty = -2 * recent_delivery_count

        return (
            distance_score * 0.35 +
            batch_score * 0.25 +
            efficiency_score * 0.20 +
            shift_penalty +
            load_penalty
        )
```

**Key Design Decision**: We use a scoring function instead of linear programming because:
1. Constraints are soft (a rider can extend their shift if needed)
2. The problem changes continuously (new orders, rider movements)
3. Sub-second assignment is required
4. Interpretability matters for debugging

</div>

### Order Batching Strategy

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #22c55e;">
<h4 style="color: #4ade80; margin: 0 0 20px 0; text-align: center;">ORDER BATCHING DECISION MATRIX</h4>

<div style="background: #0f172a; border-radius: 8px; padding: 16px; margin-bottom: 16px;">

**When to Batch** (deliver 2 orders in one trip):

| Condition | Threshold | Rationale |
|-----------|-----------|-----------|
| Destination proximity | < 300m apart | Minimal detour time |
| Order readiness | Within 2 min of each other | Second customer doesn't wait too long |
| Combined delivery time | < 12 min total | Still within SLA buffer |
| Rider capacity | Both fit in bag | Physical constraint |
| Customer tolerance | Neither is a "premium" customer | Some customers pay for priority |

</div>

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">

**Batching Trade-offs**:

| Pro | Con |
|-----|-----|
| 30-40% reduction in per-order delivery cost | Second customer waits 2-4 minutes longer |
| Higher rider utilization | Increased complexity in routing |
| Reduced carbon footprint | Customer may see rider "going wrong way" on tracking |
| Enables profitability at lower AOV | Harder to maintain 10-minute promise |

</div>

</div>

### Real-Time Tracking System

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Architecture for Live Rider Tracking**:

```python
class RiderTrackingService:
    """
    Real-time rider location tracking and ETA updates.

    Design Choices:
    - GPS updates every 3 seconds (balance between accuracy and battery/data)
    - Kalman filter for noise reduction and trajectory prediction
    - WebSocket for customer-facing real-time updates
    - Historical data for ETA learning
    """

    def __init__(self):
        self.redis = Redis(cluster_mode=True)  # For location storage
        self.websocket_manager = WebSocketManager()  # For real-time updates
        self.kalman_filters = {}  # Per-rider Kalman filters

    def process_location_update(self, rider_id, raw_location, timestamp):
        # Apply Kalman filter for noise reduction
        if rider_id not in self.kalman_filters:
            self.kalman_filters[rider_id] = KalmanFilter2D()

        filtered_location = self.kalman_filters[rider_id].update(
            raw_location, timestamp
        )

        # Store in Redis with geospatial index
        self.redis.geoadd(
            f"rider_locations:{rider_id}",
            filtered_location.longitude,
            filtered_location.latitude,
            timestamp
        )

        # Update ETA for active orders
        active_orders = self.get_active_orders(rider_id)
        for order in active_orders:
            new_eta = self.calculate_eta(filtered_location, order.destination)
            self.update_order_eta(order.id, new_eta)

            # Push to customer via WebSocket
            self.websocket_manager.push(
                f"order:{order.id}",
                {
                    "type": "location_update",
                    "rider_location": filtered_location.to_dict(),
                    "eta_minutes": new_eta,
                    "updated_at": timestamp
                }
            )

    def calculate_eta(self, current_location, destination):
        """
        ETA calculation combining:
        1. Google Maps distance/time estimate
        2. Historical actual travel times for this route
        3. Current traffic conditions
        4. Building-specific access time (learned from past deliveries)
        """

        # Base estimate from Maps API (cached)
        maps_eta = self.maps_client.get_eta(current_location, destination)

        # Historical adjustment factor for this neighborhood
        historical_factor = self.get_historical_eta_factor(
            destination.neighborhood_id
        )

        # Building-specific access time
        building_access_time = self.get_building_access_time(
            destination.building_id
        ) or 2.0  # Default 2 minutes if unknown

        # Current traffic adjustment
        traffic_factor = self.get_current_traffic_factor(
            current_location, destination
        )

        adjusted_eta = (
            maps_eta * historical_factor * traffic_factor +
            building_access_time
        )

        # Add buffer for uncertainty (reduces as rider gets closer)
        distance_km = haversine(current_location, destination)
        buffer = max(0.5, distance_km * 0.5)  # 30 seconds per km

        return adjusted_eta + buffer
```

**GPS Accuracy Challenges**:

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Urban canyon effect | GPS shows rider in wrong lane | Kalman filter + map matching |
| Indoor signal loss | Location "jumps" when entering buildings | Use last known outdoor location + time estimate |
| Battery optimization | OS throttles GPS updates | Request high-accuracy mode for active deliveries |
| Spoofing attempts | Fake location to appear faster | Cross-reference with expected trajectory, accelerometer |

</div>

</div>

### Interview Questions: Delivery Optimization

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

#### Level 1: "How do you assign orders to riders?"

**What They're Testing**: Basic understanding of matching algorithms and the factors involved.

**Strong Answer**:
> "Rider assignment is a real-time matching problem optimizing for multiple objectives. The primary factors are: (1) **Distance to store** - riders closer to the store can pick up faster; (2) **Current workload** - can we batch this order with the rider's existing delivery?; (3) **Rider performance** - historical on-time rate and customer ratings; (4) **Shift constraints** - avoid assigning to riders near shift end.

> We use a scoring function that weights these factors, tuned through A/B testing. The system runs continuously, re-evaluating assignments as new orders come in and rider positions change. If no rider scores above a threshold, we queue the order briefly rather than making a poor assignment."

---

#### Level 2: "How do you handle the scenario where your predicted ETA is consistently wrong for a specific neighborhood?"

**What They're Testing**: Understanding of feedback loops, learning systems, and handling systematic errors.

**Strong Answer**:
> "Systematic ETA errors indicate our model is missing a local factor. The debugging process would be:

> **1. Data Analysis**:
> - Compare predicted vs. actual for this neighborhood over past 2 weeks
> - Break down by time of day, day of week, weather conditions
> - Check if error is consistent or variable

> **2. Root Cause Investigation**:
> - Traffic patterns not captured by Google Maps (school pickup, market hours)
> - Building access times (new gated community with strict security)
> - Road conditions not in maps (construction, one-ways changed)
> - Parking constraints (no two-wheeler parking, must walk)

> **3. Model Adjustment**:
> - Add neighborhood-level adjustment factor: `eta = base_eta * neighborhood_factor`
> - Factor starts at 1.0, adjusts based on rolling 7-day error average
> - Separate factors for peak vs. off-peak if error patterns differ

> **4. Feedback Loop**:
> ```python
> def update_neighborhood_factor(neighborhood_id, predicted, actual):
>     error_ratio = actual / predicted
>     current_factor = get_factor(neighborhood_id)
>     # Exponential moving average with alpha=0.1
>     new_factor = current_factor * 0.9 + error_ratio * 0.1
>     set_factor(neighborhood_id, new_factor)
> ```

> **5. Alerting**: Set up alerts when a neighborhood's error exceeds 20% for more than 3 days. This catches new issues before they become systematic."

---

#### Level 3: "Design a system that dynamically adjusts the delivery radius of each dark store based on real-time rider availability, traffic conditions, and order volume."

**What They're Testing**: Complex adaptive systems design, multiple feedback loops, and edge case handling.

**Strong Answer**:
> "Dynamic delivery radius is a powerful lever for balancing customer experience and operational efficiency. The system needs to answer: 'For this store, right now, how far can we reliably deliver in 10 minutes?'

> **System Architecture**:

> ```python
> class DynamicRadiusService:
>     def __init__(self):
>         self.default_radius = 2.0  # km
>         self.min_radius = 1.0  # Never go below this
>         self.max_radius = 3.0  # Never exceed this
>
>     def calculate_current_radius(self, store_id):
>         # Collect real-time signals
>         rider_count = self.get_available_riders(store_id)
>         order_queue_depth = self.get_pending_orders(store_id)
>         avg_delivery_time_last_hour = self.get_recent_delivery_times(store_id)
>         traffic_index = self.get_traffic_index(store_id)  # 1.0 = normal
>
>         # Rider supply constraint
>         riders_per_pending_order = rider_count / max(order_queue_depth, 1)
>         if riders_per_pending_order < 0.5:
>             supply_factor = 0.7  # Contract radius
>         elif riders_per_pending_order > 2.0:
>             supply_factor = 1.2  # Expand radius
>         else:
>             supply_factor = 1.0
>
>         # Delivery time feedback
>         if avg_delivery_time_last_hour > 9.0:  # Cutting it close
>             time_factor = 0.85
>         elif avg_delivery_time_last_hour < 7.0:  # Plenty of buffer
>             time_factor = 1.1
>         else:
>             time_factor = 1.0
>
>         # Traffic adjustment
>         traffic_factor = 1.0 / traffic_index  # Higher traffic = smaller radius
>
>         # Calculate new radius
>         new_radius = (
>             self.default_radius *
>             supply_factor *
>             time_factor *
>             traffic_factor
>         )
>
>         # Apply bounds
>         new_radius = max(self.min_radius, min(self.max_radius, new_radius))
>
>         # Smooth changes to avoid oscillation
>         current_radius = self.get_current_radius(store_id)
>         smoothed_radius = current_radius * 0.7 + new_radius * 0.3
>
>         return smoothed_radius
>
>     def get_serviceable_stores(self, customer_location):
>         """
>         Return stores that can serve this customer location.
>         Called during checkout to determine store assignment.
>         """
>         nearby_stores = self.find_stores_within_max_radius(
>             customer_location, self.max_radius
>         )
>
>         serviceable = []
>         for store in nearby_stores:
>             distance = haversine(customer_location, store.location)
>             current_radius = self.calculate_current_radius(store.id)
>
>             if distance <= current_radius:
>                 serviceable.append({
>                     'store': store,
>                     'distance': distance,
>                     'headroom': current_radius - distance
>                 })
>
>         # Sort by headroom (prefer stores with more buffer)
>         return sorted(serviceable, key=lambda x: -x['headroom'])
> ```

> **Edge Cases**:
> - **Rapid contraction**: If radius shrinks significantly, customers with items in cart may suddenly be unserviceable. Solution: Honor the radius that was shown at add-to-cart time for 15 minutes.
> - **Expansion while understaffed**: Don't expand if rider availability is trending down (shift changes). Use 30-minute forward-looking prediction.
> - **Store boundary overlap**: When one store contracts, ensure nearby store can absorb demand before orphaning customers.
> - **Customer communication**: Show 'Currently delivering to your area' badge. If radius contracts and customer is now outside, show 'Temporarily unavailable' rather than removing from app entirely.

> **Monitoring**: Track (1) radius changes per hour (should be smooth, not spiky), (2) percentage of customers affected by radius changes, (3) correlation between radius changes and delivery time performance."

**Cross-references**: [[adaptive-systems]](/system-design/adaptive-systems), [[feedback-loops]](/system-design/feedback-loops), [[service-availability]](/system-design/availability)

</div>

---

## Inventory Management System

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### The Inventory Accuracy Challenge

Inventory accuracy is the silent killer of quick commerce. A customer adds items to cart, completes checkout, and then receives a "sorry, out of stock" message because the system showed availability that didn't exist physically. This destroys trust and conversion.

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #f59e0b;">
<h4 style="color: #fbbf24; margin: 0 0 20px 0; text-align: center;">INVENTORY ACCURACY SOURCES OF ERROR</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">

<div style="background: #78350f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fde68a;">Receiving Errors</div>
<div style="font-size: 13px; color: #fcd34d; margin-top: 8px;">Shipment says 100 units, actual is 98. If not caught at receiving, error persists forever.</div>
</div>

<div style="background: #78350f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fde68a;">Picking Errors</div>
<div style="font-size: 13px; color: #fcd34d; margin-top: 8px;">Picker takes wrong item or wrong quantity. System decrements wrong SKU.</div>
</div>

<div style="background: #78350f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fde68a;">Shrinkage</div>
<div style="font-size: 13px; color: #fcd34d; margin-top: 8px;">Theft, damage, spoilage. Items disappear without system record.</div>
</div>

<div style="background: #78350f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fde68a;">Returns Processing</div>
<div style="font-size: 13px; color: #fcd34d; margin-top: 8px;">Returned items may not be added back to inventory immediately or correctly.</div>
</div>

<div style="background: #78350f; border-radius: 8px; padding: 16px;">
<div style="font-weight: bold; color: #fde68a;">System Race Conditions</div>
<div style="font-size: 13px; color: #fcd34d; margin-top: 8px;">Two customers checking out simultaneously for last item. Both see "available."</div>
</div>

</div>

<div style="margin-top: 20px; padding: 16px; background: #451a03; border-radius: 8px;">
<strong style="color: #fbbf24;">Industry Benchmark:</strong> Retail inventory accuracy is typically 85-95%. Quick commerce needs 97%+ to maintain customer trust. The 2% gap is the difference between success and failure.
</div>

</div>

### Real-Time Inventory Architecture

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Multi-Layer Inventory System**:

```python
class InventoryService:
    """
    Three-layer inventory architecture:

    Layer 1: Redis (Real-time availability)
    - Used for: Customer-facing availability checks
    - Latency: <5ms
    - Updated: Synchronously on every inventory event

    Layer 2: PostgreSQL (Source of truth)
    - Used for: Reconciliation, reporting, audit
    - Latency: <50ms
    - Updated: Synchronously on writes, async on bulk operations

    Layer 3: Event Log (Kafka)
    - Used for: Event sourcing, replay, analytics
    - Latency: <100ms
    - Contains: Every inventory movement with full context

    Design Trade-off: We accept the complexity of three layers because:
    - Redis gives us the speed for customer-facing checks
    - PostgreSQL gives us transactional guarantees
    - Kafka gives us the ability to reconstruct state
    """

    def __init__(self):
        self.redis = Redis(cluster_mode=True)
        self.db = PostgreSQL()
        self.kafka = KafkaProducer()

    def reserve_inventory(self, store_id, sku, quantity, order_id):
        """
        Atomic inventory reservation.

        Critical: This must never oversell. We use Redis transactions
        with optimistic locking to handle concurrent reservations.
        """
        redis_key = f"inventory:{store_id}:{sku}"

        # Lua script for atomic check-and-decrement
        lua_script = """
        local available = tonumber(redis.call('HGET', KEYS[1], 'available'))
        local requested = tonumber(ARGV[1])

        if available >= requested then
            redis.call('HINCRBY', KEYS[1], 'available', -requested)
            redis.call('HINCRBY', KEYS[1], 'reserved', requested)
            return 1
        else
            return 0
        end
        """

        result = self.redis.eval(lua_script, keys=[redis_key], args=[quantity])

        if result == 0:
            raise InsufficientInventoryError(store_id, sku, quantity)

        # Persist to database (can be async for performance)
        self.db.execute("""
            UPDATE inventory
            SET available = available - %s,
                reserved = reserved + %s,
                updated_at = NOW()
            WHERE store_id = %s AND sku = %s
        """, [quantity, quantity, store_id, sku])

        # Emit event for downstream consumers
        self.kafka.send('inventory.events', {
            'type': 'inventory_reserved',
            'store_id': store_id,
            'sku': sku,
            'quantity': quantity,
            'order_id': order_id,
            'timestamp': datetime.utcnow().isoformat(),
            'new_available': self.redis.hget(redis_key, 'available'),
            'new_reserved': self.redis.hget(redis_key, 'reserved')
        })

        return True

    def handle_pick_completion(self, store_id, sku, quantity, order_id):
        """
        Called when picker physically picks items.
        Converts reserved -> picked (inventory leaves the building).
        """
        redis_key = f"inventory:{store_id}:{sku}"

        # Move from reserved to picked
        lua_script = """
        local reserved = tonumber(redis.call('HGET', KEYS[1], 'reserved'))
        local requested = tonumber(ARGV[1])

        if reserved >= requested then
            redis.call('HINCRBY', KEYS[1], 'reserved', -requested)
            return 1
        else
            return 0
        end
        """

        result = self.redis.eval(lua_script, keys=[redis_key], args=[quantity])

        if result == 0:
            # Discrepancy: reservation existed but reserved count is off
            self.handle_inventory_discrepancy(store_id, sku, order_id)
            return False

        # Persist and emit event
        self.db.execute("""
            UPDATE inventory
            SET reserved = reserved - %s
            WHERE store_id = %s AND sku = %s
        """, [quantity, store_id, sku])

        self.kafka.send('inventory.events', {
            'type': 'inventory_picked',
            'store_id': store_id,
            'sku': sku,
            'quantity': quantity,
            'order_id': order_id,
            'timestamp': datetime.utcnow().isoformat()
        })

        return True

    def handle_inventory_discrepancy(self, store_id, sku, order_id):
        """
        Called when picker cannot find item that was reserved.

        This is a critical path: customer is waiting, order is in progress.
        """
        # Log the discrepancy for later investigation
        self.kafka.send('inventory.discrepancies', {
            'store_id': store_id,
            'sku': sku,
            'order_id': order_id,
            'timestamp': datetime.utcnow().isoformat(),
            'type': 'pick_failure'
        })

        # Trigger cycle count for this SKU
        self.schedule_immediate_cycle_count(store_id, sku)

        # Initiate substitution flow
        return self.find_substitution(store_id, sku, order_id)
```

</div>

### Inventory Events and State Machine

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #3b82f6;">
<h4 style="color: #60a5fa; margin: 0 0 20px 0; text-align: center;">INVENTORY STATE TRANSITIONS</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #93c5fd; margin: 0 0 12px 0;">Inbound Flow</h5>
<div style="font-size: 13px; color: #94a3b8;">
<div style="margin-bottom: 8px;"><strong>ORDERED</strong>: PO created with supplier</div>
<div style="margin-bottom: 8px;"><strong>IN_TRANSIT</strong>: Shipment dispatched</div>
<div style="margin-bottom: 8px;"><strong>RECEIVED</strong>: Scanned at dark store</div>
<div style="margin-bottom: 8px;"><strong>PUTAWAY</strong>: Placed in storage location</div>
<div><strong>AVAILABLE</strong>: Ready for customer orders</div>
</div>
</div>

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #93c5fd; margin: 0 0 12px 0;">Outbound Flow</h5>
<div style="font-size: 13px; color: #94a3b8;">
<div style="margin-bottom: 8px;"><strong>AVAILABLE</strong>: Can be ordered</div>
<div style="margin-bottom: 8px;"><strong>RESERVED</strong>: Held for specific order</div>
<div style="margin-bottom: 8px;"><strong>PICKED</strong>: Physically removed from shelf</div>
<div style="margin-bottom: 8px;"><strong>PACKED</strong>: In delivery bag</div>
<div><strong>DELIVERED</strong>: With customer (terminal)</div>
</div>
</div>

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #93c5fd; margin: 0 0 12px 0;">Exception Flows</h5>
<div style="font-size: 13px; color: #94a3b8;">
<div style="margin-bottom: 8px;"><strong>RESERVED -> AVAILABLE</strong>: Order cancelled, release reservation</div>
<div style="margin-bottom: 8px;"><strong>AVAILABLE -> DAMAGED</strong>: Found during pick, write off</div>
<div style="margin-bottom: 8px;"><strong>AVAILABLE -> EXPIRED</strong>: Past sell-by date</div>
<div style="margin-bottom: 8px;"><strong>DELIVERED -> AVAILABLE</strong>: Customer return (if sellable)</div>
<div><strong>DELIVERED -> DAMAGED</strong>: Customer return (if not sellable)</div>
</div>
</div>

</div>

</div>

### Cycle Counting and Reconciliation

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Continuous Cycle Count Strategy**:

```python
class CycleCountService:
    """
    Cycle counting maintains inventory accuracy without full physical inventory.

    Strategy: ABC analysis-based frequency
    - A items (top 20% by velocity): Count weekly
    - B items (next 30%): Count bi-weekly
    - C items (bottom 50%): Count monthly

    Plus: Triggered counts for high-discrepancy SKUs
    """

    def schedule_daily_counts(self, store_id):
        """
        Generate daily count list balancing workload and accuracy needs.
        Target: 100-150 SKUs per day = full inventory every 2-3 weeks.
        """
        today = date.today()

        # Get SKUs due for counting
        due_for_count = self.db.query("""
            SELECT sku,
                   abc_class,
                   last_count_date,
                   discrepancy_rate
            FROM inventory
            WHERE store_id = %s
            AND (
                (abc_class = 'A' AND last_count_date < %s) OR
                (abc_class = 'B' AND last_count_date < %s) OR
                (abc_class = 'C' AND last_count_date < %s) OR
                discrepancy_rate > 0.05  -- Force count if >5% discrepancy
            )
            ORDER BY
                discrepancy_rate DESC,  -- High discrepancy first
                abc_class ASC,          -- A before B before C
                last_count_date ASC     -- Oldest count first
            LIMIT 150
        """, [
            store_id,
            today - timedelta(days=7),   # A: weekly
            today - timedelta(days=14),  # B: bi-weekly
            today - timedelta(days=30)   # C: monthly
        ])

        return due_for_count

    def process_count_result(self, store_id, sku, system_qty, physical_qty, counter_id):
        """
        Handle cycle count result and update inventory.
        """
        variance = physical_qty - system_qty
        variance_pct = abs(variance) / max(system_qty, 1)

        # Record count
        self.db.execute("""
            INSERT INTO cycle_counts
            (store_id, sku, system_qty, physical_qty, variance, counter_id, counted_at)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
        """, [store_id, sku, system_qty, physical_qty, variance, counter_id])

        if variance != 0:
            # Adjust inventory
            self.inventory_service.adjust_inventory(
                store_id, sku, variance,
                reason='cycle_count',
                reference_id=count_id
            )

            # Update discrepancy rate (exponential moving average)
            self.db.execute("""
                UPDATE inventory
                SET discrepancy_rate = discrepancy_rate * 0.8 + %s * 0.2,
                    last_count_date = NOW()
                WHERE store_id = %s AND sku = %s
            """, [variance_pct, store_id, sku])

            # Alert if variance is significant
            if variance_pct > 0.1:
                self.alert_service.send(
                    f"High inventory variance: {store_id}/{sku} "
                    f"system={system_qty} physical={physical_qty}"
                )
        else:
            # Update last count date even if no variance
            self.db.execute("""
                UPDATE inventory
                SET last_count_date = NOW()
                WHERE store_id = %s AND sku = %s
            """, [store_id, sku])
```

</div>

</div>

### Interview Questions: Inventory Management

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

#### Level 1: "How do you prevent overselling when multiple customers try to buy the last item simultaneously?"

**What They're Testing**: Understanding of concurrent access, atomic operations, and distributed systems basics.

**Strong Answer**:
> "Overselling is a classic race condition problem. If two customers simultaneously check availability, both see '1 available,' and both proceed to checkout, we've sold 2 of something we only have 1 of.

> The solution is atomic check-and-decrement using Redis. Instead of read-modify-write as separate operations, we use a Lua script that executes atomically:
> ```lua
> local available = redis.call('GET', key)
> if available >= requested then
>     redis.call('DECRBY', key, requested)
>     return 1
> end
> return 0
> ```

> This guarantees that the check and decrement happen as a single atomic operation. The second customer's request will fail because by the time it executes, available is already 0.

> We choose optimistic locking over pessimistic locks because checkout volume is high and lock contention would create bottlenecks. The rare collision is better handled by graceful failure than by blocking all customers."

---

#### Level 2: "What do you do when the picker goes to the shelf and the item isn't there, but the system shows it as available?"

**What They're Testing**: Understanding of system-reality discrepancies, graceful degradation, and customer experience under failure.

**Strong Answer**:
> "This is the inventory discrepancy scenario, and it's frustratingly common - typically 2-3% of picks encounter this in a well-run operation.

> **Immediate Response** (customer waiting):
> 1. Picker marks item as 'not found' in their app
> 2. System immediately releases the reservation (makes item unavailable for future orders)
> 3. Substitution engine activates: find similar item (same brand different size, different brand same product, etc.)
> 4. Customer is notified via push notification with substitution options
> 5. Customer has 60 seconds to accept, reject, or modify
> 6. If no response, apply default preference (customer can pre-set to 'always substitute' or 'never substitute')

> **Background Response** (fix the root cause):
> 1. Log the discrepancy event with full context (SKU, location, picker ID, time)
> 2. Increment discrepancy counter for this SKU
> 3. If discrepancy rate exceeds threshold (>5% of picks), schedule immediate physical count
> 4. If multiple pickers report same SKU missing, investigate for theft or receiving error

> **System Adjustment**:
> 1. Set system inventory to 0 (or count from last known good state)
> 2. Trigger replenishment order if this is a popular item
> 3. Update the SKU's 'reliability score' which affects how we buffer safety stock

> The key insight is that we cannot prevent all discrepancies, but we can minimize customer impact through fast substitution and learn from patterns to prevent recurrence."

---

#### Level 3: "Design an inventory system that can handle a sudden 10x spike in order volume during a flash sale without overselling or becoming unavailable."

**What They're Testing**: Scalability under load, graceful degradation strategies, and understanding of system limits.

**Strong Answer**:
> "A 10x spike is a realistic scenario for flash sales or festival shopping. The inventory system must handle this without overselling (correctness) or timing out (availability). Here's the architecture:

> **Pre-Sale Preparation**:
> ```python
> class FlashSalePreparation:
>     def prepare_inventory_for_sale(self, sale_id, expected_multiplier=10):
>         sale_items = self.get_sale_items(sale_id)
>
>         for item in sale_items:
>             # Pre-warm Redis with inventory counts
>             self.redis.set(
>                 f'flash_inventory:{sale_id}:{item.sku}',
>                 item.allocated_quantity
>             )
>
>             # Set up rate limiting per SKU to prevent one item from monopolizing
>             self.redis.set(
>                 f'flash_rate_limit:{sale_id}:{item.sku}',
>                 item.max_orders_per_second
>             )
>
>         # Pre-scale Redis cluster
>         self.redis.add_read_replicas(count=expected_multiplier // 3)
>
>         # Pre-scale inventory service
>         self.k8s.scale_deployment('inventory-service', replicas=expected_multiplier)
> ```

> **During Sale - Reservation Flow**:
> ```python
> class FlashSaleInventoryService:
>     def reserve_flash_item(self, sale_id, sku, quantity, customer_id):
>         # Layer 1: Rate limiting (prevents thundering herd)
>         rate_key = f'flash_rate_limit:{sale_id}:{sku}'
>         if not self.rate_limiter.acquire(rate_key):
>             raise TooManyRequestsError('Please try again')
>
>         # Layer 2: Customer purchase limit
>         customer_key = f'flash_customer:{sale_id}:{customer_id}:{sku}'
>         purchased = self.redis.incr(customer_key)
>         if purchased > MAX_PER_CUSTOMER:
>             raise PurchaseLimitExceeded()
>
>         # Layer 3: Atomic reservation from dedicated flash pool
>         inventory_key = f'flash_inventory:{sale_id}:{sku}'
>         lua_script = '''
>         local available = tonumber(redis.call('GET', KEYS[1]))
>         if available and available >= tonumber(ARGV[1]) then
>             redis.call('DECRBY', KEYS[1], ARGV[1])
>             return redis.call('GET', KEYS[1])
>         end
>         return -1
>         '''
>         remaining = self.redis.eval(lua_script, keys=[inventory_key], args=[quantity])
>
>         if remaining < 0:
>             raise SoldOutError()
>
>         # Layer 4: Async write to persistent store (fire and forget during peak)
>         self.kafka.send('flash_reservations', {
>             'sale_id': sale_id,
>             'sku': sku,
>             'quantity': quantity,
>             'customer_id': customer_id,
>             'timestamp': time.time()
>         })
>
>         return {'remaining': remaining, 'reserved': quantity}
> ```

> **Graceful Degradation Strategies**:
> 1. **Read-only mode**: If writes fail, stop accepting new orders but let users browse
> 2. **Queue-based checkout**: Instead of immediate confirmation, queue orders and process at sustainable rate
> 3. **Feature shedding**: Disable substitutions, recommendations, and other non-essential features
> 4. **Regional isolation**: If Mumbai is struggling, don't let it affect Delhi inventory service

> **Post-Sale Reconciliation**:
> Flash inventory pool must be reconciled with main inventory within 1 hour of sale end. Kafka events are replayed to PostgreSQL to ensure source of truth is updated.

> **Key Trade-off**: During flash sale, we prioritize availability over immediate consistency. We might show 'sold out' to a customer even if there's actually 1 unit left (conservative), but we will never show 'available' when it's actually sold out (would cause oversell)."

**Cross-references**: [[rate-limiting]](/system-design/rate-limiting), [[redis-transactions]](/databases/redis-transactions), [[event-sourcing]](/system-design/event-sourcing)

</div>

---

## Demand Prediction System

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Why Demand Prediction Matters

In quick commerce, the cost of being wrong about demand is asymmetric and severe:

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0;">
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
<h4 style="color: #fca5a5; margin: 0 0 12px 0;">Understock (Stockout)</h4>

- Lost sale (INR 450 average)
- Lost customer lifetime value (10-20x single order)
- Negative review / word of mouth
- Competitor gains the customer
- **Cost: INR 5,000-10,000 per incident**

</div>
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #78350f 0%, #451a03 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
<h4 style="color: #fcd34d; margin: 0 0 12px 0;">Overstock</h4>

- Working capital tied up
- Storage space consumed
- Expiry risk (especially fresh/dairy)
- Markdown/write-off
- **Cost: 20-100% of product cost**

</div>
</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**The Forecasting Challenge**:

Quick commerce forecasting is harder than traditional retail because:

| Factor | Traditional Retail | Quick Commerce |
|--------|-------------------|----------------|
| **Time granularity** | Weekly/Monthly | Daily/Hourly |
| **Spatial granularity** | Store (5,000+ sq ft) | Dark store (2,000 sq ft) |
| **SKU count** | 50,000+ | 2,000-3,000 |
| **Demand volatility** | Low (smoothed by volume) | High (small base, big swings) |
| **Lead time** | Days/Weeks | Hours |
| **Data history** | Years | Months (new stores) |

</div>

### Forecasting Architecture

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #8b5cf6;">
<h4 style="color: #a78bfa; margin: 0 0 20px 0; text-align: center;">DEMAND FORECASTING SYSTEM</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Data Collection Layer</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Historical sales (store x SKU x day)</li>
<li>Search queries (demand signal)</li>
<li>Cart additions (intent signal)</li>
<li>Stockout events (suppressed demand)</li>
<li>Weather forecasts</li>
<li>Local events calendar</li>
<li>Holiday calendar</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Feature Engineering</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Day of week encoding</li>
<li>Time since last purchase (per customer)</li>
<li>Promotional flag</li>
<li>Price change indicator</li>
<li>Stock level (demand suppression)</li>
<li>Competitor promotions</li>
<li>Neighborhood demographics</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Model Selection</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>High velocity SKUs</strong>: LightGBM with lag features</li>
<li><strong>Medium velocity</strong>: Prophet for trend + seasonality</li>
<li><strong>Low velocity</strong>: Poisson regression / simple averages</li>
<li><strong>New SKUs</strong>: Transfer learning from similar products</li>
</ul>
</div>

<div style="background: #1e1b4b; border-radius: 12px; padding: 16px;">
<h5 style="color: #c4b5fd; margin: 0 0 12px 0;">Output & Actions</h5>
<ul style="color: #94a3b8; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Point forecast (expected demand)</li>
<li>Prediction interval (uncertainty)</li>
<li>Recommended order quantity</li>
<li>Safety stock level</li>
<li>Reorder trigger point</li>
</ul>
</div>

</div>

</div>

### Forecasting Model Implementation

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

```python
class DemandForecastingService:
    """
    Multi-model demand forecasting system.

    Design Philosophy:
    - Simple models first, complex models where needed
    - Ensemble for robustness
    - Explicit uncertainty quantification
    - Human-in-the-loop for anomaly handling
    """

    def __init__(self):
        self.model_registry = ModelRegistry()
        self.feature_store = FeatureStore()
        self.event_calendar = EventCalendar()

    def forecast_demand(self, store_id, sku, horizon_days=7):
        """
        Generate demand forecast for store-SKU combination.

        Returns:
            - point_forecast: Expected daily demand
            - lower_bound: 10th percentile (pessimistic)
            - upper_bound: 90th percentile (optimistic)
            - confidence: Model confidence score
        """
        # Get historical data
        history = self.get_sales_history(store_id, sku, lookback_days=90)

        # Select model based on SKU velocity
        avg_daily_sales = sum(history) / len(history)
        if avg_daily_sales > 10:
            model = self.model_registry.get('lightgbm_high_velocity')
        elif avg_daily_sales > 2:
            model = self.model_registry.get('prophet_medium_velocity')
        else:
            model = self.model_registry.get('poisson_low_velocity')

        # Build feature set
        features = self.feature_store.get_features(store_id, sku, horizon_days)

        # Add event flags
        for day in range(horizon_days):
            forecast_date = date.today() + timedelta(days=day)
            features[f'day_{day}_event'] = self.event_calendar.get_event(
                store_id, forecast_date
            )

        # Generate forecast
        forecast = model.predict(features, horizon_days)

        # Adjust for known factors
        forecast = self.apply_adjustments(forecast, store_id, sku)

        # Calculate prediction intervals
        lower, upper = self.calculate_prediction_interval(
            model, features, confidence=0.8
        )

        return {
            'point_forecast': forecast,
            'lower_bound': lower,
            'upper_bound': upper,
            'confidence': model.get_confidence(features),
            'model_used': model.name
        }

    def apply_adjustments(self, base_forecast, store_id, sku):
        """
        Apply rule-based adjustments for known factors.

        These adjustments capture domain knowledge that ML might miss:
        - First-of-month salary effect
        - End-of-month budget constraints
        - School holidays
        - IPL match nights
        """
        adjusted = base_forecast.copy()

        for i, date in enumerate(base_forecast.index):
            multiplier = 1.0

            # First week of month: 20% higher demand
            if date.day <= 7:
                multiplier *= 1.2

            # Last week of month: 10% lower demand
            if date.day >= 25:
                multiplier *= 0.9

            # Weekend adjustment
            if date.weekday() >= 5:
                multiplier *= self.get_weekend_factor(sku)

            # Weather adjustment
            weather = self.weather_service.get_forecast(store_id, date)
            if weather.is_rainy:
                # Rainy days: lower traffic but higher conversion
                multiplier *= 0.9

            adjusted.iloc[i] *= multiplier

        return adjusted

    def calculate_reorder_quantity(self, store_id, sku, forecast):
        """
        Convert demand forecast into actionable reorder quantity.

        Uses newsvendor model with asymmetric costs:
        - Cost of understocking (lost sale + customer loss)
        - Cost of overstocking (working capital + spoilage)
        """
        # Get cost parameters
        product = self.catalog.get_product(sku)

        # Cost of understocking: lost margin + customer lifetime value impact
        cost_understock = product.margin + (product.price * 0.1)  # 10% CLV impact

        # Cost of overstocking: carrying cost + spoilage risk
        days_to_expiry = product.shelf_life_days
        spoilage_risk = max(0, (30 - days_to_expiry) / 30)  # Higher for short shelf life
        cost_overstock = product.cost * (0.02 + spoilage_risk * 0.3)  # 2% carrying + spoilage

        # Critical ratio for newsvendor
        critical_ratio = cost_understock / (cost_understock + cost_overstock)

        # Find quantity where P(demand <= Q) = critical_ratio
        # Using forecast uncertainty
        mean_demand = sum(forecast['point_forecast'])
        std_demand = (sum(forecast['upper_bound']) - sum(forecast['lower_bound'])) / 3.29  # 80% interval

        from scipy.stats import norm
        optimal_quantity = norm.ppf(critical_ratio, mean_demand, std_demand)

        # Round up and apply minimum order quantity
        optimal_quantity = max(
            product.min_order_quantity,
            math.ceil(optimal_quantity)
        )

        # Subtract current inventory
        current_stock = self.inventory_service.get_available(store_id, sku)
        reorder_quantity = max(0, optimal_quantity - current_stock)

        return {
            'reorder_quantity': reorder_quantity,
            'optimal_stock_level': optimal_quantity,
            'current_stock': current_stock,
            'forecast_demand': mean_demand,
            'safety_stock': optimal_quantity - mean_demand
        }
```

</div>

### Handling Demand Anomalies

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #22c55e;">
<h4 style="color: #4ade80; margin: 0 0 20px 0; text-align: center;">DEMAND ANOMALY DETECTION AND HANDLING</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #86efac; margin: 0 0 12px 0;">Demand Spike Detection</h5>
<div style="font-size: 13px; color: #94a3b8;">

**Triggers**:
- 3x normal hourly order rate
- Search volume spike for specific SKU
- Competitor stockout (via scraping)

**Response**:
- Alert category manager
- Auto-increase safety stock
- Trigger emergency replenishment

</div>
</div>

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #86efac; margin: 0 0 12px 0;">Demand Drop Detection</h5>
<div style="font-size: 13px; color: #94a3b8;">

**Triggers**:
- <50% of expected demand
- High add-to-cart, low checkout (price issue?)
- Competitor promotion

**Response**:
- Check for quality/freshness issues
- Consider markdown
- Reduce next replenishment

</div>
</div>

<div style="background: #0f172a; border-radius: 8px; padding: 16px;">
<h5 style="color: #86efac; margin: 0 0 12px 0;">Stockout Recovery</h5>
<div style="font-size: 13px; color: #94a3b8;">

**When stockout occurs**:
- Log as "suppressed demand"
- Estimate true demand (historical + search)
- Don't let stockout bias future forecasts

**Formula**:
`true_demand = observed_sales + estimated_lost_sales`

</div>
</div>

</div>

</div>

</div>

### Interview Questions: Demand Prediction

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

#### Level 1: "How do you predict demand for a new dark store with no historical data?"

**What They're Testing**: Cold start problem understanding and practical solutions.

**Strong Answer**:
> "New store demand prediction uses transfer learning and proxy signals:

> **1. Similar Store Mapping**: Find existing stores in demographically similar areas (income level, population density, competition). Use their demand patterns as a baseline, adjusted for the new store's specifics.

> **2. Proxy Signals**:
> - Food delivery order density in the area (Swiggy/Zomato public data)
> - Google Maps 'busy times' for nearby retail stores
> - Census data for household composition
> - Competition density and their apparent traffic

> **3. Pre-Launch Validation**:
> - Run geo-targeted ads to collect waitlist signups
> - Survey waitlist about category preferences
> - Launch with conservative inventory, monitor actual demand, and adjust weekly

> **4. Bayesian Updating**: Start with a prior from similar stores, update rapidly as real data comes in. After 2-3 weeks, store-specific data dominates the prior.

> The key insight is that we're never truly 'zero data' - we just need to be creative about what signals we use."

---

#### Level 2: "Your demand forecast was accurate, but you still had stockouts. What went wrong?"

**What They're Testing**: Understanding of the gap between forecast and execution, and the inventory pipeline.

**Strong Answer**:
> "Accurate forecast but stockouts indicates a breakdown in the forecast-to-fulfillment pipeline. The root causes fall into three categories:

> **1. Lead Time Mismatch**:
> - Forecast was right, but replenishment order was placed too late
> - Supplier couldn't deliver in time (transport delay, supplier stockout)
> - Receiving delays at the dark store

> **2. Safety Stock Calculation Error**:
> - Demand was within forecast range but hit the high end
> - Safety stock wasn't sufficient to cover demand variability
> - This is especially common for items with high demand variance

> **3. Execution Failures**:
> - Stock existed but wasn't put away properly (sitting in receiving area)
> - Inventory record was wrong (showed available, but physical stock depleted)
> - Batch expiry - stock existed but was past sell-by date

> **4. Demand Distribution Issue**:
> - Total demand matched forecast, but timing was concentrated
> - Example: Forecast 100 units over 7 days, but 60 units sold in 2 days

> **Diagnostic Steps**:
> 1. Check if replenishment was triggered at the right time (was it?)
> 2. Check if replenishment arrived as expected (did supplier deliver?)
> 3. Check if received stock was put away (receiving log)
> 4. Check inventory audit trail (when did we hit zero?)
> 5. Compare actual daily sales to daily forecast (timing issue?)

> The fix depends on the root cause: if it's lead time, shorten replenishment cycle; if it's safety stock, increase buffer; if it's execution, fix operational process."

---

#### Level 3: "Design a demand forecasting system that improves itself over time by learning from its own prediction errors."

**What They're Testing**: ML systems design, feedback loops, and continuous learning.

**Strong Answer**:
> "A self-improving forecast system needs four components: error tracking, root cause analysis, automated retraining, and human-in-the-loop for edge cases.

> **1. Error Tracking and Attribution**:

> ```python
> class ForecastErrorTracker:
>     def record_actual_demand(self, store_id, sku, date, actual_demand):
>         # Retrieve original forecast
>         forecast = self.get_stored_forecast(store_id, sku, date)
>
>         # Calculate error metrics
>         error = actual_demand - forecast.point_forecast
>         abs_pct_error = abs(error) / max(forecast.point_forecast, 1)
>
>         # Determine if actual was within prediction interval
>         within_interval = (
>             forecast.lower_bound <= actual_demand <= forecast.upper_bound
>         )
>
>         # Attribute error to potential causes
>         attribution = self.attribute_error(
>             store_id, sku, date, forecast, actual_demand
>         )
>
>         # Store for analysis
>         self.db.insert('forecast_errors', {
>             'store_id': store_id,
>             'sku': sku,
>             'date': date,
>             'forecast': forecast.point_forecast,
>             'actual': actual_demand,
>             'error': error,
>             'abs_pct_error': abs_pct_error,
>             'within_interval': within_interval,
>             'attribution': attribution,
>             'model_version': forecast.model_version,
>             'features_used': forecast.features
>         })
>
>     def attribute_error(self, store_id, sku, date, forecast, actual):
>         """
>         Attempt to explain why forecast was wrong.
>         This is crucial for knowing what to fix.
>         """
>         attributions = []
>
>         # Check for stockout (suppressed demand)
>         if self.had_stockout(store_id, sku, date):
>             attributions.append('stockout_suppression')
>
>         # Check for unexpected event
>         if self.was_unexpected_event(store_id, date):
>             attributions.append('unexpected_event')
>
>         # Check for price change
>         if self.had_price_change(sku, date):
>             attributions.append('price_change')
>
>         # Check for promotion
>         if self.had_promotion(sku, date):
>             attributions.append('promotion_effect')
>
>         # Check weather anomaly
>         if self.was_weather_anomaly(store_id, date):
>             attributions.append('weather_anomaly')
>
>         # If no obvious cause, attribute to model error
>         if not attributions:
>             attributions.append('model_error')
>
>         return attributions
> ```

> **2. Automated Retraining Pipeline**:

> ```python
> class AutoRetrainer:
>     def should_retrain(self, model_id):
>         # Get recent error metrics
>         recent_errors = self.error_tracker.get_errors(
>             model_id=model_id,
>             days=14
>         )
>
>         # Trigger retraining if:
>         # 1. Average absolute percentage error > 25%
>         # 2. Interval coverage < 70% (uncertainty too narrow)
>         # 3. Systematic bias detected (consistently over/under)
>
>         avg_mape = np.mean([e.abs_pct_error for e in recent_errors])
>         interval_coverage = np.mean([e.within_interval for e in recent_errors])
>         bias = np.mean([e.error for e in recent_errors])
>
>         return (
>             avg_mape > 0.25 or
>             interval_coverage < 0.70 or
>             abs(bias) > self.get_historical_std(model_id)
>         )
>
>     def retrain_model(self, model_id):
>         # Get training data with recent actuals
>         training_data = self.get_training_data(model_id, months=6)
>
>         # Add error attributions as features
>         # This helps model learn from past mistakes
>         enhanced_data = self.add_error_features(training_data)
>
>         # Train new model version
>         new_model = self.train(enhanced_data)
>
>         # A/B test before full deployment
>         self.deploy_to_shadow(new_model)
>
>         # After 7 days of shadow testing, compare performance
>         # Auto-promote if new model is better
> ```

> **3. Feature Importance Drift Detection**:

> ```python
> def detect_feature_drift(self, model_id):
>     """
>     Detect when feature importances have shifted significantly.
>     This indicates the model might be relying on outdated patterns.
>     """
>     current_importances = self.get_current_feature_importances(model_id)
>     baseline_importances = self.get_baseline_feature_importances(model_id)
>
>     drift_score = 0
>     for feature, current_imp in current_importances.items():
>         baseline_imp = baseline_importances.get(feature, 0)
>         drift_score += abs(current_imp - baseline_imp)
>
>     if drift_score > self.drift_threshold:
>         self.alert(f'Feature drift detected for model {model_id}')
>         self.trigger_investigation(model_id)
> ```

> **4. Human-in-the-Loop for Anomalies**:

> - Forecasts for high-value events (Diwali, major cricket match) are reviewed by category managers before execution
> - When model confidence is low (<60%), flag for human review
> - New SKU forecasts for first 30 days are monitored closely
> - Category managers can override forecast with justification (which becomes training data)

> **Key Design Principle**: The system should fail gracefully. When model confidence is low, fall back to simpler methods (moving average) rather than making a bad ML prediction with false confidence."

**Cross-references**: [[mlops]](/system-design/mlops), [[ab-testing]](/system-design/ab-testing), [[time-series-forecasting]](/ml/time-series)

</div>

---

## High-Level System Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #3b82f6;">
<h4 style="color: #60a5fa; margin: 0 0 20px 0; text-align: center;">ZEPTO SYSTEM ARCHITECTURE</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">

<div style="background: #1e3a5f; border-radius: 12px; padding: 16px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">CUSTOMER</div>
<div style="color: #94a3b8; font-size: 13px;">Mobile App / Web</div>
</div>

</div>

<div style="background: #374151; height: 2px; margin: 16px 0;"></div>

<div style="text-align: center; color: #9ca3af; margin: 8px 0; font-weight: bold;">API Gateway (Kong/AWS ALB)</div>

<div style="background: #374151; height: 2px; margin: 16px 0;"></div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin: 20px 0;">

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">Catalog Service</div>
<div style="font-size: 11px; color: #94a3b8;">Products, Pricing, Search</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">Order Service</div>
<div style="font-size: 11px; color: #94a3b8;">Cart, Checkout, Status</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">Inventory Service</div>
<div style="font-size: 11px; color: #94a3b8;">Stock, Reservations</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">Fulfillment Service</div>
<div style="font-size: 11px; color: #94a3b8;">Picking, Packing</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">Delivery Service</div>
<div style="font-size: 11px; color: #94a3b8;">Assignment, Tracking</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #93c5fd;">User Service</div>
<div style="font-size: 11px; color: #94a3b8;">Auth, Profiles, Addresses</div>
</div>

</div>

<div style="background: #374151; height: 2px; margin: 16px 0;"></div>

<div style="text-align: center; color: #9ca3af; margin: 8px 0; font-weight: bold;">Event Bus (Kafka)</div>

<div style="background: #374151; height: 2px; margin: 16px 0;"></div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">

<div style="background: #312e81; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #a5b4fc;">PostgreSQL</div>
<div style="font-size: 11px; color: #94a3b8;">Source of Truth</div>
</div>

<div style="background: #312e81; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #a5b4fc;">Redis Cluster</div>
<div style="font-size: 11px; color: #94a3b8;">Cache, Sessions, Geo</div>
</div>

<div style="background: #312e81; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #a5b4fc;">Elasticsearch</div>
<div style="font-size: 11px; color: #94a3b8;">Product Search</div>
</div>

<div style="background: #312e81; border-radius: 8px; padding: 12px; text-align: center;">
<div style="font-weight: bold; color: #a5b4fc;">S3</div>
<div style="font-size: 11px; color: #94a3b8;">Images, Logs</div>
</div>

</div>

</div>

### City-Level Sharding Strategy

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

**Why City Sharding?**

At scale (500+ stores, 1M+ orders/day), a single global database becomes a bottleneck. City sharding provides:

| Benefit | Explanation |
|---------|-------------|
| **Latency** | Data is close to users; no cross-region calls for most operations |
| **Blast Radius** | Mumbai outage doesn't affect Delhi customers |
| **Compliance** | Data residency requirements in some regions |
| **Scale** | Each city can scale independently based on demand |
| **Operations** | City teams can have isolated environments for testing |

**What's Sharded (City-Local)**:
- Orders
- Inventory
- Rider assignments
- Store operations
- Delivery tracking

**What's Global**:
- User accounts
- Payment methods
- Product catalog (master)
- Analytics/reporting

**Cross-City Operations**:
- User traveling to another city: Query global user service, then local city services
- Transfer inventory between cities: Asynchronous, not real-time

</div>

### Technology Stack Rationale

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #22c55e;">
<h4 style="color: #4ade80; margin: 0 0 20px 0; text-align: center;">TECHNOLOGY DECISIONS AND ALTERNATIVES</h4>

| Component | Choice | Why This | Alternative | When Alternative Is Better |
|-----------|--------|----------|-------------|---------------------------|
| **Primary DB** | PostgreSQL (Aurora) | ACID for orders, strong ecosystem | CockroachDB | Global distribution needed |
| **Cache** | Redis Cluster | Atomic ops, geospatial queries | Memcached | Simple caching only |
| **Event Bus** | Kafka | Replay capability, high throughput | RabbitMQ | Simple pub/sub sufficient |
| **Search** | Elasticsearch | Full-text, faceted search | Algolia | Faster setup, managed |
| **Maps** | Google Maps + Custom | Best India coverage | MapmyIndia | Cost concerns, India-only |
| **ML Platform** | SageMaker | AWS integration | Vertex AI | GCP-first architecture |
| **Monitoring** | Datadog | Full-stack observability | Prometheus/Grafana | Cost sensitive, self-hosted |

</div>

</div>

---

## Scaling Phases

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: linear-gradient(135deg, #166534 0%, #14532d 100%); border-radius: 16px; padding: 24px;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Phase 1: MVP (1-5 Stores)</h4>

**Scale**: 500-2,000 orders/day

**Architecture**:
- Monolithic Python/Django app
- Single PostgreSQL instance
- Redis for sessions
- Manual rider dispatch via WhatsApp

**Team**: 3-5 engineers

**Monthly Cost**: $1,000-5,000

**Focus**: Prove the concept, iterate on UX

</div>

<div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); border-radius: 16px; padding: 24px;">
<h4 style="color: #93c5fd; margin: 0 0 16px 0;">Phase 2: Growth (20-50 Stores)</h4>

**Scale**: 10,000-50,000 orders/day

**Architecture**:
- Extract critical services (inventory, delivery)
- Add Redis cluster for inventory
- Add Kafka for event streaming
- Automated rider assignment

**Team**: 15-25 engineers

**Monthly Cost**: $20,000-50,000

**Focus**: Automate operations, improve reliability

</div>

<div style="background: linear-gradient(135deg, #7e22ce 0%, #581c87 100%); border-radius: 16px; padding: 24px;">
<h4 style="color: #d8b4fe; margin: 0 0 16px 0;">Phase 3: Scale (100+ Stores)</h4>

**Scale**: 100,000-500,000 orders/day

**Architecture**:
- Full microservices
- City-level sharding
- ML for demand forecasting
- Real-time analytics

**Team**: 50-100 engineers

**Monthly Cost**: $100,000-300,000

**Focus**: Unit economics, expansion

</div>

<div style="background: linear-gradient(135deg, #be123c 0%, #881337 100%); border-radius: 16px; padding: 24px;">
<h4 style="color: #fda4af; margin: 0 0 16px 0;">Phase 4: Dominance (500+ Stores)</h4>

**Scale**: 1M+ orders/day

**Architecture**:
- Multi-region active-active
- Advanced ML (personalization, routing)
- Real-time fraud detection
- Automated dark store operations

**Team**: 200+ engineers

**Monthly Cost**: $500,000+

**Focus**: Profitability, moat building

</div>

</div>

</div>

---

## Trade-offs and Design Decisions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #f59e0b;">
<h4 style="color: #fbbf24; margin: 0 0 20px 0; text-align: center;">CRITICAL DESIGN TRADE-OFFS</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
<h5 style="color: #fcd34d; margin: 0 0 12px 0;">1. Consistency vs. Availability</h5>

**Decision**: Eventual consistency for most operations, strong consistency for inventory

**Rationale**:
- Order status can be 2-3 seconds stale without customer noticing
- Inventory must be strongly consistent to prevent overselling
- Payment must be strongly consistent for financial accuracy

**Implementation**:
- Redis for inventory (atomic ops)
- PostgreSQL with serializable isolation for payments
- Kafka for async propagation of non-critical updates

</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
<h5 style="color: #fcd34d; margin: 0 0 12px 0;">2. Dedicated vs. Gig Riders</h5>

**Decision**: Primarily dedicated fleet with gig overflow

**Rationale**:
- Dedicated riders can be trained, uniformed, and held accountable
- 10-minute promise requires reliability that gig economy can't guarantee
- Higher fixed cost is justified by better customer experience

**Trade-off Accepted**:
- During low demand, paying riders to wait
- Higher recruitment and training costs

**Mitigation**:
- Shift scheduling based on demand prediction
- 20% gig buffer for unexpected peaks

</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
<h5 style="color: #fcd34d; margin: 0 0 12px 0;">3. SKU Breadth vs. Fulfillment Speed</h5>

**Decision**: Limited SKU count (2,000-3,000) per store

**Rationale**:
- Smaller inventory = faster picking
- Higher turns = fresher products
- Lower capital requirement per store

**Trade-off Accepted**:
- Can't serve all customer needs
- Lost sales for niche products

**Mitigation**:
- Data-driven SKU selection (local preferences)
- "Request a product" feature for demand signal
- Different SKU mix for different neighborhoods

</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
<h5 style="color: #fcd34d; margin: 0 0 12px 0;">4. Accuracy vs. Speed in ETA</h5>

**Decision**: Conservative ETAs with occasional overdelivery

**Rationale**:
- Customer disappointment from missed ETA > delight from faster delivery
- Buffer allows for handling variability
- Marketing says "10 minutes" but system targets 8

**Trade-off Accepted**:
- Competitor might show lower ETA and win the order
- Some operational slack not utilized

**Mitigation**:
- Dynamic ETA based on real-time conditions
- Under-promise, over-deliver philosophy

</div>

</div>

</div>

</div>

---

## Interview Tips: What To Say and What To Avoid

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: #14532d; border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Impressive Statements</h4>

| Statement | Why It Works |
|-----------|--------------|
| "The 10-minute promise is a latency budget distributed across 5 operations" | Shows systems thinking |
| "Dark stores work because of deliberate SKU limitation - it's a feature, not a bug" | Shows constraint understanding |
| "Inventory accuracy of 97% is acceptable with good substitution UX" | Shows practical trade-off thinking |
| "I'd start with retail partnerships to validate demand before dark store investment" | Shows business awareness |
| "FIFO assignment handles 90% of cases; optimize only at scale" | Shows you won't over-engineer |
| "The hard problem isn't the algorithm, it's the last 50 meters" | Shows real-world awareness |

</div>

<div style="background: #450a0a; border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Red Flag Statements</h4>

| Statement | Why It's Bad | Better Alternative |
|-----------|--------------|-------------------|
| "Microservices from day one" | Over-engineering | "Start monolith, extract when needed" |
| "ML will optimize everything" | ML needs data you don't have | "Rules first, ML when data exists" |
| "Build our own routing engine" | Google Maps exists | "Use Maps API, add custom layer" |
| "Real-time sync for everything" | Unnecessary complexity | "Eventual consistency where possible" |
| "We need blockchain" | No practical benefit | "Event sourcing provides audit trail" |
| "100% availability" | Unrealistic | "99.9% with graceful degradation" |

</div>

</div>

### The Structured Response Framework

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #374151;">

When asked an open-ended question, structure your response:

**1. CLARIFY** (10 seconds)
> "Let me confirm the scope - we're designing for X orders/day across Y cities?"

**2. CONSTRAINTS** (30 seconds)
> "The key constraints are: 10-minute delivery, 2km radius, 2000-3000 SKUs per store"

**3. APPROACH** (60 seconds)
> "I'd break this into phases: Phase 1 validates with 2-3 stores, Phase 2 scales to 50 stores, Phase 3 handles city expansion"

**4. DEEP DIVE** (5-10 minutes)
> Focus on the component they're most interested in. If they don't specify, pick inventory or delivery as these are the most interesting.

**5. TRADE-OFFS** (60 seconds)
> "The key trade-off is X vs Y. I'd choose X because [reason], accepting [downside]"

**6. WHAT I'D SKIP** (30 seconds)
> "For this scale, I'd skip [feature] because [simpler alternative] works until [trigger condition]"

</div>

</div>

---

## Cross-References

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Related System Design Topics

| Topic | Relevance to Zepto |
|-------|-------------------|
| [[rate-limiting]](/system-design/rate-limiting) | Flash sale handling, API protection |
| [[event-sourcing]](/system-design/event-sourcing) | Inventory tracking, order audit trail |
| [[distributed-locking]](/system-design/distributed-locking) | Inventory reservation |
| [[caching-strategies]](/system-design/caching) | Catalog, inventory availability |
| [[message-queues]](/system-design/message-queues) | Order processing, notifications |
| [[database-sharding]](/databases/sharding) | City-level data partitioning |
| [[api-gateway]](/system-design/api-gateway) | Request routing, auth |
| [[circuit-breakers]](/system-design/circuit-breakers) | Graceful degradation |

### Related Algorithm Topics

| Topic | Relevance to Zepto |
|-------|-------------------|
| [[traveling-salesman]](/algorithms/tsp) | Picker routing |
| [[bin-packing]](/algorithms/bin-packing) | Order bagging |
| [[matching-algorithms]](/algorithms/matching) | Rider assignment |
| [[time-series-forecasting]](/ml/time-series) | Demand prediction |
| [[geospatial-indexing]](/algorithms/geospatial) | Store/rider location queries |

</div>
