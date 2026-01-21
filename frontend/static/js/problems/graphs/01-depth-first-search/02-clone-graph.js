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
            python: `def cloneGraph(data):
    """
    Clone Graph

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: DFS explores depth-first, ideal for paths and connectivity

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// CloneGraph solves the Clone Graph problem.
// Time: O(n), Space: O(n)
func CloneGraph(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: DFS explores depth-first, ideal for paths and connectivity

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
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
