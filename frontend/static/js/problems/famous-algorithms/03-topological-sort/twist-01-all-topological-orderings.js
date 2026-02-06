/**
 * All Topological Orderings
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Topological Orderings',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.',
        problem: 'Requires backtracking through all possible choices of zero in-degree nodes at each step, exploring every branch of the decision tree.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For edges [[0,1],[0,2]], valid orderings are [0,1,2] and [0,2,1]. Return both instead of just one.' },
                output: 'See example',
                explanation: 'For edges [[0,1],[0,2]], valid orderings are [0,1,2] and [0,2,1]. Return both instead of just one.'
            }
        ],
        solutions: {
            python: `# All Topological Orderings
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort

def solve():
    """
    Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.

    Key insight: Requires backtracking through all possible choices of zero in-degree nodes at each step, exploring every branch of the decision tree.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the All Topological Orderings problem.
// Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.
// Key insight: Requires backtracking through all possible choices of zero in-degree nodes at each step, exploring every branch of the decision tree.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-01-all-topological-orderings', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-01-all-topological-orderings'] = problem;
})();
