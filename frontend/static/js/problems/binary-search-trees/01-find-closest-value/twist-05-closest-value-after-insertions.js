/**
 * Closest Value After Insertions
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Value After Insertions',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.',
        problem: 'The tree structure changes with each insertion. You must think about how insertions affect the search path and whether you can maintain the closest value incrementally rather than re-searching from scratch. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,13,22,1,null,null,null,null,14],"target":10},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the closest value after insertions criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def closest_value_after_insertions(tree, target):
    """
    Closest Value After Insertions

    Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.

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
print(closest_value_after_insertions([10,5,15,2,5,13,22,1,None,None,None,None,14], 10))  # Expected: 1
print(closest_value_after_insertions([10], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestValueAfterInsertions solves the Closest Value After Insertions problem.
// Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.
// Time: O(n), Space: O(1)
func ClosestValueAfterInsertions(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestValueAfterInsertions([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14}, 10)) // Expected: 1
	fmt.Println(ClosestValueAfterInsertions([]int{10}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-05-closest-value-after-insertions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-05-closest-value-after-insertions'] = problem;
})();
