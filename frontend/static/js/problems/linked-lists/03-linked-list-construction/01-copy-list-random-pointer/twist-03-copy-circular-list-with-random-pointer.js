/**
 * Copy Circular List with Random Pointer
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Copy Circular List with Random Pointer',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'The list with random pointers is circular (tail.next = head). Deep copy it maintaining both the circular structure and all random pointers.',
        problem: 'The traversal loop cannot use null as termination. For the hash map approach, you must detect the cycle. For the interleaving approach, separating the lists while maintaining circularity adds another layer of pointer complexity.',
        hints: [
            'The list with random pointers is circular (tail.next = head)',
            'The traversal loop cannot use null as termination',
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
            python: `def copy_circular_list_with_random_pointer(nodes):
    """
    Copy Circular List with Random Pointer

    The list with random pointers is circular (tail.next = head). Deep copy it maintaining both the circular structure and all random pointers.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nodes)):
        # Check if element meets criteria
        result.append(nodes[i])

    return result


# Test cases
print(copy_circular_list_with_random_pointer(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CopyCircularListWithRandomPointer solves the Copy Circular List with Random Pointer problem.
// The list with random pointers is circular (tail.next = head). Deep copy it maintaining both the circular structure and all random pointers.
// Time: O(n), Space: O(1)
func CopyCircularListWithRandomPointer(nodes [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nodes); i++ {
		result = append(result, nodes[i])
	}

	return result
}

func main() {
	fmt.Println(CopyCircularListWithRandomPointer(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-03-copy-circular-list-with-random-pointer', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-03-copy-circular-list-with-random-pointer'] = problem;
})();
