<div id="viz-config" style="display:none">
{"name":"Critical Connections in a Network","algorithm":"graph-connections","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"n":4,"connections":[[0,1],[1,2],[2,0],[1,3]]},"output":[[1,3]],"inputRaw":"n=4, connections=[[0,1],[1,2],[2,0],[1,3]]","outputRaw":"[[1,3]]"}]}
</div>

# Critical Connections in a Network

**Difficulty:** Hard

## Problem Statement

There are `n` servers numbered from `0` to `n - 1` connected by undirected server-to-server `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between servers `ai` and `bi`.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

## Examples

**Example 1:**
```
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: The edge 1-3 is the only bridge in the graph.
```

---

## Visual Diagram: Finding Bridges

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>A bridge is an edge whose removal disconnects the graph</strong>

<div style="display: flex; flex-direction: column; align-items: center; margin: 20px 0;">
  <div style="display: flex; gap: 30px; align-items: center;">
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">0</span>
    <span>&#8212;</span>
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="color: #dc3545; font-weight: bold;">&#8212; BRIDGE &#8212;</span>
    <span style="background: #28a745; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">3</span>
  </div>
  <div style="margin-top: 10px;">
    <span style="color: #666;">|</span>
  </div>
  <div style="display: flex; gap: 30px; align-items: center;">
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">2</span>
  </div>
</div>

<div style="background: #d4edda; padding: 10px; border-radius: 4px;">
<strong>Tarjan's Algorithm:</strong> Find edges where low[v] > disc[u]
</div>
</div>

---

## Solution

Uses Tarjan's algorithm to find bridges.

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
