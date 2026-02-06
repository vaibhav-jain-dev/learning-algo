/**
 * Longest Path in DAG
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';
    const problem = {
        name: 'Longest Path in DAG',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Using topological sort, find the length of the longest path in the DAG (critical path).',
        problem: 'Leverages topological order as a preprocessing step for a DP problem, computing maximum distances instead of just ordering.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For edges [[0,1],[0,2],[1,3],[2,3]], the longest path is 0->1->3 or 0->2->3, length 2.' },
                output: 'See example',
                explanation: 'For edges [[0,1],[0,2],[1,3],[2,3]], the longest path is 0->1->3 or 0->2->3, length 2.'
            }
        ],
        solutions: {
            python: `# Longest Path in DAG
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort

def solve():
    """
    Using topological sort, find the length of the longest path in the DAG (critical path).

    Key insight: Leverages topological order as a preprocessing step for a DP problem, computing maximum distances instead of just ordering.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Longest Path in DAG problem.
// Using topological sort, find the length of the longest path in the DAG (critical path).
// Key insight: Leverages topological order as a preprocessing step for a DP problem, computing maximum distances instead of just ordering.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-05-longest-path-in-dag', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-05-longest-path-in-dag'] = problem;
})();
