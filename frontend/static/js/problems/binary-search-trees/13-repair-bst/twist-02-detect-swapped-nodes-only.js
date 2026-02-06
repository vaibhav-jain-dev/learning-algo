/**
 * Detect Swapped Nodes Only
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect Swapped Nodes Only',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.',
        problem: 'The focus shifts from repair to detection with strict space constraints. Morris traversal temporarily modifies the tree for O(1) space inorder traversal, requiring careful handling of threaded pointers while tracking inversions. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: detect swapped nodes only.",
                  "Consider how the focus shifts from repair to detection with strict space constraints affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [3, 1, 4, null, null, 2]. Inorder gives [1, 3, 2, 4]. The inversion is at (3, 2). The swapped nodes are 3 and 2.'
            }
        ],
        solutions: {
            python: `# Detect Swapped Nodes Only
# Difficulty: Medium
# Parent: 13-repair-bst
#
# Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.

def detectSwappedNodesOnly(data):
    """
    Detect Swapped Nodes Only

    Approach: The focus shifts from repair to detection with strict space constraints.
    """
    # TODO: Implement solution
    # Key insight: The focus shifts from repair to detection with strict space constraints
    pass


# Test
if __name__ == "__main__":
    # Example: BST [3, 1, 4, null, null, 2]
    print(detectSwappedNodesOnly({}))`,
            go: `package main

import "fmt"

// Detect Swapped Nodes Only
// Difficulty: Medium
// Parent: 13-repair-bst
//
// Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.

func DetectSwappedNodesOnly(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The focus shifts from repair to detection with strict space constraints
    return nil
}

func main() {
    // Example: BST [3, 1, 4, null, null, 2]
    fmt.Println(DetectSwappedNodesOnly(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-02-detect-swapped-nodes-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-02-detect-swapped-nodes-only'] = problem;
})();
