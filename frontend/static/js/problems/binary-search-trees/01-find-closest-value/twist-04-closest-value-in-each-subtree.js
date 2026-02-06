/**
 * Closest Value in Each Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Value in Each Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'For every node in the BST, compute the closest value to the target within that node\'s subtree (including itself). Return a mapping of node value to its subtree\'s closest value.',
        problem: 'This is a bottom-up aggregation problem rather than a top-down search. You need to combine results from left and right subtrees at each node, completely changing the traversal pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: closest value in each subtree.",
                  "Consider how this is a bottom-up aggregation problem rather than a top-down search affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15], target=12 -> {10: 10, 5: 5, 15: 15} (each node\'s subtree closest to 12).'
            }
        ],
        solutions: {
            python: `# Closest Value in Each Subtree
# Difficulty: Hard
# Parent: 01-find-closest-value
#
# For every node in the BST, compute the closest value to the target within that node's subtree (including itself). Return a mapping of node value to its subtree's closest value.

def closestValueInEachSubtree(data):
    """
    Closest Value in Each Subtree

    Approach: This is a bottom-up aggregation problem rather than a top-down search.
    """
    # TODO: Implement solution
    # Key insight: This is a bottom-up aggregation problem rather than a top-down search
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15], target=12 -> {10: 10, 5: 5, 15: 15} (each node's subtree closest to 12)
    print(closestValueInEachSubtree({}))`,
            go: `package main

import "fmt"

// Closest Value in Each Subtree
// Difficulty: Hard
// Parent: 01-find-closest-value
//
// For every node in the BST, compute the closest value to the target within that node's subtree (including itself). Return a mapping of node value to its subtree's closest value.

func ClosestValueInEachSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This is a bottom-up aggregation problem rather than a top-down search
    return nil
}

func main() {
    // Example: Tree: [10,5,15], target=12 -> {10: 10, 5: 5, 15: 15} (each node's subtree closest to 12)
    fmt.Println(ClosestValueInEachSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-04-closest-value-in-each-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-04-closest-value-in-each-subtree'] = problem;
})();
