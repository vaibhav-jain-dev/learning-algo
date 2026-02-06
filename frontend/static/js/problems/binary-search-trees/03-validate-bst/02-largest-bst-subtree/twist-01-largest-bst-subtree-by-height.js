/**
 * Largest BST Subtree by Height
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Largest BST Subtree by Height',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Instead of finding the BST subtree with the most nodes, find the one with the greatest height.',
        problem: 'A tall but narrow BST subtree beats a short but wide one. The post-order aggregation must track height instead of size, and the optimal subtree may be different from the size-based answer. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: largest bst subtree by height.",
                  "Consider how a tall but narrow bst subtree beats a short but wide one affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree where left subtree is a chain BST of height 4 (5 nodes) and right subtree is a complete BST of height 2 (7 nodes). By height: left wins (4). By size: right wins (7).'
            }
        ],
        solutions: {
            python: `# Largest BST Subtree by Height
# Difficulty: Medium
# Parent: 03-validate-bst/02-largest-bst-subtree
#
# Instead of finding the BST subtree with the most nodes, find the one with the greatest height.

def largestBstSubtreeByHeight(data):
    """
    Largest BST Subtree by Height

    Approach: A tall but narrow BST subtree beats a short but wide one.
    """
    # TODO: Implement solution
    # Key insight: A tall but narrow BST subtree beats a short but wide one
    pass


# Test
if __name__ == "__main__":
    # Example: Tree where left subtree is a chain BST of height 4 (5 nodes) and right subtree is a complete BST of height 2 (7 nodes)
    print(largestBstSubtreeByHeight({}))`,
            go: `package main

import "fmt"

// Largest BST Subtree by Height
// Difficulty: Medium
// Parent: 03-validate-bst/02-largest-bst-subtree
//
// Instead of finding the BST subtree with the most nodes, find the one with the greatest height.

func LargestBstSubtreeByHeight(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: A tall but narrow BST subtree beats a short but wide one
    return nil
}

func main() {
    // Example: Tree where left subtree is a chain BST of height 4 (5 nodes) and right subtree is a complete BST of height 2 (7 nodes)
    fmt.Println(LargestBstSubtreeByHeight(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-01-largest-bst-subtree-by-height', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-01-largest-bst-subtree-by-height'] = problem;
})();
