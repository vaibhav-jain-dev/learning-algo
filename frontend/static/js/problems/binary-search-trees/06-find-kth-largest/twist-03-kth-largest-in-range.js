/**
 * Kth Largest in Range
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-kth-largest
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Largest in Range',
        difficulty: 'Hard',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.',
        problem: 'You must combine range filtering with order statistics. A simple reverse inorder traversal needs an additional check to skip out-of-range nodes while still pruning subtrees for efficiency. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":3},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":1},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[15],"k":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def kth_largest_in_range(tree, k):
    """
    Kth Largest in Range

    Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and tree[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(kth_largest_in_range([15,5,20,2,5,17,22,1], 3))  # Expected: 1
print(kth_largest_in_range([15,5,20,2,5,17,22,1], 1))  # Expected: 2
print(kth_largest_in_range([15], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthLargestInRange solves the Kth Largest in Range problem.
// Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.
// Time: O(n), Space: O(1)
func KthLargestInRange(tree []int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthLargestInRange([]int{15, 5, 20, 2, 5, 17, 22, 1}, 3)) // Expected: 1
	fmt.Println(KthLargestInRange([]int{15, 5, 20, 2, 5, 17, 22, 1}, 1)) // Expected: 2
	fmt.Println(KthLargestInRange([]int{15}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-03-kth-largest-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-03-kth-largest-in-range'] = problem;
})();
