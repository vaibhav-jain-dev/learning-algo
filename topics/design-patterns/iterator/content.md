# Iterator Pattern

## Overview

The Iterator pattern provides a way to access elements of a collection sequentially without exposing its underlying representation. It decouples algorithms from containers, enabling uniform traversal across different data structures like arrays, trees, graphs, and custom collections.

**Difficulty:** Beginner to Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Cursor

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

**Expert knows:** "Iterator enables **lazy evaluation** and **infinite sequences**. It separates the 'what' (traversal logic) from the 'how' (data structure). This is why Python generators, Java Streams, and JavaScript async iterators are so powerful - they can process terabytes of data without loading everything into memory."

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
  </ul>
</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Iterator Pattern Architecture</div>
  <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
    <!-- Left side: Collection -->
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
    <!-- Arrow between -->
    <div style="display: flex; align-items: center; color: #64748b; font-size: 1.5rem;">
      creates &#8594;
    </div>
    <!-- Right side: Iterator -->
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
    <li><strong>Composite structures:</strong> Uniform traversal of tree hierarchies</li>
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

## Python Implementation: Multiple Traversal Strategies

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List, Optional, Iterator as TypingIterator
from collections import deque


T = TypeVar('T')


# ============================================================
# ITERATOR INTERFACE
# ============================================================

class Iterator(ABC, Generic[T]):
    """
    Abstract iterator interface.
    Defines the contract for all concrete iterators.
    """

    @abstractmethod
    def has_next(self) -> bool:
        """Check if there are more elements."""
        pass

    @abstractmethod
    def next(self) -> T:
        """Get the next element."""
        pass

    @abstractmethod
    def reset(self) -> None:
        """Reset iterator to beginning."""
        pass


# ============================================================
# BINARY TREE STRUCTURE
# ============================================================

class TreeNode(Generic[T]):
    """Binary tree node."""

    def __init__(self, value: T, left: 'TreeNode[T]' = None, right: 'TreeNode[T]' = None):
        self.value = value
        self.left = left
        self.right = right

    def __repr__(self):
        return f"TreeNode({self.value})"


# ============================================================
# CONCRETE ITERATORS - Different Traversal Strategies
# ============================================================

class InOrderIterator(Iterator[T]):
    """
    In-order traversal: Left -> Root -> Right
    For BST, this gives sorted order.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.stack: List[TreeNode[T]] = []
        self._push_left(root)

    def _push_left(self, node: TreeNode[T]) -> None:
        """Push all left children onto stack."""
        while node:
            self.stack.append(node)
            node = node.left

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration("No more elements")

        node = self.stack.pop()
        self._push_left(node.right)
        return node.value

    def reset(self) -> None:
        self.stack = []
        self._push_left(self.root)


class PreOrderIterator(Iterator[T]):
    """
    Pre-order traversal: Root -> Left -> Right
    Useful for copying trees or prefix expressions.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.stack: List[TreeNode[T]] = [root] if root else []

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration("No more elements")

        node = self.stack.pop()

        # Push right first so left is processed first (LIFO)
        if node.right:
            self.stack.append(node.right)
        if node.left:
            self.stack.append(node.left)

        return node.value

    def reset(self) -> None:
        self.stack = [self.root] if self.root else []


class PostOrderIterator(Iterator[T]):
    """
    Post-order traversal: Left -> Right -> Root
    Useful for deletion or postfix expressions.
    """

    def __init__(self, root: TreeNode[T]):
        self.root = root
        self.stack: List[TreeNode[T]] = []
        self.output: List[T] = []
        self._build_traversal(root)
        self.index = 0

    def _build_traversal(self, node: TreeNode[T]) -> None:
        """Build post-order traversal iteratively."""
        if not node:
            return

        stack = [node]
        while stack:
            current = stack.pop()
            self.output.append(current.value)
            if current.left:
                stack.append(current.left)
            if current.right:
                stack.append(current.right)

        self.output.reverse()

    def has_next(self) -> bool:
        return self.index < len(self.output)

    def next(self) -> T:
        if not self.has_next():
            raise StopIteration("No more elements")

        value = self.output[self.index]
        self.index += 1
        return value

    def reset(self) -> None:
        self.index = 0


