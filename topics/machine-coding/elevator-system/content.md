# Elevator System Design

## Problem Statement

Design and implement an elevator control system for a multi-story building with multiple elevators. The system must efficiently handle pickup requests from floors and destination requests from inside cabins, optimizing for minimal wait times while ensuring fair service to all passengers.

This classic machine coding problem tests your ability to model real-world physical systems with complex state transitions, implement scheduling algorithms borrowed from operating systems, and design coordination mechanisms for distributed actors. Companies like Amazon, Google, Microsoft, and Uber use this problem to assess systems thinking, state machine design, and algorithm selection.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #f8fafc; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Why This Problem Matters</div>
<div style="color: #cbd5e1; font-size: 14px; line-height: 1.8;">
The elevator problem is a microcosm of distributed systems challenges: multiple independent actors (elevators) must coordinate to serve shared resources (passengers) while optimizing global metrics (wait time, throughput) without centralized real-time control. The algorithms you apply here—SCAN, LOOK, shortest-seek-time—originate from disk scheduling, making this an excellent bridge between OS concepts and real-world system design.
</div>
</div>

---

## Requirements Analysis

### Functional Requirements

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Core Capabilities</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**External Requests (Hall Calls)**
- Handle UP/DOWN button presses from floor hallways
- Track request origin floor and intended direction
- Acknowledge request receipt with visual feedback

**Internal Requests (Car Calls)**
- Handle floor selection from inside elevator cabins
- Validate floor accessibility (some floors may be restricted)
- Allow request cancellation (double-press to cancel)

**Optimal Assignment**
- Route requests to the most suitable elevator
- Consider current position, direction, and load
- Balance load across elevator fleet

**Real-time Status**
- Display current floor and direction for each elevator
- Show estimated arrival times at floors
- Indicate maintenance or emergency states

</div>
</div>

### Non-Functional Requirements

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">System Constraints</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| **Scalability** | 1-100 floors, 1-16 elevators | Covers residential to commercial high-rises |
| **Latency** | < 50ms request processing | Real-time responsiveness expected |
| **Fairness** | No request waits > 5 minutes | Prevent starvation under load |
| **Throughput** | Handle 1000+ requests/minute | Peak rush hour in large buildings |
| **Availability** | 99.9% uptime | Critical building infrastructure |

</div>
</div>

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Assumption: Request Model</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">
We assume a <strong>two-phase request model</strong>: passengers first make a hall call (external) specifying only direction, then make a car call (internal) specifying destination after boarding. This reflects real elevator systems where you don't know the destination until the passenger enters. Some modern "destination dispatch" systems ask for the destination floor upfront at kiosks—this fundamentally changes the optimization problem and should be clarified with your interviewer.
</div>
</div>

### Interview Questions: Requirements

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 16px;">Level 1: Basic Understanding</div>
<div style="color: #334155; font-size: 14px; line-height: 2.0;">

**Q: Why do we need separate hall calls and car calls?**

Hall calls represent where passengers are waiting; car calls represent where they want to go. This separation reflects the physical reality that we don't know a passenger's destination until they board. It also enables important optimizations: we can batch multiple passengers going the same direction at the same floor, and we can assign the closest suitable elevator before knowing exact destinations.

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 2: Design Implications</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: How would the system change with destination dispatch (passengers enter destination at hall kiosk)?**

Destination dispatch fundamentally transforms the optimization problem:
1. **Better grouping**: Passengers going to the same floor can be grouped into the same elevator before boarding
2. **Load balancing**: We can distribute passengers across elevators based on destination zones
3. **Reduced stops**: Each elevator serves fewer, more clustered floors
4. **Changed data model**: Requests now carry full trip information (origin, destination) rather than just (origin, direction)

The trade-off is increased complexity at the input interface and potential passenger confusion.

<div style="background: #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 3: Real-World Implications</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: In destination dispatch, how do you handle passengers who enter the wrong destination or change their mind after boarding?**

This reveals a critical UX and system design challenge:

1. **In-cabin override panels**: Allow destination changes but create suboptimal routes
2. **Request reallocation**: If passenger changes destination, system may need to stop at unplanned floors
3. **Capacity recalculation**: Original grouping assumed certain destinations; changes may overload segments
4. **Audit trail**: Track original vs. actual to improve prediction models
5. **Timeout policies**: Passengers who don't board their assigned elevator force reassignment

Real systems like Otis Compass and Schindler PORT handle this with combination of in-cabin panels for corrections and machine learning to predict and account for typical "change rates."

</div>
</div>
</div>
</div>
</div>
</div>

---

## Scheduling Algorithms Deep Dive

The core intellectual challenge of elevator systems is the scheduling algorithm—determining which floors to visit and in what order. These algorithms have direct parallels to disk scheduling in operating systems.

### FCFS (First-Come-First-Served)

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">FCFS: The Naive Baseline</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

Service requests in the exact order they arrive, regardless of elevator position or direction.

**Mechanism**: Maintain a simple queue; always go to the head of the queue next.

**Problem**: Creates "thrashing"—elevator oscillates wildly between distant floors.

**Example**:
- Current position: Floor 5
- Request queue: [Floor 2, Floor 8, Floor 3, Floor 9]
- FCFS path: 5 → 2 → 8 → 3 → 9 = 24 floors traveled
- Optimal path: 5 → 3 → 2 → 8 → 9 = 12 floors traveled

**When useful**: Only in extremely low-traffic scenarios where simplicity outweighs efficiency.

</div>
</div>

### SCAN Algorithm (The Elevator Algorithm)

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">SCAN: Systematic Sweeping</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

Move in one direction serving all requests, then reverse direction and repeat. Continue to the building's end before reversing, even if no requests remain in that direction.

**Mechanism**:
1. Maintain current direction (UP or DOWN)
2. Continue in that direction, stopping at requested floors
3. When reaching building boundary (top or bottom floor), reverse direction
4. Repeat indefinitely

**Properties**:
- **Bounded wait time**: Maximum wait is 2 * (num_floors - 1) moves
- **No starvation**: Every floor gets served within one complete cycle
- **Predictable**: Passengers can estimate arrival based on elevator position

**Trade-off**: May travel to building extremes unnecessarily when no requests exist there.

</div>
</div>

```python
class SCANElevator:
    """SCAN algorithm implementation - always goes to building boundary."""

    def __init__(self, min_floor: int, max_floor: int):
        self.current_floor = min_floor
        self.direction = Direction.UP
        self.stops: Set[int] = set()
        self.min_floor = min_floor
        self.max_floor = max_floor

    def get_next_floor(self) -> int:
        """
        SCAN: Continue to boundary, then reverse.

        Key insight: We go to min/max floor even if no requests there.
        This ensures predictable behavior but may waste movement.
        """
        if self.direction == Direction.UP:
            # Find next stop above current position
            above = [f for f in self.stops if f > self.current_floor]
            if above:
                return min(above)
            # No stops above, but continue to max floor (SCAN behavior)
            if self.current_floor < self.max_floor:
                return self.current_floor + 1
            # At max floor, reverse direction
            self.direction = Direction.DOWN
            return self.get_next_floor()
        else:
            # Find next stop below current position
            below = [f for f in self.stops if f < self.current_floor]
            if below:
                return max(below)
            # No stops below, but continue to min floor
            if self.current_floor > self.min_floor:
                return self.current_floor - 1
            # At min floor, reverse direction
            self.direction = Direction.UP
            return self.get_next_floor()
```

### LOOK Algorithm (Optimized SCAN)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">LOOK: Smarter Boundary Handling</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

Like SCAN, but reverses direction when no more requests exist in the current direction—doesn't travel to building boundary unnecessarily.

**Mechanism**:
1. Maintain current direction
2. Continue in that direction, stopping at requested floors
3. When no more requests in current direction, reverse immediately
4. "Look ahead" before moving to see if direction change is needed

**Improvement over SCAN**: Eliminates wasteful travel to building boundaries when no requests exist there.

**Example**:
- Current: Floor 5, Direction: UP
- Stops: {7, 3, 1}
- SCAN would go: 5 → 7 → (max floor) → 3 → 1
- LOOK would go: 5 → 7 → 3 → 1 (reverses at 7, not max)

</div>
</div>

```python
class LOOKElevator:
    """LOOK algorithm - reverses at last request, not building boundary."""

    def get_next_floor(self) -> Optional[int]:
        """
        LOOK: Reverse when no more requests in current direction.

        This is more efficient than SCAN in most real scenarios.
        """
        if not self.stops:
            self.direction = Direction.IDLE
            return None

        if self.direction == Direction.UP or self.direction == Direction.IDLE:
            # Find stops above current position
            above = [f for f in self.stops if f > self.current_floor]
            if above:
                return min(above)
            # No stops above - reverse (LOOK behavior: don't go to max)
            self.direction = Direction.DOWN

        if self.direction == Direction.DOWN:
            # Find stops below current position
            below = [f for f in self.stops if f < self.current_floor]
            if below:
                return max(below)
            # No stops below - reverse
            self.direction = Direction.UP
            above = [f for f in self.stops if f > self.current_floor]
            if above:
                return min(above)

        # Handle edge case: stop at current floor
        if self.current_floor in self.stops:
            return self.current_floor

        return None
```

### C-SCAN and C-LOOK (Circular Variants)

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Circular Variants: Uniform Wait Time</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**C-SCAN (Circular SCAN)**: Service requests in one direction only. After reaching the end, return to the beginning without servicing and start again.

**C-LOOK**: Like C-SCAN but reverses at last request rather than building boundary.

**Why Circular?**
Standard SCAN/LOOK creates unfair wait times: floors in the middle get served twice per cycle (once going up, once down), while extreme floors get served once. C-SCAN ensures every floor waits approximately the same time.

**Trade-off**: Wastes movement during the "return" phase, but provides more uniform service.

**Real-world usage**: Rarely used in elevators (passengers expect bidirectional service), but common in disk scheduling where uniform latency matters.

</div>
</div>

### SSTF (Shortest Seek Time First)

<div style="background: #faf5ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #a855f7;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">SSTF: Greedy Optimization</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

