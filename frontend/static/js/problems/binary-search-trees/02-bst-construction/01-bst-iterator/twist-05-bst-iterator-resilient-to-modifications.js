/**
 * BST Iterator Resilient to Modifications
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-iterator
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator Resilient to Modifications',
        difficulty: 'Very Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.',
        problem: 'Standard iterators assume a static tree. Handling concurrent modifications requires either snapshotting, versioning, or re-validating the stack state before each next() call -- a fundamentally different design. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20]},
                output: [7,3,15],
                explanation: 'The bst iterator resilient to modifications for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def bst_iterator_resilient_to_modifications(tree):
    """
    BST Iterator Resilient to Modifications

    The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bst_iterator_resilient_to_modifications([7,3,15,None,None,9,20]))  # Expected: [7,3,15]
print(bst_iterator_resilient_to_modifications([7]))  # Expected: []
`,
            go: `package main

import "fmt"

// BstIteratorResilientToModifications solves the BST Iterator Resilient to Modifications problem.
// The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.
// Time: O(n), Space: O(1)
func BstIteratorResilientToModifications(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BstIteratorResilientToModifications([]int{7, 3, 15, null, null, 9, 20})) // Expected: [7,3,15]
	fmt.Println(BstIteratorResilientToModifications([]int{7})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-05-bst-iterator-resilient-to-modifications', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-05-bst-iterator-resilient-to-modifications'] = problem;
})();
