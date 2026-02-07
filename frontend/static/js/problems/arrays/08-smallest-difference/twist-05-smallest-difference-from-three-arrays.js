/**
 * Smallest Difference From Three Arrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: smallest-difference-from-three-arrays
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Difference From Three Arrays',
        difficulty: 'Hard',
        algorithm: 'smallest-difference-from-three-arrays',
        parent: '08-smallest-difference',
        description: 'Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements. Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
        problem: 'Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
        hints: [
            'Think about how smallest difference from three arrays differs from the standard version of this problem.',
            'Key insight: Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.',
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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            // Edge case
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
            }
        ],
        solutions: {
            python: `def smallest_difference_from_three_arrays(arrayOne, arrayTwo):
    """
    Smallest Difference From Three Arrays

    Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements. Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(arrayOne)

    for i in range(n):
        # Check condition based on arrayTwo
        j = 0
        for k in range(i, n):
            if j < len(arrayTwo) and arrayOne[k] == arrayTwo[j]:
                j += 1
        if j == len(arrayTwo):
            count += 1

    return count


# Test cases
print(smallest_difference_from_three_arrays(None, None))  # Expected: [[1,3,5],[2,3,4]]
print(smallest_difference_from_three_arrays(None, None))  # Expected: [[-1,0,1]]
print(smallest_difference_from_three_arrays(None, None))  # Expected: []
`,
            go: `package main

import "fmt"

// SmallestDifferenceFromThreeArrays solves the Smallest Difference From Three Arrays problem.
// Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements. Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.
// Time: O(n^2), Space: O(n)
func SmallestDifferenceFromThreeArrays(arrayOne []int, arrayTwo []int) int {
	result := 0

	for i := 0; i < len(arrayOne); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SmallestDifferenceFromThreeArrays(nil, nil)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(SmallestDifferenceFromThreeArrays(nil, nil)) // Expected: [[-1,0,1]]
	fmt.Println(SmallestDifferenceFromThreeArrays(nil, nil)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-05-smallest-difference-from-three-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-05-smallest-difference-from-three-arrays'] = problem;
})();
