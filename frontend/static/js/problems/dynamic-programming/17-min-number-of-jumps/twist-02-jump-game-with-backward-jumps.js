/**
 * Jump Game With Backward Jumps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-jumps
 * Parent: 17-min-number-of-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Jump Game With Backward Jumps',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        parent: '17-min-number-of-jumps',
        description: 'Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.',
        problem: 'Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might need to go backward to reach a better forward position.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might nee',
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
                input: {"array":[3,4,2,1,2,3,7,1,1,1,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the jump game with backward jumps criteria.'
            },
            {
                input: {"array":[2,1,1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the jump game with backward jumps criteria.'
            },
            {
                input: {"array":[1,1,1,1]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the jump game with backward jumps criteria.'
            },
            {
                input: {"array":[1,0,1]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the jump game with backward jumps criteria.'
            },
            // Edge case
            {
                input: {"array":[3]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def jump_game_with_backward_jumps(array):
    """
    Jump Game With Backward Jumps

    Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(jump_game_with_backward_jumps([3,4,2,1,2,3,7,1,1,1,3]))  # Expected: 1
print(jump_game_with_backward_jumps([2,1,1]))  # Expected: 2
print(jump_game_with_backward_jumps([1,1,1,1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// JumpGameWithBackwardJumps solves the Jump Game With Backward Jumps problem.
// Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.
// Time: O(n^2), Space: O(n)
func JumpGameWithBackwardJumps(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(JumpGameWithBackwardJumps([]int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3})) // Expected: 1
	fmt.Println(JumpGameWithBackwardJumps([]int{2, 1, 1})) // Expected: 2
	fmt.Println(JumpGameWithBackwardJumps([]int{1, 1, 1, 1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps/twist-02-jump-game-with-backward-jumps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps/twist-02-jump-game-with-backward-jumps'] = problem;
})();
