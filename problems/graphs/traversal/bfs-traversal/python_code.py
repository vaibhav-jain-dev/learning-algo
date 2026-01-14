"""
BFS Traversal of Graph

Perform Breadth-First Search traversal starting from a given node.
"""

from collections import deque
from typing import Dict, List, Set


def bfs_traversal(graph: Dict[int, List[int]], start: int) -> List[int]:
    """
    Perform BFS traversal of the graph starting from the given node.

    Args:
        graph: Adjacency list representation of the graph
        start: Starting node for BFS

    Returns:
        List of nodes in BFS traversal order
    """
    if start not in graph:
        return []

    result = []
    visited: Set[int] = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        node = queue.popleft()
        result.append(node)

        # Add all unvisited neighbors to the queue
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result


def bfs_traversal_all_components(graph: Dict[int, List[int]]) -> List[List[int]]:
    """
    Perform BFS traversal covering all connected components.

    Args:
        graph: Adjacency list representation of the graph

    Returns:
        List of BFS traversals, one for each connected component
    """
    if not graph:
        return []

    visited: Set[int] = set()
    components = []

    for node in graph:
        if node not in visited:
            component = []
            queue = deque([node])
            visited.add(node)

            while queue:
                current = queue.popleft()
                component.append(current)

                for neighbor in graph[current]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)

            components.append(component)

    return components


def bfs_level_order(graph: Dict[int, List[int]], start: int) -> List[List[int]]:
    """
    Perform BFS traversal and return nodes grouped by level.

    Args:
        graph: Adjacency list representation of the graph
        start: Starting node for BFS

    Returns:
        List of lists, where each inner list contains nodes at that level
    """
    if start not in graph:
        return []

    result = []
    visited: Set[int] = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node)

            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        result.append(level)

    return result


def run_tests():
    """Run test cases for BFS traversal."""
    print("=" * 60)
    print("BFS TRAVERSAL TESTS")
    print("=" * 60)

    # Test 1: Basic graph
    print("\nTest 1: Basic connected graph")
    graph1 = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 5],
        3: [1],
        4: [1],
        5: [2]
    }
    result = bfs_traversal(graph1, 0)
    print(f"Graph: {graph1}")
    print(f"Start: 0")
    print(f"BFS Order: {result}")
    assert result == [0, 1, 2, 3, 4, 5], f"Expected [0, 1, 2, 3, 4, 5], got {result}"
    print("PASSED")

    # Test 2: Linear graph
    print("\nTest 2: Linear graph")
    graph2 = {
        0: [1],
        1: [0, 2],
        2: [1, 3],
        3: [2]
    }
    result = bfs_traversal(graph2, 1)
    print(f"Graph: {graph2}")
    print(f"Start: 1")
    print(f"BFS Order: {result}")
    assert result == [1, 0, 2, 3], f"Expected [1, 0, 2, 3], got {result}"
    print("PASSED")

    # Test 3: Disconnected graph - single component
    print("\nTest 3: Isolated nodes")
    graph3 = {
        0: [],
        1: [],
        2: []
    }
    result = bfs_traversal(graph3, 0)
    print(f"Graph: {graph3}")
    print(f"Start: 0")
    print(f"BFS Order: {result}")
    assert result == [0], f"Expected [0], got {result}"
    print("PASSED")

    # Test 4: Complete graph
    print("\nTest 4: Complete graph (K4)")
    graph4 = {
        0: [1, 2, 3],
        1: [0, 2, 3],
        2: [0, 1, 3],
        3: [0, 1, 2]
    }
    result = bfs_traversal(graph4, 0)
    print(f"Graph: Complete graph K4")
    print(f"Start: 0")
    print(f"BFS Order: {result}")
    assert result == [0, 1, 2, 3], f"Expected [0, 1, 2, 3], got {result}"
    print("PASSED")

    # Test 5: BFS with all components
    print("\nTest 5: Disconnected graph - all components")
    graph5 = {
        0: [1],
        1: [0],
        2: [3],
        3: [2],
        4: []
    }
    result = bfs_traversal_all_components(graph5)
    print(f"Graph: {graph5}")
    print(f"All Components: {result}")
    assert len(result) == 3, f"Expected 3 components, got {len(result)}"
    print("PASSED")

    # Test 6: Level order BFS
    print("\nTest 6: Level order BFS")
    graph6 = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 5],
        3: [1],
        4: [1],
        5: [2]
    }
    result = bfs_level_order(graph6, 0)
    print(f"Graph: {graph6}")
    print(f"Start: 0")
    print(f"Level Order: {result}")
    assert result == [[0], [1, 2], [3, 4, 5]], f"Expected [[0], [1, 2], [3, 4, 5]], got {result}"
    print("PASSED")

    # Test 7: Single node
    print("\nTest 7: Single node graph")
    graph7 = {0: []}
    result = bfs_traversal(graph7, 0)
    print(f"Graph: {graph7}")
    print(f"Start: 0")
    print(f"BFS Order: {result}")
    assert result == [0], f"Expected [0], got {result}"
    print("PASSED")

    # Test 8: Cycle graph
    print("\nTest 8: Cycle graph")
    graph8 = {
        0: [1, 4],
        1: [0, 2],
        2: [1, 3],
        3: [2, 4],
        4: [3, 0]
    }
    result = bfs_traversal(graph8, 0)
    print(f"Graph: Cycle with 5 nodes")
    print(f"Start: 0")
    print(f"BFS Order: {result}")
    assert len(result) == 5, f"Expected 5 nodes, got {len(result)}"
    print("PASSED")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
