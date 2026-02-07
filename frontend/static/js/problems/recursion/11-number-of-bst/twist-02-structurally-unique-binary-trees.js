/**
 * Structurally Unique Binary Trees
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-count-bst
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Structurally Unique Binary Trees',
        difficulty: 'Medium',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.',
        problem: 'Interestingly, this is the same Catalan number -- the insight is understanding why BST structure count equals general binary tree structure count.',
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
            python: `def structurally_unique_binary_trees(n):
    """
    Structurally Unique Binary Trees

    Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(structurally_unique_binary_trees(3))  # Expected: 1
print(structurally_unique_binary_trees(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// StructurallyUniqueBinaryTrees solves the Structurally Unique Binary Trees problem.
// Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.
// Time: O(?), Space: O(?)
func StructurallyUniqueBinaryTrees(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StructurallyUniqueBinaryTrees(3)) // Expected: 1
	fmt.Println(StructurallyUniqueBinaryTrees(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-02-structurally-unique-binary-trees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-02-structurally-unique-binary-trees'] = problem;
})();
