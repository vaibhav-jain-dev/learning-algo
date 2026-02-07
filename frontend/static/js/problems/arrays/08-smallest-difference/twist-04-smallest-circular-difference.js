/**
 * Smallest Circular Difference
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: smallest-circular-difference
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Circular Difference',
        difficulty: 'Hard',
        algorithm: 'smallest-circular-difference',
        parent: '08-smallest-difference',
        description: 'Numbers represent positions on a circular number line of size M. Find the pair with smallest circular distance. Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.',
        problem: 'Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.',
        hints: [
            'Think about how smallest circular difference differs from the standard version of this problem.',
            'Key insight: Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'For circular arrays, consider concatenating the array with itself or using modular arithmetic.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[4,5,1,2,3]},
                output: 1,
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 2,
                explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
            },
            {
                input: {"array":[3,1,2]},
                output: 0,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            },
            // Edge case
            {
                input: {"array":[4]},
                output: 0,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def smallest_circular_difference(arrayOne, arrayTwo):
    """
    Smallest Circular Difference

    Numbers represent positions on a circular number line of size M. Find the pair with smallest circular distance. Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.

    Time: O(n)
    Space: O(n)
    """
    n = len(arrayOne)
    m = len(arrayTwo)
    doubled = arrayOne + arrayOne
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == arrayTwo[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(smallest_circular_difference(None, None))  # Expected: 1
print(smallest_circular_difference(None, None))  # Expected: 2
print(smallest_circular_difference(None, None))  # Expected: 0
`,
            go: `package main

import "fmt"

// SmallestCircularDifference solves the Smallest Circular Difference problem.
// Numbers represent positions on a circular number line of size M. Find the pair with smallest circular distance. Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.
// Time: O(n), Space: O(n)
func SmallestCircularDifference(arrayOne []int, arrayTwo []int) int {
	n := len(arrayOne)
	m := len(arrayTwo)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if arrayOne[i%n] == arrayTwo[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(SmallestCircularDifference(nil, nil)) // Expected: 1
	fmt.Println(SmallestCircularDifference(nil, nil)) // Expected: 2
	fmt.Println(SmallestCircularDifference(nil, nil)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-04-smallest-circular-difference', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-04-smallest-circular-difference'] = problem;
})();
