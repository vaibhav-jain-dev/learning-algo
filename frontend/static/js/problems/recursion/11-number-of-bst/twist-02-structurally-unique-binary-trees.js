/**
 * Structurally Unique Binary Trees
 * Category: recursion
 * Difficulty: Medium
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Structurally Unique Binary Trees',
        difficulty: 'Medium',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.',
        problem: 'Interestingly, this is the same Catalan number -- the insight is understanding why BST structure count equals general binary tree structure count.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=3, the answer is still 5. Understanding why requires recognizing the bijection between BST orderings and tree shapes.' },
                output: 'See example',
                explanation: 'For n=3, the answer is still 5. Understanding why requires recognizing the bijection between BST orderings and tree shapes.'
            }
        ],
        solutions: {
            python: `# Structurally Unique Binary Trees
# Category: recursion
# Difficulty: Medium
# Parent: 11-number-of-bst

def solve():
    """
    Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.

    Key insight: Interestingly, this is the same Catalan number -- the insight is understanding why BST structure count equals general binary tree structure count.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Structurally Unique Binary Trees problem.
// Count the number of structurally unique binary trees (not BSTs) with n nodes, where node values do not matter.
// Key insight: Interestingly, this is the same Catalan number -- the insight is understanding why BST structure count equals general binary tree structure count.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-02-structurally-unique-binary-trees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-02-structurally-unique-binary-trees'] = problem;
})();
