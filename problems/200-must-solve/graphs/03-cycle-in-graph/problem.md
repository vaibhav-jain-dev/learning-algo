# Cycle Detection in Graph

**Difficulty:** Medium (Yellow)

## Problem Statement

Given a directed graph represented as an adjacency list, write a function that returns a boolean indicating whether the graph contains a cycle.

A cycle exists in a graph when you can start at some node and follow a sequence of edges that eventually leads back to the starting node.

## Examples

**Example 1:**
```
Input: edges = [
    [1, 3],    # Node 0 points to nodes 1 and 3
    [2, 3, 4], # Node 1 points to nodes 2, 3, and 4
    [0],       # Node 2 points to node 0
    [],        # Node 3 has no outgoing edges
    [2, 5],    # Node 4 points to nodes 2 and 5
    []         # Node 5 has no outgoing edges
]

Output: true

Explanation: There's a cycle: 0 -> 1 -> 2 -> 0
```

**Example 2:**
```
Input: edges = [
    [1, 2],    # Node 0 points to nodes 1 and 2
    [2],       # Node 1 points to node 2
    []         # Node 2 has no outgoing edges
]

Output: false

Explanation: No cycle exists - this is a DAG (Directed Acyclic Graph)
```

## Constraints

- The graph is directed
- The graph may have disconnected components
- Nodes are numbered from 0 to n-1
- edges[i] contains the indices of nodes that node i connects to

## Hints

<details>
<summary>Hint 1</summary>
Use DFS to traverse the graph. Keep track of nodes in the current DFS path.
</details>

<details>
<summary>Hint 2</summary>
Use three states for each node: unvisited, currently in stack (being processed), and fully processed.
</details>

<details>
<summary>Hint 3</summary>
A cycle exists if during DFS you encounter a node that is currently in the stack (still being processed).
</details>

## Approach

### DFS with Three-Color Marking
1. WHITE (0): Unvisited node
2. GRAY (1): Node is being processed (in current DFS path)
3. BLACK (2): Node is fully processed

### Algorithm
1. For each unvisited node, start DFS
2. Mark current node as GRAY (in progress)
3. For each neighbor:
   - If GRAY: Cycle detected (back edge found)
   - If WHITE: Recurse on neighbor
4. Mark current node as BLACK (done)
5. If no cycle found after processing all nodes, return false

**Time Complexity:** O(V + E) where V is vertices, E is edges
**Space Complexity:** O(V) for the color array and recursion stack

---

## Similar Problems (Harder)

### 1. Find All Cycles in Directed Graph
**Difficulty:** Hard

Return all unique cycles present in the graph, not just detect if one exists.

### 2. Minimum Edges to Remove to Break All Cycles
**Difficulty:** Hard

Find the minimum number of edges that need to be removed to make the graph acyclic.

### 3. Longest Cycle in Directed Graph
**Difficulty:** Hard

Find the length of the longest cycle in a directed graph, or -1 if no cycle exists.
