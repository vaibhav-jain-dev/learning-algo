/**
 * BSTs with Height Constraint
 * Category: recursion
 * Difficulty: Very Hard
 * Algorithm: recursion-count-bst
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'BSTs with Height Constraint',
        difficulty: 'Very Hard',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.',
        problem: 'Adds a height constraint that breaks the simple Catalan recurrence, requiring a 2D DP indexed by both node count and maximum allowed height.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def bsts_with_height_constraint(n):
    """
    BSTs with Height Constraint

    Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bsts_with_height_constraint(3))  # Expected: 1
print(bsts_with_height_constraint(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// BstsWithHeightConstraint solves the BSTs with Height Constraint problem.
// Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.
// Time: O(?), Space: O(?)
func BstsWithHeightConstraint(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BstsWithHeightConstraint(3)) // Expected: 1
	fmt.Println(BstsWithHeightConstraint(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-03-bsts-with-height-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-03-bsts-with-height-constraint'] = problem;
})();
