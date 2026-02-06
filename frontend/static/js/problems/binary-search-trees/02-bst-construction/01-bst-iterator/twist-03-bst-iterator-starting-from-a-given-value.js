/**
 * BST Iterator Starting from a Given Value
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST Iterator Starting from a Given Value',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.',
        problem: 'Instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using BST search logic to position the stack correctly. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst iterator starting from a given value.",
                  "Consider how instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using bst search logic to position the stack correctly affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [7,3,15,1,5,9,20], start=6 -> first next()=7, then 9, then 15, then 20.'
            }
        ],
        solutions: {
            python: `# BST Iterator Starting from a Given Value
# Difficulty: Medium
# Parent: 02-bst-construction/01-bst-iterator
#
# Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.

def bstIteratorStartingFromAGivenValue(data):
    """
    BST Iterator Starting from a Given Value

    Approach: Instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using BST search logic to position the stack correctly.
    """
    # TODO: Implement solution
    # Key insight: Instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using BST search logic to position the stack correctly
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [7,3,15,1,5,9,20], start=6 -> first next()=7, then 9, then 15, then 20
    print(bstIteratorStartingFromAGivenValue({}))`,
            go: `package main

import "fmt"

// BST Iterator Starting from a Given Value
// Difficulty: Medium
// Parent: 02-bst-construction/01-bst-iterator
//
// Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.

func BstIteratorStartingFromAGivenValue(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using BST search logic to position the stack correctly
    return nil
}

func main() {
    // Example: Tree: [7,3,15,1,5,9,20], start=6 -> first next()=7, then 9, then 15, then 20
    fmt.Println(BstIteratorStartingFromAGivenValue(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-03-bst-iterator-starting-from-a-given-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-03-bst-iterator-starting-from-a-given-value'] = problem;
})();
