/**
 * Validate Three Nodes Without BST Property
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-validation-nodes
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate Three Nodes Without BST Property',
        difficulty: 'Hard',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Given a generic binary tree (not a BST), determine if nodeOne or nodeThree is an ancestor of nodeTwo and the other is a descendant.',
        problem: 'In a BST, you can navigate from any node to another using value comparisons in O(h) time. In a generic tree, you must traverse subtrees to find nodes, making the problem O(n) and requiring different search strategies. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The validate three nodes without bst property condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":3,"nodeThree":2},
                output: false,
                explanation: 'The validate three nodes without bst property condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"nodeOne":0,"nodeTwo":0,"nodeThree":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def validate_three_nodes_without_bst_property(tree, nodeOne, nodeTwo, nodeThree):
    """
    Validate Three Nodes Without BST Property

    Given a generic binary tree (not a BST), determine if nodeOne or nodeThree is an ancestor of nodeTwo and the other is a descendant.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(nodeOne) and tree[i] == nodeOne[j]:
            j += 1

    return j == len(nodeOne)


# Test cases
print(validate_three_nodes_without_bst_property([5,2,7,1,4,6,8,0,None,3], 5, 2, 3))  # Expected: True
print(validate_three_nodes_without_bst_property([5,2,7,1,4,6,8,0,None,3], 5, 3, 2))  # Expected: False
print(validate_three_nodes_without_bst_property([5], 0, 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// ValidateThreeNodesWithoutBstProperty solves the Validate Three Nodes Without BST Property problem.
// Given a generic binary tree (not a BST), determine if nodeOne or nodeThree is an ancestor of nodeTwo and the other is a descendant.
// Time: O(n), Space: O(1)
func ValidateThreeNodesWithoutBstProperty(tree []int, nodeOne int, nodeTwo int, nodeThree int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(nodeOne); i++ {
		if tree[i] == nodeOne[j] {
			j++
		}
	}

	return j == len(nodeOne)
}

func main() {
	fmt.Println(ValidateThreeNodesWithoutBstProperty([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 2, 3)) // Expected: true
	fmt.Println(ValidateThreeNodesWithoutBstProperty([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 3, 2)) // Expected: false
	fmt.Println(ValidateThreeNodesWithoutBstProperty([]int{5}, 0, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-02-validate-three-nodes-without-bst-property', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-02-validate-three-nodes-without-bst-property'] = problem;
})();
