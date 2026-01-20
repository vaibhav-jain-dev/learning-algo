"""
Course Schedule - Python Solution

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from typing import List
from collections import deque, defaultdict


def can_finish(num_courses: int, prerequisites: List[List[int]]) -> bool:
    """
    Determine if all courses can be completed.
    """
    graph = defaultdict(list)
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    count = 0

    while queue:
        node = queue.popleft()
        count += 1

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return count == num_courses


def find_order(num_courses: int, prerequisites: List[List[int]]) -> List[int]:
    """
    Return the order in which courses should be taken.
    """
    graph = defaultdict(list)
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == num_courses else []


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {can_finish(2, [[1,0]])}")  # Expected: True
    print(f"Test 2: {can_finish(2, [[1,0],[0,1]])}")  # Expected: False
    print(f"Test 3: {find_order(4, [[1,0],[2,0],[3,1],[3,2]])}")  # Expected: [0,1,2,3] or [0,2,1,3]
    print("\nAll tests completed!")
