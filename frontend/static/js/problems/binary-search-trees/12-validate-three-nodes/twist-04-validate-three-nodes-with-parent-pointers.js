/**
 * Validate Three Nodes with Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Validate Three Nodes with Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.',
        problem: 'Parent pointers enable upward traversal. Instead of going down from nodes, you can walk up from nodeTwo to check if you reach nodeOne or nodeThree, then walk down to verify the other direction. The traversal strategy fundamentally changes. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: validate three nodes with parent pointers.",
                  "Consider how parent pointers enable upward traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Starting from nodeTwo=2, walk up: 2 -> 5 (found nodeOne). Then from nodeTwo=2, walk down: 2 -> 4 (found nodeThree as descendant). Return true with O(1) extra space.'
            }
        ],
        solutions: {
            python: `# Validate Three Nodes with Parent Pointers
# Difficulty: Medium
# Parent: 12-validate-three-nodes
#
# Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.

def validateThreeNodesWithParentPointers(data):
    """
    Validate Three Nodes with Parent Pointers

    Approach: Parent pointers enable upward traversal.
    """
    # TODO: Implement solution
    # Key insight: Parent pointers enable upward traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Starting from nodeTwo=2, walk up: 2 -> 5 (found nodeOne)
    print(validateThreeNodesWithParentPointers({}))`,
            go: `package main

import "fmt"

// Validate Three Nodes with Parent Pointers
// Difficulty: Medium
// Parent: 12-validate-three-nodes
//
// Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.

func ValidateThreeNodesWithParentPointers(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Parent pointers enable upward traversal
    return nil
}

func main() {
    // Example: Starting from nodeTwo=2, walk up: 2 -> 5 (found nodeOne)
    fmt.Println(ValidateThreeNodesWithParentPointers(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-04-validate-three-nodes-with-parent-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-04-validate-three-nodes-with-parent-pointers'] = problem;
})();
