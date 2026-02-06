/**
 * Count Only
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Only',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Instead of generating all unique permutations, return only the count of unique permutations without building them.',
        problem: 'Shifts from backtracking enumeration to a mathematical/combinatorial counting approach using factorial division by duplicate counts.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,1,2], return 3 instead of [[1,1,2],[1,2,1],[2,1,1]]. Use formula n!/(k1!*k2!*...) = 3!/(2!*1!) = 3.' },
                output: 'See example',
                explanation: 'For [1,1,2], return 3 instead of [[1,1,2],[1,2,1],[2,1,1]]. Use formula n!/(k1!*k2!*...) = 3!/(2!*1!) = 3.'
            }
        ],
        solutions: {
            python: `# Count Only
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations/01-permutations-with-duplicates

def solve():
    """
    Instead of generating all unique permutations, return only the count of unique permutations without building them.

    Key insight: Shifts from backtracking enumeration to a mathematical/combinatorial counting approach using factorial division by duplicate counts.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Only problem.
// Instead of generating all unique permutations, return only the count of unique permutations without building them.
// Key insight: Shifts from backtracking enumeration to a mathematical/combinatorial counting approach using factorial division by duplicate counts.
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-01-count-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-01-count-only'] = problem;
})();
