/**
 * Reverse Alternating K Nodes
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Alternating K Nodes',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Given the head of a linked list and an integer k, reverse the first k nodes, then skip the next k nodes, then reverse the next k nodes, and so on. If there are fewer than k nodes remaining (either for reversing or skipping), handle them accordingly: - If reversing: reverse all remaining nodes - If skipping: skip all remaining nodes',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ],
        examples: [
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
        ],
        "k": 2
},
        output: [2, 1, 3, 4, 6, 5, 7, 8],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 8] (length 8), k=2, the result is [2, ..., 8] (length 8).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5, 6, 9, 8, 7, 10],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 10] (length 10), k=3, the result is [3, ..., 10] (length 10).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=3, the result is [3, 2, 1, 4, 5].'
    }
        ],
        solutions: {
            python: `def reverseAlternatingKNodes(data):
    """
    Reverse Alternating K Nodes

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Maintain prev, curr, next pointers while reversing

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

// ReverseAlternatingKNodes solves the Reverse Alternating K Nodes problem.
// Time: O(n), Space: O(n)
func ReverseAlternatingKNodes(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Maintain prev, curr, next pointers while reversing

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
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes'] = problem;

})();
