/**
 * Traversal with Depth Callback
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Traversal with Depth Callback',
        difficulty: 'Easy',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.',
        problem: 'Adding depth tracking requires passing an additional parameter through the recursion. While simple for recursion, it changes how you think about the iterative stack-based versions since depth must be explicitly tracked. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: traversal with depth callback.",
                  "Consider how adding depth tracking requires passing an additional parameter through the recursion affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15]. Inorder with depth: [{value:5,depth:1}, {value:10,depth:0}, {value:15,depth:1}].'
            }
        ],
        solutions: {
            python: `# Traversal with Depth Callback
# Difficulty: Easy
# Parent: 04-bst-traversal
#
# Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.

def traversalWithDepthCallback(data):
    """
    Traversal with Depth Callback

    Approach: Adding depth tracking requires passing an additional parameter through the recursion.
    """
    # TODO: Implement solution
    # Key insight: Adding depth tracking requires passing an additional parameter through the recursion
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15]
    print(traversalWithDepthCallback({}))`,
            go: `package main

import "fmt"

// Traversal with Depth Callback
// Difficulty: Easy
// Parent: 04-bst-traversal
//
// Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.

func TraversalWithDepthCallback(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Adding depth tracking requires passing an additional parameter through the recursion
    return nil
}

func main() {
    // Example: Tree: [10,5,15]
    fmt.Println(TraversalWithDepthCallback(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-04-traversal-with-depth-callback', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-04-traversal-with-depth-callback'] = problem;
})();
