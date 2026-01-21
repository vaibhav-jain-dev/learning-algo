/**
 * Minimum Depth of Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Depth of Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths',
        description: 'Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node. **Note:** A leaf is a node with no children.',
        problem: 'Use BFS (level-order traversal) to process the tree level by level. Use a queue to track nodes at the current level.',
        complexity: {
            time: 'O(n)',
            space: 'O(w)'
        },
        hints: [
            'Use a queue initialized with the root.',
            'Process all nodes at current level before moving to next.',
            'Track level by processing queue size nodes at a time.',
            'Useful for finding level-wise properties.',
            'Can be used to find shortest path in tree.'
        ],
        examples: [
    {
        input: {
        "tree": {
                "value": 3,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 2,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 2.'
    },
    {
        input: {
        "tree": {
                "value": 2,
                "right": {
                        "value": 3,
                        "right": {
                                "value": 4,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                }
        }
},
        output: 5,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 2, \'right\': {\'value\': 3, \'right\': {\'value\': 4, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}}, the result is 5.'
    }
        ],
        solutions: {
            python: `def minimumDepthOfBinaryTree(data):
    """
    Minimum Depth of Binary Tree

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

// MinimumDepthOfBinaryTree solves the Minimum Depth of Binary Tree problem.
// Time: O(n), Space: O(n)
func MinimumDepthOfBinaryTree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth'] = problem;

})();
