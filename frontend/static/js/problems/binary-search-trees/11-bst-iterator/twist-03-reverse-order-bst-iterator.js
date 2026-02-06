/**
 * Reverse Order BST Iterator
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Order BST Iterator',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.',
        problem: 'The standard iterator pushes left children. A reverse iterator pushes right children and processes nodes in right-root-left order. It is the mirror image, testing if you understand the inorder traversal mechanics deeply enough to reverse them. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: reverse order bst iterator.",
                  "Consider how the standard iterator pushes left children affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [7, 3, 15, null, null, 9, 20]. Calling next() returns 20, 15, 9, 7, 3 in sequence.'
            }
        ],
        solutions: {
            python: `# Reverse Order BST Iterator
# Difficulty: Medium
# Parent: 11-bst-iterator
#
# Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.

def reverseOrderBstIterator(data):
    """
    Reverse Order BST Iterator

    Approach: The standard iterator pushes left children.
    """
    # TODO: Implement solution
    # Key insight: The standard iterator pushes left children
    pass


# Test
if __name__ == "__main__":
    # Example: BST [7, 3, 15, null, null, 9, 20]
    print(reverseOrderBstIterator({}))`,
            go: `package main

import "fmt"

// Reverse Order BST Iterator
// Difficulty: Medium
// Parent: 11-bst-iterator
//
// Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.

func ReverseOrderBstIterator(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The standard iterator pushes left children
    return nil
}

func main() {
    // Example: BST [7, 3, 15, null, null, 9, 20]
    fmt.Println(ReverseOrderBstIterator(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-03-reverse-order-bst-iterator', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-03-reverse-order-bst-iterator'] = problem;
})();
