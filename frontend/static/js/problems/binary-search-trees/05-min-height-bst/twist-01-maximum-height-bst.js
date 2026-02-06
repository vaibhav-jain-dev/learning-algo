/**
 * Maximum Height BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Height BST',
        difficulty: 'Easy',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.',
        problem: 'Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: maximum height bst.",
                  "Consider how instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [1, 2, 5, 7, 10], the max-height BST is a right-skewed chain: 1 -> 2 -> 5 -> 7 -> 10, with height 4.'
            }
        ],
        solutions: {
            python: `# Maximum Height BST
# Difficulty: Easy
# Parent: 05-min-height-bst
#
# Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.

def maximumHeightBst(data):
    """
    Maximum Height BST

    Approach: Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem.
    """
    # TODO: Implement solution
    # Key insight: Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem
    pass


# Test
if __name__ == "__main__":
    # Example: For [1, 2, 5, 7, 10], the max-height BST is a right-skewed chain: 1 -> 2 -> 5 -> 7 -> 10, with height 4
    print(maximumHeightBst({}))`,
            go: `package main

import "fmt"

// Maximum Height BST
// Difficulty: Easy
// Parent: 05-min-height-bst
//
// Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.

func MaximumHeightBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem
    return nil
}

func main() {
    // Example: For [1, 2, 5, 7, 10], the max-height BST is a right-skewed chain: 1 -> 2 -> 5 -> 7 -> 10, with height 4
    fmt.Println(MaximumHeightBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-01-maximum-height-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-01-maximum-height-bst'] = problem;
})();
