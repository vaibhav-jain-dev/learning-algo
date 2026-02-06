/**
 * Lazy vs Eager Prim
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Lazy vs Eager Prim',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Implement both lazy Prim\'s (add all edges to heap, skip stale ones) and eager Prim\'s (use indexed priority queue to update keys) and compare.',
        problem: 'Lazy Prim adds duplicate entries and skips them later. Eager Prim maintains exactly one entry per non-MST node, requiring an indexed PQ with decrease-key operation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Lazy heap may grow to O(E) entries. Eager heap stays at O(V) entries but needs decrease-key. Compare memory and time tradeoffs.' },
                output: 'See example',
                explanation: 'Lazy heap may grow to O(E) entries. Eager heap stays at O(V) entries but needs decrease-key. Compare memory and time tradeoffs.'
            }
        ],
        solutions: {
            python: `# Lazy vs Eager Prim
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 07-prims-algorithm

def solve():
    """
    Implement both lazy Prim's (add all edges to heap, skip stale ones) and eager Prim's (use indexed priority queue to update keys) and compare.

    Key insight: Lazy Prim adds duplicate entries and skips them later. Eager Prim maintains exactly one entry per non-MST node, requiring an indexed PQ with decrease-key operation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Lazy vs Eager Prim problem.
// Implement both lazy Prim's (add all edges to heap, skip stale ones) and eager Prim's (use indexed priority queue to update keys) and compare.
// Key insight: Lazy Prim adds duplicate entries and skips them later. Eager Prim maintains exactly one entry per non-MST node, requiring an indexed PQ with decrease-key operation.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-02-lazy-vs-eager-prim', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-02-lazy-vs-eager-prim'] = problem;
})();
