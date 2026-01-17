# Linked Lists

## Overview

A Linked List is a linear data structure where elements are stored in nodes, each pointing to the next. Unlike arrays, elements are not contiguous in memory, allowing efficient insertions and deletions.

## Key Concepts & Terminology

### Types of Linked Lists
| Type | Description |
|------|-------------|
| Singly Linked | Each node points to next |
| Doubly Linked | Nodes point to next and previous |
| Circular | Last node points to first |

### Time Complexities
| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Insert at head | O(n) | O(1) |
| Insert at tail | O(1)* | O(n) or O(1)** |
| Delete at head | O(n) | O(1) |
| Search | O(n) | O(n) |

*Amortized for dynamic arrays
**O(1) if tail pointer maintained

### Common Patterns
1. **Two Pointers**: Fast/slow for cycle detection, middle finding
2. **Dummy Head**: Simplifies edge cases
3. **Reverse**: In-place pointer manipulation
4. **Merge**: Combine sorted lists

### Boundary Conditions
1. Empty list (head is null)
2. Single node
3. Two nodes
4. Cycle detection
5. Update head/tail when modifying

---

## Problems

### 1. Remove Duplicates

**Difficulty:** Easy

**Problem Statement:**
Remove duplicates from a sorted linked list.

**Example:**
```
Input: 1 -> 1 -> 3 -> 4 -> 4 -> 4 -> 5 -> 6 -> 6
Output: 1 -> 3 -> 4 -> 5 -> 6
```

<details>
<summary><strong>Hints</strong></summary>

1. Since sorted, duplicates are adjacent
2. Compare current with next
3. Skip nodes with same value

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None

def removeDuplicatesFromLinkedList(linkedList):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    current = linkedList

    while current is not None:
        # Skip all duplicates
        next_distinct = current.next
        while next_distinct is not None and next_distinct.value == current.value:
            next_distinct = next_distinct.next

        current.next = next_distinct
        current = next_distinct

    return linkedList

# Test helper
def print_list(head):
    values = []
    while head:
        values.append(str(head.value))
        head = head.next
    print(" -> ".join(values))

# Test
head = LinkedList(1)
head.next = LinkedList(1)
head.next.next = LinkedList(3)
head.next.next.next = LinkedList(4)
head.next.next.next.next = LinkedList(4)

removeDuplicatesFromLinkedList(head)
print_list(head)  # 1 -> 3 -> 4
```

```go
package main

import "fmt"

type LinkedList struct {
    Value int
    Next  *LinkedList
}

func removeDuplicatesFromLinkedList(linkedList *LinkedList) *LinkedList {
    current := linkedList

    for current != nil {
        nextDistinct := current.Next
        for nextDistinct != nil && nextDistinct.Value == current.Value {
            nextDistinct = nextDistinct.Next
        }
        current.Next = nextDistinct
        current = nextDistinct
    }

    return linkedList
}

