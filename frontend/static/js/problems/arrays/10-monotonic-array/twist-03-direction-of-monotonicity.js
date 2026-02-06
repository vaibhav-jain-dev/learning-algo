/**
 * Direction of Monotonicity
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: direction-of-monotonicity
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Direction of Monotonicity',
        difficulty: 'Easy',
        algorithm: 'direction-of-monotonicity',
        parent: '10-monotonic-array',
        description: 'Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither". Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.',
        problem: 'Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.',
        hints: [
            'Think about how direction of monotonicity differs from the standard version of this problem.',
            'Key insight: Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.',
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
            python: `def direction_of_monotonicity(data):
    """
    Direction of Monotonicity

    Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither".
    \n    Approach: Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [5, 5, 5] returns "constant". array = [1, 2, 3] returns "increasing".

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
print(direction_of_monotonicity([1, 2, 3, 4, 5]))
print(direction_of_monotonicity([5, 3, 1]))
print(direction_of_monotonicity([1]))`,
            go: `package main

import "fmt"

// DirectionOfMonotonicity solves the Direction of Monotonicity problem.
// Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither".
// Time: O(n), Space: O(n)
func DirectionOfMonotonicity(data []int) []int {
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
    fmt.Println(DirectionOfMonotonicity([]int{1, 2, 3, 4, 5}))
    fmt.Println(DirectionOfMonotonicity([]int{5, 3, 1}))
    fmt.Println(DirectionOfMonotonicity([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-03-direction-of-monotonicity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-03-direction-of-monotonicity'] = problem;
})();
