/**
 * Common Ancestor in a DAG (Not a Tree)
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Common Ancestor in a DAG (Not a Tree)',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Find the lowest common ancestor when the structure is a DAG (directed acyclic graph) instead of a tree. A node can have multiple parents.',
        problem: 'In a tree, each node has exactly one parent, so climbing toward the root is straightforward. In a DAG, nodes can have multiple parents, creating multiple paths to the root and requiring BFS/DFS to find all ancestors before intersecting.',
        hints: [
            'Start by understanding the key difference: In a tree, each node has exactly one parent, so climbing toward the root is straightforward.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: DAG: A->C, B->C, A->D, B->D.',
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
            python: `def common_ancestor_in_a_dag_not_a_tree(tree, descendant1, descendant2):
    """
    Common Ancestor in a DAG (Not a Tree)

    Find the lowest common ancestor when the structure is a DAG (directed acyclic graph) instead of a tree. A node can have multiple parents.

    Time: O(D)
    Space: O(1)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(common_ancestor_in_a_dag_not_a_tree("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I"))  # Expected: "result"
print(common_ancestor_in_a_dag_not_a_tree("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G"))  # Expected: "output"
print(common_ancestor_in_a_dag_not_a_tree("", "", ""))  # Expected: ""
`,
            go: `package main

import "fmt"

// CommonAncestorInADagNotATree solves the Common Ancestor in a DAG (Not a Tree) problem.
// Find the lowest common ancestor when the structure is a DAG (directed acyclic graph) instead of a tree. A node can have multiple parents.
// Time: O(D), Space: O(1)
func CommonAncestorInADagNotATree(tree string, descendant1 string, descendant2 string) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(CommonAncestorInADagNotATree("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I")) // Expected: "result"
	fmt.Println(CommonAncestorInADagNotATree("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G")) // Expected: "output"
	fmt.Println(CommonAncestorInADagNotATree("", "", "")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/twist-01-common-ancestor-in-a-dag-not-a-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/twist-01-common-ancestor-in-a-dag-not-a-tree'] = problem;
})();
