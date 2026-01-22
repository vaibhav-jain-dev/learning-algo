# Event Sourcing

## Overview

Event Sourcing is an architectural pattern where you store all changes to application state as a sequence of events, rather than storing just the current state. Think of it like a bank statement - instead of just showing your current balance, it shows every transaction that led to that balance.

When you need the current state, you replay all events from the beginning (or from a snapshot) to reconstruct it. This gives you a complete audit trail and the ability to understand exactly how you got to any particular state.

---

## Why This Matters

### Real Company Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Companies Using Event Sourcing</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e293b; font-weight: 600;">Netflix - Viewing History</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Netflix stores every play, pause, seek, and completion event. This enables "Continue Watching" features, personalized recommendations, and analytics on viewing patterns across millions of users.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
      <div style="color: #1e293b; font-weight: 600;">Stripe - Payment Processing</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Every payment state change is an event: created, authorized, captured, refunded. This provides complete audit trails for financial compliance and enables rebuilding payment states for dispute resolution.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #1e293b; font-weight: 600;">LinkedIn - Activity Feed</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Posts, likes, comments, and shares are all events. This enables building multiple views (feed, notifications, analytics) from the same event stream without duplicating business logic.</div>
    </div>
  </div>
</div>

**Key Benefits:**
- **Complete audit trail**: Every change is recorded with timestamp and context
- **Temporal queries**: Answer "what was the state at time X?"
- **Debugging**: Replay events to reproduce bugs exactly
- **Flexibility**: Build new read models from existing events
- **Compliance**: Financial and healthcare regulations often require event history

---

## How It Works

### Traditional vs Event Sourcing

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">State Storage Comparison</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px;">Traditional (CRUD)</div>
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 13px; color: #475569;">
        User: {<br>
        &nbsp;&nbsp;id: 123,<br>
        &nbsp;&nbsp;name: "Alice",<br>
        &nbsp;&nbsp;balance: 150<br>
        }
      </div>
      <div style="color: #64748b; font-size: 13px; margin-top: 8px;">Only current state stored. History is lost.</div>
    </div>

    <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 12px;">Event Sourcing</div>
      <div style="background: white; border: 1px solid #d1fae5; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px; color: #047857;">
        1. AccountCreated {id: 123, name: "Alice"}<br>
        2. MoneyDeposited {amount: 200}<br>
        3. MoneyWithdrawn {amount: 50}<br>
        <div style="color: #10b981; margin-top: 8px;">→ Replay = balance: 150</div>
      </div>
      <div style="color: #059669; font-size: 13px; margin-top: 8px;">Complete history. Can rebuild any point in time.</div>
    </div>
  </div>
</div>

### Core Components

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Architecture</h4>

  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Command</div>
        <div style="font-size: 12px;">User Intent</div>
      </div>
      <div style="color: #64748b;">→</div>
      <div style="background: #8b5cf6; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Aggregate</div>
        <div style="font-size: 12px;">Business Logic</div>
      </div>
      <div style="color: #64748b;">→</div>
      <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Event</div>
        <div style="font-size: 12px;">Fact Recorded</div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px; margin-left: 300px;">
      <div style="color: #64748b;">↓</div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px; margin-left: 240px;">
      <div style="background: #f59e0b; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Event Store</div>
        <div style="font-size: 12px;">Append-Only Log</div>
      </div>
      <div style="color: #64748b;">→</div>
      <div style="background: #ec4899; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Projection</div>
        <div style="font-size: 12px;">Read Model</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 13px;">
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Event Store</div>
      <div style="color: #64748b;">Immutable, append-only log of all events</div>
    </div>
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Aggregate</div>
      <div style="color: #64748b;">Domain entity that produces and applies events</div>
    </div>
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Projection</div>
      <div style="color: #64748b;">Read model built by processing events</div>
    </div>
  </div>
</div>

