/**
 * Network Delay Time
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay Time',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'You have a network of n nodes, labeled from 1 to n. You are given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. Return the minimum time it takes for all the n nodes to receive the signal sent from node k. Return -1 if not all nodes can receive the signal.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O((V + E) log V)',
            space: 'O(V + E)'
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
        "times": [
                [
                        2,
                        1,
                        1
                ],
                [
                        2,
                        3,
                        1
                ],
                [
                        3,
                        4,
                        1
                ]
        ],
        "n": 4,
        "k": 2
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input times=[[2, 1, 1], [2, 3, 1], [3, 4, 1]], n=4, k=2, the result is 2.'
    }
        ],
        solutions: {
            python: `def networkDelayTime(data):
    """
    Network Delay Time

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

// NetworkDelayTime solves the Network Delay Time problem.
// Time: O(n), Space: O(n)
func NetworkDelayTime(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time'] = problem;

})();
