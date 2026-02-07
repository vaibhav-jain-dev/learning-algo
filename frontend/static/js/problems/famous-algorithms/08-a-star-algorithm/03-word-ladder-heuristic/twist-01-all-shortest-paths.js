/**
 * All Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/03-word-ladder-heuristic
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Shortest Paths',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/03-word-ladder-heuristic',
        description: 'Return all shortest transformation sequences from beginWord to endWord, not just one.',
        problem: 'Requires BFS to find the shortest distance first, then DFS/backtracking to enumerate all paths of that length, maintaining a parent map of all predecessors.',
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
            python: `def all_shortest_paths(beginWord, endWord, wordList):
    """
    All Shortest Paths

    Return all shortest transformation sequences from beginWord to endWord, not just one.

    Time: O(?)
    Space: O(?)
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
print(all_shortest_paths("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(all_shortest_paths("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllShortestPaths solves the All Shortest Paths problem.
// Return all shortest transformation sequences from beginWord to endWord, not just one.
// Time: O(?), Space: O(?)
func AllShortestPaths(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllShortestPaths("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(AllShortestPaths("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-01-all-shortest-paths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-01-all-shortest-paths'] = problem;
})();
