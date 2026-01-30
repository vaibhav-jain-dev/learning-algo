# Parking Lot System

## Overview

The Parking Lot problem is a classic machine coding interview question that tests your ability to model real-world entities with proper object-oriented design. It evaluates understanding of encapsulation, inheritance, composition, design patterns, and concurrent state management. Unlike algorithmic problems, success here depends on **design clarity**, **extensibility**, and **handling edge cases** gracefully.

A parking lot system manages the lifecycle of vehicles entering, parking, and exiting a facility. It must handle multiple vehicle types, different spot sizes, dynamic pricing, concurrent access from multiple entry/exit points, and maintain accurate availability information in real-time.

---

## Why This Problem Matters

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Real-World Parking Systems</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: 600;">Airport Parking (LAX, Heathrow)</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Handles 30,000+ vehicles daily across multiple terminals, long-term/short-term lots, valet services, and EV charging stations. Must integrate with flight data for pricing and availability predictions.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #1e293b; font-weight: 600;">Shopping Mall Parking (Westfield, Simon Properties)</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Dynamic pricing based on store validation, reserved spots for premium customers, integration with loyalty programs. Peak handling during holidays requires sophisticated load balancing.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #1e293b; font-weight: 600;">Smart City Parking (SF Park, Barcelona)</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Real-time sensor data from thousands of spots, mobile app integration, surge pricing during events, and integration with traffic management systems.</div>
</div>
</div>
</div>

**What Interviewers Evaluate:**
- **OOP Fundamentals**: Proper abstraction, encapsulation, inheritance vs composition decisions
- **Design Pattern Application**: Factory, Strategy, Observer patterns in context
- **Concurrency Awareness**: Race conditions, atomic operations, deadlock prevention
- **Extensibility**: How easily can new vehicle types, pricing models, or features be added?
- **Edge Case Handling**: Full lots, invalid tickets, power failures, time zone changes

---

## Core Requirements Analysis

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Requirement Breakdown</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
<div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Functional Requirements</div>
<div style="color: #047857; font-size: 14px;">
<div style="padding: 4px 0;">1. Park vehicles of different types (motorcycle, car, truck, bus)</div>
<div style="padding: 4px 0;">2. Assign appropriate spots based on vehicle size</div>
<div style="padding: 4px 0;">3. Generate tickets on entry with timestamp</div>
<div style="padding: 4px 0;">4. Calculate fees based on duration and vehicle type</div>
<div style="padding: 4px 0;">5. Track real-time availability per floor/spot type</div>
<div style="padding: 4px 0;">6. Support multiple entry/exit points</div>
</div>
</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Non-Functional Requirements</div>
<div style="color: #3730a3; font-size: 14px;">
<div style="padding: 4px 0;">1. Handle concurrent entry/exit at peak times</div>
<div style="padding: 4px 0;">2. Sub-second spot allocation latency</div>
<div style="padding: 4px 0;">3. Accurate billing even during system failures</div>
<div style="padding: 4px 0;">4. Extensible to new vehicle types without code changes</div>
<div style="padding: 4px 0;">5. Audit trail for all transactions</div>
</div>
</div>
<div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Key Assumptions to Clarify</div>
<div style="color: #78350f; font-size: 14px;">
<div style="padding: 4px 0;">- Can a motorcycle use a car spot if no small spots available?</div>
<div style="padding: 4px 0;">- Is pricing per hour, per minute, or tiered?</div>
<div style="padding: 4px 0;">- Do trucks span multiple spots?</div>
<div style="padding: 4px 0;">- Are reservations supported?</div>
<div style="padding: 4px 0;">- What happens on payment failure at exit?</div>
</div>
</div>
</div>
</div>

---

## Object-Oriented Design

### Class Hierarchy and Relationships

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">System Architecture</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
<div style="background: #dbeafe; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px;">Core Entities</div>
<div style="color: #3730a3; font-size: 13px; margin-top: 8px;">
  ParkingLot<br/>
  ParkingFloor<br/>
  ParkingSpot<br/>
  Vehicle (abstract)<br/>
  Ticket
</div>
</div>
<div style="background: #dcfce7; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #166534; font-weight: 700; font-size: 16px;">Strategies</div>
<div style="color: #15803d; font-size: 13px; margin-top: 8px;">
  SpotAllocationStrategy<br/>
  PricingStrategy<br/>
  PaymentProcessor<br/>
  NotificationService
</div>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 16px;">Entry Points</div>
<div style="color: #b45309; font-size: 13px; margin-top: 8px;">
  EntryGate<br/>
  ExitGate<br/>
  DisplayBoard<br/>
  AdminPanel
