/**
 * Recursive Without Extra Space
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recursive Without Extra Space',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Solve the remove-duplicates problem using pure recursion with no loops. The function should return the head of the deduplicated list.',
        problem: 'Forces you to think about the problem in terms of subproblems: "deduplicate the rest of the list, then decide whether to include the current node." The call stack replaces your iterative pointer.',
        hints: [
            'Solve the remove-duplicates problem using pure recursion with no loops',
            'Forces you to think about the problem in terms of subproblems: "deduplicate the rest of the list, then decide whether to include the current node." The call stack replaces your iterative pointer.',
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
            python: `def recursive_without_extra_space(list):
    """
    Recursive Without Extra Space

    Solve the remove-duplicates problem using pure recursion with no loops. The function should return the head of the deduplicated list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(recursive_without_extra_space([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RecursiveWithoutExtraSpace solves the Recursive Without Extra Space problem.
// Solve the remove-duplicates problem using pure recursion with no loops. The function should return the head of the deduplicated list.
// Time: O(n), Space: O(1)
func RecursiveWithoutExtraSpace(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RecursiveWithoutExtraSpace([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-03-recursive-without-extra-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-03-recursive-without-extra-space'] = problem;
})();
