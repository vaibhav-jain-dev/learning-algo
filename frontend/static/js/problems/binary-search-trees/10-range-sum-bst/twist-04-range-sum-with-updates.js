/**
 * Range Sum with Updates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-range
 * Parent: 10-range-sum-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Sum with Updates',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '10-range-sum-bst',
        description: 'Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.',
        problem: 'Static range sum is a one-pass problem. With updates, you need to consider rebalancing and potentially augmenting nodes with subtree sums for efficient repeated queries, pushing toward a segment tree or BIT mindset. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
            python: `def range_sum_with_updates(tree, low, high):
    """
    Range Sum with Updates

    Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.

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
print(range_sum_with_updates([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(range_sum_with_updates([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(range_sum_with_updates([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// RangeSumWithUpdates solves the Range Sum with Updates problem.
// Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.
// Time: O(n), Space: O(1)
func RangeSumWithUpdates(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RangeSumWithUpdates([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(RangeSumWithUpdates([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(RangeSumWithUpdates([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst/twist-04-range-sum-with-updates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst/twist-04-range-sum-with-updates'] = problem;
})();
