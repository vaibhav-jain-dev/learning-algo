/**
 * Generator / Lazy Flatten
 * Category: recursion
 * Difficulty: Hard
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Generator / Lazy Flatten',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.',
        problem: 'Generators use lazy evaluation, producing values on demand rather than building the entire output eagerly. This changes the space complexity from O(n) result storage to O(d) for the recursion/iteration stack only.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'function* flatten(arr) { for (el of arr) { if (Array.isArray(el)) yield* flatten(el); else yield el; } }. Calling next() returns one value at a time.' },
                output: 'See example',
                explanation: 'function* flatten(arr) { for (el of arr) { if (Array.isArray(el)) yield* flatten(el); else yield el; } }. Calling next() returns one value at a time.'
            }
        ],
        solutions: {
            python: `# Generator / Lazy Flatten
# Category: recursion
# Difficulty: Hard
# Parent: 02-product-sum/02-flatten-nested-list

def solve():
    """
    Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.

    Key insight: Generators use lazy evaluation, producing values on demand rather than building the entire output eagerly. This changes the space complexity from O(n) result storage to O(d) for the recursion/iteration stack only.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Generator / Lazy Flatten problem.
// Implement flatten as a generator that yields one element at a time without building the full result array. This is useful for very large nested structures.
// Key insight: Generators use lazy evaluation, producing values on demand rather than building the entire output eagerly. This changes the space complexity from O(n) result storage to O(d) for the recursion/iteration stack only.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-02-generator-lazy-flatten', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-02-generator-lazy-flatten'] = problem;
})();
