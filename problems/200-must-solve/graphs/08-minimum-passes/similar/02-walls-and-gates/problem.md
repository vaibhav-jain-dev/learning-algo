<div id="viz-config" style="display:none">
{"name":"Walls and Gates","algorithm":"graph-min-passes","complexity":{"time":"O(M * N)","space":"O(M * N)"},"examples":[{"input":{"rooms":[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]},"output":[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]],"inputRaw":"4x4 grid with INF, -1, and 0","outputRaw":"Grid with distances filled"}]}
</div>

# Walls and Gates

**Difficulty:** Medium

## Problem Statement

You are given an `m x n` grid `rooms` initialized with these three possible values:
- `-1` - A wall or an obstacle
- `0` - A gate
- `INF` (2147483647) - An empty room

Fill each empty room with the distance to its nearest gate. If impossible to reach a gate, leave as INF.

## Examples

```
Input:
[[INF, -1,  0, INF],
 [INF, INF, INF, -1],
 [INF, -1, INF, -1],
 [0,  -1, INF, INF]]

Output:
[[3, -1, 0,  1],
 [2,  2, 1, -1],
 [1, -1, 2, -1],
 [0, -1, 3,  4]]
```

---

## Visual Diagram: Multi-source BFS from Gates

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>BFS spreads outward from all gates simultaneously</strong>

<div style="display: grid; grid-template-columns: repeat(4, 50px); gap: 3px; margin: 15px 0;">
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 50px; height: 50px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">W</div>
<div style="width: 50px; height: 50px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">W</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="width: 50px; height: 50px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">W</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="width: 50px; height: 50px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">W</div>
<div style="width: 50px; height: 50px; background: #007bff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">0</div>
<div style="width: 50px; height: 50px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">W</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="width: 50px; height: 50px; background: #28a745; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">4</div>
</div>

<div style="display: flex; gap: 10px; margin-top: 10px;">
  <span style="background: #007bff; color: white; padding: 5px 10px; border-radius: 4px;">Gate (0)</span>
  <span style="background: #333; color: white; padding: 5px 10px; border-radius: 4px;">Wall (-1)</span>
  <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">Distance</span>
</div>
</div>

---

## Solution

| Metric | Value |
|--------|-------|
| Time Complexity | O(m * n) |
| Space Complexity | O(m * n) |
