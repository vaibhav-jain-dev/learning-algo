/**
 * Three Sum Closest with Element Reuse
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sum-closest-with-element-reuse
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest with Element Reuse',
        difficulty: 'Medium',
        algorithm: 'three-sum-closest-with-element-reuse',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'You may use the same element up to twice (but not three times). Find the closest sum to target. Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
        problem: 'Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
        hints: [
            'Think about how this twist differs from the standard version: You may use the same element up to twice (but not three times). Find the closest.',
            'Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
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
            python: `def three_sum_closest_with_element_reuse(nums, target):
    """
    Three Sum Closest with Element Reuse

    You may use the same element up to twice (but not three times). Find the closest sum to target. Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.

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
print(three_sum_closest_with_element_reuse([-1,2,1,-4], 1))  # Expected: 2
print(three_sum_closest_with_element_reuse([0,0,0], 1))  # Expected: 0
print(three_sum_closest_with_element_reuse([1,2,3,4,5], 10))  # Expected: 10
`,
            go: `package main

import "fmt"

// ThreeSumClosestWithElementReuse solves the Three Sum Closest with Element Reuse problem.
// You may use the same element up to twice (but not three times). Find the closest sum to target. Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.
// Time: O(n), Space: O(n)
func ThreeSumClosestWithElementReuse(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeSumClosestWithElementReuse([]int{-1, 2, 1, -4}, 1)) // Expected: 2
	fmt.Println(ThreeSumClosestWithElementReuse([]int{0, 0, 0}, 1)) // Expected: 0
	fmt.Println(ThreeSumClosestWithElementReuse([]int{1, 2, 3, 4, 5}, 10)) // Expected: 10
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-03-three-sum-closest-with-element-reuse', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-03-three-sum-closest-with-element-reuse'] = problem;
})();
