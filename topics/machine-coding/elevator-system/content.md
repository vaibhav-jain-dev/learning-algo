# Elevator System Design

## Problem Statement

Design and implement an elevator control system for a multi-story building with multiple elevators. The system should efficiently handle pickup requests from floors and destination requests from inside elevators, optimizing for minimal wait times while ensuring fair service to all users.

This is a classic object-oriented design problem frequently asked at companies like Amazon, Google, Microsoft, and Uber. It tests your ability to model real-world systems, implement state machines, and design efficient scheduling algorithms.

---

## Requirements Clarification

Before diving into implementation, clarify these requirements with your interviewer:

### Functional Requirements

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Core Features</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **External Requests**: Handle hall button presses (floor X, direction UP/DOWN)
- **Internal Requests**: Handle floor selection inside elevator cabins
- **Optimal Assignment**: Assign the most suitable elevator to each request
- **Status Display**: Show current position and direction of all elevators
- **Multi-Elevator Support**: Coordinate multiple elevators efficiently

</div>
</div>

### Non-Functional Requirements

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">System Constraints</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **Scalability**: Support 1-100 floors, 1-16 elevators
- **Fairness**: Prevent starvation - all requests eventually served
- **Efficiency**: Minimize total wait time across all passengers
- **Thread Safety**: Handle concurrent requests safely
- **Real-time**: Process requests and update state in real-time

</div>
</div>

### Key Questions to Ask

1. How many elevators and floors should we support?
2. Do all elevators serve all floors, or are some zoned?
3. Should we support VIP/express modes?
4. What happens during fire emergencies or maintenance?
5. Do we need to track elevator capacity?

---

## Architecture Diagram

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Elevator System Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">

<!-- Controller Layer -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #0369a1; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Elevator Controller (Central Brain)</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Request Queue</div>
<div style="color: #3b82f6; font-size: 11px;">Pending requests</div>
</div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Scheduler</div>
<div style="color: #3b82f6; font-size: 11px;">SCAN algorithm</div>
</div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Dispatcher</div>
<div style="color: #3b82f6; font-size: 11px;">Assignment logic</div>
</div>
</div>
</div>

<!-- Arrow -->
<div style="text-align: center; color: #64748b; font-size: 24px;">&#8595;</div>

<!-- Elevator Layer -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #7c3aed; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Elevator Fleet</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #f0fdf4; border: 2px solid #86efac; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">Elevator A</div>
<div style="color: #22c55e; font-size: 11px;">Floor 5 &#8593;</div>
<div style="color: #15803d; font-size: 10px;">MOVING_UP</div>
</div>
<div style="background: #fef3c7; border: 2px solid #fcd34d; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #92400e; font-weight: bold; font-size: 13px;">Elevator B</div>
<div style="color: #d97706; font-size: 11px;">Floor 8 &#8226;</div>
<div style="color: #b45309; font-size: 10px;">IDLE</div>
</div>
<div style="background: #fee2e2; border: 2px solid #fca5a5; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #991b1b; font-weight: bold; font-size: 13px;">Elevator C</div>
<div style="color: #dc2626; font-size: 11px;">Floor 3 &#8595;</div>
<div style="color: #b91c1c; font-size: 10px;">MOVING_DOWN</div>
</div>
</div>
</div>

<!-- State Machine -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Elevator State Machine</div>
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dcfce7; padding: 14px 20px; border-radius: 50px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">IDLE</div>
</div>
<div style="color: #64748b; font-size: 12px;">&#8594; request &#8594;</div>
<div style="background: #dbeafe; padding: 14px 20px; border-radius: 50px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">MOVING</div>
</div>
<div style="color: #64748b; font-size: 12px;">&#8594; arrived &#8594;</div>
<div style="background: #fef3c7; padding: 14px 20px; border-radius: 50px; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">DOORS_OPEN</div>
</div>
<div style="color: #64748b; font-size: 12px;">&#8594; timeout &#8594;</div>
<div style="background: #dcfce7; padding: 14px 20px; border-radius: 50px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">IDLE/MOVING</div>
</div>
</div>
</div>

