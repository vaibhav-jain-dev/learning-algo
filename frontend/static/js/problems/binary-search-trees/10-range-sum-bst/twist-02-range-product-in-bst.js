/**
 * Range Product in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Product in BST',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.',
        problem: 'Product accumulation means the identity element is 1 (not 0 like sum). More importantly, large products can overflow, so you may need to consider modular arithmetic or big integer handling. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range product in bst.",
                  "Consider how product accumulation means the identity element is 1 (not 0 like sum) affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, null, 18], low=7, high=15. Nodes in range: 7, 10, 15. Product = 7 * 10 * 15 = 1050.'
            }
        ],
        solutions: {
            python: `# Range Product in BST
# Difficulty: Medium
# Parent: 10-range-sum-bst
#
# Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.

def rangeProductInBst(data):
    """
    Range Product in BST

    Approach: Product accumulation means the identity element is 1 (not 0 like sum).
    """
    # TODO: Implement solution
    # Key insight: Product accumulation means the identity element is 1 (not 0 like sum)
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, null, 18], low=7, high=15
    print(rangeProductInBst({}))`,
            go: `package main

import "fmt"

// Range Product in BST
// Difficulty: Medium
// Parent: 10-range-sum-bst
//
// Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.

func RangeProductInBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Product accumulation means the identity element is 1 (not 0 like sum)
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, null, 18], low=7, high=15
    fmt.Println(RangeProductInBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-02-range-product-in-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-02-range-product-in-bst'] = problem;
})();
