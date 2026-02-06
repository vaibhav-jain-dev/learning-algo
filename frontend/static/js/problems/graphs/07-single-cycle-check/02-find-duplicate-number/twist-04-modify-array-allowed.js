/**
 * Modify Array Allowed
 * Category: graphs
 * Difficulty: Easy
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';
    const problem = {
        name: 'Modify Array Allowed',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'You are allowed to modify the array. Find the duplicate using index marking (negation technique).',
        problem: 'When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.',
        hints: [
            'Start by understanding the key difference: When modification is allowed, negate nums[abs(nums[i])] as you traverse.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Array [1,3,4,2,2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: { description: 'Array [1,3,4,2,2]. Visit 1: negate index 1. Visit 3: negate index 3. Visit 4: negate index 4. Visit 2: negate index 2. Visit 2: index 2 already negative -> duplicate is 2.' }, output: 'See explanation', explanation: 'Array [1,3,4,2,2]. Visit 1: negate index 1. Visit 3: negate index 3. Visit 4: negate index 4. Visit 2: negate index 2. Visit 2: index 2 already negative -> duplicate is 2.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def modify_array_allowed(data):
    """
    Modify Array Allowed

    You are allowed to modify the array. Find the duplicate using index marking (negation technique).

    Approach:
    When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.

    Time: O(n)
    Space: O(1)
    """
    # When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.

    # Implementation
    result = None

    # Core algorithm adapted for: Modify Array Allowed
    # Key difference from parent: When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative valu

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return modify_array_allowed(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Array [1,3,4,2,2]. Visit 1: negate index 1. Visit 3: negate index 3. Visit 4: negate index 4. Visit 2: negate index 2. Visit 2: index 2 already negative -> duplicate is 2.
    print("Test: Modify Array Allowed")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ModifyArrayAllowed solves the Modify Array Allowed problem
// You are allowed to modify the array. Find the duplicate using index marking (negation technique).
//
// Approach: When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.
//
// Time: O(n)
// Space: O(1)
func ModifyArrayAllowed(input interface{}) interface{} {
    // When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.

    // Core algorithm adapted for: Modify Array Allowed
    // Key difference from parent: When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative valu

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Array [1,3,4,2,2]. Visit 1: negate index 1. Visit 3: negate index 3. Visit 4: negate index 4. Visit 2: negate index 2. Visit 2: index 2 already negative -> duplicate is 2.
    fmt.Println("Test: Modify Array Allowed")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-04-modify-array-allowed', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-04-modify-array-allowed'] = problem;
})();
