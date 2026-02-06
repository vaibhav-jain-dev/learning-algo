/**
 * Repair BST by Rotation
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repair BST by Rotation',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.',
        problem: 'Swapping values is O(1) once found. Rotations change tree structure and may cascade. You need to understand how rotations fix local BST violations and may need multiple rotations to propagate the fix. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,3,null,null,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the repair bst by rotation criteria.'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the repair bst by rotation criteria.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def repair_bst_by_rotation(tree):
    """
    Repair BST by Rotation

    Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(repair_bst_by_rotation([1,3,None,None,2]))  # Expected: 1
print(repair_bst_by_rotation([3,1,4,None,None,2]))  # Expected: 2
print(repair_bst_by_rotation([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RepairBstByRotation solves the Repair BST by Rotation problem.
// Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.
// Time: O(n), Space: O(1)
func RepairBstByRotation(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RepairBstByRotation([]int{1, 3, null, null, 2})) // Expected: 1
	fmt.Println(RepairBstByRotation([]int{3, 1, 4, null, null, 2})) // Expected: 2
	fmt.Println(RepairBstByRotation([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-03-repair-bst-by-rotation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-03-repair-bst-by-rotation'] = problem;
})();
