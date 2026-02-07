/**
 * Dynamic Dislikes
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/02-possible-bipartition
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dynamic Dislikes',
        difficulty: 'Hard',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/02-possible-bipartition',
        description: 'Dislike pairs are added one at a time. After each addition, report if bipartition is still possible.',
        problem: 'Online bipartiteness checking requires Union-Find with complementary sets. When adding edge (a,b), you union a with complement of b and vice versa.',
        hints: [
            'Start by understanding the key difference: Online bipartiteness checking requires Union-Find with complementary sets.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Add dislike (1,2): possible.',
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
                output: [[0,1]],
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"n":3,"dislikes":[[1,2],[1,3],[2,3]]},
                output: [[0,1],[2,3]],
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"n":0,"dislikes":[[1,2]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def dynamic_dislikes(n, dislikes):
    """
    Dynamic Dislikes

    Dislike pairs are added one at a time. After each addition, report if bipartition is still possible.

    Time: O(V + E)
    Space: O(V + E)
    """
    result = []
    n = len(n)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([n[i], n[j]])

    return result


# Test cases
print(dynamic_dislikes(4, [[1,2],[1,3],[2,4]]))  # Expected: [[0,1]]
print(dynamic_dislikes(3, [[1,2],[1,3],[2,3]]))  # Expected: [[0,1],[2,3]]
print(dynamic_dislikes(0, [[1,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DynamicDislikes solves the Dynamic Dislikes problem.
// Dislike pairs are added one at a time. After each addition, report if bipartition is still possible.
// Time: O(V + E), Space: O(V + E)
func DynamicDislikes(n int, dislikes [][]int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(n); i++ {
		for j := i + 1; j < len(n); j++ {
			result = append(result, []int{n[i], n[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(DynamicDislikes(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // Expected: [[0,1]]
	fmt.Println(DynamicDislikes(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: [[0,1],[2,3]]
	fmt.Println(DynamicDislikes(0, [][]int{{1, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition/twist-04-dynamic-dislikes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition/twist-04-dynamic-dislikes'] = problem;
})();
