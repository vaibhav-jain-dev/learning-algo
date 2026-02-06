/**
 * Modular Arithmetic Pitfalls
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Modular Arithmetic Pitfalls',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?',
        problem: 'This is a conceptual trap about numerical overflow. (10^9+7)^2 exceeds 2^63, causing overflow in languages with fixed-width integers. You must apply mod after each multiplication, not just at the end.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: '(10^9+6) * (10^9+6) = ~10^18, which fits in int64. But if intermediate sums of products exceed 2^63 ~= 9.2*10^18, overflow occurs. Solution: mod after each multiply-add.' },
                output: 'See example',
                explanation: '(10^9+6) * (10^9+6) = ~10^18, which fits in int64. But if intermediate sums of products exceed 2^63 ~= 9.2*10^18, overflow occurs. Solution: mod after each multiply-add.'
            }
        ],
        solutions: {
            python: `# Modular Arithmetic Pitfalls
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci/03-matrix-fibonacci

def solve():
    """
    When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?

    Key insight: This is a conceptual trap about numerical overflow. (10^9+7)^2 exceeds 2^63, causing overflow in languages with fixed-width integers. You must apply mod after each multiplication, not just at the end.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Modular Arithmetic Pitfalls problem.
// When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?
// Key insight: This is a conceptual trap about numerical overflow. (10^9+7)^2 exceeds 2^63, causing overflow in languages with fixed-width integers. You must apply mod after each multiplication, not just at the end.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-03-modular-arithmetic-pitfalls', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-03-modular-arithmetic-pitfalls'] = problem;
})();
