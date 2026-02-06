/**
 * Rollback Union-Find
 * Category: famous-algorithms
 * Difficulty: Very Hard
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Union(0,1), union(2,3), undo() restores the state before union(2,3) was performed.' },
                output: 'See example',
                explanation: 'Union(0,1), union(2,3), undo() restores the state before union(2,3) was performed.'
            }
        ],
        solutions: {
            python: `# Rollback Union-Find
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 05-union-find

def solve():
    """
    Support an undo operation that reverses the most recent union, restoring the previous state.

    Key insight: Path compression is destructive and prevents rollback. You must use union-by-rank WITHOUT path compression, and maintain a stack of operations for undo.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Rollback Union-Find problem.
// Support an undo operation that reverses the most recent union, restoring the previous state.
// Key insight: Path compression is destructive and prevents rollback. You must use union-by-rank WITHOUT path compression, and maintain a stack of operations for undo.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/twist-03-rollback-union-find', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/twist-03-rollback-union-find'] = problem;
})();
