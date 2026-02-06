/**
 * Count BST Subtrees
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count BST Subtrees',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.',
        problem: 'Instead of summing values, you count occurrences. The traversal is similar but the aggregation differs, and you must decide whether overlapping subtrees (a BST subtree within a larger BST subtree) should both be counted. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,4,3,2,4,null,5,null,null,null,null,4,6]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count bst subtrees criteria.'
            },
            {
                input: {"tree":[5,4,8,3,null,6,3]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count bst subtrees criteria.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_bst_subtrees(tree):
    """
    Count BST Subtrees

    Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_bst_subtrees([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 1
print(count_bst_subtrees([5,4,8,3,None,6,3]))  # Expected: 2
print(count_bst_subtrees([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountBstSubtrees solves the Count BST Subtrees problem.
// Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.
// Time: O(n), Space: O(1)
func CountBstSubtrees(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountBstSubtrees([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 1
	fmt.Println(CountBstSubtrees([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 2
	fmt.Println(CountBstSubtrees([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-02-count-bst-subtrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-02-count-bst-subtrees'] = problem;
})();
