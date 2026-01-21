/**
 * House Robber II
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'House Robber II',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**. Given an integer array nums representing the amount of money of each house, return the maximum am',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
                2,
                3,
                2
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[2, 3, 2], the result is 3.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                1
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3, 1], the result is 4.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3], the result is 3.'
    }
        ],
        solutions: {
            python: `def houseRobberIi(data):
    """
    House Robber II

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

// HouseRobberIi solves the House Robber II problem.
// Time: O(n), Space: O(n)
func HouseRobberIi(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii'] = problem;

})();
