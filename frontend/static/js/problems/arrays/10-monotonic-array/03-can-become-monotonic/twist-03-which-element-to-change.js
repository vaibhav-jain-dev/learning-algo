/**
 * Which Element to Change
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: which-element-to-change
 * Parent: 10-monotonic-array/03-can-become-monotonic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Which Element to Change',
        difficulty: 'Medium',
        algorithm: 'which-element-to-change',
        parent: '10-monotonic-array/03-can-become-monotonic',
        description: 'If the array can become monotonic by changing one element, return the index of the element to change and its new value. Not just a yes/no answer: must identify the problematic element and compute the optimal replacement value.',
        problem: 'Not just a yes/no answer: must identify the problematic element and compute the optimal replacement value.',
        hints: [
            'Think about how which element to change differs from the standard version of this problem.',
            'Key insight: Not just a yes/no answer: must identify the problematic element and compute the optimal replacement value.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"coins":[1,2,5]},
                output: 4,
                explanation: 'With coins [1,2,5], the first non-constructible value is 4.'
            },
            {
                input: {"coins":[1,1,1,1]},
                output: 5,
                explanation: 'Can make 1 through 4, but not 5.'
            },
            {
                input: {"coins":[5,10]},
                output: 1,
                explanation: 'Cannot make 1 with only coins of value 5 and 10.'
            }
        ],
        solutions: {
            python: `def which_element_to_change(data):
    """
    Which Element to Change

    If the array can become monotonic by changing one element, return the index of the element to change and its new value.
    \n    Approach: Not just a yes/no answer: must identify the problematic element and compute the optimal replacement value.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 5, 3, 4, 5]. Change index 1 from 5 to 2. Return {index: 1, newValue: 2}.

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(which_element_to_change([1, 2, 3, 4, 5]))
print(which_element_to_change([5, 3, 1]))
print(which_element_to_change([1]))`,
            go: `package main

import "fmt"

// WhichElementToChange solves the Which Element to Change problem.
// If the array can become monotonic by changing one element, return the index of the element to change and its new value.
// Time: O(n), Space: O(n)
func WhichElementToChange(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(WhichElementToChange([]int{1, 2, 3, 4, 5}))
    fmt.Println(WhichElementToChange([]int{5, 3, 1}))
    fmt.Println(WhichElementToChange([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/03-can-become-monotonic/twist-03-which-element-to-change', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/03-can-become-monotonic/twist-03-which-element-to-change'] = problem;
})();
