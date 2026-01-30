# Strategy Pattern

## Overview

The Strategy pattern defines a family of algorithms, encapsulates each one in a separate class, and makes them interchangeable at runtime. This behavioral pattern allows the algorithm to vary independently from clients that use it, enabling dynamic selection of behavior without modifying consuming code. At its core, Strategy implements the Open/Closed Principle by allowing new algorithms to be added without changing existing code.

**Difficulty:** Intermediate to Advanced
**Category:** Behavioral Pattern
**Also Known As:** Policy Pattern
**Gang of Four Classification:** Object Behavioral

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: white;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Core Insight</div>
<div style="font-size: 0.95rem; line-height: 1.6;">
    Strategy pattern transforms "what algorithm to use" from a compile-time decision into a runtime decision. The key mental model: instead of the context containing conditional logic to select behavior, you inject the behavior itself as a dependency.
</div>
</div>

---

## Internal Mechanisms and Architecture

### The Fundamental Abstraction

Strategy pattern operates on three foundational components with specific responsibilities:

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="display: flex; flex-direction: column; gap: 1.5rem;">
<div style="display: flex; gap: 1rem; align-items: flex-start;">
<div style="background: #3b82f6; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
<div style="flex: 1;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">Context (The Host)</div>
<div style="color: #475569; font-size: 0.9rem;">Maintains a reference to a Strategy object. Delegates algorithm execution to the current strategy. Does NOT know which concrete strategy it holds - only that it conforms to the interface.</div>
</div>
</div>
<div style="display: flex; gap: 1rem; align-items: flex-start;">
<div style="background: #22c55e; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
<div style="flex: 1;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.25rem;">Strategy Interface (The Contract)</div>
<div style="color: #475569; font-size: 0.9rem;">Declares the method(s) that all concrete strategies must implement. This is the polymorphic boundary that enables substitutability. Can be an interface, abstract class, or in dynamic languages, a duck-typed protocol.</div>
</div>
</div>
<div style="display: flex; gap: 1rem; align-items: flex-start;">
<div style="background: #f59e0b; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
<div style="flex: 1;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.25rem;">Concrete Strategies (The Implementations)</div>
<div style="color: #475569; font-size: 0.9rem;">Each implements the strategy interface with a specific algorithm. They are completely independent of each other and unaware of the context's internal state unless explicitly passed.</div>
</div>
</div>
</div>
</div>

### Memory and Object Lifecycle Considerations

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Critical Design Decision: Stateless vs Stateful Strategies</div>
<div style="color: #78350f; font-size: 0.9rem; line-height: 1.6;">
<strong>Stateless strategies</strong> can be shared across multiple contexts (flyweight pattern), reducing memory footprint. A single PercentageDiscountStrategy(10%) instance can serve thousands of shopping carts.
    <br/><br/>
<strong>Stateful strategies</strong> maintain per-execution state and require careful lifecycle management. Each context needs its own instance, and you must consider thread safety implications.
</div>
</div>

**Assumption:** Most Strategy implementations assume strategies are stateless. If your strategy accumulates state between executions, you're likely conflating Strategy with [[State Pattern]](/topics/design-patterns/state) or should extract that state into explicit context parameters.

### Data Flow Architecture

The context must provide strategies with the data they need. There are two fundamental approaches:

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 300px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Push Model (Explicit Parameters)</div>
<div style="font-size: 0.9rem; color: #1e40af; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><code>strategy.execute(data, config)</code></div>
<strong>Pros:</strong> Clear dependencies, easily testable, strategies remain decoupled<br/>
<strong>Cons:</strong> May pass unused data, parameter lists can grow<br/>
<strong>Use when:</strong> Different strategies need different subsets of data
</div>
</div>
<div style="flex: 1; min-width: 300px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Pull Model (Context Reference)</div>
<div style="font-size: 0.9rem; color: #166534; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><code>strategy.execute(context)</code></div>
<strong>Pros:</strong> Strategies access exactly what they need, simpler signatures<br/>
<strong>Cons:</strong> Tight coupling to context interface, harder to test in isolation<br/>
<strong>Use when:</strong> All strategies need access to most context data
</div>
</div>
</div>

**Trade-off:** The push model promotes better encapsulation and testability at the cost of potentially verbose method signatures. The pull model simplifies signatures but creates bidirectional coupling between strategy and context.

---

