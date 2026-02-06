/**
 * Bidirectional BST Iterator
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional BST Iterator',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.',
        problem: 'A single stack only handles one direction. Supporting prev() requires either a second stack, parent pointers, or a clever scheme to reverse direction mid-traversal. The state management becomes significantly more complex. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bidirectional bst iterator.",
                  "Consider how a single stack only handles one direction affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [7, 3, 15, null, null, 9, 20]. Calling next() three times gives 3, 7, 9. Calling prev() gives 7. Calling next() again gives 9.'
            }
        ],
        solutions: {
            python: `# Bidirectional BST Iterator
# Difficulty: Hard
# Parent: 11-bst-iterator
#
# Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.

def bidirectionalBstIterator(data):
    """
    Bidirectional BST Iterator

    Approach: A single stack only handles one direction.
    """
    # TODO: Implement solution
    # Key insight: A single stack only handles one direction
    pass


# Test
if __name__ == "__main__":
    # Example: BST [7, 3, 15, null, null, 9, 20]
    print(bidirectionalBstIterator({}))`,
            go: `package main

import "fmt"

// Bidirectional BST Iterator
// Difficulty: Hard
// Parent: 11-bst-iterator
//
// Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.

func BidirectionalBstIterator(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: A single stack only handles one direction
    return nil
}

func main() {
    // Example: BST [7, 3, 15, null, null, 9, 20]
    fmt.Println(BidirectionalBstIterator(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-01-bidirectional-bst-iterator', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-01-bidirectional-bst-iterator'] = problem;
})();
