/**
 * Weighted Steps
 * Category: recursion
 * Difficulty: Hard
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Weighted Steps',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].',
        problem: 'Changes from counting paths to optimizing cost, requiring dynamic programming with min instead of sum operations.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For height=4, maxSteps=2, costs=[0,3,2], taking two 2-steps costs 4, while four 1-steps costs 12. Minimum is 4.' },
                output: 'See example',
                explanation: 'For height=4, maxSteps=2, costs=[0,3,2], taking two 2-steps costs 4, while four 1-steps costs 12. Minimum is 4.'
            }
        ],
        solutions: {
            python: `# Weighted Steps
# Category: recursion
# Difficulty: Hard
# Parent: 06-staircase-traversal

def solve():
    """
    Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].

    Key insight: Changes from counting paths to optimizing cost, requiring dynamic programming with min instead of sum operations.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Weighted Steps problem.
// Each step size has a different cost. Find the minimum cost to reach the top, where step i costs cost[i].
// Key insight: Changes from counting paths to optimizing cost, requiring dynamic programming with min instead of sum operations.
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
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-01-weighted-steps', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-01-weighted-steps'] = problem;
})();
