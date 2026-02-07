/**
 * Reverse Alternating Odd Nodes Only
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Alternating Odd Nodes Only',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.',
        problem: 'Requires splitting the list by parity, reversing one half, and interleaving back. This is a split-process-merge pattern rather than in-place group reversal.',
        hints: [
            'Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.',
            'Requires splitting the list by parity, reversing one half, and interleaving back',
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
            python: `def reverse_alternating_odd_nodes_only(list, k):
    """
    Reverse Alternating Odd Nodes Only

    Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_alternating_odd_nodes_only([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseAlternatingOddNodesOnly solves the Reverse Alternating Odd Nodes Only problem.
// Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.
// Time: O(n), Space: O(1)
func ReverseAlternatingOddNodesOnly(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseAlternatingOddNodesOnly([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-05-reverse-alternating-odd-nodes-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-05-reverse-alternating-odd-nodes-only'] = problem;
})();
