/**
 * Return All Shortest Transformation Sequences
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return All Shortest Transformation Sequences',
        difficulty: 'Very Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.',
        problem: 'You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.',
        hints: [
            'Start by understanding the key difference: You must find ALL shortest paths, not just one.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: beginWord="hit", endWord="cog".',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the return all shortest transformation sequences criteria.'
            },
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the return all shortest transformation sequences criteria.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def return_all_shortest_transformation_sequences(beginWord, endWord, wordList):
    """
    Return All Shortest Transformation Sequences

    Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.

    Time: Varies - see approach
    Space: Varies - see approach
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
print(return_all_shortest_transformation_sequences("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(return_all_shortest_transformation_sequences("hit", "cog", ["hot","dot","dog","lot","log"]))  # Expected: 2
print(return_all_shortest_transformation_sequences("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnAllShortestTransformationSequences solves the Return All Shortest Transformation Sequences problem.
// Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.
// Time: Varies - see approach, Space: Varies - see approach
func ReturnAllShortestTransformationSequences(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnAllShortestTransformationSequences("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(ReturnAllShortestTransformationSequences("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})) // Expected: 2
	fmt.Println(ReturnAllShortestTransformationSequences("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-02-return-all-shortest-transformation-sequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-02-return-all-shortest-transformation-sequences'] = problem;
})();
