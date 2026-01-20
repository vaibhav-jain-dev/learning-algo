# Longest Common Subsequence

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in two strings and returns their longest common subsequence (LCS).

A subsequence of a string is a set of characters that are not necessarily adjacent in the string but are in the same order as they appear in the string.

If there are multiple longest common subsequences, return any one of them.

## Examples

**Example 1:**
```
Input: str1 = "ZXVVYZW", str2 = "XKYKZPW"
Output: ["X", "Y", "Z", "W"] (length 4)
Explanation: XYZW is common to both strings in order
```

**Example 2:**
```
Input: str1 = "ABCDGH", str2 = "AEDFHR"
Output: ["A", "D", "H"] (length 3)
```

**Example 3:**
```
Input: str1 = "ABC", str2 = "DEF"
Output: [] (length 0)
Explanation: No common subsequence exists
```

## Constraints

- Both strings can be empty
- Strings consist of uppercase or lowercase English letters
- Return the actual subsequence, not just the length

## Hints

<details>
<summary>Hint 1</summary>
Build a 2D table where dp[i][j] represents the length of LCS for str1[0:i] and str2[0:j].
</details>

<details>
<summary>Hint 2</summary>
If characters match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).
</details>

<details>
<summary>Hint 3</summary>
Backtrack through the DP table to reconstruct the actual subsequence.
</details>

## Approach

### Dynamic Programming (Bottom-Up)
1. Create a 2D DP table of size (m+1) x (n+1)
2. Base cases: dp[i][0] = dp[0][j] = 0
3. Recurrence:
   - If str1[i-1] == str2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
   - Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
4. Backtrack from dp[m][n] to build the subsequence

**Time Complexity:** O(m * n) where m and n are string lengths
**Space Complexity:** O(m * n), can be optimized to O(min(m, n)) for length only

---

## Similar Problems (Harder)

### 1. Longest Common Substring
**Difficulty:** Medium

Find the longest contiguous common substring (not subsequence).

### 2. Shortest Common Supersequence
**Difficulty:** Hard

Find the shortest string that contains both strings as subsequences.

### 3. Longest Palindromic Subsequence
**Difficulty:** Hard

Find the longest subsequence of a string that is also a palindrome.
