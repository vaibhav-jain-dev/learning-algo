/**
 * Semester Schedule Output
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';
    const problem = {
        name: 'Semester Schedule Output',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Return the actual course groupings per semester, not just the count of semesters.',
        problem: 'Requires recording which courses are taken in each BFS level, not just counting levels, adding bookkeeping to the topological sort.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 4 courses with relations [[1,3],[2,3]], return [[1,2],[3]] showing semester assignments.' },
                output: 'See example',
                explanation: 'For 4 courses with relations [[1,3],[2,3]], return [[1,2],[3]] showing semester assignments.'
            }
        ],
        solutions: {
            python: `# Semester Schedule Output
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/03-parallel-courses

def solve():
    """
    Return the actual course groupings per semester, not just the count of semesters.

    Key insight: Requires recording which courses are taken in each BFS level, not just counting levels, adding bookkeeping to the topological sort.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Semester Schedule Output problem.
// Return the actual course groupings per semester, not just the count of semesters.
// Key insight: Requires recording which courses are taken in each BFS level, not just counting levels, adding bookkeeping to the topological sort.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-03-semester-schedule-output', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-03-semester-schedule-output'] = problem;
})();
