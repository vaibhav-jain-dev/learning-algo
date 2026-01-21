/**
 * Maximum Depth of Nested Arrays
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Depth of Nested Arrays',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested array (which can contain integers or other nested arrays), return the maximum depth of nesting. The depth of a non-nested array is 1. An empty array has depth 1.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(d)'
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
                1,
                [
                        2,
                        [
                                3,
                                4
                        ]
                ]
        ]
},
        output: 3,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, [2, [3, 4]]], the result is 3.'
    }
        ],
        solutions: {
            python: `def maximumDepthOfNestedArrays(data):
    """
    Maximum Depth of Nested Arrays

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

// MaximumDepthOfNestedArrays solves the Maximum Depth of Nested Arrays problem.
// Time: O(n), Space: O(n)
func MaximumDepthOfNestedArrays(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth'] = problem;

})();
