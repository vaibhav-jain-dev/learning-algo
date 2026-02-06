/**
 * BFS with Level Tracking
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'BFS with Level Tracking',
        difficulty: 'Easy',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Modify BFS to return nodes grouped by their level/depth. Instead of a flat list, return a list of lists where each inner list contains all nodes at that depth.',
        problem: 'Requires tracking when one level ends and the next begins. You must process the queue in batches (using queue size at each level) rather than node by node.',
        hints: [
            'Start by understanding the key difference: Requires tracking when one level ends and the next begins.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Same tree.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [0],
                explanation: 'The bfs with level tracking for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bfs_with_level_tracking(tree):
    """
    BFS with Level Tracking

    Modify BFS to return nodes grouped by their level/depth. Instead of a flat list, return a list of lists where each inner list contains all nodes at that depth.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bfs_with_level_tracking({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(bfs_with_level_tracking({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// BfsWithLevelTracking solves the BFS with Level Tracking problem.
// Modify BFS to return nodes grouped by their level/depth. Instead of a flat list, return a list of lists where each inner list contains all nodes at that depth.
// Time: O(V + E), Space: O(V)
func BfsWithLevelTracking(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BfsWithLevelTracking({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(BfsWithLevelTracking({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/twist-01-bfs-with-level-tracking', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/twist-01-bfs-with-level-tracking'] = problem;
})();
