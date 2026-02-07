/**
 * Dislike Chains
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/02-possible-bipartition
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dislike Chains',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/02-possible-bipartition',
        description: 'If person A dislikes B and B dislikes C, then A and C must be in the same group (enemy of enemy is friend). Verify this constraint.',
        problem: 'This is exactly what 2-coloring enforces, but the twist makes you think about it from a transitive constraint perspective rather than graph coloring.',
        hints: [
            'Start by understanding the key difference: This is exactly what 2-coloring enforces, but the twist makes you think about it from a transitive constraint perspective rather than graph coloring.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: 1 dislikes 2, 2 dislikes 3.',
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
                explanation: 'The dislike chains condition is satisfied for this input.'
            },
            {
                input: {"n":3,"dislikes":[[1,2],[1,3],[2,3]]},
                output: false,
                explanation: 'The dislike chains condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"dislikes":[[1,2]]},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def dislike_chains(n, dislikes):
    """
    Dislike Chains

    If person A dislikes B and B dislikes C, then A and C must be in the same group (enemy of enemy is friend). Verify this constraint.

    Time: O(V + E)
    Space: O(V + E)
    """
    j = 0

    for i in range(len(n)):
        if j < len(dislikes) and n[i] == dislikes[j]:
            j += 1

    return j == len(dislikes)


# Test cases
print(dislike_chains(4, [[1,2],[1,3],[2,4]]))  # Expected: True
print(dislike_chains(3, [[1,2],[1,3],[2,3]]))  # Expected: False
print(dislike_chains(0, [[1,2]]))  # Expected: False
`,
            go: `package main

import "fmt"

// DislikeChains solves the Dislike Chains problem.
// If person A dislikes B and B dislikes C, then A and C must be in the same group (enemy of enemy is friend). Verify this constraint.
// Time: O(V + E), Space: O(V + E)
func DislikeChains(n int, dislikes [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(dislikes); i++ {
		if n[i] == dislikes[j] {
			j++
		}
	}

	return j == len(dislikes)
}

func main() {
	fmt.Println(DislikeChains(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // Expected: true
	fmt.Println(DislikeChains(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: false
	fmt.Println(DislikeChains(0, [][]int{{1, 2}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition/twist-03-dislike-chains', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition/twist-03-dislike-chains'] = problem;
})();
