/**
 * Course Schedule II (Order)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Course Schedule II (Order)',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Return one valid order in which courses can be taken, not just whether it is possible.',
        problem: 'Extends from boolean feasibility to constructing a concrete ordering, requiring you to record the topological order during BFS.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 4 courses with prereqs [[1,0],[2,0],[3,1],[3,2]], return [0,1,2,3] or [0,2,1,3].' },
                output: 'See example',
                explanation: 'For 4 courses with prereqs [[1,0],[2,0],[3,1],[3,2]], return [0,1,2,3] or [0,2,1,3].'
            }
        ],
        solutions: {
            python: `# Course Schedule II (Order)
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/01-course-schedule

def solve():
    """
    Return one valid order in which courses can be taken, not just whether it is possible.

    Key insight: Extends from boolean feasibility to constructing a concrete ordering, requiring you to record the topological order during BFS.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Course Schedule II (Order) problem.
// Return one valid order in which courses can be taken, not just whether it is possible.
// Key insight: Extends from boolean feasibility to constructing a concrete ordering, requiring you to record the topological order during BFS.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-01-course-schedule-ii-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-01-course-schedule-ii-order'] = problem;
})();
