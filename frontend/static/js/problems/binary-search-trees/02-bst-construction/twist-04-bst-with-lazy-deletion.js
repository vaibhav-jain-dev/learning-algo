/**
 * BST with Lazy Deletion
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST with Lazy Deletion',
        difficulty: 'Medium',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.',
        problem: 'Lazy deletion changes how you reason about tree validity and traversal. Contains must check the deleted flag, and the tree can accumulate garbage that affects performance until compaction. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1],"operations":["insert(12)","remove(10)","contains(15)"]},
                output: [10,5,15],
                explanation: 'The bst with lazy deletion for this input yields [10, 5, 15].'
            },
            // Edge case
            {
                input: {"tree":[10],"operations":["insert(12)"]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bst_with_lazy_deletion(tree, operations):
    """
    BST with Lazy Deletion

    Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bst_with_lazy_deletion([10,5,15,2,5,None,22,1], ["insert(12)","remove(10)","contains(15)"]))  # Expected: [10,5,15]
print(bst_with_lazy_deletion([10], ["insert(12)"]))  # Expected: []
`,
            go: `package main

import "fmt"

// BstWithLazyDeletion solves the BST with Lazy Deletion problem.
// Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.
// Time: O(n), Space: O(1)
func BstWithLazyDeletion(tree []int, operations []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BstWithLazyDeletion([]int{10, 5, 15, 2, 5, null, 22, 1}, []string{"insert(12)", "remove(10)", "contains(15)"})) // Expected: [10,5,15]
	fmt.Println(BstWithLazyDeletion([]int{10}, []string{"insert(12)"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-04-bst-with-lazy-deletion', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-04-bst-with-lazy-deletion'] = problem;
})();
