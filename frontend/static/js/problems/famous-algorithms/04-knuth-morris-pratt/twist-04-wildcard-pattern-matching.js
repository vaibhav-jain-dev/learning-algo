/**
 * Wildcard Pattern Matching
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';
    const problem = {
        name: 'Wildcard Pattern Matching',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Modify KMP to handle patterns containing wildcard characters (?) that match any single character.',
        problem: 'Wildcards break the standard LPS computation since a ? matches anything, requiring modified failure function logic that accounts for flexible matching.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Pattern "A?B" matches "AXB", "A1B", "AAB" etc. Finding this in "AABAXB" should return positions [0,3] (if A?B matches at those positions).' },
                output: 'See example',
                explanation: 'Pattern "A?B" matches "AXB", "A1B", "AAB" etc. Finding this in "AABAXB" should return positions [0,3] (if A?B matches at those positions).'
            }
        ],
        solutions: {
            python: `# Wildcard Pattern Matching
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 04-knuth-morris-pratt

def solve():
    """
    Modify KMP to handle patterns containing wildcard characters (?) that match any single character.

    Key insight: Wildcards break the standard LPS computation since a ? matches anything, requiring modified failure function logic that accounts for flexible matching.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Wildcard Pattern Matching problem.
// Modify KMP to handle patterns containing wildcard characters (?) that match any single character.
// Key insight: Wildcards break the standard LPS computation since a ? matches anything, requiring modified failure function logic that accounts for flexible matching.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-04-wildcard-pattern-matching', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-04-wildcard-pattern-matching'] = problem;
})();
