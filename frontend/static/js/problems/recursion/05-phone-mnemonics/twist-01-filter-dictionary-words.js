/**
 * Filter Dictionary Words
 * Category: recursion
 * Difficulty: Hard
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';
    const problem = {
        name: 'Filter Dictionary Words',
        difficulty: 'Hard',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Instead of returning all letter combinations, return only those that form valid English dictionary words.',
        problem: 'Requires integrating a trie or set lookup into the recursion, pruning branches early when no dictionary word starts with the current prefix.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "228", instead of all 27 combinations, return only valid words like ["bat","cat","act"] from a dictionary.' },
                output: 'See example',
                explanation: 'For "228", instead of all 27 combinations, return only valid words like ["bat","cat","act"] from a dictionary.'
            }
        ],
        solutions: {
            python: `# Filter Dictionary Words
# Category: recursion
# Difficulty: Hard
# Parent: 05-phone-mnemonics

def solve():
    """
    Instead of returning all letter combinations, return only those that form valid English dictionary words.

    Key insight: Requires integrating a trie or set lookup into the recursion, pruning branches early when no dictionary word starts with the current prefix.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Filter Dictionary Words problem.
// Instead of returning all letter combinations, return only those that form valid English dictionary words.
// Key insight: Requires integrating a trie or set lookup into the recursion, pruning branches early when no dictionary word starts with the current prefix.
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
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-01-filter-dictionary-words', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-01-filter-dictionary-words'] = problem;
})();
