/**
 * Accounts with Conflicts
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 05-union-find/03-accounts-merge
 */
(function() {
    'use strict';
    const problem = {
        name: 'Accounts with Conflicts',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find/03-accounts-merge',
        description: 'Some emails are flagged as belonging to different people. Merge accounts while respecting these conflict constraints.',
        problem: 'Adds negative constraints (cannot merge) alongside positive ones, requiring checking that no two conflicting emails end up in the same merged account.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If a@m.co and b@m.co are known to be different people, accounts sharing a@m.co cannot merge with accounts sharing b@m.co.' },
                output: 'See example',
                explanation: 'If a@m.co and b@m.co are known to be different people, accounts sharing a@m.co cannot merge with accounts sharing b@m.co.'
            }
        ],
        solutions: {
            python: `# Accounts with Conflicts
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 05-union-find/03-accounts-merge

def solve():
    """
    Some emails are flagged as belonging to different people. Merge accounts while respecting these conflict constraints.

    Key insight: Adds negative constraints (cannot merge) alongside positive ones, requiring checking that no two conflicting emails end up in the same merged account.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Accounts with Conflicts problem.
// Some emails are flagged as belonging to different people. Merge accounts while respecting these conflict constraints.
// Key insight: Adds negative constraints (cannot merge) alongside positive ones, requiring checking that no two conflicting emails end up in the same merged account.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/03-accounts-merge/twist-02-accounts-with-conflicts', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/03-accounts-merge/twist-02-accounts-with-conflicts'] = problem;
})();
