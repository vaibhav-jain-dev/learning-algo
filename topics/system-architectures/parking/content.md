# Design a Parking System

## Problem Statement

Design a smart parking management system for multi-level parking lots with real-time availability, reservations, and payments.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #00bcd4;">

### Core Requirements
- **Spot Management**: Track available/occupied spots
- **Vehicle Entry/Exit**: Automated ticketing
- **Reservations**: Book spots in advance
- **Payments**: Time-based or flat-rate billing
- **Different Vehicle Types**: Compact, regular, large, handicap
- **Real-time Display**: Show availability per level

</div>

---

## Core Concepts Overview

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 20px 0;">
<h4 style="color: #1d4ed8; margin-top: 0;">Fundamental Parking System Equation</h4>
<div style="font-family: 'Courier New', monospace; font-size: 15px; background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; text-align: center; color: #e6edf3;">
Parking System = <span style="color: #4ade80;">Spot Allocation</span> + <span style="color: #4ade80;">Sensor Integration</span> + <span style="color: #4ade80;">Payment Processing</span> + <span style="color: #4ade80;">Real-time Availability</span> + <span style="color: #4ade80;">Dynamic Pricing</span>
</div>
</div>

**Critical Assumption**: The system assumes <span style="color: #4ade80;">eventual consistency</span> is acceptable for spot availability displays - a spot shown as available might be taken by the time the driver arrives. True real-time accuracy would require prohibitively expensive per-spot sensors.

**Key Trade-off**: <span style="color: #4ade80;">Sensor granularity vs. cost</span>. Per-spot sensors provide accurate "find my car" features but cost $50-150 per spot. Entry/exit counters cost $500 total but only provide aggregate availability. See [[connection-pooling]](/topics/system-design/connection-pooling) for similar resource management patterns.

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">PARKING SYSTEM ARCHITECTURE</h3>

<!-- Entry/Exit Gates Layer -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #00bcd4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #00bcd4; font-weight: bold; text-align: center; margin-bottom: 16px; font-size: 14px;">ENTRY/EXIT GATES</div>
<div style="display: flex; justify-content: space-around; gap: 24px;">
<div style="flex: 1; text-align: center;">
<div style="background: #f1f5f9; border: 2px solid #7c3aed; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
<div style="color: #a78bfa; font-weight: bold; font-size: 12px;">Camera/LPR</div>
</div>
<div style="color: #7c3aed; font-size: 20px;">&#8595;</div>
<div style="background: #f1f5f9; border: 2px solid #22c55e; border-radius: 8px; padding: 12px;">
<div style="color: #4ade80; font-weight: bold; font-size: 12px;">Entry Kiosk</div>
</div>
</div>
<div style="flex: 1; text-align: center;">
<div style="background: #f1f5f9; border: 2px solid #7c3aed; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
<div style="color: #a78bfa; font-weight: bold; font-size: 12px;">Camera/LPR</div>
</div>
<div style="color: #7c3aed; font-size: 20px;">&#8595;</div>
<div style="background: #f1f5f9; border: 2px solid #ef4444; border-radius: 8px; padding: 12px;">
<div style="color: #f87171; font-weight: bold; font-size: 12px;">Exit Kiosk</div>
</div>
</div>
</div>
</div>

<!-- Arrow Down -->
<div style="text-align: center; color: #1d4ed8; font-size: 24px; margin: 8px 0;">&#8595;</div>

<!-- Parking Service Layer -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #1e40af; font-weight: bold; text-align: center; margin-bottom: 16px;">PARKING SERVICE</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<span style="color: #8b949e;">Spot Management</span>
</div>
<div style="background: #f8fafc; border: 1px solid #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<span style="color: #8b949e;">Ticket/Session</span>
</div>
<div style="background: #f8fafc; border: 1px solid #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<span style="color: #8b949e;">Reservations</span>
</div>
<div style="background: #f8fafc; border: 1px solid #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<span style="color: #8b949e;">Payments</span>
</div>
</div>
</div>

<!-- Arrow Down -->
<div style="text-align: center; color: #1d4ed8; font-size: 24px; margin: 8px 0;">&#8595;</div>

<!-- Data Layer -->
<div style="display: flex; justify-content: space-between; gap: 16px;">
<div style="flex: 1; background: linear-gradient(135deg, #1a472a 0%, #0d2818 100%); border: 2px solid #238636; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #3fb950; font-weight: bold; font-size: 13px;">PostgreSQL</div>
<div style="color: #8b949e; font-size: 11px;">(Data)</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, #4a1d1d 0%, #2d1212 100%); border: 2px solid #da3633; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f85149; font-weight: bold; font-size: 13px;">Redis</div>
<div style="color: #8b949e; font-size: 11px;">(Cache)</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, #3d2d1a 0%, #2d1f12 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px;">Display Boards</div>
<div style="color: #8b949e; font-size: 11px;">(Real-time)</div>
</div>
</div>

</div>

---

## Section 1: Spot Allocation

### Deep Mechanics

<span style="color: #4ade80;">Spot allocation</span> is the process of assigning parking spaces to vehicles based on vehicle type, availability, and optimization goals. The core challenge is matching vehicle dimensions to spot types while considering business objectives like maximizing utilization or minimizing walking distance.

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #166534; margin-top: 0;">Spot Allocation Decision Hierarchy</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<strong style="color: #166534;">1. Vehicle Type Compatibility</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Match vehicle to spot size. Larger spots can accommodate smaller vehicles (LARGE spot fits COMPACT car) but not vice versa. This creates the <span style="color: #4ade80;">size compatibility matrix</span>.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
<strong style="color: #166534;">2. Availability Check</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Query available spots by type with <span style="color: #4ade80;">optimistic locking</span> to prevent race conditions. See [[distributed-locking]](/topics/system-design/distributed-locking) for implementation patterns.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
<strong style="color: #166534;">3. Allocation Strategy</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Apply business rules: nearest to entrance, distribute across levels, or preserve larger spots for appropriate vehicles.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
<strong style="color: #166534;">4. Reservation Conflict Resolution</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Handle overlap between walk-in vehicles and pre-reserved spots. Requires <span style="color: #4ade80;">temporal availability checking</span> across time windows.</p>
</div>
</div>
</div>

### Spot Allocation Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #4ade80; text-align: center; margin: 0 0 24px 0;">SPOT ALLOCATION FLOW</h4>

<!-- Vehicle Entry -->
<div style="display: flex; justify-content: center; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); border: 2px solid #a78bfa; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">Vehicle Entry Request</span>
<div style="color: #ddd6fe; font-size: 11px; margin-top: 4px;">{license_plate, vehicle_type}</div>
</div>
</div>

<div style="text-align: center; color: #a78bfa; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Allocation Engine -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #4ade80; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #4ade80; font-weight: bold; text-align: center; margin-bottom: 16px;">ALLOCATION ENGINE</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #22c55e; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #4ade80; font-weight: bold; font-size: 12px;">Compatibility Check</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 4px;">Match vehicle to spot types</div>
</div>
<div style="background: #f8fafc; border: 1px solid #22c55e; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #4ade80; font-weight: bold; font-size: 12px;">Availability Query</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 4px;">Redis cache + DB fallback</div>
</div>
<div style="background: #f8fafc; border: 1px solid #22c55e; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #4ade80; font-weight: bold; font-size: 12px;">Strategy Selection</div>
<div style="color: #8b949e; font-size: 10px; margin-top: 4px;">Nearest/Spread/Compact-first</div>
</div>
</div>
</div>

<div style="text-align: center; color: #4ade80; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Allocation Result -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #1a5a28 100%); border: 2px solid #3fb950; border-radius: 10px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Success: Spot Assigned</div>
<div style="color: #a7f3d0; font-size: 11px; margin-top: 4px;">Create ticket, mark spot occupied</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #a82828 100%); border: 2px solid #f85149; border-radius: 10px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Failure: Lot Full</div>
<div style="color: #fecaca; font-size: 11px; margin-top: 4px;">Redirect to nearby lot or waitlist</div>
</div>
</div>
</div>

### Spot Allocation Strategies Implementation

