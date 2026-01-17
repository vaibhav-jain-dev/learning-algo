# Branch Sums

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a Binary Tree and returns a list of its branch sums ordered from leftmost branch sum to rightmost branch sum.

A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree branch is a path of nodes in a tree that starts at the root node and ends at any leaf node.

## Examples

**Example:**
```
Input:        1
            /   \
           2     3
          / \   / \
         4   5 6   7
        / \   \
       8   9  10

Output: [15, 16, 18, 10, 11]
Explanation:
- 15 = 1 + 2 + 4 + 8
- 16 = 1 + 2 + 4 + 9
- 18 = 1 + 2 + 5 + 10
- 10 = 1 + 3 + 6
- 11 = 1 + 3 + 7
```

## Constraints

- Tree is a standard binary tree (at most 2 children per node)
- Return sums in left-to-right order

## Hints

<details>
<summary>Hint 1</summary>
Use DFS to traverse to each leaf, accumulating sums along the way.
</details>

<details>
<summary>Hint 2</summary>
Pass the running sum down through recursive calls.
</details>

## Approach

1. Use DFS traversal
2. Pass current running sum to children
3. When reaching a leaf, add running sum to result
4. Process left subtree before right to maintain order

**Time Complexity:** O(n)
**Space Complexity:** O(n) for result, O(h) for call stack where h is height

---

## Similar Problems (Harder)

### 1. Branch Sums Equal to Target
**Difficulty:** Medium

Find all branches whose sum equals a target value.

### 2. Maximum Branch Sum
**Difficulty:** Medium

Find the branch with the maximum sum.

### 3. Branch Sums with Path
**Difficulty:** Hard

Return both the sums and the actual paths (list of node values).
