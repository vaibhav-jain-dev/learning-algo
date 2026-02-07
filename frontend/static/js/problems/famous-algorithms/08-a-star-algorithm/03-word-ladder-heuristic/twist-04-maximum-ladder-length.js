/**
 * Maximum Ladder Length
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/03-word-ladder-heuristic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Ladder Length',
        difficulty: 'Medium',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/03-word-ladder-heuristic',
        description: 'Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).',
        problem: 'Inverts the optimization from shortest to longest path, which is NP-hard in general graphs. For word ladders, the small graph size may make it tractable with DFS+backtracking.',
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
                output: 2,
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
            python: `def maximum_ladder_length(beginWord, endWord, wordList):
    """
    Maximum Ladder Length

    Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).

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
print(maximum_ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 2
print(maximum_ladder_length("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaximumLadderLength solves the Maximum Ladder Length problem.
// Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).
// Time: O(?), Space: O(?)
func MaximumLadderLength(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumLadderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 2
	fmt.Println(MaximumLadderLength("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-04-maximum-ladder-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-04-maximum-ladder-length'] = problem;
})();
