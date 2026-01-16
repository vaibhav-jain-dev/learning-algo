# State Pattern

## Overview

The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class by delegating state-specific behavior to separate state objects.

## Key Concepts

### When to Use

- Object behavior depends on its state
- Complex conditional logic based on state
- State transitions need to be explicit
- Need to add new states without changing existing code

### Structure

<div id="state-pattern-diagram" class="diagram-container light"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const diagram = new StateMachineDiagram('state-pattern-diagram', {
        width: 700,
        height: 350,
        nodeRadius: 45,
        states: [
            { id: 'Context', initial: true, description: 'holds state' },
            { id: 'State', highlighted: false, description: 'interface' },
            { id: 'StateA', highlighted: false, description: 'concrete' },
            { id: 'StateB', highlighted: false, description: 'concrete' }
        ],
        transitions: [
            { from: 'Context', to: 'State', label: 'uses' },
            { from: 'State', to: 'StateA', label: 'implements' },
            { from: 'State', to: 'StateB', label: 'implements' }
        ]
    });
    diagramEngine.register('state-pattern-diagram', diagram);
    diagram.render();
});
</script>

## Implementation

### Python - Order State Machine

```python
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

class OrderState(ABC):
    @abstractmethod
    def confirm(self, order: 'Order') -> None:
        pass

    @abstractmethod
    def ship(self, order: 'Order') -> None:
        pass

    @abstractmethod
    def deliver(self, order: 'Order') -> None:
        pass

    @abstractmethod
    def cancel(self, order: 'Order') -> None:
        pass

    @abstractmethod
    def get_status(self) -> str:
        pass


class PendingState(OrderState):
    def confirm(self, order: 'Order') -> None:
        print("Order confirmed! Processing payment...")
        order.set_state(ConfirmedState())

    def ship(self, order: 'Order') -> None:
        print("Cannot ship: Order not confirmed yet")

    def deliver(self, order: 'Order') -> None:
        print("Cannot deliver: Order not shipped yet")

    def cancel(self, order: 'Order') -> None:
        print("Order cancelled")
        order.set_state(CancelledState())

    def get_status(self) -> str:
        return "Pending"


class ConfirmedState(OrderState):
    def confirm(self, order: 'Order') -> None:
        print("Order already confirmed")

    def ship(self, order: 'Order') -> None:
        print("Order shipped!")
        order.tracking_number = f"TRACK-{order.id}"
        order.set_state(ShippedState())

    def deliver(self, order: 'Order') -> None:
        print("Cannot deliver: Order not shipped yet")

    def cancel(self, order: 'Order') -> None:
        print("Cancelling confirmed order. Refund initiated...")
        order.set_state(CancelledState())

    def get_status(self) -> str:
        return "Confirmed"


class ShippedState(OrderState):
    def confirm(self, order: 'Order') -> None:
        print("Order already confirmed and shipped")

    def ship(self, order: 'Order') -> None:
        print("Order already shipped")

    def deliver(self, order: 'Order') -> None:
        print("Order delivered!")
        order.delivered_at = datetime.now()
        order.set_state(DeliveredState())

    def cancel(self, order: 'Order') -> None:
        print("Cannot cancel: Order already shipped")

    def get_status(self) -> str:
        return "Shipped"


class DeliveredState(OrderState):
    def confirm(self, order: 'Order') -> None:
        print("Order already delivered")

    def ship(self, order: 'Order') -> None:
        print("Order already delivered")

    def deliver(self, order: 'Order') -> None:
        print("Order already delivered")

    def cancel(self, order: 'Order') -> None:
        print("Cannot cancel: Order already delivered. Please initiate return.")

    def get_status(self) -> str:
        return "Delivered"


class CancelledState(OrderState):
    def confirm(self, order: 'Order') -> None:
        print("Cannot confirm: Order cancelled")

    def ship(self, order: 'Order') -> None:
        print("Cannot ship: Order cancelled")

    def deliver(self, order: 'Order') -> None:
        print("Cannot deliver: Order cancelled")

    def cancel(self, order: 'Order') -> None:
        print("Order already cancelled")

    def get_status(self) -> str:
        return "Cancelled"


class Order:
    def __init__(self, order_id: str):
        self.id = order_id
        self._state: OrderState = PendingState()
        self.tracking_number: Optional[str] = None
        self.delivered_at: Optional[datetime] = None

    def set_state(self, state: OrderState) -> None:
        print(f"State changed: {self._state.get_status()} -> {state.get_status()}")
        self._state = state

    def confirm(self) -> None:
        self._state.confirm(self)

    def ship(self) -> None:
        self._state.ship(self)

    def deliver(self) -> None:
        self._state.deliver(self)

    def cancel(self) -> None:
        self._state.cancel(self)

    def get_status(self) -> str:
        return self._state.get_status()


# Usage
order = Order("ORD-001")
print(f"Initial status: {order.get_status()}")

order.ship()  # Cannot ship: not confirmed
order.confirm()  # Confirmed
order.confirm()  # Already confirmed
order.ship()  # Shipped
order.cancel()  # Cannot cancel: shipped
order.deliver()  # Delivered
```

