/**
 * Iterative Postorder Without Reverse
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Postorder Without Reverse',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.',
        problem: 'The common shortcut (reverse of root-right-left preorder) avoids the real challenge. True single-stack postorder requires tracking the last-visited node to decide whether to go right or process the current node, which is a much more nuanced state machine. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: iterative postorder without reverse.",
                  "Consider how the common shortcut (reverse of root-right-left preorder) avoids the real challenge affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [1,2,3,4,5,null,6]. Must produce [4,5,2,6,3,1] using one stack, no reversal, tracking prev pointer.'
            }
        ],
        solutions: {
            python: `# Iterative Postorder Without Reverse
# Difficulty: Hard
# Parent: 04-bst-traversal/01-iterative-tree-traversal
#
# Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.

def iterativePostorderWithoutReverse(data):
    """
    Iterative Postorder Without Reverse

    Approach: The common shortcut (reverse of root-right-left preorder) avoids the real challenge.
    """
    # TODO: Implement solution
    # Key insight: The common shortcut (reverse of root-right-left preorder) avoids the real challenge
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [1,2,3,4,5,null,6]
    print(iterativePostorderWithoutReverse({}))`,
            go: `package main

import "fmt"

// Iterative Postorder Without Reverse
// Difficulty: Hard
// Parent: 04-bst-traversal/01-iterative-tree-traversal
//
// Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.

func IterativePostorderWithoutReverse(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The common shortcut (reverse of root-right-left preorder) avoids the real challenge
    return nil
}

func main() {
    // Example: Tree: [1,2,3,4,5,null,6]
    fmt.Println(IterativePostorderWithoutReverse(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-02-iterative-postorder-without-reverse', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-02-iterative-postorder-without-reverse'] = problem;
})();
