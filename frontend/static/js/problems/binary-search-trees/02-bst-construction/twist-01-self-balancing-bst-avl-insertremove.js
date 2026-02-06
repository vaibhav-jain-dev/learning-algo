/**
 * Self-Balancing BST (AVL Insert/Remove)
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Self-Balancing BST (AVL Insert/Remove)',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.',
        problem: 'Standard BST operations ignore balance. AVL requires tracking height at each node, detecting imbalance, and performing single or double rotations -- a fundamentally more complex state management problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: self-balancing bst (avl insert/remove).",
                  "Consider how standard bst operations ignore balance affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Insert sequence [1,2,3] into AVL: after inserting 3, left-rotate at 1 to get balanced tree [2,1,3].'
            }
        ],
        solutions: {
            python: `# Self-Balancing BST (AVL Insert/Remove)
# Difficulty: Very Hard
# Parent: 02-bst-construction
#
# Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.

def selfBalancingBstAvlInsertremove(data):
    """
    Self-Balancing BST (AVL Insert/Remove)

    Approach: Standard BST operations ignore balance.
    """
    # TODO: Implement solution
    # Key insight: Standard BST operations ignore balance
    pass


# Test
if __name__ == "__main__":
    # Example: Insert sequence [1,2,3] into AVL: after inserting 3, left-rotate at 1 to get balanced tree [2,1,3]
    print(selfBalancingBstAvlInsertremove({}))`,
            go: `package main

import "fmt"

// Self-Balancing BST (AVL Insert/Remove)
// Difficulty: Very Hard
// Parent: 02-bst-construction
//
// Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.

func SelfBalancingBstAvlInsertremove(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Standard BST operations ignore balance
    return nil
}

func main() {
    // Example: Insert sequence [1,2,3] into AVL: after inserting 3, left-rotate at 1 to get balanced tree [2,1,3]
    fmt.Println(SelfBalancingBstAvlInsertremove(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-01-self-balancing-bst-avl-insertremove', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-01-self-balancing-bst-avl-insertremove'] = problem;
})();
