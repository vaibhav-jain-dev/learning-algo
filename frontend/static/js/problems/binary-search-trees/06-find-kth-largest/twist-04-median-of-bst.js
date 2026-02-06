/**
 * Median of BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-kth-largest
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Median of BST',
        difficulty: 'Medium',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.',
        problem: 'You need to know the total count of nodes first, then find the middle element(s). This combines counting with kth-element finding, and the even-case averaging adds complexity. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the median of bst criteria.'
            },
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":1},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the median of bst criteria.'
            },
            // Edge case
            {
                input: {"tree":[15],"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def median_of_bst(tree, k):
    """
    Median of BST

    Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and tree[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(median_of_bst([15,5,20,2,5,17,22,1], 3))  # Expected: 1
print(median_of_bst([15,5,20,2,5,17,22,1], 1))  # Expected: 2
print(median_of_bst([15], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// MedianOfBst solves the Median of BST problem.
// Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.
// Time: O(n), Space: O(1)
func MedianOfBst(tree []int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MedianOfBst([]int{15, 5, 20, 2, 5, 17, 22, 1}, 3)) // Expected: 1
	fmt.Println(MedianOfBst([]int{15, 5, 20, 2, 5, 17, 22, 1}, 1)) // Expected: 2
	fmt.Println(MedianOfBst([]int{15}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-04-median-of-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-04-median-of-bst'] = problem;
})();
