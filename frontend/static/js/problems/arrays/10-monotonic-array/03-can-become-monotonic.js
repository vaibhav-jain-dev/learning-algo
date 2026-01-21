/**
 * Can Become Monotonic
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Can Become Monotonic',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, determine if it can become monotonic by changing **at most one** element to any value. An array is monotonic if it is either entirely non-increasing or entirely non-decreasing.',
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
        "raw": "array = [1, 5, 3, 4, 5]"
},
        output: "true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "true\nExplanation: Already monotonic",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Already monotonic'
    },
    {
        input: {
        "raw": "array = [4, 2, 3, 1]"
},
        output: "false\nExplanation: Need to change more than one element",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Need to change more than one element'
    },
    {
        input: {
        "raw": "array = [3, 4, 2, 3]"
},
        output: "false\nExplanation: Even changing one element can't make it monotonic",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Even changing one element can\'t make it monotonic'
    }
        ],
        solutions: {
            python: `def canBecomeMonotonic(data):
    """
    Can Become Monotonic

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

// CanBecomeMonotonic solves the Can Become Monotonic problem.
// Time: O(n), Space: O(n)
func CanBecomeMonotonic(data interface{}) interface{} {
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
        window.ProblemRenderer.register('arrays', '10-monotonic-array/03-can-become-monotonic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/03-can-become-monotonic'] = problem;

})();
