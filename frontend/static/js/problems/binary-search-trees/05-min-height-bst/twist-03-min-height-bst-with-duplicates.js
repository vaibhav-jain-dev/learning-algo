/**
 * Min Height BST with Duplicates
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Min Height BST with Duplicates',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.',
        problem: 'Duplicates break the symmetry of the divide-and-conquer split. You must handle runs of identical values carefully, as placing the midpoint on a duplicate boundary can create unbalanced subtrees. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: min height bst with duplicates.",
                  "Consider how duplicates break the symmetry of the divide-and-conquer split affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [1, 2, 2, 2, 3], simply picking index 2 (value 2) as root works, but [2, 2, 2, 2, 2] requires careful handling to avoid a degenerate right-skewed tree.'
            }
        ],
        solutions: {
            python: `# Min Height BST with Duplicates
# Difficulty: Medium
# Parent: 05-min-height-bst
#
# The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.

def minHeightBstWithDuplicates(data):
    """
    Min Height BST with Duplicates

    Approach: Duplicates break the symmetry of the divide-and-conquer split.
    """
    # TODO: Implement solution
    # Key insight: Duplicates break the symmetry of the divide-and-conquer split
    pass


# Test
if __name__ == "__main__":
    # Example: For [1, 2, 2, 2, 3], simply picking index 2 (value 2) as root works, but [2, 2, 2, 2, 2] requires careful handling to avoid a degenerate right-skewed tree
    print(minHeightBstWithDuplicates({}))`,
            go: `package main

import "fmt"

// Min Height BST with Duplicates
// Difficulty: Medium
// Parent: 05-min-height-bst
//
// The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.

func MinHeightBstWithDuplicates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Duplicates break the symmetry of the divide-and-conquer split
    return nil
}

func main() {
    // Example: For [1, 2, 2, 2, 3], simply picking index 2 (value 2) as root works, but [2, 2, 2, 2, 2] requires careful handling to avoid a degenerate right-skewed tree
    fmt.Println(MinHeightBstWithDuplicates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-03-min-height-bst-with-duplicates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-03-min-height-bst-with-duplicates'] = problem;
})();
