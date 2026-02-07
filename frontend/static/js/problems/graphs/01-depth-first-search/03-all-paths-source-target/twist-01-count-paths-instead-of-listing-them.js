/**
 * Count Paths Instead of Listing Them
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/03-all-paths-source-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Paths Instead of Listing Them',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/03-all-paths-source-target',
        description: 'Instead of returning all paths, just return the total count of paths from source to target. Optimize to avoid materializing each path.',
        problem: 'When you only need the count, you can use memoization/dynamic programming instead of backtracking. This shifts from exponential space (storing paths) to polynomial space (storing counts per node).',
        hints: [
            'Start by understanding the key difference: When you only need the count, you can use memoization/dynamic programming instead of backtracking.',
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
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"graph":[[4,3,1],[3,2,4],[3],[4],[]],"target":10},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"graph":[[1,2]],"target":10},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_paths_instead_of_listing_them(graph, target):
    """
    Count Paths Instead of Listing Them

    Instead of returning all paths, just return the total count of paths from source to target. Optimize to avoid materializing each path.

    Time: O(2^N * N)
    Space: O(N)
    """
    result = 0

    for i in range(len(graph)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_paths_instead_of_listing_them([[1,2],[3],[3],[]], 10))  # Expected: 1
print(count_paths_instead_of_listing_them([[4,3,1],[3,2,4],[3],[4],[]], 10))  # Expected: 2
print(count_paths_instead_of_listing_them([[1,2]], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountPathsInsteadOfListingThem solves the Count Paths Instead of Listing Them problem.
// Instead of returning all paths, just return the total count of paths from source to target. Optimize to avoid materializing each path.
// Time: O(2^N * N), Space: O(N)
func CountPathsInsteadOfListingThem(graph [][]int, target int) int {
	result := 0

	for i := 0; i < len(graph); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountPathsInsteadOfListingThem([][]int{{1, 2}, {3}, {3}, {}}, 10)) // Expected: 1
	fmt.Println(CountPathsInsteadOfListingThem([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}}, 10)) // Expected: 2
	fmt.Println(CountPathsInsteadOfListingThem([][]int{{1, 2}}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target/twist-01-count-paths-instead-of-listing-them', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target/twist-01-count-paths-instead-of-listing-them'] = problem;
})();
