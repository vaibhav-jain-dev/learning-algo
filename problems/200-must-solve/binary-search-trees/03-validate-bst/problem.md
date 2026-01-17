# Validate BST

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in a potentially invalid Binary Search Tree (BST) and returns a boolean representing whether the BST is valid.

Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and its children nodes are either valid BST nodes themselves or None/null.

## Examples

**Example 1:**
```
Input:      10
           /  \
          5    15
         / \   / \
        2   5 13  22
       /       \
      1         14

Output: true
```

**Example 2:**
```
Input:      10
           /  \
          5    15
         / \   / \
        2   5 10  22

Output: false (10 in right subtree is not > 10)
```

## Constraints

- Node values can be any integer
- Empty tree is considered valid
- Duplicates should go to the right

## Hints

<details>
<summary>Hint 1</summary>
Each node must be within a valid range. The root can be any value, but its children are constrained.
</details>

<details>
<summary>Hint 2</summary>
Pass min and max constraints down the tree. Left children update the max, right children update the min.
</details>

<details>
<summary>Hint 3</summary>
Use negative and positive infinity as initial bounds.
</details>

## Approach

### Range Validation
1. Start with root and bounds (-∞, +∞)
2. For each node:
   - Check if value is within bounds
   - Recurse on left child with (min, node.value)
   - Recurse on right child with (node.value, max)
3. Return true if all nodes pass

**Time Complexity:** O(n)
**Space Complexity:** O(d) where d is depth

---

## Similar Problems (Harder)

### 1. Find Invalid Nodes in BST
**Difficulty:** Hard

Instead of just validating, return a list of all nodes that violate the BST property.

### 2. Minimum Swaps to Create Valid BST
**Difficulty:** Hard

Given an invalid BST, find the minimum number of node value swaps to make it valid.

### 3. Largest Valid BST Subtree
**Difficulty:** Hard

Find the size of the largest subtree which is a valid BST.
