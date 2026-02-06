/**
 * Range Count in BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Count in BST',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.',
        problem: 'The traversal and pruning logic remain the same, but you accumulate a count instead of a sum. This tests whether you understand the pruning is independent of the aggregation function. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range count in bst.",
                  "Consider how the traversal and pruning logic remain the same, but you accumulate a count instead of a sum affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, null, 18], low=7, high=15. Nodes in range: 7, 10, 15. Count = 3 (sum would be 32).'
            }
        ],
        solutions: {
            python: `# Range Count in BST
# Difficulty: Easy
# Parent: 10-range-sum-bst
#
# Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.

def rangeCountInBst(data):
    """
    Range Count in BST

    Approach: The traversal and pruning logic remain the same, but you accumulate a count instead of a sum.
    """
    # TODO: Implement solution
    # Key insight: The traversal and pruning logic remain the same, but you accumulate a count instead of a sum
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, null, 18], low=7, high=15
    print(rangeCountInBst({}))`,
            go: `package main

import "fmt"

// Range Count in BST
// Difficulty: Easy
// Parent: 10-range-sum-bst
//
// Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.

func RangeCountInBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The traversal and pruning logic remain the same, but you accumulate a count instead of a sum
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, null, 18], low=7, high=15
    fmt.Println(RangeCountInBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-01-range-count-in-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-01-range-count-in-bst'] = problem;
})();
