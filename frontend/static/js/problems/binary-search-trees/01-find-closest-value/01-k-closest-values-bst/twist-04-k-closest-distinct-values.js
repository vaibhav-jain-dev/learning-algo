/**
 * K Closest Distinct Values
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Closest Distinct Values',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'The BST may contain duplicate values. Find the k closest distinct values to the target.',
        problem: 'You must skip duplicates during traversal while still maintaining the heap/window of size k. This adds bookkeeping that changes how you process each node. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: k closest distinct values.",
                  "Consider how you must skip duplicates during traversal while still maintaining the heap/window of size k affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,5,7,10,20], target=8, k=3 -> [7,5,10]. Despite duplicates of 5 and 10, each appears only once.'
            }
        ],
        solutions: {
            python: `# K Closest Distinct Values
# Difficulty: Medium
# Parent: 01-find-closest-value/01-k-closest-values-bst
#
# The BST may contain duplicate values. Find the k closest distinct values to the target.

def kClosestDistinctValues(data):
    """
    K Closest Distinct Values

    Approach: You must skip duplicates during traversal while still maintaining the heap/window of size k.
    """
    # TODO: Implement solution
    # Key insight: You must skip duplicates during traversal while still maintaining the heap/window of size k
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,5,7,10,20], target=8, k=3 -> [7,5,10]
    print(kClosestDistinctValues({}))`,
            go: `package main

import "fmt"

// K Closest Distinct Values
// Difficulty: Medium
// Parent: 01-find-closest-value/01-k-closest-values-bst
//
// The BST may contain duplicate values. Find the k closest distinct values to the target.

func KClosestDistinctValues(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must skip duplicates during traversal while still maintaining the heap/window of size k
    return nil
}

func main() {
    // Example: Tree: [10,5,15,5,7,10,20], target=8, k=3 -> [7,5,10]
    fmt.Println(KClosestDistinctValues(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-04-k-closest-distinct-values', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-04-k-closest-distinct-values'] = problem;
})();
