/**
 * Clone a Weighted Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/02-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone a Weighted Graph',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/02-clone-graph',
        description: 'Clone a graph where each edge has a weight. The node structure includes neighbors as (node, weight) pairs. Preserve all weights in the clone.',
        problem: 'The data structure is more complex - you must track and copy edge weights alongside node references. The mapping must handle weighted adjacency correctly.',
        hints: [
            'Start by understanding the key difference: The data structure is more complex - you must track and copy edge weights alongside node references.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Node 1 neighbors: [(2, 5), (3, 10)].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N + E)',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"adjList":[[2,4],[1,3],[2,4],[1,3]]},
                output: [[0,1]],
                explanation: 'Found 1 group(s) matching the criteria.'
            },
            {
                input: {"adjList":[[]]},
                output: [[0,1],[2,3]],
                explanation: 'Found 2 group(s) matching the criteria.'
            },
            // Edge case
            {
                input: {"adjList":[[2,4]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def clone_a_weighted_graph(adjList):
    """
    Clone a Weighted Graph

    Clone a graph where each edge has a weight. The node structure includes neighbors as (node, weight) pairs. Preserve all weights in the clone.

    Time: O(N + E)
    Space: O(N)
    """
    result = []
    n = len(adjList)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([adjList[i], adjList[j]])

    return result


# Test cases
print(clone_a_weighted_graph([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[0,1]]
print(clone_a_weighted_graph([[]]))  # Expected: [[0,1],[2,3]]
print(clone_a_weighted_graph([[2,4]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CloneAWeightedGraph solves the Clone a Weighted Graph problem.
// Clone a graph where each edge has a weight. The node structure includes neighbors as (node, weight) pairs. Preserve all weights in the clone.
// Time: O(N + E), Space: O(N)
func CloneAWeightedGraph(adjList [][]int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(adjList); i++ {
		for j := i + 1; j < len(adjList); j++ {
			result = append(result, []int{adjList[i], adjList[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(CloneAWeightedGraph([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})) // Expected: [[0,1]]
	fmt.Println(CloneAWeightedGraph([][]int{{}})) // Expected: [[0,1],[2,3]]
	fmt.Println(CloneAWeightedGraph([][]int{{2, 4}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph/twist-02-clone-a-weighted-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph/twist-02-clone-a-weighted-graph'] = problem;
})();
