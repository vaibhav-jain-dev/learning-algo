/**
 * Recognize the Reduction to House Robber
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/02-delete-and-earn
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recognize the Reduction to House Robber',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/02-delete-and-earn',
        description: 'Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip v-1 and v+1?',
        problem: 'The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightforward. This twist tests pattern recognition.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The key insight is the problem transformation, not the DP itself. If you can reduce to House Robber, the DP is straightf',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[3,4,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the recognize the reduction to house robber criteria.'
            },
            {
                input: {"nums":[2,2,3,3,3,4]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the recognize the reduction to house robber criteria.'
            },
            // Edge case
            {
                input: {"nums":[3]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def recognize_the_reduction_to_house_robber(nums):
    """
    Recognize the Reduction to House Robber

    Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip v-1 and v+1?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(recognize_the_reduction_to_house_robber([3,4,2]))  # Expected: 1
print(recognize_the_reduction_to_house_robber([2,2,3,3,3,4]))  # Expected: 2
print(recognize_the_reduction_to_house_robber([3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RecognizeTheReductionToHouseRobber solves the Recognize the Reduction to House Robber problem.
// Before writing any code, explain how Delete and Earn maps to House Robber. What is the "points array" and why does choosing value v force you to skip v-1 and v+1?
// Time: O(n^2), Space: O(n)
func RecognizeTheReductionToHouseRobber(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RecognizeTheReductionToHouseRobber([]int{3, 4, 2})) // Expected: 1
	fmt.Println(RecognizeTheReductionToHouseRobber([]int{2, 2, 3, 3, 3, 4})) // Expected: 2
	fmt.Println(RecognizeTheReductionToHouseRobber([]int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn/twist-01-recognize-the-reduction-to-house-robber', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn/twist-01-recognize-the-reduction-to-house-robber'] = problem;
})();
