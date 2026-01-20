<div id="viz-config" style="display:none">
{"name":"Height Balanced Binary Tree","algorithm":"tree-balanced","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},"output":true,"inputRaw":"tree = {1,2,3,4,5,#,6,#,#,7,8}","outputRaw":"true"},{"input":{"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},"output":false,"inputRaw":"tree = {1,2,3,4,5,#,#,6}","outputRaw":"false"}]}
</div>

# Height Balanced Binary Tree

**Difficulty:** Medium (Yellow)

## Problem Statement

Write a function that takes in a Binary Tree and returns whether it is height-balanced.

A binary tree is height-balanced if for each node in the tree, the difference between the height of its left subtree and the height of its right subtree is at most 1.

An empty tree is considered height-balanced.

## Examples

**Example 1:**
```
Input:
        1
      /   \
     2     3
    / \     \
   4   5     6
      / \
     7   8

Output: true
Explanation: For every node, the height difference between left and right subtrees is at most 1.
```

**Example 2:**
```
Input:
        1
      /   \
     2     3
    / \
   4   5
  /
 6

Output: false
Explanation: At node 1, left subtree height is 3, right subtree height is 1. Difference is 2 > 1.
```

## Constraints

- The tree is a standard binary tree
- An empty tree (null root) is balanced
- Node values can be any integers

## Hints

<details>
<summary>Hint 1</summary>
For each node, you need to know if its subtrees are balanced AND their heights.
</details>

<details>
<summary>Hint 2</summary>
Use a helper function that returns both whether a subtree is balanced and its height. This avoids redundant calculations.
</details>

## Approach

1. Use a recursive approach with a helper that returns (is_balanced, height)
2. For each node:
   - Recursively check left and right subtrees
   - If either subtree is unbalanced, the whole tree is unbalanced
   - Check if abs(left_height - right_height) <= 1
   - Return (is_balanced, max(left_height, right_height) + 1)
3. Base case: empty node is balanced with height 0

**Time Complexity:** O(n) where n is the number of nodes
**Space Complexity:** O(h) where h is the height of the tree

---

## Similar Problems (Harder)

### 1. Minimum Height BST from Sorted Array
**Difficulty:** Medium

Given a sorted array, construct a height-balanced BST with minimum possible height.

### 2. Convert BST to Balanced BST
**Difficulty:** Medium

Given an unbalanced BST, convert it to a balanced BST maintaining the same elements.

### 3. Balance a Binary Tree
**Difficulty:** Hard

Given any binary tree (not necessarily BST), restructure it to be height-balanced while preserving in-order traversal.
