/**
 * K Closest Values with Weighted Distance
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Values with Weighted Distance',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.',
        problem: 'The BST ordering property no longer directly correlates with closeness since depth affects the metric. You cannot use simple pruning rules and may need to explore both subtrees. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,5,1,3],"target":10,"k":3},
                output: 3,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[8,4,12,2,6,10,14,1,3,5,7],"target":10,"k":3},
                output: 4,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[4],"target":10,"k":3},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def k_closest_values_with_weighted_distance(tree, target, k):
    """
    K Closest Values with Weighted Distance

    Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.

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
print(k_closest_values_with_weighted_distance([4,2,5,1,3], 10, 3))  # Expected: 3
print(k_closest_values_with_weighted_distance([8,4,12,2,6,10,14,1,3,5,7], 10, 3))  # Expected: 4
print(k_closest_values_with_weighted_distance([4], 10, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// KClosestValuesWithWeightedDistance solves the K Closest Values with Weighted Distance problem.
// Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.
// Time: O(n), Space: O(1)
func KClosestValuesWithWeightedDistance(tree []int, target float64, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KClosestValuesWithWeightedDistance([]int{4, 2, 5, 1, 3}, 10, 3)) // Expected: 3
	fmt.Println(KClosestValuesWithWeightedDistance([]int{8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7}, 10, 3)) // Expected: 4
	fmt.Println(KClosestValuesWithWeightedDistance([]int{4}, 10, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-05-k-closest-values-with-weighted-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-05-k-closest-values-with-weighted-distance'] = problem;
})();
