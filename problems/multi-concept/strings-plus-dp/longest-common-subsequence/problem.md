# Longest Common Subsequence

## Problem Description

Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

**Concepts Combined**: String Processing + 2D Dynamic Programming

## Examples

### Example 1
```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" with length 3.
```

### Example 2
```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" with length 3.
```

### Example 3
```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: No common subsequence exists.
```

### Example 4
```
Input: text1 = "bl", text2 = "yby"
Output: 1
Explanation: The longest common subsequence is "b" with length 1.
```

## Constraints
- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters

## Hints

<details>
<summary>Hint 1</summary>
Define dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
</details>

<details>
<summary>Hint 2</summary>
If text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1
</details>

<details>
<summary>Hint 3</summary>
Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1])
</details>

<details>
<summary>Hint 4</summary>
Space can be optimized to O(min(m, n)) using two rows.
</details>

## Approach

### DP Recurrence
```
if text1[i-1] == text2[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1  # Include this character
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # Skip one character
```

**Time Complexity**: O(m * n)
**Space Complexity**: O(m * n), can be optimized to O(min(m, n))
