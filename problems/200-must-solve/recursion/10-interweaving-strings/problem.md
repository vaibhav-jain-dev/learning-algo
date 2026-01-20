<div id="viz-config" style="display:none">
{"name":"Interweaving Strings","algorithm":"recursion-interweaving","complexity":{"time":"O(n * m)","space":"O(n * m)"},"examples":[{"input":{"one":"aabcc","two":"dbbca","three":"aadbbcbcac"},"output":true,"inputRaw":"one = \"aabcc\", two = \"dbbca\", three = \"aadbbcbcac\"","outputRaw":"true"}]}
</div>

# Interweaving Strings

**Difficulty:** Hard

## Problem Statement

Write a function that takes in three strings and returns a boolean representing whether the third string can be formed by interweaving the first two strings.

To interweave strings means to merge them by alternating their characters without changing the relative order of characters within each string.

For example, the strings "abc" and "123" can be interwoven as "a1b2c3", "abc123", "1a2b3c", "123abc", "a1bc23", etc.

## Examples

**Example 1:**
```
Input: one = "aab", two = "aac", three = "aaabac"
Output: false
Explanation: Cannot form "aaabac" while preserving relative order of both strings.
The 'b' in "aab" would need to come before one of the 'a's.
```

**Example 2:**
```
Input: one = "aabcc", two = "dbbca", three = "aadbbcbcac"
Output: true
Explanation:
one:   a a b c c
two:   d b b c a
three: a a d b b c b c a c
       1 1 2 2 2 1 2 1 2 1  (1=from one, 2=from two)
```

**Example 3:**
```
Input: one = "abc", two = "def", three = "adbecf"
Output: true
Explanation: Alternating characters from both strings.
```

## Constraints

- 0 <= one.length, two.length <= 100
- 0 <= three.length <= 200
- three.length == one.length + two.length (if interweaving is possible)

## Hints

<details>
<summary>Hint 1</summary>
If three.length != one.length + two.length, return false immediately.
</details>

<details>
<summary>Hint 2</summary>
Use dynamic programming. State: (i, j) where i chars used from one, j chars used from two.
</details>

<details>
<summary>Hint 3</summary>
At each step, character three[i+j] must match either one[i] or two[j].
</details>

## Approach

### Recursive Intuition
At each position in `three`, we have a choice:
1. Take the next character from `one` (if it matches)
2. Take the next character from `two` (if it matches)

### Dynamic Programming Solution
Define `dp[i][j]` = true if first i chars of `one` and first j chars of `two` can form first i+j chars of `three`.

```
dp[i][j] = (dp[i-1][j] AND one[i-1] == three[i+j-1]) OR
           (dp[i][j-1] AND two[j-1] == three[i+j-1])
```

### Visualization for "aab", "aac", "aaaabc"
```
      ""  a   a   c
  ""   T   T   T   F
  a    T   T   T   F
  a    T   T   T   F
  b    F   F   F   F
```

**Time Complexity:** O(n * m) where n = len(one), m = len(two)
**Space Complexity:** O(n * m), can be optimized to O(min(n, m))

---

## Similar Problems (Harder)

### 1. Distinct Subsequences
Count the number of distinct subsequences of S that equal T.
- **Key difference:** Counting problem, not just boolean feasibility.

### 2. Edit Distance
Find minimum operations to convert one string to another.
- **Key difference:** Allows insertions, deletions, substitutions - more transitions.

### 3. Regular Expression Matching
Check if string matches pattern with '.' and '*' wildcards.
- **Key difference:** Complex pattern matching with Kleene star operator.
