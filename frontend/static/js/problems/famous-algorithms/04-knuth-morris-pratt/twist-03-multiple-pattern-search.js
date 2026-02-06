/**
 * Multiple Pattern Search
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';
    const problem = {
        name: 'Multiple Pattern Search',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.',
        problem: 'Extends the single-pattern automaton idea to a trie-based automaton with failure links, enabling multi-pattern matching in one traversal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Find all occurrences of patterns ["he","she","his","hers"] in text "ahishers" in a single O(n+m) pass.' },
                output: 'See example',
                explanation: 'Find all occurrences of patterns ["he","she","his","hers"] in text "ahishers" in a single O(n+m) pass.'
            }
        ],
        solutions: {
            python: `# Multiple Pattern Search
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 04-knuth-morris-pratt

def solve():
    """
    Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.

    Key insight: Extends the single-pattern automaton idea to a trie-based automaton with failure links, enabling multi-pattern matching in one traversal.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Multiple Pattern Search problem.
// Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.
// Key insight: Extends the single-pattern automaton idea to a trie-based automaton with failure links, enabling multi-pattern matching in one traversal.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-03-multiple-pattern-search', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-03-multiple-pattern-search'] = problem;
})();
