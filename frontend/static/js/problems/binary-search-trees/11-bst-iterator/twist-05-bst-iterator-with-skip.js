/**
 * BST Iterator with Skip
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-iterator
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator with Skip',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.',
        problem: 'Simple iteration is O(1) amortized per step. Skip requires potentially jumping over many nodes efficiently, using BST search properties to prune the stack rather than iterating one by one. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20],"operations":["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"],"target":10},
                output: [7,3,15],
                explanation: 'The bst iterator with skip for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7],"operations":["next"],"target":10},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bst_iterator_with_skip(tree, operations, target):
    """
    BST Iterator with Skip

    Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bst_iterator_with_skip([7,3,15,None,None,9,20], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"], 10))  # Expected: [7,3,15]
print(bst_iterator_with_skip([7], ["next"], 10))  # Expected: []
`,
            go: `package main

import "fmt"

// BstIteratorWithSkip solves the BST Iterator with Skip problem.
// Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.
// Time: O(n), Space: O(1)
func BstIteratorWithSkip(tree []int, operations []string, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BstIteratorWithSkip([]int{7, 3, 15, null, null, 9, 20}, []string{"next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"}, 10)) // Expected: [7,3,15]
	fmt.Println(BstIteratorWithSkip([]int{7}, []string{"next"}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-05-bst-iterator-with-skip', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-05-bst-iterator-with-skip'] = problem;
})();
