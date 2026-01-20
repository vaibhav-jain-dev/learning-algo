# Invert Binary Tree

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a Binary Tree and inverts it. In other words, the function should swap every left node in the tree for its corresponding right node.

Inverting a binary tree means mirroring it along its vertical axis. After inversion, the left subtree becomes the right subtree and vice versa at every level.

## Examples

**Example:**
```
Input:
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
  / \
 8   9

Output:
        1
      /   \
     3     2
    / \   / \
   7   6 5   4
            / \
           9   8

Explanation: Each node's left and right children are swapped recursively.
```

## Constraints

- The tree is a standard binary tree
- The tree can be empty (return None/nil)
- Node values can be any integers

## Hints

<details>
<summary>Hint 1</summary>
Start by swapping the left and right children of the root node, then recursively do the same for all nodes.
</details>

<details>
<summary>Hint 2</summary>
You can solve this iteratively using a queue (BFS) or stack (DFS) by visiting each node and swapping its children.
</details>

## Approach

1. Base case: If the node is null, return null
2. Swap the left and right children of the current node
3. Recursively invert the left subtree
4. Recursively invert the right subtree
5. Return the root node

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree (recursion stack)

---

## Similar Problems (Harder)

### 1. Invert Binary Tree at Specific Depth
**Difficulty:** Medium

Invert only the subtrees at a specific depth k, leaving other levels unchanged.

### 2. Invert Alternate Levels
**Difficulty:** Medium

Invert only the nodes at odd (or even) levels of the tree while keeping other levels in original order.

### 3. Invert Binary Tree with Parent Pointers
**Difficulty:** Hard

Invert a binary tree where each node also has a parent pointer, maintaining all parent-child relationships correctly.
