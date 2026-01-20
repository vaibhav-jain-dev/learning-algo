<div id="viz-config" style="display:none">
{"name":"Is Graph Bipartite","algorithm":"graph-coloring","complexity":{"time":"O(V + E)","space":"O(V)"},"examples":[{"input":{"graph":[[1,2,3],[0,2],[0,1,3],[0,2]]},"output":false,"inputRaw":"graph = [[1,2,3],[0,2],[0,1,3],[0,2]]","outputRaw":"false"},{"input":{"graph":[[1,3],[0,2],[1,3],[0,2]]},"output":true,"inputRaw":"graph = [[1,3],[0,2],[1,3],[0,2]]","outputRaw":"true"}]}
</div>

# Is Graph Bipartite?

**Difficulty:** Medium

## Problem Statement

Given an undirected `graph`, return `true` if and only if it is bipartite.

A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.

The graph is given as an adjacency list where `graph[i]` is a list of nodes connected to node `i`.

## Examples

**Example 1:**
```
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: No way to partition into 2 sets where all edges cross between sets.
```

**Example 2:**
```
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: Partition: {0, 2} and {1, 3}
```

---

## Visual Diagram: 2-Coloring

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
<strong>Bipartite: Can be 2-colored such that no adjacent nodes have same color</strong>

<div style="display: flex; gap: 40px; margin: 20px 0; flex-wrap: wrap;">
<div style="text-align: center;">
<strong>Bipartite (Example 2)</strong>
<div style="display: flex; gap: 30px; margin: 15px 0; align-items: center;">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">0</span>
    <span style="background: #dc3545; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">2</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 5px;">
    <span>&#8212;</span>
    <span>&#8212;</span>
    <span>&#8212;</span>
    <span>&#8212;</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="background: #007bff; color: white; padding: 15px; border-radius: 50%; font-weight: bold;">3</span>
  </div>
</div>
<div style="color: #28a745;">All edges cross between colors</div>
</div>

<div style="text-align: center;">
<strong>Not Bipartite (Odd Cycle)</strong>
<div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 15px 0;">
  <span style="background: #dc3545; color: white; padding: 12px; border-radius: 50%; font-weight: bold;">0</span>
  <div style="display: flex; gap: 30px;">
    <span style="background: #007bff; color: white; padding: 12px; border-radius: 50%; font-weight: bold;">1</span>
    <span style="background: #007bff; color: white; padding: 12px; border-radius: 50%; font-weight: bold;">2</span>
  </div>
</div>
<div style="color: #dc3545;">Triangle: 1-2 edge has same color!</div>
</div>
</div>
</div>

---

## Algorithm

Use BFS/DFS to try 2-coloring. If we find adjacent nodes with same color, not bipartite.

| Metric | Value |
|--------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
