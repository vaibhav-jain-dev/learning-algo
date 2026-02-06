/**
 * Circular Staircase
 * Category: recursion
 * Difficulty: Hard
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Staircase',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.',
        problem: 'Introduces modular arithmetic into the recurrence, fundamentally changing the problem from a linear DP to one involving cycles.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For height=4 (circular), maxSteps=2, exactly k=5 total step units: count paths that wrap around once.' },
                output: 'See example',
                explanation: 'For height=4 (circular), maxSteps=2, exactly k=5 total step units: count paths that wrap around once.'
            }
        ],
        solutions: {
            python: `# Circular Staircase
# Category: recursion
# Difficulty: Hard
# Parent: 06-staircase-traversal

def solve():
    """
    The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.

    Key insight: Introduces modular arithmetic into the recurrence, fundamentally changing the problem from a linear DP to one involving cycles.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Circular Staircase problem.
// The staircase wraps around -- after reaching the top, you continue from step 0 again. Count paths that take exactly k total steps.
// Key insight: Introduces modular arithmetic into the recurrence, fundamentally changing the problem from a linear DP to one involving cycles.
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
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-04-circular-staircase', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-04-circular-staircase'] = problem;
})();
