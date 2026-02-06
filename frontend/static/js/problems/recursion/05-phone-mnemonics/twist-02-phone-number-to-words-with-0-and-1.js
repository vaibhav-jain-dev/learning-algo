/**
 * Phone Number to Words with 0 and 1
 * Category: recursion
 * Difficulty: Medium
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';
    const problem = {
        name: 'Phone Number to Words with 0 and 1',
        difficulty: 'Medium',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.',
        problem: 'Introduces variable-length branching -- some digits produce 0 characters while others produce 3-4, complicating the recursion structure.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "201", output includes ["a ","b ","c "] where the space comes from 0 and 1 contributes nothing.' },
                output: 'See example',
                explanation: 'For "201", output includes ["a ","b ","c "] where the space comes from 0 and 1 contributes nothing.'
            }
        ],
        solutions: {
            python: `# Phone Number to Words with 0 and 1
# Category: recursion
# Difficulty: Medium
# Parent: 05-phone-mnemonics

def solve():
    """
    Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.

    Key insight: Introduces variable-length branching -- some digits produce 0 characters while others produce 3-4, complicating the recursion structure.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Phone Number to Words with 0 and 1 problem.
// Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.
// Key insight: Introduces variable-length branching -- some digits produce 0 characters while others produce 3-4, complicating the recursion structure.
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
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-02-phone-number-to-words-with-0-and-1', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-02-phone-number-to-words-with-0-and-1'] = problem;
})();
