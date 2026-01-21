/**
 * BST Iterator
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction',
        description: 'Implement the BSTIterator class that represents an iterator over the **in-order traversal** of a binary search tree (BST): - BSTIterator(TreeNode root) Initializes an object with the root of the BST. - int next() Returns the next smallest number in the BST. You may assume next() calls will always be valid. - boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. The pointer should be initialized to a non-existent number smal',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(1) amortized for next(), O(1) for hasNext()',
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
                7,
                3,
                15,
                null,
                null,
                9,
                20
        ]
},
        output: [3, 7, 9, 15, 20],
        explanation: 'Processing the input data produces the output. For input tree=[7, 3, ..., 20] (length 7), the result is [3, 7, 9, 15, 20].'
    }
        ],
        solutions: {
            python: `def bstIterator(data):
    """
    BST Iterator

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

// BstIterator solves the BST Iterator problem.
// Time: O(n), Space: O(n)
func BstIterator(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator'] = problem;

})();
