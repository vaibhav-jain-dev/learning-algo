/**
 * Detect Inconsistency Details
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect Inconsistency Details',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.',
        problem: 'Goes beyond returning empty string to identifying and reporting the exact cycle of character relationships that creates the contradiction.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For words ["a","b","a"], the constraints b<a and a<b conflict. Return the cycle [a,b,a] as the conflict.' },
                output: 'See example',
                explanation: 'For words ["a","b","a"], the constraints b<a and a<b conflict. Return the cycle [a,b,a] as the conflict.'
            }
        ],
        solutions: {
            python: `# Detect Inconsistency Details
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/02-alien-dictionary

def solve():
    """
    When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.

    Key insight: Goes beyond returning empty string to identifying and reporting the exact cycle of character relationships that creates the contradiction.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Detect Inconsistency Details problem.
// When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.
// Key insight: Goes beyond returning empty string to identifying and reporting the exact cycle of character relationships that creates the contradiction.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-04-detect-inconsistency-details', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-04-detect-inconsistency-details'] = problem;
})();
