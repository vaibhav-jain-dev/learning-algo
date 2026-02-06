/**
 * Find the Middle Node
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation-nodes
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Middle Node',
        difficulty: 'Medium',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.',
        problem: 'Instead of validating a given arrangement, you must discover it. You need to test all three possible assignments of which node is the middle, requiring a more exploratory approach. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The find the middle node condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,2,7,1,4,6,8,0,null,3],"nodeOne":5,"nodeTwo":3,"nodeThree":2},
                output: false,
                explanation: 'The find the middle node condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"nodeOne":0,"nodeTwo":0,"nodeThree":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_the_middle_node(tree, nodeOne, nodeTwo, nodeThree):
    """
    Find the Middle Node

    Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(nodeOne) and tree[i] == nodeOne[j]:
            j += 1

    return j == len(nodeOne)


# Test cases
print(find_the_middle_node([5,2,7,1,4,6,8,0,None,3], 5, 2, 3))  # Expected: True
print(find_the_middle_node([5,2,7,1,4,6,8,0,None,3], 5, 3, 2))  # Expected: False
print(find_the_middle_node([5], 0, 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// FindTheMiddleNode solves the Find the Middle Node problem.
// Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.
// Time: O(n), Space: O(1)
func FindTheMiddleNode(tree []int, nodeOne int, nodeTwo int, nodeThree int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(nodeOne); i++ {
		if tree[i] == nodeOne[j] {
			j++
		}
	}

	return j == len(nodeOne)
}

func main() {
	fmt.Println(FindTheMiddleNode([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 2, 3)) // Expected: true
	fmt.Println(FindTheMiddleNode([]int{5, 2, 7, 1, 4, 6, 8, 0, null, 3}, 5, 3, 2)) // Expected: false
	fmt.Println(FindTheMiddleNode([]int{5}, 0, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-03-find-the-middle-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-03-find-the-middle-node'] = problem;
})();
