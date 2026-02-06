/**
 * Merge Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.',
        problem: 'You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation. Each advance requires comparing the two peek values. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: merge two bst iterators.",
                  "Consider how you must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST1 [3, 1, 5], BST2 [4, 2, 6]. Merged iteration yields: 1, 2, 3, 4, 5, 6.'
            }
        ],
        solutions: {
            python: `# Merge Two BST Iterators
# Difficulty: Hard
# Parent: 11-bst-iterator
#
# Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.

def mergeTwoBstIterators(data):
    """
    Merge Two BST Iterators

    Approach: You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation.
    """
    # TODO: Implement solution
    # Key insight: You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation
    pass


# Test
if __name__ == "__main__":
    # Example: BST1 [3, 1, 5], BST2 [4, 2, 6]
    print(mergeTwoBstIterators({}))`,
            go: `package main

import "fmt"

// Merge Two BST Iterators
// Difficulty: Hard
// Parent: 11-bst-iterator
//
// Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.

func MergeTwoBstIterators(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation
    return nil
}

func main() {
    // Example: BST1 [3, 1, 5], BST2 [4, 2, 6]
    fmt.Println(MergeTwoBstIterators(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-04-merge-two-bst-iterators', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-04-merge-two-bst-iterators'] = problem;
})();
