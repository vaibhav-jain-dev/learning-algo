/**
 * Find Duplicate Number
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Duplicate Number',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check',
        description: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array and using only constant extra space.',
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
                3,
                4,
                2,
                2
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input nums=[1, 3, 4, 2, 2], the result is 2.'
    }
        ],
        solutions: {
            python: `def findDuplicateNumber(data):
    """
    Find Duplicate Number

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

// FindDuplicateNumber solves the Find Duplicate Number problem.
// Time: O(n), Space: O(n)
func FindDuplicateNumber(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number'] = problem;

})();
