# Breadth First Search

**Difficulty:** Easy (Green)

## Problem Statement

You're given a Node class that has a name and an array of optional children nodes. Implement the breadthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Breadth-first Search approach, stores all of the nodes' names in the input array, and returns it.

## Examples

**Example:**
```
Input:        A
            / | \
           B  C  D
          / \   / \
         E   F G   H
            / \  \
           I   J  K

Output: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]
```

## Constraints

- Process nodes level by level from left to right
- Tree can have any number of children per node

## Hints

<details>
<summary>Hint 1</summary>
Use a queue to process nodes in FIFO order.
</details>

<details>
<summary>Hint 2</summary>
Add all children of current node to the queue before processing the next node.
</details>

## Approach

1. Use a queue, starting with the root node
2. While queue is not empty:
   - Dequeue a node, add its name to result
   - Enqueue all its children (left to right)
3. Return the result array

**Time Complexity:** O(v + e) where v is vertices, e is edges
**Space Complexity:** O(v)

---

## Similar Problems (Harder)

### 1. Binary Tree Level Order Traversal
**Difficulty:** Medium

Return values grouped by level.

### 2. Shortest Path in Binary Matrix
**Difficulty:** Medium

Find shortest path from top-left to bottom-right in a grid.

### 3. Word Ladder
**Difficulty:** Hard

Find shortest transformation sequence from one word to another.
