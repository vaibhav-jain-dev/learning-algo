/**
 * List All Paths
 * Category: recursion
 * Difficulty: Medium
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'List All Paths',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Instead of counting the number of ways, return all distinct sequences of steps that reach the top.',
        problem: 'Shifts from counting to enumeration, requiring actual path construction and storage rather than just accumulating a count.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For height=3, maxSteps=2, return [[1,1,1],[1,2],[2,1]] -- all step sequences that sum to 3.' },
                output: 'See example',
                explanation: 'For height=3, maxSteps=2, return [[1,1,1],[1,2],[2,1]] -- all step sequences that sum to 3.'
            }
        ],
        solutions: {
            python: `# List All Paths
# Category: recursion
# Difficulty: Medium
# Parent: 06-staircase-traversal

def solve():
    """
    Instead of counting the number of ways, return all distinct sequences of steps that reach the top.

    Key insight: Shifts from counting to enumeration, requiring actual path construction and storage rather than just accumulating a count.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the List All Paths problem.
// Instead of counting the number of ways, return all distinct sequences of steps that reach the top.
// Key insight: Shifts from counting to enumeration, requiring actual path construction and storage rather than just accumulating a count.
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
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-02-list-all-paths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-02-list-all-paths'] = problem;
})();
