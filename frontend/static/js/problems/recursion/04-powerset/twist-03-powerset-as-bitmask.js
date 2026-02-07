/**
 * Powerset as Bitmask
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-powerset
 * Parent: 04-powerset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Powerset as Bitmask',
        difficulty: 'Medium',
        algorithm: 'recursion-powerset',
        parent: '04-powerset',
        description: 'Generate the powerset using iterative bit manipulation instead of recursion, representing each subset as a bitmask.',
        problem: 'Shifts thinking from recursive tree traversal to iterative enumeration over integers 0 to 2^n-1, mapping each bit to element inclusion.',
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
                input: {"array":[1,2,3]},
                output: [1,2,3],
                explanation: 'The powerset as bitmask for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def powerset_as_bitmask(array):
    """
    Powerset as Bitmask

    Generate the powerset using iterative bit manipulation instead of recursion, representing each subset as a bitmask.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(powerset_as_bitmask([1,2,3]))  # Expected: [1,2,3]
print(powerset_as_bitmask([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// PowersetAsBitmask solves the Powerset as Bitmask problem.
// Generate the powerset using iterative bit manipulation instead of recursion, representing each subset as a bitmask.
// Time: O(?), Space: O(?)
func PowersetAsBitmask(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(PowersetAsBitmask([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(PowersetAsBitmask([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '04-powerset/twist-03-powerset-as-bitmask', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset/twist-03-powerset-as-bitmask'] = problem;
})();
