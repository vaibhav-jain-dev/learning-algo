/**
 * Iterative BFS Approach
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative BFS Approach',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.',
        problem: 'BFS naturally processes level by level, so depth equals the number of BFS rounds. This is a fundamentally different traversal order than DFS recursion and requires queue management instead of call stack.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1, [2, [3, 4]]]: Level 0 queue: [1, [2,[3,4]]]. Level 1 queue: [2, [3,4]]. Level 2 queue: [3, 4]. Max depth = 3.' },
                output: 'See example',
                explanation: 'For [1, [2, [3, 4]]]: Level 0 queue: [1, [2,[3,4]]]. Level 1 queue: [2, [3,4]]. Level 2 queue: [3, 4]. Max depth = 3.'
            }
        ],
        solutions: {
            python: `# Iterative BFS Approach
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/01-nested-array-depth

def solve():
    """
    Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.

    Key insight: BFS naturally processes level by level, so depth equals the number of BFS rounds. This is a fundamentally different traversal order than DFS recursion and requires queue management instead of call stack.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative BFS Approach problem.
// Find maximum nesting depth using a BFS (level-order) approach with a queue, processing one level at a time. No recursion allowed.
// Key insight: BFS naturally processes level by level, so depth equals the number of BFS rounds. This is a fundamentally different traversal order than DFS recursion and requires queue management instead of call stack.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-01-iterative-bfs-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-01-iterative-bfs-approach'] = problem;
})();
