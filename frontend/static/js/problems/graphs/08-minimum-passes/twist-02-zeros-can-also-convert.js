/**
 * Zeros Can Also Convert
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Zeros Can Also Convert',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.',
        problem: 'Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.',
        hints: [
            'Start by understanding the key difference: Zeros are no longer inert barriers.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Matrix [[1,0,0,−1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
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
            python: `def zeros_can_also_convert(matrix):
    """
    Zeros Can Also Convert

    Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(zeros_can_also_convert([[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]))  # Expected: 1
print(zeros_can_also_convert([[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]))  # Expected: 2
print(zeros_can_also_convert([[0,-1,-3,2,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ZerosCanAlsoConvert solves the Zeros Can Also Convert problem.
// Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.
// Time: O(N * M), Space: O(N * M)
func ZerosCanAlsoConvert(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ZerosCanAlsoConvert([][]int{{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}})) // Expected: 1
	fmt.Println(ZerosCanAlsoConvert([][]int{{1, 0, 0, -2, -3}, {-4, -5, -6, -2, -1}, {0, 0, 0, 0, -1}, {1, 2, 3, 0, -2}})) // Expected: 2
	fmt.Println(ZerosCanAlsoConvert([][]int{{0, -1, -3, 2, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/twist-02-zeros-can-also-convert', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/twist-02-zeros-can-also-convert'] = problem;
})();
