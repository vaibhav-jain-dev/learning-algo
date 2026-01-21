/**
 * Alien Dictionary
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Alien Dictionary',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'There is a new alien language that uses the English alphabet. The order among letters is unknown. You are given a list of strings words from the alien language\'s dictionary, where the strings are sorted lexicographically by the rules of this new language. Derive the order of letters in this language and return it. If no valid order exists, return "". If there are multiple valid orderings, return any of them.',
        complexity: {
            time: 'O(C)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "words": [
                "wrt",
                "wrf",
                "er",
                "ett",
                "rftt"
        ]
},
        output: "wertf",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[wrt, wrf, er, ett, rftt], the result is wertf.'
    },
    {
        input: {
        "words": [
                "z",
                "x"
        ]
},
        output: "zx",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[z, x], the result is zx.'
    }
        ],
        solutions: {
            python: `def alienDictionary(data):
    """
    Alien Dictionary

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// AlienDictionary solves the Alien Dictionary problem.
// Time: O(n), Space: O(n)
func AlienDictionary(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary'] = problem;

})();
