# Event Sourcing

## Overview

Event Sourcing is an architectural pattern where application state is stored as a sequence of events. Instead of storing current state, you store all changes (events) that led to the current state. The current state can be reconstructed by replaying events.

## Key Concepts

### Traditional vs Event Sourcing

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #30363d;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #8b949e; border-radius: 50%;"></div>
      <span style="color: #c9d1d9; font-weight: 600; font-size: 16px;">Traditional (State-based)</span>
    </div>
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 20px; font-family: monospace; font-size: 14px; text-align: center;">
      <span style="color: #c9d1d9;">User: { </span><span style="color: #58a6ff;">balance</span><span style="color: #c9d1d9;">: </span><span style="color: #7ee787;">150</span><span style="color: #c9d1d9;"> }</span>
    </div>
    <div style="text-align: center; margin-top: 16px; color: #8b949e; font-size: 13px;">
      Only current state stored
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #58a6ff33;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #58a6ff; border-radius: 50%;"></div>
      <span style="color: #58a6ff; font-weight: 600; font-size: 16px;">Event Sourcing</span>
    </div>
    <div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #30363d;">
        <span style="color: #8b949e;">1.</span>
        <span style="color: #d2a8ff;">AccountCreated</span>
        <span style="color: #8b949e;">{ balance: </span><span style="color: #7ee787;">0</span><span style="color: #8b949e;"> }</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #30363d;">
        <span style="color: #8b949e;">2.</span>
        <span style="color: #7ee787;">MoneyDeposited</span>
        <span style="color: #8b949e;">{ amount: </span><span style="color: #7ee787;">100</span><span style="color: #8b949e;"> }</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #30363d;">
        <span style="color: #8b949e;">3.</span>
        <span style="color: #7ee787;">MoneyDeposited</span>
        <span style="color: #8b949e;">{ amount: </span><span style="color: #7ee787;">100</span><span style="color: #8b949e;"> }</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0;">
        <span style="color: #8b949e;">4.</span>
        <span style="color: #f85149;">MoneyWithdrawn</span>
        <span style="color: #8b949e;">{ amount: </span><span style="color: #f85149;">50</span><span style="color: #8b949e;"> }</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 16px;">
      <span style="color: #58a6ff; font-size: 20px;">|</span>
      <span style="color: #58a6ff; font-size: 12px;">Replay</span>
      <span style="color: #58a6ff; font-size: 20px;">v</span>
    </div>
    <div style="background: #23863633; border: 1px solid #238636; border-radius: 8px; padding: 12px; text-align: center; margin-top: 12px;">
      <span style="color: #7ee787; font-weight: 600;">Current balance: 150</span>
    </div>
  </div>
</div>

### Benefits

1. **Complete Audit Trail**: Every change is recorded
2. **Temporal Queries**: Query state at any point in time
3. **Event Replay**: Rebuild state or fix bugs by replaying
4. **Debugging**: Understand exactly what happened
5. **Decoupling**: Events can trigger multiple reactions

### Challenges

1. **Complexity**: More moving parts
2. **Event Schema Evolution**: Changing event formats
3. **Eventual Consistency**: State may lag behind events
4. **Storage**: Events grow over time
5. **Replay Performance**: Large event streams take time

## Core Components

### Event Store

