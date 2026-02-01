# Design Airbnb

<nav class="toc" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff5a5f;">

## Table of Contents

- [Problem Statement](#problem-statement)
- [High-Level Architecture](#high-level-architecture)
- [Search System](#search-system)
- [Scale Strategy](#scale-strategy)
  - [Phase 1: Starting Phase](#phase-1-starting-phase)
  - [Phase 2: Medium Scale](#phase-2-medium-scale)
  - [Phase 3: Airbnb Scale](#phase-3-airbnb-scale)
- [Edge Cases & Failure Modes](#edge-cases-failure-modes)
- [AWS Technologies & Alternatives](#aws-technologies-alternatives)
- [Distributed Systems Considerations](#distributed-systems-considerations)
- [Interview Deep Dive Questions](#interview-deep-dive-questions)
- [Why This Technology?](#why-this-technology)
- [When Simpler Solutions Work](#when-simpler-solutions-work)
- [Trade-off Analysis & Mitigation](#trade-off-analysis-mitigation)
- [Interview Tips](#interview-tips)

</nav>

---

## Problem Statement {#problem-statement}

Design a vacation rental marketplace that connects hosts with guests for property bookings.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff5a5f;">

### Core Requirements {#core-requirements}
  - **Listings**: Property creation, photos, amenities, pricing
  - **Search**: Location, dates, filters, map view
  - **Booking**: Availability, reservation, payments
  - **Reviews**: Two-way rating system
  - **Messaging**: Host-guest communication
  - **Host Tools**: Calendar, pricing, analytics

</div>

---

## High-Level Architecture {#high-level-architecture}

<div class="diagram-container">
<div class="flow-diagram">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">AIRBNB SYSTEM ARCHITECTURE</h3>

<!-- Clients -->
<div class="flow-box success" style="padding: 16px 32px;">
<div class="flow-box-title">CLIENTS</div>
<div class="flow-box-subtitle">Web | iOS | Android</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- API Gateway -->
<div class="flow-box primary" style="width: 80%; max-width: 500px; padding: 16px 48px;">
<div class="flow-box-title">API GATEWAY</div>
<div class="flow-box-subtitle">Rate Limiting | Auth | Routing</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Services Row -->
<div class="flow-row" style="width: 100%;">

<!-- Listing Service -->
<div class="flow-box orange" style="flex: 1; min-width: 180px; max-width: 220px;">
<div class="flow-box-title" style="font-size: 13px;">LISTING SERVICE</div>
<div style="color: inherit; font-size: 11px; line-height: 1.6; text-align: left; opacity: 0.85;">
&#8226; CRUD Operations<br/>
&#8226; Photo Management<br/>
&#8226; Amenities & Pricing
</div>
</div>

<!-- Search Service -->
<div class="flow-box info" style="flex: 1; min-width: 180px; max-width: 220px;">
<div class="flow-box-title" style="font-size: 13px;">SEARCH SERVICE</div>
<div style="color: inherit; font-size: 11px; line-height: 1.6; text-align: left; opacity: 0.85;">
&#8226; Geo-spatial Queries<br/>
&#8226; Faceted Filters<br/>
&#8226; ML-based Rankings
</div>
</div>

<!-- Booking Service -->
<div class="flow-box purple" style="flex: 1; min-width: 180px; max-width: 220px;">
<div class="flow-box-title" style="font-size: 13px;">BOOKING SERVICE</div>
<div style="color: inherit; font-size: 11px; line-height: 1.6; text-align: left; opacity: 0.85;">
&#8226; Reservations<br/>
&#8226; Availability Checks<br/>
&#8226; Payment Processing
</div>
</div>

</div>

<!-- Pricing Service -->
<div class="flow-box success" style="width: 200px;">
<div class="flow-box-title" style="font-size: 13px;">PRICING SERVICE</div>
<div class="flow-box-subtitle">Dynamic | Seasonal | Demand-based</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Kafka -->
<div class="flow-box error" style="padding: 14px 40px;">
<div class="flow-box-title" style="font-size: 13px;">KAFKA EVENT BUS</div>
<div class="flow-box-subtitle">Async Communication | Event Sourcing</div>
</div>

</div>
</div>

---

## Search System {#search-system}

<div class="diagram-container">
<div class="flow-diagram">
<h4 style="color: #f97316; text-align: center; margin: 0 0 24px 0;">LISTING SEARCH PIPELINE</h4>

<!-- Search Query Input -->
<div class="flow-box primary" style="width: 100%; max-width: 500px;">
<div class="flow-box-title">Search Query: "Paris, Dec 15-20, 2 guests"</div>
</div>

<!-- Pipeline Steps -->
<div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">

<!-- Step 1: Geo Filter -->
<div class="data-card data-card-accent orange">
<div class="data-card-content">
<div class="data-card-header">
<div class="data-card-title" style="color: #f97316;">STEP 1: GEO FILTER</div>
<span class="diagram-badge orange">50,000 listings</span>
</div>
<div class="data-card-description">
&#8226; Parse "Paris" to bounding box / polygon coordinates<br/>
&#8226; Filter listings within geographic area using spatial index<br/>
&#8226; Use Elasticsearch <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #3b82f6;">geo_shape</code> query
</div>
</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Step 2: Availability Filter -->
<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-header">
<div class="data-card-title" style="color: #3b82f6;">STEP 2: AVAILABILITY FILTER</div>
<span class="diagram-badge info">15,000 listings</span>
</div>
<div class="data-card-description">
&#8226; Check calendar for Dec 15-20 date range<br/>
&#8226; Exclude listings with existing bookings or host blocks<br/>
&#8226; Consider minimum stay requirements (e.g., 3-night minimum)
</div>
</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Step 3: Capacity + Filters -->
<div class="data-card data-card-accent purple">
<div class="data-card-content">
<div class="data-card-header">
<div class="data-card-title" style="color: #8b5cf6;">STEP 3: CAPACITY + FILTERS</div>
<span class="diagram-badge purple">5,000 listings</span>
</div>
<div class="data-card-description">
&#8226; Filter: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #3b82f6;">guests >= 2</code><br/>
&#8226; Apply price range, property type, amenities filters<br/>
&#8226; Apply Instant Book, Superhost, accessibility filters
</div>
</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Step 4: Ranking -->
<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-header">
<div class="data-card-title" style="color: #10b981;">STEP 4: RANKING</div>
<span class="diagram-badge success">Top 100 ranked</span>
</div>
<div class="data-card-description">
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #475569;">
Ranking Score = w1 * quality_score<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ w2 * review_score<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ w3 * response_rate<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ w4 * price_competitiveness<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ w5 * booking_likelihood (ML)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ w6 * freshness_boost
</div>
</div>
</div>
</div>

</div>

</div>
</div>

---

## Scale Strategy {#scale-strategy}

This section outlines how the architecture evolves from startup to Airbnb scale, with specific triggers for when to add complexity.

### Phase 1: Starting Phase {#phase-1-starting-phase}

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

#### Assumptions {#phase1-assumptions}
- **Listings**: 1,000 - 50,000
- **Users**: 10,000 - 100,000
- **Bookings**: 100 - 1,000/day
- **Budget**: $3,000 - $15,000/month

#### Monolithic Architecture {#phase1-architecture}

```python
class BookingService:
    def create_booking(self, guest_id, listing_id, check_in, check_out, guests):
        with transaction.atomic():
            listing = Listing.objects.select_for_update().get(id=listing_id)

            # Check availability
            if not self.is_available(listing_id, check_in, check_out):
                raise NotAvailableError()

            # Calculate total price
            nights = (check_out - check_in).days
            price = self.calculate_price(listing, check_in, check_out)
            service_fee = price * 0.12
            total = price + service_fee

            # Create booking
            booking = Booking.objects.create(
                listing=listing,
                guest_id=guest_id,
                check_in=check_in,
                check_out=check_out,
                guests=guests,
                total_price=total,
                status='pending'
            )

            # Block calendar
            self.block_dates(listing_id, check_in, check_out, booking.id)

            # Process payment
            payment = PaymentService().authorize(guest_id, total)
            booking.payment_id = payment.id
            booking.status = 'confirmed'
            booking.save()

            # Notify host
            NotificationService().notify_host_booking(booking)

            return booking

    def is_available(self, listing_id, check_in, check_out):
        blocked = CalendarBlock.objects.filter(
            listing_id=listing_id,
            date__gte=check_in,
            date__lt=check_out
        ).exists()
        return not blocked
```

</div>
</div>

---

### Phase 2: Medium Scale {#phase-2-medium-scale}

<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

#### Assumptions {#phase2-assumptions}
- **Listings**: 50,000 - 500,000
- **Users**: 100,000 - 5,000,000
- **Bookings**: 1,000 - 50,000/day
- **Budget**: $15,000 - $100,000/month

#### Availability Calendar {#availability-calendar}

<div class="diagram-container">
<div class="flow-diagram" style="align-items: stretch;">

<h4 style="color: #3b82f6; margin: 0 0 16px 0; text-align: center;">Calendar Storage Strategy</h4>

<!-- Option 1: Date-based rows -->
<div style="margin-bottom: 24px; width: 100%;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Option 1: Date-based rows (Simple)</div>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 12px;">
<thead>
<tr style="background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);">
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">listing_id</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">date</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">available</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">price</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">min_nights</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">L1</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-15</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #ef4444;">false</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">$150</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2</td>
</tr>
<tr style="background: #ffffff;">
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">L1</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-16</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #ef4444;">false</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">$150</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2</td>
</tr>
<tr style="background: #f8fafc;">
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">L1</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-17</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #10b981;">true</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">$175</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2</td>
</tr>
</tbody>
</table>
</div>
</div>

<!-- Option 2: Range-based -->
<div style="margin-bottom: 24px; width: 100%;">
<div style="color: #10b981; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Option 2: Range-based (Better for queries)</div>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 12px;">
<thead>
<tr style="background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);">
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">listing_id</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">start_date</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">end_date</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">type</th>
<th style="border: 1px solid #e2e8f0; padding: 10px; color: #475569; text-align: left;">booking_id</th>
</tr>
</thead>
<tbody>
<tr style="background: #f8fafc;">
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">L1</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-15</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-17</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #ef4444;">booked</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #3b82f6;">B123</td>
</tr>
<tr style="background: #ffffff;">
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">L1</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-20</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #64748b;">2024-12-25</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #f97316;">blocked</td>
<td style="border: 1px solid #e2e8f0; padding: 10px; color: #94a3b8;">null</td>
</tr>
</tbody>
</table>
</div>
</div>

<!-- Query Example -->
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; width: 100%;">
<div style="color: #8b5cf6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Query: Available Dec 15-20?</div>
<pre style="margin: 0; color: #475569; font-size: 11px; overflow-x: auto;"><code>SELECT NOT EXISTS(
  SELECT 1 FROM calendar_blocks
  WHERE listing_id = L1
  AND start_date < '2024-12-20'
  AND end_date > '2024-12-15'
)</code></pre>
</div>

</div>
</div>

#### Dynamic Pricing {#dynamic-pricing}

```python
class PricingService:
    def calculate_price(self, listing, check_in, check_out):
        base_price = listing.base_price
        total = 0

        for date in date_range(check_in, check_out):
            daily_price = base_price

            # Seasonal adjustment
            season_multiplier = self.get_season_multiplier(listing.location, date)
            daily_price *= season_multiplier

            # Day of week adjustment
            if date.weekday() in [4, 5]:  # Fri, Sat
                daily_price *= 1.2

            # Demand-based adjustment
            demand = self.get_demand(listing.location, date)
            if demand > 0.8:  # High demand
                daily_price *= 1.15

            # Apply custom pricing if set
            custom = listing.custom_pricing.get(date)
            if custom:
                daily_price = custom

            total += daily_price

        return total
```

</div>
</div>

---

### Phase 3: Airbnb Scale {#phase-3-airbnb-scale}

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

#### Assumptions {#phase3-assumptions}
- **Listings**: 7M+ active
- **Users**: 150M+
- **Bookings**: 500K+/day
- **Searches**: 50M+/day

#### Booking Flow at Scale {#booking-flow-scale}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #ef4444; text-align: center; margin: 0 0 20px 0;">DOUBLE-BOOKING PREVENTION</h4>

<div class="data-card data-card-accent error" style="width: 100%; max-width: 500px;">
<div class="data-card-content">
<div class="data-card-title" style="color: #ef4444;">Problem Statement</div>
<div class="data-card-description">Two guests try to book same listing for same dates simultaneously</div>
</div>
</div>

<!-- Two Guests -->
<div class="flow-row">
<div class="flow-box success">
<div class="flow-box-title">Guest A</div>
<div class="flow-box-subtitle">Book Dec 15-20</div>
</div>
<div class="flow-box primary">
<div class="flow-box-title">Guest B</div>
<div class="flow-box-subtitle">Book Dec 15-20</div>
</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595; &#8595;</div>

<!-- Booking Service -->
<div class="flow-box purple" style="width: 80%; max-width: 400px;">
<div class="flow-box-title">BOOKING SERVICE</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Redis Lock -->
<div class="flow-box error" style="padding: 20px; width: 90%; max-width: 500px;">
<div class="flow-box-title">Distributed Lock (Redis)</div>
<div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; text-align: center; margin: 10px 0;">
<code style="color: #fef3c7; font-size: 11px;">SETNX lock:listing:L1:2024-12-15-20</code>
</div>
<div class="flow-box-subtitle">First request wins, second waits or fails fast</div>
</div>

<!-- Arrow -->
<div class="flow-arrow">&#8595;</div>

<!-- Results -->
<div class="flow-row">
<div class="flow-box success" style="flex: 1; max-width: 200px;">
<div class="flow-box-title" style="font-size: 12px;">Guest A - SUCCESS</div>
<div style="font-size: 10px; line-height: 1.6; text-align: left; opacity: 0.9;">
&#10003; Lock acquired<br/>
&#10003; Check availability<br/>
&#10003; Create booking<br/>
&#10003; Block dates<br/>
&#10003; Release lock
</div>
</div>
<div class="flow-box neutral" style="flex: 1; max-width: 200px;">
<div class="flow-box-title" style="font-size: 12px; color: #ef4444;">Guest B - DENIED</div>
<div style="font-size: 10px; line-height: 1.6; text-align: left; opacity: 0.9;">
&#10007; Lock denied<br/>
&#10007; Return: "Not available"<br/>
&nbsp;&nbsp;&nbsp;or retry after TTL
</div>
</div>
</div>

</div>
</div>

#### Search Sharding {#search-sharding}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #3b82f6; text-align: center; margin: 0 0 20px 0;">GEO-BASED SEARCH SHARDING</h4>

<div style="color: #64748b; font-size: 12px; text-align: center; margin-bottom: 20px;">Elasticsearch Cluster per Region</div>

<!-- Regional Clusters -->
<div class="flow-row" style="margin-bottom: 24px;">

<div class="flow-box info" style="min-width: 150px;">
<div class="flow-box-title">US Cluster</div>
<div class="flow-box-subtitle">US listings</div>
<div style="font-weight: bold; margin-top: 4px;">2M docs</div>
</div>

<div class="flow-box success" style="min-width: 150px;">
<div class="flow-box-title">EU Cluster</div>
<div class="flow-box-subtitle">EU listings</div>
<div style="font-weight: bold; margin-top: 4px;">3M docs</div>
</div>

<div class="flow-box purple" style="min-width: 150px;">
<div class="flow-box-title">APAC Cluster</div>
<div class="flow-box-subtitle">APAC listings</div>
<div style="font-weight: bold; margin-top: 4px;">2M docs</div>
</div>

</div>

<!-- Query Routing & Benefits -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; width: 100%;">

<div class="data-card data-card-accent orange">
<div class="data-card-content">
<div class="data-card-title" style="color: #f97316;">Query Routing</div>
<div class="data-card-description">
&#8226; Parse search location from query<br/>
&#8226; Route to appropriate regional cluster<br/>
&#8226; Cross-region queries handled separately
</div>
</div>
</div>

<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-title" style="color: #10b981;">Benefits</div>
<div class="data-card-description">
&#8226; Reduced index size per cluster<br/>
&#8226; Lower latency for regional searches<br/>
&#8226; Independent scaling per region
</div>
</div>
</div>

</div>

</div>
</div>

</div>
</div>

---

## Edge Cases & Failure Modes {#edge-cases-failure-modes}

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border-left: 4px solid #ef4444;">

### Critical Edge Cases {#critical-edge-cases}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin: 20px 0;">

<div class="data-card data-card-accent error">
<div class="data-card-content">
<div class="data-card-title" style="color: #ef4444;">Double-Booking Race Condition</div>
<div class="data-card-description">
<strong>Scenario:</strong> Two guests book same dates within milliseconds<br/>
<strong>Solution:</strong> Distributed lock + database unique constraint + idempotency keys<br/>
<strong>Fallback:</strong> If all else fails, database UNIQUE constraint rejects second booking
</div>
</div>
</div>

<div class="data-card data-card-accent warning">
<div class="data-card-content">
<div class="data-card-title" style="color: #f59e0b;">Payment Failure Mid-Booking</div>
<div class="data-card-description">
<strong>Scenario:</strong> Calendar blocked but payment fails<br/>
<strong>Solution:</strong> Saga pattern with compensation - unblock calendar on payment failure<br/>
<strong>Timeout:</strong> Auto-release blocked dates after 10 minutes if payment incomplete
</div>
</div>
</div>

<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-title" style="color: #3b82f6;">Stale Search Results</div>
<div class="data-card-description">
<strong>Scenario:</strong> Guest clicks listing that was just booked<br/>
<strong>Solution:</strong> Real-time availability check on listing detail page<br/>
<strong>UX:</strong> Show "Dates no longer available" with alternative suggestions
</div>
</div>
</div>

<div class="data-card data-card-accent purple">
<div class="data-card-content">
<div class="data-card-title" style="color: #8b5cf6;">Host Cancellation</div>
<div class="data-card-description">
<strong>Scenario:</strong> Host cancels confirmed booking<br/>
<strong>Solution:</strong> Penalty system, automatic refund, rebooking assistance<br/>
<strong>Prevention:</strong> Superhost status tied to low cancellation rate
</div>
</div>
</div>

</div>

### Failure Mode Handling {#failure-mode-handling}

<div class="diagram-container">
<div class="flow-diagram" style="align-items: stretch;">

| Failure | Detection | Recovery | User Impact |
|---------|-----------|----------|-------------|
| **Redis Down** | Health check fails | Fall back to DB locks | +50ms latency |
| **ES Cluster Down** | Query timeout | Serve cached results | Stale data (acceptable) |
| **Payment Gateway** | API timeout | Retry with exponential backoff | "Please try again" |
| **Kafka Lag** | Consumer lag metrics | Scale consumers | Delayed notifications |
| **DB Primary Down** | Connection failure | Promote replica | ~30s downtime |

</div>
</div>

### Idempotency Handling {#idempotency-handling}

```python
class BookingService:
    def create_booking(self, idempotency_key, guest_id, listing_id, dates):
        # Check for duplicate request
        cached = redis.get(f'booking:idempotency:{idempotency_key}')
        if cached:
            return json.loads(cached)  # Return cached response

        try:
            booking = self._do_create_booking(guest_id, listing_id, dates)

            # Cache successful response for 24 hours
            redis.setex(
                f'booking:idempotency:{idempotency_key}',
                86400,
                json.dumps(booking.to_dict())
            )
            return booking

        except BookingConflictError:
            # Also cache error responses to prevent retries
            redis.setex(
                f'booking:idempotency:{idempotency_key}',
                86400,
                json.dumps({'error': 'conflict', 'message': 'Dates unavailable'})
            )
            raise
```

### Circuit Breaker Pattern {#circuit-breaker}

```python
class PaymentCircuitBreaker:
    def __init__(self):
        self.failure_count = 0
        self.failure_threshold = 5
        self.recovery_timeout = 30  # seconds
        self.state = 'CLOSED'
        self.last_failure_time = None

    def call(self, payment_request):
        if self.state == 'OPEN':
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = 'HALF_OPEN'
            else:
                raise CircuitOpenError("Payment service unavailable")

        try:
            result = payment_gateway.process(payment_request)
            self._on_success()
            return result
        except PaymentError as e:
            self._on_failure()
            raise

    def _on_success(self):
        self.failure_count = 0
        self.state = 'CLOSED'

    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = 'OPEN'
```

</div>

---

## AWS Technologies & Alternatives {#aws-technologies-alternatives}

<div class="diagram-container">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Search** | OpenSearch | Elasticsearch | OpenSearch: Managed |
| **Listings DB** | Aurora | Vitess | Aurora: Simpler |
| **Bookings** | DynamoDB | PostgreSQL | DynamoDB: Scale |
| **Photos** | S3 + CloudFront | Cloudflare Images | S3: Ecosystem |
| **Payments** | - | Stripe | Standard choice |
| **Maps** | Location Service | Mapbox, Google | Mapbox: Flexibility |

</div>

---

## Distributed Systems Considerations {#distributed-systems-considerations}

<div class="diagram-container">

### 1. Consistency for Bookings {#consistency-bookings}

<div class="flow-row" style="margin: 16px 0;">

<div class="flow-box success" style="flex: 1; min-width: 200px;">
<div class="flow-box-title" style="font-size: 12px;">Strong Consistency Required</div>
<div style="font-size: 11px; line-height: 1.7; text-align: left; opacity: 0.9;">
&#8226; Availability checks<br/>
&#8226; Booking creation<br/>
&#8226; Payment processing
</div>
</div>

<div class="flow-box neutral" style="flex: 1; min-width: 200px;">
<div class="flow-box-title" style="font-size: 12px;">Eventual Consistency OK</div>
<div style="font-size: 11px; line-height: 1.7; text-align: left; opacity: 0.9;">
&#8226; Search results<br/>
&#8226; Reviews display<br/>
&#8226; Analytics data
</div>
</div>

</div>

### 2. Overbooking Prevention {#overbooking-prevention}

```python
# Idempotent booking with optimistic locking
class BookingService:
    def book(self, request_id, listing_id, dates):
        # Check for duplicate request
        existing = self.cache.get(f'booking_req:{request_id}')
        if existing:
            return existing

        with self.lock(f'listing:{listing_id}'):
            # Re-check availability
            if not self.is_available(listing_id, dates):
                raise NotAvailable()

            # Optimistic lock with version
            listing = Listing.get(listing_id)
            version = listing.calendar_version

            # Create booking
            booking = self.create_booking(listing_id, dates)

            # Update calendar with version check
            updated = Calendar.update(
                listing_id=listing_id,
                block_dates=dates,
                where_version=version
            )

            if not updated:
                # Concurrent modification - retry
                raise ConcurrentModification()

            # Cache result
            self.cache.setex(f'booking_req:{request_id}', booking, ttl=86400)

            return booking
```

</div>

---

## Interview Deep Dive Questions {#interview-deep-dive-questions}

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff5a5f;">

### 1. "How do you prevent double-booking?" {#question-double-booking}

**What They're Probing**: Understanding of race conditions, distributed locking, and consistency guarantees in concurrent systems.

**Strong Answer**:

> "Double-booking prevention requires a defense-in-depth approach with multiple layers working together. Let me walk through the complete flow with a concrete scenario:
>
> **Scenario**: Guest A and Guest B both click 'Book Now' on the same Paris apartment for July 4th weekend (July 3-6) within 50 milliseconds of each other.
>
> **Layer 1 - Distributed Lock (Redis)**:
> - Both requests hit the Booking Service simultaneously
> - Service attempts to acquire a Redis lock: `SETNX lock:listing:L12345:2024-07-03-06 {request_id} EX 5`
> - Guest A's request arrives 12ms earlier, acquires the lock
> - Guest B's request gets `nil` response - lock already held
> - Guest B immediately receives HTTP 409 'Dates no longer available' (fail-fast pattern)
> - Lock has 5-second TTL to prevent deadlocks if Guest A's service crashes
>
> **Layer 2 - Database Row-Level Locking**:
> - Guest A's service now executes within the lock: `SELECT * FROM calendar WHERE listing_id = 'L12345' AND date BETWEEN '2024-07-03' AND '2024-07-06' FOR UPDATE`
> - This locks the 4 calendar rows at the database level
> - Even if Redis lock somehow failed, the database provides a second barrier
> - We verify all 4 dates show `available = true` and `booking_id IS NULL`
>
> **Layer 3 - Optimistic Locking with Version Numbers**:
> - Each listing has a `calendar_version` field (starts at 1, increments on any calendar change)
> - Before starting: read `calendar_version = 47`
> - After creating booking: `UPDATE listings SET calendar_version = calendar_version + 1 WHERE id = 'L12345' AND calendar_version = 47`
> - If this updates 0 rows, someone else modified the calendar concurrently - we rollback and retry
>
> **Layer 4 - Database Constraints (The Safety Net)**:
> - Table has constraint: `UNIQUE(listing_id, date) WHERE booking_id IS NOT NULL`
> - If all other layers fail, the database will reject duplicate bookings with a constraint violation
> - This is the absolute last line of defense - we should never reach it, but it's there
>
> **Layer 5 - Idempotency Keys**:
> - Client sends `X-Idempotency-Key: booking_req_abc123` header
> - Before processing, we check Redis: `GET idempotency:booking_req_abc123`
> - If found, return cached response (handles client retries due to network issues)
> - After successful booking, store: `SETEX idempotency:booking_req_abc123 86400 {booking_response}`
>
> **Failure Scenarios**:
> - *Redis is down*: Fall back to database-only locking with `SELECT FOR UPDATE`. Higher contention but still safe.
> - *Lock expires mid-transaction*: Optimistic locking version check will catch it. We rollback and return 'Please try again'.
> - *Service crashes after lock acquired*: TTL expires, next request can proceed. Incomplete booking is cleaned up by background job.
> - *Network partition during payment*: Booking created in 'pending' state, payment handled asynchronously with compensation logic."

**When Simpler Works**:
For < 100 bookings/day on a regional vacation rental site, a simple database transaction with `SELECT FOR UPDATE` is sufficient. The distributed lock adds value only when you have multiple service instances and high concurrency (>10 simultaneous booking attempts per second). A local bike rental shop doesn't need Redis locks - PostgreSQL ACID guarantees are enough.

---

### 2. "Why Elasticsearch for search over PostgreSQL full-text?" {#question-elasticsearch}

**What They're Probing**: Understanding of search technology trade-offs, when specialized tools matter, and avoiding over-engineering.

**Strong Answer**:

> "The decision hinges on query complexity, scale, and ranking requirements. Let me walk through a real search scenario:
>
> **Scenario**: Guest searches 'Paris, July 4th weekend, 2 guests, $100-200/night, entire place, wifi, kitchen, Superhost only'
>
> **Why Elasticsearch Wins at Scale**:
>
> 1. **Combined Geo + Text + Filters (The Killer Feature)**:
>    - Single query combines: `geo_distance` (within 25km of Paris center), `range` (price $100-200), `terms` (amenities: ['wifi', 'kitchen']), `bool` (Superhost = true)
>    - Elasticsearch handles this in 40-80ms across 3 million EU listings
>    - PostgreSQL can do this with PostGIS + GIN indexes, but query planning becomes unpredictable with 6+ filters
>
> 2. **Custom Relevance Scoring**:
>    - We use Elasticsearch's `function_score` to compute:
>      ```
>      base_score = BM25(query, listing_description)
>      decay_score = exp(-distance_to_center / 10km)
>      quality_score = (review_count * avg_rating) / 1000
>      booking_likelihood = ML_model_prediction (0-1)
>      freshness = 1 / (days_since_last_booking + 1)
>
>      final_score = 0.2*base_score + 0.15*decay_score + 0.25*quality_score + 0.3*booking_likelihood + 0.1*freshness
>      ```
>    - PostgreSQL has no equivalent to `function_score` - you'd need to compute in application layer
>
> 3. **Faceted Aggregations in Same Query**:
>    - Single query returns: results + 'Property Type' counts + 'Price Range' histogram + 'Amenities' counts
>    - Powers the filter sidebar showing '234 Entire homes, 89 Private rooms, 12 Shared rooms'
>    - PostgreSQL requires multiple queries or complex CTEs
>
> 4. **Fuzzy Matching and Synonyms**:
>    - 'Jacuzzi' matches 'hot tub', 'whirlpool', 'spa bath'
>    - 'Centre of Paris' matches 'Center of Paris'
>    - Built-in analyzers handle accents: 'cafe' matches 'caf'
>
> **The Numbers**:
> - 7M total listings, 3M in EU cluster
> - 50M searches/day globally
> - P50 latency: 45ms, P99: 180ms
> - PostgreSQL equivalent: P50 ~200ms, P99 ~800ms (tested)
>
> **When PostgreSQL is Fine**:
> - < 10K listings: `ts_vector` + GIN index handles full-text, PostGIS handles geo
> - Simple filters (location + dates + price): Well-indexed queries return in <50ms
> - Vrbo ran on PostgreSQL for years before adding Elasticsearch
> - A 5,000-listing 'Beach Houses in Outer Banks' site doesn't need Elasticsearch
>
> **The Real Trade-off**:
> - Elasticsearch adds operational complexity: cluster management, memory tuning, reindexing during schema changes, eventual consistency with primary database
> - If your search is 'location + dates + a few filters', PostgreSQL with proper indexes is simpler and cheaper
> - Add Elasticsearch when: query latency exceeds 200ms, you need ML-based ranking, or faceted search becomes a requirement"

**When Simpler Works**:
Vrbo's early architecture used PostgreSQL with careful indexing. For a regional vacation rental site with 5,000 listings, a well-indexed PostgreSQL query with `ts_vector` and PostGIS can return results in < 50ms. Elasticsearch adds operational complexity (cluster management, reindexing) that isn't justified until you hit 50K+ listings with complex ranking needs.

---

### 3. "How do you handle availability calendars at scale?" {#question-availability}

**What They're Probing**: Data modeling decisions, storage trade-offs, and understanding of query patterns.

**Strong Answer**:

> "Calendar storage is a fascinating trade-off between storage efficiency, query performance, and update complexity. Let me walk through the options with real numbers:
>
> **Option 1: Date-Per-Row (Simple but Storage-Heavy)**
>
> Schema:
> ```sql
> CREATE TABLE calendar (
>     listing_id UUID,
>     date DATE,
>     available BOOLEAN,
>     price DECIMAL,
>     min_nights INT,
>     booking_id UUID,
>     PRIMARY KEY (listing_id, date)
> );
> ```
>
> Numbers for Airbnb Scale:
> - 7M listings x 365 days x 2 years forward visibility = **5.1 billion rows**
> - Each row ~50 bytes = **255 GB** just for calendar data
> - Query 'Is Dec 15-20 available?' = Check 5 rows, fast with index
> - Update on booking = Update 5 rows, still fast
>
> **Option 2: Range-Based (Compact but Complex)**
>
> Schema:
> ```sql
> CREATE TABLE calendar_blocks (
>     id UUID PRIMARY KEY,
>     listing_id UUID,
>     start_date DATE,
>     end_date DATE,
>     block_type ENUM('booked', 'host_blocked', 'maintenance'),
>     booking_id UUID
> );
> CREATE INDEX idx_availability ON calendar_blocks (listing_id, start_date, end_date);
> ```
>
> Numbers:
> - Average listing has ~20 blocks/year (bookings + host blocks)
> - 7M listings x 20 blocks = **140 million rows**
> - Storage: ~10 GB (25x smaller!)
> - Query 'Is Dec 15-20 available?' = `NOT EXISTS (SELECT 1 WHERE start_date < '2024-12-20' AND end_date > '2024-12-15')`
>
> Complications:
> - 'Get calendar for December' requires computing availability by subtracting blocks from date range
> - Overlapping blocks need careful handling
> - Updates can require block splitting (guest books days 15-17 of a block covering 15-20)
>
> **Option 3: Hybrid with Redis Bitmaps (Airbnb Scale)**
>
> Architecture:
> - **PostgreSQL**: Source of truth with range-based calendar_blocks table
> - **Redis**: Availability bitmaps for fast search filtering
>
> Redis Bitmap Structure:
> ```
> Key: availability:listing:L12345:2024
> Value: 365 bits, one per day (bit 0 = Jan 1, bit 364 = Dec 31)
> Size: 46 bytes per listing per year
> Total: 7M listings x 46 bytes = 322 MB (fits in memory!)
> ```
>
> Query 'Find available listings in Paris for Dec 15-20':
> 1. Elasticsearch returns 50,000 listing IDs matching Paris geo-filter
> 2. For each listing, Redis: `GETBIT availability:L12345:2024 349` through `GETBIT ... 354` (days 349-354)
> 3. Filter to listings where all 6 bits are 1 (available)
> 4. This batch operation completes in ~5ms for 50,000 listings!
>
> Update Flow:
> 1. Booking created in PostgreSQL (source of truth)
> 2. Kafka event: `{listing_id: L12345, dates: [2024-12-15, 2024-12-20], available: false}`
> 3. Consumer updates Redis bitmap: `SETBIT availability:L12345:2024 349 0` through day 354
> 4. Eventual consistency: 50-200ms delay between booking and search index update (acceptable)
>
> **Real Scenario - Preventing Oversell**:
>
> Guest searches Paris for July 4th weekend at 10:00:00.000:
> - Search returns listing L12345 as available (based on Redis bitmap)
> - Guest clicks 'Book Now' at 10:00:05.000
> - Meanwhile, another guest booked L12345 at 10:00:03.000
> - Redis bitmap updated at 10:00:03.150 (150ms later)
> - Guest A's booking attempt at 10:00:05.000 hits Booking Service
> - Booking Service checks PostgreSQL (source of truth), finds dates blocked
> - Returns 'Sorry, these dates were just booked' - no oversell!
>
> **The Key Insight**: Search can be eventually consistent (we accept showing slightly stale results), but booking MUST check the source of truth (PostgreSQL) before confirming."

**When Simpler Works**:
Vrbo uses simple calendar tables - no fancy availability system. For < 50K listings, a straightforward date-per-row table with composite index on `(listing_id, date)` handles everything. Pre-optimization here is the enemy of shipping.

---

### 4. "How would you implement dynamic pricing?" {#question-dynamic-pricing}

**What They're Probing**: Understanding of pricing strategies, ML integration, and balancing host control with optimization.

**Strong Answer**:

> "Dynamic pricing is a multi-layered system that balances revenue optimization with host trust and guest experience. Let me walk through the complete implementation:
>
> **Layer 1: Rule-Based Pricing (Everyone Starts Here)**
>
> ```python
> def calculate_base_multiplier(listing, date):
>     multiplier = 1.0
>
>     # Day of week: Fri-Sat premium
>     if date.weekday() in [4, 5]:  # Friday, Saturday
>         multiplier *= 1.20  # +20%
>
>     # Seasonal: Paris in summer vs winter
>     season = get_season(listing.location, date)
>     season_multipliers = {
>         'high': 1.35,      # July-August, Christmas
>         'shoulder': 1.10,  # May-June, September
>         'low': 0.85        # January-February
>     }
>     multiplier *= season_multipliers[season]
>
>     # Local events
>     events = get_local_events(listing.location, date)
>     if 'olympics' in events:
>         multiplier *= 2.5  # Paris Olympics 2024
>     elif 'major_conference' in events:
>         multiplier *= 1.4
>     elif 'local_festival' in events:
>         multiplier *= 1.2
>
>     return multiplier
> ```
>
> **Layer 2: Demand-Based Adjustment**
>
> Real-time demand signals:
> - **Search-to-view ratio**: 'Paris July 4th' searched 50,000 times yesterday, only 5,000 clicked through = oversupply, reduce prices
> - **View-to-book ratio**: 100 people viewed listing L12345 last week, 0 booked = price too high
> - **Days until check-in**: 60+ days out = standard price, 14-30 days = slight increase if high demand, <7 days = discount if unsold
> - **Competitor pricing**: Similar listings in area priced $20 lower = adjust to stay competitive
>
> ```python
> def get_demand_multiplier(listing, date):
>     days_out = (date - today()).days
>     local_demand = get_demand_score(listing.location, date)  # 0-1
>
>     if days_out > 60:
>         # Far out: standard pricing
>         return 1.0 + (local_demand - 0.5) * 0.2  # +/- 10%
>     elif days_out > 14:
>         # Medium term: respond to demand
>         if local_demand > 0.8:
>             return 1.15  # High demand: +15%
>         elif local_demand < 0.3:
>             return 0.90  # Low demand: -10%
>     else:
>         # Last minute: fill or discount
>         if listing.booked_rate_30d > 0.8:
>             return 1.10  # Popular listing, hold price
>         else:
>             return 0.80  # Need to fill, discount
> ```
>
> **Layer 3: ML-Based Optimization (Airbnb Scale)**
>
> Model inputs:
> - Historical booking data (what price actually converts?)
> - Listing attributes (photos quality score, review sentiment, response time)
> - Competitive set pricing
> - Seasonality patterns
> - Local demand signals
>
> Model output: **Optimal price point that maximizes expected revenue**
>
> ```
> Expected Revenue = Price * P(booking at Price)
>
> Example for listing L12345 on July 4th:
> - At $150/night: 80% booking probability = $120 expected revenue
> - At $180/night: 60% booking probability = $108 expected revenue
> - At $200/night: 40% booking probability = $80 expected revenue
>
> Recommendation: $150/night (highest expected revenue)
> ```
>
> **Layer 4: Host Control and Trust**
>
> Critical design decisions:
> - **Minimum price**: Host sets floor, system never goes below
> - **Maximum price**: Host sets ceiling (avoid PR disasters)
> - **Suggested vs. automatic**: 'Smart Pricing' shows suggestion, host approves
> - **Gradual adjustment**: Never change price more than 20% in a single day
> - **Transparency**: Show host why price was adjusted ('Local demand +15%')
>
> **Real Example - Paris July 4th Weekend**:
> ```
> Listing: Cozy Marais Apartment, Base price: $120/night
>
> Rule-based:
>   - Weekend: +20% = $144
>   - High season: +35% = $194
>
> Demand-based:
>   - 45 days out, demand score 0.85 (high)
>   - Demand multiplier: +15% = $223
>
> ML adjustment:
>   - Similar listings booking at $200-250
>   - This listing's conversion rate drops above $230
>   - Optimal price: $219
>
> Final suggestion: $219/night (host sees breakdown)
> Host can: Accept, modify, or disable Smart Pricing
> ```
>
> **Failure Scenarios and Guardrails**:
> - **Price spike during tragedy**: Manual override to disable surge during natural disasters
> - **Race to bottom**: Minimum price floor prevents destructive competition
> - **ML model drift**: A/B test continuously, human review of outliers
> - **Guest backlash**: Cap automatic increases at +50%, larger changes need host approval"

**When Simpler Works**:
For a small property management company, a simple seasonal pricing table (high/medium/low season multipliers) plus weekend premiums covers 80% of the value. The ML complexity is only justified when you have enough historical data (10K+ bookings) to train meaningful models.

---

### 5. "How do you ensure search results stay fresh when listings change?" {#question-search-freshness}

**What They're Probing**: Understanding of data synchronization, eventual consistency, and cache invalidation strategies.

**Strong Answer**:

> "Search freshness is a classic consistency vs. performance trade-off. Let me walk through the complete data flow and the decisions at each layer:
>
> **The Core Problem**:
> - Host blocks December 15-20 at 10:00:00.000
> - Guest searches 'Paris December 15-20' at 10:00:00.500
> - Will guest see the now-unavailable listing?
>
> **Data Flow Architecture**:
>
> ```
> Host Action (Block Dates)
>     |
>     v
> Listing Service (PostgreSQL) -- Source of Truth
>     |
>     v
> Kafka Event: {listing_id: L12345, event: 'availability_changed', dates: [...]}
>     |
>     +---> Search Indexer --> Elasticsearch (50-200ms delay)
>     |
>     +---> Cache Invalidator --> Redis Bitmap (20-50ms delay)
>     |
>     +---> Notification Service --> Push to guests with wishlists
> ```
>
> **Layer 1: Event Publishing (The Source)**
>
> Every listing change publishes to Kafka:
> ```python
> def block_dates(listing_id, start_date, end_date, reason):
>     # Write to PostgreSQL (source of truth)
>     CalendarBlock.objects.create(
>         listing_id=listing_id,
>         start_date=start_date,
>         end_date=end_date,
>         block_type=reason
>     )
>
>     # Publish event for downstream consumers
>     kafka.publish('listing-changes', {
>         'event_type': 'availability_changed',
>         'listing_id': listing_id,
>         'dates_blocked': date_range(start_date, end_date),
>         'timestamp': now(),
>         'version': listing.calendar_version
>     })
> ```
>
> **Layer 2: Search Index Update (Elasticsearch)**
>
> Consumer processes events and updates search index:
> ```python
> @kafka_consumer('listing-changes')
> def update_search_index(event):
>     listing = fetch_listing_with_calendar(event['listing_id'])
>
>     # Compute availability for next 365 days
>     availability_bitmap = compute_availability_bitmap(listing)
>
>     # Update Elasticsearch document
>     es.update(
>         index='listings',
>         id=event['listing_id'],
>         body={
>             'doc': {
>                 'availability_bitmap': availability_bitmap,
>                 'last_updated': now()
>             }
>         }
>     )
> ```
>
> Latency breakdown:
> - Kafka consumer lag: 10-50ms
> - Fetch listing data: 5-20ms
> - Compute availability: 1-5ms
> - Elasticsearch update: 20-100ms
> - **Total: 50-200ms** (acceptable for search)
>
> **Layer 3: Staleness Windows by Feature**
>
> | Feature | Acceptable Staleness | Implementation |
> |---------|---------------------|----------------|
> | Search results | 30-60 seconds | ES index + Kafka |
> | Listing detail page | 5 seconds | Redis cache, short TTL |
> | Availability calendar view | 0 seconds | Direct PostgreSQL query |
> | Booking confirmation | 0 seconds | PostgreSQL with locks |
>
> **Layer 4: The Safety Net (Booking Time Re-Check)**
>
> Even with 60-second search staleness, bookings are safe:
> ```python
> def create_booking(guest_id, listing_id, dates):
>     # ALWAYS check source of truth, never trust cached data
>     with db.transaction():
>         availability = CalendarBlock.objects.filter(
>             listing_id=listing_id,
>             start_date__lt=dates.end,
>             end_date__gt=dates.start
>         ).select_for_update()  # Lock rows
>
>         if availability.exists():
>             raise DatesNoLongerAvailable(
>                 "Sorry, these dates were just booked or blocked"
>             )
>
>         # Proceed with booking...
> ```
>
> **Real Scenario - The 'Ghost Listing' Problem**:
>
> Timeline:
> - 10:00:00.000 - Listing L12345 gets booked by Guest A
> - 10:00:00.100 - Kafka event published
> - 10:00:00.150 - Guest B searches, Elasticsearch still shows L12345 as available
> - 10:00:00.200 - Elasticsearch index updated (L12345 now shows unavailable)
> - 10:00:00.300 - Guest B clicks on L12345 from stale search results
> - 10:00:00.350 - Listing detail page shows 'Dates no longer available' (Redis cache updated, or direct DB check)
>
> Result: **No double-booking, minor UX friction** (guest sees listing in search, but detail page shows unavailable)
>
> **Optimization: Optimistic UI with Reconciliation**
>
> ```javascript
> // Client-side
> function onSearchResults(results) {
>     // Show results immediately (may be slightly stale)
>     renderResults(results);
>
>     // Background refresh availability for visible listings
>     const visibleIds = results.slice(0, 20).map(r => r.id);
>     const freshAvailability = await api.checkBulkAvailability(visibleIds, dates);
>
>     // Update UI to mark any newly-unavailable listings
>     freshAvailability.forEach(item => {
>         if (!item.available) {
>             markAsUnavailable(item.id);
>         }
>     });
> }
> ```
>
> **Monitoring and Alerting**:
> - Track Kafka consumer lag - alert if > 5 seconds
> - Monitor search-to-booking 'sorry, not available' rate - should be < 2%
> - If rate spikes, investigate indexing delays"

**When Simpler Works**:
For < 10K listings, skip Kafka entirely. Direct database queries with proper indexing give you real-time accuracy. The complexity of event-driven sync is only justified when query volume makes direct DB access a bottleneck (typically > 1,000 searches/minute).

</div>

---

## Why This Technology? {#why-this-technology}

<div class="diagram-container">

### Technology Decision Matrix {#technology-decision-matrix}

| Decision Point | Technology | Why This Choice | When to Reconsider |
|---------------|------------|-----------------|-------------------|
| **Search Engine** | Elasticsearch | Geo queries + facets + custom scoring | < 10K listings: PostgreSQL + PostGIS |
| **Primary DB** | PostgreSQL | ACID for bookings, mature ecosystem | > 100K writes/sec: Consider Vitess |
| **Calendar Store** | PostgreSQL + Redis | Source of truth + fast availability bitmaps | < 50K listings: PostgreSQL only |
| **Distributed Lock** | Redis | Sub-ms latency, battle-tested SETNX | < 10 concurrent bookings: DB locks |
| **Event Bus** | Kafka | Durability, replay, high throughput | < 1K events/sec: PostgreSQL NOTIFY or Redis Pub/Sub |
| **Image Storage** | S3 + CloudFront | Infinite scale, global CDN | < 100K images: Cloudflare R2 (cheaper) |
| **Payments** | Stripe | Marketplace payouts, escrow, compliance | Regional: Local PSP might be required |

### Key Decision Drivers {#key-decision-drivers}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 16px;">

<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-title" style="color: #3b82f6;">Elasticsearch over PostgreSQL Full-Text</div>
<div class="data-card-description">
&#9679; Geo-spatial + text + filters combined: ES wins<br/>
&#9679; Custom relevance scoring: ES has function_score<br/>
&#9679; Synonyms, fuzzy matching: ES built-in<br/>
&#9679; < 10K docs with simple queries: PostgreSQL fine<br/>
&#9679; Operational simplicity priority: PostgreSQL wins
</div>
</div>
</div>

<div class="data-card data-card-accent error">
<div class="data-card-content">
<div class="data-card-title" style="color: #ef4444;">Redis for Locking over Database Locks</div>
<div class="data-card-description">
&#9679; Multiple service instances: Redis required<br/>
&#9679; Lock with TTL (prevent deadlocks): Redis native<br/>
&#9679; Single monolith: SELECT FOR UPDATE sufficient<br/>
&#9679; < 100 concurrent requests: Database locks fine
</div>
</div>
</div>

<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-title" style="color: #10b981;">Kafka over Simpler Queues</div>
<div class="data-card-description">
&#9679; Event replay for debugging: Kafka required<br/>
&#9679; Multiple consumers per event: Kafka excels<br/>
&#9679; Exactly-once semantics needed: Kafka Streams<br/>
&#9679; Simple job queue: Redis + Bull sufficient<br/>
&#9679; < 1K msgs/min: PostgreSQL-backed queue fine
</div>
</div>
</div>

</div>

</div>

---

## When Simpler Solutions Work {#when-simpler-solutions-work}

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### The "$400/month Rental Platform" Architecture {#simple-architecture}

For a regional vacation rental platform (think: "Cabins in Vermont" or "Beach houses in Outer Banks"):

<div class="diagram-container">
<div class="flow-diagram" style="align-items: stretch;">

<h4 style="color: #64748b; margin: 0 0 16px 0; text-align: center;">Reality Check</h4>

<div class="flow-row" style="margin-bottom: 20px;">
<div class="flow-box primary" style="flex: 1; min-width: 100px;">
<div style="font-size: 18px; font-weight: bold;">500-5,000</div>
<div class="flow-box-subtitle">listings</div>
</div>
<div class="flow-box success" style="flex: 1; min-width: 100px;">
<div style="font-size: 18px; font-weight: bold;">50-500</div>
<div class="flow-box-subtitle">bookings/day</div>
</div>
<div class="flow-box warning" style="flex: 1; min-width: 100px;">
<div style="font-size: 18px; font-weight: bold;">10,000</div>
<div class="flow-box-subtitle">monthly users</div>
</div>
<div class="flow-box purple" style="flex: 1; min-width: 100px;">
<div style="font-size: 18px; font-weight: bold;">$400-800</div>
<div class="flow-box-subtitle">infra/month</div>
</div>
</div>

<h4 style="color: #10b981; margin: 0 0 16px 0; text-align: center;">What You Actually Need</h4>

<!-- Vercel/Railway -->
<div class="flow-box info" style="width: 100%; max-width: 400px;">
<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
<div style="text-align: left;">
<div class="flow-box-title">Vercel / Railway</div>
<div class="flow-box-subtitle">Next.js App</div>
</div>
<span class="diagram-badge info">$20/month</span>
</div>
</div>

<div class="flow-arrow">&#8595;</div>

<!-- PostgreSQL -->
<div class="flow-box success" style="width: 100%; max-width: 400px;">
<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
<div style="text-align: left;">
<div class="flow-box-title">PostgreSQL (Supabase)</div>
</div>
<span class="diagram-badge success">$25/month</span>
</div>
<div style="font-size: 11px; line-height: 1.6; text-align: left; margin-top: 10px; opacity: 0.9;">
&#8226; Listings table with PostGIS for geo queries<br/>
&#8226; Calendar table (date-per-row, it's fine!)<br/>
&#8226; GIN index for amenities JSONB<br/>
&#8226; Full-text search with ts_vector
</div>
</div>

<div class="flow-arrow">&#8595;</div>

<!-- Stripe + Cloudflare -->
<div class="flow-box purple" style="width: 100%; max-width: 400px;">
<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
<div style="text-align: left;">
<div class="flow-box-title">Stripe + Cloudflare</div>
<div class="flow-box-subtitle">Payments + Image CDN + R2 Storage</div>
</div>
<span class="diagram-badge purple">~$50/month</span>
</div>
</div>

<div class="flow-box success" style="width: 100%; max-width: 400px; margin-top: 16px;">
<div class="flow-box-title">Total: ~$100/month (scales to 10K listings easily)</div>
</div>

</div>
</div>

### When You DON'T Need Elasticsearch {#when-no-elasticsearch}

| Scenario | PostgreSQL Solution | Performance |
|----------|-------------------|-------------|
| < 10K listings | `WHERE` clauses + B-tree indexes | < 50ms |
| Geo search | PostGIS `ST_DWithin` | < 100ms |
| Full-text | `ts_vector` + GIN index | < 50ms |
| Faceted filters | JSONB + GIN + partial indexes | < 100ms |
| 20+ filters | Composite indexes + query planning | < 200ms |

**Real example**: A 5,000-listing platform queries:
```sql
SELECT * FROM listings
WHERE ST_DWithin(location, ST_MakePoint(-73.9, 40.7)::geography, 50000)
  AND available_dates @> '[2024-12-15, 2024-12-20]'::daterange
  AND guests >= 4
  AND amenities @> '["wifi", "parking"]'
ORDER BY rating DESC
LIMIT 20;
-- Execution time: 45ms with proper indexes
```

### When You DON'T Need Distributed Locking {#when-no-distributed-locking}

<div class="diagram-container">

<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 16px;">Question: Do I need Redis for double-booking prevention?</div>

<div style="display: flex; flex-direction: column; gap: 8px;">

<div style="display: flex; align-items: center; gap: 12px;">
<span style="color: #10b981; font-size: 16px;">&#10003;</span>
<span style="color: #64748b; font-size: 12px;"><strong style="color: #0f172a;">Single database instance?</strong> SELECT FOR UPDATE is enough</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<span style="color: #10b981; font-size: 16px;">&#10003;</span>
<span style="color: #64748b; font-size: 12px;"><strong style="color: #0f172a;">< 10 concurrent booking attempts/second?</strong> Database locks fine</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<span style="color: #10b981; font-size: 16px;">&#10003;</span>
<span style="color: #64748b; font-size: 12px;"><strong style="color: #0f172a;">Monolithic application?</strong> Transaction isolation handles it</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<span style="color: #f97316; font-size: 16px;">&#9888;</span>
<span style="color: #64748b; font-size: 12px;"><strong style="color: #0f172a;">Multiple service instances writing?</strong> Now consider Redis</span>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<span style="color: #ef4444; font-size: 16px;">&#9679;</span>
<span style="color: #64748b; font-size: 12px;"><strong style="color: #0f172a;">Global distribution with latency concerns?</strong> Redis + careful design</span>
</div>

</div>

</div>

### When You DON'T Need Kafka {#when-no-kafka}

| Use Case | Simpler Alternative | Why It's Fine |
|----------|-------------------|---------------|
| Booking notifications | Synchronous calls + retry queue | < 1K/day doesn't need durability |
| Search index updates | PostgreSQL triggers + pg_notify | Real-time, no separate infra |
| Analytics events | Direct insert to analytics DB | Batch processing overnight |
| Email sending | Redis + Bull queue | Simple job queue pattern |

### The Vrbo Reality Check {#vrbo-reality-check}

> "Vrbo (formerly HomeAway) scaled to millions of listings using relatively simple calendar tables - no fancy availability bitmaps, no Redis caching, no Elasticsearch until much later. Their original architecture was PostgreSQL-heavy with careful indexing. The complexity came when they needed real-time pricing optimization and sub-second search across 2M+ listings."

</div>
</div>

---

## Trade-off Analysis & Mitigation {#trade-off-analysis-mitigation}

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Consistency vs. Availability Trade-offs {#consistency-availability-tradeoffs}

| Component | Consistency Level | Trade-off | Mitigation |
|-----------|------------------|-----------|------------|
| **Booking Creation** | Strong (CP) | Blocks during network partition | Fail fast, show "try again" |
| **Availability Check** | Strong (CP) | Higher latency | Cache recent checks for 10s |
| **Search Results** | Eventual (AP) | Stale listings shown | "Check availability" on detail page |
| **Reviews** | Eventual (AP) | Delay in appearing | Show "pending" state |
| **Pricing Updates** | Eventual (AP) | Price mismatch possible | Lock price at booking start |

### Search Latency vs. Accuracy Trade-offs {#search-latency-accuracy}

<div class="diagram-container">
<div class="flow-diagram">

<h4 style="color: #3b82f6; text-align: center; margin: 0 0 20px 0;">SEARCH FRESHNESS SPECTRUM</h4>

<div class="flow-row">

<div class="flow-box success" style="flex: 1; min-width: 140px;">
<div class="flow-box-title" style="font-size: 12px;">Real-time (0s)</div>
<div style="font-size: 20px; font-weight: bold; margin: 4px 0;">Direct ES</div>
<div class="flow-box-subtitle">100ms latency</div>
<div class="flow-box-subtitle">Always accurate</div>
</div>

<div class="flow-box primary" style="flex: 1; min-width: 140px;">
<div class="flow-box-title" style="font-size: 12px;">Cached (5min)</div>
<div style="font-size: 20px; font-weight: bold; margin: 4px 0;">Redis Cache</div>
<div class="flow-box-subtitle">5ms latency</div>
<div class="flow-box-subtitle">Mostly accurate</div>
</div>

<div class="flow-box neutral" style="flex: 1; min-width: 140px;">
<div class="flow-box-title" style="font-size: 12px;">Stale</div>
<div style="font-size: 20px; font-weight: bold; margin: 4px 0;">CDN Cache</div>
<div class="flow-box-subtitle">1ms latency</div>
<div class="flow-box-subtitle">Often stale</div>
</div>

</div>

<div class="data-card data-card-accent success" style="width: 100%; margin-top: 16px;">
<div class="data-card-content">
<div class="data-card-title" style="color: #10b981;">Recommendation</div>
<div class="data-card-description">
&#8226; Search listing page: 30s Redis cache (acceptable stale)<br/>
&#8226; Listing detail: Real-time availability check<br/>
&#8226; Booking flow: No cache, strong consistency
</div>
</div>
</div>

</div>
</div>

### Double-Booking Prevention: Defense in Depth {#defense-in-depth}

<div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">

<div class="data-card data-card-accent error">
<div class="data-card-content">
<div class="data-card-title" style="color: #ef4444;">Layer 1: Distributed Lock (Redis)</div>
<div class="data-card-description">
&#8226; SETNX with TTL prevents concurrent attempts<br/>
&#8226; <span style="color: #f97316;">Failure mode:</span> Lock expires before completion<br/>
&#8226; <span style="color: #10b981;">Mitigation:</span> Short TTL (5s) + optimistic locking
</div>
</div>
</div>

<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-title" style="color: #10b981;">Layer 2: Database Constraints</div>
<div class="data-card-description">
&#8226; UNIQUE constraint on (listing_id, date, type='booked')<br/>
&#8226; <span style="color: #f97316;">Failure mode:</span> None - database rejects duplicates<br/>
&#8226; <span style="color: #10b981;">Mitigation:</span> This is your safety net
</div>
</div>
</div>

<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-title" style="color: #3b82f6;">Layer 3: Optimistic Locking</div>
<div class="data-card-description">
&#8226; Version number on calendar, check-and-set<br/>
&#8226; <span style="color: #f97316;">Failure mode:</span> Retry on version mismatch<br/>
&#8226; <span style="color: #10b981;">Mitigation:</span> Exponential backoff, max 3 retries
</div>
</div>
</div>

<div class="data-card data-card-accent purple">
<div class="data-card-content">
<div class="data-card-title" style="color: #8b5cf6;">Layer 4: Idempotency Keys</div>
<div class="data-card-description">
&#8226; Client sends unique booking_request_id<br/>
&#8226; <span style="color: #f97316;">Failure mode:</span> Duplicate bookings from retries<br/>
&#8226; <span style="color: #10b981;">Mitigation:</span> Check for existing booking with same key
</div>
</div>
</div>

</div>

### Cost vs. Performance Trade-offs {#cost-performance-tradeoffs}

| Optimization | Cost Increase | Performance Gain | When Worth It |
|-------------|---------------|------------------|---------------|
| Redis cache layer | +$50/month | 10x faster reads | > 1K searches/min |
| Elasticsearch cluster | +$300/month | Complex queries possible | > 50K listings |
| CDN for images | +$100/month | 5x faster load times | > 10K daily users |
| Read replicas | +$200/month | 2x read capacity | > 100K daily queries |
| Regional deployment | +$500/month | 50% latency reduction | Global user base |

</div>
</div>

---

## Interview Tips {#interview-tips}

<div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 12px; padding: 24px; margin: 20px 0; color: #e2e8f0;">

### Key Discussion Points {#key-discussion-points}

1. **Search ranking**: Balancing relevance, quality, revenue - mention that Airbnb optimizes for booking likelihood, not just relevance
2. **Availability**: Calendar storage trade-offs (date-per-row vs. range-based) - know both approaches
3. **Double booking**: Distributed locking + database constraints as safety net
4. **Dynamic pricing**: Start with rules, add ML when you have data
5. **Trust & Safety**: Verification, fraud detection, review authenticity

### Common Follow-ups {#common-followups}

- How do you handle last-minute cancellations? (Refund policies, rebooking assistance, host protection)
- How do you verify listing photos? (ML-based comparison, guest feedback loop, periodic re-verification)
- How do you implement instant book vs request? (Trust score thresholds, host preferences, guest verification level)

---

### Red Flags (What NOT to Say) {#red-flags}

<div style="background: rgba(248, 81, 73, 0.1); border-left: 4px solid #ef4444; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

| Red Flag Statement | Why It's Bad | Better Alternative |
|-------------------|--------------|-------------------|
| "We need microservices from day one" | Over-engineering for a new platform | "Start monolithic, extract services when we hit specific pain points" |
| "Elasticsearch is required for search" | Shows lack of understanding of scale | "For < 10K listings, PostgreSQL with proper indexes works great" |
| "We'll use Kafka for all communication" | Unnecessary complexity | "Kafka adds value at high throughput; we'd start with simpler queues" |
| "Distributed locks solve double-booking" | Incomplete understanding | "Distributed locks help, but database constraints are the real safety net" |
| "We need real-time search updates" | Ignores practical trade-offs | "30-second staleness is acceptable for search; real-time check on booking" |
| "Let's shard the database immediately" | Premature optimization | "Single PostgreSQL handles millions of rows; shard when we need it" |

</div>

---

### Impressive Statements (What TO Say) {#impressive-statements}

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

| Impressive Statement | Why It Works |
|---------------------|--------------|
| "For < 10K listings, PostgreSQL with GIN indexes handles search fine - Elasticsearch adds operational overhead we don't need yet" | Shows you understand when NOT to use fancy tech |
| "Vrbo scaled to millions of listings with simple calendar tables before adding complexity" | Demonstrates industry knowledge beyond Airbnb |
| "I'd use SELECT FOR UPDATE for a monolith, Redis locks only when we have multiple service instances" | Shows nuanced understanding of when to add complexity |
| "The availability bitmap in Redis is an optimization - PostgreSQL is the source of truth" | Demonstrates cache vs. source-of-truth thinking |
| "Strong consistency for bookings, eventual consistency for search - different requirements" | Shows CAP theorem applied practically |
| "I'd start with rule-based pricing (weekends +20%, holidays +30%) before ML" | Practical, incremental approach to features |
| "The double-booking safety net is a database UNIQUE constraint - locks just reduce contention" | Deep understanding of failure modes |
| "For a $400/month budget, Supabase + Vercel + Stripe handles 5,000 listings easily" | Practical cost awareness |

</div>

---

### Scaling Triggers Cheat Sheet {#scaling-triggers}

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

| Trigger | Current Solution | When to Evolve | New Solution |
|---------|-----------------|----------------|--------------|
| > 10K listings | PostgreSQL full-text | Search > 200ms | Add Elasticsearch |
| > 100 bookings/sec | SELECT FOR UPDATE | Lock contention > 5% | Add Redis locks |
| > 1M calendar rows | Date-per-row table | Query > 100ms | Range-based + bitmap cache |
| > 50K images | Single S3 bucket | Upload bottleneck | CloudFront + image optimization |
| > 10 service instances | Monolith | Deployment coupling | Extract booking service first |
| > 100K daily searches | Direct Elasticsearch | P99 > 500ms | Add Redis cache layer |

</div>

</div>
