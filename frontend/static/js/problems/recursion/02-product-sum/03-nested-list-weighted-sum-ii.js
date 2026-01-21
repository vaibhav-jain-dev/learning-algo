/**
 * Nested List Weighted Sum II
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nested List Weighted Sum II',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested list of integers, return the sum of all integers weighted by their depth. Unlike the regular product sum where deeper elements have higher weight, here the weight is the **inverse** - elements at the maximum depth have weight 1, and the weight increases as you go shallower. In other words, if the maximum depth is maxDepth, an element at depth d has weight (maxDepth - d + 1).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
        "array": [
                [
                        1,
                        1
                ],
                2,
                [
                        1,
                        1
                ]
        ]
},
        output: 8,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 1], 2, [1, 1]], the result is 8.'
    }
        ],
        solutions: {
            python: `def nestedListWeightedSumIi(data):
    """
    Nested List Weighted Sum II

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

// NestedListWeightedSumIi solves the Nested List Weighted Sum II problem.
// Time: O(n), Space: O(n)
func NestedListWeightedSumIi(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii'] = problem;

})();
