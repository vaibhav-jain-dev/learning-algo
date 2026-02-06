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
        explanation: 'Exploring the graph structure, we find the required path or value. For input numCourses=2, prerequisites=[[1, 0]], the result is true.'
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
        explanation: 'Exploring the graph structure, we find the required path or value. For input numCourses=2, prerequisites=[[1, 0], [0, 1]], the result is false.'
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
            {
                title: 'Return a Valid Course Order (Topological Sort)',
                difficulty: 'Medium',
                description: 'Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.',
                whyDifferent: 'Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\'s algorithm to build the order incrementally.',
                example: 'numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Valid order: [0,1,2,3] or [0,2,1,3]. Not just true/false.'
            },
            {
                title: 'Course Schedule with BFS (Kahn\'s Algorithm)',
                difficulty: 'Medium',
                description: 'Solve the same problem using BFS-based topological sort instead of DFS. Process courses with no remaining prerequisites first.',
                whyDifferent: 'Completely different mental model: instead of exploring depth-first and detecting back edges, you iteratively remove courses whose prerequisites are met. More intuitive for some and naturally produces a valid order.',
                example: 'Same input. Start with courses having 0 prerequisites, remove them, decrement neighbors\' in-degrees, repeat. If all courses processed, answer is true.'
            },
            {
                title: 'Minimum Semesters to Complete All Courses',
                difficulty: 'Hard',
                description: 'Each semester you can take any courses whose prerequisites are met (in parallel). Find the minimum number of semesters to finish all courses, or -1 if impossible.',
                whyDifferent: 'Adds a time dimension. This requires finding the longest path in the DAG (critical path), which combines topological sorting with level-based processing. The answer is the depth of the dependency graph.',
                example: 'prerequisites=[[1,0],[2,0],[3,1],[3,2]]. Semester 1: [0]. Semester 2: [1,2]. Semester 3: [3]. Answer: 3 semesters.'
            },
            {
                title: 'Course Schedule with Weighted Prerequisites',
                difficulty: 'Hard',
                description: 'Each prerequisite edge has a "study time" weight. Find if all courses can be completed and the minimum total time if courses must be taken sequentially along the critical path.',
                whyDifferent: 'Transforms from a simple DAG feasibility check to a critical path analysis problem. You need longest-path computation on a weighted DAG, which uses topological order and dynamic programming.',
                example: 'Course 0 (2 weeks) -> Course 1 (3 weeks) -> Course 3 (1 week). Course 0 -> Course 2 (1 week) -> Course 3. Critical path: 0->1->3 = 6 weeks.'
            },
            {
                title: 'Detect Which Courses Form Circular Dependencies',
                difficulty: 'Medium',
                description: 'If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).',
                whyDifferent: 'Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.',
                example: 'numCourses=4, prerequisites=[[1,0],[0,1],[2,3]]. Courses 0 and 1 form a cycle. Courses 2 and 3 are fine. Return [0,1].'
            }
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
