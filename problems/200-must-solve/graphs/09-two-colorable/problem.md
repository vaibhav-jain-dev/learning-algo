# Two-Colorable (Bipartite Graph Check)

**Difficulty:** Medium (Yellow)

## Problem Statement

You're given a list of edges representing an undirected graph. Write a function that returns a boolean indicating whether the graph is two-colorable.

A graph is two-colorable (also called bipartite) if all of its nodes can be assigned one of two colors such that no two adjacent nodes have the same color.

The graph will always be connected, meaning that from any node you can reach any other node.

## Examples

**Example 1:**
```
Input: edges = [
    [1, 2],    # Node 0 connects to nodes 1 and 2
    [0, 2],    # Node 1 connects to nodes 0 and 2
    [0, 1]     # Node 2 connects to nodes 0 and 1
]

Output: false

Explanation: This is a triangle (3-cycle). If we color node 0 with color A,
then nodes 1 and 2 must be color B. But 1 and 2 are also adjacent,
so they can't both be B.
```

**Example 2:**
```
Input: edges = [
    [1, 3],    # Node 0 connects to nodes 1 and 3
    [0, 2],    # Node 1 connects to nodes 0 and 2
    [1, 3],    # Node 2 connects to nodes 1 and 3
    [0, 2]     # Node 3 connects to nodes 0 and 2
]

Output: true

Explanation: This is a square (4-cycle). We can color:
- Nodes 0, 2 with color A
- Nodes 1, 3 with color B
No adjacent nodes share the same color.
```

## Constraints

- The graph is connected (you can reach any node from any other node)
- The graph is undirected
- The graph may contain self-loops
- Nodes are numbered from 0 to n-1

## Hints

<details>
<summary>Hint 1</summary>
A graph is two-colorable if and only if it contains no odd-length cycles.
</details>

<details>
<summary>Hint 2</summary>
Use BFS or DFS to try to color the graph. Start with any node and color it. Then color all its neighbors with the opposite color.
</details>

<details>
<summary>Hint 3</summary>
If you ever try to color a node and find it's already colored with the wrong color, the graph is not two-colorable.
</details>

## Approach

### BFS/DFS Coloring
1. Start at any node and assign it color 0
2. For each neighbor of the current node:
   - If uncolored, assign the opposite color and continue
   - If already colored with the same color as current, return false
   - If already colored with opposite color, continue (valid)
3. If all nodes are colored without conflict, return true

### Key Insight
- A graph is bipartite if and only if it contains no odd-length cycles
- Self-loops immediately make a graph non-bipartite (a node adjacent to itself)

**Time Complexity:** O(V + E) where V is vertices, E is edges
**Space Complexity:** O(V) for the color array

---

## Similar Problems (Harder)

### 1. Minimum Vertex Removals for Bipartiteness
**Difficulty:** Hard

Find the minimum number of vertices to remove to make a non-bipartite graph bipartite.

### 2. K-Colorable Graph
**Difficulty:** NP-Hard

Determine if a graph can be colored with K colors such that no adjacent nodes share a color. The general case is NP-complete for K >= 3.

### 3. Maximum Bipartite Matching
**Difficulty:** Hard

Given a bipartite graph, find the maximum number of edges such that no two edges share a vertex.
