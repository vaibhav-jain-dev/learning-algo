# Min Cost to Connect All Points

**Difficulty:** Medium

## Problem Statement

Given an array `points` representing integer coordinates of some points on a 2D-plane, return the minimum cost to make all points connected using Manhattan distance.

## Examples

**Example 1:**
```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Connection</th>
<th style="border: 1px solid #ddd; padding: 10px;">Manhattan Distance</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(0,0) - (2,2)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(2,2) - (5,2)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">3</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(5,2) - (7,0)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(2,2) - (3,10)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">9</td>
</tr>
</table>

Total: 4 + 3 + 4 + 9 = 20

## Approach

Generate all edges with Manhattan distance, then apply Kruskal's algorithm.

**Time Complexity:** O(n^2 log n)
**Space Complexity:** O(n^2)
