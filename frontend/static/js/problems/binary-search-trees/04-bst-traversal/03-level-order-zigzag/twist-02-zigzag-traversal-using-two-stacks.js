/**
 * Zigzag Traversal Using Two Stacks
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/03-level-order-zigzag
 */
(function() {
    'use strict';
    const problem = {
        name: 'Zigzag Traversal Using Two Stacks',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/03-level-order-zigzag',
        description: 'Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.',
        problem: 'Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach. You push children to the other stack in a specific order depending on the current direction, which is a different mental model. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: zigzag traversal using two stacks.",
                  "Consider how using two stacks changes the fundamental data structure from bfs with a queue to an alternating stack approach affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [1,2,3,4,5,6,7]. Stack1 processes level 0 (push right then left for even levels). Stack2 processes level 1 (push left then right for odd levels).'
            }
        ],
        solutions: {
            python: `# Zigzag Traversal Using Two Stacks
# Difficulty: Medium
# Parent: 04-bst-traversal/03-level-order-zigzag
#
# Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.

def zigzagTraversalUsingTwoStacks(data):
    """
    Zigzag Traversal Using Two Stacks

    Approach: Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach.
    """
    # TODO: Implement solution
    # Key insight: Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [1,2,3,4,5,6,7]
    print(zigzagTraversalUsingTwoStacks({}))`,
            go: `package main

import "fmt"

// Zigzag Traversal Using Two Stacks
// Difficulty: Medium
// Parent: 04-bst-traversal/03-level-order-zigzag
//
// Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.

func ZigzagTraversalUsingTwoStacks(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach
    return nil
}

func main() {
    // Example: Tree: [1,2,3,4,5,6,7]
    fmt.Println(ZigzagTraversalUsingTwoStacks(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag/twist-02-zigzag-traversal-using-two-stacks', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag/twist-02-zigzag-traversal-using-two-stacks'] = problem;
})();
