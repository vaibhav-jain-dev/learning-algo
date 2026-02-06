/**
 * Iterative Traversal with Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Traversal with Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Each node has a parent pointer. Implement inorder traversal iteratively using O(1) auxiliary space by navigating up and down via parent pointers instead of using a stack.',
        problem: 'Parent pointers eliminate the need for a stack entirely. The traversal becomes a state machine: you must determine whether you arrived at a node from its parent, from its left child, or from its right child, and transition accordingly. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: iterative traversal with parent pointers.",
                  "Consider how parent pointers eliminate the need for a stack entirely affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [1,2,3,4,5]. Using parent pointers, navigate: start at 1, go left to 2, go left to 4, process 4, go up to 2, process 2, go right to 5, process 5, go up to 2, go up to 1, process 1, go right to 3, process 3.'
            }
        ],
        solutions: {
            python: `# Iterative Traversal with Parent Pointers
# Difficulty: Medium
# Parent: 04-bst-traversal/01-iterative-tree-traversal
#
# Each node has a parent pointer. Implement inorder traversal iteratively using O(1) auxiliary space by navigating up and down via parent pointers instead of using a stack.

def iterativeTraversalWithParentPointers(data):
    """
    Iterative Traversal with Parent Pointers

    Approach: Parent pointers eliminate the need for a stack entirely.
    """
    # TODO: Implement solution
    # Key insight: Parent pointers eliminate the need for a stack entirely
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [1,2,3,4,5]
    print(iterativeTraversalWithParentPointers({}))`,
            go: `package main

import "fmt"

// Iterative Traversal with Parent Pointers
// Difficulty: Medium
// Parent: 04-bst-traversal/01-iterative-tree-traversal
//
// Each node has a parent pointer. Implement inorder traversal iteratively using O(1) auxiliary space by navigating up and down via parent pointers instead of using a stack.

func IterativeTraversalWithParentPointers(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Parent pointers eliminate the need for a stack entirely
    return nil
}

func main() {
    // Example: Tree: [1,2,3,4,5]
    fmt.Println(IterativeTraversalWithParentPointers(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-03-iterative-traversal-with-parent-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-03-iterative-traversal-with-parent-pointers'] = problem;
})();
