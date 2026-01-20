# Prim's Algorithm - Minimum Spanning Tree (Alternative)

**Difficulty:** Medium

## Problem Statement

Given a connected, undirected, weighted graph with `V` vertices and `E` edges, find the Minimum Spanning Tree (MST) using Prim's algorithm.

Prim's algorithm builds the MST by starting from a single vertex and greedily adding the minimum weight edge that connects a vertex in the MST to a vertex outside of it.

## Examples

**Example 1:**
```
Input:
  V = 5
  Edges: [(0,1,2), (0,3,6), (1,2,3), (1,3,8), (1,4,5), (2,4,7), (3,4,9)]

Output:
  MST weight: 16
  MST edges: [(0,1,2), (1,2,3), (1,4,5), (0,3,6)]
```

## Visual Explanation

### Original Graph

```
        2
    (0)-----(1)
     |      /|\
    6|    3/ |5\
     |    /  8  \
    (3)-(4)-----|-(2)
        9      7
```

### Prim's Algorithm Step-by-Step (starting from vertex 0)

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">MST Vertices</th>
<th style="border: 1px solid #ddd; padding: 10px;">Min Edge</th>
<th style="border: 1px solid #ddd; padding: 10px;">Weight</th>
<th style="border: 1px solid #ddd; padding: 10px;">Total</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Init</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0}</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">-</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1}</td>
<td style="border: 1px solid #ddd; padding: 10px;">(0, 1)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1, 2}</td>
<td style="border: 1px solid #ddd; padding: 10px;">(1, 2)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1, 2, 4}</td>
<td style="border: 1px solid #ddd; padding: 10px;">(1, 4)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">5</td>
<td style="border: 1px solid #ddd; padding: 10px;">10</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">{0, 1, 2, 3, 4}</td>
<td style="border: 1px solid #ddd; padding: 10px;">(0, 3)</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">16</td>
</tr>
</table>

### Priority Queue State

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">After Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">Priority Queue (weight, vertex)</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(0, 0)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(2, 1), (6, 3)]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">[(3, 2), (5, 4), (6, 3), (8, 3)]</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Kruskal's vs Prim's:</strong>
<ul>
<li>Kruskal's: Sort edges globally, use Union-Find for cycles</li>
<li>Prim's: Grow tree from one vertex, use priority queue for next edge</li>
<li>Kruskal's better for sparse graphs; Prim's better for dense graphs</li>
</ul>
</div>

## Constraints

- 1 <= V <= 10^4
- 0 <= E <= V * (V - 1) / 2
- Graph is connected

## Hints

<details>
<summary>Hint 1</summary>
Use a priority queue (min-heap) to efficiently find the minimum weight edge to a non-MST vertex.
</details>

<details>
<summary>Hint 2</summary>
Keep track of which vertices are already in the MST to avoid cycles.
</details>

<details>
<summary>Hint 3</summary>
Alternatively, maintain a key[] array where key[v] is the minimum weight edge connecting v to the MST.
</details>

## Approach

1. Start with vertex 0 in the MST
2. Add all edges from vertex 0 to the priority queue
3. While MST doesn't have V vertices:
   - Extract minimum weight edge (w, v) from queue
   - If v is already in MST, skip
   - Add v to MST, add weight to total
   - Add all edges from v to non-MST vertices to queue
4. Return MST weight

**Time Complexity:** O((V + E) log V) with binary heap
**Space Complexity:** O(V + E)

---

## Similar Problems

### 1. Min Cost to Connect Points (using Prim's)
**Difficulty:** Medium

Same problem, but specifically using Prim's approach.

### 2. Network Delay via MST
**Difficulty:** Medium

Use MST concepts to find network properties.

### 3. Minimum Spanning Tree Verification
**Difficulty:** Medium

Given a tree, verify if it's a valid MST.
