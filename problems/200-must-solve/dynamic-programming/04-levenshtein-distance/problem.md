<div id="viz-config" style="display:none">
{"name":"Levenshtein Distance","algorithm":"dp-edit-distance","complexity":{"time":"O(m * n)","space":"O(m * n)"},"examples":[{"input":{"str1":"abc","str2":"yabd"},"output":2,"inputRaw":"str1 = \"abc\", str2 = \"yabd\"","outputRaw":"2"},{"input":{"str1":"horse","str2":"ros"},"output":3,"inputRaw":"str1 = \"horse\", str2 = \"ros\"","outputRaw":"3"},{"input":{"str1":"","str2":"abc"},"output":3,"inputRaw":"str1 = \"\", str2 = \"abc\"","outputRaw":"3"}]}
</div>

# Levenshtein Distance (Edit Distance)

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in two strings and returns the minimum number of edit operations needed to transform the first string into the second string.

There are three operations permitted on a string:
1. Insert a character
2. Delete a character
3. Replace a character

This is also known as the Edit Distance or the Levenshtein Distance problem.

## Examples

**Example 1:**
```
Input: str1 = "abc", str2 = "yabd"
Output: 2
Explanation: Insert 'y' at beginning, replace 'c' with 'd'
```

**Example 2:**
```
Input: str1 = "horse", str2 = "ros"
Output: 3
Explanation: horse -> rorse (replace 'h' with 'r')
             rorse -> rose (remove 'r')
             rose -> ros (remove 'e')
```

**Example 3:**
```
Input: str1 = "", str2 = "abc"
Output: 3
Explanation: Insert 'a', 'b', 'c'
```

## Constraints

- Both strings can be empty
- Strings consist of lowercase English letters
- 0 <= len(str1), len(str2) <= 1000

## Hints

<details>
<summary>Hint 1</summary>
Build a 2D table where dp[i][j] represents the edit distance between str1[0:i] and str2[0:j].
</details>

<details>
<summary>Hint 2</summary>
If characters match, dp[i][j] = dp[i-1][j-1]. Otherwise, take the minimum of insert, delete, or replace operations.
</details>

<details>
<summary>Hint 3</summary>
Space optimization: You only need the previous row, reducing space from O(mn) to O(min(m, n)).
</details>

## Approach

### Dynamic Programming (Bottom-Up)
1. Create a 2D DP table of size (m+1) x (n+1)
2. Base cases:
   - dp[i][0] = i (delete all characters)
   - dp[0][j] = j (insert all characters)
3. Recurrence:
   - If str1[i-1] == str2[j-1]: dp[i][j] = dp[i-1][j-1]
   - Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
     - dp[i-1][j]: delete from str1
     - dp[i][j-1]: insert into str1
     - dp[i-1][j-1]: replace in str1

**Time Complexity:** O(m * n) where m and n are string lengths
**Space Complexity:** O(m * n), can be optimized to O(min(m, n))

---

## Similar Problems (Harder)

### 1. One Edit Distance
**Difficulty:** Medium

Determine if two strings are exactly one edit distance apart.

### 2. Delete Operation for Two Strings
**Difficulty:** Medium-Hard

Find minimum number of deletions to make two strings equal.

### 3. Edit Distance with Different Costs
**Difficulty:** Hard

Each operation (insert, delete, replace) has different costs. Find minimum total cost.
