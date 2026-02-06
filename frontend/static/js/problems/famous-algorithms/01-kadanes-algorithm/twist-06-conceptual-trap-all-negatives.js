/**
 * Conceptual Trap: All Negatives
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: All Negatives',
        difficulty: 'Easy',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'What does Kadane\'s return when all elements are negative? Some implementations incorrectly return 0. Trace through your algorithm with [-3, -5, -1, -8] and ensure it returns -1, not 0.',
        problem: 'Exposes a common implementation bug where maxSoFar is initialized to 0 instead of the first element, or where maxEndingHere is clamped to 0. Forces careful thinking about initialization.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Input: [-3, -5, -1, -8]. Correct output: -1 (just the element -1 by itself). Wrong output: 0 (if you initialize maxSoFar = 0 and clamp maxEndingHere to 0).' },
                output: 'See example',
                explanation: 'Input: [-3, -5, -1, -8]. Correct output: -1 (just the element -1 by itself). Wrong output: 0 (if you initialize maxSoFar = 0 and clamp maxEndingHere to 0).'
            }
        ],
        solutions: {
            python: `# Conceptual Trap: All Negatives
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 01-kadanes-algorithm

def solve():
    """
    What does Kadane's return when all elements are negative? Some implementations incorrectly return 0. Trace through your algorithm with [-3, -5, -1, -8] and ensure it returns -1, not 0.

    Key insight: Exposes a common implementation bug where maxSoFar is initialized to 0 instead of the first element, or where maxEndingHere is clamped to 0. Forces careful thinking about initialization.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Conceptual Trap: All Negatives problem.
// What does Kadane's return when all elements are negative? Some implementations incorrectly return 0. Trace through your algorithm with [-3, -5, -1, -8] and ensure it returns -1, not 0.
// Key insight: Exposes a common implementation bug where maxSoFar is initialized to 0 instead of the first element, or where maxEndingHere is clamped to 0. Forces careful thinking about initialization.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-06-conceptual-trap-all-negatives', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-06-conceptual-trap-all-negatives'] = problem;
})();
