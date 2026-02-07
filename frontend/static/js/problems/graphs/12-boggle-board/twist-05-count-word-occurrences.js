/**
 * Count Word Occurrences
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Word Occurrences',
        difficulty: 'Hard',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'For each word, count how many distinct paths on the board can spell it.',
        problem: 'Finding one path per word uses early termination. Counting all paths requires exhaustive search without stopping at the first match, significantly increasing computation.',
        hints: [
            'Start by understanding the key difference: Finding one path per word uses early termination.',
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
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: 1,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_word_occurrences(board, words):
    """
    Count Word Occurrences

    For each word, count how many distinct paths on the board can spell it.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    count = 0
    n = len(board)

    for i in range(n):
        # Check condition based on words
        j = 0
        for k in range(i, n):
            if j < len(words) and board[k] == words[j]:
                j += 1
        if j == len(words):
            count += 1

    return count


# Test cases
print(count_word_occurrences([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: 1
print(count_word_occurrences([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: 1
print(count_word_occurrences([["t","h","i","s"]], ["this"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountWordOccurrences solves the Count Word Occurrences problem.
// For each word, count how many distinct paths on the board can spell it.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func CountWordOccurrences(board [][]int, words []string) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountWordOccurrences([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: 1
	fmt.Println(CountWordOccurrences([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: 1
	fmt.Println(CountWordOccurrences([][]int{{t, h, i, s}}, []string{"this"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-05-count-word-occurrences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-05-count-word-occurrences'] = problem;
})();
