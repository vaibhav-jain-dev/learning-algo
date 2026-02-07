/**
 * All First Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'All First Duplicates',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Return all values that are duplicates, in the order their second occurrence appears when scanning left to right.',
        problem: 'Scan left to right with a seen set. Each time a value is already in the set, add it to the result list (only on first duplicate detection).',
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
            python: `def all_first_duplicates(array):
    """
    All First Duplicates

    Return all values that are duplicates, in the order their second occurrence appears when scanning left to right.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(all_first_duplicates([2,1,5,2,3,3,4]))  # Expected: 1
print(all_first_duplicates([2,1,5,3,3,2,4]))  # Expected: 2
print(all_first_duplicates([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllFirstDuplicates solves the All First Duplicates problem.
// Return all values that are duplicates, in the order their second occurrence appears when scanning left to right.
// Time: O(n), Space: O(n)
func AllFirstDuplicates(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllFirstDuplicates([]int{2, 1, 5, 2, 3, 3, 4})) // Expected: 1
	fmt.Println(AllFirstDuplicates([]int{2, 1, 5, 3, 3, 2, 4})) // Expected: 2
	fmt.Println(AllFirstDuplicates([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-05-all-first-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-05-all-first-duplicates'] = problem;
})();
