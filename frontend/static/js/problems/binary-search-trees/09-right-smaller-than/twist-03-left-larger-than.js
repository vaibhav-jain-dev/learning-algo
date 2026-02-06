/**
 * Left Larger Than
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';
    const problem = {
        name: 'Left Larger Than',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.',
        problem: 'Processing from left to right changes the dynamic. You insert elements into the BST in forward order and count how many previously inserted values are larger, which requires tracking right-subtree sizes during insertion. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: left larger than.",
                  "Consider how processing from left to right changes the dynamic affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [8, 5, 11, -1, 3, 4, 2], left-larger counts are [0, 1, 0, 3, 2, 2, 3]. For -1 at index 3, all three preceding values (8, 5, 11) are larger.'
            }
        ],
        solutions: {
            python: `# Left Larger Than
# Difficulty: Hard
# Parent: 09-right-smaller-than
#
# For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.

def leftLargerThan(data):
    """
    Left Larger Than

    Approach: Processing from left to right changes the dynamic.
    """
    # TODO: Implement solution
    # Key insight: Processing from left to right changes the dynamic
    pass


# Test
if __name__ == "__main__":
    # Example: For [8, 5, 11, -1, 3, 4, 2], left-larger counts are [0, 1, 0, 3, 2, 2, 3]
    print(leftLargerThan({}))`,
            go: `package main

import "fmt"

// Left Larger Than
// Difficulty: Hard
// Parent: 09-right-smaller-than
//
// For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.

func LeftLargerThan(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Processing from left to right changes the dynamic
    return nil
}

func main() {
    // Example: For [8, 5, 11, -1, 3, 4, 2], left-larger counts are [0, 1, 0, 3, 2, 2, 3]
    fmt.Println(LeftLargerThan(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-03-left-larger-than', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-03-left-larger-than'] = problem;
})();
