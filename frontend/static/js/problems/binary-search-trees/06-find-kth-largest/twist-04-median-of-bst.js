/**
 * Median of BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';
    const problem = {
        name: 'Median of BST',
        difficulty: 'Medium',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.',
        problem: 'You need to know the total count of nodes first, then find the middle element(s). This combines counting with kth-element finding, and the even-case averaging adds complexity. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: median of bst.",
                  "Consider how you need to know the total count of nodes first, then find the middle element(s) affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST with values [1, 2, 5, 5, 15, 17, 20, 22] has 8 nodes. Median is average of 4th and 5th smallest: (5 + 15) / 2 = 10.'
            }
        ],
        solutions: {
            python: `# Median of BST
# Difficulty: Medium
# Parent: 06-find-kth-largest
#
# Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.

def medianOfBst(data):
    """
    Median of BST

    Approach: You need to know the total count of nodes first, then find the middle element(s).
    """
    # TODO: Implement solution
    # Key insight: You need to know the total count of nodes first, then find the middle element(s)
    pass


# Test
if __name__ == "__main__":
    # Example: BST with values [1, 2, 5, 5, 15, 17, 20, 22] has 8 nodes
    print(medianOfBst({}))`,
            go: `package main

import "fmt"

// Median of BST
// Difficulty: Medium
// Parent: 06-find-kth-largest
//
// Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.

func MedianOfBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You need to know the total count of nodes first, then find the middle element(s)
    return nil
}

func main() {
    // Example: BST with values [1, 2, 5, 5, 15, 17, 20, 22] has 8 nodes
    fmt.Println(MedianOfBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-04-median-of-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-04-median-of-bst'] = problem;
})();
