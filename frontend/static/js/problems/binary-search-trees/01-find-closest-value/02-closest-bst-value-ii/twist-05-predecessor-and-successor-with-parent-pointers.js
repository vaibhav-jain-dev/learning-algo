/**
 * Predecessor and Successor with Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Predecessor and Successor with Parent Pointers',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.',
        problem: 'With parent pointers, you navigate up and down rather than from the root. The successor of a node with no right child is the first ancestor where the node is in its left subtree, which is a fundamentally different traversal pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: predecessor and successor with parent pointers.",
                  "Consider how with parent pointers, you navigate up and down rather than from the root affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Given direct pointer to node 4 in tree [5,3,7,2,4,6,8] -> predecessor=3 (go up to parent), successor=5 (go up until we are a left child).'
            }
        ],
        solutions: {
            python: `# Predecessor and Successor with Parent Pointers
# Difficulty: Easy
# Parent: 01-find-closest-value/02-closest-bst-value-ii
#
# Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.

def predecessorAndSuccessorWithParentPointers(data):
    """
    Predecessor and Successor with Parent Pointers

    Approach: With parent pointers, you navigate up and down rather than from the root.
    """
    # TODO: Implement solution
    # Key insight: With parent pointers, you navigate up and down rather than from the root
    pass


# Test
if __name__ == "__main__":
    # Example: Given direct pointer to node 4 in tree [5,3,7,2,4,6,8] -> predecessor=3 (go up to parent), successor=5 (go up until we are a left child)
    print(predecessorAndSuccessorWithParentPointers({}))`,
            go: `package main

import "fmt"

// Predecessor and Successor with Parent Pointers
// Difficulty: Easy
// Parent: 01-find-closest-value/02-closest-bst-value-ii
//
// Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.

func PredecessorAndSuccessorWithParentPointers(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: With parent pointers, you navigate up and down rather than from the root
    return nil
}

func main() {
    // Example: Given direct pointer to node 4 in tree [5,3,7,2,4,6,8] -> predecessor=3 (go up to parent), successor=5 (go up until we are a left child)
    fmt.Println(PredecessorAndSuccessorWithParentPointers(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-05-predecessor-and-successor-with-parent-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-05-predecessor-and-successor-with-parent-pointers'] = problem;
})();
