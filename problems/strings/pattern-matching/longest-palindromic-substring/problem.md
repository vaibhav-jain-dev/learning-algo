# Longest Palindromic Substring

## Problem Description

Given a string `s`, return the longest palindromic substring in `s`.

A palindrome is a string that reads the same forward and backward. A substring is a contiguous sequence of characters within the string.

## Examples

### Example 1
```
Input: s = "babad"
Output: "bab" or "aba"
Explanation: Both "bab" and "aba" are valid answers as they are both palindromes of length 3.
```

### Example 2
```
Input: s = "cbbd"
Output: "bb"
Explanation: "bb" is the longest palindromic substring.
```

### Example 3
```
Input: s = "a"
Output: "a"
Explanation: Single character is always a palindrome.
```

### Example 4
```
Input: s = "racecar"
Output: "racecar"
Explanation: The entire string is a palindrome.
```

## Constraints

- 1 <= s.length <= 1000
- s consists of only lowercase and/or uppercase English letters

<details>
<summary>Hint 1</summary>
A palindrome mirrors around its center. There can be 2n-1 such centers (n single characters + n-1 positions between characters for even-length palindromes).
</details>

<details>
<summary>Hint 2</summary>
Expand around each center: for each position, try to expand outward while characters match. Track the longest palindrome found.
</details>

<details>
<summary>Hint 3</summary>
For O(n) solution, look into Manacher's algorithm which cleverly reuses information about palindromes already found.
</details>

## Approach

### Approach 1: Expand Around Center (Recommended)

1. For each index i in the string:
   - Expand around center at i (odd-length palindromes)
   - Expand around center at i and i+1 (even-length palindromes)
2. Track the longest palindrome found
3. Return the longest palindromic substring

**Time Complexity**: O(n^2) - each expansion takes O(n) in worst case
**Space Complexity**: O(1) - only storing indices

### Approach 2: Dynamic Programming

1. Create a 2D table dp[i][j] where dp[i][j] is true if s[i:j+1] is a palindrome
2. Base cases:
   - All single characters are palindromes: dp[i][i] = true
   - Two same adjacent characters: dp[i][i+1] = true if s[i] == s[i+1]
3. For longer substrings: dp[i][j] = dp[i+1][j-1] && s[i] == s[j]
4. Track the longest palindrome

**Time Complexity**: O(n^2)
**Space Complexity**: O(n^2) for the DP table

### Approach 3: Manacher's Algorithm (Advanced)

1. Transform string by inserting special characters between each character
2. Use properties of palindromes to skip redundant comparisons
3. Achieve linear time complexity

**Time Complexity**: O(n)
**Space Complexity**: O(n)
