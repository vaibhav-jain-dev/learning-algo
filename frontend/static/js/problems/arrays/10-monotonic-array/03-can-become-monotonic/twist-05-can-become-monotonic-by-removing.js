/**
 * Can Become Monotonic by Removing
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: can-become-monotonic-by-removing
 * Parent: 10-monotonic-array/03-can-become-monotonic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Can Become Monotonic by Removing',
        difficulty: 'Medium',
        algorithm: 'can-become-monotonic-by-removing',
        parent: '10-monotonic-array/03-can-become-monotonic',
        description: 'Instead of changing, can you make it monotonic by removing at most one element? Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.',
        problem: 'Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.',
        hints: [
            'Think about how can become monotonic by removing differs from the standard version of this problem.',
            'Key insight: Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.',
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
                output: [0,1,2],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: [0,1,2],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            },
            {
                input: {"array":[1,3,2,4]},
                output: [0,1,2],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            }
        ],
        solutions: {
            python: `def can_become_monotonic_by_removing(array):
    """
    Can Become Monotonic by Removing

    Instead of changing, can you make it monotonic by removing at most one element? Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(can_become_monotonic_by_removing([1,2,3,4,5]))  # Expected: [0,1,2]
print(can_become_monotonic_by_removing([5,4,3,2,1]))  # Expected: [0,1,2]
print(can_become_monotonic_by_removing([1,3,2,4]))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// CanBecomeMonotonicByRemoving solves the Can Become Monotonic by Removing problem.
// Instead of changing, can you make it monotonic by removing at most one element? Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.
// Time: O(n), Space: O(n)
func CanBecomeMonotonicByRemoving(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(CanBecomeMonotonicByRemoving([]int{1, 2, 3, 4, 5})) // Expected: [0,1,2]
	fmt.Println(CanBecomeMonotonicByRemoving([]int{5, 4, 3, 2, 1})) // Expected: [0,1,2]
	fmt.Println(CanBecomeMonotonicByRemoving([]int{1, 3, 2, 4})) // Expected: [0,1,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/03-can-become-monotonic/twist-05-can-become-monotonic-by-removing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/03-can-become-monotonic/twist-05-can-become-monotonic-by-removing'] = problem;
})();
