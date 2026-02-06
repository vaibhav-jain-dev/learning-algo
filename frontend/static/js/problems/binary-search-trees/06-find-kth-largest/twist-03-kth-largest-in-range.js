/**
 * Kth Largest in Range
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Largest in Range',
        difficulty: 'Hard',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.',
        problem: 'You must combine range filtering with order statistics. A simple reverse inorder traversal needs an additional check to skip out-of-range nodes while still pruning subtrees for efficiency. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: kth largest in range.",
                  "Consider how you must combine range filtering with order statistics affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST has values [1, 5, 10, 15, 20, 25]. Range [5, 20], k=2. Within range: [5, 10, 15, 20]. The 2nd largest in range is 15.'
            }
        ],
        solutions: {
            python: `# Kth Largest in Range
# Difficulty: Hard
# Parent: 06-find-kth-largest
#
# Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.

def kthLargestInRange(data):
    """
    Kth Largest in Range

    Approach: You must combine range filtering with order statistics.
    """
    # TODO: Implement solution
    # Key insight: You must combine range filtering with order statistics
    pass


# Test
if __name__ == "__main__":
    # Example: BST has values [1, 5, 10, 15, 20, 25]
    print(kthLargestInRange({}))`,
            go: `package main

import "fmt"

// Kth Largest in Range
// Difficulty: Hard
// Parent: 06-find-kth-largest
//
// Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.

func KthLargestInRange(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must combine range filtering with order statistics
    return nil
}

func main() {
    // Example: BST has values [1, 5, 10, 15, 20, 25]
    fmt.Println(KthLargestInRange(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-03-kth-largest-in-range', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-03-kth-largest-in-range'] = problem;
})();
