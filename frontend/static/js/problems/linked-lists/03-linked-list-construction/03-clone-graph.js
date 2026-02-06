/**
 * Clone Graph
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Given a reference to a node in a connected undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains: - A value (val) - A list of its neighbors (neighbors) The graph is represented using an adjacency list where each node\'s neighbors list describes connections between nodes.',
        complexity: {
            time: 'O(N+E)',
            space: 'O(N)'
        },
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ],
        examples: [
    {
        input: {
        "adjList": [
                [
                        2,
                        4
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        4
                ],
                [
                        1,
                        3
                ]
        ]
},
        output: [[2, 4], [1, 3], [2, 4], [1, 3]],
        explanation: 'Processing the input data produces the output. For input adjList=[[2, 4], [1, 3], [2, 4], [1, 3]], the result is [[2, 4], [1, 3], [2, 4], [1, 3]].'
    },
    {
        input: {
        "adjList": [
                []
        ]
},
        output: [[]],
        explanation: 'Processing the input data produces the output. For input adjList=[[]], the result is [[]].'
    },
    {
        input: {
        "adjList": []
},
        output: [],
        explanation: 'Processing the input data produces the output. For input adjList=[], the result is [].'
    }
        ],
        solutions: {
            python: `from collections import deque

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    """
    Clone Graph using BFS

    Time: O(N + E) where N is nodes and E is edges
    Space: O(N) for the hash map and queue
    """
    if not node:
        return None

    # Map from original node to cloned node
    visited = {}

    # Start BFS from the given node
    queue = deque([node])
    visited[node] = Node(node.val)

    while queue:
        current = queue.popleft()

        for neighbor in current.neighbors:
            if neighbor not in visited:
                # Clone the neighbor
                visited[neighbor] = Node(neighbor.val)
                queue.append(neighbor)

            # Add the cloned neighbor to current clone's neighbors
            visited[current].neighbors.append(visited[neighbor])

    return visited[node]


def cloneGraphDFS(node):
    """
    Clone Graph using DFS (recursive)

    Time: O(N + E)
    Space: O(N)
    """
    if not node:
        return None

    visited = {}

    def dfs(original):
        if original in visited:
            return visited[original]

        # Create clone for current node
        clone = Node(original.val)
        visited[original] = clone

        # Recursively clone all neighbors
        for neighbor in original.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)


# Test
if __name__ == "__main__":
    # Create graph: 1 -- 2
    #               |    |
    #               4 -- 3
    n1, n2, n3, n4 = Node(1), Node(2), Node(3), Node(4)
    n1.neighbors = [n2, n4]
    n2.neighbors = [n1, n3]
    n3.neighbors = [n2, n4]
    n4.neighbors = [n1, n3]

    clone = cloneGraph(n1)
    print(f"Original node 1 val: {n1.val}")
    print(f"Cloned node 1 val: {clone.val}")
    print(f"Are they same object? {clone is n1}")  # False`,
            go: `package main

import "fmt"

type Node struct {
    Val       int
    Neighbors []*Node
}

// CloneGraph clones the graph using BFS.
// Time: O(N + E), Space: O(N)
func CloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }

    // Map from original node to cloned node
    visited := make(map[*Node]*Node)

    // Start BFS from the given node
    queue := []*Node{node}
    visited[node] = &Node{Val: node.Val}

    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]

        for _, neighbor := range current.Neighbors {
            if _, exists := visited[neighbor]; !exists {
                // Clone the neighbor
                visited[neighbor] = &Node{Val: neighbor.Val}
                queue = append(queue, neighbor)
            }

            // Add the cloned neighbor to current clone's neighbors
            visited[current].Neighbors = append(
                visited[current].Neighbors,
                visited[neighbor],
            )
        }
    }

    return visited[node]
}

// CloneGraphDFS clones the graph using DFS (recursive).
// Time: O(N + E), Space: O(N)
func CloneGraphDFS(node *Node) *Node {
    if node == nil {
        return nil
    }

    visited := make(map[*Node]*Node)

    var dfs func(*Node) *Node
    dfs = func(original *Node) *Node {
        if clone, exists := visited[original]; exists {
            return clone
        }

        // Create clone for current node
        clone := &Node{Val: original.Val}
        visited[original] = clone

        // Recursively clone all neighbors
        for _, neighbor := range original.Neighbors {
            clone.Neighbors = append(clone.Neighbors, dfs(neighbor))
        }

        return clone
    }

    return dfs(node)
}

func main() {
    // Create graph: 1 -- 2
    //               |    |
    //               4 -- 3
    n1, n2, n3, n4 := &Node{Val: 1}, &Node{Val: 2}, &Node{Val: 3}, &Node{Val: 4}
    n1.Neighbors = []*Node{n2, n4}
    n2.Neighbors = []*Node{n1, n3}
    n3.Neighbors = []*Node{n2, n4}
    n4.Neighbors = []*Node{n1, n3}

    clone := CloneGraph(n1)
    fmt.Printf("Original node 1 val: %d\\n", n1.Val)
    fmt.Printf("Cloned node 1 val: %d\\n", clone.Val)
    fmt.Printf("Are they same object? %v\\n", clone == n1) // false
}`
        },
        twists: [
            { id: '03-linked-list-construction/03-clone-graph/twist-01-clone-directed-graph-with-cycles', name: 'Clone Directed Graph with Cycles', difficulty: 'Medium' },
            { id: '03-linked-list-construction/03-clone-graph/twist-02-clone-weighted-graph', name: 'Clone Weighted Graph', difficulty: 'Medium' },
            { id: '03-linked-list-construction/03-clone-graph/twist-03-iterative-bfs-vs-recursive-dfs-comparison', name: 'Iterative BFS vs Recursive DFS Comparison', difficulty: 'Medium' },
            { id: '03-linked-list-construction/03-clone-graph/twist-04-clone-graph-without-hash-map', name: 'Clone Graph Without Hash Map', difficulty: 'Very Hard' },
            { id: '03-linked-list-construction/03-clone-graph/twist-05-verify-graph-clone-correctness', name: 'Verify Graph Clone Correctness', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph'] = problem;

})();
