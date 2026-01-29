# Observer Pattern

## Overview

The Observer pattern establishes a one-to-many dependency where a subject maintains a list of dependents (observers) and notifies them automatically of state changes. While conceptually simple, production implementations reveal deep complexity around memory management, ordering guarantees, error propagation, and performance under scale.

**Difficulty:** Intermediate to Advanced (Simple concept, treacherous at scale)
**Category:** Behavioral Pattern
**Also Known As:** Publish-Subscribe, Event-Subscriber, Listener, Dependents

---

## Core Mechanism: How Observer Actually Works

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Observer Pattern Internal Flow</h4>
<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

<div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap; justify-content: center;">
<div style="background: #252540; border: 2px solid #569cd6; border-radius: 8px; padding: 16px; min-width: 200px;">
<div style="color: #569cd6; font-weight: bold; margin-bottom: 8px;">Subject</div>
<div style="color: #ce9178; font-size: 13px;">observers: List&lt;Observer&gt;</div>
<div style="color: #ce9178; font-size: 13px;">state: T</div>
<div style="border-top: 1px solid #30363d; margin: 8px 0;"></div>
<div style="color: #dcdcaa; font-size: 13px;">attach(o) / detach(o)</div>
<div style="color: #dcdcaa; font-size: 13px;">notify() / setState()</div>
</div>

<div style="color: #4ecdc4; font-size: 32px;">&#8594;</div>

<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #252540; border: 2px solid #4ecdc4; border-radius: 8px; padding: 12px; min-width: 150px;">
<div style="color: #4ecdc4; font-size: 13px;">Observer A</div>
<div style="color: #888; font-size: 11px;">update(state)</div>
</div>
<div style="background: #252540; border: 2px solid #4ecdc4; border-radius: 8px; padding: 12px; min-width: 150px;">
<div style="color: #4ecdc4; font-size: 13px;">Observer B</div>
<div style="color: #888; font-size: 11px;">update(state)</div>
</div>
<div style="background: #252540; border: 2px solid #4ecdc4; border-radius: 8px; padding: 12px; min-width: 150px;">
<div style="color: #4ecdc4; font-size: 13px;">Observer N</div>
<div style="color: #888; font-size: 11px;">update(state)</div>
</div>
</div>
</div>

<div style="background: #1e3a5f; border-radius: 8px; padding: 16px; width: 90%; margin-top: 16px;">
<div style="color: #4ecdc4; font-weight: bold; margin-bottom: 8px;">Notification Sequence</div>
<div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
<div style="color: #ddd; font-size: 12px;">1. State changes</div>
<div style="color: #888;">&#8594;</div>
<div style="color: #ddd; font-size: 12px;">2. notify() called</div>
<div style="color: #888;">&#8594;</div>
<div style="color: #ddd; font-size: 12px;">3. Iterate observers</div>
<div style="color: #888;">&#8594;</div>
<div style="color: #ddd; font-size: 12px;">4. Call update()</div>
</div>
</div>
</div>
</div>

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Key Assumption:</strong> The Observer pattern assumes observers are independent and can be notified in any order. When this assumption breaks, you have hidden temporal coupling that leads to subtle bugs.
</div>

### The Registration Mechanism

When an observer registers with a subject, several things happen internally:

```python
class Subject:
    def __init__(self):
        self._observers: List[Observer] = []
        self._state = None
        self._lock = threading.RLock()  # For thread safety

    def attach(self, observer: Observer) -> None:
        """
        Registration adds observer to internal collection.

        Critical decisions here:
        1. Duplicate check - allow same observer twice?
        2. Collection type - list (ordered) vs set (fast lookup)?
        3. Thread safety - lock during modification?
        4. Weak vs strong reference - who owns the observer lifecycle?
        """
        with self._lock:
            if observer not in self._observers:  # O(n) check
                self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        """
        Deregistration - but what if we're mid-notification?
        """
        with self._lock:
            try:
                self._observers.remove(observer)
            except ValueError:
                pass  # Already removed or never registered
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Trade-off - Collection Choice:</strong>
<ul style="margin: 8px 0 0 0; color: #ddd;">
<li><strong>List:</strong> Preserves registration order, O(n) contains check, allows duplicates if unchecked</li>
<li><strong>Set:</strong> O(1) contains check, no duplicates, but loses ordering guarantees</li>
<li><strong>OrderedDict:</strong> O(1) lookup + ordering, but more memory overhead</li>
</ul>
</div>

### Interview Questions - Core Mechanism

<details>
<summary><strong>Level 1: What happens internally when notify() is called?</strong></summary>

The subject iterates through its observer collection and calls each observer's update method, typically passing either the new state (push) or a reference to itself (pull).

```python
def notify(self):
    for observer in self._observers:
        observer.update(self._state)
```

<details>
<summary><strong>Level 2: What problems arise if an observer calls detach() during notify()?</strong></summary>

This causes a concurrent modification problem. If we're iterating over `self._observers` and an observer removes itself during its `update()` call, the iterator becomes invalid. Solutions:

1. **Copy the list before iteration:** `for observer in list(self._observers):`
2. **Defer removals:** Mark for removal, process after iteration completes
3. **Use concurrent-safe collections:** `CopyOnWriteArrayList` in Java

```python
def notify(self):
    # Safe: iterate over a snapshot
    observers_snapshot = list(self._observers)
    for observer in observers_snapshot:
        observer.update(self._state)
```

<details>
<summary><strong>Level 3: How would you handle an observer that throws an exception during update()?</strong></summary>

This is a critical design decision with multiple valid approaches:

**Option 1: Fail Fast (stop all notifications)**
```python
def notify(self):
    for observer in list(self._observers):
        observer.update(self._state)  # Exception bubbles up
```
- Use when: All observers are critical, partial notification is worse than none
- Risk: One bad observer blocks all others

**Option 2: Fail Safe (continue with others)**
```python
def notify(self):
    errors = []
    for observer in list(self._observers):
        try:
            observer.update(self._state)
        except Exception as e:
            errors.append((observer, e))
            logger.error(f"Observer {observer} failed: {e}")
    if errors:
        raise ObserverNotificationError(errors)
```
- Use when: Observers are independent, partial notification is acceptable
- Risk: Silent failures if not logged properly

**Option 3: Circuit Breaker Pattern**
```python
def notify(self):
    for observer in list(self._observers):
        if self._circuit_breaker.is_open(observer):
            continue  # Skip failing observer temporarily
        try:
            observer.update(self._state)
            self._circuit_breaker.record_success(observer)
        except Exception as e:
            self._circuit_breaker.record_failure(observer)
```
- Use when: You want automatic recovery from transient failures

</details>
</details>
</details>

---

## Push vs Pull: The Fundamental Design Decision

The most critical architectural decision in Observer implementation is how data flows from subject to observer.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Push vs Pull Model Comparison</h4>
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">

<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-top: 4px solid #569cd6;">
<h5 style="color: #569cd6; margin-top: 0;">Push Model</h5>
<div style="color: #888; font-size: 12px; margin-bottom: 12px;">Subject sends data to observers</div>
<div style="background: #1a1a2e; border-radius: 4px; padding: 12px; margin-bottom: 12px;">
<code style="color: #dcdcaa; font-size: 12px;">observer.update(changed_data)</code>
</div>
<div style="color: #ddd; font-size: 13px;">
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Single call per observer</div>
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Observer gets data immediately</div>
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Lower latency</div>
<div style="margin-bottom: 8px;"><span style="color: #f85149;">-</span> Subject must know observer needs</div>
<div style="margin-bottom: 8px;"><span style="color: #f85149;">-</span> May send unnecessary data</div>
<div><span style="color: #f85149;">-</span> Tight data coupling</div>
</div>
</div>

<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-top: 4px solid #4ecdc4;">
<h5 style="color: #4ecdc4; margin-top: 0;">Pull Model</h5>
<div style="color: #888; font-size: 12px; margin-bottom: 12px;">Observer requests data from subject</div>
<div style="background: #1a1a2e; border-radius: 4px; padding: 12px; margin-bottom: 12px;">
<code style="color: #dcdcaa; font-size: 12px;">observer.update(subject_ref)</code>
</div>
<div style="color: #ddd; font-size: 13px;">
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Observer controls what it fetches</div>
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Subject stays simple</div>
<div style="margin-bottom: 8px;"><span style="color: #4ecdc4;">+</span> Loose coupling</div>
<div style="margin-bottom: 8px;"><span style="color: #f85149;">-</span> Multiple calls to subject</div>
<div style="margin-bottom: 8px;"><span style="color: #f85149;">-</span> State may change between pulls</div>
<div><span style="color: #f85149;">-</span> Higher latency</div>
</div>
</div>

</div>
</div>

### Push Model Implementation

```python
class PushSubject:
    """Subject pushes complete state change information to observers."""

    def __init__(self):
        self._observers: List[Observer] = []
        self._temperature: float = 0.0
        self._humidity: float = 0.0
        self._pressure: float = 0.0

    def set_measurements(self, temp: float, humidity: float, pressure: float):
        self._temperature = temp
        self._humidity = humidity
        self._pressure = pressure
        self._notify_observers()

    def _notify_observers(self):
        # Push all data - observer has no choice
        measurement_data = {
            'temperature': self._temperature,
            'humidity': self._humidity,
            'pressure': self._pressure,
            'timestamp': datetime.now()
        }
        for observer in self._observers:
            observer.update(measurement_data)


