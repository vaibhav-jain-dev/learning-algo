/**
 * Implement strStr()
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Implement strStr()',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(m)'
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
        "haystack": "sadbutsad",
        "needle": "sad"
},
        output: 0,
        explanation: 'Processing the input data produces the output. For input haystack=sadbutsad, needle=sad, the result is 0.'
    },
    {
        input: {
        "haystack": "leetcode",
        "needle": "leeto"
},
        output: -1,
        explanation: 'Processing the input data produces the output. For input haystack=leetcode, needle=leeto, the result is -1.'
    }
        ],
        solutions: {
            python: `def implementStrstr(data):
    """
    Implement strStr()

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

// ImplementStrstr solves the Implement strStr() problem.
// Time: O(n), Space: O(n)
func ImplementStrstr(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr'] = problem;

})();
