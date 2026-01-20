# Network Delay Time

**Difficulty:** Medium

## Problem Statement

You have a network of `n` nodes, labeled from `1` to `n`. You are given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

Return the minimum time it takes for all the `n` nodes to receive the signal sent from node `k`. Return `-1` if not all nodes can receive the signal.

## Examples

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Node</th>
<th style="border: 1px solid #ddd; padding: 10px;">Time from K=2</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">0 (source)</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">2</td>
</tr>
</table>

Answer: max(1, 0, 1, 2) = 2

## Approach

1. Run Dijkstra's algorithm from source node k
2. Find the maximum distance among all reachable nodes
3. If any node is unreachable, return -1

**Time Complexity:** O((V + E) log V)
**Space Complexity:** O(V + E)