```python
class SpotAllocationStrategy:
    """
    Production-grade spot allocation with multiple strategies.

    Key Insight: Most lots don't need per-spot tracking. A simple counter
    by vehicle type is sufficient unless you need "find my car" features.
    """

    def __init__(self, lot_id: str, cache: Redis, db: Database):
        self.lot_id = lot_id
        self.cache = cache
        self.db = db

    def get_compatible_types(self, vehicle_type: str) -> List[str]:
        """
        Larger spots can accommodate smaller vehicles.
        This is the core compatibility matrix.
        """
        compatibility = {
            'MOTORCYCLE': ['MOTORCYCLE', 'COMPACT', 'REGULAR', 'LARGE'],
            'COMPACT': ['COMPACT', 'REGULAR', 'LARGE'],
            'REGULAR': ['REGULAR', 'LARGE'],
            'LARGE': ['LARGE'],
            'EV': ['EV'],  # EV spots are exclusive (charging)
            'HANDICAP': ['HANDICAP'],  # Restricted access
        }
        return compatibility.get(vehicle_type, [])

    def allocate_nearest_entrance(self, vehicle_type: str) -> Optional[Spot]:
        """
        Strategy 1: Minimize walking distance.
        Best for: Short-term parking, mall visitors.

        Trade-off: Creates hotspots near entrance, uneven wear.
        """
        compatible_types = self.get_compatible_types(vehicle_type)

        # Query spots ordered by distance to entrance
        available_spots = self.db.query("""
            SELECT * FROM spots
            WHERE lot_id = %s
            AND spot_type IN %s
            AND status = 'AVAILABLE'
            ORDER BY distance_to_entrance ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        """, (self.lot_id, tuple(compatible_types)))

        return available_spots[0] if available_spots else None

    def allocate_spread_across_levels(self, vehicle_type: str) -> Optional[Spot]:
        """
        Strategy 2: Distribute load across levels.
        Best for: Large garages, event parking.

        Trade-off: May increase walking distance but improves traffic flow.
        """
        compatible_types = self.get_compatible_types(vehicle_type)

        # Find level with lowest occupancy
        level_occupancy = self.cache.hgetall(f"lot:{self.lot_id}:level_occupancy")
        least_occupied_level = min(level_occupancy.items(), key=lambda x: float(x[1]))[0]

        available_spots = self.db.query("""
            SELECT * FROM spots
            WHERE lot_id = %s
            AND level_id = %s
            AND spot_type IN %s
            AND status = 'AVAILABLE'
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        """, (self.lot_id, least_occupied_level, tuple(compatible_types)))

        return available_spots[0] if available_spots else None

    def allocate_preserve_larger_spots(self, vehicle_type: str) -> Optional[Spot]:
        """
        Strategy 3: Exact match first, preserve larger spots.
        Best for: Mixed vehicle populations, maximizing capacity.

        Trade-off: Small vehicles may park further from entrance.
        """
        compatible_types = self.get_compatible_types(vehicle_type)

        # Try exact match first
        for spot_type in compatible_types:
            spot = self._find_spot_by_type(spot_type)
            if spot:
                return spot

        return None

    def allocate_with_reservation_awareness(
        self,
        vehicle_type: str,
        arrival_time: datetime,
        expected_duration: timedelta
    ) -> Optional[Spot]:
        """
        Strategy 4: Consider future reservations.
        Best for: Premium lots with advance booking.

        This prevents allocating a spot to a walk-in that will
        conflict with an upcoming reservation.
        """
        compatible_types = self.get_compatible_types(vehicle_type)
        expected_exit = arrival_time + expected_duration

        # Find spots without conflicting reservations
        available_spots = self.db.query("""
            SELECT s.* FROM spots s
            WHERE s.lot_id = %s
            AND s.spot_type IN %s
            AND s.status = 'AVAILABLE'
            AND NOT EXISTS (
                SELECT 1 FROM reservations r
                WHERE r.spot_id = s.id
                AND r.status = 'CONFIRMED'
                AND r.start_time < %s
                AND r.end_time > %s
            )
            ORDER BY s.distance_to_entrance ASC
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        """, (self.lot_id, tuple(compatible_types), expected_exit, arrival_time))

        return available_spots[0] if available_spots else None
```

### Spot Allocation Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How would you design spot allocation for a parking system?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Spot allocation matches vehicles to available parking spaces based on <span style="color: #4ade80;">vehicle type compatibility</span> and <span style="color: #4ade80;">allocation strategy</span>. The basic flow is: (1) identify vehicle type from entry input, (2) query available spots that can accommodate that vehicle size, (3) apply an allocation strategy like "nearest to entrance" or "distribute across levels", (4) atomically assign the spot and create a parking ticket. The key data structures are a spot availability cache for fast lookups and a database with proper locking for consistent assignment.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle concurrent allocation requests to prevent double-booking?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Concurrent allocation requires <span style="color: #4ade80;">optimistic locking</span> or <span style="color: #4ade80;">pessimistic locking</span> depending on contention levels. For low-contention scenarios (most parking lots), I'd use database-level `SELECT FOR UPDATE SKIP LOCKED` - this locks the row being allocated and skips already-locked rows, allowing parallel processing. For high-contention scenarios during events, I'd use Redis-based distributed locks with TTL (see [[distributed-locking]](/topics/system-design/distributed-locking)). The critical insight is that most lots don't actually allocate specific spots - they just decrement a counter atomically, which sidesteps the entire problem.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you handle allocation when reservations conflict with walk-in vehicles?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Reservation-aware allocation requires <span style="color: #4ade80;">temporal availability checking</span>. When a walk-in arrives, we must check not just current availability but also upcoming reservations. Implementation: (1) estimate expected parking duration from historical data or user input, (2) query spots that are both currently available AND have no conflicting reservations within the expected window, (3) if no spots meet both criteria, offer a spot with a "you may need to move" warning, or redirect to a different lot. Edge case: if the walk-in overstays into a reservation window, trigger a notification for lot attendants. Trade-off: strict enforcement creates better reservation experience but risks empty spots when reservations no-show. Many lots solve this by over-allocating (allowing 110% reservation capacity) based on historical no-show rates. This is similar to [[event-sourcing]](/topics/system-design/event-sourcing) patterns where we track events to reconstruct availability at any point in time.</p>
</div>
</div>
</div>

---

## Section 2: Sensor Integration

### Deep Mechanics

<span style="color: #4ade80;">Sensor integration</span> connects physical detection hardware to the software system for real-time occupancy tracking. The fundamental trade-off is between <span style="color: #4ade80;">detection granularity</span> (per-spot vs. entry/exit counters) and cost/complexity.

<div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
<h4 style="margin-top: 0; color: #f8fafc;">Sensor Technology Comparison</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
<div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
<strong style="color: #f8fafc;">Ultrasonic Sensors</strong>
<p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">$50-100/spot. Ceiling-mounted, detect presence by sound reflection. 99% accuracy. Require wiring infrastructure.</p>
</div>
<div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
<strong style="color: #f8fafc;">Magnetic Sensors</strong>
<p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">$80-150/spot. Embedded in pavement, detect metal mass. 97% accuracy. Battery-powered (5-year life), wireless.</p>
</div>
<div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
<strong style="color: #f8fafc;">Camera + ML</strong>
<p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">$200-500/camera covering 10-20 spots. Requires ML processing. Also enables LPR, security footage.</p>
</div>
</div>
</div>

### Sensor Integration Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #a78bfa; text-align: center; margin: 0 0 24px 0;">SENSOR DATA PIPELINE</h4>

<!-- Sensor Layer -->
<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 2px solid #a78bfa; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #a78bfa; font-weight: bold; text-align: center; margin-bottom: 16px;">PHYSICAL SENSORS</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #7c3aed; border-radius: 8px; padding: 10px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 11px;">Entry Loop</div>
<div style="color: #8b949e; font-size: 10px;">Inductive coil</div>
</div>
<div style="background: #f8fafc; border: 1px solid #7c3aed; border-radius: 8px; padding: 10px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 11px;">Exit Loop</div>
<div style="color: #8b949e; font-size: 10px;">Inductive coil</div>
</div>
<div style="background: #f8fafc; border: 1px solid #7c3aed; border-radius: 8px; padding: 10px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 11px;">LPR Camera</div>
<div style="color: #8b949e; font-size: 10px;">License plate OCR</div>
</div>
<div style="background: #f8fafc; border: 1px solid #7c3aed; border-radius: 8px; padding: 10px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 11px;">Spot Sensors</div>
<div style="color: #8b949e; font-size: 10px;">Ultrasonic/Magnetic</div>
</div>
</div>
</div>

<div style="text-align: center; color: #a78bfa; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Edge Controller -->
<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #6b7280; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #9ca3af; font-weight: bold; text-align: center; margin-bottom: 12px;">EDGE CONTROLLER (Local Processing)</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #4b5563; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #d1d5db; font-weight: bold; font-size: 12px;">Signal Processing</div>
<div style="color: #6b7280; font-size: 10px;">Debounce, filter noise</div>
</div>
<div style="background: #f8fafc; border: 1px solid #4b5563; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #d1d5db; font-weight: bold; font-size: 12px;">Local State</div>
<div style="color: #6b7280; font-size: 10px;">Offline operation</div>
</div>
<div style="background: #f8fafc; border: 1px solid #4b5563; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #d1d5db; font-weight: bold; font-size: 12px;">Event Batching</div>
<div style="color: #6b7280; font-size: 10px;">Reduce cloud traffic</div>
</div>
</div>
</div>

