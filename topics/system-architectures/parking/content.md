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

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Spot allocation strategies**: Different approaches for different use cases
2. **Concurrency control**: Preventing double-booking
3. **Real-time sync**: Keeping displays accurate
4. **Offline operation**: Edge controllers for reliability
5. **Dynamic pricing**: Demand-based algorithms

### Common Follow-ups

- How do you handle ticket loss?
- How do you implement valet parking?
- How do you handle electric vehicle charging spots?

</div>
