/**
 * Backtracking with Swap Method
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Backtracking with Swap Method',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Instead of building permutations by choosing from remaining elements, use the swap-based backtracking approach: for position i, swap element i with each element j >= i, recurse, then swap back.',
        problem: 'The swap method avoids creating new arrays or maintaining a "used" set. It modifies the array in-place, which is more space-efficient but requires careful backtracking (unswapping) to restore state.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3]: fix pos 0: swap(0,0)->[1,2,3], swap(0,1)->[2,1,3], swap(0,2)->[3,2,1]. For each, recurse on positions 1..n. Unswap after each recursive return.' },
                output: 'See example',
                explanation: 'For [1,2,3]: fix pos 0: swap(0,0)->[1,2,3], swap(0,1)->[2,1,3], swap(0,2)->[3,2,1]. For each, recurse on positions 1..n. Unswap after each recursive return.'
            }
        ],
        solutions: {
            python: `# Backtracking with Swap Method
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations

def solve():
    """
    Instead of building permutations by choosing from remaining elements, use the swap-based backtracking approach: for position i, swap element i with each element j >= i, recurse, then swap back.

    Key insight: The swap method avoids creating new arrays or maintaining a "used" set. It modifies the array in-place, which is more space-efficient but requires careful backtracking (unswapping) to restore state.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Backtracking with Swap Method problem.
// Instead of building permutations by choosing from remaining elements, use the swap-based backtracking approach: for position i, swap element i with each element j >= i, recurse, then swap back.
// Key insight: The swap method avoids creating new arrays or maintaining a "used" set. It modifies the array in-place, which is more space-efficient but requires careful backtracking (unswapping) to restore state.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-04-backtracking-with-swap-method', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-04-backtracking-with-swap-method'] = problem;
})();
