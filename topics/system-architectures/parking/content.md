# Design a Parking System

## Problem Statement

Design a smart parking management system for multi-level parking lots with real-time availability, reservations, and payments.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #00bcd4;">

### Core Requirements
- **Spot Management**: Track available/occupied spots
- **Vehicle Entry/Exit**: Automated ticketing
- **Reservations**: Book spots in advance
- **Payments**: Time-based or flat-rate billing
- **Different Vehicle Types**: Compact, regular, large, handicap
- **Real-time Display**: Show availability per level

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">PARKING SYSTEM ARCHITECTURE</h3>

```
                    ┌─────────────────────────────────────────┐
                    │              ENTRY/EXIT GATES           │
                    │                                          │
                    │  ┌────────────┐      ┌────────────┐     │
                    │  │  Camera/   │      │   Camera/  │     │
                    │  │  LPR       │      │   LPR      │     │
                    │  └─────┬──────┘      └─────┬──────┘     │
                    │        │                   │            │
                    │  ┌─────▼──────┐      ┌─────▼──────┐     │
                    │  │   Entry    │      │   Exit     │     │
                    │  │   Kiosk    │      │   Kiosk    │     │
                    │  └─────┬──────┘      └─────┬──────┘     │
                    └────────┼─────────────────────┼──────────┘
                             │                     │
                             └──────────┬──────────┘
                                        │
                         ┌──────────────▼──────────────┐
                         │       PARKING SERVICE       │
                         │                             │
                         │  ┌───────────────────────┐  │
                         │  │    Spot Management    │  │
                         │  └───────────────────────┘  │
                         │  ┌───────────────────────┐  │
                         │  │   Ticket/Session      │  │
                         │  └───────────────────────┘  │
                         │  ┌───────────────────────┐  │
                         │  │     Reservations      │  │
                         │  └───────────────────────┘  │
                         │  ┌───────────────────────┐  │
                         │  │       Payments        │  │
                         │  └───────────────────────┘  │
                         └──────────────┬──────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
             ┌───────────┐       ┌───────────┐       ┌───────────┐
             │ PostgreSQL│       │   Redis   │       │  Display  │
             │  (Data)   │       │  (Cache)  │       │  Boards   │
             └───────────┘       └───────────┘       └───────────┘
```

</div>

---

## Data Model

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">PARKING LOT DATA MODEL</h4>

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTITY RELATIONSHIPS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ParkingLot (1) ──────< Level (M)                           │
│       │                    │                                 │
│       │                    │                                 │
│       │               Spot (M)                               │
│       │                    │                                 │
│       │                    │                                 │
│       └─────── Ticket ─────┘                                │
│                    │                                         │
│                    │                                         │
│               Vehicle                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Tables:

parking_lots:
  - id, name, address, total_spots, lat, lng

levels:
  - id, lot_id, floor_number, name

spots:
  - id, level_id, spot_number, spot_type, status
  - spot_type: COMPACT, REGULAR, LARGE, HANDICAP, EV
  - status: AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE

tickets:
  - id, lot_id, spot_id, vehicle_id
  - entry_time, exit_time, status
  - amount_due, amount_paid

vehicles:
  - id, license_plate, vehicle_type, owner_id

reservations:
  - id, spot_id, user_id, start_time, end_time, status
```

</div>

---

## Phase 1: Starting Phase

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Parking Lots**: 1-5
- **Spots per lot**: 100-500
- **Vehicles/day**: 500-2,000
- **Budget**: $1,000 - $5,000/month

### Monolithic Architecture

```python
class ParkingLot:
    def __init__(self, lot_id, levels):
        self.lot_id = lot_id
        self.levels = levels
        self.spots = {}  # spot_id -> Spot

    def find_available_spot(self, vehicle_type):
        """Find first available spot for vehicle type."""
        compatible_types = self.get_compatible_types(vehicle_type)

        for level in self.levels:
            for spot in level.spots:
                if (spot.status == 'AVAILABLE' and
                    spot.spot_type in compatible_types):
                    return spot

        return None

    def get_compatible_types(self, vehicle_type):
        """Larger spots can accommodate smaller vehicles."""
        compatibility = {
            'MOTORCYCLE': ['MOTORCYCLE', 'COMPACT', 'REGULAR', 'LARGE'],
            'COMPACT': ['COMPACT', 'REGULAR', 'LARGE'],
            'REGULAR': ['REGULAR', 'LARGE'],
            'LARGE': ['LARGE'],
        }
        return compatibility.get(vehicle_type, [])


