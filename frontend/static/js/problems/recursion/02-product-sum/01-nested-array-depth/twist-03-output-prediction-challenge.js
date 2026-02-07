/**
 * Output Prediction Challenge
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Output Prediction Challenge',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.',
        problem: 'Tests understanding of edge cases: empty arrays have depth 1, and the deeply nested empty array [[[]]] contributes depth even though it contains no integers. You must trace the recursion mentally.',
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
                input: {"array":[1,[2,[3,4]]]},
                output: 2,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def output_prediction_challenge(array):
    """
    Output Prediction Challenge

    Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(output_prediction_challenge([1,[2,[3,4]]]))  # Expected: 2
print(output_prediction_challenge([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// OutputPredictionChallenge solves the Output Prediction Challenge problem.
// Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.
// Time: O(?), Space: O(?)
func OutputPredictionChallenge(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OutputPredictionChallenge([]interface{}{1, []interface{}{2, []int{3, 4}}})) // Expected: 2
	fmt.Println(OutputPredictionChallenge([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-03-output-prediction-challenge', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-03-output-prediction-challenge'] = problem;
})();
