/**
 * Count All Valid Starting Positions
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-all-valid-starting-positions
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count All Valid Starting Positions',
        difficulty: 'Medium',
        algorithm: 'count-all-valid-starting-positions',
        parent: '01-validate-subsequence',
        description: 'Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward. Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
        problem: 'Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of just true/false, count how many starting positions in the array allow.',
            'Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count all valid starting positions criteria.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count all valid starting positions criteria.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the count all valid starting positions criteria.'
            },
            // Edge case
            {
                input: {"array":[5],"sequence":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_all_valid_starting_positions(array, sequence):
    """
    Count All Valid Starting Positions

    Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward. Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)
    m = len(sequence)

    for start in range(n):
        j = 0
        for i in range(start, n):
            if j < m and array[i] == sequence[j]:
                j += 1
            if j == m:
                count += 1
                break

    return count


# Test cases
print(count_all_valid_starting_positions([5,1,22,25,6,-1,8,10], [1,6,-1,10]))  # Expected: 1
print(count_all_valid_starting_positions([1,2,3,4,5], [5,3,1]))  # Expected: 2
print(count_all_valid_starting_positions([1,1,1,1,1], [1,1,1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountAllValidStartingPositions solves the Count All Valid Starting Positions problem.
// Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward. Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.
// Time: O(n), Space: O(n)
func CountAllValidStartingPositions(array []int, sequence []int) int {
	count := 0
	n := len(array)
	m := len(sequence)

	for start := 0; start < n; start++ {
		j := 0
		for i := start; i < n && j < m; i++ {
			if array[i] == sequence[j] {
				j++
			}
		}
		if j == m {
			count++
		}
	}

	return count
}

func main() {
	fmt.Println(CountAllValidStartingPositions([]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10})) // Expected: 1
	fmt.Println(CountAllValidStartingPositions([]int{1, 2, 3, 4, 5}, []int{5, 3, 1})) // Expected: 2
	fmt.Println(CountAllValidStartingPositions([]int{1, 1, 1, 1, 1}, []int{1, 1, 1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-02-count-all-valid-starting-positions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-02-count-all-valid-starting-positions'] = problem;
})();
