/**
 * Validate BST Iteratively Using Morris Traversal
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Validate BST Iteratively Using Morris Traversal',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Validate the BST using O(1) extra space (no recursion stack, no explicit stack). Use Morris traversal to perform inorder traversal and check ordering.',
        problem: 'Morris traversal modifies the tree temporarily by creating threaded links. You must validate while managing thread creation and removal, and ensure the tree is restored to its original state. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: validate bst iteratively using morris traversal.",
                  "Consider how morris traversal modifies the tree temporarily by creating threaded links affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Same boolean output as base problem, but must use Morris traversal with O(1) space.'
            }
        ],
        solutions: {
            python: `# Validate BST Iteratively Using Morris Traversal
# Difficulty: Hard
# Parent: 03-validate-bst
#
# Validate the BST using O(1) extra space (no recursion stack, no explicit stack). Use Morris traversal to perform inorder traversal and check ordering.

def validateBstIterativelyUsingMorrisTraversal(data):
    """
    Validate BST Iteratively Using Morris Traversal

    Approach: Morris traversal modifies the tree temporarily by creating threaded links.
    """
    # TODO: Implement solution
    # Key insight: Morris traversal modifies the tree temporarily by creating threaded links
    pass


# Test
if __name__ == "__main__":
    # Example: Same boolean output as base problem, but must use Morris traversal with O(1) space
    print(validateBstIterativelyUsingMorrisTraversal({}))`,
            go: `package main

import "fmt"

// Validate BST Iteratively Using Morris Traversal
// Difficulty: Hard
// Parent: 03-validate-bst
//
// Validate the BST using O(1) extra space (no recursion stack, no explicit stack). Use Morris traversal to perform inorder traversal and check ordering.

func ValidateBstIterativelyUsingMorrisTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Morris traversal modifies the tree temporarily by creating threaded links
    return nil
}

func main() {
    // Example: Same boolean output as base problem, but must use Morris traversal with O(1) space
    fmt.Println(ValidateBstIterativelyUsingMorrisTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/twist-03-validate-bst-iteratively-using-morris-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/twist-03-validate-bst-iteratively-using-morris-traversal'] = problem;
})();
