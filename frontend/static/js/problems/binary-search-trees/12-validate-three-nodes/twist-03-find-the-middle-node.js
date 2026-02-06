/**
 * Find the Middle Node
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Middle Node',
        difficulty: 'Medium',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.',
        problem: 'Instead of validating a given arrangement, you must discover it. You need to test all three possible assignments of which node is the middle, requiring a more exploratory approach. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: find the middle node.",
                  "Consider how instead of validating a given arrangement, you must discover it affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [5, 2, 7, 1, 4, 6, 8]. Given nodes 5, 2, 4: node 2 is the middle (descendant of 5, ancestor of 4). Return 2.'
            }
        ],
        solutions: {
            python: `# Find the Middle Node
# Difficulty: Medium
# Parent: 12-validate-three-nodes
#
# Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.

def findTheMiddleNode(data):
    """
    Find the Middle Node

    Approach: Instead of validating a given arrangement, you must discover it.
    """
    # TODO: Implement solution
    # Key insight: Instead of validating a given arrangement, you must discover it
    pass


# Test
if __name__ == "__main__":
    # Example: BST [5, 2, 7, 1, 4, 6, 8]
    print(findTheMiddleNode({}))`,
            go: `package main

import "fmt"

// Find the Middle Node
// Difficulty: Medium
// Parent: 12-validate-three-nodes
//
// Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.

func FindTheMiddleNode(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of validating a given arrangement, you must discover it
    return nil
}

func main() {
    // Example: BST [5, 2, 7, 1, 4, 6, 8]
    fmt.Println(FindTheMiddleNode(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-03-find-the-middle-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-03-find-the-middle-node'] = problem;
})();
