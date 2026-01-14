# DFS Traversal of Graph

## Problem Description

Given an undirected graph represented as an adjacency list and a starting node, perform a Depth-First Search (DFS) traversal and return the order in which nodes are visited.

DFS explores as far as possible along each branch before backtracking. It can be implemented using recursion (implicit stack) or an explicit stack.

## Examples

### Example 1

```
Input:
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2]
}
start = 0

Output: [0, 1, 3, 4, 2, 5] (one possible order)

Explanation:
- Start at node 0
- Go to first neighbor 1
- Go to first unvisited neighbor of 1: node 3
- Backtrack to 1, go to node 4
- Backtrack to 0, go to node 2
- Go to node 5
```

### Example 2

```
Input:
graph = {
    0: [1],
    1: [0, 2],
    2: [1, 3],
    3: [2]
}
start = 0

Output: [0, 1, 2, 3]

Explanation: Linear traversal from 0 to 3.
```

### Example 3

```
Input:
graph = {
    0: [1, 2, 3],
    1: [0],
    2: [0],
    3: [0]
}
start = 0

Output: [0, 1, 2, 3]

Explanation: Star graph - visit center, then all leaves in order.
```

## Constraints

- Number of nodes: 1 <= n <= 10^4
- Graph may be disconnected
- No self-loops or multiple edges
- 0 <= start < n

## Hints

<details>
<summary>Hint 1</summary>
DFS can be implemented recursively: visit a node, mark it visited, then recursively visit all unvisited neighbors.
</details>

<details>
<summary>Hint 2</summary>
For iterative DFS, use a stack instead of a queue. Push neighbors in reverse order to maintain left-to-right order.
</details>

<details>
<summary>Hint 3</summary>
Keep track of visited nodes to avoid infinite loops in cyclic graphs.
</details>

## Approach

### Recursive DFS

```
dfs(node):
    mark node as visited
    add node to result
    for each neighbor of node:
        if neighbor not visited:
            dfs(neighbor)
```

### Iterative DFS

1. Use a stack instead of queue
2. Push start node to stack
3. While stack not empty:
   - Pop a node
   - If not visited, mark visited and process
   - Push unvisited neighbors

### Complexity

- Time: O(V + E) - visit each vertex and edge once
- Space: O(V) - for visited set and recursion stack

### DFS vs BFS

- DFS goes deep first, BFS goes wide first
- DFS uses less memory for long paths
- DFS is better for finding paths, cycles, topological sort
- BFS is better for shortest paths in unweighted graphs
