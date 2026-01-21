/**
 * Remove Duplicates Keeping At Most K Occurrences
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates Keeping At Most K Occurrences',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of a **sorted** linked list and an integer k, remove duplicates such that each element appears at most k times. Return the linked list sorted.',
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
                1,
                1,
                2,
                2,
                3
        ],
        "k": 2
},
        output: [1, 1, 2, 2, 3],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, ..., 3] (length 6), k=2, the result is [1, 1, 2, 2, 3].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1,
                2,
                2,
                2
        ],
        "k": 1
},
        output: [1, 2],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, ..., 2] (length 7), k=1, the result is [1, 2].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                3,
                3,
                3,
                4
        ],
        "k": 3
},
        output: [1, 2, 3, 3, 3, 4],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 4] (length 7), k=3, the result is [1, ..., 4] (length 6).'
    }
        ],
        solutions: {
            python: `def removeDuplicatesKeepingAtMostKOccurrences(data):
    """
    Remove Duplicates Keeping At Most K Occurrences

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

// RemoveDuplicatesKeepingAtMostKOccurrences solves the Remove Duplicates Keeping At Most K Occurrences problem.
// Time: O(n), Space: O(n)
func RemoveDuplicatesKeepingAtMostKOccurrences(data interface{}) interface{} {
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
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k'] = problem;

})();
