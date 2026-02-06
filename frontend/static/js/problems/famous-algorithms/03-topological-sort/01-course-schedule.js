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
        twists: [
            { title: 'Course Schedule II (Order)', difficulty: 'Medium', description: 'Return one valid order in which courses can be taken, not just whether it is possible.', whyDifferent: 'Extends from boolean feasibility to constructing a concrete ordering, requiring you to record the topological order during BFS.', example: 'For 4 courses with prereqs [[1,0],[2,0],[3,1],[3,2]], return [0,1,2,3] or [0,2,1,3].' },
            { title: 'Course Schedule with Groups', difficulty: 'Hard', description: 'Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.', whyDifferent: 'Adds a capacity constraint to each BFS level, requiring greedy or DP-based selection of which available courses to take each semester.', example: 'With 6 courses, max 2 per semester, and dependencies: even with all available, you can only take 2 at a time.' },
            { title: 'DFS Cycle Detection', difficulty: 'Medium', description: 'Detect whether the course prerequisite graph has a cycle using DFS with three-color marking instead of BFS in-degree approach.', whyDifferent: 'Uses a fundamentally different cycle detection method -- white/gray/black coloring where finding a gray node during DFS indicates a back edge (cycle).', example: 'Color nodes white (unvisited), gray (in progress), black (done). If DFS visits a gray node, a cycle exists.' },
            { title: 'Minimum Prerequisites to Remove', difficulty: 'Hard', description: 'If a cycle exists, find the minimum number of prerequisite edges to remove to make the schedule valid.', whyDifferent: 'Transforms from cycle detection to minimum feedback arc set, an NP-hard problem in general that requires heuristic or special-case solutions.', example: 'For prerequisites [[0,1],[1,2],[2,0]], removing any one edge breaks the cycle. Minimum removals = 1.' },
            { title: 'Check Specific Order Validity', difficulty: 'Easy', description: 'Given a proposed course ordering, verify if it respects all prerequisite constraints.', whyDifferent: 'Inverts from generating a valid order to validating a given one, which is simpler -- just check that every prerequisite appears before its dependent course.', example: 'For prereqs [[1,0],[2,1]] and order [0,1,2], return true. For order [1,0,2], return false because 1 appears before its prereq 0.' }
        ],
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
