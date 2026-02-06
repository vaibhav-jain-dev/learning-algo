/**
 * Predecessor and Successor with Node Deletion
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Predecessor and Successor with Node Deletion',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.',
        problem: 'Combining search with mutation requires careful ordering. The predecessor/successor relationship may change after deletion, so you must find them first, then handle the deletion cases (leaf, one child, two children). Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: predecessor and successor with node deletion.",
                  "Consider how combining search with mutation requires careful ordering affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [5,3,7,2,4,6,8], target=5 -> predecessor=4, successor=6, new tree root becomes 6 with restructured children.'
            }
        ],
        solutions: {
            python: `# Predecessor and Successor with Node Deletion
# Difficulty: Medium
# Parent: 01-find-closest-value/02-closest-bst-value-ii
#
# Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.

def predecessorAndSuccessorWithNodeDeletion(data):
    """
    Predecessor and Successor with Node Deletion

    Approach: Combining search with mutation requires careful ordering.
    """
    # TODO: Implement solution
    # Key insight: Combining search with mutation requires careful ordering
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [5,3,7,2,4,6,8], target=5 -> predecessor=4, successor=6, new tree root becomes 6 with restructured children
    print(predecessorAndSuccessorWithNodeDeletion({}))`,
            go: `package main

import "fmt"

// Predecessor and Successor with Node Deletion
// Difficulty: Medium
// Parent: 01-find-closest-value/02-closest-bst-value-ii
//
// Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.

func PredecessorAndSuccessorWithNodeDeletion(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Combining search with mutation requires careful ordering
    return nil
}

func main() {
    // Example: Tree: [5,3,7,2,4,6,8], target=5 -> predecessor=4, successor=6, new tree root becomes 6 with restructured children
    fmt.Println(PredecessorAndSuccessorWithNodeDeletion(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-02-predecessor-and-successor-with-node-deletion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-02-predecessor-and-successor-with-node-deletion'] = problem;
})();
