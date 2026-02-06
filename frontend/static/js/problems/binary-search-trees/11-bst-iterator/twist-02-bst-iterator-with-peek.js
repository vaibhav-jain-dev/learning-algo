/**
 * BST Iterator with Peek
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST Iterator with Peek',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.',
        problem: 'You must separate the "look ahead" from the "advance" operation. This requires caching the next value or ensuring the stack state is preserved during peek, adding a layer of state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst iterator with peek.",
                  "Consider how you must separate the \"look ahead\" from the \"advance\" operation affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [7, 3, 15]. After calling next() -> 3, peek() -> 7, peek() -> 7 (same), next() -> 7, next() -> 15.'
            }
        ],
        solutions: {
            python: `# BST Iterator with Peek
# Difficulty: Medium
# Parent: 11-bst-iterator
#
# Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.

def bstIteratorWithPeek(data):
    """
    BST Iterator with Peek

    Approach: You must separate the "look ahead" from the "advance" operation.
    """
    # TODO: Implement solution
    # Key insight: You must separate the "look ahead" from the "advance" operation
    pass


# Test
if __name__ == "__main__":
    # Example: BST [7, 3, 15]
    print(bstIteratorWithPeek({}))`,
            go: `package main

import "fmt"

// BST Iterator with Peek
// Difficulty: Medium
// Parent: 11-bst-iterator
//
// Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.

func BstIteratorWithPeek(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must separate the "look ahead" from the "advance" operation
    return nil
}

func main() {
    // Example: BST [7, 3, 15]
    fmt.Println(BstIteratorWithPeek(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-02-bst-iterator-with-peek', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-02-bst-iterator-with-peek'] = problem;
})();
