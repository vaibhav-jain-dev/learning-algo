/**
 * Closest Value Without Parent Pointers (Iterative)
 * Category: binary-search-trees
 * Difficulty: Easy
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Value Without Parent Pointers (Iterative)',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.',
        problem: 'Forces you to think about the traversal iteratively. While the logic is similar, managing state explicitly rather than via the call stack changes how you reason about the control flow. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: closest value without parent pointers (iterative).",
                  "Consider how forces you to think about the traversal iteratively affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Same input/output as base problem, but solution must use a while loop instead of recursion.'
            }
        ],
        solutions: {
            python: `# Closest Value Without Parent Pointers (Iterative)
# Difficulty: Easy
# Parent: 01-find-closest-value
#
# Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.

def closestValueWithoutParentPointersIterative(data):
    """
    Closest Value Without Parent Pointers (Iterative)

    Approach: Forces you to think about the traversal iteratively.
    """
    # TODO: Implement solution
    # Key insight: Forces you to think about the traversal iteratively
    pass


# Test
if __name__ == "__main__":
    # Example: Same input/output as base problem, but solution must use a while loop instead of recursion
    print(closestValueWithoutParentPointersIterative({}))`,
            go: `package main

import "fmt"

// Closest Value Without Parent Pointers (Iterative)
// Difficulty: Easy
// Parent: 01-find-closest-value
//
// Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.

func ClosestValueWithoutParentPointersIterative(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Forces you to think about the traversal iteratively
    return nil
}

func main() {
    // Example: Same input/output as base problem, but solution must use a while loop instead of recursion
    fmt.Println(ClosestValueWithoutParentPointersIterative(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-02-closest-value-without-parent-pointers-iterative', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-02-closest-value-without-parent-pointers-iterative'] = problem;
})();
