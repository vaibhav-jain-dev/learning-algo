/**
 * Rollback Union-Find
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: union-find
 * Parent: 05-union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rollback Union-Find',
        difficulty: 'Very Hard',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'Support an undo operation that reverses the most recent union, restoring the previous state.',
        problem: 'Path compression is destructive and prevents rollback. You must use union-by-rank WITHOUT path compression, and maintain a stack of operations for undo.',
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
                input: {"n":5,"operations":["union(0,1)","union(2,3)","union(1,3)","find(0)==find(3)?","find(0)==find(4)?"]},
                output: true,
                explanation: 'The rollback union find condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"operations":["union(0,1)"]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def rollback_union_find(n, operations):
    """
    Rollback Union-Find

    Support an undo operation that reverses the most recent union, restoring the previous state.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(n)):
        if j < len(operations) and n[i] == operations[j]:
            j += 1

    return j == len(operations)


# Test cases
print(rollback_union_find(5, ["union(0,1)","union(2,3)","union(1,3)","find(0)==find(3)?","find(0)==find(4)?"]))  # Expected: True
print(rollback_union_find(0, ["union(0,1)"]))  # Expected: False
`,
            go: `package main

import "fmt"

// RollbackUnionFind solves the Rollback Union-Find problem.
// Support an undo operation that reverses the most recent union, restoring the previous state.
// Time: O(?), Space: O(?)
func RollbackUnionFind(n int, operations []string) bool {
	j := 0

	for i := 0; i < len(n) && j < len(operations); i++ {
		if n[i] == operations[j] {
			j++
		}
	}

	return j == len(operations)
}

func main() {
	fmt.Println(RollbackUnionFind(5, []string{"union(0,1)", "union(2,3)", "union(1,3)", "find(0)==find(3)?", "find(0)==find(4)?"})) // Expected: true
	fmt.Println(RollbackUnionFind(0, []string{"union(0,1)"})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/twist-03-rollback-union-find', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/twist-03-rollback-union-find'] = problem;
})();
