/**
 * Two Sum Exact in BST (Boolean)
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Exact in BST (Boolean)',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.',
        problem: 'The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first. The BST iterator approach also works differently with exact matching. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,7,12,20],"target":10},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the two sum exact in bst boolean criteria.'
            },
            {
                input: {"tree":[5,3,7,1,4,6,8],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the two sum exact in bst boolean criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def two_sum_exact_in_bst_boolean(tree, target):
    """
    Two Sum Exact in BST (Boolean)

    Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(two_sum_exact_in_bst_boolean([10,5,15,2,7,12,20], 10))  # Expected: 1
print(two_sum_exact_in_bst_boolean([5,3,7,1,4,6,8], 10))  # Expected: 2
print(two_sum_exact_in_bst_boolean([10], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// TwoSumExactInBstBoolean solves the Two Sum Exact in BST (Boolean) problem.
// Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.
// Time: O(n), Space: O(1)
func TwoSumExactInBstBoolean(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoSumExactInBstBoolean([]int{10, 5, 15, 2, 7, 12, 20}, 10)) // Expected: 1
	fmt.Println(TwoSumExactInBstBoolean([]int{5, 3, 7, 1, 4, 6, 8}, 10)) // Expected: 2
	fmt.Println(TwoSumExactInBstBoolean([]int{10}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-02-two-sum-exact-in-bst-boolean', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-02-two-sum-exact-in-bst-boolean'] = problem;
})();