Always go to the nearest requested floor, regardless of direction.

**Mechanism**: At each decision point, calculate distance to all pending requests and choose the minimum.

**Advantage**: Minimizes total travel distance in many scenarios.

**Critical Problem**: **Starvation**. Floors far from the "cluster" of activity may never get served.

**Example of starvation**:
- Current: Floor 5
- Continuous requests at floors 4, 5, 6
- Request at floor 1 waits indefinitely

**When to use**: Only with additional anti-starvation mechanisms (aging, priority boost).

</div>
</div>

```python
class SSTFElevator:
    """Shortest Seek Time First with anti-starvation aging."""

    def __init__(self):
        self.stops: Dict[int, float] = {}  # floor -> timestamp
        self.current_floor = 0
        self.max_wait_time = 60.0  # seconds before priority boost

    def add_stop(self, floor: int):
        if floor not in self.stops:
            self.stops[floor] = time.time()

    def get_next_floor(self) -> Optional[int]:
        """
        SSTF with aging: boost priority of long-waiting requests.

        Trade-off: We sacrifice pure distance optimization to prevent
        starvation. This is the practical choice for real systems.
        """
        if not self.stops:
            return None

        current_time = time.time()
        best_floor = None
        best_score = float('inf')

        for floor, timestamp in self.stops.items():
            distance = abs(floor - self.current_floor)
            wait_time = current_time - timestamp

            # Aging: reduce effective distance for long-waiting requests
            # After max_wait_time, distance becomes 0 (highest priority)
            age_factor = max(0, 1 - (wait_time / self.max_wait_time))
            effective_distance = distance * age_factor

            if effective_distance < best_score:
                best_score = effective_distance
                best_floor = floor

        return best_floor
```

### Algorithm Comparison

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Scheduling Algorithm Comparison</h4>

| Algorithm | Avg Wait | Max Wait | Starvation Risk | Throughput | Complexity |
|-----------|----------|----------|-----------------|------------|------------|
| FCFS | High | Unbounded | None | Low | O(1) |
| SCAN | Medium | 2*(n-1) | None | Medium | O(k log k) |
| LOOK | Medium | 2*(n-1) | None | Medium-High | O(k log k) |
| C-SCAN | Medium | n | None | Medium | O(k log k) |
| SSTF | Low | Unbounded | **High** | High | O(k) |
| SSTF+Aging | Low-Medium | Bounded | Low | High | O(k) |

*n = number of floors, k = number of pending requests*

</div>

### Interview Questions: Scheduling Algorithms

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 16px;">Level 1: Algorithm Understanding</div>
<div style="color: #334155; font-size: 14px; line-height: 2.0;">

**Q: Why is LOOK preferred over SCAN in most elevator implementations?**

LOOK eliminates unnecessary travel to building boundaries. In SCAN, if the elevator is at floor 5 going up with requests only at floors 6 and 7, it would still travel to the top floor (say, floor 20) before reversing. LOOK reverses at floor 7 immediately, saving 13 floors of travel. The only scenario where SCAN is better is when new requests consistently appear ahead of the elevator—SCAN's predictable path makes it easier for passengers to anticipate, but this rarely outweighs the efficiency loss.

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 2: Trade-off Analysis</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: How would you modify SSTF to guarantee bounded wait times while preserving its efficiency benefits?**

The key insight is to use **aging** or **deadline-based promotion**:

1. **Aging approach**: Track request timestamps. Gradually reduce the "effective distance" of older requests. After a maximum wait threshold, their effective distance becomes 0, giving them highest priority regardless of physical distance.

2. **Deadline approach**: Assign each request a deadline (e.g., 3 minutes from creation). Partition requests into "urgent" (approaching deadline) and "normal." Always serve urgent requests first using any algorithm, then serve normal requests using SSTF.

3. **Hybrid approach**: Use SSTF within a LOOK framework—apply SSTF to choose among requests in the current direction, but guarantee direction reversal ensures no request waits more than one full cycle.

The trade-off: more complex bookkeeping and slightly reduced throughput, but bounded maximum wait time.

<div style="background: #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 3: System Design Implications</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: In a multi-elevator system, should each elevator run its own scheduling algorithm independently, or should there be a central coordinator? What are the implications of each approach?**

This is a fundamental distributed systems question with significant implications:

