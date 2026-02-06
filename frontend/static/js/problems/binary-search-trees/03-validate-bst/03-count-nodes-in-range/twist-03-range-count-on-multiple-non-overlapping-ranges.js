/**
 * Range Count on Multiple Non-Overlapping Ranges
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Count on Multiple Non-Overlapping Ranges',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.',
        problem: 'Multiple ranges mean you must track which range you are currently evaluating during traversal. Sorting ranges and using a pointer that advances through them during inorder traversal turns this into a merge-like operation. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range count on multiple non-overlapping ranges.",
                  "Consider how multiple ranges mean you must track which range you are currently evaluating during traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,3,7,12,20], ranges=[[3,5],[10,15],[18,25]] -> counts=[3,3,1]. Single inorder traversal counts for all ranges.'
            }
        ],
        solutions: {
            python: `# Range Count on Multiple Non-Overlapping Ranges
# Difficulty: Medium
# Parent: 03-validate-bst/03-count-nodes-in-range
#
# Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.

def rangeCountOnMultipleNonOverlappingRanges(data):
    """
    Range Count on Multiple Non-Overlapping Ranges

    Approach: Multiple ranges mean you must track which range you are currently evaluating during traversal.
    """
    # TODO: Implement solution
    # Key insight: Multiple ranges mean you must track which range you are currently evaluating during traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,3,7,12,20], ranges=[[3,5],[10,15],[18,25]] -> counts=[3,3,1]
    print(rangeCountOnMultipleNonOverlappingRanges({}))`,
            go: `package main

import "fmt"

// Range Count on Multiple Non-Overlapping Ranges
// Difficulty: Medium
// Parent: 03-validate-bst/03-count-nodes-in-range
//
// Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.

func RangeCountOnMultipleNonOverlappingRanges(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Multiple ranges mean you must track which range you are currently evaluating during traversal
    return nil
}

func main() {
    // Example: Tree: [10,5,15,3,7,12,20], ranges=[[3,5],[10,15],[18,25]] -> counts=[3,3,1]
    fmt.Println(RangeCountOnMultipleNonOverlappingRanges(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-03-range-count-on-multiple-non-overlapping-ranges', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-03-range-count-on-multiple-non-overlapping-ranges'] = problem;
})();