### Event Flow

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Processing a Command</h4>

  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #eff6ff; border-radius: 8px;">
      <div style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">1</div>
      <div style="color: #1e40af;"><strong>Load Events:</strong> Retrieve all events for the aggregate from the event store</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f5f3ff; border-radius: 8px;">
      <div style="background: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">2</div>
      <div style="color: #5b21b6;"><strong>Replay Events:</strong> Apply each event to rebuild current state</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #ecfdf5; border-radius: 8px;">
      <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">3</div>
      <div style="color: #065f46;"><strong>Validate Command:</strong> Check if command is valid against current state</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fef3c7; border-radius: 8px;">
      <div style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">4</div>
      <div style="color: #92400e;"><strong>Produce Events:</strong> Generate new events representing state changes</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fce7f3; border-radius: 8px;">
      <div style="background: #ec4899; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">5</div>
      <div style="color: #9d174d;"><strong>Persist Events:</strong> Append new events to event store (with optimistic concurrency)</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f1f5f9; border-radius: 8px;">
      <div style="background: #64748b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">6</div>
      <div style="color: #334155;"><strong>Update Projections:</strong> Asynchronously update read models</div>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

### LMAX Exchange Architecture Evolution

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">How Event Sourcing Solved a Performance Crisis</h4>

  <div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #991b1b; font-weight: 600;">The Challenge</div>
    <div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
      LMAX, a financial exchange, needed to process 6 million orders per second with microsecond latency. Traditional database-backed systems couldn't handle the throughput requirements, and they needed complete audit trails for regulatory compliance.
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #1e293b; font-weight: 600;">Traditional Approach Problems</div>
    <div style="color: #475569; font-size: 14px; margin-top: 8px;">
      <div style="padding: 4px 0;">Database writes: 1-10ms latency (too slow)</div>
      <div style="padding: 4px 0;">Audit logging: Separate system, consistency issues</div>
      <div style="padding: 4px 0;">Recovery: Complex, incomplete state restoration</div>
      <div style="padding: 4px 0;">Debugging: No way to replay production issues</div>
    </div>
  </div>

  <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600;">Event Sourcing Solution</div>
    <div style="color: #047857; font-size: 14px; margin-top: 8px;">
      <div>1. All state changes stored as events in an append-only journal</div>
      <div>2. In-memory processing with journal replay for recovery</div>
      <div>3. Complete audit trail built into the architecture</div>
      <div>4. Can replay any day's events to reproduce issues</div>
      <div style="margin-top: 8px; font-weight: 600;">Result: 6 million transactions/second with &lt;1ms latency</div>
    </div>
  </div>
</div>

---

## Implementation

### Complete Event Sourcing System

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict, Optional, Any, Callable
from abc import ABC, abstractmethod
import uuid
import json


# ============ Events ============

@dataclass
class Event:
    """Base class for all domain events."""
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    aggregate_id: str = ""
    aggregate_type: str = ""
    event_type: str = ""
    data: Dict[str, Any] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)
    version: int = 0
    timestamp: datetime = field(default_factory=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            "event_id": self.event_id,
            "aggregate_id": self.aggregate_id,
            "aggregate_type": self.aggregate_type,
            "event_type": self.event_type,
            "data": self.data,
            "metadata": self.metadata,
            "version": self.version,
            "timestamp": self.timestamp.isoformat()
        }


# ============ Event Store ============

class EventStore:
    """
    Append-only store for events with optimistic concurrency.

    In production, use EventStoreDB, PostgreSQL, or Kafka.
    """

    def __init__(self):
        self._events: List[Event] = []
        self._streams: Dict[str, List[Event]] = {}
        self._subscribers: List[Callable[[Event], None]] = []

    def append(self, aggregate_id: str, events: List[Event],
               expected_version: int) -> None:
        """
        Append events with optimistic concurrency control.

        Raises ConcurrencyError if expected_version doesn't match.
        """
        if aggregate_id not in self._streams:
            self._streams[aggregate_id] = []

        current_version = len(self._streams[aggregate_id])

        if expected_version != current_version:
            raise ConcurrencyError(
                f"Expected version {expected_version}, "
                f"but stream is at version {current_version}"
            )

        for i, event in enumerate(events):
            event.version = current_version + i + 1
            event.aggregate_id = aggregate_id
            self._events.append(event)
            self._streams[aggregate_id].append(event)

            # Notify subscribers
            for subscriber in self._subscribers:
                subscriber(event)

    def get_events(self, aggregate_id: str,
                   from_version: int = 0) -> List[Event]:
        """Get events for an aggregate starting from a version."""
        if aggregate_id not in self._streams:
            return []

        return [e for e in self._streams[aggregate_id]
                if e.version > from_version]

    def get_all_events(self, from_position: int = 0) -> List[Event]:
        """Get all events across all aggregates (for projections)."""
        return self._events[from_position:]

    def subscribe(self, handler: Callable[[Event], None]) -> None:
        """Subscribe to new events (for real-time projections)."""
        self._subscribers.append(handler)


