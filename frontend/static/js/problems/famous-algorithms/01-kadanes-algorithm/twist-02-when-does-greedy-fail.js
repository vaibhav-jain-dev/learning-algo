/**
 * When Does Greedy Fail?
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'When Does Greedy Fail?',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Kadane\',
        problem: 'The greedy "extend or restart" logic no longer works because skipping an element creates a non-contiguous dependency. You need to track two states: best with no skip yet, and best with one skip used.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[-2,1,-3,4,-1,2,1,-5,4]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the when does greedy fail criteria.'
            },
            // Edge case
            {
                input: {"nums":[-2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def when_does_greedy_fail(nums):
    """
    When Does Greedy Fail?

    Kadane\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(when_does_greedy_fail([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 1
print(when_does_greedy_fail([-2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WhenDoesGreedyFail solves the When Does Greedy Fail? problem.
// Kadane\\
// Time: O(?), Space: O(?)
func WhenDoesGreedyFail(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WhenDoesGreedyFail([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})) // Expected: 1
	fmt.Println(WhenDoesGreedyFail([]int{-2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-02-when-does-greedy-fail', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-02-when-does-greedy-fail'] = problem;
})();
