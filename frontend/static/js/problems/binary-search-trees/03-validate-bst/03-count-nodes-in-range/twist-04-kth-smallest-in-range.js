/**
 * Kth Smallest in Range
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Smallest in Range',
        difficulty: 'Medium',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Instead of counting all nodes in range, find the kth smallest value within the range [low, high].',
        problem: 'You need to enumerate values in order within the range and stop at the kth one. This combines range pruning with order-statistic logic, and you must handle the case where fewer than k values exist in the range. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: kth smallest in range.",
                  "Consider how you need to enumerate values in order within the range and stop at the kth one affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,3,7,12,20], range=[3,15], k=3 -> Values in range sorted: [3,5,7,10,12,15], 3rd smallest is 7.'
            }
        ],
        solutions: {
            python: `# Kth Smallest in Range
# Difficulty: Medium
# Parent: 03-validate-bst/03-count-nodes-in-range
#
# Instead of counting all nodes in range, find the kth smallest value within the range [low, high].

def kthSmallestInRange(data):
    """
    Kth Smallest in Range

    Approach: You need to enumerate values in order within the range and stop at the kth one.
    """
    # TODO: Implement solution
    # Key insight: You need to enumerate values in order within the range and stop at the kth one
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,3,7,12,20], range=[3,15], k=3 -> Values in range sorted: [3,5,7,10,12,15], 3rd smallest is 7
    print(kthSmallestInRange({}))`,
            go: `package main

import "fmt"

// Kth Smallest in Range
// Difficulty: Medium
// Parent: 03-validate-bst/03-count-nodes-in-range
//
// Instead of counting all nodes in range, find the kth smallest value within the range [low, high].

func KthSmallestInRange(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You need to enumerate values in order within the range and stop at the kth one
    return nil
}

func main() {
    // Example: Tree: [10,5,15,3,7,12,20], range=[3,15], k=3 -> Values in range sorted: [3,5,7,10,12,15], 3rd smallest is 7
    fmt.Println(KthSmallestInRange(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-04-kth-smallest-in-range', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-04-kth-smallest-in-range'] = problem;
})();
