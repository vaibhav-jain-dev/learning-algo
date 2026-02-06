/**
 * Time Complexity Deep Dive
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Time Complexity Deep Dive',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?',
        problem: 'Requires careful analysis of the work done per permutation. The extra O(n) comes from copying each complete permutation into the result. With the swap method and in-place processing, you can achieve O(n!) if you only need to process (not store) each permutation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'n=4: 24 permutations, each copied in O(4) time = O(96) operations for copying alone. If you print each permutation as generated (no copy), the generation itself is O(n!) swaps.' },
                output: 'See example',
                explanation: 'n=4: 24 permutations, each copied in O(4) time = O(96) operations for copying alone. If you print each permutation as generated (no copy), the generation itself is O(n!) swaps.'
            }
        ],
        solutions: {
            python: `# Time Complexity Deep Dive
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations

def solve():
    """
    Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?

    Key insight: Requires careful analysis of the work done per permutation. The extra O(n) comes from copying each complete permutation into the result. With the swap method and in-place processing, you can achieve O(n!) if you only need to process (not store) each permutation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Time Complexity Deep Dive problem.
// Explain precisely why the time complexity is O(n! * n) and not just O(n!). Where does the extra factor of n come from? Could you reduce it?
// Key insight: Requires careful analysis of the work done per permutation. The extra O(n) comes from copying each complete permutation into the result. With the swap method and in-place processing, you can achieve O(n!) if you only need to process (not store) each permutation.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-05-time-complexity-deep-dive', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-05-time-complexity-deep-dive'] = problem;
})();
