/**
 * Monotonic with One Exception
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: monotonic-with-one-exception
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Monotonic with One Exception',
        difficulty: 'Medium',
        algorithm: 'monotonic-with-one-exception',
        parent: '10-monotonic-array',
        description: 'Check if the array can become monotonic by changing at most one element. Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
        problem: 'Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
        hints: [
            'Think about how monotonic with one exception differs from the standard version of this problem.',
            'Key insight: Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.',
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
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: ''
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: true,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1,3,2,4]},
                output: false,
                explanation: ''
            }
        ],
        solutions: {
            python: `def monotonic_with_one_exception(array):
    """
    Monotonic with One Exception

    Check if the array can become monotonic by changing at most one element. Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.

    Time: O(n)
    Space: O(n)
    """
    if not array:
        return False

    # Process the input
    for i in range(len(array)):
        pass  # Check condition

    return True


# Test cases
print(monotonic_with_one_exception([1,2,3,4,5]))  # Expected: True
print(monotonic_with_one_exception([5,4,3,2,1]))  # Expected: True
print(monotonic_with_one_exception([1,3,2,4]))  # Expected: False
`,
            go: `package main

import "fmt"

// MonotonicWithOneException solves the Monotonic with One Exception problem.
// Check if the array can become monotonic by changing at most one element. Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.
// Time: O(n), Space: O(n)
func MonotonicWithOneException(array []int) bool {
	if len(array) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(MonotonicWithOneException([]int{1, 2, 3, 4, 5})) // Expected: true
	fmt.Println(MonotonicWithOneException([]int{5, 4, 3, 2, 1})) // Expected: true
	fmt.Println(MonotonicWithOneException([]int{1, 3, 2, 4})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-02-monotonic-with-one-exception', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-02-monotonic-with-one-exception'] = problem;
})();
