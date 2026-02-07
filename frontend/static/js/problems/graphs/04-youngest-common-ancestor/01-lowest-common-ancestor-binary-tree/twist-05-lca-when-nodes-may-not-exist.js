/**
 * LCA When Nodes May Not Exist
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCA When Nodes May Not Exist',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree',
        description: 'p or q might not exist in the tree. Return null if either node is missing.',
        problem: 'The standard algorithm assumes both nodes exist. You must track whether each target was actually found, requiring extra state in the recursion.',
        hints: [
            'Start by understanding the key difference: The standard algorithm assumes both nodes exist.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(N)',
            space: 'O(H)'
        },
        examples: [
            // Basic test case
            {
                input: {"root":[3,5,1,6,2,0,8,null,null,7,4],"p":5,"q":1},
                output: true,
                explanation: 'The lca when nodes may not exist condition is satisfied for this input.'
            },
            {
                input: {"root":[3,5,1,6,2,0,8,null,null,7,4],"p":5,"q":4},
                output: false,
                explanation: 'The lca when nodes may not exist condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"root":[3],"p":0,"q":0},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def lca_when_nodes_may_not_exist(root, p, q):
    """
    LCA When Nodes May Not Exist

    p or q might not exist in the tree. Return null if either node is missing.

    Time: O(N)
    Space: O(H)
    """
    j = 0

    for i in range(len(root)):
        if j < len(p) and root[i] == p[j]:
            j += 1

    return j == len(p)


# Test cases
print(lca_when_nodes_may_not_exist([3,5,1,6,2,0,8,None,None,7,4], 5, 1))  # Expected: True
print(lca_when_nodes_may_not_exist([3,5,1,6,2,0,8,None,None,7,4], 5, 4))  # Expected: False
print(lca_when_nodes_may_not_exist([3], 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// LcaWhenNodesMayNotExist solves the LCA When Nodes May Not Exist problem.
// p or q might not exist in the tree. Return null if either node is missing.
// Time: O(N), Space: O(H)
func LcaWhenNodesMayNotExist(root []int, p int, q int) bool {
	j := 0

	for i := 0; i < len(root) && j < len(p); i++ {
		if root[i] == p[j] {
			j++
		}
	}

	return j == len(p)
}

func main() {
	fmt.Println(LcaWhenNodesMayNotExist([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 1)) // Expected: true
	fmt.Println(LcaWhenNodesMayNotExist([]int{3, 5, 1, 6, 2, 0, 8, null, null, 7, 4}, 5, 4)) // Expected: false
	fmt.Println(LcaWhenNodesMayNotExist([]int{3}, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-05-lca-when-nodes-may-not-exist', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-05-lca-when-nodes-may-not-exist'] = problem;
})();
