<div id="viz-config" style="display:none">
{"name":"Cheapest Flights Within K Stops","algorithm":"dijkstras-algorithm","complexity":{"time":"O(E * K)","space":"O(N * K)"},"examples":[{"input":{"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":1},"output":700,"inputRaw":"n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1","outputRaw":"700"}]}
</div>

# Cheapest Flights Within K Stops

**Difficulty:** Medium

## Problem Statement

There are `n` cities connected by `m` flights. Each flight starts from city `u` and arrives at `v` with a price `w`. Given all the cities and flights, find the cheapest price from `src` to `dst` with at most `k` stops.

## Examples

**Example 1:**
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: Path 0 -> 1 -> 3 costs 700
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Path</th>
<th style="border: 1px solid #ddd; padding: 10px;">Stops</th>
<th style="border: 1px solid #ddd; padding: 10px;">Cost</th>
<th style="border: 1px solid #ddd; padding: 10px;">Valid?</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 1 -> 3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">700</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">Yes</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 1 -> 2 -> 3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">400</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #f8d7da;">No (> k)</td>
</tr>
</table>

## Approach

Use modified Dijkstra's or BFS with state (node, stops) to track both position and number of stops used.

**Time Complexity:** O(E * K) using BFS
**Space Complexity:** O(N * K)
