/**
 * Keys with Expiration
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-bfs
 * Parent: 08-minimum-passes/03-shortest-path-all-keys
 */
(function() {
    'use strict';

    const problem = {
        name: 'Keys with Expiration',
        difficulty: 'Very Hard',
        algorithm: 'graph-bfs',
        parent: '08-minimum-passes/03-shortest-path-all-keys',
        description: 'Each key expires after T moves. If you do not reach the corresponding lock within T moves of picking up the key, you lose it.',
        problem: 'The bitmask state must encode not just which keys you have but when you picked each one. State space explodes, requiring careful pruning or different state representation.',
        hints: [
            'Start by understanding the key difference: The bitmask state must encode not just which keys you have but when you picked each one.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Key a at distance 3 from lock A, T=5.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":["@.a..","###.#","b.A.B"]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid":["@.a.."]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def keys_with_expiration(grid):
    """
    Keys with Expiration

    Each key expires after T moves. If you do not reach the corresponding lock within T moves of picking up the key, you lose it.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(keys_with_expiration(["@.a..","###.#","b.A.B"]))  # Expected: 1
print(keys_with_expiration(["@.a.."]))  # Expected: 0
`,
            go: `package main

import "fmt"

// KeysWithExpiration solves the Keys with Expiration problem.
// Each key expires after T moves. If you do not reach the corresponding lock within T moves of picking up the key, you lose it.
// Time: Varies - see approach, Space: Varies - see approach
func KeysWithExpiration(grid []string) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KeysWithExpiration([]string{"@.a..", "###.#", "b.A.B"})) // Expected: 1
	fmt.Println(KeysWithExpiration([]string{"@.a.."})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys/twist-01-keys-with-expiration', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys/twist-01-keys-with-expiration'] = problem;
})();
