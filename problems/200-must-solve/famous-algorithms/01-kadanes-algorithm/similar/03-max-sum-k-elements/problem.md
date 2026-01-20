<div id="viz-config" style="display:none">
{"name":"Maximum Sum with at Least K Elements","algorithm":"kadanes-algorithm","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"nums":[1,-2,3,-1,5],"k":2},"output":7,"inputRaw":"nums = [1, -2, 3, -1, 5], k = 2","outputRaw":"7"},{"input":{"nums":[-1,-2,-3],"k":2},"output":-3,"inputRaw":"nums = [-1, -2, -3], k = 2","outputRaw":"-3"}]}
</div>

# Maximum Sum with at Least K Elements

**Difficulty:** Medium

## Problem Statement

Given an array of integers and an integer `k`, find the maximum sum of a subarray that contains at least `k` elements.

## Examples

**Example 1:**
```
Input: nums = [1, -2, 3, -1, 5], k = 2
Output: 7
Explanation: Subarray [3, -1, 5] has sum 7 with 3 elements
```

**Example 2:**
```
Input: nums = [-1, -2, -3], k = 2
Output: -3
Explanation: Subarray [-1, -2] has the maximum sum of -3
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Index</th>
<th style="border: 1px solid #ddd; padding: 10px;">Value</th>
<th style="border: 1px solid #ddd; padding: 10px;">Sum[i-k+1:i+1]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Kadane Prefix</th>
<th style="border: 1px solid #ddd; padding: 10px;">Best with K</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">-1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">7</td>
</tr>
</table>

## Approach

1. Compute prefix sums for O(1) range sum queries
2. For each position i >= k-1:
   - Calculate sum of exactly k elements ending at i
   - Optionally extend left using Kadane's on prefix
3. Return maximum found

**Time Complexity:** O(n)
**Space Complexity:** O(n) for prefix sums
