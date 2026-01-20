# Find Kth Largest Value in BST

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in a Binary Search Tree (BST) and a positive integer k, and returns the kth largest integer contained in the BST.

You can assume that there will only be integer values in the BST and that k is less than or equal to the number of nodes in the tree.

Duplicate values should be treated as separate values. For example, in a BST with values [5, 5, 6], the second largest would be the second 5.

## Examples

**Example 1:**
```
Input: tree =       15
                   /  \
                  5    20
                 / \   / \
                2   5 17  22
               /
              1

       k = 3

Output: 17

Explanation: The values in descending order are [22, 20, 17, 15, 5, 5, 2, 1].
             The 3rd largest is 17.
```

**Example 2:**
```
Input: Same tree, k = 1
Output: 22 (the largest)
```

## Constraints

- 1 <= k <= number of nodes in BST
- BST contains integer values (may include duplicates)
- BST property: left < parent <= right

## Hints

<details>
<summary>Hint 1</summary>
Inorder traversal of a BST gives values in ascending order. What would reverse inorder give?
</details>

<details>
<summary>Hint 2</summary>
Reverse inorder traversal (right, node, left) gives values in descending order.
</details>

<details>
<summary>Hint 3</summary>
You can stop traversal early once you've found k elements - no need to traverse the entire tree.
</details>

## Approach

### Reverse Inorder Traversal
1. Perform reverse inorder traversal (right -> node -> left)
2. Keep a counter of visited nodes
3. When counter reaches k, return the current node's value
4. Use early termination to avoid unnecessary traversal

**Time Complexity:** O(h + k) where h is height - we traverse down right side then visit k nodes
**Space Complexity:** O(h) for recursion stack

---

## Similar Problems (Harder)

### 1. Kth Smallest Element in BST
**Difficulty:** Medium

Find the kth smallest element instead of largest.

```
Input: BST [3,1,4,null,2], k = 1
Output: 1
```

### 2. Kth Largest with Updates
**Difficulty:** Hard

Design a data structure that supports finding kth largest after insertions and deletions.

```
Operations: insert(5), insert(3), kthLargest(1) -> 5, delete(5), kthLargest(1) -> 3
```

### 3. Median in BST Stream
**Difficulty:** Hard

Maintain the median of all values in a BST that supports insertions.

```
Insert: 5 -> median = 5
Insert: 3 -> median = 4
Insert: 7 -> median = 5
```
