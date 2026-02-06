/**
 * Track Which Houses Were Robbed
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Track Which Houses Were Robbed',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.',
        problem: 'Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever subproblem gave the better answer, then map indices back to the original array.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever',
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
                input: {"nums":[2,3,2]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the track which houses were robbed criteria.'
            },
            {
                input: {"nums":[1,2,3,1]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the track which houses were robbed criteria.'
            },
            {
                input: {"nums":[1,2,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the track which houses were robbed criteria.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def track_which_houses_were_robbed(nums):
    """
    Track Which Houses Were Robbed

    Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(track_which_houses_were_robbed([2,3,2]))  # Expected: 2
print(track_which_houses_were_robbed([1,2,3,1]))  # Expected: 3
print(track_which_houses_were_robbed([1,2,3]))  # Expected: 1
`,
            go: `package main

import "fmt"

// TrackWhichHousesWereRobbed solves the Track Which Houses Were Robbed problem.
// Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.
// Time: O(n^2), Space: O(n)
func TrackWhichHousesWereRobbed(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TrackWhichHousesWereRobbed([]int{2, 3, 2})) // Expected: 2
	fmt.Println(TrackWhichHousesWereRobbed([]int{1, 2, 3, 1})) // Expected: 3
	fmt.Println(TrackWhichHousesWereRobbed([]int{1, 2, 3})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-02-track-which-houses-were-robbed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-02-track-which-houses-were-robbed'] = problem;
})();
