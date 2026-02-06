/**
 * Sum BSTs with Range Constraint
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum BSTs with Range Constraint',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].',
        problem: 'You need to validate both the BST property AND the range constraint simultaneously. A valid BST subtree might be excluded if any of its values fall outside the range, adding an extra filtering dimension to the bottom-up check. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: sum bsts with range constraint.",
                  "Consider how you need to validate both the bst property and the range constraint simultaneously affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree [10, 5, 15, 3, 7, 12, 20], range [5, 15]. Subtree at 5 (with 3, 7) is BST but 3 < 5, so excluded. Subtree at 12 is BST and in range. Leaf 7 is in range. Sum only qualifying subtrees.'
            }
        ],
        solutions: {
            python: `# Sum BSTs with Range Constraint
# Difficulty: Hard
# Parent: 14-sum-bsts
#
# Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].

def sumBstsWithRangeConstraint(data):
    """
    Sum BSTs with Range Constraint

    Approach: You need to validate both the BST property AND the range constraint simultaneously.
    """
    # TODO: Implement solution
    # Key insight: You need to validate both the BST property AND the range constraint simultaneously
    pass


# Test
if __name__ == "__main__":
    # Example: Tree [10, 5, 15, 3, 7, 12, 20], range [5, 15]
    print(sumBstsWithRangeConstraint({}))`,
            go: `package main

import "fmt"

// Sum BSTs with Range Constraint
// Difficulty: Hard
// Parent: 14-sum-bsts
//
// Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].

func SumBstsWithRangeConstraint(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You need to validate both the BST property AND the range constraint simultaneously
    return nil
}

func main() {
    // Example: Tree [10, 5, 15, 3, 7, 12, 20], range [5, 15]
    fmt.Println(SumBstsWithRangeConstraint(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-03-sum-bsts-with-range-constraint', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-03-sum-bsts-with-range-constraint'] = problem;
})();