```python
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
import json
import uuid

@dataclass
class Event:
    id: str
    aggregate_id: str
    aggregate_type: str
    event_type: str
    data: dict
    metadata: dict
    version: int
    timestamp: datetime

class EventStore:
    def __init__(self):
        self.events: List[Event] = []
        self.streams: dict = {}  # aggregate_id -> list of events

    def append(self, aggregate_id: str, aggregate_type: str,
               event_type: str, data: dict,
               expected_version: int = None) -> Event:
        """Append event with optimistic concurrency"""

        if aggregate_id not in self.streams:
            self.streams[aggregate_id] = []

        current_version = len(self.streams[aggregate_id])

        # Optimistic concurrency check
        if expected_version is not None and current_version != expected_version:
            raise ConcurrencyError(
                f"Expected version {expected_version}, but found {current_version}"
            )

        event = Event(
            id=str(uuid.uuid4()),
            aggregate_id=aggregate_id,
            aggregate_type=aggregate_type,
            event_type=event_type,
            data=data,
            metadata={'correlation_id': str(uuid.uuid4())},
            version=current_version + 1,
            timestamp=datetime.utcnow()
        )

        self.events.append(event)
        self.streams[aggregate_id].append(event)

        return event

    def get_events(self, aggregate_id: str,
                   from_version: int = 0) -> List[Event]:
        """Get events for an aggregate from a specific version"""
        if aggregate_id not in self.streams:
            return []

        return [e for e in self.streams[aggregate_id]
                if e.version > from_version]

    def get_all_events(self, from_position: int = 0) -> List[Event]:
        """Get all events from a global position"""
        return self.events[from_position:]


class ConcurrencyError(Exception):
    pass
```

### Aggregates

```python
from abc import ABC, abstractmethod

class Aggregate(ABC):
    def __init__(self):
        self.id = None
        self.version = 0
        self._pending_events = []

    @abstractmethod
    def apply(self, event: Event):
        """Apply event to update state"""
        pass

    def load(self, events: List[Event]):
        """Reconstruct state from events"""
        for event in events:
            self.apply(event)
            self.version = event.version

    def add_event(self, event_type: str, data: dict):
        """Add new event (to be persisted)"""
        event = Event(
            id=str(uuid.uuid4()),
            aggregate_id=self.id,
            aggregate_type=self.__class__.__name__,
            event_type=event_type,
            data=data,
            metadata={},
            version=self.version + len(self._pending_events) + 1,
            timestamp=datetime.utcnow()
        )
        self._pending_events.append(event)
        self.apply(event)

    def get_pending_events(self) -> List[Event]:
        return self._pending_events

    def clear_pending_events(self):
        self._pending_events = []


class BankAccount(Aggregate):
    def __init__(self):
        super().__init__()
        self.balance = 0
        self.owner = None
        self.is_closed = False

    def apply(self, event: Event):
        if event.event_type == 'AccountOpened':
            self.id = event.aggregate_id
            self.owner = event.data['owner']
            self.balance = event.data.get('initial_balance', 0)

        elif event.event_type == 'MoneyDeposited':
            self.balance += event.data['amount']

        elif event.event_type == 'MoneyWithdrawn':
            self.balance -= event.data['amount']

        elif event.event_type == 'AccountClosed':
            self.is_closed = True

    @classmethod
    def open(cls, account_id: str, owner: str, initial_balance: float = 0):
        account = cls()
        account.id = account_id
        account.add_event('AccountOpened', {
            'owner': owner,
            'initial_balance': initial_balance
        })
        return account

    def deposit(self, amount: float):
        if self.is_closed:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.add_event('MoneyDeposited', {'amount': amount})

    def withdraw(self, amount: float):
        if self.is_closed:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")

        self.add_event('MoneyWithdrawn', {'amount': amount})

    def close(self):
        if self.balance != 0:
            raise ValueError("Cannot close account with non-zero balance")

        self.add_event('AccountClosed', {})
```

### Repository

```python
class Repository:
    def __init__(self, event_store: EventStore, aggregate_class):
        self.event_store = event_store
        self.aggregate_class = aggregate_class

    def get(self, aggregate_id: str):
        """Load aggregate from events"""
        events = self.event_store.get_events(aggregate_id)

        if not events:
            return None

        aggregate = self.aggregate_class()
        aggregate.load(events)
        return aggregate

    def save(self, aggregate: Aggregate):
        """Persist pending events"""
        pending = aggregate.get_pending_events()

        for event in pending:
            self.event_store.append(
                aggregate_id=aggregate.id,
                aggregate_type=aggregate.__class__.__name__,
                event_type=event.event_type,
                data=event.data,
                expected_version=event.version - 1
            )

        aggregate.clear_pending_events()
```

