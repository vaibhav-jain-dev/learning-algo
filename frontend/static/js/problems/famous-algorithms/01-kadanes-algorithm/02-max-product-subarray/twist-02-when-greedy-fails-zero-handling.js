/**
 * When Greedy Fails: Zero Handling
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';
    const problem = {
        name: 'When Greedy Fails: Zero Handling',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?',
        problem: 'Zero resets both maxProd and minProd to 0, effectively restarting. The twist of requiring a zero forces a completely different partitioning approach.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Array [2, 0, -3, 4]: without zero requirement, answer is 4. With zero requirement, you must include a 0, so best is [2, 0] or [0, -3, 4] = 0. Answer is 0.' },
                output: 'See example',
                explanation: 'Array [2, 0, -3, 4]: without zero requirement, answer is 4. With zero requirement, you must include a 0, so best is [2, 0] or [0, -3, 4] = 0. Answer is 0.'
            }
        ],
        solutions: {
            python: `# When Greedy Fails: Zero Handling
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 01-kadanes-algorithm/02-max-product-subarray

def solve():
    """
    Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?

    Key insight: Zero resets both maxProd and minProd to 0, effectively restarting. The twist of requiring a zero forces a completely different partitioning approach.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the When Greedy Fails: Zero Handling problem.
// Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?
// Key insight: Zero resets both maxProd and minProd to 0, effectively restarting. The twist of requiring a zero forces a completely different partitioning approach.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-02-when-greedy-fails-zero-handling', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-02-when-greedy-fails-zero-handling'] = problem;
})();
