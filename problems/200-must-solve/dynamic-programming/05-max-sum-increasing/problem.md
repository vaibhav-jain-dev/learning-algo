# Max Sum Increasing Subsequence

**Difficulty:** Hard (Red)

## Problem Statement

Write a function that takes in a non-empty array of integers and returns the greatest sum that can be generated from a strictly increasing subsequence in the array, as well as the indices of the elements in that subsequence.

A subsequence of an array is a set of numbers that are not necessarily adjacent but are in the same order as they appear in the array.

## Examples

**Example 1:**
```
Input: array = [10, 70, 20, 30, 50, 11, 30]
Output: [110, [0, 2, 3, 4]]
Explanation: 10 + 20 + 30 + 50 = 110
```

**Example 2:**
```
Input: array = [8, 12, 2, 3, 15, 5, 7]
Output: [35, [0, 1, 4]]
Explanation: 8 + 12 + 15 = 35
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5]
Output: [15, [0, 1, 2, 3, 4]]
Explanation: All elements form an increasing subsequence
```

## Constraints

- Array is non-empty
- Array contains integers (can be negative)
- Return greatest sum and one valid sequence of indices
- Subsequence must be strictly increasing

## Hints

<details>
<summary>Hint 1</summary>
Use dynamic programming where dp[i] represents the maximum sum of an increasing subsequence ending at index i.
</details>

<details>
<summary>Hint 2</summary>
For each element, look at all previous elements that are smaller and update if including them gives a larger sum.
</details>

<details>
<summary>Hint 3</summary>
Keep track of previous indices to reconstruct the actual subsequence.
</details>

## Approach

### Dynamic Programming
1. Initialize dp[i] = array[i] (each element is its own subsequence)
2. For each index i from 1 to n-1:
   - For each previous index j from 0 to i-1:
     - If array[j] < array[i] and dp[j] + array[i] > dp[i]:
       - Update dp[i] = dp[j] + array[i]
       - Record j as the previous index for i
3. Find the index with maximum dp value
4. Backtrack to reconstruct the subsequence

**Time Complexity:** O(n^2)
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Longest Increasing Subsequence with Sum >= K
**Difficulty:** Hard

Find the longest increasing subsequence whose sum is at least K.

### 2. Max Sum Increasing Subsequence with Gap Constraint
**Difficulty:** Hard

Elements in the subsequence must be at least K indices apart.

### 3. Max Sum Increasing Subsequence in 2D Grid
**Difficulty:** Very Hard

Find max sum path in a grid where values must be strictly increasing.
