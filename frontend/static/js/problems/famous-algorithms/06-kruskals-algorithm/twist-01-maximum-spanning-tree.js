/**
 * Maximum Spanning Tree
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Spanning Tree',
        difficulty: 'Easy',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the Maximum Spanning Tree instead of the Minimum Spanning Tree by selecting the heaviest edges first.',
        problem: 'Simply reverses the sorting order from ascending to descending, but understanding why this produces the maximum spanning tree requires reasoning about the cut property in reverse.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For edges with weights [1,3,5,7,9], sort descending and greedily pick the heaviest non-cycle-creating edges.' },
                output: 'See example',
                explanation: 'For edges with weights [1,3,5,7,9], sort descending and greedily pick the heaviest non-cycle-creating edges.'
            }
        ],
        solutions: {
            python: `# Maximum Spanning Tree
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 06-kruskals-algorithm

def solve():
    """
    Find the Maximum Spanning Tree instead of the Minimum Spanning Tree by selecting the heaviest edges first.

    Key insight: Simply reverses the sorting order from ascending to descending, but understanding why this produces the maximum spanning tree requires reasoning about the cut property in reverse.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Maximum Spanning Tree problem.
// Find the Maximum Spanning Tree instead of the Minimum Spanning Tree by selecting the heaviest edges first.
// Key insight: Simply reverses the sorting order from ascending to descending, but understanding why this produces the maximum spanning tree requires reasoning about the cut property in reverse.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-01-maximum-spanning-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-01-maximum-spanning-tree'] = problem;
})();
