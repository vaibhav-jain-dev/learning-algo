/**
 * All Maximal BST Subtrees
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Maximal BST Subtrees',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.',
        problem: 'Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward. This requires understanding the boundary between BST and non-BST regions throughout the tree. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: all maximal bst subtrees.",
                  "Consider how instead of finding the single largest, you must identify all bst subtrees that cannot be extended upward affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [8,4,12,2,6,9,15,1,3,5,7,null,11,13,20] might have multiple maximal BST subtrees if the root itself is not a valid BST.'
            }
        ],
        solutions: {
            python: `# All Maximal BST Subtrees
# Difficulty: Hard
# Parent: 03-validate-bst/02-largest-bst-subtree
#
# Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.

def allMaximalBstSubtrees(data):
    """
    All Maximal BST Subtrees

    Approach: Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward.
    """
    # TODO: Implement solution
    # Key insight: Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [8,4,12,2,6,9,15,1,3,5,7,null,11,13,20] might have multiple maximal BST subtrees if the root itself is not a valid BST
    print(allMaximalBstSubtrees({}))`,
            go: `package main

import "fmt"

// All Maximal BST Subtrees
// Difficulty: Hard
// Parent: 03-validate-bst/02-largest-bst-subtree
//
// Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.

func AllMaximalBstSubtrees(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward
    return nil
}

func main() {
    // Example: Tree: [8,4,12,2,6,9,15,1,3,5,7,null,11,13,20] might have multiple maximal BST subtrees if the root itself is not a valid BST
    fmt.Println(AllMaximalBstSubtrees(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-03-all-maximal-bst-subtrees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-03-all-maximal-bst-subtrees'] = problem;
})();
