# Repeated Substring Pattern

**Difficulty:** Easy

## Problem Statement

Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

## Examples

**Example 1:**
```
Input: s = "abab"
Output: true
Explanation: "ab" repeated twice
```

**Example 2:**
```
Input: s = "abcabcabcabc"
Output: true
Explanation: "abc" repeated four times
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">String</th>
<th style="border: 1px solid #ddd; padding: 10px;">LPS[n-1]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Pattern Length</th>
<th style="border: 1px solid #ddd; padding: 10px;">Valid?</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">abab</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">4 - 2 = 2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4 % 2 == 0</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> If a string can be constructed from a repeated pattern, then LPS[n-1] > 0 and n is divisible by (n - LPS[n-1]).
</div>

## Approach

Use LPS array: if n % (n - lps[n-1]) == 0 and lps[n-1] > 0, return true.

**Time Complexity:** O(n)
**Space Complexity:** O(n)
