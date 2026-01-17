# BST Construction

**Difficulty:** Medium (Blue)

## Problem Statement

Write a BST class for a Binary Search Tree. The class should support:
- Inserting values with the `insert` method
- Checking if values are contained with the `contains` method
- Removing values with the `remove` method (with proper handling of all cases)

Note that you can't remove values that aren't in the tree.

## Examples

**Example 1:**
```
Initial:     10
            /  \
           5    15
          / \     \
         2   5    22
        /
       1

insert(12):   10
            /    \
           5      15
          / \    /  \
         2   5  12   22
        /
       1

remove(10):   12
            /    \
           5      15
          / \       \
         2   5      22
        /
       1

contains(15): true
```

## Constraints

- BST property must always be maintained
- Duplicate values go to the right
- Remove should handle: leaf, one child, two children cases

## Hints

<details>
<summary>Hint 1</summary>
For insert: compare value with current node and go left or right accordingly until you find an empty spot.
</details>

<details>
<summary>Hint 2</summary>
For contains: similar to insert, traverse based on comparison until found or null.
</details>

<details>
<summary>Hint 3</summary>
For remove with two children: replace with the minimum value from the right subtree (in-order successor).
</details>

## Approach

### Standard BST Operations
- **Insert:** Traverse to correct position, create new node
- **Contains:** Traverse comparing at each step
- **Remove:** Handle three cases - leaf, one child, two children

**Time Complexity:** O(log n) average, O(n) worst case for all operations
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. BST with Parent Pointers
**Difficulty:** Hard

Implement a BST where each node also has a pointer to its parent. Update all operations accordingly.

### 2. Self-Balancing BST (AVL)
**Difficulty:** Hard

Implement an AVL tree that maintains balance after every insert and remove.

### 3. BST with Order Statistics
**Difficulty:** Hard

Implement a BST that supports finding the k-th smallest element in O(log n) time.
