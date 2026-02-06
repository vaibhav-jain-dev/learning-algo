/**
 * Exclusive Range Sum
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Exclusive Range Sum',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Return the sum of values strictly between low and high (exclusive bounds, not inclusive).',
        problem: 'The boundary conditions change from <= to <, which affects how you prune at the boundaries. When the current node equals low or high, you must exclude it but still explore the appropriate subtree. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: exclusive range sum.",
                  "Consider how the boundary conditions change from <= to <, which affects how you prune at the boundaries affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, null, 18], low=5, high=15. Exclusive range means only 7 and 10 are included. Sum = 17.'
            }
        ],
        solutions: {
            python: `# Exclusive Range Sum
# Difficulty: Easy
# Parent: 10-range-sum-bst
#
# Return the sum of values strictly between low and high (exclusive bounds, not inclusive).

def exclusiveRangeSum(data):
    """
    Exclusive Range Sum

    Approach: The boundary conditions change from <= to <, which affects how you prune at the boundaries.
    """
    # TODO: Implement solution
    # Key insight: The boundary conditions change from <= to <, which affects how you prune at the boundaries
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, null, 18], low=5, high=15
    print(exclusiveRangeSum({}))`,
            go: `package main

import "fmt"

// Exclusive Range Sum
// Difficulty: Easy
// Parent: 10-range-sum-bst
//
// Return the sum of values strictly between low and high (exclusive bounds, not inclusive).

func ExclusiveRangeSum(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The boundary conditions change from <= to <, which affects how you prune at the boundaries
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, null, 18], low=5, high=15
    fmt.Println(ExclusiveRangeSum(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-03-exclusive-range-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-03-exclusive-range-sum'] = problem;
})();
