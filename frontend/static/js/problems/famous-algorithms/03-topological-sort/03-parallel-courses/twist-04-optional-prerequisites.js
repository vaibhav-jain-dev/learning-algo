/**
 * Optional Prerequisites
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';
    const problem = {
        name: 'Optional Prerequisites',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.',
        problem: 'Requires partitioning edges into required and optional, then finding the critical path considering only required edges while tracking optional ones for reporting.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If course 3 requires course 1 but only recommends course 2, you can take 3 after just completing 1.' },
                output: 'See example',
                explanation: 'If course 3 requires course 1 but only recommends course 2, you can take 3 after just completing 1.'
            }
        ],
        solutions: {
            python: `# Optional Prerequisites
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort/03-parallel-courses

def solve():
    """
    Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.

    Key insight: Requires partitioning edges into required and optional, then finding the critical path considering only required edges while tracking optional ones for reporting.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Optional Prerequisites problem.
// Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.
// Key insight: Requires partitioning edges into required and optional, then finding the critical path considering only required edges while tracking optional ones for reporting.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-04-optional-prerequisites', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-04-optional-prerequisites'] = problem;
})();
