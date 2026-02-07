/**
 * Course Schedule
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        hints: [
            'Use three states: unvisited, in-progress, completed.',
            'A back edge to an in-progress node indicates a cycle.',
            'For undirected graphs, track parent to avoid false positives.',
            'Consider using Union-Find as an alternative approach.',
            'DFS naturally handles cycle detection with recursion stack.'
        ],
        examples: [
    {
        input: {
        "numCourses": 2,
        "prerequisites": [
                [
                        1,
                        0
                ]
        ]
},
        output: true,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "numCourses": 2,
        "prerequisites": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: false,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def canFinish(numCourses, prerequisites):
    """
    Course Schedule - Detect cycle in directed graph using DFS.

    Time: O(V + E) where V is numCourses, E is prerequisites
    Space: O(V + E) for adjacency list and visited states
    """
    # Build adjacency list
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # States: 0 = unvisited, 1 = visiting (in current path), 2 = visited
    state = [0] * numCourses

    def hasCycle(node):
        if state[node] == 1:  # Found cycle - back edge to current path
            return True
        if state[node] == 2:  # Already processed, no cycle through here
            return False

        # Mark as visiting
        state[node] = 1

        # Visit all neighbors
        for neighbor in graph[node]:
            if hasCycle(neighbor):
                return True

        # Mark as fully visited
        state[node] = 2
        return False

    # Check each node (handles disconnected components)
    for i in range(numCourses):
        if hasCycle(i):
            return False

    return True


# Test
if __name__ == "__main__":
    # Example 1: Can finish
    print(canFinish(2, [[1, 0]]))  # Output: True
    # Course 1 requires course 0, no cycle

    # Example 2: Cannot finish (cycle)
    print(canFinish(2, [[1, 0], [0, 1]]))  # Output: False
    # Course 1 requires 0, course 0 requires 1 - cycle!`,
            go: `package main

import "fmt"

// canFinish determines if all courses can be completed using DFS cycle detection.
// Time: O(V + E), Space: O(V + E)
func canFinish(numCourses int, prerequisites [][]int) bool {
    // Build adjacency list
    graph := make([][]int, numCourses)
    for i := range graph {
        graph[i] = []int{}
    }
    for _, prereq := range prerequisites {
        course, pre := prereq[0], prereq[1]
        graph[pre] = append(graph[pre], course)
    }

    // States: 0 = unvisited, 1 = visiting, 2 = visited
    state := make([]int, numCourses)

    var hasCycle func(node int) bool
    hasCycle = func(node int) bool {
        if state[node] == 1 { // Found cycle - back edge
            return true
        }
        if state[node] == 2 { // Already processed
            return false
        }

        // Mark as visiting
        state[node] = 1

        // Visit all neighbors
        for _, neighbor := range graph[node] {
            if hasCycle(neighbor) {
                return true
            }
        }

        // Mark as fully visited
        state[node] = 2
        return false
    }

    // Check each node (handles disconnected components)
    for i := 0; i < numCourses; i++ {
        if hasCycle(i) {
            return false
        }
    }

    return true
}

func main() {
    // Example 1: Can finish
    fmt.Println(canFinish(2, [][]int{{1, 0}})) // Output: true

    // Example 2: Cannot finish (cycle)
    fmt.Println(canFinish(2, [][]int{{1, 0}, {0, 1}})) // Output: false
}`
        },
        twists: [
            { id: '03-cycle-in-graph/01-course-schedule/twist-01-return-a-valid-course-order-topological-sort', name: 'Return a Valid Course Order (Topological Sort)', difficulty: 'Medium' },
            { id: '03-cycle-in-graph/01-course-schedule/twist-02-course-schedule-with-bfs-kahns-algorithm', name: 'Course Schedule with BFS (Kahn\'s Algorithm)', difficulty: 'Medium' },
            { id: '03-cycle-in-graph/01-course-schedule/twist-03-minimum-semesters-to-complete-all-courses', name: 'Minimum Semesters to Complete All Courses', difficulty: 'Hard' },
            { id: '03-cycle-in-graph/01-course-schedule/twist-04-course-schedule-with-weighted-prerequisites', name: 'Course Schedule with Weighted Prerequisites', difficulty: 'Hard' },
            { id: '03-cycle-in-graph/01-course-schedule/twist-05-detect-which-courses-form-circular-dependencies', name: 'Detect Which Courses Form Circular Dependencies', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule'] = problem;

})();
