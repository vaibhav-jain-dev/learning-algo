/**
 * Min Height BST from Unsorted Array
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Min Height BST from Unsorted Array',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.',
        problem: 'The original problem gives you a sorted array. Here you must first sort, but the twist is considering whether an O(n log n) sort-then-build approach can be beaten or if there are clever partitioning strategies. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: min height bst from unsorted array.",
                  "Consider how the original problem gives you a sorted array affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [7, 1, 10, 5, 2, 13, 14, 15, 22], sort to get [1,2,5,7,10,13,14,15,22] then apply the standard algorithm.'
            }
        ],
        solutions: {
            python: `# Min Height BST from Unsorted Array
# Difficulty: Medium
# Parent: 05-min-height-bst
#
# Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.

def minHeightBstFromUnsortedArray(data):
    """
    Min Height BST from Unsorted Array

    Approach: The original problem gives you a sorted array.
    """
    # TODO: Implement solution
    # Key insight: The original problem gives you a sorted array
    pass


# Test
if __name__ == "__main__":
    # Example: For [7, 1, 10, 5, 2, 13, 14, 15, 22], sort to get [1,2,5,7,10,13,14,15,22] then apply the standard algorithm
    print(minHeightBstFromUnsortedArray({}))`,
            go: `package main

import "fmt"

// Min Height BST from Unsorted Array
// Difficulty: Medium
// Parent: 05-min-height-bst
//
// Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.

func MinHeightBstFromUnsortedArray(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The original problem gives you a sorted array
    return nil
}

func main() {
    // Example: For [7, 1, 10, 5, 2, 13, 14, 15, 22], sort to get [1,2,5,7,10,13,14,15,22] then apply the standard algorithm
    fmt.Println(MinHeightBstFromUnsortedArray(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-05-min-height-bst-from-unsorted-array', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-05-min-height-bst-from-unsorted-array'] = problem;
})();
