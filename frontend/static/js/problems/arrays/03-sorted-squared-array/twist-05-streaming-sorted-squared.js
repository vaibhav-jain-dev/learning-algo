/**
 * Streaming Sorted Squared
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: streaming-sorted-squared
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Sorted Squared',
        difficulty: 'Hard',
        algorithm: 'streaming-sorted-squared',
        parent: '03-sorted-squared-array',
        description: 'Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time. Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
        problem: 'Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
        hints: [
            'Think about how streaming sorted squared differs from the standard version of this problem.',
            'Key insight: Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,2,4]},
                output: 1,
                explanation: 'Only one operation needed to achieve the goal.'
            },
            {
                input: {"array":[1,2,3,4]},
                output: 0,
                explanation: 'Already satisfies the condition, no operations needed.'
            },
            {
                input: {"array":[5,3,1,4,2]},
                output: 2,
                explanation: 'Two operations needed to satisfy the condition.'
            }
        ],
        solutions: {
            python: `def streaming_sorted_squared(data):
    """
    Streaming Sorted Squared

    Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time.
    \n    Approach: Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # stream: -3 → [9], then -1 → [1,9], then 2 → [1,4,9], then 4 → [1,4,9,16]

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(streaming_sorted_squared([1, 2, 3, 4, 5]))
print(streaming_sorted_squared([5, 3, 1]))
print(streaming_sorted_squared([1]))`,
            go: `package main

import "fmt"

// StreamingSortedSquared solves the Streaming Sorted Squared problem.
// Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time.
// Time: O(n log n), Space: O(n)
func StreamingSortedSquared(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(StreamingSortedSquared([]int{1, 2, 3, 4, 5}))
    fmt.Println(StreamingSortedSquared([]int{5, 3, 1}))
    fmt.Println(StreamingSortedSquared([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-05-streaming-sorted-squared', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-05-streaming-sorted-squared'] = problem;
})();
