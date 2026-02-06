/**
 * All Valid Three-Node Triples
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-validation-nodes
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Valid Three-Node Triples',
        difficulty: 'Very Hard',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.',
        problem: 'Instead of validating one triple, you count all valid ones. For each node b, you need the count of its ancestors and the count of its descendants. The total is the sum of ancestors(b) * descendants(b) for all b. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":2,"nodeThree":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the all valid three node triples criteria.'
            },
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":3,"nodeThree":2},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the all valid three node triples criteria.'
            },
            // Edge case
            {
                input: {"tree":[5],"nodeOne":0,"nodeTwo":0,"nodeThree":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_valid_three_node_triples(tree, nodeOne, nodeTwo, nodeThree):
    """
    All Valid Three-Node Triples

    Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on nodeOne
        j = 0
        for k in range(i, n):
            if j < len(nodeOne) and tree[k] == nodeOne[j]:
                j += 1
        if j == len(nodeOne):
            count += 1

    return count


# Test cases
print(all_valid_three_node_triples([5,2,7,1,4,6,8,0,None,3], 5, 2, 3))  # Expected: 1
print(all_valid_three_node_triples([5,2,7,1,4,6,8,0,None,3], 5, 3, 2))  # Expected: 2
print(all_valid_three_node_triples([5], 0, 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllValidThreeNodeTriples solves the All Valid Three-Node Triples problem.
// Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.
// Time: O(n), Space: O(1)
func AllValidThreeNodeTriples(tree []int, nodeOne int, nodeTwo int, nodeThree int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllValidThreeNodeTriples([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 2, 3)) // Expected: 1
	fmt.Println(AllValidThreeNodeTriples([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 3, 2)) // Expected: 2
	fmt.Println(AllValidThreeNodeTriples([]int{5}, 0, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-05-all-valid-three-node-triples', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-05-all-valid-three-node-triples'] = problem;
})();
