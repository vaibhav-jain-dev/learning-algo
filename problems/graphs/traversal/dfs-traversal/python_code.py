"""
DFS Traversal of Graph

Perform Depth-First Search traversal starting from a given node.
"""

from typing import Dict, List, Set


def dfs_recursive(graph: Dict[int, List[int]], start: int) -> List[int]:
    """
    Perform recursive DFS traversal of the graph.

    Args:
        graph: Adjacency list representation of the graph
        start: Starting node for DFS

    Returns:
        List of nodes in DFS traversal order
    """
    if start not in graph:
        return []

    result = []
    visited: Set[int] = set()

    def dfs(node: int):
        visited.add(node)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return result


def dfs_iterative(graph: Dict[int, List[int]], start: int) -> List[int]:
    """
    Perform iterative DFS traversal using a stack.

    Args:
        graph: Adjacency list representation of the graph
        start: Starting node for DFS

    Returns:
        List of nodes in DFS traversal order
    """
    if start not in graph:
        return []

    result = []
    visited: Set[int] = set()
    stack = [start]

    while stack:
        node = stack.pop()

        if node in visited:
            continue

        visited.add(node)
        result.append(node)

        # Add neighbors in reverse order to maintain left-to-right traversal
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)

    return result


def dfs_all_components(graph: Dict[int, List[int]]) -> List[List[int]]:
    """
    Perform DFS covering all connected components.

    Args:
        graph: Adjacency list representation of the graph

    Returns:
        List of DFS traversals, one for each connected component
    """
    if not graph:
        return []

    visited: Set[int] = set()
    components = []

    def dfs(node: int, component: List[int]):
        visited.add(node)
        component.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor, component)

    for node in graph:
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)

    return components


def has_path_dfs(graph: Dict[int, List[int]], source: int, target: int) -> bool:
    """
    Check if there's a path from source to target using DFS.

    Args:
        graph: Adjacency list representation of the graph
        source: Starting node
        target: Target node

    Returns:
        True if path exists, False otherwise
    """
    if source not in graph or target not in graph:
        return False

    if source == target:
        return True

    visited: Set[int] = set()
    stack = [source]

    while stack:
        node = stack.pop()

        if node == target:
            return True

        if node in visited:
            continue

        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

    return False


def find_path_dfs(graph: Dict[int, List[int]], source: int, target: int) -> List[int]:
    """
    Find a path from source to target using DFS.

    Args:
        graph: Adjacency list representation of the graph
        source: Starting node
        target: Target node

    Returns:
        List representing the path, empty if no path exists
    """
    if source not in graph or target not in graph:
        return []

    if source == target:
        return [source]

    visited: Set[int] = set()
    parent: Dict[int, int] = {}
    stack = [source]
    parent[source] = -1

    while stack:
        node = stack.pop()

        if node == target:
            # Reconstruct path
            path = []
            current = target
            while current != -1:
                path.append(current)
                current = parent[current]
            return path[::-1]

        if node in visited:
            continue

        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                parent[neighbor] = node
                stack.append(neighbor)

    return []


def run_tests():
    """Run test cases for DFS traversal."""
    print("=" * 60)
    print("DFS TRAVERSAL TESTS")
    print("=" * 60)

    # Test 1: Basic graph - recursive
    print("\nTest 1: Basic connected graph (recursive)")
    graph1 = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 5],
        3: [1],
        4: [1],
        5: [2]
    }
    result = dfs_recursive(graph1, 0)
    print(f"Graph: {graph1}")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert result == [0, 1, 3, 4, 2, 5], f"Expected [0, 1, 3, 4, 2, 5], got {result}"
    print("PASSED")

    # Test 2: Basic graph - iterative
    print("\nTest 2: Basic connected graph (iterative)")
    result = dfs_iterative(graph1, 0)
    print(f"Graph: {graph1}")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert result == [0, 1, 3, 4, 2, 5], f"Expected [0, 1, 3, 4, 2, 5], got {result}"
    print("PASSED")

    # Test 3: Linear graph
    print("\nTest 3: Linear graph")
    graph2 = {
        0: [1],
        1: [0, 2],
        2: [1, 3],
        3: [2]
    }
    result = dfs_recursive(graph2, 0)
    print(f"Graph: {graph2}")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert result == [0, 1, 2, 3], f"Expected [0, 1, 2, 3], got {result}"
    print("PASSED")

    # Test 4: Star graph
    print("\nTest 4: Star graph")
    graph3 = {
        0: [1, 2, 3],
        1: [0],
        2: [0],
        3: [0]
    }
    result = dfs_recursive(graph3, 0)
    print(f"Graph: {graph3}")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert result == [0, 1, 2, 3], f"Expected [0, 1, 2, 3], got {result}"
    print("PASSED")

    # Test 5: Disconnected graph - all components
    print("\nTest 5: Disconnected graph - all components")
    graph4 = {
        0: [1],
        1: [0],
        2: [3],
        3: [2],
        4: []
    }
    components = dfs_all_components(graph4)
    print(f"Graph: {graph4}")
    print(f"All Components: {components}")
    assert len(components) == 3, f"Expected 3 components, got {len(components)}"
    print("PASSED")

    # Test 6: Has path - exists
    print("\nTest 6: Has path - exists")
    graph5 = {
        0: [1, 2],
        1: [0, 3],
        2: [0],
        3: [1, 4],
        4: [3]
    }
    result = has_path_dfs(graph5, 0, 4)
    print(f"Graph: {graph5}")
    print(f"Path from 0 to 4 exists: {result}")
    assert result == True, f"Expected True, got {result}"
    print("PASSED")

    # Test 7: Has path - does not exist
    print("\nTest 7: Has path - does not exist")
    graph6 = {
        0: [1],
        1: [0],
        2: [3],
        3: [2]
    }
    result = has_path_dfs(graph6, 0, 3)
    print(f"Graph: {graph6}")
    print(f"Path from 0 to 3 exists: {result}")
    assert result == False, f"Expected False, got {result}"
    print("PASSED")

    # Test 8: Find path
    print("\nTest 8: Find path")
    path = find_path_dfs(graph5, 0, 4)
    print(f"Graph: {graph5}")
    print(f"Path from 0 to 4: {path}")
    assert path == [0, 1, 3, 4], f"Expected [0, 1, 3, 4], got {path}"
    print("PASSED")

    # Test 9: Single node
    print("\nTest 9: Single node graph")
    graph7 = {0: []}
    result = dfs_recursive(graph7, 0)
    print(f"Graph: {graph7}")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert result == [0], f"Expected [0], got {result}"
    print("PASSED")

    # Test 10: Cycle detection path
    print("\nTest 10: Cycle graph traversal")
    graph8 = {
        0: [1, 4],
        1: [0, 2],
        2: [1, 3],
        3: [2, 4],
        4: [3, 0]
    }
    result = dfs_recursive(graph8, 0)
    print(f"Graph: Pentagon cycle")
    print(f"Start: 0")
    print(f"DFS Order: {result}")
    assert len(result) == 5, f"Expected 5 nodes, got {len(result)}"
    print("PASSED")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
