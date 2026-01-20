<div id="viz-config" style="display:none">
{"name":"Maximum Product Subarray","algorithm":"kadanes-algorithm","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[2,3,-2,4]},"output":6,"inputRaw":"nums = [2, 3, -2, 4]","outputRaw":"6"},{"input":{"nums":[-2,0,-1]},"output":0,"inputRaw":"nums = [-2, 0, -1]","outputRaw":"0"}]}
</div>

# Maximum Product Subarray

**Difficulty:** Medium

## Problem Statement

Given an integer array `nums`, find a contiguous subarray that has the largest product, and return the product.

## Examples

**Example 1:**
```
Input: nums = [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has the largest product = 6
```

**Example 2:**
```
Input: nums = [-2, 0, -1]
Output: 0
Explanation: The result cannot be 2, because [-2, -1] is not contiguous
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Index</th>
<th style="border: 1px solid #ddd; padding: 10px;">Value</th>
<th style="border: 1px solid #ddd; padding: 10px;">Max Product</th>
<th style="border: 1px solid #ddd; padding: 10px;">Min Product</th>
<th style="border: 1px solid #ddd; padding: 10px;">Global Max</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #f8d7da;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #f8d7da;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">-2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #f8d7da;">-12</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #f8d7da;">-48</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
</tr>
</table>

<div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> Track both max and min products because a negative number can flip min to max (and vice versa).
</div>

## Approach

1. Track both maximum and minimum products ending at each position
2. When encountering a negative number, swap max and min
3. Update global maximum

**Time Complexity:** O(n)
**Space Complexity:** O(1)
