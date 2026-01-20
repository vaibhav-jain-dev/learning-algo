<div id="viz-config" style="display:none">
{"name":"Network Delay via MST","algorithm":"prims-algorithm","complexity":{"time":"O(E log V)","space":"O(V + E)"},"examples":[{"input":{"n":4,"connections":[[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]},"output":{"mstCost":7,"maxDepth":2},"inputRaw":"n = 4, connections = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]","outputRaw":"MST cost = 7, Max depth = 2"}]}
</div>

# Network Delay via MST

**Difficulty:** Medium

## Problem Statement

Given a network of servers, find the minimum cost to establish a connected network where all servers can communicate. Then determine the maximum latency for a signal to reach all nodes.

## Examples

**Example 1:**
```
Input: n = 4, connections = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]
Output: MST cost = 7, Max depth = 2
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">MST Edge</th>
<th style="border: 1px solid #ddd; padding: 10px;">Weight</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(0,1)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(0,2)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">(1,3)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
</tr>
</table>

## Approach

Build MST using Prim's, then do BFS/DFS to find max depth from any starting node.

**Time Complexity:** O(E log V)
**Space Complexity:** O(V + E)
