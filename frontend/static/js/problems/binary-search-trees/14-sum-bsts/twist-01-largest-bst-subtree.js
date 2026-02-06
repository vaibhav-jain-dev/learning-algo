/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.',
        problem: 'Summing all BST subtrees accumulates across many subtrees. Finding the largest requires comparison and tracking of the maximum, and you must be careful that a valid BST subtree includes all descendants, not just some. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: largest bst subtree.",
                  "Consider how summing all bst subtrees accumulates across many subtrees affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree [10, 5, 15, 1, 8, null, 7]. The subtree rooted at 5 (with children 1, 8) is a valid BST of size 3. The full tree is not a valid BST because 7 < 15 is in the right subtree of 15 on the wrong side.'
            }
        ],
        solutions: {
            python: `# Largest BST Subtree
# Difficulty: Hard
# Parent: 14-sum-bsts
#
# Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.

def largestBstSubtree(data):
    """
    Largest BST Subtree

    Approach: Summing all BST subtrees accumulates across many subtrees.
    """
    # TODO: Implement solution
    # Key insight: Summing all BST subtrees accumulates across many subtrees
    pass


# Test
if __name__ == "__main__":
    # Example: Tree [10, 5, 15, 1, 8, null, 7]
    print(largestBstSubtree({}))`,
            go: `package main

import "fmt"

// Largest BST Subtree
// Difficulty: Hard
// Parent: 14-sum-bsts
//
// Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.

func LargestBstSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Summing all BST subtrees accumulates across many subtrees
    return nil
}

func main() {
    // Example: Tree [10, 5, 15, 1, 8, null, 7]
    fmt.Println(LargestBstSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-01-largest-bst-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-01-largest-bst-subtree'] = problem;
})();
