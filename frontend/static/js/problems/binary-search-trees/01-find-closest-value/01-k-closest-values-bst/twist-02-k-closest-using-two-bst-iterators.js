/**
 * K Closest Using Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Using Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.',
        problem: 'Requires building two separate iterator stacks initialized to the target position, then alternating between them like a merge operation. This achieves O(log n + k) time instead of O(n log k). Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 0,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[8,4,12,2,6,10,14,1,3,5,7],"target":10,"k":4},
                output: 1,
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
            python: `def k_closest_using_two_bst_iterators(tree, target, k):
    """
    K Closest Using Two BST Iterators

    Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)
    m = len(target)

    for start in range(n):
        j = 0
        for i in range(start, n):
            if j < m and tree[i] == target[j]:
                j += 1
            if j == m:
                count += 1
                break

    return count


# Test cases
print(k_closest_using_two_bst_iterators([4,2,5,1,3], 10, 2))  # Expected: 0
print(k_closest_using_two_bst_iterators([8,4,12,2,6,10,14,1,3,5,7], 10, 4))  # Expected: 1
print(k_closest_using_two_bst_iterators([4], 10, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KClosestUsingTwoBstIterators solves the K Closest Using Two BST Iterators problem.
// Solve using two custom iterators: one that traverses forward (inorder) and one backward (reverse inorder), both starting from the target position. Merge results to find k closest.
// Time: O(n), Space: O(1)
func KClosestUsingTwoBstIterators(tree []int, target float64, k int) int {
	count := 0
	n := len(tree)
	m := len(target)

	for start := 0; start < n; start++ {
		j := 0
		for i := start; i < n && j < m; i++ {
			if tree[i] == target[j] {
				j++
			}
		}
		if j == m {
			count++
		}
	}

	return count
}

func main() {
	fmt.Println(KClosestUsingTwoBstIterators([]int{4, 2, 5, 1, 3}, 10, 2)) // Expected: 0
	fmt.Println(KClosestUsingTwoBstIterators([]int{8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7}, 10, 4)) // Expected: 1
	fmt.Println(KClosestUsingTwoBstIterators([]int{4}, 10, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-02-k-closest-using-two-bst-iterators', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-02-k-closest-using-two-bst-iterators'] = problem;
})();