class ParkingService:
    def __init__(self, db, cache):
        self.db = db
        self.cache = cache

    def vehicle_entry(self, lot_id, license_plate, vehicle_type):
        lot = self.get_lot(lot_id)

        # Find available spot
        spot = lot.find_available_spot(vehicle_type)
        if not spot:
            raise ParkingFullError()

        with transaction.atomic():
            # Create or get vehicle record
            vehicle = Vehicle.get_or_create(license_plate=license_plate)

            # Create ticket
            ticket = Ticket.create(
                lot_id=lot_id,
                spot_id=spot.id,
                vehicle_id=vehicle.id,
                entry_time=now(),
                status='ACTIVE'
            )

            # Mark spot as occupied
            spot.status = 'OCCUPIED'
            spot.current_ticket_id = ticket.id
            spot.save()

            # Update availability cache
            self.update_availability_cache(lot_id)

        return ticket

    def vehicle_exit(self, ticket_id):
        ticket = Ticket.get(ticket_id)

        with transaction.atomic():
            # Calculate fee
            duration = now() - ticket.entry_time
            fee = self.calculate_fee(ticket.lot_id, duration)

            # Process payment
            payment = self.process_payment(ticket.vehicle_id, fee)

            # Update ticket
            ticket.exit_time = now()
            ticket.amount_due = fee
            ticket.amount_paid = fee
            ticket.status = 'COMPLETED'
            ticket.save()

            # Free up spot
            spot = Spot.get(ticket.spot_id)
            spot.status = 'AVAILABLE'
            spot.current_ticket_id = None
            spot.save()

            # Update cache
            self.update_availability_cache(ticket.lot_id)

        return ticket

    def calculate_fee(self, lot_id, duration):
        lot = self.get_lot(lot_id)
        hours = duration.total_seconds() / 3600

        if hours <= 1:
            return lot.hourly_rate
        else:
            return min(
                lot.hourly_rate * math.ceil(hours),
                lot.daily_max
            )
```

</div>
</div>

---

## Phase 2: Medium Scale

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Multi-Lot Management

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    API Gateway     │
                         └─────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   SPOT SERVICE  │       │ TICKET SERVICE  │       │ PAYMENT SERVICE │
│                 │       │                 │       │                 │
│ - Availability  │       │ - Entry/Exit    │       │ - Calculate fee │
│ - Reservations  │       │ - History       │       │ - Process pay   │
│ - Display sync  │       │ - Validation    │       │ - Receipts      │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                           ┌───────▼───────┐
                           │    Kafka      │
                           │  Event Bus    │
                           └───────┬───────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  NOTIFICATION   │       │   ANALYTICS     │       │    DISPLAY      │
│    SERVICE      │       │    SERVICE      │       │   CONTROLLER    │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

</div>

### Spot Allocation Strategies

```python
class SpotAllocationStrategy:
    """
    Different allocation strategies for different use cases.
    """

    def allocate_nearest_entrance(self, lot, vehicle_type):
        """For regular visitors - minimize walking distance."""
        compatible = self.get_compatible_spots(lot, vehicle_type)
        return min(compatible, key=lambda s: s.distance_to_entrance)

    def allocate_spread_out(self, lot, vehicle_type):
        """For mall parking - distribute across levels."""
        compatible = self.get_compatible_spots(lot, vehicle_type)
        level_counts = self.get_level_occupancy(lot)
        least_occupied = min(level_counts, key=level_counts.get)
        return next(s for s in compatible if s.level_id == least_occupied)

    def allocate_compact_first(self, lot, vehicle_type):
        """For small vehicles - save larger spots."""
        if vehicle_type in ['MOTORCYCLE', 'COMPACT']:
            # Try exact match first
            exact_match = self.find_spot_by_type(lot, vehicle_type)
            if exact_match:
                return exact_match

        # Fall back to any compatible
        return self.find_any_compatible(lot, vehicle_type)