class TemperatureDisplay:
    """Observer that only cares about temperature."""

    def update(self, data: dict):
        # Receives ALL data, uses only temperature
        # Wasteful if temperature didn't change
        temp = data['temperature']
        print(f"Temperature: {temp}C")
```

### Pull Model Implementation

```python
class PullSubject:
    """Subject notifies, observer pulls what it needs."""

    def __init__(self):
        self._observers: List[Observer] = []
        self._temperature: float = 0.0
        self._humidity: float = 0.0
        self._pressure: float = 0.0

    def set_measurements(self, temp: float, humidity: float, pressure: float):
        self._temperature = temp
        self._humidity = humidity
        self._pressure = pressure
        self._notify_observers()

    def _notify_observers(self):
        # Just signal that something changed
        for observer in self._observers:
            observer.update(self)  # Pass reference to self

    # Getters for observers to pull
    def get_temperature(self) -> float:
        return self._temperature

    def get_humidity(self) -> float:
        return self._humidity

    def get_pressure(self) -> float:
        return self._pressure


class TemperatureDisplay:
    """Observer pulls only what it needs."""

    def update(self, subject: PullSubject):
        # Pull only temperature - efficient
        temp = subject.get_temperature()
        print(f"Temperature: {temp}C")
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Critical Trade-off - State Consistency:</strong> In pull model, if observer A pulls temperature, then subject changes, then observer B pulls temperature, they see different values from the same notification. Push model guarantees all observers see the same snapshot.
</div>

### Hybrid Model (Production Best Practice)

```python
class HybridSubject:
    """
    Push a change summary, allow pull for details.
    Best of both worlds.
    """

    def __init__(self):
        self._observers: Dict[str, List[Observer]] = defaultdict(list)
        self._state: Dict[str, Any] = {}

    def subscribe(self, event_type: str, observer: Observer):
        """Subscribe to specific event types."""
        self._observers[event_type].append(observer)

    def set_state(self, key: str, value: Any):
        old_value = self._state.get(key)
        self._state[key] = value

        # Push: Tell observers WHAT changed and the new value
        # Pull: Also pass self for additional data if needed
        change_event = ChangeEvent(
            key=key,
            old_value=old_value,
            new_value=value,
            timestamp=datetime.now(),
            subject=self  # For pull access
        )

        self._notify(key, change_event)

    def _notify(self, event_type: str, event: ChangeEvent):
        # Notify specific subscribers
        for observer in self._observers.get(event_type, []):
            observer.on_change(event)

        # Notify wildcard subscribers
        for observer in self._observers.get('*', []):
            observer.on_change(event)

    def get_state(self, key: str) -> Any:
        """Pull interface for observers needing more data."""
        return self._state.get(key)


@dataclass
class ChangeEvent:
    key: str
    old_value: Any
    new_value: Any
    timestamp: datetime
    subject: 'HybridSubject'  # For pull access
```

### Interview Questions - Push vs Pull

<details>
<summary><strong>Level 1: When would you choose push over pull?</strong></summary>

Choose **push** when:
- All observers need the same data
- Data is small and changes infrequently
- Latency is critical (real-time systems)
- You want guaranteed consistent snapshots

Choose **pull** when:
- Observers need different subsets of data
- Data is large (video frames, large documents)
- Observers may not need data for every notification
- Subject shouldn't know observer requirements

<details>
<summary><strong>Level 2: How do you handle the pull model's consistency problem?</strong></summary>

The consistency problem: Between notification and pull, state may change. Solutions:

**1. Version/Sequence Numbers:**
```python
class VersionedSubject:
    def __init__(self):
        self._version = 0
        self._state = {}

    def update_state(self, key, value):
        self._version += 1
        self._state[key] = value
        self._notify(self._version)

    def get_state_at_version(self, version: int) -> Optional[dict]:
        # Return state snapshot for that version
        return self._snapshots.get(version)
```

**2. Immutable State Snapshots:**
```python
def notify(self):
    # Create immutable snapshot
    snapshot = frozendict(self._state)
    for observer in self._observers:
        observer.update(snapshot)
```

**3. Copy-on-Write:**
```python
def set_state(self, key, value):
    # Create new state object, old one remains valid
    self._state = {**self._state, key: value}
    self._notify()
```

<details>
<summary><strong>Level 3: In a distributed system with push model, how do you handle out-of-order delivery?</strong></summary>

Out-of-order events in distributed systems break causality. Solutions:

**1. Vector Clocks:**
```python
class DistributedEvent:
    def __init__(self, data, vector_clock: Dict[str, int]):
        self.data = data
        self.vector_clock = vector_clock  # {node_id: logical_time}

    def happened_before(self, other: 'DistributedEvent') -> bool:
        """Returns True if self causally precedes other."""
        return all(
            self.vector_clock.get(k, 0) <= other.vector_clock.get(k, 0)
            for k in set(self.vector_clock) | set(other.vector_clock)
        ) and self.vector_clock != other.vector_clock
```

**2. Sequence Numbers with Buffering:**
```python
class OrderedEventConsumer:
    def __init__(self):
        self._expected_seq = 0
        self._buffer: Dict[int, Event] = {}

    def receive(self, event: Event):
        if event.sequence == self._expected_seq:
            self._process(event)
            self._expected_seq += 1
            self._flush_buffer()
        else:
            # Out of order - buffer it
            self._buffer[event.sequence] = event

    def _flush_buffer(self):
        while self._expected_seq in self._buffer:
            event = self._buffer.pop(self._expected_seq)
            self._process(event)
            self._expected_seq += 1
```

**3. Lamport Timestamps:**
```python
class LamportClock:
    def __init__(self):
        self._time = 0

    def tick(self) -> int:
        self._time += 1
        return self._time

    def update(self, received_time: int):
        self._time = max(self._time, received_time) + 1
```

</details>
</details>
</details>

---

## Memory Leaks and Observer Lifecycle

Memory leaks are the most common production issue with Observer pattern. They occur when observers subscribe but never unsubscribe, creating strong references that prevent garbage collection.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #f85149; margin-top: 0; text-align: center;">Memory Leak Scenario</h4>
<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; gap: 16px; align-items: center; justify-content: center; flex-wrap: wrap;">
<div style="background: #252540; border: 2px solid #569cd6; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #569cd6; font-weight: bold;">Subject</div>
<div style="color: #888; font-size: 12px;">Long-lived</div>
<div style="color: #888; font-size: 12px;">(e.g., EventBus)</div>
</div>

<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="color: #f85149;">&#8594; strong ref &#8594;</div>
<div style="color: #f85149;">&#8594; strong ref &#8594;</div>
<div style="color: #f85149;">&#8594; strong ref &#8594;</div>
</div>

<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #3d2525; border: 2px solid #f85149; border-radius: 8px; padding: 8px; text-align: center;">
<div style="color: #f85149; font-size: 13px;">Observer (destroyed UI)</div>
</div>
<div style="background: #3d2525; border: 2px solid #f85149; border-radius: 8px; padding: 8px; text-align: center;">
<div style="color: #f85149; font-size: 13px;">Observer (closed tab)</div>
</div>
<div style="background: #3d2525; border: 2px solid #f85149; border-radius: 8px; padding: 8px; text-align: center;">
<div style="color: #f85149; font-size: 13px;">Observer (old request)</div>
</div>
</div>
</div>

<div style="background: #3d2525; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f85149; font-weight: bold;">Result: Observers cannot be garbage collected</div>
<div style="color: #888; font-size: 12px; margin-top: 8px;">Memory grows linearly with each subscribe() without unsubscribe()</div>
</div>

</div>
</div>

### The Leak Pattern

```python
# DANGEROUS: Classic memory leak
class UserProfileComponent:
    def __init__(self, event_bus: EventBus):
        self.event_bus = event_bus
        # Subscribe on creation - strong reference stored in event_bus
        self.event_bus.subscribe('user.updated', self.on_user_updated)

    def on_user_updated(self, event):
        self.render(event.data)

    # No cleanup! When component is "destroyed", event_bus still holds reference
    # Component cannot be garbage collected


# SAFE: Explicit lifecycle management
class UserProfileComponent:
    def __init__(self, event_bus: EventBus):
        self.event_bus = event_bus
        self._subscription = None

    def mount(self):
        """Called when component becomes active."""
        self._subscription = self.event_bus.subscribe(
            'user.updated',
            self.on_user_updated
        )

    def unmount(self):
        """Called when component is destroyed - MUST unsubscribe."""
        if self._subscription:
            self._subscription.unsubscribe()
            self._subscription = None

    def on_user_updated(self, event):
        self.render(event.data)
```

### Weak References: Automatic Cleanup

Weak references allow the garbage collector to reclaim observers even if the subject still holds a reference.

