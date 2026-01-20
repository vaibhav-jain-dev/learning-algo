"""
Find Eventual Safe States - Python Solutions

Find all nodes that don't lead to cycles (safe nodes).
A node is safe if all paths from it lead to terminal nodes.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from typing import List


# ============================================================================
# APPROACH 1: DFS with Three-State Coloring
# ============================================================================
# Time Complexity:  O(V + E) - visit each node and edge once
# Space Complexity: O(V) for state array and recursion stack
#
# WHY THIS IS BEST:
# - Same pattern as cycle detection
# - Nodes that complete DFS without hitting GRAY are safe
# - Clean classification of safe vs unsafe nodes
# ============================================================================

def eventual_safe_nodes_dfs(graph: List[List[int]]) -> List[int]:
    """
    Find safe nodes using DFS with three-state coloring.

    States:
    - WHITE (0): Unvisited
    - GRAY (1): In current DFS path (potentially in cycle)
    - BLACK (2): Verified safe

    A node is safe if DFS from it only reaches BLACK nodes.
    """
    n = len(graph)
    WHITE, GRAY, BLACK = 0, 1, 2
    state = [WHITE] * n

    def is_safe(node: int) -> bool:
        """Return True if node is safe (no cycles reachable)."""
        if state[node] == GRAY:
            return False  # Currently in path - cycle!
        if state[node] == BLACK:
            return True  # Already verified safe

        # Mark as being processed
        state[node] = GRAY

        # Check all neighbors
        for neighbor in graph[node]:
            if not is_safe(neighbor):
                return False  # Unsafe neighbor means we're unsafe

        # All neighbors safe, mark as safe
        state[node] = BLACK
        return True

    # Find all safe nodes
    return [node for node in range(n) if is_safe(node)]


# ============================================================================
# APPROACH 2: Reverse Graph + BFS (Topological Sort)
# ============================================================================
# Time Complexity:  O(V + E)
# Space Complexity: O(V + E) for reverse graph
#
# WHEN TO USE:
# - Want to build from terminal nodes outward
# - Prefer BFS/iterative approach
# - Need to track safe nodes incrementally
# ============================================================================

def eventual_safe_nodes_bfs(graph: List[List[int]]) -> List[int]:
    """
    Find safe nodes using reverse graph and BFS.

    Key insight:
    - Terminal nodes (out-degree 0) are definitely safe
    - A node is safe if ALL its outgoing edges lead to safe nodes
    - Build reverse graph, start from terminals, propagate backwards
    """
    n = len(graph)

    # Build reverse graph and track out-degrees
    reverse_graph = [[] for _ in range(n)]
    out_degree = [0] * n

    for node in range(n):
        out_degree[node] = len(graph[node])
        for neighbor in graph[node]:
            reverse_graph[neighbor].append(node)

    # Start with terminal nodes (out-degree 0)
    queue = deque([node for node in range(n) if out_degree[node] == 0])
    safe = [False] * n

    while queue:
        node = queue.popleft()
        safe[node] = True

        # Check all nodes that point TO this node
        for prev_node in reverse_graph[node]:
            out_degree[prev_node] -= 1
            # If all outgoing edges now lead to safe nodes
            if out_degree[prev_node] == 0:
                queue.append(prev_node)

    return [node for node in range(n) if safe[node]]


# ============================================================================
# APPROACH 3: DFS with Memoization (Alternative)
# ============================================================================
# Time Complexity:  O(V + E)
# Space Complexity: O(V)
#
# CLEANER CODE:
# - Uses explicit safe/unsafe arrays
# - More readable logic
# ============================================================================

def eventual_safe_nodes_memo(graph: List[List[int]]) -> List[int]:
    """
    Find safe nodes using DFS with explicit memoization.
    """
    n = len(graph)
    safe = [None] * n  # None = unknown, True = safe, False = unsafe
    visiting = [False] * n

    def dfs(node: int) -> bool:
        """Return True if node is safe."""
        if safe[node] is not None:
            return safe[node]
        if visiting[node]:
            return False  # Cycle detected

        visiting[node] = True

        # Check all neighbors
        for neighbor in graph[node]:
            if not dfs(neighbor):
                safe[node] = False
                return False

        visiting[node] = False
        safe[node] = True
        return True

    return [node for node in range(n) if dfs(node)]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[1, 2], [2, 3], [5], [0], [5], [], []], [2, 4, 5, 6], "Mixed safe/unsafe"),
        ([[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []], [4], "Mostly cycles"),
        ([[], [0], [1], [2]], [0, 1, 2, 3], "Linear chain to terminal"),
        ([[1], [2], [0]], [], "Pure cycle - no safe nodes"),
        ([[], [], []], [0, 1, 2], "All terminals"),
        ([[1], [2], []], [0, 1, 2], "Simple chain"),
        ([[0]], [], "Self-loop"),
    ]

    approaches = [
        ("DFS Three-State", eventual_safe_nodes_dfs),
        ("BFS Reverse Graph", eventual_safe_nodes_bfs),
        ("DFS with Memo", eventual_safe_nodes_memo),
    ]

    print("=" * 70)
    print("FIND EVENTUAL SAFE STATES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for graph, expected, desc in test_cases:
            result = func([row[:] for row in graph])
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

    # Example 1
    print("\nExample 1:")
    graph1 = [[1, 2], [2, 3], [5], [0], [5], [], []]
    print(f"  Input: graph = {graph1}")
    result = eventual_safe_nodes_dfs(graph1)
    print(f"  Output: {result}")
    print("  Explanation: 5,6 are terminals; 2,4 only reach terminals")

    # Example 2
    print("\nExample 2:")
    graph2 = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]
    print(f"  Input: graph = {graph2}")
    result = eventual_safe_nodes_dfs(graph2)
    print(f"  Output: {result}")
    print("  Explanation: Only node 4 is terminal and safe")

    print("\nAll examples completed!")
