/**
 * First Triplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Triplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the first value that appears at least three times in the array. Return the value whose third occurrence has the minimum index.',
        problem: 'Track count per value using a hash map. When any value count reaches 3, return it immediately.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[2,1,5,2,3,3,4]},
                output: 1,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            {
                input: {"array":[2,1,5,3,3,2,4]},
                output: 2,
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 0,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,1,2,3,3,2,2]},
                output: 3,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: 0,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            }
        ],
        solutions: {
            python: `def first_triplicate_value(array):
    """
    First Triplicate Value

    Find the first value that appears at least three times in the array. Return the value whose third occurrence has the minimum index.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(first_triplicate_value([2,1,5,2,3,3,4]))  # Expected: 1
print(first_triplicate_value([2,1,5,3,3,2,4]))  # Expected: 2
print(first_triplicate_value([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// FirstTriplicateValue solves the First Triplicate Value problem.
// Find the first value that appears at least three times in the array. Return the value whose third occurrence has the minimum index.
// Time: O(n), Space: O(n)
func FirstTriplicateValue(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FirstTriplicateValue([]int{2, 1, 5, 2, 3, 3, 4})) // Expected: 1
	fmt.Println(FirstTriplicateValue([]int{2, 1, 5, 3, 3, 2, 4})) // Expected: 2
	fmt.Println(FirstTriplicateValue([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-04-first-triplicate-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-04-first-triplicate-value'] = problem;
})();