class LevelOrderIterator(Iterator[T]):
    """
    Level-order (BFS) traversal: Level by level, left to right.
    Useful for finding shortest path or level-wise processing.
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
            raise StopIteration("No more elements")

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


# ============================================================
# COLLECTION CLASS - The Aggregate
# ============================================================

class BinaryTree(Generic[T]):
    """
    Binary tree that can provide multiple iterator types.
    This is the Aggregate in the Iterator pattern.
    """

    def __init__(self, root: TreeNode[T] = None):
        self.root = root

    def in_order_iterator(self) -> InOrderIterator[T]:
        """Get in-order iterator (sorted for BST)."""
        return InOrderIterator(self.root)

    def pre_order_iterator(self) -> PreOrderIterator[T]:
        """Get pre-order iterator."""
        return PreOrderIterator(self.root)

    def post_order_iterator(self) -> PostOrderIterator[T]:
        """Get post-order iterator."""
        return PostOrderIterator(self.root)

    def level_order_iterator(self) -> LevelOrderIterator[T]:
        """Get level-order (BFS) iterator."""
        return LevelOrderIterator(self.root)

    # ==========================================
    # Python Protocol: __iter__ for native loops
    # ==========================================

    def __iter__(self) -> TypingIterator[T]:
        """Default iteration uses in-order traversal."""
        return self._generate_inorder(self.root)

    def _generate_inorder(self, node: TreeNode[T]) -> TypingIterator[T]:
        """Generator-based in-order traversal."""
        if node:
            yield from self._generate_inorder(node.left)
            yield node.value
            yield from self._generate_inorder(node.right)


# ============================================================
# FILTERING ITERATOR - Decorator Pattern
# ============================================================

class FilterIterator(Iterator[T]):
    """
    Iterator that filters elements based on a predicate.
    Demonstrates iterator composition.
    """

    def __init__(self, inner: Iterator[T], predicate):
        self.inner = inner
        self.predicate = predicate
        self._next_value: Optional[T] = None
        self._has_next = False
        self._advance()

    def _advance(self) -> None:
        """Find next element matching predicate."""
        while self.inner.has_next():
            value = self.inner.next()
            if self.predicate(value):
                self._next_value = value
                self._has_next = True
                return
        self._has_next = False

    def has_next(self) -> bool:
        return self._has_next

    def next(self) -> T:
        if not self._has_next:
            raise StopIteration("No more elements")
        value = self._next_value
        self._advance()
        return value

    def reset(self) -> None:
        self.inner.reset()
        self._advance()


# ============================================================
# LAZY INFINITE ITERATOR - Fibonacci Example
# ============================================================

class FibonacciIterator(Iterator[int]):
    """
    Infinite iterator generating Fibonacci numbers.
    Demonstrates lazy evaluation - computes on demand.
    """

    def __init__(self, limit: int = None):
        self.limit = limit
        self.count = 0
        self.a = 0
        self.b = 1

    def has_next(self) -> bool:
        if self.limit is None:
            return True  # Infinite!
        return self.count < self.limit

    def next(self) -> int:
        if not self.has_next():
            raise StopIteration("Reached limit")

        value = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return value

    def reset(self) -> None:
        self.count = 0
        self.a = 0
        self.b = 1


# ============================================================
# PAGINATED API ITERATOR
# ============================================================

class PaginatedAPIIterator(Iterator[dict]):
    """
    Iterator for paginated API results.
    Fetches pages lazily as needed.
    """

    def __init__(self, fetch_page, page_size: int = 10):
        self.fetch_page = fetch_page  # Function to fetch a page
        self.page_size = page_size
        self.current_page = 0
        self.current_items: List[dict] = []
        self.item_index = 0
        self.exhausted = False
        self._load_next_page()

    def _load_next_page(self) -> None:
        """Load the next page of results."""
        if self.exhausted:
            return

        items = self.fetch_page(self.current_page, self.page_size)

        if not items:
            self.exhausted = True
            self.current_items = []
        else:
            self.current_items = items
            self.item_index = 0
            self.current_page += 1

    def has_next(self) -> bool:
        if self.item_index < len(self.current_items):
            return True

        if not self.exhausted:
            self._load_next_page()
            return len(self.current_items) > 0

        return False

    def next(self) -> dict:
        if not self.has_next():
            raise StopIteration("No more items")

        item = self.current_items[self.item_index]
        self.item_index += 1
        return item

    def reset(self) -> None:
        self.current_page = 0
        self.current_items = []
        self.item_index = 0
        self.exhausted = False
        self._load_next_page()


# ============================================================
# USAGE EXAMPLES
# ============================================================

if __name__ == "__main__":
    # Build a binary search tree
    #         4
    #       /   \
    #      2     6
    #     / \   / \
    #    1   3 5   7

    tree = BinaryTree(
        TreeNode(4,
            TreeNode(2, TreeNode(1), TreeNode(3)),
            TreeNode(6, TreeNode(5), TreeNode(7))
        )
    )

    # Different traversal strategies
    print("=== Tree Traversals ===")

    print("In-order (sorted):", end=" ")
    it = tree.in_order_iterator()
    while it.has_next():
        print(it.next(), end=" ")
    print()  # 1 2 3 4 5 6 7

    print("Pre-order:", end=" ")
    it = tree.pre_order_iterator()
    while it.has_next():
        print(it.next(), end=" ")
    print()  # 4 2 1 3 6 5 7

    print("Level-order (BFS):", end=" ")
    it = tree.level_order_iterator()
    while it.has_next():
        print(it.next(), end=" ")
    print()  # 4 2 6 1 3 5 7

    # Python native iteration
    print("\nUsing for-loop (in-order):", list(tree))

    # Filtered iterator - only even numbers
    print("\n=== Filtered Iterator ===")
    filtered = FilterIterator(
        tree.in_order_iterator(),
        lambda x: x % 2 == 0
    )
    print("Even numbers:", end=" ")
    while filtered.has_next():
        print(filtered.next(), end=" ")
    print()  # 2 4 6

    # Fibonacci iterator
    print("\n=== Fibonacci Iterator ===")
    fib = FibonacciIterator(limit=10)
    print("First 10 Fibonacci:", end=" ")
    while fib.has_next():
        print(fib.next(), end=" ")
    print()  # 0 1 1 2 3 5 8 13 21 34

    # Paginated API simulation
    print("\n=== Paginated API Iterator ===")

    # Simulate API with 25 items
    all_items = [{"id": i, "name": f"Item {i}"} for i in range(1, 26)]

    def mock_fetch_page(page: int, size: int) -> List[dict]:
        start = page * size
        end = start + size
        return all_items[start:end]

    api_iter = PaginatedAPIIterator(mock_fetch_page, page_size=10)
    print("Items from paginated API:")
    count = 0
    while api_iter.has_next() and count < 15:
        item = api_iter.next()
        print(f"  {item}")
        count += 1
```

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

## Interview Questions

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
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q4: Compare internal vs external iterators.</summary>
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

Use a merge iterator with priority queue, where each source is an iterator. Pop from highest-priority source, refill as needed.
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
  </ol>
</div>

---

## Related Patterns

- [Composite](/topic/design-patterns/composite) - Often traversed using iterators
- [Factory Method](/topic/design-patterns/factory-method) - Create appropriate iterator type
- [Visitor](/topic/design-patterns/visitor) - Alternative for complex operations on elements
- [Memento](/topic/design-patterns/memento) - Iterator can store traversal checkpoints
