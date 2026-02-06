/**
 * Lexicographic Order Generation
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Lexicographic Order Generation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.',
        problem: 'Standard backtracking does not guarantee lexicographic order. This approach requires understanding the next-permutation algorithm and applying it n!-1 times, which is an iterative rather than recursive strategy.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3]: output in order [1,2,3] -> [1,3,2] -> [2,1,3] -> [2,3,1] -> [3,1,2] -> [3,2,1]. Each transition uses the find-pivot, swap, reverse algorithm.' },
                output: 'See example',
                explanation: 'For [1,2,3]: output in order [1,2,3] -> [1,3,2] -> [2,1,3] -> [2,3,1] -> [3,1,2] -> [3,2,1]. Each transition uses the find-pivot, swap, reverse algorithm.'
            }
        ],
        solutions: {
            python: `# Lexicographic Order Generation
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations

def solve():
    """
    Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.

    Key insight: Standard backtracking does not guarantee lexicographic order. This approach requires understanding the next-permutation algorithm and applying it n!-1 times, which is an iterative rather than recursive strategy.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Lexicographic Order Generation problem.
// Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.
// Key insight: Standard backtracking does not guarantee lexicographic order. This approach requires understanding the next-permutation algorithm and applying it n!-1 times, which is an iterative rather than recursive strategy.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-02-lexicographic-order-generation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-02-lexicographic-order-generation'] = problem;
})();
