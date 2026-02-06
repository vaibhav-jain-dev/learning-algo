/**
 * BST with Rank (Order Statistics)
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST with Rank (Order Statistics)',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.',
        problem: 'Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal. Every mutation must update sizes along the path. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst with rank (order statistics).",
                  "Consider how requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7], findKthSmallest(3) -> 7. Insert 6, findKthSmallest(3) -> 6.'
            }
        ],
        solutions: {
            python: `# BST with Rank (Order Statistics)
# Difficulty: Hard
# Parent: 02-bst-construction
#
# Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.

def bstWithRankOrderStatistics(data):
    """
    BST with Rank (Order Statistics)

    Approach: Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal.
    """
    # TODO: Implement solution
    # Key insight: Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7], findKthSmallest(3) -> 7
    print(bstWithRankOrderStatistics({}))`,
            go: `package main

import "fmt"

// BST with Rank (Order Statistics)
// Difficulty: Hard
// Parent: 02-bst-construction
//
// Augment the BST so each node stores the size of its subtree. Support an additional operation: findKthSmallest(k) in O(h) time.

func BstWithRankOrderStatistics(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Requires maintaining subtree sizes during insert and remove, and using those sizes to navigate directly to the kth element without full traversal
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7], findKthSmallest(3) -> 7
    fmt.Println(BstWithRankOrderStatistics(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-02-bst-with-rank-order-statistics', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-02-bst-with-rank-order-statistics'] = problem;
})();
