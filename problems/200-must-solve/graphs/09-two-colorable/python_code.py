"""
Two-Colorable (Bipartite Graph Check) - Python Solution

Determine if a graph can be colored with two colors such that
no adjacent nodes have the same color.

Time Complexity: O(V + E) where V is vertices, E is edges
Space Complexity: O(V) for the color array
"""

from typing import List, Optional
from collections import deque


def two_colorable(edges: List[List[int]]) -> bool:
    """
    Check if the graph is two-colorable (bipartite) using BFS.

    Args:
        edges: Adjacency list where edges[i] contains neighbors of node i

    Returns:
        True if the graph is two-colorable, False otherwise
    """
    if not edges:
        return True

    num_nodes = len(edges)
    # None means uncolored, 0 and 1 are the two colors
    colors: List[Optional[int]] = [None] * num_nodes

    # Start BFS from node 0
    colors[0] = 0
    queue = deque([0])

    while queue:
        node = queue.popleft()
        current_color = colors[node]
        next_color = 1 - current_color  # Toggle between 0 and 1

        for neighbor in edges[node]:
            if colors[neighbor] is None:
                # Uncolored - assign opposite color
                colors[neighbor] = next_color
                queue.append(neighbor)
            elif colors[neighbor] == current_color:
                # Same color as current node - not two-colorable
                return False
            # If already colored with opposite color, it's valid

    return True


def two_colorable_dfs(edges: List[List[int]]) -> bool:
    """
    Check if the graph is two-colorable using DFS.

    Args:
        edges: Adjacency list where edges[i] contains neighbors of node i

    Returns:
        True if the graph is two-colorable, False otherwise
    """
    if not edges:
        return True

    num_nodes = len(edges)
    colors: List[Optional[int]] = [None] * num_nodes

    def dfs(node: int, color: int) -> bool:
        """DFS helper that returns False if coloring conflict found."""
        colors[node] = color
        next_color = 1 - color

        for neighbor in edges[node]:
            if colors[neighbor] is None:
                if not dfs(neighbor, next_color):
                    return False
            elif colors[neighbor] == color:
                return False

        return True

    # Start from node 0
    return dfs(0, 0)


def two_colorable_iterative_dfs(edges: List[List[int]]) -> bool:
    """
    Check if the graph is two-colorable using iterative DFS.

    Args:
        edges: Adjacency list where edges[i] contains neighbors of node i

    Returns:
        True if the graph is two-colorable, False otherwise
    """
    if not edges:
        return True

    num_nodes = len(edges)
    colors: List[Optional[int]] = [None] * num_nodes

    # Start from node 0
    stack = [(0, 0)]  # (node, color)

    while stack:
        node, color = stack.pop()

        if colors[node] is not None:
            if colors[node] != color:
                return False
            continue

        colors[node] = color
        next_color = 1 - color

        for neighbor in edges[node]:
            if colors[neighbor] is None:
                stack.append((neighbor, next_color))
            elif colors[neighbor] == color:
                return False

    return True


def two_colorable_disconnected(edges: List[List[int]]) -> bool:
    """
    Check if a potentially disconnected graph is two-colorable.

    Args:
        edges: Adjacency list where edges[i] contains neighbors of node i

    Returns:
        True if the graph is two-colorable, False otherwise
    """
    if not edges:
        return True

    num_nodes = len(edges)
    colors: List[Optional[int]] = [None] * num_nodes

    # Process each connected component
    for start_node in range(num_nodes):
        if colors[start_node] is not None:
            continue

        colors[start_node] = 0
        queue = deque([start_node])

        while queue:
            node = queue.popleft()
            current_color = colors[node]
            next_color = 1 - current_color

            for neighbor in edges[node]:
                if colors[neighbor] is None:
                    colors[neighbor] = next_color
                    queue.append(neighbor)
                elif colors[neighbor] == current_color:
                    return False

    return True


# Test cases
if __name__ == "__main__":
    # Test 1: Triangle (3-cycle) - not two-colorable
    edges1 = [
        [1, 2],  # Node 0 connects to 1, 2
        [0, 2],  # Node 1 connects to 0, 2
        [0, 1]   # Node 2 connects to 0, 1
    ]
    result1 = two_colorable(edges1)
    print(f"Test 1 (Triangle): {result1}")  # Expected: False
    assert result1 is False

    # Test 2: Square (4-cycle) - two-colorable
    edges2 = [
        [1, 3],  # Node 0 connects to 1, 3
        [0, 2],  # Node 1 connects to 0, 2
        [1, 3],  # Node 2 connects to 1, 3
        [0, 2]   # Node 3 connects to 0, 2
    ]
    result2 = two_colorable(edges2)
    print(f"Test 2 (Square): {result2}")  # Expected: True
    assert result2 is True

    # Test 3: Single node with self-loop - not two-colorable
    edges3 = [[0]]  # Node 0 connects to itself
    result3 = two_colorable(edges3)
    print(f"Test 3 (Self-loop): {result3}")  # Expected: False
    assert result3 is False

    # Test 4: Simple path (linear graph) - two-colorable
    edges4 = [
        [1],     # Node 0 connects to 1
        [0, 2],  # Node 1 connects to 0, 2
        [1, 3],  # Node 2 connects to 1, 3
        [2]      # Node 3 connects to 2
    ]
    result4 = two_colorable(edges4)
    print(f"Test 4 (Path): {result4}")  # Expected: True
    assert result4 is True

    # Test 5: Pentagon (5-cycle) - not two-colorable (odd cycle)
    edges5 = [
        [1, 4],  # Node 0
        [0, 2],  # Node 1
        [1, 3],  # Node 2
        [2, 4],  # Node 3
        [3, 0]   # Node 4
    ]
    result5 = two_colorable(edges5)
    print(f"Test 5 (Pentagon): {result5}")  # Expected: False
    assert result5 is False

    # Test 6: Hexagon (6-cycle) - two-colorable (even cycle)
    edges6 = [
        [1, 5],  # Node 0
        [0, 2],  # Node 1
        [1, 3],  # Node 2
        [2, 4],  # Node 3
        [3, 5],  # Node 4
        [4, 0]   # Node 5
    ]
    result6 = two_colorable(edges6)
    print(f"Test 6 (Hexagon): {result6}")  # Expected: True
    assert result6 is True

    # Test 7: Empty graph
    result7 = two_colorable([])
    print(f"Test 7 (Empty): {result7}")  # Expected: True
    assert result7 is True

    # Test DFS version
    print("\n--- Testing DFS Version ---")
    assert two_colorable_dfs(edges1) is False
    assert two_colorable_dfs(edges2) is True
    assert two_colorable_dfs(edges3) is False
    print("DFS tests passed!")

    # Test iterative DFS version
    print("\n--- Testing Iterative DFS Version ---")
    assert two_colorable_iterative_dfs(edges1) is False
    assert two_colorable_iterative_dfs(edges2) is True
    assert two_colorable_iterative_dfs(edges3) is False
    print("Iterative DFS tests passed!")

    print("\nAll tests passed!")
