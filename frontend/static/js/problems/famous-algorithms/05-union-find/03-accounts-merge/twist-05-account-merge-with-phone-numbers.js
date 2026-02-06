/**
 * Account Merge with Phone Numbers
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 05-union-find/03-accounts-merge
 */
(function() {
    'use strict';
    const problem = {
        name: 'Account Merge with Phone Numbers',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find/03-accounts-merge',
        description: 'Accounts have both emails and phone numbers. Merge accounts that share any email OR any phone number.',
        problem: 'Doubles the types of identifiers that can connect accounts, requiring Union-Find to handle two namespaces of identifiers that both trigger merging.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Account [John, a@m.co, 555-1234] and [John, b@m.co, 555-1234] merge because they share phone number 555-1234.' },
                output: 'See example',
                explanation: 'Account [John, a@m.co, 555-1234] and [John, b@m.co, 555-1234] merge because they share phone number 555-1234.'
            }
        ],
        solutions: {
            python: `# Account Merge with Phone Numbers
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 05-union-find/03-accounts-merge

def solve():
    """
    Accounts have both emails and phone numbers. Merge accounts that share any email OR any phone number.

    Key insight: Doubles the types of identifiers that can connect accounts, requiring Union-Find to handle two namespaces of identifiers that both trigger merging.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Account Merge with Phone Numbers problem.
// Accounts have both emails and phone numbers. Merge accounts that share any email OR any phone number.
// Key insight: Doubles the types of identifiers that can connect accounts, requiring Union-Find to handle two namespaces of identifiers that both trigger merging.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/03-accounts-merge/twist-05-account-merge-with-phone-numbers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/03-accounts-merge/twist-05-account-merge-with-phone-numbers'] = problem;
})();
