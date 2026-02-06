/**
 * Generate All Paths vs Count
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Generate All Paths vs Count',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci/02-climbing-stairs-k-steps',
        description: 'Instead of counting the number of ways, generate and return all distinct step sequences. For example, for n=4, k=2, return [[1,1,1,1],[1,1,2],[1,2,1],[2,1,1],[2,2]].',
        problem: 'Counting uses DP with O(n) time, but generating all paths requires backtracking and produces exponential output. The problem shifts from dynamic programming to exhaustive enumeration.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'n=3, k=2 -> [[1,1,1],[1,2],[2,1]]. You must backtrack through choices 1..k at each step, building the path incrementally.' },
                output: 'See example',
                explanation: 'n=3, k=2 -> [[1,1,1],[1,2],[2,1]]. You must backtrack through choices 1..k at each step, building the path incrementally.'
            }
        ],
        solutions: {
            python: `# Generate All Paths vs Count
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps

def solve():
    """
    Instead of counting the number of ways, generate and return all distinct step sequences. For example, for n=4, k=2, return [[1,1,1,1],[1,1,2],[1,2,1],[2,1,1],[2,2]].

    Key insight: Counting uses DP with O(n) time, but generating all paths requires backtracking and produces exponential output. The problem shifts from dynamic programming to exhaustive enumeration.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Generate All Paths vs Count problem.
// Instead of counting the number of ways, generate and return all distinct step sequences. For example, for n=4, k=2, return [[1,1,1,1],[1,1,2],[1,2,1],[2,1,1],[2,2]].
// Key insight: Counting uses DP with O(n) time, but generating all paths requires backtracking and produces exponential output. The problem shifts from dynamic programming to exhaustive enumeration.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps/twist-01-generate-all-paths-vs-count', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps/twist-01-generate-all-paths-vs-count'] = problem;
})();
