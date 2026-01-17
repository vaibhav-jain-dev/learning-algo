# Count Distinct Subsequences

**Difficulty:** Hard (Red)

## Problem Statement

Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.

A subsequence is a sequence that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

## Examples

**Example 1:**
```
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
There are 3 ways to choose "rabbit" from "rabbbit":
- ra[b]b[b]it
- ra[bb]bit
- rab[b][b]it
(brackets indicate which 'b' is chosen)
```

**Example 2:**
```
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
There are 5 ways to choose "bag" from "babgbag":
- [ba]b[g]bag
- [ba]bgba[g]
- [b]abgb[ag]
- ba[b]gb[ag]
- babg[bag]
```

## Constraints

- 1 <= s.length, t.length <= 1000
- s and t consist of lowercase English letters

---

## Solution Approaches

### Approach 1: Dynamic Programming (2D Table) - RECOMMENDED

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

`dp[i][j]` = number of ways to form `t[0:j]` from `s[0:i]`

### Approach 2: Space-Optimized DP

**Time Complexity:** O(m × n)
**Space Complexity:** O(n)

Only need previous row to compute current row.

### Approach 3: Recursive with Memoization

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

Top-down approach exploring all possibilities.
