/**
 * LCA with Parent Pointers
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCA with Parent Pointers',
        difficulty: 'Easy',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree',
        description: 'Each node has a parent pointer. Find LCA of two nodes without access to the root.',
        problem: 'Instead of top-down recursion, you work bottom-up using parent pointers, similar to finding the intersection of two linked lists.',
        hints: [
            'Start by understanding the key difference: Instead of top-down recursion, you work bottom-up using parent pointers, similar to finding the intersection of two linked lists.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Nodes p=7 and q=4 in a tree.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the lca with parent pointers criteria.'
            },
            {
                input: {"root":[3,5,1,6,2,0,8,null,null,7,4],"p":5,"q":4},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the lca with parent pointers criteria.'
            },
            // Edge case
            {
                input: {"root":[3],"p":0,"q":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lca_with_parent_pointers(root, p, q):
    """
    LCA with Parent Pointers

    Each node has a parent pointer. Find LCA of two nodes without access to the root.

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
print(lca_with_parent_pointers([3,5,1,6,2,0,8,None,None,7,4], 5, 1))  # Expected: 1
print(lca_with_parent_pointers([3,5,1,6,2,0,8,None,None,7,4], 5, 4))  # Expected: 2
print(lca_with_parent_pointers([3], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// LcaWithParentPointers solves the LCA with Parent Pointers problem.
// Each node has a parent pointer. Find LCA of two nodes without access to the root.
// Time: O(N), Space: O(H)
func LcaWithParentPointers(root []int, p int, q int) int {
	result := 0

	for i := 0; i < len(root); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LcaWithParentPointers([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 1)) // Expected: 1
	fmt.Println(LcaWithParentPointers([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 4)) // Expected: 2
	fmt.Println(LcaWithParentPointers([]int{3}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-01-lca-with-parent-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-01-lca-with-parent-pointers'] = problem;
})();
