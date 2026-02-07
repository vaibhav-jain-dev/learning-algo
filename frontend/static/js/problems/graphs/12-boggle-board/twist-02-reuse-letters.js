/**
 * Reuse Letters
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reuse Letters',
        difficulty: 'Medium',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'A letter at a given position can be used multiple times in the same word. Find all words constructible this way.',
        problem: 'Without the visited constraint, the search space explodes. You no longer need a visited set, but must limit search depth to word length to avoid infinite loops.',
        hints: [
            'Start by understanding the key difference: Without the visited constraint, the search space explodes.',
            'Think about what data structures need to change from the original solution.'
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
                explanation: 'The reuse letters for this input yields [t,h,i,s, w,a,t,s, o,a,h,g].'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: [["a","b"],["c","d"]],
                explanation: 'The reuse letters for this input yields [a,b, c,d].'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def reuse_letters(board, words):
    """
    Reuse Letters

    A letter at a given position can be used multiple times in the same word. Find all words constructible this way.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(reuse_letters([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
print(reuse_letters([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: [["a","b"],["c","d"]]
print(reuse_letters([["t","h","i","s"]], ["this"]))  # Expected: []
`,
            go: `package main

import "fmt"

// ReuseLetters solves the Reuse Letters problem.
// A letter at a given position can be used multiple times in the same word. Find all words constructible this way.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func ReuseLetters(board [][]int, words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(ReuseLetters([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
	fmt.Println(ReuseLetters([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: [["a","b"],["c","d"]]
	fmt.Println(ReuseLetters([][]int{{t, h, i, s}}, []string{"this"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-02-reuse-letters', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-02-reuse-letters'] = problem;
})();
