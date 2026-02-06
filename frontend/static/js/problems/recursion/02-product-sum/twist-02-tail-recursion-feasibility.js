/**
 * Tail Recursion Feasibility
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Tail Recursion Feasibility',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.',
        problem: 'Unlike linear recursion (Fibonacci), the nested structure means you recurse into sub-arrays mid-iteration. True tail recursion requires the recursive call to be the last operation, but you have remaining siblings to process.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'productSum([5, [7, -1], 3], depth=1, acc=0): after processing 5, you must recurse into [7,-1] but still have 3 remaining. This breaks tail-call optimization unless you use continuation-passing style.' },
                output: 'See example',
                explanation: 'productSum([5, [7, -1], 3], depth=1, acc=0): after processing 5, you must recurse into [7,-1] but still have 3 remaining. This breaks tail-call optimization unless you use continuation-passing style.'
            }
        ],
        solutions: {
            python: `# Tail Recursion Feasibility
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum

def solve():
    """
    Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.

    Key insight: Unlike linear recursion (Fibonacci), the nested structure means you recurse into sub-arrays mid-iteration. True tail recursion requires the recursive call to be the last operation, but you have remaining siblings to process.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Tail Recursion Feasibility problem.
// Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.
// Key insight: Unlike linear recursion (Fibonacci), the nested structure means you recurse into sub-arrays mid-iteration. True tail recursion requires the recursive call to be the last operation, but you have remaining siblings to process.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-02-tail-recursion-feasibility', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-02-tail-recursion-feasibility'] = problem;
})();
