# Mediator Pattern

## Overview

The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, allowing their interaction to be varied independently.

## Key Concepts

### When to Use

- Objects communicate in complex ways
- Reusing objects is difficult due to dependencies
- Behavior distributed between classes should be customizable
- Want to reduce many-to-many relationships

## Implementation

### Python

```python
from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime


# Abstract Mediator
class ChatMediator(ABC):
    @abstractmethod
    def send_message(self, message: str, sender: 'User', recipient: 'User' = None):
        pass

    @abstractmethod
    def add_user(self, user: 'User'):
        pass

    @abstractmethod
    def remove_user(self, user: 'User'):
        pass


# Colleague
class User(ABC):
    def __init__(self, name: str, mediator: ChatMediator = None):
        self.name = name
        self.mediator = mediator

    def set_mediator(self, mediator: ChatMediator):
        self.mediator = mediator

    def send(self, message: str, recipient: 'User' = None):
        if self.mediator:
            self.mediator.send_message(message, self, recipient)

    @abstractmethod
    def receive(self, message: str, sender: 'User'):
        pass


class RegularUser(User):
    def receive(self, message: str, sender: 'User'):
        print(f"[{self.name}] received from {sender.name}: {message}")


class AdminUser(User):
    def receive(self, message: str, sender: 'User'):
        print(f"[ADMIN {self.name}] received from {sender.name}: {message}")

    def broadcast(self, message: str):
        print(f"[ADMIN {self.name}] broadcasting: {message}")
        self.send(message)  # Send to all


# Concrete Mediator
class ChatRoom(ChatMediator):
    def __init__(self, name: str):
        self.name = name
        self.users: Dict[str, User] = {}
        self.message_history: List[tuple] = []

    def add_user(self, user: User):
        self.users[user.name] = user
        user.set_mediator(self)
        self._broadcast_system(f"{user.name} joined the chat")

    def remove_user(self, user: User):
        if user.name in self.users:
            del self.users[user.name]
            self._broadcast_system(f"{user.name} left the chat")

    def send_message(self, message: str, sender: User, recipient: User = None):
        timestamp = datetime.now()
        self.message_history.append((timestamp, sender.name, message))

        if recipient:
            # Direct message
            if recipient.name in self.users:
                recipient.receive(message, sender)
        else:
            # Broadcast to all except sender
            for name, user in self.users.items():
                if user != sender:
                    user.receive(message, sender)

    def _broadcast_system(self, message: str):
        for user in self.users.values():
            print(f"[SYSTEM] {user.name}: {message}")


# More complex example: Air Traffic Control
class Aircraft:
    def __init__(self, call_sign: str, mediator: 'AirTrafficControl' = None):
        self.call_sign = call_sign
        self.mediator = mediator
        self.altitude = 0
        self.position = (0, 0)

    def set_mediator(self, mediator: 'AirTrafficControl'):
        self.mediator = mediator

    def request_landing(self):
        if self.mediator:
            print(f"[{self.call_sign}] Requesting landing clearance")
            self.mediator.request_landing(self)

    def request_takeoff(self):
        if self.mediator:
            print(f"[{self.call_sign}] Requesting takeoff clearance")
            self.mediator.request_takeoff(self)

    def receive_message(self, message: str):
        print(f"[{self.call_sign}] Received: {message}")


class Runway:
    def __init__(self, name: str):
        self.name = name
        self.occupied = False
        self.current_aircraft: Optional[Aircraft] = None

    def occupy(self, aircraft: Aircraft):
        self.occupied = True
        self.current_aircraft = aircraft

    def release(self):
        self.occupied = False
        self.current_aircraft = None


class AirTrafficControl:
    def __init__(self):
        self.aircraft: Dict[str, Aircraft] = {}
        self.runways: Dict[str, Runway] = {}
        self.landing_queue: List[Aircraft] = []
        self.takeoff_queue: List[Aircraft] = []

    def register_aircraft(self, aircraft: Aircraft):
        self.aircraft[aircraft.call_sign] = aircraft
        aircraft.set_mediator(self)
        print(f"[ATC] {aircraft.call_sign} registered")

    def add_runway(self, runway: Runway):
        self.runways[runway.name] = runway

    def request_landing(self, aircraft: Aircraft):
        # Find available runway
        for runway in self.runways.values():
            if not runway.occupied:
                runway.occupy(aircraft)
                aircraft.receive_message(f"Landing cleared on runway {runway.name}")
                return

        # No runway available, add to queue
        self.landing_queue.append(aircraft)
        aircraft.receive_message(f"Hold position. {len(self.landing_queue)} aircraft ahead")

    def request_takeoff(self, aircraft: Aircraft):
        for runway in self.runways.values():
            if not runway.occupied:
                runway.occupy(aircraft)
                aircraft.receive_message(f"Takeoff cleared on runway {runway.name}")
                # Notify waiting aircraft
                self._notify_next_in_queue()
                return

        self.takeoff_queue.append(aircraft)
        aircraft.receive_message(f"Hold position. {len(self.takeoff_queue)} aircraft ahead")

    def runway_cleared(self, runway_name: str):
        if runway_name in self.runways:
            self.runways[runway_name].release()
            print(f"[ATC] Runway {runway_name} cleared")
            self._notify_next_in_queue()

    def _notify_next_in_queue(self):
        # Prioritize landing over takeoff
        if self.landing_queue:
            next_aircraft = self.landing_queue.pop(0)
            self.request_landing(next_aircraft)
        elif self.takeoff_queue:
            next_aircraft = self.takeoff_queue.pop(0)
            self.request_takeoff(next_aircraft)


# Usage
print("=== Chat Room ===")
chat = ChatRoom("General")

alice = RegularUser("Alice")
bob = RegularUser("Bob")
admin = AdminUser("Admin")

chat.add_user(alice)
chat.add_user(bob)
chat.add_user(admin)

alice.send("Hello everyone!")
bob.send("Hi Alice!", alice)  # Direct message
admin.broadcast("Server maintenance in 10 minutes")

print("\n=== Air Traffic Control ===")
atc = AirTrafficControl()
atc.add_runway(Runway("27L"))
atc.add_runway(Runway("27R"))

flight1 = Aircraft("AA123")
flight2 = Aircraft("UA456")
flight3 = Aircraft("DL789")

atc.register_aircraft(flight1)
atc.register_aircraft(flight2)
atc.register_aircraft(flight3)

flight1.request_landing()
flight2.request_landing()
flight3.request_landing()  # Will queue

atc.runway_cleared("27L")  # flight3 can now land
```

