/**
 * Bidirectional BST Iterator
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional BST Iterator',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.',
        problem: 'A single stack only supports one direction. Supporting both requires either two stacks or a different state representation. Switching direction mid-traversal is particularly tricky since you need to reverse the stack semantics. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bidirectional bst iterator.",
                  "Consider how a single stack only supports one direction affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [7,3,15,null,null,9,20]. next()=3, next()=7, prev()=3, next()=7, next()=9.'
            }
        ],
        solutions: {
            python: `# Bidirectional BST Iterator
# Difficulty: Hard
# Parent: 02-bst-construction/01-bst-iterator
#
# Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.

def bidirectionalBstIterator(data):
    """
    Bidirectional BST Iterator

    Approach: A single stack only supports one direction.
    """
    # TODO: Implement solution
    # Key insight: A single stack only supports one direction
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [7,3,15,null,null,9,20]
    print(bidirectionalBstIterator({}))`,
            go: `package main

import "fmt"

// Bidirectional BST Iterator
// Difficulty: Hard
// Parent: 02-bst-construction/01-bst-iterator
//
// Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.

func BidirectionalBstIterator(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: A single stack only supports one direction
    return nil
}

func main() {
    // Example: Tree: [7,3,15,null,null,9,20]
    fmt.Println(BidirectionalBstIterator(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-01-bidirectional-bst-iterator', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-01-bidirectional-bst-iterator'] = problem;
})();
