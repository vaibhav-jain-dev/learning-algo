/**
 * Verify Alien Order
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';
    const problem = {
        name: 'Verify Alien Order',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.',
        problem: 'Inverts from deriving the order to checking one -- simply verify that each adjacent word pair respects the proposed ordering, a much simpler task.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For words ["wrt","wrf"] and proposed order "wrtf...", verify that t comes before f in the order.' },
                output: 'See example',
                explanation: 'For words ["wrt","wrf"] and proposed order "wrtf...", verify that t comes before f in the order.'
            }
        ],
        solutions: {
            python: `# Verify Alien Order
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/02-alien-dictionary

def solve():
    """
    Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.

    Key insight: Inverts from deriving the order to checking one -- simply verify that each adjacent word pair respects the proposed ordering, a much simpler task.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Verify Alien Order problem.
// Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.
// Key insight: Inverts from deriving the order to checking one -- simply verify that each adjacent word pair respects the proposed ordering, a much simpler task.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-01-verify-alien-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-01-verify-alien-order'] = problem;
})();
