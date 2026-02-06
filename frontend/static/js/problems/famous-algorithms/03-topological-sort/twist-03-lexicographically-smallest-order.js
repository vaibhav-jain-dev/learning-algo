/**
 * Lexicographically Smallest Order
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';
    const problem = {
        name: 'Lexicographically Smallest Order',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Find the lexicographically smallest topological ordering of the DAG.',
        problem: 'Replaces a regular queue with a min-heap/priority queue to always process the smallest available node first among those with zero in-degree.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For nodes {0,1,2,3} with edges [[3,0],[3,1]], the lex smallest order is [2,3,0,1] since 2 has no prerequisites and is smallest.' },
                output: 'See example',
                explanation: 'For nodes {0,1,2,3} with edges [[3,0],[3,1]], the lex smallest order is [2,3,0,1] since 2 has no prerequisites and is smallest.'
            }
        ],
        solutions: {
            python: `# Lexicographically Smallest Order
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort

def solve():
    """
    Find the lexicographically smallest topological ordering of the DAG.

    Key insight: Replaces a regular queue with a min-heap/priority queue to always process the smallest available node first among those with zero in-degree.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Lexicographically Smallest Order problem.
// Find the lexicographically smallest topological ordering of the DAG.
// Key insight: Replaces a regular queue with a min-heap/priority queue to always process the smallest available node first among those with zero in-degree.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-03-lexicographically-smallest-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-03-lexicographically-smallest-order'] = problem;
})();
