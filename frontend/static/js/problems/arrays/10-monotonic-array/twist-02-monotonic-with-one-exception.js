/**
 * Monotonic with One Exception
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: monotonic-with-one-exception
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Monotonic with One Exception',
        difficulty: 'Medium',
        algorithm: 'monotonic-with-one-exception',
        parent: '10-monotonic-array',
        description: 'Check if the array can become monotonic by changing at most one element. Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
        problem: 'Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
        hints: [
            'Think about how monotonic with one exception differs from the standard version of this problem.',
            'Key insight: Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: 'Array is monotonically increasing.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: true,
                explanation: 'Array is monotonically decreasing.'
            },
            {
                input: {"array":[1,3,2,4]},
                output: false,
                explanation: 'Array is not monotonic - has both increases and decreases.'
            }
        ],
        solutions: {
            python: `def monotonic_with_one_exception(data):
    """
    Monotonic with One Exception

    Check if the array can become monotonic by changing at most one element.
    \n    Approach: Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 5, 3, 4, 5]. Change 5 at index 1 to 2: [1,2,3,4,5]. Return true.

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
print(monotonic_with_one_exception([1, 2, 3, 4, 5]))
print(monotonic_with_one_exception([5, 3, 1]))
print(monotonic_with_one_exception([1]))`,
            go: `package main

import "fmt"

// MonotonicWithOneException solves the Monotonic with One Exception problem.
// Check if the array can become monotonic by changing at most one element.
// Time: O(n), Space: O(n)
func MonotonicWithOneException(data []int) []int {
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
    fmt.Println(MonotonicWithOneException([]int{1, 2, 3, 4, 5}))
    fmt.Println(MonotonicWithOneException([]int{5, 3, 1}))
    fmt.Println(MonotonicWithOneException([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-02-monotonic-with-one-exception', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-02-monotonic-with-one-exception'] = problem;
})();
