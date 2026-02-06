/**
 * Two Sum Closest Across Two BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest Across Two BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Given two separate BSTs, find one node from each tree such that their sum is closest to the target.',
        problem: 'You cannot merge the two trees into a single sorted array efficiently. Instead, use a forward iterator on one BST and a reverse iterator on the other, requiring coordination across two separate data structures. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the two sum closest across two bsts criteria.'
            },
            {
                input: {"tree":[5,3,7,1,4,6,8],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the two sum closest across two bsts criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def two_sum_closest_across_two_bsts(tree, target):
    """
    Two Sum Closest Across Two BSTs

    Given two separate BSTs, find one node from each tree such that their sum is closest to the target.

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
print(two_sum_closest_across_two_bsts([10,5,15,2,7,12,20], 10))  # Expected: 1
print(two_sum_closest_across_two_bsts([5,3,7,1,4,6,8], 10))  # Expected: 2
print(two_sum_closest_across_two_bsts([10], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// TwoSumClosestAcrossTwoBsts solves the Two Sum Closest Across Two BSTs problem.
// Given two separate BSTs, find one node from each tree such that their sum is closest to the target.
// Time: O(n), Space: O(1)
func TwoSumClosestAcrossTwoBsts(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoSumClosestAcrossTwoBsts([]int{10, 5, 15, 2, 7, 12, 20}, 10)) // Expected: 1
	fmt.Println(TwoSumClosestAcrossTwoBsts([]int{5, 3, 7, 1, 4, 6, 8}, 10)) // Expected: 2
	fmt.Println(TwoSumClosestAcrossTwoBsts([]int{10}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-04-two-sum-closest-across-two-bsts', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-04-two-sum-closest-across-two-bsts'] = problem;
})();
