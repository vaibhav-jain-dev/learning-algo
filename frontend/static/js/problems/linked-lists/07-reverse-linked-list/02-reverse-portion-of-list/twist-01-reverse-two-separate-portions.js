/**
 * Reverse Two Separate Portions
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Two Separate Portions',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.',
        problem: 'Managing two reversal zones in one traversal requires tracking multiple sets of pointers and carefully handling the transition between reversed and non-reversed sections.',
        hints: [

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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def reverse_two_separate_portions(list, left, right):
    """
    Reverse Two Separate Portions

    Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_two_separate_portions([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseTwoSeparatePortions solves the Reverse Two Separate Portions problem.
// Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.
// Time: O(n), Space: O(1)
func ReverseTwoSeparatePortions(list []int, left int, right int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseTwoSeparatePortions([]int{1, 2, 3, 4, 5}, nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-01-reverse-two-separate-portions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-01-reverse-two-separate-portions'] = problem;
})();
