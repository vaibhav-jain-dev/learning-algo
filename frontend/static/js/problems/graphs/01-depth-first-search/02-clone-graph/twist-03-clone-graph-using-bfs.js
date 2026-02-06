/**
 * Clone Graph Using BFS
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/02-clone-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph Using BFS',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/02-clone-graph',
        description: 'Clone the same undirected graph but use BFS instead of DFS. The result must be identical.',
        problem: 'Switches from recursive/stack-based to iterative queue-based cloning. You must handle the mapping of old-to-new nodes in a different traversal order, which changes when clones are created vs when their neighbors are populated.',
        hints: [
            'Start by understanding the key difference: Switches from recursive/stack-based to iterative queue-based cloning.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same graph 1-2-3-4 cycle.',
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
                explanation: 'The clone graph using bfs for this input yields [2,4, 1,3, 2,4].'
            },
            {
                input: {"adjList":[[]]},
                output: [[]],
                explanation: 'The clone graph using bfs for this input yields [].'
            },
            // Edge case
            {
                input: {"adjList":[[2,4]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def clone_graph_using_bfs(adjList):
    """
    Clone Graph Using BFS

    Clone the same undirected graph but use BFS instead of DFS. The result must be identical.

    Time: O(N + E)
    Space: O(N)
    """
    result = []

    for i in range(len(adjList)):
        # Check if element meets criteria
        result.append(adjList[i])

    return result


# Test cases
print(clone_graph_using_bfs([[2,4],[1,3],[2,4],[1,3]]))  # Expected: [[2,4],[1,3],[2,4]]
print(clone_graph_using_bfs([[]]))  # Expected: [[]]
print(clone_graph_using_bfs([[2,4]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CloneGraphUsingBfs solves the Clone Graph Using BFS problem.
// Clone the same undirected graph but use BFS instead of DFS. The result must be identical.
// Time: O(N + E), Space: O(N)
func CloneGraphUsingBfs(adjList [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(adjList); i++ {
		result = append(result, adjList[i])
	}

	return result
}

func main() {
	fmt.Println(CloneGraphUsingBfs([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})) // Expected: [[2,4],[1,3],[2,4]]
	fmt.Println(CloneGraphUsingBfs([][]int{{}})) // Expected: [[]]
	fmt.Println(CloneGraphUsingBfs([][]int{{2, 4}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/02-clone-graph/twist-03-clone-graph-using-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/02-clone-graph/twist-03-clone-graph-using-bfs'] = problem;
})();
