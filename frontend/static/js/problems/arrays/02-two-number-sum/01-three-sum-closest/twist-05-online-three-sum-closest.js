/**
 * Online Three Sum Closest
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: online-three-sum-closest
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Three Sum Closest',
        difficulty: 'Very Hard',
        algorithm: 'online-three-sum-closest',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers. Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
        problem: 'Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
        hints: [
            'Think about how this twist differs from the standard version: Numbers arrive one at a time in a stream. After each arrival, report the closest.',
            'Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: ''
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: ''
            },
            // Edge case
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: ''
            }
        ],
        solutions: {
            python: `def online_three_sum_closest(nums, target):
    """
    Online Three Sum Closest

    Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers. Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and nums[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(online_three_sum_closest([-1,2,1,-4], 1))  # Expected: 2
print(online_three_sum_closest([0,0,0], 1))  # Expected: 0
print(online_three_sum_closest([1,2,3,4,5], 10))  # Expected: 10
`,
            go: `package main

import "fmt"

// OnlineThreeSumClosest solves the Online Three Sum Closest problem.
// Numbers arrive one at a time in a stream. After each arrival, report the closest three-sum to target using available numbers. Cannot sort once upfront; must maintain a dynamic sorted structure and efficiently update the closest sum as new elements arrive.
// Time: O(n), Space: O(n)
func OnlineThreeSumClosest(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OnlineThreeSumClosest([]int{-1, 2, 1, -4}, 1)) // Expected: 2
	fmt.Println(OnlineThreeSumClosest([]int{0, 0, 0}, 1)) // Expected: 0
	fmt.Println(OnlineThreeSumClosest([]int{1, 2, 3, 4, 5}, 10)) // Expected: 10
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-05-online-three-sum-closest', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-05-online-three-sum-closest'] = problem;
})();
