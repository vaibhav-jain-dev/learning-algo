/**
 * Find Cycle Start
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Cycle Start',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'If a cycle exists, return the node where the cycle begins. Use O(1) space.',
        problem: 'Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.',
        hints: [
            'Start by understanding the key difference: Detecting a cycle is only the first step.',
            'Think about what data structures need to change from the original solution.',
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
                output: true,
                explanation: 'The find cycle start condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"head":[3],"pos":0},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def find_cycle_start(head, pos):
    """
    Find Cycle Start

    If a cycle exists, return the node where the cycle begins. Use O(1) space.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(head)):
        if j < len(pos) and head[i] == pos[j]:
            j += 1

    return j == len(pos)


# Test cases
print(find_cycle_start([3,2,0,-4], 1))  # Expected: True
print(find_cycle_start([3], 0))  # Expected: False
`,
            go: `package main

import "fmt"

// FindCycleStart solves the Find Cycle Start problem.
// If a cycle exists, return the node where the cycle begins. Use O(1) space.
// Time: O(n), Space: O(1)
func FindCycleStart(head []int, pos int) bool {
	j := 0

	for i := 0; i < len(head) && j < len(pos); i++ {
		if head[i] == pos[j] {
			j++
		}
	}

	return j == len(pos)
}

func main() {
	fmt.Println(FindCycleStart([]int{3, 2, 0, -4}, 1)) // Expected: true
	fmt.Println(FindCycleStart([]int{3}, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-01-find-cycle-start', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-01-find-cycle-start'] = problem;
})();
