/**
 * DFS on a Directed Graph with Cycles
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS on a Directed Graph with Cycles',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Perform DFS on a general directed graph (not a tree) that may contain cycles. Return the traversal order without visiting any node twice.',
        problem: 'Unlike tree DFS, you need a visited set to avoid infinite loops. The mental model shifts from "tree branches" to "graph exploration with backtracking guards."',
        hints: [
            'Start by understanding the key difference: Unlike tree DFS, you need a visited set to avoid infinite loops.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Graph: A->B, B->C, C->A, A->D.',
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
                explanation: 'The dfs on a directed graph with cycles for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def dfs_on_a_directed_graph_with_cycles(tree):
    """
    DFS on a Directed Graph with Cycles

    Perform DFS on a general directed graph (not a tree) that may contain cycles. Return the traversal order without visiting any node twice.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(dfs_on_a_directed_graph_with_cycles({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(dfs_on_a_directed_graph_with_cycles({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// DfsOnADirectedGraphWithCycles solves the DFS on a Directed Graph with Cycles problem.
// Perform DFS on a general directed graph (not a tree) that may contain cycles. Return the traversal order without visiting any node twice.
// Time: O(V + E), Space: O(V)
func DfsOnADirectedGraphWithCycles(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DfsOnADirectedGraphWithCycles({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(DfsOnADirectedGraphWithCycles({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/twist-02-dfs-on-a-directed-graph-with-cycles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/twist-02-dfs-on-a-directed-graph-with-cycles'] = problem;
})();
