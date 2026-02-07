/**
 * Reverse Without Extra Pointers
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Without Extra Pointers',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.',
        problem: 'Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.',
        hints: [
            'Reverse the linked list using only two pointer variables (not three)',
            'Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.',
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
            python: `def reverse_without_extra_pointers(list):
    """
    Reverse Without Extra Pointers

    Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_without_extra_pointers([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseWithoutExtraPointers solves the Reverse Without Extra Pointers problem.
// Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.
// Time: O(n), Space: O(1)
func ReverseWithoutExtraPointers(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseWithoutExtraPointers([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-05-reverse-without-extra-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-05-reverse-without-extra-pointers'] = problem;
})();