<div style="text-align: center; color: #3b82f6; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- MQTT/Cloud Layer -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #1e40af; font-weight: bold;">MQTT Broker</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">IoT message transport</div>
<div style="color: #475569; font-size: 10px;">Topics: lot/+/spot/+/status</div>
</div>
<div style="background: linear-gradient(135deg, #1a472a 0%, #0d2818 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #4ade80; font-weight: bold;">Event Processor</div>
<div style="color: #86efac; font-size: 11px; margin-top: 4px;">Update cache + DB</div>
<div style="color: #6b7280; font-size: 10px;">Idempotent event handling</div>
</div>
</div>
</div>

### Sensor Data Processing Implementation

```python
class SensorEventProcessor:
    """
    Process sensor events with reliability guarantees.

    Key Challenges:
    1. Debouncing: Rapid on/off signals when vehicle enters slowly
    2. Failure detection: Differentiate sensor failure from empty spot
    3. Reconciliation: Sync edge state with cloud after offline period
    """

    def __init__(self, cache: Redis, db: Database, mqtt: MQTTClient):
        self.cache = cache
        self.db = db
        self.mqtt = mqtt
        self.debounce_window = timedelta(seconds=3)

    async def handle_spot_event(self, event: SpotEvent):
        """
        Process individual spot sensor events.

        Event structure:
        {
            "lot_id": "LOT-001",
            "spot_id": "A-15",
            "status": "OCCUPIED",  # or "AVAILABLE"
            "timestamp": "2024-01-15T10:30:00Z",
            "sensor_type": "ultrasonic",
            "confidence": 0.98,  # ML-based sensors report confidence
            "event_id": "uuid"  # For idempotency
        }
        """
        # Idempotency check - prevent duplicate processing
        if await self._is_duplicate_event(event.event_id):
            return

        # Debounce rapid state changes
        last_event = await self._get_last_event(event.lot_id, event.spot_id)
        if last_event and (event.timestamp - last_event.timestamp) < self.debounce_window:
            # Too fast - likely sensor noise or slow-moving vehicle
            await self._queue_for_confirmation(event)
            return

        # Low confidence events require additional verification
        if event.confidence < 0.9:
            await self._trigger_verification(event)
            return

        # Process confirmed state change
        await self._update_spot_status(event)
        await self._update_availability_cache(event.lot_id)
        await self._publish_availability_update(event.lot_id)

    async def _update_spot_status(self, event: SpotEvent):
        """Atomic spot status update with audit trail."""
        async with self.db.transaction():
            # Update spot
            await self.db.execute("""
                UPDATE spots
                SET status = %s,
                    last_sensor_update = %s,
                    sensor_confidence = %s
                WHERE lot_id = %s AND spot_id = %s
            """, (event.status, event.timestamp, event.confidence,
                  event.lot_id, event.spot_id))

            # Record event for audit/reconciliation
            await self.db.execute("""
                INSERT INTO spot_events (lot_id, spot_id, status, timestamp, sensor_type, event_id)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (event_id) DO NOTHING
            """, (event.lot_id, event.spot_id, event.status,
                  event.timestamp, event.sensor_type, event.event_id))

    async def reconcile_after_offline(self, lot_id: str, edge_state: Dict):
        """
        Reconcile cloud state with edge controller after network outage.

        Strategy: Edge controller is authoritative for sensor state.
        Cloud may have stale data during outage.
        """
        for spot_id, spot_state in edge_state.items():
            cloud_state = await self._get_cloud_spot_state(lot_id, spot_id)

            if cloud_state.last_update < spot_state.last_update:
                # Edge has newer data - update cloud
                await self._update_spot_status(SpotEvent(
                    lot_id=lot_id,
                    spot_id=spot_id,
                    status=spot_state.status,
                    timestamp=spot_state.last_update,
                    sensor_type='reconciliation',
                    confidence=1.0,
                    event_id=f"reconcile-{lot_id}-{spot_id}-{spot_state.last_update}"
                ))
```

### Sensor Integration Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What sensors would you use for a parking system?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The choice depends on requirements and budget. For basic occupancy tracking, <span style="color: #4ade80;">entry/exit inductive loop sensors</span> ($500 total) count vehicles entering and leaving - sufficient for aggregate availability. For per-spot tracking, <span style="color: #4ade80;">ultrasonic sensors</span> ($50-100/spot) or <span style="color: #4ade80;">magnetic sensors</span> ($80-150/spot) detect individual spot occupancy. For premium features like license plate recognition and security, <span style="color: #4ade80;">cameras with ML processing</span> can cover multiple spots per camera. Most successful parking systems start with entry/exit counters and add per-spot sensors only when the business case justifies it (premium lots, "find my car" features).</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle sensor failures without corrupting availability data?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Sensor failure handling requires <span style="color: #4ade80;">confidence degradation</span> and <span style="color: #4ade80;">cross-validation</span>. Implementation: (1) Track "last seen" timestamp per sensor - if no heartbeat for X minutes, mark sensor as potentially failed. (2) Degrade confidence in that spot's status over time - after 30 minutes stale, show "unknown" status in UI. (3) Cross-validate with entry/exit counters - if counter says lot has 50 cars but sensors show 45 occupied spots, flag discrepancy. (4) For camera-based systems, use multiple frame confirmation before state change. (5) During sensor failure, fall back to entry/exit counter math for that zone. The key insight is to <span style="color: #4ade80;">never trust a single data source</span> - always have a backup validation method. See [[circuit-breaker]](/topics/system-design/circuit-breaker) patterns for handling degraded components.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you design the edge-to-cloud synchronization to handle intermittent connectivity?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Edge-cloud sync requires an <span style="color: #4ade80;">event sourcing</span> approach where the edge controller is authoritative for physical state. Implementation: (1) Edge controller maintains a local event log of all sensor state changes with monotonically increasing sequence numbers. (2) During connectivity, events stream to cloud via MQTT with QoS 1 (at-least-once delivery). (3) Cloud processes events <span style="color: #4ade80;">idempotently</span> using event_id for deduplication. (4) After outage, edge sends all events since last acknowledged sequence number. (5) Cloud reconciles by replaying events in order - edge timestamp is authoritative, not cloud receive time. Edge case: If entry/exit counters drift from per-spot sensors during long outage, trigger manual reconciliation via attendant walk-through or camera snapshot. Trade-off: Strong consistency would require blocking gate operations during outage - unacceptable. We accept eventual consistency for reporting while maintaining operational autonomy. This is the same pattern used in [[event-sourcing]](/topics/system-design/event-sourcing) for distributed systems.</p>
</div>
</div>
</div>

---

## Section 3: Payment Processing

### Deep Mechanics

<span style="color: #4ade80;">Payment processing</span> in parking systems involves calculating fees based on duration, processing transactions, and handling edge cases like failed payments or network outages. The fundamental principle is: <span style="color: #4ade80;">never trap a car</span> - revenue recovery is easier than managing traffic jams from stuck vehicles.

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #92400e; margin-top: 0;">Payment Processing Principles</h4>
<div style="display: grid; gap: 12px;">
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #92400e;">1. Separation of Concerns</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Parking session lifecycle is independent of payment status. A car can exit even with payment pending - chase the money later, not the vehicle.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #92400e;">2. Idempotent Transactions</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Network failures cause retries. Payment requests must be <span style="color: #4ade80;">idempotent</span> - same request produces same result. Use idempotency keys. See [[api-design]](/topics/system-design/api-design).</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #92400e;">3. Authorization vs. Capture</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">For reservations and expected long stays, authorize at entry but capture only at exit when final amount is known.</p>
</div>
</div>
</div>

### Payment Processing Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">PAYMENT PROCESSING FLOW</h4>

<!-- Fee Calculation -->
<div style="display: flex; justify-content: center; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); border: 2px solid #a78bfa; border-radius: 10px; padding: 16px 32px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Fee Calculation Engine</div>
<div style="color: #ddd6fe; font-size: 11px; margin-top: 4px;">Duration + Rate Rules + Discounts</div>
</div>
</div>

<div style="text-align: center; color: #a78bfa; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Payment Methods -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #f0883e; font-weight: bold; text-align: center; margin-bottom: 16px;">PAYMENT CHANNELS</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #f9826c; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f9826c; font-weight: bold; font-size: 12px;">Exit Kiosk</div>
<div style="color: #8b949e; font-size: 10px;">Card/Cash</div>
</div>
<div style="background: #f8fafc; border: 1px solid #f9826c; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f9826c; font-weight: bold; font-size: 12px;">Mobile App</div>
<div style="color: #8b949e; font-size: 10px;">Apple/Google Pay</div>
</div>
<div style="background: #f8fafc; border: 1px solid #f9826c; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f9826c; font-weight: bold; font-size: 12px;">Pre-Registration</div>
<div style="color: #8b949e; font-size: 10px;">Saved card</div>
</div>
<div style="background: #f8fafc; border: 1px solid #f9826c; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f9826c; font-weight: bold; font-size: 12px;">Validation</div>
<div style="color: #8b949e; font-size: 10px;">Business pays</div>
</div>
</div>
</div>

