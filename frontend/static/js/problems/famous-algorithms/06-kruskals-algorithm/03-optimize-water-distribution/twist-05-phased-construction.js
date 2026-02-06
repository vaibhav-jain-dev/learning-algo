/**
 * Phased Construction
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';
    const problem = {
        name: 'Phased Construction',
        difficulty: 'Very Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.',
        problem: 'Adds a scheduling constraint on top of the MST -- you need to build the MST edges in a specific order respecting the k-per-phase limit and water flow requirements.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With k=2 per phase, you might build 1 well and 1 pipe in phase 1, then 2 pipes in phase 2, etc., ensuring water reaches new houses each phase.' },
                output: 'See example',
                explanation: 'With k=2 per phase, you might build 1 well and 1 pipe in phase 1, then 2 pipes in phase 2, etc., ensuring water reaches new houses each phase.'
            }
        ],
        solutions: {
            python: `# Phased Construction
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 06-kruskals-algorithm/03-optimize-water-distribution

def solve():
    """
    Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.

    Key insight: Adds a scheduling constraint on top of the MST -- you need to build the MST edges in a specific order respecting the k-per-phase limit and water flow requirements.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Phased Construction problem.
// Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.
// Key insight: Adds a scheduling constraint on top of the MST -- you need to build the MST edges in a specific order respecting the k-per-phase limit and water flow requirements.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-05-phased-construction', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-05-phased-construction'] = problem;
})();
