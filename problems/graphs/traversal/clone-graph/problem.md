# Clone Graph

## Problem Description

Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list of its neighbors.

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```

The graph is represented in the test case using an adjacency list. An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

## Examples

### Example 1

```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]

Output: [[2,4],[1,3],[2,4],[1,3]]

Explanation:
There are 4 nodes in the graph.
- Node 1's neighbors are Node 2 and Node 4.
- Node 2's neighbors are Node 1 and Node 3.
- Node 3's neighbors are Node 2 and Node 4.
- Node 4's neighbors are Node 1 and Node 3.
```

### Example 2

```
Input: adjList = [[]]

Output: [[]]

Explanation:
The graph contains a single node with val = 1 and no neighbors.
```

### Example 3

```
Input: adjList = []

Output: []

Explanation:
Empty graph (no nodes).
```

## Constraints

- The number of nodes in the graph is in the range [0, 100]
- 1 <= Node.val <= 100
- Node.val is unique for each node
- There are no repeated edges or self-loops
- The graph is connected and all nodes can be visited starting from the given node

## Hints

<details>
<summary>Hint 1</summary>
Use a hash map to store the mapping from original nodes to cloned nodes. This helps avoid cloning the same node twice.
</details>

<details>
<summary>Hint 2</summary>
Use BFS or DFS to traverse the original graph. For each node visited, create its clone if not already created.
</details>

<details>
<summary>Hint 3</summary>
When setting up neighbors for a cloned node, look up (or create) the clones of each neighbor.
</details>

<details>
<summary>Hint 4</summary>
The key insight is that you need to handle the "chicken and egg" problem - a node's clone needs its neighbors' clones, but those might not exist yet.
</details>

## Approach

### DFS Solution

1. Create a hash map: `original_node -> cloned_node`
2. Start DFS from the given node
3. For each node:
   - If already cloned (in hash map), return the clone
   - Otherwise, create a new clone
   - Recursively clone all neighbors and add them to the clone's neighbor list
4. Return the clone of the starting node

### BFS Solution

1. Create a hash map and a queue
2. Clone the starting node and add to both
3. While queue is not empty:
   - Dequeue a node
   - For each neighbor:
     - If not cloned, create clone and enqueue
     - Add the neighbor's clone to current node's clone's neighbors

### Complexity Analysis

- **Time**: O(N + E) where N is number of nodes and E is number of edges
- **Space**: O(N) for the hash map storing clones

### Key Points

- Hash map prevents infinite loops and duplicate clones
- Handle null input (empty graph)
- The cloned graph should have no references to the original graph
