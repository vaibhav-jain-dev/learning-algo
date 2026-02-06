/**
 * Unified Iterative Traversal (Single Template)
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unified Iterative Traversal (Single Template)',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.',
        problem: 'The standard iterative approaches use fundamentally different stack strategies for each traversal. A unified template forces you to think about a general framework that abstracts the traversal order into a configurable parameter. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: unified iterative traversal (single template).",
                  "Consider how the standard iterative approaches use fundamentally different stack strategies for each traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Using a (node, visited) tuple on the stack: for inorder, push right, self(marked), left. Popping a marked node means process it. Same structure for all three by reordering pushes.'
            }
        ],
        solutions: {
            python: `# Unified Iterative Traversal (Single Template)
# Difficulty: Hard
# Parent: 04-bst-traversal/01-iterative-tree-traversal
#
# Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.

def unifiedIterativeTraversalSingleTemplate(data):
    """
    Unified Iterative Traversal (Single Template)

    Approach: The standard iterative approaches use fundamentally different stack strategies for each traversal.
    """
    # TODO: Implement solution
    # Key insight: The standard iterative approaches use fundamentally different stack strategies for each traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Using a (node, visited) tuple on the stack: for inorder, push right, self(marked), left
    print(unifiedIterativeTraversalSingleTemplate({}))`,
            go: `package main

import "fmt"

// Unified Iterative Traversal (Single Template)
// Difficulty: Hard
// Parent: 04-bst-traversal/01-iterative-tree-traversal
//
// Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.

func UnifiedIterativeTraversalSingleTemplate(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The standard iterative approaches use fundamentally different stack strategies for each traversal
    return nil
}

func main() {
    // Example: Using a (node, visited) tuple on the stack: for inorder, push right, self(marked), left
    fmt.Println(UnifiedIterativeTraversalSingleTemplate(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-01-unified-iterative-traversal-single-template', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-01-unified-iterative-traversal-single-template'] = problem;
})();