<div style="text-align: center; color: #f0883e; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Payment Gateway -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #1a4d8c 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Stripe/Square</div>
<div style="color: #93c5fd; font-size: 11px; margin-top: 4px;">Primary processor</div>
</div>
<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #6b7280; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #d1d5db; font-weight: bold;">Local POS</div>
<div style="color: #9ca3af; font-size: 11px; margin-top: 4px;">Offline fallback</div>
</div>
<div style="background: linear-gradient(135deg, #7c2d12 0%, #431407 100%); border: 2px solid #ea580c; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #fed7aa; font-weight: bold;">Invoice System</div>
<div style="color: #fdba74; font-size: 11px; margin-top: 4px;">Failed payment recovery</div>
</div>
</div>

<div style="text-align: center; color: #22c55e; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Transaction Result -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #1a5a28 100%); border: 2px solid #3fb950; border-radius: 10px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Success</div>
<div style="color: #a7f3d0; font-size: 11px; margin-top: 4px;">Open gate, close ticket</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #a82828 100%); border: 2px solid #f85149; border-radius: 10px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Failure</div>
<div style="color: #fecaca; font-size: 11px; margin-top: 4px;">Flag plate, open gate anyway, invoice</div>
</div>
</div>
</div>

### Payment Processing Implementation

```python
class PaymentService:
    """
    Production payment processing with failure handling.

    Key Principle: Never trap a car. Revenue recovery is a business
    process problem, not a gate control problem.
    """

    def __init__(self, stripe: StripeClient, db: Database, cache: Redis):
        self.stripe = stripe
        self.db = db
        self.cache = cache

    def calculate_fee(
        self,
        lot_id: str,
        entry_time: datetime,
        exit_time: datetime,
        spot_type: str,
        validations: List[Validation] = None
    ) -> ParkingFee:
        """
        Calculate parking fee with multiple rate structures.

        Rate structures:
        1. Hourly rate with daily max
        2. Time-of-day pricing (peak/off-peak)
        3. Event-based surge pricing
        4. Validation discounts (business validation)
        """
        lot = self.db.get_lot(lot_id)
        duration = exit_time - entry_time
        hours = duration.total_seconds() / 3600

        # Get applicable rate based on time of entry
        rate = self._get_applicable_rate(lot_id, entry_time)

        # Calculate base fee
        if hours <= 0.5:
            # Grace period or minimum charge
            base_fee = lot.minimum_charge
        elif hours <= 1:
            base_fee = rate.hourly_rate
        else:
            # Hourly rate with daily cap
            base_fee = min(
                rate.hourly_rate * math.ceil(hours),
                rate.daily_max
            )

        # Apply spot type multiplier (EV, premium spots)
        spot_multiplier = self._get_spot_multiplier(spot_type)
        fee_after_spot = base_fee * spot_multiplier

        # Apply validation discounts
        discount = self._calculate_validation_discount(validations, fee_after_spot)
        final_fee = max(0, fee_after_spot - discount)

        return ParkingFee(
            base_amount=base_fee,
            spot_adjustment=fee_after_spot - base_fee,
            discount=discount,
            final_amount=final_fee,
            breakdown={
                'duration_hours': hours,
                'rate_type': rate.rate_type,
                'spot_type': spot_type,
                'validations_applied': [v.id for v in (validations or [])]
            }
        )

    async def process_exit_payment(
        self,
        ticket_id: str,
        payment_method: str,  # 'card', 'mobile', 'cash', 'account'
        payment_details: Dict
    ) -> PaymentResult:
        """
        Process payment at exit with comprehensive failure handling.

        Critical: Gate should open regardless of payment outcome.
        """
        ticket = await self.db.get_ticket(ticket_id)

        if ticket.status == 'PAID':
            # Already paid (mobile pre-pay or duplicate request)
            return PaymentResult(success=True, already_paid=True)

        fee = self.calculate_fee(
            ticket.lot_id,
            ticket.entry_time,
            datetime.now(),
            ticket.spot_type,
            ticket.validations
        )

        # Generate idempotency key for payment processor
        idempotency_key = f"parking-{ticket_id}-{fee.final_amount}"

        try:
            if payment_method == 'card':
                result = await self._process_card_payment(
                    payment_details['card_token'],
                    fee.final_amount,
                    idempotency_key
                )
            elif payment_method == 'mobile':
                result = await self._process_mobile_payment(
                    payment_details['user_id'],
                    fee.final_amount,
                    idempotency_key
                )
            elif payment_method == 'account':
                # Monthly parker or business account
                result = await self._charge_account(
                    payment_details['account_id'],
                    fee.final_amount
                )
            else:
                # Cash - assume success, reconcile later
                result = PaymentProcessorResult(success=True, method='cash')

            if result.success:
                await self._finalize_successful_payment(ticket, fee, result)
            else:
                await self._handle_failed_payment(ticket, fee, result)

            # ALWAYS signal gate to open
            return PaymentResult(
                success=result.success,
                fee=fee,
                gate_action='OPEN',  # Always open
                follow_up_required=not result.success
            )

        except PaymentProcessorError as e:
            # Payment processor down - let them go, invoice later
            await self._create_pending_invoice(ticket, fee, str(e))

            return PaymentResult(
                success=False,
                fee=fee,
                gate_action='OPEN',  # Still open
                follow_up_required=True,
                error_message='Payment processor unavailable. Invoice will be sent.'
            )

    async def _handle_failed_payment(
        self,
        ticket: Ticket,
        fee: ParkingFee,
        result: PaymentProcessorResult
    ):
        """
        Handle declined cards, insufficient funds, etc.

        Strategy: Flag the license plate, allow exit, recover via invoice.
        """
        # Record failed attempt
        await self.db.execute("""
            INSERT INTO payment_attempts (ticket_id, amount, status, error_code, timestamp)
            VALUES (%s, %s, 'FAILED', %s, NOW())
        """, (ticket.id, fee.final_amount, result.error_code))

        # Create invoice for recovery
        invoice = await self._create_pending_invoice(ticket, fee, result.error_message)

        # Flag license plate for future attention
        await self._flag_license_plate(
            ticket.license_plate,
            'PAYMENT_FAILED',
            invoice.id
        )

        # After N failures, add to "require prepayment" list
        failure_count = await self._get_failure_count(ticket.license_plate)
        if failure_count >= 3:
            await self._add_to_prepayment_required_list(ticket.license_plate)
```

### Payment Processing Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How would you design payment processing for a parking system?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Payment processing involves three stages: (1) <span style="color: #4ade80;">fee calculation</span> based on parking duration and rate rules, (2) <span style="color: #4ade80;">payment collection</span> via multiple channels (kiosk, mobile app, account billing), and (3) <span style="color: #4ade80;">transaction recording</span> for audit and reconciliation. The core principle is separation of concerns - the parking session (ticket creation, spot occupancy) is independent from payment status. This allows flexibility in when and how payment occurs. For implementation, I'd use a payment gateway like Stripe with <span style="color: #4ade80;">idempotency keys</span> to handle retries safely, and maintain a separate invoice system for failed payment recovery.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle payment failures at the exit gate?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The cardinal rule is <span style="color: #4ade80;">never trap a car</span>. Traffic flow is more important than immediate payment collection. Implementation: (1) Attempt payment normally. (2) If declined, offer retry or alternative payment method. (3) If all attempts fail, capture the license plate via LPR, create an invoice record, and open the gate anyway. (4) Flag the license plate in the system for future attention. (5) Send invoice via mail to registered address (via DMV lookup for repeat offenders). For frequent visitors, after 2-3 failures, add them to a "prepayment required" list where the system demands payment before entry on future visits. The business accepts that some small percentage of parking fees will require collection effort - this is normal accounts receivable, not a gate control problem. See [[rate-limiting]](/topics/system-design/rate-limiting) for patterns on handling abuse.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you handle payment processing during a complete network outage?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Network outages require <span style="color: #4ade80;">offline-first payment design</span>. Implementation layers: (1) <span style="color: #4ade80;">Local POS terminals</span> with store-and-forward capability - they process cards locally using cached card network rules and batch transactions when connectivity returns. (2) <span style="color: #4ade80;">Edge controller fee calculation</span> - all rate rules are cached locally so fee can be computed without cloud. (3) <span style="color: #4ade80;">Offline ticket storage</span> - entry times stored locally with unique ticket IDs that sync later. (4) <span style="color: #4ade80;">Cash fallback</span> - always accept cash at kiosk; cash reconciliation happens during shift close. (5) <span style="color: #4ade80;">Event log for reconciliation</span> - every payment event (attempted, succeeded, failed) is logged locally with timestamp and synced to cloud when connectivity returns. The cloud system processes these events idempotently, handling potential duplicates from retry storms. Critical edge case: if outage lasts multiple days, some tickets may exit without any record - accept this as cost of doing business, flag via entry/exit counter discrepancy. This pattern is similar to [[event-sourcing]](/topics/system-design/event-sourcing) where local events are the source of truth and cloud reconstructs state from event replay.</p>
</div>
</div>
</div>

