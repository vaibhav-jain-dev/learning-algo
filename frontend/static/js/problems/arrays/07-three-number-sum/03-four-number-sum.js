/**
 * Four Number Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Number Sum',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '07-three-number-sum',
        description: 'Find all unique quadruplets in the array that sum to a target value.',
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
        "raw": "array = [7, 6, 4, -1, 1, 2], target = 16"
},
        output: "[[7, 6, 4, -1], [7, 6, 1, 2]]",
        explanation: 'Given the input, the algorithm processes it to produce [[7, 6, 4, -1], [7, 6, 1, 2]]'
    },
    {
        input: {
        "raw": "array = [1, 0, -1, 0, -2, 2], target = 0"
},
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]'
    }
        ],
        solutions: {
            python: `def fourNumberSum(data):
    """
    Four Number Sum

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

// FourNumberSum solves the Four Number Sum problem.
// Time: O(n), Space: O(n)
func FourNumberSum(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 07-three-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum'] = problem;

})();
