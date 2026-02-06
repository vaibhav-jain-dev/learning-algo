/**
 * Remove Kth From End in Circular List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Kth From End in Circular List',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.',
        problem: 'The circular structure means there is no null terminator. You must detect the cycle boundary and define what "from the end" means, using the list length modulo to find the position.',
        hints: [
            'The linked list is circular (tail points back to head)',
            'The circular structure means there is no null terminator',
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
            python: `def remove_kth_from_end_in_circular_list(list, k):
    """
    Remove Kth From End in Circular List

    The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.

    Time: O(n)
    Space: O(1)
    """
    n = len(list)
    m = len(k)
    doubled = list + list
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == k[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(remove_kth_from_end_in_circular_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveKthFromEndInCircularList solves the Remove Kth From End in Circular List problem.
// The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.
// Time: O(n), Space: O(1)
func RemoveKthFromEndInCircularList(list []int, k int) []int {
	n := len(list)
	m := len(k)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if list[i%n] == k[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(RemoveKthFromEndInCircularList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-05-remove-kth-from-end-in-circular-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-05-remove-kth-from-end-in-circular-list'] = problem;
})();
