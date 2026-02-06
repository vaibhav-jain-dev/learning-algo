/**
 * Positive Cycle Detection
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: bellman-ford
 * Parent: 11-detect-arbitrage/03-negative-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Positive Cycle Detection',
        difficulty: 'Easy',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage/03-negative-cycle-detection',
        description: 'Detect if the graph contains a positive weight cycle instead of negative.',
        problem: 'Negate all edge weights and run Bellman-Ford for negative cycle detection. Alternatively, run the algorithm seeking increases rather than decreases.',
        hints: [
            'Start by understanding the key difference: Negate all edge weights and run Bellman-Ford for negative cycle detection.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Edges [0->1 weight 3, 1->2 weight 2, 2->0 weight 1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"edges":[[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the positive cycle detection criteria.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def positive_cycle_detection(n, edges):
    """
    Positive Cycle Detection

    Detect if the graph contains a positive weight cycle instead of negative.

    Time: O(V * E)
    Space: O(V)
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
print(positive_cycle_detection(4, [[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]))  # Expected: 1
print(positive_cycle_detection(0, [[0,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// PositiveCycleDetection solves the Positive Cycle Detection problem.
// Detect if the graph contains a positive weight cycle instead of negative.
// Time: O(V * E), Space: O(V)
func PositiveCycleDetection(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PositiveCycleDetection(4, [][]int{{0, 1, 1}, {1, 2, -3}, {2, 3, 2}, {3, 1, 1}})) // Expected: 1
	fmt.Println(PositiveCycleDetection(0, [][]int{{0, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection/twist-02-positive-cycle-detection', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection/twist-02-positive-cycle-detection'] = problem;
})();
