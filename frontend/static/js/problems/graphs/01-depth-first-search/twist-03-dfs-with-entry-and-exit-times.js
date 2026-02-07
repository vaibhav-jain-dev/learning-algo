/**
 * DFS with Entry and Exit Times
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS with Entry and Exit Times',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Modify DFS to record the discovery time and finish time for each node. These timestamps are crucial for many advanced graph algorithms.',
        problem: 'Requires tracking global state (a timer) across recursive calls and understanding pre-order vs post-order processing. This is foundational for topological sort and SCC detection.',
        hints: [
            'Start by understanding the key difference: Requires tracking global state (a timer) across recursive calls and understanding pre-order vs post-order processing.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Tree A->[B,C]: discovery/finish times might be A(1/6), B(2/3), C(4/5).',
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
                explanation: 'The dfs with entry and exit times for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def dfs_with_entry_and_exit_times(tree):
    """
    DFS with Entry and Exit Times

    Modify DFS to record the discovery time and finish time for each node. These timestamps are crucial for many advanced graph algorithms.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(dfs_with_entry_and_exit_times({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(dfs_with_entry_and_exit_times({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// DfsWithEntryAndExitTimes solves the DFS with Entry and Exit Times problem.
// Modify DFS to record the discovery time and finish time for each node. These timestamps are crucial for many advanced graph algorithms.
// Time: O(V + E), Space: O(V)
func DfsWithEntryAndExitTimes(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DfsWithEntryAndExitTimes({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(DfsWithEntryAndExitTimes({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/twist-03-dfs-with-entry-and-exit-times', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/twist-03-dfs-with-entry-and-exit-times'] = problem;
})();
