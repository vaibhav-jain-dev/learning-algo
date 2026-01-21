/**
 * Path with Maximum Probability
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: dijkstra-modified
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path with Maximum Probability',
        difficulty: 'Medium',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage',
        description: 'You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting nodes a and b with a probability of success of traversing that edge succProb[i]. Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability. If there is no path from start to end, return 0.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log V)',
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
        "n": 3,
        "edges": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        0,
                        2
                ]
        ],
        "succProb": [
                0.5,
                0.5,
                0.2
        ],
        "start": 0,
        "end": 2
},
        output: 0.25,
        explanation: 'Processing the input data produces the output. For input n=3, edges=[[0, 1], [1, 2], [0, 2]], succProb=[0.5, 0.5, 0.2], start=0, end=2, the result is 0.25.'
    }
        ],
        solutions: {
            python: `def pathWithMaximumProbability(data):
    """
    Path with Maximum Probability

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

// PathWithMaximumProbability solves the Path with Maximum Probability problem.
// Time: O(n), Space: O(n)
func PathWithMaximumProbability(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability'] = problem;

})();
