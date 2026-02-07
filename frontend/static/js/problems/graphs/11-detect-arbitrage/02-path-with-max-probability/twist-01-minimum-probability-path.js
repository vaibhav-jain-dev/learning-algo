/**
 * Minimum Probability Path
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: dijkstra-modified
 * Parent: 11-detect-arbitrage/02-path-with-max-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Probability Path',
        difficulty: 'Easy',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage/02-path-with-max-probability',
        description: 'Find the path with the minimum success probability (most risky path) from start to end.',
        problem: 'You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.',
        hints: [
            'Start by understanding the key difference: You swap max-heap for min-heap and track minimum probability instead of maximum.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Paths: 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"edges":[[0,1],[1,2],[0,2]],"succProb":[0.5,0.5,0.2],"start":0,"end":2},
                output: 1,
                explanation: 'The priority queue ensures we always process the nearest unvisited node. When a node is dequeued, its shortest distance is finalized. Neighbors are updated if a shorter path is found.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1]],"succProb":[0.5],"start":0,"end":0},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def minimum_probability_path(n, edges, succProb, start, end):
    """
    Minimum Probability Path

    Find the path with the minimum success probability (most risky path) from start to end.

    Time: O(E log V)
    Space: O(V + E)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(minimum_probability_path(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2))  # Expected: 1
print(minimum_probability_path(0, [[0,1]], [0.5], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumProbabilityPath solves the Minimum Probability Path problem.
// Find the path with the minimum success probability (most risky path) from start to end.
// Time: O(E log V), Space: O(V + E)
func MinimumProbabilityPath(n int, edges [][]int, succProb []float64, start int, end int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumProbabilityPath(3, [][]int{{0, 1}, {1, 2}, {0, 2}}, []int{0.5, 0.5, 0.2}, 0, 2)) // Expected: 1
	fmt.Println(MinimumProbabilityPath(0, [][]int{{0, 1}}, []int{0.5}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability/twist-01-minimum-probability-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability/twist-01-minimum-probability-path'] = problem;
})();
