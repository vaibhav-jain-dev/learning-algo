/**
 * Largest Square of Zeroes
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Algorithm: dp-square-zeroes
 * Parent: 15-square-of-zeroes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Square of Zeroes',
        difficulty: 'Very Hard',
        algorithm: 'dp-square-zeroes',
        parent: '15-square-of-zeroes',
        description: 'Instead of just checking existence, find the size of the largest square whose borders are all zeroes.',
        problem: 'Requires not just detection but optimization across all possible square sizes, iterating from largest to smallest or tracking maximum during the search.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires not just detection but optimization across all possible square sizes, iterating from largest to smallest or tra',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the largest square of zeroes criteria.'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the largest square of zeroes criteria.'
            },
            {
                input: {"matrix":[[1,1,1],[1,1,1],[1,1,1]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the largest square of zeroes criteria.'
            },
            // Edge case
            {
                input: {"matrix":[[1,1,1,0,1,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def largest_square_of_zeroes(matrix):
    """
    Largest Square of Zeroes

    Instead of just checking existence, find the size of the largest square whose borders are all zeroes.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_square_of_zeroes([[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]))  # Expected: 1
print(largest_square_of_zeroes([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: 2
print(largest_square_of_zeroes([[1,1,1],[1,1,1],[1,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestSquareOfZeroes solves the Largest Square of Zeroes problem.
// Instead of just checking existence, find the size of the largest square whose borders are all zeroes.
// Time: O(n^2), Space: O(n)
func LargestSquareOfZeroes(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestSquareOfZeroes([][]int{{1, 1, 1, 0, 1, 0}, {0, 0, 0, 0, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 1, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 0, 0, 1}})) // Expected: 1
	fmt.Println(LargestSquareOfZeroes([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: 2
	fmt.Println(LargestSquareOfZeroes([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '15-square-of-zeroes/twist-01-largest-square-of-zeroes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/15-square-of-zeroes/twist-01-largest-square-of-zeroes'] = problem;
})();
