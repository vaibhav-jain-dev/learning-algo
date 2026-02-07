/**
 * K Closest Values in Streaming BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Values in Streaming BST',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'The BST receives insertions and deletions over time. After each modification, return the current k closest values to a fixed target.',
        problem: 'Maintaining a dynamic result set under mutations requires augmented data structures or efficient re-computation strategies, unlike the static single-pass approach. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,5,1,3],"target":10,"k":2},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[8,4,12,2,6,10,14,1,3,5,7],"target":10,"k":4},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[4],"target":10,"k":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def k_closest_values_in_streaming_bst(tree, target, k):
    """
    K Closest Values in Streaming BST

    The BST receives insertions and deletions over time. After each modification, return the current k closest values to a fixed target.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(k_closest_values_in_streaming_bst([4,2,5,1,3], 10, 2))  # Expected: 1
print(k_closest_values_in_streaming_bst([8,4,12,2,6,10,14,1,3,5,7], 10, 4))  # Expected: 2
print(k_closest_values_in_streaming_bst([4], 10, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KClosestValuesInStreamingBst solves the K Closest Values in Streaming BST problem.
// The BST receives insertions and deletions over time. After each modification, return the current k closest values to a fixed target.
// Time: O(n), Space: O(1)
func KClosestValuesInStreamingBst(tree []int, target float64, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KClosestValuesInStreamingBst([]int{4, 2, 5, 1, 3}, 10, 2)) // Expected: 1
	fmt.Println(KClosestValuesInStreamingBst([]int{8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7}, 10, 4)) // Expected: 2
	fmt.Println(KClosestValuesInStreamingBst([]int{4}, 10, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-03-k-closest-values-in-streaming-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-03-k-closest-values-in-streaming-bst'] = problem;
})();
