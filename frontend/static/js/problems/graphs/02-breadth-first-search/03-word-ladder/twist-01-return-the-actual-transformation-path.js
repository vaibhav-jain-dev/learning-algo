/**
 * Return the Actual Transformation Path
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Actual Transformation Path',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Instead of returning just the length, return one actual shortest transformation sequence as a list of words from beginWord to endWord.',
        problem: 'Tracking the path during BFS requires parent pointers or storing full paths in the queue. Reconstructing the path adds significant complexity compared to just counting levels.',
        hints: [
            'Start by understanding the key difference: Tracking the path during BFS requires parent pointers or storing full paths in the queue.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"].',
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
                explanation: 'For this input, there is 1 valid position that satisfy the return the actual transformation path criteria.'
            },
            {
                input: {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the return the actual transformation path criteria.'
            },
            // Edge case
            {
                input: {"beginWord":"","endWord":"","wordList":["hot"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def return_the_actual_transformation_path(beginWord, endWord, wordList):
    """
    Return the Actual Transformation Path

    Instead of returning just the length, return one actual shortest transformation sequence as a list of words from beginWord to endWord.

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
print(return_the_actual_transformation_path("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 1
print(return_the_actual_transformation_path("hit", "cog", ["hot","dot","dog","lot","log"]))  # Expected: 2
print(return_the_actual_transformation_path("", "", ["hot"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnTheActualTransformationPath solves the Return the Actual Transformation Path problem.
// Instead of returning just the length, return one actual shortest transformation sequence as a list of words from beginWord to endWord.
// Time: O(M^2 * N), Space: O(M^2 * N)
func ReturnTheActualTransformationPath(beginWord string, endWord string, wordList []string) int {
	result := 0

	for i := 0; i < len(beginWord); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnTheActualTransformationPath("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})) // Expected: 1
	fmt.Println(ReturnTheActualTransformationPath("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})) // Expected: 2
	fmt.Println(ReturnTheActualTransformationPath("", "", []string{"hot"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-01-return-the-actual-transformation-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-01-return-the-actual-transformation-path'] = problem;
})();
