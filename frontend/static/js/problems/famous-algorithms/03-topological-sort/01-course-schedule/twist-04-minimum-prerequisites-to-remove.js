/**
 * Minimum Prerequisites to Remove
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Prerequisites to Remove',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'If a cycle exists, find the minimum number of prerequisite edges to remove to make the schedule valid.',
        problem: 'Transforms from cycle detection to minimum feedback arc set, an NP-hard problem in general that requires heuristic or special-case solutions.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For prerequisites [[0,1],[1,2],[2,0]], removing any one edge breaks the cycle. Minimum removals = 1.' },
                output: 'See example',
                explanation: 'For prerequisites [[0,1],[1,2],[2,0]], removing any one edge breaks the cycle. Minimum removals = 1.'
            }
        ],
        solutions: {
            python: `# Minimum Prerequisites to Remove
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/01-course-schedule

def solve():
    """
    If a cycle exists, find the minimum number of prerequisite edges to remove to make the schedule valid.

    Key insight: Transforms from cycle detection to minimum feedback arc set, an NP-hard problem in general that requires heuristic or special-case solutions.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Prerequisites to Remove problem.
// If a cycle exists, find the minimum number of prerequisite edges to remove to make the schedule valid.
// Key insight: Transforms from cycle detection to minimum feedback arc set, an NP-hard problem in general that requires heuristic or special-case solutions.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-04-minimum-prerequisites-to-remove', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-04-minimum-prerequisites-to-remove'] = problem;
})();
