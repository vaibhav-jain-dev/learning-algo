"""
Cycle Detection in Graph - Python Solution

Detect if a directed graph contains a cycle using DFS.

Time Complexity: O(V + E) where V is vertices, E is edges
Space Complexity: O(V) for the color array and recursion stack
"""

from typing import List
from enum import IntEnum


class Color(IntEnum):
    """Node states for cycle detection."""
    WHITE = 0  # Unvisited
    GRAY = 1   # Currently in DFS path (being processed)
    BLACK = 2  # Fully processed


def cycle_in_graph(edges: List[List[int]]) -> bool:
    """
    Detect if a directed graph contains a cycle.

    Args:
        edges: Adjacency list where edges[i] contains nodes that node i points to

    Returns:
        True if the graph contains a cycle, False otherwise
    """
    num_nodes = len(edges)
    colors = [Color.WHITE] * num_nodes

    def dfs(node: int) -> bool:
        """DFS helper that returns True if cycle is found."""
        colors[node] = Color.GRAY

        for neighbor in edges[node]:
            if colors[neighbor] == Color.GRAY:
                # Found a back edge - cycle detected
                return True
            if colors[neighbor] == Color.WHITE:
                if dfs(neighbor):
                    return True

        colors[node] = Color.BLACK
        return False

    # Check all nodes to handle disconnected components
    for node in range(num_nodes):
        if colors[node] == Color.WHITE:
            if dfs(node):
                return True

    return False


def cycle_in_graph_iterative(edges: List[List[int]]) -> bool:
    """
    Detect cycle using iterative DFS with explicit stack.

    Args:
        edges: Adjacency list representation of the graph

    Returns:
        True if the graph contains a cycle, False otherwise
    """
    num_nodes = len(edges)
    colors = [Color.WHITE] * num_nodes

    for start in range(num_nodes):
        if colors[start] != Color.WHITE:
            continue

        stack = [(start, False)]  # (node, is_backtracking)

        while stack:
            node, is_backtracking = stack.pop()

            if is_backtracking:
                colors[node] = Color.BLACK
                continue

            if colors[node] == Color.GRAY:
                # Already being processed - cycle found
                return True

            if colors[node] == Color.BLACK:
                continue

            colors[node] = Color.GRAY
            stack.append((node, True))  # Add backtrack marker

            for neighbor in edges[node]:
                if colors[neighbor] == Color.GRAY:
                    return True
                if colors[neighbor] == Color.WHITE:
                    stack.append((neighbor, False))

    return False


def cycle_in_graph_simple(edges: List[List[int]]) -> bool:
    """
    Simpler version using two sets: visited and in_stack.

    Args:
        edges: Adjacency list representation of the graph

    Returns:
        True if the graph contains a cycle, False otherwise
    """
    num_nodes = len(edges)
    visited = set()
    in_stack = set()

    def dfs(node: int) -> bool:
        visited.add(node)
        in_stack.add(node)

        for neighbor in edges[node]:
            if neighbor in in_stack:
                return True
            if neighbor not in visited:
                if dfs(neighbor):
                    return True

        in_stack.remove(node)
        return False

    for node in range(num_nodes):
        if node not in visited:
            if dfs(node):
                return True

    return False


# Test cases
if __name__ == "__main__":
    # Test 1: Graph with cycle (0 -> 1 -> 2 -> 0)
    edges1 = [
        [1, 3],     # Node 0 -> 1, 3
        [2, 3, 4],  # Node 1 -> 2, 3, 4
        [0],        # Node 2 -> 0
        [],         # Node 3 (no outgoing)
        [2, 5],     # Node 4 -> 2, 5
        []          # Node 5 (no outgoing)
    ]
    result1 = cycle_in_graph(edges1)
    print(f"Test 1 (Has cycle): {result1}")  # Expected: True
    assert result1 is True

    # Test 2: DAG - no cycle
    edges2 = [
        [1, 2],  # Node 0 -> 1, 2
        [2],     # Node 1 -> 2
        []       # Node 2 (no outgoing)
    ]
    result2 = cycle_in_graph(edges2)
    print(f"Test 2 (No cycle - DAG): {result2}")  # Expected: False
    assert result2 is False

    # Test 3: Self-loop
    edges3 = [
        [0],  # Node 0 -> 0 (self-loop)
        [2],
        []
    ]
    result3 = cycle_in_graph(edges3)
    print(f"Test 3 (Self-loop): {result3}")  # Expected: True
    assert result3 is True

    # Test 4: Disconnected graph with cycle in one component
    edges4 = [
        [1],     # Component 1: 0 -> 1 -> 2 -> 0
        [2],
        [0],
        [4],     # Component 2: 3 -> 4 -> 5 (no cycle)
        [5],
        []
    ]
    result4 = cycle_in_graph(edges4)
    print(f"Test 4 (Disconnected with cycle): {result4}")  # Expected: True
    assert result4 is True

    # Test 5: Single node, no edges
    edges5 = [[]]
    result5 = cycle_in_graph(edges5)
    print(f"Test 5 (Single node): {result5}")  # Expected: False
    assert result5 is False

    # Test 6: Two nodes, no cycle
    edges6 = [[1], []]
    result6 = cycle_in_graph(edges6)
    print(f"Test 6 (Two nodes, no cycle): {result6}")  # Expected: False
    assert result6 is False

    # Test 7: Two nodes with cycle
    edges7 = [[1], [0]]
    result7 = cycle_in_graph(edges7)
    print(f"Test 7 (Two nodes with cycle): {result7}")  # Expected: True
    assert result7 is True

    # Test iterative version
    print("\n--- Testing Iterative Version ---")
    assert cycle_in_graph_iterative(edges1) is True
    assert cycle_in_graph_iterative(edges2) is False
    assert cycle_in_graph_iterative(edges3) is True
    print("Iterative version tests passed!")

    # Test simple version
    print("\n--- Testing Simple Version ---")
    assert cycle_in_graph_simple(edges1) is True
    assert cycle_in_graph_simple(edges2) is False
    assert cycle_in_graph_simple(edges3) is True
    print("Simple version tests passed!")

    print("\nAll tests passed!")
