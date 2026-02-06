/**
 * Morris Postorder Traversal
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Morris Postorder Traversal',
        difficulty: 'Very Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.',
        problem: 'Morris inorder/preorder naturally yield their orders through the threading mechanism. Postorder requires processing nodes in reverse along right boundaries of left subtrees when removing threads, involving a linked-list reversal step within the traversal. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: morris postorder traversal.",
                  "Consider how morris inorder/preorder naturally yield their orders through the threading mechanism affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [1,2,3,4,5,6,7]. Morris postorder must produce [4,5,2,6,7,3,1] using O(1) space by reversing right-boundary chains.'
            }
        ],
        solutions: {
            python: `# Morris Postorder Traversal
# Difficulty: Very Hard
# Parent: 04-bst-traversal/02-morris-traversal
#
# Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.

def morrisPostorderTraversal(data):
    """
    Morris Postorder Traversal

    Approach: Morris inorder/preorder naturally yield their orders through the threading mechanism.
    """
    # TODO: Implement solution
    # Key insight: Morris inorder/preorder naturally yield their orders through the threading mechanism
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [1,2,3,4,5,6,7]
    print(morrisPostorderTraversal({}))`,
            go: `package main

import "fmt"

// Morris Postorder Traversal
// Difficulty: Very Hard
// Parent: 04-bst-traversal/02-morris-traversal
//
// Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.

func MorrisPostorderTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Morris inorder/preorder naturally yield their orders through the threading mechanism
    return nil
}

func main() {
    // Example: Tree: [1,2,3,4,5,6,7]
    fmt.Println(MorrisPostorderTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-01-morris-postorder-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-01-morris-postorder-traversal'] = problem;
})();
