/**
 * Predecessor and Successor in Threaded BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Predecessor and Successor in Threaded BST',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.',
        problem: 'Threaded trees change the traversal paradigm entirely. You follow thread links instead of using a stack or recursion, requiring you to distinguish between real children and thread pointers. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: predecessor and successor in threaded bst.",
                  "Consider how threaded trees change the traversal paradigm entirely affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Same logical result as base problem but traversal follows thread pointers instead of using recursive calls.'
            }
        ],
        solutions: {
            python: `# Predecessor and Successor in Threaded BST
# Difficulty: Hard
# Parent: 01-find-closest-value/02-closest-bst-value-ii
#
# The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.

def predecessorAndSuccessorInThreadedBst(data):
    """
    Predecessor and Successor in Threaded BST

    Approach: Threaded trees change the traversal paradigm entirely.
    """
    # TODO: Implement solution
    # Key insight: Threaded trees change the traversal paradigm entirely
    pass


# Test
if __name__ == "__main__":
    # Example: Same logical result as base problem but traversal follows thread pointers instead of using recursive calls
    print(predecessorAndSuccessorInThreadedBst({}))`,
            go: `package main

import "fmt"

// Predecessor and Successor in Threaded BST
// Difficulty: Hard
// Parent: 01-find-closest-value/02-closest-bst-value-ii
//
// The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.

func PredecessorAndSuccessorInThreadedBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Threaded trees change the traversal paradigm entirely
    return nil
}

func main() {
    // Example: Same logical result as base problem but traversal follows thread pointers instead of using recursive calls
    fmt.Println(PredecessorAndSuccessorInThreadedBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-03-predecessor-and-successor-in-threaded-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-03-predecessor-and-successor-in-threaded-bst'] = problem;
})();
