/**
 * Sum BSTs Including Empty Subtrees
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum BSTs Including Empty Subtrees',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.',
        problem: 'The original problem considers single nodes as minimal BSTs. Including empty trees as base cases changes the counting in subtle ways and tests your understanding of the recursive base case definition. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: sum bsts including empty subtrees.",
                  "Consider how the original problem considers single nodes as minimal bsts affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'A leaf node has two null children, both are trivially valid BSTs. The sum contributed is still just the leaf value, but the count of BST subtrees increases by 2 for each leaf.'
            }
        ],
        solutions: {
            python: `# Sum BSTs Including Empty Subtrees
# Difficulty: Medium
# Parent: 14-sum-bsts
#
# Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.

def sumBstsIncludingEmptySubtrees(data):
    """
    Sum BSTs Including Empty Subtrees

    Approach: The original problem considers single nodes as minimal BSTs.
    """
    # TODO: Implement solution
    # Key insight: The original problem considers single nodes as minimal BSTs
    pass


# Test
if __name__ == "__main__":
    # Example: A leaf node has two null children, both are trivially valid BSTs
    print(sumBstsIncludingEmptySubtrees({}))`,
            go: `package main

import "fmt"

// Sum BSTs Including Empty Subtrees
// Difficulty: Medium
// Parent: 14-sum-bsts
//
// Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.

func SumBstsIncludingEmptySubtrees(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The original problem considers single nodes as minimal BSTs
    return nil
}

func main() {
    // Example: A leaf node has two null children, both are trivially valid BSTs
    fmt.Println(SumBstsIncludingEmptySubtrees(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-05-sum-bsts-including-empty-subtrees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-05-sum-bsts-including-empty-subtrees'] = problem;
})();
