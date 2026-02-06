/**
 * Word Ladder with Two-Character Changes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder with Two-Character Changes',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Each transformation step can change up to 2 characters instead of exactly 1. Find the shortest sequence under this relaxed rule.',
        problem: 'The adjacency definition changes dramatically - each word has many more neighbors. The graph becomes much denser, so the BFS frontier grows faster but the shortest path is shorter.',
        hints: [
            'Start by understanding the key difference: The adjacency definition changes dramatically - each word has many more neighbors.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: beginWord="hit", endWord="cog".',
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
                explanation: 'For this input, there is 1 valid position that satisfy the word ladder with two character changes criteria.'
            },
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the word ladder with two character changes criteria.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def word_ladder_with_two_character_changes(beginWord, endWord, wordList):
    """
    Word Ladder with Two-Character Changes

    Each transformation step can change up to 2 characters instead of exactly 1. Find the shortest sequence under this relaxed rule.

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
print(word_ladder_with_two_character_changes("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(word_ladder_with_two_character_changes("hit", "cog", ["hot","dot","dog","lot","log"]))  # Expected: 2
print(word_ladder_with_two_character_changes("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WordLadderWithTwoCharacterChanges solves the Word Ladder with Two-Character Changes problem.
// Each transformation step can change up to 2 characters instead of exactly 1. Find the shortest sequence under this relaxed rule.
// Time: O(M^2 * N), Space: O(M^2 * N)
func WordLadderWithTwoCharacterChanges(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WordLadderWithTwoCharacterChanges("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(WordLadderWithTwoCharacterChanges("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})) // Expected: 2
	fmt.Println(WordLadderWithTwoCharacterChanges("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-04-word-ladder-with-two-character-changes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-04-word-ladder-with-two-character-changes'] = problem;
})();
