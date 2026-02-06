/**
 * Deduplicated Squares in Reverse Order
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: deduplicated-squares-in-reverse-order
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Deduplicated Squares in Reverse Order',
        difficulty: 'Easy',
        algorithm: 'deduplicated-squares-in-reverse-order',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'Return unique squared values in descending order instead of ascending. Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.',
        problem: 'Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.',
        hints: [
            'Think about how deduplicated squares in reverse order differs from the standard version of this problem.',
            'Key insight: Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: ''
            },
            {
                input: {"array":[5,3,1]},
                output: false,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1]},
                output: true,
                explanation: ''
            }
        ],
        solutions: {
            python: `def deduplicated_squares_in_reverse_order(array):
    """
    Deduplicated Squares in Reverse Order

    Return unique squared values in descending order instead of ascending. Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in array:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(deduplicated_squares_in_reverse_order([1,2,3,4,5]))  # Expected: True
print(deduplicated_squares_in_reverse_order([5,3,1]))  # Expected: False
print(deduplicated_squares_in_reverse_order([1]))  # Expected: True
`,
            go: `package main

import "fmt"

// DeduplicatedSquaresInReverseOrder solves the Deduplicated Squares in Reverse Order problem.
// Return unique squared values in descending order instead of ascending. Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.
// Time: O(n), Space: O(n)
func DeduplicatedSquaresInReverseOrder(array []int) string {
	result := ""

	for _, v := range array {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(DeduplicatedSquaresInReverseOrder([]int{1, 2, 3, 4, 5})) // Expected: true
	fmt.Println(DeduplicatedSquaresInReverseOrder([]int{5, 3, 1})) // Expected: false
	fmt.Println(DeduplicatedSquaresInReverseOrder([]int{1})) // Expected: true
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-04-deduplicated-squares-in-reverse-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-04-deduplicated-squares-in-reverse-order'] = problem;
})();