class ConcurrencyError(Exception):
    """Raised when optimistic concurrency check fails."""
    pass


# ============ Aggregates ============

class Aggregate(ABC):
    """
    Base class for domain aggregates.

    Aggregates produce events and rebuild state from events.
    """

    def __init__(self):
        self.id: str = ""
        self.version: int = 0
        self._pending_events: List[Event] = []

    @abstractmethod
    def apply(self, event: Event) -> None:
        """Apply an event to update aggregate state."""
        pass

    def load_from_events(self, events: List[Event]) -> None:
        """Reconstruct aggregate state by replaying events."""
        for event in events:
            self.apply(event)
            self.version = event.version

    def add_event(self, event_type: str, data: dict) -> None:
        """Record a new event (to be persisted)."""
        event = Event(
            aggregate_type=self.__class__.__name__,
            event_type=event_type,
            data=data,
            version=self.version + len(self._pending_events) + 1
        )
        self._pending_events.append(event)
        self.apply(event)

    def get_pending_events(self) -> List[Event]:
        return self._pending_events.copy()

    def clear_pending_events(self) -> None:
        self._pending_events.clear()


class BankAccount(Aggregate):
    """
    Example aggregate: A bank account with event-sourced state.
    """

    def __init__(self):
        super().__init__()
        self.owner: str = ""
        self.balance: float = 0.0
        self.is_closed: bool = False
        self.transaction_count: int = 0

    def apply(self, event: Event) -> None:
        """Apply event to update account state."""
        if event.event_type == "AccountOpened":
            self.id = event.aggregate_id or event.data.get("account_id", "")
            self.owner = event.data["owner"]
            self.balance = event.data.get("initial_balance", 0.0)

        elif event.event_type == "MoneyDeposited":
            self.balance += event.data["amount"]
            self.transaction_count += 1

        elif event.event_type == "MoneyWithdrawn":
            self.balance -= event.data["amount"]
            self.transaction_count += 1

        elif event.event_type == "AccountClosed":
            self.is_closed = True

    # Command handlers

    @classmethod
    def open(cls, account_id: str, owner: str,
             initial_balance: float = 0.0) -> "BankAccount":
        """Command: Open a new account."""
        account = cls()
        account.id = account_id
        account.add_event("AccountOpened", {
            "account_id": account_id,
            "owner": owner,
            "initial_balance": initial_balance
        })
        return account

    def deposit(self, amount: float, description: str = "") -> None:
        """Command: Deposit money into account."""
        if self.is_closed:
            raise InvalidOperationError("Cannot deposit to closed account")
        if amount <= 0:
            raise InvalidOperationError("Deposit amount must be positive")

        self.add_event("MoneyDeposited", {
            "amount": amount,
            "description": description
        })

    def withdraw(self, amount: float, description: str = "") -> None:
        """Command: Withdraw money from account."""
        if self.is_closed:
            raise InvalidOperationError("Cannot withdraw from closed account")
        if amount <= 0:
            raise InvalidOperationError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise InvalidOperationError(
                f"Insufficient funds. Balance: {self.balance}, "
                f"Requested: {amount}"
            )

        self.add_event("MoneyWithdrawn", {
            "amount": amount,
            "description": description
        })

    def close(self) -> None:
        """Command: Close the account."""
        if self.is_closed:
            raise InvalidOperationError("Account is already closed")
        if self.balance != 0:
            raise InvalidOperationError(
                "Cannot close account with non-zero balance"
            )

        self.add_event("AccountClosed", {})


class InvalidOperationError(Exception):
    """Raised when a command violates business rules."""
    pass


# ============ Repository ============

class Repository:
    """
    Repository pattern for loading and saving aggregates.
    """

    def __init__(self, event_store: EventStore, aggregate_class: type):
        self.event_store = event_store
        self.aggregate_class = aggregate_class

    def get(self, aggregate_id: str) -> Optional[Aggregate]:
        """Load an aggregate by replaying its events."""
        events = self.event_store.get_events(aggregate_id)

        if not events:
            return None

        aggregate = self.aggregate_class()
        aggregate.load_from_events(events)
        return aggregate

    def save(self, aggregate: Aggregate) -> None:
        """Persist pending events with optimistic concurrency."""
        pending = aggregate.get_pending_events()

        if not pending:
            return

        expected_version = aggregate.version - len(pending)
        self.event_store.append(aggregate.id, pending, expected_version)
        aggregate.clear_pending_events()


