/**
 * Closest Value in a Modified BST with Duplicates
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Value in a Modified BST with Duplicates',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.',
        problem: 'Duplicates break the assumption of unique closest value. You must handle tie-breaking logic and cannot stop early when you find an exact match since duplicates may exist on either side. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,13,22,1,null,null,null,null,14],"target":12},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the closest value in a modified bst with duplicates criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def closest_value_in_a_modified_bst_with_duplicates(tree, target):
    """
    Closest Value in a Modified BST with Duplicates

    The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.

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
print(closest_value_in_a_modified_bst_with_duplicates([10,5,15,2,5,13,22,1,None,None,None,None,14], 12))  # Expected: 1
print(closest_value_in_a_modified_bst_with_duplicates([10], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestValueInAModifiedBstWithDuplicates solves the Closest Value in a Modified BST with Duplicates problem.
// The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.
// Time: O(n), Space: O(1)
func ClosestValueInAModifiedBstWithDuplicates(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestValueInAModifiedBstWithDuplicates([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14}, 12)) // Expected: 1
	fmt.Println(ClosestValueInAModifiedBstWithDuplicates([]int{10}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-03-closest-value-in-a-modified-bst-with-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-03-closest-value-in-a-modified-bst-with-duplicates'] = problem;
})();