class ReservationService:
    def create_reservation(self, user_id, lot_id, spot_type, start_time, end_time):
        # Check for conflicting reservations
        conflicts = Reservation.query.filter(
            Reservation.lot_id == lot_id,
            Reservation.status == 'ACTIVE',
            Reservation.start_time < end_time,
            Reservation.end_time > start_time
        ).count()

        available_spots = self.get_spots_by_type(lot_id, spot_type)
        if conflicts >= len(available_spots):
            raise NoSpotsAvailable()

        # Create reservation
        reservation = Reservation.create(
            user_id=user_id,
            lot_id=lot_id,
            spot_type=spot_type,
            start_time=start_time,
            end_time=end_time,
            status='PENDING'
        )

        # Process advance payment
        fee = self.calculate_reservation_fee(lot_id, start_time, end_time)
        payment = PaymentService().charge(user_id, fee)

        reservation.payment_id = payment.id
        reservation.status = 'CONFIRMED'
        reservation.save()

        return reservation
```

### Real-time Availability Display

```
┌─────────────────────────────────────────────────────────────┐
│                AVAILABILITY SYNC                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Redis Cache Structure:                                      │
│                                                              │
│  lot:{lot_id}:availability                                  │
│  {                                                           │
│    "total": 500,                                            │
│    "available": 234,                                        │
│    "by_level": {                                            │
│      "1": {"total": 100, "available": 45},                 │
│      "2": {"total": 100, "available": 52},                 │
│      ...                                                     │
│    },                                                        │
│    "by_type": {                                             │
│      "COMPACT": {"total": 150, "available": 78},           │
│      "REGULAR": {"total": 250, "available": 110},          │
│      ...                                                     │
│    }                                                         │
│  }                                                           │
│                                                              │
│  Update Strategy:                                            │
│  - On spot status change → publish event                    │
│  - Event consumer → increment/decrement atomically          │
│  - Display boards poll cache every 5 seconds                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>
</div>

---

## Phase 3: Large Scale (City-wide)

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Parking Lots**: 500+
- **Total Spots**: 500,000+
- **Cities**: Multiple
- **Peak Transactions**: 10K/minute

### Smart Parking Network

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                    SMART CITY PARKING NETWORK
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    USER LAYER                             │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Mobile     │  │  In-car     │  │   Google Maps   │   │ │
    │  │  │  App        │  │  Navigation │  │   Integration   │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    API GATEWAY                            │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │               MICROSERVICES LAYER                         │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Discovery  │  │  Booking    │  │    Navigation   │   │ │
    │  │  │  Service    │  │  Service    │  │    Service      │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │  Pricing    │  │   Fleet     │  │    Analytics    │   │ │
    │  │  │  Service    │  │   Manager   │  │    Service      │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    │                              │                                 │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │                    LOT CLUSTERS                           │ │
    │  │                                                           │ │
    │  │  Each lot has local edge controller                      │ │
    │  │  Operates independently if cloud disconnected            │ │
    │  │                                                           │ │
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
    │  │  │   Lot A     │  │   Lot B     │  │     Lot N       │   │ │
    │  │  │  Controller │  │  Controller │  │    Controller   │   │ │
    │  │  │             │  │             │  │                 │   │ │
    │  │  │ - Sensors   │  │ - Sensors   │  │  - Sensors      │   │ │
    │  │  │ - Cameras   │  │ - Cameras   │  │  - Cameras      │   │ │
    │  │  │ - Gates     │  │ - Gates     │  │  - Gates        │   │ │
    │  │  └─────────────┘  └─────────────┘  └─────────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Dynamic Pricing

