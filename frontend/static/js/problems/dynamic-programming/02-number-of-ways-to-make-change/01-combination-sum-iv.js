/**
 * Combination Sum IV
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Combination Sum IV',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'Given an array of **distinct** integers nums and a target integer target, return the number of possible combinations that add up to target. **Note:** The different sequences are counted as different combinations (this is counting **permutations**, not combinations).',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(target * n)',
            space: 'O(target)'
        },
        hints: [
            'Define the state: what does dp[i][j] represent?',
            'Identify the base cases (usually dp[0][...] and dp[...][0]).',
            'Write the recurrence relation for dp[i][j].',
            'Determine the iteration order to ensure dependencies are computed first.',
            'Consider space optimization if only previous row/column is needed.'
        ],
        examples: [
    {
        input: {
        "nums": [
                1,
                2,
                3
        ],
        "target": 4
},
        output: 7,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3], target=4, the result is 7.'
    },
    {
        input: {
        "nums": [
                9
        ],
        "target": 3
},
        output: 0,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[9], target=3, the result is 0.'
    }
        ],
        solutions: {
            python: `def combinationSumIv(data):
    """
    Combination Sum IV

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

// CombinationSumIv solves the Combination Sum IV problem.
// Time: O(n), Space: O(n)
func CombinationSumIv(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv'] = problem;

})();
