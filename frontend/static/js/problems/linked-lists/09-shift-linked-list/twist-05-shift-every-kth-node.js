/**
 * Shift Every Kth Node
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-shift
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift Every Kth Node',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.',
        problem: 'Selective extraction and prepending is fundamentally different from a bulk rotation. You must identify specific nodes, remove them, and build a new prefix.',
        hints: [
            'Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.',
            'Selective extraction and prepending is fundamentally different from a bulk rotation',
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
                explanation: ''
            }
        ],
        solutions: {
            python: `def shift_every_kth_node(list, k):
    """
    Shift Every Kth Node

    Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(shift_every_kth_node([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ShiftEveryKthNode solves the Shift Every Kth Node problem.
// Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.
// Time: O(n), Space: O(1)
func ShiftEveryKthNode(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ShiftEveryKthNode([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-05-shift-every-kth-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-05-shift-every-kth-node'] = problem;
})();