```python
import weakref
from typing import Callable, Any, Optional


class WeakRefEventBus:
    """
    Event bus using weak references to prevent memory leaks.
    Observers are automatically removed when garbage collected.
    """

    def __init__(self):
        self._listeners: Dict[str, List[weakref.ref]] = defaultdict(list)

    def subscribe(self, event_type: str, callback: Callable) -> None:
        """
        Subscribe with weak reference.

        IMPORTANT: callback must be a bound method or stored elsewhere,
        not a lambda or local function (those get GC'd immediately).
        """
        # Create weak reference with cleanup callback
        ref = weakref.ref(
            callback.__self__ if hasattr(callback, '__self__') else callback,
            lambda r: self._cleanup(event_type, r)
        )
        self._listeners[event_type].append((ref, callback.__name__))

    def _cleanup(self, event_type: str, dead_ref: weakref.ref):
        """Called automatically when referenced object is garbage collected."""
        self._listeners[event_type] = [
            (ref, name) for ref, name in self._listeners[event_type]
            if ref() is not None
        ]

    def emit(self, event_type: str, data: Any):
        """Emit event, skipping dead references."""
        live_listeners = []

        for ref, method_name in self._listeners.get(event_type, []):
            obj = ref()  # Dereference
            if obj is not None:
                live_listeners.append((ref, method_name))
                # Call the method on the object
                method = getattr(obj, method_name, None)
                if method:
                    method(data)

        # Update to only live listeners
        self._listeners[event_type] = live_listeners


# Python's WeakSet for simpler cases
class SimpleWeakSubject:
    def __init__(self):
        self._observers = weakref.WeakSet()

    def attach(self, observer):
        self._observers.add(observer)

    def notify(self, data):
        # Dead observers automatically excluded
        for observer in self._observers:
            observer.update(data)
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Weak Reference Gotcha:</strong> Lambdas and closures create temporary objects that get garbage collected immediately. Always use bound methods or explicitly stored callbacks with weak references.

```python
# BAD: Lambda is immediately garbage collected
bus.subscribe('event', lambda e: print(e))  # Callback disappears!

# GOOD: Method on a live object
class Handler:
    def handle(self, e): print(e)

handler = Handler()
bus.subscribe('event', handler.handle)  # Works as long as handler lives
```
</div>

### Preventing Leaks with Disposable Pattern

```python
from abc import ABC, abstractmethod
from contextlib import contextmanager


class Disposable(ABC):
    """Base class for resources that need explicit cleanup."""

    @abstractmethod
    def dispose(self) -> None:
        pass


class Subscription(Disposable):
    """Represents an active subscription that can be cancelled."""

    def __init__(self, unsubscribe_fn: Callable[[], None]):
        self._unsubscribe = unsubscribe_fn
        self._disposed = False

    def dispose(self) -> None:
        if not self._disposed:
            self._unsubscribe()
            self._disposed = True

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.dispose()


class CompositeDisposable(Disposable):
    """Manages multiple subscriptions for batch cleanup."""

    def __init__(self):
        self._disposables: List[Disposable] = []

    def add(self, disposable: Disposable) -> None:
        self._disposables.append(disposable)

    def dispose(self) -> None:
        for d in self._disposables:
            d.dispose()
        self._disposables.clear()


# Usage
class Dashboard:
    def __init__(self, event_bus: EventBus):
        self.event_bus = event_bus
        self._subscriptions = CompositeDisposable()

    def mount(self):
        self._subscriptions.add(
            self.event_bus.subscribe('metrics.updated', self.on_metrics)
        )
        self._subscriptions.add(
            self.event_bus.subscribe('alerts.new', self.on_alert)
        )

    def unmount(self):
        # Single call cleans up ALL subscriptions
        self._subscriptions.dispose()
```

### Interview Questions - Memory Leaks

<details>
<summary><strong>Level 1: How do memory leaks occur in Observer pattern?</strong></summary>

Memory leaks occur when:
1. Observer subscribes to a long-lived subject
2. Observer goes out of scope or is "destroyed" logically
3. Observer never calls unsubscribe
4. Subject's strong reference prevents garbage collection

The observer object remains in memory indefinitely, along with anything it references.

<details>
<summary><strong>Level 2: What are the trade-offs between weak references and explicit unsubscription?</strong></summary>

**Weak References:**
- Pros: Automatic cleanup, no explicit lifecycle management needed
- Cons:
  - Non-deterministic cleanup timing (when GC runs)
  - Can't use with lambdas/closures
  - Harder to debug (observers disappear silently)
  - May still receive events after "destruction" but before GC

**Explicit Unsubscription:**
- Pros:
  - Deterministic timing
  - Works with any callback type
  - Clear ownership semantics
  - Easier to debug and trace
- Cons:
  - Must remember to call unsubscribe
  - Requires lifecycle management code
  - Easy to miss edge cases (error paths, early returns)

<details>
<summary><strong>Level 3: How would you detect and diagnose observer memory leaks in production?</strong></summary>

**Detection Strategies:**

1. **Subscription Metrics:**
```python
class InstrumentedEventBus:
    def __init__(self):
        self._metrics = {
            'active_subscriptions': 0,
            'total_subscribes': 0,
            'total_unsubscribes': 0,
        }

    def subscribe(self, event_type, callback):
        self._metrics['active_subscriptions'] += 1
        self._metrics['total_subscribes'] += 1
        # ... subscription logic

    def unsubscribe(self, subscription):
        self._metrics['active_subscriptions'] -= 1
        self._metrics['total_unsubscribes'] += 1
        # ... unsubscription logic

    def get_metrics(self):
        leak_indicator = (
            self._metrics['total_subscribes'] -
            self._metrics['total_unsubscribes']
        )
        return {**self._metrics, 'potential_leaks': leak_indicator}
```

2. **Subscription Tracking with Stack Traces:**
```python
import traceback

class DiagnosticEventBus:
    def subscribe(self, event_type, callback):
        subscription_info = {
            'callback': callback,
            'created_at': datetime.now(),
            'stack_trace': traceback.format_stack(),  # Where was it created?
        }
        self._subscription_info[id(callback)] = subscription_info
```

3. **Memory Profiling:**
```python
# In production, use memory profiler to find growing collections
import objgraph

# Periodically check for leaked observers
def diagnose_leaks():
    # Find all Observer instances
    observers = objgraph.by_type('Observer')
    print(f"Active observers: {len(observers)}")

    # Show reference chains for potential leaks
    objgraph.show_backrefs(observers[:5], filename='observer_refs.png')
```

4. **Canary Subscriptions:**
```python
class LeakDetector:
    """Creates weak-referenced canary to detect leak conditions."""

    def __init__(self, event_bus):
        self._canary = object()
        self._canary_ref = weakref.ref(self._canary)
        event_bus.subscribe('test.event', self._on_event)

    def _on_event(self, data):
        pass

    def check_for_leak(self) -> bool:
        # If canary was collected but subscription still exists, there's a leak
        del self._canary
        gc.collect()
        return self._canary_ref() is not None
```

</details>
</details>
</details>

---

## Event Ordering and Notification Guarantees

Event ordering is a subtle but critical aspect of Observer implementations. Different systems provide different guarantees.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Ordering Guarantee Spectrum</h4>

<div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; min-width: 180px; text-align: center;">
<div style="color: #4ecdc4; font-weight: bold;">FIFO per Observer</div>
</div>
<div style="color: #888; flex: 1; font-size: 13px;">Each observer receives events in order they were emitted</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; min-width: 180px; text-align: center;">
<div style="color: #f0ad4e; font-weight: bold;">Total Order</div>
</div>
<div style="color: #888; flex: 1; font-size: 13px;">All observers see same global event order</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; min-width: 180px; text-align: center;">
<div style="color: #f85149; font-weight: bold;">Causal Order</div>
</div>
<div style="color: #888; flex: 1; font-size: 13px;">If A caused B, all observers see A before B</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1e3a5f; border-radius: 8px; padding: 12px; min-width: 180px; text-align: center;">
<div style="color: #888; font-weight: bold;">No Guarantee</div>
</div>
<div style="color: #888; flex: 1; font-size: 13px;">Events may arrive in any order (async systems)</div>
</div>

</div>
</div>

### Priority-Based Ordering

```python
from enum import IntEnum
from dataclasses import dataclass, field
from typing import Callable, List, Any
import heapq


class Priority(IntEnum):
    CRITICAL = 0    # Runs first
    HIGH = 10
    NORMAL = 50
    LOW = 100       # Runs last


@dataclass(order=True)
class PrioritizedSubscription:
    priority: int
    callback: Callable = field(compare=False)
    subscription_id: int = field(compare=False)


class PriorityEventBus:
    """Event bus with guaranteed observer execution order based on priority."""

    def __init__(self):
        self._subscriptions: Dict[str, List[PrioritizedSubscription]] = defaultdict(list)
        self._next_id = 0

    def subscribe(
        self,
        event_type: str,
        callback: Callable,
        priority: Priority = Priority.NORMAL
    ) -> int:
        """Subscribe with priority. Lower priority number = runs first."""
        sub_id = self._next_id
        self._next_id += 1

        sub = PrioritizedSubscription(
            priority=priority.value,
            callback=callback,
            subscription_id=sub_id
        )

        heapq.heappush(self._subscriptions[event_type], sub)
        return sub_id

    def emit(self, event_type: str, data: Any):
        """Emit event to subscribers in priority order."""
        # Get sorted copy (heap is not fully sorted, need to extract in order)
        subs = sorted(self._subscriptions.get(event_type, []))

        for sub in subs:
            sub.callback(data)


# Usage
bus = PriorityEventBus()

