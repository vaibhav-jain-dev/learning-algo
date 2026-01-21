/**
 * Course Schedule
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'There are numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi before course ai. Return true if you can finish all courses, or false if there is a cycle.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
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
        "numCourses": 2,
        "prerequisites": [
                [
                        1,
                        0
                ]
        ]
},
        output: true,
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input numCourses=2, prerequisites=[[1, 0]], the result is true.'
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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input numCourses=2, prerequisites=[[1, 0], [0, 1]], the result is false.'
    }
        ],
        solutions: {
            python: `from collections import deque, defaultdict

def canFinish(numCourses, prerequisites):
    """
    Course Schedule using Topological Sort (Kahn's Algorithm)

    Returns True if all courses can be finished (no cycle).

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list and in-degree array
    graph = defaultdict(list)
    in_degree = [0] * numCourses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    # Start with courses that have no prerequisites
    queue = deque()
    for i in range(numCourses):
        if in_degree[i] == 0:
            queue.append(i)

    completed = 0

    while queue:
        course = queue.popleft()
        completed += 1

        # Reduce in-degree for dependent courses
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)

    # If we completed all courses, no cycle exists
    return completed == numCourses


# Test
if __name__ == "__main__":
    print(canFinish(2, [[1, 0]]))          # Output: True
    print(canFinish(2, [[1, 0], [0, 1]]))  # Output: False`,
            go: `package main

import "fmt"

// CanFinish determines if all courses can be completed.
// Time: O(V + E), Space: O(V + E)
func CanFinish(numCourses int, prerequisites [][]int) bool {
    // Build adjacency list and in-degree array
    graph := make([][]int, numCourses)
    inDegree := make([]int, numCourses)

    for _, prereq := range prerequisites {
        course, pre := prereq[0], prereq[1]
        graph[pre] = append(graph[pre], course)
        inDegree[course]++
    }

    // Start with courses that have no prerequisites
    queue := []int{}
    for i := 0; i < numCourses; i++ {
        if inDegree[i] == 0 {
            queue = append(queue, i)
        }
    }

    completed := 0

    for len(queue) > 0 {
        course := queue[0]
        queue = queue[1:]
        completed++

        for _, nextCourse := range graph[course] {
            inDegree[nextCourse]--
            if inDegree[nextCourse] == 0 {
                queue = append(queue, nextCourse)
            }
        }
    }

    return completed == numCourses
}

func main() {
    fmt.Println(CanFinish(2, [][]int{{1, 0}}))         // Output: true
    fmt.Println(CanFinish(2, [][]int{{1, 0}, {0, 1}})) // Output: false
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule'] = problem;

})();
