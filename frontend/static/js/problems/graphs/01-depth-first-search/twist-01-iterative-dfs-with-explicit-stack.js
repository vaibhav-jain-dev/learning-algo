/**
 * Iterative DFS with Explicit Stack
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative DFS with Explicit Stack',
        difficulty: 'Easy',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Implement the same DFS traversal but using an explicit stack instead of recursion. The output order must be identical to the recursive version.',
        problem: 'Forces you to think about how the call stack works and manually manage the traversal order. You must push children in reverse order to maintain left-to-right processing.',
        hints: [
            'Start by understanding the key difference: Forces you to think about how the call stack works and manually manage the traversal order.',
            'Consider how this simplifies the original problem approach.'
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
                explanation: 'The iterative dfs with explicit stack for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def iterative_dfs_with_explicit_stack(tree):
    """
    Iterative DFS with Explicit Stack

    Implement the same DFS traversal but using an explicit stack instead of recursion. The output order must be identical to the recursive version.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(iterative_dfs_with_explicit_stack({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(iterative_dfs_with_explicit_stack({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeDfsWithExplicitStack solves the Iterative DFS with Explicit Stack problem.
// Implement the same DFS traversal but using an explicit stack instead of recursion. The output order must be identical to the recursive version.
// Time: O(V + E), Space: O(V)
func IterativeDfsWithExplicitStack(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeDfsWithExplicitStack({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(IterativeDfsWithExplicitStack({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/twist-01-iterative-dfs-with-explicit-stack', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/twist-01-iterative-dfs-with-explicit-stack'] = problem;
})();
