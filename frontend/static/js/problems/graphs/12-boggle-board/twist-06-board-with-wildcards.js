/**
 * Board with Wildcards
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'Board with Wildcards',
        difficulty: 'Hard',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'Some cells contain a wildcard character that matches any letter. Find all words considering wildcards.',
        problem: 'At wildcard cells, every letter matches, branching the Trie traversal into multiple children simultaneously. The search becomes significantly wider at wildcard positions.',
        hints: [
            'Start by understanding the key difference: At wildcard cells, every letter matches, branching the Trie traversal into multiple children simultaneously.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(N * M * 8^L + W * L)',
            space: 'O(W * L + N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"board":[["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]],"words":["this","two","fat","that"]},
                output: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]],
                explanation: 'The board with wildcards for this input yields [t,h,i,s, w,a,t,s, o,a,h,g].'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: [["a","b"],["c","d"]],
                explanation: 'The board with wildcards for this input yields [a,b, c,d].'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def board_with_wildcards(board, words):
    """
    Board with Wildcards

    Some cells contain a wildcard character that matches any letter. Find all words considering wildcards.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(board_with_wildcards([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
print(board_with_wildcards([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: [["a","b"],["c","d"]]
print(board_with_wildcards([["t","h","i","s"]], ["this"]))  # Expected: []
`,
            go: `package main

import "fmt"

// BoardWithWildcards solves the Board with Wildcards problem.
// Some cells contain a wildcard character that matches any letter. Find all words considering wildcards.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func BoardWithWildcards(board [][]int, words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(BoardWithWildcards([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
	fmt.Println(BoardWithWildcards([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: [["a","b"],["c","d"]]
	fmt.Println(BoardWithWildcards([][]int{{t, h, i, s}}, []string{"this"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-06-board-with-wildcards', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-06-board-with-wildcards'] = problem;
})();
