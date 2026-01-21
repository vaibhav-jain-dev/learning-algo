/**
 * Binary Tree Level Order Traversal
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
        complexity: {
            time: 'O(N)',
            space: 'O(W)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "root": [
                3,
                9,
                20,
                null,
                null,
                15,
                7
        ]
},
        output: [[3], [9, 20], [15, 7]],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[3, 9, ..., 7] (length 7), the result is [[3], [9, 20], [15, 7]].'
    },
    {
        input: {
        "root": [
                1
        ]
},
        output: [[1]],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[1], the result is [[1]].'
    }
        ],
        solutions: {
            python: `def binaryTreeLevelOrderTraversal(data):
    """
    Binary Tree Level Order Traversal

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: BFS explores breadth-first, ideal for shortest paths

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

// BinaryTreeLevelOrderTraversal solves the Binary Tree Level Order Traversal problem.
// Time: O(n), Space: O(n)
func BinaryTreeLevelOrderTraversal(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: BFS explores breadth-first, ideal for shortest paths

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
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal'] = problem;

})();
