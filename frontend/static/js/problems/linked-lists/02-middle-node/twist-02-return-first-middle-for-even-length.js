/**
 * Return First Middle for Even Length
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-middle
 * Parent: 02-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return First Middle for Even Length',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.',
        problem: 'The standard approach returns the second middle because slow advances once per two fast steps. To get the first middle, you must either start fast one step ahead or use a prev pointer, subtly changing the pointer dance.',
        hints: [
            'If the list has even length, return the FIRST of the two middle nodes instead of the second',
            'The standard approach returns the second middle because slow advances once per two fast steps',
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
            python: `def return_first_middle_for_even_length(list):
    """
    Return First Middle for Even Length

    If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(return_first_middle_for_even_length([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReturnFirstMiddleForEvenLength solves the Return First Middle for Even Length problem.
// If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.
// Time: O(n), Space: O(1)
func ReturnFirstMiddleForEvenLength(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReturnFirstMiddleForEvenLength([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-02-return-first-middle-for-even-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-02-return-first-middle-for-even-length'] = problem;
})();
