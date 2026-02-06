/**
 * BST Iterator with Skip
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST Iterator with Skip',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.',
        problem: 'Simple iteration is O(1) amortized per step. Skip requires potentially jumping over many nodes efficiently, using BST search properties to prune the stack rather than iterating one by one. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst iterator with skip.",
                  "Consider how simple iteration is o(1) amortized per step affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [10, 5, 15, 3, 7, 12, 20]. After skip(11), next() returns 12, then next() returns 15. The nodes 3, 5, 7, 10 were skipped without visiting each one.'
            }
        ],
        solutions: {
            python: `# BST Iterator with Skip
# Difficulty: Hard
# Parent: 11-bst-iterator
#
# Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.

def bstIteratorWithSkip(data):
    """
    BST Iterator with Skip

    Approach: Simple iteration is O(1) amortized per step.
    """
    # TODO: Implement solution
    # Key insight: Simple iteration is O(1) amortized per step
    pass


# Test
if __name__ == "__main__":
    # Example: BST [10, 5, 15, 3, 7, 12, 20]
    print(bstIteratorWithSkip({}))`,
            go: `package main

import "fmt"

// BST Iterator with Skip
// Difficulty: Hard
// Parent: 11-bst-iterator
//
// Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.

func BstIteratorWithSkip(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Simple iteration is O(1) amortized per step
    return nil
}

func main() {
    // Example: BST [10, 5, 15, 3, 7, 12, 20]
    fmt.Println(BstIteratorWithSkip(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-05-bst-iterator-with-skip', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-05-bst-iterator-with-skip'] = problem;
})();
