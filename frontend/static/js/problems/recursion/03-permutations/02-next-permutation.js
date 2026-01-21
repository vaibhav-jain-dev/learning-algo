/**
 * Next Permutation
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Permutation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. If the array is already at its largest permutation, rearrange it to the smallest permutation (sorted in ascending order). The replacement must be in place and use only constant extra memory.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
        "nums": [
                1,
                2,
                3
        ]
},
        output: [1, 3, 2],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 2, 3], the result is [1, 3, 2].'
    }
        ],
        solutions: {
            python: `def nextPermutation(data):
    """
    Next Permutation

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

// NextPermutation solves the Next Permutation problem.
// Time: O(n), Space: O(n)
func NextPermutation(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation'] = problem;

})();
