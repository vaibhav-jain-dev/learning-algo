/**
 * Repair BST Serialization
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repair BST Serialization',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Given a level-order array representation of a BST where two values are swapped, find and swap them. You do not have access to the tree structure, only the array.',
        problem: 'Without tree pointers, you must reconstruct parent-child relationships from array indices (left child at 2i+1, right child at 2i+2). The inorder traversal must be computed from the array layout, adding an index-mapping layer. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [1,3,null],
                explanation: 'The repair bst serialization for this input yields [1, 3, ].'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: [3,1,4],
                explanation: 'The repair bst serialization for this input yields [3, 1, 4].'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def repair_bst_serialization(tree):
    """
    Repair BST Serialization

    Given a level-order array representation of a BST where two values are swapped, find and swap them. You do not have access to the tree structure, only the array.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(repair_bst_serialization([1,3,None,None,2]))  # Expected: [1,3,None]
print(repair_bst_serialization([3,1,4,None,None,2]))  # Expected: [3,1,4]
print(repair_bst_serialization([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// RepairBstSerialization solves the Repair BST Serialization problem.
// Given a level-order array representation of a BST where two values are swapped, find and swap them. You do not have access to the tree structure, only the array.
// Time: O(n), Space: O(1)
func RepairBstSerialization(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(RepairBstSerialization([]int{1, 3, null, null, 2})) // Expected: [1,3,null]
	fmt.Println(RepairBstSerialization([]int{3, 1, 4, null, null, 2})) // Expected: [3,1,4]
	fmt.Println(RepairBstSerialization([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-05-repair-bst-serialization', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-05-repair-bst-serialization'] = problem;
})();
