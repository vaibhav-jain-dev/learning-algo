/**
 * Iterative Sorted Array to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Sorted Array to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.',
        problem: 'You must manually manage the subarray ranges and parent-child connections using a stack of pending work items. This requires encoding the recursive state (left, right bounds, parent reference, direction) explicitly. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: iterative sorted array to bst.",
                  "Consider how you must manually manage the subarray ranges and parent-child connections using a stack of pending work items affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Same output as base problem, but must use a while loop with a stack instead of recursive calls.'
            }
        ],
        solutions: {
            python: `# Iterative Sorted Array to BST
# Difficulty: Medium
# Parent: 02-bst-construction/02-convert-sorted-array-to-bst
#
# Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.

def iterativeSortedArrayToBst(data):
    """
    Iterative Sorted Array to BST

    Approach: You must manually manage the subarray ranges and parent-child connections using a stack of pending work items.
    """
    # TODO: Implement solution
    # Key insight: You must manually manage the subarray ranges and parent-child connections using a stack of pending work items
    pass


# Test
if __name__ == "__main__":
    # Example: Same output as base problem, but must use a while loop with a stack instead of recursive calls
    print(iterativeSortedArrayToBst({}))`,
            go: `package main

import "fmt"

// Iterative Sorted Array to BST
// Difficulty: Medium
// Parent: 02-bst-construction/02-convert-sorted-array-to-bst
//
// Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.

func IterativeSortedArrayToBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must manually manage the subarray ranges and parent-child connections using a stack of pending work items
    return nil
}

func main() {
    // Example: Same output as base problem, but must use a while loop with a stack instead of recursive calls
    fmt.Println(IterativeSortedArrayToBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-04-iterative-sorted-array-to-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-04-iterative-sorted-array-to-bst'] = problem;
})();
