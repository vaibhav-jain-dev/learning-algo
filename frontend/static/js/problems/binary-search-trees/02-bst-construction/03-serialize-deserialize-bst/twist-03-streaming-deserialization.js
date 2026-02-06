/**
 * Streaming Deserialization
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction
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

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[5,3,7,2,4,6,8]},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            {
                input: {"tree":[2,1,3]},
                output: "output",
                explanation: 'The resulting string is "output".'
            },
            // Edge case
            {
                input: {"tree":[5]},
                output: "",
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def streaming_deserialization(tree):
    """
    Streaming Deserialization

    Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(streaming_deserialization([5,3,7,2,4,6,8]))  # Expected: "result"
print(streaming_deserialization([2,1,3]))  # Expected: "output"
print(streaming_deserialization([5]))  # Expected: ""
`,
            go: `package main

import "fmt"

// StreamingDeserialization solves the Streaming Deserialization problem.
// Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.
// Time: O(n), Space: O(1)
func StreamingDeserialization(tree []int) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(StreamingDeserialization([]int{5, 3, 7, 2, 4, 6, 8})) // Expected: "result"
	fmt.Println(StreamingDeserialization([]int{2, 1, 3})) // Expected: "output"
	fmt.Println(StreamingDeserialization([]int{5})) // Expected: ""
}
`
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