```python
class DynamicPricingService:
    """
    Adjust pricing based on demand, time, and events.
    """

    def calculate_price(self, lot_id, duration_minutes, time_of_arrival):
        base_rate = self.get_base_rate(lot_id)

        # Occupancy-based multiplier
        occupancy = self.get_current_occupancy(lot_id)
        if occupancy > 0.9:
            occupancy_multiplier = 2.0
        elif occupancy > 0.7:
            occupancy_multiplier = 1.5
        else:
            occupancy_multiplier = 1.0

        # Time-based multiplier
        hour = time_of_arrival.hour
        if 9 <= hour <= 18:  # Business hours
            time_multiplier = 1.3
        elif 18 <= hour <= 22:  # Evening
            time_multiplier = 1.5
        else:
            time_multiplier = 0.8

        # Event-based multiplier
        nearby_events = self.get_nearby_events(lot_id, time_of_arrival)
        event_multiplier = 1.0 + (len(nearby_events) * 0.2)

        final_rate = base_rate * occupancy_multiplier * time_multiplier * event_multiplier

        return final_rate * (duration_minutes / 60)
```

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Database** | Aurora PostgreSQL | CockroachDB | Aurora: Managed |
| **Cache** | ElastiCache Redis | Redis Enterprise | ElastiCache: Simpler |
| **IoT** | IoT Core | Custom MQTT | IoT Core: Managed |
| **ML (LPR)** | Rekognition | OpenALPR | Rekognition: Managed |
| **Events** | EventBridge | Kafka | EventBridge: Serverless |

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ff6b6b;">

### 1. "How do you handle concurrent spot booking?"

**What They're Probing**: Understanding of race conditions, distributed locking, and database transaction isolation levels.

**Strong Answer**:
> "At the database level, I'd use optimistic locking with version numbers or pessimistic locking for high-contention scenarios. For a single lot, a simple `SELECT FOR UPDATE` on the spot row within a transaction works well. For distributed systems with reservations, I'd use Redis-based distributed locks with TTL, or leverage database-level `SERIALIZABLE` isolation for critical booking operations. The key insight is that most parking lots don't actually need per-spot booking - they just need to decrement a counter atomically, which simplifies everything."

**When Simpler Works**: "For most lots, an atomic counter (`INCR`/`DECR` in Redis) for total availability is sufficient. Only premium reserved parking needs spot-level locking."

---

### 2. "Why sensors over camera-based detection?"

**What They're Probing**: Understanding of technology trade-offs, cost analysis, and practical deployment constraints.

**Strong Answer**:
> "It depends on the use case. Ultrasonic or magnetic sensors are $50-150 per spot and provide reliable binary occupied/empty status with minimal processing. Cameras cost $200-500 but can cover 10-20 spots each, require ML processing infrastructure, and can provide additional features like license plate recognition and security footage. For existing lots without infrastructure, cameras are often better ROI. For new construction, embedded sensors are more reliable. Many successful systems use cameras only at entry/exit for LPR, with simple counters for availability - no per-spot sensors at all."

**When Simpler Works**: "Most parking garages just use entry/exit counters. Per-spot sensors are mainly for premium 'find my car' features or indoor navigation - nice to have, not essential."

---

### 3. "How do you handle payment failures mid-parking?"

**What They're Probing**: Error handling, system resilience, and user experience design.

**Strong Answer**:
> "I'd separate the parking session from payment processing. The barrier opens based on ticket validation, not payment status. Payment can be retried via app, kiosk, or exit booth. For pre-paid reservations, I'd authorize but not capture until exit. Failed payments get flagged for follow-up - license plate blocklist for repeat offenders, but always prioritize letting cars exit to prevent traffic jams. The business model should tolerate some payment failures rather than create operational chaos."

**When Simpler Works**: "Many lots just use pay-on-exit kiosks. If payment fails, attendant handles it manually. No complex retry logic needed for 95% of cases."

---

### 4. "How would you handle a network outage at the parking lot?"

**What They're Probing**: Edge computing understanding, offline-first design, and system resilience.

**Strong Answer**:
> "Each lot needs an edge controller that can operate independently. It maintains local state of spot availability, can issue tickets, process payments via cached card tokenization, and control barriers. When connectivity returns, it syncs events to the cloud via event sourcing - every entry/exit/payment is an immutable event that gets reconciled. The key design principle is that the lot should never stop functioning due to cloud issues."

