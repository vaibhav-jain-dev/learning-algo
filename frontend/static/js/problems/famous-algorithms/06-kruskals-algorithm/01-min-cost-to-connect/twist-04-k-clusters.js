/**
 * K Clusters
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/01-min-cost-to-connect
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Clusters',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/01-min-cost-to-connect',
        description: 'Instead of connecting all points, stop Kruskal\'s early to form exactly k clusters, maximizing the minimum inter-cluster distance.',
        problem: 'Runs Kruskal\'s but stops after adding n-k edges instead of n-1, effectively creating k connected components. The next edge weight is the inter-cluster spacing.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 10 points with k=3, add only 7 MST edges. The remaining 3 components are the clusters with maximum spacing between them.' },
                output: 'See example',
                explanation: 'For 10 points with k=3, add only 7 MST edges. The remaining 3 components are the clusters with maximum spacing between them.'
            }
        ],
        solutions: {
            python: `# K Clusters
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/01-min-cost-to-connect

def solve():
    """
    Instead of connecting all points, stop Kruskal's early to form exactly k clusters, maximizing the minimum inter-cluster distance.

    Key insight: Runs Kruskal's but stops after adding n-k edges instead of n-1, effectively creating k connected components. The next edge weight is the inter-cluster spacing.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the K Clusters problem.
// Instead of connecting all points, stop Kruskal's early to form exactly k clusters, maximizing the minimum inter-cluster distance.
// Key insight: Runs Kruskal's but stops after adding n-k edges instead of n-1, effectively creating k connected components. The next edge weight is the inter-cluster spacing.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect/twist-04-k-clusters', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect/twist-04-k-clusters'] = problem;
})();
