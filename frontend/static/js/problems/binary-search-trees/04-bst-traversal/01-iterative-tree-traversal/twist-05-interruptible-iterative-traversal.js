/**
 * Interruptible Iterative Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Interruptible Iterative Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.',
        problem: 'Standard traversal runs to completion. Making it interruptible requires externalizing all state (the stack and current pointer) into a resumable object, essentially building a manual coroutine or iterator from the traversal logic. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: interruptible iterative traversal.",
                  "Consider how standard traversal runs to completion affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [1,2,3,4,5]. resume(null)={value:4, state:S1}. resume(S1)={value:2, state:S2}. resume(S2)={value:5, state:S3}...'
            }
        ],
        solutions: {
            python: `# Interruptible Iterative Traversal
# Difficulty: Medium
# Parent: 04-bst-traversal/01-iterative-tree-traversal
#
# Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.

def interruptibleIterativeTraversal(data):
    """
    Interruptible Iterative Traversal

    Approach: Standard traversal runs to completion.
    """
    # TODO: Implement solution
    # Key insight: Standard traversal runs to completion
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [1,2,3,4,5]
    print(interruptibleIterativeTraversal({}))`,
            go: `package main

import "fmt"

// Interruptible Iterative Traversal
// Difficulty: Medium
// Parent: 04-bst-traversal/01-iterative-tree-traversal
//
// Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.

func InterruptibleIterativeTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Standard traversal runs to completion
    return nil
}

func main() {
    // Example: Tree: [1,2,3,4,5]
    fmt.Println(InterruptibleIterativeTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-05-interruptible-iterative-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-05-interruptible-iterative-traversal'] = problem;
})();
