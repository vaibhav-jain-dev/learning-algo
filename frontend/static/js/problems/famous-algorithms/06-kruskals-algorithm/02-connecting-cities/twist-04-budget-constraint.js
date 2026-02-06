/**
 * Budget Constraint
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';
    const problem = {
        name: 'Budget Constraint',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'You have a fixed budget B. Find the maximum number of cities that can be connected (in one component) within the budget.',
        problem: 'Cannot simply build the MST -- must decide which subset of edges to include under a budget constraint, potentially a variant of the prize-collecting MST problem.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With budget 10 and connections [[1,2,5],[1,3,6],[2,3,1]], you can connect cities 2,3 (cost 1) then 1,2 (cost 5) for total 6, connecting all 3 cities.' },
                output: 'See example',
                explanation: 'With budget 10 and connections [[1,2,5],[1,3,6],[2,3,1]], you can connect cities 2,3 (cost 1) then 1,2 (cost 5) for total 6, connecting all 3 cities.'
            }
        ],
        solutions: {
            python: `# Budget Constraint
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/02-connecting-cities

def solve():
    """
    You have a fixed budget B. Find the maximum number of cities that can be connected (in one component) within the budget.

    Key insight: Cannot simply build the MST -- must decide which subset of edges to include under a budget constraint, potentially a variant of the prize-collecting MST problem.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Budget Constraint problem.
// You have a fixed budget B. Find the maximum number of cities that can be connected (in one component) within the budget.
// Key insight: Cannot simply build the MST -- must decide which subset of edges to include under a budget constraint, potentially a variant of the prize-collecting MST problem.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-04-budget-constraint', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-04-budget-constraint'] = problem;
})();