# ============ Projections ============

class Projection(ABC):
    """
    Base class for read model projections.

    Projections build queryable views from events.
    """

    @abstractmethod
    def handle(self, event: Event) -> None:
        """Process an event to update the projection."""
        pass


class AccountBalanceProjection(Projection):
    """Simple projection: account_id -> balance."""

    def __init__(self):
        self.balances: Dict[str, float] = {}

    def handle(self, event: Event) -> None:
        if event.event_type == "AccountOpened":
            self.balances[event.aggregate_id] = event.data.get(
                "initial_balance", 0.0
            )
        elif event.event_type == "MoneyDeposited":
            self.balances[event.aggregate_id] += event.data["amount"]
        elif event.event_type == "MoneyWithdrawn":
            self.balances[event.aggregate_id] -= event.data["amount"]
        elif event.event_type == "AccountClosed":
            del self.balances[event.aggregate_id]

    def get_balance(self, account_id: str) -> Optional[float]:
        return self.balances.get(account_id)


class AccountSummaryProjection(Projection):
    """Rich projection with multiple fields per account."""

    def __init__(self):
        self.accounts: Dict[str, dict] = {}

    def handle(self, event: Event) -> None:
        if event.event_type == "AccountOpened":
            self.accounts[event.aggregate_id] = {
                "owner": event.data["owner"],
                "balance": event.data.get("initial_balance", 0.0),
                "transaction_count": 0,
                "opened_at": event.timestamp,
                "last_activity": event.timestamp,
                "status": "active"
            }

        elif event.event_type in ["MoneyDeposited", "MoneyWithdrawn"]:
            account = self.accounts.get(event.aggregate_id)
            if account:
                delta = event.data["amount"]
                if event.event_type == "MoneyWithdrawn":
                    delta = -delta
                account["balance"] += delta
                account["transaction_count"] += 1
                account["last_activity"] = event.timestamp

        elif event.event_type == "AccountClosed":
            account = self.accounts.get(event.aggregate_id)
            if account:
                account["status"] = "closed"
                account["closed_at"] = event.timestamp

    def get_account(self, account_id: str) -> Optional[dict]:
        return self.accounts.get(account_id)

    def get_active_accounts(self) -> List[dict]:
        return [a for a in self.accounts.values() if a["status"] == "active"]


class ProjectionManager:
    """Manages multiple projections and keeps them in sync."""

    def __init__(self, event_store: EventStore):
        self.event_store = event_store
        self.projections: List[Projection] = []
        self.position: int = 0

    def register(self, projection: Projection) -> None:
        """Register a projection to receive events."""
        self.projections.append(projection)

    def rebuild_all(self) -> None:
        """Rebuild all projections from scratch."""
        self.position = 0
        for projection in self.projections:
            projection.__init__()  # Reset state
        self.catch_up()

    def catch_up(self) -> None:
        """Process any new events since last catch_up."""
        events = self.event_store.get_all_events(self.position)

        for event in events:
            for projection in self.projections:
                projection.handle(event)
            self.position += 1


# ============ Snapshots ============

@dataclass
class Snapshot:
    """Snapshot of aggregate state for faster loading."""
    aggregate_id: str
    aggregate_type: str
    version: int
    state: dict
    created_at: datetime = field(default_factory=datetime.utcnow)


class SnapshotStore:
    """Store for aggregate snapshots."""

    def __init__(self, snapshot_frequency: int = 100):
        self.snapshots: Dict[str, Snapshot] = {}
        self.snapshot_frequency = snapshot_frequency

    def should_snapshot(self, version: int) -> bool:
        return version % self.snapshot_frequency == 0

    def save(self, aggregate: Aggregate, state: dict) -> None:
        """Save a snapshot of the aggregate."""
        self.snapshots[aggregate.id] = Snapshot(
            aggregate_id=aggregate.id,
            aggregate_type=aggregate.__class__.__name__,
            version=aggregate.version,
            state=state
        )

    def get(self, aggregate_id: str) -> Optional[Snapshot]:
        """Get the latest snapshot for an aggregate."""
        return self.snapshots.get(aggregate_id)


