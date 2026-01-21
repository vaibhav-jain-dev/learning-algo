/**
 * Inorder Predecessor and Successor
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Inorder Predecessor and Successor',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree and a target value, find the **inorder predecessor** and **inorder successor** of the target value. - **Inorder predecessor**: The largest value in the BST that is smaller than target - **Inorder successor**: The smallest value in the BST that is greater than target If the predecessor or successor does not exist, return -1 for that value.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(h)',
            space: 'O(1) iterative, O(h) recursive'
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
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 4
},
        output: {"predecessor": 3, "successor": 5},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=4, the result is {\'predecessor\': 3, \'successor\': 5}.'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 1
},
        output: {"predecessor": -1, "successor": 2},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=1, the result is {\'predecessor\': -1, \'successor\': 2}.'
    }
        ],
        solutions: {
            python: `def inorderPredecessorAndSuccessor(data):
    """
    Inorder Predecessor and Successor

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

// InorderPredecessorAndSuccessor solves the Inorder Predecessor and Successor problem.
// Time: O(n), Space: O(n)
func InorderPredecessorAndSuccessor(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii'] = problem;

})();
