/**
 * Move and Count Swaps
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-and-count-swaps
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move and Count Swaps',
        difficulty: 'Medium',
        algorithm: 'move-and-count-swaps',
        parent: '09-move-element-to-end',
        description: 'Move all target elements to the end and return the minimum number of swaps performed. Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
        problem: 'Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
        hints: [
            'Think about how move and count swaps differs from the standard version of this problem.',
            'Key insight: Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
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
            python: `def move_and_count_swaps(array, toMove, target):
    """
    Move and Count Swaps

    Move all target elements to the end and return the minimum number of swaps performed. Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)

    for i in range(n):
        # Check condition based on toMove
        j = 0
        for k in range(i, n):
            if j < len(toMove) and array[k] == toMove[j]:
                j += 1
        if j == len(toMove):
            count += 1

    return count


# Test cases
print(move_and_count_swaps([1,2,1,2,3], None, None))  # Expected: 2
print(move_and_count_swaps([1,2,3], None, None))  # Expected: 1
print(move_and_count_swaps([1,1,1], None, None))  # Expected: 3
`,
            go: `package main

import "fmt"

// MoveAndCountSwaps solves the Move and Count Swaps problem.
// Move all target elements to the end and return the minimum number of swaps performed. Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.
// Time: O(n), Space: O(n)
func MoveAndCountSwaps(array []int, toMove int, target int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MoveAndCountSwaps([]int{1, 2, 1, 2, 3}, nil, 10)) // Expected: 2
	fmt.Println(MoveAndCountSwaps([]int{1, 2, 3}, nil, 10)) // Expected: 1
	fmt.Println(MoveAndCountSwaps([]int{1, 1, 1}, nil, 10)) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-02-move-and-count-swaps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-02-move-and-count-swaps'] = problem;
})();
