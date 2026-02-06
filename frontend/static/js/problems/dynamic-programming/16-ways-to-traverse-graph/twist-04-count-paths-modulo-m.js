/**
 * Count Paths Modulo M
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Paths Modulo M',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'For very large grids, the number of paths can be enormous. Return the count modulo M (e.g., 10^9 + 7).',
        problem: 'Requires modular arithmetic throughout the DP to prevent integer overflow. Also opens the door to the combinatorial formula C(w+h-2, h-1) mod M using modular inverse.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires modular arithmetic throughout the DP to prevent integer overflow. Also opens the door to the combinatorial form',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"width":4,"height":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count paths modulo m criteria.'
            },
            {
                input: {"width":2,"height":2},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count paths modulo m criteria.'
            },
            {
                input: {"width":3,"height":3},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the count paths modulo m criteria.'
            },
            {
                input: {"width":1,"height":5},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the count paths modulo m criteria.'
            },
            // Edge case
            {
                input: {"width":0,"height":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_paths_modulo_m(width, height):
    """
    Count Paths Modulo M

    For very large grids, the number of paths can be enormous. Return the count modulo M (e.g., 10^9 + 7).

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(width)

    for i in range(n):
        # Check condition based on height
        j = 0
        for k in range(i, n):
            if j < len(height) and width[k] == height[j]:
                j += 1
        if j == len(height):
            count += 1

    return count


# Test cases
print(count_paths_modulo_m(4, 3))  # Expected: 1
print(count_paths_modulo_m(2, 2))  # Expected: 2
print(count_paths_modulo_m(3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountPathsModuloM solves the Count Paths Modulo M problem.
// For very large grids, the number of paths can be enormous. Return the count modulo M (e.g., 10^9 + 7).
// Time: O(n^2), Space: O(n)
func CountPathsModuloM(width int, height int) int {
	result := 0

	for i := 0; i < len(width); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountPathsModuloM(4, 3)) // Expected: 1
	fmt.Println(CountPathsModuloM(2, 2)) // Expected: 2
	fmt.Println(CountPathsModuloM(3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-04-count-paths-modulo-m', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-04-count-paths-modulo-m'] = problem;
})();
