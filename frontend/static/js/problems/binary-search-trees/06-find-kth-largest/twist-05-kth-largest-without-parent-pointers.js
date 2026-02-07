/**
 * Kth Largest Without Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-kth-largest
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Largest Without Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Find the kth largest value using O(1) extra space (no recursion stack, no explicit stack). You may use Morris traversal concepts adapted for reverse inorder.',
        problem: 'The standard approach uses O(h) stack space. Achieving O(1) space requires Morris-style threading for reverse inorder, which is a fundamentally different traversal technique. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":3},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[15,5,20,2,5,17,22,1],"k":1},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[15],"k":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def kth_largest_without_parent_pointers(tree, k):
    """
    Kth Largest Without Parent Pointers

    Find the kth largest value using O(1) extra space (no recursion stack, no explicit stack). You may use Morris traversal concepts adapted for reverse inorder.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and tree[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(kth_largest_without_parent_pointers([15,5,20,2,5,17,22,1], 3))  # Expected: 1
print(kth_largest_without_parent_pointers([15,5,20,2,5,17,22,1], 1))  # Expected: 2
print(kth_largest_without_parent_pointers([15], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthLargestWithoutParentPointers solves the Kth Largest Without Parent Pointers problem.
// Find the kth largest value using O(1) extra space (no recursion stack, no explicit stack). You may use Morris traversal concepts adapted for reverse inorder.
// Time: O(n), Space: O(1)
func KthLargestWithoutParentPointers(tree []int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthLargestWithoutParentPointers([]int{15, 5, 20, 2, 5, 17, 22, 1}, 3)) // Expected: 1
	fmt.Println(KthLargestWithoutParentPointers([]int{15, 5, 20, 2, 5, 17, 22, 1}, 1)) // Expected: 2
	fmt.Println(KthLargestWithoutParentPointers([]int{15}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-05-kth-largest-without-parent-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-05-kth-largest-without-parent-pointers'] = problem;
})();
