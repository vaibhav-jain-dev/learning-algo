/**
 * BST Iterator with Peek
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST Iterator with Peek',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.',
        problem: 'While conceptually simple, peek() must not modify the stack state. You need to think about caching the top-of-stack value and handling the case where peek is called multiple times vs. interleaved with next(). Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst iterator with peek.",
                  "Consider how while conceptually simple, peek() must not modify the stack state affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [7,3,15]. peek()=3, peek()=3, next()=3, peek()=7, next()=7.'
            }
        ],
        solutions: {
            python: `# BST Iterator with Peek
# Difficulty: Medium
# Parent: 02-bst-construction/01-bst-iterator
#
# Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.

def bstIteratorWithPeek(data):
    """
    BST Iterator with Peek

    Approach: While conceptually simple, peek() must not modify the stack state.
    """
    # TODO: Implement solution
    # Key insight: While conceptually simple, peek() must not modify the stack state
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [7,3,15]
    print(bstIteratorWithPeek({}))`,
            go: `package main

import "fmt"

// BST Iterator with Peek
// Difficulty: Medium
// Parent: 02-bst-construction/01-bst-iterator
//
// Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.

func BstIteratorWithPeek(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: While conceptually simple, peek() must not modify the stack state
    return nil
}

func main() {
    // Example: Tree: [7,3,15]
    fmt.Println(BstIteratorWithPeek(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-02-bst-iterator-with-peek', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-02-bst-iterator-with-peek'] = problem;
})();
