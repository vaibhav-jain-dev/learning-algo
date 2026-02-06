/**
 * Different Heuristics
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Different Heuristics',
        difficulty: 'Medium',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.',
        problem: 'Different heuristics affect A* performance differently -- some are more informed (tighter bound) but must remain admissible (never overestimate) for optimality.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 4-directional movement, Manhattan is exact. Euclidean underestimates. Chebyshev overestimates (inadmissible for 4-dir) but is perfect for 8-dir.' },
                output: 'See example',
                explanation: 'For 4-directional movement, Manhattan is exact. Euclidean underestimates. Chebyshev overestimates (inadmissible for 4-dir) but is perfect for 8-dir.'
            }
        ],
        solutions: {
            python: `# Different Heuristics
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 08-a-star-algorithm

def solve():
    """
    Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.

    Key insight: Different heuristics affect A* performance differently -- some are more informed (tighter bound) but must remain admissible (never overestimate) for optimality.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Different Heuristics problem.
// Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.
// Key insight: Different heuristics affect A* performance differently -- some are more informed (tighter bound) but must remain admissible (never overestimate) for optimality.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-04-different-heuristics', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-04-different-heuristics'] = problem;
})();
