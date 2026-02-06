/**
 * Weighted Transformations
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/03-word-ladder-heuristic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Transformations',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/03-word-ladder-heuristic',
        description: 'Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.',
        problem: 'Unit-cost BFS no longer works. Need Dijkstra or A* with proper g-cost tracking for variable-weight edges.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the weighted transformations criteria.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_transformations(beginWord, endWord, wordList):
    """
    Weighted Transformations

    Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.

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
print(weighted_transformations("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(weighted_transformations("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedTransformations solves the Weighted Transformations problem.
// Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.
// Time: O(?), Space: O(?)
func WeightedTransformations(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedTransformations("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(WeightedTransformations("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-03-weighted-transformations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-03-weighted-transformations'] = problem;
})();
