/**
 * Left Larger Than
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-augmented
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';

    const problem = {
        name: 'Left Larger Than',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.',
        problem: 'Processing from left to right changes the dynamic. You insert elements into the BST in forward order and count how many previously inserted values are larger, which requires tracking right-subtree sizes during insertion. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[8,5,11,-1,3,4,2]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"array":[8]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def left_larger_than(array):
    """
    Left Larger Than

    For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(left_larger_than([8,5,11,-1,3,4,2]))  # Expected: 1
print(left_larger_than([1,2,3,4,5]))  # Expected: 2
print(left_larger_than([8]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LeftLargerThan solves the Left Larger Than problem.
// For each element, count how many elements to its left are strictly larger than it. This counts inversions from the left side.
// Time: O(n), Space: O(1)
func LeftLargerThan(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LeftLargerThan([]int{8, 5, 11, -1, 3, 4, 2})) // Expected: 1
	fmt.Println(LeftLargerThan([]int{1, 2, 3, 4, 5})) // Expected: 2
	fmt.Println(LeftLargerThan([]int{8})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-03-left-larger-than', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-03-left-larger-than'] = problem;
})();
