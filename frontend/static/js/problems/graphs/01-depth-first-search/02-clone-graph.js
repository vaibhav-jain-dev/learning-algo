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
        description: 'Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors. `` class Node {     public int val;     public List<Node> neighbors; } ``',
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
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input adjList=[[2, 4], [1, 3], [2, 4], [1, 3]], the result is [[2, 4], [1, 3], [2, 4], [1, 3]].'
    },
    {
        input: {
        "adjList": [
                []
        ]
},
        output: [[]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input adjList=[[]], the result is [[]].'
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
            {
                title: 'Clone a Directed Graph',
                difficulty: 'Medium',
                description: 'Clone a directed graph where edges are one-way. The cloned graph must preserve edge directions exactly.',
                whyDifferent: 'In undirected graphs, each edge appears in both neighbor lists. In directed graphs, you must be careful not to assume symmetry. The DFS traversal might not reach all nodes from a single starting node.',
                example: 'Directed graph: 1->2, 2->3, 3->1. Clone preserves: clone(1)->clone(2)->clone(3)->clone(1).'
            },
            {
                title: 'Clone a Weighted Graph',
                difficulty: 'Medium',
                description: 'Clone a graph where each edge has a weight. The node structure includes neighbors as (node, weight) pairs. Preserve all weights in the clone.',
                whyDifferent: 'The data structure is more complex - you must track and copy edge weights alongside node references. The mapping must handle weighted adjacency correctly.',
                example: 'Node 1 neighbors: [(2, 5), (3, 10)]. Clone must have clone(1) neighbors: [(clone(2), 5), (clone(3), 10)].'
            },
            {
                title: 'Clone Graph Using BFS',
                difficulty: 'Medium',
                description: 'Clone the same undirected graph but use BFS instead of DFS. The result must be identical.',
                whyDifferent: 'Switches from recursive/stack-based to iterative queue-based cloning. You must handle the mapping of old-to-new nodes in a different traversal order, which changes when clones are created vs when their neighbors are populated.',
                example: 'Same graph 1-2-3-4 cycle. BFS processes level by level: clone 1, then clone 2 and 4 (level 1), then clone 3 (level 2).'
            },
            {
                title: 'Clone a Disconnected Graph',
                difficulty: 'Hard',
                description: 'Clone a graph that may have multiple disconnected components. You are given a list of all nodes, not just one starting node.',
                whyDifferent: 'A single DFS from one node will not reach disconnected components. You need to iterate over all nodes and start new DFS traversals for unvisited nodes, fundamentally changing the entry point logic.',
                example: 'Nodes: [1,2,3,4]. Edges: 1-2, 3-4 (two components). Must clone both components completely.'
            },
            {
                title: 'Clone Graph with Random Pointers',
                difficulty: 'Hard',
                description: 'Each node has a regular neighbor list plus a random pointer to any node in the graph. Clone the graph preserving both neighbor relationships and random pointers.',
                whyDifferent: 'The random pointer can point to any node, including ones not yet cloned during DFS. You must handle forward references gracefully, requiring the clone map to serve double duty for both neighbor and random pointer resolution.',
                example: 'Node 1 (neighbors: [2], random: 3), Node 2 (neighbors: [1], random: 1), Node 3 (neighbors: [], random: 2). All pointers must map to cloned versions.'
            }
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