# ============ Usage Example ============

def main():
    # Set up infrastructure
    event_store = EventStore()
    repo = Repository(event_store, BankAccount)

    # Set up projections
    balance_projection = AccountBalanceProjection()
    summary_projection = AccountSummaryProjection()
    projection_manager = ProjectionManager(event_store)
    projection_manager.register(balance_projection)
    projection_manager.register(summary_projection)

    # Subscribe projections to real-time updates
    event_store.subscribe(balance_projection.handle)
    event_store.subscribe(summary_projection.handle)

    # Create and use an account
    account = BankAccount.open("acc-001", "Alice", initial_balance=100.0)
    repo.save(account)

    # Perform operations
    account.deposit(50.0, "Paycheck")
    account.withdraw(30.0, "Groceries")
    repo.save(account)

    # Query via projection (fast)
    balance = balance_projection.get_balance("acc-001")
    print(f"Balance from projection: ${balance}")  # $120.0

    # Query via aggregate (replay events)
    loaded = repo.get("acc-001")
    print(f"Balance from replay: ${loaded.balance}")  # $120.0

    # Get rich account data
    summary = summary_projection.get_account("acc-001")
    print(f"Transaction count: {summary['transaction_count']}")  # 2


if __name__ == "__main__":
    main()
```

### Event Schema Evolution

```python
class EventUpcaster:
    """
    Transform old event schemas to current version.

    Never modify stored events - upcast on read instead.
    """

    def __init__(self):
        self.upcasters = {}

    def register(self, event_type: str, from_version: int,
                 upcaster: Callable[[dict], dict]) -> None:
        """Register an upcaster for a specific event type and version."""
        key = (event_type, from_version)
        self.upcasters[key] = upcaster

    def upcast(self, event: dict) -> dict:
        """Apply all necessary upcasters to bring event to current schema."""
        event_type = event["event_type"]
        version = event.get("schema_version", 1)

        while True:
            key = (event_type, version)
            if key not in self.upcasters:
                break

            event = self.upcasters[key](event)
            version += 1

        event["schema_version"] = version
        return event


# Example: Evolving AccountOpened event
def upcast_account_opened_v1_to_v2(event: dict) -> dict:
    """V1 had 'name', V2 renamed to 'owner'."""
    data = event["data"].copy()
    data["owner"] = data.pop("name", "Unknown")
    return {**event, "data": data}


def upcast_account_opened_v2_to_v3(event: dict) -> dict:
    """V3 added 'currency' field with default."""
    data = event["data"].copy()
    data.setdefault("currency", "USD")
    return {**event, "data": data}


# Usage
upcaster = EventUpcaster()
upcaster.register("AccountOpened", 1, upcast_account_opened_v1_to_v2)
upcaster.register("AccountOpened", 2, upcast_account_opened_v2_to_v3)
```

---

## Interview Questions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

### Q1: When should you use Event Sourcing vs traditional CRUD?

**Use Event Sourcing when:**
- Complete audit trail is a requirement (finance, healthcare, legal)
- You need temporal queries ("what was the state on March 15?")
- Complex domain with many state transitions
- Multiple read models needed from the same data
- Debugging production issues requires exact replay

**Use CRUD when:**
- Simple domain with straightforward state
- No audit requirements
- High-frequency updates to same records
- Team unfamiliar with event sourcing patterns
- Query patterns are simple and predictable

### Q2: How do you handle large event streams efficiently?

**Answer:**

1. **Snapshots**: Periodically save aggregate state. Load from snapshot + replay only newer events.
```python
def load_with_snapshot(aggregate_id):
    snapshot = snapshot_store.get(aggregate_id)
    if snapshot:
        aggregate.restore_from_snapshot(snapshot)
        events = event_store.get_events(aggregate_id, from_version=snapshot.version)
    else:
        events = event_store.get_events(aggregate_id)
    aggregate.load_from_events(events)