</div>
</div>

---

## Class Design

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px;">Class Diagram</h4>

```
+------------------+       +----------------------+       +------------------+
|   Direction      |       |    ElevatorState     |       |     Request      |
+------------------+       +----------------------+       +------------------+
| UP = 1           |       | MOVING = "moving"    |       | floor: int       |
| DOWN = -1        |       | STOPPED = "stopped"  |       | direction: Dir   |
| IDLE = 0         |       | DOORS_OPEN = "open"  |       | timestamp: float |
+------------------+       +----------------------+       +------------------+
        |                           |                            |
        v                           v                            v
+-----------------------------------------------------------------------+
|                            Elevator                                    |
+-----------------------------------------------------------------------+
| - id: int                    - current_floor: int                     |
| - direction: Direction       - state: ElevatorState                   |
| - up_stops: Set[int]         - down_stops: Set[int]                   |
| - min_floor: int             - max_floor: int                         |
+-----------------------------------------------------------------------+
| + add_stop(floor, direction) -> bool                                  |
| + get_next_stop() -> Optional[int]                                    |
| + move() -> bool                                                      |
| + distance_to(floor, direction) -> int                                |
| + status() -> dict                                                    |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                       ElevatorController                               |
+-----------------------------------------------------------------------+
| - elevators: List[Elevator]  - num_floors: int                        |
| - pending_requests: List     - running: bool                          |
+-----------------------------------------------------------------------+
| + request_elevator(floor, direction) -> int                           |
| + select_floor(elevator_id, floor) -> None                            |
| + step() -> None                                                      |
| + find_best_elevator(floor, direction) -> Elevator                    |
+-----------------------------------------------------------------------+
```
</div>

### Key Design Decisions

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Data Structure Choices</div>

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Stop Storage | Two Sets (up_stops, down_stops) | O(1) add/remove, separate direction tracking |
| Direction | Enum with numeric values | Easy arithmetic (+1/-1 for movement) |
| State Machine | Enum | Clear state transitions, type safety |
| Request Queue | List with timestamps | FIFO with priority override capability |

</div>

---

## API Design

### External API (for building system integration)

```python
class ElevatorController:
    def request_elevator(self, floor: int, direction: Direction) -> int:
        """
        Request an elevator from a floor hallway button.

        Args:
            floor: Floor number where request originated
            direction: Direction the passenger wants to go (UP/DOWN)

        Returns:
            elevator_id: ID of the assigned elevator

        Raises:
            ValueError: If floor is out of bounds
        """

    def select_floor(self, elevator_id: int, floor: int) -> bool:
        """
        Passenger selects destination floor inside elevator.

        Args:
            elevator_id: ID of the elevator
            floor: Destination floor

        Returns:
            success: True if floor was added to stops
        """

    def get_status(self) -> List[Dict]:
        """
        Get status of all elevators.

        Returns:
            List of elevator status dictionaries
        """
```

### Internal API (elevator operations)

```python
class Elevator:
    def add_stop(self, floor: int, direction: Direction = None) -> bool:
        """Add a floor to the elevator's stop list."""

    def get_next_stop(self) -> Optional[int]:
        """Get the next floor to stop at based on SCAN algorithm."""

    def move(self) -> bool:
        """Move elevator one floor toward next stop. Returns True if arrived."""

    def distance_to(self, floor: int, direction: Direction) -> int:
        """Calculate effective distance to serve a request."""
```

---

## Code Implementation

### Python Implementation

