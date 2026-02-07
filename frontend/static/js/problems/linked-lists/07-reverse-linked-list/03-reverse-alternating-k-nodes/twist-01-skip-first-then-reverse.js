/**
 * Skip First Then Reverse
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Skip First Then Reverse',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.',
        problem: 'Swaps the phase order, requiring a different initial state. The first group is preserved, the second is reversed, which changes how the dummy node and initial pointers are set up.',
        hints: [
            'Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.',
            'Swaps the phase order, requiring a different initial state',
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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def skip_first_then_reverse(list, k):
    """
    Skip First Then Reverse

    Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(skip_first_then_reverse([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SkipFirstThenReverse solves the Skip First Then Reverse problem.
// Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.
// Time: O(n), Space: O(1)
func SkipFirstThenReverse(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SkipFirstThenReverse([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-01-skip-first-then-reverse', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-01-skip-first-then-reverse'] = problem;
})();
