# Longest Increasing Subsequence

**Difficulty:** Hard (Red)

## Problem Statement

Given an array of integers, return the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

Return the actual subsequence, not just the length.

## Examples

**Example 1:**
```
Input: array = [5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]
Output: [-24, 2, 3, 5, 6, 35]
Explanation: Length 6 is the longest strictly increasing subsequence
```

**Example 2:**
```
Input: array = [10, 9, 2, 5, 3, 7, 101, 18]
Output: [2, 3, 7, 18] or [2, 3, 7, 101] or [2, 5, 7, 101]
Explanation: Multiple valid LIS of length 4
```

**Example 3:**
```
Input: array = [0, 1, 0, 3, 2, 3]
Output: [0, 1, 2, 3]
Explanation: Length 4
```

## Constraints

- Array can contain negative integers
- Return one valid longest increasing subsequence
- Elements must be strictly increasing (not equal)
- Preserve the original order of elements

## Hints

<details>
<summary>Hint 1</summary>
Use DP where dp[i] represents the length of LIS ending at index i.
</details>

<details>
<summary>Hint 2</summary>
For each element, check all previous elements that are smaller and update the longest subsequence.
</details>

<details>
<summary>Hint 3</summary>
For O(n log n) solution, maintain a list where list[i] is the smallest ending element of all increasing subsequences of length i+1.
</details>

## Approach

### Dynamic Programming (O(n^2))
1. dp[i] = length of LIS ending at index i
2. For each i, check all j < i where array[j] < array[i]
3. Update dp[i] = max(dp[i], dp[j] + 1)
4. Track previous indices to reconstruct

### Binary Search (O(n log n))
1. Maintain a list of smallest tail elements for each length
2. For each element, binary search to find its position
3. This gives length; use additional tracking for reconstruction

**Time Complexity:** O(n^2) DP, O(n log n) with binary search
**Space Complexity:** O(n)

---

## Similar Problems (Harder)

### 1. Number of Longest Increasing Subsequences
**Difficulty:** Hard

Count how many LIS of maximum length exist.

### 2. Longest Increasing Subsequence in a Matrix
**Difficulty:** Very Hard

Find LIS in a 2D matrix moving in any direction.

### 3. Longest Increasing Subsequence with K Exceptions
**Difficulty:** Very Hard

Allow up to K elements that break the increasing property.
