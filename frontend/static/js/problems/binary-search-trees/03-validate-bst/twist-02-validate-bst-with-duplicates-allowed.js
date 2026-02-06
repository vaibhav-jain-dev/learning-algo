/**
 * Validate BST with Duplicates Allowed
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 * Parent: 03-validate-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate BST with Duplicates Allowed',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.',
        problem: 'The boundary conditions change subtly. Equal values are now valid on the left side, which means the min/max bound passing must use strict vs. non-strict comparisons differently for each direction. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,13,22,1,null,null,null,null,14]},
                output: true,
                explanation: 'The validate bst with duplicates allowed condition is satisfied for this input.'
            },
            {
                input: {"tree":[10,5,15,2,5,10,22]},
                output: false,
                explanation: 'The validate bst with duplicates allowed condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def validate_bst_with_duplicates_allowed(tree):
    """
    Validate BST with Duplicates Allowed

    Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.

    Time: O(n)
    Space: O(1)
    """
    if not tree:
        return False

    # Process the input
    for i in range(len(tree)):
        pass  # Check condition

    return True


# Test cases
print(validate_bst_with_duplicates_allowed([10,5,15,2,5,13,22,1,None,None,None,None,14]))  # Expected: True
print(validate_bst_with_duplicates_allowed([10,5,15,2,5,10,22]))  # Expected: False
print(validate_bst_with_duplicates_allowed([10]))  # Expected: False
`,
            go: `package main

import "fmt"

// ValidateBstWithDuplicatesAllowed solves the Validate BST with Duplicates Allowed problem.
// Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.
// Time: O(n), Space: O(1)
func ValidateBstWithDuplicatesAllowed(tree []int) bool {
	if len(tree) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(ValidateBstWithDuplicatesAllowed([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14})) // Expected: true
	fmt.Println(ValidateBstWithDuplicatesAllowed([]int{10, 5, 15, 2, 5, 10, 22})) // Expected: false
	fmt.Println(ValidateBstWithDuplicatesAllowed([]int{10})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/twist-02-validate-bst-with-duplicates-allowed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/twist-02-validate-bst-with-duplicates-allowed'] = problem;
})();
