/**
 * Longest Bitonic Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Bitonic Subsequence',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '16-longest-peak',
        description: 'Given an array of integers, find the length of the longest bitonic subsequence. A bitonic subsequence first increases then decreases (not necessarily contiguous).',
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
        "raw": "array = [1, 11, 2, 10, 4, 5, 2, 1]"
},
        output: "6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]",
        explanation: 'Given the input, the algorithm processes it to produce 6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "5\nExplanation: Entire array is increasing (degenerate bitonic)",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Entire array is increasing (degenerate bitonic)'
    }
        ],
        solutions: {
            python: `def longestBitonicSubsequence(data):
    """
    Longest Bitonic Subsequence

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

// LongestBitonicSubsequence solves the Longest Bitonic Subsequence problem.
// Time: O(n), Space: O(n)
func LongestBitonicSubsequence(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/03-longest-bitonic-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/03-longest-bitonic-subsequence'] = problem;

})();
