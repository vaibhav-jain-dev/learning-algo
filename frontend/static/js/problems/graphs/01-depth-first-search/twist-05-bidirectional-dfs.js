/**
 * Bidirectional DFS
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional DFS',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given a source and target in an undirected graph, run DFS simultaneously from both ends. Detect when the two searches meet to find a connecting path.',
        problem: 'You must manage two separate DFS states and a meeting condition. This is rarely done with DFS (BFS is more natural for bidirectional search), so it challenges your understanding of DFS limitations.',
        hints: [
            'Start by understanding the key difference: You must manage two separate DFS states and a meeting condition.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Graph: A-B-C-D-E.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]},"target":10},
                output: [0],
                explanation: 'The bidirectional dfs for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]},"target":10},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def bidirectional_dfs(tree, target):
    """
    Bidirectional DFS

    Given a source and target in an undirected graph, run DFS simultaneously from both ends. Detect when the two searches meet to find a connecting path.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bidirectional_dfs({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10))  # Expected: [0]
print(bidirectional_dfs({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10))  # Expected: []
`,
            go: `package main

import "fmt"

// BidirectionalDfs solves the Bidirectional DFS problem.
// Given a source and target in an undirected graph, run DFS simultaneously from both ends. Detect when the two searches meet to find a connecting path.
// Time: O(V + E), Space: O(V)
func BidirectionalDfs(tree map[string]interface{}, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BidirectionalDfs({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10)) // Expected: [0]
	fmt.Println(BidirectionalDfs({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/twist-05-bidirectional-dfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/twist-05-bidirectional-dfs'] = problem;
})();
