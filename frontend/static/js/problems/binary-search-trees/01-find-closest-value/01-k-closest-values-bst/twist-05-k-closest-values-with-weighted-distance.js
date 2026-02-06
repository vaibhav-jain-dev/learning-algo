/**
 * K Closest Values with Weighted Distance
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 01-find-closest-value/01-k-closest-values-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Closest Values with Weighted Distance',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/01-k-closest-values-bst',
        description: 'Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.',
        problem: 'The BST ordering property no longer directly correlates with closeness since depth affects the metric. You cannot use simple pruning rules and may need to explore both subtrees. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: k closest values with weighted distance.",
                  "Consider how the bst ordering property no longer directly correlates with closeness since depth affects the metric affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15], target=12. Node 10 (depth 0): |10-12|*1.0=2.0. Node 15 (depth 1): |15-12|*1.1=3.3. Node 5 (depth 1): |5-12|*1.1=7.7.'
            }
        ],
        solutions: {
            python: `# K Closest Values with Weighted Distance
# Difficulty: Hard
# Parent: 01-find-closest-value/01-k-closest-values-bst
#
# Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.

def kClosestValuesWithWeightedDistance(data):
    """
    K Closest Values with Weighted Distance

    Approach: The BST ordering property no longer directly correlates with closeness since depth affects the metric.
    """
    # TODO: Implement solution
    # Key insight: The BST ordering property no longer directly correlates with closeness since depth affects the metric
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15], target=12
    print(kClosestValuesWithWeightedDistance({}))`,
            go: `package main

import "fmt"

// K Closest Values with Weighted Distance
// Difficulty: Hard
// Parent: 01-find-closest-value/01-k-closest-values-bst
//
// Instead of absolute difference, use a weighted distance where nodes deeper in the tree cost more: distance = |value - target| * (1 + depth * 0.1). Find k values with smallest weighted distance.

func KClosestValuesWithWeightedDistance(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The BST ordering property no longer directly correlates with closeness since depth affects the metric
    return nil
}

func main() {
    // Example: Tree: [10,5,15], target=12
    fmt.Println(KClosestValuesWithWeightedDistance(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst/twist-05-k-closest-values-with-weighted-distance', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst/twist-05-k-closest-values-with-weighted-distance'] = problem;
})();