---

## Section 4: Real-Time Availability

### Deep Mechanics

<span style="color: #4ade80;">Real-time availability</span> provides drivers with current parking capacity information through mobile apps, display boards, and navigation systems. The key challenge is balancing <span style="color: #4ade80;">data freshness</span> against <span style="color: #4ade80;">system load</span> and <span style="color: #4ade80;">infrastructure cost</span>.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="margin-top: 0; color: #1e293b;">Availability Update Strategies</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
<div style="background: #dbeafe; padding: 16px; border-radius: 8px; border: 1px solid #93c5fd;">
<strong style="color: #166534;">Push (WebSocket)</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 13px;">Server pushes updates on change. Lowest latency but requires persistent connections. Best for mobile apps.</p>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
<strong style="color: #fbbf24;">Poll (HTTP)</strong>
<p style="color: #cbd5e1; margin: 8px 0 0 0; font-size: 13px;">Client requests every N seconds. Simple, stateless, cacheable. Best for display boards and low-priority clients.</p>
</div>
<div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
<strong style="color: #f87171;">Hybrid</strong>
<p style="color: #cbd5e1; margin: 8px 0 0 0; font-size: 13px;">Poll for background, push for active navigation. Balances resource usage with UX requirements.</p>
</div>
</div>
</div>

### Real-Time Availability Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #00bcd4; text-align: center; margin: 0 0 24px 0;">AVAILABILITY SYNC ARCHITECTURE</h4>

<!-- Event Sources -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #7c3aed; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #a78bfa; font-weight: bold; text-align: center; margin-bottom: 16px;">EVENT SOURCES</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #8b5cf6; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 12px;">Entry/Exit Events</div>
<div style="color: #8b949e; font-size: 10px;">Counter increment/decrement</div>
</div>
<div style="background: #f8fafc; border: 1px solid #8b5cf6; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 12px;">Spot Sensor Events</div>
<div style="color: #8b949e; font-size: 10px;">Per-spot occupancy</div>
</div>
<div style="background: #f8fafc; border: 1px solid #8b5cf6; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #c4b5fd; font-weight: bold; font-size: 12px;">Reservation Events</div>
<div style="color: #8b949e; font-size: 10px;">Future capacity impact</div>
</div>
</div>
</div>

<div style="text-align: center; color: #a78bfa; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Redis Cache Layer -->
<div style="background: linear-gradient(135deg, #4a1d1d 0%, #2d1212 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #f87171; font-weight: bold; text-align: center; margin-bottom: 12px;">REDIS CACHE (Source of Truth for Reads)</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #f8fafc; border: 1px solid #dc2626; border-radius: 8px; padding: 14px;">
<div style="color: #fca5a5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Aggregate Counts</div>
<div style="color: #8b949e; font-size: 11px; font-family: monospace; line-height: 1.6;">
lot:{id}:available = 234<br/>
lot:{id}:total = 500<br/>
lot:{id}:level:1:available = 45
</div>
</div>
<div style="background: #f8fafc; border: 1px solid #dc2626; border-radius: 8px; padding: 14px;">
<div style="color: #fca5a5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">By Type Breakdown</div>
<div style="color: #8b949e; font-size: 11px; font-family: monospace; line-height: 1.6;">
lot:{id}:type:COMPACT = 78<br/>
lot:{id}:type:REGULAR = 110<br/>
lot:{id}:type:EV = 12
</div>
</div>
</div>
</div>

<div style="text-align: center; color: #ef4444; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Distribution Layer -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #00bcd4; border-radius: 12px; padding: 20px;">
<div style="color: #00bcd4; font-weight: bold; text-align: center; margin-bottom: 16px;">DISTRIBUTION CHANNELS</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #06b6d4; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #67e8f9; font-weight: bold; font-size: 12px;">WebSocket</div>
<div style="color: #8b949e; font-size: 10px;">Mobile apps (real-time)</div>
</div>
<div style="background: #f8fafc; border: 1px solid #06b6d4; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #67e8f9; font-weight: bold; font-size: 12px;">REST API</div>
<div style="color: #8b949e; font-size: 10px;">Third-party integrations</div>
</div>
<div style="background: #f8fafc; border: 1px solid #06b6d4; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #67e8f9; font-weight: bold; font-size: 12px;">Display Protocol</div>
<div style="color: #8b949e; font-size: 10px;">LED boards (5s poll)</div>
</div>
<div style="background: #f8fafc; border: 1px solid #06b6d4; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #67e8f9; font-weight: bold; font-size: 12px;">Maps API</div>
<div style="color: #8b949e; font-size: 10px;">Google/Apple integration</div>
</div>
</div>
</div>
</div>

### Real-Time Availability Implementation

```python
class AvailabilityService:
    """
    Real-time availability tracking with multiple update channels.

    Architecture:
    - Redis is the primary read store (fast, atomic operations)
    - PostgreSQL is the source of truth (recovery, reporting)
    - Updates flow: Event -> Redis (atomic) -> Subscribers
    """

    def __init__(self, redis: Redis, db: Database, pubsub: PubSub):
        self.redis = redis
        self.db = db
        self.pubsub = pubsub

    async def handle_occupancy_change(self, event: OccupancyEvent):
        """
        Process spot status change and update all availability views.

        Uses Redis atomic operations to prevent race conditions.
        """
        lot_id = event.lot_id
        delta = -1 if event.new_status == 'OCCUPIED' else 1

        # Atomic updates using Redis pipeline
        pipe = self.redis.pipeline()

        # Update total availability
        pipe.incrby(f"lot:{lot_id}:available", delta)

        # Update level-specific count
        if event.level_id:
            pipe.incrby(f"lot:{lot_id}:level:{event.level_id}:available", delta)

        # Update type-specific count
        if event.spot_type:
            pipe.incrby(f"lot:{lot_id}:type:{event.spot_type}:available", delta)

        # Execute all updates atomically
        await pipe.execute()

        # Publish change notification for real-time subscribers
        await self._publish_availability_update(lot_id)

        # Async write to PostgreSQL for durability
        asyncio.create_task(self._persist_to_db(event))

    async def get_availability(self, lot_id: str) -> AvailabilitySnapshot:
        """
        Get current availability from Redis cache.

        Returns comprehensive breakdown for different use cases:
        - Total counts for display boards
        - By-level for in-lot navigation
        - By-type for app filtering
        """
        pipe = self.redis.pipeline()

        pipe.get(f"lot:{lot_id}:available")
        pipe.get(f"lot:{lot_id}:total")
        pipe.hgetall(f"lot:{lot_id}:levels")
        pipe.hgetall(f"lot:{lot_id}:types")

        available, total, levels, types = await pipe.execute()

        return AvailabilitySnapshot(
            lot_id=lot_id,
            total_spots=int(total or 0),
            available_spots=int(available or 0),
            occupancy_rate=1 - (int(available or 0) / int(total or 1)),
            by_level={k: int(v) for k, v in (levels or {}).items()},
            by_type={k: int(v) for k, v in (types or {}).items()},
            last_updated=datetime.now()
        )

    async def _publish_availability_update(self, lot_id: str):
        """
        Publish availability change to all subscribers.

        Subscribers include:
        - WebSocket connections (mobile apps)
        - Display board controllers
        - Navigation system integrations
        """
        availability = await self.get_availability(lot_id)

        message = {
            'type': 'availability_update',
            'lot_id': lot_id,
            'data': availability.to_dict(),
            'timestamp': datetime.now().isoformat()
        }

        # Publish to Redis pub/sub for WebSocket servers
        await self.pubsub.publish(f"lot:{lot_id}:updates", json.dumps(message))

        # Check if significant change (for display boards, threshold updates only)
        if self._is_significant_change(lot_id, availability):
            await self.pubsub.publish(f"displays:{lot_id}", json.dumps(message))

    def _is_significant_change(self, lot_id: str, availability: AvailabilitySnapshot) -> bool:
        """
        Determine if change is significant enough for display update.

        Display boards don't need every single-spot change.
        Update when: lot fills up, lot empties, crosses threshold (10, 5, 0 spots).
        """
        thresholds = [0, 5, 10, 50]  # Alert levels

        previous = self.redis.get(f"lot:{lot_id}:last_display_available")
        current = availability.available_spots

        if previous is None:
            return True

        previous = int(previous)

        # Check if crossed a threshold
        for threshold in thresholds:
            if (previous > threshold >= current) or (previous <= threshold < current):
                self.redis.set(f"lot:{lot_id}:last_display_available", current)
                return True

        return False
```

