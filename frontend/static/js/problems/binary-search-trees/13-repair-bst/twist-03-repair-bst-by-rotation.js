/**
 * Repair BST by Rotation
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Repair BST by Rotation',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.',
        problem: 'Swapping values is O(1) once found. Rotations change tree structure and may cascade. You need to understand how rotations fix local BST violations and may need multiple rotations to propagate the fix. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: repair bst by rotation.",
                  "Consider how swapping values is o(1) once found affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'If nodes 3 and 7 are swapped in positions, a value swap is trivial. But using rotations, you might need to rotate 7 down and 3 up through intermediate nodes, potentially requiring O(h) rotations.'
            }
        ],
        solutions: {
            python: `# Repair BST by Rotation
# Difficulty: Hard
# Parent: 13-repair-bst
#
# Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.

def repairBstByRotation(data):
    """
    Repair BST by Rotation

    Approach: Swapping values is O(1) once found.
    """
    # TODO: Implement solution
    # Key insight: Swapping values is O(1) once found
    pass


# Test
if __name__ == "__main__":
    # Example: If nodes 3 and 7 are swapped in positions, a value swap is trivial
    print(repairBstByRotation({}))`,
            go: `package main

import "fmt"

// Repair BST by Rotation
// Difficulty: Hard
// Parent: 13-repair-bst
//
// Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.

func RepairBstByRotation(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Swapping values is O(1) once found
    return nil
}

func main() {
    // Example: If nodes 3 and 7 are swapped in positions, a value swap is trivial
    fmt.Println(RepairBstByRotation(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-03-repair-bst-by-rotation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-03-repair-bst-by-rotation'] = problem;
})();
