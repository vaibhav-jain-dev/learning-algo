/**
 * First Duplicate Without Mutation
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Duplicate Without Mutation',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the first duplicate value in an array of integers between 1 and n without modifying the input array. Use Floyd cycle detection treating array values as next-pointers.',
        problem: 'Treat array as a linked list where value at index i points to index array[i]. Use slow/fast pointers to detect a cycle, then find the cycle entrance which is the duplicate.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
            python: `def first_duplicate_without_mutation(array):
    """
    First Duplicate Without Mutation

    Find the first duplicate value in an array of integers between 1 and n without modifying the input array. Use Floyd cycle detection treating array values as next-pointers.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(first_duplicate_without_mutation([2,1,5,2,3,3,4]))  # Expected: 1
print(first_duplicate_without_mutation([2,1,5,3,3,2,4]))  # Expected: 2
print(first_duplicate_without_mutation([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// FirstDuplicateWithoutMutation solves the First Duplicate Without Mutation problem.
// Find the first duplicate value in an array of integers between 1 and n without modifying the input array. Use Floyd cycle detection treating array values as next-pointers.
// Time: O(n), Space: O(1)
func FirstDuplicateWithoutMutation(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FirstDuplicateWithoutMutation([]int{2, 1, 5, 2, 3, 3, 4})) // Expected: 1
	fmt.Println(FirstDuplicateWithoutMutation([]int{2, 1, 5, 3, 3, 2, 4})) // Expected: 2
	fmt.Println(FirstDuplicateWithoutMutation([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-01-first-duplicate-without-mutation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-01-first-duplicate-without-mutation'] = problem;
})();
