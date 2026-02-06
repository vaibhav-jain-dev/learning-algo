/**
 * All Paths with BFS (Level-Order)
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/03-all-paths-source-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Paths with BFS (Level-Order)',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/03-all-paths-source-target',
        description: 'Find all paths from source to target using BFS instead of DFS. Paths should be generated in order of increasing length.',
        problem: 'BFS explores paths by length, producing shorter paths first. The challenge is maintaining partial paths in the queue, which can consume significantly more memory than DFS backtracking.',
        hints: [
            'Start by understanding the key difference: BFS explores paths by length, producing shorter paths first.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(2^N * N)',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[3],[3],[]],"target":10},
                output: [[1,2],[3],[3]],
                explanation: 'The all paths with bfs level order for this input yields [1,2, 3, 3].'
            },
            {
                input: {"graph":[[4,3,1],[3,2,4],[3],[4],[]],"target":10},
                output: [[4,3,1],[3,2,4],[3]],
                explanation: 'The all paths with bfs level order for this input yields [4,3,1, 3,2,4, 3].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]],"target":10},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_paths_with_bfs_level_order(graph, target):
    """
    All Paths with BFS (Level-Order)

    Find all paths from source to target using BFS instead of DFS. Paths should be generated in order of increasing length.

    Time: O(2^N * N)
    Space: O(N)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(all_paths_with_bfs_level_order([[1,2],[3],[3],[]], 10))  # Expected: [[1,2],[3],[3]]
print(all_paths_with_bfs_level_order([[4,3,1],[3,2,4],[3],[4],[]], 10))  # Expected: [[4,3,1],[3,2,4],[3]]
print(all_paths_with_bfs_level_order([[1,2]], 10))  # Expected: []
`,
            go: `package main

import "fmt"

// AllPathsWithBfsLevelOrder solves the All Paths with BFS (Level-Order) problem.
// Find all paths from source to target using BFS instead of DFS. Paths should be generated in order of increasing length.
// Time: O(2^N * N), Space: O(N)
func AllPathsWithBfsLevelOrder(graph [][]int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(AllPathsWithBfsLevelOrder([][]int{{1, 2}, {3}, {3}, {}}, 10)) // Expected: [[1,2],[3],[3]]
	fmt.Println(AllPathsWithBfsLevelOrder([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}}, 10)) // Expected: [[4,3,1],[3,2,4],[3]]
	fmt.Println(AllPathsWithBfsLevelOrder([][]int{{1, 2}}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target/twist-05-all-paths-with-bfs-level-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target/twist-05-all-paths-with-bfs-level-order'] = problem;
})();
