# Iterator Pattern

## Overview

The Iterator pattern provides a way to access elements of a collection sequentially without exposing its underlying representation. It decouples algorithms from containers, enabling uniform traversal across different data structures like arrays, trees, graphs, and custom collections.

**Difficulty:** Beginner to Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Cursor

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 2px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.75rem; color: #1e293b;">Core Insight</div>
<div style="line-height: 1.7; color: #475569;">
The Iterator pattern separates the <span style="color:#166534"><strong>traversal algorithm</strong></span> from the <span style="color:#166534"><strong>collection structure</strong></span>. This enables multiple simultaneous traversals, different traversal strategies on the same collection, and lazy evaluation that processes elements on-demand without loading entire datasets into memory.
</div>
</div>

---

## Simple Explanation: The Spotify Playlist Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">🎵</div>
<div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 12px;">Think of a Music Playlist</div>
<div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you listen to Spotify, you don't care whether your playlist is stored as an array, linked list, or fetched from a database. You just press "Next" to get the next song. The playlist gives you an iterator - a cursor that knows how to traverse songs one by one. You can have multiple people listening to the same playlist at different positions, each with their own iterator. The iterator handles all the complexity of navigation while you just enjoy the music.
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600;">Playlist</div>
<div style="color: #3b82f6; font-size: 0.85rem;">Collection (Aggregate)</div>
</div>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600;">Play Controls</div>
<div style="color: #22c55e; font-size: 0.85rem;">Iterator Interface</div>
</div>
<div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: 600;">Current Position</div>
<div style="color: #f59e0b; font-size: 0.85rem;">Iterator State</div>
</div>
<div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #9d174d; font-weight: 600;">Next/Previous</div>
<div style="color: #ec4899; font-size: 0.85rem;">Traversal Methods</div>
</div>
</div>
</div>

### The Expert Insight

**Novice thinks:** "Iterator is just a for-loop in disguise."

**Expert knows:** "Iterator enables <span style="color:#22c55e">**lazy evaluation**</span> and <span style="color:#22c55e">**infinite sequences**</span>. It separates the 'what' (traversal logic) from the 'how' (data structure). This is why Python generators, Java Streams, and JavaScript async iterators are so powerful - they can process terabytes of data without loading everything into memory."

---

## Internal vs External Iterators

A critical design decision when implementing the Iterator pattern is choosing between <span style="color:#22c55e">**internal**</span> and <span style="color:#22c55e">**external**</span> iterators. This choice fundamentally affects control flow, flexibility, and API design.

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Iterator Control Models</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
<span style="background: #3b82f6; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">E</span>
  External Iterator
</div>
<div style="color: #1e3a8a; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><strong>Client controls</strong> the iteration</div>
<div style="margin-bottom: 0.5rem;"><strong>Pull-based:</strong> Client calls next()</div>
<div style="margin-bottom: 0.5rem;"><strong>More flexible:</strong> Early termination, interleaving</div>
<div><strong>Example:</strong> Java Iterator, Python __iter__/__next__</div>
</div>
</div>
<div style="background: #dcfce7; border-radius: 10px; padding: 1.25rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
<span style="background: #22c55e; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">I</span>
  Internal Iterator
</div>
<div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><strong>Collection controls</strong> the iteration</div>
<div style="margin-bottom: 0.5rem;"><strong>Push-based:</strong> Collection calls callback</div>
<div style="margin-bottom: 0.5rem;"><strong>Simpler API:</strong> forEach, map, filter</div>
<div><strong>Example:</strong> Ruby each, JavaScript forEach</div>
</div>
</div>
</div>
</div>

### External Iterator: Client in Control

With <span style="color:#22c55e">**external iterators**</span>, the client explicitly requests each element. This provides maximum control but requires the client to manage the iteration loop.

```python
# External Iterator - Client controls traversal
class ExternalIterator:
    """
    External iterator where client controls traversal.
    Also known as: Active Iterator, Pull Iterator
    """

    def __init__(self, collection):
        self.collection = collection
        self.index = 0

    def has_next(self) -> bool:
        return self.index < len(self.collection)

    def next(self):
        if not self.has_next():
            raise StopIteration("No more elements")
        value = self.collection[self.index]
        self.index += 1
        return value

    def reset(self):
        self.index = 0


# Client controls the loop explicitly
iterator = ExternalIterator([1, 2, 3, 4, 5])

# Client decides when to advance
while iterator.has_next():
    value = iterator.next()
    if value == 3:
        break  # Easy early termination
    print(value)

# Can interleave with other iterators
iter1 = ExternalIterator(['a', 'b', 'c'])
iter2 = ExternalIterator([1, 2, 3])

while iter1.has_next() and iter2.has_next():
    print(f"{iter1.next()} -> {iter2.next()}")  # Zip behavior
```

### Internal Iterator: Collection in Control

With <span style="color:#22c55e">**internal iterators**</span>, you pass a function to the collection, which applies it to each element. The collection controls the traversal.

```python
# Internal Iterator - Collection controls traversal
class InternalIteratorCollection:
    """
    Collection with internal iterator support.
    Also known as: Passive Iterator, Push Iterator
    """

    def __init__(self, items):
        self._items = list(items)

    def for_each(self, action):
        """Apply action to each element (internal iteration)."""
        for item in self._items:
            action(item)

    def map(self, transform):
        """Transform each element, return new collection."""
        result = []
        for item in self._items:
            result.append(transform(item))
        return InternalIteratorCollection(result)

    def filter(self, predicate):
        """Keep elements matching predicate."""
        result = []
        for item in self._items:
            if predicate(item):
                result.append(item)
        return InternalIteratorCollection(result)

    def reduce(self, combiner, initial):
        """Reduce collection to single value."""
        accumulator = initial
        for item in self._items:
            accumulator = combiner(accumulator, item)
        return accumulator

    def any(self, predicate) -> bool:
        """Check if any element matches."""
        for item in self._items:
            if predicate(item):
                return True
        return False

    def all(self, predicate) -> bool:
        """Check if all elements match."""
        for item in self._items:
            if not predicate(item):
                return False
        return True


# Collection controls traversal - client just provides behavior
numbers = InternalIteratorCollection([1, 2, 3, 4, 5])

# Simple iteration
numbers.for_each(lambda x: print(x))

# Chained operations (functional style)
result = (numbers
    .filter(lambda x: x % 2 == 0)  # Keep evens
    .map(lambda x: x * 2)           # Double them
    .reduce(lambda a, b: a + b, 0)) # Sum

print(f"Result: {result}")  # 12 (2*2 + 4*2)
```

