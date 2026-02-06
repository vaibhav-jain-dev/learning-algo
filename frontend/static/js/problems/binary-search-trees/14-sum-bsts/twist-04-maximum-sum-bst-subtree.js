/**
 * Maximum Sum BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Sum BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.',
        problem: 'Instead of summing all BST subtree sums together, you find the one with the maximum sum. This requires tracking the sum of each BST subtree individually and maintaining a global maximum, while the bottom-up validation logic remains similar. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: maximum sum bst subtree.",
                  "Consider how instead of summing all bst subtree sums together, you find the one with the maximum sum affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]. BST subtree [3, null, 5, 4, 6] has sum 18. BST subtree [4, 2, 4] has sum 10. Maximum BST subtree sum is 18.'
            }
        ],
        solutions: {
            python: `# Maximum Sum BST Subtree
# Difficulty: Hard
# Parent: 14-sum-bsts
#
# Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.

def maximumSumBstSubtree(data):
    """
    Maximum Sum BST Subtree

    Approach: Instead of summing all BST subtree sums together, you find the one with the maximum sum.
    """
    # TODO: Implement solution
    # Key insight: Instead of summing all BST subtree sums together, you find the one with the maximum sum
    pass


# Test
if __name__ == "__main__":
    # Example: Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]
    print(maximumSumBstSubtree({}))`,
            go: `package main

import "fmt"

// Maximum Sum BST Subtree
// Difficulty: Hard
// Parent: 14-sum-bsts
//
// Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.

func MaximumSumBstSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of summing all BST subtree sums together, you find the one with the maximum sum
    return nil
}

func main() {
    // Example: Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]
    fmt.Println(MaximumSumBstSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-04-maximum-sum-bst-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-04-maximum-sum-bst-subtree'] = problem;
})();
