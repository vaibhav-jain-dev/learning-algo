/**
 * Lowest Common Ancestor of a Binary Tree
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."',
        complexity: {
            time: 'O(N)',
            space: 'O(H)'
        },
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ],
        examples: [
    {
        input: {
        "root": [
                3,
                5,
                1,
                6,
                2,
                0,
                8,
                null,
                null,
                7,
                4
        ],
        "p": 5,
        "q": 1
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input root=[3, 5, ..., 4] (length 11), p=5, q=1, the result is 3.'
    },
    {
        input: {
        "root": [
                3,
                5,
                1,
                6,
                2,
                0,
                8,
                null,
                null,
                7,
                4
        ],
        "p": 5,
        "q": 4
},
        output: 5,
        explanation: 'Exploring the graph structure, we find the required path or value. For input root=[3, 5, ..., 4] (length 11), p=5, q=4, the result is 5.'
    }
        ],
        solutions: {
            python: `def lowestCommonAncestorOfABinaryTree(data):
    """
    Lowest Common Ancestor of a Binary Tree

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

// LowestCommonAncestorOfABinaryTree solves the Lowest Common Ancestor of a Binary Tree problem.
// Time: O(n), Space: O(n)
func LowestCommonAncestorOfABinaryTree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree'] = problem;

})();