### Comparison and Trade-offs

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem;">When to Use Each Approach</div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
<tr style="background: #e2e8f0;">
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Scenario</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">External</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Internal</th>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Early termination needed</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534; font-weight: 600;">Preferred</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #92400e;">Harder (exceptions)</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Parallel iteration (zip)</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534; font-weight: 600;">Natural</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #991b1b;">Very difficult</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Simple processing</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #92400e;">Verbose</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534; font-weight: 600;">Concise</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Parallelization</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #92400e;">Client manages</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534; font-weight: 600;">Easy (Java streams)</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Complex state during iteration</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534; font-weight: 600;">Natural</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #92400e;">Closures needed</td>
</tr>
</table>
</div>

### Interview Deep Dive: Internal vs External Iterators

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What is the difference between internal and external iterators?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
<span style="color:#22c55e"><strong>External iterators</strong></span> give control to the client - the client explicitly calls <code>next()</code> to get each element. <span style="color:#22c55e"><strong>Internal iterators</strong></span> give control to the collection - you pass a function and the collection applies it to each element. External is like a pull model; internal is like a push model.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: Why can't you easily interleave two internal iterators like you can with external iterators?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Internal iterators run the entire traversal when called - there's no way to pause mid-iteration. With <code>collection.forEach(fn)</code>, the forEach completes before returning. You can't say "give me one element, now give me one from another collection, repeat." External iterators maintain state between calls, so you can alternate: <code>iter1.next()</code>, <code>iter2.next()</code>, <code>iter1.next()</code>, etc.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: How do generators/coroutines blur the line between internal and external iterators?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
Generators combine both models. They're <strong>written</strong> like internal iterators (single function with <code>yield</code>) but <strong>behave</strong> like external iterators (caller controls advancement). When you call a generator, it returns an iterator. Each <code>next()</code> runs until the next <code>yield</code>, then suspends. This gives you the clean syntax of internal iteration with the control of external iteration. Python's <code>yield</code>, JavaScript's <code>function*</code>, and C#'s <code>yield return</code> all provide this. It's called <strong>semi-coroutine</strong> or <strong>asymmetric coroutine</strong> - the generator yields to caller, but caller decides when to resume.
</div>
</div>
</div>
</div>

---

## Lazy Evaluation and Infinite Sequences

<span style="color:#22c55e">**Lazy evaluation**</span> is one of the most powerful capabilities of the Iterator pattern. Instead of computing all elements upfront, elements are generated on-demand when requested.

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Eager vs Lazy Evaluation</div>
<div style="display: flex; flex-direction: column; gap: 1rem;">
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: #fef2f2; color: #991b1b; border-radius: 8px; padding: 0.5rem 1rem; font-weight: 600; min-width: 80px; text-align: center;">Eager</div>
<div style="background: #fef2f2; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b;">Compute all elements immediately</div>
<div style="color: #7f1d1d; font-size: 0.9rem; margin-top: 0.25rem;">Memory: O(n) | Time to first element: O(n) | Infinite: Impossible</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: #dcfce7; color: #166534; border-radius: 8px; padding: 0.5rem 1rem; font-weight: 600; min-width: 80px; text-align: center;">Lazy</div>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #86efac;">
<div style="font-weight: 600; color: #166534;">Compute elements on-demand</div>
<div style="color: #14532d; font-size: 0.9rem; margin-top: 0.25rem;">Memory: O(1) | Time to first element: O(1) | Infinite: Possible</div>
</div>
</div>
</div>
</div>

### Infinite Sequence Iterators

Lazy iterators can represent <span style="color:#22c55e">**infinite sequences**</span> - something impossible with eager evaluation.

```python
from typing import Iterator, TypeVar, Callable, Optional
from abc import ABC, abstractmethod

T = TypeVar('T')


class LazyIterator(ABC):
    """Base class for lazy iterators."""

    @abstractmethod
    def has_next(self) -> bool:
        pass

    @abstractmethod
    def next(self) -> T:
        pass


class FibonacciIterator(LazyIterator):
    """
    Infinite Fibonacci sequence iterator.
    Each number is computed only when requested.
    """

    def __init__(self, limit: Optional[int] = None):
        self.limit = limit  # None = infinite
        self.count = 0
        self.current = 0
        self.next_val = 1

    def has_next(self) -> bool:
        if self.limit is None:
            return True  # Infinite!
        return self.count < self.limit

    def next(self) -> int:
        if not self.has_next():
            raise StopIteration()

        result = self.current
        self.current, self.next_val = self.next_val, self.current + self.next_val
        self.count += 1
        return result


class PrimeIterator(LazyIterator):
    """
    Infinite prime number generator.
    Uses lazy sieve - only computes primes as needed.
    """

    def __init__(self, limit: Optional[int] = None):
        self.limit = limit
        self.count = 0
        self.primes = []
        self.candidate = 2

    def _is_prime(self, n: int) -> bool:
        """Check if n is prime using known primes."""
        for p in self.primes:
            if p * p > n:
                break
            if n % p == 0:
                return False
        return True

    def has_next(self) -> bool:
        if self.limit is None:
            return True
        return self.count < self.limit

    def next(self) -> int:
        if not self.has_next():
            raise StopIteration()

        while not self._is_prime(self.candidate):
            self.candidate += 1

        prime = self.candidate
        self.primes.append(prime)
        self.candidate += 1
        self.count += 1
        return prime


class RangeIterator(LazyIterator):
    """
    Lazy range iterator - doesn't store all values.
    Equivalent to Python's range() which is also lazy.
    """

    def __init__(self, start: int, stop: int = None, step: int = 1):
        if stop is None:
            start, stop = 0, start
        self.current = start
        self.stop = stop
        self.step = step

    def has_next(self) -> bool:
        if self.step > 0:
            return self.current < self.stop
        return self.current > self.stop

    def next(self) -> int:
        if not self.has_next():
            raise StopIteration()
        value = self.current
        self.current += self.step
        return value


# Usage: Process infinite sequences with early termination
def find_first_prime_above(threshold: int) -> int:
    """Find first prime above threshold - lazy evaluation makes this efficient."""
    primes = PrimeIterator()  # Infinite iterator
    while primes.has_next():
        p = primes.next()
        if p > threshold:
            return p
    return -1  # Never reached

print(f"First prime above 1000: {find_first_prime_above(1000)}")  # 1009


# Memory-efficient processing of large ranges
def sum_of_squares_lazy(n: int) -> int:
    """Sum of squares from 1 to n using lazy evaluation."""
    total = 0
    range_iter = RangeIterator(1, n + 1)
    while range_iter.has_next():
        x = range_iter.next()
        total += x * x
    return total
```

### Generator-Based Lazy Evaluation

