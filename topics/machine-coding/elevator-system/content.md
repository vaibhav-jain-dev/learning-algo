# Elevator System

## Problem Statement

Design an elevator system for a building with multiple floors and elevators. Handle requests efficiently, manage elevator states, and optimize for minimal wait times.

## Requirements

- Multiple elevators serving multiple floors
- Handle pickup and dropoff requests
- Optimal elevator assignment
- Track elevator states (idle, moving up/down)
- Display current status

---

## Solution Breakdown

### Part 1: Understanding the Domain

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Two Types of Requests:**
1. **External Request**: Person at floor X presses UP or DOWN button
2. **Internal Request**: Person inside elevator presses floor Y button

**Key Challenges:**
- How to assign the "best" elevator to an external request?
- How to handle multiple simultaneous requests?
- How to minimize total wait time across all users?

</div>

### Part 2: State Machine for Elevator

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">

<!-- Custom diagram: replace with HTML+JS implementation using diagramEngine -->

**State Transitions:**
- `IDLE` → `MOVING_UP/DOWN`: When request received
- `MOVING` → `DOORS_OPEN`: When arrived at a stop
- `DOORS_OPEN` → `MOVING/IDLE`: After timeout, if more stops or not

</div>

### Part 3: The SCAN Algorithm (Elevator Algorithm)

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Why SCAN/LOOK?**

```
Scenario: Elevator at floor 5, going UP
Requests: [3, 7, 2, 9, 4]

FCFS Order: 3, 7, 2, 9, 4 → Total movement: 2+4+5+7+5 = 23 floors

SCAN Order: 7, 9, 4, 3, 2 → Total movement: 2+2+5+1+1 = 11 floors
            (go up)  (go down)
```

**SCAN Strategy:**
1. Continue in current direction, serving all stops
2. When no more stops in that direction, reverse
3. Repeat

**LOOK Optimization:** Don't go all the way to top/bottom, just to the last request

</div>

### Part 4: Elevator Assignment Strategy

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**How to pick which elevator serves a new request?**

```
Request: Floor 5, Direction UP
Elevators:
  A: Floor 2, going UP    → distance = 3, same direction ✓
  B: Floor 8, going DOWN  → distance = 6 (8→0→5), opposite direction
  C: Floor 5, IDLE        → distance = 0, perfect! ✓✓

Scoring Formula:
  score = distance + direction_penalty + load_penalty
```

**Factors to Consider:**
1. **Distance**: Closer is better
2. **Direction**: Same direction is better (especially if floor is on the way)
3. **Load**: Less crowded elevator is better (if tracking capacity)
4. **Wait time**: Elevator already serving many stops will be slower

</div>

### Part 5: Data Structures for Stops

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Option 1: Two Sets (Our Approach)**
```python
up_stops: Set[int] = {3, 7, 9}     # Stops when going up
down_stops: Set[int] = {6, 2, 1}  # Stops when going down
```
- **Pros**: O(1) add/remove, easy to separate directions
- **Cons**: Need to check both sets

**Option 2: Priority Queues**
```python
up_heap: MinHeap[int] = [3, 7, 9]    # Next up stop = min
down_heap: MaxHeap[int] = [6, 2, 1]  # Next down stop = max
```
- **Pros**: O(1) get next stop, O(log n) add
- **Cons**: Can't efficiently remove arbitrary stops

**Option 3: Sorted List**
```python
stops: SortedList[int] = [1, 2, 3, 6, 7, 9]
```
- **Pros**: Easy to find next stop in either direction
- **Cons**: O(n) insert/delete

</div>

---

## Scheduling Algorithms Compared

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">

| Algorithm | Description | Pros | Cons |
|-----------|-------------|------|------|
| **FCFS** | First Come First Served | Fair, simple | Very inefficient |
| **SSTF** | Shortest Seek Time First | Minimizes movement | Starvation possible |
| **SCAN** | Sweep up then down | No starvation | Unfair to middle floors |
| **LOOK** | Like SCAN, stops at last request | More efficient | Slightly complex |
| **C-SCAN** | Circular SCAN (one direction only) | Uniform wait time | More movement |

