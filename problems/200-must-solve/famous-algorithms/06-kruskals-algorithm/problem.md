<div id="viz-config" style="display:none">
{"name":"Minimum Spanning Tree","algorithm":"kruskals-algorithm","complexity":{"time":"O(E log E)","space":"O(V)"},"examples":[{"input":{"V":4,"E":5,"edges":[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]},"output":{"mstEdges":[[2,3,4],[0,3,5],[0,1,10]],"totalWeight":19},"inputRaw":"V = 4, E = 5, Edges: [(0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4)]","outputRaw":"MST edges: [(2,3,4), (0,3,5), (0,1,10)], Total weight: 19"}]}
</div>

# Kruskal's Algorithm - Minimum Spanning Tree

**Difficulty:** Medium

## Problem Statement

Given a connected, undirected, weighted graph with `V` vertices and `E` edges, find the Minimum Spanning Tree (MST) using Kruskal's algorithm.

A Minimum Spanning Tree is a subset of edges that connects all vertices with the minimum total edge weight, without forming any cycles.

Kruskal's algorithm is a greedy algorithm that:
1. Sorts all edges by weight
2. Picks edges in order, skipping those that would create a cycle

## Examples

**Example 1:**
```
Input:
  V = 4, E = 5
  Edges: [(0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4)]

Output:
  MST edges: [(2,3,4), (0,3,5), (0,1,10)]
  Total weight: 19
```

## Visual Explanation

### Original Graph

```
        10
    (0)-----(1)
     |\      |
    6| \5    |15
     |  \    |
    (2)---(3)
        4
```

### Kruskal's Algorithm Step-by-Step

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">Edge</th>
<th style="border: 1px solid #ddd; padding: 10px;">Weight</th>
<th style="border: 1px solid #ddd; padding: 10px;">Action</th>
<th style="border: 1px solid #ddd; padding: 10px;">Components</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Init</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0}, {1}, {2}, {3}</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">(2,3)</td>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Add</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0}, {1}, {2,3}</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">(0,3)</td>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Add</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0,2,3}, {1}</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">(0,2)</td>
<td style="border: 1px solid #ddd; padding: 10px;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">Skip (cycle)</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0,2,3}, {1}</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">(0,1)</td>
<td style="border: 1px solid #ddd; padding: 10px;">10</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Add</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0,1,2,3}</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px;">(1,3)</td>
<td style="border: 1px solid #ddd; padding: 10px;">15</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">Done (V-1 edges)</td>
<td style="border: 1px solid #ddd; padding: 10px;">{0,1,2,3}</td>
</tr>
</table>

### Final MST

```
        10
    (0)-----(1)
       \
        \5
         \
    (2)---(3)
        4

Total weight: 4 + 5 + 10 = 19
```

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> Kruskal's algorithm uses Union-Find to efficiently detect cycles. An edge creates a cycle if and only if both its vertices are already in the same connected component.
</div>

## Constraints

- 1 <= V <= 10^4
- 0 <= E <= V * (V - 1) / 2
- Graph is connected
- All edge weights are positive

## Hints

<details>
<summary>Hint 1</summary>
Sort all edges by weight first. This allows the greedy approach to always pick the smallest available edge.
</details>

<details>
<summary>Hint 2</summary>
Use Union-Find to efficiently check if adding an edge would create a cycle.
</details>

<details>
<summary>Hint 3</summary>
Stop when you have added V-1 edges (MST property: a tree with V vertices has exactly V-1 edges).
</details>

## Approach

1. Sort all edges by weight in ascending order
2. Initialize Union-Find with V vertices
3. For each edge (u, v, w) in sorted order:
   - If u and v are in different components (find(u) != find(v))
   - Add edge to MST and union(u, v)
   - Stop when MST has V-1 edges
4. Return MST edges and total weight

**Time Complexity:** O(E log E) for sorting + O(E * alpha(V)) for Union-Find = O(E log E)
**Space Complexity:** O(V) for Union-Find

---

## Similar Problems

### 1. Min Cost to Connect All Points
**Difficulty:** Medium

Connect all points with minimum cost using Manhattan distance.

### 2. Connecting Cities With Minimum Cost
**Difficulty:** Medium

Find minimum cost to connect all cities.

### 3. Optimize Water Distribution in a Village
**Difficulty:** Hard

Minimize cost to supply water to all houses.
