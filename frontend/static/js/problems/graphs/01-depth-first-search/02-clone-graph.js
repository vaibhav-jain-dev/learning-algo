/**
 * Clone Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors. `` class Node {     public int val;     public List<Node> neighbors; } ``.',
        problem: 'Use Depth-First Search to explore the graph. DFS goes deep before going wide, using a stack (explicit or recursive call stack). Track visited nodes to avoid cycles.',
        complexity: {
            time: 'O(N + E)',
            space: 'O(N)'
        },
        hints: [
            'Start from the source node and explore as deep as possible.',
            'Use recursion or an explicit stack for DFS.',
            'Mark nodes as visited before exploring neighbors.',
            'Consider the order of exploration for the desired result.',
            'Handle disconnected components if needed.'
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
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "adjList": [
                []
        ]
},
        output: [[]],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    """
    Clone Graph - Deep copy using DFS with a hashmap to track cloned nodes.

    Time: O(N + E) where N is nodes, E is edges
    Space: O(N) for the hashmap and recursion stack
    """
    if not node:
        return None

    # Dictionary to map original node -> cloned node
    cloned = {}

    def dfs(original):
        # If already cloned, return the clone
        if original in cloned:
            return cloned[original]

        # Create a clone of the current node
        copy = Node(original.val)
        cloned[original] = copy

        # Recursively clone all neighbors
        for neighbor in original.neighbors:
            copy.neighbors.append(dfs(neighbor))

        return copy

    return dfs(node)


# Test
if __name__ == "__main__":
    # Create graph: 1 -- 2
    #               |    |
    #               4 -- 3
    node1 = Node(1)
    node2 = Node(2)
    node3 = Node(3)
    node4 = Node(4)
    node1.neighbors = [node2, node4]
    node2.neighbors = [node1, node3]
    node3.neighbors = [node2, node4]
    node4.neighbors = [node1, node3]

    cloned = cloneGraph(node1)
    print(cloned.val)  # Output: 1
    print([n.val for n in cloned.neighbors])  # Output: [2, 4]`,
            go: `package main

import "fmt"

// Node represents a graph node
type Node struct {
    Val       int
    Neighbors []*Node
}

// cloneGraph creates a deep copy of the graph using DFS.
// Time: O(N + E), Space: O(N)
func cloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }

    // Map original node to cloned node
    cloned := make(map[*Node]*Node)

    var dfs func(original *Node) *Node
    dfs = func(original *Node) *Node {
        // If already cloned, return the clone
        if copy, exists := cloned[original]; exists {
            return copy
        }

        // Create a clone of the current node
        copy := &Node{Val: original.Val}
        cloned[original] = copy

        // Recursively clone all neighbors
        for _, neighbor := range original.Neighbors {
            copy.Neighbors = append(copy.Neighbors, dfs(neighbor))
        }

        return copy
    }

    return dfs(node)
}

func main() {
    // Create graph: 1 -- 2
    //               |    |
    //               4 -- 3
    node1 := &Node{Val: 1}
    node2 := &Node{Val: 2}
    node3 := &Node{Val: 3}
    node4 := &Node{Val: 4}
    node1.Neighbors = []*Node{node2, node4}
    node2.Neighbors = []*Node{node1, node3}
    node3.Neighbors = []*Node{node2, node4}
    node4.Neighbors = []*Node{node1, node3}

    cloned := cloneGraph(node1)
    fmt.Println(cloned.Val) // Output: 1
}`
        },
        twists: [
            { id: '01-depth-first-search/02-clone-graph/twist-01-clone-a-directed-graph', name: 'Clone a Directed Graph', difficulty: 'Medium' },
            { id: '01-depth-first-search/02-clone-graph/twist-02-clone-a-weighted-graph', name: 'Clone a Weighted Graph', difficulty: 'Medium' },
            { id: '01-depth-first-search/02-clone-graph/twist-03-clone-graph-using-bfs', name: 'Clone Graph Using BFS', difficulty: 'Medium' },
            { id: '01-depth-first-search/02-clone-graph/twist-04-clone-a-disconnected-graph', name: 'Clone a Disconnected Graph', difficulty: 'Hard' },
            { id: '01-depth-first-search/02-clone-graph/twist-05-clone-graph-with-random-pointers', name: 'Clone Graph with Random Pointers', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph'] = problem;

})();
