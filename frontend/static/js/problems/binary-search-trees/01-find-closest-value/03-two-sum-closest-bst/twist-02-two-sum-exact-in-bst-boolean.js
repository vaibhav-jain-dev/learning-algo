/**
 * Two Sum Exact in BST (Boolean)
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Two Sum Exact in BST (Boolean)',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.',
        problem: 'The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first. The BST iterator approach also works differently with exact matching. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: two sum exact in bst (boolean).",
                  "Consider how the exact match version allows for early termination and can use a hashset approach during traversal, avoiding the need to collect all values first affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [5,3,7,1,4,6,8], target=10 -> true (3+7=10).'
            }
        ],
        solutions: {
            python: `# Two Sum Exact in BST (Boolean)
# Difficulty: Medium
# Parent: 01-find-closest-value/03-two-sum-closest-bst
#
# Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.

def twoSumExactInBstBoolean(data):
    """
    Two Sum Exact in BST (Boolean)

    Approach: The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first.
    """
    # TODO: Implement solution
    # Key insight: The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [5,3,7,1,4,6,8], target=10 -> true (3+7=10)
    print(twoSumExactInBstBoolean({}))`,
            go: `package main

import "fmt"

// Two Sum Exact in BST (Boolean)
// Difficulty: Medium
// Parent: 01-find-closest-value/03-two-sum-closest-bst
//
// Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.

func TwoSumExactInBstBoolean(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first
    return nil
}

func main() {
    // Example: Tree: [5,3,7,1,4,6,8], target=10 -> true (3+7=10)
    fmt.Println(TwoSumExactInBstBoolean(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-02-two-sum-exact-in-bst-boolean', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-02-two-sum-exact-in-bst-boolean'] = problem;
})();