Python generators provide elegant lazy evaluation syntax.

```python
def fibonacci_generator(limit=None):
    """Lazy Fibonacci using generator."""
    a, b = 0, 1
    count = 0
    while limit is None or count < limit:
        yield a
        a, b = b, a + b
        count += 1


def prime_generator():
    """Infinite prime generator."""
    def is_prime(n, primes):
        for p in primes:
            if p * p > n:
                return True
            if n % p == 0:
                return False
        return True

    primes = []
    candidate = 2
    while True:
        if is_prime(candidate, primes):
            primes.append(candidate)
            yield candidate
        candidate += 1


def file_line_generator(filepath: str):
    """
    Lazy file reader - handles files larger than memory.
    Each line is read only when needed.
    """
    with open(filepath, 'r') as f:
        for line in f:
            yield line.rstrip('\n')


def paginated_api_generator(fetch_page, page_size=100):
    """
    Lazy pagination - fetches pages only when needed.
    Memory-efficient for large API results.
    """
    page = 0
    while True:
        items = fetch_page(page, page_size)
        if not items:
            break
        for item in items:
            yield item
        page += 1


# Lazy pipeline - nothing executes until consumption
def lazy_pipeline_example():
    """
    Chain of lazy operations - each element flows through
    entire pipeline before next element is processed.
    """

    def take(n, iterable):
        """Take first n elements lazily."""
        count = 0
        for item in iterable:
            if count >= n:
                break
            yield item
            count += 1

    def filter_gen(predicate, iterable):
        """Filter lazily."""
        for item in iterable:
            if predicate(item):
                yield item

    def map_gen(transform, iterable):
        """Map lazily."""
        for item in iterable:
            yield transform(item)

    # This pipeline is lazy - computes only what's needed
    result = list(
        take(5,
            map_gen(lambda x: x * 2,
                filter_gen(lambda x: x % 3 == 0,
                    fibonacci_generator()
                )
            )
        )
    )
    # Only generates Fibonacci numbers until we find 5 divisible by 3
    print(f"First 5 Fibonacci divisible by 3, doubled: {result}")


lazy_pipeline_example()
```

### Interview Deep Dive: Lazy Evaluation

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What is lazy evaluation and why is it useful in iterators?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
<span style="color:#22c55e"><strong>Lazy evaluation</strong></span> means computing values only when they're actually needed, not in advance. In iterators, this means each element is generated when <code>next()</code> is called, not when the iterator is created. Benefits: constant memory usage regardless of collection size, ability to represent infinite sequences, faster time-to-first-result, and short-circuit optimization when you don't need all elements.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you implement lazy evaluation for database query results?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Use <strong>cursor-based iteration</strong> with buffering. The iterator maintains a connection and cursor to the database. When the buffer empties, fetch the next batch (e.g., 1000 rows). This gives you constant memory usage even for millions of rows. Key considerations: connection lifecycle management (who closes it?), transaction isolation (what if data changes?), and network efficiency (batch size tuning). Database-specific: PostgreSQL uses <code>DECLARE CURSOR</code>, MySQL uses streaming result sets with <code>useCursorFetch=true</code>.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: What are the challenges of lazy evaluation in distributed systems?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
<strong>Serialization:</strong> Can't serialize a lazy iterator's computation state across network boundaries - must materialize or use continuation tokens. <strong>Fault tolerance:</strong> If a node fails mid-iteration, how do you resume? Need checkpointing or idempotent reprocessing. <strong>Resource leaks:</strong> Lazy iterators hold resources (connections, file handles) - in distributed context, forgotten iterators cause resource exhaustion on remote nodes. <strong>Backpressure:</strong> Producer may generate faster than consumer can process - need flow control mechanisms. <strong>Consistency:</strong> Data may change between pages - use snapshot isolation or accept eventual consistency. Systems like Kafka solve this with commit offsets, Elasticsearch uses scroll contexts with point-in-time snapshots.
</div>
</div>
</div>
</div>

---

## Concurrent Modification Problem

One of the most critical challenges with iterators is handling modifications to the underlying collection during iteration. This is known as the <span style="color:#22c55e">**concurrent modification problem**</span>.

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #ef4444;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.75rem;">The Core Problem</div>
<div style="color: #7f1d1d; line-height: 1.7;">
    When you modify a collection while iterating over it, the iterator's internal state (index, pointers) may become invalid. This can cause skipped elements, duplicate processing, crashes, or undefined behavior. This affects both single-threaded modifications and multi-threaded access.
</div>
</div>

### What Goes Wrong

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Concurrent Modification Scenarios</div>
<div style="display: flex; flex-direction: column; gap: 1rem;">
<div style="display: flex; align-items: flex-start; gap: 1rem;">
<div style="background: #ef4444; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; font-size: 0.9rem;">1</div>
<div style="background: #fef2f2; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b;">Removal During Iteration</div>
<div style="color: #7f1d1d; font-size: 0.9rem; margin-top: 0.25rem;">Removing current element shifts indices, causing next element to be skipped</div>
</div>
</div>
<div style="display: flex; align-items: flex-start; gap: 1rem;">
<div style="background: #ef4444; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; font-size: 0.9rem;">2</div>
<div style="background: #fef2f2; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b;">Insertion During Iteration</div>
<div style="color: #7f1d1d; font-size: 0.9rem; margin-top: 0.25rem;">Adding elements may cause some to be visited twice or iterator to loop forever</div>
</div>
</div>
<div style="display: flex; align-items: flex-start; gap: 1rem;">
<div style="background: #ef4444; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; font-size: 0.9rem;">3</div>
<div style="background: #fef2f2; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b;">Concurrent Thread Modification</div>
<div style="color: #7f1d1d; font-size: 0.9rem; margin-top: 0.25rem;">Another thread modifies collection while iteration is in progress - race condition</div>
</div>
</div>
</div>
</div>

```python
# PROBLEM: Concurrent modification examples

# Example 1: Removing during iteration - WRONG
numbers = [1, 2, 3, 4, 5, 6]
for i, num in enumerate(numbers):
    if num % 2 == 0:
        del numbers[i]  # Shifts indices! Elements get skipped
print(numbers)  # [1, 3, 5] - but 4 was skipped!

# Example 2: What actually happens
#   i=0: see 1, keep
#   i=1: see 2, delete -> [1, 3, 4, 5, 6]
#   i=2: see 4, delete -> [1, 3, 5, 6]  (3 was skipped!)
#   i=3: see 6, delete -> [1, 3, 5]

# Example 3: Python dictionary - raises exception
data = {'a': 1, 'b': 2, 'c': 3}
try:
    for key in data:
        if data[key] == 2:
            del data[key]  # RuntimeError!
except RuntimeError as e:
    print(f"Error: {e}")
```