</div>

---

## Alternative Approaches

### Alternative 1: Destination Dispatch System

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">

**Modern approach used in skyscrapers:**

```
Traditional:            Destination Dispatch:
┌───────────┐           ┌───────────────────┐
│ ▲  ▼      │           │ Enter destination │
│ UP DOWN   │           │ ┌─────────────┐   │
│ buttons   │           │ │ Floor: [12] │   │
└───────────┘           │ └─────────────┘   │
      │                 │ Assigned: Elev B  │
      ▼                 └───────────────────┘
Wait for any                    │
elevator                        ▼
                        Go directly to
                        Elevator B
```

**Pros**:
- Group passengers by destination
- Reduce stops per trip
- 30-40% efficiency improvement

**Cons**:
- More complex hardware
- User education needed

</div>

### Alternative 2: Zone-Based Allocation

```
Building: 30 floors

Zone A: Floors 1-10  → Elevators 1, 2
Zone B: Floors 11-20 → Elevators 3, 4
Zone C: Floors 21-30 → Elevators 5, 6

Express: Floors 1, 15, 30 only → Elevator 7
```

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**When to use zones:**
- Very tall buildings (50+ floors)
- High traffic between specific floors
- Different tenant areas

**When NOT to use:**
- Small buildings
- Uniform traffic patterns
- Limited number of elevators

</div>

### Alternative 3: Machine Learning Approach

```python
def predict_demand(time_of_day, day_of_week, floor, historical_data):
    """
    Predict elevator demand for proactive positioning

    Example patterns:
    - 8-9 AM: High demand at lobby (going up)
    - 12-1 PM: High demand at cafeteria floor
    - 5-6 PM: High demand at upper floors (going down)
    """
    # Use ML model to predict demand
    return model.predict([time_of_day, day_of_week, floor])

def preposition_elevators():
    """Move idle elevators to predicted high-demand floors"""
    predictions = [predict_demand(...) for floor in floors]
    # Position elevators at predicted hot spots
```

---

## Pros and Cons Analysis

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

### SCAN Algorithm Pros

- **No starvation** - Every floor eventually served
- **Efficient** - Minimizes direction changes
- **Predictable** - Easy to estimate wait time
- **Simple** - Easy to implement
- **Fair** - All floors get service

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

### SCAN Algorithm Cons

- **Edge bias** - Top/bottom floors served less frequently
- **Not optimal** - SSTF can be faster for sparse requests
- **No load balancing** - Doesn't consider elevator capacity
- **Static** - Doesn't adapt to traffic patterns
- **Direction locked** - Must finish direction before reversing

</div>

</div>

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Add stop | O(1) with Set | O(1) |
| Get next stop | O(n) worst case | O(1) |
| Find best elevator | O(e) where e = elevators | O(1) |
| **Total Space** | - | O(f × e) where f = floors |

**Memory per elevator:**
- Current floor: 4 bytes
- Direction: 4 bytes
- Up stops set: O(f) where f = floors
- Down stops set: O(f)

---

## Common Extensions

1. **Capacity limits**: Don't assign more passengers than capacity
2. **VIP mode**: Express service for executives
3. **Fire mode**: All elevators go to ground floor
4. **Maintenance mode**: Take elevator offline
5. **Peak hour optimization**: Pre-position during rush hours

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Start with single elevator** - Then extend to multiple
2. **Draw the state machine** - Shows systematic thinking
3. **Explain SCAN algorithm** - Classic disk scheduling parallel
4. **Discuss assignment strategy** - How to pick which elevator
5. **Consider edge cases**:
   - All elevators busy
   - Elevator breakdown
   - Simultaneous requests at same floor

**Common Follow-ups:**
- How to handle rush hour (morning/evening)?
- How to prioritize emergency requests?
- How to implement maintenance mode?
- How to handle capacity limits?

</div>

---

## Implementation

### Python

