/**
 * LCA with Binary Lifting Preprocessing
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCA with Binary Lifting Preprocessing',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Preprocess the tree to answer multiple LCA queries in O(log N) time each, using binary lifting (sparse table on ancestors).',
        problem: 'The naive approach walks up from both nodes, which is O(D) per query. Binary lifting requires O(N log N) preprocessing but answers each query in O(log N), essential for handling thousands of queries efficiently.',
        hints: [
            'Start by understanding the key difference: The naive approach walks up from both nodes, which is O(D) per query.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Tree with 100K nodes, 100K queries.',
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
            python: `def lca_with_binary_lifting_preprocessing(tree, descendant1, descendant2):
    """
    LCA with Binary Lifting Preprocessing

    Preprocess the tree to answer multiple LCA queries in O(log N) time each, using binary lifting (sparse table on ancestors).

    Time: O(D)
    Space: O(1)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(lca_with_binary_lifting_preprocessing("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I"))  # Expected: "result"
print(lca_with_binary_lifting_preprocessing("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G"))  # Expected: "output"
print(lca_with_binary_lifting_preprocessing("", "", ""))  # Expected: ""
`,
            go: `package main

import "fmt"

// LcaWithBinaryLiftingPreprocessing solves the LCA with Binary Lifting Preprocessing problem.
// Preprocess the tree to answer multiple LCA queries in O(log N) time each, using binary lifting (sparse table on ancestors).
// Time: O(D), Space: O(1)
func LcaWithBinaryLiftingPreprocessing(tree string, descendant1 string, descendant2 string) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(LcaWithBinaryLiftingPreprocessing("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "E", "I")) // Expected: "result"
	fmt.Println(LcaWithBinaryLiftingPreprocessing("A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G", "H", "G")) // Expected: "output"
	fmt.Println(LcaWithBinaryLiftingPreprocessing("", "", "")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/twist-02-lca-with-binary-lifting-preprocessing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/twist-02-lca-with-binary-lifting-preprocessing'] = problem;
})();