### Go - Connection State Machine

```go
package main

import (
	"fmt"
	"time"
)

// State interface
type ConnectionState interface {
	Connect(conn *Connection)
	Disconnect(conn *Connection)
	Send(conn *Connection, data string)
	Receive(conn *Connection) string
	GetState() string
}

// Context
type Connection struct {
	state   ConnectionState
	address string
	buffer  []string
}

func NewConnection(address string) *Connection {
	conn := &Connection{
		address: address,
		buffer:  make([]string, 0),
	}
	conn.state = &DisconnectedState{}
	return conn
}

func (c *Connection) SetState(state ConnectionState) {
	fmt.Printf("Connection state: %s -> %s\n", c.state.GetState(), state.GetState())
	c.state = state
}

func (c *Connection) Connect() {
	c.state.Connect(c)
}

func (c *Connection) Disconnect() {
	c.state.Disconnect(c)
}

func (c *Connection) Send(data string) {
	c.state.Send(c, data)
}

func (c *Connection) Receive() string {
	return c.state.Receive(c)
}

func (c *Connection) GetState() string {
	return c.state.GetState()
}

// Disconnected State
type DisconnectedState struct{}

func (s *DisconnectedState) Connect(conn *Connection) {
	fmt.Printf("Connecting to %s...\n", conn.address)
	conn.SetState(&ConnectingState{})

	// Simulate async connection
	go func() {
		time.Sleep(500 * time.Millisecond)
		if conn.state.GetState() == "Connecting" {
			conn.SetState(&ConnectedState{})
		}
	}()
}

func (s *DisconnectedState) Disconnect(conn *Connection) {
	fmt.Println("Already disconnected")
}

func (s *DisconnectedState) Send(conn *Connection, data string) {
	fmt.Println("Cannot send: not connected")
}

func (s *DisconnectedState) Receive(conn *Connection) string {
	fmt.Println("Cannot receive: not connected")
	return ""
}

func (s *DisconnectedState) GetState() string {
	return "Disconnected"
}

// Connecting State
type ConnectingState struct{}

func (s *ConnectingState) Connect(conn *Connection) {
	fmt.Println("Already connecting...")
}

func (s *ConnectingState) Disconnect(conn *Connection) {
	fmt.Println("Canceling connection...")
	conn.SetState(&DisconnectedState{})
}

func (s *ConnectingState) Send(conn *Connection, data string) {
	fmt.Println("Cannot send: still connecting")
}

func (s *ConnectingState) Receive(conn *Connection) string {
	fmt.Println("Cannot receive: still connecting")
	return ""
}

func (s *ConnectingState) GetState() string {
	return "Connecting"
}

// Connected State
type ConnectedState struct{}

func (s *ConnectedState) Connect(conn *Connection) {
	fmt.Println("Already connected")
}

func (s *ConnectedState) Disconnect(conn *Connection) {
	fmt.Println("Disconnecting...")
	conn.SetState(&DisconnectedState{})
}

func (s *ConnectedState) Send(conn *Connection, data string) {
	fmt.Printf("Sending: %s\n", data)
	conn.buffer = append(conn.buffer, data)
}

func (s *ConnectedState) Receive(conn *Connection) string {
	if len(conn.buffer) > 0 {
		data := conn.buffer[0]
		conn.buffer = conn.buffer[1:]
		return data
	}
	return ""
}

func (s *ConnectedState) GetState() string {
	return "Connected"
}

func main() {
	conn := NewConnection("example.com:8080")

	fmt.Println("Initial state:", conn.GetState())

	conn.Send("Hello")  // Cannot send: not connected
	conn.Connect()      // Connecting...

	time.Sleep(100 * time.Millisecond)
	conn.Send("Hello")  // Cannot send: still connecting

	time.Sleep(500 * time.Millisecond)
	fmt.Println("Current state:", conn.GetState())

	conn.Send("Hello, Server!")
	conn.Send("How are you?")

	fmt.Println("Received:", conn.Receive())
	fmt.Println("Received:", conn.Receive())

	conn.Disconnect()
}
```

## Common Interview Questions

1. **State vs Strategy?**
   - State: Behavior changes based on internal state
   - Strategy: Client chooses algorithm

2. **Who decides state transitions?**
   - States can transition themselves
   - Or context can manage transitions

3. **How to persist state?**
   - Store state name/type
   - Recreate state object on load

## Best Practices

1. **Single responsibility** - Each state handles one state's behavior
2. **Complete interface** - All states implement all methods
3. **Clear transitions** - Document valid state changes
4. **Consider null object** - For initial/unknown states
5. **Avoid state explosion** - Too many states = complexity

## Related Patterns

- [Strategy](/topic/design-patterns/strategy) - Similar structure, different intent
- [Command](/topic/design-patterns/command) - Encapsulate actions
- [Memento](/topic/design-patterns/memento) - Save/restore state
