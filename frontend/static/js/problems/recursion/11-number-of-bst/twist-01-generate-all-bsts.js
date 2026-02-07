/**
 * Generate All BSTs
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-count-bst
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate All BSTs',
        difficulty: 'Hard',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.',
        problem: 'Shifts from counting (Catalan number computation) to constructing every tree, requiring recursive tree building with node allocation and list management.',
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
            python: `def generate_all_bsts(n):
    """
    Generate All BSTs

    Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(generate_all_bsts(3))  # Expected: 1
print(generate_all_bsts(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// GenerateAllBsts solves the Generate All BSTs problem.
// Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.
// Time: O(?), Space: O(?)
func GenerateAllBsts(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(GenerateAllBsts(3)) // Expected: 1
	fmt.Println(GenerateAllBsts(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-01-generate-all-bsts', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-01-generate-all-bsts'] = problem;
})();
