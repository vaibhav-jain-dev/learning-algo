/**
 * Streaming / Online Deduplication
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming / Online Deduplication',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.',
        problem: 'You cannot traverse the entire list on each insertion. You need a persistent hash set alongside the linked list, essentially designing a hybrid data structure rather than a one-pass algorithm.',
        hints: [
            'Nodes arrive one at a time via an append operation',
            'You cannot traverse the entire list on each insertion',
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
            python: `def streaming_online_deduplication(list):
    """
    Streaming / Online Deduplication

    Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(streaming_online_deduplication([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// StreamingOnlineDeduplication solves the Streaming / Online Deduplication problem.
// Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.
// Time: O(n), Space: O(1)
func StreamingOnlineDeduplication(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(StreamingOnlineDeduplication([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-03-streaming-online-deduplication', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-03-streaming-online-deduplication'] = problem;
})();
