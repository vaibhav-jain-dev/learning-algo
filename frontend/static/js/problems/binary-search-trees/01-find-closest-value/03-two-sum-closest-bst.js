/**
 * Two Sum Closest in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree and a target value, find two nodes in the BST such that their **sum is closest to the target**. Return the two values. If there are multiple pairs with the same closest sum, return any one of them.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) or O(h) with iterators'
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
                10,
                5,
                15,
                2,
                7,
                12,
                20
        ],
        "target": 22
},
        output: [7, 15],
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 20] (length 7), target=22, the result is [7, 15].'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                1,
                4,
                6,
                8
        ],
        "target": 10
},
        output: [3, 7],
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=10, the result is [3, 7].'
    }
        ],
        solutions: {
            python: `def twoSumClosestInBst(data):
    """
    Two Sum Closest in BST

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

// TwoSumClosestInBst solves the Two Sum Closest in BST problem.
// Time: O(n), Space: O(n)
func TwoSumClosestInBst(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst'] = problem;

})();
