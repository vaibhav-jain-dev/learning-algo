/**
 * Iterative Tree Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Tree Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Implement **in-order**, **pre-order**, and **post-order** tree traversals **iteratively** using explicit stacks (without recursion). For a binary tree, implement: 1. inorderIterative(root) - returns inorder traversal 2. preorderIterative(root) - returns preorder traversal 3. postorderIterative(root) - returns postorder traversal',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                null,
                6
        ]
},
        output: {"inorder": [4, 2, 5, 1, 3, 6], "preorder": [1, 2, 4, 5, 3, 6], "postorder": [4, 5, 2, 6, 3, 1]},
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is {\'inorder\': [4, 2, 5, 1, 3, 6], \'preorder\': [1, 2, 4, 5, 3, 6], \'postorder\': [4, 5, 2, 6, 3, 1]}.'
    }
        ],
        solutions: {
            python: `def iterativeTreeTraversal(data):
    """
    Iterative Tree Traversal

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// IterativeTreeTraversal solves the Iterative Tree Traversal problem.
// Time: O(n), Space: O(n)
func IterativeTreeTraversal(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal'] = problem;

})();
