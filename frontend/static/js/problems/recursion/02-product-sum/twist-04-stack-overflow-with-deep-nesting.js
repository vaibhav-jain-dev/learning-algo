/**
 * Stack Overflow with Deep Nesting
 * Category: recursion
 * Difficulty: Hard
 * Parent: 02-product-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Stack Overflow with Deep Nesting',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.',
        problem: 'Extremely deep nesting directly maps to deep recursion. The iterative stack-based approach is essential here, and you must handle depth tracking without relying on the call stack.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For a 100000-level deep array containing just the value 1, the product sum is 1 * 1 * 2 * 3 * ... * 100000 = 100000!. The iterative solution processes this without stack overflow.' },
                output: 'See example',
                explanation: 'For a 100000-level deep array containing just the value 1, the product sum is 1 * 1 * 2 * 3 * ... * 100000 = 100000!. The iterative solution processes this without stack overflow.'
            }
        ],
        solutions: {
            python: `# Stack Overflow with Deep Nesting
# Category: recursion
# Difficulty: Hard
# Parent: 02-product-sum

def solve():
    """
    Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.

    Key insight: Extremely deep nesting directly maps to deep recursion. The iterative stack-based approach is essential here, and you must handle depth tracking without relying on the call stack.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Stack Overflow with Deep Nesting problem.
// Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.
// Key insight: Extremely deep nesting directly maps to deep recursion. The iterative stack-based approach is essential here, and you must handle depth tracking without relying on the call stack.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-04-stack-overflow-with-deep-nesting', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-04-stack-overflow-with-deep-nesting'] = problem;
})();
