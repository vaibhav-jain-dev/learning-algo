/**
 * Find the Deepest Invalid Node
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Deepest Invalid Node',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'If the tree is not a valid BST, find the deepest node that causes a violation. If multiple violations exist at the same depth, return all of them.',
        problem: 'You must traverse the entire tree even after finding violations, tracking depth information. The definition of "causes a violation" is ambiguous -- is it the node out of range, or its ancestor that set the wrong boundary? Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: find the deepest invalid node.",
                  "Consider how you must traverse the entire tree even after finding violations, tracking depth information affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,12,8,22] -> Deepest violations at depth 2: node 12 (in left subtree of 10, value>10) and node 8 (in right subtree of 10, value<10).'
            }
        ],
        solutions: {
            python: `# Find the Deepest Invalid Node
# Difficulty: Hard
# Parent: 03-validate-bst
#
# If the tree is not a valid BST, find the deepest node that causes a violation. If multiple violations exist at the same depth, return all of them.

def findTheDeepestInvalidNode(data):
    """
    Find the Deepest Invalid Node

    Approach: You must traverse the entire tree even after finding violations, tracking depth information.
    """
    # TODO: Implement solution
    # Key insight: You must traverse the entire tree even after finding violations, tracking depth information
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,12,8,22] -> Deepest violations at depth 2: node 12 (in left subtree of 10, value>10) and node 8 (in right subtree of 10, value<10)
    print(findTheDeepestInvalidNode({}))`,
            go: `package main

import "fmt"

// Find the Deepest Invalid Node
// Difficulty: Hard
// Parent: 03-validate-bst
//
// If the tree is not a valid BST, find the deepest node that causes a violation. If multiple violations exist at the same depth, return all of them.

func FindTheDeepestInvalidNode(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must traverse the entire tree even after finding violations, tracking depth information
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,12,8,22] -> Deepest violations at depth 2: node 12 (in left subtree of 10, value>10) and node 8 (in right subtree of 10, value<10)
    fmt.Println(FindTheDeepestInvalidNode(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/twist-04-find-the-deepest-invalid-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/twist-04-find-the-deepest-invalid-node'] = problem;
})();
