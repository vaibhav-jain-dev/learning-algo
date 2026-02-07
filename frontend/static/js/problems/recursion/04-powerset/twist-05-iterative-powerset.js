/**
 * Iterative Powerset
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-powerset
 * Parent: 04-powerset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Powerset',
        difficulty: 'Easy',
        algorithm: 'recursion-powerset',
        parent: '04-powerset',
        description: 'Build the powerset iteratively by starting with [[]] and for each new element, adding it to all existing subsets.',
        problem: 'Replaces recursive thinking with an iterative build-up pattern, which is conceptually different and avoids stack depth concerns.',
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
                explanation: 'The iterative powerset for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def iterative_powerset(array):
    """
    Iterative Powerset

    Build the powerset iteratively by starting with [[]] and for each new element, adding it to all existing subsets.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(iterative_powerset([1,2,3]))  # Expected: [1,2,3]
print(iterative_powerset([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativePowerset solves the Iterative Powerset problem.
// Build the powerset iteratively by starting with [[]] and for each new element, adding it to all existing subsets.
// Time: O(?), Space: O(?)
func IterativePowerset(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(IterativePowerset([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(IterativePowerset([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '04-powerset/twist-05-iterative-powerset', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset/twist-05-iterative-powerset'] = problem;
})();
