# Longest Substring Without Repeating Characters

## Problem Description

Given a string `s`, find the length of the longest substring without repeating characters.

A **substring** is a contiguous sequence of characters within a string.

## Examples

### Example 1
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

### Example 2
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3
```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Note that "pwke" is a subsequence, not a substring.
```

### Example 4
```
Input: s = ""
Output: 0
Explanation: Empty string has no characters.
```

## Constraints

- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols, and spaces.

## Hints

<details>
<summary>Hint 1</summary>
Use a sliding window with two pointers - left and right. The window represents the current substring being considered.
</details>

<details>
<summary>Hint 2</summary>
Use a hash set or hash map to track characters currently in your window. This allows O(1) lookup to check for duplicates.
</details>

<details>
<summary>Hint 3</summary>
When you find a duplicate character, shrink the window from the left until the duplicate is removed, then continue expanding from the right.
</details>

<details>
<summary>Hint 4</summary>
Optimization: Instead of removing characters one by one, use a hash map to store the last index of each character. When a duplicate is found, jump the left pointer directly to the position after the previous occurrence.
</details>

## Approach

### Approach 1: Sliding Window with HashSet

1. Use two pointers (left and right) to define the current window
2. Use a HashSet to store characters in the current window
3. Expand right pointer and add characters to the set
4. If a duplicate is found, shrink from left until the duplicate is removed
5. Track the maximum window size throughout

**Time Complexity**: O(2n) = O(n) - each character is visited at most twice
**Space Complexity**: O(min(m, n)) - where m is the character set size

### Approach 2: Optimized Sliding Window with HashMap

1. Use a HashMap to store the last index of each character
2. When a duplicate is found, directly jump left pointer to max(left, lastIndex + 1)
3. This avoids the inner while loop of Approach 1

**Time Complexity**: O(n) - each character is visited exactly once
**Space Complexity**: O(min(m, n)) - where m is the character set size

### Key Insight

The sliding window technique works here because:
- We want a contiguous sequence (substring)
- When we find a violation (duplicate), we only need to shrink from the left
- The window always maintains the invariant: no repeating characters inside
