# Redundant Connection

**Difficulty:** Medium

## Problem Statement

In this problem, a tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with `n` nodes and `n` edges (one extra edge was added), find and return the edge that can be removed so the resulting graph is a tree.

## Examples

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Explanation: Removing [2,3] makes it a tree
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Edge</th>
<th style="border: 1px solid #ddd; padding: 10px;">Creates Cycle?</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">[1,2]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">No</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">[1,3]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">No</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">[2,3]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">Yes - Remove this!</td>
</tr>
</table>

## Approach

Process edges one by one. If union fails (both vertices already connected), that's the redundant edge.

**Time Complexity:** O(n * alpha(n))
**Space Complexity:** O(n)