# Security validation runs first
bus.subscribe('request.received', validate_auth, Priority.CRITICAL)

# Logging runs last
bus.subscribe('request.received', log_request, Priority.LOW)

# Normal handlers in between
bus.subscribe('request.received', process_request, Priority.NORMAL)
```

### Handling Observer Dependencies

When observers have dependencies on each other, the pattern breaks down. Solutions:

```python
class DependencyAwareEventBus:
    """
    Event bus that respects inter-observer dependencies.

    WARNING: This complexity often indicates you should use a different pattern.
    Consider: Saga, Pipeline, or Chain of Responsibility.
    """

    def __init__(self):
        self._subscriptions: Dict[str, Dict[str, Callable]] = defaultdict(dict)
        self._dependencies: Dict[str, Set[str]] = defaultdict(set)  # observer -> {depends_on}

    def subscribe(
        self,
        event_type: str,
        observer_id: str,
        callback: Callable,
        depends_on: List[str] = None
    ):
        """Subscribe with explicit dependencies on other observers."""
        self._subscriptions[event_type][observer_id] = callback
        if depends_on:
            self._dependencies[observer_id] = set(depends_on)

    def emit(self, event_type: str, data: Any):
        """Emit event, respecting topological order of dependencies."""
        observers = self._subscriptions.get(event_type, {})
        execution_order = self._topological_sort(observers.keys())

        for observer_id in execution_order:
            callback = observers.get(observer_id)
            if callback:
                callback(data)

    def _topological_sort(self, observer_ids: Iterable[str]) -> List[str]:
        """Sort observers so dependencies run first."""
        # Kahn's algorithm
        in_degree = {oid: 0 for oid in observer_ids}

        for oid in observer_ids:
            for dep in self._dependencies.get(oid, []):
                if dep in in_degree:
                    in_degree[oid] += 1

        queue = [oid for oid, deg in in_degree.items() if deg == 0]
        result = []

        while queue:
            current = queue.pop(0)
            result.append(current)

            for oid in observer_ids:
                if current in self._dependencies.get(oid, []):
                    in_degree[oid] -= 1
                    if in_degree[oid] == 0:
                        queue.append(oid)

        if len(result) != len(in_degree):
            raise CircularDependencyError("Cycle detected in observer dependencies")

        return result
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Design Choice:</strong> If you find yourself building dependency-aware observer systems, strongly consider whether the Observer pattern is the right choice. Dependencies between observers indicate they aren't truly independent, and you may benefit from [[Chain of Responsibility]](/topic/design-patterns/chain-of-responsibility) or [[Pipeline]](/topic/design-patterns/pipeline) patterns instead.
</div>

### Interview Questions - Event Ordering

<details>
<summary><strong>Level 1: Why does observer execution order matter?</strong></summary>

Order matters when:
- Security checks must run before business logic
- Logging/audit must capture original state before modification
- Cache invalidation must happen before database writes
- UI updates must happen after data processing

Example: If a validation observer runs after a persistence observer, invalid data gets saved.

<details>
<summary><strong>Level 2: How do you handle the case where Observer A's action triggers an event that Observer B depends on?</strong></summary>

This creates a notification cascade. Solutions:

**1. Deferred/Batched Notifications:**
```python
class BatchingSubject:
    def __init__(self):
        self._notification_depth = 0
        self._pending_events: List[Event] = []

    def emit(self, event):
        self._pending_events.append(event)

        if self._notification_depth == 0:
            self._flush_notifications()

    def _flush_notifications(self):
        self._notification_depth += 1
        try:
            while self._pending_events:
                event = self._pending_events.pop(0)
                self._notify_observers(event)
        finally:
            self._notification_depth -= 1
```

**2. Event Sourcing with Replay:**
```python
class EventSourcedSubject:
    def __init__(self):
        self._event_log: List[Event] = []

    def emit(self, event):
        self._event_log.append(event)
        # Observers can replay events in correct order
        self._notify_observers(event)

    def replay_from(self, sequence: int):
        for event in self._event_log[sequence:]:
            self._notify_observers(event)
```

<details>
<summary><strong>Level 3: In a distributed system, how do you maintain causal ordering across services?</strong></summary>

Causal ordering ensures that if event A caused event B, all observers see A before B. This is challenging in distributed systems.

**1. Lamport Timestamps:**
```python
class CausalEventBus:
    def __init__(self, node_id: str):
        self.node_id = node_id
        self.logical_clock = 0

    def emit(self, event_type: str, data: Any, caused_by: Event = None):
        # Increment clock
        self.logical_clock += 1

        if caused_by:
            # Ensure causal ordering
            self.logical_clock = max(
                self.logical_clock,
                caused_by.timestamp + 1
            )

        event = Event(
            type=event_type,
            data=data,
            timestamp=self.logical_clock,
            source=self.node_id,
            caused_by=caused_by.id if caused_by else None
        )

        self._publish(event)

    def receive(self, event: Event):
        # Update clock on receive
        self.logical_clock = max(self.logical_clock, event.timestamp) + 1
        self._deliver(event)
```

**2. Vector Clocks for Concurrent Events:**
```python
class VectorClockEventBus:
    def __init__(self, node_id: str, all_nodes: List[str]):
        self.node_id = node_id
        self.vector_clock = {n: 0 for n in all_nodes}

    def emit(self, event_type: str, data: Any):
        self.vector_clock[self.node_id] += 1

        event = Event(
            type=event_type,
            data=data,
            vector_clock=dict(self.vector_clock),
        )

        self._publish(event)

    def receive(self, event: Event):
        # Merge clocks
        for node, time in event.vector_clock.items():
            self.vector_clock[node] = max(
                self.vector_clock.get(node, 0),
                time
            )
        self.vector_clock[self.node_id] += 1

        self._deliver_in_order(event)

    def _causally_ready(self, event: Event) -> bool:
        """Check if all causal predecessors have been delivered."""
        for node, time in event.vector_clock.items():
            if node == event.source:
                if self.delivered_clock.get(node, 0) != time - 1:
                    return False
            else:
                if self.delivered_clock.get(node, 0) < time:
                    return False
        return True
```

**3. Kafka-Style Partitioning:**
```python
# Partition by causal key - all related events go to same partition
# Partition provides total order within partition

def get_partition(event: Event) -> int:
    # All events for same entity go to same partition
    causal_key = event.data.get('entity_id', event.type)
    return hash(causal_key) % NUM_PARTITIONS
```

</details>
</details>
</details>

---

## Backpressure: When Observers Can't Keep Up

Backpressure occurs when subjects produce events faster than observers can consume them. Without handling, this leads to memory exhaustion, increased latency, or dropped events.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #f85149; margin-top: 0; text-align: center;">Backpressure Scenario</h4>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
<div style="background: #252540; border: 2px solid #4ecdc4; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #4ecdc4; font-weight: bold;">Producer</div>
<div style="color: #4ecdc4; font-size: 24px;">1000 evt/s</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f0ad4e;">&#8594;&#8594;&#8594;</div>
<div style="background: #3d3520; border: 2px solid #f0ad4e; border-radius: 4px; padding: 8px; margin: 8px 0;">
<div style="color: #f0ad4e; font-size: 12px;">Queue: 50,000</div>
<div style="color: #f0ad4e; font-size: 12px;">(growing!)</div>
</div>
<div style="color: #f0ad4e;">&#8594;&#8594;&#8594;</div>
</div>

<div style="background: #252540; border: 2px solid #f85149; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f85149; font-weight: bold;">Consumer</div>
<div style="color: #f85149; font-size: 24px;">100 evt/s</div>
</div>
</div>

<div style="background: #3d2525; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f85149;">Without backpressure: Queue grows 900 events/second until OOM</div>
</div>
</div>

### Backpressure Strategies

