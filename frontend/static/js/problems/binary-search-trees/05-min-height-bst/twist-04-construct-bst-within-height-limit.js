/**
 * Construct BST Within Height Limit
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Construct BST Within Height Limit',
        difficulty: 'Hard',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'Given a sorted array and a maximum height h, determine if a valid BST can be constructed within that height limit. If yes, return it; otherwise return null.',
        problem: 'You must reason about the relationship between array size and tree height. A balanced BST of height h holds at most 2^(h+1) - 1 nodes, adding a feasibility check before construction. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: construct bst within height limit.",
                  "Consider how you must reason about the relationship between array size and tree height affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For array [1,2,3,4,5,6,7,8] with h=2, a height-2 BST holds at most 7 nodes, so return null. With h=3, it is feasible.'
            }
        ],
        solutions: {
            python: `# Construct BST Within Height Limit
# Difficulty: Hard
# Parent: 05-min-height-bst
#
# Given a sorted array and a maximum height h, determine if a valid BST can be constructed within that height limit. If yes, return it; otherwise return null.

def constructBstWithinHeightLimit(data):
    """
    Construct BST Within Height Limit

    Approach: You must reason about the relationship between array size and tree height.
    """
    # TODO: Implement solution
    # Key insight: You must reason about the relationship between array size and tree height
    pass


# Test
if __name__ == "__main__":
    # Example: For array [1,2,3,4,5,6,7,8] with h=2, a height-2 BST holds at most 7 nodes, so return null
    print(constructBstWithinHeightLimit({}))`,
            go: `package main

import "fmt"

// Construct BST Within Height Limit
// Difficulty: Hard
// Parent: 05-min-height-bst
//
// Given a sorted array and a maximum height h, determine if a valid BST can be constructed within that height limit. If yes, return it; otherwise return null.

func ConstructBstWithinHeightLimit(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must reason about the relationship between array size and tree height
    return nil
}

func main() {
    // Example: For array [1,2,3,4,5,6,7,8] with h=2, a height-2 BST holds at most 7 nodes, so return null
    fmt.Println(ConstructBstWithinHeightLimit(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-04-construct-bst-within-height-limit', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-04-construct-bst-within-height-limit'] = problem;
})();
