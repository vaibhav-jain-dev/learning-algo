/**
 * Find Duplicate Accounts Only
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 05-union-find/03-accounts-merge
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find Duplicate Accounts Only',
        difficulty: 'Easy',
        algorithm: 'union-find',
        parent: '05-union-find/03-accounts-merge',
        description: 'Instead of merging, just identify which accounts are duplicates (share at least one email) without producing the merged result.',
        problem: 'Simplifies the output -- you only need to identify connected account indices, not reconstruct the full merged email lists with sorted output.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For accounts 0, 1, 2 where 0 and 2 share an email, return [[0,2],[1]] showing which account indices are linked.' },
                output: 'See example',
                explanation: 'For accounts 0, 1, 2 where 0 and 2 share an email, return [[0,2],[1]] showing which account indices are linked.'
            }
        ],
        solutions: {
            python: `# Find Duplicate Accounts Only
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 05-union-find/03-accounts-merge

def solve():
    """
    Instead of merging, just identify which accounts are duplicates (share at least one email) without producing the merged result.

    Key insight: Simplifies the output -- you only need to identify connected account indices, not reconstruct the full merged email lists with sorted output.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Find Duplicate Accounts Only problem.
// Instead of merging, just identify which accounts are duplicates (share at least one email) without producing the merged result.
// Key insight: Simplifies the output -- you only need to identify connected account indices, not reconstruct the full merged email lists with sorted output.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/03-accounts-merge/twist-04-find-duplicate-accounts-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/03-accounts-merge/twist-04-find-duplicate-accounts-only'] = problem;
})();