```python
from enum import Enum
from typing import List, Optional, Set
from dataclasses import dataclass, field
from collections import defaultdict
import heapq
import threading
import time


class Direction(Enum):
    UP = 1
    DOWN = -1
    IDLE = 0


class ElevatorState(Enum):
    MOVING = "moving"
    STOPPED = "stopped"
    DOORS_OPEN = "doors_open"


@dataclass
class Request:
    floor: int
    direction: Direction
    timestamp: float = field(default_factory=time.time)


class Elevator:
    def __init__(self, elevator_id: int, min_floor: int = 0, max_floor: int = 10):
        self.id = elevator_id
        self.current_floor = 0
        self.direction = Direction.IDLE
        self.state = ElevatorState.STOPPED
        self.min_floor = min_floor
        self.max_floor = max_floor

        # Destinations in current direction
        self.up_stops: Set[int] = set()
        self.down_stops: Set[int] = set()

        self.lock = threading.Lock()

    def add_stop(self, floor: int, direction: Direction = None) -> bool:
        """Add a floor to the elevator's stops."""
        with self.lock:
            if floor < self.min_floor or floor > self.max_floor:
                return False

            if direction == Direction.UP or (direction is None and floor > self.current_floor):
                self.up_stops.add(floor)
            elif direction == Direction.DOWN or (direction is None and floor < self.current_floor):
                self.down_stops.add(floor)
            elif floor == self.current_floor:
                # Already at floor
                return True
            else:
                # Determine based on current direction
                if self.direction == Direction.UP:
                    self.up_stops.add(floor)
                else:
                    self.down_stops.add(floor)

            return True

    def get_next_stop(self) -> Optional[int]:
        """Get the next floor to stop at."""
        with self.lock:
            if self.direction == Direction.UP or self.direction == Direction.IDLE:
                # Continue up if there are stops above
                above = [f for f in self.up_stops if f > self.current_floor]
                if above:
                    return min(above)

                # Check for down stops at highest floor first
                if self.down_stops:
                    return max(self.down_stops)

                # Check remaining up stops below current floor
                if self.up_stops:
                    return min(self.up_stops)

            if self.direction == Direction.DOWN or self.direction == Direction.IDLE:
                # Continue down if there are stops below
                below = [f for f in self.down_stops if f < self.current_floor]
                if below:
                    return max(below)

                # Check for up stops at lowest floor first
                if self.up_stops:
                    return min(self.up_stops)

                # Check remaining down stops above current floor
                if self.down_stops:
                    return max(self.down_stops)

            return None

    def move(self) -> bool:
        """Move elevator one step toward next stop."""
        next_stop = self.get_next_stop()

        if next_stop is None:
            self.direction = Direction.IDLE
            self.state = ElevatorState.STOPPED
            return False

        with self.lock:
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

    def has_stops(self) -> bool:
        return len(self.up_stops) > 0 or len(self.down_stops) > 0

    def distance_to(self, floor: int, direction: Direction) -> int:
        """Calculate effective distance to serve a request."""
        if self.direction == Direction.IDLE:
            return abs(self.current_floor - floor)

        # If going same direction and floor is on the way
        if self.direction == Direction.UP and direction == Direction.UP:
            if floor >= self.current_floor:
                return floor - self.current_floor

        if self.direction == Direction.DOWN and direction == Direction.DOWN:
            if floor <= self.current_floor:
                return self.current_floor - floor

        # Need to reverse direction
        if self.direction == Direction.UP:
            max_stop = max(self.up_stops) if self.up_stops else self.current_floor
            return (max_stop - self.current_floor) + (max_stop - floor)
        else:
            min_stop = min(self.down_stops) if self.down_stops else self.current_floor
            return (self.current_floor - min_stop) + (floor - min_stop)

    def status(self) -> dict:
        return {
            'id': self.id,
            'floor': self.current_floor,
            'direction': self.direction.name,
            'state': self.state.value,
            'up_stops': sorted(self.up_stops),
            'down_stops': sorted(self.down_stops)
        }


class ElevatorController:
    def __init__(self, num_elevators: int, num_floors: int):
        self.elevators = [Elevator(i, 0, num_floors) for i in range(num_elevators)]
        self.num_floors = num_floors
        self.pending_requests: List[Request] = []
        self.lock = threading.Lock()
        self.running = False

    def request_elevator(self, floor: int, direction: Direction) -> int:
        """Request an elevator to a floor."""
        best_elevator = self._find_best_elevator(floor, direction)
        best_elevator.add_stop(floor, direction)
        return best_elevator.id

    def _find_best_elevator(self, floor: int, direction: Direction) -> Elevator:
        """Find the optimal elevator for a request."""
        best = None
        best_distance = float('inf')

        for elevator in self.elevators:
            distance = elevator.distance_to(floor, direction)

            # Prefer idle elevators
            if elevator.direction == Direction.IDLE:
                distance -= 0.5

            # Prefer elevators going same direction on the way
            if elevator.direction == direction:
                if direction == Direction.UP and elevator.current_floor <= floor:
                    distance -= 1
                elif direction == Direction.DOWN and elevator.current_floor >= floor:
                    distance -= 1

            if distance < best_distance:
                best_distance = distance
                best = elevator

        return best

    def select_floor(self, elevator_id: int, floor: int):
        """Passenger selects destination floor inside elevator."""
        if 0 <= elevator_id < len(self.elevators):
            self.elevators[elevator_id].add_stop(floor)

    def step(self):
        """Advance all elevators one step."""
        for elevator in self.elevators:
            arrived = elevator.move()
            if arrived:
                print(f"Elevator {elevator.id} arrived at floor {elevator.current_floor}")

    def run(self, step_interval: float = 1.0):
        """Run the elevator system continuously."""
        self.running = True
        while self.running:
            self.step()
            time.sleep(step_interval)

    def stop(self):
        self.running = False

    def display_status(self):
        print("\n=== Elevator System Status ===")
        for elevator in self.elevators:
            status = elevator.status()
            dir_symbol = {"UP": "↑", "DOWN": "↓", "IDLE": "•"}[status['direction']]
            print(f"Elevator {status['id']}: Floor {status['floor']} {dir_symbol} "
                  f"[State: {status['state']}]")
            if status['up_stops']:
                print(f"  Up stops: {status['up_stops']}")
            if status['down_stops']:
                print(f"  Down stops: {status['down_stops']}")


# Usage
controller = ElevatorController(num_elevators=3, num_floors=10)

# Simulate requests
print("=== Elevator Requests ===")

# Person at floor 0 wants to go up
e1 = controller.request_elevator(0, Direction.UP)
print(f"Request at floor 0 (UP) -> Elevator {e1}")

# Person at floor 7 wants to go down
e2 = controller.request_elevator(7, Direction.DOWN)
print(f"Request at floor 7 (DOWN) -> Elevator {e2}")

# Person at floor 3 wants to go up
e3 = controller.request_elevator(3, Direction.UP)
print(f"Request at floor 3 (UP) -> Elevator {e3}")

# Passengers select destinations
controller.select_floor(e1, 5)  # Go to floor 5
controller.select_floor(e2, 2)  # Go to floor 2
controller.select_floor(e3, 8)  # Go to floor 8

# Simulate movement
print("\n=== Simulation ===")
for _ in range(15):
    controller.step()
    controller.display_status()
    time.sleep(0.5)
```

