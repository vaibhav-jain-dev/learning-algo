# Symmetrical Tree

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a Binary Tree and returns whether the tree is symmetric (a mirror of itself).

A tree is symmetric if its left subtree is a mirror reflection of its right subtree. This means:
- The root exists (or tree is empty, which is symmetric)
- The left subtree's structure and values mirror the right subtree
- For any node on the left, its left child mirrors the right child of the corresponding node on the right (and vice versa)

## Examples

**Example 1:**
```
Input:
        1
      /   \
     2     2
    / \   / \
   3   4 4   3

Output: true
Explanation: The tree is a mirror of itself around the center.
```

**Example 2:**
```
Input:
        1
      /   \
     2     2
      \     \
       3     3

Output: false
Explanation: The tree is not a mirror because left child of left-2 is null,
but left child of right-2 is also null (should be swapped).
```

## Constraints

- The tree is a standard binary tree
- An empty tree is symmetric
- A single node is symmetric
- Node values are integers

## Hints

<details>
<summary>Hint 1</summary>
Compare the tree with itself, but mirror the traversal: compare left child of one side with right child of the other.
</details>

<details>
<summary>Hint 2</summary>
You can also use BFS: at each level, check if the values form a palindrome (accounting for nulls).
</details>

## Approach

**Recursive Approach:**
1. Create a helper function that compares two nodes
2. Two nodes are mirrors if:
   - Both are null (symmetric)
   - One is null and other isn't (not symmetric)
   - Values are equal AND left1 mirrors right2 AND right1 mirrors left2
3. Call helper with root.left and root.right

**Iterative Approach:**
1. Use a queue to compare pairs of nodes
2. Enqueue (left, right) pairs
3. For each pair, check values match and enqueue children in mirrored order

**Time Complexity:** O(n) where n is number of nodes
**Space Complexity:** O(h) recursive, O(n) iterative worst case

---

## Similar Problems (Harder)

### 1. Check if Two Trees are Mirrors
**Difficulty:** Easy

Given two separate trees, check if they are mirror images of each other.

### 2. Make Tree Symmetric
**Difficulty:** Medium

Given a binary tree, find the minimum number of node additions/removals to make it symmetric.

### 3. Largest Symmetric Subtree
**Difficulty:** Hard

Find the largest subtree within a binary tree that is symmetric.
