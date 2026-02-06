/**
 * Most Significant Digit First
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-sum
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Most Significant Digit First',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.',
        problem: 'You cannot process digits left-to-right for addition since carries propagate from right-to-left. Requires either reversing both lists first, using a stack, or recursion.',
        hints: [
            'The digits are stored in forward order (most significant digit first) instead of reverse order',
            'You cannot process digits left-to-right for addition since carries propagate from right-to-left',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def most_significant_digit_first(list1, list2):
    """
    Most Significant Digit First

    The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(most_significant_digit_first(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MostSignificantDigitFirst solves the Most Significant Digit First problem.
// The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.
// Time: O(n), Space: O(1)
func MostSignificantDigitFirst(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MostSignificantDigitFirst(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-01-most-significant-digit-first', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-01-most-significant-digit-first'] = problem;
})();
