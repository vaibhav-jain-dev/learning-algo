<div id="viz-config" style="display:none">
{"name":"DAG Ordering","algorithm":"topological-sort","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"n":6,"edges":[[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]},"output":[5,4,2,3,1,0],"inputRaw":"n = 6, edges = [[5,2], [5,0], [4,0], [4,1], [2,3], [3,1]]","outputRaw":"[5, 4, 2, 3, 1, 0]"},{"input":{"n":2,"edges":[[1,0],[0,1]]},"output":[],"inputRaw":"n = 2, edges = [[1,0], [0,1]]","outputRaw":"[] (cycle detected)"}]}
</div>

# Topological Sort - DAG Ordering

**Difficulty:** Medium

## Problem Statement

Given a Directed Acyclic Graph (DAG) with `n` vertices and edges, find a topological ordering of the vertices. A topological ordering is a linear ordering of vertices such that for every directed edge `(u, v)`, vertex `u` comes before `v` in the ordering.

If the graph contains a cycle, return an empty array (no valid topological ordering exists).

## Examples

**Example 1:**
```
Input: n = 6, edges = [[5,2], [5,0], [4,0], [4,1], [2,3], [3,1]]
Output: [5, 4, 2, 3, 1, 0] or [4, 5, 2, 3, 1, 0] (multiple valid orderings)
```

**Example 2:**
```
Input: n = 2, edges = [[1,0], [0,1]]
Output: [] (cycle detected)
```

## Visual Explanation

### Graph Representation

```
    (5)     (4)
    / \     / \
   v   v   v   v
  (2)  (0)    (1)
   |          ^
   v          |
  (3)---------+
```

### Kahn's Algorithm (BFS) Step-by-Step

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">Queue</th>
<th style="border: 1px solid #ddd; padding: 10px;">In-degree Array</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Init</td>
<td style="border: 1px solid #ddd; padding: 10px;">[4, 5]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[1, 2, 1, 1, 0, 0]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[5]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[0, 1, 1, 1, -, 0]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[0]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[0, 1, 0, 1, -, -]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4, 5]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[2]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[-, 1, 0, 1, -, -]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4, 5, 0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[3]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[-, 1, -, 0, -, -]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4, 5, 0, 2]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[1]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[-, 0, -, -, -, -]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4, 5, 0, 2, 3]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #fff3cd;">[]</td>
<td style="border: 1px solid #ddd; padding: 10px;">[-, -, -, -, -, -]</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[4, 5, 0, 2, 3, 1]</td>
</tr>
</table>

### DFS Approach Visualization

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Node</th>
<th style="border: 1px solid #ddd; padding: 10px;">State</th>
<th style="border: 1px solid #ddd; padding: 10px;">Stack (result)</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[1, 0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[3, 1, 0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[2, 3, 1, 0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[5, 2, 3, 1, 0]</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Visited</td>
<td style="border: 1px solid #ddd; padding: 10px;">[4, 5, 2, 3, 1, 0]</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> In DFS, we add a node to the result only after processing all its descendants (post-order). This ensures all dependencies appear before dependent nodes.
</div>

## Constraints

- 1 <= n <= 10^4
- 0 <= edges.length <= n * (n - 1)
- edges[i].length == 2
- Graph must be a DAG for valid ordering to exist

## Hints

<details>
<summary>Hint 1</summary>
There are two main approaches: Kahn's Algorithm (BFS) and DFS-based. Both have the same time complexity.
</details>

<details>
<summary>Hint 2</summary>
For Kahn's Algorithm, start with nodes that have no incoming edges (in-degree = 0).
</details>

<details>
<summary>Hint 3</summary>
To detect cycles: if the final result has fewer nodes than the graph, a cycle exists.
</details>

## Approach

### Kahn's Algorithm (BFS)
1. Calculate in-degree for all vertices
2. Add all vertices with in-degree 0 to queue
3. While queue not empty:
   - Remove vertex, add to result
   - Decrease in-degree of all neighbors
   - Add neighbors with in-degree 0 to queue
4. If result.length != n, cycle exists

### DFS Approach
1. Perform DFS from each unvisited node
2. Add node to result stack after visiting all descendants
3. Use 3-state coloring for cycle detection
4. Reverse the stack for final ordering

**Time Complexity:** O(V + E)
**Space Complexity:** O(V + E)

---

## Similar Problems

### 1. Course Schedule
**Difficulty:** Medium

Determine if you can finish all courses given prerequisites.

### 2. Alien Dictionary
**Difficulty:** Hard

Given a sorted dictionary of an alien language, find the character ordering.

### 3. Parallel Courses
**Difficulty:** Medium

Find minimum semesters to complete all courses with prerequisites.
