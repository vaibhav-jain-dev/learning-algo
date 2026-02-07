/**
 * Iterative BFS vs DFS Comparison
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/03-nested-list-weighted-sum-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative BFS vs DFS Comparison',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/03-nested-list-weighted-sum-ii',
        description: 'Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.',
        problem: 'BFS naturally processes all elements at each depth level together, making the accumulation trick straightforward. DFS processes elements depth-first, requiring you to track depth per element, which is less elegant for this problem.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[[1,1],2,[1,1]]},
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[[1,1]]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def iterative_bfs_vs_dfs_comparison(array):
    """
    Iterative BFS vs DFS Comparison

    Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_bfs_vs_dfs_comparison([[1,1],2,[1,1]]))  # Expected: 1
print(iterative_bfs_vs_dfs_comparison([[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeBfsVsDfsComparison solves the Iterative BFS vs DFS Comparison problem.
// Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.
// Time: O(?), Space: O(?)
func IterativeBfsVsDfsComparison(array [][]int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeBfsVsDfsComparison([][]int{{1, 1}, 2, {1, 1}})) // Expected: 1
	fmt.Println(IterativeBfsVsDfsComparison([][]int{{1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii/twist-03-iterative-bfs-vs-dfs-comparison', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii/twist-03-iterative-bfs-vs-dfs-comparison'] = problem;
})();
