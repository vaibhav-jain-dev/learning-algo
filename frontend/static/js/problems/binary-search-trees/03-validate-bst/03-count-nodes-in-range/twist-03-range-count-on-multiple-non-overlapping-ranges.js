/**
 * Range Count on Multiple Non-Overlapping Ranges
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-range
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Count on Multiple Non-Overlapping Ranges',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.',
        problem: 'Multiple ranges mean you must track which range you are currently evaluating during traversal. Sorting ranges and using a pointer that advances through them during inorder traversal turns this into a merge-like operation. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,3,7,null,18],"low":7,"high":15},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[10,5,15,3,7,13,18,1,null,6],"low":6,"high":10},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[10],"low":0,"high":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def range_count_on_multiple_non_overlapping_ranges(tree, low, high):
    """
    Range Count on Multiple Non-Overlapping Ranges

    Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on low
        j = 0
        for k in range(i, n):
            if j < len(low) and tree[k] == low[j]:
                j += 1
        if j == len(low):
            count += 1

    return count


# Test cases
print(range_count_on_multiple_non_overlapping_ranges([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(range_count_on_multiple_non_overlapping_ranges([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(range_count_on_multiple_non_overlapping_ranges([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// RangeCountOnMultipleNonOverlappingRanges solves the Range Count on Multiple Non-Overlapping Ranges problem.
// Given multiple non-overlapping ranges, count nodes in each range in a single traversal of the BST.
// Time: O(n), Space: O(1)
func RangeCountOnMultipleNonOverlappingRanges(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RangeCountOnMultipleNonOverlappingRanges([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(RangeCountOnMultipleNonOverlappingRanges([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(RangeCountOnMultipleNonOverlappingRanges([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-03-range-count-on-multiple-non-overlapping-ranges', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-03-range-count-on-multiple-non-overlapping-ranges'] = problem;
})();
