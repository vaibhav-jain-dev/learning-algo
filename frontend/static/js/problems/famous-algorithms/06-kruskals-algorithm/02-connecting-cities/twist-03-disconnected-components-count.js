/**
 * Disconnected Components Count
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';
    const problem = {
        name: 'Disconnected Components Count',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'If not all cities can be connected, return the number of disconnected groups instead of -1.',
        problem: 'Changes the output from a failure indicator to useful information -- count the remaining distinct Union-Find roots after processing all edges.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 5 cities where only {1,2,3} and {4,5} are internally connected, return 2 groups instead of -1.' },
                output: 'See example',
                explanation: 'For 5 cities where only {1,2,3} and {4,5} are internally connected, return 2 groups instead of -1.'
            }
        ],
        solutions: {
            python: `# Disconnected Components Count
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 06-kruskals-algorithm/02-connecting-cities

def solve():
    """
    If not all cities can be connected, return the number of disconnected groups instead of -1.

    Key insight: Changes the output from a failure indicator to useful information -- count the remaining distinct Union-Find roots after processing all edges.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Disconnected Components Count problem.
// If not all cities can be connected, return the number of disconnected groups instead of -1.
// Key insight: Changes the output from a failure indicator to useful information -- count the remaining distinct Union-Find roots after processing all edges.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-03-disconnected-components-count', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-03-disconnected-components-count'] = problem;
})();
