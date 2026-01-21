/**
 * Average of Levels in Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Average of Levels in Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths',
        description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10^-5 of the actual answer will be accepted.',
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
        output: [3.0, 14.5, 11.0],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is [3.0, 14.5, 11.0].'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        }
},
        output: [1.0, 2.5, 5.0],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, the result is [1.0, 2.5, 5.0].'
    }
        ],
        solutions: {
            python: `def averageOfLevelsInBinaryTree(data):
    """
    Average of Levels in Binary Tree

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

// AverageOfLevelsInBinaryTree solves the Average of Levels in Binary Tree problem.
// Time: O(n), Space: O(n)
func AverageOfLevelsInBinaryTree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels'] = problem;

})();