```

2. **Event archiving**: Move old events to cold storage, keep recent events hot

3. **Aggregate design**: Keep aggregates small with bounded event streams

4. **Parallel projection rebuild**: Partition events and process in parallel

### Q3: How do you ensure consistency between the event store and projections?

**Answer:**

Projections are eventually consistent by design. To manage this:

1. **Idempotent handlers**: Projections must handle duplicate events safely
2. **Position tracking**: Store the last processed event position
3. **Replay capability**: Rebuild projections from events at any time
4. **Ordering guarantees**: Process events in order per aggregate

For stronger consistency, use the Outbox Pattern:
- Write events to database table in same transaction as projection update
- Background process publishes events to message bus

### Q4: How do you handle event schema changes?

**Answer:**

**Golden Rule**: Never modify stored events. Events are immutable facts.

**Strategies:**
1. **Upcasting**: Transform old events to new schema on read
2. **Event versioning**: Include schema_version in events
3. **Copy-and-transform**: Create new events from old (for major changes)
4. **Weak schema**: Design events with optional fields

**Example upcaster chain:**
```
V1: {name: "Alice"}
  → V2: {owner: "Alice"}
  → V3: {owner: "Alice", currency: "USD"}
```

### Q5: What is CQRS and how does it relate to Event Sourcing?

**Answer:**

CQRS (Command Query Responsibility Segregation) separates read and write models:
- **Write side**: Receives commands, produces events
- **Read side**: Optimized projections for queries

Event Sourcing and CQRS are complementary:
- Event Sourcing provides the write model (append-only event log)
- CQRS provides multiple read models (projections built from events)

Benefits together:
- Write model optimized for consistency (events)
- Read models optimized for specific queries (denormalized views)
- Can scale read and write sides independently

</div>

---

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Anti-Patterns</h4>

  <div style="display: grid; gap: 12px;">
    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Storing CRUD operations as events</div>
      <div style="color: #7f1d1d; font-size: 14px;">Events should represent domain facts ("OrderPlaced"), not database operations ("OrderRowInserted"). Capture business intent, not technical actions.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Large aggregates with too many events</div>
      <div style="color: #7f1d1d; font-size: 14px;">If an aggregate has thousands of events, loading becomes slow. Use snapshots, or redesign aggregates to be smaller and more focused.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Modifying stored events</div>
      <div style="color: #7f1d1d; font-size: 14px;">Events are immutable historical facts. Use upcasting to transform old schemas on read, never modify the stored event data.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Non-idempotent projection handlers</div>
      <div style="color: #7f1d1d; font-size: 14px;">Projections may receive duplicate events during replays or failures. Handlers must produce the same result when applied multiple times.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Querying the event store directly</div>
      <div style="color: #7f1d1d; font-size: 14px;">Event stores are optimized for append and replay, not ad-hoc queries. Build projections for query needs instead of scanning events.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Ignoring eventual consistency in UX</div>
      <div style="color: #7f1d1d; font-size: 14px;">Projections lag behind writes. Design UI to handle this - show optimistic updates, indicate "syncing" state, or use read-your-writes consistency.</div>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Event Design Principles</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;">Events are past tense facts (OrderPlaced)</div>
        <div style="padding: 4px 0;">Include all data needed to understand the change</div>
        <div style="padding: 4px 0;">Events are immutable - never modify</div>
        <div style="padding: 4px 0;">Use domain language, not technical terms</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Event Store Technologies</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>EventStoreDB:</strong> Purpose-built for ES</div>
        <div style="padding: 4px 0;"><strong>PostgreSQL:</strong> With append-only table</div>
        <div style="padding: 4px 0;"><strong>Kafka:</strong> As an event log</div>
        <div style="padding: 4px 0;"><strong>DynamoDB:</strong> With version attribute</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Performance Strategies</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;">Snapshots every N events (50-100)</div>
        <div style="padding: 4px 0;">Keep aggregates small</div>
        <div style="padding: 4px 0;">Parallel projection rebuilds</div>
        <div style="padding: 4px 0;">Archive old events to cold storage</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Consistency Patterns</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>Optimistic concurrency:</strong> Version checks</div>
        <div style="padding: 4px 0;"><strong>Projections:</strong> Eventually consistent</div>
        <div style="padding: 4px 0;"><strong>Outbox pattern:</strong> Reliable publishing</div>
        <div style="padding: 4px 0;"><strong>Idempotency:</strong> Safe replay</div>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [CQRS Pattern](/topic/design-patterns/cqrs) - Separating read and write models
- [Message Queues](/topic/system-design/message-queues) - Publishing events to subscribers
- [Distributed Locking](/topic/system-design/distributed-locking) - Concurrency control
- [Microservices](/topic/system-design/microservices) - Event-driven architecture
