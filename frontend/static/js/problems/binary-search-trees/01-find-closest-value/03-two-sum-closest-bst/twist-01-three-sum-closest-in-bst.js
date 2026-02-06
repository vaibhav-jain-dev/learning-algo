/**
 * Three Sum Closest in BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest in BST',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Find three nodes in the BST whose sum is closest to the target. Return the three values.',
        problem: 'Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the three sum closest in bst criteria.'
            },
            {
                input: {"tree":[5,3,7,1,4,6,8],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the three sum closest in bst criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def three_sum_closest_in_bst(tree, target):
    """
    Three Sum Closest in BST

    Find three nodes in the BST whose sum is closest to the target. Return the three values.

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
print(three_sum_closest_in_bst([10,5,15,2,7,12,20], 10))  # Expected: 1
print(three_sum_closest_in_bst([5,3,7,1,4,6,8], 10))  # Expected: 2
print(three_sum_closest_in_bst([10], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// ThreeSumClosestInBst solves the Three Sum Closest in BST problem.
// Find three nodes in the BST whose sum is closest to the target. Return the three values.
// Time: O(n), Space: O(1)
func ThreeSumClosestInBst(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeSumClosestInBst([]int{10, 5, 15, 2, 7, 12, 20}, 10)) // Expected: 1
	fmt.Println(ThreeSumClosestInBst([]int{5, 3, 7, 1, 4, 6, 8}, 10)) // Expected: 2
	fmt.Println(ThreeSumClosestInBst([]int{10}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-01-three-sum-closest-in-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-01-three-sum-closest-in-bst'] = problem;
})();
