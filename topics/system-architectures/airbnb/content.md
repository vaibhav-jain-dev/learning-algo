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

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff5a5f;">

### 1. "How do you prevent double-booking?"

**What They're Probing**: Understanding of race conditions, distributed locking, and consistency guarantees in concurrent systems.

**Strong Answer**:
> "Double-booking prevention requires multiple layers. First, I'd use a distributed lock (Redis SETNX) keyed on `listing:L1:dates:2024-12-15-20` with a TTL. The booking service acquires the lock, performs an availability check against the source of truth (PostgreSQL with row-level locking via SELECT FOR UPDATE), creates the booking, blocks the calendar dates atomically, then releases the lock. If lock acquisition fails, we return 'temporarily unavailable' and let the client retry. For extra safety, I'd add an optimistic locking version number on the calendar table - if the version changed between check and write, we rollback and retry."

**When Simpler Works**:
For < 100 bookings/day, a simple database transaction with `SELECT FOR UPDATE` is sufficient. The distributed lock adds value only when you have multiple service instances and high concurrency. A local bike rental shop doesn't need Redis locks - PostgreSQL ACID guarantees are enough.

---

### 2. "Why Elasticsearch for search over PostgreSQL full-text?"

**What They're Probing**: Understanding of search technology trade-offs, when specialized tools matter, and avoiding over-engineering.

**Strong Answer**:
> "The decision hinges on three factors: geo-spatial queries, faceted filtering, and relevance tuning. Elasticsearch excels at combining geo_distance queries with complex boolean filters (price range + amenities + property type) in sub-100ms. PostgreSQL can do this with PostGIS and GIN indexes, but struggles when you need 20+ simultaneous filters, custom scoring functions, and synonyms. The real win is relevance ranking - Elasticsearch lets us tune BM25, add decay functions for freshness, and incorporate ML-based booking likelihood scores. That said, for < 10K listings, PostgreSQL with GIN indexes handles search fine."

**When Simpler Works**:
Vrbo's early architecture used PostgreSQL with careful indexing. For a regional vacation rental site with 5,000 listings, a well-indexed PostgreSQL query with `ts_vector` and PostGIS can return results in < 50ms. Elasticsearch adds operational complexity (cluster management, reindexing) that isn't justified until you hit 50K+ listings with complex ranking needs.

---

### 3. "How do you handle availability calendars at scale?"

**What They're Probing**: Data modeling decisions, storage trade-offs, and understanding of query patterns.

**Strong Answer**:
> "There are two approaches: date-per-row and range-based. Date-per-row (one row per listing-date) is simple but creates 365 rows per listing per year - that's 2.5B rows for 7M listings. Range-based storage (start_date, end_date, type) is more compact but makes 'find all available dates' queries trickier. At Airbnb scale, I'd use a hybrid: range-based for bookings/blocks in PostgreSQL, with a denormalized availability bitmap in Redis for fast search filtering. The bitmap uses 365 bits per listing-year, allowing instant availability checks via bitwise AND. Calendar updates publish to Kafka, and a consumer updates both the PostgreSQL source of truth and the Redis cache."

**When Simpler Works**:
Vrbo uses simple calendar tables - no fancy availability system. For < 50K listings, a straightforward date-per-row table with composite index on `(listing_id, date)` handles everything. Pre-optimization here is the enemy of shipping.

---

### 4. "How would you implement dynamic pricing?"

**What They're Probing**: Understanding of pricing strategies, ML integration, and balancing host control with optimization.

**Strong Answer**:
> "Dynamic pricing has three tiers: rule-based, ML-assisted, and host override. Rule-based handles weekends (+20%), holidays (+30%), and low-season discounts. ML models predict demand using historical booking data, local events, competitor pricing, and seasonality - outputting a suggested price multiplier. Hosts see 'Smart Pricing' suggestions but retain full control. The key insight is that aggressive dynamic pricing hurts trust - a 4x surge on New Year's Eve might maximize short-term revenue but damages long-term host-guest relationships. I'd cap automatic adjustments at +50% and require host approval for larger changes."

**When Simpler Works**:
For a small property management company, a simple seasonal pricing table (high/medium/low season multipliers) plus weekend premiums covers 80% of the value. The ML complexity is only justified when you have enough historical data (10K+ bookings) to train meaningful models.

---

### 5. "How do you ensure search results stay fresh when listings change?"

