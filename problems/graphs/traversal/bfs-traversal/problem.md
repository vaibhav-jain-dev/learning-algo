# BFS Traversal of Graph

## Problem Description

Given an undirected graph represented as an adjacency list and a starting node, perform a Breadth-First Search (BFS) traversal and return the order in which nodes are visited.

BFS explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue data structure to keep track of nodes to visit.

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

Output: [0, 1, 2, 3, 4, 5]

Explanation:
- Start at node 0, visit it
- Visit neighbors of 0: nodes 1 and 2
- Visit neighbors of 1: nodes 3 and 4 (0 already visited)
- Visit neighbors of 2: node 5 (0 already visited)
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
start = 1

Output: [1, 0, 2, 3]

Explanation:
- Start at node 1
- Visit neighbors 0 and 2
- Visit neighbor of 2: node 3
```

### Example 3

```
Input:
graph = {
    0: [],
    1: [],
    2: []
}
start = 0

Output: [0]

Explanation: Node 0 has no neighbors, so only node 0 is visited.
```

## Constraints

- Number of nodes: 1 <= n <= 10^4
- Graph may be disconnected
- No self-loops or multiple edges
- 0 <= start < n

## Hints

<details>
<summary>Hint 1</summary>
Use a queue to process nodes level by level. Add the starting node to the queue first.
</details>

<details>
<summary>Hint 2</summary>
Use a set or boolean array to track visited nodes to avoid processing the same node twice.
</details>

<details>
<summary>Hint 3</summary>
For each node dequeued, add all its unvisited neighbors to the queue and mark them as visited.
</details>

## Approach

### BFS Algorithm

1. **Initialize**: Create a queue and add the starting node. Mark it as visited.

2. **Process**: While the queue is not empty:
   - Dequeue a node and add it to the result
   - For each unvisited neighbor, mark it as visited and enqueue it

3. **Key Points**:
   - Mark nodes as visited when adding to queue (not when processing) to avoid duplicates
   - Time Complexity: O(V + E) where V is vertices and E is edges
   - Space Complexity: O(V) for the queue and visited set

### Why BFS?

- BFS explores nodes in order of their distance from the start
- Guarantees shortest path in unweighted graphs
- Useful for level-order processing, finding connected components