```python
from enum import Enum
from typing import List, Optional, Set, Dict
from dataclasses import dataclass, field
import threading
import time


class Direction(Enum):
    """Elevator movement direction."""
    UP = 1
    DOWN = -1
    IDLE = 0


class ElevatorState(Enum):
    """Current state of an elevator."""
    MOVING = "moving"
    STOPPED = "stopped"
    DOORS_OPEN = "doors_open"


@dataclass
class Request:
    """Represents a floor request with direction."""
    floor: int
    direction: Direction
    timestamp: float = field(default_factory=time.time)


class Elevator:
    """
    Represents a single elevator car.

    Uses the SCAN (elevator) algorithm for efficient floor servicing.
    Maintains separate sets for up and down stops to optimize direction changes.
    """

    def __init__(self, elevator_id: int, min_floor: int = 0, max_floor: int = 10):
        self.id = elevator_id
        self.current_floor = 0
        self.direction = Direction.IDLE
        self.state = ElevatorState.STOPPED
        self.min_floor = min_floor
        self.max_floor = max_floor

        # Separate stop sets for each direction (SCAN algorithm)
        self.up_stops: Set[int] = set()
        self.down_stops: Set[int] = set()

        # Thread safety
        self.lock = threading.Lock()

    def add_stop(self, floor: int, direction: Direction = None) -> bool:
        """
        Add a floor to the elevator's stop list.

        The stop is added to the appropriate set based on direction
        and current elevator state.
        """
        with self.lock:
            if floor < self.min_floor or floor > self.max_floor:
                return False

            # Determine which set to add to
            if direction == Direction.UP or (direction is None and floor > self.current_floor):
                self.up_stops.add(floor)
            elif direction == Direction.DOWN or (direction is None and floor < self.current_floor):
                self.down_stops.add(floor)
            elif floor == self.current_floor:
                return True  # Already at floor
            else:
                # Default based on current direction
                if self.direction == Direction.UP:
                    self.up_stops.add(floor)
                else:
                    self.down_stops.add(floor)

            return True

    def get_next_stop(self) -> Optional[int]:
        """
        Determine the next floor to stop at using SCAN algorithm.

        SCAN (Elevator Algorithm):
        1. Continue in current direction serving all stops
        2. When no more stops in that direction, reverse
        3. This minimizes direction changes and is fair to all floors
        """
        with self.lock:
            if self.direction == Direction.UP or self.direction == Direction.IDLE:
                # Look for stops above current floor
                above = [f for f in self.up_stops if f > self.current_floor]
                if above:
                    return min(above)

                # No stops above, check down stops (highest first)
                if self.down_stops:
                    return max(self.down_stops)

                # Check remaining up stops below current
                if self.up_stops:
                    return min(self.up_stops)

            if self.direction == Direction.DOWN or self.direction == Direction.IDLE:
                # Look for stops below current floor
                below = [f for f in self.down_stops if f < self.current_floor]
                if below:
                    return max(below)

                # No stops below, check up stops (lowest first)
                if self.up_stops:
                    return min(self.up_stops)

                # Check remaining down stops above current
                if self.down_stops:
                    return max(self.down_stops)

            return None

    def move(self) -> bool:
        """
        Move elevator one floor toward next stop.

        Returns:
            True if arrived at a stop, False otherwise
        """
        next_stop = self.get_next_stop()

        if next_stop is None:
            self.direction = Direction.IDLE
            self.state = ElevatorState.STOPPED
            return False

        with self.lock:
            # Determine direction and move
            if next_stop > self.current_floor:
                self.direction = Direction.UP
                self.current_floor += 1
            elif next_stop < self.current_floor:
                self.direction = Direction.DOWN
                self.current_floor -= 1

            self.state = ElevatorState.MOVING

            # Check if arrived at a stop
            if self.current_floor in self.up_stops:
                self.up_stops.discard(self.current_floor)
                self.state = ElevatorState.DOORS_OPEN
                return True

            if self.current_floor in self.down_stops:
                self.down_stops.discard(self.current_floor)
                self.state = ElevatorState.DOORS_OPEN
                return True

        return False

    def distance_to(self, floor: int, direction: Direction) -> int:
        """
        Calculate effective distance to serve a request.

        This considers:
        - Physical distance
        - Current direction vs requested direction
        - Whether floor is "on the way"
        """
        if self.direction == Direction.IDLE:
            return abs(self.current_floor - floor)

        # Same direction and floor is on the way
        if self.direction == Direction.UP and direction == Direction.UP:
            if floor >= self.current_floor:
                return floor - self.current_floor

        if self.direction == Direction.DOWN and direction == Direction.DOWN:
            if floor <= self.current_floor:
                return self.current_floor - floor

        # Need to reverse direction - calculate full path
        if self.direction == Direction.UP:
            max_stop = max(self.up_stops) if self.up_stops else self.current_floor
            return (max_stop - self.current_floor) + (max_stop - floor)
        else:
            min_stop = min(self.down_stops) if self.down_stops else self.current_floor
            return (self.current_floor - min_stop) + (floor - min_stop)

    def has_stops(self) -> bool:
        """Check if elevator has any pending stops."""
        return len(self.up_stops) > 0 or len(self.down_stops) > 0

    def status(self) -> Dict:
        """Get current elevator status."""
        return {
            'id': self.id,
            'floor': self.current_floor,
            'direction': self.direction.name,
            'state': self.state.value,
            'up_stops': sorted(self.up_stops),
            'down_stops': sorted(self.down_stops)
        }


class ElevatorController:
    """
    Central controller managing multiple elevators.

    Responsibilities:
    - Receive and queue requests
    - Assign optimal elevator to each request
    - Coordinate elevator movements
    - Provide system status
    """

    def __init__(self, num_elevators: int, num_floors: int):
        self.elevators = [
            Elevator(i, 0, num_floors) for i in range(num_elevators)
        ]
        self.num_floors = num_floors
        self.pending_requests: List[Request] = []
        self.lock = threading.Lock()
        self.running = False

    def request_elevator(self, floor: int, direction: Direction) -> int:
        """
        Request an elevator to a floor (external hall button).

        Uses a scoring algorithm to find the best elevator:
        - Closer elevators score better
        - Idle elevators get a bonus
        - Elevators going same direction with floor on the way get a bonus
        """
        best_elevator = self._find_best_elevator(floor, direction)
        best_elevator.add_stop(floor, direction)
        return best_elevator.id

    def _find_best_elevator(self, floor: int, direction: Direction) -> Elevator:
        """Find the optimal elevator for a request using scoring."""
        best = None
        best_score = float('inf')

        for elevator in self.elevators:
            # Base score is distance
            score = elevator.distance_to(floor, direction)

            # Bonus for idle elevators (more available)
            if elevator.direction == Direction.IDLE:
                score -= 0.5

            # Bonus for same direction with floor on the way
            if elevator.direction == direction:
                if direction == Direction.UP and elevator.current_floor <= floor:
                    score -= 1
                elif direction == Direction.DOWN and elevator.current_floor >= floor:
                    score -= 1

            if score < best_score:
                best_score = score
                best = elevator

        return best

    def select_floor(self, elevator_id: int, floor: int) -> bool:
        """Passenger selects destination floor inside elevator."""
        if 0 <= elevator_id < len(self.elevators):
            return self.elevators[elevator_id].add_stop(floor)
        return False

    def step(self) -> List[Dict]:
        """
        Advance simulation one time step.

        Returns list of arrivals for logging/display.
        """
        arrivals = []
        for elevator in self.elevators:
            arrived = elevator.move()
            if arrived:
                arrivals.append({
                    'elevator_id': elevator.id,
                    'floor': elevator.current_floor
                })
        return arrivals

    def run(self, step_interval: float = 1.0):
        """Run the elevator system continuously."""
        self.running = True
        while self.running:
            arrivals = self.step()
            for arrival in arrivals:
                print(f"Elevator {arrival['elevator_id']} arrived at floor {arrival['floor']}")
            time.sleep(step_interval)

    def stop(self):
        """Stop the elevator system."""
        self.running = False

    def display_status(self):
        """Display status of all elevators."""
        print("\n=== Elevator System Status ===")
        for elevator in self.elevators:
            status = elevator.status()
            symbol = {"UP": "^", "DOWN": "v", "IDLE": "-"}[status['direction']]
            print(f"Elevator {status['id']}: Floor {status['floor']} [{symbol}] "
                  f"State: {status['state']}")
            if status['up_stops']:
                print(f"  Up stops: {status['up_stops']}")
            if status['down_stops']:
                print(f"  Down stops: {status['down_stops']}")


# Example usage and demonstration
if __name__ == "__main__":
    # Create controller with 3 elevators, 10 floors
    controller = ElevatorController(num_elevators=3, num_floors=10)

    print("=== Elevator System Demo ===\n")

    # Simulate requests
    print("Request: Floor 0 wants to go UP")
    e1 = controller.request_elevator(0, Direction.UP)
    print(f"  -> Assigned to Elevator {e1}")

    print("Request: Floor 7 wants to go DOWN")
    e2 = controller.request_elevator(7, Direction.DOWN)
    print(f"  -> Assigned to Elevator {e2}")

    print("Request: Floor 3 wants to go UP")
    e3 = controller.request_elevator(3, Direction.UP)
    print(f"  -> Assigned to Elevator {e3}")

    # Passengers select destinations
    controller.select_floor(e1, 5)  # Go to floor 5
    controller.select_floor(e2, 2)  # Go to floor 2
    controller.select_floor(e3, 8)  # Go to floor 8

    print("\n=== Simulation ===")
    for step in range(15):
        print(f"\n--- Step {step + 1} ---")
        arrivals = controller.step()
        controller.display_status()
        time.sleep(0.3)
```

