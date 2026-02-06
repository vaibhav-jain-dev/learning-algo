/**
 * Reconstruct from Postorder
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 07-reconstruct-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reconstruct from Postorder',
        difficulty: 'Medium',
        algorithm: 'bst-reconstruction',
        parent: '07-reconstruct-bst',
        description: 'Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.',
        problem: 'Postorder is left-right-root, so the root is the last element instead of the first. You must process the array from right to left, building right subtree before left, reversing the mental model. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: reconstruct from postorder.",
                  "Consider how postorder is left-right-root, so the root is the last element instead of the first affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Postorder [1, 2, 5, 4, 18, 19, 17, 10]. Root is 10, right subtree from [17, 19, 18], left subtree from [4, 5, 2, 1].'
            }
        ],
        solutions: {
            python: `# Reconstruct from Postorder
# Difficulty: Medium
# Parent: 07-reconstruct-bst
#
# Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.

def reconstructFromPostorder(data):
    """
    Reconstruct from Postorder

    Approach: Postorder is left-right-root, so the root is the last element instead of the first.
    """
    # TODO: Implement solution
    # Key insight: Postorder is left-right-root, so the root is the last element instead of the first
    pass


# Test
if __name__ == "__main__":
    # Example: Postorder [1, 2, 5, 4, 18, 19, 17, 10]
    print(reconstructFromPostorder({}))`,
            go: `package main

import "fmt"

// Reconstruct from Postorder
// Difficulty: Medium
// Parent: 07-reconstruct-bst
//
// Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.

func ReconstructFromPostorder(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Postorder is left-right-root, so the root is the last element instead of the first
    return nil
}

func main() {
    // Example: Postorder [1, 2, 5, 4, 18, 19, 17, 10]
    fmt.Println(ReconstructFromPostorder(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '07-reconstruct-bst/twist-01-reconstruct-from-postorder', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/07-reconstruct-bst/twist-01-reconstruct-from-postorder'] = problem;
})();
