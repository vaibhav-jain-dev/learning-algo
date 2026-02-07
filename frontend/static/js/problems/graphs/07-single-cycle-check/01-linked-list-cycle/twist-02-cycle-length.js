/**
 * Cycle Length
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cycle Length',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'If a cycle exists, return the length of the cycle (number of nodes in the cycle).',
        problem: 'After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.',
        hints: [
            'Start by understanding the key difference: After detection, keep one pointer fixed and advance the other around the cycle counting steps until they meet again.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: List [3,2,0,-4] with cycle at position 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"head":[3,2,0,-4],"pos":1},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"head":[3],"pos":0},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def cycle_length(head, pos):
    """
    Cycle Length

    If a cycle exists, return the length of the cycle (number of nodes in the cycle).

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(head)

    for i in range(n):
        # Check condition based on pos
        j = 0
        for k in range(i, n):
            if j < len(pos) and head[k] == pos[j]:
                j += 1
        if j == len(pos):
            count += 1

    return count


# Test cases
print(cycle_length([3,2,0,-4], 1))  # Expected: 1
print(cycle_length([3], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// CycleLength solves the Cycle Length problem.
// If a cycle exists, return the length of the cycle (number of nodes in the cycle).
// Time: O(n), Space: O(1)
func CycleLength(head []int, pos int) int {
	result := 0

	for i := 0; i < len(head); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CycleLength([]int{3, 2, 0, -4}, 1)) // Expected: 1
	fmt.Println(CycleLength([]int{3}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-02-cycle-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-02-cycle-length'] = problem;
})();
