/**
 * Longest Happy Prefix
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Happy Prefix',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'A string is called a happy prefix if it is a non-empty prefix which is also a suffix (excluding itself). Given a string s, return the longest happy prefix. Return an empty string if no such prefix exists.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
        "s": "level"
},
        output: "l",
        explanation: 'Processing the input data produces the output. For input s=level, the result is l.'
    },
    {
        input: {
        "s": "ababab"
},
        output: "abab",
        explanation: 'Processing the input data produces the output. For input s=ababab, the result is abab.'
    }
        ],
        solutions: {
            python: `def longestHappyPrefix(data):
    """
    Longest Happy Prefix

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

// LongestHappyPrefix solves the Longest Happy Prefix problem.
// Time: O(n), Space: O(n)
func LongestHappyPrefix(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix'] = problem;

})();
