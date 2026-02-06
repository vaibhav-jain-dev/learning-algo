/**
 * Sorted Array to BST with Minimum Rotations
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sorted Array to BST with Minimum Rotations',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.',
        problem: 'This combines BST construction knowledge with rotation mechanics. You must compare two tree structures and find an optimal sequence of rotations, which is a tree distance problem rather than a construction problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: sorted array to bst with minimum rotations.",
                  "Consider how this combines bst construction knowledge with rotation mechanics affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Existing: [1,null,2,null,3] (skewed), target: [2,1,3] (balanced). Minimum: 1 left rotation at node 1.'
            }
        ],
        solutions: {
            python: `# Sorted Array to BST with Minimum Rotations
# Difficulty: Very Hard
# Parent: 02-bst-construction/02-convert-sorted-array-to-bst
#
# Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.

def sortedArrayToBstWithMinimumRotations(data):
    """
    Sorted Array to BST with Minimum Rotations

    Approach: This combines BST construction knowledge with rotation mechanics.
    """
    # TODO: Implement solution
    # Key insight: This combines BST construction knowledge with rotation mechanics
    pass


# Test
if __name__ == "__main__":
    # Example: Existing: [1,null,2,null,3] (skewed), target: [2,1,3] (balanced)
    print(sortedArrayToBstWithMinimumRotations({}))`,
            go: `package main

import "fmt"

// Sorted Array to BST with Minimum Rotations
// Difficulty: Very Hard
// Parent: 02-bst-construction/02-convert-sorted-array-to-bst
//
// Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.

func SortedArrayToBstWithMinimumRotations(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This combines BST construction knowledge with rotation mechanics
    return nil
}

func main() {
    // Example: Existing: [1,null,2,null,3] (skewed), target: [2,1,3] (balanced)
    fmt.Println(SortedArrayToBstWithMinimumRotations(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-05-sorted-array-to-bst-with-minimum-rotations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-05-sorted-array-to-bst-with-minimum-rotations'] = problem;
})();
