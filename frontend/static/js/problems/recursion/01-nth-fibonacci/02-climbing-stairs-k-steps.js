/**
 * Climbing Stairs with K Steps
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 */
(function() {
    'use strict';

    const problem = {
        name: 'Climbing Stairs with K Steps',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 to k steps. In how many distinct ways can you climb to the top? This is a generalization of the classic "Climbing Stairs" problem where you can take 1 or 2 steps.',
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
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
        "n": 4,
        "k": 2
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=4, k=2, the result is 5.'
    }
        ],
        solutions: {
            python: `def climbingStairsWithKSteps(data):
    """
    Climbing Stairs with K Steps

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

// ClimbingStairsWithKSteps solves the Climbing Stairs with K Steps problem.
// Time: O(n), Space: O(n)
func ClimbingStairsWithKSteps(data interface{}) interface{} {
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps'] = problem;

})();
