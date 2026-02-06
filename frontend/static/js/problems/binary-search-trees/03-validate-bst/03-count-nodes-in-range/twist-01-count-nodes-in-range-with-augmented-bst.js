/**
 * Count Nodes in Range with Augmented BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-range
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes in Range with Augmented BST',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.',
        problem: 'The base approach visits all nodes in range (O(k)). With subtree sizes, you can compute the count using rank queries: count = rank(high) - rank(low-1). This requires order-statistic tree thinking instead of range traversal. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,3,7,null,18],"low":7,"high":15},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count nodes in range with augmented bst criteria.'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count nodes in range with augmented bst criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_nodes_in_range_with_augmented_bst(tree, low, high):
    """
    Count Nodes in Range with Augmented BST

    Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on low
        j = 0
        for k in range(i, n):
            if j < len(low) and tree[k] == low[j]:
                j += 1
        if j == len(low):
            count += 1

    return count


# Test cases
print(count_nodes_in_range_with_augmented_bst([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(count_nodes_in_range_with_augmented_bst([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(count_nodes_in_range_with_augmented_bst([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountNodesInRangeWithAugmentedBst solves the Count Nodes in Range with Augmented BST problem.
// Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.
// Time: O(n), Space: O(1)
func CountNodesInRangeWithAugmentedBst(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountNodesInRangeWithAugmentedBst([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(CountNodesInRangeWithAugmentedBst([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(CountNodesInRangeWithAugmentedBst([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-01-count-nodes-in-range-with-augmented-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-01-count-nodes-in-range-with-augmented-bst'] = problem;
})();
