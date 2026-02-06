/**
 * Kth Largest with Frequent Updates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 06-find-kth-largest
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Largest with Frequent Updates',
        difficulty: 'Hard',
        algorithm: 'bst-kth-largest',
        parent: '06-find-kth-largest',
        description: 'The BST receives frequent insertions and deletions. After each operation, efficiently return the kth largest value without traversing the tree from scratch each time.',
        problem: 'A single reverse inorder traversal is no longer sufficient. You need augmented BST nodes that store subtree sizes, enabling O(h) kth-largest queries even after modifications. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: kth largest with frequent updates.",
                  "Consider how a single reverse inorder traversal is no longer sufficient affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST has [5, 10, 15, 20]. k=2 gives 15. Insert 17. Now k=2 gives 17. The augmented size field updates on insertion to avoid re-traversal.'
            }
        ],
        solutions: {
            python: `# Kth Largest with Frequent Updates
# Difficulty: Hard
# Parent: 06-find-kth-largest
#
# The BST receives frequent insertions and deletions. After each operation, efficiently return the kth largest value without traversing the tree from scratch each time.

def kthLargestWithFrequentUpdates(data):
    """
    Kth Largest with Frequent Updates

    Approach: A single reverse inorder traversal is no longer sufficient.
    """
    # TODO: Implement solution
    # Key insight: A single reverse inorder traversal is no longer sufficient
    pass


# Test
if __name__ == "__main__":
    # Example: BST has [5, 10, 15, 20]
    print(kthLargestWithFrequentUpdates({}))`,
            go: `package main

import "fmt"

// Kth Largest with Frequent Updates
// Difficulty: Hard
// Parent: 06-find-kth-largest
//
// The BST receives frequent insertions and deletions. After each operation, efficiently return the kth largest value without traversing the tree from scratch each time.

func KthLargestWithFrequentUpdates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: A single reverse inorder traversal is no longer sufficient
    return nil
}

func main() {
    // Example: BST has [5, 10, 15, 20]
    fmt.Println(KthLargestWithFrequentUpdates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest/twist-01-kth-largest-with-frequent-updates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest/twist-01-kth-largest-with-frequent-updates'] = problem;
})();
