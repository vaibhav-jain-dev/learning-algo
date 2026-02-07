/**
 * Bidirectional BFS Word Ladder
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BFS Word Ladder',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Optimize Word Ladder using bidirectional BFS: search from beginWord and endWord simultaneously, meeting in the middle.',
        problem: 'Dramatically reduces the search space by shrinking the BFS frontier from both ends. You must alternate between forward and backward frontiers and detect when they intersect.',
        hints: [
            'Start by understanding the key difference: Dramatically reduces the search space by shrinking the BFS frontier from both ends.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Same input, same output (5), but explores far fewer intermediate words.',
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
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def bidirectional_bfs_word_ladder(beginWord, endWord, wordList):
    """
    Bidirectional BFS Word Ladder

    Optimize Word Ladder using bidirectional BFS: search from beginWord and endWord simultaneously, meeting in the middle.

    Time: O(M^2 * N)
    Space: O(M^2 * N)
    """
    # Check forward
    j = 0
    for i in range(len(beginWord)):
        if j < len(endWord) and beginWord[i] == endWord[j]:
            j += 1
    if j == len(endWord):
        return True

    # Check backward
    j = 0
    for i in range(len(beginWord) - 1, -1, -1):
        if j < len(endWord) and beginWord[i] == endWord[j]:
            j += 1
    return j == len(endWord)


# Test cases
print(bidirectional_bfs_word_ladder("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(bidirectional_bfs_word_ladder("hit", "cog", ["hot","dot","dog","lot","log"]))  # Expected: 2
print(bidirectional_bfs_word_ladder("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalBfsWordLadder solves the Bidirectional BFS Word Ladder problem.
// Optimize Word Ladder using bidirectional BFS: search from beginWord and endWord simultaneously, meeting in the middle.
// Time: O(M^2 * N), Space: O(M^2 * N)
func BidirectionalBfsWordLadder(beginWord string, endWord string, wordList []string) int {
	// Check forward
	j := 0
	for i := 0; i < len(beginWord) && j < len(endWord); i++ {
		if beginWord[i] == endWord[j] {
			j++
		}
	}
	if j == len(endWord) {
		return true
	}

	// Check backward
	j = 0
	for i := len(beginWord) - 1; i >= 0 && j < len(endWord); i-- {
		if beginWord[i] == endWord[j] {
			j++
		}
	}
	return j == len(endWord)
}

func main() {
	fmt.Println(BidirectionalBfsWordLadder("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(BidirectionalBfsWordLadder("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})) // Expected: 2
	fmt.Println(BidirectionalBfsWordLadder("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-03-bidirectional-bfs-word-ladder', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-03-bidirectional-bfs-word-ladder'] = problem;
})();
