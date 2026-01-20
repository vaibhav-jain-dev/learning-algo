# Min Height BST

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in a non-empty sorted array of distinct integers, constructs a BST from the integers, and returns the root of the BST.

The function should minimize the height of the BST. There can be more than one BST with minimum height; return any of them.

A BST is a Binary Search Tree where each node's value is strictly greater than all values in its left subtree and less than or equal to all values in its right subtree.

## Examples

**Example 1:**
```
Input: array = [1, 2, 5, 7, 10, 13, 14, 15, 22]

Output:         10
              /    \
             2      14
            / \    /  \
           1   5  13   15
                \       \
                 7       22

(One possible valid BST with height 3)
```

**Example 2:**
```
Input: array = [1, 2, 3]

Output:     2
           / \
          1   3
```

## Constraints

- Array is sorted in ascending order
- All integers are distinct
- Array length >= 1

## Hints

<details>
<summary>Hint 1</summary>
For a balanced BST, the root should be the middle element of the array.
</details>

<details>
<summary>Hint 2</summary>
Recursively apply the same logic: the left subtree is built from elements before the middle, and the right subtree from elements after the middle.
</details>

<details>
<summary>Hint 3</summary>
Use divide and conquer with left and right pointers to avoid creating new arrays.
</details>

## Approach

### Divide and Conquer
1. Find the middle element of the array - this becomes the root
2. Recursively build the left subtree from elements before middle
3. Recursively build the right subtree from elements after middle
4. Base case: when left > right, return None

**Time Complexity:** O(n) - visit each element once
**Space Complexity:** O(n) for the tree, O(log n) for recursion stack

---

## Similar Problems (Harder)

### 1. Convert BST to Sorted Doubly Linked List
**Difficulty:** Medium

Convert a BST into a sorted circular doubly linked list in-place.

```
Input: BST with [1, 2, 3, 4, 5]
Output: Circular doubly linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1)
```

### 2. Balance a BST
**Difficulty:** Medium

Given an unbalanced BST, transform it into a balanced BST with minimum height.

```
Input: Skewed BST (1 -> 2 -> 3 -> 4)
Output: Balanced BST with root 2 or 3
```

### 3. Construct BST from Level Order
**Difficulty:** Hard

Given level-order traversal of a BST, construct the original BST.

```
Input: [7, 4, 12, 3, 6, 8, 1, 5, 10]
Output: BST with 7 as root
```
