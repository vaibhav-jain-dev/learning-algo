/**
 * Steiner Tree Problem
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 06-kruskals-algorithm/01-min-cost-to-connect
 */
(function() {
    'use strict';
    const problem = {
        name: 'Steiner Tree Problem',
        difficulty: 'Very Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/01-min-cost-to-connect',
        description: 'Connect a subset of required points with minimum total distance, optionally adding intermediate Steiner points not in the original set.',
        problem: 'Unlike MST which connects existing vertices only, Steiner trees can add new junction points to reduce total distance, making it NP-hard in general.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 3 points forming an equilateral triangle, adding a Steiner point at the center reduces total connection length compared to MST.' },
                output: 'See example',
                explanation: 'For 3 points forming an equilateral triangle, adding a Steiner point at the center reduces total connection length compared to MST.'
            }
        ],
        solutions: {
            python: `# Steiner Tree Problem
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 06-kruskals-algorithm/01-min-cost-to-connect

def solve():
    """
    Connect a subset of required points with minimum total distance, optionally adding intermediate Steiner points not in the original set.

    Key insight: Unlike MST which connects existing vertices only, Steiner trees can add new junction points to reduce total distance, making it NP-hard in general.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Steiner Tree Problem problem.
// Connect a subset of required points with minimum total distance, optionally adding intermediate Steiner points not in the original set.
// Key insight: Unlike MST which connects existing vertices only, Steiner trees can add new junction points to reduce total distance, making it NP-hard in general.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect/twist-05-steiner-tree-problem', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect/twist-05-steiner-tree-problem'] = problem;
})();
