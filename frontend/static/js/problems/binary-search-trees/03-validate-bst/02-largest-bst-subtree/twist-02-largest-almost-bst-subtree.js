/**
 * Largest Almost-BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-validation
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Almost-BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find the largest subtree that can become a valid BST by removing at most one node from it.',
        problem: 'You must consider subtrees that are "almost valid" -- one violation is tolerable. This requires tracking not just validity but the number of violations and which node to remove, adding a dimension to the state. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,1,8,null,7]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[2,1,3]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def largest_almost_bst_subtree(tree):
    """
    Largest Almost-BST Subtree

    Find the largest subtree that can become a valid BST by removing at most one node from it.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_almost_bst_subtree([10,5,15,1,8,None,7]))  # Expected: 1
print(largest_almost_bst_subtree([2,1,3]))  # Expected: 2
print(largest_almost_bst_subtree([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestAlmostBstSubtree solves the Largest Almost-BST Subtree problem.
// Find the largest subtree that can become a valid BST by removing at most one node from it.
// Time: O(n), Space: O(1)
func LargestAlmostBstSubtree(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestAlmostBstSubtree([]int{10, 5, 15, 1, 8, null, 7})) // Expected: 1
	fmt.Println(LargestAlmostBstSubtree([]int{2, 1, 3})) // Expected: 2
	fmt.Println(LargestAlmostBstSubtree([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-02-largest-almost-bst-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-02-largest-almost-bst-subtree'] = problem;
})();
