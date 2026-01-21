/**
 * K Smallest Differences
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Smallest Differences',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '08-smallest-difference',
        description: 'Given two sorted arrays of integers arr1 and arr2, and an integer k, find the K pairs with the smallest absolute differences between them. Each pair should consist of one element from arr1 and one element from arr2. Return the pairs sorted by their absolute difference in ascending order. If there are multiple pairs with the same difference, they can be returned in any order.',
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
        "raw": "arr1 = [1, 3, 5], arr2 = [2, 4], k = 3"
},
        output: "[[1, 2], [3, 2], [3, 4]]\nExplanation:\n  - |1 - 2| = 1\n  - |3 - 2| = 1\n  - |3 - 4| = 1\n  All three pairs have difference 1.",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 2], [3, 2], [3, 4]]\nExplanation:\n  - |1 - 2| = 1\n  - |3 - 2| = 1\n  - |3 - 4| = 1\n  All three pairs have difference 1.'
    },
    {
        input: {
        "raw": "arr1 = [1, 7, 11], arr2 = [2, 4, 6], k = 4"
},
        output: "[[1, 2], [1, 4], [7, 6], [1, 6]]\nExplanation:\n  - |1 - 2| = 1\n  - |1 - 4| = 3\n  - |7 - 6| = 1\n  - |1 - 6| = 5\n  Sorted by difference: [[1, 2], [7, 6], [1, 4], [1, 6]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 2], [1, 4], [7, 6], [1, 6]]\nExplanation:\n  - |1 - 2| = 1\n  - |1 - 4| = 3\n  - |7 - 6| = 1\n  - |1 - 6| = 5\n  Sorted by difference: [[1, 2], [7, 6], [1, 4], [1, 6]]'
    },
    {
        input: {
        "raw": "arr1 = [1, 2], arr2 = [3], k = 2"
},
        output: "[[2, 3], [1, 3]]\nExplanation:\n  - |2 - 3| = 1\n  - |1 - 3| = 2",
        explanation: 'Given the input, the algorithm processes it to produce [[2, 3], [1, 3]]\nExplanation:\n  - |2 - 3| = 1\n  - |1 - 3| = 2'
    }
        ],
        solutions: {
            python: `def kSmallestDifferences(data):
    """
    K Smallest Differences

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

// KSmallestDifferences solves the K Smallest Differences problem.
// Time: O(n), Space: O(n)
func KSmallestDifferences(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 08-smallest-difference
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/01-k-smallest-differences', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/01-k-smallest-differences'] = problem;

})();
