/**
 * Count Components Online
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 05-union-find
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Components Online',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'Maintain a running count of connected components as union operations are performed, returning the count after each operation.',
        problem: 'Adds a component counter that decrements only when a union actually merges two different sets, requiring checking the return value of each union.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Start with 5 components. Union(0,1) -> 4 components. Union(0,1) again -> still 4. Union(2,3) -> 3 components.' },
                output: 'See example',
                explanation: 'Start with 5 components. Union(0,1) -> 4 components. Union(0,1) again -> still 4. Union(2,3) -> 3 components.'
            }
        ],
        solutions: {
            python: `# Count Components Online
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 05-union-find

def solve():
    """
    Maintain a running count of connected components as union operations are performed, returning the count after each operation.

    Key insight: Adds a component counter that decrements only when a union actually merges two different sets, requiring checking the return value of each union.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Components Online problem.
// Maintain a running count of connected components as union operations are performed, returning the count after each operation.
// Key insight: Adds a component counter that decrements only when a union actually merges two different sets, requiring checking the return value of each union.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/twist-05-count-components-online', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/twist-05-count-components-online'] = problem;
})();