### Solution Strategies

```python
from typing import List, TypeVar, Callable, Set
from copy import copy
import threading

T = TypeVar('T')


# Strategy 1: Snapshot Iterator (Copy-on-Iterate)
class SnapshotIterator:
    """
    Takes a snapshot of collection at creation time.
    Iteration is safe but may show stale data.
    """

    def __init__(self, collection: List[T]):
        self._snapshot = list(collection)  # Copy!
        self._index = 0

    def has_next(self) -> bool:
        return self._index < len(self._snapshot)

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration()
        value = self._snapshot[self._index]
        self._index += 1
        return value


# Strategy 2: Fail-Fast Iterator
class FailFastCollection:
    """
    Detects modifications and raises exception.
    Used by Java's ArrayList, HashMap, etc.
    """

    def __init__(self):
        self._items: List[T] = []
        self._mod_count = 0  # Modification counter

    def add(self, item: T):
        self._items.append(item)
        self._mod_count += 1

    def remove(self, item: T):
        self._items.remove(item)
        self._mod_count += 1

    def iterator(self):
        return FailFastIterator(self)


class FailFastIterator:
    """
    Throws exception if collection modified during iteration.
    """

    def __init__(self, collection: FailFastCollection):
        self._collection = collection
        self._items = collection._items
        self._expected_mod_count = collection._mod_count
        self._index = 0

    def _check_modification(self):
        if self._collection._mod_count != self._expected_mod_count:
            raise RuntimeError("Collection modified during iteration")

    def has_next(self) -> bool:
        self._check_modification()
        return self._index < len(self._items)

    def next(self) -> T:
        self._check_modification()
        if not self.has_next():
            raise StopIteration()
        value = self._items[self._index]
        self._index += 1
        return value

    def remove(self):
        """
        Safe removal via iterator - updates mod count.
        This is the ONLY safe way to remove during iteration.
        """
        self._check_modification()
        if self._index <= 0:
            raise RuntimeError("next() must be called before remove()")

        self._index -= 1
        del self._items[self._index]
        self._expected_mod_count = self._collection._mod_count = \
            self._collection._mod_count + 1


# Strategy 3: Copy-on-Write Collection
class CopyOnWriteList:
    """
    Thread-safe iteration via copy-on-write semantics.
    Reads are fast, writes are expensive but safe.
    Used by Java's CopyOnWriteArrayList.
    """

    def __init__(self):
        self._items: List[T] = []
        self._lock = threading.Lock()

    def add(self, item: T):
        with self._lock:
            new_items = list(self._items)
            new_items.append(item)
            self._items = new_items  # Atomic reference swap

    def remove(self, item: T):
        with self._lock:
            new_items = list(self._items)
            new_items.remove(item)
            self._items = new_items

    def __iter__(self):
        # Returns iterator over current snapshot
        # No lock needed - reference read is atomic
        return iter(self._items)


# Strategy 4: Deferred Modifications
class DeferredModificationIterator:
    """
    Collects modifications and applies them after iteration.
    """

    def __init__(self, collection: List[T]):
        self._collection = collection
        self._to_remove: Set[int] = set()
        self._to_add: List[T] = []
        self._index = 0

    def has_next(self) -> bool:
        return self._index < len(self._collection)

    def next(self) -> T:
        value = self._collection[self._index]
        self._index += 1
        return value

    def mark_for_removal(self):
        """Mark current element for removal after iteration."""
        self._to_remove.add(self._index - 1)

    def queue_addition(self, item: T):
        """Queue item to be added after iteration."""
        self._to_add.append(item)

    def apply_modifications(self):
        """Apply all queued modifications."""
        # Remove in reverse order to maintain indices
        for idx in sorted(self._to_remove, reverse=True):
            del self._collection[idx]

        # Add queued items
        self._collection.extend(self._to_add)

        # Clear queues
        self._to_remove.clear()
        self._to_add.clear()


# Strategy 5: Iterate Backwards for Safe Removal
def safe_remove_backwards(items: List[T], predicate: Callable[[T], bool]):
    """
    Remove items matching predicate by iterating backwards.
    Index shifts don't affect unprocessed elements.
    """
    for i in range(len(items) - 1, -1, -1):
        if predicate(items[i]):
            del items[i]


# Usage examples
print("=== Fail-Fast Iterator ===")
collection = FailFastCollection()
for i in range(5):
    collection.add(i)

it = collection.iterator()
while it.has_next():
    value = it.next()
    print(f"Value: {value}")
    if value == 2:
        it.remove()  # Safe removal via iterator

print("=== Deferred Modifications ===")
items = [1, 2, 3, 4, 5]
it = DeferredModificationIterator(items)
while it.has_next():
    value = it.next()
    if value % 2 == 0:
        it.mark_for_removal()
    if value == 3:
        it.queue_addition(30)

it.apply_modifications()
print(f"After modifications: {items}")  # [1, 3, 5, 30]
```

### Interview Deep Dive: Concurrent Modification

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What causes ConcurrentModificationException in Java?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Java's fail-fast iterators track a <span style="color:#22c55e"><strong>modification count</strong></span>. When an iterator is created, it records the collection's current mod count. On each <code>next()</code> or <code>hasNext()</code> call, it compares the expected count to the actual count. If they differ, the collection was modified outside the iterator, so it throws <code>ConcurrentModificationException</code>. Note: This is a best-effort detection, not a guarantee - it can miss some modifications.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: Compare CopyOnWriteArrayList vs Collections.synchronizedList for concurrent iteration.</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
<strong>CopyOnWriteArrayList:</strong> Creates a new array copy on every write. Iterators see a snapshot - never throws CME, no locking during iteration. Best for read-heavy workloads with infrequent writes. <strong>synchronizedList:</strong> Uses mutex for all operations. Iteration still requires external locking to prevent CME. <code>synchronized(list) { for item in list { ... } }</code>. Better for write-heavy workloads. <strong>Key difference:</strong> COWAL trades write performance for iteration safety; synchronizedList requires manual locking for safe iteration.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: How would you implement a lock-free concurrent iterator for a skip list?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
Use <strong>hazard pointers</strong> or <strong>epoch-based reclamation</strong> to prevent nodes from being freed while any iterator references them. Iterator stores current node pointer. On <code>next()</code>: (1) Read current node's next pointer using atomic load, (2) If next is marked deleted (using pointer tagging), skip to next-next, (3) Use CAS to update any traversal state. <strong>Key insight:</strong> Never dereference a pointer that might be freed. Either use RAII with shared ownership (like <code>Arc</code> in Rust) or manual memory reclamation schemes. Java's <code>ConcurrentSkipListMap</code> uses a different approach: deleted nodes remain linked with a marker node until cleanup. Lock-free iteration is complex because you must handle: node deletion during traversal, ABA problems, and memory reclamation.
</div>
</div>
</div>
</div>

