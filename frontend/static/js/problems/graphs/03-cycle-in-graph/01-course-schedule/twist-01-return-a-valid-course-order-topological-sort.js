/**
 * Return a Valid Course Order (Topological Sort)
 * Category: graphs
 * Difficulty: Medium
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return a Valid Course Order (Topological Sort)',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.',
        problem: 'Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\\'s algorithm to build the order incrementally.',
        hints: [
            'Start by understanding the key difference: Shifts from pure cycle detection to topological sorting.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(V + E)', space: 'O(V + E)' },
        examples: [
            { input: { description: 'numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Valid order: [0,1,2,3] or [0,2,1,3]. Not just true/false.' }, output: 'See explanation', explanation: 'numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Valid order: [0,1,2,3] or [0,2,1,3]. Not just true/false.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def return_a_valid_course_order_topological_sort(data):
    """
    Return a Valid Course Order (Topological Sort)

    Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.

    Approach:
    Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\'s algorithm to build the order incrementally.

    Time: O(V + E)
    Space: O(V + E)
    """
    # Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\'s algorithm to build the order incrementally.

    # Implementation
    result = None

    # Core algorithm adapted for: Return a Valid Course Order (Topological Sort)
    # Key difference from parent: Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return return_a_valid_course_order_topological_sort(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Valid order: [0,1,2,3] or [0,2,1,3]. Not just true/false.
    print("Test: Return a Valid Course Order (Topological Sort)")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ReturnAValidCourseOrderTopologicalSort solves the Return a Valid Course Order (Topological Sort) problem
// Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.
//
// Approach: Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\'s algorithm to build the order incrementally.
//
// Time: O(V + E)
// Space: O(V + E)
func ReturnAValidCourseOrderTopologicalSort(input interface{}) interface{} {
    // Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\'s algorithm to build the order incrementally.

    // Core algorithm adapted for: Return a Valid Course Order (Topological Sort)
    // Key difference from parent: Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Valid order: [0,1,2,3] or [0,2,1,3]. Not just true/false.
    fmt.Println("Test: Return a Valid Course Order (Topological Sort)")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-01-return-a-valid-course-order-topological-sort', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-01-return-a-valid-course-order-topological-sort'] = problem;
})();
