/**
 * Bidirectional BFS
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/03-word-ladder-heuristic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BFS',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/03-word-ladder-heuristic',
        description: 'Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.',
        problem: 'Explores from both ends, meeting in the middle, dramatically reducing the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is depth.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def bidirectional_bfs(beginWord, endWord, wordList):
    """
    Bidirectional BFS

    Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.

    Time: O(?)
    Space: O(?)
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
print(bidirectional_bfs("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(bidirectional_bfs("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalBfs solves the Bidirectional BFS problem.
// Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.
// Time: O(?), Space: O(?)
func BidirectionalBfs(beginWord string, endWord string, wordList []string) int {
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
	fmt.Println(BidirectionalBfs("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(BidirectionalBfs("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-02-bidirectional-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-02-bidirectional-bfs'] = problem;
})();
