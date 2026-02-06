/**
 * Check Specific Order Validity
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Check Specific Order Validity',
        difficulty: 'Easy',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Given a proposed course ordering, verify if it respects all prerequisite constraints.',
        problem: 'Inverts from generating a valid order to validating a given one, which is simpler -- just check that every prerequisite appears before its dependent course.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For prereqs [[1,0],[2,1]] and order [0,1,2], return true. For order [1,0,2], return false because 1 appears before its prereq 0.' },
                output: 'See example',
                explanation: 'For prereqs [[1,0],[2,1]] and order [0,1,2], return true. For order [1,0,2], return false because 1 appears before its prereq 0.'
            }
        ],
        solutions: {
            python: `# Check Specific Order Validity
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 03-topological-sort/01-course-schedule

def solve():
    """
    Given a proposed course ordering, verify if it respects all prerequisite constraints.

    Key insight: Inverts from generating a valid order to validating a given one, which is simpler -- just check that every prerequisite appears before its dependent course.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Check Specific Order Validity problem.
// Given a proposed course ordering, verify if it respects all prerequisite constraints.
// Key insight: Inverts from generating a valid order to validating a given one, which is simpler -- just check that every prerequisite appears before its dependent course.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-05-check-specific-order-validity', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-05-check-specific-order-validity'] = problem;
})();