---

## Custom Collection Iteration

Implementing iterators for custom data structures requires careful consideration of the collection's characteristics and traversal semantics.

### Binary Tree with Multiple Traversals

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List, Optional, Iterator as TypingIterator
from collections import deque

T = TypeVar('T')


class Iterator(ABC, Generic[T]):
    """Abstract iterator interface."""

    @abstractmethod
    def has_next(self) -> bool:
        pass

    @abstractmethod
    def next(self) -> T:
        pass

    @abstractmethod
    def reset(self) -> None:
        pass


class TreeNode(Generic[T]):
    """Binary tree node."""

    def __init__(self, value: T,
                 left: 'TreeNode[T]' = None,
                 right: 'TreeNode[T]' = None):
        self.value = value
        self.left = left
        self.right = right


class InOrderIterator(Iterator[T]):
    """
    In-order traversal: Left -> Root -> Right
    For BST, produces sorted order.
    Uses O(h) space where h = tree height.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.stack: List[TreeNode[T]] = []
        self._push_left(root)

    def _push_left(self, node: TreeNode[T]) -> None:
        while node:
            self.stack.append(node)
            node = node.left

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration()

        node = self.stack.pop()
        self._push_left(node.right)
        return node.value

    def reset(self) -> None:
        self.stack = []
        self._push_left(self.root)


class PreOrderIterator(Iterator[T]):
    """
    Pre-order traversal: Root -> Left -> Right
    Useful for tree copying, serialization.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.stack: List[TreeNode[T]] = [root] if root else []

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration()

        node = self.stack.pop()
        # Push right first so left is processed first
        if node.right:
            self.stack.append(node.right)
        if node.left:
            self.stack.append(node.left)

        return node.value

    def reset(self) -> None:
        self.stack = [self.root] if self.root else []


class LevelOrderIterator(Iterator[T]):
    """
    Level-order (BFS) traversal.
    Visits nodes level by level, left to right.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.queue: deque = deque()
        if root:
            self.queue.append(root)

    def has_next(self) -> bool:
        return len(self.queue) > 0

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration()

        node = self.queue.popleft()
        if node.left:
            self.queue.append(node.left)
        if node.right:
            self.queue.append(node.right)

        return node.value

    def reset(self) -> None:
        self.queue = deque()
        if self.root:
            self.queue.append(self.root)


class MorrisInOrderIterator(Iterator[T]):
    """
    Morris traversal: O(1) space in-order traversal!
    Uses threading (temporary modification of tree pointers).

    This is an advanced technique for memory-constrained systems.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.current = root
        self._next_value: Optional[T] = None
        self._advance()

    def _advance(self) -> None:
        """Find next node using Morris traversal."""
        self._next_value = None

        while self.current:
            if self.current.left is None:
                # No left child - visit current
                self._next_value = self.current.value
                self.current = self.current.right
                return
            else:
                # Find inorder predecessor
                predecessor = self.current.left
                while predecessor.right and predecessor.right != self.current:
                    predecessor = predecessor.right

                if predecessor.right is None:
                    # Create thread
                    predecessor.right = self.current
                    self.current = self.current.left
                else:
                    # Thread exists - remove it and visit
                    predecessor.right = None
                    self._next_value = self.current.value
                    self.current = self.current.right
                    return

    def has_next(self) -> bool:
        return self._next_value is not None

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration()
        value = self._next_value
        self._advance()
        return value

    def reset(self) -> None:
        self.current = self.root
        self._advance()


class BinaryTree(Generic[T]):
    """
    Binary tree with multiple iterator types.
    Demonstrates the Aggregate interface.
    """

    def __init__(self, root: TreeNode[T] = None):
        self.root = root

    def in_order_iterator(self) -> InOrderIterator[T]:
        return InOrderIterator(self.root)

    def pre_order_iterator(self) -> PreOrderIterator[T]:
        return PreOrderIterator(self.root)

    def level_order_iterator(self) -> LevelOrderIterator[T]:
        return LevelOrderIterator(self.root)

    def morris_iterator(self) -> MorrisInOrderIterator[T]:
        return MorrisInOrderIterator(self.root)

    def __iter__(self) -> TypingIterator[T]:
        """Default iteration uses in-order."""
        return self._inorder_generator(self.root)

    def _inorder_generator(self, node: TreeNode[T]) -> TypingIterator[T]:
        if node:
            yield from self._inorder_generator(node.left)
            yield node.value
            yield from self._inorder_generator(node.right)
```

### Graph Iterator with Cycle Detection

```python
from typing import Dict, Set, List, Optional
from collections import deque
from enum import Enum


class TraversalOrder(Enum):
    DFS_PRE = "dfs_preorder"
    DFS_POST = "dfs_postorder"
    BFS = "bfs"
    TOPOLOGICAL = "topological"


class GraphIterator:
    """
    Iterator for directed graph with cycle detection.
    Supports multiple traversal strategies.
    """

    def __init__(self,
                 adjacency: Dict[str, List[str]],
                 start: str,
                 order: TraversalOrder = TraversalOrder.BFS):
        self.adjacency = adjacency
        self.start = start
        self.order = order
        self.visited: Set[str] = set()
        self._output: List[str] = []
        self._index = 0
        self._cycles_found: List[List[str]] = []

        if order == TraversalOrder.BFS:
            self._build_bfs()
        elif order == TraversalOrder.DFS_PRE:
            self._build_dfs_pre()
        elif order == TraversalOrder.DFS_POST:
            self._build_dfs_post()
        elif order == TraversalOrder.TOPOLOGICAL:
            self._build_topological()

    def _build_bfs(self) -> None:
        queue = deque([self.start])
        self.visited.add(self.start)

        while queue:
            node = queue.popleft()
            self._output.append(node)

            for neighbor in self.adjacency.get(node, []):
                if neighbor not in self.visited:
                    self.visited.add(neighbor)
                    queue.append(neighbor)

    def _build_dfs_pre(self) -> None:
        stack = [self.start]

        while stack:
            node = stack.pop()
            if node in self.visited:
                continue

            self.visited.add(node)
            self._output.append(node)

            # Add neighbors in reverse for left-to-right order
            for neighbor in reversed(self.adjacency.get(node, [])):
                if neighbor not in self.visited:
                    stack.append(neighbor)

    def _build_dfs_post(self) -> None:
        def dfs(node: str, path: Set[str]):
            if node in self.visited:
                return
            if node in path:
                # Cycle detected
                return

            path.add(node)

            for neighbor in self.adjacency.get(node, []):
                dfs(neighbor, path)

            path.remove(node)
            self.visited.add(node)
            self._output.append(node)

        dfs(self.start, set())

    def _build_topological(self) -> None:
        """Kahn's algorithm for topological sort."""
        in_degree: Dict[str, int] = {n: 0 for n in self.adjacency}

        for neighbors in self.adjacency.values():
            for neighbor in neighbors:
                in_degree[neighbor] = in_degree.get(neighbor, 0) + 1

        queue = deque([n for n, d in in_degree.items() if d == 0])

        while queue:
            node = queue.popleft()
            self._output.append(node)

            for neighbor in self.adjacency.get(node, []):
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # Check for cycles (not all nodes processed)
        if len(self._output) != len(self.adjacency):
            remaining = set(self.adjacency.keys()) - set(self._output)
            raise ValueError(f"Graph has cycles involving: {remaining}")

    def has_next(self) -> bool:
        return self._index < len(self._output)

    def next(self) -> str:
        if not self.has_next():
            raise StopIteration()
        value = self._output[self._index]
        self._index += 1
        return value

    def reset(self) -> None:
        self._index = 0


# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print("BFS traversal:")
it = GraphIterator(graph, 'A', TraversalOrder.BFS)
while it.has_next():
    print(it.next(), end=" ")
print()

print("DFS Pre-order:")
it = GraphIterator(graph, 'A', TraversalOrder.DFS_PRE)
while it.has_next():
    print(it.next(), end=" ")
print()
```

### Skip List Iterator

```python
import random
from typing import Optional, Generic, TypeVar

K = TypeVar('K')
V = TypeVar('V')


class SkipListNode(Generic[K, V]):
    """Node in a skip list."""

    def __init__(self, key: K, value: V, level: int):
        self.key = key
        self.value = value
        self.forward: List[Optional['SkipListNode[K, V]']] = [None] * (level + 1)


class SkipList(Generic[K, V]):
    """
    Skip list with iterator support.
    O(log n) search, insert, delete with O(n) space.
    """

    MAX_LEVEL = 16
    P = 0.5

    def __init__(self):
        self.header = SkipListNode(None, None, self.MAX_LEVEL)
        self.level = 0
        self._size = 0

    def _random_level(self) -> int:
        level = 0
        while random.random() < self.P and level < self.MAX_LEVEL:
            level += 1
        return level

    def insert(self, key: K, value: V) -> None:
        update = [None] * (self.MAX_LEVEL + 1)
        current = self.header

        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].key < key:
                current = current.forward[i]
            update[i] = current

        current = current.forward[0]

        if current and current.key == key:
            current.value = value
        else:
            new_level = self._random_level()

            if new_level > self.level:
                for i in range(self.level + 1, new_level + 1):
                    update[i] = self.header
                self.level = new_level

            new_node = SkipListNode(key, value, new_level)

            for i in range(new_level + 1):
                new_node.forward[i] = update[i].forward[i]
                update[i].forward[i] = new_node

            self._size += 1

    def __iter__(self):
        """Return iterator over (key, value) pairs in sorted order."""
        return SkipListIterator(self)

    def range_iterator(self, start_key: K, end_key: K):
        """Return iterator over range [start_key, end_key)."""
        return SkipListRangeIterator(self, start_key, end_key)


class SkipListIterator(Generic[K, V]):
    """Iterator over all elements in sorted order."""

    def __init__(self, skip_list: SkipList[K, V]):
        self.skip_list = skip_list
        self.current = skip_list.header.forward[0]

    def __iter__(self):
        return self

    def __next__(self):
        if self.current is None:
            raise StopIteration()

        key, value = self.current.key, self.current.value
        self.current = self.current.forward[0]
        return (key, value)


class SkipListRangeIterator(Generic[K, V]):
    """Iterator over a range of keys."""

    def __init__(self, skip_list: SkipList[K, V], start_key: K, end_key: K):
        self.end_key = end_key

        # Find starting position
        current = skip_list.header
        for i in range(skip_list.level, -1, -1):
            while current.forward[i] and current.forward[i].key < start_key:
                current = current.forward[i]

        self.current = current.forward[0]

    def __iter__(self):
        return self

    def __next__(self):
        if self.current is None or self.current.key >= self.end_key:
            raise StopIteration()

        key, value = self.current.key, self.current.value
        self.current = self.current.forward[0]
        return (key, value)
