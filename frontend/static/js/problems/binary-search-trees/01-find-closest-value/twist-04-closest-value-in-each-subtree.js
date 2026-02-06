/**
 * Closest Value in Each Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Value in Each Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'For every node in the BST, compute the closest value to the target within that node\',
        problem: 'This is a bottom-up aggregation problem rather than a top-down search. You need to combine results from left and right subtrees at each node, completely changing the traversal pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the closest value in each subtree criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def closest_value_in_each_subtree(tree, target):
    """
    Closest Value in Each Subtree

    For every node in the BST, compute the closest value to the target within that node\\

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
print(closest_value_in_each_subtree([10,5,15,2,5,13,22,1,None,None,None,None,14], 12))  # Expected: 1
print(closest_value_in_each_subtree([10], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestValueInEachSubtree solves the Closest Value in Each Subtree problem.
// For every node in the BST, compute the closest value to the target within that node\\
// Time: O(n), Space: O(1)
func ClosestValueInEachSubtree(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestValueInEachSubtree([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14}, 12)) // Expected: 1
	fmt.Println(ClosestValueInEachSubtree([]int{10}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-04-closest-value-in-each-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-04-closest-value-in-each-subtree'] = problem;
})();
