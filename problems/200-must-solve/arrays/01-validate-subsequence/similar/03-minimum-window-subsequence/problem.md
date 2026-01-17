# Minimum Window Subsequence

**Difficulty:** Hard (Red)

## Problem Statement

Given strings `s1` and `s2`, return the minimum contiguous substring of `s1` such that `s2` is a subsequence of that substring. If there is no such window, return an empty string.

If there are multiple answer windows of the same length, return the one with the smallest starting index.

## Examples

**Example 1:**
```
Input: s1 = "abcdebdde", s2 = "bde"
Output: "bcde"
Explanation:
"bcde" is the smallest window where "bde" is a subsequence.
There's also "bdde" but "bcde" appears first.
```

**Example 2:**
```
Input: s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl", s2 = "u"
Output: ""
Explanation: There is no 'u' in s1.
```

**Example 3:**
```
Input: s1 = "abcdef", s2 = "ace"
Output: "abcde"
Explanation: The window from 'a' to 'e' contains "ace" as subsequence.
```

## Constraints

- 1 <= s1.length <= 20000
- 1 <= s2.length <= 100
- s1 and s2 consist of lowercase English letters

---

## Solution Approaches

### Approach 1: Two Pointers (Forward + Backward) - RECOMMENDED

**Time Complexity:** O(m × n)
**Space Complexity:** O(1)

Find each match of s2 in s1, then shrink the window backwards.

### Approach 2: Dynamic Programming

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

Track the starting position of the minimum window ending at each position.

### Approach 3: Sliding Window with Jump Table

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × 26)

Precompute next occurrence of each character for faster searching.
