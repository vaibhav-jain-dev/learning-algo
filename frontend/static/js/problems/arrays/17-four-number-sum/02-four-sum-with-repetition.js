/**
 * Four Sum With Repetition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum With Repetition',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '17-four-number-sum',
        description: 'Given an array and a target sum, find all quadruplets where the same element can be used multiple times (with different indices treated as same).',
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
        "raw": "array = [1, 2], targetSum = 6"
},
        output: "[[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice'
    },
    {
        input: {
        "raw": "array = [2, 3], targetSum = 10"
},
        output: "[[2, 2, 3, 3]]",
        explanation: 'Given the input, the algorithm processes it to produce [[2, 2, 3, 3]]'
    }
        ],
        solutions: {
            python: `def fourSumWithRepetition(data):
    """
    Four Sum With Repetition

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

// FourSumWithRepetition solves the Four Sum With Repetition problem.
// Time: O(n), Space: O(n)
func FourSumWithRepetition(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 17-four-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum/02-four-sum-with-repetition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum/02-four-sum-with-repetition'] = problem;

})();
