/**
 * Minimum Cups Used
 * Category: recursion
 * Difficulty: Hard
 * Parent: 09-ambiguous-measurements
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Cups Used',
        difficulty: 'Hard',
        algorithm: 'recursion-measurements',
        parent: '09-ambiguous-measurements',
        description: 'Instead of just determining if the target is achievable, find the minimum number of cup pours needed to reach exactly the target amount.',
        problem: 'Transforms from a boolean feasibility problem to an optimization problem, requiring BFS or DP with cost tracking instead of simple memoized recursion.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For cups [[200,210],[450,465]] and target 850, minimum pours might be 2 (one of each) rather than just returning true.' },
                output: 'See example',
                explanation: 'For cups [[200,210],[450,465]] and target 850, minimum pours might be 2 (one of each) rather than just returning true.'
            }
        ],
        solutions: {
            python: `# Minimum Cups Used
# Category: recursion
# Difficulty: Hard
# Parent: 09-ambiguous-measurements

def solve():
    """
    Instead of just determining if the target is achievable, find the minimum number of cup pours needed to reach exactly the target amount.

    Key insight: Transforms from a boolean feasibility problem to an optimization problem, requiring BFS or DP with cost tracking instead of simple memoized recursion.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Cups Used problem.
// Instead of just determining if the target is achievable, find the minimum number of cup pours needed to reach exactly the target amount.
// Key insight: Transforms from a boolean feasibility problem to an optimization problem, requiring BFS or DP with cost tracking instead of simple memoized recursion.
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
        window.ProblemRenderer.register('recursion', '09-ambiguous-measurements/twist-01-minimum-cups-used', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/09-ambiguous-measurements/twist-01-minimum-cups-used'] = problem;
})();
