/**
 * Kth Smallest in Range
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Smallest in Range',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Find the kth smallest value that falls within the range [low, high] in the BST.',
        problem: 'You combine range filtering with order statistics. You cannot simply do inorder traversal and count, because pruning for efficiency while tracking position within the filtered set requires careful state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: kth smallest in range.",
                  "Consider how you combine range filtering with order statistics affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, 13, 18, 1], low=5, high=15. Values in range sorted: [5, 7, 10, 13, 15]. k=3 returns 10.'
            }
        ],
        solutions: {
            python: `# Kth Smallest in Range
# Difficulty: Hard
# Parent: 10-range-sum-bst
#
# Find the kth smallest value that falls within the range [low, high] in the BST.

def kthSmallestInRange(data):
    """
    Kth Smallest in Range

    Approach: You combine range filtering with order statistics.
    """
    # TODO: Implement solution
    # Key insight: You combine range filtering with order statistics
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, 13, 18, 1], low=5, high=15
    print(kthSmallestInRange({}))`,
            go: `package main

import "fmt"

// Kth Smallest in Range
// Difficulty: Hard
// Parent: 10-range-sum-bst
//
// Find the kth smallest value that falls within the range [low, high] in the BST.

func KthSmallestInRange(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You combine range filtering with order statistics
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, 13, 18, 1], low=5, high=15
    fmt.Println(KthSmallestInRange(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-05-kth-smallest-in-range', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-05-kth-smallest-in-range'] = problem;
})();
