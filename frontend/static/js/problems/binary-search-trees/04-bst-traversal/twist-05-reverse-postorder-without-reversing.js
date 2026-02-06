/**
 * Reverse Postorder Without Reversing
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Postorder Without Reversing',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Generate the reverse of postorder traversal (which equals a modified preorder: root, right, left) directly without generating postorder first and reversing.',
        problem: 'Forces you to think about traversal order relationships. Reverse postorder is used in topological sorting and graph algorithms. Generating it directly requires visiting right before left in a preorder-like pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: reverse postorder without reversing.",
                  "Consider how forces you to think about traversal order relationships affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7,12,20]. Postorder: [2,7,5,12,20,15,10]. Reverse postorder (generated directly): [10,15,20,12,5,7,2].'
            }
        ],
        solutions: {
            python: `# Reverse Postorder Without Reversing
# Difficulty: Medium
# Parent: 04-bst-traversal
#
# Generate the reverse of postorder traversal (which equals a modified preorder: root, right, left) directly without generating postorder first and reversing.

def reversePostorderWithoutReversing(data):
    """
    Reverse Postorder Without Reversing

    Approach: Forces you to think about traversal order relationships.
    """
    # TODO: Implement solution
    # Key insight: Forces you to think about traversal order relationships
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7,12,20]
    print(reversePostorderWithoutReversing({}))`,
            go: `package main

import "fmt"

// Reverse Postorder Without Reversing
// Difficulty: Medium
// Parent: 04-bst-traversal
//
// Generate the reverse of postorder traversal (which equals a modified preorder: root, right, left) directly without generating postorder first and reversing.

func ReversePostorderWithoutReversing(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Forces you to think about traversal order relationships
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7,12,20]
    fmt.Println(ReversePostorderWithoutReversing(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-05-reverse-postorder-without-reversing', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-05-reverse-postorder-without-reversing'] = problem;
})();
