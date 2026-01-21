/**
 * Longest Monotonic Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic Subarray',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, find the length of the longest **contiguous** subarray that is monotonic (either entirely non-increasing or entirely non-decreasing).',
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
        "raw": "array = [1, 4, 3, 2, 5, 6, 7]"
},
        output: "4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4'
    },
    {
        input: {
        "raw": "array = [5, 4, 3, 2, 1]"
},
        output: "5\nExplanation: The entire array is non-increasing",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: The entire array is non-increasing'
    },
    {
        input: {
        "raw": "array = [1, 2, 2, 3, 1]"
},
        output: "4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing'
    }
        ],
        solutions: {
            python: `def longestMonotonicSubarray(data):
    """
    Longest Monotonic Subarray

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

// LongestMonotonicSubarray solves the Longest Monotonic Subarray problem.
// Time: O(n), Space: O(n)
func LongestMonotonicSubarray(data interface{}) interface{} {
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
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray'] = problem;

})();
