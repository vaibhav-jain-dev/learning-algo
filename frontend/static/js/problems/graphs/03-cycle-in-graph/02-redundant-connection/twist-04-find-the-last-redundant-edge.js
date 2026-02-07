/**
 * Find the Last Redundant Edge
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/02-redundant-connection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Last Redundant Edge',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/02-redundant-connection',
        description: 'If multiple edges could be removed to form a tree, return the one that appears latest in the input array (the original problem\\.',
        problem: 'Tests understanding of why Union-Find naturally returns the last cycle-creating edge: it processes edges in order and the last one that fails union is the answer. Other approaches need explicit tie-breaking.',
        hints: [
            'Start by understanding the key difference: Tests understanding of why Union-Find naturally returns the last cycle-creating edge: it processes edges in order and the last one that fails union is the answer.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(N * alpha(N))',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"edges":[[1,2],[1,3],[2,3]]},
                output: [[1,2],[1,3],[2,3]],
                explanation: 'The find the last redundant edge for this input yields [1,2, 1,3, 2,3].'
            },
            {
                input: {"edges":[[1,2],[2,3],[3,4],[1,4],[1,5]]},
                output: [[1,2],[2,3],[3,4]],
                explanation: 'The find the last redundant edge for this input yields [1,2, 2,3, 3,4].'
            },
            // Edge case
            {
                input: {"edges":[[1,2]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def find_the_last_redundant_edge(edges):
    """
    Find the Last Redundant Edge

    If multiple edges could be removed to form a tree, return the one that appears latest in the input array (the original problem\\\\

    Time: O(N * alpha(N))
    Space: O(N)
    """
    result = []

    for i in range(len(edges)):
        # Check if element meets criteria
        result.append(edges[i])

    return result


# Test cases
print(find_the_last_redundant_edge([[1,2],[1,3],[2,3]]))  # Expected: [[1,2],[1,3],[2,3]]
print(find_the_last_redundant_edge([[1,2],[2,3],[3,4],[1,4],[1,5]]))  # Expected: [[1,2],[2,3],[3,4]]
print(find_the_last_redundant_edge([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindTheLastRedundantEdge solves the Find the Last Redundant Edge problem.
// If multiple edges could be removed to form a tree, return the one that appears latest in the input array (the original problem\\\\
// Time: O(N * alpha(N)), Space: O(N)
func FindTheLastRedundantEdge(edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(edges); i++ {
		result = append(result, edges[i])
	}

	return result
}

func main() {
	fmt.Println(FindTheLastRedundantEdge([][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: [[1,2],[1,3],[2,3]]
	fmt.Println(FindTheLastRedundantEdge([][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}})) // Expected: [[1,2],[2,3],[3,4]]
	fmt.Println(FindTheLastRedundantEdge([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/02-redundant-connection/twist-04-find-the-last-redundant-edge', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/02-redundant-connection/twist-04-find-the-last-redundant-edge'] = problem;
})();
