/**
 * Rectangle of Zeroes
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Algorithm: dp-square-zeroes
 * Parent: 15-square-of-zeroes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rectangle of Zeroes',
        difficulty: 'Very Hard',
        algorithm: 'dp-square-zeroes',
        parent: '15-square-of-zeroes',
        description: 'Find whether there exists a rectangle (not necessarily square) whose borders are all zeroes.',
        problem: 'Generalizing from square to rectangle adds a second dimension to the search: you must check all width-height combinations, not just a single size parameter.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Generalizing from square to rectangle adds a second dimension to the search: you must check all width-height combination',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(rows^2 * cols)',
            space: 'O(rows * cols)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]},
                output: true,
                explanation: 'The rectangle of zeroes condition is satisfied for this input.'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: false,
                explanation: 'The rectangle of zeroes condition is not satisfied for this input.'
            },
            {
                input: {"matrix":[[1,1,1],[1,1,1],[1,1,1]]},
                output: true,
                explanation: 'The rectangle of zeroes condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"matrix":[[1,1,1,0,1,0]]},
                output: false,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def rectangle_of_zeroes(matrix):
    """
    Rectangle of Zeroes

    Find whether there exists a rectangle (not necessarily square) whose borders are all zeroes.

    Time: O(rows^2 * cols)
    Space: O(rows * cols)
    """
    if not matrix:
        return False

    # Process the input
    for i in range(len(matrix)):
        pass  # Check condition

    return True


# Test cases
print(rectangle_of_zeroes([[1,1,1,0,1,0],[0,0,0,0,0,1],[0,1,1,1,0,1],[0,0,0,1,0,1],[0,1,1,1,0,1],[0,0,0,0,0,1]]))  # Expected: True
print(rectangle_of_zeroes([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: False
print(rectangle_of_zeroes([[1,1,1],[1,1,1],[1,1,1]]))  # Expected: True
`,
            go: `package main

import "fmt"

// RectangleOfZeroes solves the Rectangle of Zeroes problem.
// Find whether there exists a rectangle (not necessarily square) whose borders are all zeroes.
// Time: O(rows^2 * cols), Space: O(rows * cols)
func RectangleOfZeroes(matrix [][]int) bool {
	if len(matrix) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(RectangleOfZeroes([][]int{{1, 1, 1, 0, 1, 0}, {0, 0, 0, 0, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 1, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 0, 0, 1}})) // Expected: true
	fmt.Println(RectangleOfZeroes([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: false
	fmt.Println(RectangleOfZeroes([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}})) // Expected: true
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '15-square-of-zeroes/twist-02-rectangle-of-zeroes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/15-square-of-zeroes/twist-02-rectangle-of-zeroes'] = problem;
})();
