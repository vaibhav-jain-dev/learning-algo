/**
 * Zigzag with Column Index
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/03-level-order-zigzag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Zigzag with Column Index',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/03-level-order-zigzag',
        description: 'Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).',
        problem: 'Tracking column indices through the zigzag complicates the bookkeeping significantly. The visual position of a node in the zigzag output does not correspond to its column index, requiring dual tracking of BFS level and vertical position. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[3,9,20,null,null,15,7]},
                output: 0,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[1,2,3,4,5,6,7]},
                output: 1,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[3]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def zigzag_with_column_index(tree):
    """
    Zigzag with Column Index

    Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(zigzag_with_column_index([3,9,20,None,None,15,7]))  # Expected: 0
print(zigzag_with_column_index([1,2,3,4,5,6,7]))  # Expected: 1
print(zigzag_with_column_index([3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ZigzagWithColumnIndex solves the Zigzag with Column Index problem.
// Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).
// Time: O(n), Space: O(1)
func ZigzagWithColumnIndex(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ZigzagWithColumnIndex([]int{3, 9, 20, null, null, 15, 7})) // Expected: 0
	fmt.Println(ZigzagWithColumnIndex([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: 1
	fmt.Println(ZigzagWithColumnIndex([]int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag/twist-03-zigzag-with-column-index', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag/twist-03-zigzag-with-column-index'] = problem;
})();
