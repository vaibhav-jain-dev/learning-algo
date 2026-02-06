/**
 * Bidirectional BFS
 * Category: famous-algorithms
 * Difficulty: Hard
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Forward frontier: {hit} -> {hot}. Backward frontier: {cog} -> {dog,log}. Continue until frontiers overlap.' },
                output: 'See example',
                explanation: 'Forward frontier: {hit} -> {hot}. Backward frontier: {cog} -> {dog,log}. Continue until frontiers overlap.'
            }
        ],
        solutions: {
            python: `# Bidirectional BFS
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/03-word-ladder-heuristic

def solve():
    """
    Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.

    Key insight: Explores from both ends, meeting in the middle, dramatically reducing the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is depth.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bidirectional BFS problem.
// Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.
// Key insight: Explores from both ends, meeting in the middle, dramatically reducing the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is depth.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-02-bidirectional-bfs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-02-bidirectional-bfs'] = problem;
})();
