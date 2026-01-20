# Optimize Water Distribution in a Village

**Difficulty:** Hard

## Problem Statement

There are `n` houses. For each house, you can either build a well inside it (costs `wells[i]`) or lay a pipe from another house (costs given in `pipes`). Return the minimum cost to supply water to all houses.

## Examples

**Example 1:**
```
Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
Explanation: Build well at house 1 (cost=1), pipe 1->2 (cost=1), pipe 2->3 (cost=1)
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Option</th>
<th style="border: 1px solid #ddd; padding: 10px;">Cost</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Well at house 1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Pipe 1->2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Pipe 2->3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
</tr>
</table>

Total: 1 + 1 + 1 = 3

## Approach

Add a virtual node 0 connected to all houses with well costs. Then find MST.

**Time Complexity:** O((n + E) log(n + E))
**Space Complexity:** O(n + E)
