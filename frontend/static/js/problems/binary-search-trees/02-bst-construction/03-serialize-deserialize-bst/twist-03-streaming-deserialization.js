/**
 * Streaming Deserialization
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction/03-serialize-deserialize-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Deserialization',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction/03-serialize-deserialize-bst',
        description: 'Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.',
        problem: 'Standard deserialization reads all data upfront. Streaming requires maintaining partial tree state and deciding where each new value belongs as it arrives, using the BST bounds tracking in an online fashion. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: streaming deserialization.",
                  "Consider how standard deserialization reads all data upfront affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Stream: 5, 3, 2, 4, 7, 6, 8. After receiving "5,3,2": partial tree [5,3,null,2]. After "4": [5,3,null,2,4].'
            }
        ],
        solutions: {
            python: `# Streaming Deserialization
# Difficulty: Hard
# Parent: 02-bst-construction/03-serialize-deserialize-bst
#
# Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.

def streamingDeserialization(data):
    """
    Streaming Deserialization

    Approach: Standard deserialization reads all data upfront.
    """
    # TODO: Implement solution
    # Key insight: Standard deserialization reads all data upfront
    pass


# Test
if __name__ == "__main__":
    # Example: Stream: 5, 3, 2, 4, 7, 6, 8
    print(streamingDeserialization({}))`,
            go: `package main

import "fmt"

// Streaming Deserialization
// Difficulty: Hard
// Parent: 02-bst-construction/03-serialize-deserialize-bst
//
// Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.

func StreamingDeserialization(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Standard deserialization reads all data upfront
    return nil
}

func main() {
    // Example: Stream: 5, 3, 2, 4, 7, 6, 8
    fmt.Println(StreamingDeserialization(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/03-serialize-deserialize-bst/twist-03-streaming-deserialization', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/03-serialize-deserialize-bst/twist-03-streaming-deserialization'] = problem;
})();