```python
from enum import Enum, auto
from collections import deque
from threading import Lock, Condition
import asyncio


class BackpressureStrategy(Enum):
    BLOCK = auto()      # Block producer until consumer catches up
    DROP_OLDEST = auto() # Drop oldest events when buffer full
    DROP_NEWEST = auto() # Drop new events when buffer full
    SAMPLE = auto()      # Keep every Nth event
    BUFFER = auto()      # Unbounded buffer (dangerous!)
    ERROR = auto()       # Raise exception when buffer full


class BackpressureEventBus:
    """
    Event bus with configurable backpressure handling.
    """

    def __init__(
        self,
        strategy: BackpressureStrategy = BackpressureStrategy.BLOCK,
        buffer_size: int = 1000,
        sample_rate: int = 10
    ):
        self._strategy = strategy
        self._buffer_size = buffer_size
        self._sample_rate = sample_rate
        self._event_count = 0

        self._buffer: deque = deque(maxlen=buffer_size if strategy == BackpressureStrategy.DROP_OLDEST else None)
        self._lock = Lock()
        self._not_full = Condition(self._lock)
        self._not_empty = Condition(self._lock)

        self._metrics = {
            'events_received': 0,
            'events_dropped': 0,
            'events_delivered': 0,
            'buffer_high_water': 0,
        }

    def emit(self, event: Event) -> bool:
        """
        Emit event with backpressure handling.
        Returns True if event was accepted, False if dropped.
        """
        self._metrics['events_received'] += 1
        self._event_count += 1

        with self._lock:
            # Update high water mark
            self._metrics['buffer_high_water'] = max(
                self._metrics['buffer_high_water'],
                len(self._buffer)
            )

            if self._strategy == BackpressureStrategy.BLOCK:
                return self._emit_blocking(event)
            elif self._strategy == BackpressureStrategy.DROP_OLDEST:
                return self._emit_drop_oldest(event)
            elif self._strategy == BackpressureStrategy.DROP_NEWEST:
                return self._emit_drop_newest(event)
            elif self._strategy == BackpressureStrategy.SAMPLE:
                return self._emit_sampled(event)
            elif self._strategy == BackpressureStrategy.ERROR:
                return self._emit_error(event)
            else:  # BUFFER
                self._buffer.append(event)
                self._not_empty.notify()
                return True

    def _emit_blocking(self, event: Event) -> bool:
        """Block until space available."""
        while len(self._buffer) >= self._buffer_size:
            self._not_full.wait(timeout=1.0)

        self._buffer.append(event)
        self._not_empty.notify()
        return True

    def _emit_drop_oldest(self, event: Event) -> bool:
        """Drop oldest events when buffer full (deque handles this with maxlen)."""
        if len(self._buffer) >= self._buffer_size:
            self._metrics['events_dropped'] += 1
        self._buffer.append(event)
        self._not_empty.notify()
        return True

    def _emit_drop_newest(self, event: Event) -> bool:
        """Reject new events when buffer full."""
        if len(self._buffer) >= self._buffer_size:
            self._metrics['events_dropped'] += 1
            return False

        self._buffer.append(event)
        self._not_empty.notify()
        return True

    def _emit_sampled(self, event: Event) -> bool:
        """Keep only every Nth event."""
        if self._event_count % self._sample_rate != 0:
            self._metrics['events_dropped'] += 1
            return False

        self._buffer.append(event)
        self._not_empty.notify()
        return True

    def _emit_error(self, event: Event) -> bool:
        """Raise exception when buffer full."""
        if len(self._buffer) >= self._buffer_size:
            raise BufferFullError(f"Event buffer full ({self._buffer_size} events)")

        self._buffer.append(event)
        self._not_empty.notify()
        return True

    def consume(self, timeout: float = None) -> Optional[Event]:
        """Consume next event from buffer."""
        with self._lock:
            while len(self._buffer) == 0:
                if not self._not_empty.wait(timeout=timeout):
                    return None

            event = self._buffer.popleft()
            self._not_full.notify()
            self._metrics['events_delivered'] += 1
            return event
```

### Reactive Streams Backpressure

The Reactive Streams specification provides a standard for backpressure handling:

```python
from abc import ABC, abstractmethod


class Publisher(ABC):
    @abstractmethod
    def subscribe(self, subscriber: 'Subscriber') -> None:
        pass


class Subscriber(ABC):
    @abstractmethod
    def on_subscribe(self, subscription: 'Subscription') -> None:
        """Called when subscription starts - receive Subscription to request data."""
        pass

    @abstractmethod
    def on_next(self, item) -> None:
        """Called for each item - only called after request()."""
        pass

    @abstractmethod
    def on_error(self, error: Exception) -> None:
        pass

    @abstractmethod
    def on_complete(self) -> None:
        pass


class Subscription(ABC):
    @abstractmethod
    def request(self, n: int) -> None:
        """Request n more items - this is the backpressure signal."""
        pass

    @abstractmethod
    def cancel(self) -> None:
        pass


class ReactiveEventPublisher(Publisher):
    """
    Publisher that respects subscriber demand.
    Only sends events when subscriber requests them.
    """

    def __init__(self):
        self._subscribers: Dict[Subscriber, int] = {}  # subscriber -> requested count
        self._pending_events: deque = deque()

    def subscribe(self, subscriber: Subscriber) -> None:
        subscription = ReactiveSubscription(self, subscriber)
        self._subscribers[subscriber] = 0
        subscriber.on_subscribe(subscription)

    def emit(self, event) -> None:
        self._pending_events.append(event)
        self._try_deliver()

    def _try_deliver(self):
        """Deliver events only to subscribers who have requested them."""
        for subscriber, requested in list(self._subscribers.items()):
            while requested > 0 and self._pending_events:
                event = self._pending_events.popleft()
                subscriber.on_next(event)
                self._subscribers[subscriber] -= 1
                requested -= 1

    def _request(self, subscriber: Subscriber, n: int):
        """Called by subscription when subscriber wants more items."""
        self._subscribers[subscriber] = self._subscribers.get(subscriber, 0) + n
        self._try_deliver()


class ReactiveSubscription(Subscription):
    def __init__(self, publisher: ReactiveEventPublisher, subscriber: Subscriber):
        self._publisher = publisher
        self._subscriber = subscriber

    def request(self, n: int) -> None:
        if n <= 0:
            self._subscriber.on_error(ValueError("n must be positive"))
            return
        self._publisher._request(self._subscriber, n)

    def cancel(self) -> None:
        self._publisher._subscribers.pop(self._subscriber, None)


# Usage
class SlowConsumer(Subscriber):
    def __init__(self):
        self._subscription = None
        self._processed = 0

    def on_subscribe(self, subscription: Subscription):
        self._subscription = subscription
        # Request initial batch
        self._subscription.request(10)

    def on_next(self, item):
        # Process item (slow)
        time.sleep(0.1)
        self._processed += 1

        # Request more when ready
        if self._processed % 10 == 0:
            self._subscription.request(10)

    def on_error(self, error):
        print(f"Error: {error}")

    def on_complete(self):
        print("Done")
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Trade-off - Backpressure Strategy Selection:</strong>
<ul style="margin: 8px 0 0 0; color: #ddd;">
<li><strong>BLOCK:</strong> Use when every event must be processed, and you can afford producer slowdown</li>
<li><strong>DROP_OLDEST:</strong> Use when recent data is more valuable (real-time monitoring)</li>
<li><strong>DROP_NEWEST:</strong> Use when processing order matters and you want to finish current work</li>
<li><strong>SAMPLE:</strong> Use for high-frequency data where trends matter more than individual events</li>
<li><strong>ERROR:</strong> Use when dropping events is unacceptable and must be escalated</li>
</ul>
</div>

### Interview Questions - Backpressure

<details>
<summary><strong>Level 1: What is backpressure and why does it matter?</strong></summary>

Backpressure occurs when a producer generates data faster than a consumer can process it. Without handling, this causes:
- Memory exhaustion (unbounded queues)
- Increased latency (events wait in queue)
- System instability (cascading failures)

It matters because real-world systems have varying processing speeds, and assumptions about consumer capacity are often wrong.

<details>
<summary><strong>Level 2: Compare blocking vs dropping strategies for backpressure. When would you use each?</strong></summary>

**Blocking (Producer Slowdown):**
- Producer waits when buffer is full
- Guarantees no data loss
- Propagates slowness upstream
- Use when: Every event is critical (financial transactions, audit logs)
- Risk: Can cause cascading slowdowns through entire system

**Dropping (Consumer Protection):**
- Discards events when overwhelmed
- Protects consumer from overload
- Loses data but maintains throughput
- Use when: Recent data is more valuable, or data loss is acceptable (metrics, monitoring)
- Risk: May lose critical events

**Hybrid approaches:**
```python
def emit_with_hybrid_backpressure(self, event):
    if event.priority == Priority.CRITICAL:
        # Block for critical events
        self._blocking_emit(event)
    else:
        # Drop low-priority events if buffer full
        self._drop_newest_emit(event)
```

<details>
<summary><strong>Level 3: How would you implement end-to-end backpressure across microservices?</strong></summary>

End-to-end backpressure requires coordination across service boundaries:

**1. Request-Based (Pull Model):**
```python
# Consumer requests batches from producer
class BatchConsumer:
    async def consume_loop(self):
        while True:
            # Consumer controls rate by requesting specific batch size
            batch = await self.producer_client.request_batch(
                size=self.calculate_capacity(),
                timeout=5.0
            )
            await self.process_batch(batch)

    def calculate_capacity(self) -> int:
        # Based on current processing rate and queue depth
        return max(1, 100 - self._local_queue.qsize())
```

**2. Credit-Based Flow Control:**
```python
class CreditBasedProducer:
    def __init__(self):
        self._credits: Dict[str, int] = {}  # consumer_id -> credits

    async def send(self, consumer_id: str, event: Event):
        while self._credits.get(consumer_id, 0) <= 0:
            await self._wait_for_credits(consumer_id)

        self._credits[consumer_id] -= 1
        await self._network_send(consumer_id, event)

    def receive_credits(self, consumer_id: str, credits: int):
        """Consumer sends credits when it has capacity."""
        self._credits[consumer_id] = self._credits.get(consumer_id, 0) + credits


class CreditBasedConsumer:
    async def process_and_credit(self, event: Event):
        await self.process(event)
        # Send credit back to producer
        await self.producer.grant_credits(self.id, 1)
```

**3. HTTP/2 Flow Control:**
```python
# HTTP/2 has built-in flow control via WINDOW_UPDATE frames
# gRPC streaming uses this automatically

async def stream_events(self, request, context):
    async for event in self.event_source:
        # gRPC automatically handles backpressure
        # Will block if client can't keep up
        yield event
```

**4. Message Queue with Consumer Groups:**
```python
# Kafka-style: Partition-based parallelism with consumer groups
# Backpressure via consumer lag monitoring

