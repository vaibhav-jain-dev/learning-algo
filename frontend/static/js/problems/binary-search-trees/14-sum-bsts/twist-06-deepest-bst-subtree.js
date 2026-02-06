/**
 * Deepest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Deepest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.',
        problem: 'The aggregation priority shifts from sum to depth. You must track both depth and BST validity bottom-up, and the tie-breaking rule adds a secondary comparison dimension. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: deepest bst subtree.",
                  "Consider how the aggregation priority shifts from sum to depth affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree [10, 5, 15, 1, 8, 12, 20, null, 3]. Node 3 at depth 3 is a single-node BST, which is deepest. If nodes at depth 3 included another single node with value 5, the one with larger value wins.'
            }
        ],
        solutions: {
            python: `# Deepest BST Subtree
# Difficulty: Medium
# Parent: 14-sum-bsts
#
# Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.

def deepestBstSubtree(data):
    """
    Deepest BST Subtree

    Approach: The aggregation priority shifts from sum to depth.
    """
    # TODO: Implement solution
    # Key insight: The aggregation priority shifts from sum to depth
    pass


# Test
if __name__ == "__main__":
    # Example: Tree [10, 5, 15, 1, 8, 12, 20, null, 3]
    print(deepestBstSubtree({}))`,
            go: `package main

import "fmt"

// Deepest BST Subtree
// Difficulty: Medium
// Parent: 14-sum-bsts
//
// Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.

func DeepestBstSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The aggregation priority shifts from sum to depth
    return nil
}

func main() {
    // Example: Tree [10, 5, 15, 1, 8, 12, 20, null, 3]
    fmt.Println(DeepestBstSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-06-deepest-bst-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-06-deepest-bst-subtree'] = problem;
})();
