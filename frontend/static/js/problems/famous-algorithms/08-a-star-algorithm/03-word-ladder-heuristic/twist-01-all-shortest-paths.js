/**
 * All Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Hard
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For hit->cog, there might be two shortest paths: hit->hot->dot->dog->cog and hit->hot->lot->log->cog. Return both.' },
                output: 'See example',
                explanation: 'For hit->cog, there might be two shortest paths: hit->hot->dot->dog->cog and hit->hot->lot->log->cog. Return both.'
            }
        ],
        solutions: {
            python: `# All Shortest Paths
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/03-word-ladder-heuristic

def solve():
    """
    Return all shortest transformation sequences from beginWord to endWord, not just one.

    Key insight: Requires BFS to find the shortest distance first, then DFS/backtracking to enumerate all paths of that length, maintaining a parent map of all predecessors.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the All Shortest Paths problem.
// Return all shortest transformation sequences from beginWord to endWord, not just one.
// Key insight: Requires BFS to find the shortest distance first, then DFS/backtracking to enumerate all paths of that length, maintaining a parent map of all predecessors.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
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
