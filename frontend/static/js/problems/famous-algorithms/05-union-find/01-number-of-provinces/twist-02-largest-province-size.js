/**
 * Largest Province Size
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 * Parent: 05-union-find/01-number-of-provinces
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Province Size',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find/01-number-of-provinces',
        description: 'Instead of counting provinces, find the size of the largest province (most cities in a single connected group).',
        problem: 'Requires tracking component sizes during union operations, maintaining a size array that updates when sets merge.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"isConnected":[[1,1,0],[1,1,0],[0,0,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the largest province size criteria.'
            },
            // Edge case
            {
                input: {"isConnected":[[1,1,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def largest_province_size(isConnected):
    """
    Largest Province Size

    Instead of counting provinces, find the size of the largest province (most cities in a single connected group).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(isConnected)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_province_size([[1,1,0],[1,1,0],[0,0,1]]))  # Expected: 1
print(largest_province_size([[1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestProvinceSize solves the Largest Province Size problem.
// Instead of counting provinces, find the size of the largest province (most cities in a single connected group).
// Time: O(?), Space: O(?)
func LargestProvinceSize(isConnected [][]int) int {
	result := 0

	for i := 0; i < len(isConnected); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestProvinceSize([][]int{{1, 1, 0}, {1, 1, 0}, {0, 0, 1}})) // Expected: 1
	fmt.Println(LargestProvinceSize([][]int{{1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/01-number-of-provinces/twist-02-largest-province-size', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/01-number-of-provinces/twist-02-largest-province-size'] = problem;
})();
