<div id="viz-config" style="display:none">
{"name":"Single Source Shortest Path","algorithm":"dijkstras-algorithm","complexity":{"time":"O((V + E) log V)","space":"O(V + E)"},"examples":[{"input":{"vertices":5,"edges":[[0,1,4],[0,2,1],[1,3,1],[2,1,2],[2,3,5],[3,4,3]],"source":0},"output":[0,3,1,4,7],"inputRaw":"Graph: 5 vertices, Edges: [(0,1,4), (0,2,1), (1,3,1), (2,1,2), (2,3,5), (3,4,3)], Source: 0","outputRaw":"Distances: [0, 3, 1, 4, 7]"}]}
</div>

# Dijkstra's Algorithm - Single Source Shortest Path

**Difficulty:** Medium

## Problem Statement

Given a weighted graph with non-negative edge weights, find the shortest path from a source vertex to all other vertices in the graph.

Dijkstra's algorithm is a greedy algorithm that uses a priority queue to always process the vertex with the smallest known distance first.

## Examples

**Example 1:**
```
Input:
  Graph with 5 vertices (0-4)
  Edges: [(0,1,4), (0,2,1), (1,3,1), (2,1,2), (2,3,5), (3,4,3)]
  Source: 0

Output:
  Distances: [0, 3, 1, 4, 7]
  Shortest path to vertex 4: 0 -> 2 -> 1 -> 3 -> 4
```

## Visual Explanation

### Graph Representation

```
        4
    (0)---->(1)
     |       |\
    1|      2| \1
     |       |  \
     v       v   v
    (2)---->(3)---->(4)
         5       3
```

### Algorithm Step-by-Step Execution

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">Current</th>
<th style="border: 1px solid #ddd; padding: 10px;">dist[0]</th>
<th style="border: 1px solid #ddd; padding: 10px;">dist[1]</th>
<th style="border: 1px solid #ddd; padding: 10px;">dist[2]</th>
<th style="border: 1px solid #ddd; padding: 10px;">dist[3]</th>
<th style="border: 1px solid #ddd; padding: 10px;">dist[4]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Priority Queue</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Init</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(0,0)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(1,2),(4,1)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(3,1),(4,1),(6,3)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">INF</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(4,1),(4,3),(6,3)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #c3e6cb;">7</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(6,3),(7,4)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">7</td>
<td style="border: 1px solid #ddd; padding: 10px;">[]</td>
</tr>
</table>

### Path Reconstruction

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Node</th>
<th style="border: 1px solid #ddd; padding: 10px;">Distance</th>
<th style="border: 1px solid #ddd; padding: 10px;">Previous</th>
<th style="border: 1px solid #ddd; padding: 10px;">Path from Source</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 2 -> 1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 2 -> 1 -> 3</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">7</td>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 2 -> 1 -> 3 -> 4</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> Dijkstra's algorithm works by always selecting the unvisited vertex with the smallest known distance, then updating distances to its neighbors. This greedy approach works because all edge weights are non-negative.
</div>

## Constraints

- Graph has non-negative edge weights
- Graph may be directed or undirected
- 1 <= V <= 10^5 (vertices)
- 0 <= E <= V^2 (edges)

## Hints

<details>
<summary>Hint 1</summary>
Use a min-heap (priority queue) to efficiently get the vertex with minimum distance.
</details>

<details>
<summary>Hint 2</summary>
Skip vertices that have already been processed (their distance won't improve).
</details>

<details>
<summary>Hint 3</summary>
To reconstruct the path, maintain a "previous" array that tracks how you reached each vertex.
</details>

## Approach

1. Initialize distances: source = 0, all others = infinity
2. Add source to priority queue with distance 0
3. While priority queue is not empty:
   - Extract vertex u with minimum distance
   - Skip if already processed
   - For each neighbor v: if dist[u] + weight(u,v) < dist[v], update dist[v]
4. Return distances array

**Time Complexity:** O((V + E) log V) with binary heap
**Space Complexity:** O(V + E)

---

## Similar Problems

### 1. Network Delay Time
**Difficulty:** Medium

Find the minimum time for all nodes to receive a signal from a given source.

### 2. Cheapest Flights Within K Stops
**Difficulty:** Medium

Find the cheapest flight path with at most K stops.

### 3. Path With Minimum Effort
**Difficulty:** Medium

Find a path from top-left to bottom-right minimizing the maximum absolute difference.
