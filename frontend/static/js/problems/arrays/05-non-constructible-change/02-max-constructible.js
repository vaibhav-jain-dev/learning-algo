/**
 * Max Constructible
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Constructible',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '05-non-constructible-change',
        description: 'Given coins and a budget of K additional coins (each with value 1), find the maximum consecutive range starting from 1 that you can construct.',
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
        "raw": "coins = [1, 5, 10], budget = 2"
},
        output: "8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.",
        explanation: 'Given the input, the algorithm processes it to produce 8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.'
    },
    {
        input: {
        "raw": "coins = [1, 2, 4], budget = 0"
},
        output: "7\nExplanation: Without adding coins, can already make 1-7.",
        explanation: 'Given the input, the algorithm processes it to produce 7\nExplanation: Without adding coins, can already make 1-7.'
    }
        ],
        solutions: {
            python: `def maxConstructible(data):
    """
    Max Constructible

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

// MaxConstructible solves the Max Constructible problem.
// Time: O(n), Space: O(n)
func MaxConstructible(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/02-max-constructible', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/02-max-constructible'] = problem;

})();
