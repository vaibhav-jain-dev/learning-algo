<div id="viz-config" style="display:none">
{"name":"Palindrome Partitioning Min Cuts","algorithm":"dp-palindrome","complexity":{"time":"O(n^2)","space":"O(n^2)"},"examples":[{"input":{"string":"noonabbad"},"output":2,"inputRaw":"string = \"noonabbad\"","outputRaw":"2"},{"input":{"string":"aab"},"output":1,"inputRaw":"string = \"aab\"","outputRaw":"1"},{"input":{"string":"aba"},"output":0,"inputRaw":"string = \"aba\"","outputRaw":"0"},{"input":{"string":"abcde"},"output":4,"inputRaw":"string = \"abcde\"","outputRaw":"4"}]}
</div>

# Palindrome Partitioning Min Cuts

**Difficulty:** Very Hard (Black)

## Problem Statement

Given a non-empty string, write a function that returns the minimum number of cuts needed to partition the string such that each partition is a palindrome.

A palindrome is a string that reads the same forwards and backwards.

## Examples

**Example 1:**
```
Input: string = "noonabbad"
Output: 2
Explanation: "noon" | "abba" | "d" requires 2 cuts
```

**Example 2:**
```
Input: string = "aab"
Output: 1
Explanation: "aa" | "b" requires 1 cut
```

**Example 3:**
```
Input: string = "aba"
Output: 0
Explanation: The entire string is a palindrome, no cuts needed
```

**Example 4:**
```
Input: string = "abcde"
Output: 4
Explanation: "a" | "b" | "c" | "d" | "e" requires 4 cuts
```

## Constraints

- String is non-empty
- String contains only lowercase English letters
- A single character is always a palindrome

## Hints

<details>
<summary>Hint 1</summary>
First, precompute a 2D table to quickly check if any substring is a palindrome.
</details>

<details>
<summary>Hint 2</summary>
Use DP where dp[i] represents the minimum cuts needed for string[0:i+1].
</details>

<details>
<summary>Hint 3</summary>
For each position i, check all positions j where string[j:i+1] is a palindrome and update dp[i] = min(dp[i], dp[j-1] + 1).
</details>

## Approach

### Dynamic Programming
1. Build a palindrome table: isPalin[i][j] = true if string[i:j+1] is palindrome
   - Base: single chars and two same adjacent chars
   - Extension: isPalin[i][j] = (string[i] == string[j]) && isPalin[i+1][j-1]

2. Build cuts table: cuts[i] = minimum cuts for string[0:i+1]
   - If string[0:i+1] is palindrome: cuts[i] = 0
   - Otherwise: cuts[i] = min(cuts[j-1] + 1) for all j where string[j:i+1] is palindrome

**Time Complexity:** O(n^2)
**Space Complexity:** O(n^2)

---

## Similar Problems (Harder)

### 1. Palindrome Partitioning II (Return All Partitions)
**Difficulty:** Hard

Return all possible palindrome partitions with minimum cuts.

### 2. Palindromic Substrings Count
**Difficulty:** Medium

Count the total number of palindromic substrings.

### 3. Longest Palindromic Substring
**Difficulty:** Medium

Find the longest substring that is a palindrome.
