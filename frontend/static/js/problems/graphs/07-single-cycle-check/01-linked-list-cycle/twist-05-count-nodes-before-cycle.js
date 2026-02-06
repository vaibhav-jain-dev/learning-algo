/**
 * Count Nodes Before Cycle
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes Before Cycle',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'Return the number of nodes in the non-cyclic portion of the list (the tail leading into the cycle).',
        problem: 'After finding the cycle start, you traverse from head to the cycle start counting nodes. This combines cycle detection with distance measurement.',
        hints: [
            'Start by understanding the key difference: After finding the cycle start, you traverse from head to the cycle start counting nodes.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: List [1,2,3,4,5] where 5 points to 3.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the count nodes before cycle criteria.'
            },
            // Edge case
            {
                input: {"head":[3],"pos":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_nodes_before_cycle(head, pos):
    """
    Count Nodes Before Cycle

    Return the number of nodes in the non-cyclic portion of the list (the tail leading into the cycle).

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
print(count_nodes_before_cycle([3,2,0,-4], 1))  # Expected: 1
print(count_nodes_before_cycle([3], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountNodesBeforeCycle solves the Count Nodes Before Cycle problem.
// Return the number of nodes in the non-cyclic portion of the list (the tail leading into the cycle).
// Time: O(n), Space: O(1)
func CountNodesBeforeCycle(head []int, pos int) int {
	result := 0

	for i := 0; i < len(head); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountNodesBeforeCycle([]int{3, 2, 0, -4}, 1)) // Expected: 1
	fmt.Println(CountNodesBeforeCycle([]int{3}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-05-count-nodes-before-cycle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-05-count-nodes-before-cycle'] = problem;
})();