**What They're Probing**: Understanding of data synchronization, eventual consistency, and cache invalidation strategies.

**Strong Answer**:
> "Listing changes flow through Kafka to maintain eventual consistency. When a host updates pricing or blocks dates, the Listing Service publishes an event. The Search Indexer consumes this and updates Elasticsearch. The challenge is staleness during high-traffic periods - a listing might show as available in search but be booked when you click. I'd solve this with: (1) short TTL on search results (cache for 30 seconds max), (2) real-time availability check when viewing listing details, (3) optimistic UI that immediately reflects bookings. For the search index, I'd accept 30-60 second staleness as a reasonable trade-off against indexing throughput."

**When Simpler Works**:
For < 10K listings, skip Kafka entirely. Direct database queries with proper indexing give you real-time accuracy. The complexity of event-driven sync is only justified when query volume makes direct DB access a bottleneck.

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

| Decision Point | Technology | Why This Choice | When to Reconsider |
|---------------|------------|-----------------|-------------------|
| **Search Engine** | Elasticsearch | Geo queries + facets + custom scoring | < 10K listings: PostgreSQL + PostGIS |
| **Primary DB** | PostgreSQL | ACID for bookings, mature ecosystem | > 100K writes/sec: Consider Vitess |
| **Calendar Store** | PostgreSQL + Redis | Source of truth + fast availability bitmaps | < 50K listings: PostgreSQL only |
| **Distributed Lock** | Redis | Sub-ms latency, battle-tested SETNX | < 10 concurrent bookings: DB locks |
| **Event Bus** | Kafka | Durability, replay, high throughput | < 1K events/sec: PostgreSQL NOTIFY or Redis Pub/Sub |
| **Image Storage** | S3 + CloudFront | Infinite scale, global CDN | < 100K images: Cloudflare R2 (cheaper) |
| **Payments** | Stripe | Marketplace payouts, escrow, compliance | Regional: Local PSP might be required |

### Key Decision Drivers

```
Elasticsearch over PostgreSQL Full-Text:
├── Geo-spatial + text + filters combined: ES wins
├── Custom relevance scoring: ES has function_score
├── Synonyms, fuzzy matching: ES built-in
├── < 10K docs with simple queries: PostgreSQL fine
└── Operational simplicity priority: PostgreSQL wins

Redis for Locking over Database Locks:
├── Multiple service instances: Redis required
├── Lock with TTL (prevent deadlocks): Redis native
├── Single monolith: SELECT FOR UPDATE sufficient
└── < 100 concurrent requests: Database locks fine

Kafka over Simpler Queues:
├── Event replay for debugging: Kafka required
├── Multiple consumers per event: Kafka excels
├── Exactly-once semantics needed: Kafka Streams
├── Simple job queue: Redis + Bull sufficient
└── < 1K msgs/min: PostgreSQL-backed queue fine
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$400/month Rental Platform" Architecture

For a regional vacation rental platform (think: "Cabins in Vermont" or "Beach houses in Outer Banks"):

```
Reality Check:
- 500-5,000 listings
- 50-500 bookings/day
- 10,000 monthly active users
- Budget: $400-800/month infrastructure

