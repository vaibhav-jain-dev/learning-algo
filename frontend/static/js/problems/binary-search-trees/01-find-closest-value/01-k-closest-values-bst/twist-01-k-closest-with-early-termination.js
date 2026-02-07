/**
 * K Closest with Early Termination
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest with Early Termination',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'Find k closest values but optimize by leveraging the BST inorder property to stop early once you know no closer values can exist.',
        problem: 'Instead of visiting all n nodes, you must reason about when the sorted order guarantees no future node can be closer than your current worst in the k-set. This requires maintaining a sliding window mindset. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,5,1,3],"target":3.7,"k":2},
                output: true,
                explanation: 'The k closest with early termination condition is satisfied for this input.'
            },
            {
                input: {"tree":[8,4,12,2,6,10,14,1,3,5,7],"target":6.5,"k":4},
                output: false,
                explanation: 'The k closest with early termination condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[4],"target":0,"k":0},
                output: false,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def k_closest_with_early_termination(tree, target, k):
    """
    K Closest with Early Termination

    Find k closest values but optimize by leveraging the BST inorder property to stop early once you know no closer values can exist.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(target) and tree[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(k_closest_with_early_termination([4,2,5,1,3], 3.7, 2))  # Expected: True
print(k_closest_with_early_termination([8,4,12,2,6,10,14,1,3,5,7], 6.5, 4))  # Expected: False
print(k_closest_with_early_termination([4], 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// KClosestWithEarlyTermination solves the K Closest with Early Termination problem.
// Find k closest values but optimize by leveraging the BST inorder property to stop early once you know no closer values can exist.
// Time: O(n), Space: O(1)
func KClosestWithEarlyTermination(tree []int, target float64, k int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(target); i++ {
		if tree[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(KClosestWithEarlyTermination([]int{4, 2, 5, 1, 3}, 3.7, 2)) // Expected: true
	fmt.Println(KClosestWithEarlyTermination([]int{8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7}, 6.5, 4)) // Expected: false
	fmt.Println(KClosestWithEarlyTermination([]int{4}, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-01-k-closest-with-early-termination', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-01-k-closest-with-early-termination'] = problem;
})();
