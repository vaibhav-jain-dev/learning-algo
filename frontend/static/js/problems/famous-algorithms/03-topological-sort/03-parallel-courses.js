/**
 * Parallel Courses
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Parallel Courses',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'You are given an integer n, which indicates there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCourse, nextCourse], indicating that prevCourse must be taken before nextCourse. In one semester, you can take any number of courses as long as all prerequisites are completed. Return the minimum number of semesters needed to complete all courses. Return -1 if it\'s impossible.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(V + E) time with O(V + E) space.',
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
        "n": 3,
        "relations": [
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: 2,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    }
        ],
        solutions: {
            python: `from collections import deque, defaultdict

def minimumSemesters(n, relations):
    """
    Parallel Courses using Topological Sort with Level Tracking

    Find minimum semesters to complete all courses.
    Each semester, take all available courses (in-degree = 0).

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list and in-degree array
    graph = defaultdict(list)
    in_degree = [0] * (n + 1)

    for prev_course, next_course in relations:
        graph[prev_course].append(next_course)
        in_degree[next_course] += 1

    # Start with courses that have no prerequisites
    queue = deque()
    for i in range(1, n + 1):
        if in_degree[i] == 0:
            queue.append(i)

    semesters = 0
    completed = 0

    while queue:
        # Process all courses available this semester
        size = len(queue)
        semesters += 1

        for _ in range(size):
            course = queue.popleft()
            completed += 1

            for next_course in graph[course]:
                in_degree[next_course] -= 1
                if in_degree[next_course] == 0:
                    queue.append(next_course)

    # Return -1 if cycle exists (not all courses completed)
    return semesters if completed == n else -1


# Test
if __name__ == "__main__":
    print(minimumSemesters(3, [[1, 3], [2, 3]]))  # Output: 2`,
            go: `package main

import "fmt"

// MinimumSemesters finds minimum semesters to complete all courses.
// Time: O(V + E), Space: O(V + E)
func MinimumSemesters(n int, relations [][]int) int {
    // Build adjacency list and in-degree array
    graph := make([][]int, n+1)
    inDegree := make([]int, n+1)

    for _, rel := range relations {
        prevCourse, nextCourse := rel[0], rel[1]
        graph[prevCourse] = append(graph[prevCourse], nextCourse)
        inDegree[nextCourse]++
    }

    // Start with courses that have no prerequisites
    queue := []int{}
    for i := 1; i <= n; i++ {
        if inDegree[i] == 0 {
            queue = append(queue, i)
        }
    }

    semesters := 0
    completed := 0

    for len(queue) > 0 {
        size := len(queue)
        semesters++

        for i := 0; i < size; i++ {
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
    }

    if completed == n {
        return semesters
    }
    return -1
}

func main() {
    fmt.Println(MinimumSemesters(3, [][]int{{1, 3}, {2, 3}})) // Output: 2
}`
        },
        twists: [
            { id: '03-topological-sort/03-parallel-courses/twist-01-limited-courses-per-semester', name: 'Limited Courses Per Semester', difficulty: 'Hard' },
            { id: '03-topological-sort/03-parallel-courses/twist-02-course-dependencies-with-weights', name: 'Course Dependencies with Weights', difficulty: 'Hard' },
            { id: '03-topological-sort/03-parallel-courses/twist-03-semester-schedule-output', name: 'Semester Schedule Output', difficulty: 'Medium' },
            { id: '03-topological-sort/03-parallel-courses/twist-04-optional-prerequisites', name: 'Optional Prerequisites', difficulty: 'Hard' },
            { id: '03-topological-sort/03-parallel-courses/twist-05-maximum-parallelism', name: 'Maximum Parallelism', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses'] = problem;

})();
