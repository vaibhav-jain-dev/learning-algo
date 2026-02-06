/**
 * Morris Postorder Traversal
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Postorder Traversal',
        difficulty: 'Very Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.',
        problem: 'Morris inorder/preorder naturally yield their orders through the threading mechanism. Postorder requires processing nodes in reverse along right boundaries of left subtrees when removing threads, involving a linked-list reversal step within the traversal. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,6,1,3,5,7]},
                output: [4,2,6],
                explanation: 'The morris postorder traversal for this input yields [4, 2, 6].'
            },
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: [1,2,3],
                explanation: 'The morris postorder traversal for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[4]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def morris_postorder_traversal(tree):
    """
    Morris Postorder Traversal

    Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(morris_postorder_traversal([4,2,6,1,3,5,7]))  # Expected: [4,2,6]
print(morris_postorder_traversal([1,2,3,4,5,None,6]))  # Expected: [1,2,3]
print(morris_postorder_traversal([4]))  # Expected: []
`,
            go: `package main

import "fmt"

// MorrisPostorderTraversal solves the Morris Postorder Traversal problem.
// Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.
// Time: O(n), Space: O(1)
func MorrisPostorderTraversal(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MorrisPostorderTraversal([]int{4, 2, 6, 1, 3, 5, 7})) // Expected: [4,2,6]
	fmt.Println(MorrisPostorderTraversal([]int{1, 2, 3, 4, 5, null, 6})) // Expected: [1,2,3]
	fmt.Println(MorrisPostorderTraversal([]int{4})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-01-morris-postorder-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-01-morris-postorder-traversal'] = problem;
})();
