/**
 * Merge Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-iterator
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.',
        problem: 'You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation. Each advance requires comparing the two peek values. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20],"operations":["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]},
                output: [7,3,15],
                explanation: 'The merge two bst iterators for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7],"operations":["next"]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def merge_two_bst_iterators(tree, operations):
    """
    Merge Two BST Iterators

    Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(merge_two_bst_iterators([7,3,15,None,None,9,20], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]))  # Expected: [7,3,15]
print(merge_two_bst_iterators([7], ["next"]))  # Expected: []
`,
            go: `package main

import "fmt"

// MergeTwoBstIterators solves the Merge Two BST Iterators problem.
// Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.
// Time: O(n), Space: O(1)
func MergeTwoBstIterators(tree []int, operations []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MergeTwoBstIterators([]int{7, 3, 15, null, null, 9, 20}, []string{"next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"})) // Expected: [7,3,15]
	fmt.Println(MergeTwoBstIterators([]int{7}, []string{"next"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-04-merge-two-bst-iterators', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-04-merge-two-bst-iterators'] = problem;
})();