**When Simpler Works**: "A simple lot can work entirely offline - ticket machine prints timestamp, exit calculates fee locally, processes card on local POS terminal. Cloud connectivity is only needed for mobile app features and analytics."

---

### 5. "How do you prevent someone from exploiting the reservation system?"

**What They're Probing**: Security thinking, abuse prevention, and practical fraud scenarios.

**Strong Answer**:
> "Several layers: rate limiting on reservation creation per user, requiring payment upfront with refund policies, no-show penalties after 2-3 violations, phone/email verification for new accounts, and monitoring for patterns like reserving prime spots and not showing up. For high-value spots, I might require a deposit. The key insight is that parking fraud has limited upside for attackers - it's mostly about preventing accidental abuse rather than sophisticated attacks."

**When Simpler Works**: "Many lots don't offer reservations at all - first come, first served eliminates the entire problem space. ParkMobile started with simple SMS-based payments, no reservations."

</div>

---

## Why This Technology?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Technology Decision Matrix

| Decision | Option A | Option B | Choose A When | Choose B When |
|----------|----------|----------|---------------|---------------|
| **Spot Detection** | Per-spot sensors | Entry/exit counters | Premium lots, indoor navigation, "find my car" feature | Cost-sensitive, retrofitting existing lots, <500 spots |
| **Vehicle ID** | LPR cameras | Ticket/QR codes | High throughput, frequent users, enforcement | Budget constraints, simple operations |
| **Payment** | Mobile app + gateway | Pay station only | Tech-savvy users, subscriptions, reservations | Older demographics, simple hourly parking |
| **Architecture** | Microservices | Monolith | Multi-location enterprise, 10+ lots | Single lot, small team, rapid iteration |
| **Database** | PostgreSQL | SQLite + sync | Multi-user, real-time reporting | Single lot with edge-first design |
| **Real-time Updates** | WebSockets | Polling every 30s | Mobile app with live spot finder | Display boards only |

### When to Use What

```
PARKING LOT SIZE vs TECHNOLOGY COMPLEXITY

Small Lot (<50 spots)     : Counter + Pay station + Spreadsheet
                            Total cost: $2,000-5,000 setup

Medium Lot (50-200)       : Entry/exit cameras + Basic software + Card payments
                            Total cost: $10,000-30,000 setup

Large Garage (200-1000)   : Per-level counters + LPR + Reservation system
                            Total cost: $50,000-150,000 setup

Enterprise (1000+ multi)  : Full IoT + Mobile app + Dynamic pricing + Analytics
                            Total cost: $500,000+ setup
```

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### The "$100/Month Parking System"

**Reality Check**: Most parking lots in the world run on incredibly simple systems.

```python
# This is literally how many successful parking lots work:

class SimpleParking:
    def __init__(self, total_spots):
        self.total_spots = total_spots
        self.occupied = 0

    def car_enters(self):
        if self.occupied < self.total_spots:
            self.occupied += 1
            return True  # Open gate
        return False  # Lot full

    def car_exits(self):
        self.occupied -= 1
        return calculate_fee(entry_time)

# Cost: One counter variable
# Infrastructure: Entry sensor + Exit sensor + Gate
# Payment: Cash box or basic card terminal
# Monthly cost: ~$100 for payment processing
```

### When You DON'T Need IoT Sensors

| Skip Per-Spot Sensors When... | Why |
|-------------------------------|-----|
| Lot has <100 spots | Visual scanning is faster than app lookup |
| No "find my car" requirement | Counters per level are sufficient |
| Budget is limited | Sensors cost $50-150 per spot |
| Retrofitting old structure | Wiring costs exceed sensor benefits |
| Short average stay (<2 hours) | High turnover makes spot-finding less critical |

### When You DON'T Need a Mobile App

- **Surface lots**: People can see availability from their car
- **Older demographic areas**: Kiosks work better
- **Short-term parking**: Pay on exit is faster than app fumbling
- **Employee parking**: Badge access, no payment needed

### When You DON'T Need Real-Time Availability

