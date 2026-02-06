/**
 * DFS/BFS Graph Approach
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 05-union-find/03-accounts-merge
 */
(function() {
    'use strict';
    const problem = {
        name: 'DFS/BFS Graph Approach',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find/03-accounts-merge',
        description: 'Solve accounts merge using a graph where emails are nodes and same-account emails have edges, then find connected components via DFS.',
        problem: 'Builds an explicit adjacency list graph and traverses it, which is conceptually different from the implicit grouping done by Union-Find.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Build graph: a@m.co -- b@m.co (account 1), a@m.co -- d@m.co (account 3). DFS from a@m.co finds {a,b,d}.' },
                output: 'See example',
                explanation: 'Build graph: a@m.co -- b@m.co (account 1), a@m.co -- d@m.co (account 3). DFS from a@m.co finds {a,b,d}.'
            }
        ],
        solutions: {
            python: `# DFS/BFS Graph Approach
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 05-union-find/03-accounts-merge

def solve():
    """
    Solve accounts merge using a graph where emails are nodes and same-account emails have edges, then find connected components via DFS.

    Key insight: Builds an explicit adjacency list graph and traverses it, which is conceptually different from the implicit grouping done by Union-Find.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the DFS/BFS Graph Approach problem.
// Solve accounts merge using a graph where emails are nodes and same-account emails have edges, then find connected components via DFS.
// Key insight: Builds an explicit adjacency list graph and traverses it, which is conceptually different from the implicit grouping done by Union-Find.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/03-accounts-merge/twist-01-dfs-bfs-graph-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/03-accounts-merge/twist-01-dfs-bfs-graph-approach'] = problem;
})();
