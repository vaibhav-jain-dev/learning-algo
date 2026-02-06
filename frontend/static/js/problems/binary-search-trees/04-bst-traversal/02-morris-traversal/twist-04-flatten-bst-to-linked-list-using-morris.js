/**
 * Flatten BST to Linked List Using Morris
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten BST to Linked List Using Morris',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.',
        problem: 'Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal. The threading mechanism of Morris is repurposed for permanent modification rather than temporary navigation. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: flatten bst to linked list using morris.",
                  "Consider how instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [4,2,6,1,3,5,7] -> Flattened: 1->2->3->4->5->6->7 (each node\'s left is null, right points to next).'
            }
        ],
        solutions: {
            python: `# Flatten BST to Linked List Using Morris
# Difficulty: Medium
# Parent: 04-bst-traversal/02-morris-traversal
#
# Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.

def flattenBstToLinkedListUsingMorris(data):
    """
    Flatten BST to Linked List Using Morris

    Approach: Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal.
    """
    # TODO: Implement solution
    # Key insight: Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [4,2,6,1,3,5,7] -> Flattened: 1->2->3->4->5->6->7 (each node's left is null, right points to next)
    print(flattenBstToLinkedListUsingMorris({}))`,
            go: `package main

import "fmt"

// Flatten BST to Linked List Using Morris
// Difficulty: Medium
// Parent: 04-bst-traversal/02-morris-traversal
//
// Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.

func FlattenBstToLinkedListUsingMorris(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal
    return nil
}

func main() {
    // Example: Tree: [4,2,6,1,3,5,7] -> Flattened: 1->2->3->4->5->6->7 (each node's left is null, right points to next)
    fmt.Println(FlattenBstToLinkedListUsingMorris(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-04-flatten-bst-to-linked-list-using-morris', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-04-flatten-bst-to-linked-list-using-morris'] = problem;
})();
