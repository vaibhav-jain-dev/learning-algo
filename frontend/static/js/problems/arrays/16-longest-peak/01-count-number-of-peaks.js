/**
 * Count Number Of Peaks
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Number Of Peaks',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '16-longest-peak',
        description: 'Given an array of integers, count the total number of valid peaks. A peak is an element that is strictly greater than both its neighbors. Edge elements cannot be peaks.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
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
        "raw": "array = [1, 3, 2, 4, 1, 5, 2]"
},
        output: "3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)",
        explanation: 'Given the input, the algorithm processes it to produce 3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "0\nExplanation: No element is greater than both neighbors",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: No element is greater than both neighbors'
    },
    {
        input: {
        "raw": "array = [5, 4, 3, 4, 5]"
},
        output: "0\nExplanation: 5 at index 4 is at the edge, not a valid peak",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: 5 at index 4 is at the edge, not a valid peak'
    }
        ],
        solutions: {
            python: `def countNumberOfPeaks(data):
    """
    Count Number Of Peaks

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

// CountNumberOfPeaks solves the Count Number Of Peaks problem.
// Time: O(n), Space: O(n)
func CountNumberOfPeaks(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/01-count-number-of-peaks', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/01-count-number-of-peaks'] = problem;

})();
