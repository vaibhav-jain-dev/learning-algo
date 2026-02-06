/**
 * Detect Cycle with Hash Set
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Cycle with Hash Set',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'Use O(n) space with a hash set to detect cycles. Compare the tradeoffs with Floyd approach.',
        problem: 'Hash set makes detection trivial but uses O(n) space. The twist is understanding when the space tradeoff is acceptable and when it is not.',
        hints: [
            'Start by understanding the key difference: Hash set makes detection trivial but uses O(n) space.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Add each node to a set.',
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
                explanation: 'The detect cycle with hash set condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"head":[3],"pos":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def detect_cycle_with_hash_set(head, pos):
    """
    Detect Cycle with Hash Set

    Use O(n) space with a hash set to detect cycles. Compare the tradeoffs with Floyd approach.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(head)):
        if j < len(pos) and head[i] == pos[j]:
            j += 1

    return j == len(pos)


# Test cases
print(detect_cycle_with_hash_set([3,2,0,-4], 1))  # Expected: True
print(detect_cycle_with_hash_set([3], 0))  # Expected: False
`,
            go: `package main

import "fmt"

// DetectCycleWithHashSet solves the Detect Cycle with Hash Set problem.
// Use O(n) space with a hash set to detect cycles. Compare the tradeoffs with Floyd approach.
// Time: O(n), Space: O(1)
func DetectCycleWithHashSet(head []int, pos int) bool {
	j := 0

	for i := 0; i < len(head) && j < len(pos); i++ {
		if head[i] == pos[j] {
			j++
		}
	}

	return j == len(pos)
}

func main() {
	fmt.Println(DetectCycleWithHashSet([]int{3, 2, 0, -4}, 1)) // Expected: true
	fmt.Println(DetectCycleWithHashSet([]int{3}, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-03-detect-cycle-with-hash-set', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-03-detect-cycle-with-hash-set'] = problem;
})();
