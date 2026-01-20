"""
Parallel Courses - Python Solution

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from typing import List
from collections import deque, defaultdict


def minimum_semesters(n: int, relations: List[List[int]]) -> int:
    """
    Find minimum semesters to complete all courses.
    """
    graph = defaultdict(list)
    in_degree = [0] * (n + 1)

    for prev, next_course in relations:
        graph[prev].append(next_course)
        in_degree[next_course] += 1

    # BFS - each level is one semester
    queue = deque([i for i in range(1, n + 1) if in_degree[i] == 0])
    semesters = 0
    completed = 0

    while queue:
        semesters += 1
        # Process all courses available this semester
        for _ in range(len(queue)):
            course = queue.popleft()
            completed += 1

            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

    return semesters if completed == n else -1


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {minimum_semesters(3, [[1,3],[2,3]])}")  # Expected: 2
    print(f"Test 2: {minimum_semesters(3, [[1,2],[2,3],[3,1]])}")  # Expected: -1 (cycle)
    print(f"Test 3: {minimum_semesters(4, [[1,2],[1,3],[2,4],[3,4]])}")  # Expected: 3
    print("\nAll tests completed!")
