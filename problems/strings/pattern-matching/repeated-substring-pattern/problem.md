# Repeated Substring Pattern

## Problem Description

Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

In other words, determine if the string is a repetition of one of its substrings.

## Examples

### Example 1
```
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" repeated twice.
```

### Example 2
```
Input: s = "aba"
Output: false
Explanation: No substring can be repeated to form "aba".
```

### Example 3
```
Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" repeated four times, or "abcabc" repeated twice.
```

### Example 4
```
Input: s = "aaa"
Output: true
Explanation: It is the substring "a" repeated three times.
```

## Constraints

- 1 <= s.length <= 10^4
- s consists of lowercase English letters

<details>
<summary>Hint 1</summary>
If the string can be formed by repeating a substring, that substring's length must be a divisor of the string's length.
</details>

<details>
<summary>Hint 2</summary>
You only need to check substrings of length 1 to n/2, where n is the string length.
</details>

<details>
<summary>Hint 3</summary>
Clever trick: If s is a repeated pattern, then s will be found in (s + s)[1:-1] (the doubled string with first and last chars removed).
</details>

## Approach

### Approach 1: Check All Divisors

1. For each possible substring length `len` (1 to n/2):
   - Check if `len` divides `n` evenly
   - If so, check if repeating `s[0:len]` gives us `s`
2. Return true if any substring works, false otherwise

**Time Complexity**: O(n * sqrt(n)) average, O(n^2) worst case
**Space Complexity**: O(n) for string operations

### Approach 2: String Concatenation Trick

The key insight: if `s` is a repeated pattern, then `s` will appear in `(s + s)` at some position other than 0 or n.

1. Create doubled string: `doubled = s + s`
2. Remove first and last characters: `doubled[1:-1]`
3. Check if `s` exists in this modified doubled string
4. If found, return true; otherwise false

**Time Complexity**: O(n) with efficient string search
**Space Complexity**: O(n)

### Approach 3: KMP-Based (LPS Array)

Using the LPS (failure function) array from KMP:
1. Build LPS array for the string
2. If `lps[n-1] > 0` and `n % (n - lps[n-1]) == 0`, the string is a repeated pattern
3. The pattern length is `n - lps[n-1]`

**Time Complexity**: O(n)
**Space Complexity**: O(n)

### Why the Concatenation Trick Works

If `s = "abab"`, then `s + s = "abababab"`.
Removing first and last: `"bababa"`.
`s = "abab"` is found in `"bababa"` starting at index 2.

If `s` is not a repeated pattern (like "abc"), `s + s = "abcabc"`.
Removing first and last: `"bcab"`.
`s = "abc"` is NOT found in `"bcab"`.
