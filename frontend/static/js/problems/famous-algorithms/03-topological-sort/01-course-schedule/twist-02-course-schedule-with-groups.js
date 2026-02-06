/**
 * Course Schedule with Groups
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Course Schedule with Groups',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.',
        problem: 'Adds a capacity constraint to each BFS level, requiring greedy or DP-based selection of which available courses to take each semester.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With 6 courses, max 2 per semester, and dependencies: even with all available, you can only take 2 at a time.' },
                output: 'See example',
                explanation: 'With 6 courses, max 2 per semester, and dependencies: even with all available, you can only take 2 at a time.'
            }
        ],
        solutions: {
            python: `# Course Schedule with Groups
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/01-course-schedule

def solve():
    """
    Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.

    Key insight: Adds a capacity constraint to each BFS level, requiring greedy or DP-based selection of which available courses to take each semester.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Course Schedule with Groups problem.
// Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.
// Key insight: Adds a capacity constraint to each BFS level, requiring greedy or DP-based selection of which available courses to take each semester.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-02-course-schedule-with-groups', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-02-course-schedule-with-groups'] = problem;
})();
