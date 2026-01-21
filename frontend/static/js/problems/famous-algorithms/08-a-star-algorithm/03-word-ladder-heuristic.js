/**
 * Word Ladder with Heuristic
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder with Heuristic',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm',
        description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: - Every adjacent pair of words differs by a single letter - Every si for 1 <= i <= k is in wordList Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. Use A* algorithm with character difference heuristic for optimization.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(M^2 * N)',
            space: 'O(M * N)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
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
    }
        ],
        solutions: {
            python: `def wordLadderWithHeuristic(data):
    """
    Word Ladder with Heuristic

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

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

// WordLadderWithHeuristic solves the Word Ladder with Heuristic problem.
// Time: O(n), Space: O(n)
func WordLadderWithHeuristic(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic'] = problem;

})();
