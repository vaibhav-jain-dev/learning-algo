/**
 * Find Loop Length
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-find-loop
 * Parent: 06-find-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Loop Length',
        difficulty: 'Medium',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).',
        problem: 'After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again. The meeting-point detection is the same but the post-processing differs.',
        hints: [
            'Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).',
            'After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again',
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
            python: `def find_loop_length(list, loopStart):
    """
    Find Loop Length

    Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list)

    for i in range(n):
        # Check condition based on loopStart
        j = 0
        for k in range(i, n):
            if j < len(loopStart) and list[k] == loopStart[j]:
                j += 1
        if j == len(loopStart):
            count += 1

    return count


# Test cases
print(find_loop_length([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// FindLoopLength solves the Find Loop Length problem.
// Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).
// Time: O(n), Space: O(1)
func FindLoopLength(list []int, loopStart int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FindLoopLength([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-01-find-loop-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-01-find-loop-length'] = problem;
})();
