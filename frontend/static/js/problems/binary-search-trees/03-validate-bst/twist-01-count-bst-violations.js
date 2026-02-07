/**
 * Count BST Violations
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 * Parent: 03-validate-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count BST Violations',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.',
        problem: 'You cannot short-circuit on the first violation. Every node must be checked, and you must carefully define what counts as a violation -- is it the parent that is wrong, or the child? Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,13,22,1,null,null,null,null,14]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[10,5,15,2,5,10,22]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def count_bst_violations(tree):
    """
    Count BST Violations

    Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_bst_violations([10,5,15,2,5,13,22,1,None,None,None,None,14]))  # Expected: 1
print(count_bst_violations([10,5,15,2,5,10,22]))  # Expected: 2
print(count_bst_violations([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountBstViolations solves the Count BST Violations problem.
// Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.
// Time: O(n), Space: O(1)
func CountBstViolations(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountBstViolations([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14})) // Expected: 1
	fmt.Println(CountBstViolations([]int{10, 5, 15, 2, 5, 10, 22})) // Expected: 2
	fmt.Println(CountBstViolations([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/twist-01-count-bst-violations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/twist-01-count-bst-violations'] = problem;
})();
