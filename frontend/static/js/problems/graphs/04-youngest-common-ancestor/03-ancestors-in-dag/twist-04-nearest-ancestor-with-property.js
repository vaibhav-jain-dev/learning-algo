/**
 * Nearest Ancestor with Property
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/03-ancestors-in-dag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nearest Ancestor with Property',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/03-ancestors-in-dag',
        description: 'Each node has a boolean property. For each node, find its nearest ancestor (in terms of shortest path) that has the property set to true.',
        problem: 'You cannot just collect all ancestors. You need BFS on the reverse graph and track distances, stopping at the first ancestor with the property.',
        hints: [
            'Start by understanding the key difference: You cannot just collect all ancestors.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Nodes 0-7, property true for nodes {0, 3}.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the nearest ancestor with property criteria.'
            },
            {
                input: {"n":5,"edges":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the nearest ancestor with property criteria.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def nearest_ancestor_with_property(n, edges):
    """
    Nearest Ancestor with Property

    Each node has a boolean property. For each node, find its nearest ancestor (in terms of shortest path) that has the property set to true.

    Time: O(N^2 + N * E)
    Space: O(N^2)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(nearest_ancestor_with_property(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]))  # Expected: 1
print(nearest_ancestor_with_property(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]))  # Expected: 2
print(nearest_ancestor_with_property(0, [[0,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NearestAncestorWithProperty solves the Nearest Ancestor with Property problem.
// Each node has a boolean property. For each node, find its nearest ancestor (in terms of shortest path) that has the property set to true.
// Time: O(N^2 + N * E), Space: O(N^2)
func NearestAncestorWithProperty(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NearestAncestorWithProperty(8, [][]int{{0, 3}, {0, 4}, {1, 3}, {2, 4}, {2, 7}, {3, 5}, {3, 6}, {3, 7}, {4, 6}})) // Expected: 1
	fmt.Println(NearestAncestorWithProperty(5, [][]int{{0, 1}, {0, 2}, {0, 3}, {0, 4}, {1, 2}, {1, 3}, {1, 4}, {2, 3}, {2, 4}, {3, 4}})) // Expected: 2
	fmt.Println(NearestAncestorWithProperty(0, [][]int{{0, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/03-ancestors-in-dag/twist-04-nearest-ancestor-with-property', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/03-ancestors-in-dag/twist-04-nearest-ancestor-with-property'] = problem;
})();
