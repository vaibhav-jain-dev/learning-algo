/**
 * Circular Array Subsequence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: circular-array-subsequence
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Array Subsequence',
        difficulty: 'Medium',
        algorithm: 'circular-array-subsequence',
        parent: '01-validate-subsequence',
        description: 'What if the main array is circular? The sequence can wrap around from the end back to the beginning. You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
        problem: 'You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: true,
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: false,
                explanation: 'Each pointer moves in one direction only (or at most n steps total). The invariant ensures that no valid solution is skipped, while the single-pass approach gives O(n) time.'
            },
            // Edge case
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: true,
                explanation: 'The pointer movement rules ensure systematic coverage. When pointers meet or cross, the traversal is complete and all candidates have been considered.'
            }
        ],
        solutions: {
            python: `def circular_array_subsequence(array, sequence):
    """
    Circular Array Subsequence

    What if the main array is circular? The sequence can wrap around from the end back to the beginning. You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.

    Time: O(n log k)
    Space: O(n)
    """
    n = len(array)
    m = len(sequence)
    doubled = array + array
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == sequence[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(circular_array_subsequence([5,1,22,25,6,-1,8,10], [1,6,-1,10]))  # Expected: True
print(circular_array_subsequence([1,2,3,4,5], [5,3,1]))  # Expected: False
print(circular_array_subsequence([1,1,1,1,1], [1,1,1]))  # Expected: True
`,
            go: `package main

import "fmt"

// CircularArraySubsequence solves the Circular Array Subsequence problem.
// What if the main array is circular? The sequence can wrap around from the end back to the beginning. You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.
// Time: O(n log k), Space: O(n)
func CircularArraySubsequence(array []int, sequence []int) bool {
	n := len(array)
	m := len(sequence)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if array[i%n] == sequence[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(CircularArraySubsequence([]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10})) // Expected: true
	fmt.Println(CircularArraySubsequence([]int{1, 2, 3, 4, 5}, []int{5, 3, 1})) // Expected: false
	fmt.Println(CircularArraySubsequence([]int{1, 1, 1, 1, 1}, []int{1, 1, 1})) // Expected: true
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-01-circular-array-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-01-circular-array-subsequence'] = problem;
})();