```

### Interview Deep Dive: Custom Collection Iteration

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What methods must a custom iterator implement?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
At minimum: <code>has_next()</code> (or <code>hasNext()</code>) to check if more elements exist, and <code>next()</code> to retrieve the next element. In Python, implement <code>__iter__()</code> returning self and <code>__next__()</code> which raises <code>StopIteration</code> when exhausted. Optional but common: <code>reset()</code> to restart iteration, <code>remove()</code> for safe removal, <code>peek()</code> to look ahead without advancing.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you implement an efficient range iterator for a B-tree?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
B-tree range iteration: (1) Navigate to leaf containing start key in O(log n), (2) Store path from root to current leaf on a stack for backtracking, (3) Iterate through keys in current leaf, (4) When leaf exhausted, pop stack to find next leaf - follow right sibling pointers if available, otherwise backtrack and descend. <strong>Key optimization:</strong> B-trees often have leaf-level linked lists (B+ trees), making range scans O(k) where k = result count after initial O(log n) seek. Store only the path, not all nodes - O(log n) space.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: Design an iterator that merges k sorted iterators in O(log k) time per element.</div>
<div style="color: #1e3a8a; line-height: 1.7;">
Use a <strong>min-heap of (value, iterator_index)</strong> pairs. Initialize by calling <code>next()</code> on each iterator and pushing to heap - O(k log k). On each <code>next()</code> call: (1) Pop minimum from heap - O(log k), (2) Record the value and which iterator it came from, (3) If that iterator has more elements, call its <code>next()</code> and push new value to heap - O(log k), (4) Return recorded value. Total: O(log k) per element. <strong>For very large k:</strong> Consider tournament trees or cascade merging. <strong>With different-sized iterators:</strong> Priority queue naturally handles exhaustion. <strong>Edge case:</strong> Handle empty iterators at initialization by not adding to heap.
</div>
</div>
</div>
</div>

---

## Real-World Company Usage

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 12px;">Industry Applications</div>
<ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
<li><strong>Database Cursors (PostgreSQL, MySQL):</strong> Iterate through millions of rows without loading all into memory</li>
<li><strong>Apache Kafka:</strong> Consumer iterators traverse message partitions with offset tracking</li>
<li><strong>Python/NumPy:</strong> nditer provides efficient multi-dimensional array iteration</li>
<li><strong>React/Vue:</strong> Virtual DOM diffing iterates through component trees</li>
<li><strong>Elasticsearch:</strong> Scroll API provides iterator-like access to large result sets</li>
<li><strong>AWS S3:</strong> List objects pagination uses continuation tokens (iterator pattern)</li>
<li><strong>Google BigQuery:</strong> Page tokens for iterating through query results</li>
<li><strong>Redis SCAN:</strong> Cursor-based iteration for large keyspaces without blocking</li>
</ul>
</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Iterator Pattern Architecture</div>
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; padding: 16px 24px; text-align: center;">
<div style="font-weight: 600; color: #475569; font-style: italic;">Iterable (interface)</div>
<div style="font-size: 0.85rem; color: #64748b; margin-top: 8px; font-family: monospace;">+ createIterator()</div>
</div>
<div style="color: #64748b;">implements</div>
<div style="color: #64748b; font-size: 1.5rem;">&#8595;</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center;">
<div style="font-weight: 700; color: #1e40af;">ConcreteCollection</div>
<div style="font-size: 0.8rem; color: #3b82f6; margin-top: 8px; font-family: monospace;">- elements[]<br/>+ createIterator()</div>
</div>
</div>
<div style="display: flex; align-items: center; color: #64748b; font-size: 1.5rem;">
  creates &#8594;
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; padding: 16px 24px; text-align: center;">
<div style="font-weight: 600; color: #475569; font-style: italic;">Iterator (interface)</div>
<div style="font-size: 0.85rem; color: #64748b; margin-top: 8px; font-family: monospace;">+ hasNext()<br/>+ next()<br/>+ reset()</div>
</div>
<div style="color: #64748b;">implements</div>
<div style="color: #64748b; font-size: 1.5rem;">&#8595;</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 24px; text-align: center;">
<div style="font-weight: 700; color: #166534;">ConcreteIterator</div>
<div style="font-size: 0.8rem; color: #15803d; margin-top: 8px; font-family: monospace;">- collection<br/>- currentIndex<br/>+ hasNext()<br/>+ next()</div>
</div>
</div>
</div>
</div>

---

## When to Use Iterator Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 12px;">Perfect Use Cases</div>
<ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
<li><strong>Hide collection internals:</strong> Client doesn't need to know if it's a list, tree, or graph</li>
<li><strong>Multiple traversal methods:</strong> In-order, pre-order, breadth-first on same structure</li>
<li><strong>Lazy evaluation:</strong> Generate elements on-demand without loading all into memory</li>
<li><strong>Infinite sequences:</strong> Fibonacci numbers, random generators, event streams</li>
<li><strong>Paginated APIs:</strong> Iterate through pages of results transparently</li>
<li><strong>[[Composite]](/topic/design-patterns/composite) structures:</strong> Uniform traversal of tree hierarchies</li>
<li><strong>Filter/Transform chains:</strong> Build processing pipelines</li>
</ul>
</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Common Mistakes</div>
<ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
<li><strong>Over-abstraction:</strong> Simple arrays don't need custom iterators - use native loops</li>
<li><strong>Stateful iterators in concurrent code:</strong> Multiple threads sharing one iterator causes race conditions</li>
<li><strong>Modifying collection during iteration:</strong> Can cause ConcurrentModificationException or skipped elements</li>
<li><strong>Memory-heavy iterators:</strong> Storing too much state defeats the lazy evaluation purpose</li>
<li><strong>Ignoring iterator invalidation:</strong> Collection changes may invalidate active iterators</li>
</ul>
</div>

---

## Python Generators: Modern Iterator Pattern

<div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Python's Built-in Support</div>
<div style="color: #334155; line-height: 1.7;">
Python's generator functions (using <code>yield</code>) implement the Iterator pattern implicitly. They're more concise and handle state automatically. Use generators when possible; use explicit iterator classes when you need complex state management or multiple traversal methods.
</div>
</div>

```python
# Generator-based iterators - cleaner syntax

def in_order_generator(node):
    """In-order traversal using generator."""
    if node:
        yield from in_order_generator(node.left)
        yield node.value
        yield from in_order_generator(node.right)


def fibonacci_generator(limit=None):
    """Infinite Fibonacci generator."""
    a, b = 0, 1
    count = 0
    while limit is None or count < limit:
        yield a
        a, b = b, a + b
        count += 1


def paginated_generator(fetch_page, page_size=10):
    """Generator for paginated API results."""
    page = 0
    while True:
        items = fetch_page(page, page_size)
        if not items:
            break
        for item in items:
            yield item
        page += 1


# Usage
print("Generator Fibonacci:", list(fibonacci_generator(10)))

# Generators enable powerful chaining
def take(n, iterable):
    """Take first n items."""
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item

def filter_gen(predicate, iterable):
    """Filter items matching predicate."""
    for item in iterable:
        if predicate(item):
            yield item

