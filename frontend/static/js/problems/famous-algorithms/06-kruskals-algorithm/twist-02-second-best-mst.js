/**
 * Second Best MST
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Second Best MST',
        difficulty: 'Very Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the spanning tree with the second smallest total weight (it may share most edges with the MST).',
        problem: 'Requires finding the MST first, then for each non-MST edge, determining which MST edge it could replace and tracking the minimum increase in total weight.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If MST has weight 19, the second best MST might have weight 20 by swapping one edge -- find which swap gives the smallest increase.' },
                output: 'See example',
                explanation: 'If MST has weight 19, the second best MST might have weight 20 by swapping one edge -- find which swap gives the smallest increase.'
            }
        ],
        solutions: {
            python: `# Second Best MST
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 06-kruskals-algorithm

def solve():
    """
    Find the spanning tree with the second smallest total weight (it may share most edges with the MST).

    Key insight: Requires finding the MST first, then for each non-MST edge, determining which MST edge it could replace and tracking the minimum increase in total weight.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Second Best MST problem.
// Find the spanning tree with the second smallest total weight (it may share most edges with the MST).
// Key insight: Requires finding the MST first, then for each non-MST edge, determining which MST edge it could replace and tracking the minimum increase in total weight.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-02-second-best-mst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-02-second-best-mst'] = problem;
})();
