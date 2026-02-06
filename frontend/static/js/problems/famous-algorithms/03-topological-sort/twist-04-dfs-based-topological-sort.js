/**
 * DFS-Based Topological Sort
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';
    const problem = {
        name: 'DFS-Based Topological Sort',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Implement topological sort using DFS with post-order reversal instead of the BFS Kahn approach.',
        problem: 'Uses a completely different algorithmic paradigm -- DFS finishes nodes in reverse topological order, requiring a stack to collect the reversed result.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Run DFS, push nodes to stack after all descendants are processed, then pop the stack for the topological order.' },
                output: 'See example',
                explanation: 'Run DFS, push nodes to stack after all descendants are processed, then pop the stack for the topological order.'
            }
        ],
        solutions: {
            python: `# DFS-Based Topological Sort
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort

def solve():
    """
    Implement topological sort using DFS with post-order reversal instead of the BFS Kahn approach.

    Key insight: Uses a completely different algorithmic paradigm -- DFS finishes nodes in reverse topological order, requiring a stack to collect the reversed result.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the DFS-Based Topological Sort problem.
// Implement topological sort using DFS with post-order reversal instead of the BFS Kahn approach.
// Key insight: Uses a completely different algorithmic paradigm -- DFS finishes nodes in reverse topological order, requiring a stack to collect the reversed result.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-04-dfs-based-topological-sort', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-04-dfs-based-topological-sort'] = problem;
})();
