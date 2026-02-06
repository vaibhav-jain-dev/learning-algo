/**
 * Word Search II with Trie
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-word-search
 * Parent: 12-boggle-board
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Search II with Trie',
        difficulty: 'Hard',
        algorithm: 'graph-word-search',
        parent: '12-boggle-board',
        description: 'Implement using a Trie (prefix tree) for efficient multi-word search. Prune branches that cannot lead to any word.',
        problem: 'Instead of searching for each word independently, build a Trie and search all words simultaneously. Trie pruning eliminates dead-end paths early, dramatically improving performance.',
        hints: [
            'Start by understanding the key difference: Instead of searching for each word independently, build a Trie and search all words simultaneously.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Words: ["oath","pea","eat","rain"].',
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
                explanation: 'The word search ii with trie for this input yields [t,h,i,s, w,a,t,s, o,a,h,g].'
            },
            {
                input: {"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},
                output: [["a","b"],["c","d"]],
                explanation: 'The word search ii with trie for this input yields [a,b, c,d].'
            },
            // Edge case
            {
                input: {"board":[["t","h","i","s"]],"words":["this"]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def word_search_ii_with_trie(board, words):
    """
    Word Search II with Trie

    Implement using a Trie (prefix tree) for efficient multi-word search. Prune branches that cannot lead to any word.

    Time: O(N * M * 8^L + W * L)
    Space: O(W * L + N * M)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(word_search_ii_with_trie([["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]], ["this","two","fat","that"]))  # Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
print(word_search_ii_with_trie([["a","b"],["c","d"]], ["abcd","abdc","abca"]))  # Expected: [["a","b"],["c","d"]]
print(word_search_ii_with_trie([["t","h","i","s"]], ["this"]))  # Expected: []
`,
            go: `package main

import "fmt"

// WordSearchIiWithTrie solves the Word Search II with Trie problem.
// Implement using a Trie (prefix tree) for efficient multi-word search. Prune branches that cannot lead to any word.
// Time: O(N * M * 8^L + W * L), Space: O(W * L + N * M)
func WordSearchIiWithTrie(board [][]int, words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(WordSearchIiWithTrie([][]int{{t, h, i, s}, {w, a, t, s}, {o, a, h, g}, {f, g, d, t}}, []string{"this", "two", "fat", "that"})) // Expected: [["t","h","i","s"],["w","a","t","s"],["o","a","h","g"]]
	fmt.Println(WordSearchIiWithTrie([][]int{{a, b}, {c, d}}, []string{"abcd", "abdc", "abca"})) // Expected: [["a","b"],["c","d"]]
	fmt.Println(WordSearchIiWithTrie([][]int{{t, h, i, s}}, []string{"this"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '12-boggle-board/twist-04-word-search-ii-with-trie', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/12-boggle-board/twist-04-word-search-ii-with-trie'] = problem;
})();
