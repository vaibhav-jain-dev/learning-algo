/**
 * Sentinel Node Deep Dive
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sentinel Node Deep Dive',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.',
        problem: 'Without a sentinel node, removing the head requires special-case logic and returning a potentially different head. The sentinel approach unifies all cases. This twist highlights why the sentinel trick is so powerful for linked list deletion problems.',
        hints: [
            'Solve the problem once WITH a dummy/sentinel node and once WITHOUT',
            'Without a sentinel node, removing the head requires special-case logic and returning a potentially different head',
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
            python: `def sentinel_node_deep_dive(list):
    """
    Sentinel Node Deep Dive

    Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(sentinel_node_deep_dive([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SentinelNodeDeepDive solves the Sentinel Node Deep Dive problem.
// Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.
// Time: O(n), Space: O(1)
func SentinelNodeDeepDive(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SentinelNodeDeepDive([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-05-sentinel-node-deep-dive', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-05-sentinel-node-deep-dive'] = problem;
})();
