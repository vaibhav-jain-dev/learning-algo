/**
 * Iterative Level-Aware Inorder
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Level-Aware Inorder',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Perform iterative inorder traversal but also track and return the depth of each node alongside its value.',
        problem: 'The standard iterative inorder does not naturally track depth. You must augment the stack to store depth information alongside each node, changing the stack from storing just nodes to storing (node, depth) pairs. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: iterative level-aware inorder.",
                  "Consider how the standard iterative inorder does not naturally track depth affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15]. Iterative inorder with depth: [(5,1), (10,0), (15,1)].'
            }
        ],
        solutions: {
            python: `# Iterative Level-Aware Inorder
# Difficulty: Medium
# Parent: 04-bst-traversal/01-iterative-tree-traversal
#
# Perform iterative inorder traversal but also track and return the depth of each node alongside its value.

def iterativeLevelAwareInorder(data):
    """
    Iterative Level-Aware Inorder

    Approach: The standard iterative inorder does not naturally track depth.
    """
    # TODO: Implement solution
    # Key insight: The standard iterative inorder does not naturally track depth
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15]
    print(iterativeLevelAwareInorder({}))`,
            go: `package main

import "fmt"

// Iterative Level-Aware Inorder
// Difficulty: Medium
// Parent: 04-bst-traversal/01-iterative-tree-traversal
//
// Perform iterative inorder traversal but also track and return the depth of each node alongside its value.

func IterativeLevelAwareInorder(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The standard iterative inorder does not naturally track depth
    return nil
}

func main() {
    // Example: Tree: [10,5,15]
    fmt.Println(IterativeLevelAwareInorder(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-04-iterative-level-aware-inorder', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-04-iterative-level-aware-inorder'] = problem;
})();
