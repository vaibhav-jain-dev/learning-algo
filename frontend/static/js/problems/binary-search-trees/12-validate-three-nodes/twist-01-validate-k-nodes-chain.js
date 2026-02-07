/**
 * Validate K Nodes Chain
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-validation-nodes
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate K Nodes Chain',
        difficulty: 'Hard',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Given k nodes in a BST, determine if they form a valid ancestor-descendant chain (each node is an ancestor of the next one in the given order).',
        problem: 'With three nodes, you only check two relationships. With k nodes, you must verify a chain of ancestor-descendant links efficiently, potentially using LCA (Lowest Common Ancestor) queries or path tracing. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The validate k nodes chain condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":3,"nodeThree":2},
                output: false,
                explanation: 'The validate k nodes chain condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"nodeOne":0,"nodeTwo":0,"nodeThree":0},
                output: false,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def validate_k_nodes_chain(tree, nodeOne, nodeTwo, nodeThree):
    """
    Validate K Nodes Chain

    Given k nodes in a BST, determine if they form a valid ancestor-descendant chain (each node is an ancestor of the next one in the given order).

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(nodeOne) and tree[i] == nodeOne[j]:
            j += 1

    return j == len(nodeOne)


# Test cases
print(validate_k_nodes_chain([5,2,7,1,4,6,8,0,None,3], 5, 2, 3))  # Expected: True
print(validate_k_nodes_chain([5,2,7,1,4,6,8,0,None,3], 5, 3, 2))  # Expected: False
print(validate_k_nodes_chain([5], 0, 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// ValidateKNodesChain solves the Validate K Nodes Chain problem.
// Given k nodes in a BST, determine if they form a valid ancestor-descendant chain (each node is an ancestor of the next one in the given order).
// Time: O(n), Space: O(1)
func ValidateKNodesChain(tree []int, nodeOne int, nodeTwo int, nodeThree int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(nodeOne); i++ {
		if tree[i] == nodeOne[j] {
			j++
		}
	}

	return j == len(nodeOne)
}

func main() {
	fmt.Println(ValidateKNodesChain([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 2, 3)) // Expected: true
	fmt.Println(ValidateKNodesChain([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 3, 2)) // Expected: false
	fmt.Println(ValidateKNodesChain([]int{5}, 0, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-01-validate-k-nodes-chain', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-01-validate-k-nodes-chain'] = problem;
})();
