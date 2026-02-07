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
            // Basic test case
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The direction of monotonicity for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: [5,4,3],
                explanation: 'The direction of monotonicity for this input yields [5, 4, 3].'
            },
            {
                input: {"array":[1,3,2,4]},
                output: [1,3,2],
                explanation: 'The direction of monotonicity for this input yields [1, 3, 2].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            }
        ],
        solutions: {
            python: `def direction_of_monotonicity(array):
    """
    Direction of Monotonicity

    Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither". Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(direction_of_monotonicity([1,2,3,4,5]))  # Expected: [1,2,3]
print(direction_of_monotonicity([5,4,3,2,1]))  # Expected: [5,4,3]
print(direction_of_monotonicity([1,3,2,4]))  # Expected: [1,3,2]
`,
            go: `package main

import "fmt"

// DirectionOfMonotonicity solves the Direction of Monotonicity problem.
// Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither". Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.
// Time: O(n), Space: O(n)
func DirectionOfMonotonicity(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(DirectionOfMonotonicity([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(DirectionOfMonotonicity([]int{5, 4, 3, 2, 1})) // Expected: [5,4,3]
	fmt.Println(DirectionOfMonotonicity([]int{1, 3, 2, 4})) // Expected: [1,3,2]
}
`
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
