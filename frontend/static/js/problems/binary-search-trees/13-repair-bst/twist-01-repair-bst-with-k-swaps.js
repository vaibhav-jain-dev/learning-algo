/**
 * Repair BST with K Swaps
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Repair BST with K Swaps',
        difficulty: 'Very Hard',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Instead of exactly two nodes being swapped, up to k pairs of nodes have been swapped. Identify all swapped pairs and restore the BST.',
        problem: 'With exactly two swapped nodes, the inorder traversal has at most two inversions. With k swaps, there can be up to 2k inversions, and you must correctly pair them, which is a much harder matching problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: repair bst with k swaps.",
                  "Consider how with exactly two swapped nodes, the inorder traversal has at most two inversions affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST with inorder [1, 6, 3, 4, 5, 2, 7]. Two swaps occurred: (2,6) and (3,5) were swapped. You must identify both pairs and fix them.'
            }
        ],
        solutions: {
            python: `# Repair BST with K Swaps
# Difficulty: Very Hard
# Parent: 13-repair-bst
#
# Instead of exactly two nodes being swapped, up to k pairs of nodes have been swapped. Identify all swapped pairs and restore the BST.

def repairBstWithKSwaps(data):
    """
    Repair BST with K Swaps

    Approach: With exactly two swapped nodes, the inorder traversal has at most two inversions.
    """
    # TODO: Implement solution
    # Key insight: With exactly two swapped nodes, the inorder traversal has at most two inversions
    pass


# Test
if __name__ == "__main__":
    # Example: BST with inorder [1, 6, 3, 4, 5, 2, 7]
    print(repairBstWithKSwaps({}))`,
            go: `package main

import "fmt"

// Repair BST with K Swaps
// Difficulty: Very Hard
// Parent: 13-repair-bst
//
// Instead of exactly two nodes being swapped, up to k pairs of nodes have been swapped. Identify all swapped pairs and restore the BST.

func RepairBstWithKSwaps(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: With exactly two swapped nodes, the inorder traversal has at most two inversions
    return nil
}

func main() {
    // Example: BST with inorder [1, 6, 3, 4, 5, 2, 7]
    fmt.Println(RepairBstWithKSwaps(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-01-repair-bst-with-k-swaps', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-01-repair-bst-with-k-swaps'] = problem;
})();
