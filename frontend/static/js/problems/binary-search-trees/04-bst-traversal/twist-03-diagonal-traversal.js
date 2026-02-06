/**
 * Diagonal Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Diagonal Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.',
        problem: 'Diagonal grouping requires tracking a diagonal index that increments only when going left (not right). This is a non-standard grouping that does not correspond to any of the three classic traversals. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: diagonal traversal.",
                  "Consider how diagonal grouping requires tracking a diagonal index that increments only when going left (not right) affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7,12,20] -> Diagonal 0: [10,15,20], Diagonal 1: [5,7,12], Diagonal 2: [2].'
            }
        ],
        solutions: {
            python: `# Diagonal Traversal
# Difficulty: Medium
# Parent: 04-bst-traversal
#
# Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.

def diagonalTraversal(data):
    """
    Diagonal Traversal

    Approach: Diagonal grouping requires tracking a diagonal index that increments only when going left (not right).
    """
    # TODO: Implement solution
    # Key insight: Diagonal grouping requires tracking a diagonal index that increments only when going left (not right)
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7,12,20] -> Diagonal 0: [10,15,20], Diagonal 1: [5,7,12], Diagonal 2: [2]
    print(diagonalTraversal({}))`,
            go: `package main

import "fmt"

// Diagonal Traversal
// Difficulty: Medium
// Parent: 04-bst-traversal
//
// Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.

func DiagonalTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Diagonal grouping requires tracking a diagonal index that increments only when going left (not right)
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7,12,20] -> Diagonal 0: [10,15,20], Diagonal 1: [5,7,12], Diagonal 2: [2]
    fmt.Println(DiagonalTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-03-diagonal-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-03-diagonal-traversal'] = problem;
})();
