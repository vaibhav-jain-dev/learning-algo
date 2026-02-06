/**
 * Minimize Group Size Difference
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/02-possible-bipartition
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimize Group Size Difference',
        difficulty: 'Hard',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/02-possible-bipartition',
        description: 'If bipartition is possible, find the partition that minimizes the difference in group sizes.',
        problem: 'Each connected component has exactly 2 colorings (swap colors). You choose the coloring per component that best balances total group sizes, a subset sum variant.',
        hints: [
            'Start by understanding the key difference: Each connected component has exactly 2 colorings (swap colors).',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Component A: 3 in group 1, 7 in group 2.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"dislikes":[[1,2],[1,3],[2,4]]},
                output: true,
                explanation: 'The minimize group size difference condition is satisfied for this input.'
            },
            {
                input: {"n":3,"dislikes":[[1,2],[1,3],[2,3]]},
                output: false,
                explanation: 'The minimize group size difference condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"dislikes":[[1,2]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimize_group_size_difference(n, dislikes):
    """
    Minimize Group Size Difference

    If bipartition is possible, find the partition that minimizes the difference in group sizes.

    Time: O(V + E)
    Space: O(V + E)
    """
    j = 0

    for i in range(len(n)):
        if j < len(dislikes) and n[i] == dislikes[j]:
            j += 1

    return j == len(dislikes)


# Test cases
print(minimize_group_size_difference(4, [[1,2],[1,3],[2,4]]))  # Expected: True
print(minimize_group_size_difference(3, [[1,2],[1,3],[2,3]]))  # Expected: False
print(minimize_group_size_difference(0, [[1,2]]))  # Expected: False
`,
            go: `package main

import "fmt"

// MinimizeGroupSizeDifference solves the Minimize Group Size Difference problem.
// If bipartition is possible, find the partition that minimizes the difference in group sizes.
// Time: O(V + E), Space: O(V + E)
func MinimizeGroupSizeDifference(n int, dislikes [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(dislikes); i++ {
		if n[i] == dislikes[j] {
			j++
		}
	}

	return j == len(dislikes)
}

func main() {
	fmt.Println(MinimizeGroupSizeDifference(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // Expected: true
	fmt.Println(MinimizeGroupSizeDifference(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: false
	fmt.Println(MinimizeGroupSizeDifference(0, [][]int{{1, 2}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition/twist-02-minimize-group-size-difference', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition/twist-02-minimize-group-size-difference'] = problem;
})();
