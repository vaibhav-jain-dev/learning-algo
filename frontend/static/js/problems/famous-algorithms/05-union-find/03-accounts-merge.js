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
            python: `def accountsMerge(data):
    """
    Accounts Merge

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// AccountsMerge solves the Accounts Merge problem.
// Time: O(n), Space: O(n)
func AccountsMerge(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
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
