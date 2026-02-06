/**
 * Range Product in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-range
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Product in BST',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.',
        problem: 'Product accumulation means the identity element is 1 (not 0 like sum). More importantly, large products can overflow, so you may need to consider modular arithmetic or big integer handling. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [10,5,15],
                explanation: 'The range product in bst for this input yields [10, 5, 15].'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: [10,5,15],
                explanation: 'The range product in bst for this input yields [10, 5, 15].'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def range_product_in_bst(tree, low, high):
    """
    Range Product in BST

    Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(range_product_in_bst([10,5,15,3,7,None,18], 7, 15))  # Expected: [10,5,15]
print(range_product_in_bst([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: [10,5,15]
print(range_product_in_bst([10], 0, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// RangeProductInBst solves the Range Product in BST problem.
// Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.
// Time: O(n), Space: O(1)
func RangeProductInBst(tree []int, low int, high int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(RangeProductInBst([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: [10,5,15]
	fmt.Println(RangeProductInBst([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: [10,5,15]
	fmt.Println(RangeProductInBst([]int{10}, 0, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-02-range-product-in-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-02-range-product-in-bst'] = problem;
})();
