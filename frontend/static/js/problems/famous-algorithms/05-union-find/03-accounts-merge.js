/**
 * Accounts Merge
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Accounts Merge',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'Given a list of accounts where each element is a list of strings, where the first element is a name and the rest are emails. Merge accounts that share at least one email. Return accounts in sorted order.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(NK log NK)',
            space: 'O(NK)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "accounts": [
                [
                        "John",
                        "a@m.co",
                        "b@m.co"
                ],
                [
                        "John",
                        "c@m.co"
                ],
                [
                        "John",
                        "a@m.co",
                        "d@m.co"
                ]
        ]
},
        output: [["John", "a@m.co", "b@m.co", "d@m.co"], ["John", "c@m.co"]],
        explanation: 'Processing the input data produces the output. For input accounts=[[\'John\', \'a@m.co\', \'b@m.co\'], [\'John\', \'c@m.co\'], [\'John\', \'a@m.co\', \'d@m.co\']], the result is [[\'John\', \'a@m.co\', \'b@m.co\', \'d@m.co\'], [\'John\', \'c@m.co\']].'
    }
        ],
        solutions: {
            python: `from collections import defaultdict

def accountsMerge(accounts):
    """
    Accounts Merge using Union-Find

    Union emails that belong to the same account, then group by root.

    Time: O(NK log NK) where N=accounts, K=max emails per account
    Space: O(NK)
    """
    parent = {}
    rank = defaultdict(int)
    email_to_name = {}

    def find(x):
        if x not in parent:
            parent[x] = x
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return

        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1

    # Union all emails in the same account
    for account in accounts:
        name = account[0]
        first_email = account[1]

        for email in account[1:]:
            email_to_name[email] = name
            union(first_email, email)

    # Group emails by their root
    groups = defaultdict(list)
    for email in email_to_name:
        root = find(email)
        groups[root].append(email)

    # Build result
    result = []
    for root, emails in groups.items():
        name = email_to_name[root]
        result.append([name] + sorted(emails))

    return result


# Test
if __name__ == "__main__":
    accounts = [
        ["John", "a@m.co", "b@m.co"],
        ["John", "c@m.co"],
        ["John", "a@m.co", "d@m.co"]
    ]
    print(accountsMerge(accounts))
    # Output: [["John", "a@m.co", "b@m.co", "d@m.co"], ["John", "c@m.co"]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// AccountsMerge merges accounts with common emails.
// Time: O(NK log NK), Space: O(NK)
func AccountsMerge(accounts [][]string) [][]string {
    parent := make(map[string]string)
    rank := make(map[string]int)
    emailToName := make(map[string]string)

    var find func(x string) string
    find = func(x string) string {
        if _, ok := parent[x]; !ok {
            parent[x] = x
        }
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }

    union := func(x, y string) {
        px, py := find(x), find(y)
        if px == py {
            return
        }
        if rank[px] < rank[py] {
            px, py = py, px
        }
        parent[py] = px
        if rank[px] == rank[py] {
            rank[px]++
        }
    }

    // Union all emails in the same account
    for _, account := range accounts {
        name := account[0]
        firstEmail := account[1]

        for _, email := range account[1:] {
            emailToName[email] = name
            union(firstEmail, email)
        }
    }

    // Group emails by their root
    groups := make(map[string][]string)
    for email := range emailToName {
        root := find(email)
        groups[root] = append(groups[root], email)
    }

    // Build result
    result := [][]string{}
    for root, emails := range groups {
        name := emailToName[root]
        sort.Strings(emails)
        merged := append([]string{name}, emails...)
        result = append(result, merged)
    }

    return result
}

func main() {
    accounts := [][]string{
        {"John", "a@m.co", "b@m.co"},
        {"John", "c@m.co"},
        {"John", "a@m.co", "d@m.co"},
    }
    fmt.Println(AccountsMerge(accounts))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/03-accounts-merge', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/03-accounts-merge'] = problem;

})();
