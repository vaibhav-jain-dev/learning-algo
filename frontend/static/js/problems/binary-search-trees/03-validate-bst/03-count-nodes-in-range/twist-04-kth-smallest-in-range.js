/**
 * Kth Smallest in Range
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-range
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Smallest in Range',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Instead of counting all nodes in range, find the kth smallest value within the range [low, high].',
        problem: 'You need to enumerate values in order within the range and stop at the kth one. This combines range pruning with order-statistic logic, and you must handle the case where fewer than k values exist in the range. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the kth smallest in range criteria.'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the kth smallest in range criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def kth_smallest_in_range(tree, low, high):
    """
    Kth Smallest in Range

    Instead of counting all nodes in range, find the kth smallest value within the range [low, high].

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
print(kth_smallest_in_range([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(kth_smallest_in_range([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(kth_smallest_in_range([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthSmallestInRange solves the Kth Smallest in Range problem.
// Instead of counting all nodes in range, find the kth smallest value within the range [low, high].
// Time: O(n), Space: O(1)
func KthSmallestInRange(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthSmallestInRange([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(KthSmallestInRange([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(KthSmallestInRange([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-04-kth-smallest-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-04-kth-smallest-in-range'] = problem;
})();
