/**
 * Move Element Preserve Order
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Element Preserve Order',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a target value, move all instances of the target value to the end of the array while **preserving the relative order** of the non-target elements. The function should modify the array in place and return it.',
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
        "raw": "array = [2, 1, 2, 3, 2, 4], toMove = 2"
},
        output: "[1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved",
        explanation: 'Given the input, the algorithm processes it to produce [1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5], toMove = 3"
},
        output: "[1, 2, 4, 5, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 4, 5, 3]'
    },
    {
        input: {
        "raw": "array = [2, 2, 2], toMove = 2"
},
        output: "[2, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [2, 2, 2]'
    }
        ],
        solutions: {
            python: `def moveElementPreserveOrder(data):
    """
    Move Element Preserve Order

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

// MoveElementPreserveOrder solves the Move Element Preserve Order problem.
// Time: O(n), Space: O(n)
func MoveElementPreserveOrder(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 09-move-element-to-end
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order'] = problem;

})();