class KafkaBackpressureMonitor:
    def check_lag(self, consumer_group: str) -> int:
        lag = self.kafka_admin.get_consumer_lag(consumer_group)
        if lag > self.threshold:
            # Alert, scale consumers, or slow producers
            self.alert(f"Consumer lag critical: {lag}")
        return lag
```

</details>
</details>
</details>

---

## Reactive Patterns and Modern Implementations

The Observer pattern evolved into Reactive Programming, which adds composability, error handling, and backpressure as first-class concepts.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Observer vs Reactive Streams</h4>

<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin-top: 16px;">

<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-left: 4px solid #888;">
<h5 style="color: #888; margin-top: 0;">Classic Observer</h5>
<ul style="color: #ddd; font-size: 13px; padding-left: 20px; margin: 0;">
<li>Push-only notification</li>
<li>No error channel</li>
<li>No completion signal</li>
<li>No backpressure</li>
<li>Imperative composition</li>
</ul>
</div>

<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-left: 4px solid #4ecdc4;">
<h5 style="color: #4ecdc4; margin-top: 0;">Reactive Streams</h5>
<ul style="color: #ddd; font-size: 13px; padding-left: 20px; margin: 0;">
<li>on_next / on_error / on_complete</li>
<li>Built-in error propagation</li>
<li>Explicit completion</li>
<li>request(n) backpressure</li>
<li>Declarative operators</li>
</ul>
</div>

</div>
</div>

### Observable Pattern (RxPy/RxJS Style)

```python
from typing import TypeVar, Generic, Callable, Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod

T = TypeVar('T')


@dataclass
class Notification(Generic[T]):
    """Represents a stream notification."""
    kind: str  # 'next', 'error', 'complete'
    value: Optional[T] = None
    error: Optional[Exception] = None


class Observable(Generic[T]):
    """
    Observable represents a push-based collection.
    Implements the Observable pattern with operators.
    """

    def __init__(self, subscribe_fn: Callable[['Observer[T]'], 'Disposable']):
        self._subscribe_fn = subscribe_fn

    def subscribe(
        self,
        on_next: Callable[[T], None] = None,
        on_error: Callable[[Exception], None] = None,
        on_complete: Callable[[], None] = None
    ) -> 'Disposable':
        """Subscribe to the observable."""
        observer = Observer(
            on_next=on_next or (lambda x: None),
            on_error=on_error or (lambda e: None),
            on_complete=on_complete or (lambda: None)
        )
        return self._subscribe_fn(observer)

    # Operators
    def map(self, transform: Callable[[T], 'U']) -> 'Observable[U]':
        """Transform each element."""
        def subscribe(observer: Observer):
            return self.subscribe(
                on_next=lambda x: observer.on_next(transform(x)),
                on_error=observer.on_error,
                on_complete=observer.on_complete
            )
        return Observable(subscribe)

    def filter(self, predicate: Callable[[T], bool]) -> 'Observable[T]':
        """Filter elements based on predicate."""
        def subscribe(observer: Observer):
            return self.subscribe(
                on_next=lambda x: observer.on_next(x) if predicate(x) else None,
                on_error=observer.on_error,
                on_complete=observer.on_complete
            )
        return Observable(subscribe)

    def take(self, count: int) -> 'Observable[T]':
        """Take first n elements."""
        def subscribe(observer: Observer):
            taken = [0]
            subscription = [None]

            def on_next(x):
                if taken[0] < count:
                    observer.on_next(x)
                    taken[0] += 1
                    if taken[0] >= count:
                        observer.on_complete()
                        if subscription[0]:
                            subscription[0].dispose()

            subscription[0] = self.subscribe(
                on_next=on_next,
                on_error=observer.on_error,
                on_complete=observer.on_complete
            )
            return subscription[0]
        return Observable(subscribe)

    def debounce(self, delay_seconds: float) -> 'Observable[T]':
        """Only emit if no new value for delay period."""
        def subscribe(observer: Observer):
            timer = [None]

            def on_next(x):
                if timer[0]:
                    timer[0].cancel()
                timer[0] = threading.Timer(
                    delay_seconds,
                    lambda: observer.on_next(x)
                )
                timer[0].start()

            return self.subscribe(
                on_next=on_next,
                on_error=observer.on_error,
                on_complete=observer.on_complete
            )
        return Observable(subscribe)

    @staticmethod
    def from_iterable(items: Iterable[T]) -> 'Observable[T]':
        """Create observable from iterable."""
        def subscribe(observer: Observer):
            try:
                for item in items:
                    observer.on_next(item)
                observer.on_complete()
            except Exception as e:
                observer.on_error(e)
            return Disposable(lambda: None)
        return Observable(subscribe)

    @staticmethod
    def interval(seconds: float) -> 'Observable[int]':
        """Emit incrementing integers at interval."""
        def subscribe(observer: Observer):
            count = [0]
            running = [True]

            def emit():
                while running[0]:
                    observer.on_next(count[0])
                    count[0] += 1
                    time.sleep(seconds)

            thread = threading.Thread(target=emit, daemon=True)
            thread.start()

            return Disposable(lambda: running.__setitem__(0, False))
        return Observable(subscribe)


@dataclass
class Observer(Generic[T]):
    on_next: Callable[[T], None]
    on_error: Callable[[Exception], None]
    on_complete: Callable[[], None]


class Disposable:
    def __init__(self, dispose_fn: Callable[[], None]):
        self._dispose = dispose_fn
        self._disposed = False

    def dispose(self):
        if not self._disposed:
            self._dispose()
            self._disposed = True


# Usage example
prices = Observable.interval(0.1).pipe(
    ops.map(lambda _: random.uniform(100, 200)),  # Generate random prices
    ops.filter(lambda p: p > 150),                 # Only high prices
    ops.debounce(0.5),                            # Debounce rapid changes
    ops.take(5)                                    # Stop after 5
)

prices.subscribe(
    on_next=lambda p: print(f"Price alert: ${p:.2f}"),
    on_error=lambda e: print(f"Error: {e}"),
    on_complete=lambda: print("Monitoring complete")
)
```

### Subject: Observer + Observable Combined

```python
class Subject(Generic[T], Observable[T]):
    """
    Subject is both an Observable and an Observer.
    Acts as a bridge/proxy that can multicast to multiple observers.
    """

    def __init__(self):
        self._observers: List[Observer[T]] = []
        self._completed = False
        self._error: Optional[Exception] = None

        super().__init__(self._subscribe)

    def _subscribe(self, observer: Observer[T]) -> Disposable:
        if self._error:
            observer.on_error(self._error)
        elif self._completed:
            observer.on_complete()
        else:
            self._observers.append(observer)

        return Disposable(lambda: self._observers.remove(observer) if observer in self._observers else None)

    # Observer interface
    def on_next(self, value: T) -> None:
        if not self._completed and not self._error:
            for observer in list(self._observers):
                observer.on_next(value)

    def on_error(self, error: Exception) -> None:
        if not self._completed and not self._error:
            self._error = error
            for observer in list(self._observers):
                observer.on_error(error)
            self._observers.clear()

    def on_complete(self) -> None:
        if not self._completed and not self._error:
            self._completed = True
            for observer in list(self._observers):
                observer.on_complete()
            self._observers.clear()


class BehaviorSubject(Subject[T]):
    """
    Subject that replays the last value to new subscribers.
    Useful for state management.
    """

    def __init__(self, initial_value: T):
        super().__init__()
        self._value = initial_value

    def _subscribe(self, observer: Observer[T]) -> Disposable:
        # Immediately emit current value
        observer.on_next(self._value)
        return super()._subscribe(observer)

    def on_next(self, value: T) -> None:
        self._value = value
        super().on_next(value)

    @property
    def value(self) -> T:
        return self._value


class ReplaySubject(Subject[T]):
    """
    Subject that replays N previous values to new subscribers.
    Useful for late subscribers who need history.
    """

    def __init__(self, buffer_size: int = None):
        super().__init__()
        self._buffer: deque = deque(maxlen=buffer_size)

    def _subscribe(self, observer: Observer[T]) -> Disposable:
        # Replay buffered values
        for value in self._buffer:
            observer.on_next(value)
        return super()._subscribe(observer)

    def on_next(self, value: T) -> None:
        self._buffer.append(value)
        super().on_next(value)
```

<div style="background: #143d2e; border-left: 4px solid #28a745; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #28a745;">Design Choice - Subject Types:</strong>
<ul style="margin: 8px 0 0 0; color: #ddd;">
<li><strong>Subject:</strong> Pure multicast, no replay - use for events where history doesn't matter</li>
<li><strong>BehaviorSubject:</strong> Always has current value - use for state (like Redux store)</li>
<li><strong>ReplaySubject:</strong> Replays history - use when late subscribers need past events</li>
<li><strong>AsyncSubject:</strong> Only emits last value on complete - use for async request/response</li>
</ul>
</div>

### Interview Questions - Reactive Patterns

<details>
<summary><strong>Level 1: What problems does Reactive Streams solve that classic Observer doesn't?</strong></summary>

Reactive Streams addresses four key gaps:

1. **Error Handling:** Classic Observer has no standard error channel. Reactive Streams has `on_error()`.

2. **Completion:** No way to signal "no more events" in classic Observer. Reactive Streams has `on_complete()`.

3. **Backpressure:** Classic Observer is push-only. Reactive Streams has `request(n)` for pull-based flow control.

4. **Composition:** Classic Observer requires imperative code to combine streams. Reactive provides declarative operators (`map`, `filter`, `merge`, `flatMap`).

<details>
<summary><strong>Level 2: Explain the difference between hot and cold observables.</strong></summary>

**Cold Observable:**
- Creates new producer for each subscriber
- Each subscriber gets all values from the beginning
- Like a video on-demand - starts from beginning for each viewer

```python
# Cold: Each subscriber triggers new HTTP request
cold = Observable.from_promise(fetch('/api/data'))

