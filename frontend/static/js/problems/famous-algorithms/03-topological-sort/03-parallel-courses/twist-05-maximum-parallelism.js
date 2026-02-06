/**
 * Maximum Parallelism
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Parallelism',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Find the maximum number of courses that can be taken simultaneously in any single semester.',
        problem: 'Instead of counting semesters, find the widest level in the BFS -- the semester where the most courses have all prerequisites met simultaneously.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 6 courses where 4 become available after completing the first 2, maximum parallelism is 4.' },
                output: 'See example',
                explanation: 'For 6 courses where 4 become available after completing the first 2, maximum parallelism is 4.'
            }
        ],
        solutions: {
            python: `# Maximum Parallelism
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/03-parallel-courses

def solve():
    """
    Find the maximum number of courses that can be taken simultaneously in any single semester.

    Key insight: Instead of counting semesters, find the widest level in the BFS -- the semester where the most courses have all prerequisites met simultaneously.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Maximum Parallelism problem.
// Find the maximum number of courses that can be taken simultaneously in any single semester.
// Key insight: Instead of counting semesters, find the widest level in the BFS -- the semester where the most courses have all prerequisites met simultaneously.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-05-maximum-parallelism', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-05-maximum-parallelism'] = problem;
})();
