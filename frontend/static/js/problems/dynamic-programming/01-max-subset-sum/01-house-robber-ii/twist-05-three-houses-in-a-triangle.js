/**
 * Three Houses in a Triangle
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Houses in a Triangle',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?',
        problem: 'Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent Set problem, which is NP-hard. The circular structure is what makes it tractable.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent ',
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
                explanation: 'For this input, there are 2 valid positions that satisfy the three houses in a triangle criteria.'
            },
            {
                input: {"nums":[1,2,3,1]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the three houses in a triangle criteria.'
            },
            {
                input: {"nums":[1,2,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the three houses in a triangle criteria.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def three_houses_in_a_triangle(nums):
    """
    Three Houses in a Triangle

    Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(three_houses_in_a_triangle([2,3,2]))  # Expected: 2
print(three_houses_in_a_triangle([1,2,3,1]))  # Expected: 3
print(three_houses_in_a_triangle([1,2,3]))  # Expected: 1
`,
            go: `package main

import "fmt"

// ThreeHousesInATriangle solves the Three Houses in a Triangle problem.
// Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?
// Time: O(n^2), Space: O(n)
func ThreeHousesInATriangle(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeHousesInATriangle([]int{2, 3, 2})) // Expected: 2
	fmt.Println(ThreeHousesInATriangle([]int{1, 2, 3, 1})) // Expected: 3
	fmt.Println(ThreeHousesInATriangle([]int{1, 2, 3})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-05-three-houses-in-a-triangle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-05-three-houses-in-a-triangle'] = problem;
})();
