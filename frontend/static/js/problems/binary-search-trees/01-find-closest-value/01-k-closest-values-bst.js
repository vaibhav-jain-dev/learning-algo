/**
 * K Closest Values in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Values in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order. You are guaranteed to have only one unique set of k closest values in the BST.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n log k) or O(log n + k)',
            space: 'O(k + h)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "tree": [
                4,
                2,
                5,
                1,
                3
        ],
        "target": 3.7,
        "k": 2
},
        output: [4, 3],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, 5, 1, 3], target=3.7, k=2, the result is [4, 3].'
    },
    {
        input: {
        "tree": [
                8,
                4,
                12,
                2,
                6,
                10,
                14,
                1,
                3,
                5,
                7
        ],
        "target": 6.5,
        "k": 4
},
        output: [6, 7, 5, 8],
        explanation: 'Processing the input data produces the output. For input tree=[8, 4, ..., 7] (length 11), target=6.5, k=4, the result is [6, 7, 5, 8].'
    }
        ],
        solutions: {
            python: `def kClosestValuesInBst(data):
    """
    K Closest Values in BST

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

// KClosestValuesInBst solves the K Closest Values in BST problem.
// Time: O(n), Space: O(n)
func KClosestValuesInBst(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst'] = problem;

})();