### Real-Time Availability Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How would you show real-time parking availability?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Real-time availability requires a <span style="color: #4ade80;">fast read store</span> (Redis) updated by entry/exit events. When a vehicle enters, we atomically decrement the available count; when it exits, we increment. This count is served to various channels: REST API for on-demand queries, WebSocket for mobile apps with live updates, and polling endpoints for display boards. The key is using <span style="color: #4ade80;">atomic operations</span> (Redis INCR/DECR) to prevent race conditions when multiple vehicles enter/exit simultaneously. For display boards in the lot, simple HTTP polling every 5-10 seconds is sufficient - they don't need sub-second updates.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you ensure availability data doesn't drift from actual occupancy over time?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Drift occurs when entry/exit events are missed or processed incorrectly. Mitigation strategies: (1) <span style="color: #4ade80;">Periodic reconciliation</span> - compare Redis counts against database ticket records (open tickets = occupied spots). (2) <span style="color: #4ade80;">Per-spot sensor validation</span> - if you have per-spot sensors, aggregate their data and compare with counter-based availability. (3) <span style="color: #4ade80;">Manual correction interface</span> for lot attendants to adjust counts after visual verification. (4) <span style="color: #4ade80;">Event logging</span> - log every increment/decrement with timestamp so you can audit drift sources. (5) <span style="color: #4ade80;">Scheduled recounts</span> - during low-traffic hours (2-4 AM), reset counters to match actual sensor state or manual count. The key insight is that small drift (1-2 spots) is acceptable and self-correcting over time; large drift indicates a systematic bug that needs investigation.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you scale real-time availability updates to support 10,000 concurrent mobile app users per lot?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Scaling to 10K concurrent connections requires <span style="color: #4ade80;">connection multiplexing</span> and <span style="color: #4ade80;">intelligent update throttling</span>. Architecture: (1) Use <span style="color: #4ade80;">Redis Pub/Sub</span> as the distribution backbone - availability service publishes changes, multiple WebSocket servers subscribe. (2) WebSocket servers are horizontally scaled behind a load balancer with sticky sessions (by lot_id). (3) <span style="color: #4ade80;">Throttle updates</span> - aggregate changes over 500ms windows before pushing to clients. A lot with 500 spots might have 100 changes per minute at peak, but clients don't need every individual update. (4) <span style="color: #4ade80;">Smart client reconnection</span> - if client disconnects and reconnects, fetch current state via HTTP, then resume WebSocket subscription (no guaranteed delivery of missed messages). (5) <span style="color: #4ade80;">CDN caching</span> for HTTP polling endpoints with 5-second TTL - reduces origin load for clients that fall back from WebSocket. (6) Consider <span style="color: #4ade80;">geographic sharding</span> if lots are spread across regions - each region has its own Redis cluster and WebSocket fleet. For reference, see [[cdn]](/topics/system-design/cdn) for caching strategies and [[api-gateway]](/topics/system-design/api-gateway) for request distribution patterns.</p>
</div>
</div>
</div>

---

## Section 5: Dynamic Pricing Strategies

### Deep Mechanics

<span style="color: #4ade80;">Dynamic pricing</span> adjusts parking rates based on demand, time, and external factors to maximize revenue and optimize utilization. The core challenge is balancing <span style="color: #4ade80;">revenue optimization</span> against <span style="color: #4ade80;">customer fairness perception</span> and <span style="color: #4ade80;">operational complexity</span>.

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #166534; margin-top: 0;">Dynamic Pricing Factors</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<strong style="color: #166534;">Occupancy-Based</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Higher prices when lot is >70% full, surge at >90%. Creates natural demand distribution across lots.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
<strong style="color: #166534;">Time-Based</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Peak hours (9-6 weekdays) vs off-peak. Early bird specials, evening event pricing.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
<strong style="color: #166534;">Event-Based</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Integrate with event calendars. Sports games, concerts trigger surge pricing for nearby lots.</p>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
<strong style="color: #166534;">Duration-Based</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Encourage turnover with progressive rates. First hour cheap, subsequent hours progressively more expensive.</p>
</div>
</div>
</div>

### Dynamic Pricing Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #fbbf24; text-align: center; margin: 0 0 24px 0;">DYNAMIC PRICING ENGINE</h4>

<!-- Input Signals -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #eab308; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #fbbf24; font-weight: bold; text-align: center; margin-bottom: 16px;">PRICING SIGNALS</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #ca8a04; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #fcd34d; font-weight: bold; font-size: 12px;">Current Occupancy</div>
<div style="color: #8b949e; font-size: 10px;">Real-time from Redis</div>
</div>
<div style="background: #f8fafc; border: 1px solid #ca8a04; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #fcd34d; font-weight: bold; font-size: 12px;">Time of Day</div>
<div style="color: #8b949e; font-size: 10px;">Scheduled rules</div>
</div>
<div style="background: #f8fafc; border: 1px solid #ca8a04; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #fcd34d; font-weight: bold; font-size: 12px;">Event Calendar</div>
<div style="color: #8b949e; font-size: 10px;">External API</div>
</div>
<div style="background: #f8fafc; border: 1px solid #ca8a04; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #fcd34d; font-weight: bold; font-size: 12px;">Historical Data</div>
<div style="color: #8b949e; font-size: 10px;">ML predictions</div>
</div>
</div>
</div>

<div style="text-align: center; color: #fbbf24; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Pricing Engine -->
<div style="background: linear-gradient(135deg, #422006 0%, #1c0a00 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #fbbf24; font-weight: bold; text-align: center; margin-bottom: 12px;">PRICING CALCULATION ENGINE</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: #f8fafc; border: 1px solid #d97706; border-radius: 8px; padding: 14px; text-align: center;">
<div style="color: #fdba74; font-weight: bold; font-size: 12px;">Base Rate</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">$3/hour</div>
</div>
<div style="background: #f8fafc; border: 1px solid #d97706; border-radius: 8px; padding: 14px; text-align: center;">
<div style="color: #fdba74; font-weight: bold; font-size: 12px;">Multipliers</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">0.8x - 2.5x</div>
</div>
<div style="background: #f8fafc; border: 1px solid #d97706; border-radius: 8px; padding: 14px; text-align: center;">
<div style="color: #fdba74; font-weight: bold; font-size: 12px;">Caps</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Daily max, surge limit</div>
</div>
</div>
</div>

<div style="text-align: center; color: #f59e0b; font-size: 20px; margin: 8px 0;">&#8595;</div>

<!-- Output Channels -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #1a4d8c 100%); border: 2px solid #58a6ff; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Entry Display</div>
<div style="color: #93c5fd; font-size: 11px; margin-top: 4px;">Current rate shown</div>
</div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); border: 2px solid #a78bfa; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Mobile App</div>
<div style="color: #ddd6fe; font-size: 11px; margin-top: 4px;">Estimated cost</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #1a5a28 100%); border: 2px solid #3fb950; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #ffffff; font-weight: bold;">Reservation System</div>
<div style="color: #a7f3d0; font-size: 11px; margin-top: 4px;">Future pricing</div>
</div>
</div>
</div>

### Dynamic Pricing Implementation

