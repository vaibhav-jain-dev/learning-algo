/**
 * Minimum Removals Monotonic
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Removals Monotonic',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, find the minimum number of elements that must be removed to make the array monotonic (either entirely non-increasing or entirely non-decreasing). This is equivalent to finding the **Longest Monotonic Subsequence** and subtracting from array length.',
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
        "raw": "array = [1, 3, 2, 4, 5, 3]"
},
        output: "2\nExplanation: Remove 3 and 3 to get [1, 2, 4, 5] (non-decreasing)\n             Or remove 1, 2, 5 to get [3, 4, 3] - wait, that's not monotonic\n             Best: Remove 2 elements for [1, 2, 4, 5]",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Remove 3 and 3 to get [1, 2, 4, 5] (non-decreasing)\n             Or remove 1, 2, 5 to get [3, 4, 3] - wait, that\'s not monotonic\n             Best: Remove 2 elements for [1, 2, 4, 5]'
    },
    {
        input: {
        "raw": "array = [5, 4, 3, 2, 1]"
},
        output: "0\nExplanation: Already monotonic (non-increasing)",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: Already monotonic (non-increasing)'
    },
    {
        input: {
        "raw": "array = [1, 2, 1, 2, 1]"
},
        output: "2\nExplanation: Remove two 1s to get [1, 2, 2] or remove 2s to get [1, 1, 1]",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Remove two 1s to get [1, 2, 2] or remove 2s to get [1, 1, 1]'
    }
        ],
        solutions: {
            python: `def minimumRemovalsMonotonic(data):
    """
    Minimum Removals Monotonic

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

// MinimumRemovalsMonotonic solves the Minimum Removals Monotonic problem.
// Time: O(n), Space: O(n)
func MinimumRemovalsMonotonic(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 10-monotonic-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/02-minimum-removals-monotonic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/02-minimum-removals-monotonic'] = problem;

})();
