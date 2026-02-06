/**
 * Output Prediction
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';

    const problem = {
        name: 'Output Prediction',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.',
        problem: 'Forces manual simulation of the algorithm to build intuition. You must consider every possible starting point and extension, not just the obvious candidates.',
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
                input: {"nums":[1,-2,3,-1,5],"k":2},
                output: [1,-2,3],
                explanation: 'The output prediction for this input yields [1, -2, 3].'
            },
            {
                input: {"nums":[-1,-2,-3],"k":2},
                output: [-1,-2,-3],
                explanation: 'The output prediction for this input yields [-1, -2, -3].'
            },
            // Edge case
            {
                input: {"nums":[1],"k":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def output_prediction(nums, k):
    """
    Output Prediction

    Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(output_prediction([1,-2,3,-1,5], 2))  # Expected: [1,-2,3]
print(output_prediction([-1,-2,-3], 2))  # Expected: [-1,-2,-3]
print(output_prediction([1], 0))  # Expected: []
`,
            go: `package main

import "fmt"

// OutputPrediction solves the Output Prediction problem.
// Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.
// Time: O(?), Space: O(?)
func OutputPrediction(nums []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(OutputPrediction([]int{1, -2, 3, -1, 5}, 2)) // Expected: [1,-2,3]
	fmt.Println(OutputPrediction([]int{-1, -2, -3}, 2)) // Expected: [-1,-2,-3]
	fmt.Println(OutputPrediction([]int{1}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-05-output-prediction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-05-output-prediction'] = problem;
})();
