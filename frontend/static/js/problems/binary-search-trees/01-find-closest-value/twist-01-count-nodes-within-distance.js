/**
 * Count Nodes Within Distance
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Nodes Within Distance',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.',
        problem: 'You can no longer prune an entire subtree just because the current node is farther than your best. Both subtrees might contain values within distance D, so you need a range-aware traversal strategy. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count nodes within distance.",
                  "Consider how you can no longer prune an entire subtree just because the current node is farther than your best affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,5,13,22,1], target=12, D=3 -> Count=3 (values 10, 13, 15 are all within distance 3 of 12).'
            }
        ],
        solutions: {
            python: `# Count Nodes Within Distance
# Difficulty: Medium
# Parent: 01-find-closest-value
#
# Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.

def countNodesWithinDistance(data):
    """
    Count Nodes Within Distance

    Approach: You can no longer prune an entire subtree just because the current node is farther than your best.
    """
    # TODO: Implement solution
    # Key insight: You can no longer prune an entire subtree just because the current node is farther than your best
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,5,13,22,1], target=12, D=3 -> Count=3 (values 10, 13, 15 are all within distance 3 of 12)
    print(countNodesWithinDistance({}))`,
            go: `package main

import "fmt"

// Count Nodes Within Distance
// Difficulty: Medium
// Parent: 01-find-closest-value
//
// Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.

func CountNodesWithinDistance(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You can no longer prune an entire subtree just because the current node is farther than your best
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,5,13,22,1], target=12, D=3 -> Count=3 (values 10, 13, 15 are all within distance 3 of 12)
    fmt.Println(CountNodesWithinDistance(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-01-count-nodes-within-distance', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-01-count-nodes-within-distance'] = problem;
})();
