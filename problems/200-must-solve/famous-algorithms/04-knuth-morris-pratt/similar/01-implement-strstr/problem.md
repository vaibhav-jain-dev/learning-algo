<div id="viz-config" style="display:none">
{"name":"Implement strStr()","algorithm":"kmp-algorithm","complexity":{"time":"O(n + m)","space":"O(m)"},"examples":[{"input":{"haystack":"sadbutsad","needle":"sad"},"output":0,"inputRaw":"haystack = \"sadbutsad\", needle = \"sad\"","outputRaw":"0"},{"input":{"haystack":"leetcode","needle":"leeto"},"output":-1,"inputRaw":"haystack = \"leetcode\", needle = \"leeto\"","outputRaw":"-1"}]}
</div>

# Implement strStr()

**Difficulty:** Easy

## Problem Statement

Return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

## Examples

**Example 1:**
```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
```

**Example 2:**
```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Position</th>
<th style="border: 1px solid #ddd; padding: 10px;">Comparison</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">sad == sad</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Match!</td>
</tr>
</table>

## Approach

Use KMP algorithm for O(n + m) solution, or simple brute force for O(n * m).

**Time Complexity:** O(n + m) with KMP
**Space Complexity:** O(m) for LPS array
