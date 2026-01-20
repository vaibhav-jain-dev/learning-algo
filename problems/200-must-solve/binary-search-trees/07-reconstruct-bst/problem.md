# Reconstruct BST

**Difficulty:** Medium (Blue)

## Problem Statement

Given an array of integers representing the preorder traversal of a BST, write a function that creates the corresponding BST and returns its root.

The preorder traversal of a BST records nodes in the following order: root, left subtree, right subtree. Each value in the input array is guaranteed to be unique.

## Examples

**Example 1:**
```
Input: preorderTraversalValues = [10, 4, 2, 1, 5, 17, 19, 18]

Output:         10
               /  \
              4    17
             / \     \
            2   5    19
           /        /
          1        18
```

**Example 2:**
```
Input: preorderTraversalValues = [5, 3, 1, 4, 7, 6, 8]

Output:       5
             / \
            3   7
           / \ / \
          1  4 6  8
```

## Constraints

- All values are unique integers
- Array represents valid BST preorder traversal
- Array length >= 1

## Hints

<details>
<summary>Hint 1</summary>
In preorder traversal, the first element is always the root.
</details>

<details>
<summary>Hint 2</summary>
For BST, all values less than root come first (left subtree), then all values greater (right subtree).
</details>

<details>
<summary>Hint 3</summary>
Use bounds to determine which elements belong to left vs right subtree. This avoids searching for the split point.
</details>

## Approach

### Optimal: Using Bounds
1. The first element is the root
2. Maintain bounds (min, max) for valid values
3. Process elements left to right with an index pointer
4. If current value is within bounds, create node and recurse
5. Left subtree: bounds become (min, parent.value)
6. Right subtree: bounds become (parent.value, max)

**Time Complexity:** O(n) - each element visited once
**Space Complexity:** O(h) for recursion stack

---

## Similar Problems (Harder)

### 1. Construct BST from Postorder Traversal
**Difficulty:** Medium

Reconstruct BST from postorder traversal instead of preorder.

```
Input: postorder = [1, 5, 4, 18, 19, 17, 10]
Output: Same tree as Example 1
```

### 2. Recover BST from Preorder with Errors
**Difficulty:** Hard

Given preorder traversal with one swap error, find and fix the swapped nodes.

```
Input: [10, 17, 2, 1, 5, 4, 19, 18] (4 and 17 swapped)
Output: Corrected BST
```

### 3. Construct Binary Tree from Preorder and Inorder
**Difficulty:** Medium

Given both preorder and inorder, construct a general binary tree (not BST).

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: Binary tree with 3 as root
```
