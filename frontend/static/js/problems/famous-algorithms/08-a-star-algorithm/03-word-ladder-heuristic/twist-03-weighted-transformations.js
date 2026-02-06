/**
 * Weighted Transformations
 * Category: famous-algorithms
 * Difficulty: Hard
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Transforming "hit" to "hot" costs 1 (vowel change i->o), but "hit" to "hat" costs 2 (consonant change i to vowel a? depends on definition).' },
                output: 'See example',
                explanation: 'Transforming "hit" to "hot" costs 1 (vowel change i->o), but "hit" to "hat" costs 2 (consonant change i to vowel a? depends on definition).'
            }
        ],
        solutions: {
            python: `# Weighted Transformations
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/03-word-ladder-heuristic

def solve():
    """
    Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.

    Key insight: Unit-cost BFS no longer works. Need Dijkstra or A* with proper g-cost tracking for variable-weight edges.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Weighted Transformations problem.
// Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.
// Key insight: Unit-cost BFS no longer works. Need Dijkstra or A* with proper g-cost tracking for variable-weight edges.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic/twist-03-weighted-transformations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic/twist-03-weighted-transformations'] = problem;
})();
