/**
 * Clone a Disconnected Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/02-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone a Disconnected Graph',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/02-clone-graph',
        description: 'Clone a graph that may have multiple disconnected components. You are given a list of all nodes, not just one starting node.',
        problem: 'A single DFS from one node will not reach disconnected components. You need to iterate over all nodes and start new DFS traversals for unvisited nodes, fundamentally changing the entry point logic.',
        hints: [
            'Start by understanding the key difference: A single DFS from one node will not reach disconnected components.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Nodes: [1,2,3,4].',
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
                explanation: 'The clone a disconnected graph for this input yields [2,4, 1,3, 2,4].'
            },
            {
                input: {"adjList":[[]]},
                output: [[]],
                explanation: 'The clone a disconnected graph for this input yields [].'
            },
            // Edge case
            {
                input: {"adjList":[[2,4]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def clone_a_disconnected_graph(adjList):
    """
    Clone a Disconnected Graph

    Clone a graph that may have multiple disconnected components. You are given a list of all nodes, not just one starting node.

    Time: O(N + E)
    Space: O(N)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_a_disconnected_graph([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[2,4],[1,3],[2,4]]
print(clone_a_disconnected_graph([[]]))  # Expected: [[]]
print(clone_a_disconnected_graph([[2,4]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CloneADisconnectedGraph solves the Clone a Disconnected Graph problem.
// Clone a graph that may have multiple disconnected components. You are given a list of all nodes, not just one starting node.
// Time: O(N + E), Space: O(N)
func CloneADisconnectedGraph(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneADisconnectedGraph([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})) // Expected: [[2,4],[1,3],[2,4]]
	fmt.Println(CloneADisconnectedGraph([][]int{{}})) // Expected: [[]]
	fmt.Println(CloneADisconnectedGraph([][]int{{2, 4}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph/twist-04-clone-a-disconnected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph/twist-04-clone-a-disconnected-graph'] = problem;
})();
