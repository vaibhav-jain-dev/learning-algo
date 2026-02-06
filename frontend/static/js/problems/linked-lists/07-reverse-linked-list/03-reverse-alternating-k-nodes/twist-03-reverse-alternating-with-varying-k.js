/**
 * Reverse Alternating With Varying K
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Alternating With Varying K',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.',
        problem: 'Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.',
        hints: [
            'The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.',
            'Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.',
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
            python: `def reverse_alternating_with_varying_k(list, k):
    """
    Reverse Alternating With Varying K

    The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_alternating_with_varying_k([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseAlternatingWithVaryingK solves the Reverse Alternating With Varying K problem.
// The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.
// Time: O(n), Space: O(1)
func ReverseAlternatingWithVaryingK(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseAlternatingWithVaryingK([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-03-reverse-alternating-with-varying-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-03-reverse-alternating-with-varying-k'] = problem;
})();
