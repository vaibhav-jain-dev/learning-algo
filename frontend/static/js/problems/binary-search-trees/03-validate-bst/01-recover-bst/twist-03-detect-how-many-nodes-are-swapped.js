/**
 * Detect How Many Nodes Are Swapped
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect How Many Nodes Are Swapped',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).',
        problem: 'This generalizes from knowing exactly two nodes are swapped to computing the minimum swaps. It requires finding the permutation cycle decomposition of actual vs. expected inorder positions. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: detect how many nodes are swapped.",
                  "Consider how this generalizes from knowing exactly two nodes are swapped to computing the minimum swaps affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree inorder: [3,1,2] should be [1,2,3]. This is a 3-cycle requiring 2 swaps: swap(3,1)->swap(3,2).'
            }
        ],
        solutions: {
            python: `# Detect How Many Nodes Are Swapped
# Difficulty: Medium
# Parent: 03-validate-bst/01-recover-bst
#
# Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).

def detectHowManyNodesAreSwapped(data):
    """
    Detect How Many Nodes Are Swapped

    Approach: This generalizes from knowing exactly two nodes are swapped to computing the minimum swaps.
    """
    # TODO: Implement solution
    # Key insight: This generalizes from knowing exactly two nodes are swapped to computing the minimum swaps
    pass


# Test
if __name__ == "__main__":
    # Example: Tree inorder: [3,1,2] should be [1,2,3]
    print(detectHowManyNodesAreSwapped({}))`,
            go: `package main

import "fmt"

// Detect How Many Nodes Are Swapped
// Difficulty: Medium
// Parent: 03-validate-bst/01-recover-bst
//
// Given a binary tree, determine the minimum number of pairwise value swaps needed to make it a valid BST (without changing structure).

func DetectHowManyNodesAreSwapped(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This generalizes from knowing exactly two nodes are swapped to computing the minimum swaps
    return nil
}

func main() {
    // Example: Tree inorder: [3,1,2] should be [1,2,3]
    fmt.Println(DetectHowManyNodesAreSwapped(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-03-detect-how-many-nodes-are-swapped', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-03-detect-how-many-nodes-are-swapped'] = problem;
})();
