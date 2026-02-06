/**
 * Organizational Distance
 * Category: recursion
 * Difficulty: Medium
 * Parent: 14-lowest-common-manager
 */
(function() {
    'use strict';
    const problem = {
        name: 'Organizational Distance',
        difficulty: 'Medium',
        algorithm: 'recursion-manager',
        parent: '14-lowest-common-manager',
        description: 'Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.',
        problem: 'Once the LCM is identified, the distance is the sum of depths of both employees minus twice the depth of the LCM, requiring depth computation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If E is at depth 3 and G is at depth 4 with LCM at depth 1, the distance is (3-1) + (4-1) = 5 edges.' },
                output: 'See example',
                explanation: 'If E is at depth 3 and G is at depth 4 with LCM at depth 1, the distance is (3-1) + (4-1) = 5 edges.'
            }
        ],
        solutions: {
            python: `# Organizational Distance
# Category: recursion
# Difficulty: Medium
# Parent: 14-lowest-common-manager

def solve():
    """
    Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.

    Key insight: Once the LCM is identified, the distance is the sum of depths of both employees minus twice the depth of the LCM, requiring depth computation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Organizational Distance problem.
// Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.
// Key insight: Once the LCM is identified, the distance is the sum of depths of both employees minus twice the depth of the LCM, requiring depth computation.
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
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager/twist-06-organizational-distance', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager/twist-06-organizational-distance'] = problem;
})();
