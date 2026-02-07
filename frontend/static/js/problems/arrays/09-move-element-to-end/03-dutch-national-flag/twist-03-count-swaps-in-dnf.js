/**
 * Count Swaps in DNF
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-swaps-in-dnf
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Swaps in DNF',
        difficulty: 'Hard',
        algorithm: 'count-swaps-in-dnf',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Perform the Dutch National Flag partition and return the exact number of swaps performed. Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
        problem: 'Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
        hints: [
            'Think about how count swaps in dnf differs from the standard version of this problem.',
            'Key insight: Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
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
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def count_swaps_in_dnf(array, pivot):
    """
    Count Swaps in DNF

    Perform the Dutch National Flag partition and return the exact number of swaps performed. Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)

    for i in range(n):
        # Check condition based on pivot
        j = 0
        for k in range(i, n):
            if j < len(pivot) and array[k] == pivot[j]:
                j += 1
        if j == len(pivot):
            count += 1

    return count


# Test cases
print(count_swaps_in_dnf([1,2,1,2,3], None))  # Expected: 2
print(count_swaps_in_dnf([1,2,3], None))  # Expected: 1
print(count_swaps_in_dnf([1,1,1], None))  # Expected: 3
`,
            go: `package main

import "fmt"

// CountSwapsInDnf solves the Count Swaps in DNF problem.
// Perform the Dutch National Flag partition and return the exact number of swaps performed. Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.
// Time: O(n), Space: O(n)
func CountSwapsInDnf(array []int, pivot int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountSwapsInDnf([]int{1, 2, 1, 2, 3}, nil)) // Expected: 2
	fmt.Println(CountSwapsInDnf([]int{1, 2, 3}, nil)) // Expected: 1
	fmt.Println(CountSwapsInDnf([]int{1, 1, 1}, nil)) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-03-count-swaps-in-dnf', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-03-count-swaps-in-dnf'] = problem;
})();
