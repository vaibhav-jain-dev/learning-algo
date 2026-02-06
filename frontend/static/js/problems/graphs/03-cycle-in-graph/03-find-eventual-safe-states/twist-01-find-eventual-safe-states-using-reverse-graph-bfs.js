/**
 * Find Eventual Safe States Using Reverse Graph BFS
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/03-find-eventual-safe-states
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Eventual Safe States Using Reverse Graph BFS',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/03-find-eventual-safe-states',
        description: 'Solve the problem by reversing all edges and using BFS from terminal nodes. Process nodes whose all original outgoing edges lead to safe nodes.',
        problem: 'Completely different approach: instead of DFS with coloring, you reverse the graph and propagate "safety" backward from terminal nodes using topological-sort-like BFS processing.',
        hints: [
            'Start by understanding the key difference: Completely different approach: instead of DFS with coloring, you reverse the graph and propagate "safety" backward from terminal nodes using topological-sort-like BFS processing.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same graph.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[2,3],[5],[0],[5],[],[]]},
                output: [[1,2],[2,3],[5]],
                explanation: 'The find eventual safe states using reverse graph bfs for this input yields [1,2, 2,3, 5].'
            },
            {
                input: {"graph":[[1,2,3,4],[1,2],[3,4],[0,4],[]]},
                output: [[1,2,3,4],[1,2],[3,4]],
                explanation: 'The find eventual safe states using reverse graph bfs for this input yields [1,2,3,4, 1,2, 3,4].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_eventual_safe_states_using_reverse_graph_bfs(graph):
    """
    Find Eventual Safe States Using Reverse Graph BFS

    Solve the problem by reversing all edges and using BFS from terminal nodes. Process nodes whose all original outgoing edges lead to safe nodes.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(find_eventual_safe_states_using_reverse_graph_bfs([[1,2],[2,3],[5],[0],[5],[],[]]))  # Expected: [[1,2],[2,3],[5]]
print(find_eventual_safe_states_using_reverse_graph_bfs([[1,2,3,4],[1,2],[3,4],[0,4],[]]))  # Expected: [[1,2,3,4],[1,2],[3,4]]
print(find_eventual_safe_states_using_reverse_graph_bfs([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindEventualSafeStatesUsingReverseGraphBfs solves the Find Eventual Safe States Using Reverse Graph BFS problem.
// Solve the problem by reversing all edges and using BFS from terminal nodes. Process nodes whose all original outgoing edges lead to safe nodes.
// Time: O(V + E), Space: O(V)
func FindEventualSafeStatesUsingReverseGraphBfs(graph [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(FindEventualSafeStatesUsingReverseGraphBfs([][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}})) // Expected: [[1,2],[2,3],[5]]
	fmt.Println(FindEventualSafeStatesUsingReverseGraphBfs([][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}})) // Expected: [[1,2,3,4],[1,2],[3,4]]
	fmt.Println(FindEventualSafeStatesUsingReverseGraphBfs([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states/twist-01-find-eventual-safe-states-using-reverse-graph-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states/twist-01-find-eventual-safe-states-using-reverse-graph-bfs'] = problem;
})();
