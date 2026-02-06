/**
 * Course Dependencies with Weights
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';
    const problem = {
        name: 'Course Dependencies with Weights',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.',
        problem: 'The semester duration becomes the maximum course length in that semester, making it a critical path problem rather than a simple level count.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Semester 1: courses A(3 weeks) and B(5 weeks) run in parallel = 5 weeks. Total time depends on the critical path.' },
                output: 'See example',
                explanation: 'Semester 1: courses A(3 weeks) and B(5 weeks) run in parallel = 5 weeks. Total time depends on the critical path.'
            }
        ],
        solutions: {
            python: `# Course Dependencies with Weights
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/03-parallel-courses

def solve():
    """
    Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.

    Key insight: The semester duration becomes the maximum course length in that semester, making it a critical path problem rather than a simple level count.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Course Dependencies with Weights problem.
// Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.
// Key insight: The semester duration becomes the maximum course length in that semester, making it a critical path problem rather than a simple level count.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-02-course-dependencies-with-weights', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-02-course-dependencies-with-weights'] = problem;
})();
