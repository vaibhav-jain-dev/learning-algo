/**
 * Two Sum Closest Across Two BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Two Sum Closest Across Two BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Given two separate BSTs, find one node from each tree such that their sum is closest to the target.',
        problem: 'You cannot merge the two trees into a single sorted array efficiently. Instead, use a forward iterator on one BST and a reverse iterator on the other, requiring coordination across two separate data structures. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: two sum closest across two bsts.",
                  "Consider how you cannot merge the two trees into a single sorted array efficiently affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST1: [3,1,5], BST2: [8,6,10], target=12 -> [3,10] or [5,8] (both sum to 13, closest to 12).'
            }
        ],
        solutions: {
            python: `# Two Sum Closest Across Two BSTs
# Difficulty: Hard
# Parent: 01-find-closest-value/03-two-sum-closest-bst
#
# Given two separate BSTs, find one node from each tree such that their sum is closest to the target.

def twoSumClosestAcrossTwoBsts(data):
    """
    Two Sum Closest Across Two BSTs

    Approach: You cannot merge the two trees into a single sorted array efficiently.
    """
    # TODO: Implement solution
    # Key insight: You cannot merge the two trees into a single sorted array efficiently
    pass


# Test
if __name__ == "__main__":
    # Example: BST1: [3,1,5], BST2: [8,6,10], target=12 -> [3,10] or [5,8] (both sum to 13, closest to 12)
    print(twoSumClosestAcrossTwoBsts({}))`,
            go: `package main

import "fmt"

// Two Sum Closest Across Two BSTs
// Difficulty: Hard
// Parent: 01-find-closest-value/03-two-sum-closest-bst
//
// Given two separate BSTs, find one node from each tree such that their sum is closest to the target.

func TwoSumClosestAcrossTwoBsts(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You cannot merge the two trees into a single sorted array efficiently
    return nil
}

func main() {
    // Example: BST1: [3,1,5], BST2: [8,6,10], target=12 -> [3,10] or [5,8] (both sum to 13, closest to 12)
    fmt.Println(TwoSumClosestAcrossTwoBsts(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-04-two-sum-closest-across-two-bsts', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-04-two-sum-closest-across-two-bsts'] = problem;
})();
