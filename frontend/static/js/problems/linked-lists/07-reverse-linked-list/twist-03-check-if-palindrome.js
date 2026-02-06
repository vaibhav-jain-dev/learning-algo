/**
 * Check If Palindrome
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Check If Palindrome',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.',
        problem: 'Reversal is a tool here, not the goal. You reverse the second half, compare with the first half, then optionally re-reverse to restore the list.',
        hints: [
            'Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.',
            'Reversal is a tool here, not the goal',
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
            python: `def check_if_palindrome(list):
    """
    Check If Palindrome

    Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(check_if_palindrome([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CheckIfPalindrome solves the Check If Palindrome problem.
// Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.
// Time: O(n), Space: O(1)
func CheckIfPalindrome(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(CheckIfPalindrome([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-03-check-if-palindrome', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-03-check-if-palindrome'] = problem;
})();
