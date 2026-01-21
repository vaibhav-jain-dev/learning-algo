/**
 * Dutch National Flag
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dutch National Flag',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a pivot value, partition the array into three sections: 1. All elements **less than** the pivot 2. All elements **equal to** the pivot 3. All elements **greater than** the pivot This is known as the "Dutch National Flag" problem, named after the Dutch flag which has three horizontal stripes.',
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
        "raw": "array = [2, 0, 1, 2, 1, 0], pivot = 1"
},
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 0, 1, 1, 2, 2]'
    },
    {
        input: {
        "raw": "array = [1, 4, 2, 5, 3, 6], pivot = 3"
},
        output: "[1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])'
    },
    {
        input: {
        "raw": "array = [3, 3, 3, 3], pivot = 3"
},
        output: "[3, 3, 3, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [3, 3, 3, 3]'
    }
        ],
        solutions: {
            python: `def dutchNationalFlag(data):
    """
    Dutch National Flag

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

// DutchNationalFlag solves the Dutch National Flag problem.
// Time: O(n), Space: O(n)
func DutchNationalFlag(data interface{}) interface{} {
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
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag'] = problem;

})();
