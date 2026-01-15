# Elevator System

## Problem Statement

Design an elevator system for a building with multiple floors and elevators. Handle requests efficiently, manage elevator states, and optimize for minimal wait times.

## Requirements

- Multiple elevators serving multiple floors
- Handle pickup and dropoff requests
- Optimal elevator assignment
- Track elevator states (idle, moving up/down)
- Display current status

## Solution

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

## Scheduling Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| FCFS | First come, first served | Simple buildings |
| SSTF | Shortest seek time first | Minimal movement |
| SCAN | Move in one direction, then reverse | High traffic |
| LOOK | Like SCAN but reverses at last request | Efficient |

## Interview Tips

- Discuss elevator assignment strategies (nearest, load balancing)
- Handle edge cases (full elevator, maintenance mode)
- Consider peak hours optimization
- Explain state machine for elevator states
