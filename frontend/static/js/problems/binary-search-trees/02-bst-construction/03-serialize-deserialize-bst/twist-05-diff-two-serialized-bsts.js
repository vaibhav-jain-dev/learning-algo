/**
 * Diff Two Serialized BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction/03-serialize-deserialize-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Diff Two Serialized BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction/03-serialize-deserialize-bst',
        description: 'Given two serialized BST strings, determine the minimum edit operations (insert/delete/modify node) to transform one BST into the other without fully deserializing either tree.',
        problem: 'Working directly on serialized representations requires understanding how the string format maps to tree structure. You must identify structural differences from the preorder encoding without building the actual trees. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: diff two serialized bsts.",
                  "Consider how working directly on serialized representations requires understanding how the string format maps to tree structure affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST1: "5,3,2,4,7" BST2: "5,3,2,4,7,6,8" -> Diff: insert 6 and 8 as children of 7.'
            }
        ],
        solutions: {
            python: `# Diff Two Serialized BSTs
# Difficulty: Hard
# Parent: 02-bst-construction/03-serialize-deserialize-bst
#
# Given two serialized BST strings, determine the minimum edit operations (insert/delete/modify node) to transform one BST into the other without fully deserializing either tree.

def diffTwoSerializedBsts(data):
    """
    Diff Two Serialized BSTs

    Approach: Working directly on serialized representations requires understanding how the string format maps to tree structure.
    """
    # TODO: Implement solution
    # Key insight: Working directly on serialized representations requires understanding how the string format maps to tree structure
    pass


# Test
if __name__ == "__main__":
    # Example: BST1: "5,3,2,4,7" BST2: "5,3,2,4,7,6,8" -> Diff: insert 6 and 8 as children of 7
    print(diffTwoSerializedBsts({}))`,
            go: `package main

import "fmt"

// Diff Two Serialized BSTs
// Difficulty: Hard
// Parent: 02-bst-construction/03-serialize-deserialize-bst
//
// Given two serialized BST strings, determine the minimum edit operations (insert/delete/modify node) to transform one BST into the other without fully deserializing either tree.

func DiffTwoSerializedBsts(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Working directly on serialized representations requires understanding how the string format maps to tree structure
    return nil
}

func main() {
    // Example: BST1: "5,3,2,4,7" BST2: "5,3,2,4,7,6,8" -> Diff: insert 6 and 8 as children of 7
    fmt.Println(DiffTwoSerializedBsts(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/03-serialize-deserialize-bst/twist-05-diff-two-serialized-bsts', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/03-serialize-deserialize-bst/twist-05-diff-two-serialized-bsts'] = problem;
})();
