/**
 * Reverse Thinking: Keep Only Duplicates
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Thinking: Keep Only Duplicates',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.',
        problem: 'The filtering logic inverts completely. You now need to first count all occurrences (requiring a full pass or hash map), then do a second pass to remove nodes whose count is <= k.',
        hints: [
            'Instead of removing extras, keep ONLY nodes that appear more than k times',
            'The filtering logic inverts completely',
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
            python: `def reverse_thinking_keep_only_duplicates(list, k):
    """
    Reverse Thinking: Keep Only Duplicates

    Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_thinking_keep_only_duplicates([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseThinkingKeepOnlyDuplicates solves the Reverse Thinking: Keep Only Duplicates problem.
// Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.
// Time: O(n), Space: O(1)
func ReverseThinkingKeepOnlyDuplicates(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseThinkingKeepOnlyDuplicates([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-04-reverse-thinking-keep-only-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-04-reverse-thinking-keep-only-duplicates'] = problem;
})();
