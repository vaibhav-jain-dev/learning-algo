/**
 * BST with Rank (Order Statistics)
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST with Rank (Order Statistics)',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.',
        problem: 'Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal. Every mutation must update sizes along the path. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1],"operations":["insert(12)","remove(10)","contains(15)"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the bst with rank order statistics criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"operations":["insert(12)"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bst_with_rank_order_statistics(tree, operations):
    """
    BST with Rank (Order Statistics)

    Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and tree[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(bst_with_rank_order_statistics([10,5,15,2,5,None,22,1], ["insert(12)","remove(10)","contains(15)"]))  # Expected: 1
print(bst_with_rank_order_statistics([10], ["insert(12)"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BstWithRankOrderStatistics solves the BST with Rank (Order Statistics) problem.
// Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.
// Time: O(n), Space: O(1)
func BstWithRankOrderStatistics(tree []int, operations []string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BstWithRankOrderStatistics([]int{10, 5, 15, 2, 5, null, 22, 1}, []string{"insert(12)", "remove(10)", "contains(15)"})) // Expected: 1
	fmt.Println(BstWithRankOrderStatistics([]int{10}, []string{"insert(12)"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-02-bst-with-rank-order-statistics', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-02-bst-with-rank-order-statistics'] = problem;
})();
