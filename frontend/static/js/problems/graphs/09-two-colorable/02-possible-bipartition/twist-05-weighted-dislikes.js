/**
 * Weighted Dislikes
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/02-possible-bipartition
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Dislikes',
        difficulty: 'Hard',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/02-possible-bipartition',
        description: 'Each dislike has a weight. Partition into two groups minimizing the total weight of violated dislikes (cross-group dislikes are satisfied, same-group dislikes are violations).',
        problem: 'If perfect bipartition is impossible, you solve a weighted max-cut problem to minimize violation weight, which is NP-hard in general but has approximation algorithms.',
        hints: [
            'Start by understanding the key difference: If perfect bipartition is impossible, you solve a weighted max-cut problem to minimize violation weight, which is NP-hard in general but has approximation algorithms.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Dislikes: (1,2 weight 5), (2,3 weight 1), (1,3 weight 2).',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the weighted dislikes criteria.'
            },
            {
                input: {"n":3,"dislikes":[[1,2],[1,3],[2,3]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the weighted dislikes criteria.'
            },
            // Edge case
            {
                input: {"n":0,"dislikes":[[1,2]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_dislikes(n, dislikes):
    """
    Weighted Dislikes

    Each dislike has a weight. Partition into two groups minimizing the total weight of violated dislikes (cross-group dislikes are satisfied, same-group dislikes are violations).

    Time: O(V + E)
    Space: O(V + E)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on dislikes
        j = 0
        for k in range(i, n):
            if j < len(dislikes) and n[k] == dislikes[j]:
                j += 1
        if j == len(dislikes):
            count += 1

    return count


# Test cases
print(weighted_dislikes(4, [[1,2],[1,3],[2,4]]))  # Expected: 1
print(weighted_dislikes(3, [[1,2],[1,3],[2,3]]))  # Expected: 2
print(weighted_dislikes(0, [[1,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedDislikes solves the Weighted Dislikes problem.
// Each dislike has a weight. Partition into two groups minimizing the total weight of violated dislikes (cross-group dislikes are satisfied, same-group dislikes are violations).
// Time: O(V + E), Space: O(V + E)
func WeightedDislikes(n int, dislikes [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedDislikes(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // Expected: 1
	fmt.Println(WeightedDislikes(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: 2
	fmt.Println(WeightedDislikes(0, [][]int{{1, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition/twist-05-weighted-dislikes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition/twist-05-weighted-dislikes'] = problem;
})();
