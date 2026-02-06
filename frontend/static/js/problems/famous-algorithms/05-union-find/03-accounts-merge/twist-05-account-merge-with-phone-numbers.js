/**
 * Account Merge with Phone Numbers
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
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
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"accounts":[["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]},
                output: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]],
                explanation: 'The account merge with phone numbers for this input yields [John,a@m.co,b@m.co, John,c@m.co, John,a@m.co,d@m.co].'
            },
            // Edge case
            {
                input: {"accounts":[["John","a@m.co","b@m.co"]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def account_merge_with_phone_numbers(accounts):
    """
    Account Merge with Phone Numbers

    Accounts have both emails and phone numbers. Merge accounts that share any email OR any phone number.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(accounts)):
        # Check if element meets criteria
        result.append(accounts[i])

    return result


# Test cases
print(account_merge_with_phone_numbers([["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]))  # Expected: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
print(account_merge_with_phone_numbers([["John","a@m.co","b@m.co"]]))  # Expected: []
`,
            go: `package main

import "fmt"

// AccountMergeWithPhoneNumbers solves the Account Merge with Phone Numbers problem.
// Accounts have both emails and phone numbers. Merge accounts that share any email OR any phone number.
// Time: O(?), Space: O(?)
func AccountMergeWithPhoneNumbers(accounts [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(accounts); i++ {
		result = append(result, accounts[i])
	}

	return result
}

func main() {
	fmt.Println(AccountMergeWithPhoneNumbers([][]int{{John, a@m.co, b@m.co}, {John, c@m.co}, {John, a@m.co, d@m.co}})) // Expected: [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
	fmt.Println(AccountMergeWithPhoneNumbers([][]int{{John, a@m.co, b@m.co}})) // Expected: []
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
