# Longest Common Subsequence

**Difficulty:** Medium (Yellow)

## Problem Statement

Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

## Examples

**Example 1:**
```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" with length 3.
```

**Example 2:**
```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" with length 3.
```

**Example 3:**
```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: No common subsequence exists.
```

## Constraints

- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of lowercase English characters only

---

## Solution Approaches

### Approach 1: Dynamic Programming (2D Table) - RECOMMENDED

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

Build a 2D table where `dp[i][j]` represents the LCS length for `text1[0:i]` and `text2[0:j]`.

### Approach 2: Space-Optimized DP

**Time Complexity:** O(m × n)
**Space Complexity:** O(min(m, n))

Since we only need the previous row, use two 1D arrays.

### Approach 3: Recursive with Memoization

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

Top-down approach with caching.
