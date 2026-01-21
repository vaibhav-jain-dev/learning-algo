/**
 * Count Distinct Ranges
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorting
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Ranges',
        difficulty: 'Medium',
        algorithm: 'sorting',
        parent: '19-largest-range',
        description: 'Given an unsorted array of integers, count the number of distinct consecutive ranges. A consecutive range is a sequence of consecutive integers. For example, [1, 2, 3] forms one range, [5, 6] forms another range.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n log n)',
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
                2,
                3,
                5,
                6,
                8,
                10,
                11,
                12
        ]
},
        output: 4,
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input nums=[1, 2, ..., 12] (length 9), the result is 4.'
    }
        ],
        solutions: {
            python: `def countDistinctRanges(data):
    """
    Count Distinct Ranges

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

// CountDistinctRanges solves the Count Distinct Ranges problem.
// Time: O(n), Space: O(n)
func CountDistinctRanges(data interface{}) interface{} {
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
        window.ProblemRenderer.register('arrays', '19-largest-range/02-count-distinct-ranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/02-count-distinct-ranges'] = problem;

})();
