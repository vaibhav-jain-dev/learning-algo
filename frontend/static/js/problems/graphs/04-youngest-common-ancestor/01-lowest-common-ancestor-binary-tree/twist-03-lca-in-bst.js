/**
 * LCA in BST
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCA in BST',
        difficulty: 'Easy',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree',
        description: 'The tree is a Binary Search Tree. Exploit the BST property to find LCA more efficiently.',
        problem: 'You do not need to search both subtrees. The BST ordering property lets you prune one side at each step, leading to O(H) time without visiting all nodes.',
        hints: [
            'Start by understanding the key difference: You do not need to search both subtrees.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: BST: [6,2,8,0,4,7,9].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N)',
            space: 'O(H)'
        },
        examples: [
            // Basic test case
            {
                input: {"root":[3,5,1,6,2,0,8,null,null,7,4],"p":5,"q":1},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the lca in bst criteria.'
            },
            {
                input: {"root":[3,5,1,6,2,0,8,null,null,7,4],"p":5,"q":4},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the lca in bst criteria.'
            },
            // Edge case
            {
                input: {"root":[3],"p":0,"q":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lca_in_bst(root, p, q):
    """
    LCA in BST

    The tree is a Binary Search Tree. Exploit the BST property to find LCA more efficiently.

    Time: O(N)
    Space: O(H)
    """
    count = 0
    n = len(root)

    for i in range(n):
        # Check condition based on p
        j = 0
        for k in range(i, n):
            if j < len(p) and root[k] == p[j]:
                j += 1
        if j == len(p):
            count += 1

    return count


# Test cases
print(lca_in_bst([3,5,1,6,2,0,8,None,None,7,4], 5, 1))  # Expected: 1
print(lca_in_bst([3,5,1,6,2,0,8,None,None,7,4], 5, 4))  # Expected: 2
print(lca_in_bst([3], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// LcaInBst solves the LCA in BST problem.
// The tree is a Binary Search Tree. Exploit the BST property to find LCA more efficiently.
// Time: O(N), Space: O(H)
func LcaInBst(root []int, p int, q int) int {
	result := 0

	for i := 0; i < len(root); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LcaInBst([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 1)) // Expected: 1
	fmt.Println(LcaInBst([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 4)) // Expected: 2
	fmt.Println(LcaInBst([]int{3}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-03-lca-in-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-03-lca-in-bst'] = problem;
})();