### Go

```go
package main

import "fmt"

// Mediator interface
type ChatMediator interface {
	SendMessage(message string, sender *User, recipient *User)
	AddUser(user *User)
}

// Colleague
type User struct {
	Name     string
	mediator ChatMediator
}

func NewUser(name string) *User {
	return &User{Name: name}
}

func (u *User) SetMediator(m ChatMediator) {
	u.mediator = m
}

func (u *User) Send(message string, recipient *User) {
	if u.mediator != nil {
		u.mediator.SendMessage(message, u, recipient)
	}
}

func (u *User) Receive(message string, sender *User) {
	fmt.Printf("[%s] received from %s: %s\n", u.Name, sender.Name, message)
}

// Concrete Mediator
type ChatRoom struct {
	Name  string
	users map[string]*User
}

func NewChatRoom(name string) *ChatRoom {
	return &ChatRoom{
		Name:  name,
		users: make(map[string]*User),
	}
}

func (c *ChatRoom) AddUser(user *User) {
	c.users[user.Name] = user
	user.SetMediator(c)
	fmt.Printf("[SYSTEM] %s joined the chat\n", user.Name)
}

func (c *ChatRoom) SendMessage(message string, sender *User, recipient *User) {
	if recipient != nil {
		// Direct message
		if user, exists := c.users[recipient.Name]; exists {
			user.Receive(message, sender)
		}
	} else {
		// Broadcast
		for _, user := range c.users {
			if user != sender {
				user.Receive(message, sender)
			}
		}
	}
}

// Air Traffic Control Example
type Aircraft struct {
	CallSign string
	atc      *AirTrafficControl
}

func NewAircraft(callSign string) *Aircraft {
	return &Aircraft{CallSign: callSign}
}

func (a *Aircraft) SetATC(atc *AirTrafficControl) {
	a.atc = atc
}

func (a *Aircraft) RequestLanding() {
	if a.atc != nil {
		fmt.Printf("[%s] Requesting landing\n", a.CallSign)
		a.atc.RequestLanding(a)
	}
}

func (a *Aircraft) Receive(message string) {
	fmt.Printf("[%s] Received: %s\n", a.CallSign, message)
}

type Runway struct {
	Name     string
	Occupied bool
}

type AirTrafficControl struct {
	aircraft     map[string]*Aircraft
	runways      map[string]*Runway
	landingQueue []*Aircraft
}

func NewAirTrafficControl() *AirTrafficControl {
	return &AirTrafficControl{
		aircraft:     make(map[string]*Aircraft),
		runways:      make(map[string]*Runway),
		landingQueue: make([]*Aircraft, 0),
	}
}

func (atc *AirTrafficControl) RegisterAircraft(a *Aircraft) {
	atc.aircraft[a.CallSign] = a
	a.SetATC(atc)
	fmt.Printf("[ATC] %s registered\n", a.CallSign)
}

func (atc *AirTrafficControl) AddRunway(name string) {
	atc.runways[name] = &Runway{Name: name}
}

func (atc *AirTrafficControl) RequestLanding(a *Aircraft) {
	for _, runway := range atc.runways {
		if !runway.Occupied {
			runway.Occupied = true
			a.Receive(fmt.Sprintf("Landing cleared on runway %s", runway.Name))
			return
		}
	}
	atc.landingQueue = append(atc.landingQueue, a)
	a.Receive(fmt.Sprintf("Hold. %d aircraft ahead", len(atc.landingQueue)))
}

func (atc *AirTrafficControl) ClearRunway(name string) {
	if runway, exists := atc.runways[name]; exists {
		runway.Occupied = false
		fmt.Printf("[ATC] Runway %s cleared\n", name)

		if len(atc.landingQueue) > 0 {
			next := atc.landingQueue[0]
			atc.landingQueue = atc.landingQueue[1:]
			atc.RequestLanding(next)
		}
	}
}

func main() {
	// Chat room
	chat := NewChatRoom("General")

	alice := NewUser("Alice")
	bob := NewUser("Bob")

	chat.AddUser(alice)
	chat.AddUser(bob)

	alice.Send("Hello everyone!", nil)
	bob.Send("Hi Alice!", alice)

	// ATC
	fmt.Println("\n=== Air Traffic Control ===")
	atc := NewAirTrafficControl()
	atc.AddRunway("27L")

	flight1 := NewAircraft("AA123")
	flight2 := NewAircraft("UA456")

	atc.RegisterAircraft(flight1)
	atc.RegisterAircraft(flight2)

	flight1.RequestLanding()
	flight2.RequestLanding() // Will queue

	atc.ClearRunway("27L") // flight2 can land
}
```

## Structure

```
     ┌────────────────┐
     │    Mediator    │
     └────────┬───────┘
              │
     ┌────────▼───────┐
     │ConcreteMediator│
     └────────┬───────┘
              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼──┐  ┌───▼──┐  ┌───▼──┐
│Col A │  │Col B │  │Col C │
└──────┘  └──────┘  └──────┘
```

## Best Practices

1. **Single mediator** - One mediator per subsystem
2. **Avoid complexity** - Mediator can become a god object
3. **Notify pattern** - Use observer for notifications
4. **Clear protocols** - Define clear interaction protocols

## Related Patterns

- [Observer](/topic/design-patterns/observer) - Mediator can use observer
- [Facade](/topic/design-patterns/facade) - Similar simplification
- [Command](/topic/design-patterns/command) - Commands through mediator