---

## Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Critical Edge Cases to Handle</div>

| Scenario | Expected Behavior | Implementation |
|----------|-------------------|----------------|
| **All elevators busy** | Queue request, assign when available | Pending request list with priority |
| **Request at current floor** | Open doors immediately | Check before adding to stops |
| **Elevator breakdown** | Redistribute stops, mark unavailable | Maintenance mode flag |
| **Simultaneous requests same floor** | Assign single elevator, batch passengers | Deduplication in request handling |
| **Invalid floor number** | Return error, reject request | Bounds checking in add_stop() |
| **Direction change mid-travel** | Complete current direction first | SCAN algorithm handles naturally |
| **Capacity exceeded** | Skip floor, signal full | Capacity tracking (extension) |

</div>

### Code for Edge Case Handling

```python
def add_stop(self, floor: int, direction: Direction = None) -> bool:
    # Edge case: Invalid floor
    if floor < self.min_floor or floor > self.max_floor:
        return False

    # Edge case: Already at requested floor
    if floor == self.current_floor and self.state == ElevatorState.STOPPED:
        self.state = ElevatorState.DOORS_OPEN
        return True

    # Normal processing...
```

---

## Testing Approach

### Unit Tests

```python
import unittest

class TestElevator(unittest.TestCase):
    def setUp(self):
        self.elevator = Elevator(0, min_floor=0, max_floor=10)

    def test_add_stop_valid_floor(self):
        """Test adding a valid floor stop."""
        result = self.elevator.add_stop(5, Direction.UP)
        self.assertTrue(result)
        self.assertIn(5, self.elevator.up_stops)

    def test_add_stop_invalid_floor(self):
        """Test rejecting invalid floor numbers."""
        result = self.elevator.add_stop(15, Direction.UP)
        self.assertFalse(result)

    def test_scan_algorithm_continues_direction(self):
        """Test SCAN continues in current direction."""
        self.elevator.current_floor = 3
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = {5, 7}
        self.elevator.down_stops = {1, 2}

        next_stop = self.elevator.get_next_stop()
        self.assertEqual(next_stop, 5)  # Continue up first

    def test_scan_algorithm_reverses(self):
        """Test SCAN reverses when no stops in current direction."""
        self.elevator.current_floor = 8
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = set()
        self.elevator.down_stops = {3, 5}

        next_stop = self.elevator.get_next_stop()
        self.assertEqual(next_stop, 5)  # Reverse to down

    def test_distance_calculation_idle(self):
        """Test distance calculation for idle elevator."""
        self.elevator.current_floor = 3
        self.elevator.direction = Direction.IDLE

        distance = self.elevator.distance_to(7, Direction.UP)
        self.assertEqual(distance, 4)


class TestElevatorController(unittest.TestCase):
    def setUp(self):
        self.controller = ElevatorController(num_elevators=3, num_floors=10)

    def test_assigns_nearest_elevator(self):
        """Test that nearest idle elevator is assigned."""
        # Move elevator 1 closer to floor 5
        self.controller.elevators[1].current_floor = 4

        assigned = self.controller.request_elevator(5, Direction.UP)
        self.assertEqual(assigned, 1)

    def test_prefers_same_direction(self):
        """Test elevator going same direction is preferred."""
        self.controller.elevators[0].current_floor = 3
        self.controller.elevators[0].direction = Direction.UP
        self.controller.elevators[0].up_stops = {6}

        self.controller.elevators[1].current_floor = 4
        self.controller.elevators[1].direction = Direction.IDLE

        # Request at floor 5 going up - should prefer elevator 0
        assigned = self.controller.request_elevator(5, Direction.UP)
        self.assertEqual(assigned, 0)


if __name__ == "__main__":
    unittest.main()
```

