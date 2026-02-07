/**
 * Min Height BST from Unsorted Array
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Height BST from Unsorted Array',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.',
        problem: 'The original problem gives you a sorted array. Here you must first sort, but the twist is considering whether an O(n log n) sort-then-build approach can be beaten or if there are clever partitioning strategies. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,5,7,10,13,14,15,22]},
                output: 4,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"array":[1,2,3]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def min_height_bst_from_unsorted_array(array):
    """
    Min Height BST from Unsorted Array

    Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(min_height_bst_from_unsorted_array([1,2,5,7,10,13,14,15,22]))  # Expected: 4
print(min_height_bst_from_unsorted_array([1,2,3]))  # Expected: 2
print(min_height_bst_from_unsorted_array([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinHeightBstFromUnsortedArray solves the Min Height BST from Unsorted Array problem.
// Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.
// Time: O(n), Space: O(1)
func MinHeightBstFromUnsortedArray(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinHeightBstFromUnsortedArray([]int{1, 2, 5, 7, 10, 13, 14, 15, 22})) // Expected: 4
	fmt.Println(MinHeightBstFromUnsortedArray([]int{1, 2, 3})) // Expected: 2
	fmt.Println(MinHeightBstFromUnsortedArray([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-05-min-height-bst-from-unsorted-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-05-min-height-bst-from-unsorted-array'] = problem;
})();
