/**
 * Find Duplicate Accounts Only
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: union-find
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
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"accounts":[["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]},
                output: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]],
                explanation: 'The find duplicate accounts only for this input yields [John,a@m.co,b@m.co, John,c@m.co, John,a@m.co,d@m.co].'
            },
            // Edge case
            {
                input: {"accounts":[["John","a@m.co","b@m.co"]]},
                output: [],
                explanation: 'Process each connection/edge. For each pair, find their root representatives. If different, merge the smaller tree into the larger one (union by rank). Path compression flattens the tree on each find.'
            }
        ],
        solutions: {
            python: `def find_duplicate_accounts_only(accounts):
    """
    Find Duplicate Accounts Only

    Instead of merging, just identify which accounts are duplicates (share at least one email) without producing the merged result.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(accounts)):
        # Check if element meets criteria
        result.append(accounts[i])

    return result


# Test cases
print(find_duplicate_accounts_only([["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]))  # Expected: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
print(find_duplicate_accounts_only([["John","a@m.co","b@m.co"]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindDuplicateAccountsOnly solves the Find Duplicate Accounts Only problem.
// Instead of merging, just identify which accounts are duplicates (share at least one email) without producing the merged result.
// Time: O(?), Space: O(?)
func FindDuplicateAccountsOnly(accounts [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(accounts); i++ {
		result = append(result, accounts[i])
	}

	return result
}

func main() {
	fmt.Println(FindDuplicateAccountsOnly([][]int{{John, a@m.co, b@m.co}, {John, c@m.co}, {John, a@m.co, d@m.co}})) // Expected: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
	fmt.Println(FindDuplicateAccountsOnly([][]int{{John, a@m.co, b@m.co}})) // Expected: []
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
