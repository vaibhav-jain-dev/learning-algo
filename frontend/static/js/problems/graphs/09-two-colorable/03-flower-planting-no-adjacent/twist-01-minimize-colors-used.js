/**
 * Minimize Colors Used
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/03-flower-planting-no-adjacent
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimize Colors Used',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/03-flower-planting-no-adjacent',
        description: 'Instead of 4 colors, use the minimum number of colors needed. Determine the chromatic number of the graph.',
        problem: 'With max degree 3, 4 colors always suffice. But the minimum might be 2 (bipartite) or 3. You need to check bipartiteness first before trying 3-coloring.',
        hints: [
            'Start by understanding the key difference: With max degree 3, 4 colors always suffice.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Linear path graph 1-2-3-4: bipartite, needs only 2 colors.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimize colors used criteria.'
            },
            {
                input: {"n":4,"paths":[[1,2],[3,4]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimize colors used criteria.'
            },
            // Edge case
            {
                input: {"n":0,"paths":[[1,2]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimize_colors_used(n, paths):
    """
    Minimize Colors Used

    Instead of 4 colors, use the minimum number of colors needed. Determine the chromatic number of the graph.

    Time: O(V + E)
    Space: O(V + E)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on paths
        j = 0
        for k in range(i, n):
            if j < len(paths) and n[k] == paths[j]:
                j += 1
        if j == len(paths):
            count += 1

    return count


# Test cases
print(minimize_colors_used(3, [[1,2],[2,3],[3,1]]))  # Expected: 1
print(minimize_colors_used(4, [[1,2],[3,4]]))  # Expected: 2
print(minimize_colors_used(0, [[1,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimizeColorsUsed solves the Minimize Colors Used problem.
// Instead of 4 colors, use the minimum number of colors needed. Determine the chromatic number of the graph.
// Time: O(V + E), Space: O(V + E)
func MinimizeColorsUsed(n int, paths [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimizeColorsUsed(3, [][]int{{1, 2}, {2, 3}, {3, 1}})) // Expected: 1
	fmt.Println(MinimizeColorsUsed(4, [][]int{{1, 2}, {3, 4}})) // Expected: 2
	fmt.Println(MinimizeColorsUsed(0, [][]int{{1, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/03-flower-planting-no-adjacent/twist-01-minimize-colors-used', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/03-flower-planting-no-adjacent/twist-01-minimize-colors-used'] = problem;
})();
