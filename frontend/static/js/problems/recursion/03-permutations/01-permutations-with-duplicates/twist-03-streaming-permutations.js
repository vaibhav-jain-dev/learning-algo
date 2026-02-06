/**
 * Streaming Permutations
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.',
        problem: 'Forces lazy evaluation thinking instead of collecting all results into a list, which is critical for very large inputs where memory is constrained.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,1,2,2,3], yield permutations one by one so at any point only O(n) extra space is used, not O(n! * n).' },
                output: 'See example',
                explanation: 'For [1,1,2,2,3], yield permutations one by one so at any point only O(n) extra space is used, not O(n! * n).'
            }
        ],
        solutions: {
            python: `# Streaming Permutations
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/01-permutations-with-duplicates

def solve():
    """
    Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.

    Key insight: Forces lazy evaluation thinking instead of collecting all results into a list, which is critical for very large inputs where memory is constrained.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Streaming Permutations problem.
// Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.
// Key insight: Forces lazy evaluation thinking instead of collecting all results into a list, which is critical for very large inputs where memory is constrained.
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-03-streaming-permutations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-03-streaming-permutations'] = problem;
})();
