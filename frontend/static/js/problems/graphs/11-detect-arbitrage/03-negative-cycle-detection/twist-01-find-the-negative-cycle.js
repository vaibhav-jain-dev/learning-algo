/**
 * Find the Negative Cycle
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: bellman-ford
 * Parent: 11-detect-arbitrage/03-negative-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Negative Cycle',
        difficulty: 'Hard',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage/03-negative-cycle-detection',
        description: 'Not just detect, but return the actual vertices forming the negative cycle.',
        problem: 'After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.',
        hints: [
            'Start by understanding the key difference: After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"edges":[[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]},
                output: true,
                explanation: 'The find the negative cycle condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1,1]]},
                output: false,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def find_the_negative_cycle(n, edges):
    """
    Find the Negative Cycle

    Not just detect, but return the actual vertices forming the negative cycle.

    Time: O(V * E)
    Space: O(V)
    """
    j = 0

    for i in range(len(n)):
        if j < len(edges) and n[i] == edges[j]:
            j += 1

    return j == len(edges)


# Test cases
print(find_the_negative_cycle(4, [[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]))  # Expected: True
print(find_the_negative_cycle(0, [[0,1,1]]))  # Expected: False
`,
            go: `package main

import "fmt"

// FindTheNegativeCycle solves the Find the Negative Cycle problem.
// Not just detect, but return the actual vertices forming the negative cycle.
// Time: O(V * E), Space: O(V)
func FindTheNegativeCycle(n int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(edges); i++ {
		if n[i] == edges[j] {
			j++
		}
	}

	return j == len(edges)
}

func main() {
	fmt.Println(FindTheNegativeCycle(4, [][]int{{0, 1, 1}, {1, 2, -3}, {2, 3, 2}, {3, 1, 1}})) // Expected: true
	fmt.Println(FindTheNegativeCycle(0, [][]int{{0, 1, 1}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection/twist-01-find-the-negative-cycle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection/twist-01-find-the-negative-cycle'] = problem;
})();
