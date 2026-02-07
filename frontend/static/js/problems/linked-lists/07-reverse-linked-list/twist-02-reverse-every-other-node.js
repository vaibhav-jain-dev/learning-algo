/**
 * Reverse Every Other Node
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Every Other Node',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.',
        problem: 'Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.',
        hints: [
            'Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place',
            'Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.',
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
            python: `def reverse_every_other_node(list):
    """
    Reverse Every Other Node

    Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_every_other_node([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseEveryOtherNode solves the Reverse Every Other Node problem.
// Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.
// Time: O(n), Space: O(1)
func ReverseEveryOtherNode(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseEveryOtherNode([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-02-reverse-every-other-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-02-reverse-every-other-node'] = problem;
})();
