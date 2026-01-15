# Parking Lot System

## Problem Statement

Design a parking lot system that manages multiple floors, different vehicle types, and ticket-based entry/exit.

## Requirements

- Multiple floors with parking spots
- Different spot sizes (motorcycle, car, truck)
- Ticket generation on entry
- Payment calculation on exit
- Find nearest available spot

## Design

### Classes

1. **ParkingLot**: Main system
2. **Floor**: Contains spots
3. **ParkingSpot**: Individual spot
4. **Vehicle**: Car, Motorcycle, Truck
5. **Ticket**: Entry record
6. **PaymentProcessor**: Calculate fees

## Solution

### Python

```python
from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum
from typing import Optional, List
import uuid

class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    TRUCK = 3


class SpotSize(Enum):
    SMALL = 1    # Motorcycle
    MEDIUM = 2   # Car
    LARGE = 3    # Truck


class Vehicle:
    def __init__(self, license_plate: str, vehicle_type: VehicleType):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type

    def get_required_spot_size(self) -> SpotSize:
        mapping = {
            VehicleType.MOTORCYCLE: SpotSize.SMALL,
            VehicleType.CAR: SpotSize.MEDIUM,
            VehicleType.TRUCK: SpotSize.LARGE
        }
        return mapping[self.vehicle_type]


class ParkingSpot:
    def __init__(self, spot_id: str, floor: int, size: SpotSize):
        self.spot_id = spot_id
        self.floor = floor
        self.size = size
        self.vehicle: Optional[Vehicle] = None

    def is_available(self) -> bool:
        return self.vehicle is None

    def can_fit(self, vehicle: Vehicle) -> bool:
        required = vehicle.get_required_spot_size().value
        return self.is_available() and self.size.value >= required

    def park(self, vehicle: Vehicle) -> bool:
        if self.can_fit(vehicle):
            self.vehicle = vehicle
            return True
        return False

    def unpark(self) -> Optional[Vehicle]:
        vehicle = self.vehicle
        self.vehicle = None
        return vehicle


class Ticket:
    def __init__(self, vehicle: Vehicle, spot: ParkingSpot):
        self.ticket_id = str(uuid.uuid4())[:8]
        self.vehicle = vehicle
        self.spot = spot
        self.entry_time = datetime.now()
        self.exit_time: Optional[datetime] = None
        self.paid = False

    def get_duration_hours(self) -> float:
        end_time = self.exit_time or datetime.now()
        duration = end_time - self.entry_time
        return duration.total_seconds() / 3600


class ParkingFloor:
    def __init__(self, floor_number: int, spots_config: dict):
        self.floor_number = floor_number
        self.spots: List[ParkingSpot] = []
        self._create_spots(spots_config)

    def _create_spots(self, config: dict):
        spot_num = 1
        for size, count in config.items():
            for _ in range(count):
                spot_id = f"F{self.floor_number}-{size.name[0]}{spot_num}"
                self.spots.append(ParkingSpot(spot_id, self.floor_number, size))
                spot_num += 1

    def find_available_spot(self, vehicle: Vehicle) -> Optional[ParkingSpot]:
        for spot in self.spots:
            if spot.can_fit(vehicle):
                return spot
        return None

    def get_available_count(self) -> dict:
        counts = {size: 0 for size in SpotSize}
        for spot in self.spots:
            if spot.is_available():
                counts[spot.size] += 1
        return counts


class PaymentProcessor:
    RATES = {
        VehicleType.MOTORCYCLE: 1.0,  # $1/hour
        VehicleType.CAR: 2.0,          # $2/hour
        VehicleType.TRUCK: 4.0         # $4/hour
    }

    @classmethod
    def calculate_fee(cls, ticket: Ticket) -> float:
        hours = max(1, ticket.get_duration_hours())  # Minimum 1 hour
        rate = cls.RATES[ticket.vehicle.vehicle_type]
        return round(hours * rate, 2)


class ParkingLot:
    def __init__(self, name: str):
        self.name = name
        self.floors: List[ParkingFloor] = []
        self.active_tickets: dict[str, Ticket] = {}  # license_plate -> Ticket
        self.completed_tickets: List[Ticket] = []

    def add_floor(self, spots_config: dict) -> None:
        floor_number = len(self.floors) + 1
        self.floors.append(ParkingFloor(floor_number, spots_config))

    def park_vehicle(self, vehicle: Vehicle) -> Optional[Ticket]:
        if vehicle.license_plate in self.active_tickets:
            print(f"Vehicle {vehicle.license_plate} already parked")
            return None

        # Find spot on any floor (prefer lower floors)
        for floor in self.floors:
            spot = floor.find_available_spot(vehicle)
            if spot:
                spot.park(vehicle)
                ticket = Ticket(vehicle, spot)
                self.active_tickets[vehicle.license_plate] = ticket
                print(f"Parked {vehicle.license_plate} at {spot.spot_id}")
                return ticket

        print(f"No available spot for {vehicle.license_plate}")
        return None

    def unpark_vehicle(self, license_plate: str) -> Optional[float]:
        if license_plate not in self.active_tickets:
            print(f"Vehicle {license_plate} not found")
            return None

        ticket = self.active_tickets.pop(license_plate)
        ticket.exit_time = datetime.now()
        ticket.spot.unpark()

        fee = PaymentProcessor.calculate_fee(ticket)
        ticket.paid = True

        self.completed_tickets.append(ticket)
        print(f"Vehicle {license_plate} exited. Fee: ${fee}")
        return fee

    def get_availability(self) -> dict:
        total = {size: 0 for size in SpotSize}
        for floor in self.floors:
            floor_counts = floor.get_available_count()
            for size, count in floor_counts.items():
                total[size] += count
        return total

    def display_status(self):
        print(f"\n=== {self.name} Status ===")
        for floor in self.floors:
            counts = floor.get_available_count()
            print(f"Floor {floor.floor_number}: ", end="")
            print(" | ".join(f"{s.name}: {c}" for s, c in counts.items()))
        print(f"Active vehicles: {len(self.active_tickets)}")


# Usage
lot = ParkingLot("City Center Parking")

# Add floors with different spot configurations
lot.add_floor({SpotSize.SMALL: 10, SpotSize.MEDIUM: 20, SpotSize.LARGE: 5})
lot.add_floor({SpotSize.SMALL: 5, SpotSize.MEDIUM: 30, SpotSize.LARGE: 10})

# Park vehicles
car1 = Vehicle("ABC-123", VehicleType.CAR)
bike1 = Vehicle("BIKE-001", VehicleType.MOTORCYCLE)
truck1 = Vehicle("TRUCK-99", VehicleType.TRUCK)

lot.park_vehicle(car1)
lot.park_vehicle(bike1)
lot.park_vehicle(truck1)

lot.display_status()

# Exit vehicle
lot.unpark_vehicle("ABC-123")

lot.display_status()
```

