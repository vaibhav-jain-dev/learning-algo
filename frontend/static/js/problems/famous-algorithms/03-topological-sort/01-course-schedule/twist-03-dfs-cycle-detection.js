/**
 * DFS Cycle Detection
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'DFS Cycle Detection',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.',
        problem: 'Uses a fundamentally different cycle detection method -- white/gray/black coloring where finding a gray node during DFS indicates a back edge (cycle).',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Color nodes white (unvisited), gray (in progress), black (done). If DFS visits a gray node, a cycle exists.' },
                output: 'See example',
                explanation: 'Color nodes white (unvisited), gray (in progress), black (done). If DFS visits a gray node, a cycle exists.'
            }
        ],
        solutions: {
            python: `# DFS Cycle Detection
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 03-topological-sort/01-course-schedule

def solve():
    """
    Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.

    Key insight: Uses a fundamentally different cycle detection method -- white/gray/black coloring where finding a gray node during DFS indicates a back edge (cycle).
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the DFS Cycle Detection problem.
// Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.
// Key insight: Uses a fundamentally different cycle detection method -- white/gray/black coloring where finding a gray node during DFS indicates a back edge (cycle).
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-03-dfs-cycle-detection', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-03-dfs-cycle-detection'] = problem;
})();
