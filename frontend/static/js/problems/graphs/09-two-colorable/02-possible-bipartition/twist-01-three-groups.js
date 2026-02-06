/**
 * Three Groups
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/02-possible-bipartition
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Groups',
        difficulty: 'Very Hard',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/02-possible-bipartition',
        description: 'Split people into three groups instead of two, such that no two people who dislike each other are in the same group.',
        problem: '3-coloring is NP-complete. You cannot use simple BFS coloring. Backtracking or constraint satisfaction is needed, fundamentally harder than bipartite checking.',
        hints: [
            'Start by understanding the key difference: 3-coloring is NP-complete.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: People 1-4, dislikes: [1-2, 2-3, 3-4, 4-1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"dislikes":[[1,2],[1,3],[2,4]]},
                output: [[0,1]],
                explanation: 'Found 1 group(s) matching the criteria.'
            },
            {
                input: {"n":3,"dislikes":[[1,2],[1,3],[2,3]]},
                output: [[0,1],[2,3]],
                explanation: 'Found 2 group(s) matching the criteria.'
            },
            // Edge case
            {
                input: {"n":0,"dislikes":[[1,2]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def three_groups(n, dislikes):
    """
    Three Groups

    Split people into three groups instead of two, such that no two people who dislike each other are in the same group.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = []
    n = len(n)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([n[i], n[j]])

    return result


# Test cases
print(three_groups(4, [[1,2],[1,3],[2,4]]))  # Expected: [[0,1]]
print(three_groups(3, [[1,2],[1,3],[2,3]]))  # Expected: [[0,1],[2,3]]
print(three_groups(0, [[1,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ThreeGroups solves the Three Groups problem.
// Split people into three groups instead of two, such that no two people who dislike each other are in the same group.
// Time: Varies - see approach, Space: Varies - see approach
func ThreeGroups(n int, dislikes [][]int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(n); i++ {
		for j := i + 1; j < len(n); j++ {
			result = append(result, []int{n[i], n[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(ThreeGroups(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // Expected: [[0,1]]
	fmt.Println(ThreeGroups(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: [[0,1],[2,3]]
	fmt.Println(ThreeGroups(0, [][]int{{1, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition/twist-01-three-groups', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition/twist-01-three-groups'] = problem;
})();
