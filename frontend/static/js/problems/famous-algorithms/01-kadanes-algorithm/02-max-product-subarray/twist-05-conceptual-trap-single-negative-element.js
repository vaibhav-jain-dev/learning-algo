/**
 * Conceptual Trap: Single Negative Element
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Single Negative Element',
        difficulty: 'Easy',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.',
        problem: 'Exposes initialization bugs. If maxProd starts at 0 or 1 instead of nums[0], single negative arrays return wrong results. Forces careful reasoning about base cases.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Input: [-5]. Correct output: -5. Input: [0, -5, 0]. Correct output: 0. If maxProd initialized to 1, [-5] wrongly returns 1.' },
                output: 'See example',
                explanation: 'Input: [-5]. Correct output: -5. Input: [0, -5, 0]. Correct output: 0. If maxProd initialized to 1, [-5] wrongly returns 1.'
            }
        ],
        solutions: {
            python: `# Conceptual Trap: Single Negative Element
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 01-kadanes-algorithm/02-max-product-subarray

def solve():
    """
    What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.

    Key insight: Exposes initialization bugs. If maxProd starts at 0 or 1 instead of nums[0], single negative arrays return wrong results. Forces careful reasoning about base cases.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Conceptual Trap: Single Negative Element problem.
// What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.
// Key insight: Exposes initialization bugs. If maxProd starts at 0 or 1 instead of nums[0], single negative arrays return wrong results. Forces careful reasoning about base cases.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-05-conceptual-trap-single-negative-element', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-05-conceptual-trap-single-negative-element'] = problem;
})();