### Integration Tests

```python
def test_full_simulation():
    """Test complete elevator journey."""
    controller = ElevatorController(num_elevators=2, num_floors=10)

    # Request from floor 0 going up
    e_id = controller.request_elevator(0, Direction.UP)
    controller.select_floor(e_id, 5)

    # Simulate until elevator reaches floor 5
    steps = 0
    max_steps = 20
    while steps < max_steps:
        controller.step()
        elevator = controller.elevators[e_id]
        if elevator.current_floor == 5 and not elevator.has_stops():
            break
        steps += 1

    assert steps < max_steps, "Elevator should reach destination"
    assert controller.elevators[e_id].current_floor == 5
```

---

## Interview Tips

<div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 16px;">How to Approach This in an Interview</div>

### Time Allocation (45 minutes)

| Phase | Time | Focus |
|-------|------|-------|
| Requirements | 5 min | Clarify scope, constraints |
| High-level Design | 10 min | Draw architecture, state machine |
| Class Design | 10 min | Define interfaces, relationships |
| Implementation | 15 min | Core algorithms (SCAN, assignment) |
| Edge Cases & Testing | 5 min | Discuss scenarios, testing strategy |

### Key Points to Mention

1. **Start simple**: Begin with single elevator, extend to multiple
2. **Draw the state machine**: Shows systematic thinking
3. **Explain SCAN algorithm**: Reference disk scheduling parallel
4. **Discuss assignment strategy**: Distance + direction scoring
5. **Thread safety**: Mention locks for concurrent access

### Common Follow-up Questions

- **How to handle rush hour?** Pre-position elevators at lobby 8-9 AM
- **Emergency mode?** All elevators to ground floor, doors open
- **VIP service?** Priority queue, express mode
- **Capacity tracking?** Add weight sensors, skip if full
- **Distributed system?** Each elevator could be a service, central coordinator

### Red Flags to Avoid

- Jumping into code without clarifying requirements
- Ignoring thread safety in a concurrent system
- Not considering elevator direction in assignment
- Implementing O(n) algorithms where O(1) is possible

</div>

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Add stop | O(1) with Set | O(1) |
| Get next stop | O(n) worst case | O(1) |
| Find best elevator | O(e) where e = elevators | O(1) |
| Move one step | O(1) | O(1) |
| **Total Space** | - | O(f * e) where f = floors |

### Space Breakdown Per Elevator

- Current floor: 4 bytes
- Direction enum: 4 bytes
- Up stops set: O(f) max
- Down stops set: O(f) max
- Total: ~O(f) per elevator
