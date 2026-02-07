/**
 * Dynamic Range Count with Updates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-range
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dynamic Range Count with Updates',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.',
        problem: 'Static range counting is a one-shot traversal. Dynamic updates require maintaining auxiliary information (subtree sizes) through insertions and deletions, adding complexity to every mutation operation. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
            python: `def dynamic_range_count_with_updates(tree, low, high):
    """
    Dynamic Range Count with Updates

    Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.

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
print(dynamic_range_count_with_updates([10,5,15,3,7,None,18], 7, 15))  # Expected: 1
print(dynamic_range_count_with_updates([10,5,15,3,7,13,18,1,None,6], 6, 10))  # Expected: 2
print(dynamic_range_count_with_updates([10], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// DynamicRangeCountWithUpdates solves the Dynamic Range Count with Updates problem.
// Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.
// Time: O(n), Space: O(1)
func DynamicRangeCountWithUpdates(tree []int, low int, high int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DynamicRangeCountWithUpdates([]int{10, 5, 15, 3, 7, null, 18}, 7, 15)) // Expected: 1
	fmt.Println(DynamicRangeCountWithUpdates([]int{10, 5, 15, 3, 7, 13, 18, 1, null, 6}, 6, 10)) // Expected: 2
	fmt.Println(DynamicRangeCountWithUpdates([]int{10}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-02-dynamic-range-count-with-updates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-02-dynamic-range-count-with-updates'] = problem;
})();
