/**
 * Limited Courses Per Semester
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';
    const problem = {
        name: 'Limited Courses Per Semester',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.',
        problem: 'With a capacity constraint, you cannot take all available courses each semester, requiring greedy or DP-based selection of which courses to prioritize.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With 4 available courses but k=2, you need at least 2 semesters even if all are independent, plus more if there are dependencies.' },
                output: 'See example',
                explanation: 'With 4 available courses but k=2, you need at least 2 semesters even if all are independent, plus more if there are dependencies.'
            }
        ],
        solutions: {
            python: `# Limited Courses Per Semester
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/03-parallel-courses

def solve():
    """
    You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.

    Key insight: With a capacity constraint, you cannot take all available courses each semester, requiring greedy or DP-based selection of which courses to prioritize.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Limited Courses Per Semester problem.
// You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.
// Key insight: With a capacity constraint, you cannot take all available courses each semester, requiring greedy or DP-based selection of which courses to prioritize.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-01-limited-courses-per-semester', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-01-limited-courses-per-semester'] = problem;
})();