- **Low-utilization lots** (<60% full on average): Always spots available
- **Destination parking**: People will wait regardless (airports, stadiums)
- **Residential**: Reserved spots, no searching needed

### Simpler Alternatives That Work

| Complex Solution | Simpler Alternative | When Simple Wins |
|-----------------|---------------------|------------------|
| ML-based LPR | QR code tickets | <1000 cars/day, budget constraints |
| Dynamic pricing algorithm | Peak/off-peak flat rates | Predictable demand patterns |
| Per-spot sensors | Floor-level counters | Any lot without premium features |
| Microservices architecture | Django monolith | Single location, <10 developers |
| Real-time WebSocket updates | 30-second polling | Display boards, non-critical |
| Distributed Redis cache | PostgreSQL with indices | <1000 concurrent users |

### Real-World Success Stories with Simple Tech

> **ParkMobile** started with SMS-based payments - text your zone number, get a confirmation. No sensors, no cameras, no IoT. Now processes 50M+ transactions/year.

> **SpotHero** began as a simple marketplace connecting lot owners with drivers via a basic web form. Complex booking engine came years later.

> **Most airport parking** still uses ticket-based entry with pay stations. LPR is added only for frequent parker programs.

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9826c 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Critical Trade-offs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TRADE-OFF ANALYSIS                                    │
├──────────────────┬──────────────────┬──────────────────┬────────────────────┤
│ TRADE-OFF        │ OPTION A         │ OPTION B         │ MITIGATION         │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┤
│ Availability vs  │ Per-spot sensors │ Entry/exit       │ Use counters +     │
│ Cost             │ ($50-150/spot)   │ counters ($500)  │ cameras for level  │
│                  │                  │                  │ guidance only      │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┤
│ Accuracy vs      │ Pessimistic      │ Optimistic       │ Optimistic with    │
│ Throughput       │ locking (slow)   │ locking (races)  │ retry + eventual   │
│                  │                  │                  │ consistency        │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┤
│ Offline vs       │ Full edge        │ Cloud-dependent  │ Event sourcing     │
│ Consistency      │ autonomy         │ real-time        │ with sync on       │
│                  │                  │                  │ reconnect          │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┤
│ UX vs Security   │ Frictionless     │ Verify every     │ Risk-based: verify │
│                  │ entry            │ transaction      │ only large amounts │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┤
│ Features vs      │ Build            │ Use ParkWhiz/    │ Integrate existing │
│ Time-to-Market   │ everything       │ SpotHero API     │ for payments, build│
│                  │                  │                  │ for differentiation│
└──────────────────┴──────────────────┴──────────────────┴────────────────────┘
```

### Concurrency vs Complexity Deep Dive

**Problem**: Two users try to reserve the last spot simultaneously.

| Approach | Implementation | Throughput | Complexity |
|----------|---------------|------------|------------|
| Database locks | `SELECT FOR UPDATE` | 100-500 TPS | Low |
| Redis SETNX | Distributed lock with TTL | 10K+ TPS | Medium |
| Optimistic + retry | Version check, retry on conflict | 5K TPS | Medium |
| Queue-based | Serialize all bookings | 1K TPS | High |

**Recommendation**: Start with database locks. Only optimize when you measurably hit limits.

### Sensor Failure Mitigation

```python
class ResilientSpotTracker:
    """Handle sensor failures gracefully."""

    def __init__(self, spot_id):
        self.spot_id = spot_id
        self.last_known_state = None
        self.last_update = None
        self.confidence = 1.0

    def update(self, sensor_reading):
        if sensor_reading is None:
            # Sensor failure - degrade confidence over time
            time_since_update = now() - self.last_update
            self.confidence = max(0.5, 1.0 - (time_since_update.minutes * 0.1))
        else:
            self.last_known_state = sensor_reading
            self.last_update = now()
            self.confidence = 1.0

    def get_status(self):
        return {
            'status': self.last_known_state,
            'confidence': self.confidence,
            'stale': self.confidence < 0.9
        }

# Mitigation: Fall back to entry/exit counters when sensor confidence is low
```

### Payment Failure Recovery

```
PAYMENT FAILURE SCENARIOS & MITIGATIONS

