"""
Course Schedule - Cycle Detection in Directed Graph
LeetCode 207 (Medium)

This problem is fundamentally about detecting cycles in a directed graph.
Two main approaches:
1. DFS with three-color marking
2. BFS with Kahn's algorithm (topological sort)

Real-world applications:
- Build system dependency resolution
- Package manager cycle detection
- Spreadsheet circular reference detection
"""

from typing import List
from collections import deque, defaultdict
from enum import Enum


class State(Enum):
    """DFS node states for cycle detection."""
    WHITE = 0  # Not visited
    GRAY = 1   # Currently visiting (in current DFS path)
    BLACK = 2  # Fully visited (done)


class Solution:
    def canFinish_dfs(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """
        Approach 1: DFS with Three-Color Marking

        Time Complexity: O(V + E) where V = numCourses, E = len(prerequisites)
        Space Complexity: O(V + E) for adjacency list + O(V) for states + O(V) recursion

        Key Insight: If we encounter a GRAY node during DFS, we've found a cycle.
        - WHITE: Haven't visited this node yet
        - GRAY: Currently exploring this node's descendants (in current DFS path)
        - BLACK: Done exploring this node and all its descendants

        If we see GRAY while exploring → cycle exists → return False
        """
        # Build adjacency list: graph[prereq] = [courses that depend on prereq]
        graph = defaultdict(list)
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        # State for each node
        state = [State.WHITE] * numCourses

        def has_cycle(node: int) -> bool:
            """
            Returns True if cycle is detected starting from this node.
            """
            if state[node] == State.GRAY:
                # Found a cycle! We're visiting a node that's in our current path
                return True

            if state[node] == State.BLACK:
                # Already fully processed, no cycle through this path
                return False

            # Mark as currently visiting
            state[node] = State.GRAY

            # Explore all neighbors (courses that depend on this one)
            for neighbor in graph[node]:
                if has_cycle(neighbor):
                    return True

            # Done with this node and all its descendants
            state[node] = State.BLACK
            return False

        # Check all nodes (graph might be disconnected)
        for course in range(numCourses):
            if state[course] == State.WHITE:
                if has_cycle(course):
                    return False  # Cycle found, can't finish

        return True  # No cycle, can finish all courses

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """
        Approach 2: BFS with Kahn's Algorithm (Topological Sort)

        Time Complexity: O(V + E)
        Space Complexity: O(V + E)

        Key Insight: Process nodes with no incoming edges (in-degree 0).
        If we can process all nodes, no cycle exists.
        If some nodes can never be processed (always have incoming edges),
        they're part of a cycle.

        This is more intuitive for many people:
        - Start with courses that have no prerequisites
        - Take those courses, which unlocks dependent courses
        - Continue until no more courses can be taken
        - If all taken → success, else → cycle exists
        """
        # Build adjacency list and count in-degrees
        graph = defaultdict(list)
        in_degree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1

        # Queue starts with all courses that have no prerequisites
        queue = deque()
        for course in range(numCourses):
            if in_degree[course] == 0:
                queue.append(course)

        # Process nodes level by level
        courses_taken = 0

        while queue:
            course = queue.popleft()
            courses_taken += 1

            # "Take" this course - remove it from the graph
            # This means decreasing in-degree of dependent courses
            for dependent in graph[course]:
                in_degree[dependent] -= 1
                if in_degree[dependent] == 0:
                    # This course now has all prerequisites met
                    queue.append(dependent)

        # If we took all courses, no cycle exists
        return courses_taken == numCourses

    def canFinish_iterative_dfs(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """
        Approach 3: Iterative DFS using explicit stack

        Same complexity as recursive DFS, but avoids recursion limit issues.
        More verbose but useful for very deep graphs.
        """
        graph = defaultdict(list)
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        state = [State.WHITE] * numCourses

        for start in range(numCourses):
            if state[start] != State.WHITE:
                continue

            # Stack stores (node, iterator over neighbors)
            stack = [(start, iter(graph[start]))]
            state[start] = State.GRAY

            while stack:
                node, neighbors = stack[-1]

                try:
                    neighbor = next(neighbors)
                    if state[neighbor] == State.GRAY:
                        return False  # Cycle detected
                    if state[neighbor] == State.WHITE:
                        state[neighbor] = State.GRAY
                        stack.append((neighbor, iter(graph[neighbor])))
                except StopIteration:
                    # Done with this node
                    state[node] = State.BLACK
                    stack.pop()

        return True


class SolutionWithPath:
    """Extended solution that also returns one valid course order."""

    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        """
        Course Schedule II: Return a valid order or empty list if impossible.
        """
        graph = defaultdict(list)
        in_degree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1

        queue = deque()
        for course in range(numCourses):
            if in_degree[course] == 0:
                queue.append(course)

        order = []

        while queue:
            course = queue.popleft()
            order.append(course)

            for dependent in graph[course]:
                in_degree[dependent] -= 1
                if in_degree[dependent] == 0:
                    queue.append(dependent)

        if len(order) == numCourses:
            return order
        return []  # Cycle exists


def visualize_graph(numCourses: int, prerequisites: List[List[int]]):
    """Visualize the prerequisite graph."""
    print(f"\nGraph with {numCourses} courses:")

    if not prerequisites:
        print("  No prerequisites (all courses independent)")
        return

    # Build adjacency representation
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    print("  Adjacency List (prereq → courses):")
    for prereq in sorted(graph.keys()):
        courses = graph[prereq]
        print(f"    {prereq} → {courses}")

    # Show in-degrees
    in_degree = [0] * numCourses
    for course, prereq in prerequisites:
        in_degree[course] += 1

    print(f"  In-degrees: {in_degree}")
    print(f"  Courses with no prerequisites: {[i for i, d in enumerate(in_degree) if d == 0]}")


def main():
    """Test all approaches with comprehensive examples."""
    solution = Solution()
    solution_with_path = SolutionWithPath()

    test_cases = [
        # (numCourses, prerequisites, expected)
        (2, [[1, 0]], True),                      # Simple chain
        (2, [[1, 0], [0, 1]], False),             # Simple cycle
        (4, [[1, 0], [2, 0], [3, 1], [3, 2]], True),  # Diamond shape
        (5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 2]], False),  # Larger cycle
        (3, [], True),                            # No prerequisites
        (1, [], True),                            # Single course
        (3, [[1, 0], [1, 2], [0, 2]], True),      # Multiple paths
        (4, [[0, 1], [3, 1], [1, 3], [3, 2]], False),  # Cycle in middle
    ]

    print("=" * 70)
    print("COURSE SCHEDULE - Cycle Detection in Directed Graph")
    print("=" * 70)

    for i, (numCourses, prerequisites, expected) in enumerate(test_cases):
        print(f"\n{'='*50}")
        print(f"Test Case {i + 1}")
        print(f"{'='*50}")

        print(f"Courses: {numCourses}")
        print(f"Prerequisites: {prerequisites}")
        print(f"Expected: {expected}")

        # Visualize
        visualize_graph(numCourses, prerequisites)

        # Test DFS approach
        result_dfs = solution.canFinish_dfs(numCourses, prerequisites)

        # Test BFS approach
        result_bfs = solution.canFinish(numCourses, prerequisites)

        # Test iterative DFS
        result_iter = solution.canFinish_iterative_dfs(numCourses, prerequisites)

        print(f"\nResults:")
        print(f"  DFS:           {result_dfs}")
        print(f"  BFS (Kahn's):  {result_bfs}")
        print(f"  Iterative DFS: {result_iter}")

        # Get valid order if possible
        order = solution_with_path.findOrder(numCourses, prerequisites)
        print(f"  Valid Order:   {order if order else 'None (cycle exists)'}")

        # Verify all approaches agree
        assert result_dfs == result_bfs == result_iter, "Approaches disagree!"

        if result_dfs == expected:
            print("\n✓ PASSED")
        else:
            print(f"\n✗ FAILED (got {result_dfs}, expected {expected})")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    main()
