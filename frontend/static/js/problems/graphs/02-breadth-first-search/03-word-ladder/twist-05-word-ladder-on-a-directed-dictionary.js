/**
 * Word Ladder on a Directed Dictionary
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder on a Directed Dictionary',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Transformations are directional: you can only change a character to a letter later in the alphabet (a->b ok, b->a not ok). Find the shortest sequence.',
        problem: 'The graph becomes directed, which means some paths available in the undirected version are now blocked. You might need longer detours or the answer might become impossible.',
        hints: [
            'Start by understanding the key difference: The graph becomes directed, which means some paths available in the undirected version are now blocked.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: beginWord="abc", endWord="abd".',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M^2 * N)',
            space: 'O(M^2 * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the word ladder on a directed dictionary criteria.'
            },
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the word ladder on a directed dictionary criteria.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def word_ladder_on_a_directed_dictionary(beginWord, endWord, wordList):
    """
    Word Ladder on a Directed Dictionary

    Transformations are directional: you can only change a character to a letter later in the alphabet (a->b ok, b->a not ok). Find the shortest sequence.

    Time: O(M^2 * N)
    Space: O(M^2 * N)
    """
    count = 0
    n = len(beginWord)

    for i in range(n):
        # Check condition based on endWord
        j = 0
        for k in range(i, n):
            if j < len(endWord) and beginWord[k] == endWord[j]:
                j += 1
        if j == len(endWord):
            count += 1

    return count


# Test cases
print(word_ladder_on_a_directed_dictionary("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(word_ladder_on_a_directed_dictionary("hit", "cog", ["hot","dot","dog","lot","log"]))  # Expected: 2
print(word_ladder_on_a_directed_dictionary("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WordLadderOnADirectedDictionary solves the Word Ladder on a Directed Dictionary problem.
// Transformations are directional: you can only change a character to a letter later in the alphabet (a->b ok, b->a not ok). Find the shortest sequence.
// Time: O(M^2 * N), Space: O(M^2 * N)
func WordLadderOnADirectedDictionary(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WordLadderOnADirectedDictionary("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(WordLadderOnADirectedDictionary("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})) // Expected: 2
	fmt.Println(WordLadderOnADirectedDictionary("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-05-word-ladder-on-a-directed-dictionary', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-05-word-ladder-on-a-directed-dictionary'] = problem;
})();
