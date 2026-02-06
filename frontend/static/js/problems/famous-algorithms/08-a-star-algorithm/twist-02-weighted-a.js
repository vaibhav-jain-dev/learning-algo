/**
 * Weighted A*
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Weighted A*',
        difficulty: 'Hard',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Implement weighted A* where f(n) = g(n) + w*h(n) with w > 1, trading optimality for speed.',
        problem: 'A weight w > 1 makes the heuristic more aggressive, exploring fewer nodes but potentially finding suboptimal paths. Understanding the optimality-speed tradeoff is key.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With w=2, A* explores half the nodes but may return a path that is up to 2x the optimal length. For w=1, it is standard A* with optimal guarantee.' },
                output: 'See example',
                explanation: 'With w=2, A* explores half the nodes but may return a path that is up to 2x the optimal length. For w=1, it is standard A* with optimal guarantee.'
            }
        ],
        solutions: {
            python: `# Weighted A*
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm

def solve():
    """
    Implement weighted A* where f(n) = g(n) + w*h(n) with w > 1, trading optimality for speed.

    Key insight: A weight w > 1 makes the heuristic more aggressive, exploring fewer nodes but potentially finding suboptimal paths. Understanding the optimality-speed tradeoff is key.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Weighted A* problem.
// Implement weighted A* where f(n) = g(n) + w*h(n) with w > 1, trading optimality for speed.
// Key insight: A weight w > 1 makes the heuristic more aggressive, exploring fewer nodes but potentially finding suboptimal paths. Understanding the optimality-speed tradeoff is key.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-02-weighted-a', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-02-weighted-a'] = problem;
})();
