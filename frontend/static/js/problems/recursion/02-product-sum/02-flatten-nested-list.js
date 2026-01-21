/**
 * Flatten Nested List
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Nested List',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given a nested list of integers, flatten it into a single-level list containing all the integers in the same order. This is a common operation when working with nested data structures and demonstrates recursive traversal.',
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
                [
                        1,
                        2
                ],
                [
                        3,
                        [
                                4,
                                5
                        ]
                ],
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 2], [3, [4, 5]], 6], the result is [1, ..., 6] (length 6).'
    }
        ],
        solutions: {
            python: `def flattenNestedList(data):
    """
    Flatten Nested List

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

// FlattenNestedList solves the Flatten Nested List problem.
// Time: O(n), Space: O(n)
func FlattenNestedList(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list'] = problem;

})();
