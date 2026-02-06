/**
 * Boundary Traversal
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Boundary Traversal',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Return the boundary values of the BST: left boundary (top to bottom), all leaves (left to right), and right boundary (bottom to top), without duplicates.',
        problem: 'This is not a standard traversal order. You must combine three different traversal strategies (leftmost path, leaf detection, rightmost path in reverse) and handle overlap at corners where boundary paths meet leaves. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: boundary traversal.",
                  "Consider how this is not a standard traversal order affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,5,null,22,1,null,null,null,null,null,null,25] -> Boundary: [10,5,2,1,25,22,15].'
            }
        ],
        solutions: {
            python: `# Boundary Traversal
# Difficulty: Hard
# Parent: 04-bst-traversal
#
# Return the boundary values of the BST: left boundary (top to bottom), all leaves (left to right), and right boundary (bottom to top), without duplicates.

def boundaryTraversal(data):
    """
    Boundary Traversal

    Approach: This is not a standard traversal order.
    """
    # TODO: Implement solution
    # Key insight: This is not a standard traversal order
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,5,null,22,1,null,null,null,null,null,null,25] -> Boundary: [10,5,2,1,25,22,15]
    print(boundaryTraversal({}))`,
            go: `package main

import "fmt"

// Boundary Traversal
// Difficulty: Hard
// Parent: 04-bst-traversal
//
// Return the boundary values of the BST: left boundary (top to bottom), all leaves (left to right), and right boundary (bottom to top), without duplicates.

func BoundaryTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This is not a standard traversal order
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,5,null,22,1,null,null,null,null,null,null,25] -> Boundary: [10,5,2,1,25,22,15]
    fmt.Println(BoundaryTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-01-boundary-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-01-boundary-traversal'] = problem;
})();
