<div id="viz-config" style="display:none">
{"name":"Linked List Construction","algorithm":"ll-construction","complexity":{"time":"O(1) for most operations","space":"O(1)"},"examples":[{"input":{"initialList":[1,2,3,4,5],"operations":["setHead(4)","setTail(6)","insertBefore(6,3)","insertAfter(6,3)","insertAtPosition(1,3)","removeNodesWithValue(3)","remove(2)","containsNodeWithValue(5)"]},"output":[4,1,5,6],"inputRaw":"Initial: 1 <-> 2 <-> 3 <-> 4 <-> 5","outputRaw":"4 <-> 1 <-> 5 <-> 6"}]}
</div>

# Linked List Construction

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a `DoublyLinkedList` class that has a `head` and a `tail`, both of which point to either a linked list `Node` or `None` / `null`. The class should support:

1. **setHead(node)**: Set the head of the linked list to an existing node
2. **setTail(node)**: Set the tail of the linked list to an existing node
3. **insertBefore(node, nodeToInsert)**: Insert a node before another node
4. **insertAfter(node, nodeToInsert)**: Insert a node after another node
5. **insertAtPosition(position, nodeToInsert)**: Insert at a 1-indexed position
6. **removeNodesWithValue(value)**: Remove all nodes with a given value
7. **remove(node)**: Remove a specific node
8. **containsNodeWithValue(value)**: Check if any node has a given value

The input nodes have an integer `value` and `prev`/`next` pointers.

## Examples

**Example:**
```
Initial list: 1 <-> 2 <-> 3 <-> 4 <-> 5

setHead(4):       4 <-> 1 <-> 2 <-> 3 <-> 5
setTail(6):       4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6
insertBefore(6, 3): 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6  (3 is already in list)
insertAfter(6, 3):  4 <-> 1 <-> 2 <-> 5 <-> 6 <-> 3
insertAtPosition(1, 3): 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 6
removeNodesWithValue(3): 4 <-> 1 <-> 2 <-> 5 <-> 6
remove(2):        4 <-> 1 <-> 5 <-> 6
containsNodeWithValue(5): true
```

## Constraints

- The setHead, setTail, insertBefore, insertAfter, and insertAtPosition methods should handle existing nodes (already in the list)
- Position is 1-indexed
- Assume all input nodes are valid
- Methods that insert/move nodes should handle edge cases (single node, empty list, etc.)

## Hints

<details>
<summary>Hint 1</summary>
When inserting or moving a node that's already in the list, you need to first remove it from its current position.
</details>

<details>
<summary>Hint 2</summary>
Always update the prev and next pointers of affected nodes, as well as head/tail if necessary.
</details>

<details>
<summary>Hint 3</summary>
For insertAtPosition, traverse the list to find the node at that position, then use insertBefore.
</details>

## Approach

### Key Operations

**Remove a node:**
1. Update prev node's next pointer
2. Update next node's prev pointer
3. Update head/tail if necessary
4. Clear the node's prev/next pointers

**Insert before a node:**
1. If node is in list, remove it first
2. Set pointers: nodeToInsert.prev = node.prev, nodeToInsert.next = node
3. Update neighbors' pointers
4. Update head if inserting before head

**Time Complexity:**
- setHead, setTail, insertBefore, insertAfter, remove: O(1)
- insertAtPosition: O(p) where p is the position
- removeNodesWithValue, containsNodeWithValue: O(n)

**Space Complexity:** O(1) for all operations

---

## Similar Problems (Harder)

### 1. LRU Cache Implementation
**Difficulty:** Hard

Implement an LRU (Least Recently Used) cache using a doubly linked list and hash map, supporting O(1) get and put operations.

### 2. Flatten Multi-Level Doubly Linked List
**Difficulty:** Hard

Given a doubly linked list where nodes can have child lists, flatten all levels into a single-level list.

### 3. Design Browser History
**Difficulty:** Medium

Implement a browser history system using a doubly linked list with visit, back, and forward operations.
