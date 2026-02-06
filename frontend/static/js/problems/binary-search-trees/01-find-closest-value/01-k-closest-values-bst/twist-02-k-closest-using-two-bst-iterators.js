/**
 * K Closest Using Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Closest Using Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.',
        problem: 'Requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation. This achieves O(log n + k) time instead of O(n log k). Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: k closest using two bst iterators.",
                  "Consider how requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [8,4,12,2,6,10,14], target=7, k=3 -> [6,8,10]. Forward iterator yields 8,10,12... Backward yields 6,4,2...'
            }
        ],
        solutions: {
            python: `# K Closest Using Two BST Iterators
# Difficulty: Hard
# Parent: 01-find-closest-value/01-k-closest-values-bst
#
# Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.

def kClosestUsingTwoBstIterators(data):
    """
    K Closest Using Two BST Iterators

    Approach: Requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation.
    """
    # TODO: Implement solution
    # Key insight: Requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [8,4,12,2,6,10,14], target=7, k=3 -> [6,8,10]
    print(kClosestUsingTwoBstIterators({}))`,
            go: `package main

import "fmt"

// K Closest Using Two BST Iterators
// Difficulty: Hard
// Parent: 01-find-closest-value/01-k-closest-values-bst
//
// Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.

func KClosestUsingTwoBstIterators(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation
    return nil
}

func main() {
    // Example: Tree: [8,4,12,2,6,10,14], target=7, k=3 -> [6,8,10]
    fmt.Println(KClosestUsingTwoBstIterators(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-02-k-closest-using-two-bst-iterators', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-02-k-closest-using-two-bst-iterators'] = problem;
})();
