# Find Successor

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in a Binary Tree (where nodes have an additional pointer to their parent node) and a target node contained in that tree. The function should return the in-order successor of the target node.

The in-order successor of a node is the node that comes immediately after it in an in-order traversal of the tree. If the target node is the last node in the in-order traversal, return None/nil.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \
   4   5
  /
 6

Target node: 5

Output: Node with value 1
Explanation: In-order traversal is [6, 4, 2, 5, 1, 3].
The node after 5 is 1, so return the node with value 1.
```

## Constraints

- Each node has a parent pointer
- The target node is guaranteed to be in the tree
- Return None/nil if target is the last node in in-order traversal
- Tree is a valid binary tree

## Hints

<details>
<summary>Hint 1</summary>
If the node has a right subtree, the successor is the leftmost node in that subtree.
</details>

<details>
<summary>Hint 2</summary>
If the node has no right subtree, traverse up through parent pointers until you find a parent where the current node is in the left subtree.
</details>

## Approach

1. If the target node has a right child:
   - The successor is the leftmost node in the right subtree
2. If the target node has no right child:
   - Go up to the parent until you find a node that is a left child
   - That node's parent is the successor
3. If you reach the root going up, return None (no successor)

**Time Complexity:** O(h) where h is the height of the tree
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Find Predecessor
**Difficulty:** Medium

Find the in-order predecessor of a given node (the node that comes before it).

### 2. Find Kth Successor
**Difficulty:** Medium

Find the kth in-order successor of a given node, not just the immediate successor.

### 3. Find Successor Without Parent Pointer
**Difficulty:** Hard

Find the in-order successor when nodes don't have parent pointers - requires finding the path from root.
