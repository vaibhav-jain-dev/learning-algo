# Iterator Pattern

## Overview

The Iterator pattern provides a way to access elements of a collection sequentially without exposing its underlying representation. It decouples algorithms from containers.

## Key Concepts

### When to Use

- Traverse collection without exposing internals
- Support multiple traversal methods
- Provide uniform interface for different collections
- Enable lazy evaluation

## Implementation

### Python - Custom Iterator

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List, Iterator as TypingIterator

T = TypeVar('T')

class Iterator(ABC, Generic[T]):
    @abstractmethod
    def has_next(self) -> bool:
        pass

    @abstractmethod
    def next(self) -> T:
        pass

    @abstractmethod
    def reset(self) -> None:
        pass


class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


class InOrderIterator(Iterator):
    def __init__(self, root: BinaryTree):
        self.root = root
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self):
        if not self.has_next():
            raise StopIteration()
        node = self.stack.pop()
        self._push_left(node.right)
        return node.value

    def reset(self):
        self.stack = []
        self._push_left(self.root)


class PreOrderIterator(Iterator):
    def __init__(self, root: BinaryTree):
        self.root = root
        self.stack = [root] if root else []

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self):
        if not self.has_next():
            raise StopIteration()
        node = self.stack.pop()
        if node.right:
            self.stack.append(node.right)
        if node.left:
            self.stack.append(node.left)
        return node.value

    def reset(self):
        self.stack = [self.root] if self.root else []


# Python's built-in iterator protocol
class TreeCollection:
    def __init__(self, root: BinaryTree):
        self.root = root

    def __iter__(self):
        return self._inorder(self.root)

    def _inorder(self, node):
        if node:
            yield from self._inorder(node.left)
            yield node.value
            yield from self._inorder(node.right)

    def preorder(self):
        return self._preorder(self.root)

    def _preorder(self, node):
        if node:
            yield node.value
            yield from self._preorder(node.left)
            yield from self._preorder(node.right)


# Usage
tree = BinaryTree(4,
    BinaryTree(2, BinaryTree(1), BinaryTree(3)),
    BinaryTree(6, BinaryTree(5), BinaryTree(7))
)

# Custom iterator
it = InOrderIterator(tree)
print("In-order:", end=" ")
while it.has_next():
    print(it.next(), end=" ")
print()

# Python protocol
collection = TreeCollection(tree)
print("In-order (generator):", list(collection))
print("Pre-order:", list(collection.preorder()))
```

### Go - Iterator Interface

```go
package main

import "fmt"

type Iterator[T any] interface {
	HasNext() bool
	Next() T
	Reset()
}

// Linked List
type Node[T any] struct {
	Value T
	Next  *Node[T]
}

type LinkedList[T any] struct {
	Head *Node[T]
	Tail *Node[T]
	Size int
}

func (l *LinkedList[T]) Add(value T) {
	node := &Node[T]{Value: value}
	if l.Head == nil {
		l.Head = node
		l.Tail = node
	} else {
		l.Tail.Next = node
		l.Tail = node
	}
	l.Size++
}

func (l *LinkedList[T]) Iterator() Iterator[T] {
	return &LinkedListIterator[T]{list: l, current: l.Head}
}

type LinkedListIterator[T any] struct {
	list    *LinkedList[T]
	current *Node[T]
}

func (it *LinkedListIterator[T]) HasNext() bool {
	return it.current != nil
}

func (it *LinkedListIterator[T]) Next() T {
	value := it.current.Value
	it.current = it.current.Next
	return value
}

func (it *LinkedListIterator[T]) Reset() {
	it.current = it.list.Head
}

// Filtered Iterator
type FilterIterator[T any] struct {
	inner     Iterator[T]
	predicate func(T) bool
	nextValue T
	hasNext   bool
}

func NewFilterIterator[T any](inner Iterator[T], pred func(T) bool) *FilterIterator[T] {
	it := &FilterIterator[T]{inner: inner, predicate: pred}
	it.advance()
	return it
}

func (it *FilterIterator[T]) advance() {
	for it.inner.HasNext() {
		value := it.inner.Next()
		if it.predicate(value) {
			it.nextValue = value
			it.hasNext = true
			return
		}
	}
	it.hasNext = false
}

func (it *FilterIterator[T]) HasNext() bool {
	return it.hasNext
}

func (it *FilterIterator[T]) Next() T {
	value := it.nextValue
	it.advance()
	return value
}

func (it *FilterIterator[T]) Reset() {
	it.inner.Reset()
	it.advance()
}

func main() {
	list := &LinkedList[int]{}
	for i := 1; i <= 10; i++ {
		list.Add(i)
	}

	// Basic iteration
	fmt.Print("All: ")
	it := list.Iterator()
	for it.HasNext() {
		fmt.Print(it.Next(), " ")
	}
	fmt.Println()

	// Filtered iteration
	fmt.Print("Even: ")
	filtered := NewFilterIterator(list.Iterator(), func(n int) bool {
		return n%2 == 0
	})
	for filtered.HasNext() {
		fmt.Print(filtered.Next(), " ")
	}
	fmt.Println()
}
```

## Best Practices

1. **Implement standard protocols** - `__iter__`/`__next__` in Python
2. **Use generators** - Simpler than full iterator classes
3. **Support lazy evaluation** - Don't load everything upfront
4. **Handle concurrent modification** - Fail-fast or snapshot

## Related Patterns

- [Composite](/topic/design-patterns/composite) - Often iterated over
- [Factory Method](/topic/design-patterns/factory-method) - Create iterators
- [Visitor](/topic/design-patterns/visitor) - Alternative traversal
