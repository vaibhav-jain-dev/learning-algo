"""
Course Schedule - Python Solutions

Determine if you can finish all courses given prerequisites.
This is a cycle detection problem in directed graphs.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import defaultdict, deque
from typing import List


# ============================================================================
# APPROACH 1: DFS with Three-State Coloring
# ============================================================================
# Time Complexity:  O(V + E) - visit each node and edge once
# Space Complexity: O(V + E) - adjacency list and recursion stack
#
# WHY THIS IS BEST:
# - Clean implementation of cycle detection
# - Three states clearly track node status
# - Easy to understand the back-edge detection
# ============================================================================

def can_finish_dfs(num_courses: int, prerequisites: List[List[int]]) -> bool:
    """
    Detect if courses can be completed using DFS cycle detection.

    Three states:
    - WHITE (0): Not visited
    - GRAY (1): Currently in DFS path
    - BLACK (2): Completely processed

    Cycle exists if we encounter a GRAY node during DFS.
    """
    # Build adjacency list
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # State tracking: 0=white, 1=gray, 2=black
    WHITE, GRAY, BLACK = 0, 1, 2
    state = [WHITE] * num_courses

    def has_cycle(node: int) -> bool:
        """Return True if cycle is detected starting from node."""
        if state[node] == GRAY:
            return True  # Back edge found - cycle!
        if state[node] == BLACK:
            return False  # Already fully processed

        # Mark as being processed
        state[node] = GRAY

        # Explore neighbors
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True

        # Mark as fully processed
        state[node] = BLACK
        return False

    # Check each node (graph might be disconnected)
    for course in range(num_courses):
        if has_cycle(course):
            return False

    return True


# ============================================================================
# APPROACH 2: Kahn's Algorithm (BFS Topological Sort)
# ============================================================================
# Time Complexity:  O(V + E)
# Space Complexity: O(V + E)
#
# WHEN TO USE:
# - Need to find valid ordering (not just detect cycle)
# - Prefer iterative over recursive
# - Want to process nodes in dependency order
# ============================================================================

def can_finish_bfs(num_courses: int, prerequisites: List[List[int]]) -> bool:
    """
    Detect if courses can be completed using Kahn's algorithm.

    Key insight: If topological sort processes all nodes, no cycle exists.

    Process:
    1. Calculate in-degree for each node
    2. Add all zero in-degree nodes to queue
    3. Process queue, reducing in-degrees
    4. If all nodes processed, no cycle
    """
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    # Queue starts with all zero in-degree nodes
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    processed = 0

    while queue:
        node = queue.popleft()
        processed += 1

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # All courses processed means no cycle
    return processed == num_courses


# ============================================================================
# APPROACH 3: DFS with Visited Set (Alternative)
# ============================================================================
# Time Complexity:  O(V + E)
# Space Complexity: O(V + E)
#
# SIMPLER VERSION:
# - Uses two sets instead of state array
# - More Pythonic but slightly more memory
# ============================================================================

def can_finish_sets(num_courses: int, prerequisites: List[List[int]]) -> bool:
    """
    Detect cycles using visited and path sets.

    - visited: Nodes we've fully explored (safe)
    - path: Nodes in current DFS path (cycle if revisited)
    """
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    visited = set()
    path = set()

    def dfs(node: int) -> bool:
        """Return True if no cycle found from this node."""
        if node in path:
            return False  # Cycle detected
        if node in visited:
            return True  # Already verified safe

        path.add(node)
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        path.remove(node)

        visited.add(node)
        return True

    return all(dfs(i) for i in range(num_courses))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (2, [[1, 0]], True, "Simple dependency"),
        (2, [[1, 0], [0, 1]], False, "Simple cycle"),
        (4, [[1, 0], [2, 0], [3, 1], [3, 2]], True, "Diamond shape"),
        (1, [], True, "Single course no prereqs"),
        (3, [[0, 1], [0, 2], [1, 2]], True, "Chain dependency"),
        (3, [[0, 1], [1, 2], [2, 0]], False, "Triangular cycle"),
        (5, [[1, 0], [2, 1], [3, 2], [4, 3]], True, "Linear chain"),
        (4, [[1, 0], [2, 1], [0, 2]], False, "3-node cycle in larger graph"),
    ]

    approaches = [
        ("DFS Three-State", can_finish_dfs),
        ("BFS Kahn's", can_finish_bfs),
        ("DFS with Sets", can_finish_sets),
    ]

    print("=" * 70)
    print("COURSE SCHEDULE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, prereqs, expected, desc in test_cases:
            result = func(n, prereqs)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLES")
    print("=" * 70)

    # Example 1: Can complete
    print("\nExample 1:")
    print("  numCourses = 4")
    print("  prerequisites = [[1,0], [2,0], [3,1], [3,2]]")
    result = can_finish_dfs(4, [[1, 0], [2, 0], [3, 1], [3, 2]])
    print(f"  Output: {result}")
    print("  Explanation: Take 0 -> 1,2 -> 3")

    # Example 2: Cannot complete (cycle)
    print("\nExample 2:")
    print("  numCourses = 2")
    print("  prerequisites = [[1,0], [0,1]]")
    result = can_finish_dfs(2, [[1, 0], [0, 1]])
    print(f"  Output: {result}")
    print("  Explanation: 0 and 1 depend on each other (cycle)")

    print("\nAll examples completed!")
