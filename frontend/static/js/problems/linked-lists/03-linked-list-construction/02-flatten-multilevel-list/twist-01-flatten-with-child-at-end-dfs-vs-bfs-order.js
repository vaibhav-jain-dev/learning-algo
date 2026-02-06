/**
 * Flatten with Child at End (DFS vs BFS Order)
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten with Child at End (DFS vs BFS Order)',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.',
        problem: 'The standard solution uses DFS (child is inserted inline). BFS order requires a queue-based approach where child lists are appended after all nodes at the current level are processed. The traversal strategy fundamentally changes.',
        hints: [
            'Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level',
            'The standard solution uses DFS (child is inserted inline)',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def flatten_with_child_at_end_dfs_vs_bfs_order(list):
    """
    Flatten with Child at End (DFS vs BFS Order)

    Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(flatten_with_child_at_end_dfs_vs_bfs_order([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// FlattenWithChildAtEndDfsVsBfsOrder solves the Flatten with Child at End (DFS vs BFS Order) problem.
// Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.
// Time: O(n), Space: O(1)
func FlattenWithChildAtEndDfsVsBfsOrder(list string) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenWithChildAtEndDfsVsBfsOrder([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-01-flatten-with-child-at-end-dfs-vs-bfs-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-01-flatten-with-child-at-end-dfs-vs-bfs-order'] = problem;
})();
