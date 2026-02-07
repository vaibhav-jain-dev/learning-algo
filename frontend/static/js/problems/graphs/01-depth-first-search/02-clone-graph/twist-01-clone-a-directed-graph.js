/**
 * Clone a Directed Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/02-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone a Directed Graph',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/02-clone-graph',
        description: 'Clone a directed graph where edges are one-way. The cloned graph must preserve edge directions exactly.',
        problem: 'In undirected graphs, each edge appears in both neighbor lists. In directed graphs, you must be careful not to assume symmetry. The DFS traversal might not reach all nodes from a single starting node.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, each edge appears in both neighbor lists.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Directed graph: 1->2, 2->3, 3->1.',
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
                output: [[2,4],[1,3],[2,4]],
                explanation: 'The clone a directed graph for this input yields [2,4, 1,3, 2,4].'
            },
            {
                input: {"adjList":[[]]},
                output: [[]],
                explanation: 'The clone a directed graph for this input yields [].'
            },
            // Edge case
            {
                input: {"adjList":[[2,4]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def clone_a_directed_graph(adjList):
    """
    Clone a Directed Graph

    Clone a directed graph where edges are one-way. The cloned graph must preserve edge directions exactly.

    Time: O(N + E)
    Space: O(N)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_a_directed_graph([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[2,4],[1,3],[2,4]]
print(clone_a_directed_graph([[]]))  # Expected: [[]]
print(clone_a_directed_graph([[2,4]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CloneADirectedGraph solves the Clone a Directed Graph problem.
// Clone a directed graph where edges are one-way. The cloned graph must preserve edge directions exactly.
// Time: O(N + E), Space: O(N)
func CloneADirectedGraph(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneADirectedGraph([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})) // Expected: [[2,4],[1,3],[2,4]]
	fmt.Println(CloneADirectedGraph([][]int{{}})) // Expected: [[]]
	fmt.Println(CloneADirectedGraph([][]int{{2, 4}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph/twist-01-clone-a-directed-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph/twist-01-clone-a-directed-graph'] = problem;
})();
