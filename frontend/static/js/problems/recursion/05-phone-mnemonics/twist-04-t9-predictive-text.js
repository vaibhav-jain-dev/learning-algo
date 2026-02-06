/**
 * T9 Predictive Text
 * Category: recursion
 * Difficulty: Hard
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';
    const problem = {
        name: 'T9 Predictive Text',
        difficulty: 'Hard',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.',
        problem: 'Adds a segmentation/partitioning dimension on top of letter mapping -- you must decide where word boundaries are while also mapping digits to letters.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "4663" with dictionary containing "good","gone","home","hood", return matching words for different segmentations.' },
                output: 'See example',
                explanation: 'For "4663" with dictionary containing "good","gone","home","hood", return matching words for different segmentations.'
            }
        ],
        solutions: {
            python: `# T9 Predictive Text
# Category: recursion
# Difficulty: Hard
# Parent: 05-phone-mnemonics

def solve():
    """
    Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.

    Key insight: Adds a segmentation/partitioning dimension on top of letter mapping -- you must decide where word boundaries are while also mapping digits to letters.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the T9 Predictive Text problem.
// Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.
// Key insight: Adds a segmentation/partitioning dimension on top of letter mapping -- you must decide where word boundaries are while also mapping digits to letters.
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
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-04-t9-predictive-text', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-04-t9-predictive-text'] = problem;
})();
