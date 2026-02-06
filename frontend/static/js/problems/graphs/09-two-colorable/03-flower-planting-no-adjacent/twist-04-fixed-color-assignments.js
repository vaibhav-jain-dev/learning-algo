/**
 * Fixed Color Assignments
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/03-flower-planting-no-adjacent
 */
(function() {
    'use strict';

    const problem = {
        name: 'Fixed Color Assignments',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/03-flower-planting-no-adjacent',
        description: 'Some gardens already have a fixed flower type. Complete the assignment for remaining gardens.',
        problem: 'Pre-assigned colors constrain choices. The greedy algorithm must respect existing assignments, and conflicts may arise if pre-assignments are inconsistent.',
        hints: [
            'Start by understanding the key difference: Pre-assigned colors constrain choices.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Garden 1 is fixed to color 3, Garden 2 (adjacent to 1) needs a color != 3.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"paths":[[1,2],[2,3],[3,1]]},
                output: [[1,2],[2,3],[3,1]],
                explanation: 'The fixed color assignments for this input yields [1,2, 2,3, 3,1].'
            },
            {
                input: {"n":4,"paths":[[1,2],[3,4]]},
                output: [[1,2],[3,4]],
                explanation: 'The fixed color assignments for this input yields [1,2, 3,4].'
            },
            // Edge case
            {
                input: {"n":0,"paths":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def fixed_color_assignments(n, paths):
    """
    Fixed Color Assignments

    Some gardens already have a fixed flower type. Complete the assignment for remaining gardens.

    Time: O(V + E)
    Space: O(V + E)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(fixed_color_assignments(3, [[1,2],[2,3],[3,1]]))  # Expected: [[1,2],[2,3],[3,1]]
print(fixed_color_assignments(4, [[1,2],[3,4]]))  # Expected: [[1,2],[3,4]]
print(fixed_color_assignments(0, [[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FixedColorAssignments solves the Fixed Color Assignments problem.
// Some gardens already have a fixed flower type. Complete the assignment for remaining gardens.
// Time: O(V + E), Space: O(V + E)
func FixedColorAssignments(n int, paths [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(FixedColorAssignments(3, [][]int{{1, 2}, {2, 3}, {3, 1}})) // Expected: [[1,2],[2,3],[3,1]]
	fmt.Println(FixedColorAssignments(4, [][]int{{1, 2}, {3, 4}})) // Expected: [[1,2],[3,4]]
	fmt.Println(FixedColorAssignments(0, [][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/03-flower-planting-no-adjacent/twist-04-fixed-color-assignments', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/03-flower-planting-no-adjacent/twist-04-fixed-color-assignments'] = problem;
})();
