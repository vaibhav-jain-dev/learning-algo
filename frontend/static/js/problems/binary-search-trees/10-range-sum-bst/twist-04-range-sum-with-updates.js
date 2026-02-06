/**
 * Range Sum with Updates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Sum with Updates',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.',
        problem: 'Static range sum is a one-pass problem. With updates, you need to consider rebalancing and potentially augmenting nodes with subtree sums for efficient repeated queries, pushing toward a segment tree or BIT mindset. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range sum with updates.",
                  "Consider how static range sum is a one-pass problem affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, null, 18]. Query(7, 15) = 32. Update node 7 to 9. Query(7, 15) = 34. The BST property must be maintained after update.'
            }
        ],
        solutions: {
            python: `# Range Sum with Updates
# Difficulty: Hard
# Parent: 10-range-sum-bst
#
# Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.

def rangeSumWithUpdates(data):
    """
    Range Sum with Updates

    Approach: Static range sum is a one-pass problem.
    """
    # TODO: Implement solution
    # Key insight: Static range sum is a one-pass problem
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, null, 18]
    print(rangeSumWithUpdates({}))`,
            go: `package main

import "fmt"

// Range Sum with Updates
// Difficulty: Hard
// Parent: 10-range-sum-bst
//
// Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.

func RangeSumWithUpdates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Static range sum is a one-pass problem
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, null, 18]
    fmt.Println(RangeSumWithUpdates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-04-range-sum-with-updates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-04-range-sum-with-updates'] = problem;
})();
