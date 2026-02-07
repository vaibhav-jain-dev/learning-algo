/**
 * Three Sum in Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-in-range
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum in Range',
        difficulty: 'Hard',
        algorithm: 'three-sum-in-range',
        parent: '07-three-number-sum',
        description: 'Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value. The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
        problem: 'The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
        hints: [
            'Think about how three sum in range differs from the standard version of this problem.',
            'Key insight: The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def three_sum_in_range(array, targetSum):
    """
    Three Sum in Range

    Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value. The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.

    Time: O(n^2)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(three_sum_in_range([1,2,3,4,5], None))  # Expected: [[1,3,5],[2,3,4]]
print(three_sum_in_range([-1,0,1,2], None))  # Expected: [[-1,0,1]]
print(three_sum_in_range([1,2,3], None))  # Expected: []
`,
            go: `package main

import "fmt"

// ThreeSumInRange solves the Three Sum in Range problem.
// Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value. The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.
// Time: O(n^2), Space: O(n)
func ThreeSumInRange(array []int, targetSum int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(ThreeSumInRange([]int{1, 2, 3, 4, 5}, nil)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(ThreeSumInRange([]int{-1, 0, 1, 2}, nil)) // Expected: [[-1,0,1]]
	fmt.Println(ThreeSumInRange([]int{1, 2, 3}, nil)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-04-three-sum-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-04-three-sum-in-range'] = problem;
})();
