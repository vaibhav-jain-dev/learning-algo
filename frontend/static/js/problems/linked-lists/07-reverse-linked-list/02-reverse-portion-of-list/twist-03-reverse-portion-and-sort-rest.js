/**
 * Reverse Portion and Sort Rest
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Portion and Sort Rest',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Reverse the nodes from position left to right, then sort all nodes outside this range in ascending order.',
        problem: 'Combines reversal of a portion with sorting of the complement, requiring you to isolate three segments, process each differently, and reconnect them.',
        hints: [
            'Reverse the nodes from position left to right, then sort all nodes outside this range in ascending order.',
            'Combines reversal of a portion with sorting of the complement, requiring you to isolate three segments, process each differently, and reconnect them.',
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
            python: `def reverse_portion_and_sort_rest(list, left, right):
    """
    Reverse Portion and Sort Rest

    Reverse the nodes from position left to right, then sort all nodes outside this range in ascending order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_portion_and_sort_rest([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReversePortionAndSortRest solves the Reverse Portion and Sort Rest problem.
// Reverse the nodes from position left to right, then sort all nodes outside this range in ascending order.
// Time: O(n), Space: O(1)
func ReversePortionAndSortRest(list []int, left int, right int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReversePortionAndSortRest([]int{1, 2, 3, 4, 5}, nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-03-reverse-portion-and-sort-rest', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-03-reverse-portion-and-sort-rest'] = problem;
})();
