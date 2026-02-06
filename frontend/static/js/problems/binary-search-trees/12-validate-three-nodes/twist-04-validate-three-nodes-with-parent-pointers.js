/**
 * Validate Three Nodes with Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation-nodes
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate Three Nodes with Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.',
        problem: 'Parent pointers enable upward traversal. Instead of going down from nodes, you can walk up from nodeTwo to check if you reach nodeOne or nodeThree, then walk down to verify the other direction. The traversal strategy fundamentally changes. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: true,
                explanation: 'The validate three nodes with parent pointers condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":3,"nodeThree":2},
                output: false,
                explanation: 'The validate three nodes with parent pointers condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"nodeOne":0,"nodeTwo":0,"nodeThree":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def validate_three_nodes_with_parent_pointers(tree, nodeOne, nodeTwo, nodeThree):
    """
    Validate Three Nodes with Parent Pointers

    Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(nodeOne) and tree[i] == nodeOne[j]:
            j += 1

    return j == len(nodeOne)


# Test cases
print(validate_three_nodes_with_parent_pointers([5,2,7,1,4,6,8,0,None,3], 5, 2, 3))  # Expected: True
print(validate_three_nodes_with_parent_pointers([5,2,7,1,4,6,8,0,None,3], 5, 3, 2))  # Expected: False
print(validate_three_nodes_with_parent_pointers([5], 0, 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// ValidateThreeNodesWithParentPointers solves the Validate Three Nodes with Parent Pointers problem.
// Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.
// Time: O(n), Space: O(1)
func ValidateThreeNodesWithParentPointers(tree []int, nodeOne int, nodeTwo int, nodeThree int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(nodeOne); i++ {
		if tree[i] == nodeOne[j] {
			j++
		}
	}

	return j == len(nodeOne)
}

func main() {
	fmt.Println(ValidateThreeNodesWithParentPointers([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 2, 3)) // Expected: true
	fmt.Println(ValidateThreeNodesWithParentPointers([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 3, 2)) // Expected: false
	fmt.Println(ValidateThreeNodesWithParentPointers([]int{5}, 0, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-04-validate-three-nodes-with-parent-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-04-validate-three-nodes-with-parent-pointers'] = problem;
})();