### Go

```go
package main

import (
	"fmt"
	"math"
	"sync"
	"time"
)

type Direction int

const (
	Up   Direction = 1
	Down Direction = -1
	Idle Direction = 0
)

func (d Direction) String() string {
	switch d {
	case Up:
		return "UP"
	case Down:
		return "DOWN"
	default:
		return "IDLE"
	}
}

type ElevatorState int

const (
	Moving ElevatorState = iota
	Stopped
	DoorsOpen
)

type Elevator struct {
	ID           int
	CurrentFloor int
	Direction    Direction
	State        ElevatorState
	MinFloor     int
	MaxFloor     int
	UpStops      map[int]bool
	DownStops    map[int]bool
	mu           sync.Mutex
}

func NewElevator(id, minFloor, maxFloor int) *Elevator {
	return &Elevator{
		ID:           id,
		CurrentFloor: 0,
		Direction:    Idle,
		State:        Stopped,
		MinFloor:     minFloor,
		MaxFloor:     maxFloor,
		UpStops:      make(map[int]bool),
		DownStops:    make(map[int]bool),
	}
}

func (e *Elevator) AddStop(floor int, direction Direction) bool {
	e.mu.Lock()
	defer e.mu.Unlock()

	if floor < e.MinFloor || floor > e.MaxFloor {
		return false
	}

	if direction == Up || (direction == Idle && floor > e.CurrentFloor) {
		e.UpStops[floor] = true
	} else if direction == Down || (direction == Idle && floor < e.CurrentFloor) {
		e.DownStops[floor] = true
	} else if e.Direction == Up {
		e.UpStops[floor] = true
	} else {
		e.DownStops[floor] = true
	}

	return true
}

func (e *Elevator) GetNextStop() int {
	e.mu.Lock()
	defer e.mu.Unlock()

	if e.Direction == Up || e.Direction == Idle {
		// Get next stop above
		minAbove := e.MaxFloor + 1
		for floor := range e.UpStops {
			if floor > e.CurrentFloor && floor < minAbove {
				minAbove = floor
			}
		}
		if minAbove <= e.MaxFloor {
			return minAbove
		}

		// Get highest down stop
		if len(e.DownStops) > 0 {
			maxDown := e.MinFloor - 1
			for floor := range e.DownStops {
				if floor > maxDown {
					maxDown = floor
				}
			}
			return maxDown
		}

		// Get remaining up stops
		if len(e.UpStops) > 0 {
			minUp := e.MaxFloor + 1
			for floor := range e.UpStops {
				if floor < minUp {
					minUp = floor
				}
			}
			return minUp
		}
	}

	if e.Direction == Down || e.Direction == Idle {
		// Get next stop below
		maxBelow := e.MinFloor - 1
		for floor := range e.DownStops {
			if floor < e.CurrentFloor && floor > maxBelow {
				maxBelow = floor
			}
		}
		if maxBelow >= e.MinFloor {
			return maxBelow
		}

		// Get lowest up stop
		if len(e.UpStops) > 0 {
			minUp := e.MaxFloor + 1
			for floor := range e.UpStops {
				if floor < minUp {
					minUp = floor
				}
			}
			return minUp
		}

		// Get remaining down stops
		if len(e.DownStops) > 0 {
			maxDown := e.MinFloor - 1
			for floor := range e.DownStops {
				if floor > maxDown {
					maxDown = floor
				}
			}
			return maxDown
		}
	}

	return -1
}

func (e *Elevator) Move() bool {
	nextStop := e.GetNextStop()

	if nextStop == -1 {
		e.mu.Lock()
		e.Direction = Idle
		e.State = Stopped
		e.mu.Unlock()
		return false
	}

	e.mu.Lock()
	defer e.mu.Unlock()

	if nextStop > e.CurrentFloor {
		e.Direction = Up
		e.CurrentFloor++
	} else if nextStop < e.CurrentFloor {
		e.Direction = Down
		e.CurrentFloor--
	}

	e.State = Moving

	// Check if arrived
	if e.UpStops[e.CurrentFloor] {
		delete(e.UpStops, e.CurrentFloor)
		e.State = DoorsOpen
		return true
	}
	if e.DownStops[e.CurrentFloor] {
		delete(e.DownStops, e.CurrentFloor)
		e.State = DoorsOpen
		return true
	}

	return false
}

func (e *Elevator) HasStops() bool {
	e.mu.Lock()
	defer e.mu.Unlock()
	return len(e.UpStops) > 0 || len(e.DownStops) > 0
}

func (e *Elevator) DistanceTo(floor int, direction Direction) float64 {
	e.mu.Lock()
	defer e.mu.Unlock()

	if e.Direction == Idle {
		return math.Abs(float64(e.CurrentFloor - floor))
	}

	// Same direction and on the way
	if e.Direction == Up && direction == Up && floor >= e.CurrentFloor {
		return float64(floor - e.CurrentFloor)
	}
	if e.Direction == Down && direction == Down && floor <= e.CurrentFloor {
		return float64(e.CurrentFloor - floor)
	}

	// Need to reverse
	if e.Direction == Up {
		maxStop := e.CurrentFloor
		for f := range e.UpStops {
			if f > maxStop {
				maxStop = f
			}
		}
		return float64(maxStop-e.CurrentFloor) + float64(maxStop-floor)
	}

	minStop := e.CurrentFloor
	for f := range e.DownStops {
		if f < minStop {
			minStop = f
		}
	}
	return float64(e.CurrentFloor-minStop) + float64(floor-minStop)
}

type ElevatorController struct {
	Elevators []*Elevator
	NumFloors int
	running   bool
	mu        sync.Mutex
}

func NewElevatorController(numElevators, numFloors int) *ElevatorController {
	elevators := make([]*Elevator, numElevators)
	for i := 0; i < numElevators; i++ {
		elevators[i] = NewElevator(i, 0, numFloors)
	}
	return &ElevatorController{
		Elevators: elevators,
		NumFloors: numFloors,
	}
}

func (c *ElevatorController) RequestElevator(floor int, direction Direction) int {
	best := c.findBestElevator(floor, direction)
	best.AddStop(floor, direction)
	return best.ID
}

func (c *ElevatorController) findBestElevator(floor int, direction Direction) *Elevator {
	var best *Elevator
	bestDistance := math.MaxFloat64

	for _, elevator := range c.Elevators {
		distance := elevator.DistanceTo(floor, direction)

		// Prefer idle elevators
		if elevator.Direction == Idle {
			distance -= 0.5
		}

		// Prefer same direction on the way
		if elevator.Direction == direction {
			if direction == Up && elevator.CurrentFloor <= floor {
				distance -= 1
			} else if direction == Down && elevator.CurrentFloor >= floor {
				distance -= 1
			}
		}

		if distance < bestDistance {
			bestDistance = distance
			best = elevator
		}
	}

	return best
}

func (c *ElevatorController) SelectFloor(elevatorID, floor int) {
	if elevatorID >= 0 && elevatorID < len(c.Elevators) {
		c.Elevators[elevatorID].AddStop(floor, Idle)
	}
}

func (c *ElevatorController) Step() {
	for _, elevator := range c.Elevators {
		arrived := elevator.Move()
		if arrived {
			fmt.Printf("Elevator %d arrived at floor %d\n", elevator.ID, elevator.CurrentFloor)
		}
	}
}

func (c *ElevatorController) DisplayStatus() {
	fmt.Println("\n=== Elevator Status ===")
	for _, e := range c.Elevators {
		symbol := map[Direction]string{Up: "↑", Down: "↓", Idle: "•"}[e.Direction]
		fmt.Printf("Elevator %d: Floor %d %s\n", e.ID, e.CurrentFloor, symbol)
	}
}

func main() {
	controller := NewElevatorController(3, 10)

	// Requests
	e1 := controller.RequestElevator(0, Up)
	fmt.Printf("Request at floor 0 (UP) -> Elevator %d\n", e1)

	e2 := controller.RequestElevator(7, Down)
	fmt.Printf("Request at floor 7 (DOWN) -> Elevator %d\n", e2)

	e3 := controller.RequestElevator(3, Up)
	fmt.Printf("Request at floor 3 (UP) -> Elevator %d\n", e3)

	// Destinations
	controller.SelectFloor(e1, 5)
	controller.SelectFloor(e2, 2)
	controller.SelectFloor(e3, 8)

	// Simulate
	for i := 0; i < 15; i++ {
		controller.Step()
		controller.DisplayStatus()
		time.Sleep(500 * time.Millisecond)
	}
}
```
