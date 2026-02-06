/**
 * Distance to Common Manager
 * Category: recursion
 * Difficulty: Medium
 * Parent: 14-lowest-common-manager
 */
(function() {
    'use strict';
    const problem = {
        name: 'Distance to Common Manager',
        difficulty: 'Medium',
        algorithm: 'recursion-manager',
        parent: '14-lowest-common-manager',
        description: 'Find the lowest common manager and also return the distances from each employee to that manager.',
        problem: 'Adds depth tracking to the recursion -- when the LCM is found, compute the path lengths back to each target employee.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If LCM of E and G is A, and E is 2 levels below A while G is 3 levels below, return {manager: "A", distE: 2, distG: 3}.' },
                output: 'See example',
                explanation: 'If LCM of E and G is A, and E is 2 levels below A while G is 3 levels below, return {manager: "A", distE: 2, distG: 3}.'
            }
        ],
        solutions: {
            python: `# Distance to Common Manager
# Category: recursion
# Difficulty: Medium
# Parent: 14-lowest-common-manager

def solve():
    """
    Find the lowest common manager and also return the distances from each employee to that manager.

    Key insight: Adds depth tracking to the recursion -- when the LCM is found, compute the path lengths back to each target employee.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Distance to Common Manager problem.
// Find the lowest common manager and also return the distances from each employee to that manager.
// Key insight: Adds depth tracking to the recursion -- when the LCM is found, compute the path lengths back to each target employee.
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
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager/twist-02-distance-to-common-manager', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager/twist-02-distance-to-common-manager'] = problem;
})();