┌────────────────────┬─────────────────────────────────────────────────┐
│ Scenario           │ Mitigation Strategy                             │
├────────────────────┼─────────────────────────────────────────────────┤
│ Card declined      │ Allow exit, flag plate, email invoice           │
│ at exit            │                                                 │
├────────────────────┼─────────────────────────────────────────────────┤
│ Network down       │ Local payment terminal with batch processing    │
│                    │                                                 │
├────────────────────┼─────────────────────────────────────────────────┤
│ Partial payment    │ Accept partial, invoice remainder               │
│ (e.g., low limit)  │                                                 │
├────────────────────┼─────────────────────────────────────────────────┤
│ Reservation no-pay │ Authorization hold at booking, capture at exit  │
│                    │                                                 │
├────────────────────┼─────────────────────────────────────────────────┤
│ Repeat offender    │ LPR blocklist, require cash/prepay              │
│                    │                                                 │
└────────────────────┴─────────────────────────────────────────────────┘

Key Principle: NEVER trap a car. Revenue recovery is easier than traffic jams.
```

</div>
</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Spot allocation strategies**: Different approaches for different use cases (nearest entrance vs. distributed load)
2. **Concurrency control**: Database locks for simple cases, distributed locks for scale
3. **Real-time sync**: Event-driven updates with cache, polling for displays
4. **Offline operation**: Edge controllers with event sourcing for resilience
5. **Dynamic pricing**: Occupancy + time + events, but acknowledge most lots use flat rates

### Red Flags to Avoid

| Red Flag | Why It's Bad | Better Approach |
|----------|--------------|-----------------|
| "We need per-spot IoT sensors everywhere" | Over-engineering for most use cases | "Entry/exit counters work for most lots" |
| "Microservices from day one" | Premature complexity | "Start monolithic, extract when needed" |
| "Real-time updates via WebSocket to all devices" | Unnecessary complexity | "Polling every 30s is fine for displays" |
| "ML-based dynamic pricing" | Most lots use simple rules | "Peak/off-peak rates, surge during events" |
| "Blockchain for payment verification" | No actual benefit | "Standard payment gateway with idempotency" |
| Ignoring offline scenarios | Lots must operate without cloud | "Edge controller with local fallback" |

### Impressive Statements

> "Most parking lots just need a counter at entry/exit - no per-spot tracking. I'd start there and add complexity only when the business case justifies the sensor investment."

> "I'd design for offline-first operation. The lot should function perfectly with zero cloud connectivity - mobile apps and analytics are nice-to-haves, not requirements."

> "For concurrency, I'd start with simple database transactions. Redis distributed locks are only needed when we're processing thousands of simultaneous bookings - which most lots never reach."

> "ParkMobile built a successful business on SMS payments. The technology complexity should match the business complexity, not exceed it."

> "The hardest part isn't the software - it's integrating with existing hardware: gates, cameras, payment terminals. I'd use standard protocols like MQTT for IoT devices and build adapters for legacy equipment."

### Common Follow-up Questions

| Question | Key Points to Cover |
|----------|---------------------|
| "How do you handle ticket loss?" | Manual verification via LPR history, max daily rate charge, photo at entry |
| "How do you implement valet parking?" | Key management system, claim tickets, tip integration, vehicle condition photos |
| "How do you handle EV charging spots?" | Integration with charging network API, spot reservation while charging, time-based vs. kWh billing |
| "What about handicap spot enforcement?" | Permit validation (manual or LPR-based), reporting to enforcement, fine processing integration |
| "How do you handle monthly parkers?" | Access control lists, automatic gate recognition, separate billing system, spot assignment vs. general access |

### Scaling Questions Cheat Sheet

| Scale | Focus On |
|-------|----------|
| 1 lot | Simple, reliable, cheap. Ticket machine + pay station |
| 10 lots | Centralized management, consistent UX, basic reporting |
| 100+ lots | Fleet management, analytics, mobile app ROI |
| City-wide | Integration with traffic systems, open data APIs, smart city platform |

</div>
