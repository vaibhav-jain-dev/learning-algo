/**
 * Exact Measurement Only
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-measurements
 * Parent: 09-ambiguous-measurements
 */
(function() {
    'use strict';

    const problem = {
        name: 'Exact Measurement Only',
        difficulty: 'Medium',
        algorithm: 'recursion-measurements',
        parent: '09-ambiguous-measurements',
        description: 'Each cup measures exactly one value (low equals high). Determine if the target can be reached using these exact measurements with unlimited uses.',
        problem: 'Simplifies to the classic unbounded knapsack / coin change problem, removing the range complexity but requiring standard DP techniques.',
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
                input: {"cups":[[200,210],[450,465],[800,850]],"target":10},
                output: true,
                explanation: 'The exact measurement only condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"cups":[[200,210]],"target":10},
                output: false,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def exact_measurement_only(cups, target):
    """
    Exact Measurement Only

    Each cup measures exactly one value (low equals high). Determine if the target can be reached using these exact measurements with unlimited uses.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(cups)):
        if j < len(target) and cups[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(exact_measurement_only([[200,210],[450,465],[800,850]], 10))  # Expected: True
print(exact_measurement_only([[200,210]], 10))  # Expected: False
`,
            go: `package main

import "fmt"

// ExactMeasurementOnly solves the Exact Measurement Only problem.
// Each cup measures exactly one value (low equals high). Determine if the target can be reached using these exact measurements with unlimited uses.
// Time: O(?), Space: O(?)
func ExactMeasurementOnly(cups [][]int, target int) bool {
	j := 0

	for i := 0; i < len(cups) && j < len(target); i++ {
		if cups[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(ExactMeasurementOnly([][]int{{200, 210}, {450, 465}, {800, 850}}, 10)) // Expected: true
	fmt.Println(ExactMeasurementOnly([][]int{{200, 210}}, 10)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '09-ambiguous-measurements/twist-02-exact-measurement-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/09-ambiguous-measurements/twist-02-exact-measurement-only'] = problem;
})();