### Go

```go
package main

import (
	"fmt"
	"time"
)

type VehicleType int

const (
	Motorcycle VehicleType = iota
	Car
	Truck
)

type SpotSize int

const (
	Small SpotSize = iota
	Medium
	Large
)

type Vehicle struct {
	LicensePlate string
	Type         VehicleType
}

type ParkingSpot struct {
	ID      string
	Floor   int
	Size    SpotSize
	Vehicle *Vehicle
}

func (s *ParkingSpot) IsAvailable() bool {
	return s.Vehicle == nil
}

func (s *ParkingSpot) CanFit(v *Vehicle) bool {
	if !s.IsAvailable() {
		return false
	}
	requiredSize := SpotSize(v.Type)
	return s.Size >= requiredSize
}

type Ticket struct {
	ID        string
	Vehicle   *Vehicle
	Spot      *ParkingSpot
	EntryTime time.Time
	ExitTime  time.Time
}

type ParkingLot struct {
	Name    string
	Floors  [][]*ParkingSpot
	Tickets map[string]*Ticket
}

func NewParkingLot(name string) *ParkingLot {
	return &ParkingLot{
		Name:    name,
		Floors:  make([][]*ParkingSpot, 0),
		Tickets: make(map[string]*Ticket),
	}
}

func (p *ParkingLot) AddFloor(small, medium, large int) {
	floorNum := len(p.Floors) + 1
	spots := make([]*ParkingSpot, 0)

	id := 1
	for i := 0; i < small; i++ {
		spots = append(spots, &ParkingSpot{
			ID:    fmt.Sprintf("F%d-S%d", floorNum, id),
			Floor: floorNum,
			Size:  Small,
		})
		id++
	}
	for i := 0; i < medium; i++ {
		spots = append(spots, &ParkingSpot{
			ID:    fmt.Sprintf("F%d-M%d", floorNum, id),
			Floor: floorNum,
			Size:  Medium,
		})
		id++
	}
	for i := 0; i < large; i++ {
		spots = append(spots, &ParkingSpot{
			ID:    fmt.Sprintf("F%d-L%d", floorNum, id),
			Floor: floorNum,
			Size:  Large,
		})
		id++
	}

	p.Floors = append(p.Floors, spots)
}

func (p *ParkingLot) ParkVehicle(v *Vehicle) *Ticket {
	if _, exists := p.Tickets[v.LicensePlate]; exists {
		fmt.Println("Vehicle already parked")
		return nil
	}

	for _, floor := range p.Floors {
		for _, spot := range floor {
			if spot.CanFit(v) {
				spot.Vehicle = v
				ticket := &Ticket{
					ID:        fmt.Sprintf("T-%d", time.Now().UnixNano()),
					Vehicle:   v,
					Spot:      spot,
					EntryTime: time.Now(),
				}
				p.Tickets[v.LicensePlate] = ticket
				fmt.Printf("Parked %s at %s\n", v.LicensePlate, spot.ID)
				return ticket
			}
		}
	}

	fmt.Println("No available spot")
	return nil
}

func (p *ParkingLot) UnparkVehicle(licensePlate string) float64 {
	ticket, exists := p.Tickets[licensePlate]
	if !exists {
		fmt.Println("Vehicle not found")
		return 0
	}

	ticket.ExitTime = time.Now()
	ticket.Spot.Vehicle = nil
	delete(p.Tickets, licensePlate)

	hours := ticket.ExitTime.Sub(ticket.EntryTime).Hours()
	if hours < 1 {
		hours = 1
	}

	rates := map[VehicleType]float64{Motorcycle: 1, Car: 2, Truck: 4}
	fee := hours * rates[ticket.Vehicle.Type]

	fmt.Printf("Vehicle %s exited. Fee: $%.2f\n", licensePlate, fee)
	return fee
}

func main() {
	lot := NewParkingLot("City Parking")
	lot.AddFloor(10, 20, 5)
	lot.AddFloor(5, 30, 10)

	car := &Vehicle{LicensePlate: "ABC-123", Type: Car}
	bike := &Vehicle{LicensePlate: "BIKE-001", Type: Motorcycle}

	lot.ParkVehicle(car)
	lot.ParkVehicle(bike)

	lot.UnparkVehicle("ABC-123")
}
```

## Extensions

1. **Reservations**: Book spots in advance
2. **Electric charging**: EV charging spots
3. **Multi-entry/exit**: Multiple gates
4. **Subscription**: Monthly passes

## Interview Tips

- Start with core classes and relationships
- Discuss spot allocation strategy
- Consider concurrent access
- Handle edge cases (full lot, invalid tickets)
