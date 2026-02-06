/**
 * Bidirectional vs Directed
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional vs Directed',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.',
        problem: 'Directed edges break the symmetry of MST -- you need a minimum spanning arborescence (Edmonds/Chu-Liu algorithm) instead of Kruskal\'s.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Directed edge [1,2,5] means road from city 1 to 2. Must ensure every city is reachable from city 1 via directed paths.' },
                output: 'See example',
                explanation: 'Directed edge [1,2,5] means road from city 1 to 2. Must ensure every city is reachable from city 1 via directed paths.'
            }
        ],
        solutions: {
            python: `# Bidirectional vs Directed
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 06-kruskals-algorithm/02-connecting-cities

def solve():
    """
    If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.

    Key insight: Directed edges break the symmetry of MST -- you need a minimum spanning arborescence (Edmonds/Chu-Liu algorithm) instead of Kruskal's.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bidirectional vs Directed problem.
// If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.
// Key insight: Directed edges break the symmetry of MST -- you need a minimum spanning arborescence (Edmonds/Chu-Liu algorithm) instead of Kruskal's.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-05-bidirectional-vs-directed', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-05-bidirectional-vs-directed'] = problem;
})();
