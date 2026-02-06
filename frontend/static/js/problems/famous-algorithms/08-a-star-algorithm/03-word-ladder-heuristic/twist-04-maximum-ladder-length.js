/**
 * Maximum Ladder Length
 * Category: famous-algorithms
 * Difficulty: Medium
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'From "hit" to "cog", the shortest path is 5 but the longest (non-repeating) path might visit 10 intermediate words.' },
                output: 'See example',
                explanation: 'From "hit" to "cog", the shortest path is 5 but the longest (non-repeating) path might visit 10 intermediate words.'
            }
        ],
        solutions: {
            python: `# Maximum Ladder Length
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 08-a-star-algorithm/03-word-ladder-heuristic

def solve():
    """
    Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).

    Key insight: Inverts the optimization from shortest to longest path, which is NP-hard in general graphs. For word ladders, the small graph size may make it tractable with DFS+backtracking.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Maximum Ladder Length problem.
// Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).
// Key insight: Inverts the optimization from shortest to longest path, which is NP-hard in general graphs. For word ladders, the small graph size may make it tractable with DFS+backtracking.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-04-maximum-ladder-length', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-04-maximum-ladder-length'] = problem;
})();
