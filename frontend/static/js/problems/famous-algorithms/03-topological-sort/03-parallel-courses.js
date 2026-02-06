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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input n=3, relations=[[1, 3], [2, 3]], the result is 2.'
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
            { title: 'Limited Courses Per Semester', difficulty: 'Hard', description: 'You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.', whyDifferent: 'With a capacity constraint, you cannot take all available courses each semester, requiring greedy or DP-based selection of which courses to prioritize.', example: 'With 4 available courses but k=2, you need at least 2 semesters even if all are independent, plus more if there are dependencies.' },
            { title: 'Course Dependencies with Weights', difficulty: 'Hard', description: 'Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.', whyDifferent: 'The semester duration becomes the maximum course length in that semester, making it a critical path problem rather than a simple level count.', example: 'Semester 1: courses A(3 weeks) and B(5 weeks) run in parallel = 5 weeks. Total time depends on the critical path.' },
            { title: 'Semester Schedule Output', difficulty: 'Medium', description: 'Return the actual course groupings per semester, not just the count of semesters.', whyDifferent: 'Requires recording which courses are taken in each BFS level, not just counting levels, adding bookkeeping to the topological sort.', example: 'For 4 courses with relations [[1,3],[2,3]], return [[1,2],[3]] showing semester assignments.' },
            { title: 'Optional Prerequisites', difficulty: 'Hard', description: 'Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.', whyDifferent: 'Requires partitioning edges into required and optional, then finding the critical path considering only required edges while tracking optional ones for reporting.', example: 'If course 3 requires course 1 but only recommends course 2, you can take 3 after just completing 1.' },
            { title: 'Maximum Parallelism', difficulty: 'Medium', description: 'Find the maximum number of courses that can be taken simultaneously in any single semester.', whyDifferent: 'Instead of counting semesters, find the widest level in the BFS -- the semester where the most courses have all prerequisites met simultaneously.', example: 'For 6 courses where 4 become available after completing the first 2, maximum parallelism is 4.' }
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
