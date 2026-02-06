/**
 * Multiple Water Sources
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';
    const problem = {
        name: 'Multiple Water Sources',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Instead of each house optionally having its own well, there are k fixed water treatment plants at specific locations with connection costs.',
        problem: 'The virtual node trick needs modification -- multiple source nodes with different costs to each house create a multi-source shortest connection problem.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With 2 plants and 5 houses, create virtual edges from each plant to each house, then find the MST of the augmented graph.' },
                output: 'See example',
                explanation: 'With 2 plants and 5 houses, create virtual edges from each plant to each house, then find the MST of the augmented graph.'
            }
        ],
        solutions: {
            python: `# Multiple Water Sources
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/03-optimize-water-distribution

def solve():
    """
    Instead of each house optionally having its own well, there are k fixed water treatment plants at specific locations with connection costs.

    Key insight: The virtual node trick needs modification -- multiple source nodes with different costs to each house create a multi-source shortest connection problem.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Multiple Water Sources problem.
// Instead of each house optionally having its own well, there are k fixed water treatment plants at specific locations with connection costs.
// Key insight: The virtual node trick needs modification -- multiple source nodes with different costs to each house create a multi-source shortest connection problem.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-01-multiple-water-sources', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-01-multiple-water-sources'] = problem;
})();
