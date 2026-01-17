"""
All Paths From Source to Target - Python Solutions

Given a directed acyclic graph (DAG), find all paths from node 0 to node n-1.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from functools import lru_cache
from typing import List, Tuple


# ============================================================================
# APPROACH 1: DFS with Backtracking
# ============================================================================
# Time Complexity:  O(2^N × N) - potentially 2^N paths, each of length N
# Space Complexity: O(N) - recursion depth and current path
#
# WHY THIS IS BEST:
# - Natural fit for path enumeration problems
# - Efficient memory with backtracking (reuse path list)
# - Clean recursive structure
# ============================================================================

def all_paths_dfs(graph: List[List[int]]) -> List[List[int]]:
    """
    Find all paths using DFS with backtracking.

    Key Insight: Explore each path completely, backtrack when done.
    Since it's a DAG, no cycle detection needed.

    Visual for graph = [[1,2],[3],[3],[]]:

            0
           / \
          1   2     All paths: [0,1,3] and [0,2,3]
           \ /
            3
    """
    target = len(graph) - 1
    result: List[List[int]] = []
    path: List[int] = [0]  # Start at node 0

    def dfs(node: int) -> None:
        # Reached target - save current path
        if node == target:
            result.append(path[:])  # Must copy!
            return

        # Explore all neighbors
        for next_node in graph[node]:
            path.append(next_node)
            dfs(next_node)
            path.pop()  # Backtrack

    dfs(0)
    return result


# ============================================================================
# APPROACH 2: BFS with Path Tracking
# ============================================================================
# Time Complexity:  O(2^N × N)
# Space Complexity: O(2^N × N) - stores all partial paths in queue
#
# WHEN TO USE:
# - Prefer iterative solutions
# - Want level-by-level exploration
# - Don't mind higher memory usage
# ============================================================================

def all_paths_bfs(graph: List[List[int]]) -> List[List[int]]:
    """
    Find all paths using BFS.

    Queue stores complete paths, extends each path with neighbors.
    More memory-intensive but iterative.
    """
    target = len(graph) - 1
    result: List[List[int]] = []

    # Queue stores partial paths
    queue = deque([[0]])

    while queue:
        path = queue.popleft()
        last_node = path[-1]

        # Reached target
        if last_node == target:
            result.append(path)
            continue

        # Extend path with each neighbor
        for next_node in graph[last_node]:
            queue.append(path + [next_node])

    return result


# ============================================================================
# APPROACH 3: DFS with Path Copy (Functional Style)
# ============================================================================
# Time Complexity:  O(2^N × N)
# Space Complexity: O(2^N × N) - creates new path for each branch
#
# WHEN TO USE:
# - Prefer immutable approach
# - Code clarity over memory efficiency
# ============================================================================

def all_paths_functional(graph: List[List[int]]) -> List[List[int]]:
    """
    Functional-style DFS without mutation.

    Creates new path list at each step instead of backtracking.
    More Pythonic but uses more memory.
    """
    target = len(graph) - 1

    def dfs(node: int, path: List[int]) -> List[List[int]]:
        new_path = path + [node]

        # Reached target
        if node == target:
            return [new_path]

        # Collect all paths through neighbors
        result = []
        for next_node in graph[node]:
            result.extend(dfs(next_node, new_path))

        return result

    return dfs(0, [])


# ============================================================================
# APPROACH 4: Dynamic Programming (Memoization)
# ============================================================================
# Time Complexity:  O(2^N × N)
# Space Complexity: O(2^N × N) for storing paths from each node
#
# WHEN TO USE:
# - Want to cache paths from intermediate nodes
# - Graph has overlapping subpaths
# ============================================================================

def all_paths_dp(graph: List[List[int]]) -> List[List[int]]:
    """
    Use dynamic programming to cache paths from each node.

    memo[node] = all paths from node to target.
    Builds solution bottom-up from target.
    """
    target = len(graph) - 1

    # Use dictionary for memoization
    memo: dict[int, List[List[int]]] = {}

    def dp(node: int) -> List[List[int]]:
        # Check memo
        if node in memo:
            return memo[node]

        # Base case: at target
        if node == target:
            memo[node] = [[target]]
            return memo[node]

        # Build paths through all neighbors
        paths = []
        for next_node in graph[node]:
            # Get all paths from neighbor to target
            for sub_path in dp(next_node):
                # Prepend current node
                paths.append([node] + sub_path)

        memo[node] = paths
        return paths

    return dp(0)


# ============================================================================
# APPROACH 5: Generator-based (Memory Efficient)
# ============================================================================
# Time Complexity:  O(2^N × N)
# Space Complexity: O(N) for recursion - yields paths one at a time
#
# WHEN TO USE:
# - Memory is critical
# - Only need to process paths one at a time
# - Don't need all paths in memory simultaneously
# ============================================================================

def all_paths_generator(graph: List[List[int]]):
    """
    Generator that yields paths one at a time.

    Most memory-efficient when you don't need all paths at once.
    """
    target = len(graph) - 1
    path = [0]

    def dfs(node: int):
        if node == target:
            yield path[:]
            return

        for next_node in graph[node]:
            path.append(next_node)
            yield from dfs(next_node)
            path.pop()

    yield from dfs(0)


# For testing, convert generator to list
def all_paths_generator_list(graph: List[List[int]]) -> List[List[int]]:
    return list(all_paths_generator(graph))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (
            [[1, 2], [3], [3], []],
            [[0, 1, 3], [0, 2, 3]],
            "Simple diamond graph"
        ),
        (
            [[4, 3, 1], [3, 2, 4], [3], [4], []],
            [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]],
            "Complex DAG"
        ),
        (
            [[1], []],
            [[0, 1]],
            "Two nodes"
        ),
        (
            [[1, 2, 3], [2, 3], [3], []],
            [[0, 1, 2, 3], [0, 1, 3], [0, 2, 3], [0, 3]],
            "Multiple paths with branching"
        ),
    ]

    approaches = [
        ("DFS Backtracking", all_paths_dfs),
        ("BFS Path Tracking", all_paths_bfs),
        ("Functional DFS", all_paths_functional),
        ("Dynamic Programming", all_paths_dp),
        ("Generator-based", all_paths_generator_list),
    ]

    print("=" * 70)
    print("ALL PATHS FROM SOURCE TO TARGET - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for graph, expected, desc in test_cases:
            result = func(graph)
            # Check if number of paths match
            status = "PASS" if len(result) == len(expected) else "FAIL"
            print(f"  [{status}] {desc}: found {len(result)} paths (expected {len(expected)})")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("DETAILED EXAMPLE")
    print("=" * 70)

    # Detailed example
    graph = [[1, 2], [3], [3], []]
    print("\nInput: graph = [[1,2],[3],[3],[]]")
    print("\nGraph structure:")
    print("  Node 0 -> [1, 2]")
    print("  Node 1 -> [3]")
    print("  Node 2 -> [3]")
    print("  Node 3 -> [] (target)")

    paths = all_paths_dfs(graph)
    print(f"\nAll paths from 0 to 3: {paths}")

    print("\nPath exploration:")
    print("  0 -> 1 -> 3 (found!)")
    print("  0 -> 2 -> 3 (found!)")

    # Complex example
    print("\n" + "=" * 70)
    print("COMPLEX EXAMPLE")
    print("=" * 70)

    graph2 = [[4, 3, 1], [3, 2, 4], [3], [4], []]
    print("\nInput: graph = [[4,3,1],[3,2,4],[3],[4],[]]")
    paths2 = all_paths_dfs(graph2)
    print(f"All paths from 0 to 4: {paths2}")
    print(f"Total: {len(paths2)} paths")

    # Demonstrate generator efficiency
    print("\n" + "=" * 70)
    print("GENERATOR EXAMPLE (Memory Efficient)")
    print("=" * 70)

    print("\nProcessing paths one at a time:")
    for i, path in enumerate(all_paths_generator([[1, 2], [3], [3], []]), 1):
        print(f"  Path {i}: {path}")

    print("\nAll tests completed!")
