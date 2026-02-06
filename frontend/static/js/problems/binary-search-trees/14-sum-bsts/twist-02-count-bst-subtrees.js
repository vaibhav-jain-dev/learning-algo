/**
 * Count BST Subtrees
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count BST Subtrees',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.',
        problem: 'Instead of summing values, you count occurrences. The traversal is similar but the aggregation differs, and you must decide whether overlapping subtrees (a BST subtree within a larger BST subtree) should both be counted. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count bst subtrees.",
                  "Consider how instead of summing values, you count occurrences affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]. Each leaf is a BST (6 leaves). The subtree [3, null, 5, 4, 6] is also a BST. Total count = 9.'
            }
        ],
        solutions: {
            python: `# Count BST Subtrees
# Difficulty: Medium
# Parent: 14-sum-bsts
#
# Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.

def countBstSubtrees(data):
    """
    Count BST Subtrees

    Approach: Instead of summing values, you count occurrences.
    """
    # TODO: Implement solution
    # Key insight: Instead of summing values, you count occurrences
    pass


# Test
if __name__ == "__main__":
    # Example: Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]
    print(countBstSubtrees({}))`,
            go: `package main

import "fmt"

// Count BST Subtrees
// Difficulty: Medium
// Parent: 14-sum-bsts
//
// Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.

func CountBstSubtrees(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of summing values, you count occurrences
    return nil
}

func main() {
    // Example: Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]
    fmt.Println(CountBstSubtrees(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-02-count-bst-subtrees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-02-count-bst-subtrees'] = problem;
})();
