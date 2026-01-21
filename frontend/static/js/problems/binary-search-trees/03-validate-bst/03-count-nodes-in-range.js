/**
 * Count Nodes in Range
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes in Range',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '03-validate-bst',
        description: 'Given the root node of a binary search tree and two integers low and high, return the **count of nodes** whose values are in the inclusive range [low, high]. **Variant:** Also implement a version that returns the **sum of values** of nodes in the range.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n) worst, O(log n + k) average',
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
                10,
                5,
                15,
                3,
                7,
                null,
                18
        ],
        "low": 7,
        "high": 15
},
        output: {"count": 3, "sum": 32},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 18] (length 7), low=7, high=15, the result is {\'count\': 3, \'sum\': 32}.'
    },
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                13,
                18,
                1,
                null,
                6
        ],
        "low": 6,
        "high": 10
},
        output: {"count": 3, "sum": 23},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 6] (length 10), low=6, high=10, the result is {\'count\': 3, \'sum\': 23}.'
    }
        ],
        solutions: {
            python: `def countNodesInRange(data):
    """
    Count Nodes in Range

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

// CountNodesInRange solves the Count Nodes in Range problem.
// Time: O(n), Space: O(n)
func CountNodesInRange(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range'] = problem;

})();
