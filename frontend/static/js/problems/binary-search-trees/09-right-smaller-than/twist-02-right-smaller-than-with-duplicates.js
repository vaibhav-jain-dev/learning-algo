/**
 * Right Smaller Than with Duplicates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';
    const problem = {
        name: 'Right Smaller Than with Duplicates',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.',
        problem: 'Duplicates create ambiguity in BST placement. If equal values go right, they should not be counted as "smaller." You must carefully separate the equal case from the strictly-less case in your augmented BST. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: right smaller than with duplicates.",
                  "Consider how duplicates create ambiguity in bst placement affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [5, 5, 2, 5, 3], the right-smaller counts are [2, 1, 0, 1, 0]. The first 5 has 2 and 3 to its right that are smaller, but not the other 5s.'
            }
        ],
        solutions: {
            python: `# Right Smaller Than with Duplicates
# Difficulty: Hard
# Parent: 09-right-smaller-than
#
# The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.

def rightSmallerThanWithDuplicates(data):
    """
    Right Smaller Than with Duplicates

    Approach: Duplicates create ambiguity in BST placement.
    """
    # TODO: Implement solution
    # Key insight: Duplicates create ambiguity in BST placement
    pass


# Test
if __name__ == "__main__":
    # Example: For [5, 5, 2, 5, 3], the right-smaller counts are [2, 1, 0, 1, 0]
    print(rightSmallerThanWithDuplicates({}))`,
            go: `package main

import "fmt"

// Right Smaller Than with Duplicates
// Difficulty: Hard
// Parent: 09-right-smaller-than
//
// The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.

func RightSmallerThanWithDuplicates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Duplicates create ambiguity in BST placement
    return nil
}

func main() {
    // Example: For [5, 5, 2, 5, 3], the right-smaller counts are [2, 1, 0, 1, 0]
    fmt.Println(RightSmallerThanWithDuplicates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-02-right-smaller-than-with-duplicates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-02-right-smaller-than-with-duplicates'] = problem;
})();
