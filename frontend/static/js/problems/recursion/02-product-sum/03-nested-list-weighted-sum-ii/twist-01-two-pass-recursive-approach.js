/**
 * Two-Pass Recursive Approach
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/03-nested-list-weighted-sum-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Two-Pass Recursive Approach',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/03-nested-list-weighted-sum-ii',
        description: 'Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.',
        problem: 'The BFS level-accumulation trick avoids needing to know max depth upfront. The two-pass approach requires a fundamentally different strategy: decomposing the problem into two independent recursive traversals.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [[1,1],2,[1,1]]: Pass 1 finds maxDepth=2. Pass 2 computes: depth 1 integers (the 2) get weight 2, depth 2 integers (the four 1s) get weight 1. Total = 2*2 + 4*1 = 8.' },
                output: 'See example',
                explanation: 'For [[1,1],2,[1,1]]: Pass 1 finds maxDepth=2. Pass 2 computes: depth 1 integers (the 2) get weight 2, depth 2 integers (the four 1s) get weight 1. Total = 2*2 + 4*1 = 8.'
            }
        ],
        solutions: {
            python: `# Two-Pass Recursive Approach
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/03-nested-list-weighted-sum-ii

def solve():
    """
    Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.

    Key insight: The BFS level-accumulation trick avoids needing to know max depth upfront. The two-pass approach requires a fundamentally different strategy: decomposing the problem into two independent recursive traversals.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Two-Pass Recursive Approach problem.
// Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.
// Key insight: The BFS level-accumulation trick avoids needing to know max depth upfront. The two-pass approach requires a fundamentally different strategy: decomposing the problem into two independent recursive traversals.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii/twist-01-two-pass-recursive-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii/twist-01-two-pass-recursive-approach'] = problem;
})();
