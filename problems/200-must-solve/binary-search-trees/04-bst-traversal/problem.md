# BST Traversal

**Difficulty:** Medium (Blue)

## Problem Statement

Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, add its nodes' values to the input array, and return that array. The three functions should traverse the BST using the in-order, pre-order, and post-order tree-traversal techniques, respectively.

## Examples

**Example:**
```
Input: tree =     10
                /    \
               5      15
              / \       \
             2   5      22
            /
           1

In-order:   [1, 2, 5, 5, 10, 15, 22]
Pre-order:  [10, 5, 2, 1, 5, 15, 22]
Post-order: [1, 2, 5, 5, 22, 15, 10]
```

## Constraints

- Tree can have any number of nodes
- Empty tree returns empty array

## Hints

<details>
<summary>Hint 1</summary>
In-order: left, node, right - gives sorted order for BST.
</details>

<details>
<summary>Hint 2</summary>
Pre-order: node, left, right - useful for copying trees.
</details>

<details>
<summary>Hint 3</summary>
Post-order: left, right, node - useful for deletion.
</details>

## Approach

Each traversal visits all nodes but in different orders:
- **In-order (LNR):** Left subtree → Node → Right subtree
- **Pre-order (NLR):** Node → Left subtree → Right subtree
- **Post-order (LRN):** Left subtree → Right subtree → Node

**Time Complexity:** O(n)
**Space Complexity:** O(n) for result, O(d) for call stack

---

## Similar Problems (Harder)

### 1. Iterative Tree Traversal
**Difficulty:** Medium

Implement all three traversals iteratively using explicit stacks.

### 2. Morris Traversal
**Difficulty:** Hard

Implement in-order traversal with O(1) space using Morris algorithm.

### 3. Level Order with Zigzag
**Difficulty:** Medium

Traverse tree level by level, alternating left-to-right and right-to-left.
