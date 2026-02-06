/**
 * Iterative Generation (Heap's Algorithm)
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Generation (Heap\'s Algorithm)',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all permutations iteratively using Heap\'s algorithm, which generates each permutation from the previous one by a single swap. No recursion allowed.',
        problem: 'Heap\'s algorithm uses a fundamentally different approach: instead of building permutations from scratch recursively, it transforms one permutation into the next via adjacent swaps, requiring understanding of the algorithm\'s invariant.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3]: start with [1,2,3], swap to get [2,1,3], then [3,1,2], then [1,3,2], then [2,3,1], then [3,2,1]. Each step is a single swap determined by the current index counter.' },
                output: 'See example',
                explanation: 'For [1,2,3]: start with [1,2,3], swap to get [2,1,3], then [3,1,2], then [1,3,2], then [2,3,1], then [3,2,1]. Each step is a single swap determined by the current index counter.'
            }
        ],
        solutions: {
            python: `# Iterative Generation (Heap's Algorithm)
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations

def solve():
    """
    Generate all permutations iteratively using Heap's algorithm, which generates each permutation from the previous one by a single swap. No recursion allowed.

    Key insight: Heap's algorithm uses a fundamentally different approach: instead of building permutations from scratch recursively, it transforms one permutation into the next via adjacent swaps, requiring understanding of the algorithm's invariant.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative Generation (Heap's Algorithm) problem.
// Generate all permutations iteratively using Heap's algorithm, which generates each permutation from the previous one by a single swap. No recursion allowed.
// Key insight: Heap's algorithm uses a fundamentally different approach: instead of building permutations from scratch recursively, it transforms one permutation into the next via adjacent swaps, requiring understanding of the algorithm's invariant.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-01-iterative-generation-heaps-algorithm', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-01-iterative-generation-heaps-algorithm'] = problem;
})();
