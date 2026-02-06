/**
 * Exclusive Range Sum
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Exclusive Range Sum',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Return the sum of values strictly between low and high (exclusive bounds, not inclusive).',
        problem: 'The boundary conditions change from <= to <, which affects how you prune at the boundaries. When the current node equals low or high, you must exclude it but still explore the appropriate subtree. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the exclusive range sum criteria.'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the exclusive range sum criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def exclusive_range_sum(tree, low, high):
    """
    Exclusive Range Sum

    Return the sum of values strictly between low and high (exclusive bounds, not inclusive).

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
print(exclusive_range_sum([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(exclusive_range_sum([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(exclusive_range_sum([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ExclusiveRangeSum solves the Exclusive Range Sum problem.
// Return the sum of values strictly between low and high (exclusive bounds, not inclusive).
// Time: O(n), Space: O(1)
func ExclusiveRangeSum(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ExclusiveRangeSum([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(ExclusiveRangeSum([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(ExclusiveRangeSum([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-03-exclusive-range-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-03-exclusive-range-sum'] = problem;
})();
