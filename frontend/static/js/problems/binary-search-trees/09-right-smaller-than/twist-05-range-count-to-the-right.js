/**
 * Range Count to the Right
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Count to the Right',
        difficulty: 'Very Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.',
        problem: 'Instead of counting all smaller elements, you need a range query. The augmented BST must support rank queries for both a lower and upper bound, and the count is the difference between two rank lookups. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range count to the right.",
                  "Consider how instead of counting all smaller elements, you need a range query affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [8, 5, 11, -1, 3, 4, 2] with k=2, element 5 asks: how many to the right are in [3, 7]? Answer: 2 (values 3 and 4).'
            }
        ],
        solutions: {
            python: `# Range Count to the Right
# Difficulty: Very Hard
# Parent: 09-right-smaller-than
#
# For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.

def rangeCountToTheRight(data):
    """
    Range Count to the Right

    Approach: Instead of counting all smaller elements, you need a range query.
    """
    # TODO: Implement solution
    # Key insight: Instead of counting all smaller elements, you need a range query
    pass


# Test
if __name__ == "__main__":
    # Example: For [8, 5, 11, -1, 3, 4, 2] with k=2, element 5 asks: how many to the right are in [3, 7]? Answer: 2 (values 3 and 4)
    print(rangeCountToTheRight({}))`,
            go: `package main

import "fmt"

// Range Count to the Right
// Difficulty: Very Hard
// Parent: 09-right-smaller-than
//
// For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.

func RangeCountToTheRight(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of counting all smaller elements, you need a range query
    return nil
}

func main() {
    // Example: For [8, 5, 11, -1, 3, 4, 2] with k=2, element 5 asks: how many to the right are in [3, 7]? Answer: 2 (values 3 and 4)
    fmt.Println(RangeCountToTheRight(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-05-range-count-to-the-right', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-05-range-count-to-the-right'] = problem;
})();
