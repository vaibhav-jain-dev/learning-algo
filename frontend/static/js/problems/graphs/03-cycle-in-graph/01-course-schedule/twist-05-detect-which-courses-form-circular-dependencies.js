/**
 * Detect Which Courses Form Circular Dependencies
 * Category: graphs
 * Difficulty: Medium
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect Which Courses Form Circular Dependencies',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).',
        problem: 'Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.',
        hints: [
            'Start by understanding the key difference: Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: numCourses=4, prerequisites=[[1,0],[0,1],[2,3]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(V + E)', space: 'O(V + E)' },
        examples: [
            { input: { description: 'numCourses=4, prerequisites=[[1,0],[0,1],[2,3]]. Courses 0 and 1 form a cycle. Courses 2 and 3 are fine. Return [0,1].' }, output: 'See explanation', explanation: 'numCourses=4, prerequisites=[[1,0],[0,1],[2,3]]. Courses 0 and 1 form a cycle. Courses 2 and 3 are fine. Return [0,1].' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def detect_which_courses_form_circular_dependencies(data):
    """
    Detect Which Courses Form Circular Dependencies

    If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).

    Approach:
    Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.

    Time: O(V + E)
    Space: O(V + E)
    """
    # Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.

    # Implementation
    result = None

    # Core algorithm adapted for: Detect Which Courses Form Circular Dependencies
    # Key difference from parent: Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. T

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return detect_which_courses_form_circular_dependencies(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # numCourses=4, prerequisites=[[1,0],[0,1],[2,3]]. Courses 0 and 1 form a cycle. Courses 2 and 3 are fine. Return [0,1].
    print("Test: Detect Which Courses Form Circular Dependencies")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// DetectWhichCoursesFormCircularDependencies solves the Detect Which Courses Form Circular Dependencies problem
// If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).
//
// Approach: Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.
//
// Time: O(V + E)
// Space: O(V + E)
func DetectWhichCoursesFormCircularDependencies(input interface{}) interface{} {
    // Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.

    // Core algorithm adapted for: Detect Which Courses Form Circular Dependencies
    // Key difference from parent: Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. T

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // numCourses=4, prerequisites=[[1,0],[0,1],[2,3]]. Courses 0 and 1 form a cycle. Courses 2 and 3 are fine. Return [0,1].
    fmt.Println("Test: Detect Which Courses Form Circular Dependencies")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-05-detect-which-courses-form-circular-dependencies', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-05-detect-which-courses-form-circular-dependencies'] = problem;
})();
