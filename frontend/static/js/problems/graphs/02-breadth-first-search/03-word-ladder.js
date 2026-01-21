/**
 * Word Ladder
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'A **transformation sequence** from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: - Every adjacent pair of words differs by a single letter - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList - sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return the **number of words** in the **shortest transformation sequence** from beginWord to endWord,',
        problem: 'Use Breadth-First Search to explore level by level. BFS is ideal for finding shortest paths in unweighted graphs. Use a queue to process nodes in order of distance.',
        complexity: {
            time: 'O(M^2 * N)',
            space: 'O(M^2 * N)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": [
                "hot",
                "dot",
                "dog",
                "lot",
                "log",
                "cog"
        ]
},
        output: 5,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input beginWord=hit, endWord=cog, wordList=[hot, dot, ..., cog] (length 6), the result is 5.'
    },
    {
        input: {
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": [
                "hot",
                "dot",
                "dog",
                "lot",
                "log"
        ]
},
        output: 0,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input beginWord=hit, endWord=cog, wordList=[hot, dot, dog, lot, log], the result is 0.'
    }
        ],
        solutions: {
            python: `def wordLadder(data):
    """
    Word Ladder

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: BFS explores breadth-first, ideal for shortest paths

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// WordLadder solves the Word Ladder problem.
// Time: O(n), Space: O(n)
func WordLadder(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: BFS explores breadth-first, ideal for shortest paths

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder'] = problem;

})();
