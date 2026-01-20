<div id="viz-config" style="display:none">
{"name":"Flatten Binary Tree","algorithm":"tree-flatten","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},"output":"4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3","inputRaw":"tree = {1,2,3,4,5,6}","outputRaw":"4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3"}]}
</div>

# Flatten Binary Tree

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in a Binary Tree, flattens it, and returns its leftmost node.

A flattened Binary Tree is a structure that's nearly identical to a Doubly Linked List (except that nodes have `left` and `right` pointers instead of `prev` and `next` pointers), where nodes follow the original tree's left-to-right order.

After flattening, each node's `left` pointer should point to the previous node in the flattened structure, and its `right` pointer should point to the next node.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \   /
   4   5 6

Output (as linked list): 4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3

Explanation:
- The in-order traversal is [4, 2, 5, 1, 6, 3]
- After flattening: 4.right = 2, 2.left = 4, 2.right = 5, etc.
- Return node 4 (leftmost)
```

## Constraints

- The tree is a standard binary tree
- All nodes will be connected in the flattened structure
- Return the leftmost node after flattening
- An empty tree returns None/nil

## Hints

<details>
<summary>Hint 1</summary>
The flattened structure follows in-order traversal. Think about how to connect nodes during traversal.
</details>

<details>
<summary>Hint 2</summary>
For each node, you need to connect its left subtree's rightmost node to itself, and connect itself to its right subtree's leftmost node.
</details>

## Approach

1. Perform in-order traversal
2. For each node being processed:
   - Connect left subtree's rightmost to current node
   - Connect current node to right subtree's leftmost
3. Recursively process and return (leftmost, rightmost) for each subtree
4. Return the overall leftmost node

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree (for recursion)

---

## Similar Problems (Harder)

### 1. Flatten Binary Tree to Linked List (Pre-order)
**Difficulty:** Medium

Flatten the tree in pre-order traversal order using only right pointers.

### 2. Convert BST to Sorted Circular Doubly Linked List
**Difficulty:** Hard

Convert a BST to a sorted circular doubly linked list in-place.

### 3. Flatten Multi-level Doubly Linked List
**Difficulty:** Hard

Flatten a multi-level doubly linked list where nodes can have child lists.
