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
            python: `def cloneGraph(data):
    """
    Clone Graph

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

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
    // Key insight: Identify the optimal data structure and algorithm

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
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/03-clone-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/03-clone-graph'] = problem;

})();
