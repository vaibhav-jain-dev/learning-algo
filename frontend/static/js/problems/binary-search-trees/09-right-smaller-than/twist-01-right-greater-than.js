/**
 * Right Greater Than
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';
    const problem = {
        name: 'Right Greater Than',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element, count how many elements to its right are strictly greater than it.',
        problem: 'While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: right greater than.",
                  "Consider how while structurally similar, tracking \"greater than\" in a bst requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'For [8, 5, 11, -1, 3, 4, 2], right greater counts are [1, 1, 0, 2, 1, 0, 0]. Only 11 is greater than 8 to its right.'
            }
        ],
        solutions: {
            python: `# Right Greater Than
# Difficulty: Hard
# Parent: 09-right-smaller-than
#
# For each element, count how many elements to its right are strictly greater than it.

def rightGreaterThan(data):
    """
    Right Greater Than

    Approach: While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead.
    """
    # TODO: Implement solution
    # Key insight: While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead
    pass


# Test
if __name__ == "__main__":
    # Example: For [8, 5, 11, -1, 3, 4, 2], right greater counts are [1, 1, 0, 2, 1, 0, 0]
    print(rightGreaterThan({}))`,
            go: `package main

import "fmt"

// Right Greater Than
// Difficulty: Hard
// Parent: 09-right-smaller-than
//
// For each element, count how many elements to its right are strictly greater than it.

func RightGreaterThan(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead
    return nil
}

func main() {
    // Example: For [8, 5, 11, -1, 3, 4, 2], right greater counts are [1, 1, 0, 2, 1, 0, 0]
    fmt.Println(RightGreaterThan(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-01-right-greater-than', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-01-right-greater-than'] = problem;
})();
