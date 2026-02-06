/**
 * Connect Points with Limited Budget
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';
    const problem = {
        name: 'Connect Points with Limited Budget',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Given a budget B, find the maximum number of points you can connect in a single component spending at most B.',
        problem: 'Cannot build the full MST -- must greedily add the cheapest edges and stop when the budget is exceeded, then report how many points are connected.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 5 points with MST cost 20 and budget 15, you might connect 4 of 5 points using the first 3 MST edges (cost 15).' },
                output: 'See example',
                explanation: 'For 5 points with MST cost 20 and budget 15, you might connect 4 of 5 points using the first 3 MST edges (cost 15).'
            }
        ],
        solutions: {
            python: `# Connect Points with Limited Budget
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 07-prims-algorithm/01-min-cost-connect-points-prim

def solve():
    """
    Given a budget B, find the maximum number of points you can connect in a single component spending at most B.

    Key insight: Cannot build the full MST -- must greedily add the cheapest edges and stop when the budget is exceeded, then report how many points are connected.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Connect Points with Limited Budget problem.
// Given a budget B, find the maximum number of points you can connect in a single component spending at most B.
// Key insight: Cannot build the full MST -- must greedily add the cheapest edges and stop when the budget is exceeded, then report how many points are connected.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-02-connect-points-with-limited-budget', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-02-connect-points-with-limited-budget'] = problem;
})();
