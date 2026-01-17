# Find Closest Value in BST

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a Binary Search Tree (BST) and a target integer value and returns the closest value to that target value contained in the BST.

You can assume that there will only be one closest value.

## Examples

**Example 1:**
```
Input: tree =     10
                /    \
               5      15
              / \    /  \
             2   5  13   22
            /        \
           1          14

       target = 12

Output: 13
```

**Example 2:**
```
Input: Same tree, target = 4
Output: 5
```

## Constraints

- Each BST node has an integer value, a left child, and a right child
- BST property: left child values < parent value < right child values
- There is exactly one closest value

## Hints

<details>
<summary>Hint 1</summary>
Use BST properties to navigate the tree efficiently.
</details>

<details>
<summary>Hint 2</summary>
At each node, compare the target with the current node's value. If target is smaller, go left; if larger, go right.
</details>

<details>
<summary>Hint 3</summary>
Track the closest value found so far and update it as you traverse.
</details>

## Approach

### Iterative BST Traversal
1. Initialize closest with root value
2. Current node starts at root
3. While current node exists:
   - Update closest if current value is closer to target
   - If target < current value, go left
   - If target > current value, go right
   - If target == current value, return it (exact match)
4. Return closest

**Time Complexity:** O(log n) average, O(n) worst case
**Space Complexity:** O(1) iterative, O(log n) recursive

---

## Similar Problems (Harder)

### 1. K Closest Values in BST
**Difficulty:** Medium

Find the K values closest to the target in a BST.

```
Input: BST with values [1,2,3,4,5,6,7], target = 4.5, k = 3
Output: [4, 5, 3]
```

### 2. Closest Value with Minimum Difference
**Difficulty:** Medium

Find the closest value and return both the value and the absolute difference.

```
Input: BST, target = 12.7
Output: {value: 13, difference: 0.3}
```

### 3. Two Closest Values in BST
**Difficulty:** Hard

Find two values in the BST whose average is closest to the target.

```
Input: BST [1, 4, 6, 8, 10], target = 7
Output: [6, 8] (average = 7)
```
