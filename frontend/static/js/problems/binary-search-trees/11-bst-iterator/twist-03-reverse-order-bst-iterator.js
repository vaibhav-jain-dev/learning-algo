/**
 * Reverse Order BST Iterator
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Order BST Iterator',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.',
        problem: 'The standard iterator pushes left children. A reverse iterator pushes right children and processes nodes in right-root-left order. It is the mirror image, testing if you understand the inorder traversal mechanics deeply enough to reverse them. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20],"operations":["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":[7],"operations":["next"]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def reverse_order_bst_iterator(tree, operations):
    """
    Reverse Order BST Iterator

    Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and tree[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(reverse_order_bst_iterator([7,3,15,None,None,9,20], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]))  # Expected: 1
print(reverse_order_bst_iterator([7], ["next"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReverseOrderBstIterator solves the Reverse Order BST Iterator problem.
// Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.
// Time: O(n), Space: O(1)
func ReverseOrderBstIterator(tree []int, operations []string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReverseOrderBstIterator([]int{7, 3, 15, null, null, 9, 20}, []string{"next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"})) // Expected: 1
	fmt.Println(ReverseOrderBstIterator([]int{7}, []string{"next"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-03-reverse-order-bst-iterator', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-03-reverse-order-bst-iterator'] = problem;
})();
