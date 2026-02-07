/**
 * Range Count in BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Count in BST',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.',
        problem: 'The traversal and pruning logic remain the same, but you accumulate a count instead of a sum. This tests whether you understand the pruning is independent of the aggregation function. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def range_count_in_bst(tree, low, high):
    """
    Range Count in BST

    Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.

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
print(range_count_in_bst([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(range_count_in_bst([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(range_count_in_bst([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// RangeCountInBst solves the Range Count in BST problem.
// Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.
// Time: O(n), Space: O(1)
func RangeCountInBst(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RangeCountInBst([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(RangeCountInBst([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(RangeCountInBst([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-01-range-count-in-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-01-range-count-in-bst'] = problem;
})();
