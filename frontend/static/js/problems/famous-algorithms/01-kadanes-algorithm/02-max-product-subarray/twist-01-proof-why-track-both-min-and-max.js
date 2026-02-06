/**
 * Proof: Why Track Both Min and Max
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';
    const problem = {
        name: 'Proof: Why Track Both Min and Max',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].',
        problem: 'Unlike sum where negative extensions are always bad, a negative product can become the maximum after multiplying by another negative. You must formally argue why two variables suffice.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Array [-2, 3, -4]: at index 2, maxProd[1]=3, minProd[1]=-6. Products: -4, 3*(-4)=-12, (-6)*(-4)=24. Max is 24, which comes from minProd. This proves min tracking is essential.' },
                output: 'See example',
                explanation: 'Array [-2, 3, -4]: at index 2, maxProd[1]=3, minProd[1]=-6. Products: -4, 3*(-4)=-12, (-6)*(-4)=24. Max is 24, which comes from minProd. This proves min tracking is essential.'
            }
        ],
        solutions: {
            python: `# Proof: Why Track Both Min and Max
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 01-kadanes-algorithm/02-max-product-subarray

def solve():
    """
    Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].

    Key insight: Unlike sum where negative extensions are always bad, a negative product can become the maximum after multiplying by another negative. You must formally argue why two variables suffice.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof: Why Track Both Min and Max problem.
// Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].
// Key insight: Unlike sum where negative extensions are always bad, a negative product can become the maximum after multiplying by another negative. You must formally argue why two variables suffice.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-01-proof-why-track-both-min-and-max', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-01-proof-why-track-both-min-and-max'] = problem;
})();
