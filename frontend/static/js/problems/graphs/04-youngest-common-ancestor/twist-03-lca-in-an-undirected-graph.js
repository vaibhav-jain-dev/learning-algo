/**
 * LCA in an Undirected Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCA in an Undirected Graph',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Given an undirected graph (not a tree) and a chosen root, find the LCA of two nodes. The graph may contain cycles.',
        problem: 'Must first build a BFS/DFS spanning tree from the root, then find LCA on that tree. The choice of spanning tree affects which node is the LCA, adding ambiguity not present in tree problems.',
        hints: [
            'Start by understanding the key difference: Must first build a BFS/DFS spanning tree from the root, then find LCA on that tree.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Graph: 1-2, 2-3, 3-1, 3-4.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(D)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"E","descendant2":"I"},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            {
                input: {"tree":"A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G","descendant1":"H","descendant2":"G"},
                output: "output",
                explanation: 'The resulting string is "output".'
            },
            // Edge case
            {
                input: {"tree":"","descendant1":"","descendant2":""},
                output: "",
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lca_in_an_undirected_graph(tree, descendant1, descendant2):
    """
    LCA in an Undirected Graph

    Given an undirected graph (not a tree) and a chosen root, find the LCA of two nodes. The graph may contain cycles.

    Time: O(D)
    Space: O(1)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(lca_in_an_undirected_graph("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I"))  # Expected: "result"
print(lca_in_an_undirected_graph("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G"))  # Expected: "output"
print(lca_in_an_undirected_graph("", "", ""))  # Expected: ""
`,
            go: `package main

import "fmt"

// LcaInAnUndirectedGraph solves the LCA in an Undirected Graph problem.
// Given an undirected graph (not a tree) and a chosen root, find the LCA of two nodes. The graph may contain cycles.
// Time: O(D), Space: O(1)
func LcaInAnUndirectedGraph(tree string, descendant1 string, descendant2 string) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(LcaInAnUndirectedGraph("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I")) // Expected: "result"
	fmt.Println(LcaInAnUndirectedGraph("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G")) // Expected: "output"
	fmt.Println(LcaInAnUndirectedGraph("", "", "")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/twist-03-lca-in-an-undirected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/twist-03-lca-in-an-undirected-graph'] = problem;
})();