What You Actually Need:
┌─────────────────────────────────────────────────────────────┐
│                     SIMPLE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Vercel / Railway                     ││
│  │                    (Next.js App)                        ││
│  │                      $20/month                          ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                PostgreSQL (Supabase)                    ││
│  │                                                          ││
│  │  - Listings table with PostGIS                          ││
│  │  - Calendar table (date-per-row, it's fine)             ││
│  │  - GIN index for amenities JSONB                        ││
│  │  - Full-text search with ts_vector                      ││
│  │                      $25/month                          ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│                              ▼                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 Stripe + Cloudflare                      ││
│  │           Payments + Image CDN + R2 Storage             ││
│  │                    ~$50/month                           ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Total: ~$100/month (scales to 10K listings easily)        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### When You DON'T Need Elasticsearch

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

### When You DON'T Need Distributed Locking

```
Question: Do I need Redis for double-booking prevention?

Decision Tree:
├── Single database instance? → SELECT FOR UPDATE is enough
├── < 10 concurrent booking attempts/second? → Database locks fine
├── Monolithic application? → Transaction isolation handles it
├── Multiple service instances writing? → Now consider Redis
└── Global distribution with latency concerns? → Redis + careful design
```

### When You DON'T Need Kafka

| Use Case | Simpler Alternative | Why It's Fine |
|----------|-------------------|---------------|
| Booking notifications | Synchronous calls + retry queue | < 1K/day doesn't need durability |
| Search index updates | PostgreSQL triggers + pg_notify | Real-time, no separate infra |
| Analytics events | Direct insert to analytics DB | Batch processing overnight |
| Email sending | Redis + Bull queue | Simple job queue pattern |

### The Vrbo Reality Check

> "Vrbo (formerly HomeAway) scaled to millions of listings using relatively simple calendar tables - no fancy availability bitmaps, no Redis caching, no Elasticsearch until much later. Their original architecture was PostgreSQL-heavy with careful indexing. The complexity came when they needed real-time pricing optimization and sub-second search across 2M+ listings."

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Consistency vs. Availability Trade-offs

| Component | Consistency Level | Trade-off | Mitigation |
|-----------|------------------|-----------|------------|
| **Booking Creation** | Strong (CP) | Blocks during network partition | Fail fast, show "try again" |
| **Availability Check** | Strong (CP) | Higher latency | Cache recent checks for 10s |
| **Search Results** | Eventual (AP) | Stale listings shown | "Check availability" on detail page |
| **Reviews** | Eventual (AP) | Delay in appearing | Show "pending" state |
| **Pricing Updates** | Eventual (AP) | Price mismatch possible | Lock price at booking start |

### Search Latency vs. Accuracy Trade-offs

```
┌─────────────────────────────────────────────────────────────┐
│                 SEARCH FRESHNESS SPECTRUM                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Real-time (0s)          Cached (5min)          Stale       │
│       │                        │                    │        │
│       ▼                        ▼                    ▼        │
│  ┌─────────┐            ┌─────────┐           ┌─────────┐   │
│  │ Direct  │            │ Redis   │           │ CDN     │   │
│  │ ES Query│            │ Cache   │           │ Cache   │   │
│  │         │            │         │           │         │   │
│  │ 100ms   │            │ 5ms     │           │ 1ms     │   │
│  │ Accurate│            │ Mostly  │           │ Often   │   │
│  │         │            │ Accurate│           │ Stale   │   │
│  └─────────┘            └─────────┘           └─────────┘   │
│                                                              │
│  Recommendation:                                             │
│  - Search listing page: 30s Redis cache (acceptable stale)  │
│  - Listing detail: Real-time availability check             │
│  - Booking flow: No cache, strong consistency               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Double-Booking Prevention: Defense in Depth

```
Layer 1: Distributed Lock (Redis)
├── SETNX with TTL prevents concurrent attempts
├── Failure mode: Lock expires → potential race
└── Mitigation: Short TTL (5s) + optimistic locking

Layer 2: Database Constraints
├── UNIQUE constraint on (listing_id, date, type='booked')
├── Failure mode: None - database rejects duplicates
└── Mitigation: This is your safety net

Layer 3: Optimistic Locking
├── Version number on calendar, check-and-set
├── Failure mode: Retry on version mismatch
└── Mitigation: Exponential backoff, max 3 retries

Layer 4: Idempotency Keys
├── Client sends unique booking_request_id
├── Failure mode: Duplicate bookings from retries
└── Mitigation: Check for existing booking with same key
```

### Cost vs. Performance Trade-offs

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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Search ranking**: Balancing relevance, quality, revenue - mention that Airbnb optimizes for booking likelihood, not just relevance
2. **Availability**: Calendar storage trade-offs (date-per-row vs. range-based) - know both approaches
3. **Double booking**: Distributed locking + database constraints as safety net
4. **Dynamic pricing**: Start with rules, add ML when you have data
5. **Trust & Safety**: Verification, fraud detection, review authenticity

### Common Follow-ups

- How do you handle last-minute cancellations? (Refund policies, rebooking assistance, host protection)
- How do you verify listing photos? (ML-based comparison, guest feedback loop, periodic re-verification)
- How do you implement instant book vs request? (Trust score thresholds, host preferences, guest verification level)

---

### Red Flags (What NOT to Say)

<div style="background: rgba(248, 81, 73, 0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

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

### Impressive Statements (What TO Say)

<div style="background: rgba(56, 139, 253, 0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

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

### Scaling Triggers Cheat Sheet

<div style="background: rgba(136, 87, 229, 0.1); border-left: 4px solid #8957e5; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">

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
