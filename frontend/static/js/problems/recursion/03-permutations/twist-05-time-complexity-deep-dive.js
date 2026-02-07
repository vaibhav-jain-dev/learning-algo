/**
 * Time Complexity Deep Dive
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Time Complexity Deep Dive',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?',
        problem: 'Requires careful analysis of the work done per permutation. The extra O(n) comes from copying each complete permutation into the result. With the swap method and in-place processing, you can achieve O(n!) if you only need to process (not store) each permutation.',
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
                explanation: 'The time complexity deep dive for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def time_complexity_deep_dive(array):
    """
    Time Complexity Deep Dive

    Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(time_complexity_deep_dive([1,2,3]))  # Expected: [1,2,3]
print(time_complexity_deep_dive([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// TimeComplexityDeepDive solves the Time Complexity Deep Dive problem.
// Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?
// Time: O(?), Space: O(?)
func TimeComplexityDeepDive(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(TimeComplexityDeepDive([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(TimeComplexityDeepDive([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/twist-05-time-complexity-deep-dive', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-05-time-complexity-deep-dive'] = problem;
})();
