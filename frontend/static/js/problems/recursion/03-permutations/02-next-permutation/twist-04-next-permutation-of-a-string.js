/**
 * Next Permutation of a String
 * Category: recursion
 * Difficulty: Easy
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Next Permutation of a String',
        difficulty: 'Easy',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.',
        problem: 'While algorithmically similar, working with characters introduces considerations around character encoding, case sensitivity, and string immutability.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "abdc", the next permutation string is "acbd". For "dcba", wrap around to "abcd".' },
                output: 'See example',
                explanation: 'For "abdc", the next permutation string is "acbd". For "dcba", wrap around to "abcd".'
            }
        ],
        solutions: {
            python: `# Next Permutation of a String
# Category: recursion
# Difficulty: Easy
# Parent: 03-permutations/02-next-permutation

def solve():
    """
    Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.

    Key insight: While algorithmically similar, working with characters introduces considerations around character encoding, case sensitivity, and string immutability.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Next Permutation of a String problem.
// Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.
// Key insight: While algorithmically similar, working with characters introduces considerations around character encoding, case sensitivity, and string immutability.
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
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-04-next-permutation-of-a-string', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-04-next-permutation-of-a-string'] = problem;
})();
