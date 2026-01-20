# Number of Binary Search Trees

**Difficulty:** Hard

## Problem Statement

Write a function that takes in a positive integer `n` and returns the number of structurally unique Binary Search Trees (BSTs) that can store values 1 to n.

Two BSTs are structurally different if they have different structures regardless of their node values.

## Examples

**Example 1:**
```
Input: n = 3
Output: 5
Explanation: The 5 unique BSTs storing [1,2,3] are:
    1         1           2          3        3
     \         \         / \        /        /
      2         3       1   3      1        2
       \       /                    \      /
        3     2                      2    1
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Example 3:**
```
Input: n = 4
Output: 14
```

**Example 4:**
```
Input: n = 5
Output: 42
```

## Constraints

- 1 <= n <= 19

## Hints

<details>
<summary>Hint 1</summary>
For each possible root value i, the left subtree contains values 1 to i-1, and the right subtree contains values i+1 to n.
</details>

<details>
<summary>Hint 2</summary>
The number of unique BSTs with n nodes follows the Catalan number sequence: C(n) = (2n)! / ((n+1)! * n!)
</details>

<details>
<summary>Hint 3</summary>
Use the recurrence: numTrees(n) = sum of numTrees(i-1) * numTrees(n-i) for i from 1 to n.
</details>

## Approach

### Key Insight
When we pick node `i` as root:
- Left subtree has `i-1` nodes (values 1 to i-1)
- Right subtree has `n-i` nodes (values i+1 to n)
- Total BSTs with root i = numTrees(i-1) * numTrees(n-i)

### Recurrence Relation
```
numTrees(n) = sum(numTrees(i-1) * numTrees(n-i)) for i in [1, n]

Base cases:
- numTrees(0) = 1 (empty tree)
- numTrees(1) = 1 (single node)
```

### Example for n=3
```
Root 1: left(0) * right(2) = 1 * 2 = 2
Root 2: left(1) * right(1) = 1 * 1 = 1
Root 3: left(2) * right(0) = 2 * 1 = 2
Total = 2 + 1 + 2 = 5
```

### Catalan Numbers
This is the nth Catalan number:
```
C(n) = C(2n, n) / (n + 1) = (2n)! / ((n+1)! * n!)
```

First few Catalan numbers: 1, 1, 2, 5, 14, 42, 132, 429, ...

**Time Complexity:** O(n^2) for DP, O(n) for Catalan formula
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Unique Binary Search Trees II
Generate all structurally unique BSTs, not just count them.
- **Key difference:** Must actually construct and return all tree structures.

### 2. Different Ways to Add Parentheses
Count/generate all ways to add parentheses to an expression.
- **Key difference:** Similar recursive structure but with operators and evaluation.

### 3. Count Full Binary Trees
Count structurally unique full binary trees with n leaf nodes.
- **Key difference:** Full binary tree constraint (0 or 2 children).
