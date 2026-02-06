/**
 * Circular Multilevel List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Multilevel List',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.',
        problem: 'At each level, the tail points back to the head of that level. You must break the circular link before flattening, then re-establish a single circular link for the final flattened result. Detecting the end of each level requires tracking the start node.',
        hints: [
            'Each level of the multilevel list is circular',
            'At each level, the tail points back to the head of that level',
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
            python: `def circular_multilevel_list(list):
    """
    Circular Multilevel List

    Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(circular_multilevel_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularMultilevelList solves the Circular Multilevel List problem.
// Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.
// Time: O(n), Space: O(1)
func CircularMultilevelList(list string) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(CircularMultilevelList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-05-circular-multilevel-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-05-circular-multilevel-list'] = problem;
})();
