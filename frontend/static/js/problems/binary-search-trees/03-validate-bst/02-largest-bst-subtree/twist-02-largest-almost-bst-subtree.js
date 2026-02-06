/**
 * Largest Almost-BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Largest Almost-BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find the largest subtree that can become a valid BST by removing at most one node from it.',
        problem: 'You must consider subtrees that are "almost valid" -- one violation is tolerable. This requires tracking not just validity but the number of violations and which node to remove, adding a dimension to the state. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: largest almost-bst subtree.",
                  "Consider how you must consider subtrees that are \"almost valid\" -- one violation is tolerable affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,1,8,7,20]. Subtree at 15: [15,7,20] is not BST (7<15 on right). Remove 7 -> [15,null,20] is BST of size 2. But subtree at 10 with one removal might be larger.'
            }
        ],
        solutions: {
            python: `# Largest Almost-BST Subtree
# Difficulty: Hard
# Parent: 03-validate-bst/02-largest-bst-subtree
#
# Find the largest subtree that can become a valid BST by removing at most one node from it.

def largestAlmostBstSubtree(data):
    """
    Largest Almost-BST Subtree

    Approach: You must consider subtrees that are "almost valid" -- one violation is tolerable.
    """
    # TODO: Implement solution
    # Key insight: You must consider subtrees that are "almost valid" -- one violation is tolerable
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,1,8,7,20]
    print(largestAlmostBstSubtree({}))`,
            go: `package main

import "fmt"

// Largest Almost-BST Subtree
// Difficulty: Hard
// Parent: 03-validate-bst/02-largest-bst-subtree
//
// Find the largest subtree that can become a valid BST by removing at most one node from it.

func LargestAlmostBstSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must consider subtrees that are "almost valid" -- one violation is tolerable
    return nil
}

func main() {
    // Example: Tree: [10,5,15,1,8,7,20]
    fmt.Println(LargestAlmostBstSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-02-largest-almost-bst-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-02-largest-almost-bst-subtree'] = problem;
})();
