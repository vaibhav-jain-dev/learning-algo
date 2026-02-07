/**
 * Range Count Excluding Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-range
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Count Excluding Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.',
        problem: 'You must compute two things: total range count and range count within X.',
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
            python: `def range_count_excluding_subtree(tree, low, high):
    """
    Range Count Excluding Subtree

    Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.

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
print(range_count_excluding_subtree([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(range_count_excluding_subtree([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(range_count_excluding_subtree([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// RangeCountExcludingSubtree solves the Range Count Excluding Subtree problem.
// Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.
// Time: O(n), Space: O(1)
func RangeCountExcludingSubtree(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RangeCountExcludingSubtree([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(RangeCountExcludingSubtree([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(RangeCountExcludingSubtree([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-05-range-count-excluding-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-05-range-count-excluding-subtree'] = problem;
})();