## Interview Deep-Dive: Internal Mechanisms

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: Explain how the Strategy pattern achieves runtime algorithm selection.</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> The context holds a reference typed to the strategy interface, not a concrete implementation. When the context needs to execute the algorithm, it calls the interface method on whatever concrete strategy is currently assigned. Because the reference is polymorphic, the actual code executed is determined by the runtime type of the assigned strategy object, not by compile-time binding. This allows swapping algorithms by simply reassigning the strategy reference - no conditionals, no recompilation.
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: What happens at the virtual dispatch level when strategy.execute() is called?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> In languages with vtables (C++, Java, C#), calling an interface method triggers a vtable lookup. The runtime examines the object's vtable pointer, finds the function pointer for the called method, and jumps to that address. This adds one pointer indirection compared to direct function calls - typically 1-3 nanoseconds overhead.
    <br/><br/>
    In dynamic languages (Python, JavaScript), method resolution involves dictionary lookups on the object and its prototype chain, which is slower but still negligible for most applications. JIT compilers can often inline monomorphic call sites where only one strategy type is ever used.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: How would you optimize Strategy pattern for a hot path called millions of times per second?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Several techniques:
    <br/><br/>
<strong>1. Monomorphization:</strong> If you know strategies at compile time, use generics/templates to generate specialized code paths, eliminating virtual dispatch entirely.
    <br/><br/>
<strong>2. Strategy caching:</strong> If strategy selection is based on repeating conditions, cache the selected strategy to avoid repeated selection logic.
    <br/><br/>
<strong>3. Batch processing:</strong> Instead of calling strategy.execute() per item, pass batches: strategy.executeBatch(items). This amortizes the virtual call cost.
    <br/><br/>
<strong>4. Branch prediction hints:</strong> If one strategy is used 95% of the time, structure code so the CPU's branch predictor can optimize for the common case.
    <br/><br/>
<strong>5. Consider inlining:</strong> For truly critical paths, the Strategy pattern may be inappropriate - inline the algorithm and accept reduced flexibility.
</div>
</div>

---

## Strategy vs State Pattern: The Critical Distinction

This comparison appears in virtually every design patterns interview. While structurally identical, the patterns differ fundamentally in intent and usage.

<div style="background: #f8fafc; border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.2rem; color: #1e293b; text-align: center; margin-bottom: 1.5rem;">Structural Identity, Semantic Difference</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
<div style="background: #dbeafe; border-radius: 12px; padding: 1.5rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; font-size: 1.1rem; text-align: center; padding-bottom: 0.75rem; border-bottom: 2px solid #93c5fd; margin-bottom: 1rem;">STRATEGY</div>
<div style="font-size: 0.9rem; color: #1e40af; line-height: 1.8;">
<div style="margin-bottom: 0.75rem;"><strong>Who decides:</strong> External client chooses strategy</div>
<div style="margin-bottom: 0.75rem;"><strong>Awareness:</strong> Strategies are unaware of each other</div>
<div style="margin-bottom: 0.75rem;"><strong>Transitions:</strong> None - strategies don't trigger switches</div>
<div style="margin-bottom: 0.75rem;"><strong>Question answered:</strong> "How should I do X?"</div>
<div style="margin-bottom: 0.75rem;"><strong>Lifetime:</strong> Often set once, occasionally changed</div>
<div><strong>Mental model:</strong> Interchangeable algorithms</div>
</div>
</div>
<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; color: #166534; font-size: 1.1rem; text-align: center; padding-bottom: 0.75rem; border-bottom: 2px solid #86efac; margin-bottom: 1rem;">STATE</div>
<div style="font-size: 0.9rem; color: #166534; line-height: 1.8;">
<div style="margin-bottom: 0.75rem;"><strong>Who decides:</strong> Object itself or states trigger transitions</div>
<div style="margin-bottom: 0.75rem;"><strong>Awareness:</strong> States often know about valid transitions</div>
<div style="margin-bottom: 0.75rem;"><strong>Transitions:</strong> States can trigger state changes</div>
<div style="margin-bottom: 0.75rem;"><strong>Question answered:</strong> "What can I do now?"</div>
<div style="margin-bottom: 0.75rem;"><strong>Lifetime:</strong> Changes frequently as object evolves</div>
<div><strong>Mental model:</strong> Finite state machine</div>
</div>
</div>
</div>
</div>

### Concrete Example Comparison

```python
# STRATEGY: Payment processing - client chooses method
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy):
        self._strategy = strategy  # Set externally, rarely changes

    def process(self, amount):
        return self._strategy.charge(amount)

# User explicitly selects: "I want to pay with PayPal"
processor = PaymentProcessor(PayPalStrategy())


# STATE: Order lifecycle - transitions happen internally
class Order:
    def __init__(self):
        self._state = PendingState(self)  # Internal management

    def pay(self):
        self._state.pay()  # State may transition to PaidState

    def ship(self):
        self._state.ship()  # PaidState transitions to ShippedState

# The order manages its own state transitions
order = Order()
order.pay()   # Pending -> Paid (automatic transition)
order.ship()  # Paid -> Shipped (automatic transition)
```

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Interview Insight</div>
<div style="color: #78350f; font-size: 0.9rem; line-height: 1.6;">
    The key tell: if you're modeling "modes" or "algorithms" that a user/client selects, use Strategy. If you're modeling "lifecycle phases" or "conditions" that the object transitions through based on events, use [[State Pattern]](/topics/design-patterns/state).
</div>
</div>

### Interview Deep-Dive: Strategy vs State

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: When would refactoring from Strategy to State (or vice versa) be appropriate?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Refactor Strategy to State when you discover that "strategies" naturally transition to each other based on operations. For example, if a CompressionStrategy starts needing to switch from LZ4 to GZIP when data exceeds a threshold, you've discovered implicit state.
    <br/><br/>
    Refactor State to Strategy when you realize states don't actually transition - they're just different modes that the client selects. If your "states" never call setState() internally, they're probably strategies.
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: Can Strategy and State patterns coexist in the same class? Give an example.</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> Absolutely. Consider a video player:
    <br/><br/>
<strong>State:</strong> PlayingState, PausedState, BufferingState (lifecycle transitions)
    <br/>
<strong>Strategy:</strong> AudioCodecStrategy (AAC, MP3, FLAC), VideoScalingStrategy (fit, fill, crop)
    <br/><br/>
    The player transitions through states based on user actions and network conditions. Independently, the user can select codec and scaling strategies. These are orthogonal concerns - state manages "what operations are valid now" while strategy manages "how to perform those operations."
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: How would you design a hybrid pattern where strategies can influence state transitions?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Use a result-based approach where strategy execution returns transition hints:
    <br/><br/>
    ```python
    class StrategyResult:
    def __init__(self, value, suggested_state=None):
    self.value = value
    self.suggested_state = suggested_state

    class Context:
    def execute(self):
    result = self._strategy.execute(self._data)
    if result.suggested_state:
    self._state = result.suggested_state
    return result.value
    ```
    <br/>
    This maintains separation of concerns: strategies compute results and can suggest transitions, but the context (or its current state) decides whether to honor those suggestions. This avoids strategies directly manipulating context state while enabling strategy-influenced transitions.
</div>
</div>

---

## Runtime Strategy Switching: Patterns and Pitfalls

### Dynamic Selection Mechanisms

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Strategy Selection Approaches</div>
<div style="display: flex; flex-direction: column; gap: 1rem;">
<div style="background: #dbeafe; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #1e40af;">1. Direct Injection</div>
<div style="font-size: 0.9rem; color: #1e40af;">Client explicitly passes strategy. Most flexible, requires client knowledge.</div>
</div>
<div style="background: #dcfce7; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #166534;">2. Factory-Based Selection</div>
<div style="font-size: 0.9rem; color: #166534;">Factory examines context and returns appropriate strategy. Centralizes selection logic.</div>
</div>
<div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #92400e;">3. Registry/Plugin System</div>
<div style="font-size: 0.9rem; color: #92400e;">Strategies self-register with metadata. System matches request to registered strategies.</div>
</div>
<div style="background: #fce7f3; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #9d174d;">4. Configuration-Driven</div>
<div style="font-size: 0.9rem; color: #9d174d;">Strategy selected from config file, database, or feature flags. Enables runtime changes without deployment.</div>
</div>
</div>
</div>

### Strategy Registry Pattern

```python
from typing import Dict, Type, Callable, Any, Optional
from abc import ABC, abstractmethod

class SortingStrategy(ABC):
    """Base strategy for sorting algorithms."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Identifier for registry lookup."""
        pass

    @property
    @abstractmethod
    def time_complexity(self) -> str:
        """For documentation and selection."""
        pass

    @property
    @abstractmethod
    def stable(self) -> bool:
        """Whether sort preserves equal element order."""
        pass

    @abstractmethod
    def sort(self, data: list, key: Callable = None, reverse: bool = False) -> list:
        pass


class StrategyRegistry:
    """
    Central registry for strategy discovery and selection.
    Supports multiple selection criteria.
    """

    _instance: Optional['StrategyRegistry'] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._strategies: Dict[str, SortingStrategy] = {}
        return cls._instance

    def register(self, strategy: SortingStrategy) -> 'StrategyRegistry':
        """Register a strategy by its name."""
        self._strategies[strategy.name] = strategy
        return self

    def get(self, name: str) -> SortingStrategy:
        """Direct lookup by name."""
        if name not in self._strategies:
            raise KeyError(f"Unknown strategy: {name}. Available: {list(self._strategies.keys())}")
        return self._strategies[name]

    def select_for_size(self, data_size: int, need_stable: bool = False) -> SortingStrategy:
        """
        Select optimal strategy based on data characteristics.
        This encapsulates the selection heuristics.
        """
        candidates = list(self._strategies.values())

        if need_stable:
            candidates = [s for s in candidates if s.stable]

        # Heuristic: small data -> simple algorithm, large data -> efficient algorithm
        if data_size < 50:
            # Prefer insertion sort for small arrays
            for s in candidates:
                if 'insertion' in s.name.lower():
                    return s
        elif data_size < 10000:
            # Prefer quicksort for medium arrays
            for s in candidates:
                if 'quick' in s.name.lower():
                    return s
        else:
            # Prefer merge sort for large arrays (stable) or heap sort
            for s in candidates:
                if 'merge' in s.name.lower():
                    return s

        # Fallback to first available
        return candidates[0] if candidates else None

    def list_all(self) -> Dict[str, Dict[str, Any]]:
        """Return all strategies with metadata for UI/documentation."""
        return {
            name: {
                'time_complexity': s.time_complexity,
                'stable': s.stable,
            }
            for name, s in self._strategies.items()
        }


# Concrete implementations
class QuickSortStrategy(SortingStrategy):
    @property
    def name(self) -> str:
        return "quicksort"

    @property
    def time_complexity(self) -> str:
        return "O(n log n) average, O(n^2) worst"

    @property
    def stable(self) -> bool:
        return False  # Standard quicksort is not stable

    def sort(self, data: list, key: Callable = None, reverse: bool = False) -> list:
        if len(data) <= 1:
            return data.copy()

        # Three-way partitioning for better handling of duplicates
        result = data.copy()
        self._quicksort(result, 0, len(result) - 1, key or (lambda x: x))
        return result[::-1] if reverse else result

    def _quicksort(self, arr, low, high, key):
        if low < high:
            pivot_idx = self._partition(arr, low, high, key)
            self._quicksort(arr, low, pivot_idx - 1, key)
            self._quicksort(arr, pivot_idx + 1, high, key)

    def _partition(self, arr, low, high, key):
        pivot = key(arr[high])
        i = low - 1
        for j in range(low, high):
            if key(arr[j]) <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1


class MergeSortStrategy(SortingStrategy):
    @property
    def name(self) -> str:
        return "mergesort"

    @property
    def time_complexity(self) -> str:
        return "O(n log n) guaranteed"

    @property
    def stable(self) -> bool:
        return True  # Merge sort preserves order of equal elements

    def sort(self, data: list, key: Callable = None, reverse: bool = False) -> list:
        if len(data) <= 1:
            return data.copy()

        key = key or (lambda x: x)
        result = self._mergesort(data, key)
        return result[::-1] if reverse else result

    def _mergesort(self, arr, key):
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = self._mergesort(arr[:mid], key)
        right = self._mergesort(arr[mid:], key)
        return self._merge(left, right, key)

    def _merge(self, left, right, key):
        result = []
        i = j = 0

        while i < len(left) and j < len(right):
            # <= ensures stability (left element comes first on tie)
            if key(left[i]) <= key(right[j]):
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1

        result.extend(left[i:])
        result.extend(right[j:])
        return result


class InsertionSortStrategy(SortingStrategy):
    @property
    def name(self) -> str:
        return "insertionsort"

    @property
    def time_complexity(self) -> str:
        return "O(n^2) worst, O(n) nearly sorted"

    @property
    def stable(self) -> bool:
        return True

    def sort(self, data: list, key: Callable = None, reverse: bool = False) -> list:
        result = data.copy()
        key = key or (lambda x: x)

        for i in range(1, len(result)):
            current = result[i]
            j = i - 1
            while j >= 0 and key(result[j]) > key(current):
                result[j + 1] = result[j]
                j -= 1
            result[j + 1] = current

        return result[::-1] if reverse else result


# Context that uses the registry
class DataSorter:
    """Context class demonstrating registry-based strategy selection."""

    def __init__(self, registry: StrategyRegistry):
        self._registry = registry
        self._strategy: Optional[SortingStrategy] = None
        self._auto_select = True

    def set_strategy(self, name: str) -> 'DataSorter':
        """Manually set strategy by name."""
        self._strategy = self._registry.get(name)
        self._auto_select = False
        return self

    def enable_auto_selection(self) -> 'DataSorter':
        """Let the system choose optimal strategy."""
        self._auto_select = True
        return self

    def sort(self, data: list, *, key: Callable = None,
             reverse: bool = False, need_stable: bool = False) -> list:
        """Sort data using current or auto-selected strategy."""

        if self._auto_select:
            strategy = self._registry.select_for_size(len(data), need_stable)
        else:
            strategy = self._strategy

        if not strategy:
            raise RuntimeError("No sorting strategy available")

        return strategy.sort(data, key, reverse)


# Usage
registry = StrategyRegistry()
registry.register(QuickSortStrategy())
registry.register(MergeSortStrategy())
registry.register(InsertionSortStrategy())

sorter = DataSorter(registry)

# Auto-selection based on data size
small_data = [3, 1, 4, 1, 5]
large_data = list(range(100000, 0, -1))

sorted_small = sorter.sort(small_data)  # Uses insertion sort
sorted_large = sorter.sort(large_data)  # Uses merge sort

# Manual override
sorter.set_strategy("quicksort")
sorted_quick = sorter.sort(small_data)  # Forces quicksort
```

### Thread Safety in Strategy Switching

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.5rem;">Critical Concurrency Consideration</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
    If the context is shared across threads and strategies can be swapped at runtime, you face a race condition: Thread A may read the strategy reference while Thread B is updating it, leading to torn reads or use of partially-constructed strategy objects.
</div>
</div>

```python
import threading
from typing import Optional

class ThreadSafeContext:
    """
    Demonstrates thread-safe strategy switching.
    Uses read-write lock for optimal concurrent read access.
    """

    def __init__(self, initial_strategy: SortingStrategy):
        self._strategy = initial_strategy
        self._lock = threading.RLock()  # Reentrant for nested calls

    def set_strategy(self, strategy: SortingStrategy) -> None:
        """Thread-safe strategy replacement."""
        with self._lock:
            self._strategy = strategy

    def execute(self, data: list) -> list:
        """
        Thread-safe execution.
        Captures strategy reference under lock, then executes outside lock.
        """
        with self._lock:
            strategy = self._strategy  # Capture reference

        # Execute outside lock - allows concurrent executions with same strategy
        return strategy.sort(data)


class CopyOnWriteContext:
    """
    Alternative: Copy-on-write for lock-free reads.
    Ideal when reads vastly outnumber writes.
    """

    def __init__(self, initial_strategy: SortingStrategy):
        self._strategy = initial_strategy  # Atomic reference

    def set_strategy(self, strategy: SortingStrategy) -> None:
        """
        Atomic replacement - Python's GIL makes reference assignment atomic.
        For languages without GIL, use atomic references.
        """
        self._strategy = strategy

    def execute(self, data: list) -> list:
        """Lock-free read - safe due to atomic reference."""
        return self._strategy.sort(data)
```

### Interview Deep-Dive: Runtime Strategy Switching

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: What are the risks of changing strategies during execution?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Three main risks:
    <br/><br/>
<strong>1. Inconsistent state:</strong> If an operation spans multiple strategy calls, switching mid-operation produces inconsistent results.
    <br/><br/>
<strong>2. Resource leaks:</strong> If strategies hold resources (connections, file handles), switching without proper cleanup causes leaks.
    <br/><br/>
<strong>3. Thread safety:</strong> Concurrent reads during a write can see torn references or partially-constructed objects.
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How would you implement strategy hot-reloading from a configuration file?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> Use a file watcher combined with a strategy factory:
    <br/><br/>
    1. Watch config file for changes (inotify on Linux, FSEvents on macOS)
    <br/>2. On change, parse new configuration
    <br/>3. Use factory to instantiate new strategy from config
    <br/>4. Atomically swap the strategy reference
    <br/>5. If old strategy needs cleanup, do it after swap (not before)
    <br/><br/>
    Key consideration: validate new configuration before swapping. If validation fails, keep the old strategy and log the error. Never leave the system without a valid strategy.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a strategy versioning system that supports gradual rollouts and instant rollbacks.</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Implement a versioned strategy registry with traffic splitting:
    <br/><br/>
    ```python
    class VersionedStrategyManager:
    def __init__(self):
    self._versions = {}  # version -> strategy
    self._traffic_split = {}  # version -> percentage
    self._default_version = None

    def register_version(self, version, strategy, traffic_pct=0):
    self._versions[version] = strategy
    self._traffic_split[version] = traffic_pct

    def set_default(self, version):
    self._default_version = version

    def rollout(self, version, target_pct, step_pct=10, interval_sec=60):
    # Gradually increase traffic to new version
    current = self._traffic_split.get(version, 0)
    while current < target_pct:
    current = min(current + step_pct, target_pct)
    self._traffic_split[version] = current
    self._rebalance_traffic()
    time.sleep(interval_sec)
    if self._health_check_failed(version):
    self.instant_rollback(version)
    return False
    return True

    def instant_rollback(self, version):
    self._traffic_split[version] = 0
    self._rebalance_traffic()

    def select_for_request(self, request_id):
    # Deterministic bucketing based on request ID
    bucket = hash(request_id) % 100
    cumulative = 0
    for version, pct in self._traffic_split.items():
    cumulative += pct
    if bucket < cumulative:
    return self._versions[version]
    return self._versions[self._default_version]
    ```
    <br/>
    This enables canary deployments, A/B testing, and instant rollback without deployment. The deterministic bucketing ensures consistent user experience across requests.
</div>
</div>

---

## Functional Alternatives to Strategy Pattern

In functional programming languages (and modern multi-paradigm languages), strategy pattern can be implemented without classes using first-class functions.

### Function-Based Strategies

```python
from typing import Callable, Dict, Any, TypeVar, Protocol
from decimal import Decimal
from functools import partial

# Type definitions
T = TypeVar('T')
DiscountFunction = Callable[[Decimal, Dict[str, Any]], Decimal]

# Strategies as pure functions
def no_discount(subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
    """Null strategy - no discount applied."""
    return Decimal("0")

def percentage_discount(percent: Decimal, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
    """Parameterized percentage discount."""
    return subtotal * (percent / Decimal("100"))

def fixed_amount_discount(amount: Decimal, min_purchase: Decimal,
                          subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
    """Fixed amount off with minimum purchase requirement."""
    if subtotal >= min_purchase:
        return min(amount, subtotal)
    return Decimal("0")

def loyalty_discount(subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
    """Discount based on loyalty tier from context."""
    tier_rates = {
        "bronze": Decimal("5"),
        "silver": Decimal("10"),
        "gold": Decimal("15"),
        "platinum": Decimal("20"),
    }
    tier = context.get("loyalty_tier", "").lower()
    rate = tier_rates.get(tier, Decimal("0"))
    return subtotal * (rate / Decimal("100"))


# Strategy factory using partial application
def create_percentage_strategy(percent: Decimal) -> DiscountFunction:
    """Factory that creates percentage discount strategies."""
    return partial(percentage_discount, percent)

def create_fixed_strategy(amount: Decimal, min_purchase: Decimal = Decimal("0")) -> DiscountFunction:
    """Factory that creates fixed amount strategies."""
    return partial(fixed_amount_discount, amount, min_purchase)


# Context using functional strategies
class FunctionalCart:
    """Shopping cart using function-based strategies."""

    def __init__(self):
        self._items: list = []
        self._discount_fn: DiscountFunction = no_discount
        self._context: Dict[str, Any] = {}

    def add_item(self, name: str, price: Decimal, quantity: int = 1) -> 'FunctionalCart':
        self._items.append({"name": name, "price": price, "quantity": quantity})
        return self

    def set_context(self, **kwargs) -> 'FunctionalCart':
        self._context.update(kwargs)
        return self

    def set_discount(self, discount_fn: DiscountFunction) -> 'FunctionalCart':
        self._discount_fn = discount_fn
        return self

    @property
    def subtotal(self) -> Decimal:
        return sum(item["price"] * item["quantity"] for item in self._items)

    @property
    def discount(self) -> Decimal:
        return self._discount_fn(self.subtotal, self._context)

    @property
    def total(self) -> Decimal:
        return self.subtotal - self.discount


# Usage
cart = FunctionalCart()
cart.add_item("Laptop", Decimal("999.99"))
cart.add_item("Mouse", Decimal("49.99"))

# Using different strategies
cart.set_discount(create_percentage_strategy(Decimal("10")))
print(f"10% off: ${cart.total}")

cart.set_discount(create_fixed_strategy(Decimal("50"), Decimal("100")))
print(f"$50 off: ${cart.total}")

cart.set_context(loyalty_tier="gold")
cart.set_discount(loyalty_discount)
print(f"Gold member: ${cart.total}")
```

### Strategy Composition with Higher-Order Functions

```python
from typing import List
from functools import reduce

# Higher-order functions for strategy composition
def compose_strategies(*strategies: DiscountFunction) -> DiscountFunction:
    """
    Compose multiple strategies - each applies to remaining amount.
    Like stacking coupons: 10% off, then $5 off the discounted price.
    """
    def composed(subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        total_discount = Decimal("0")
        remaining = subtotal

        for strategy in strategies:
            discount = strategy(remaining, context)
            total_discount += discount
            remaining -= discount

        return total_discount

    return composed


def best_of_strategies(*strategies: DiscountFunction) -> DiscountFunction:
    """Select the strategy that gives the maximum discount."""
    def selector(subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        discounts = [s(subtotal, context) for s in strategies]
        return max(discounts)

    return selector


def conditional_strategy(
    condition: Callable[[Decimal, Dict[str, Any]], bool],
    if_true: DiscountFunction,
    if_false: DiscountFunction = no_discount
) -> DiscountFunction:
    """Strategy that applies conditionally."""
    def conditional(subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        if condition(subtotal, context):
            return if_true(subtotal, context)
        return if_false(subtotal, context)

    return conditional


# Example compositions
vip_discount = compose_strategies(
    loyalty_discount,  # First apply loyalty discount
    create_percentage_strategy(Decimal("5")),  # Then additional 5% on remainder
)

best_deal = best_of_strategies(
    create_percentage_strategy(Decimal("15")),
    create_fixed_strategy(Decimal("25"), Decimal("100")),
    loyalty_discount,
)

weekday_discount = conditional_strategy(
    condition=lambda s, ctx: ctx.get("is_weekday", False),
    if_true=create_percentage_strategy(Decimal("10")),
    if_false=create_percentage_strategy(Decimal("5")),
)
```

### When to Use Classes vs Functions

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 300px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Prefer Classes When:</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #1e40af; line-height: 1.6;">
<li>Strategies need multiple methods</li>
<li>Strategies require shared state or resources</li>
<li>You need metadata (name, description, version)</li>
<li>Strategies are loaded dynamically (plugins)</li>
<li>Complex initialization or lifecycle management</li>
<li>IDE support for interface implementation</li>
</ul>
</div>
<div style="flex: 1; min-width: 300px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Prefer Functions When:</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #166534; line-height: 1.6;">
<li>Single-method strategies</li>
<li>Stateless algorithms</li>
<li>Heavy use of composition (map, filter, reduce)</li>
<li>Functional programming paradigm</li>
<li>Closures can capture all needed state</li>
<li>Simpler testing (no mocking needed)</li>
</ul>
</div>
</div>

### Interview Deep-Dive: Functional Alternatives

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: Are lambdas and anonymous functions a valid implementation of Strategy pattern?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Yes. The Gang of Four Strategy pattern predates widespread first-class function support, but the essence is "encapsulate algorithm and make it interchangeable." A lambda <code>(x, ctx) => x * 0.9</code> for a 10% discount is a perfectly valid strategy. The pattern is about the concept of swappable behavior, not necessarily about classes and interfaces.
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How do you handle strategy metadata (name, description) in a functional approach?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> Several approaches:
    <br/><br/>
<strong>1. Named tuples/dataclasses:</strong> Bundle function with metadata
    ```python
    @dataclass
    class Strategy:
    name: str
    description: str
    execute: Callable
    ```
    <br/>
<strong>2. Function attributes:</strong> Python allows setting attributes on functions
    ```python
    def my_strategy(x, ctx): ...
    my_strategy.name = "My Strategy"
    my_strategy.description = "Does something"
    ```
    <br/>
<strong>3. Decorator pattern:</strong> Wrap functions with metadata
    ```python
    @strategy(name="Ten Percent", description="10% off")
    def ten_percent(x, ctx): ...
    ```
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: How would you implement a type-safe strategy pattern in TypeScript that supports both class and function strategies?</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Use a union type that accepts both:
    <br/><br/>
    ```typescript
    // Strategy can be either a function or an object with execute method
    type StrategyFunction<T, R> = (input: T, context: Context) => R;

      interface StrategyObject<T, R> {
        name: string;
        execute: (input: T, context: Context) => R;
        }

        type Strategy<T, R> = StrategyFunction<T, R> | StrategyObject<T, R>;

              // Context normalizes both forms
              class StrategyContext<T, R> {
                constructor(private strategy: Strategy<T, R>) {}

                  execute(input: T, context: Context): R {
                  if (typeof this.strategy === 'function') {
                  return this.strategy(input, context);
                  }
                  return this.strategy.execute(input, context);
                  }

                  getName(): string {
                  if (typeof this.strategy === 'function') {
                  return this.strategy.name || 'anonymous';
                  }
                  return this.strategy.name;
                  }
                  }
                  ```
  <br/>
  This provides flexibility while maintaining type safety. The context handles normalization, so clients can use whichever form is most convenient.
</div>
</div>

  ---

## Real-World Implementation: Payment Processing

  Payment systems are a canonical Strategy pattern use case. Different payment methods have fundamentally different processing flows, fee structures, and validation requirements.

              ```python
              from abc import ABC, abstractmethod
              from dataclasses import dataclass, field
              from decimal import Decimal, ROUND_HALF_UP
              from typing import Dict, Any, Optional, List
              from datetime import datetime
              from enum import Enum
              import re
              import hashlib


              class PaymentStatus(Enum):
              PENDING = "pending"
              PROCESSING = "processing"
              COMPLETED = "completed"
              FAILED = "failed"
              REFUNDED = "refunded"


              @dataclass
              class PaymentResult:
              """Immutable result of a payment operation."""
              success: bool
              status: PaymentStatus
              transaction_id: Optional[str] = None
              error_code: Optional[str] = None
              error_message: Optional[str] = None
              processor_response: Dict[str, Any] = field(default_factory=dict)
              fees: Decimal = Decimal("0")
              net_amount: Decimal = Decimal("0")


              @dataclass
              class PaymentRequest:
              """Payment request with all necessary details."""
              amount: Decimal
              currency: str
              customer_id: str
              idempotency_key: str
              metadata: Dict[str, Any] = field(default_factory=dict)


              class PaymentStrategy(ABC):
              """
              Abstract payment strategy defining the contract for all payment methods.
              Each concrete strategy encapsulates a complete payment flow.
              """

              @property
              @abstractmethod
              def name(self) -> str:
              """Human-readable payment method name."""
              pass

              @property
              @abstractmethod
              def supported_currencies(self) -> List[str]:
              """List of ISO 4217 currency codes this method supports."""
              pass

              @property
              @abstractmethod
              def min_amount(self) -> Decimal:
              """Minimum transaction amount in base currency."""
              pass

              @property
              @abstractmethod
              def max_amount(self) -> Decimal:
              """Maximum transaction amount in base currency."""
              pass

              @abstractmethod
              def calculate_fees(self, amount: Decimal, currency: str) -> Decimal:
              """Calculate processing fees for this payment method."""
              pass

              @abstractmethod
              def validate(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> List[str]:
              """
              Validate payment details before processing.
              Returns list of validation errors (empty if valid).
              """
              pass

              @abstractmethod
              def process(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> PaymentResult:
              """
              Execute the payment.
              This is where strategy-specific logic lives.
              """
              pass

              @abstractmethod
              def refund(self, transaction_id: str, amount: Optional[Decimal] = None) -> PaymentResult:
              """Process a full or partial refund."""
              pass

              def can_process(self, request: PaymentRequest) -> bool:
              """Check if this strategy can handle the given request."""
              if request.currency not in self.supported_currencies:
              return False
              if request.amount < self.min_amount or request.amount > self.max_amount:
              return False
              return True


              class CreditCardStrategy(PaymentStrategy):
              """
              Credit card payment processing.
              Demonstrates complex validation and fee structures.
              """

              # Fee structure: percentage + fixed fee per transaction
              PERCENTAGE_FEE = Decimal("2.9")
              FIXED_FEE = Decimal("0.30")

              # Card brand specific rates (simplified)
              BRAND_RATES = {
              "visa": Decimal("2.4"),
              "mastercard": Decimal("2.4"),
              "amex": Decimal("3.5"),
              "discover": Decimal("2.5"),
              }

              @property
              def name(self) -> str:
              return "Credit Card"

              @property
              def supported_currencies(self) -> List[str]:
              return ["USD", "EUR", "GBP", "CAD", "AUD"]

              @property
              def min_amount(self) -> Decimal:
              return Decimal("0.50")

              @property
              def max_amount(self) -> Decimal:
              return Decimal("999999.99")

              def calculate_fees(self, amount: Decimal, currency: str) -> Decimal:
              """
              Credit card fees: percentage of amount + fixed fee.
              Real-world: varies by card brand, transaction type, merchant category.
              """
              percentage_fee = amount * (self.PERCENTAGE_FEE / Decimal("100"))
              total_fee = percentage_fee + self.FIXED_FEE
              return total_fee.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

              def validate(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> List[str]:
              errors = []

              card_number = payment_details.get("card_number", "")
              expiry = payment_details.get("expiry", "")
              cvv = payment_details.get("cvv", "")

              # Luhn algorithm for card number validation
              if not self._luhn_check(card_number):
              errors.append("Invalid card number")

              # Expiry validation
              if not self._validate_expiry(expiry):
              errors.append("Card has expired or invalid expiry format")

              # CVV validation
              if not re.match(r"^\d{3,4}$", cvv):
              errors.append("Invalid CVV")

              # Amount validation
              if not self.can_process(request):
              errors.append(f"Amount must be between {self.min_amount} and {self.max_amount}")

              return errors

              def _luhn_check(self, card_number: str) -> bool:
              """Validate card number using Luhn algorithm."""
              digits = [int(d) for d in card_number if d.isdigit()]
              if len(digits) < 13 or len(digits) > 19:
              return False

              checksum = 0
              for i, digit in enumerate(reversed(digits)):
              if i % 2 == 1:
              digit *= 2
              if digit > 9:
              digit -= 9
              checksum += digit

              return checksum % 10 == 0

              def _validate_expiry(self, expiry: str) -> bool:
              """Validate MM/YY or MM/YYYY expiry format."""
              match = re.match(r"^(\d{2})/(\d{2}|\d{4})$", expiry)
              if not match:
              return False

              month, year = int(match.group(1)), int(match.group(2))
              if year < 100:
              year += 2000

              if month < 1 or month > 12:
              return False

              now = datetime.now()
              expiry_date = datetime(year, month, 1)
              return expiry_date >= datetime(now.year, now.month, 1)

              def process(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> PaymentResult:
              """
              Process credit card payment.
              In production: calls payment gateway API (Stripe, Braintree, etc.)
              """
              # Validation first
              errors = self.validate(request, payment_details)
              if errors:
              return PaymentResult(
              success=False,
              status=PaymentStatus.FAILED,
              error_code="VALIDATION_ERROR",
              error_message="; ".join(errors),
              )

              # Simulate gateway call
              transaction_id = self._generate_transaction_id(request)
              fees = self.calculate_fees(request.amount, request.currency)

              # In real implementation: API call to payment processor
              # response = self._gateway.charge(...)

              return PaymentResult(
              success=True,
              status=PaymentStatus.COMPLETED,
              transaction_id=transaction_id,
              fees=fees,
              net_amount=request.amount - fees,
              processor_response={
              "authorization_code": "AUTH123456",
              "card_brand": self._detect_card_brand(payment_details["card_number"]),
              "last_four": payment_details["card_number"][-4:],
              },
              )

              def refund(self, transaction_id: str, amount: Optional[Decimal] = None) -> PaymentResult:
              """Process refund through payment gateway."""
              # In production: API call to reverse/refund the charge
              return PaymentResult(
              success=True,
              status=PaymentStatus.REFUNDED,
              transaction_id=f"REF-{transaction_id}",
              processor_response={"original_transaction": transaction_id},
              )

              def _generate_transaction_id(self, request: PaymentRequest) -> str:
              """Generate unique transaction ID using idempotency key."""
              data = f"{request.idempotency_key}:{request.customer_id}:{request.amount}"
              return f"CC-{hashlib.sha256(data.encode()).hexdigest()[:16].upper()}"

              def _detect_card_brand(self, card_number: str) -> str:
              """Detect card brand from number prefix."""
              number = card_number.replace(" ", "")
              if number.startswith("4"):
              return "visa"
              elif number[:2] in ["51", "52", "53", "54", "55"]:
              return "mastercard"
              elif number[:2] in ["34", "37"]:
              return "amex"
              elif number.startswith("6011"):
              return "discover"
              return "unknown"


              class ACHStrategy(PaymentStrategy):
              """
              ACH (Automated Clearing House) bank transfer strategy.
              Lower fees but slower settlement.
              """

              PERCENTAGE_FEE = Decimal("0.8")
              MAX_FEE = Decimal("5.00")

              @property
              def name(self) -> str:
              return "ACH Bank Transfer"

              @property
              def supported_currencies(self) -> List[str]:
              return ["USD"]  # ACH is US-only

              @property
              def min_amount(self) -> Decimal:
              return Decimal("1.00")

              @property
              def max_amount(self) -> Decimal:
              return Decimal("100000.00")

              def calculate_fees(self, amount: Decimal, currency: str) -> Decimal:
              """ACH fees: percentage with cap."""
              fee = amount * (self.PERCENTAGE_FEE / Decimal("100"))
              return min(fee, self.MAX_FEE).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

              def validate(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> List[str]:
              errors = []

              routing = payment_details.get("routing_number", "")
              account = payment_details.get("account_number", "")

              # ABA routing number validation
              if not self._validate_routing_number(routing):
              errors.append("Invalid routing number")

              # Account number basic validation
              if not re.match(r"^\d{4,17}$", account):
              errors.append("Invalid account number")

              if request.currency != "USD":
              errors.append("ACH only supports USD")

              return errors

              def _validate_routing_number(self, routing: str) -> bool:
              """Validate 9-digit ABA routing number with checksum."""
              if not re.match(r"^\d{9}$", routing):
              return False

              # ABA checksum algorithm
              digits = [int(d) for d in routing]
              checksum = (
              3 * (digits[0] + digits[3] + digits[6]) +
              7 * (digits[1] + digits[4] + digits[7]) +
              1 * (digits[2] + digits[5] + digits[8])
              )
              return checksum % 10 == 0

              def process(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> PaymentResult:
              errors = self.validate(request, payment_details)
              if errors:
              return PaymentResult(
              success=False,
              status=PaymentStatus.FAILED,
              error_code="VALIDATION_ERROR",
              error_message="; ".join(errors),
              )

              # ACH is asynchronous - returns pending status
              transaction_id = f"ACH-{hashlib.sha256(request.idempotency_key.encode()).hexdigest()[:16].upper()}"
              fees = self.calculate_fees(request.amount, request.currency)

              return PaymentResult(
              success=True,
              status=PaymentStatus.PENDING,  # ACH settles in 3-5 business days
              transaction_id=transaction_id,
              fees=fees,
              net_amount=request.amount - fees,
              processor_response={
              "settlement_date": "3-5 business days",
              "routing_last_four": payment_details["routing_number"][-4:],
              },
              )

              def refund(self, transaction_id: str, amount: Optional[Decimal] = None) -> PaymentResult:
              return PaymentResult(
              success=True,
              status=PaymentStatus.PENDING,  # ACH refunds also take time
              transaction_id=f"REF-{transaction_id}",
              )


              class CryptoStrategy(PaymentStrategy):
              """
              Cryptocurrency payment strategy.
              Demonstrates handling of volatile assets and network fees.
              """

              NETWORK_FEES = {
              "BTC": Decimal("0.0001"),  # Approximate, varies with network congestion
              "ETH": Decimal("0.005"),
              "USDC": Decimal("5.00"),  # ERC-20 gas fees
              }

              @property
              def name(self) -> str:
              return "Cryptocurrency"

              @property
              def supported_currencies(self) -> List[str]:
              return ["BTC", "ETH", "USDC"]

              @property
              def min_amount(self) -> Decimal:
              return Decimal("0.01")  # In crypto units

              @property
              def max_amount(self) -> Decimal:
              return Decimal("1000000")

              def calculate_fees(self, amount: Decimal, currency: str) -> Decimal:
              """Crypto fees: primarily network fees, no percentage."""
              return self.NETWORK_FEES.get(currency, Decimal("0.01"))

              def validate(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> List[str]:
              errors = []

              wallet_address = payment_details.get("wallet_address", "")
              currency = request.currency

              # Basic address format validation
              if currency == "BTC":
              if not re.match(r"^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$", wallet_address):
              errors.append("Invalid Bitcoin address")
              elif currency == "ETH" or currency == "USDC":
              if not re.match(r"^0x[a-fA-F0-9]{40}$", wallet_address):
              errors.append("Invalid Ethereum address")

              return errors

              def process(self, request: PaymentRequest, payment_details: Dict[str, Any]) -> PaymentResult:
              errors = self.validate(request, payment_details)
              if errors:
              return PaymentResult(
              success=False,
              status=PaymentStatus.FAILED,
              error_code="VALIDATION_ERROR",
              error_message="; ".join(errors),
              )

              # Crypto payments are typically pending until confirmations
              transaction_id = f"CRYPTO-{hashlib.sha256(request.idempotency_key.encode()).hexdigest()[:16].upper()}"

              return PaymentResult(
              success=True,
              status=PaymentStatus.PENDING,  # Awaiting blockchain confirmations
              transaction_id=transaction_id,
              fees=self.calculate_fees(request.amount, request.currency),
              processor_response={
              "confirmations_required": 3 if request.currency == "BTC" else 12,
              "expected_time": "10-60 minutes",
              },
              )

              def refund(self, transaction_id: str, amount: Optional[Decimal] = None) -> PaymentResult:
              # Crypto refunds are outbound transactions, not reversals
              return PaymentResult(
              success=True,
              status=PaymentStatus.PENDING,
              transaction_id=f"REF-{transaction_id}",
              processor_response={"note": "Refund requires separate outbound transaction"},
              )


              class PaymentProcessor:
              """
              Context class that orchestrates payment processing.
              Demonstrates strategy selection and fallback logic.
              """

              def __init__(self):
              self._strategies: Dict[str, PaymentStrategy] = {}
              self._default_strategy: Optional[PaymentStrategy] = None

              def register_strategy(self, key: str, strategy: PaymentStrategy) -> 'PaymentProcessor':
              """Register a payment strategy with a lookup key."""
              self._strategies[key] = strategy
              if self._default_strategy is None:
              self._default_strategy = strategy
              return self

              def set_default(self, key: str) -> 'PaymentProcessor':
              """Set the default payment strategy."""
              if key not in self._strategies:
              raise ValueError(f"Unknown strategy: {key}")
              self._default_strategy = self._strategies[key]
              return self

              def get_available_methods(self, currency: str, amount: Decimal) -> List[Dict[str, Any]]:
              """Return payment methods available for given currency/amount."""
              request = PaymentRequest(
              amount=amount,
              currency=currency,
              customer_id="",
              idempotency_key="",
              )

              available = []
              for key, strategy in self._strategies.items():
              if strategy.can_process(request):
              available.append({
              "key": key,
              "name": strategy.name,
              "fees": strategy.calculate_fees(amount, currency),
              })

              return available

              def process_payment(
              self,
              method: str,
              request: PaymentRequest,
              payment_details: Dict[str, Any]
              ) -> PaymentResult:
              """Process payment using specified method."""
              if method not in self._strategies:
              return PaymentResult(
              success=False,
              status=PaymentStatus.FAILED,
              error_code="UNKNOWN_METHOD",
              error_message=f"Payment method '{method}' not available",
              )

              strategy = self._strategies[method]

              if not strategy.can_process(request):
              return PaymentResult(
              success=False,
              status=PaymentStatus.FAILED,
              error_code="METHOD_UNAVAILABLE",
              error_message=f"'{strategy.name}' cannot process this request",
              )

              return strategy.process(request, payment_details)


              # Usage example
              processor = PaymentProcessor()
              processor.register_strategy("credit_card", CreditCardStrategy())
              processor.register_strategy("ach", ACHStrategy())
              processor.register_strategy("crypto", CryptoStrategy())

              # Show available methods for a purchase
              methods = processor.get_available_methods("USD", Decimal("150.00"))
              print("Available payment methods:")
              for m in methods:
              print(f"  {m['name']}: fees ${m['fees']}")

              # Process a credit card payment
              request = PaymentRequest(
              amount=Decimal("150.00"),
              currency="USD",
              customer_id="cust_123",
              idempotency_key="order_456_attempt_1",
              )

              result = processor.process_payment("credit_card", request, {
              "card_number": "4111111111111111",
              "expiry": "12/25",
              "cvv": "123",
              })

              print(f"\nPayment result: {result.status.value}")
              print(f"Transaction ID: {result.transaction_id}")
              print(f"Fees: ${result.fees}")
              print(f"Net amount: ${result.net_amount}")
              ```

### Interview Deep-Dive: Payment Processing

<div style="background: #f0f9ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: Why is idempotency important in payment strategies?</div>
<div style="color: #0c4a6e; line-height: 1.7;">
<strong>Answer:</strong> Network failures can cause clients to retry payment requests. Without idempotency, a retry could charge the customer twice. The idempotency key ensures that even if the same request is sent multiple times, the payment is only processed once.
  <br/><br/>
  Implementation: store the idempotency key with the transaction result. On subsequent requests with the same key, return the stored result instead of processing again.
</div>
</div>

<div style="background: #fdf4ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #d946ef;">
<div style="color: #a21caf; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 2: How would you handle payment method failover (e.g., if credit card fails, try ACH)?</div>
<div style="color: #701a75; line-height: 1.7;">
<strong>Answer:</strong> Implement a fallback chain strategy:
  <br/><br/>
                  ```python
                  class FallbackPaymentStrategy(PaymentStrategy):
                  def __init__(self, primary: PaymentStrategy,
                  fallbacks: List[PaymentStrategy]):
                  self._primary = primary
                  self._fallbacks = fallbacks

                  def process(self, request, details):
                  # Try primary first
                  result = self._primary.process(request, details)
                  if result.success:
                  return result

                  # Try fallbacks in order
                  for fallback in self._fallbacks:
                  if fallback.can_process(request):
                  fallback_details = self._adapt_details(
                  details, fallback)
                  result = fallback.process(request,
                  fallback_details)
                  if result.success:
                  return result

                  return result  # Return last failure
                  ```
  <br/>
  Key consideration: you need details for each fallback method. Either collect them upfront or prompt the user when fallback triggers.
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Level 3: Design a payment system that handles currency conversion with strategies for different conversion providers.</div>
<div style="color: #7f1d1d; line-height: 1.7;">
<strong>Answer:</strong> Layer two strategy patterns - one for currency conversion, one for payment processing:
  <br/><br/>
                  ```python
                  class CurrencyConversionStrategy(ABC):
                  @abstractmethod
                  def get_rate(self, from_curr: str, to_curr: str) -> Decimal:
                  pass

                  @abstractmethod
                  def convert(self, amount: Decimal, from_curr: str,
                  to_curr: str) -> Decimal:
                  pass

                  class MultiCurrencyPaymentProcessor:
                  def __init__(self,
                  conversion_strategy: CurrencyConversionStrategy,
                  payment_strategies: Dict[str, PaymentStrategy]):
                  self._converter = conversion_strategy
                  self._payments = payment_strategies

                  def process(self, request: PaymentRequest,
                  target_currency: str,
                  payment_method: str,
                  details: Dict) -> PaymentResult:
                  # Convert if necessary
                  if request.currency != target_currency:
                  rate = self._converter.get_rate(
                  request.currency, target_currency)
                  converted_amount = self._converter.convert(
                  request.amount,
                  request.currency,
                  target_currency)
                  request = PaymentRequest(
                  amount=converted_amount,
                  currency=target_currency,
                  ...
                  )

                  # Process payment
                  return self._payments[payment_method].process(
                  request, details)
                  ```
  <br/>
  The conversion strategy can swap between providers (XE, Wise, bank rates) based on amount, currency pair, or time of day. This separation lets you optimize conversion rates independently of payment processing.
</div>
</div>

  ---

## Design Choices and Trade-offs

<div style="background: #f8fafc; border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.2rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Key Design Decisions</div>

<div style="display: flex; flex-direction: column; gap: 1.5rem;">
<div style="background: #dbeafe; border-radius: 12px; padding: 1.25rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">Interface Granularity</div>
<div style="font-size: 0.9rem; color: #1e40af; line-height: 1.6;">
<strong>Single method:</strong> Simple, focused strategies (SRP). Risk: proliferation of strategy interfaces.
  <br/>
<strong>Multiple methods:</strong> Related operations grouped together. Risk: strategies may not need all methods.
  <br/>
<strong>Recommendation:</strong> Start with single-method interfaces. Combine only when methods are always used together.
</div>
</div>

<div style="background: #dcfce7; border-radius: 12px; padding: 1.25rem;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Constructor vs Setter Injection</div>
<div style="font-size: 0.9rem; color: #166534; line-height: 1.6;">
<strong>Constructor:</strong> Strategy is required, immutable after construction. Guarantees valid state.
  <br/>
<strong>Setter:</strong> Strategy can be changed at runtime. Requires null checks or default strategy.
  <br/>
<strong>Recommendation:</strong> Use constructor for mandatory strategies, setter for optional/changeable ones.
</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 1.25rem;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Strategy Lifecycle</div>
<div style="font-size: 0.9rem; color: #92400e; line-height: 1.6;">
<strong>Singleton strategies:</strong> Shared across contexts, must be stateless, memory efficient.
  <br/>
<strong>Per-context strategies:</strong> Can maintain state, more memory overhead, simpler reasoning.
  <br/>
<strong>Recommendation:</strong> Default to singletons. Use per-context only when state is truly needed.
</div>
</div>

<div style="background: #fce7f3; border-radius: 12px; padding: 1.25rem;">
<div style="font-weight: 700; color: #9d174d; margin-bottom: 0.5rem;">Error Handling</div>
<div style="font-size: 0.9rem; color: #9d174d; line-height: 1.6;">
<strong>Exceptions:</strong> Natural error propagation, but requires try-catch everywhere.
  <br/>
<strong>Result objects:</strong> Explicit error handling, self-documenting, enables pattern matching.
  <br/>
<strong>Recommendation:</strong> Result objects for expected failures (validation), exceptions for unexpected errors.
</div>
</div>
</div>
</div>

### Assumptions and Invariants

<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.75rem;">Common Assumptions (Document These!)</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.8;">
<strong>1. Strategies are interchangeable:</strong> Any strategy should be substitutable for any other without breaking the context. Violated if strategies have different preconditions.
  <br/>
<strong>2. Strategies are side-effect free:</strong> Calling a strategy shouldn't change global state. Violated by strategies that log, cache, or modify shared resources.
  <br/>
<strong>3. Strategy selection is stable:</strong> Once selected, the strategy doesn't need to change mid-operation. Violated by long-running operations that should adapt.
  <br/>
<strong>4. Context provides complete information:</strong> Strategies receive everything they need. Violated when strategies need to fetch additional data.
</div>
</div>

  ---

## Common Anti-Patterns and Solutions

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Anti-Patterns to Avoid</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">1. The God Strategy</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
<strong>Problem:</strong> Strategy interface with 10+ methods because "they're all related."
  <br/>
<strong>Solution:</strong> Split into focused interfaces. Use [[Interface Segregation]](/topics/solid/interface-segregation). A strategy should do one thing well.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">2. Context-Dependent Strategies</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
<strong>Problem:</strong> Strategies call methods on context or access context's private state.
  <br/>
<strong>Solution:</strong> Pass required data explicitly. Strategies should be testable in isolation without a real context.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">3. Strategy Selection Spaghetti</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
<strong>Problem:</strong> Complex if-else chains in client code to select strategies.
  <br/>
<strong>Solution:</strong> Extract selection logic into a factory or registry. Selection criteria become explicit and testable.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">4. Leaky Abstractions</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
<strong>Problem:</strong> Client code checks strategy type to handle special cases: <code>if isinstance(strategy, FastStrategy)</code>
  <br/>
<strong>Solution:</strong> Add methods to interface for capability queries, or use [[Visitor Pattern]](/topics/design-patterns/visitor) for type-specific behavior.
</div>
</div>

<div>
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">5. Premature Strategy-fication</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
<strong>Problem:</strong> Creating strategy infrastructure for a single algorithm "for future flexibility."
  <br/>
<strong>Solution:</strong> YAGNI. Start with direct implementation. Refactor to Strategy when you actually have the second algorithm.
</div>
</div>
</div>

  ---

## Testing Strategies

              ```python
              import unittest
              from decimal import Decimal
              from unittest.mock import Mock, patch


              class TestDiscountStrategy(unittest.TestCase):
              """Unit tests for individual strategies - test in isolation."""

              def test_percentage_discount_calculates_correctly(self):
              strategy = PercentageDiscountStrategy(Decimal("10"), "Test")

              discount = strategy.calculate_discount(
              Decimal("100.00"),
              {}  # Minimal context
              )

              self.assertEqual(discount, Decimal("10.00"))

              def test_loyalty_discount_requires_tier(self):
              strategy = LoyaltyDiscountStrategy()

              # Without tier - not applicable
              self.assertFalse(strategy.is_applicable({}))

              # With tier - applicable
              self.assertTrue(strategy.is_applicable({"loyalty_tier": "gold"}))

              def test_fixed_discount_caps_at_subtotal(self):
              strategy = FixedAmountDiscountStrategy(
              amount=Decimal("100"),
              min_purchase=Decimal("0")
              )

              # Discount shouldn't exceed subtotal
              discount = strategy.calculate_discount(Decimal("50.00"), {})
              self.assertEqual(discount, Decimal("50.00"))


              class TestStrategyComposition(unittest.TestCase):
              """Test composed strategies maintain expected behavior."""

              def test_best_of_selects_maximum_discount(self):
              strategies = [
              PercentageDiscountStrategy(Decimal("10"), "10%"),
              FixedAmountDiscountStrategy(Decimal("20"), Decimal("0")),
              ]

              selector = BestDiscountSelector()
              for s in strategies:
              selector.register(s)

              # For $100: 10% = $10, fixed = $20, should pick fixed
              best = selector.select_best(Decimal("100"), {})
              discount = best.calculate_discount(Decimal("100"), {})

              self.assertEqual(discount, Decimal("20.00"))


              class TestContextIntegration(unittest.TestCase):
              """Integration tests for context + strategy interaction."""

              def test_cart_applies_strategy_correctly(self):
              cart = ShoppingCart()
              cart.add_item(CartItem("Test", Decimal("100"), 1, "test"))

              # Manual strategy
              cart.set_strategy(PercentageDiscountStrategy(Decimal("15"), "Test"))

              self.assertEqual(cart.subtotal, Decimal("100"))
              self.assertEqual(cart.discount, Decimal("15"))
              self.assertEqual(cart.total, Decimal("85"))

              def test_cart_handles_missing_strategy(self):
              cart = ShoppingCart()
              cart.add_item(CartItem("Test", Decimal("100"), 1, "test"))

              # No strategy set - should use default (no discount)
              self.assertEqual(cart.discount, Decimal("0"))


              class TestStrategyMocking(unittest.TestCase):
              """Demonstrate mocking strategies for complex testing scenarios."""

              def test_with_mocked_strategy(self):
              # Create mock strategy
              mock_strategy = Mock(spec=DiscountStrategy)
              mock_strategy.name = "Mock"
              mock_strategy.is_applicable.return_value = True
              mock_strategy.calculate_discount.return_value = Decimal("42.00")

              cart = ShoppingCart()
              cart.add_item(CartItem("Test", Decimal("100"), 1, "test"))
              cart.set_strategy(mock_strategy)

              discount = cart.discount

              self.assertEqual(discount, Decimal("42.00"))
              mock_strategy.calculate_discount.assert_called_once()
              ```

  ---

## Related Patterns

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Pattern Relationships</div>

<div style="display: grid; gap: 1rem;">
<div style="background: #dbeafe; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #1e40af;">[[State Pattern]](/topics/design-patterns/state)</div>
<div style="font-size: 0.9rem; color: #1e40af;">Same structure, different intent. State manages object lifecycle; Strategy provides algorithm alternatives.</div>
</div>

<div style="background: #dcfce7; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #166534;">[[Template Method]](/topics/design-patterns/template-method)</div>
<div style="font-size: 0.9rem; color: #166534;">Alternative using inheritance. Template Method defines skeleton in base class; Strategy uses composition.</div>
</div>

<div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #92400e;">[[Factory Method]](/topics/design-patterns/factory-method)</div>
<div style="font-size: 0.9rem; color: #92400e;">Often used together. Factory creates strategies; Strategy executes algorithms.</div>
</div>

<div style="background: #fce7f3; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #9d174d;">[[Decorator]](/topics/design-patterns/decorator)</div>
<div style="font-size: 0.9rem; color: #9d174d;">Can wrap strategies to add cross-cutting concerns (logging, caching, validation).</div>
</div>

<div style="background: #e0e7ff; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #3730a3;">[[Command]](/topics/design-patterns/command)</div>
<div style="font-size: 0.9rem; color: #3730a3;">Both encapsulate behavior. Command encapsulates requests with undo/redo; Strategy encapsulates algorithms.</div>
</div>

<div style="background: #f3e8ff; padding: 1rem; border-radius: 8px;">
<div style="font-weight: 600; color: #7c3aed;">[[Flyweight]](/topics/design-patterns/flyweight)</div>
<div style="font-size: 0.9rem; color: #7c3aed;">Stateless strategies can be shared as flyweights to reduce memory usage.</div>
</div>
</div>
</div>

  ---

## Summary: Interview Checklist

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: white;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">Key Points for Interviews</div>
<ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
<li><strong>Definition:</strong> Encapsulate interchangeable algorithms in separate classes</li>
<li><strong>Intent:</strong> Let algorithms vary independently from clients that use them</li>
<li><strong>vs State:</strong> Strategy is externally selected; State transitions internally</li>
<li><strong>Functional equivalent:</strong> First-class functions with partial application</li>
<li><strong>Key benefit:</strong> Open/Closed Principle - add algorithms without changing context</li>
<li><strong>Key cost:</strong> Class explosion if overused; virtual dispatch overhead</li>
<li><strong>When to use:</strong> Multiple algorithms, runtime selection needed, testing flexibility</li>
<li><strong>When not to use:</strong> Single algorithm, trivial conditionals, performance-critical paths</li>
</ul>
</div>
