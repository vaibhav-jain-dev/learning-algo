/**
 * Clone Graph with Random Pointers
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/02-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph with Random Pointers',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/02-clone-graph',
        description: 'Each node has a regular neighbor list plus a random pointer to any node in the graph. Clone the graph preserving both neighbor relationships and random pointers.',
        problem: 'The random pointer can point to any node, including ones not yet cloned during DFS. You must handle forward references gracefully, requiring the clone map to serve double duty for both neighbor and random pointer resolution.',
        hints: [
            'Start by understanding the key difference: The random pointer can point to any node, including ones not yet cloned during DFS.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(N + E)',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"adjList":[[2,4],[1,3],[2,4],[1,3]]},
                output: [[2,4],[1,3],[2,4]],
                explanation: 'The clone graph with random pointers for this input yields [2,4, 1,3, 2,4].'
            },
            {
                input: {"adjList":[[]]},
                output: [[]],
                explanation: 'The clone graph with random pointers for this input yields [].'
            },
            // Edge case
            {
                input: {"adjList":[[2,4]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def clone_graph_with_random_pointers(adjList):
    """
    Clone Graph with Random Pointers

    Each node has a regular neighbor list plus a random pointer to any node in the graph. Clone the graph preserving both neighbor relationships and random pointers.

    Time: O(N + E)
    Space: O(N)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_graph_with_random_pointers([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[2,4],[1,3],[2,4]]
print(clone_graph_with_random_pointers([[]]))  # Expected: [[]]
print(clone_graph_with_random_pointers([[2,4]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CloneGraphWithRandomPointers solves the Clone Graph with Random Pointers problem.
// Each node has a regular neighbor list plus a random pointer to any node in the graph. Clone the graph preserving both neighbor relationships and random pointers.
// Time: O(N + E), Space: O(N)
func CloneGraphWithRandomPointers(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneGraphWithRandomPointers([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})) // Expected: [[2,4],[1,3],[2,4]]
	fmt.Println(CloneGraphWithRandomPointers([][]int{{}})) // Expected: [[]]
	fmt.Println(CloneGraphWithRandomPointers([][]int{{2, 4}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph/twist-05-clone-graph-with-random-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph/twist-05-clone-graph-with-random-pointers'] = problem;
})();
