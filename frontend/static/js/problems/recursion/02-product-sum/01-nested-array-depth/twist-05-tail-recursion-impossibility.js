/**
 * Tail Recursion Impossibility
 * Category: recursion
 * Difficulty: Hard
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Tail Recursion Impossibility',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?',
        problem: 'This is a conceptual analysis twist. The problem requires comparing results from multiple recursive calls (siblings in the array), which means you need the results of sub-calls before you can combine them. This prevents simple tail-call optimization.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [A, B] where A and B are sub-arrays: depth = 1 + max(depth(A), depth(B)). You cannot compute this with a single tail call because you need both depth(A) and depth(B) before taking the max.' },
                output: 'See example',
                explanation: 'For [A, B] where A and B are sub-arrays: depth = 1 + max(depth(A), depth(B)). You cannot compute this with a single tail call because you need both depth(A) and depth(B) before taking the max.'
            }
        ],
        solutions: {
            python: `# Tail Recursion Impossibility
# Category: recursion
# Difficulty: Hard
# Parent: 02-product-sum/01-nested-array-depth

def solve():
    """
    Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?

    Key insight: This is a conceptual analysis twist. The problem requires comparing results from multiple recursive calls (siblings in the array), which means you need the results of sub-calls before you can combine them. This prevents simple tail-call optimization.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Tail Recursion Impossibility problem.
// Explain why maximum depth of nested arrays cannot be trivially converted to tail recursion. What property of the problem prevents it?
// Key insight: This is a conceptual analysis twist. The problem requires comparing results from multiple recursive calls (siblings in the array), which means you need the results of sub-calls before you can combine them. This prevents simple tail-call optimization.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-05-tail-recursion-impossibility', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-05-tail-recursion-impossibility'] = problem;
})();
