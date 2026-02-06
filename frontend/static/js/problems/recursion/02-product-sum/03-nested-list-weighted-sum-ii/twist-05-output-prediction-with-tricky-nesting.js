/**
 * Output Prediction with Tricky Nesting
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/03-nested-list-weighted-sum-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction with Tricky Nesting',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/03-nested-list-weighted-sum-ii',
        description: 'Without running code, compute the inverse-weighted sum of [1, [2, [3]], [4, [5, [6]]]]. Be careful with varying depths in different branches.',
        problem: 'Tests your ability to mentally trace the algorithm with asymmetric nesting. Different branches have different depths, so the max depth affects all weights globally. You must find the global max depth first.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Max depth = 4 (path to 6). Weights: depth 1 (items: 1) weight=4, depth 2 (items: 2,4) weight=3, depth 3 (items: 3,5) weight=2, depth 4 (items: 6) weight=1. Sum = 1*4+2*3+4*3+3*2+5*2+6*1 = 4+6+12+6+10+6 = 44.' },
                output: 'See example',
                explanation: 'Max depth = 4 (path to 6). Weights: depth 1 (items: 1) weight=4, depth 2 (items: 2,4) weight=3, depth 3 (items: 3,5) weight=2, depth 4 (items: 6) weight=1. Sum = 1*4+2*3+4*3+3*2+5*2+6*1 = 4+6+12+6+10+6 = 44.'
            }
        ],
        solutions: {
            python: `# Output Prediction with Tricky Nesting
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/03-nested-list-weighted-sum-ii

def solve():
    """
    Without running code, compute the inverse-weighted sum of [1, [2, [3]], [4, [5, [6]]]]. Be careful with varying depths in different branches.

    Key insight: Tests your ability to mentally trace the algorithm with asymmetric nesting. Different branches have different depths, so the max depth affects all weights globally. You must find the global max depth first.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Output Prediction with Tricky Nesting problem.
// Without running code, compute the inverse-weighted sum of [1, [2, [3]], [4, [5, [6]]]]. Be careful with varying depths in different branches.
// Key insight: Tests your ability to mentally trace the algorithm with asymmetric nesting. Different branches have different depths, so the max depth affects all weights globally. You must find the global max depth first.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii/twist-05-output-prediction-with-tricky-nesting', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii/twist-05-output-prediction-with-tricky-nesting'] = problem;
})();