</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 12px;">Relationship Types</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px;">
<div style="color: #475569;">
<strong>Composition:</strong> ParkingLot owns Floors (floors don't exist independently)
</div>
<div style="color: #475569;">
<strong>Aggregation:</strong> Floor has Spots (spots could theoretically exist alone)
</div>
<div style="color: #475569;">
<strong>Association:</strong> Ticket references Vehicle and Spot
</div>
<div style="color: #475569;">
<strong>Inheritance:</strong> Car, Motorcycle, Truck extend Vehicle
</div>
</div>
</div>
</div>

### Design Decisions and Trade-offs

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Critical Design Choices</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600;">Decision 1: Vehicle as Abstract Class vs Interface</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
<div style="background: #dcfce7; padding: 12px; border-radius: 6px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">Abstract Class (Chosen)</div>
<div style="color: #15803d; font-size: 12px; margin-top: 4px;">
            - Shared state (license plate, entry time)<br/>
            - Common behavior implementations<br/>
            - Single inheritance sufficient here
</div>
</div>
<div style="background: #fee2e2; padding: 12px; border-radius: 6px;">
<div style="color: #991b1b; font-weight: 600; font-size: 13px;">Interface</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 4px;">
            - More flexible for hybrid vehicles<br/>
            - No shared state management<br/>
            - Better for multiple inheritance needs
</div>
</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600;">Decision 2: Spot Tracks Vehicle vs Vehicle Tracks Spot</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
<div style="background: #dcfce7; padding: 12px; border-radius: 6px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">Spot has Vehicle reference (Chosen)</div>
<div style="color: #15803d; font-size: 12px; margin-top: 4px;">
            - Natural: "spot is occupied by vehicle"<br/>
            - Easy availability queries<br/>
            - Clear ownership semantics
</div>
</div>
<div style="background: #fef3c7; padding: 12px; border-radius: 6px;">
<div style="color: #92400e; font-weight: 600; font-size: 13px;">Both directions (Alternative)</div>
<div style="color: #b45309; font-size: 12px; margin-top: 4px;">
            - Bidirectional navigation<br/>
            - Risk of inconsistent state<br/>
            - Use Ticket as single source of truth
</div>
</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600;">Decision 3: Singleton ParkingLot vs Dependency Injection</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
<div style="background: #fee2e2; padding: 12px; border-radius: 6px;">
<div style="color: #991b1b; font-weight: 600; font-size: 13px;">Singleton</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 4px;">
            - Global access point<br/>
            - Hard to test and mock<br/>
            - Tight coupling
</div>
</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 6px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">Dependency Injection (Chosen)</div>
<div style="color: #15803d; font-size: 12px; margin-top: 4px;">
            - Testable with mock lots<br/>
            - Multiple lot support<br/>
            - Loose coupling
</div>
</div>
</div>
</div>
</div>
</div>

### Interview Questions: OOP Design (3-Level Deep)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  **L1: Why use inheritance for Vehicle types instead of a single class with a type field?**

  **Answer:** Inheritance enables:
  - **Type-specific behavior**: Electric vehicles need charging status, motorcycles may have helmet storage
  - **Compile-time type safety**: Can't accidentally pass a Car to motorcycle-only methods
  - **Open/Closed Principle**: Add new vehicle types without modifying existing code
  - **Polymorphism**: Uniform `getRequiredSpotSize()` interface with type-specific implementations

  **L2: Follow-up: When would you choose composition over inheritance for vehicles?**

  **Answer:** Use composition when:
  - **Vehicle capabilities vary independently**: A car can be electric OR gasoline, compact OR SUV (multiple orthogonal dimensions)
  - **Runtime flexibility needed**: Vehicle upgrades trailer attachment mid-parking
  - **Avoiding diamond problem**: Electric SUV inherits from both ElectricVehicle and SUV

  ```python
  # Composition approach
  class Vehicle:
  def __init__(self, engine: Engine, size: SizeCategory, features: List[Feature]):
  self.engine = engine  # Gasoline, Electric, Hybrid
  self.size = size      # Compact, Standard, Large
  self.features = features  # [Trailer, RoofRack, ...]
  ```

  **L3: Follow-up: How would you handle a vehicle that requires multiple spots (bus spanning 5 spots)?**

  **Answer:** Two approaches:

  1. **Composite Spot Pattern**: Create a `MultiSpot` that groups adjacent spots
  ```python
  class MultiSpot(ParkingSpot):
  def __init__(self, spots: List[ParkingSpot]):
  self.constituent_spots = spots

  def reserve(self):
  # Atomically reserve all spots or none
  with transaction:
  for spot in self.constituent_spots:
  if not spot.is_available():
  raise SpotUnavailableError()
  for spot in self.constituent_spots:
  spot.mark_reserved()
  ```

  2. **Spot Allocation Strategy**: Bus allocation strategy finds N contiguous spots
  ```python
  class BusAllocationStrategy(SpotAllocationStrategy):
  def allocate(self, vehicle: Bus, floor: Floor) -> List[ParkingSpot]:
  required = vehicle.spots_needed  # e.g., 5
  contiguous = self.find_contiguous_large_spots(floor, required)
  return contiguous if len(contiguous) == required else None
  ```

  **Trade-off**: Composite is cleaner OOP but requires adjacent spot management. Strategy is more flexible but spreads bus logic across classes.

</div>

---

## Vehicle Types and Spot Mapping

### Type Hierarchy

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Vehicle Type System</h4>

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px;">
<div style="background: #dbeafe; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #1e40af; font-weight: 700;">Motorcycle</div>
<div style="color: #3730a3; font-size: 12px; margin-top: 4px;">
  Size: Small<br/>
  Can use: S, M, L spots<br/>
  Rate: $1/hr
</div>
</div>
<div style="background: #dcfce7; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #166534; font-weight: 700;">Car</div>
<div style="color: #15803d; font-size: 12px; margin-top: 4px;">
  Size: Medium<br/>
  Can use: M, L spots<br/>
  Rate: $2/hr
</div>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #92400e; font-weight: 700;">Truck</div>
<div style="color: #b45309; font-size: 12px; margin-top: 4px;">
  Size: Large<br/>
  Can use: L spots only<br/>
  Rate: $4/hr
</div>
</div>
<div style="background: #fce7f3; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #9d174d; font-weight: 700;">Bus</div>
<div style="color: #be185d; font-size: 12px; margin-top: 4px;">
  Size: X-Large (5 spots)<br/>
  Can use: 5 contiguous L<br/>
  Rate: $15/hr
</div>
</div>
</div>

<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Edge Case: Flexible Spot Assignment</div>
<div style="color: #7f1d1d; font-size: 14px;">
<strong>Question:</strong> Should a motorcycle be allowed to take a car spot if all motorcycle spots are full?<br/><br/>
<strong>Trade-off:</strong>
<ul style="margin: 8px 0;">
<li><strong>Allow (Revenue-optimized):</strong> Maximize lot utilization, never turn away customers</li>
<li><strong>Disallow (Efficiency-optimized):</strong> Reserve larger spots for larger vehicles that need them</li>
<li><strong>Configurable:</strong> Allow during off-peak, restrict during peak hours</li>
</ul>
</div>
</div>
</div>

### Interview Questions: Vehicle Types (3-Level Deep)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  **L1: How do you determine which spot sizes a vehicle can use?**

  **Answer:** Use the [[Strategy Pattern]](/topic/design-patterns/strategy) with a compatibility matrix:

  ```python
  class SpotCompatibility:
  # Vehicle type -> list of compatible spot sizes (in preference order)
  COMPATIBILITY = {
  VehicleType.MOTORCYCLE: [SpotSize.SMALL, SpotSize.MEDIUM, SpotSize.LARGE],
  VehicleType.CAR: [SpotSize.MEDIUM, SpotSize.LARGE],
  VehicleType.TRUCK: [SpotSize.LARGE],
  VehicleType.BUS: [SpotSize.XLARGE],  # Virtual size for multi-spot
  }

  @classmethod
  def can_fit(cls, vehicle_type: VehicleType, spot_size: SpotSize) -> bool:
  return spot_size in cls.COMPATIBILITY.get(vehicle_type, [])

  @classmethod
  def preferred_size(cls, vehicle_type: VehicleType) -> SpotSize:
  return cls.COMPATIBILITY[vehicle_type][0]
  ```

  **L2: Follow-up: How would you add electric vehicle support with charging spots?**

  **Answer:** Electric vehicles introduce a new dimension orthogonal to size:

  ```python
  class VehicleCapability(Enum):
  STANDARD = "standard"
  ELECTRIC = "electric"
  HANDICAP = "handicap"

  class ParkingSpot:
  def __init__(self, size: SpotSize, capabilities: Set[VehicleCapability]):
  self.size = size
  self.capabilities = capabilities  # {ELECTRIC} for charging spots

  def can_accommodate(self, vehicle: Vehicle) -> bool:
  # Size must fit AND capabilities must match
  size_ok = SpotCompatibility.can_fit(vehicle.type, self.size)

  # Electric vehicles REQUIRE charging spots (or regular if configured)
  if vehicle.needs_charging:
  return size_ok and VehicleCapability.ELECTRIC in self.capabilities

  # Non-electric vehicles can use any spot (don't waste charging spots)
  return size_ok
  ```

  **Design Decision:** Should non-electric vehicles use charging spots?
  - **Never:** Preserves charging spots for EVs (risk: wasted capacity)
  - **Only when lot > 80% full:** Balance utilization and EV accommodation
  - **With higher rate:** Economic incentive to leave charging spots

  **L3: Follow-up: How do you handle a vehicle that arrives as "standard" but the owner later requests charging?**

  **Answer:** This requires spot migration during an active parking session:

  ```python
  class ParkingLot:
  def request_charging(self, ticket_id: str) -> MigrationResult:
  ticket = self.active_tickets[ticket_id]
  current_spot = ticket.spot

  if VehicleCapability.ELECTRIC in current_spot.capabilities:
  return MigrationResult.ALREADY_CHARGING

  # Find available charging spot of same or larger size
  new_spot = self.find_charging_spot(ticket.vehicle)

  if not new_spot:
  # Add to charging waitlist
  self.charging_waitlist.add(ticket_id, priority=ticket.entry_time)
  return MigrationResult.WAITLISTED

  # Atomic migration
  with self.lock:
  current_spot.release()
  new_spot.occupy(ticket.vehicle)
  ticket.spot = new_spot
  ticket.add_event(TicketEvent.SPOT_MIGRATION, new_spot.id)

  return MigrationResult.SUCCESS
  ```

  **Challenges:**
  - Concurrent migration requests
  - Preserving billing continuity (pro-rate charging from migration time)
  - Notifying customer of new spot location
  - Handling migration failures gracefully

</div>

---

## Spot Allocation Strategies

### Strategy Pattern Implementation

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Allocation Algorithms Comparison</h4>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Strategy</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Time Complexity</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Pros</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Cons</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Best For</th>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">First Available</td>
<td style="padding: 12px; color: #475569;">O(n)</td>
<td style="padding: 12px; color: #10b981;">Simple, fast</td>
<td style="padding: 12px; color: #ef4444;">Poor distribution</td>
<td style="padding: 12px; color: #475569;">Small lots</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Nearest to Entrance</td>
<td style="padding: 12px; color: #475569;">O(n log n)</td>
<td style="padding: 12px; color: #10b981;">Customer satisfaction</td>
<td style="padding: 12px; color: #ef4444;">Uneven wear</td>
<td style="padding: 12px; color: #475569;">Shopping malls</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Nearest to Exit</td>
<td style="padding: 12px; color: #475569;">O(n log n)</td>
<td style="padding: 12px; color: #10b981;">Faster egress</td>
<td style="padding: 12px; color: #ef4444;">Longer walk in</td>
<td style="padding: 12px; color: #475569;">Event venues</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Load Balanced (Round Robin)</td>
<td style="padding: 12px; color: #475569;">O(floors)</td>
<td style="padding: 12px; color: #10b981;">Even distribution</td>
<td style="padding: 12px; color: #ef4444;">Not optimal for customer</td>
<td style="padding: 12px; color: #475569;">Multi-floor garages</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Priority Queue (Heap)</td>
<td style="padding: 12px; color: #475569;">O(log n)</td>
<td style="padding: 12px; color: #10b981;">Fast, customizable</td>
<td style="padding: 12px; color: #ef4444;">Memory overhead</td>
<td style="padding: 12px; color: #475569;">High-traffic lots</td>
</tr>
</table>
</div>
</div>

### Implementation with Strategy Pattern

```python
from abc import ABC, abstractmethod
from typing import Optional, List
from dataclasses import dataclass
import heapq

@dataclass
class SpotDistance:
    spot: 'ParkingSpot'
    distance: float

    def __lt__(self, other):
        return self.distance < other.distance


class SpotAllocationStrategy(ABC):
    """
    Abstract strategy for spot allocation.

    Implementations determine how spots are selected based on
    different optimization criteria.
    """

    @abstractmethod
    def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
        """Find and return an available spot for the vehicle, or None if full."""
        pass

    def get_compatible_spots(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> List['ParkingSpot']:
        """Get all spots that could accommodate this vehicle."""
        compatible = []
        for floor in floors:
            for spot in floor.spots:
                if spot.is_available() and spot.can_fit(vehicle):
                    compatible.append(spot)
        return compatible


class FirstAvailableStrategy(SpotAllocationStrategy):
    """
    Assigns the first available compatible spot found.

    Time: O(n) where n = total spots
    Space: O(1)

    Best for: Simple implementations, small lots
    """

    def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
        for floor in floors:
            for spot in floor.spots:
                if spot.is_available() and spot.can_fit(vehicle):
                    return spot
        return None


class NearestToEntranceStrategy(SpotAllocationStrategy):
    """
    Assigns the closest spot to the entry point.

    Requires spots to have distance-from-entrance metadata.
    Uses min-heap for efficient minimum finding.

    Time: O(n log n) for initial heap, O(log n) for subsequent allocations
    Space: O(n) for heap

    Best for: Customer-focused lots (malls, hospitals)
    """

    def __init__(self, entrance_location: tuple):
        self.entrance = entrance_location
        self._available_heap: List[SpotDistance] = []
        self._heap_initialized = False

    def _calculate_distance(self, spot: 'ParkingSpot') -> float:
        # Manhattan distance for simplicity; Euclidean for accuracy
        return abs(spot.location[0] - self.entrance[0]) + \
               abs(spot.location[1] - self.entrance[1])

    def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
        compatible = self.get_compatible_spots(vehicle, floors)

        if not compatible:
            return None

        # Find spot with minimum distance
        return min(compatible, key=self._calculate_distance)


class OptimalFitStrategy(SpotAllocationStrategy):
    """
    Assigns the smallest compatible spot to maximize capacity utilization.

    Prevents motorcycles from taking truck spots when motorcycle spots exist.

    Time: O(n) single pass with size tracking
    Space: O(1)

    Best for: High-utilization scenarios
    """

    def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
        best_spot = None
        best_size_value = float('inf')

        preferred_size = vehicle.get_required_spot_size()

        for floor in floors:
            for spot in floor.spots:
                if not spot.is_available() or not spot.can_fit(vehicle):
                    continue

                # Prefer exact size match, then smallest larger size
                if spot.size == preferred_size:
                    return spot  # Perfect match, return immediately

                if spot.size.value < best_size_value:
                    best_size_value = spot.size.value
                    best_spot = spot

        return best_spot


class LoadBalancedStrategy(SpotAllocationStrategy):
    """
    Distributes vehicles evenly across floors.

    Tracks occupancy per floor and assigns to least occupied.
    Uses round-robin among equally occupied floors.

    Time: O(floors + spots_per_floor)
    Space: O(floors) for occupancy tracking

    Best for: Even wear distribution, multi-floor garages
    """

    def __init__(self):
        self._floor_index = 0  # For round-robin tiebreaking

    def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
        # Calculate occupancy rates
        floor_occupancy = []
        for i, floor in enumerate(floors):
            available = [s for s in floor.spots if s.is_available() and s.can_fit(vehicle)]
            if available:
                rate = floor.get_occupancy_rate()
                floor_occupancy.append((rate, i, available))

        if not floor_occupancy:
            return None

        # Sort by occupancy (lowest first), then by index for round-robin
        floor_occupancy.sort(key=lambda x: (x[0], (x[1] - self._floor_index) % len(floors)))

        # Get spot from least occupied floor
        _, floor_idx, available_spots = floor_occupancy[0]
        self._floor_index = (floor_idx + 1) % len(floors)

        return available_spots[0]
```

### Interview Questions: Spot Allocation (3-Level Deep)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  **L1: Why use the Strategy pattern for spot allocation instead of a simple switch statement?**

  **Answer:** Strategy pattern provides:

  1. **Open/Closed Principle**: Add new strategies without modifying existing code
  2. **Runtime flexibility**: Change allocation strategy based on time of day, occupancy level
  3. **Testing**: Each strategy can be unit tested independently
  4. **Single Responsibility**: Allocation logic separated from ParkingLot class

  ```python
  # Without Strategy (problematic)
  class ParkingLot:
  def find_spot(self, vehicle, strategy_type):
  if strategy_type == "first":
  # 20 lines of first-available logic
  elif strategy_type == "nearest":
  # 30 lines of nearest logic
  elif strategy_type == "balanced":
  # 25 lines of balancing logic
  # Every new strategy requires modifying this class

  # With Strategy (preferred)
  class ParkingLot:
  def __init__(self, allocation_strategy: SpotAllocationStrategy):
  self.strategy = allocation_strategy

  def find_spot(self, vehicle):
  return self.strategy.find_spot(vehicle, self.floors)
  ```

  **L2: Follow-up: How would you implement dynamic strategy switching based on lot occupancy?**

  **Answer:** Use a [[Decorator]](/topic/design-patterns/decorator) or [[Chain of Responsibility]](/topic/design-patterns/chain-of-responsibility):

  ```python
  class AdaptiveAllocationStrategy(SpotAllocationStrategy):
  """
  Switches strategy based on current lot conditions.

  - Low occupancy (<50%): Nearest to entrance (customer convenience)
  - Medium occupancy (50-85%): Optimal fit (maximize capacity)
  - High occupancy (>85%): Any available (speed over optimization)
  """

  def __init__(self, parking_lot: 'ParkingLot'):
  self.lot = parking_lot
  self.strategies = {
  'low': NearestToEntranceStrategy(parking_lot.main_entrance),
  'medium': OptimalFitStrategy(),
  'high': FirstAvailableStrategy()
  }

  def find_spot(self, vehicle: 'Vehicle', floors: List['ParkingFloor']) -> Optional['ParkingSpot']:
  occupancy = self.lot.get_occupancy_rate()

  if occupancy < 0.5:
  strategy = self.strategies['low']
  elif occupancy < 0.85:
  strategy = self.strategies['medium']
  else:
  strategy = self.strategies['high']

  return strategy.find_spot(vehicle, floors)
  ```

  **L3: Follow-up: Two vehicles arrive simultaneously for the last spot. How do you prevent race conditions?**

  **Answer:** This is a classic [[Concurrency]](/topic/system-design/concurrency-patterns) problem. Solutions:

  **Option 1: Optimistic Locking with Atomic Compare-And-Swap**
  ```python
  class ParkingSpot:
  def __init__(self):
  self._vehicle = None
  self._version = 0

  def try_park(self, vehicle: Vehicle, expected_version: int) -> bool:
  """
  Atomically park if spot is still in expected state.
  Returns False if spot changed since we checked availability.
  """
  with self._lock:
  if self._version != expected_version or self._vehicle is not None:
  return False
  self._vehicle = vehicle
  self._version += 1
  return True

  class ParkingLot:
  def park_vehicle(self, vehicle: Vehicle) -> Optional[Ticket]:
  max_retries = 3
  for attempt in range(max_retries):
  spot, version = self.strategy.find_spot_with_version(vehicle, self.floors)
  if spot is None:
  return None  # No spots available

  if spot.try_park(vehicle, version):
  return self._create_ticket(vehicle, spot)

  # Spot was taken, retry with fresh search
  continue

  return None  # Failed after retries
  ```

  **Option 2: Pessimistic Locking with Reservation**
  ```python
  class ParkingSpot:
  def __init__(self):
  self._vehicle = None
  self._reserved_until = None
  self._lock = threading.Lock()

  def reserve(self, duration_seconds: float = 30) -> bool:
  """Reserve spot temporarily while processing entry."""
  with self._lock:
  now = time.time()
  if self._vehicle is not None:
  return False
  if self._reserved_until and self._reserved_until > now:
  return False
  self._reserved_until = now + duration_seconds
  return True

  def confirm_reservation(self, vehicle: Vehicle) -> bool:
  """Convert reservation to actual parking."""
  with self._lock:
  if self._reserved_until is None:
  return False
  self._vehicle = vehicle
  self._reserved_until = None
  return True
  ```

  **Trade-offs:**
  - Optimistic: Better throughput when contention is low, retries under high contention
  - Pessimistic: Guaranteed spot after reservation, but holds resources during payment processing

</div>

---

## Payment System Design

### Pricing Models

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Common Pricing Strategies</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Flat Hourly Rate</div>
<div style="color: #475569; font-size: 14px;">
  Simple: $2/hour for cars<br/>
  Pros: Easy to understand<br/>
  Cons: No incentive for short stays
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Tiered Pricing</div>
<div style="color: #475569; font-size: 14px;">
  First hour: $5, additional: $2/hr<br/>
  Pros: Revenue from short stays<br/>
  Cons: Complex calculation
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Daily Maximum</div>
<div style="color: #475569; font-size: 14px;">
  $2/hr, max $20/day<br/>
  Pros: Predictable for all-day parkers<br/>
  Cons: Revenue cap
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Dynamic/Surge Pricing</div>
<div style="color: #475569; font-size: 14px;">
  Price varies with occupancy<br/>
  Pros: Maximizes revenue<br/>
  Cons: Customer frustration
</div>
</div>
</div>
</div>

### Payment Processor Implementation

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime, timedelta
from decimal import Decimal, ROUND_HALF_UP
from enum import Enum
from typing import Optional, List
import math


class PricingStrategy(ABC):
    """
    Abstract pricing strategy.

    Implementations calculate fees based on different business models.
    Uses Decimal for financial precision.
    """

    @abstractmethod
    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        """Calculate the total fee for a parking session."""
        pass

    def _get_duration_hours(self, ticket: 'Ticket') -> Decimal:
        """Get parking duration in hours, rounded up to billing increment."""
        exit_time = ticket.exit_time or datetime.now()
        duration = exit_time - ticket.entry_time
        hours = Decimal(str(duration.total_seconds())) / Decimal('3600')
        return hours


class FlatHourlyPricing(PricingStrategy):
    """
    Simple per-hour pricing with vehicle-type rates.

    Rounds up to the nearest hour (minimum 1 hour).
    """

    RATES = {
        VehicleType.MOTORCYCLE: Decimal('1.00'),
        VehicleType.CAR: Decimal('2.00'),
        VehicleType.TRUCK: Decimal('4.00'),
        VehicleType.BUS: Decimal('15.00'),
    }

    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        hours = self._get_duration_hours(ticket)
        billable_hours = max(Decimal('1'), hours.to_integral_value(rounding=ROUND_HALF_UP))

        rate = self.RATES.get(ticket.vehicle.vehicle_type, Decimal('2.00'))
        return (billable_hours * rate).quantize(Decimal('0.01'))


class TieredPricing(PricingStrategy):
    """
    Different rates for different time brackets.

    Example: First hour $5, hours 2-4 at $3, hours 5+ at $2
    """

    def __init__(self, tiers: List[tuple]):
        """
        Args:
            tiers: List of (hours_up_to, rate_per_hour) tuples
                   Example: [(1, 5.00), (4, 3.00), (float('inf'), 2.00)]
        """
        self.tiers = [(Decimal(str(h)), Decimal(str(r))) for h, r in tiers]

    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        hours = self._get_duration_hours(ticket)
        hours = max(Decimal('1'), math.ceil(hours))

        total_fee = Decimal('0.00')
        hours_billed = Decimal('0')

        for tier_hours, rate in self.tiers:
            if hours_billed >= hours:
                break

            hours_in_tier = min(hours - hours_billed, tier_hours - hours_billed)
            if hours_in_tier > 0:
                total_fee += hours_in_tier * rate
                hours_billed += hours_in_tier

        # Apply vehicle type multiplier
        multiplier = self._get_vehicle_multiplier(ticket.vehicle.vehicle_type)
        return (total_fee * multiplier).quantize(Decimal('0.01'))

    def _get_vehicle_multiplier(self, vehicle_type: VehicleType) -> Decimal:
        multipliers = {
            VehicleType.MOTORCYCLE: Decimal('0.5'),
            VehicleType.CAR: Decimal('1.0'),
            VehicleType.TRUCK: Decimal('2.0'),
            VehicleType.BUS: Decimal('3.0'),
        }
        return multipliers.get(vehicle_type, Decimal('1.0'))


class DailyMaxPricing(PricingStrategy):
    """
    Hourly rate with a daily cap.

    Useful for airport long-term parking.
    """

    def __init__(self, hourly_rate: Decimal, daily_max: Decimal):
        self.hourly_rate = hourly_rate
        self.daily_max = daily_max

    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        hours = self._get_duration_hours(ticket)
        hours = max(Decimal('1'), hours.to_integral_value(rounding=ROUND_HALF_UP))

        # Calculate full days and remaining hours
        days = hours // Decimal('24')
        remaining_hours = hours % Decimal('24')

        daily_charge = days * self.daily_max
        hourly_charge = min(remaining_hours * self.hourly_rate, self.daily_max)

        return (daily_charge + hourly_charge).quantize(Decimal('0.01'))


class DynamicPricing(PricingStrategy):
    """
    Surge pricing based on lot occupancy.

    Higher prices when lot is nearly full to incentivize turnover.
    """

    def __init__(self, base_rate: Decimal, parking_lot: 'ParkingLot'):
        self.base_rate = base_rate
        self.parking_lot = parking_lot

        # Multipliers for different occupancy levels
        self.surge_tiers = [
            (0.5, Decimal('0.8')),   # <50%: 20% discount
            (0.75, Decimal('1.0')),  # 50-75%: base rate
            (0.9, Decimal('1.5')),   # 75-90%: 50% surge
            (1.0, Decimal('2.0')),   # >90%: 100% surge
        ]

    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        hours = self._get_duration_hours(ticket)
        hours = max(Decimal('1'), hours.to_integral_value(rounding=ROUND_HALF_UP))

        # Get occupancy at entry and exit, average them
        # In practice, you'd track occupancy over time
        avg_multiplier = self._get_surge_multiplier(ticket.avg_occupancy_during_stay)

        return (hours * self.base_rate * avg_multiplier).quantize(Decimal('0.01'))

    def _get_surge_multiplier(self, occupancy: float) -> Decimal:
        for threshold, multiplier in self.surge_tiers:
            if occupancy <= threshold:
                return multiplier
        return Decimal('2.0')


@dataclass
class PaymentResult:
    success: bool
    transaction_id: Optional[str]
    amount: Decimal
    error_message: Optional[str] = None


class PaymentProcessor:
    """
    Handles payment processing with multiple payment methods.

    Integrates with pricing strategy and external payment gateways.
    """

    def __init__(self, pricing_strategy: PricingStrategy):
        self.pricing_strategy = pricing_strategy
        self.payment_gateways = {}

    def register_gateway(self, name: str, gateway: 'PaymentGateway'):
        self.payment_gateways[name] = gateway

    def calculate_fee(self, ticket: 'Ticket') -> Decimal:
        """Calculate fee without processing payment."""
        return self.pricing_strategy.calculate_fee(ticket)

    def process_payment(self, ticket: 'Ticket', payment_method: str,
                       payment_details: dict) -> PaymentResult:
        """
        Process payment for a parking ticket.

        Args:
            ticket: The parking ticket
            payment_method: 'credit_card', 'cash', 'mobile'
            payment_details: Method-specific details (card number, etc.)

        Returns:
            PaymentResult with success status and transaction ID
        """
        amount = self.calculate_fee(ticket)

        if payment_method == 'cash':
            return self._process_cash(amount, payment_details)

        gateway = self.payment_gateways.get(payment_method)
        if not gateway:
            return PaymentResult(
                success=False,
                transaction_id=None,
                amount=amount,
                error_message=f"Unknown payment method: {payment_method}"
            )

        try:
            transaction_id = gateway.charge(amount, payment_details)
            return PaymentResult(
                success=True,
                transaction_id=transaction_id,
                amount=amount
            )
        except PaymentError as e:
            return PaymentResult(
                success=False,
                transaction_id=None,
                amount=amount,
                error_message=str(e)
            )

    def _process_cash(self, amount: Decimal, details: dict) -> PaymentResult:
        """Handle cash payment with change calculation."""
        cash_received = Decimal(str(details.get('cash_received', 0)))

        if cash_received < amount:
            return PaymentResult(
                success=False,
                transaction_id=None,
                amount=amount,
                error_message=f"Insufficient cash. Required: ${amount}, Received: ${cash_received}"
            )

        change = cash_received - amount
        return PaymentResult(
            success=True,
            transaction_id=f"CASH-{datetime.now().timestamp()}",
            amount=amount
        )
```

### Interview Questions: Payment System (3-Level Deep)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  **L1: Why use Decimal instead of float for monetary calculations?**

  **Answer:** Floating-point arithmetic introduces precision errors that compound over time:

  ```python
  # Float problem
  >>> 0.1 + 0.2
  0.30000000000000004

  >>> 0.1 + 0.1 + 0.1 - 0.3
  5.551115123125783e-17  # Should be 0!

  # In a parking lot context:
  >>> hourly_rate = 2.50
  >>> hours = 2.4
  >>> hourly_rate * hours
  5.999999999999999  # Customer charged $5.99 instead of $6.00

  # Decimal solution
  >>> from decimal import Decimal
  >>> Decimal('2.50') * Decimal('2.4')
  Decimal('6.000')
  ```

  Financial systems **must** use fixed-point arithmetic (Decimal in Python, BigDecimal in Java) to ensure:
  - Exact representation of currency values
  - Predictable rounding behavior
  - Audit compliance

  **L2: Follow-up: Payment fails at the exit gate. How do you handle this without blocking the exit?**

  **Answer:** Implement a **deferred payment** system:

  ```python
  class ExitGate:
  def process_exit(self, ticket: Ticket, payment_method: str,
  payment_details: dict) -> ExitResult:
  fee = self.payment_processor.calculate_fee(ticket)

  # Attempt payment with timeout
  try:
  result = self.payment_processor.process_payment(
  ticket, payment_method, payment_details
  )
  except TimeoutError:
  result = PaymentResult(success=False, amount=fee,
  error_message="Payment timeout")

  if result.success:
  self._release_barrier()
  return ExitResult.SUCCESS

  # Payment failed - options:

  # Option 1: Deferred billing (for registered users)
  if ticket.vehicle.owner and ticket.vehicle.owner.has_payment_on_file:
  self._create_deferred_charge(ticket, fee)
  self._release_barrier()
  return ExitResult.DEFERRED

  # Option 2: Issue IOU ticket
  iou = self._create_iou_ticket(ticket, fee)
  self._send_to_attendant(iou)
  self._release_barrier()  # Don't trap customer
  return ExitResult.IOU_ISSUED

  # Option 3: Require attendant intervention
  # self._alert_attendant(ticket)
  # return ExitResult.ATTENDANT_REQUIRED


  class DeferredPaymentService:
  """Handles payments that couldn't be processed at exit."""

  def __init__(self, max_retry_days: int = 7):
  self.max_retry_days = max_retry_days

  def process_deferred_charges(self):
  """Batch process deferred charges (run daily)."""
  pending = self.get_pending_charges()

  for charge in pending:
  if charge.age_days > self.max_retry_days:
  self._send_to_collections(charge)
  continue

  result = self._attempt_charge(charge)
  if result.success:
  self._mark_paid(charge)
  else:
  self._increment_retry_count(charge)
  ```

  **L3: Follow-up: How do you handle refunds when the pricing strategy changes mid-session?**

  **Answer:** This requires **price locking** and **audit trail**:

  ```python
  class Ticket:
  def __init__(self, vehicle: Vehicle, spot: ParkingSpot,
  pricing_snapshot: PricingSnapshot):
  self.ticket_id = str(uuid.uuid4())
  self.vehicle = vehicle
  self.spot = spot
  self.entry_time = datetime.now()

  # Lock in pricing at entry time
  self.pricing_snapshot = pricing_snapshot

  # Audit trail for any modifications
  self.events: List[TicketEvent] = []
  self.refunds: List[Refund] = []

  def get_fee_at_time(self, timestamp: datetime) -> Decimal:
  """Calculate what the fee would be at a specific exit time."""
  return self.pricing_snapshot.calculate_fee(self, exit_time=timestamp)


  class PricingSnapshot:
  """
  Immutable capture of pricing rules at a point in time.

  Ensures customers are charged based on rates when they entered,
  not when they exit (or allows explicit policy choice).
  """

  def __init__(self, strategy: PricingStrategy, timestamp: datetime):
  self.strategy = strategy
  self.captured_at = timestamp
  self.rates = self._capture_rates(strategy)

  def _capture_rates(self, strategy: PricingStrategy) -> dict:
  # Deep copy all rate information
  return {
  'base_rates': copy.deepcopy(strategy.RATES) if hasattr(strategy, 'RATES') else {},
  'tiers': copy.deepcopy(strategy.tiers) if hasattr(strategy, 'tiers') else [],
  'multipliers': copy.deepcopy(strategy._get_vehicle_multiplier.__self__.__dict__)
  if hasattr(strategy, '_get_vehicle_multiplier') else {}
  }


  class RefundProcessor:
  """Handle refunds with audit trail."""

  def process_refund(self, ticket: Ticket, reason: RefundReason,
  amount: Optional[Decimal] = None) -> RefundResult:
  original_fee = ticket.paid_amount

  if amount is None:
  # Full refund
  refund_amount = original_fee
  else:
  # Partial refund (e.g., overcharge correction)
  refund_amount = min(amount, original_fee)

  # Create refund record
  refund = Refund(
  ticket_id=ticket.ticket_id,
  original_amount=original_fee,
  refund_amount=refund_amount,
  reason=reason,
  timestamp=datetime.now(),
  authorized_by=self.current_user
  )

  # Process via original payment method
  result = self.payment_gateway.refund(
  ticket.transaction_id,
  refund_amount
  )

  if result.success:
  ticket.refunds.append(refund)
  ticket.events.append(TicketEvent(
  type=EventType.REFUND,
  amount=refund_amount,
  reason=reason
  ))

  return result
  ```

  **Key considerations:**
  - **Price at entry vs exit**: Policy decision - most lots honor entry-time pricing
  - **Audit requirements**: All price modifications need full audit trail
  - **Refund authorization**: May require manager approval above threshold
  - **Partial refunds**: For pricing errors, don't refund entire amount

</div>

---

## Concurrency Handling

### Race Conditions and Solutions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Concurrency Challenges in Parking Systems</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px;">
<div style="color: #991b1b; font-weight: 600;">Race Condition: Double Booking</div>
<div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
  Two vehicles check same spot availability simultaneously, both see "available", both attempt to park.
<div style="margin-top: 8px; font-family: monospace; font-size: 12px; background: #fee2e2; padding: 8px; border-radius: 4px;">
  Thread A: check spot #42 -> available<br/>
  Thread B: check spot #42 -> available<br/>
  Thread A: park in spot #42 -> success<br/>
  Thread B: park in spot #42 -> overwrites A!
</div>
</div>
</div>
<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px;">
<div style="color: #991b1b; font-weight: 600;">Race Condition: Counter Inconsistency</div>
<div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
  Availability counter shows 5 spots, but 6 vehicles enter before counter updates.
<div style="margin-top: 8px; font-family: monospace; font-size: 12px; background: #fee2e2; padding: 8px; border-radius: 4px;">
  Counter: 5 available<br/>
  Thread A: reads 5, decrements to 4<br/>
  Thread B: reads 5 (stale!), decrements to 4<br/>
  Actual: 2 vehicles parked, counter shows 4
</div>
</div>
</div>
<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px;">
<div style="color: #991b1b; font-weight: 600;">Deadlock: Multi-Spot Allocation</div>
<div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
  Bus needs spots 1-5, truck needs spots 5-6. Bus locks 1-4, truck locks 6. Both wait for spot 5.
</div>
</div>
</div>
</div>

### Thread-Safe Implementation

```python
import threading
from typing import Optional, Dict, Set
from contextlib import contextmanager
from dataclasses import dataclass, field
from collections import defaultdict
import time


class ThreadSafeParkingSpot:
    """
    Thread-safe parking spot with optimistic locking.

    Uses version numbers to detect concurrent modifications.
    """

    def __init__(self, spot_id: str, size: SpotSize):
        self.spot_id = spot_id
        self.size = size
        self._vehicle: Optional[Vehicle] = None
        self._version: int = 0
        self._lock = threading.Lock()

    @property
    def is_available(self) -> bool:
        return self._vehicle is None

    def get_state(self) -> tuple:
        """Get current state for optimistic locking."""
        with self._lock:
            return (self.is_available, self._version)

    def try_park(self, vehicle: Vehicle, expected_version: int) -> bool:
        """
        Atomically park vehicle if spot is in expected state.

        Returns True on success, False if state changed.
        """
        with self._lock:
            if self._version != expected_version:
                return False  # State changed, retry
            if self._vehicle is not None:
                return False  # Already occupied

            self._vehicle = vehicle
            self._version += 1
            return True

    def try_unpark(self, expected_vehicle: Vehicle) -> bool:
        """Atomically remove vehicle, verifying it's the expected one."""
        with self._lock:
            if self._vehicle != expected_vehicle:
                return False

            self._vehicle = None
            self._version += 1
            return True


class LockManager:
    """
    Manages distributed locks for multi-spot operations.

    Implements deadlock prevention through lock ordering.
    """

    def __init__(self):
        self._locks: Dict[str, threading.Lock] = defaultdict(threading.Lock)
        self._lock_order: Dict[str, int] = {}
        self._order_counter = 0
        self._meta_lock = threading.Lock()

    def _get_lock_order(self, spot_id: str) -> int:
        """Get or assign ordering number for deadlock prevention."""
        with self._meta_lock:
            if spot_id not in self._lock_order:
                self._lock_order[spot_id] = self._order_counter
                self._order_counter += 1
            return self._lock_order[spot_id]

    @contextmanager
    def acquire_multiple(self, spot_ids: Set[str], timeout: float = 5.0):
        """
        Acquire locks on multiple spots in consistent order.

        Prevents deadlocks by always acquiring in ascending order.
        """
        # Sort by lock order to prevent deadlock
        ordered_ids = sorted(spot_ids, key=self._get_lock_order)
        acquired = []

        try:
            for spot_id in ordered_ids:
                lock = self._locks[spot_id]
                if not lock.acquire(timeout=timeout):
                    raise TimeoutError(f"Failed to acquire lock on {spot_id}")
                acquired.append(spot_id)

            yield

        finally:
            # Release in reverse order
            for spot_id in reversed(acquired):
                self._locks[spot_id].release()


class ThreadSafeParkingLot:
    """
    Thread-safe parking lot with concurrent entry/exit handling.

    Supports multiple entry gates operating simultaneously.
    """

    def __init__(self, name: str, allocation_strategy: SpotAllocationStrategy):
        self.name = name
        self.strategy = allocation_strategy
        self.floors: List[ParkingFloor] = []

        self._active_tickets: Dict[str, Ticket] = {}
        self._tickets_lock = threading.RLock()  # Reentrant for nested calls

        self._availability_cache = AvailabilityCache()
        self._lock_manager = LockManager()

    def park_vehicle(self, vehicle: Vehicle, entry_gate_id: str) -> Optional[Ticket]:
        """
        Thread-safe vehicle parking with retry logic.

        Uses optimistic locking - may retry if spot is taken.
        """
        max_retries = 3

        for attempt in range(max_retries):
            # Find a candidate spot
            spot, version = self._find_available_spot(vehicle)

            if spot is None:
                return None  # Lot is full

            # Attempt to claim the spot
            if spot.try_park(vehicle, version):
                # Success - create ticket
                with self._tickets_lock:
                    if vehicle.license_plate in self._active_tickets:
                        # Vehicle already parked (race condition)
                        spot.try_unpark(vehicle)
                        return self._active_tickets[vehicle.license_plate]

                    ticket = Ticket(vehicle, spot)
                    ticket.entry_gate = entry_gate_id
                    self._active_tickets[vehicle.license_plate] = ticket

                    # Update availability cache
                    self._availability_cache.decrement(spot.size, spot.floor_number)

                    return ticket

            # Spot was taken by another thread, retry
            time.sleep(0.01 * (attempt + 1))  # Exponential backoff

        return None  # Failed after retries

    def _find_available_spot(self, vehicle: Vehicle) -> tuple:
        """Find spot with its version for optimistic locking."""
        spot = self.strategy.find_spot(vehicle, self.floors)
        if spot is None:
            return None, None

        _, version = spot.get_state()
        return spot, version

    def unpark_vehicle(self, license_plate: str, exit_gate_id: str) -> Optional[Ticket]:
        """Thread-safe vehicle exit."""
        with self._tickets_lock:
            ticket = self._active_tickets.get(license_plate)
            if not ticket:
                return None

            # Remove from active tickets first
            del self._active_tickets[license_plate]

        # Release the spot
        spot = ticket.spot
        if spot.try_unpark(ticket.vehicle):
            ticket.exit_time = datetime.now()
            ticket.exit_gate = exit_gate_id

            # Update availability cache
            self._availability_cache.increment(spot.size, spot.floor_number)

            return ticket

        # Unexpected: spot doesn't have our vehicle
        # This shouldn't happen with proper locking
        raise InconsistentStateError(
            f"Spot {spot.spot_id} doesn't contain expected vehicle"
        )

    def park_multi_spot_vehicle(self, vehicle: 'Bus', entry_gate_id: str) -> Optional[Ticket]:
        """
        Park a vehicle requiring multiple contiguous spots.

        Uses pessimistic locking to prevent partial allocations.
        """
        required_spots = vehicle.required_spot_count

        # Find contiguous available spots
        candidate_spots = self._find_contiguous_spots(vehicle, required_spots)

        if not candidate_spots or len(candidate_spots) < required_spots:
            return None

        spot_ids = {s.spot_id for s in candidate_spots}

        try:
            with self._lock_manager.acquire_multiple(spot_ids, timeout=5.0):
                # Verify all spots still available
                for spot in candidate_spots:
                    if not spot.is_available:
                        return None  # One spot was taken

                # All spots available, claim them
                for spot in candidate_spots:
                    spot._vehicle = vehicle
                    spot._version += 1

                # Create ticket with multiple spots
                with self._tickets_lock:
                    ticket = MultiSpotTicket(vehicle, candidate_spots)
                    ticket.entry_gate = entry_gate_id
                    self._active_tickets[vehicle.license_plate] = ticket

                    return ticket

        except TimeoutError:
            # Could not acquire all locks
            return None


class AvailabilityCache:
    """
    Thread-safe cache for quick availability queries.

    Updated incrementally on park/unpark instead of
    scanning all spots.
    """

    def __init__(self):
        self._counts: Dict[tuple, int] = defaultdict(int)
        self._lock = threading.Lock()

    def initialize(self, floors: List['ParkingFloor']):
        """Initialize cache from current spot state."""
        with self._lock:
            self._counts.clear()
            for floor in floors:
                for spot in floor.spots:
                    if spot.is_available:
                        self._counts[(spot.size, floor.floor_number)] += 1

    def decrement(self, size: SpotSize, floor: int):
        """Decrement available count when spot is taken."""
        with self._lock:
            self._counts[(size, floor)] = max(0, self._counts[(size, floor)] - 1)

    def increment(self, size: SpotSize, floor: int):
        """Increment available count when spot is freed."""
        with self._lock:
            self._counts[(size, floor)] += 1

    def get_availability(self) -> Dict[SpotSize, int]:
        """Get total availability by size."""
        with self._lock:
            totals = defaultdict(int)
            for (size, _), count in self._counts.items():
                totals[size] += count
            return dict(totals)

    def get_floor_availability(self, floor: int) -> Dict[SpotSize, int]:
        """Get availability for specific floor."""
        with self._lock:
            return {
                size: self._counts.get((size, floor), 0)
                for size in SpotSize
            }
```

### Interview Questions: Concurrency (3-Level Deep)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  **L1: What concurrency issues can occur in a parking lot system?**

  **Answer:** Three main categories:

  1. **Race Conditions**:
  - Two vehicles assigned same spot (check-then-act not atomic)
  - Display shows available spots while they're being filled
  - Payment processed twice for same ticket

  2. **Deadlocks**:
  - Bus needs spots 1-5, truck needs spots 5-6
  - Gate A locks vehicle entry, Gate B locks payment, each waits for other

  3. **Starvation**:
  - Large vehicles never get spots because small vehicles always grab first
  - One entry gate monopolizes spot allocation

  **L2: Follow-up: How does optimistic locking work, and when would you prefer pessimistic locking?**

  **Answer:**

  **Optimistic Locking** (check-then-act with versioning):
  ```python
  # Read state with version
  spot, version = get_spot_state(spot_id)  # version = 5

  # Do work assuming no one else modifies
  # ...

  # Attempt to commit, specifying expected version
  success = try_park(spot_id, vehicle, expected_version=5)
  # Fails if version changed (someone else modified)
  ```

  **Pessimistic Locking** (lock-then-act):
  ```python
  # Acquire exclusive lock first
  with lock(spot_id):
  # No one else can modify while we hold lock
  if spot.is_available():
  spot.park(vehicle)
  ```

  **When to use each:**

  | Optimistic | Pessimistic |
  |------------|-------------|
  | Low contention | High contention |
  | Short hold times | Long operations |
  | Read-heavy workloads | Write-heavy workloads |
  | Single resource | Multiple related resources |
  | Retry is cheap | Retry is expensive |

  For parking lots:
  - **Single spot**: Optimistic (low contention, fast retry)
  - **Multi-spot (bus)**: Pessimistic (must atomically reserve all spots)

  **L3: Follow-up: Design a distributed parking lot system where spots are managed by different servers. How do you maintain consistency?**

  **Answer:** This becomes a [[Distributed Systems]](/topic/system-design/consensus-algorithms) problem. Options:

  **Option 1: Centralized Lock Service (Redis/Zookeeper)**
  ```python
  class DistributedParkingLot:
  def __init__(self, redis_client):
  self.redis = redis_client

  def park_vehicle(self, vehicle: Vehicle) -> Optional[Ticket]:
  # Find candidate spot from any server
  spot_id = self.find_available_spot(vehicle)

  # Acquire distributed lock
  lock_key = f"spot_lock:{spot_id}"
  lock_acquired = self.redis.set(
  lock_key,
  "locked",
  nx=True,  # Only if not exists
  ex=30     # 30 second expiry (lease)
  )

  if not lock_acquired:
  return None  # Spot being claimed by another server

  try:
  # Verify and claim spot
  spot_data = self.redis.hgetall(f"spot:{spot_id}")
  if spot_data.get('vehicle'):
  return None  # Already occupied

  # Atomic update
  self.redis.hset(f"spot:{spot_id}", mapping={
  'vehicle': vehicle.license_plate,
  'entry_time': datetime.now().isoformat()
  })

  return self.create_ticket(vehicle, spot_id)
  finally:
  self.redis.delete(lock_key)
  ```

  **Option 2: Partitioned Ownership**
  ```python
  # Each server owns a floor/section
  # Cross-section operations use 2-phase commit

  class PartitionedParkingLot:
  def __init__(self, partition_id: str, coordinator: 'CoordinatorService'):
  self.partition_id = partition_id
  self.coordinator = coordinator
  self.local_spots = {}  # Spots this server owns

  def park_vehicle(self, vehicle: Vehicle) -> Optional[Ticket]:
  # Try local spots first (fast path)
  local_spot = self.find_local_spot(vehicle)
  if local_spot:
  return self.park_local(vehicle, local_spot)

  # No local spots, ask coordinator for cross-partition allocation
  return self.coordinator.allocate_cross_partition(
  vehicle,
  exclude_partition=self.partition_id
  )
  ```

  **Option 3: Eventual Consistency with Conflict Resolution**
  ```python
  # Accept potential double-booking, resolve at exit
  # Good for very high throughput, lower consistency needs

  class EventuallyConsistentParkingLot:
  def park_vehicle(self, vehicle: Vehicle) -> Ticket:
  spot = self.find_available_spot(vehicle)

  # Optimistic allocation - no distributed lock
  ticket = Ticket(vehicle, spot)

  # Publish event for eventual consistency
  self.event_bus.publish(ParkingEvent(
  type='VEHICLE_PARKED',
  spot_id=spot.spot_id,
  vehicle=vehicle.license_plate,
  timestamp=datetime.now(),
  server_id=self.server_id
  ))

  return ticket

  def handle_conflict(self, spot_id: str, events: List[ParkingEvent]):
  """Called when two servers parked in same spot."""
  # Resolution: first timestamp wins
  events.sort(key=lambda e: e.timestamp)
  winner = events[0]
  loser = events[1]

  # Loser's ticket is invalidated, vehicle reassigned
  self.reassign_vehicle(loser.vehicle, loser.ticket_id)
  self.notify_customer(loser, "Your spot was reassigned")
  ```

  **Trade-offs:**
  - Centralized lock: Strong consistency, single point of failure
  - Partitioned: Good balance, complex cross-partition ops
  - Eventual: High throughput, requires conflict resolution

</div>

---

## Complete Implementation

```python
"""
Production-ready Parking Lot System

Features:
- Thread-safe operations with optimistic locking
- Multiple vehicle types with flexible spot compatibility
- Configurable pricing strategies
- Event-driven architecture for extensibility
- Comprehensive audit trail
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal, ROUND_HALF_UP
from enum import Enum, auto
from typing import Optional, List, Dict, Set, Callable
from contextlib import contextmanager
import threading
import uuid
import time
import copy


# ============== Enums ==============

class VehicleType(Enum):
    MOTORCYCLE = auto()
    CAR = auto()
    TRUCK = auto()
    BUS = auto()
    ELECTRIC_CAR = auto()


class SpotSize(Enum):
    SMALL = 1       # Motorcycles
    MEDIUM = 2      # Cars
    LARGE = 3       # Trucks
    XLARGE = 4      # Buses (virtual, spans multiple LARGE)


class SpotCapability(Enum):
    STANDARD = auto()
    ELECTRIC_CHARGING = auto()
    HANDICAP = auto()
    RESERVED = auto()


class TicketStatus(Enum):
    ACTIVE = auto()
    PAYMENT_PENDING = auto()
    PAID = auto()
    EXITED = auto()
    CANCELLED = auto()


class EventType(Enum):
    VEHICLE_ENTERED = auto()
    VEHICLE_EXITED = auto()
    PAYMENT_PROCESSED = auto()
    PAYMENT_FAILED = auto()
    SPOT_CHANGED = auto()
    TICKET_CANCELLED = auto()


# ============== Core Entities ==============

@dataclass
class TicketEvent:
    """Immutable event for audit trail."""
    event_type: EventType
    timestamp: datetime
    details: Dict = field(default_factory=dict)


class Vehicle:
    """Base vehicle class with common properties."""

    # Class-level compatibility matrix
    SPOT_COMPATIBILITY = {
        VehicleType.MOTORCYCLE: [SpotSize.SMALL, SpotSize.MEDIUM, SpotSize.LARGE],
        VehicleType.CAR: [SpotSize.MEDIUM, SpotSize.LARGE],
        VehicleType.ELECTRIC_CAR: [SpotSize.MEDIUM, SpotSize.LARGE],
        VehicleType.TRUCK: [SpotSize.LARGE],
        VehicleType.BUS: [SpotSize.XLARGE],
    }

    def __init__(self, license_plate: str, vehicle_type: VehicleType):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type
        self.owner: Optional['Customer'] = None

    def get_required_spot_size(self) -> SpotSize:
        """Get the minimum required spot size."""
        return self.SPOT_COMPATIBILITY[self.vehicle_type][0]

    def can_fit_in(self, spot_size: SpotSize) -> bool:
        """Check if vehicle can fit in given spot size."""
        return spot_size in self.SPOT_COMPATIBILITY[self.vehicle_type]

    @property
    def requires_charging(self) -> bool:
        return self.vehicle_type == VehicleType.ELECTRIC_CAR

    @property
    def spots_needed(self) -> int:
        """Number of spots needed (> 1 for buses)."""
        return 5 if self.vehicle_type == VehicleType.BUS else 1


class ParkingSpot:
    """
    Thread-safe parking spot with optimistic locking.
    """

    def __init__(self, spot_id: str, floor_number: int, size: SpotSize,
                 capabilities: Set[SpotCapability] = None,
                 location: tuple = (0, 0)):
        self.spot_id = spot_id
        self.floor_number = floor_number
        self.size = size
        self.capabilities = capabilities or {SpotCapability.STANDARD}
        self.location = location  # (x, y) for distance calculations

        # Thread-safe state
        self._vehicle: Optional[Vehicle] = None
        self._version: int = 0
        self._lock = threading.Lock()

    @property
    def is_available(self) -> bool:
        return self._vehicle is None

    @property
    def vehicle(self) -> Optional[Vehicle]:
        return self._vehicle

    def can_fit(self, vehicle: Vehicle) -> bool:
        """Check if spot can accommodate vehicle."""
        if not self.is_available:
            return False

        if not vehicle.can_fit_in(self.size):
            return False

        # Check capability requirements
        if vehicle.requires_charging:
            if SpotCapability.ELECTRIC_CHARGING not in self.capabilities:
                return False

        return True

    def get_state(self) -> tuple:
        """Get state snapshot for optimistic locking."""
        with self._lock:
            return (self.is_available, self._version)

    def try_park(self, vehicle: Vehicle, expected_version: int) -> bool:
        """Atomically park if state matches expected version."""
        with self._lock:
            if self._version != expected_version:
                return False
            if self._vehicle is not None:
                return False

            self._vehicle = vehicle
            self._version += 1
            return True

    def try_unpark(self, expected_vehicle: Vehicle) -> bool:
        """Atomically unpark if vehicle matches."""
        with self._lock:
            if self._vehicle != expected_vehicle:
                return False

            self._vehicle = None
            self._version += 1
            return True

    def __repr__(self):
        status = "OCCUPIED" if self._vehicle else "AVAILABLE"
        return f"ParkingSpot({self.spot_id}, {self.size.name}, {status})"


class Ticket:
    """
    Parking ticket with full lifecycle tracking.
    """

    def __init__(self, vehicle: Vehicle, spot: ParkingSpot,
                 pricing_snapshot: 'PricingSnapshot' = None):
        self.ticket_id = str(uuid.uuid4())[:12].upper()
        self.vehicle = vehicle
        self.spot = spot
        self.status = TicketStatus.ACTIVE

        self.entry_time = datetime.now()
        self.exit_time: Optional[datetime] = None
        self.entry_gate: Optional[str] = None
        self.exit_gate: Optional[str] = None

        # Pricing locked at entry
        self.pricing_snapshot = pricing_snapshot

        # Payment tracking
        self.calculated_fee: Optional[Decimal] = None
        self.paid_amount: Optional[Decimal] = None
        self.transaction_id: Optional[str] = None

        # Audit trail
        self.events: List[TicketEvent] = []
        self._add_event(EventType.VEHICLE_ENTERED, {
            'spot_id': spot.spot_id,
            'vehicle': vehicle.license_plate
        })

    def _add_event(self, event_type: EventType, details: Dict = None):
        self.events.append(TicketEvent(
            event_type=event_type,
            timestamp=datetime.now(),
            details=details or {}
        ))

    def get_duration_hours(self) -> Decimal:
        """Get parking duration in hours."""
        end = self.exit_time or datetime.now()
        duration = end - self.entry_time
        return Decimal(str(duration.total_seconds())) / Decimal('3600')

    def mark_exited(self, exit_gate: str):
        """Mark ticket as exited."""
        self.exit_time = datetime.now()
        self.exit_gate = exit_gate
        self.status = TicketStatus.EXITED
        self._add_event(EventType.VEHICLE_EXITED, {
            'exit_gate': exit_gate,
            'duration_hours': str(self.get_duration_hours())
        })

    def mark_paid(self, amount: Decimal, transaction_id: str):
        """Mark ticket as paid."""
        self.paid_amount = amount
        self.transaction_id = transaction_id
        self.status = TicketStatus.PAID
        self._add_event(EventType.PAYMENT_PROCESSED, {
            'amount': str(amount),
            'transaction_id': transaction_id
        })


class ParkingFloor:
    """
    Floor containing multiple parking spots.
    """

    def __init__(self, floor_number: int):
        self.floor_number = floor_number
        self.spots: List[ParkingSpot] = []
        self._lock = threading.Lock()

    def add_spots(self, spots_config: Dict[SpotSize, int],
                  capabilities: Set[SpotCapability] = None):
        """Add spots based on configuration."""
        spot_num = len(self.spots) + 1

        for size, count in spots_config.items():
            for i in range(count):
                spot_id = f"F{self.floor_number}-{size.name[0]}{spot_num}"
                spot = ParkingSpot(
                    spot_id=spot_id,
                    floor_number=self.floor_number,
                    size=size,
                    capabilities=capabilities or {SpotCapability.STANDARD},
                    location=(self.floor_number, spot_num)
                )
                self.spots.append(spot)
                spot_num += 1

    def get_available_spots(self, vehicle: Vehicle = None) -> List[ParkingSpot]:
        """Get all available spots, optionally filtered for a vehicle."""
        available = []
        for spot in self.spots:
            if vehicle:
                if spot.can_fit(vehicle):
                    available.append(spot)
            elif spot.is_available:
                available.append(spot)
        return available

    def get_occupancy_rate(self) -> float:
        """Get current occupancy as a ratio."""
        if not self.spots:
            return 0.0
        occupied = sum(1 for s in self.spots if not s.is_available)
        return occupied / len(self.spots)

    def get_availability_summary(self) -> Dict[SpotSize, int]:
        """Get count of available spots by size."""
        summary = {size: 0 for size in SpotSize}
        for spot in self.spots:
            if spot.is_available:
                summary[spot.size] += 1
        return summary


# ============== Allocation Strategies ==============

class SpotAllocationStrategy(ABC):
    """Abstract base for spot allocation algorithms."""

    @abstractmethod
    def find_spot(self, vehicle: Vehicle,
                  floors: List[ParkingFloor]) -> Optional[ParkingSpot]:
        pass


class NearestAvailableStrategy(SpotAllocationStrategy):
    """Allocate nearest spot to entrance."""

    def __init__(self, entrance_location: tuple = (0, 0)):
        self.entrance = entrance_location

    def find_spot(self, vehicle: Vehicle,
                  floors: List[ParkingFloor]) -> Optional[ParkingSpot]:
        candidates = []

        for floor in floors:
            for spot in floor.spots:
                if spot.can_fit(vehicle):
                    distance = self._calculate_distance(spot)
                    candidates.append((distance, spot))

        if not candidates:
            return None

        candidates.sort(key=lambda x: x[0])
        return candidates[0][1]

    def _calculate_distance(self, spot: ParkingSpot) -> float:
        return abs(spot.location[0] - self.entrance[0]) + \
               abs(spot.location[1] - self.entrance[1])


class OptimalFitStrategy(SpotAllocationStrategy):
    """Allocate smallest fitting spot to maximize capacity."""

    def find_spot(self, vehicle: Vehicle,
                  floors: List[ParkingFloor]) -> Optional[ParkingSpot]:
        preferred_size = vehicle.get_required_spot_size()

        # First pass: exact size match
        for floor in floors:
            for spot in floor.spots:
                if spot.can_fit(vehicle) and spot.size == preferred_size:
                    return spot

        # Second pass: smallest larger size
        for floor in floors:
            for spot in floor.spots:
                if spot.can_fit(vehicle):
                    return spot

        return None


# ============== Pricing Strategies ==============

class PricingStrategy(ABC):
    """Abstract base for pricing calculations."""

    @abstractmethod
    def calculate_fee(self, ticket: Ticket) -> Decimal:
        pass


class PricingSnapshot:
    """Immutable pricing state captured at ticket creation."""

    def __init__(self, strategy: PricingStrategy):
        self.strategy = strategy
        self.captured_at = datetime.now()

    def calculate_fee(self, ticket: Ticket) -> Decimal:
        return self.strategy.calculate_fee(ticket)


class HourlyPricing(PricingStrategy):
    """Simple hourly pricing with vehicle-type rates."""

    RATES = {
        VehicleType.MOTORCYCLE: Decimal('1.00'),
        VehicleType.CAR: Decimal('2.00'),
        VehicleType.ELECTRIC_CAR: Decimal('2.50'),
        VehicleType.TRUCK: Decimal('4.00'),
        VehicleType.BUS: Decimal('15.00'),
    }

    def __init__(self, minimum_hours: int = 1):
        self.minimum_hours = Decimal(str(minimum_hours))

    def calculate_fee(self, ticket: Ticket) -> Decimal:
        hours = ticket.get_duration_hours()
        billable = max(self.minimum_hours,
                      hours.to_integral_value(rounding=ROUND_HALF_UP))

        rate = self.RATES.get(ticket.vehicle.vehicle_type, Decimal('2.00'))
        return (billable * rate).quantize(Decimal('0.01'))


class TieredPricing(PricingStrategy):
    """Different rates for different time brackets."""

    def __init__(self, tiers: List[tuple]):
        # [(hours, rate), ...] e.g., [(1, 5), (4, 3), (inf, 2)]
        self.tiers = [(Decimal(str(h)), Decimal(str(r))) for h, r in tiers]

    def calculate_fee(self, ticket: Ticket) -> Decimal:
        hours = max(Decimal('1'),
                   ticket.get_duration_hours().to_integral_value(rounding=ROUND_HALF_UP))

        total = Decimal('0')
        billed = Decimal('0')
        prev_tier = Decimal('0')

        for tier_hours, rate in self.tiers:
            if billed >= hours:
                break

            hours_in_tier = min(hours - billed, tier_hours - prev_tier)
            if hours_in_tier > 0:
                total += hours_in_tier * rate
                billed += hours_in_tier

            prev_tier = tier_hours

        return total.quantize(Decimal('0.01'))


# ============== Main System ==============

class ParkingLot:
    """
    Main parking lot system with thread-safe operations.
    """

    def __init__(self, name: str,
                 allocation_strategy: SpotAllocationStrategy = None,
                 pricing_strategy: PricingStrategy = None):
        self.name = name
        self.floors: List[ParkingFloor] = []

        self.allocation_strategy = allocation_strategy or OptimalFitStrategy()
        self.pricing_strategy = pricing_strategy or HourlyPricing()

        # Thread-safe ticket management
        self._active_tickets: Dict[str, Ticket] = {}
        self._completed_tickets: List[Ticket] = []
        self._tickets_lock = threading.RLock()

        # Event observers
        self._observers: List[Callable[[TicketEvent], None]] = []

    def add_floor(self, spots_config: Dict[SpotSize, int],
                  capabilities: Set[SpotCapability] = None) -> ParkingFloor:
        """Add a new floor with specified spot configuration."""
        floor = ParkingFloor(len(self.floors) + 1)
        floor.add_spots(spots_config, capabilities)
        self.floors.append(floor)
        return floor

    def park_vehicle(self, vehicle: Vehicle,
                     entry_gate: str = "MAIN") -> Optional[Ticket]:
        """
        Park a vehicle and return ticket.

        Thread-safe with optimistic locking and retry.
        """
        max_retries = 3

        for attempt in range(max_retries):
            # Check if already parked
            with self._tickets_lock:
                if vehicle.license_plate in self._active_tickets:
                    return self._active_tickets[vehicle.license_plate]

            # Find available spot
            spot = self.allocation_strategy.find_spot(vehicle, self.floors)
            if spot is None:
                return None  # Lot full

            # Get current state for optimistic lock
            _, version = spot.get_state()

            # Attempt to claim spot
            if spot.try_park(vehicle, version):
                # Success - create ticket
                with self._tickets_lock:
                    # Double-check vehicle not parked (race condition)
                    if vehicle.license_plate in self._active_tickets:
                        spot.try_unpark(vehicle)
                        return self._active_tickets[vehicle.license_plate]

                    ticket = Ticket(
                        vehicle=vehicle,
                        spot=spot,
                        pricing_snapshot=PricingSnapshot(self.pricing_strategy)
                    )
                    ticket.entry_gate = entry_gate
                    self._active_tickets[vehicle.license_plate] = ticket

                    self._notify_observers(ticket.events[-1])
                    return ticket

            # Spot was taken, retry
            time.sleep(0.01 * (attempt + 1))

        return None  # Failed after retries

    def unpark_vehicle(self, license_plate: str,
                       exit_gate: str = "MAIN") -> Optional[Ticket]:
        """
        Process vehicle exit and return completed ticket.
        """
        with self._tickets_lock:
            ticket = self._active_tickets.get(license_plate)
            if not ticket:
                return None

            # Calculate fee before releasing spot
            ticket.calculated_fee = ticket.pricing_snapshot.calculate_fee(ticket)

            # Remove from active
            del self._active_tickets[license_plate]

        # Release spot
        spot = ticket.spot
        if not spot.try_unpark(ticket.vehicle):
            raise RuntimeError(f"Inconsistent state: spot {spot.spot_id}")

        ticket.mark_exited(exit_gate)

        with self._tickets_lock:
            self._completed_tickets.append(ticket)

        self._notify_observers(ticket.events[-1])
        return ticket

    def process_payment(self, ticket: Ticket,
                        payment_method: str = "CASH") -> bool:
        """Process payment for a ticket."""
        if ticket.calculated_fee is None:
            ticket.calculated_fee = ticket.pricing_snapshot.calculate_fee(ticket)

        # In production, integrate with payment gateway
        transaction_id = f"TXN-{uuid.uuid4().hex[:8].upper()}"
        ticket.mark_paid(ticket.calculated_fee, transaction_id)

        return True

    def get_ticket(self, license_plate: str) -> Optional[Ticket]:
        """Get active ticket for a vehicle."""
        with self._tickets_lock:
            return self._active_tickets.get(license_plate)

    def get_availability(self) -> Dict[SpotSize, int]:
        """Get total availability by spot size."""
        summary = {size: 0 for size in SpotSize}
        for floor in self.floors:
            floor_summary = floor.get_availability_summary()
            for size, count in floor_summary.items():
                summary[size] += count
        return summary

    def get_occupancy_rate(self) -> float:
        """Get overall lot occupancy."""
        total_spots = sum(len(f.spots) for f in self.floors)
        if total_spots == 0:
            return 0.0

        occupied = sum(
            1 for f in self.floors
            for s in f.spots
            if not s.is_available
        )
        return occupied / total_spots

    def add_observer(self, callback: Callable[[TicketEvent], None]):
        """Register event observer."""
        self._observers.append(callback)

    def _notify_observers(self, event: TicketEvent):
        """Notify all observers of an event."""
        for observer in self._observers:
            try:
                observer(event)
            except Exception:
                pass  # Don't let observer errors break main flow

    def display_status(self):
        """Print current lot status."""
        print(f"\n{'='*50}")
        print(f"  {self.name}")
        print(f"{'='*50}")
        print(f"  Occupancy: {self.get_occupancy_rate()*100:.1f}%")
        print(f"  Active Vehicles: {len(self._active_tickets)}")
        print()

        availability = self.get_availability()
        print("  Available Spots:")
        for size, count in availability.items():
            if size != SpotSize.XLARGE:
                print(f"    {size.name}: {count}")

        print()
        for floor in self.floors:
            rate = floor.get_occupancy_rate()
            print(f"  Floor {floor.floor_number}: {rate*100:.0f}% occupied")

        print(f"{'='*50}\n")


# ============== Usage Example ==============

def main():
    # Create parking lot with strategies
    lot = ParkingLot(
        name="Downtown Parking Garage",
        allocation_strategy=NearestAvailableStrategy(entrance_location=(0, 0)),
        pricing_strategy=TieredPricing([
            (1, 5.00),      # First hour: $5
            (4, 3.00),      # Hours 2-4: $3/hr
            (float('inf'), 2.00)  # After 4 hours: $2/hr
        ])
    )

    # Add observer for logging
    def log_event(event: TicketEvent):
        print(f"[{event.timestamp.strftime('%H:%M:%S')}] "
              f"{event.event_type.name}: {event.details}")

    lot.add_observer(log_event)

    # Add floors
    lot.add_floor({
        SpotSize.SMALL: 20,
        SpotSize.MEDIUM: 50,
        SpotSize.LARGE: 10
    })

    lot.add_floor({
        SpotSize.MEDIUM: 40,
        SpotSize.LARGE: 20
    }, capabilities={SpotCapability.STANDARD, SpotCapability.ELECTRIC_CHARGING})

    lot.display_status()

    # Park vehicles
    car1 = Vehicle("ABC-123", VehicleType.CAR)
    bike1 = Vehicle("BIKE-001", VehicleType.MOTORCYCLE)
    truck1 = Vehicle("TRUCK-99", VehicleType.TRUCK)

    ticket1 = lot.park_vehicle(car1, "GATE-A")
    ticket2 = lot.park_vehicle(bike1, "GATE-B")
    ticket3 = lot.park_vehicle(truck1, "GATE-A")

    lot.display_status()

    # Simulate time passing
    import time
    time.sleep(1)

    # Process exit
    if ticket1:
        exit_ticket = lot.unpark_vehicle("ABC-123", "EXIT-1")
        if exit_ticket:
            lot.process_payment(exit_ticket)
            print(f"Fee for {exit_ticket.vehicle.license_plate}: "
                  f"${exit_ticket.paid_amount}")

    lot.display_status()


if __name__ == "__main__":
    main()
```

---

## Edge Cases and Error Handling

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Critical Edge Cases to Handle</h4>

<div style="display: grid; gap: 12px;">
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Lost Ticket</div>
<div style="color: #7f1d1d; font-size: 14px;">Customer can't find ticket at exit. Solution: Search by license plate, charge from earliest unresolved entry, require ID verification.</div>
</div>
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">System Crash Mid-Transaction</div>
<div style="color: #7f1d1d; font-size: 14px;">Payment processed but barrier didn't open. Solution: Idempotent operations, transaction logging, barrier override capability.</div>
</div>
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Overstay (Multi-Day Parking)</div>
<div style="color: #7f1d1d; font-size: 14px;">Vehicle parked for weeks. Solution: Daily maximum caps, abandoned vehicle detection, admin override for fee adjustment.</div>
</div>
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Clock Skew</div>
<div style="color: #7f1d1d; font-size: 14px;">Entry and exit gates have unsynchronized clocks. Solution: Use centralized time service, include clock drift tolerance in billing.</div>
</div>
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Vehicle Size Mismatch</div>
<div style="color: #7f1d1d; font-size: 14px;">Car entered but truck exits (trailer attached). Solution: Exit sensor verification, manual override, charge difference.</div>
</div>
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Concurrent Exit with Same Ticket</div>
<div style="color: #7f1d1d; font-size: 14px;">Copied ticket used at multiple exits. Solution: Invalidate ticket atomically on first use, physical ticket capture.</div>
</div>
</div>
</div>

---

## Extensions and Follow-ups

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Common Interview Extensions</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">1. Reservation System</div>
<div style="color: #475569; font-size: 14px;">
  Pre-book spots for specific time windows. Requires temporal availability tracking, no-show penalties, and overbooking strategies.
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">2. Valet Parking</div>
<div style="color: #475569; font-size: 14px;">
  Staff parks vehicles. Requires key management, damage tracking, priority retrieval queues.
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">3. Monthly Subscriptions</div>
<div style="color: #475569; font-size: 14px;">
  Recurring payments with guaranteed spots. Requires capacity planning, grace periods, subscription tiers.
</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">4. Multi-Lot Federation</div>
<div style="color: #475569; font-size: 14px;">
  Chain of parking lots with unified ticketing. Requires central coordination, inter-lot transfers, distributed availability.
</div>
</div>
</div>
</div>

---

## Quick Reference

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Interview Cheat Sheet</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Design Patterns Used</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Strategy:</strong> Spot allocation, Pricing</div>
<div style="padding: 4px 0;"><strong>Factory:</strong> Ticket creation</div>
<div style="padding: 4px 0;"><strong>Observer:</strong> Event notifications</div>
<div style="padding: 4px 0;"><strong>Singleton:</strong> Avoid for testability</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Key Classes</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>ParkingLot:</strong> Main facade</div>
<div style="padding: 4px 0;"><strong>ParkingSpot:</strong> Thread-safe spot</div>
<div style="padding: 4px 0;"><strong>Ticket:</strong> Parking session</div>
<div style="padding: 4px 0;"><strong>Vehicle:</strong> Abstract base</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Concurrency Approach</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">Single spot: Optimistic locking</div>
<div style="padding: 4px 0;">Multi-spot: Pessimistic with ordering</div>
<div style="padding: 4px 0;">Counters: Atomic increments</div>
<div style="padding: 4px 0;">Tickets: RLock for nested access</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Time Complexity</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">Park (first avail): O(spots)</div>
<div style="padding: 4px 0;">Park (heap-based): O(log spots)</div>
<div style="padding: 4px 0;">Unpark: O(1) with ticket</div>
<div style="padding: 4px 0;">Availability: O(1) with cache</div>
</div>
</div>
</div>
</div>

---

## Related Topics

- [[Strategy Pattern]](/topic/design-patterns/strategy) - Allocation and pricing strategies
- [[Factory Pattern]](/topic/design-patterns/factory-method) - Vehicle and ticket creation
- [[Observer Pattern]](/topic/design-patterns/observer) - Event notifications
- [[Concurrency Patterns]](/topic/system-design/concurrency-patterns) - Thread-safe operations
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Entry gate throttling
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Multi-server scenarios
- [[Elevator System]](/topic/machine-coding/elevator-system) - Similar OOP design problem