```python
class DynamicPricingService:
    """
    Calculate parking rates based on multiple demand signals.

    Philosophy: Dynamic pricing should feel fair to customers.
    - Transparency: Always show current rate before entry
    - Caps: Maximum multiplier prevents gouging
    - Grandfathering: Rate locked at entry, not recalculated at exit
    """

    def __init__(self, cache: Redis, db: Database, event_api: EventAPIClient):
        self.cache = cache
        self.db = db
        self.event_api = event_api

    async def calculate_price(
        self,
        lot_id: str,
        arrival_time: datetime,
        expected_duration: timedelta = None
    ) -> PriceQuote:
        """
        Calculate price with full transparency on factors.

        Returns quote with breakdown so customer understands pricing.
        """
        lot = await self.db.get_lot(lot_id)
        base_rate = lot.base_hourly_rate

        # Gather pricing signals
        occupancy = await self._get_occupancy(lot_id)
        time_factor = self._get_time_factor(arrival_time, lot.time_pricing_rules)
        event_factor = await self._get_event_factor(lot_id, arrival_time)
        demand_factor = await self._get_predicted_demand(lot_id, arrival_time)

        # Calculate multipliers
        multipliers = {
            'occupancy': self._occupancy_multiplier(occupancy),
            'time_of_day': time_factor,
            'events': event_factor,
            'predicted_demand': demand_factor
        }

        # Combined multiplier with cap
        combined_multiplier = 1.0
        for factor, value in multipliers.items():
            combined_multiplier *= value

        # Apply caps for fairness
        combined_multiplier = min(combined_multiplier, lot.max_surge_multiplier)
        combined_multiplier = max(combined_multiplier, lot.min_discount_multiplier)

        final_rate = base_rate * combined_multiplier

        # Calculate estimated total if duration provided
        estimated_total = None
        if expected_duration:
            hours = expected_duration.total_seconds() / 3600
            estimated_total = min(
                final_rate * math.ceil(hours),
                lot.daily_max_rate
            )

        return PriceQuote(
            lot_id=lot_id,
            base_rate=base_rate,
            final_rate=final_rate,
            multiplier=combined_multiplier,
            multiplier_breakdown=multipliers,
            estimated_total=estimated_total,
            daily_max=lot.daily_max_rate,
            valid_until=arrival_time + timedelta(minutes=15),  # Quote expires
            factors_explanation=self._generate_explanation(multipliers)
        )

    def _occupancy_multiplier(self, occupancy_rate: float) -> float:
        """
        Higher prices when lot is filling up.

        Thresholds:
        - <50%: 1.0 (base rate)
        - 50-70%: 1.2 (slight premium)
        - 70-90%: 1.5 (high demand)
        - >90%: 2.0 (surge, near capacity)
        """
        if occupancy_rate < 0.5:
            return 1.0
        elif occupancy_rate < 0.7:
            return 1.0 + (occupancy_rate - 0.5) * 1.0  # Linear 1.0 to 1.2
        elif occupancy_rate < 0.9:
            return 1.2 + (occupancy_rate - 0.7) * 1.5  # Linear 1.2 to 1.5
        else:
            return 1.5 + (occupancy_rate - 0.9) * 5.0  # Steep 1.5 to 2.0

    def _get_time_factor(
        self,
        arrival_time: datetime,
        rules: List[TimePricingRule]
    ) -> float:
        """
        Apply time-based pricing rules.

        Common patterns:
        - Early bird: Enter before 9am = flat rate
        - Peak hours: 9am-6pm weekdays = premium
        - Evening: After 6pm = discount
        - Weekend: Often discounted
        """
        hour = arrival_time.hour
        is_weekend = arrival_time.weekday() >= 5

        for rule in rules:
            if rule.matches(hour, is_weekend):
                return rule.multiplier

        return 1.0  # Default

    async def _get_event_factor(self, lot_id: str, arrival_time: datetime) -> float:
        """
        Check for nearby events that affect demand.

        Integrates with external event APIs (Ticketmaster, local venues).
        """
        lot = await self.db.get_lot(lot_id)

        # Find events within 1km of lot in next 4 hours
        nearby_events = await self.event_api.get_nearby_events(
            lat=lot.latitude,
            lng=lot.longitude,
            radius_km=1,
            start_time=arrival_time,
            end_time=arrival_time + timedelta(hours=4)
        )

        if not nearby_events:
            return 1.0

        # Factor based on event size
        max_attendance = max(e.expected_attendance for e in nearby_events)

        if max_attendance > 50000:  # Major event
            return 2.0
        elif max_attendance > 10000:  # Large event
            return 1.5
        elif max_attendance > 1000:  # Medium event
            return 1.2

        return 1.0

    async def lock_rate_for_ticket(self, ticket_id: str, rate: float):
        """
        Lock in the entry rate for a ticket.

        Critical: Customer pays the rate shown at entry, not
        whatever the rate is when they exit. This prevents
        unfair surprises and builds trust.
        """
        await self.cache.hset(f"ticket:{ticket_id}", 'locked_rate', rate)
        await self.cache.hset(f"ticket:{ticket_id}", 'rate_locked_at', datetime.now().isoformat())
```

### Dynamic Pricing Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How would you implement dynamic pricing for parking?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Dynamic pricing adjusts rates based on <span style="color: #4ade80;">demand signals</span>: current occupancy, time of day, and special events. Implementation: (1) Define a base hourly rate, (2) Calculate multipliers for each signal (e.g., >90% occupancy = 2x multiplier), (3) Combine multipliers with caps to prevent extreme pricing, (4) Display the current rate prominently at entry and in apps. The rate shown at entry is <span style="color: #4ade80;">locked for that customer's session</span> - they shouldn't be surprised by a different rate at exit. Most lots use simple tiered pricing (peak/off-peak) rather than fully dynamic; true dynamic pricing adds complexity that may not be worth it for smaller operations.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you balance revenue optimization with customer fairness?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Fairness is critical for customer trust and repeat business. Key principles: (1) <span style="color: #4ade80;">Transparency</span> - always show the current rate before the customer commits to parking; display price prominently at entrance. (2) <span style="color: #4ade80;">Rate locking</span> - the rate at entry is the rate they pay, even if surge pricing kicks in while they're parked. (3) <span style="color: #4ade80;">Maximum caps</span> - never exceed 2-3x base rate regardless of demand signals. (4) <span style="color: #4ade80;">Daily maximums</span> - even during surge, cap total daily charge. (5) <span style="color: #4ade80;">Consistent rules</span> - pricing algorithm is deterministic, not arbitrary. (6) <span style="color: #4ade80;">Loyalty benefits</span> - frequent parkers get stable rates or discounts, not surprise surges. The revenue optimization goal is to smooth demand (encourage off-peak usage) not to extract maximum possible revenue from captive customers.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you implement predictive pricing that considers future demand?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Predictive pricing uses <span style="color: #4ade80;">machine learning</span> on historical patterns to anticipate demand and price proactively. Implementation: (1) <span style="color: #4ade80;">Feature engineering</span> - collect training data including: day of week, hour, weather, nearby event schedules, historical occupancy at that time slot, school calendar, etc. (2) <span style="color: #4ade80;">Model training</span> - use time series forecasting (Prophet, ARIMA) or regression models to predict occupancy 1-4 hours ahead. (3) <span style="color: #4ade80;">Pricing optimization</span> - given predicted occupancy, calculate optimal price that maximizes revenue * predicted demand (price elasticity curve). (4) <span style="color: #4ade80;">A/B testing</span> - run experiments comparing predicted pricing vs. reactive pricing to validate model accuracy. (5) <span style="color: #4ade80;">Feedback loop</span> - actual occupancy feeds back into model retraining. Edge cases: Model performs poorly for unprecedented events (new venue opens, road closure) - need manual override capability. Also, be careful with <span style="color: #4ade80;">price anchoring</span>: if customers see $5 rate at 8am but it jumps to $8 at 9am, they may defer arrival and create artificial demand spikes. Consider graduated increases rather than step functions. This is similar to airline yield management but with shorter decision windows.</p>
</div>
</div>
</div>

---

## Data Model

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">PARKING LOT DATA MODEL</h4>

<!-- Entity Relationships Diagram -->
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; text-align: center; margin-bottom: 20px; font-size: 14px;">ENTITY RELATIONSHIPS</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">

<!-- ParkingLot Entity -->
<div style="background: linear-gradient(135deg, #238636 0%, #1a5a28 100%); border: 2px solid #3fb950; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">ParkingLot (1)</span>
</div>

<div style="display: flex; align-items: center; gap: 8px;">
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
<span style="color: #6e7681; font-size: 12px;">has many</span>
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
</div>

<!-- Level Entity -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #1a4d8c 100%); border: 2px solid #58a6ff; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">Level (M)</span>
</div>

<div style="display: flex; align-items: center; gap: 8px;">
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
<span style="color: #6e7681; font-size: 12px;">contains</span>
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
</div>

<!-- Spot Entity -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #6b3dbd 100%); border: 2px solid #a371f7; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">Spot (M)</span>
</div>

<div style="display: flex; align-items: center; gap: 8px;">
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
<span style="color: #6e7681; font-size: 12px;">linked via</span>
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
</div>

<!-- Ticket Entity -->
<div style="background: linear-gradient(135deg, #f0883e 0%, #c76a2e 100%); border: 2px solid #f9826c; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">Ticket</span>
</div>

<div style="display: flex; align-items: center; gap: 8px;">
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
<span style="color: #6e7681; font-size: 12px;">belongs to</span>
<div style="color: #8b949e; font-size: 18px;">&#8595;</div>
</div>

<!-- Vehicle Entity -->
<div style="background: linear-gradient(135deg, #da3633 0%, #a82828 100%); border: 2px solid #f85149; border-radius: 10px; padding: 14px 28px; text-align: center;">
<span style="color: #ffffff; font-weight: bold;">Vehicle</span>
</div>

</div>
</div>

