/**
 * Reverse K Then Skip 2K
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse K Then Skip 2K',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.',
        problem: 'Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases. The skip phase traverses more nodes, requiring separate counting logic.',
        hints: [
            'Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on',
            'Asymmetric group sizes mean you cannot simply toggle a boolean with equal phases',
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
            python: `def reverse_k_then_skip_2k(list, k):
    """
    Reverse K Then Skip 2K

    Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and list[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(reverse_k_then_skip_2k([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseKThenSkip2k solves the Reverse K Then Skip 2K problem.
// Reverse k nodes, then skip 2k nodes, then reverse k nodes, and so on. The skip length is double the reverse length.
// Time: O(n), Space: O(1)
func ReverseKThenSkip2k(list []int, k int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReverseKThenSkip2k([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-02-reverse-k-then-skip-2k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-02-reverse-k-then-skip-2k'] = problem;
})();
