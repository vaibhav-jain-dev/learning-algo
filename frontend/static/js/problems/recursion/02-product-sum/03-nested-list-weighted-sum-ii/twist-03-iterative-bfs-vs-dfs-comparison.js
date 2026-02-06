/**
 * Iterative BFS vs DFS Comparison
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/03-nested-list-weighted-sum-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative BFS vs DFS Comparison',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/03-nested-list-weighted-sum-ii',
        description: 'Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.',
        problem: 'BFS naturally processes all elements at each depth level together, making the accumulation trick straightforward. DFS processes elements depth-first, requiring you to track depth per element, which is less elegant for this problem.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'BFS for [[1,1],2,[1,1]]: Level 1 has [2], sum=2. Level 2 has [1,1,1,1], sum=4. Running total: after L1=2, after L2=2+6=8. DFS would need to tag each value with its depth.' },
                output: 'See example',
                explanation: 'BFS for [[1,1],2,[1,1]]: Level 1 has [2], sum=2. Level 2 has [1,1,1,1], sum=4. Running total: after L1=2, after L2=2+6=8. DFS would need to tag each value with its depth.'
            }
        ],
        solutions: {
            python: `# Iterative BFS vs DFS Comparison
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/03-nested-list-weighted-sum-ii

def solve():
    """
    Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.

    Key insight: BFS naturally processes all elements at each depth level together, making the accumulation trick straightforward. DFS processes elements depth-first, requiring you to track depth per element, which is less elegant for this problem.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative BFS vs DFS Comparison problem.
// Implement both a BFS (queue-based, level-order) and a DFS (stack-based) iterative solution. Explain why BFS is more natural for this problem.
// Key insight: BFS naturally processes all elements at each depth level together, making the accumulation trick straightforward. DFS processes elements depth-first, requiring you to track depth per element, which is less elegant for this problem.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii/twist-03-iterative-bfs-vs-dfs-comparison', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii/twist-03-iterative-bfs-vs-dfs-comparison'] = problem;
})();
