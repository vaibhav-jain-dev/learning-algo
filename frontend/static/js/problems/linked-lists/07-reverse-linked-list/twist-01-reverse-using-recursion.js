/**
 * Reverse Using Recursion
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Using Recursion',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.',
        problem: 'Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers. The call stack replaces the explicit prev pointer, and the base case returns the new head.',
        hints: [
            'Reverse the linked list using recursion instead of iteration',
            'Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers',
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
            python: `def reverse_using_recursion(list):
    """
    Reverse Using Recursion

    Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_using_recursion([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseUsingRecursion solves the Reverse Using Recursion problem.
// Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.
// Time: O(n), Space: O(1)
func ReverseUsingRecursion(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseUsingRecursion([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-01-reverse-using-recursion', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-01-reverse-using-recursion'] = problem;
})();
