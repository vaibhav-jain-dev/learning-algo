/**
 * Validate BST with Duplicates Allowed
 * Category: binary-search-trees
 * Difficulty: Medium
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
                  "Start with the base problem solution and identify what changes: validate bst with duplicates allowed.",
                  "Consider how the boundary conditions change subtly affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [5,5,7,3,5,6,8] -> Valid (duplicates of 5 in left subtree are OK). Tree: [5,3,5] -> Valid (5 in right subtree equals root, must be strictly greater -> Invalid).'
            }
        ],
        solutions: {
            python: `# Validate BST with Duplicates Allowed
# Difficulty: Medium
# Parent: 03-validate-bst
#
# Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.

def validateBstWithDuplicatesAllowed(data):
    """
    Validate BST with Duplicates Allowed

    Approach: The boundary conditions change subtly.
    """
    # TODO: Implement solution
    # Key insight: The boundary conditions change subtly
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [5,5,7,3,5,6,8] -> Valid (duplicates of 5 in left subtree are OK)
    print(validateBstWithDuplicatesAllowed({}))`,
            go: `package main

import "fmt"

// Validate BST with Duplicates Allowed
// Difficulty: Medium
// Parent: 03-validate-bst
//
// Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.

func ValidateBstWithDuplicatesAllowed(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The boundary conditions change subtly
    return nil
}

func main() {
    // Example: Tree: [5,5,7,3,5,6,8] -> Valid (duplicates of 5 in left subtree are OK)
    fmt.Println(ValidateBstWithDuplicatesAllowed(map[string]interface{}{}))
}`
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
