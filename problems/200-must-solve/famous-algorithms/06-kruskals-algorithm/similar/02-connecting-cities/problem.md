# Connecting Cities With Minimum Cost

**Difficulty:** Medium

## Problem Statement

There are `n` cities numbered from 1 to n. You are given connections where `connections[i] = [city1, city2, cost]` represents a bidirectional road. Return the minimum cost to connect all cities, or -1 if impossible.

## Examples

**Example 1:**
```
Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
Explanation: Use edges 2-3 (cost=1) and 1-2 (cost=5), total = 6
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Edge</th>
<th style="border: 1px solid #ddd; padding: 10px;">Cost</th>
<th style="border: 1px solid #ddd; padding: 10px;">Include?</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2-3</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Yes</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1-2</td>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Yes</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1-3</td>
<td style="border: 1px solid #ddd; padding: 10px;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">No (cycle)</td>
</tr>
</table>

## Approach

Apply Kruskal's algorithm. If MST has fewer than n-1 edges, cities cannot be connected.

**Time Complexity:** O(E log E)
**Space Complexity:** O(n)
