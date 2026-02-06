/**
 * Three Sum Closest in BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Three Sum Closest in BST',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Find three nodes in the BST whose sum is closest to the target. Return the three values.',
        problem: 'Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: three sum closest in bst.",
                  "Consider how two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7,12,20], target=30 -> [7,10,15] with sum=32 (closest to 30).'
            }
        ],
        solutions: {
            python: `# Three Sum Closest in BST
# Difficulty: Hard
# Parent: 01-find-closest-value/03-two-sum-closest-bst
#
# Find three nodes in the BST whose sum is closest to the target. Return the three values.

def threeSumClosestInBst(data):
    """
    Three Sum Closest in BST

    Approach: Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies.
    """
    # TODO: Implement solution
    # Key insight: Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7,12,20], target=30 -> [7,10,15] with sum=32 (closest to 30)
    print(threeSumClosestInBst({}))`,
            go: `package main

import "fmt"

// Three Sum Closest in BST
// Difficulty: Hard
// Parent: 01-find-closest-value/03-two-sum-closest-bst
//
// Find three nodes in the BST whose sum is closest to the target. Return the three values.

func ThreeSumClosestInBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7,12,20], target=30 -> [7,10,15] with sum=32 (closest to 30)
    fmt.Println(ThreeSumClosestInBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-01-three-sum-closest-in-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-01-three-sum-closest-in-bst'] = problem;
})();
