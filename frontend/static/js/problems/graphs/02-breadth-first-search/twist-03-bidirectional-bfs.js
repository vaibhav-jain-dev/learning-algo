/**
 * Bidirectional BFS
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BFS',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given source and target in an undirected graph, perform BFS from both ends simultaneously. Stop when the two frontiers meet.',
        problem: 'Bidirectional BFS can dramatically reduce the search space from O(b^d) to O(b^(d/2)). You must manage two queues and two visited sets, alternating expansion between them.',
        hints: [
            'Start by understanding the key difference: Bidirectional BFS can dramatically reduce the search space from O(b^d) to O(b^(d/2)).',
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
                explanation: 'The bidirectional bfs for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]},"target":10},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_bfs(tree, target):
    """
    Bidirectional BFS

    Given source and target in an undirected graph, perform BFS from both ends simultaneously. Stop when the two frontiers meet.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bidirectional_bfs({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10))  # Expected: [0]
print(bidirectional_bfs({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10))  # Expected: []
`,
            go: `package main

import "fmt"

// BidirectionalBfs solves the Bidirectional BFS problem.
// Given source and target in an undirected graph, perform BFS from both ends simultaneously. Stop when the two frontiers meet.
// Time: O(V + E), Space: O(V)
func BidirectionalBfs(tree map[string]interface{}, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BidirectionalBfs({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10)) // Expected: [0]
	fmt.Println(BidirectionalBfs({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/twist-03-bidirectional-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/twist-03-bidirectional-bfs'] = problem;
})();
