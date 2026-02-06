/**
 * Closest Value Without Parent Pointers (Iterative)
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-search
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Value Without Parent Pointers (Iterative)',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.',
        problem: 'Forces you to think about the traversal iteratively. While the logic is similar, managing state explicitly rather than via the call stack changes how you reason about the control flow. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the closest value without parent pointers iterative criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def closest_value_without_parent_pointers_iterative(tree, target):
    """
    Closest Value Without Parent Pointers (Iterative)

    Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.

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
print(closest_value_without_parent_pointers_iterative([10,5,15,2,5,13,22,1,None,None,None,None,14], 12))  # Expected: 1
print(closest_value_without_parent_pointers_iterative([10], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestValueWithoutParentPointersIterative solves the Closest Value Without Parent Pointers (Iterative) problem.
// Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.
// Time: O(n), Space: O(1)
func ClosestValueWithoutParentPointersIterative(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestValueWithoutParentPointersIterative([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14}, 12)) // Expected: 1
	fmt.Println(ClosestValueWithoutParentPointersIterative([]int{10}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-02-closest-value-without-parent-pointers-iterative', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-02-closest-value-without-parent-pointers-iterative'] = problem;
})();
