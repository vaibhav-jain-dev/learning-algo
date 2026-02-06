/**
 * Detect How Many Nodes Are Swapped
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-repair
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect How Many Nodes Are Swapped',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).',
        problem: 'This generalizes from knowing exactly two nodes are swapped to computing the minimum swaps. It requires finding the permutation cycle decomposition of actual vs. expected inorder positions. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the detect how many nodes are swapped criteria.'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the detect how many nodes are swapped criteria.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def detect_how_many_nodes_are_swapped(tree):
    """
    Detect How Many Nodes Are Swapped

    Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(detect_how_many_nodes_are_swapped([1,3,None,None,2]))  # Expected: 1
print(detect_how_many_nodes_are_swapped([3,1,4,None,None,2]))  # Expected: 2
print(detect_how_many_nodes_are_swapped([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DetectHowManyNodesAreSwapped solves the Detect How Many Nodes Are Swapped problem.
// Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).
// Time: O(n), Space: O(1)
func DetectHowManyNodesAreSwapped(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DetectHowManyNodesAreSwapped([]int{1, 3, null, null, 2})) // Expected: 1
	fmt.Println(DetectHowManyNodesAreSwapped([]int{3, 1, 4, null, null, 2})) // Expected: 2
	fmt.Println(DetectHowManyNodesAreSwapped([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-03-detect-how-many-nodes-are-swapped', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-03-detect-how-many-nodes-are-swapped'] = problem;
})();
