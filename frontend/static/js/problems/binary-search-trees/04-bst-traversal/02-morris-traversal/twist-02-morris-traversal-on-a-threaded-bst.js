/**
 * Morris Traversal on a Threaded BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Morris Traversal on a Threaded BST',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.',
        problem: 'Standard Morris creates and removes threads temporarily. With pre-existing threads, you must distinguish real right children from thread pointers (typically via a boolean flag per node), changing the navigation logic entirely. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: morris traversal on a threaded bst.",
                  "Consider how standard morris creates and removes threads temporarily affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Pre-threaded tree: node 1 right-thread points to 2, node 3 right-thread points to 4. Traverse using existing threads without modification.'
            }
        ],
        solutions: {
            python: `# Morris Traversal on a Threaded BST
# Difficulty: Hard
# Parent: 04-bst-traversal/02-morris-traversal
#
# The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.

def morrisTraversalOnAThreadedBst(data):
    """
    Morris Traversal on a Threaded BST

    Approach: Standard Morris creates and removes threads temporarily.
    """
    # TODO: Implement solution
    # Key insight: Standard Morris creates and removes threads temporarily
    pass


# Test
if __name__ == "__main__":
    # Example: Pre-threaded tree: node 1 right-thread points to 2, node 3 right-thread points to 4
    print(morrisTraversalOnAThreadedBst({}))`,
            go: `package main

import "fmt"

// Morris Traversal on a Threaded BST
// Difficulty: Hard
// Parent: 04-bst-traversal/02-morris-traversal
//
// The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.

func MorrisTraversalOnAThreadedBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Standard Morris creates and removes threads temporarily
    return nil
}

func main() {
    // Example: Pre-threaded tree: node 1 right-thread points to 2, node 3 right-thread points to 4
    fmt.Println(MorrisTraversalOnAThreadedBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-02-morris-traversal-on-a-threaded-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-02-morris-traversal-on-a-threaded-bst'] = problem;
})();