cold.subscribe(lambda x: print("Sub1:", x))  # HTTP request 1
cold.subscribe(lambda x: print("Sub2:", x))  # HTTP request 2
```

**Hot Observable:**
- Shares single producer among all subscribers
- Subscribers only see events after they subscribe
- Like live TV - you see what's broadcasting now

```python
# Hot: All subscribers share same WebSocket
websocket_messages = Subject()

# Later subscriber misses earlier messages
websocket_messages.subscribe(lambda x: print("Sub1:", x))
# ... time passes, messages emitted ...
websocket_messages.subscribe(lambda x: print("Sub2:", x))  # Misses earlier messages
```

**Converting between them:**
```python
# Cold to Hot: Use share() or publish()
hot = cold.pipe(share())

# Hot to Cold: Use replay buffer
cold_replay = hot.pipe(replay_buffer(size=100))
```

<details>
<summary><strong>Level 3: How would you implement a reactive state management system like Redux using observables?</strong></summary>

```python
from typing import TypeVar, Generic, Callable
from dataclasses import dataclass

State = TypeVar('State')
Action = TypeVar('Action')


@dataclass
class StoreAction:
    type: str
    payload: Any = None


class ReactiveStore(Generic[State]):
    """
    Redux-like store implemented with reactive patterns.
    State changes are observable streams.
    """

    def __init__(
        self,
        reducer: Callable[[State, StoreAction], State],
        initial_state: State,
        middleware: List[Callable] = None
    ):
        self._reducer = reducer
        self._state = initial_state
        self._middleware = middleware or []

        # BehaviorSubject for state - new subscribers get current state
        self._state_subject = BehaviorSubject(initial_state)

        # Subject for actions - for middleware/effects
        self._action_subject = Subject()

        # Set up action processing
        self._action_subject.subscribe(
            on_next=self._process_action
        )

    @property
    def state(self) -> State:
        return self._state

    def select(self, selector: Callable[[State], T]) -> Observable[T]:
        """
        Select a slice of state as an observable.
        Only emits when selected value changes.
        """
        return self._state_subject.pipe(
            ops.map(selector),
            ops.distinct_until_changed()
        )

    def dispatch(self, action: StoreAction) -> None:
        """Dispatch action through middleware chain."""
        # Build middleware chain
        def dispatch_core(a):
            self._action_subject.on_next(a)

        chain = dispatch_core
        for middleware in reversed(self._middleware):
            chain = middleware(self)(chain)

        chain(action)

    def _process_action(self, action: StoreAction) -> None:
        """Process action through reducer and update state."""
        new_state = self._reducer(self._state, action)

        if new_state is not self._state:
            self._state = new_state
            self._state_subject.on_next(new_state)

    def add_effect(
        self,
        action_type: str,
        effect: Callable[[StoreAction], Observable[StoreAction]]
    ) -> Disposable:
        """
        Add side effect that runs when action type is dispatched.
        Effect returns observable of new actions to dispatch.
        """
        return self._action_subject.pipe(
            ops.filter(lambda a: a.type == action_type),
            ops.flat_map(effect)
        ).subscribe(
            on_next=self.dispatch
        )


# Usage
@dataclass
class AppState:
    users: List[dict]
    loading: bool
    error: Optional[str]


def app_reducer(state: AppState, action: StoreAction) -> AppState:
    if action.type == 'FETCH_USERS_START':
        return AppState(users=state.users, loading=True, error=None)
    elif action.type == 'FETCH_USERS_SUCCESS':
        return AppState(users=action.payload, loading=False, error=None)
    elif action.type == 'FETCH_USERS_ERROR':
        return AppState(users=state.users, loading=False, error=action.payload)
    return state


# Create store
store = ReactiveStore(
    reducer=app_reducer,
    initial_state=AppState(users=[], loading=False, error=None)
)

# Add async effect
def fetch_users_effect(action: StoreAction) -> Observable[StoreAction]:
    return Observable.from_promise(
        fetch('/api/users')
    ).pipe(
        ops.map(lambda users: StoreAction('FETCH_USERS_SUCCESS', users)),
        ops.catch(lambda e: Observable.of(StoreAction('FETCH_USERS_ERROR', str(e))))
    )

store.add_effect('FETCH_USERS_START', fetch_users_effect)

# Subscribe to state changes
store.select(lambda s: s.users).subscribe(
    on_next=lambda users: render_user_list(users)
)

store.select(lambda s: s.loading).subscribe(
    on_next=lambda loading: toggle_spinner(loading)
)

# Dispatch action
store.dispatch(StoreAction('FETCH_USERS_START'))
```

</details>
</details>
</details>

---

## Production Implementation: Thread-Safe Event Emitter

```python
from typing import Callable, Dict, List, Any, Optional, Set, TypeVar
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum, auto
from concurrent.futures import ThreadPoolExecutor, Future
from contextlib import contextmanager
import threading
import weakref
import logging
import traceback
import uuid

logger = logging.getLogger(__name__)

T = TypeVar('T')


class EventPriority(Enum):
    CRITICAL = 0   # Runs first, synchronously, blocks until complete
    HIGH = 10      # High priority async
    NORMAL = 50    # Default
    LOW = 100      # Background processing


@dataclass
class Event:
    """Rich event with metadata for debugging and tracing."""
    type: str
    data: Any
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    source: str = "unknown"
    timestamp: datetime = field(default_factory=datetime.utcnow)
    correlation_id: Optional[str] = None
    causation_id: Optional[str] = None  # ID of event that caused this one

    def caused_by(self, parent: 'Event') -> 'Event':
        """Create causal link to parent event."""
        self.causation_id = parent.id
        self.correlation_id = parent.correlation_id or parent.id
        return self


@dataclass
class Subscription:
    """Represents an active subscription."""
    id: str
    event_type: str
    callback: Callable[[Event], None]
    priority: EventPriority = EventPriority.NORMAL
    filter_fn: Optional[Callable[[Event], bool]] = None
    error_handler: Optional[Callable[[Exception, Event], None]] = None
    max_calls: Optional[int] = None
    call_count: int = 0
    created_at: datetime = field(default_factory=datetime.utcnow)
    weak_ref: bool = False
    _callback_ref: Any = field(default=None, repr=False)

    def matches(self, event: Event) -> bool:
        """Check if subscription should receive this event."""
        if self.max_calls and self.call_count >= self.max_calls:
            return False
        if self.filter_fn and not self.filter_fn(event):
            return False
        return True

    def get_callback(self) -> Optional[Callable]:
        """Get callback, resolving weak reference if needed."""
        if self.weak_ref and self._callback_ref:
            obj = self._callback_ref()
            if obj is None:
                return None  # Object was garbage collected
            return getattr(obj, self.callback.__name__)
        return self.callback


