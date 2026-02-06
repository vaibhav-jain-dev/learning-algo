/**
 * Prim vs Kruskal Comparison
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 06-kruskals-algorithm/01-min-cost-to-connect
 */
(function() {
    'use strict';
    const problem = {
        name: 'Prim vs Kruskal Comparison',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/01-min-cost-to-connect',
        description: 'Solve the same problem using Prim\'s algorithm and compare the performance characteristics with Kruskal\'s approach.',
        problem: 'Prim\'s grows a single tree from a starting vertex using a priority queue, while Kruskal\'s sorts all edges globally. Dense graphs (like this one with O(n^2) edges) may favor Prim\'s.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 5 points generating 10 edges, Kruskal sorts all 10 edges then processes them. Prim starts from one point and greedily extends.' },
                output: 'See example',
                explanation: 'For 5 points generating 10 edges, Kruskal sorts all 10 edges then processes them. Prim starts from one point and greedily extends.'
            }
        ],
        solutions: {
            python: `# Prim vs Kruskal Comparison
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 06-kruskals-algorithm/01-min-cost-to-connect

def solve():
    """
    Solve the same problem using Prim's algorithm and compare the performance characteristics with Kruskal's approach.

    Key insight: Prim's grows a single tree from a starting vertex using a priority queue, while Kruskal's sorts all edges globally. Dense graphs (like this one with O(n^2) edges) may favor Prim's.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Prim vs Kruskal Comparison problem.
// Solve the same problem using Prim's algorithm and compare the performance characteristics with Kruskal's approach.
// Key insight: Prim's grows a single tree from a starting vertex using a priority queue, while Kruskal's sorts all edges globally. Dense graphs (like this one with O(n^2) edges) may favor Prim's.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect/twist-01-prim-vs-kruskal-comparison', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect/twist-01-prim-vs-kruskal-comparison'] = problem;
})();
