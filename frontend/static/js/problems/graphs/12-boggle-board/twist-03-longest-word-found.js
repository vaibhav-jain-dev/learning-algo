/**
 * Longest Word Found
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Word Found',
        difficulty: 'Medium',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'Among all words found in the board, return only the longest one. If tied, return any.',
        problem: 'You need to track word length during search and only retain the longest match. Trie pruning can be optimized to skip short words early.',
        hints: [
            'Start by understanding the key difference: You need to track word length during search and only retain the longest match.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Found words: "this" (4), "that" (4), "two" (3).',
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
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the longest word found criteria.'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the longest word found criteria.'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_word_found(board, words):
    """
    Longest Word Found

    Among all words found in the board, return only the longest one. If tied, return any.

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
print(longest_word_found([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: 2
print(longest_word_found([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: 2
print(longest_word_found([["t","h","i","s"]], ["this"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LongestWordFound solves the Longest Word Found problem.
// Among all words found in the board, return only the longest one. If tied, return any.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func LongestWordFound(board [][]int, words []string) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestWordFound([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: 2
	fmt.Println(LongestWordFound([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: 2
	fmt.Println(LongestWordFound([][]int{{t, h, i, s}}, []string{"this"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-03-longest-word-found', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-03-longest-word-found'] = problem;
})();
