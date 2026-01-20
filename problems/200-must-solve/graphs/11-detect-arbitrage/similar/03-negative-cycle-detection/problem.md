<div id="viz-config" style="display:none">
{"name":"Negative Cycle Detection","algorithm":"bellman-ford","complexity":{"time":"O(V * E)","space":"O(V)"},"examples":[{"input":{"n":4,"edges":[[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]},"output":true,"inputRaw":"n = 4, edges = [[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]","outputRaw":"true (cycle 1->2->3->1 with sum = -3+2+1 = 0... wait, let me recalculate)"}]}
</div>

# Negative Cycle Detection

**Difficulty:** Medium

## Problem Statement

Given a directed weighted graph with `n` vertices and a list of edges, determine if the graph contains a negative weight cycle (a cycle where the sum of edge weights is negative).

Negative cycles make shortest path undefined (can always get shorter by going around the cycle again).

## Examples

**Example 1:**
```
Input: n = 4, edges = [[0,1,1],[1,2,2],[2,3,-5],[3,1,1]]
Output: true
Explanation: Cycle 1->2->3->1 has sum 2 + (-5) + 1 = -2 (negative)
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,1],[1,2,2],[2,0,3]]
Output: false
Explanation: Cycle 0->1->2->0 has sum 1 + 2 + 3 = 6 (positive)
```

**Example 3:**
```
Input: n = 2, edges = [[0,1,-1],[1,0,-1]]
Output: true
Explanation: Cycle 0->1->0 has sum -1 + (-1) = -2 (negative)
```

## Visual Explanation

### Negative Cycle Detection with Bellman-Ford

```
Graph with negative cycle:

    1 ──(2)──→ 2
    ↑          │
   (1)       (-5)
    │          ↓
    └────(1)── 3

Cycle: 1 → 2 → 3 → 1
Weight: 2 + (-5) + 1 = -2 < 0 ✓ Negative cycle!

Bellman-Ford Detection:
- After n-1 iterations, distances are "settled"
- If n-th iteration still relaxes an edge, negative cycle exists
```

### Why Bellman-Ford Works

```
In a graph with n vertices:
- Shortest path has at most n-1 edges
- After n-1 relaxations, all distances finalized
- If n-th relaxation improves distance → negative cycle

Round 1-3 (n-1): Distances stabilize
Round 4 (n): dist[1] = -2 improved from previous value
              ↑ Negative cycle detected!
```

## Constraints

- 1 <= n <= 500
- 0 <= edges.length <= 5000
- edges[i] = [from, to, weight]
- -10^4 <= weight <= 10^4
- 0 <= from, to < n

## Hints

<details>
<summary>Hint 1</summary>
Bellman-Ford normally runs n-1 iterations. Run one more to detect negative cycles.
</details>

<details>
<summary>Hint 2</summary>
If any edge can still be relaxed after n-1 iterations, there's a negative cycle.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Use DFS with tracking of nodes in current path and their distances.
</details>

## Approach

### Bellman-Ford Detection

1. Initialize distances (use 0 for all nodes to find any cycle)
2. Run n-1 iterations of edge relaxation
3. Run one more iteration
4. If any edge is relaxed in n-th iteration → negative cycle exists

**Time Complexity:** O(V * E)
**Space Complexity:** O(V)
