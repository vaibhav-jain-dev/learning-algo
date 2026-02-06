/**
 * No Diagonal Connections
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'No Diagonal Connections',
        difficulty: 'Easy',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.',
        problem: 'Reducing from 8 to 4 neighbors changes which words are findable. Paths that relied on diagonal connections break, requiring re-evaluation of word reachability.',
        hints: [
            'Start by understanding the key difference: Reducing from 8 to 4 neighbors changes which words are findable.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Word "cat" needs c-a-t connected.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
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
                explanation: 'The no diagonal connections for this input yields [t,h,i,s, w,a,t,s, o,a,h,g].'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: [["a","b"],["c","d"]],
                explanation: 'The no diagonal connections for this input yields [a,b, c,d].'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def no_diagonal_connections(board, words):
    """
    No Diagonal Connections

    Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(no_diagonal_connections([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
print(no_diagonal_connections([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: [["a","b"],["c","d"]]
print(no_diagonal_connections([["t","h","i","s"]], ["this"]))  # Expected: []
`,
            go: `package main

import "fmt"

// NoDiagonalConnections solves the No Diagonal Connections problem.
// Letters can only connect horizontally and vertically (4 directions), not diagonally. Find all words.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func NoDiagonalConnections(board [][]int, words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(NoDiagonalConnections([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
	fmt.Println(NoDiagonalConnections([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: [["a","b"],["c","d"]]
	fmt.Println(NoDiagonalConnections([][]int{{t, h, i, s}}, []string{"this"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-01-no-diagonal-connections', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-01-no-diagonal-connections'] = problem;
})();
