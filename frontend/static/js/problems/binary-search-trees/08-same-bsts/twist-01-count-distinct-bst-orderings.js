/**
 * Count Distinct BST Orderings
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 08-same-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Distinct BST Orderings',
        difficulty: 'Very Hard',
        algorithm: 'bst-comparison',
        parent: '08-same-bsts',
        description: 'Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.',
        problem: 'Instead of comparing two specific arrays, you must count all valid topological orderings of the BST. This requires combinatorics: at each node, the left and right subtree orderings can be interleaved in C(n_left + n_right, n_left) ways. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count distinct bst orderings.",
                  "Consider how instead of comparing two specific arrays, you must count all valid topological orderings of the bst affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For BST from [2, 1, 3], the orderings [2, 1, 3] and [2, 3, 1] both work. Answer is 2, since 2 must come first, then 1 and 3 can be in either order.'
            }
        ],
        solutions: {
            python: `# Count Distinct BST Orderings
# Difficulty: Very Hard
# Parent: 08-same-bsts
#
# Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.

def countDistinctBstOrderings(data):
    """
    Count Distinct BST Orderings

    Approach: Instead of comparing two specific arrays, you must count all valid topological orderings of the BST.
    """
    # TODO: Implement solution
    # Key insight: Instead of comparing two specific arrays, you must count all valid topological orderings of the BST
    pass


# Test
if __name__ == "__main__":
    # Example: For BST from [2, 1, 3], the orderings [2, 1, 3] and [2, 3, 1] both work
    print(countDistinctBstOrderings({}))`,
            go: `package main

import "fmt"

// Count Distinct BST Orderings
// Difficulty: Very Hard
// Parent: 08-same-bsts
//
// Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.

func CountDistinctBstOrderings(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of comparing two specific arrays, you must count all valid topological orderings of the BST
    return nil
}

func main() {
    // Example: For BST from [2, 1, 3], the orderings [2, 1, 3] and [2, 3, 1] both work
    fmt.Println(CountDistinctBstOrderings(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts/twist-01-count-distinct-bst-orderings', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts/twist-01-count-distinct-bst-orderings'] = problem;
})();
