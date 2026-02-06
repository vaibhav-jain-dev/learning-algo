/**
 * All Possible Height-Balanced BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Possible Height-Balanced BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.',
        problem: 'The base problem picks one middle element deterministically. This twist requires exploring both choices when the subarray has even length, turning a single recursive path into a branching enumeration problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: all possible height-balanced bsts.",
                  "Consider how the base problem picks one middle element deterministically affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'nums=[1,2,3,4] -> Two valid BSTs: [2,1,3,null,null,null,4] and [3,2,4,1]. Both are height-balanced.'
            }
        ],
        solutions: {
            python: `# All Possible Height-Balanced BSTs
# Difficulty: Hard
# Parent: 02-bst-construction/02-convert-sorted-array-to-bst
#
# Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.

def allPossibleHeightBalancedBsts(data):
    """
    All Possible Height-Balanced BSTs

    Approach: The base problem picks one middle element deterministically.
    """
    # TODO: Implement solution
    # Key insight: The base problem picks one middle element deterministically
    pass


# Test
if __name__ == "__main__":
    # Example: nums=[1,2,3,4] -> Two valid BSTs: [2,1,3,null,null,null,4] and [3,2,4,1]
    print(allPossibleHeightBalancedBsts({}))`,
            go: `package main

import "fmt"

// All Possible Height-Balanced BSTs
// Difficulty: Hard
// Parent: 02-bst-construction/02-convert-sorted-array-to-bst
//
// Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.

func AllPossibleHeightBalancedBsts(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The base problem picks one middle element deterministically
    return nil
}

func main() {
    // Example: nums=[1,2,3,4] -> Two valid BSTs: [2,1,3,null,null,null,4] and [3,2,4,1]
    fmt.Println(AllPossibleHeightBalancedBsts(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-02-all-possible-height-balanced-bsts', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-02-all-possible-height-balanced-bsts'] = problem;
})();
