/**
 * Count Only Without Generating
 * Category: recursion
 * Difficulty: Easy
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Only Without Generating',
        difficulty: 'Easy',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.',
        problem: 'Shifts from generation to combinatorial reasoning. The recursive decomposition of permutations (choose first element from n options, recurse on remaining n-1) directly mirrors n! = n * (n-1)!.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=4: count = 4! = 24. The recursion tree has 4 branches at level 0, 3 at level 1, 2 at level 2, 1 at level 3: 4*3*2*1 = 24.' },
                output: 'See example',
                explanation: 'For n=4: count = 4! = 24. The recursion tree has 4 branches at level 0, 3 at level 1, 2 at level 2, 1 at level 3: 4*3*2*1 = 24.'
            }
        ],
        solutions: {
            python: `# Count Only Without Generating
# Category: recursion
# Difficulty: Easy
# Parent: 03-permutations

def solve():
    """
    Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.

    Key insight: Shifts from generation to combinatorial reasoning. The recursive decomposition of permutations (choose first element from n options, recurse on remaining n-1) directly mirrors n! = n * (n-1)!.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Only Without Generating problem.
// Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.
// Key insight: Shifts from generation to combinatorial reasoning. The recursive decomposition of permutations (choose first element from n options, recurse on remaining n-1) directly mirrors n! = n * (n-1)!.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-03-count-only-without-generating', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-03-count-only-without-generating'] = problem;
})();
