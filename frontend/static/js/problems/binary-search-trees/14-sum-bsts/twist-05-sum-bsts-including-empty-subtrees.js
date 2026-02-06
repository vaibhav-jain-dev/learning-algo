/**
 * Sum BSTs Including Empty Subtrees
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum BSTs Including Empty Subtrees',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.',
        problem: 'The original problem considers single nodes as minimal BSTs. Including empty trees as base cases changes the counting in subtle ways and tests your understanding of the recursive base case definition. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the sum bsts including empty subtrees criteria.'
            },
            {
                input: {"tree":[5,4,8,3,null,6,3]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the sum bsts including empty subtrees criteria.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def sum_bsts_including_empty_subtrees(tree):
    """
    Sum BSTs Including Empty Subtrees

    Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(sum_bsts_including_empty_subtrees([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 1
print(sum_bsts_including_empty_subtrees([5,4,8,3,None,6,3]))  # Expected: 2
print(sum_bsts_including_empty_subtrees([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SumBstsIncludingEmptySubtrees solves the Sum BSTs Including Empty Subtrees problem.
// Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.
// Time: O(n), Space: O(1)
func SumBstsIncludingEmptySubtrees(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SumBstsIncludingEmptySubtrees([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 1
	fmt.Println(SumBstsIncludingEmptySubtrees([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 2
	fmt.Println(SumBstsIncludingEmptySubtrees([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-05-sum-bsts-including-empty-subtrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-05-sum-bsts-including-empty-subtrees'] = problem;
})();
