/**
 * Longest Consecutive with Gap K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: hash-set
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Consecutive with Gap K',
        difficulty: 'Medium',
        algorithm: 'hash-set',
        parent: '19-largest-range',
        description: 'Given an unsorted array of integers nums and a positive integer k, find the length of the longest sequence where consecutive elements differ by exactly k. Unlike the classic longest consecutive sequence problem (where the gap is 1), this variant requires finding sequences with a custom gap value.',
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
        "nums": [
                1,
                3,
                5,
                7,
                9,
                2,
                4
        ],
        "k": 2
},
        output: 5,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 3, ..., 4] (length 7), k=2, the result is 5.'
    }
        ],
        solutions: {
            python: `def longestConsecutiveWithGapK(data):
    """
    Longest Consecutive with Gap K

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

// LongestConsecutiveWithGapK solves the Longest Consecutive with Gap K problem.
// Time: O(n), Space: O(n)
func LongestConsecutiveWithGapK(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 19-largest-range
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range/01-longest-consecutive-gap-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/01-longest-consecutive-gap-k'] = problem;

})();
