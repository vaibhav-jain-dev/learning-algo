<div id="viz-config" style="display:none">
{"name":"Maximum Sum Circular Subarray","algorithm":"kadanes-algorithm","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[1,-2,3,-2]},"output":3,"inputRaw":"nums = [1, -2, 3, -2]","outputRaw":"3"},{"input":{"nums":[5,-3,5]},"output":10,"inputRaw":"nums = [5, -3, 5]","outputRaw":"10"}]}
</div>

# Maximum Sum Circular Subarray

**Difficulty:** Medium

## Problem Statement

Given a circular integer array `nums`, find the maximum possible sum of a non-empty subarray. A circular array means the end of the array connects to the beginning.

## Examples

**Example 1:**
```
Input: nums = [1, -2, 3, -2]
Output: 3
Explanation: Subarray [3] has maximum sum 3
```

**Example 2:**
```
Input: nums = [5, -3, 5]
Output: 10
Explanation: Subarray [5, 5] (wrapping around) has maximum sum 10
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Case</th>
<th style="border: 1px solid #ddd; padding: 10px;">Calculation</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Non-circular max</td>
<td style="border: 1px solid #ddd; padding: 10px;">Standard Kadane's</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">max_kadane</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Circular max</td>
<td style="border: 1px solid #ddd; padding: 10px;">total_sum - min_subarray</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">circular_max</td>
</tr>
</table>

```
Circular case for [5, -3, 5]:
     [5]--[-3]--[5]
      |         |
      +---------+  (wraps around)

Max circular = total_sum - min_subarray = 7 - (-3) = 10
```

## Approach

1. Calculate maximum subarray using Kadane's (non-circular case)
2. Calculate minimum subarray using modified Kadane's
3. Circular maximum = total_sum - minimum_subarray
4. Return max(non-circular, circular)
5. Handle edge case: if all elements negative, return non-circular max

**Time Complexity:** O(n)
**Space Complexity:** O(1)
