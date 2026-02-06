/**
 * Kth Permutation Sequence
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Permutation Sequence',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'The set [1, 2, 3, ..., n] contains a total of n! unique permutations. By listing and labeling all of the permutations in order, we get the following sequence for n = 3: 1. "123" 2. "132" 3. "213" 4. "231" 5. "312" 6. "321" Given n and k, return the kth permutation sequence (1-indexed).',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "n": 3,
        "k": 3
},
        output: "213",
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=3, k=3, the result is 213.'
    }
        ],
        solutions: {
            python: `def kthPermutationSequence(data):
    """
    Kth Permutation Sequence

    Mathematical approach using factorials.
    For n numbers, there are n! permutations.
    The first digit has (n-1)! permutations for each choice.

    Time: O(n^2) due to list removal
    Space: O(n)
    """
    n = data["n"]
    k = data["k"]

    # Calculate factorials
    factorials = [1] * (n + 1)
    for i in range(1, n + 1):
        factorials[i] = factorials[i - 1] * i

    # Available numbers
    numbers = list(range(1, n + 1))

    # Convert k to 0-indexed
    k -= 1

    result = []

    for i in range(n, 0, -1):
        # How many permutations per digit at this position
        perm_count = factorials[i - 1]

        # Which digit to choose
        digit_index = k // perm_count
        result.append(str(numbers[digit_index]))

        # Remove the used digit
        numbers.pop(digit_index)

        # Update k for next position
        k %= perm_count

    return "".join(result)


# Test
if __name__ == "__main__":
    print(kthPermutationSequence({"n": 3, "k": 3}))  # Output: "213"
    print(kthPermutationSequence({"n": 4, "k": 9}))  # Output: "2314"
    print(kthPermutationSequence({"n": 3, "k": 1}))  # Output: "123"`,
            go: `package main

import (
    "fmt"
    "strconv"
    "strings"
)

// KthPermutationSequence finds the kth permutation mathematically.
// Time: O(n^2), Space: O(n)
func KthPermutationSequence(data map[string]interface{}) string {
    n := int(data["n"].(float64))
    k := int(data["k"].(float64))

    // Calculate factorials
    factorials := make([]int, n+1)
    factorials[0] = 1
    for i := 1; i <= n; i++ {
        factorials[i] = factorials[i-1] * i
    }

    // Available numbers
    numbers := make([]int, n)
    for i := 0; i < n; i++ {
        numbers[i] = i + 1
    }

    // Convert k to 0-indexed
    k--

    var result strings.Builder

    for i := n; i > 0; i-- {
        // How many permutations per digit
        permCount := factorials[i-1]

        // Which digit to choose
        digitIndex := k / permCount
        result.WriteString(strconv.Itoa(numbers[digitIndex]))

        // Remove used digit
        numbers = append(numbers[:digitIndex], numbers[digitIndex+1:]...)

        // Update k
        k %= permCount
    }

    return result.String()
}

func main() {
    fmt.Println(KthPermutationSequence(map[string]interface{}{"n": float64(3), "k": float64(3)}))  // "213"
    fmt.Println(KthPermutationSequence(map[string]interface{}{"n": float64(4), "k": float64(9)}))  // "2314"
    fmt.Println(KthPermutationSequence(map[string]interface{}{"n": float64(3), "k": float64(1)}))  // "123"
}`
        },
        twists: [
            { id: '03-permutations/03-kth-permutation/twist-01-kth-permutation-with-duplicates', name: 'Kth Permutation with Duplicates', difficulty: 'Very Hard' },
            { id: '03-permutations/03-kth-permutation/twist-02-inverse-permutation-to-rank', name: 'Inverse: Permutation to Rank', difficulty: 'Hard' },
            { id: '03-permutations/03-kth-permutation/twist-03-kth-permutation-in-reverse-order', name: 'Kth Permutation in Reverse Order', difficulty: 'Medium' },
            { id: '03-permutations/03-kth-permutation/twist-04-next-k-permutations', name: 'Next k Permutations', difficulty: 'Hard' },
            { id: '03-permutations/03-kth-permutation/twist-05-kth-permutation-of-subset', name: 'Kth Permutation of Subset', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation'] = problem;

})();
