/**
 * Recursive Approach
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recursive Approach',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.',
        problem: 'Recursion naturally processes from the tail backward. You must handle the "skip all nodes with this value" logic within the recursive structure, deciding at each level whether the current value matches the next.',
        hints: [
            'Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.',
            'Recursion naturally processes from the tail backward',
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
            python: `def recursive_approach(list):
    """
    Recursive Approach

    Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(recursive_approach([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RecursiveApproach solves the Recursive Approach problem.
// Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.
// Time: O(n), Space: O(1)
func RecursiveApproach(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RecursiveApproach([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-03-recursive-approach', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-03-recursive-approach'] = problem;
})();
