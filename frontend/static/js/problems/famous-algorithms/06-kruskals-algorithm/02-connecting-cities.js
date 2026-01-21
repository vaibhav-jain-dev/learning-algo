/**
 * Connecting Cities With Minimum Cost
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Connecting Cities With Minimum Cost',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'There are n cities numbered from 1 to n. You are given connections where connections[i] = [city1, city2, cost] represents a bidirectional road. Return the minimum cost to connect all cities, or -1 if impossible.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log E)',
            space: 'O(n)'
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
        "n": 3,
        "connections": [
                [
                        1,
                        2,
                        5
                ],
                [
                        1,
                        3,
                        6
                ],
                [
                        2,
                        3,
                        1
                ]
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input n=3, connections=[[1, 2, 5], [1, 3, 6], [2, 3, 1]], the result is 6.'
    }
        ],
        solutions: {
            python: `def connectingCitiesWithMinimumCost(data):
    """
    Connecting Cities With Minimum Cost

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

// ConnectingCitiesWithMinimumCost solves the Connecting Cities With Minimum Cost problem.
// Time: O(n), Space: O(n)
func ConnectingCitiesWithMinimumCost(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities'] = problem;

})();