### Projections (Read Models)

```python
class Projection(ABC):
    @abstractmethod
    def handle(self, event: Event):
        pass

class AccountBalanceProjection(Projection):
    def __init__(self):
        self.balances = {}  # account_id -> balance

    def handle(self, event: Event):
        if event.event_type == 'AccountOpened':
            self.balances[event.aggregate_id] = event.data.get('initial_balance', 0)

        elif event.event_type == 'MoneyDeposited':
            self.balances[event.aggregate_id] += event.data['amount']

        elif event.event_type == 'MoneyWithdrawn':
            self.balances[event.aggregate_id] -= event.data['amount']

        elif event.event_type == 'AccountClosed':
            del self.balances[event.aggregate_id]

    def get_balance(self, account_id: str) -> float:
        return self.balances.get(account_id, 0)


class AccountSummaryProjection(Projection):
    def __init__(self):
        self.accounts = {}

    def handle(self, event: Event):
        if event.event_type == 'AccountOpened':
            self.accounts[event.aggregate_id] = {
                'owner': event.data['owner'],
                'balance': event.data.get('initial_balance', 0),
                'transaction_count': 0,
                'opened_at': event.timestamp,
                'status': 'active'
            }

        elif event.event_type in ['MoneyDeposited', 'MoneyWithdrawn']:
            acc = self.accounts[event.aggregate_id]
            if event.event_type == 'MoneyDeposited':
                acc['balance'] += event.data['amount']
            else:
                acc['balance'] -= event.data['amount']
            acc['transaction_count'] += 1

        elif event.event_type == 'AccountClosed':
            self.accounts[event.aggregate_id]['status'] = 'closed'


class ProjectionManager:
    def __init__(self, event_store: EventStore):
        self.event_store = event_store
        self.projections: List[Projection] = []
        self.position = 0

    def register(self, projection: Projection):
        self.projections.append(projection)

    def rebuild(self):
        """Rebuild all projections from scratch"""
        self.position = 0
        for projection in self.projections:
            projection.__init__()  # Reset state

        self.catch_up()

    def catch_up(self):
        """Process new events"""
        events = self.event_store.get_all_events(self.position)

        for event in events:
            for projection in self.projections:
                projection.handle(event)
            self.position += 1
```

## Implementation Example

### Go - Complete Event Sourcing System