func main() {
    head := &LinkedList{Value: 1}
    head.Next = &LinkedList{Value: 1}
    head.Next.Next = &LinkedList{Value: 3}

    removeDuplicatesFromLinkedList(head)
    for head != nil {
        fmt.Print(head.Value, " ")
        head = head.Next
    }
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Remove Duplicates II** - Remove all nodes with duplicates
2. **Remove Duplicates from Unsorted List** - Use hash set
3. **Delete Nodes Having Greater Value on Right**

</details>

---

### 2. Middle Node

**Difficulty:** Easy

**Problem Statement:**
Find the middle node of a linked list. For even length, return the second middle.

**Example:**
```
Input: 1 -> 2 -> 3 -> 4 -> 5
Output: 3

Input: 1 -> 2 -> 3 -> 4
Output: 3 (second middle)
```

<details>
<summary><strong>Hints</strong></summary>

1. Use fast and slow pointers
2. Fast moves 2 steps, slow moves 1 step
3. When fast reaches end, slow is at middle

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None

def middleNode(linkedList):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    slow = fast = linkedList

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return slow

# Test
head = LinkedList(1)
head.next = LinkedList(2)
head.next.next = LinkedList(3)
head.next.next.next = LinkedList(4)
head.next.next.next.next = LinkedList(5)

middle = middleNode(head)
print(middle.value)  # 3
```

```go
package main

import "fmt"

type LinkedList struct {
    Value int
    Next  *LinkedList
}

func middleNode(linkedList *LinkedList) *LinkedList {
    slow := linkedList
    fast := linkedList

    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    return slow
}

func main() {
    head := &LinkedList{Value: 1}
    head.Next = &LinkedList{Value: 2}
    head.Next.Next = &LinkedList{Value: 3}
    head.Next.Next.Next = &LinkedList{Value: 4}
    head.Next.Next.Next.Next = &LinkedList{Value: 5}

    middle := middleNode(head)
    fmt.Println(middle.Value) // 3
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Detect Cycle** - Fast/slow pointer
2. **Find Cycle Start** - Floyd's algorithm
3. **Reorder List** - Use middle finding

</details>

---

### 3. Linked List Construction

**Difficulty:** Medium

**Problem Statement:**
Implement a doubly linked list with insert, remove, search operations.

<details>
<summary><strong>Solution</strong></summary>

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def setHead(self, node):
        if self.head is None:
            self.head = node
            self.tail = node
            return
        self.insertBefore(self.head, node)

    def setTail(self, node):
        if self.tail is None:
            self.setHead(node)
            return
        self.insertAfter(self.tail, node)

    def insertBefore(self, node, nodeToInsert):
        if nodeToInsert == self.head and nodeToInsert == self.tail:
            return
        self.remove(nodeToInsert)
        nodeToInsert.prev = node.prev
        nodeToInsert.next = node
        if node.prev is None:
            self.head = nodeToInsert
        else:
            node.prev.next = nodeToInsert
        node.prev = nodeToInsert

    def insertAfter(self, node, nodeToInsert):
        if nodeToInsert == self.head and nodeToInsert == self.tail:
            return
        self.remove(nodeToInsert)
        nodeToInsert.prev = node
        nodeToInsert.next = node.next
        if node.next is None:
            self.tail = nodeToInsert
        else:
            node.next.prev = nodeToInsert
        node.next = nodeToInsert

    def insertAtPosition(self, position, nodeToInsert):
        if position == 1:
            self.setHead(nodeToInsert)
            return
        node = self.head
        currentPosition = 1
        while node is not None and currentPosition != position:
            node = node.next
            currentPosition += 1
        if node is not None:
            self.insertBefore(node, nodeToInsert)
        else:
            self.setTail(nodeToInsert)

    def removeNodesWithValue(self, value):
        node = self.head
        while node is not None:
            nodeToRemove = node
            node = node.next
            if nodeToRemove.value == value:
                self.remove(nodeToRemove)

    def remove(self, node):
        if node == self.head:
            self.head = self.head.next
        if node == self.tail:
            self.tail = self.tail.prev
        self.removeNodeBindings(node)

    def removeNodeBindings(self, node):
        if node.prev is not None:
            node.prev.next = node.next
        if node.next is not None:
            node.next.prev = node.prev
        node.prev = None
        node.next = None

    def containsNodeWithValue(self, value):
        node = self.head
        while node is not None:
            if node.value == value:
                return True
            node = node.next
        return False
```

```go
package main

type Node struct {
    Value int
    Prev  *Node
    Next  *Node
}

type DoublyLinkedList struct {
    Head *Node
    Tail *Node
}

func (dll *DoublyLinkedList) SetHead(node *Node) {
    if dll.Head == nil {
        dll.Head = node
        dll.Tail = node
        return
    }
    dll.InsertBefore(dll.Head, node)
}

func (dll *DoublyLinkedList) SetTail(node *Node) {
    if dll.Tail == nil {
        dll.SetHead(node)
        return
    }
    dll.InsertAfter(dll.Tail, node)
}

func (dll *DoublyLinkedList) InsertBefore(node, nodeToInsert *Node) {
    if nodeToInsert == dll.Head && nodeToInsert == dll.Tail {
        return
    }
    dll.Remove(nodeToInsert)
    nodeToInsert.Prev = node.Prev
    nodeToInsert.Next = node
    if node.Prev == nil {
        dll.Head = nodeToInsert
    } else {
        node.Prev.Next = nodeToInsert
    }
    node.Prev = nodeToInsert
}

func (dll *DoublyLinkedList) InsertAfter(node, nodeToInsert *Node) {
    if nodeToInsert == dll.Head && nodeToInsert == dll.Tail {
        return
    }
    dll.Remove(nodeToInsert)
    nodeToInsert.Prev = node
    nodeToInsert.Next = node.Next
    if node.Next == nil {
        dll.Tail = nodeToInsert
    } else {
        node.Next.Prev = nodeToInsert
    }
    node.Next = nodeToInsert
}

func (dll *DoublyLinkedList) Remove(node *Node) {
    if node == dll.Head {
        dll.Head = dll.Head.Next
    }
    if node == dll.Tail {
        dll.Tail = dll.Tail.Prev
    }
    dll.removeNodeBindings(node)
}

func (dll *DoublyLinkedList) removeNodeBindings(node *Node) {
    if node.Prev != nil {
        node.Prev.Next = node.Next
    }
    if node.Next != nil {
        node.Next.Prev = node.Prev
    }
    node.Prev = nil
    node.Next = nil
}
```

</details>

---

### 4. Remove Kth Node From End

**Difficulty:** Medium

**Problem Statement:**
Remove the kth node from the end of a linked list.

**Example:**
```
Input: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9, k = 4
Output: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 7 -> 8 -> 9 (6 removed)
```

<details>
<summary><strong>Hints</strong></summary>

1. Use two pointers with k-gap
2. Move first pointer k nodes ahead
3. Move both until first reaches end

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None

def removeKthNodeFromEnd(head, k):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    first = head
    second = head

    # Move first k nodes ahead
    for _ in range(k):
        first = first.next

    # Special case: remove head
    if first is None:
        head.value = head.next.value
        head.next = head.next.next
        return

    # Move both until first reaches end
    while first.next is not None:
        first = first.next
        second = second.next

    # Remove node after second
    second.next = second.next.next

# Test
head = LinkedList(0)
current = head
for i in range(1, 10):
    current.next = LinkedList(i)
    current = current.next

removeKthNodeFromEnd(head, 4)
# Print result
```

```go
package main

type LinkedList struct {
    Value int
    Next  *LinkedList
}

func removeKthNodeFromEnd(head *LinkedList, k int) {
    first := head
    second := head

    for i := 0; i < k; i++ {
        first = first.Next
    }

    if first == nil {
        head.Value = head.Next.Value
        head.Next = head.Next.Next
        return
    }

    for first.Next != nil {
        first = first.Next
        second = second.Next
    }

    second.Next = second.Next.Next
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Remove Nth Node From End** - LeetCode version
2. **Get Kth Node From End** - Just find, don't remove
3. **Rotate List** - Rotate by k positions

</details>

---

### 5. Sum Of Linked Lists

**Difficulty:** Medium

**Problem Statement:**
Add two numbers represented as linked lists (digits in reverse order).

**Example:**
```
Input: 2 -> 4 -> 7 -> 1 (1742)
       9 -> 4 -> 5      (549)
Output: 1 -> 9 -> 2 -> 2 (2291)
```

<details>
<summary><strong>Hints</strong></summary>

1. Add digit by digit with carry
2. Handle different lengths
3. Don't forget final carry

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None

def sumOfLinkedLists(linkedListOne, linkedListTwo):
    """
    Time Complexity: O(max(n, m))
    Space Complexity: O(max(n, m))
    """
    dummy = LinkedList(0)
    current = dummy
    carry = 0

    node1 = linkedListOne
    node2 = linkedListTwo

    while node1 is not None or node2 is not None or carry > 0:
        val1 = node1.value if node1 else 0
        val2 = node2.value if node2 else 0

        total = val1 + val2 + carry
        carry = total // 10
        digit = total % 10

        current.next = LinkedList(digit)
        current = current.next

        node1 = node1.next if node1 else None
        node2 = node2.next if node2 else None

    return dummy.next

# Test
list1 = LinkedList(2)
list1.next = LinkedList(4)
list1.next.next = LinkedList(7)
list1.next.next.next = LinkedList(1)

list2 = LinkedList(9)
list2.next = LinkedList(4)
list2.next.next = LinkedList(5)

result = sumOfLinkedLists(list1, list2)
# Print: 1 -> 9 -> 2 -> 2
```

```go
package main

type LinkedList struct {
    Value int
    Next  *LinkedList
}

func sumOfLinkedLists(l1, l2 *LinkedList) *LinkedList {
    dummy := &LinkedList{}
    current := dummy
    carry := 0

    for l1 != nil || l2 != nil || carry > 0 {
        val1, val2 := 0, 0
        if l1 != nil {
            val1 = l1.Value
            l1 = l1.Next
        }
        if l2 != nil {
            val2 = l2.Value
            l2 = l2.Next
        }

        total := val1 + val2 + carry
        carry = total / 10
        digit := total % 10

        current.Next = &LinkedList{Value: digit}
        current = current.Next
    }

    return dummy.Next
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Add Two Numbers** - LeetCode version
2. **Add Two Numbers II** - Most significant first
3. **Multiply Strings** - Multiplication instead

</details>

---

### 6-10. More Medium/Hard Problems

<details>
<summary><strong>Find Loop</strong></summary>

Find the node where a cycle begins.

```python
def findLoop(head):
    """Floyd's Cycle Detection"""
    slow = fast = head

    # Find meeting point
    while True:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break

    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow
```

**Similar**: Linked List Cycle II, Happy Number

</details>

<details>
<summary><strong>Reverse Linked List</strong></summary>

Reverse a linked list in-place.

```python
def reverseLinkedList(head):
    """
    Time: O(n), Space: O(1)
    """
    prev = None
    current = head

    while current is not None:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    return prev
```

**Similar**: Reverse in K-Groups, Reverse Between

</details>

<details>
<summary><strong>Merge Linked Lists</strong></summary>

Find intersection point of two lists.

```python
def mergingLinkedLists(headOne, headTwo):
    """
    Get lengths, align starts, find meeting point
    """
    len1 = getLength(headOne)
    len2 = getLength(headTwo)

    diff = abs(len1 - len2)

    if len1 > len2:
        for _ in range(diff):
            headOne = headOne.next
    else:
        for _ in range(diff):
            headTwo = headTwo.next

    while headOne != headTwo:
        headOne = headOne.next
        headTwo = headTwo.next

    return headOne
```

</details>

<details>
<summary><strong>LRU Cache (Very Hard)</strong></summary>

Implement Least Recently Used cache.

```python
class LRUCache:
    def __init__(self, maxSize):
        self.maxSize = maxSize or 1
        self.cache = {}
        self.head = Node(None, None)  # Dummy head (most recent)
        self.tail = Node(None, None)  # Dummy tail (least recent)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key):
        if key not in self.cache:
            return None
        node = self.cache[key]
        self.moveToHead(node)
        return node.value

    def put(self, key, value):
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self.moveToHead(node)
        else:
            if len(self.cache) == self.maxSize:
                self.removeLRU()
            node = Node(key, value)
            self.cache[key] = node
            self.addToHead(node)

    def moveToHead(self, node):
        self.removeNode(node)
        self.addToHead(node)

    def addToHead(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def removeNode(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def removeLRU(self):
        lru = self.tail.prev
        self.removeNode(lru)
        del self.cache[lru.key]
```

</details>

---

## Practice Tips

### Common Patterns

| Pattern | Use Case |
|---------|----------|
| Two Pointers | Middle, cycle, kth from end |
| Dummy Head | Simplify insertions/deletions |
| Prev/Curr/Next | Reversing, rearranging |
| Hash Map | O(1) node lookup |

### Common Mistakes
1. Losing reference to head
2. Not handling null pointers
3. Forgetting to update tail
4. Infinite loops in cycles
