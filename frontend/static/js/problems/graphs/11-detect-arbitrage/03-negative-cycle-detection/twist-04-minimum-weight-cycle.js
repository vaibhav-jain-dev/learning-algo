/**
 * Minimum Weight Cycle
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: bellman-ford
 * Parent: 11-detect-arbitrage/03-negative-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Weight Cycle',
        difficulty: 'Very Hard',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage/03-negative-cycle-detection',
        description: 'Find the cycle with the minimum total weight in the graph (whether negative or not).',
        problem: 'Bellman-Ford detects any negative cycle but not the minimum one. Finding the minimum weight cycle requires running shortest path from each node and checking all back edges.',
        hints: [
            'Start by understanding the key difference: Bellman-Ford detects any negative cycle but not the minimum one.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Cycles: [0,1,0] weight 4, [1,2,3,1] weight -2, [0,1,2,0] weight 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"edges":[[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum weight cycle criteria.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_weight_cycle(n, edges):
    """
    Minimum Weight Cycle

    Find the cycle with the minimum total weight in the graph (whether negative or not).

    Time: Varies - see approach
    Space: Varies - see approach
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
print(minimum_weight_cycle(4, [[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]))  # Expected: 1
print(minimum_weight_cycle(0, [[0,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumWeightCycle solves the Minimum Weight Cycle problem.
// Find the cycle with the minimum total weight in the graph (whether negative or not).
// Time: Varies - see approach, Space: Varies - see approach
func MinimumWeightCycle(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumWeightCycle(4, [][]int{{0, 1, 1}, {1, 2, -3}, {2, 3, 2}, {3, 1, 1}})) // Expected: 1
	fmt.Println(MinimumWeightCycle(0, [][]int{{0, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection/twist-04-minimum-weight-cycle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection/twist-04-minimum-weight-cycle'] = problem;
})();
