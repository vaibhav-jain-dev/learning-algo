/**
 * Subsets of Fixed Size k
 * Category: recursion
 * Difficulty: Medium
 * Parent: 04-powerset
 */
(function() {
    'use strict';
    const problem = {
        name: 'Subsets of Fixed Size k',
        difficulty: 'Medium',
        algorithm: 'recursion-powerset',
        parent: '04-powerset',
        description: 'Instead of all subsets, generate only subsets of exactly size k from the array.',
        problem: 'Changes the recursion from unbounded include/exclude to a combination-selection pattern with a target size constraint, pruning branches early when insufficient elements remain.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3,4] with k=2, return [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]].' },
                output: 'See example',
                explanation: 'For [1,2,3,4] with k=2, return [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]].'
            }
        ],
        solutions: {
            python: `# Subsets of Fixed Size k
# Category: recursion
# Difficulty: Medium
# Parent: 04-powerset

def solve():
    """
    Instead of all subsets, generate only subsets of exactly size k from the array.

    Key insight: Changes the recursion from unbounded include/exclude to a combination-selection pattern with a target size constraint, pruning branches early when insufficient elements remain.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Subsets of Fixed Size k problem.
// Instead of all subsets, generate only subsets of exactly size k from the array.
// Key insight: Changes the recursion from unbounded include/exclude to a combination-selection pattern with a target size constraint, pruning branches early when insufficient elements remain.
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
        window.ProblemRenderer.register('recursion', '04-powerset/twist-02-subsets-of-fixed-size-k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset/twist-02-subsets-of-fixed-size-k'] = problem;
})();