```go
package main

import (
	"encoding/json"
	"errors"
	"sync"
	"time"

	"github.com/google/uuid"
)

// Event represents a domain event
type Event struct {
	ID            string                 `json:"id"`
	AggregateID   string                 `json:"aggregate_id"`
	AggregateType string                 `json:"aggregate_type"`
	EventType     string                 `json:"event_type"`
	Data          map[string]interface{} `json:"data"`
	Metadata      map[string]interface{} `json:"metadata"`
	Version       int                    `json:"version"`
	Timestamp     time.Time              `json:"timestamp"`
}

// EventStore interface
type EventStore interface {
	Append(aggregateID string, events []Event, expectedVersion int) error
	GetEvents(aggregateID string, fromVersion int) ([]Event, error)
	GetAllEvents(fromPosition int) ([]Event, error)
}

// InMemoryEventStore implementation
type InMemoryEventStore struct {
	mu       sync.RWMutex
	events   []Event
	streams  map[string][]Event
	handlers []func(Event)
}

func NewInMemoryEventStore() *InMemoryEventStore {
	return &InMemoryEventStore{
		events:   make([]Event, 0),
		streams:  make(map[string][]Event),
		handlers: make([]func(Event), 0),
	}
}

func (s *InMemoryEventStore) Append(aggregateID string, events []Event, expectedVersion int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	currentVersion := len(s.streams[aggregateID])
	if expectedVersion >= 0 && currentVersion != expectedVersion {
		return errors.New("concurrency conflict")
	}

	for i, event := range events {
		event.Version = currentVersion + i + 1
		event.Timestamp = time.Now()
		event.ID = uuid.New().String()

		s.events = append(s.events, event)
		s.streams[aggregateID] = append(s.streams[aggregateID], event)

		// Notify handlers
		for _, handler := range s.handlers {
			go handler(event)
		}
	}

	return nil
}

func (s *InMemoryEventStore) GetEvents(aggregateID string, fromVersion int) ([]Event, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	stream, exists := s.streams[aggregateID]
	if !exists {
		return []Event{}, nil
	}

	result := make([]Event, 0)
	for _, e := range stream {
		if e.Version > fromVersion {
			result = append(result, e)
		}
	}

	return result, nil
}

func (s *InMemoryEventStore) GetAllEvents(fromPosition int) ([]Event, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if fromPosition >= len(s.events) {
		return []Event{}, nil
	}

	return s.events[fromPosition:], nil
}

func (s *InMemoryEventStore) Subscribe(handler func(Event)) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.handlers = append(s.handlers, handler)
}

// Aggregate base
type Aggregate interface {
	GetID() string
	GetVersion() int
	GetPendingEvents() []Event
	ClearPendingEvents()
	Apply(event Event)
}

// BankAccount aggregate
type BankAccount struct {
	ID            string
	Owner         string
	Balance       float64
	IsClosed      bool
	Version       int
	pendingEvents []Event
}

func (a *BankAccount) GetID() string              { return a.ID }
func (a *BankAccount) GetVersion() int            { return a.Version }
func (a *BankAccount) GetPendingEvents() []Event  { return a.pendingEvents }
func (a *BankAccount) ClearPendingEvents()        { a.pendingEvents = nil }

func (a *BankAccount) Apply(event Event) {
	switch event.EventType {
	case "AccountOpened":
		a.ID = event.AggregateID
		a.Owner = event.Data["owner"].(string)
		if bal, ok := event.Data["initial_balance"].(float64); ok {
			a.Balance = bal
		}

	case "MoneyDeposited":
		a.Balance += event.Data["amount"].(float64)

	case "MoneyWithdrawn":
		a.Balance -= event.Data["amount"].(float64)

	case "AccountClosed":
		a.IsClosed = true
	}

	a.Version = event.Version
}

func (a *BankAccount) addEvent(eventType string, data map[string]interface{}) {
	event := Event{
		AggregateID:   a.ID,
		AggregateType: "BankAccount",
		EventType:     eventType,
		Data:          data,
		Metadata:      make(map[string]interface{}),
	}
	a.pendingEvents = append(a.pendingEvents, event)
	a.Apply(event)
}

func OpenAccount(id, owner string, initialBalance float64) *BankAccount {
	account := &BankAccount{ID: id}
	account.addEvent("AccountOpened", map[string]interface{}{
		"owner":           owner,
		"initial_balance": initialBalance,
	})
	return account
}

func (a *BankAccount) Deposit(amount float64) error {
	if a.IsClosed {
		return errors.New("account is closed")
	}
	if amount <= 0 {
		return errors.New("amount must be positive")
	}

	a.addEvent("MoneyDeposited", map[string]interface{}{
		"amount": amount,
	})
	return nil
}

func (a *BankAccount) Withdraw(amount float64) error {
	if a.IsClosed {
		return errors.New("account is closed")
	}
	if amount <= 0 {
		return errors.New("amount must be positive")
	}
	if amount > a.Balance {
		return errors.New("insufficient funds")
	}

	a.addEvent("MoneyWithdrawn", map[string]interface{}{
		"amount": amount,
	})
	return nil
}

// Repository
type Repository struct {
	store EventStore
}

func NewRepository(store EventStore) *Repository {
	return &Repository{store: store}
}

func (r *Repository) Get(id string) (*BankAccount, error) {
	events, err := r.store.GetEvents(id, 0)
	if err != nil {
		return nil, err
	}

	if len(events) == 0 {
		return nil, errors.New("aggregate not found")
	}

	account := &BankAccount{}
	for _, event := range events {
		account.Apply(event)
	}

	return account, nil
}

func (r *Repository) Save(account *BankAccount) error {
	pending := account.GetPendingEvents()
	if len(pending) == 0 {
		return nil
	}

	expectedVersion := account.GetVersion() - len(pending)
	err := r.store.Append(account.GetID(), pending, expectedVersion)
	if err != nil {
		return err
	}

	account.ClearPendingEvents()
	return nil
}

// Projection
type BalanceProjection struct {
	mu       sync.RWMutex
	balances map[string]float64
}

func NewBalanceProjection() *BalanceProjection {
	return &BalanceProjection{
		balances: make(map[string]float64),
	}
}

func (p *BalanceProjection) Handle(event Event) {
	p.mu.Lock()
	defer p.mu.Unlock()

	switch event.EventType {
	case "AccountOpened":
		if bal, ok := event.Data["initial_balance"].(float64); ok {
			p.balances[event.AggregateID] = bal
		} else {
			p.balances[event.AggregateID] = 0
		}

	case "MoneyDeposited":
		p.balances[event.AggregateID] += event.Data["amount"].(float64)

	case "MoneyWithdrawn":
		p.balances[event.AggregateID] -= event.Data["amount"].(float64)

	case "AccountClosed":
		delete(p.balances, event.AggregateID)
	}
}

func (p *BalanceProjection) GetBalance(id string) float64 {
	p.mu.RLock()
	defer p.mu.RUnlock()
	return p.balances[id]
}

func main() {
	// Create event store and repository
	store := NewInMemoryEventStore()
	repo := NewRepository(store)

	// Create projection
	projection := NewBalanceProjection()
	store.Subscribe(projection.Handle)

	// Create and use account
	account := OpenAccount("acc-1", "Alice", 100)
	repo.Save(account)

	account.Deposit(50)
	account.Withdraw(30)
	repo.Save(account)

	// Query via projection
	time.Sleep(100 * time.Millisecond) // Wait for async projection update
	balance := projection.GetBalance("acc-1")
	println("Balance from projection:", balance) // 120

	// Load from events
	loaded, _ := repo.Get("acc-1")
	println("Balance from replay:", loaded.Balance) // 120

	// Print events
	events, _ := store.GetEvents("acc-1", 0)
	for _, e := range events {
		data, _ := json.Marshal(e)
		println(string(data))
	}
}
```

