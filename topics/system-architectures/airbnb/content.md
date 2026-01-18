# Design Airbnb

## Problem Statement

Design a vacation rental marketplace that connects hosts with guests for property bookings.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff5a5f;">

### Core Requirements
- **Listings**: Property creation, photos, amenities, pricing
- **Search**: Location, dates, filters, map view
- **Booking**: Availability, reservation, payments
- **Reviews**: Two-way rating system
- **Messaging**: Host-guest communication
- **Host Tools**: Calendar, pricing, analytics

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">AIRBNB SYSTEM ARCHITECTURE</h3>

```
                              ┌─────────────────┐
                              │    Clients      │
                              │ Web│iOS│Android │
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
│  LISTING    │              │    SEARCH       │              │   BOOKING       │
│  SERVICE    │              │    SERVICE      │              │   SERVICE       │
│             │              │                 │              │                 │
│ - CRUD      │──────────────│ - Geo search    │              │ - Reservations  │
│ - Photos    │              │ - Filters       │              │ - Availability  │
│ - Pricing   │              │ - Rankings      │              │ - Payments      │
└──────┬──────┘              └────────┬────────┘              └────────┬────────┘
       │                              │                               │
       │                              │                               │
       │                     ┌────────▼────────┐                      │
       │                     │    PRICING      │                      │
       │                     │    SERVICE      │                      │
       │                     │                 │                      │
       │                     │ - Dynamic       │                      │
       │                     │ - Seasonal      │                      │
       │                     └─────────────────┘                      │
       │                                                              │
       └──────────────────────────────┬───────────────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │    KAFKA      │
                              └───────────────┘
```

</div>

---

## Search System

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">LISTING SEARCH PIPELINE</h4>

```
Search Query: "Paris, Dec 15-20, 2 guests"
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│                    SEARCH PIPELINE                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: GEO FILTER                                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - Parse "Paris" to bounding box / polygon               ││
│  │ - Filter listings within geographic area                ││
│  │ - Use Elasticsearch geo_shape query                     ││
│  │                                                          ││
│  │ Result: 50,000 listings in Paris                        ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  Step 2: AVAILABILITY FILTER                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - Check calendar for Dec 15-20                          ││
│  │ - Exclude booked listings                               ││
│  │ - Consider minimum stay requirements                    ││
│  │                                                          ││
│  │ Result: 15,000 available listings                       ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  Step 3: CAPACITY + FILTERS                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ - guests >= 2                                           ││
│  │ - Apply price range, property type, amenities           ││
│  │ - Instant Book, Superhost filters                       ││
│  │                                                          ││
│  │ Result: 5,000 matching listings                         ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  Step 4: RANKING                                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Ranking Score = w1 * quality_score                      ││
│  │               + w2 * review_score                       ││
│  │               + w3 * response_rate                      ││
│  │               + w4 * price_competitiveness              ││
│  │               + w5 * booking_likelihood (ML)            ││
│  │               + w6 * freshness_boost                    ││
│  │                                                          ││
│  │ Result: Top 100 ranked listings                         ││
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
- **Listings**: 1,000 - 50,000
- **Users**: 10,000 - 100,000
- **Bookings**: 100 - 1,000/day
- **Budget**: $3,000 - $15,000/month

### Monolithic Architecture

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

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Availability Calendar

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
Calendar Storage Strategy:

Option 1: Date-based rows (Simple)
┌─────────────────────────────────────────────────────────────┐
│ listing_id │    date    │ available │ price │ min_nights   │
├────────────┼────────────┼───────────┼───────┼──────────────┤
│    L1      │ 2024-12-15 │   false   │ 150   │      2       │
│    L1      │ 2024-12-16 │   false   │ 150   │      2       │
│    L1      │ 2024-12-17 │   true    │ 175   │      2       │
└─────────────────────────────────────────────────────────────┘

Option 2: Range-based (Better for queries)
┌─────────────────────────────────────────────────────────────┐
│ listing_id │ start_date │  end_date  │  type   │ booking_id │
├────────────┼────────────┼────────────┼─────────┼────────────┤
│    L1      │ 2024-12-15 │ 2024-12-17 │ booked  │   B123     │
│    L1      │ 2024-12-20 │ 2024-12-25 │ blocked │   null     │
└─────────────────────────────────────────────────────────────┘

Query: Available Dec 15-20?
SELECT NOT EXISTS(
    SELECT 1 FROM calendar_blocks
    WHERE listing_id = L1
    AND start_date < '2024-12-20'
    AND end_date > '2024-12-15'
)
```

</div>

### Dynamic Pricing

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

## Phase 3: Airbnb Scale

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Listings**: 7M+ active
- **Users**: 150M+
- **Bookings**: 500K+/day
- **Searches**: 50M+/day

### Booking Flow at Scale

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
DOUBLE-BOOKING PREVENTION

Problem: Two guests try to book same listing for same dates

    Guest A                    Guest B
        │                          │
        │ Book Dec 15-20           │ Book Dec 15-20
        │                          │
        ▼                          ▼
    ┌───────────────────────────────────────┐
    │         BOOKING SERVICE               │
    └───────────────────────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  Distributed Lock (Redis)             │
    │                                        │
    │  SETNX lock:listing:L1:2024-12-15-20 │
    │                                        │
    │  First request wins, second waits     │
    │  or fails fast                        │
    └───────────────────────────────────────┘
                    │
    ┌───────────────┴───────────────┐
    │                               │
    ▼                               ▼
┌─────────────┐             ┌─────────────┐
│ Guest A     │             │ Guest B     │
│ Lock acquired             │ Lock denied │
│             │             │             │
│ Check avail │             │ Return:     │
│ Create booking            │ "Not avail" │
│ Block dates │             │             │
│ Release lock│             │             │
└─────────────┘             └─────────────┘
```

</div>

### Search Sharding

```
┌─────────────────────────────────────────────────────────────┐
│              GEO-BASED SEARCH SHARDING                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Elasticsearch Cluster per Region:                          │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ US Cluster  │  │ EU Cluster  │  │ APAC Cluster│         │
│  │             │  │             │  │             │         │
│  │ - US listings│  │ - EU listings│  │ - APAC list.│         │
│  │ - 2M docs   │  │ - 3M docs   │  │ - 2M docs   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│  Query Routing:                                              │
│  - Parse search location                                    │
│  - Route to appropriate regional cluster                    │
│  - Cross-region queries rare (handled separately)           │
│                                                              │
│  Benefits:                                                   │
│  - Reduced index size per cluster                           │
│  - Lower latency for regional searches                      │
│  - Independent scaling                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Consistency for Bookings

```
Strong consistency required for:
- Availability checks
- Booking creation
- Payment processing

Eventual consistency OK for:
- Search results
- Reviews
- Analytics
```

### 2. Overbooking Prevention

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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Search ranking**: Balancing relevance, quality, revenue
2. **Availability**: Calendar storage and querying
3. **Double booking**: Distributed locking
4. **Dynamic pricing**: Supply/demand optimization
5. **Trust & Safety**: Verification, fraud detection

### Common Follow-ups

- How do you handle last-minute cancellations?
- How do you verify listing photos?
- How do you implement instant book vs request?

</div>
