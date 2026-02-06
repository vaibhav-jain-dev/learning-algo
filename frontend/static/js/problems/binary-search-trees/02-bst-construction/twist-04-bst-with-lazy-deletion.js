/**
 * BST with Lazy Deletion
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST with Lazy Deletion',
        difficulty: 'Medium',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.',
        problem: 'Lazy deletion changes how you reason about tree validity and traversal. Contains must check the deleted flag, and the tree can accumulate garbage that affects performance until compaction. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst with lazy deletion.",
                  "Consider how lazy deletion changes how you reason about tree validity and traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Insert [10,5,15], remove(5) marks 5 as deleted. contains(5) returns false. Tree still has 3 nodes until compact().'
            }
        ],
        solutions: {
            python: `# BST with Lazy Deletion
# Difficulty: Medium
# Parent: 02-bst-construction
#
# Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.

def bstWithLazyDeletion(data):
    """
    BST with Lazy Deletion

    Approach: Lazy deletion changes how you reason about tree validity and traversal.
    """
    # TODO: Implement solution
    # Key insight: Lazy deletion changes how you reason about tree validity and traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Insert [10,5,15], remove(5) marks 5 as deleted
    print(bstWithLazyDeletion({}))`,
            go: `package main

import "fmt"

// BST with Lazy Deletion
// Difficulty: Medium
// Parent: 02-bst-construction
//
// Instead of physically removing nodes, mark them as deleted. Modify contains to skip deleted nodes. Implement a compact() method that rebuilds the tree without deleted nodes.

func BstWithLazyDeletion(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Lazy deletion changes how you reason about tree validity and traversal
    return nil
}

func main() {
    // Example: Insert [10,5,15], remove(5) marks 5 as deleted
    fmt.Println(BstWithLazyDeletion(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-04-bst-with-lazy-deletion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-04-bst-with-lazy-deletion'] = problem;
})();