<!-- Tables Schema -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<div style="background: #f1f5f9; border: 1px solid #238636; border-radius: 8px; padding: 16px;">
<div style="color: #3fb950; font-weight: bold; margin-bottom: 8px; font-size: 13px;">parking_lots</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, name, address, total_spots, lat, lng, base_hourly_rate, daily_max_rate, max_surge_multiplier</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #1f6feb; border-radius: 8px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: bold; margin-bottom: 8px; font-size: 13px;">levels</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, lot_id, floor_number, name, total_spots</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #8957e5; border-radius: 8px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px; font-size: 13px;">spots</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, level_id, spot_number, spot_type, status, sensor_id, distance_to_entrance</div>
<div style="color: #6e7681; font-size: 11px; margin-top: 4px;">type: COMPACT, REGULAR, LARGE, HANDICAP, EV</div>
<div style="color: #6e7681; font-size: 11px;">status: AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #f0883e; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px; font-size: 13px;">tickets</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, lot_id, spot_id, vehicle_id, entry_time, exit_time, status, locked_rate, amount_due, amount_paid</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #da3633; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px; font-size: 13px;">vehicles</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, license_plate, vehicle_type, owner_id, payment_method_id</div>
</div>

<div style="background: #f1f5f9; border: 1px solid #00bcd4; border-radius: 8px; padding: 16px;">
<div style="color: #00bcd4; font-weight: bold; margin-bottom: 8px; font-size: 13px;">reservations</div>
<div style="color: #8b949e; font-size: 12px; line-height: 1.6;">id, spot_id, user_id, start_time, end_time, status, prepaid_amount</div>
</div>

</div>

</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Database** | Aurora PostgreSQL | CockroachDB, Supabase | Aurora: Managed, multi-AZ. CockroachDB: Multi-region active-active |
| **Cache** | ElastiCache Redis | Redis Cloud, KeyDB | ElastiCache: Simpler ops. Redis Cloud: Better georeplication |
| **IoT** | IoT Core | HiveMQ, EMQX | IoT Core: Managed, integrates with Lambda. Self-hosted: More control |
| **ML (LPR)** | Rekognition | OpenALPR, PlateMania | Rekognition: Managed, pay-per-use. OpenALPR: On-prem, lower latency |
| **Events** | EventBridge + SNS | Kafka, RabbitMQ | EventBridge: Serverless. Kafka: Higher throughput, more complex |
| **WebSocket** | API Gateway WebSocket | Socket.io, Ably | API Gateway: Managed, scales. Socket.io: More features, self-managed |
| **Edge Computing** | Greengrass | Azure IoT Edge, Balena | Greengrass: AWS ecosystem. Balena: Simpler container deployment |

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

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

### When You DON'T Need Dynamic Pricing

| Skip Dynamic Pricing When... | Why |
|------------------------------|-----|
| Predictable demand patterns | Peak/off-peak flat rates work fine |
| Single use case (office parking) | All-day rates simpler to understand |
| Customer base expects stability | Seniors, regulars dislike variable pricing |
| Implementation cost > revenue gain | Small lots won't see meaningful lift |

### Simpler Alternatives That Work

| Complex Solution | Simpler Alternative | When Simple Wins |
|-----------------|---------------------|------------------|
| ML-based LPR | QR code tickets | <1000 cars/day, budget constraints |
| Dynamic pricing algorithm | Peak/off-peak flat rates | Predictable demand patterns |
| Per-spot sensors | Floor-level counters | Any lot without premium features |
| Microservices architecture | Django monolith | Single location, <10 developers |
| Real-time WebSocket updates | 30-second polling | Display boards, non-critical |
| Distributed Redis cache | PostgreSQL with indices | <1000 concurrent users |

</div>
</div>

---

## Trade-off Analysis Summary

<div style="background: linear-gradient(135deg, #f0883e 0%, #f9826c 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

### Critical Trade-offs Matrix

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #f0883e; border-radius: 12px; padding: 24px; margin: 16px 0;">
<div style="color: #f0883e; font-weight: bold; text-align: center; margin-bottom: 20px; font-size: 16px;">PARKING SYSTEM TRADE-OFFS</div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<!-- Row 1 -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f1f5f9; border-radius: 8px; padding: 12px;">
<div style="color: #f9826c; font-weight: bold; font-size: 12px;">Trade-off</div>
<div style="color: #3fb950; font-weight: bold; font-size: 12px;">Option A</div>
<div style="color: #1d4ed8; font-weight: bold; font-size: 12px;">Option B</div>
<div style="color: #a371f7; font-weight: bold; font-size: 12px;">Decision Factor</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 12px;"><span style="color: #4ade80;">Sensor Granularity</span></div>
<div style="color: #8b949e; font-size: 12px;">Per-spot sensors ($50-150/spot)</div>
<div style="color: #8b949e; font-size: 12px;">Entry/exit counters ($500 total)</div>
<div style="color: #8b949e; font-size: 12px;">Need "find my car" feature?</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 12px;"><span style="color: #4ade80;">Concurrency Control</span></div>
<div style="color: #8b949e; font-size: 12px;">Database locks (simple)</div>
<div style="color: #8b949e; font-size: 12px;">Redis distributed locks (fast)</div>
<div style="color: #8b949e; font-size: 12px;">>1000 TPS bookings?</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 12px;"><span style="color: #4ade80;">Offline Capability</span></div>
<div style="color: #8b949e; font-size: 12px;">Cloud-dependent (simpler)</div>
<div style="color: #8b949e; font-size: 12px;">Edge-first (resilient)</div>
<div style="color: #8b949e; font-size: 12px;">Internet reliability at location?</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 12px;"><span style="color: #4ade80;">Pricing Model</span></div>
<div style="color: #8b949e; font-size: 12px;">Static rates (predictable)</div>
<div style="color: #8b949e; font-size: 12px;">Dynamic pricing (optimized)</div>
<div style="color: #8b949e; font-size: 12px;">Variable demand patterns?</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; background: #f8fafc; border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 12px;"><span style="color: #4ade80;">Payment Timing</span></div>
<div style="color: #8b949e; font-size: 12px;">Pay on exit (simple)</div>
<div style="color: #8b949e; font-size: 12px;">Pre-registration (reduced exit time)</div>
<div style="color: #8b949e; font-size: 12px;">Exit queue congestion problem?</div>
</div>

</div>
</div>

</div>
</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Spot allocation strategies**: Different approaches for different use cases (nearest entrance vs. distributed load vs. preserve larger spots)
2. **Sensor trade-offs**: Per-spot vs. entry/exit counters - most lots don't need per-spot tracking
3. **Payment resilience**: Never trap a car; revenue recovery is a business process, not a gate control problem
4. **Real-time sync**: Event-driven updates with atomic Redis operations; polling for displays
5. **Offline operation**: Edge controllers with event sourcing for resilience
6. **Dynamic pricing**: Occupancy + time + events, but acknowledge most lots use flat rates

### Red Flags to Avoid

| Red Flag | Why It's Bad | Better Approach |
|----------|--------------|-----------------|
| "We need per-spot IoT sensors everywhere" | Over-engineering for most use cases | "Entry/exit counters work for most lots" |
| "Microservices from day one" | Premature complexity | "Start monolithic, extract when needed" |
| "ML-based dynamic pricing from launch" | Most lots use simple rules | "Peak/off-peak rates, surge during events" |
| "Blockchain for payments" | No actual benefit | "Standard payment gateway with idempotency" |
| "Block cars on payment failure" | Creates operational chaos | "Flag plate, invoice later, let car exit" |
| Ignoring offline scenarios | Lots must operate without cloud | "Edge controller with local fallback" |

### Impressive Statements

> "Most parking lots just need a counter at entry/exit - no per-spot tracking. I'd start there and add complexity only when the business case justifies the sensor investment."

> "The cardinal rule of parking payments is: never trap a car. Revenue recovery is an accounts receivable problem, not a gate control problem. Let them go, invoice them later."

> "I'd design for offline-first operation. The lot should function perfectly with zero cloud connectivity - mobile apps and analytics are nice-to-haves, not requirements."

> "For concurrency, I'd start with simple database transactions. Redis distributed locks are only needed when we're processing thousands of simultaneous bookings - which most lots never reach."

> "Dynamic pricing sounds exciting, but most successful lots use simple peak/off-peak rates. True dynamic pricing adds complexity that often doesn't justify the revenue improvement."

### Related Topics

- [[distributed-locking]](/topics/system-design/distributed-locking) - Concurrent spot allocation
- [[event-sourcing]](/topics/system-design/event-sourcing) - Offline sync and reconciliation
- [[rate-limiting]](/topics/system-design/rate-limiting) - Preventing reservation abuse
- [[api-gateway]](/topics/system-design/api-gateway) - Multi-channel API management
- [[cdn]](/topics/system-design/cdn) - Caching availability data
- [[connection-pooling]](/topics/system-design/connection-pooling) - Resource management patterns

</div>
