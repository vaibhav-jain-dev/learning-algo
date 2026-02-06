/**
 * Kth Smallest Instead
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Smallest Instead',
        difficulty: 'Easy',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Instead of finding the kth largest, find the kth smallest value in the BST.',
        problem: 'The traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: kth smallest instead.",
                  "Consider how the traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For BST [15, 5, 20, 2, 5, 17, 22, 1] with k=3, the kth smallest is 5 (values in order: 1, 2, 5, 5, 15, 17, 20, 22).'
            }
        ],
        solutions: {
            python: `# Kth Smallest Instead
# Difficulty: Easy
# Parent: 06-find-kth-largest
#
# Instead of finding the kth largest, find the kth smallest value in the BST.

def kthSmallestInstead(data):
    """
    Kth Smallest Instead

    Approach: The traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry.
    """
    # TODO: Implement solution
    # Key insight: The traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry
    pass


# Test
if __name__ == "__main__":
    # Example: For BST [15, 5, 20, 2, 5, 17, 22, 1] with k=3, the kth smallest is 5 (values in order: 1, 2, 5, 5, 15, 17, 20, 22)
    print(kthSmallestInstead({}))`,
            go: `package main

import "fmt"

// Kth Smallest Instead
// Difficulty: Easy
// Parent: 06-find-kth-largest
//
// Instead of finding the kth largest, find the kth smallest value in the BST.

func KthSmallestInstead(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry
    return nil
}

func main() {
    // Example: For BST [15, 5, 20, 2, 5, 17, 22, 1] with k=3, the kth smallest is 5 (values in order: 1, 2, 5, 5, 15, 17, 20, 22)
    fmt.Println(KthSmallestInstead(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-02-kth-smallest-instead', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-02-kth-smallest-instead'] = problem;
})();
