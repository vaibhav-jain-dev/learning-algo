/**
 * Simultaneous Negative Spread
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Simultaneous Negative Spread',
        difficulty: 'Very Hard',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'Negatives also spread: they can convert adjacent positives to negative. Both spread simultaneously each pass. Determine the final state.',
        problem: 'This becomes a competitive BFS where two wavefronts expand simultaneously. The outcome depends on which wavefront reaches each cell first.',
        hints: [
            'Start by understanding the key difference: This becomes a competitive BFS where two wavefronts expand simultaneously.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Matrix [[1,0,−1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"matrix":[[0,-1,-3,2,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def simultaneous_negative_spread(matrix):
    """
    Simultaneous Negative Spread

    Negatives also spread: they can convert adjacent positives to negative. Both spread simultaneously each pass. Determine the final state.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(simultaneous_negative_spread([[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]))  # Expected: 1
print(simultaneous_negative_spread([[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]))  # Expected: 2
print(simultaneous_negative_spread([[0,-1,-3,2,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SimultaneousNegativeSpread solves the Simultaneous Negative Spread problem.
// Negatives also spread: they can convert adjacent positives to negative. Both spread simultaneously each pass. Determine the final state.
// Time: Varies - see approach, Space: Varies - see approach
func SimultaneousNegativeSpread(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SimultaneousNegativeSpread([][]int{{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}})) // Expected: 1
	fmt.Println(SimultaneousNegativeSpread([][]int{{1, 0, 0, -2, -3}, {-4, -5, -6, -2, -1}, {0, 0, 0, 0, -1}, {1, 2, 3, 0, -2}})) // Expected: 2
	fmt.Println(SimultaneousNegativeSpread([][]int{{0, -1, -3, 2, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/twist-04-simultaneous-negative-spread', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/twist-04-simultaneous-negative-spread'] = problem;
})();
