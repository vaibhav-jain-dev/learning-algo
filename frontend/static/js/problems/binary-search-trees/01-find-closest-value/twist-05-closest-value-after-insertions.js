/**
 * Closest Value After Insertions
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Value After Insertions',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.',
        problem: 'The tree structure changes with each insertion. You must think about how insertions affect the search path and whether you can maintain the closest value incrementally rather than re-searching from scratch. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: closest value after insertions.",
                  "Consider how the tree structure changes with each insertion affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Target=12, insertions=[10,15,5,13,22] -> After each: [10, 10, 10, 13, 13].'
            }
        ],
        solutions: {
            python: `# Closest Value After Insertions
# Difficulty: Medium
# Parent: 01-find-closest-value
#
# Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.

def closestValueAfterInsertions(data):
    """
    Closest Value After Insertions

    Approach: The tree structure changes with each insertion.
    """
    # TODO: Implement solution
    # Key insight: The tree structure changes with each insertion
    pass


# Test
if __name__ == "__main__":
    # Example: Target=12, insertions=[10,15,5,13,22] -> After each: [10, 10, 10, 13, 13]
    print(closestValueAfterInsertions({}))`,
            go: `package main

import "fmt"

// Closest Value After Insertions
// Difficulty: Medium
// Parent: 01-find-closest-value
//
// Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.

func ClosestValueAfterInsertions(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The tree structure changes with each insertion
    return nil
}

func main() {
    // Example: Target=12, insertions=[10,15,5,13,22] -> After each: [10, 10, 10, 13, 13]
    fmt.Println(ClosestValueAfterInsertions(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-05-closest-value-after-insertions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-05-closest-value-after-insertions'] = problem;
})();
