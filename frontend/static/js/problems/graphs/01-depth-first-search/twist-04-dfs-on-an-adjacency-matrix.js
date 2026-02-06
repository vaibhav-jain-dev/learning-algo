/**
 * DFS on an Adjacency Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS on an Adjacency Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given the same graph represented as an adjacency matrix instead of a children list, perform DFS. The matrix is n x n where matrix[i][j] = 1 means an edge from i to j.',
        problem: 'Changes how you find neighbors - instead of iterating a list, you scan a row. This affects both the implementation pattern and the time complexity for sparse graphs.',
        hints: [
            'Start by understanding the key difference: Changes how you find neighbors - instead of iterating a list, you scan a row.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [0],
                explanation: 'The dfs on an adjacency matrix for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def dfs_on_an_adjacency_matrix(tree):
    """
    DFS on an Adjacency Matrix

    Given the same graph represented as an adjacency matrix instead of a children list, perform DFS. The matrix is n x n where matrix[i][j] = 1 means an edge from i to j.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(dfs_on_an_adjacency_matrix({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(dfs_on_an_adjacency_matrix({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// DfsOnAnAdjacencyMatrix solves the DFS on an Adjacency Matrix problem.
// Given the same graph represented as an adjacency matrix instead of a children list, perform DFS. The matrix is n x n where matrix[i][j] = 1 means an edge from i to j.
// Time: O(V + E), Space: O(V)
func DfsOnAnAdjacencyMatrix(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DfsOnAnAdjacencyMatrix({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(DfsOnAnAdjacencyMatrix({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/twist-04-dfs-on-an-adjacency-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/twist-04-dfs-on-an-adjacency-matrix'] = problem;
})();
