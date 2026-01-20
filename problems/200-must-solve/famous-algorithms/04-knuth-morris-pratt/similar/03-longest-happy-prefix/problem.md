# Longest Happy Prefix

**Difficulty:** Hard

## Problem Statement

A string is called a happy prefix if it is a non-empty prefix which is also a suffix (excluding itself). Given a string `s`, return the longest happy prefix. Return an empty string if no such prefix exists.

## Examples

**Example 1:**
```
Input: s = "level"
Output: "l"
Explanation: "l" is a prefix and suffix
```

**Example 2:**
```
Input: s = "ababab"
Output: "abab"
Explanation: "abab" is both prefix and suffix
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">String</th>
<th style="border: 1px solid #ddd; padding: 10px;">LPS Array</th>
<th style="border: 1px solid #ddd; padding: 10px;">LPS[n-1]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">ababab</td>
<td style="border: 1px solid #ddd; padding: 10px;">[0,0,1,2,3,4]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">"abab"</td>
</tr>
</table>

## Approach

Build LPS array and return s[0:lps[n-1]].

**Time Complexity:** O(n)
**Space Complexity:** O(n)
