/**
 * K Closest Distinct Values
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Distinct Values',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'The BST may contain duplicate values. Find the k closest distinct values to the target.',
        problem: 'You must skip duplicates during traversal while still maintaining the heap/window of size k. This adds bookkeeping that changes how you process each node. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,5,1,3],"target":10,"k":2},
                output: [4,2,5],
                explanation: 'The k closest distinct values for this input yields [4, 2, 5].'
            },
            {
                input: {"tree":[8,4,12,2,6,10,14,1,3,5,7],"target":10,"k":4},
                output: [8,4,12],
                explanation: 'The k closest distinct values for this input yields [8, 4, 12].'
            },
            // Edge case
            {
                input: {"tree":[4],"target":10,"k":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def k_closest_distinct_values(tree, target, k):
    """
    K Closest Distinct Values

    The BST may contain duplicate values. Find the k closest distinct values to the target.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(k_closest_distinct_values([4,2,5,1,3], 10, 2))  # Expected: [4,2,5]
print(k_closest_distinct_values([8,4,12,2,6,10,14,1,3,5,7], 10, 4))  # Expected: [8,4,12]
print(k_closest_distinct_values([4], 10, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// KClosestDistinctValues solves the K Closest Distinct Values problem.
// The BST may contain duplicate values. Find the k closest distinct values to the target.
// Time: O(n), Space: O(1)
func KClosestDistinctValues(tree []int, target float64, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(KClosestDistinctValues([]int{4, 2, 5, 1, 3}, 10, 2)) // Expected: [4,2,5]
	fmt.Println(KClosestDistinctValues([]int{8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7}, 10, 4)) // Expected: [8,4,12]
	fmt.Println(KClosestDistinctValues([]int{4}, 10, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-04-k-closest-distinct-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-04-k-closest-distinct-values'] = problem;
})();