class EventEmitter:
    """
    Production-grade event emitter with:
    - Thread-safe operations
    - Priority-based execution
    - Weak reference support
    - Error isolation
    - Metrics and observability
    - Backpressure handling
    """

    def __init__(
        self,
        max_workers: int = 4,
        max_queue_size: int = 10000,
        default_error_handler: Callable[[Exception, Event, Subscription], None] = None
    ):
        self._subscriptions: Dict[str, List[Subscription]] = {}
        self._lock = threading.RLock()
        self._executor = ThreadPoolExecutor(max_workers=max_workers)
        self._default_error_handler = default_error_handler or self._log_error
        self._paused_events: Set[str] = set()
        self._max_queue_size = max_queue_size
        self._pending_count = 0

        self._metrics = {
            'events_emitted': 0,
            'events_delivered': 0,
            'events_dropped': 0,
            'errors': 0,
            'subscriptions_created': 0,
            'subscriptions_removed': 0,
        }

    def on(
        self,
        event_type: str,
        callback: Callable[[Event], None],
        priority: EventPriority = EventPriority.NORMAL,
        filter_fn: Callable[[Event], bool] = None,
        error_handler: Callable[[Exception, Event], None] = None,
        max_calls: int = None,
        weak: bool = False
    ) -> Subscription:
        """
        Subscribe to an event type.

        Args:
            event_type: Event type to subscribe to. Use "*" for all events.
            callback: Function called when event occurs.
            priority: Execution priority (CRITICAL runs first, synchronously).
            filter_fn: Optional predicate to filter events.
            error_handler: Custom error handler for this subscription.
            max_calls: Auto-unsubscribe after N calls.
            weak: Use weak reference (auto-cleanup when callback owner is GC'd).

        Returns:
            Subscription object for later unsubscription.
        """
        sub_id = str(uuid.uuid4())

        subscription = Subscription(
            id=sub_id,
            event_type=event_type,
            callback=callback,
            priority=priority,
            filter_fn=filter_fn,
            error_handler=error_handler,
            max_calls=max_calls,
            weak_ref=weak,
        )

        # Set up weak reference if requested
        if weak and hasattr(callback, '__self__'):
            subscription._callback_ref = weakref.ref(
                callback.__self__,
                lambda ref: self._cleanup_dead_subscription(event_type, sub_id)
            )

        with self._lock:
            if event_type not in self._subscriptions:
                self._subscriptions[event_type] = []

            self._subscriptions[event_type].append(subscription)
            self._subscriptions[event_type].sort(key=lambda s: s.priority.value)
            self._metrics['subscriptions_created'] += 1

        return subscription

    def once(
        self,
        event_type: str,
        callback: Callable[[Event], None],
        **kwargs
    ) -> Subscription:
        """Subscribe for exactly one event."""
        return self.on(event_type, callback, max_calls=1, **kwargs)

    def off(self, subscription: Subscription) -> bool:
        """Unsubscribe from an event."""
        with self._lock:
            subs = self._subscriptions.get(subscription.event_type, [])
            for i, sub in enumerate(subs):
                if sub.id == subscription.id:
                    subs.pop(i)
                    self._metrics['subscriptions_removed'] += 1
                    return True
        return False

    def emit(
        self,
        event_type: str,
        data: Any = None,
        source: str = None,
        correlation_id: str = None,
        caused_by: Event = None,
        wait: bool = False
    ) -> Optional[List[Future]]:
        """
        Emit an event to all matching subscribers.

        Args:
            event_type: Type of event.
            data: Event payload.
            source: Source identifier.
            correlation_id: For tracing related events.
            caused_by: Parent event for causal tracking.
            wait: If True, wait for all callbacks to complete.

        Returns:
            List of Futures if wait=False, None otherwise.
        """
        if event_type in self._paused_events:
            logger.debug(f"Event {event_type} is paused")
            return None

        # Backpressure check
        if self._pending_count >= self._max_queue_size:
            self._metrics['events_dropped'] += 1
            logger.warning(f"Event dropped due to backpressure: {event_type}")
            return None

        event = Event(
            type=event_type,
            data=data,
            source=source or "emit",
            correlation_id=correlation_id,
        )

        if caused_by:
            event.caused_by(caused_by)

        self._metrics['events_emitted'] += 1

        # Collect matching subscriptions
        with self._lock:
            subscriptions = list(self._subscriptions.get(event_type, []))
            subscriptions.extend(self._subscriptions.get("*", []))

        futures = []
        expired = []

        for sub in subscriptions:
            # Check if callback is still valid (weak refs)
            callback = sub.get_callback()
            if callback is None:
                expired.append(sub)
                continue

            # Check filters
            if not sub.matches(event):
                continue

            sub.call_count += 1

            # Execute based on priority
            if sub.priority == EventPriority.CRITICAL:
                # Synchronous execution for critical handlers
                self._execute_callback(sub, callback, event)
            else:
                # Async execution for others
                self._pending_count += 1
                future = self._executor.submit(
                    self._execute_callback_with_tracking,
                    sub, callback, event
                )
                futures.append(future)

        # Clean up expired weak references
        for sub in expired:
            self.off(sub)

        # Wait if requested
        if wait and futures:
            for future in futures:
                future.result()
            return None

        return futures if futures else None

    def _execute_callback(
        self,
        sub: Subscription,
        callback: Callable,
        event: Event
    ) -> None:
        """Execute callback with error handling."""
        try:
            callback(event)
            self._metrics['events_delivered'] += 1
        except Exception as e:
            self._metrics['errors'] += 1
            error_handler = sub.error_handler or self._default_error_handler
            error_handler(e, event, sub)

    def _execute_callback_with_tracking(
        self,
        sub: Subscription,
        callback: Callable,
        event: Event
    ) -> None:
        """Execute callback with pending count tracking."""
        try:
            self._execute_callback(sub, callback, event)
        finally:
            self._pending_count -= 1

    def _cleanup_dead_subscription(self, event_type: str, sub_id: str):
        """Called when a weak-referenced object is garbage collected."""
        with self._lock:
            subs = self._subscriptions.get(event_type, [])
            self._subscriptions[event_type] = [
                s for s in subs if s.id != sub_id
            ]
            self._metrics['subscriptions_removed'] += 1

    def _log_error(
        self,
        error: Exception,
        event: Event,
        subscription: Subscription
    ) -> None:
        """Default error handler."""
        logger.error(
            f"Error in event handler:\n"
            f"  Event: {event.type} (id={event.id})\n"
            f"  Subscription: {subscription.id}\n"
            f"  Error: {error}\n"
            f"  Traceback: {traceback.format_exc()}"
        )

    @contextmanager
    def pause(self, *event_types: str):
        """Temporarily pause specific event types."""
        try:
            for et in event_types:
                self._paused_events.add(et)
            yield
        finally:
            for et in event_types:
                self._paused_events.discard(et)

    def get_metrics(self) -> dict:
        """Return current metrics."""
        with self._lock:
            return {
                **self._metrics,
                'pending_events': self._pending_count,
                'active_subscriptions': sum(
                    len(subs) for subs in self._subscriptions.values()
                ),
            }

    def clear(self, event_type: str = None) -> None:
        """Clear subscriptions."""
        with self._lock:
            if event_type:
                removed = len(self._subscriptions.pop(event_type, []))
            else:
                removed = sum(len(s) for s in self._subscriptions.values())
                self._subscriptions.clear()
            self._metrics['subscriptions_removed'] += removed

    def shutdown(self, wait: bool = True) -> None:
        """Shutdown the executor."""
        self._executor.shutdown(wait=wait)
```

---

## Common Pitfalls and Anti-Patterns

<div style="background: #3d2525; border-left: 4px solid #f85149; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Anti-Pattern 1: The God Subject</strong>
<p style="color: #ddd; margin: 8px 0;">A single subject that everything observes, creating a tight coupling bottleneck.</p>

```python
# BAD: Everything watches one global event bus
class Application:
    event_bus = GlobalEventBus()  # Singleton!

# All components coupled through single point
user_service.events = Application.event_bus
order_service.events = Application.event_bus
inventory_service.events = Application.event_bus
# Any change to event_bus affects everything
```

<p style="color: #4ecdc4; margin-top: 12px;"><strong>Fix:</strong> Domain-specific event buses with clear boundaries.</p>
</div>

<div style="background: #3d2525; border-left: 4px solid #f85149; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Anti-Pattern 2: Observer Cascade</strong>
<p style="color: #ddd; margin: 8px 0;">Observer A triggers Observer B which triggers Observer A.</p>

```python
# BAD: Infinite loop
@event_bus.on('user.updated')
def sync_profile(event):
    update_profile(event.data)
    event_bus.emit('profile.updated', event.data)

@event_bus.on('profile.updated')
def sync_user(event):
    update_user(event.data)
    event_bus.emit('user.updated', event.data)  # Loop!
```

<p style="color: #4ecdc4; margin-top: 12px;"><strong>Fix:</strong> Use correlation IDs or event source tracking to detect cycles.</p>
</div>

<div style="background: #3d2525; border-left: 4px solid #f85149; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Anti-Pattern 3: Synchronous Blocking</strong>
<p style="color: #ddd; margin: 8px 0;">Slow observer blocks all other observers.</p>

```python
# BAD: 5 second database write blocks email
@event_bus.on('order.created')
def audit_log(event):
    database.insert_slow(event.data)  # 5 seconds!

@event_bus.on('order.created')
def send_email(event):
    # Waits 5 seconds because audit_log runs first
    email.send(event.data)
```

<p style="color: #4ecdc4; margin-top: 12px;"><strong>Fix:</strong> Use async execution with priorities and timeouts.</p>
</div>

---

## Related Patterns

- [[Mediator]](/topic/design-patterns/mediator) - Centralizes communication instead of direct observer relationships
- [[Pub/Sub]](/topic/system-design/message-queues) - Distributed observer pattern with message broker
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Store events as the source of truth
- [[CQRS]](/topic/system-design/cqrs) - Separate read/write models, often event-driven
- [[Chain of Responsibility]](/topic/design-patterns/chain-of-responsibility) - When observer order matters
- [[State]](/topic/design-patterns/state) - Often combined with Observer for state machines

---

## Summary: Key Takeaways for Interviews

1. **Push vs Pull:** Push is simpler but couples subject to observer needs. Pull is more flexible but has consistency challenges. Hybrid approaches work best in practice.

2. **Memory Leaks:** Always pair subscribe with unsubscribe. Consider weak references for automatic cleanup, but understand their limitations.

3. **Event Ordering:** Classic Observer provides no ordering guarantees. If order matters, use priorities, dependencies, or consider a different pattern.

4. **Backpressure:** Without backpressure handling, fast producers overwhelm slow consumers. Choose strategy based on data criticality.

5. **Error Handling:** Decide early: fail fast (one failure stops all) or fail safe (isolate failures). Most production systems use fail safe with error logging.

6. **Reactive Streams:** Modern evolution of Observer that adds error channels, completion signals, backpressure, and composable operators.

7. **Distributed Systems:** Observer across services requires handling out-of-order delivery, at-least-once semantics, and idempotency.
