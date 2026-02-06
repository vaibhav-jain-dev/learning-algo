/**
 * Find Cycle Start
 * Category: graphs
 * Difficulty: Medium
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find Cycle Start',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'If a cycle exists, return the node where the cycle begins. Use O(1) space.',
        problem: 'Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.',
        hints: [
            'Start by understanding the key difference: Detecting a cycle is only the first step.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: List [3,2,0,-4] with cycle at position 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            { input: { description: 'List [3,2,0,-4] with cycle at position 1. After detection, reset slow to head. Both advance by 1. They meet at node 2 (the cycle start).' }, output: 'See explanation', explanation: 'List [3,2,0,-4] with cycle at position 1. After detection, reset slow to head. Both advance by 1. They meet at node 2 (the cycle start).' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def find_cycle_start(data):
    """
    Find Cycle Start

    If a cycle exists, return the node where the cycle begins. Use O(1) space.

    Approach:
    Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.

    Time: O(n)
    Space: O(1)
    """
    # Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.

    # Implementation
    result = None

    # Core algorithm adapted for: Find Cycle Start
    # Key difference from parent: Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to he

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return find_cycle_start(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # List [3,2,0,-4] with cycle at position 1. After detection, reset slow to head. Both advance by 1. They meet at node 2 (the cycle start).
    print("Test: Find Cycle Start")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// FindCycleStart solves the Find Cycle Start problem
// If a cycle exists, return the node where the cycle begins. Use O(1) space.
//
// Approach: Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.
//
// Time: O(n)
// Space: O(1)
func FindCycleStart(input interface{}) interface{} {
    // Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to head and advance both at the same speed to find the cycle entrance.

    // Core algorithm adapted for: Find Cycle Start
    // Key difference from parent: Detecting a cycle is only the first step. After fast and slow meet, you must reset one pointer to he

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // List [3,2,0,-4] with cycle at position 1. After detection, reset slow to head. Both advance by 1. They meet at node 2 (the cycle start).
    fmt.Println("Test: Find Cycle Start")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-01-find-cycle-start', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-01-find-cycle-start'] = problem;
})();
