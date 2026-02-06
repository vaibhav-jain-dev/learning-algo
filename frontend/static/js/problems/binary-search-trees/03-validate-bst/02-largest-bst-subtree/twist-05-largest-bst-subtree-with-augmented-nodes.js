/**
 * Largest BST Subtree with Augmented Nodes
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Largest BST Subtree with Augmented Nodes',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.',
        problem: 'This adds an output requirement -- you are not just computing a single answer but annotating the entire tree. The augmentation must propagate correctly, and non-BST nodes must carry the max of their children\'s BST sizes. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: largest bst subtree with augmented nodes.",
                  "Consider how this adds an output requirement -- you are not just computing a single answer but annotating the entire tree affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,1,8,null,7]. Node 5 gets augmented with bstSize=3 (subtree [5,1,8] is valid BST). Node 15 gets bstSize=1 (only itself). Node 10 gets bstSize=3 (max of children).'
            }
        ],
        solutions: {
            python: `# Largest BST Subtree with Augmented Nodes
# Difficulty: Medium
# Parent: 03-validate-bst/02-largest-bst-subtree
#
# While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.

def largestBstSubtreeWithAugmentedNodes(data):
    """
    Largest BST Subtree with Augmented Nodes

    Approach: This adds an output requirement -- you are not just computing a single answer but annotating the entire tree.
    """
    # TODO: Implement solution
    # Key insight: This adds an output requirement -- you are not just computing a single answer but annotating the entire tree
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,1,8,null,7]
    print(largestBstSubtreeWithAugmentedNodes({}))`,
            go: `package main

import "fmt"

// Largest BST Subtree with Augmented Nodes
// Difficulty: Medium
// Parent: 03-validate-bst/02-largest-bst-subtree
//
// While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.

func LargestBstSubtreeWithAugmentedNodes(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This adds an output requirement -- you are not just computing a single answer but annotating the entire tree
    return nil
}

func main() {
    // Example: Tree: [10,5,15,1,8,null,7]
    fmt.Println(LargestBstSubtreeWithAugmentedNodes(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-05-largest-bst-subtree-with-augmented-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-05-largest-bst-subtree-with-augmented-nodes'] = problem;
})();