# Chain generators
result = list(take(5, filter_gen(lambda x: x % 2 == 0, fibonacci_generator())))
print("First 5 even Fibonacci:", result)  # [0, 2, 8, 34, 144]
```

---

## Iterator vs Iterable: Interview Distinction

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Common Interview Question</div>
<table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Concept</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Iterable</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Iterator</th>
</tr>
    </thead>
    <tbody>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Definition</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Can produce an iterator</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Knows how to traverse</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Python Method</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">__iter__()</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">__next__()</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>State</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Stateless (collection)</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Stateful (position)</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Reusable</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Yes, create new iterators</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">No, exhausted after one pass</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Example</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">list, dict, set</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">list_iterator, generator</td>
</tr>
    </tbody>
</table>
</div>

---

## Comprehensive Interview Questions

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q1: How would you implement an iterator for a binary tree that supports both forward and backward traversal?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Create a bidirectional iterator by:
    1. Pre-compute the traversal order and store in a list
    2. Maintain current index that can move forward or backward
    3. Add previous() method alongside next()

    ```python
    class BidirectionalTreeIterator:
    def __init__(self, root):
    self.elements = []
    self._build_inorder(root)
    self.index = -1  # Before first element

    def _build_inorder(self, node):
    if node:
    self._build_inorder(node.left)
    self.elements.append(node.value)
    self._build_inorder(node.right)

    def has_next(self): return self.index < len(self.elements) - 1
    def has_previous(self): return self.index > 0

    def next(self):
    self.index += 1
    return self.elements[self.index]

    def previous(self):
    self.index -= 1
    return self.elements[self.index]
    ```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q2: What happens if you modify a collection while iterating? How do you handle it?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Modifying during iteration causes undefined behavior:
    - Java throws ConcurrentModificationException (fail-fast)
    - Python may skip elements or raise RuntimeError

    Solutions:
    1. **Snapshot iteration:** Copy collection before iterating
    2. **Fail-fast:** Track modification count, throw if changed
    3. **Copy-on-write:** Iterator works on immutable snapshot
    4. **Concurrent collections:** Use thread-safe data structures
    5. **Iterator.remove():** Use iterator's own remove method
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q3: How would you implement a lazy iterator for database query results?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Use cursor-based pagination with buffering:

    ```python
    class DatabaseIterator:
    def __init__(self, query, batch_size=100):
    self.query = query
    self.batch_size = batch_size
    self.cursor = None
    self.buffer = []
    self.exhausted = False

    def __iter__(self):
    return self

    def __next__(self):
    if not self.buffer and not self.exhausted:
    self._fetch_batch()
    if not self.buffer:
    raise StopIteration
    return self.buffer.pop(0)

    def _fetch_batch(self):
    # Execute query with LIMIT/OFFSET or cursor
    results = db.execute(self.query, cursor=self.cursor, limit=self.batch_size)
    self.buffer = results.rows
    self.cursor = results.next_cursor
    self.exhausted = not self.cursor
    ```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q4: Compare internal vs external iterators with code examples.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong>
    - **External Iterator:** Client controls iteration (next/hasNext). More flexible but client must manage loop.
    - **Internal Iterator:** Collection controls iteration (forEach/map). Simpler but less control.

    ```python
    # External (client controls)
    it = collection.iterator()
    while it.has_next():
    process(it.next())

    # Internal (collection controls)
    collection.for_each(lambda x: process(x))
    ```

    External is better when: early termination, multiple collections, complex logic
    Internal is better when: simple processing, parallel execution, cleaner code
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q5: Design an iterator for a social media feed that merges multiple sources.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Key considerations:</strong>
    1. Multiple sources: friends, groups, ads, recommendations
    2. Different refresh rates and pagination
    3. Ranking/sorting across sources
    4. Deduplication of seen content
    5. Lazy loading for performance

<strong>Implementation approach:</strong>
    Use a merge iterator with priority queue, where each source is an iterator. Pop from highest-priority source, refill as needed. Use seen-set for deduplication. Consider time-decay scoring for ranking.

    ```python
    class FeedMergeIterator:
    def __init__(self, sources, scorer):
    self.heap = []  # (score, source_idx, item)
    self.sources = sources
    self.scorer = scorer
    self.seen = set()
    self._initialize()

    def _initialize(self):
    for idx, source in enumerate(self.sources):
    self._add_from_source(idx)

    def _add_from_source(self, idx):
    if self.sources[idx].has_next():
    item = self.sources[idx].next()
    score = self.scorer(item)
    heappush(self.heap, (-score, idx, item))

    def next(self):
    while self.heap:
    _, idx, item = heappop(self.heap)
    self._add_from_source(idx)
    if item.id not in self.seen:
    self.seen.add(item.id)
    return item
    raise StopIteration()
    ```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q6: Explain Morris traversal and when you would use it.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Morris traversal is an O(1) space tree traversal algorithm that uses <span style="color:#22c55e">**threading**</span> - temporarily modifying tree pointers to eliminate the need for a stack.

<strong>How it works:</strong>
    1. If current node has no left child, visit it and go right
    2. Otherwise, find inorder predecessor (rightmost in left subtree)
    3. If predecessor's right is null, create thread to current, go left
    4. If predecessor's right points to current (thread exists), remove thread, visit current, go right

<strong>Use cases:</strong>
    - Memory-constrained embedded systems
    - Very deep trees where O(h) stack space is problematic
    - When tree modification is acceptable during traversal

<strong>Trade-offs:</strong>
    - Modifies tree during traversal (not thread-safe)
    - Slightly more complex logic
    - Same O(n) time complexity
</div>
</details>

---

## Best Practices

<div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Production Guidelines</div>
<ol style="color: #334155; margin: 0; padding-left: 20px; line-height: 2;">
<li><strong>Prefer generators:</strong> Use Python generators for simple cases - less boilerplate</li>
<li><strong>Implement __iter__ and __next__:</strong> Follow Python protocols for native loop support</li>
<li><strong>Keep iterators lightweight:</strong> Don't store the entire collection in the iterator</li>
<li><strong>Handle exhaustion gracefully:</strong> Raise StopIteration, not return None</li>
<li><strong>Consider thread safety:</strong> Document if iterator is thread-safe or not</li>
<li><strong>Support reset when needed:</strong> Allow restarting iteration without recreating</li>
<li><strong>Use type hints:</strong> Generic typing helps catch errors early</li>
<li><strong>Document mutation behavior:</strong> Be clear about concurrent modification handling</li>
</ol>
</div>

---

## Summary: Key Interview Points

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 2px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.75rem; color: #1e293b;">Memorize These</div>
<ul style="margin: 0; padding-left: 1.25rem; line-height: 2; color: #475569;">
<li><strong>Core concept:</strong> Separate traversal from collection structure</li>
<li><strong>Internal vs External:</strong> Who controls iteration - collection or client?</li>
<li><strong>Lazy evaluation:</strong> Compute elements on-demand, enables infinite sequences</li>
<li><strong>Concurrent modification:</strong> Fail-fast, snapshot, or copy-on-write solutions</li>
<li><strong>Python protocol:</strong> __iter__ returns iterator, __next__ returns next element</li>
<li><strong>Generator advantage:</strong> Implicit state management, cleaner syntax</li>
<li><strong>Related patterns:</strong> [[Composite]](/topic/design-patterns/composite), [[Visitor]](/topic/design-patterns/visitor), [[Factory Method]](/topic/design-patterns/factory-method)</li>
</ul>
</div>

---

## Related Patterns

- **[[Composite]](/topic/design-patterns/composite)** - Often traversed using iterators for uniform access to tree structures
- **[[Factory Method]](/topic/design-patterns/factory-method)** - Creates appropriate iterator type for different collections
- **[[Visitor]](/topic/design-patterns/visitor)** - Alternative for complex operations on elements; often used with iterators
- **[[Memento]](/topic/design-patterns/memento)** - Iterator can store traversal checkpoints for resumption
- **[[Strategy]](/topic/design-patterns/strategy)** - Different traversal strategies can be encapsulated as strategy objects
- **[[Observer]](/topic/design-patterns/observer)** - Push-based iteration similar to internal iterators
