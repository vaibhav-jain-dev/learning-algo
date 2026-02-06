/**
 * Circular Permutations
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate unique circular permutations where rotations of the same arrangement are considered identical.',
        problem: 'Adds equivalence class reasoning on top of duplicate handling. You must fix one element to break rotational symmetry while still skipping duplicates.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,1,2], circular permutations are [1,1,2] and [1,2,1] only (since [2,1,1] is a rotation of [1,1,2]).' },
                output: 'See example',
                explanation: 'For [1,1,2], circular permutations are [1,1,2] and [1,2,1] only (since [2,1,1] is a rotation of [1,1,2]).'
            }
        ],
        solutions: {
            python: `# Circular Permutations
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/01-permutations-with-duplicates

def solve():
    """
    Generate unique circular permutations where rotations of the same arrangement are considered identical.

    Key insight: Adds equivalence class reasoning on top of duplicate handling. You must fix one element to break rotational symmetry while still skipping duplicates.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Circular Permutations problem.
// Generate unique circular permutations where rotations of the same arrangement are considered identical.
// Key insight: Adds equivalence class reasoning on top of duplicate handling. You must fix one element to break rotational symmetry while still skipping duplicates.
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-04-circular-permutations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-04-circular-permutations'] = problem;
})();
