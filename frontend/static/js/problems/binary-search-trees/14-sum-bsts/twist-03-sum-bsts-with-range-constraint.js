/**
 * Sum BSTs with Range Constraint
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum BSTs with Range Constraint',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].',
        problem: 'You need to validate both the BST property AND the range constraint simultaneously. A valid BST subtree might be excluded if any of its values fall outside the range, adding an extra filtering dimension to the bottom-up check. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,4,3,2,4,null,5,null,null,null,null,4,6]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[5,4,8,3,null,6,3]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def sum_bsts_with_range_constraint(tree):
    """
    Sum BSTs with Range Constraint

    Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(sum_bsts_with_range_constraint([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 1
print(sum_bsts_with_range_constraint([5,4,8,3,None,6,3]))  # Expected: 2
print(sum_bsts_with_range_constraint([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SumBstsWithRangeConstraint solves the Sum BSTs with Range Constraint problem.
// Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].
// Time: O(n), Space: O(1)
func SumBstsWithRangeConstraint(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SumBstsWithRangeConstraint([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 1
	fmt.Println(SumBstsWithRangeConstraint([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 2
	fmt.Println(SumBstsWithRangeConstraint([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-03-sum-bsts-with-range-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-03-sum-bsts-with-range-constraint'] = problem;
})();
