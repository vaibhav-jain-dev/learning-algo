<div id="viz-config" style="display:none">
{"name":"Number of Provinces","algorithm":"union-find","complexity":{"time":"O(n^2 * alpha(n))","space":"O(n)"},"examples":[{"input":{"isConnected":[[1,1,0],[1,1,0],[0,0,1]]},"output":2,"inputRaw":"isConnected = [[1,1,0],[1,1,0],[0,0,1]]","outputRaw":"2"}]}
</div>

# Number of Provinces

**Difficulty:** Medium

## Problem Statement

There are `n` cities. A province is a group of directly or indirectly connected cities. Given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if city `i` and city `j` are directly connected, return the total number of provinces.

## Examples

**Example 1:**
```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 form one province, city 2 forms another
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;"></th>
<th style="border: 1px solid #ddd; padding: 10px;">0</th>
<th style="border: 1px solid #ddd; padding: 10px;">1</th>
<th style="border: 1px solid #ddd; padding: 10px;">2</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
</tr>
</table>

Provinces: {0, 1} and {2} = 2 total

## Approach

Use Union-Find to group connected cities, then count unique roots.

**Time Complexity:** O(n^2 * alpha(n))
**Space Complexity:** O(n)
