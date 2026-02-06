/**
 * All Descendants Instead
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/03-ancestors-in-dag
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Descendants Instead',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/03-ancestors-in-dag',
        description: 'Instead of finding ancestors of each node, find all descendants of each node in the DAG.',
        problem: 'You reverse the direction of propagation. Instead of tracing backward from each node, you trace forward, requiring a different traversal order.',
        hints: [
            'Start by understanding the key difference: You reverse the direction of propagation.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: DAG with edges [0->3,0->4,1->3].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N^2 + N * E)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":8,"edges":[[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]},
                output: [[0,3],[0,4],[1,3]],
                explanation: 'The all descendants instead for this input yields [0,3, 0,4, 1,3].'
            },
            {
                input: {"n":5,"edges":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]},
                output: [[0,1],[0,2],[0,3]],
                explanation: 'The all descendants instead for this input yields [0,1, 0,2, 0,3].'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,3]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_descendants_instead(n, edges):
    """
    All Descendants Instead

    Instead of finding ancestors of each node, find all descendants of each node in the DAG.

    Time: O(N^2 + N * E)
    Space: O(N^2)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(all_descendants_instead(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]))  # Expected: [[0,3],[0,4],[1,3]]
print(all_descendants_instead(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]))  # Expected: [[0,1],[0,2],[0,3]]
print(all_descendants_instead(0, [[0,3]]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllDescendantsInstead solves the All Descendants Instead problem.
// Instead of finding ancestors of each node, find all descendants of each node in the DAG.
// Time: O(N^2 + N * E), Space: O(N^2)
func AllDescendantsInstead(n int, edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(AllDescendantsInstead(8, [][]int{{0, 3}, {0, 4}, {1, 3}, {2, 4}, {2, 7}, {3, 5}, {3, 6}, {3, 7}, {4, 6}})) // Expected: [[0,3],[0,4],[1,3]]
	fmt.Println(AllDescendantsInstead(5, [][]int{{0, 1}, {0, 2}, {0, 3}, {0, 4}, {1, 2}, {1, 3}, {1, 4}, {2, 3}, {2, 4}, {3, 4}})) // Expected: [[0,1],[0,2],[0,3]]
	fmt.Println(AllDescendantsInstead(0, [][]int{{0, 3}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/03-ancestors-in-dag/twist-01-all-descendants-instead', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/03-ancestors-in-dag/twist-01-all-descendants-instead'] = problem;
})();
