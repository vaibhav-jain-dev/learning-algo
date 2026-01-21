/**
 * Circular Array Loop
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: fast-slow-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Array Loop',
        difficulty: 'Medium',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check',
        description: 'You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i: - If nums[i] is positive, move nums[i] steps forward - If nums[i] is negative, move |nums[i]| steps backward Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element. A cycle in the arr',
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
                2,
                -1,
                1,
                2,
                2
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input nums=[2, -1, 1, 2, 2], the result is true.'
    }
        ],
        solutions: {
            python: `def circularArrayLoop(data):
    """
    Circular Array Loop

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

// CircularArrayLoop solves the Circular Array Loop problem.
// Time: O(n), Space: O(n)
func CircularArrayLoop(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop'] = problem;

})();
