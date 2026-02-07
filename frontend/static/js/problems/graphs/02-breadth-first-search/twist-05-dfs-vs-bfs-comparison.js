/**
 * DFS vs BFS Comparison
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS vs BFS Comparison',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given the same tree, implement both DFS and BFS. Return both traversal orders and explain a scenario where one is clearly better than the other.',
        problem: 'Forces direct comparison of the two fundamental traversal strategies. You must reason about when depth-first exploration (memory-efficient for deep trees) beats breadth-first (optimal for shortest paths).',
        hints: [
            'Start by understanding the key difference: Forces direct comparison of the two fundamental traversal strategies.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Tree with depth 1000 and branching factor 2: DFS uses O(1000) stack space, BFS uses O(2^1000) queue space.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
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
                explanation: 'The dfs vs bfs comparison for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def dfs_vs_bfs_comparison(tree):
    """
    DFS vs BFS Comparison

    Given the same tree, implement both DFS and BFS. Return both traversal orders and explain a scenario where one is clearly better than the other.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(dfs_vs_bfs_comparison({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(dfs_vs_bfs_comparison({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// DfsVsBfsComparison solves the DFS vs BFS Comparison problem.
// Given the same tree, implement both DFS and BFS. Return both traversal orders and explain a scenario where one is clearly better than the other.
// Time: O(V + E), Space: O(V)
func DfsVsBfsComparison(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DfsVsBfsComparison({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(DfsVsBfsComparison({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/twist-05-dfs-vs-bfs-comparison', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/twist-05-dfs-vs-bfs-comparison'] = problem;
})();