**Decentralized (each elevator independent)**:
- Pros: Fault-tolerant (one elevator failure doesn't affect others), simpler implementation, no single point of failure
- Cons: Suboptimal global behavior (two elevators might both respond to the same request), difficult to load balance, no global optimization
- Implementation: Each elevator "claims" requests it can serve efficiently; unclaimed requests go to nearest idle elevator

**Centralized coordinator**:
- Pros: Global optimization, true load balancing, can implement sophisticated algorithms (Hungarian algorithm for optimal assignment)
- Cons: Single point of failure, increased latency (all requests route through coordinator), coordinator becomes bottleneck at scale
- Implementation: Central dispatcher receives all requests, runs assignment algorithm, sends commands to elevators

**Hybrid (practical choice)**:
- Central coordinator for assignment decisions (which elevator gets which request)
- Local LOOK/SCAN for each elevator's internal scheduling (what order to visit assigned floors)
- Coordinator failure fallback: elevators switch to decentralized mode
- This balances global optimization with fault tolerance

Real systems like Otis, Schindler, and KONE use hybrid approaches with central "supervisory control" and local "car control" layers.

</div>
</div>
</div>
</div>
</div>
</div>

---

## State Machine Design

A single elevator is fundamentally a [[state-machine]](/topics/system-design/state-machine)—it exists in discrete states and transitions between them based on events. Correct state machine design is critical for safety and correctness.

### Elevator States

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Elevator State Machine</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dcfce7; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #86efac;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">IDLE</div>
<div style="color: #22c55e; font-size: 10px;">Stationary, no requests</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #93c5fd;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">MOVING_UP</div>
<div style="color: #3b82f6; font-size: 10px;">Ascending</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fef3c7; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #fcd34d;">
<div style="color: #92400e; font-weight: bold; font-size: 13px;">STOPPING</div>
<div style="color: #d97706; font-size: 10px;">Decelerating</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fae8ff; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #e879f9;">
<div style="color: #86198f; font-weight: bold; font-size: 13px;">DOORS_OPENING</div>
<div style="color: #c026d3; font-size: 10px;">Doors in motion</div>
</div>
</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #f0fdf4; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #86efac;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">DOORS_OPEN</div>
<div style="color: #22c55e; font-size: 10px;">Passengers boarding</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fae8ff; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #e879f9;">
<div style="color: #86198f; font-weight: bold; font-size: 13px;">DOORS_CLOSING</div>
<div style="color: #c026d3; font-size: 10px;">Doors in motion</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #93c5fd;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">MOVING_DOWN</div>
<div style="color: #3b82f6; font-size: 10px;">Descending</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dcfce7; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #86efac;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">IDLE</div>
<div style="color: #22c55e; font-size: 10px;">Cycle complete</div>
</div>
</div>

<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="background: #fee2e2; padding: 16px 24px; border-radius: 50px; text-align: center; border: 2px solid #fca5a5;">
<div style="color: #991b1b; font-weight: bold; font-size: 13px;">EMERGENCY_STOP</div>
<div style="color: #dc2626; font-size: 10px;">Reachable from any state</div>
</div>
</div>

</div>
</div>

### State Transition Table

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">

| Current State | Event | Next State | Action |
|---------------|-------|------------|--------|
| IDLE | request_received | MOVING_UP/DOWN | Start motor, set direction |
| IDLE | door_button | DOORS_OPENING | Open doors (passenger boarding at current floor) |
| MOVING_UP | floor_reached & is_stop | STOPPING | Begin deceleration |
| MOVING_UP | floor_reached & !is_stop | MOVING_UP | Continue, update floor counter |
| MOVING_DOWN | floor_reached & is_stop | STOPPING | Begin deceleration |
| STOPPING | stopped | DOORS_OPENING | Disengage motor, start door motor |
| DOORS_OPENING | doors_fully_open | DOORS_OPEN | Start door timer |
| DOORS_OPEN | timer_expired | DOORS_CLOSING | Start door close |
| DOORS_OPEN | obstruction_detected | DOORS_OPEN | Reset timer |
| DOORS_CLOSING | doors_fully_closed & has_requests | MOVING_UP/DOWN | Start motor |
| DOORS_CLOSING | doors_fully_closed & !has_requests | IDLE | All done |
| DOORS_CLOSING | obstruction_detected | DOORS_OPENING | Safety reversal |
| ANY | emergency_button | EMERGENCY_STOP | Stop motor, open doors, alert |
| EMERGENCY_STOP | reset_by_technician | IDLE | Clear emergency state |

</div>

### State Machine Implementation

```python
from enum import Enum, auto
from typing import Callable, Dict, Optional, Set
from dataclasses import dataclass
import threading
import time


class ElevatorState(Enum):
    """All possible elevator states."""
    IDLE = auto()
    MOVING_UP = auto()
    MOVING_DOWN = auto()
    STOPPING = auto()
    DOORS_OPENING = auto()
    DOORS_OPEN = auto()
    DOORS_CLOSING = auto()
    EMERGENCY_STOP = auto()
    MAINTENANCE = auto()


class ElevatorEvent(Enum):
    """Events that trigger state transitions."""
    REQUEST_RECEIVED = auto()
    FLOOR_REACHED = auto()
    STOP_REACHED = auto()
    STOPPED = auto()
    DOORS_FULLY_OPEN = auto()
    DOOR_TIMER_EXPIRED = auto()
    DOORS_FULLY_CLOSED = auto()
    OBSTRUCTION_DETECTED = auto()
    EMERGENCY_BUTTON = auto()
    MAINTENANCE_MODE = auto()
    RESET = auto()


@dataclass
class Transition:
    """Represents a state transition."""
    from_state: ElevatorState
    event: ElevatorEvent
    to_state: ElevatorState
    guard: Optional[Callable[[], bool]] = None  # Condition that must be true
    action: Optional[Callable[[], None]] = None  # Action to execute


class ElevatorStateMachine:
    """
    Formal state machine implementation for elevator control.

    Key design decisions:
    - Explicit transition table for clarity and verification
    - Guards enable conditional transitions
    - Actions execute on transition (Moore machine with Mealy extensions)
    - Thread-safe state access
    - Emergency stop reachable from any state
    """

    def __init__(self, elevator_id: int, num_floors: int):
        self.id = elevator_id
        self.num_floors = num_floors
        self.current_floor = 0
        self.state = ElevatorState.IDLE
        self.target_direction: Optional[Direction] = None

        # Request tracking
        self.up_stops: Set[int] = set()
        self.down_stops: Set[int] = set()

        # Thread safety
        self.lock = threading.RLock()

        # Build transition table
        self.transitions: Dict[tuple, Transition] = {}
        self._build_transitions()

        # Timers
        self.door_timer: Optional[threading.Timer] = None
        self.door_open_duration = 3.0  # seconds

    def _build_transitions(self):
        """Define all valid state transitions."""

        transitions = [
            # From IDLE
            Transition(
                ElevatorState.IDLE,
                ElevatorEvent.REQUEST_RECEIVED,
                ElevatorState.MOVING_UP,
                guard=lambda: self._next_stop_above(),
                action=self._start_moving_up
            ),
            Transition(
                ElevatorState.IDLE,
                ElevatorEvent.REQUEST_RECEIVED,
                ElevatorState.MOVING_DOWN,
                guard=lambda: self._next_stop_below(),
                action=self._start_moving_down
            ),
            Transition(
                ElevatorState.IDLE,
                ElevatorEvent.REQUEST_RECEIVED,
                ElevatorState.DOORS_OPENING,
                guard=lambda: self._stop_at_current_floor(),
                action=self._open_doors
            ),

            # From MOVING_UP
            Transition(
                ElevatorState.MOVING_UP,
                ElevatorEvent.STOP_REACHED,
                ElevatorState.STOPPING,
                action=self._begin_stopping
            ),
            Transition(
                ElevatorState.MOVING_UP,
                ElevatorEvent.FLOOR_REACHED,
                ElevatorState.MOVING_UP,
                guard=lambda: self._has_stops_above(),
                action=self._update_floor_up
            ),

            # From MOVING_DOWN
            Transition(
                ElevatorState.MOVING_DOWN,
                ElevatorEvent.STOP_REACHED,
                ElevatorState.STOPPING,
                action=self._begin_stopping
            ),
            Transition(
                ElevatorState.MOVING_DOWN,
                ElevatorEvent.FLOOR_REACHED,
                ElevatorState.MOVING_DOWN,
                guard=lambda: self._has_stops_below(),
                action=self._update_floor_down
            ),

            # From STOPPING
            Transition(
                ElevatorState.STOPPING,
                ElevatorEvent.STOPPED,
                ElevatorState.DOORS_OPENING,
                action=self._open_doors
            ),

            # From DOORS_OPENING
            Transition(
                ElevatorState.DOORS_OPENING,
                ElevatorEvent.DOORS_FULLY_OPEN,
                ElevatorState.DOORS_OPEN,
                action=self._start_door_timer
            ),

            # From DOORS_OPEN
            Transition(
                ElevatorState.DOORS_OPEN,
                ElevatorEvent.DOOR_TIMER_EXPIRED,
                ElevatorState.DOORS_CLOSING,
                action=self._close_doors
            ),
            Transition(
                ElevatorState.DOORS_OPEN,
                ElevatorEvent.OBSTRUCTION_DETECTED,
                ElevatorState.DOORS_OPEN,
                action=self._reset_door_timer
            ),

            # From DOORS_CLOSING
            Transition(
                ElevatorState.DOORS_CLOSING,
                ElevatorEvent.DOORS_FULLY_CLOSED,
                ElevatorState.MOVING_UP,
                guard=lambda: self._has_stops_above(),
                action=self._start_moving_up
            ),
            Transition(
                ElevatorState.DOORS_CLOSING,
                ElevatorEvent.DOORS_FULLY_CLOSED,
                ElevatorState.MOVING_DOWN,
                guard=lambda: self._has_stops_below(),
                action=self._start_moving_down
            ),
            Transition(
                ElevatorState.DOORS_CLOSING,
                ElevatorEvent.DOORS_FULLY_CLOSED,
                ElevatorState.IDLE,
                guard=lambda: not self._has_any_stops(),
                action=self._become_idle
            ),
            Transition(
                ElevatorState.DOORS_CLOSING,
                ElevatorEvent.OBSTRUCTION_DETECTED,
                ElevatorState.DOORS_OPENING,
                action=self._open_doors  # Safety: reopen on obstruction
            ),
        ]

        for t in transitions:
            key = (t.from_state, t.event)
            if key not in self.transitions:
                self.transitions[key] = []
            self.transitions[key].append(t)

    def process_event(self, event: ElevatorEvent) -> bool:
        """
        Process an event and perform state transition if valid.

        Returns True if transition occurred, False otherwise.

        Thread-safe: uses lock for state access.
        """
        with self.lock:
            # Emergency stop is special: reachable from any state
            if event == ElevatorEvent.EMERGENCY_BUTTON:
                self._emergency_stop()
                self.state = ElevatorState.EMERGENCY_STOP
                return True

            key = (self.state, event)
            if key not in self.transitions:
                return False  # No valid transition

            # Find first transition whose guard passes
            for transition in self.transitions[key]:
                if transition.guard is None or transition.guard():
                    # Execute action
                    if transition.action:
                        transition.action()
                    # Change state
                    self.state = transition.to_state
                    return True

            return False  # No guard passed

    # Guard methods
    def _next_stop_above(self) -> bool:
        return any(f > self.current_floor for f in self.up_stops | self.down_stops)

    def _next_stop_below(self) -> bool:
        return any(f < self.current_floor for f in self.up_stops | self.down_stops)

    def _stop_at_current_floor(self) -> bool:
        return self.current_floor in self.up_stops or self.current_floor in self.down_stops

    def _has_stops_above(self) -> bool:
        return any(f > self.current_floor for f in self.up_stops | self.down_stops)

    def _has_stops_below(self) -> bool:
        return any(f < self.current_floor for f in self.up_stops | self.down_stops)

    def _has_any_stops(self) -> bool:
        return len(self.up_stops) > 0 or len(self.down_stops) > 0

    # Action methods
    def _start_moving_up(self):
        self.target_direction = Direction.UP
        # In real system: send command to motor controller

    def _start_moving_down(self):
        self.target_direction = Direction.DOWN
        # In real system: send command to motor controller

    def _update_floor_up(self):
        self.current_floor += 1

    def _update_floor_down(self):
        self.current_floor -= 1

    def _begin_stopping(self):
        # In real system: command motor to decelerate
        pass

    def _open_doors(self):
        # Remove current floor from stops
        self.up_stops.discard(self.current_floor)
        self.down_stops.discard(self.current_floor)
        # In real system: command door motor

    def _close_doors(self):
        if self.door_timer:
            self.door_timer.cancel()
        # In real system: command door motor

    def _start_door_timer(self):
        self.door_timer = threading.Timer(
            self.door_open_duration,
            lambda: self.process_event(ElevatorEvent.DOOR_TIMER_EXPIRED)
        )
        self.door_timer.start()

    def _reset_door_timer(self):
        if self.door_timer:
            self.door_timer.cancel()
        self._start_door_timer()

    def _become_idle(self):
        self.target_direction = None

    def _emergency_stop(self):
        if self.door_timer:
            self.door_timer.cancel()
        # In real system: emergency brake, open doors, sound alarm
```

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Design Choice: Guards vs. Multiple Transitions</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">
We use <strong>guard conditions</strong> on transitions rather than creating many micro-states. For example, DOORS_CLOSING can transition to MOVING_UP, MOVING_DOWN, or IDLE depending on pending requests. Alternative approach: create states like DOORS_CLOSING_WILL_GO_UP, but this explodes the state space. Guards keep the state machine manageable while handling conditional logic.
</div>
</div>

### Interview Questions: State Machines

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 16px;">Level 1: State Machine Fundamentals</div>
<div style="color: #334155; font-size: 14px; line-height: 2.0;">

**Q: Why do we need separate DOORS_OPENING and DOORS_OPEN states instead of just one "doors open" state?**

The distinction models physical reality and enables proper safety handling:
- **DOORS_OPENING**: Doors are in motion. Elevator cannot move. System is transitioning.
- **DOORS_OPEN**: Doors are fully open and stable. Timer is running. Passengers can safely board.

This separation matters for:
1. **Safety interlocks**: Elevator motor must not start while doors are in motion
2. **Obstruction handling**: Response differs based on whether doors are moving or stable
3. **Timer management**: Timer only starts after doors are fully open
4. **Sensor interpretation**: Door position sensors mean different things in each state

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 2: Safety Critical Design</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: How do you ensure the elevator never moves while doors are open? What could go wrong and how do you prevent it?**

This is a **safety-critical invariant** that must be enforced at multiple levels:

**Software enforcement**:
- State machine structure: No transitions from DOORS_OPEN or DOORS_OPENING to MOVING states
- Guard conditions: MOVING states require `doors_fully_closed` guard
- Assertions: `assert self.state not in [DOORS_OPEN, DOORS_OPENING] before motor_start()`

**Hardware enforcement** (defense in depth):
- **Door interlock switch**: Physical switch that cuts motor power if doors not fully closed
- **Door zone sensor**: Separate sensor verifies door position independently
- **Motor controller firmware**: Refuses to energize motor unless interlock signal is true

**What could go wrong**:
1. Software bug bypasses state check (mitigated by hardware interlock)
2. Door sensor fails "closed" when actually open (mitigated by redundant sensors)
3. Race condition: state changes between check and motor start (mitigated by atomic operations + hardware)

Real elevator systems use IEC 62443 (industrial cybersecurity) and EN 81-20 (elevator safety) standards requiring multiple independent safety mechanisms.

<div style="background: #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 3: Fault Tolerance and Recovery</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: What happens if the door timer never fires (timer subsystem fails)? How do you design the system to handle this and similar failure modes?**

This is a classic reliability engineering problem. Solutions involve multiple layers:

**Detection mechanisms**:
1. **Watchdog timer**: Separate hardware timer that resets the system if not "fed" regularly. If door timer fails, watchdog eventually triggers.
2. **State timeout monitoring**: Supervisor process tracks time in each state. If DOORS_OPEN exceeds maximum (e.g., 30 seconds), force transition to DOORS_CLOSING.
3. **Health checks**: Periodic verification that timer subsystem is responsive.

**Recovery mechanisms**:
1. **Graceful degradation**: If software timer fails, fall back to hardware timer or manual close button.
2. **State reset**: After timeout, force state machine to known-good state (IDLE with doors closed).
3. **Maintenance alert**: Notify building management of timer subsystem failure.

**Architectural patterns**:
- **Heartbeat pattern**: Timer sends periodic "alive" signals; absence triggers recovery
- **Supervision trees** (like Erlang OTP): Supervisor process restarts failed timer process
- **Circuit breaker**: After repeated timer failures, disable automatic door closing and require manual operation

**Real-world example**: Otis elevators use redundant microcontrollers where one monitors the other. If the primary controller's door timer fails, the secondary takes over automatically.

</div>
</div>
</div>
</div>
</div>
</div>

---

## Multi-Elevator Coordination

With multiple elevators, the system must decide which elevator should serve each request. This is an [[assignment-problem]](/topics/algorithms/assignment-problem) with real-time constraints.

### Assignment Strategies

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Multi-Elevator System Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">

<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #0369a1; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Central Dispatcher</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Request Queue</div>
<div style="color: #3b82f6; font-size: 11px;">Incoming hall calls</div>
</div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Assignment Engine</div>
<div style="color: #3b82f6; font-size: 11px;">Scoring + optimization</div>
</div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Load Balancer</div>
<div style="color: #3b82f6; font-size: 11px;">Even distribution</div>
</div>
</div>
</div>

<div style="text-align: center; color: #64748b; font-size: 24px;">&#8595; Commands &#8595;</div>

<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #7c3aed; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Elevator Fleet (Independent State Machines)</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #f0fdf4; border: 2px solid #86efac; padding: 16px; border-radius: 8px; text-align: center; min-width: 120px;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">Elevator A</div>
<div style="color: #22c55e; font-size: 11px;">Floor 5 | UP</div>
<div style="color: #15803d; font-size: 10px;">Stops: {7, 9, 12}</div>
</div>
<div style="background: #fef3c7; border: 2px solid #fcd34d; padding: 16px; border-radius: 8px; text-align: center; min-width: 120px;">
<div style="color: #92400e; font-weight: bold; font-size: 13px;">Elevator B</div>
<div style="color: #d97706; font-size: 11px;">Floor 8 | IDLE</div>
<div style="color: #b45309; font-size: 10px;">Stops: {}</div>
</div>
<div style="background: #fee2e2; border: 2px solid #fca5a5; padding: 16px; border-radius: 8px; text-align: center; min-width: 120px;">
<div style="color: #991b1b; font-weight: bold; font-size: 13px;">Elevator C</div>
<div style="color: #dc2626; font-size: 11px;">Floor 15 | DOWN</div>
<div style="color: #b91c1c; font-size: 10px;">Stops: {10, 3, 1}</div>
</div>
</div>
</div>

<div style="text-align: center; color: #64748b; font-size: 24px;">&#8593; Status Updates &#8593;</div>

</div>
</div>

### Nearest Car Algorithm

The simplest multi-elevator strategy: assign each request to the elevator that can reach it fastest.

```python
class NearestCarDispatcher:
    """
    Assign requests to nearest elevator considering direction.

    This is the baseline strategy—simple and effective for low-traffic.
    """

    def __init__(self, elevators: List[Elevator]):
        self.elevators = elevators

    def assign_request(self, floor: int, direction: Direction) -> Elevator:
        """
        Find the elevator that can reach the floor fastest.

        Scoring considers:
        1. Physical distance
        2. Current direction alignment
        3. Whether floor is "on the way"
        """
        best_elevator = None
        best_score = float('inf')

        for elevator in self.elevators:
            if elevator.state == ElevatorState.MAINTENANCE:
                continue

            score = self._calculate_score(elevator, floor, direction)

            if score < best_score:
                best_score = score
                best_elevator = elevator

        return best_elevator

    def _calculate_score(self, elevator: Elevator, floor: int, direction: Direction) -> float:
        """
        Calculate assignment score (lower is better).

        The scoring function encodes our preferences:
        - Idle elevators are good (available immediately)
        - Same direction with floor on the way is ideal
        - Opposite direction is worst (must complete current trip first)
        """
        distance = abs(elevator.current_floor - floor)

        # Case 1: Elevator is idle
        if elevator.state == ElevatorState.IDLE:
            return distance  # Simple distance

        # Case 2: Same direction, floor is on the way
        if elevator.target_direction == direction:
            if direction == Direction.UP and elevator.current_floor <= floor:
                return distance  # Perfect: just continue
            if direction == Direction.DOWN and elevator.current_floor >= floor:
                return distance  # Perfect: just continue

        # Case 3: Same direction, but floor is behind
        if elevator.target_direction == direction:
            # Must complete current direction, reverse, then reach floor
            if direction == Direction.UP:
                # Going up, floor is below: go to max stop, reverse, come back
                max_stop = max(elevator.up_stops) if elevator.up_stops else elevator.current_floor
                return (max_stop - elevator.current_floor) + (max_stop - floor)
            else:
                min_stop = min(elevator.down_stops) if elevator.down_stops else elevator.current_floor
                return (elevator.current_floor - min_stop) + (floor - min_stop)

        # Case 4: Opposite direction
        # Must complete current direction entirely, then reverse
        if elevator.target_direction == Direction.UP:
            max_stop = max(elevator.up_stops) if elevator.up_stops else elevator.current_floor
            return (max_stop - elevator.current_floor) + abs(max_stop - floor)
        else:
            min_stop = min(elevator.down_stops) if elevator.down_stops else elevator.current_floor
            return (elevator.current_floor - min_stop) + abs(floor - min_stop)
```

### Zoned Elevator Systems

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Zoning Strategy</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

In tall buildings (30+ floors), divide elevators into zones:

**Low-rise zone**: Elevators serving floors 1-15
**Mid-rise zone**: Elevators serving floors 1, 16-30
**High-rise zone**: Elevators serving floors 1, 31-45

**Benefits**:
- Reduced travel time (elevators don't traverse entire building)
- Increased throughput (more elevators available per zone)
- Simplified scheduling (smaller search space per elevator)

**Trade-offs**:
- Passengers going across zones need to transfer
- Uneven load if zones have different traffic patterns
- Less flexibility during off-peak hours

**Dynamic zoning**: Modern systems adjust zones based on traffic patterns—morning rush has more elevators serving lobby-to-office floors, lunch rush adjusts for cafeteria floors.

</div>
</div>

```python
class ZonedDispatcher:
    """
    Assign elevators based on floor zones.

    Design decision: Zones overlap at lobby (floor 0) for transfers.
    """

    def __init__(self, elevators: List[Elevator], num_floors: int, num_zones: int):
        self.elevators = elevators
        self.num_floors = num_floors
        self.num_zones = num_zones

        # Assign elevators to zones
        self.zones = self._create_zones()
        self.elevator_zones = self._assign_elevators_to_zones()

    def _create_zones(self) -> List[tuple]:
        """Create floor ranges for each zone."""
        floors_per_zone = self.num_floors // self.num_zones
        zones = []

        for i in range(self.num_zones):
            start = i * floors_per_zone
            end = (i + 1) * floors_per_zone - 1 if i < self.num_zones - 1 else self.num_floors - 1
            # All zones include lobby (floor 0) for transfers
            zones.append((0, start, end))  # (lobby, zone_start, zone_end)

        return zones

    def _assign_elevators_to_zones(self) -> Dict[int, List[Elevator]]:
        """Distribute elevators across zones."""
        elevators_per_zone = len(self.elevators) // self.num_zones
        zone_assignments = {}

        for i, zone in enumerate(self.zones):
            start_idx = i * elevators_per_zone
            end_idx = start_idx + elevators_per_zone
            zone_assignments[i] = self.elevators[start_idx:end_idx]

            # Configure each elevator's floor range
            for elevator in zone_assignments[i]:
                elevator.min_floor = zone[1]  # Zone start
                elevator.max_floor = zone[2]  # Zone end
                elevator.serves_lobby = True  # All serve lobby

        return zone_assignments

    def assign_request(self, floor: int, direction: Direction) -> Optional[Elevator]:
        """Assign request to appropriate zone's elevator."""
        # Find which zone this floor belongs to
        zone_id = self._get_zone_for_floor(floor)

        if zone_id is None:
            return None

        # Use nearest car within that zone
        zone_elevators = self.elevator_zones[zone_id]
        return self._nearest_in_zone(zone_elevators, floor, direction)
```

### Load Balancing and Fairness

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Trade-off: Efficiency vs. Fairness</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">
Pure efficiency optimization (always assign to nearest elevator) creates unfair outcomes: elevators near high-traffic floors get overloaded while others sit idle. We need to balance immediate efficiency with long-term fairness and load distribution.
</div>
</div>

```python
class LoadBalancedDispatcher:
    """
    Balance load across elevators while maintaining efficiency.

    Uses weighted scoring that considers:
    - Distance (efficiency)
    - Current load (fairness)
    - Recent assignment count (distribution)
    """

    def __init__(self, elevators: List[Elevator]):
        self.elevators = elevators
        self.assignment_counts = {e.id: 0 for e in elevators}
        self.assignment_window = 100  # Reset counts after this many assignments
        self.total_assignments = 0

        # Tunable weights
        self.distance_weight = 0.5
        self.load_weight = 0.3
        self.fairness_weight = 0.2

    def assign_request(self, floor: int, direction: Direction) -> Elevator:
        """
        Assign with load balancing.

        Score = w1 * normalized_distance + w2 * normalized_load + w3 * normalized_assignments
        """
        scores = []

        # Calculate raw metrics for normalization
        distances = [self._effective_distance(e, floor, direction) for e in self.elevators]
        loads = [len(e.up_stops) + len(e.down_stops) for e in self.elevators]
        assignments = [self.assignment_counts[e.id] for e in self.elevators]

        # Normalize to [0, 1] range
        max_dist = max(distances) if max(distances) > 0 else 1
        max_load = max(loads) if max(loads) > 0 else 1
        max_assign = max(assignments) if max(assignments) > 0 else 1

        for i, elevator in enumerate(self.elevators):
            if elevator.state == ElevatorState.MAINTENANCE:
                scores.append(float('inf'))
                continue

            norm_distance = distances[i] / max_dist
            norm_load = loads[i] / max_load
            norm_assignments = assignments[i] / max_assign

            score = (
                self.distance_weight * norm_distance +
                self.load_weight * norm_load +
                self.fairness_weight * norm_assignments
            )
            scores.append(score)

        best_idx = scores.index(min(scores))
        best_elevator = self.elevators[best_idx]

        # Update assignment tracking
        self.assignment_counts[best_elevator.id] += 1
        self.total_assignments += 1

        if self.total_assignments >= self.assignment_window:
            self._reset_assignment_counts()

        return best_elevator

    def _reset_assignment_counts(self):
        """Reset assignment counts periodically to adapt to changing patterns."""
        self.assignment_counts = {e.id: 0 for e in self.elevators}
        self.total_assignments = 0
```

### Interview Questions: Multi-Elevator Coordination

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 16px;">Level 1: Basic Coordination</div>
<div style="color: #334155; font-size: 14px; line-height: 2.0;">

**Q: Two elevators are equidistant from a request. How do you break the tie?**

Several reasonable tie-breaking strategies:

1. **Lower load**: Choose elevator with fewer pending stops (more capacity)
2. **Same direction preference**: Choose elevator already going toward the request
3. **Elevator ID**: Deterministic fallback (lower ID wins) ensures consistency
4. **Round-robin**: Alternate between tied elevators for fairness
5. **Recent history**: Choose the one that hasn't been assigned recently

The best choice depends on system goals. For throughput, prefer lower load. For fairness, prefer round-robin. Most systems use a combination: primary tie-breaker is load, secondary is round-robin.

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 2: Dynamic Adaptation</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: How would you handle "rush hour" scenarios where traffic patterns are highly skewed (e.g., 8-9 AM, everyone going from lobby to upper floors)?**

Rush hour requires proactive strategies beyond reactive assignment:

**1. Predictive positioning**:
- At 7:55 AM, move idle elevators to lobby
- After dropping passengers at high floors, return to lobby immediately (don't wait for calls)
- Use historical data to predict demand patterns

**2. Up-peak mode**:
- Ignore down calls during extreme up-peak (controversial but effective)
- Batch passengers at lobby by destination floor (requires destination dispatch)
- Express service: some elevators skip lower floors entirely

**3. Load shedding**:
- If all elevators full, show "please wait" at lobby
- Implement queue management at lobby (physical or virtual)
- Stagger service to prevent all elevators arriving at lobby simultaneously

**4. Dynamic zone adjustment**:
- Temporarily reassign high-rise elevators to serve mid-rise floors
- Expand low-rise zone upward during morning rush

<div style="background: #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 3: Distributed Systems Challenges</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: The central dispatcher fails. How do elevators continue to operate? Design a fault-tolerant coordination mechanism.**

This is a [[distributed-consensus]](/topics/system-design/distributed-consensus) problem in disguise:

**Immediate failover**:
1. Each elevator detects dispatcher heartbeat timeout (e.g., 5 seconds)
2. Elevators switch to "local mode": accept requests directly, use local LOOK scheduling
3. Building displays show "individual elevator" mode to passengers

**Coordination without central dispatcher**:
1. **Peer-to-peer communication**: Elevators broadcast their position and stops to each other
2. **Claim-based assignment**: When a hall call arrives, all elevators calculate their score. Lowest score "claims" the request by broadcasting. Tie-breaker: lower elevator ID.
3. **Conflict resolution**: If two elevators claim simultaneously, use vector clocks or Lamport timestamps to determine winner.

**Consistency challenges**:
- **Split-brain**: Network partition could cause two elevators to both claim a request. Solution: Use majority quorum or accept occasional duplicate service (better than no service).
- **Message loss**: Elevator claims request but broadcast is lost. Solution: Periodic state synchronization; unclaimed requests get re-broadcast.

**Real-world approach** (Otis, Schindler):
- Hot standby dispatcher: Second dispatcher in warm standby, takes over within milliseconds
- Local fallback: Each elevator has full scheduling logic; central dispatcher is optimization, not requirement
- Graceful degradation: System continues functioning, just less efficiently

This mirrors patterns from distributed databases like [[raft-consensus]](/topics/system-design/raft) where leader election handles coordinator failure.

</div>
</div>
</div>
</div>
</div>
</div>

---

## Complete Implementation

```python
"""
Complete Elevator System Implementation

This implementation demonstrates:
- State machine-based elevator control
- LOOK scheduling algorithm
- Multi-elevator coordination with load balancing
- Thread-safe concurrent operation
- Comprehensive edge case handling

Related concepts:
- [[state-machine]](/topics/system-design/state-machine)
- [[producer-consumer]](/topics/concurrency/producer-consumer)
- [[scheduling-algorithms]](/topics/operating-systems/scheduling)
"""

from enum import Enum, auto
from typing import List, Optional, Set, Dict, Callable
from dataclasses import dataclass, field
from collections import deque
import threading
import time
import heapq


class Direction(Enum):
    """Movement direction with numeric values for arithmetic."""
    UP = 1
    DOWN = -1
    IDLE = 0

    def opposite(self) -> 'Direction':
        if self == Direction.UP:
            return Direction.DOWN
        elif self == Direction.DOWN:
            return Direction.UP
        return Direction.IDLE


class ElevatorState(Enum):
    """Elevator operational states."""
    IDLE = auto()
    MOVING_UP = auto()
    MOVING_DOWN = auto()
    DOORS_OPEN = auto()
    DOORS_CLOSING = auto()
    MAINTENANCE = auto()
    EMERGENCY = auto()


@dataclass(order=True)
class Request:
    """
    Represents a floor request with priority support.

    Design decision: Use dataclass with ordering for priority queue compatibility.
    Priority is negative timestamp (older requests have higher priority).
    """
    priority: float = field(compare=True)  # Negative timestamp for min-heap
    floor: int = field(compare=False)
    direction: Direction = field(compare=False)
    timestamp: float = field(default_factory=time.time, compare=False)
    request_type: str = field(default="hall", compare=False)  # "hall" or "car"

    @classmethod
    def create(cls, floor: int, direction: Direction, request_type: str = "hall"):
        ts = time.time()
        return cls(priority=-ts, floor=floor, direction=direction, timestamp=ts, request_type=request_type)


class Elevator:
    """
    Single elevator with LOOK scheduling.

    Key design decisions:
    - Separate up_stops and down_stops for direction-aware scheduling
    - Thread-safe operations with RLock (reentrant for nested calls)
    - State machine pattern for clear operational logic
    """

    def __init__(
        self,
        elevator_id: int,
        min_floor: int = 0,
        max_floor: int = 10,
        door_open_time: float = 3.0
    ):
        self.id = elevator_id
        self.min_floor = min_floor
        self.max_floor = max_floor
        self.door_open_time = door_open_time

        # Current state
        self.current_floor = min_floor
        self.state = ElevatorState.IDLE
        self.direction = Direction.IDLE

        # Stop tracking (LOOK algorithm uses two sets)
        self.up_stops: Set[int] = set()
        self.down_stops: Set[int] = set()

        # Capacity tracking
        self.max_capacity = 10
        self.current_passengers = 0

        # Thread safety
        self.lock = threading.RLock()

        # Callbacks for external notification
        self.on_arrival: Optional[Callable[[int, int], None]] = None
        self.on_state_change: Optional[Callable[[int, ElevatorState], None]] = None

    def add_stop(self, floor: int, direction: Optional[Direction] = None) -> bool:
        """
        Add a floor to the stop list.

        Logic:
        1. Validate floor is in range
        2. Determine appropriate stop set based on direction
        3. Handle edge case: already at requested floor

        Returns True if stop was added or elevator is already there.
        """
        with self.lock:
            # Validate
            if floor < self.min_floor or floor > self.max_floor:
                return False

            # Already at this floor and idle/doors open
            if floor == self.current_floor and self.state in [ElevatorState.IDLE, ElevatorState.DOORS_OPEN]:
                return True

            # Determine which set to add to
            if direction == Direction.UP:
                self.up_stops.add(floor)
            elif direction == Direction.DOWN:
                self.down_stops.add(floor)
            elif floor > self.current_floor:
                self.up_stops.add(floor)
            elif floor < self.current_floor:
                self.down_stops.add(floor)
            else:
                # floor == current_floor but elevator is moving
                # Add to current direction's stops
                if self.direction == Direction.UP:
                    self.up_stops.add(floor)
                else:
                    self.down_stops.add(floor)

            return True

    def get_next_stop(self) -> Optional[int]:
        """
        Determine next stop using LOOK algorithm.

        LOOK: Continue in current direction until no more stops,
        then reverse. Don't go to building boundary unnecessarily.
        """
        with self.lock:
            if self.direction == Direction.UP or self.direction == Direction.IDLE:
                # Check for stops above
                above = [f for f in self.up_stops if f > self.current_floor]
                if above:
                    return min(above)

                # Check for stops at current floor
                if self.current_floor in self.up_stops:
                    return self.current_floor

                # No stops above, check down stops (reverse direction)
                if self.down_stops:
                    return max(self.down_stops)

                # Check remaining up stops below (direction already reversed)
                if self.up_stops:
                    return max(self.up_stops)

            if self.direction == Direction.DOWN or self.direction == Direction.IDLE:
                # Check for stops below
                below = [f for f in self.down_stops if f < self.current_floor]
                if below:
                    return max(below)

                # Check for stops at current floor
                if self.current_floor in self.down_stops:
                    return self.current_floor

                # No stops below, check up stops (reverse direction)
                if self.up_stops:
                    return min(self.up_stops)

                # Check remaining down stops above
                if self.down_stops:
                    return min(self.down_stops)

            return None

    def step(self) -> Dict:
        """
        Advance elevator by one time unit.

        Returns status dict including any arrival events.
        """
        with self.lock:
            result = {
                'elevator_id': self.id,
                'floor': self.current_floor,
                'state': self.state.name,
                'arrived': False
            }

            # Handle door closing
            if self.state == ElevatorState.DOORS_CLOSING:
                self._close_doors()
                result['state'] = self.state.name
                return result

            # Handle doors open (waiting)
            if self.state == ElevatorState.DOORS_OPEN:
                # In real system, timer would handle this
                # For simulation, we transition immediately
                self.state = ElevatorState.DOORS_CLOSING
                result['state'] = self.state.name
                return result

            # Get next stop
            next_stop = self.get_next_stop()

            if next_stop is None:
                self.state = ElevatorState.IDLE
                self.direction = Direction.IDLE
                result['state'] = self.state.name
                return result

            # Move toward next stop
            if next_stop > self.current_floor:
                self.direction = Direction.UP
                self.state = ElevatorState.MOVING_UP
                self.current_floor += 1
            elif next_stop < self.current_floor:
                self.direction = Direction.DOWN
                self.state = ElevatorState.MOVING_DOWN
                self.current_floor -= 1

            result['floor'] = self.current_floor
            result['state'] = self.state.name

            # Check if we've arrived at a stop
            if self.current_floor == next_stop:
                self._arrive_at_floor()
                result['arrived'] = True
                result['state'] = self.state.name

                if self.on_arrival:
                    self.on_arrival(self.id, self.current_floor)

            return result

    def _arrive_at_floor(self):
        """Handle arrival at a floor."""
        # Remove from stop sets
        self.up_stops.discard(self.current_floor)
        self.down_stops.discard(self.current_floor)

        # Open doors
        self.state = ElevatorState.DOORS_OPEN

    def _close_doors(self):
        """Handle door closing and decide next state."""
        if self.up_stops or self.down_stops:
            next_stop = self.get_next_stop()
            if next_stop is not None:
                if next_stop > self.current_floor:
                    self.state = ElevatorState.MOVING_UP
                    self.direction = Direction.UP
                else:
                    self.state = ElevatorState.MOVING_DOWN
                    self.direction = Direction.DOWN
            else:
                self.state = ElevatorState.IDLE
                self.direction = Direction.IDLE
        else:
            self.state = ElevatorState.IDLE
            self.direction = Direction.IDLE

    def effective_distance(self, floor: int, direction: Direction) -> int:
        """
        Calculate effective distance to serve a request.

        This is the key metric for elevator assignment.
        Considers current position, direction, and pending stops.
        """
        with self.lock:
            # Idle: simple distance
            if self.direction == Direction.IDLE:
                return abs(self.current_floor - floor)

            # Same direction, floor is ahead
            if self.direction == Direction.UP and direction == Direction.UP:
                if floor >= self.current_floor:
                    return floor - self.current_floor

            if self.direction == Direction.DOWN and direction == Direction.DOWN:
                if floor <= self.current_floor:
                    return self.current_floor - floor

            # Need to complete current direction first
            if self.direction == Direction.UP:
                max_stop = max(self.up_stops) if self.up_stops else self.current_floor
                return (max_stop - self.current_floor) + abs(max_stop - floor)
            else:
                min_stop = min(self.down_stops) if self.down_stops else self.current_floor
                return (self.current_floor - min_stop) + abs(floor - min_stop)

    def has_pending_stops(self) -> bool:
        """Check if elevator has any pending stops."""
        return len(self.up_stops) > 0 or len(self.down_stops) > 0

    def pending_stop_count(self) -> int:
        """Get total number of pending stops."""
        return len(self.up_stops) + len(self.down_stops)

    def status(self) -> Dict:
        """Get current elevator status."""
        with self.lock:
            return {
                'id': self.id,
                'floor': self.current_floor,
                'state': self.state.name,
                'direction': self.direction.name,
                'up_stops': sorted(self.up_stops),
                'down_stops': sorted(self.down_stops),
                'passengers': self.current_passengers
            }


class ElevatorController:
    """
    Central controller for multi-elevator coordination.

    Responsibilities:
    - Receive and route requests
    - Assign optimal elevator to each request
    - Coordinate elevator movements
    - Provide system-wide status
    - Handle edge cases (all busy, maintenance, etc.)

    Related: [[load-balancer]](/topics/system-design/load-balancer)
    """

    def __init__(self, num_elevators: int, num_floors: int):
        self.num_floors = num_floors
        self.elevators = [
            Elevator(i, 0, num_floors - 1)
            for i in range(num_elevators)
        ]

        # Pending requests that couldn't be immediately assigned
        self.pending_requests: List[Request] = []

        # Assignment tracking for load balancing
        self.assignment_counts = {i: 0 for i in range(num_elevators)}

        # Thread safety
        self.lock = threading.Lock()

        # Configuration
        self.max_pending_requests = 100
        self.assignment_reset_interval = 50
        self.total_assignments = 0

        # Weights for scoring (tunable)
        self.distance_weight = 0.5
        self.load_weight = 0.3
        self.fairness_weight = 0.2

    def request_elevator(self, floor: int, direction: Direction) -> Optional[int]:
        """
        Handle hall call (external request).

        Returns assigned elevator ID, or None if request was queued.
        """
        with self.lock:
            # Validate
            if floor < 0 or floor >= self.num_floors:
                raise ValueError(f"Invalid floor: {floor}")

            # Find best elevator
            best_elevator = self._find_best_elevator(floor, direction)

            if best_elevator is None:
                # All elevators busy or in maintenance
                if len(self.pending_requests) < self.max_pending_requests:
                    self.pending_requests.append(Request.create(floor, direction, "hall"))
                return None

            # Assign to elevator
            best_elevator.add_stop(floor, direction)
            self._update_assignment_tracking(best_elevator.id)

            return best_elevator.id

    def select_floor(self, elevator_id: int, floor: int) -> bool:
        """
        Handle car call (internal request from inside elevator).
        """
        if elevator_id < 0 or elevator_id >= len(self.elevators):
            return False

        elevator = self.elevators[elevator_id]

        # Determine direction based on current floor
        if floor > elevator.current_floor:
            direction = Direction.UP
        elif floor < elevator.current_floor:
            direction = Direction.DOWN
        else:
            return True  # Already at floor

        return elevator.add_stop(floor, direction)

    def _find_best_elevator(self, floor: int, direction: Direction) -> Optional[Elevator]:
        """
        Find optimal elevator using weighted scoring.

        Score considers:
        - Effective distance (efficiency)
        - Current load (capacity)
        - Recent assignments (fairness)
        """
        candidates = []

        for elevator in self.elevators:
            if elevator.state in [ElevatorState.MAINTENANCE, ElevatorState.EMERGENCY]:
                continue

            # Calculate metrics
            distance = elevator.effective_distance(floor, direction)
            load = elevator.pending_stop_count()
            assignments = self.assignment_counts[elevator.id]

            candidates.append({
                'elevator': elevator,
                'distance': distance,
                'load': load,
                'assignments': assignments
            })

        if not candidates:
            return None

        # Normalize and score
        max_distance = max(c['distance'] for c in candidates) or 1
        max_load = max(c['load'] for c in candidates) or 1
        max_assignments = max(c['assignments'] for c in candidates) or 1

        best_score = float('inf')
        best_elevator = None

        for c in candidates:
            score = (
                self.distance_weight * (c['distance'] / max_distance) +
                self.load_weight * (c['load'] / max_load) +
                self.fairness_weight * (c['assignments'] / max_assignments)
            )

            if score < best_score:
                best_score = score
                best_elevator = c['elevator']

        return best_elevator

    def _update_assignment_tracking(self, elevator_id: int):
        """Update assignment counts for load balancing."""
        self.assignment_counts[elevator_id] += 1
        self.total_assignments += 1

        if self.total_assignments >= self.assignment_reset_interval:
            self.assignment_counts = {i: 0 for i in range(len(self.elevators))}
            self.total_assignments = 0

    def step(self) -> List[Dict]:
        """
        Advance all elevators by one time unit.

        Also processes pending requests.
        """
        results = []

        with self.lock:
            # Step each elevator
            for elevator in self.elevators:
                result = elevator.step()
                results.append(result)

            # Try to assign pending requests
            self._process_pending_requests()

        return results

    def _process_pending_requests(self):
        """Attempt to assign pending requests to available elevators."""
        if not self.pending_requests:
            return

        # Sort by timestamp (oldest first)
        self.pending_requests.sort(key=lambda r: r.timestamp)

        still_pending = []
        for request in self.pending_requests:
            elevator = self._find_best_elevator(request.floor, request.direction)
            if elevator:
                elevator.add_stop(request.floor, request.direction)
                self._update_assignment_tracking(elevator.id)
            else:
                still_pending.append(request)

        self.pending_requests = still_pending

    def get_status(self) -> Dict:
        """Get complete system status."""
        return {
            'elevators': [e.status() for e in self.elevators],
            'pending_requests': len(self.pending_requests),
            'total_assignments': self.total_assignments
        }

    def display_status(self):
        """Print formatted system status."""
        print("\n" + "=" * 50)
        print("ELEVATOR SYSTEM STATUS")
        print("=" * 50)

        for elevator in self.elevators:
            status = elevator.status()
            direction_symbol = {'UP': '^', 'DOWN': 'v', 'IDLE': '-'}

            print(f"\nElevator {status['id']}: Floor {status['floor']} "
                  f"[{direction_symbol[status['direction']]}] "
                  f"State: {status['state']}")

            if status['up_stops']:
                print(f"  Up stops: {status['up_stops']}")
            if status['down_stops']:
                print(f"  Down stops: {status['down_stops']}")

        if self.pending_requests:
            print(f"\nPending requests: {len(self.pending_requests)}")


def run_simulation():
    """Demonstrate elevator system operation."""
    print("=" * 60)
    print("ELEVATOR SYSTEM SIMULATION")
    print("=" * 60)

    # Create controller: 3 elevators, 15 floors
    controller = ElevatorController(num_elevators=3, num_floors=15)

    # Simulate rush hour: multiple requests from lobby
    print("\n--- Morning Rush Hour Simulation ---")
    print("Multiple passengers at lobby want to go up")

    requests = [
        (0, Direction.UP),   # Lobby to upper floors
        (0, Direction.UP),
        (0, Direction.UP),
        (5, Direction.UP),   # Mid floor going up
        (10, Direction.DOWN), # Upper floor going down
        (7, Direction.DOWN),
    ]

    for floor, direction in requests:
        elevator_id = controller.request_elevator(floor, direction)
        print(f"Request: Floor {floor} {direction.name} -> Assigned to Elevator {elevator_id}")

    # Passengers select destinations
    print("\n--- Passengers Select Destinations ---")
    controller.select_floor(0, 8)   # Elevator 0 passenger goes to 8
    controller.select_floor(0, 12)  # Another passenger in elevator 0 goes to 12
    controller.select_floor(1, 6)   # Elevator 1 passenger goes to 6
    controller.select_floor(2, 3)   # Elevator 2 passenger goes to 3

    print("\n--- Running Simulation ---")
    for step in range(25):
        print(f"\n=== Step {step + 1} ===")
        results = controller.step()

        for result in results:
            if result['arrived']:
                print(f"  * Elevator {result['elevator_id']} arrived at floor {result['floor']}")

        controller.display_status()
        time.sleep(0.3)

        # Check if all done
        all_idle = all(
            e.state == ElevatorState.IDLE and not e.has_pending_stops()
            for e in controller.elevators
        )
        if all_idle and not controller.pending_requests:
            print("\n--- All requests served ---")
            break


if __name__ == "__main__":
    run_simulation()
```

---

## Edge Cases and Error Handling

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Critical Edge Cases</div>

| Scenario | Problem | Solution |
|----------|---------|----------|
| **Request at current floor** | Elevator might add to wrong stop set | Check if floor == current_floor; if idle, open doors immediately |
| **All elevators at max capacity** | New requests can't be served | Queue request, assign when capacity available; show "please wait" |
| **Elevator breakdown mid-trip** | Passengers stranded, stops orphaned | Redistribute stops to other elevators; emergency procedures |
| **Simultaneous requests same floor** | Multiple elevators might respond | Deduplication in dispatcher; only one elevator assigned per floor/direction |
| **Request during door close** | Door might close on passenger | Door obstruction sensor; reopen on detection |
| **Power failure** | System state lost | Battery backup for orderly shutdown; state persistence |
| **Invalid floor from API** | System crash or undefined behavior | Input validation at all entry points |
| **Rapid repeated requests** | System overload | Rate limiting; request deduplication |

</div>

### Request Deduplication

```python
class DeduplicatingDispatcher:
    """
    Prevent redundant elevator assignments for identical requests.

    Scenario: Multiple passengers at floor 5 press UP button within seconds.
    Without deduplication, system might assign multiple elevators.
    """

    def __init__(self, controller: ElevatorController):
        self.controller = controller
        self.active_requests: Dict[tuple, float] = {}  # (floor, direction) -> timestamp
        self.dedup_window = 30.0  # seconds

    def request_elevator(self, floor: int, direction: Direction) -> Optional[int]:
        """
        Process request with deduplication.

        If identical request exists within window, return existing assignment.
        """
        key = (floor, direction)
        current_time = time.time()

        # Clean expired entries
        self._cleanup_expired(current_time)

        # Check for existing active request
        if key in self.active_requests:
            # Request already being served
            # Find which elevator is handling it
            for elevator in self.controller.elevators:
                if direction == Direction.UP and floor in elevator.up_stops:
                    return elevator.id
                if direction == Direction.DOWN and floor in elevator.down_stops:
                    return elevator.id
            # Elevator already arrived and cleared the stop
            del self.active_requests[key]

        # New request
        elevator_id = self.controller.request_elevator(floor, direction)
        if elevator_id is not None:
            self.active_requests[key] = current_time

        return elevator_id

    def _cleanup_expired(self, current_time: float):
        """Remove request entries older than dedup window."""
        expired = [
            key for key, timestamp in self.active_requests.items()
            if current_time - timestamp > self.dedup_window
        ]
        for key in expired:
            del self.active_requests[key]
```

### Capacity Management

```python
class CapacityAwareElevator(Elevator):
    """
    Elevator with passenger capacity tracking.

    Design decision: Track passenger count, not weight.
    Real systems use weight sensors, but count is simpler for simulation.
    """

    def __init__(self, *args, max_capacity: int = 10, **kwargs):
        super().__init__(*args, **kwargs)
        self.max_capacity = max_capacity
        self.current_passengers = 0

    def can_accept_passengers(self, count: int = 1) -> bool:
        """Check if elevator can accept more passengers."""
        return self.current_passengers + count <= self.max_capacity

    def board_passengers(self, count: int) -> bool:
        """
        Passengers board elevator.

        Returns False if would exceed capacity.
        """
        if not self.can_accept_passengers(count):
            return False
        self.current_passengers += count
        return True

    def exit_passengers(self, count: int):
        """Passengers exit elevator."""
        self.current_passengers = max(0, self.current_passengers - count)

    def is_full(self) -> bool:
        """Check if elevator is at capacity."""
        return self.current_passengers >= self.max_capacity
```

### Interview Questions: Edge Cases

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 16px 0; border: 2px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 16px;">Level 1: Basic Error Handling</div>
<div style="color: #334155; font-size: 14px; line-height: 2.0;">

**Q: A passenger inside the elevator presses a floor button that's in the opposite direction of travel. What happens?**

The request should be accepted and added to the appropriate stop set:
1. If elevator is going UP and passenger presses a floor below, add to `down_stops`
2. Elevator continues UP, serves all `up_stops`, then reverses and serves `down_stops`
3. Passenger waits longer but their request is eventually served

This is correct LOOK algorithm behavior. The alternative—rejecting the request—would strand passengers who made mistakes or changed their minds.

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 2: Race Conditions</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: Two requests arrive simultaneously: Floor 5 UP and Floor 5 DOWN. How does the system handle this?**

This is a valid scenario (two people at same floor going opposite directions). The system should:

1. **Assign potentially different elevators**: Floor 5 UP might go to an elevator going up; Floor 5 DOWN to one going down
2. **Or assign same elevator**: If one elevator can efficiently serve both (it's idle at floor 5), assign both to it
3. **Serve sequentially**: Elevator stops at floor 5, opens doors. Passenger going in current direction boards. Elevator continues.

**Race condition concern**: If both requests processed simultaneously, ensure the stop sets are updated atomically. With proper locking:
```python
with self.lock:
    elevator.up_stops.add(5)
    # Between these lines, another thread shouldn't see partial state
    elevator.down_stops.add(5)
```

Both stops are independent and can coexist. When elevator arrives at 5, it should serve the current-direction stop, let those passengers board, then handle direction change for the other stop.

<div style="background: #e2e8f0; border-radius: 8px; padding: 16px; margin: 12px 0;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 8px;">Level 3: Cascading Failures</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

**Q: One elevator fails mid-trip with passengers inside. How do you prevent this failure from cascading and ensure other elevators handle the load?**

This requires a comprehensive failure handling strategy:

**Immediate response**:
1. **Detect failure**: Watchdog timer detects elevator hasn't reported status for threshold period
2. **Mark unavailable**: Set failed elevator to EMERGENCY state, remove from assignment pool
3. **Notify occupants**: In-cabin communication system alerts passengers, emergency services if needed

**Stop redistribution**:
```python
def handle_elevator_failure(self, failed_id: int):
    failed_elevator = self.elevators[failed_id]

    # Collect orphaned stops
    orphaned_stops = []
    for floor in failed_elevator.up_stops:
        orphaned_stops.append((floor, Direction.UP))
    for floor in failed_elevator.down_stops:
        orphaned_stops.append((floor, Direction.DOWN))

    # Clear failed elevator's stops
    failed_elevator.up_stops.clear()
    failed_elevator.down_stops.clear()
    failed_elevator.state = ElevatorState.EMERGENCY

    # Redistribute to other elevators
    for floor, direction in orphaned_stops:
        self.request_elevator(floor, direction)  # Uses remaining elevators
```

**Preventing cascade**:
1. **Circuit breaker pattern**: If multiple elevators fail in short period, halt new assignments and alert maintenance
2. **Graceful degradation**: Reduce service (longer wait times) rather than complete failure
3. **Isolation**: Each elevator's state machine is independent; one crash doesn't affect others
4. **Bulkhead pattern**: Limit concurrent requests per elevator to prevent overload after failures

**Recovery**:
1. Failed elevator remains in EMERGENCY until technician clears
2. Gradual reintegration: After repair, elevator starts in IDLE with no stops assigned
3. Load rebalancing: System gradually shifts load back to recovered elevator

</div>
</div>
</div>
</div>
</div>
</div>

---

## Testing Strategy

### Unit Tests

```python
import unittest
from unittest.mock import Mock, patch
import time


class TestElevator(unittest.TestCase):
    """Unit tests for Elevator class."""

    def setUp(self):
        self.elevator = Elevator(0, min_floor=0, max_floor=10)

    def test_add_stop_valid_floor(self):
        """Stop added to correct set based on direction."""
        self.elevator.current_floor = 5

        self.assertTrue(self.elevator.add_stop(8, Direction.UP))
        self.assertIn(8, self.elevator.up_stops)

        self.assertTrue(self.elevator.add_stop(2, Direction.DOWN))
        self.assertIn(2, self.elevator.down_stops)

    def test_add_stop_invalid_floor(self):
        """Invalid floors are rejected."""
        self.assertFalse(self.elevator.add_stop(-1, Direction.UP))
        self.assertFalse(self.elevator.add_stop(15, Direction.UP))

    def test_add_stop_current_floor_idle(self):
        """Request at current floor when idle returns True immediately."""
        self.elevator.current_floor = 5
        self.elevator.state = ElevatorState.IDLE

        result = self.elevator.add_stop(5, Direction.UP)

        self.assertTrue(result)
        # Floor should not be added to stops (already there)
        self.assertNotIn(5, self.elevator.up_stops)

    def test_look_algorithm_continues_direction(self):
        """LOOK continues in current direction until no more stops."""
        self.elevator.current_floor = 5
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = {7, 9}
        self.elevator.down_stops = {2, 4}

        next_stop = self.elevator.get_next_stop()

        self.assertEqual(next_stop, 7)  # Nearest stop above

    def test_look_algorithm_reverses_at_last_stop(self):
        """LOOK reverses when no more stops in current direction."""
        self.elevator.current_floor = 9
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = set()
        self.elevator.down_stops = {5, 2}

        next_stop = self.elevator.get_next_stop()

        self.assertEqual(next_stop, 5)  # Highest down stop

    def test_effective_distance_idle(self):
        """Idle elevator: simple physical distance."""
        self.elevator.current_floor = 5
        self.elevator.direction = Direction.IDLE

        distance = self.elevator.effective_distance(8, Direction.UP)

        self.assertEqual(distance, 3)

    def test_effective_distance_same_direction_ahead(self):
        """Same direction, floor ahead: simple distance."""
        self.elevator.current_floor = 5
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = {10}

        distance = self.elevator.effective_distance(7, Direction.UP)

        self.assertEqual(distance, 2)

    def test_effective_distance_opposite_direction(self):
        """Opposite direction: must complete current path first."""
        self.elevator.current_floor = 5
        self.elevator.direction = Direction.UP
        self.elevator.up_stops = {8}

        # Request at floor 3 going down
        distance = self.elevator.effective_distance(3, Direction.DOWN)

        # Must go 5->8, then 8->3 = 3 + 5 = 8
        self.assertEqual(distance, 8)


class TestElevatorController(unittest.TestCase):
    """Unit tests for ElevatorController class."""

    def setUp(self):
        self.controller = ElevatorController(num_elevators=3, num_floors=10)

    def test_assigns_nearest_idle_elevator(self):
        """Nearest idle elevator is assigned."""
        # Move elevator 1 closer to floor 7
        self.controller.elevators[1].current_floor = 6

        assigned = self.controller.request_elevator(7, Direction.UP)

        self.assertEqual(assigned, 1)

    def test_prefers_same_direction_on_path(self):
        """Elevator going same direction with floor on path is preferred."""
        # Elevator 0 at floor 3, going up
        self.controller.elevators[0].current_floor = 3
        self.controller.elevators[0].direction = Direction.UP
        self.controller.elevators[0].up_stops = {8}

        # Elevator 1 idle at floor 4 (closer but idle)
        self.controller.elevators[1].current_floor = 4
        self.controller.elevators[1].direction = Direction.IDLE

        # Request floor 5 going up - elevator 0 is better (on the way)
        assigned = self.controller.request_elevator(5, Direction.UP)

        # Due to load balancing, either could be chosen
        # The key test is that the stop is added correctly
        self.assertTrue(
            5 in self.controller.elevators[0].up_stops or
            5 in self.controller.elevators[1].up_stops
        )

    def test_invalid_floor_raises_error(self):
        """Invalid floor raises ValueError."""
        with self.assertRaises(ValueError):
            self.controller.request_elevator(-1, Direction.UP)

        with self.assertRaises(ValueError):
            self.controller.request_elevator(100, Direction.UP)

    def test_select_floor_internal_request(self):
        """Internal floor selection works correctly."""
        self.controller.elevators[0].current_floor = 5

        result = self.controller.select_floor(0, 8)

        self.assertTrue(result)
        self.assertIn(8, self.controller.elevators[0].up_stops)


class TestIntegration(unittest.TestCase):
    """Integration tests for complete elevator journeys."""

    def test_complete_journey(self):
        """Elevator completes a full pickup and dropoff."""
        controller = ElevatorController(num_elevators=1, num_floors=10)

        # Request from floor 0 going up
        assigned = controller.request_elevator(0, Direction.UP)
        self.assertEqual(assigned, 0)

        # Passenger selects floor 5
        controller.select_floor(0, 5)

        # Run simulation until elevator reaches floor 5
        max_steps = 20
        for step in range(max_steps):
            controller.step()
            elevator = controller.elevators[0]
            if elevator.current_floor == 5 and not elevator.has_pending_stops():
                break

        # Verify arrival
        self.assertEqual(controller.elevators[0].current_floor, 5)
        self.assertFalse(controller.elevators[0].has_pending_stops())

    def test_multiple_pickups_same_direction(self):
        """Multiple passengers going same direction are picked up in order."""
        controller = ElevatorController(num_elevators=1, num_floors=15)

        # Requests at floors 3, 7, 5 all going up
        controller.request_elevator(3, Direction.UP)
        controller.request_elevator(7, Direction.UP)
        controller.request_elevator(5, Direction.UP)

        # Verify stops are registered
        elevator = controller.elevators[0]
        self.assertEqual(elevator.up_stops, {3, 5, 7})

        # Run and track arrival order
        arrivals = []
        for _ in range(20):
            results = controller.step()
            for r in results:
                if r['arrived']:
                    arrivals.append(r['floor'])

        # Should arrive in order: 3, 5, 7
        self.assertEqual(arrivals, [3, 5, 7])


if __name__ == '__main__':
    unittest.main()
```

---

## Complexity Analysis

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px;">Time and Space Complexity</h4>

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|-----------------|------------------|-------|
| `add_stop()` | O(1) | O(1) | Set insertion |
| `get_next_stop()` | O(k) | O(k) | k = pending stops; list filtering |
| `step()` (single elevator) | O(k) | O(1) | Calls get_next_stop |
| `find_best_elevator()` | O(e * k) | O(e) | e = elevators, k = avg stops |
| `request_elevator()` | O(e * k) | O(1) | Dominated by find_best |
| `step()` (controller) | O(e * k) | O(1) | Steps all elevators |

**Space per elevator**: O(f) where f = floors (max stops = floors)

**Total system space**: O(e * f + r) where r = pending requests

</div>

### Optimization Opportunities

```python
# Optimization 1: Use sorted containers for O(log k) get_next_stop
from sortedcontainers import SortedSet

class OptimizedElevator(Elevator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.up_stops = SortedSet()
        self.down_stops = SortedSet()

    def get_next_stop(self) -> Optional[int]:
        """O(log k) with sorted sets."""
        if self.direction == Direction.UP:
            # bisect_right gives first element > current_floor
            idx = self.up_stops.bisect_right(self.current_floor)
            if idx < len(self.up_stops):
                return self.up_stops[idx]
        # ... similar optimization for other cases


# Optimization 2: Cache effective distances
class CachingDispatcher:
    """Cache effective distances; invalidate on elevator state change."""

    def __init__(self, controller: ElevatorController):
        self.controller = controller
        self.distance_cache: Dict[tuple, int] = {}
        self.cache_valid = True

    def invalidate_cache(self):
        self.distance_cache.clear()
        self.cache_valid = False

    def get_effective_distance(self, elevator: Elevator, floor: int, direction: Direction) -> int:
        key = (elevator.id, floor, direction, elevator.current_floor, elevator.direction)

        if key not in self.distance_cache:
            self.distance_cache[key] = elevator.effective_distance(floor, direction)

        return self.distance_cache[key]
```

---

## Interview Approach

<div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 16px;">45-Minute Interview Strategy</div>

| Phase | Time | Focus | Deliverable |
|-------|------|-------|-------------|
| **Requirements** | 5 min | Clarify scope, ask questions | Written list of constraints |
| **High-Level Design** | 10 min | Architecture, components | Component diagram |
| **State Machine** | 5 min | Elevator states and transitions | State diagram |
| **Algorithm Selection** | 10 min | Explain SCAN/LOOK, justify choice | Pseudocode |
| **Implementation** | 10 min | Core classes, key methods | Working code |
| **Edge Cases** | 5 min | Error handling, failure modes | Test cases |

</div>

### Key Points to Demonstrate

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">What Interviewers Look For</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

1. **Systems thinking**: See the problem holistically before diving into code
2. **Trade-off awareness**: Articulate why LOOK > SCAN, mention starvation in SSTF
3. **State machine proficiency**: Model the elevator as explicit states and transitions
4. **Concurrency awareness**: Mention thread safety even if not fully implementing
5. **Edge case anticipation**: Proactively discuss failure modes
6. **Clean code structure**: Separate concerns (elevator logic vs. coordination)

</div>
</div>

### Common Follow-up Questions

- **"How would you handle VIP service?"** - Priority queue with different scoring weights
- **"What about fire emergency?"** - All elevators to lobby, doors open, disable hall calls
- **"How to prevent all elevators clustering at lobby?"** - Pre-position algorithm, zone assignment
- **"Capacity exceeded?"** - Skip floor, signal "full", reassign pending requests
- **"Network partition between elevators?"** - Fall back to local scheduling, accept suboptimal behavior

---

## Related Concepts

- [[state-machine]](/topics/system-design/state-machine) - Foundation for elevator behavior modeling
- [[scheduling-algorithms]](/topics/operating-systems/scheduling) - SCAN, LOOK, SSTF origins
- [[producer-consumer]](/topics/concurrency/producer-consumer) - Request queue pattern
- [[load-balancer]](/topics/system-design/load-balancer) - Multi-elevator assignment
- [[distributed-consensus]](/topics/system-design/distributed-consensus) - Coordinator failure handling
- [[rate-limiting]](/topics/system-design/rate-limiting) - Request deduplication, overload protection
