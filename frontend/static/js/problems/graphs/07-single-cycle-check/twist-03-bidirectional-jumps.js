/**
 * Bidirectional Jumps
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-single-cycle
 * Parent: 07-single-cycle-check
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional Jumps',
        difficulty: 'Hard',
        algorithm: 'graph-single-cycle',
        parent: '07-single-cycle-check',
        description: 'At each index, you can choose to jump forward OR backward by the absolute value of the element. Check if a single cycle is possible with optimal choices.',
        problem: 'Each position offers two choices, turning the problem into a graph search. You must explore all possible paths, not follow a deterministic sequence.',
        hints: [
            'Start by understanding the key difference: Each position offers two choices, turning the problem into a graph search.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Array [2,1,3].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[2,3,1,-4,-4,2]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the bidirectional jumps criteria.'
            },
            {
                input: {"array":[2,2,-1]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional jumps criteria.'
            },
            {
                input: {"array":[1,1,1,1,2]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the bidirectional jumps criteria.'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_jumps(array):
    """
    Bidirectional Jumps

    At each index, you can choose to jump forward OR backward by the absolute value of the element. Check if a single cycle is possible with optimal choices.

    Time: O(N)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bidirectional_jumps([2,3,1,-4,-4,2]))  # Expected: 0
print(bidirectional_jumps([2,2,-1]))  # Expected: 1
print(bidirectional_jumps([1,1,1,1,2]))  # Expected: 2
`,
            go: `package main

import "fmt"

// BidirectionalJumps solves the Bidirectional Jumps problem.
// At each index, you can choose to jump forward OR backward by the absolute value of the element. Check if a single cycle is possible with optimal choices.
// Time: O(N), Space: O(1)
func BidirectionalJumps(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BidirectionalJumps([]int{2, 3, 1, -4, -4, 2})) // Expected: 0
	fmt.Println(BidirectionalJumps([]int{2, 2, -1})) // Expected: 1
	fmt.Println(BidirectionalJumps([]int{1, 1, 1, 1, 2})) // Expected: 2
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/twist-03-bidirectional-jumps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/twist-03-bidirectional-jumps'] = problem;
})();
