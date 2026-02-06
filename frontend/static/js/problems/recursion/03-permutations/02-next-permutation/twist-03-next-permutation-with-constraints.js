/**
 * Next Permutation with Constraints
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Next Permutation with Constraints',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Find the next permutation where certain positions are fixed and cannot be swapped.',
        problem: 'The standard pivot-and-swap approach breaks when some indices are immovable, requiring a constrained search that respects fixed positions.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3,4] with position 1 fixed (value 2 stays), next permutation is [1,2,4,3] not [1,3,2,4].' },
                output: 'See example',
                explanation: 'For [1,2,3,4] with position 1 fixed (value 2 stays), next permutation is [1,2,4,3] not [1,3,2,4].'
            }
        ],
        solutions: {
            python: `# Next Permutation with Constraints
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/02-next-permutation

def solve():
    """
    Find the next permutation where certain positions are fixed and cannot be swapped.

    Key insight: The standard pivot-and-swap approach breaks when some indices are immovable, requiring a constrained search that respects fixed positions.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Next Permutation with Constraints problem.
// Find the next permutation where certain positions are fixed and cannot be swapped.
// Key insight: The standard pivot-and-swap approach breaks when some indices are immovable, requiring a constrained search that respects fixed positions.
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
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-03-next-permutation-with-constraints', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-03-next-permutation-with-constraints'] = problem;
})();