## Event Schema Evolution

### Versioning Strategies

```python
class EventUpcaster:
    """Transform old event formats to new formats"""

    def upcast(self, event: dict) -> dict:
        event_type = event['event_type']
        version = event.get('schema_version', 1)

        if event_type == 'AccountOpened':
            if version == 1:
                # V1 had 'name', V2 has 'owner'
                event['data']['owner'] = event['data'].pop('name', 'Unknown')
                event['schema_version'] = 2

        return event


class EventDowncaster:
    """Transform new events for old consumers"""

    def downcast(self, event: dict, target_version: int) -> dict:
        # Reverse transformation for backward compatibility
        pass
```

## Common Interview Questions

1. **When should you use Event Sourcing?**
   - Audit requirements
   - Complex domain with many state changes
   - Need to replay/rebuild state
   - Temporal queries are important

2. **How do you handle large event streams?**
   - Snapshots (periodic state capture)
   - Archiving old events
   - Partitioning by aggregate

3. **How do you ensure consistency with projections?**
   - Eventual consistency is expected
   - Idempotent projection handlers
   - Track processed position

4. **How do you handle event schema changes?**
   - Event versioning
   - Upcasters/downcasters
   - Never modify existing events

## Best Practices

1. **Events are immutable** - Never change stored events
2. **Make events domain-centric** - Use business language
3. **Include metadata** - Correlation IDs, timestamps
4. **Use snapshots** - For performance with long streams
5. **Design for replay** - Handlers must be idempotent
6. **Version your events** - Plan for schema evolution

## Related Topics

- [Microservices](/topic/system-design/microservices)
- [Message Queues](/topic/system-design/message-queues)
- [CQRS](/topic/design-patterns/cqrs)
