"""
A* Algorithm - Shortest Path with Heuristic - Python Solution

Find the shortest path between two nodes using the A* search algorithm.

Time Complexity: O(E log V)
Space Complexity: O(V)
"""

from typing import List, Tuple, Optional
import heapq


def a_star_grid(grid: List[List[int]], start: Tuple[int, int], end: Tuple[int, int]) -> int:
    """
    Find shortest path in a grid using A* algorithm.

    Args:
        grid: 2D grid where 0 is walkable and 1 is obstacle
        start: Starting position (row, col)
        end: Target position (row, col)

    Returns:
        Length of shortest path, or -1 if no path exists
    """
    if not grid or not grid[0]:
        return -1

    rows, cols = len(grid), len(grid[0])

    # Check if start or end is blocked
    if grid[start[0]][start[1]] == 1 or grid[end[0]][end[1]] == 1:
        return -1

    def heuristic(pos: Tuple[int, int]) -> int:
        """Manhattan distance heuristic"""
        return abs(pos[0] - end[0]) + abs(pos[1] - end[1])

    def get_neighbors(pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        """Get valid neighboring positions"""
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        neighbors = []
        for dr, dc in directions:
            nr, nc = pos[0] + dr, pos[1] + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                neighbors.append((nr, nc))
        return neighbors

    # Priority queue: (f_score, g_score, position)
    # Include g_score for tie-breaking (prefer nodes closer to goal)
    open_set = [(heuristic(start), 0, start)]

    # Track g_scores (cost from start)
    g_scores = {start: 0}

    # Track visited nodes
    visited = set()

    while open_set:
        f_score, g_score, current = heapq.heappop(open_set)

        # Skip if already visited with better score
        if current in visited:
            continue

        visited.add(current)

        # Check if reached goal
        if current == end:
            return g_score

        for neighbor in get_neighbors(current):
            if neighbor in visited:
                continue

            tentative_g = g_score + 1  # Cost of 1 for each step

            # If this path to neighbor is better
            if neighbor not in g_scores or tentative_g < g_scores[neighbor]:
                g_scores[neighbor] = tentative_g
                f = tentative_g + heuristic(neighbor)
                heapq.heappush(open_set, (f, tentative_g, neighbor))

    return -1  # No path found


def a_star_with_path(grid: List[List[int]], start: Tuple[int, int], end: Tuple[int, int]) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Find shortest path and return the actual path.

    Args:
        grid: 2D grid where 0 is walkable and 1 is obstacle
        start: Starting position (row, col)
        end: Target position (row, col)

    Returns:
        Tuple of (path_length, path) or (-1, []) if no path
    """
    if not grid or not grid[0]:
        return -1, []

    rows, cols = len(grid), len(grid[0])

    if grid[start[0]][start[1]] == 1 or grid[end[0]][end[1]] == 1:
        return -1, []

    def heuristic(pos: Tuple[int, int]) -> int:
        return abs(pos[0] - end[0]) + abs(pos[1] - end[1])

    def get_neighbors(pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        neighbors = []
        for dr, dc in directions:
            nr, nc = pos[0] + dr, pos[1] + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                neighbors.append((nr, nc))
        return neighbors

    open_set = [(heuristic(start), 0, start)]
    g_scores = {start: 0}
    came_from = {}
    visited = set()

    while open_set:
        f_score, g_score, current = heapq.heappop(open_set)

        if current in visited:
            continue

        visited.add(current)

        if current == end:
            # Reconstruct path
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            path.reverse()
            return g_score, path

        for neighbor in get_neighbors(current):
            if neighbor in visited:
                continue

            tentative_g = g_score + 1

            if neighbor not in g_scores or tentative_g < g_scores[neighbor]:
                g_scores[neighbor] = tentative_g
                came_from[neighbor] = current
                f = tentative_g + heuristic(neighbor)
                heapq.heappush(open_set, (f, tentative_g, neighbor))

    return -1, []


def a_star_weighted_graph(graph: dict, start: str, end: str, heuristic: dict) -> Tuple[int, List[str]]:
    """
    A* on a weighted graph with explicit heuristic values.

    Args:
        graph: Adjacency dict {node: [(neighbor, weight), ...]}
        start: Starting node
        end: Target node
        heuristic: Dict of heuristic values {node: h_value}

    Returns:
        Tuple of (path_cost, path) or (-1, []) if no path
    """
    open_set = [(heuristic.get(start, 0), 0, start)]
    g_scores = {start: 0}
    came_from = {}
    visited = set()

    while open_set:
        f_score, g_score, current = heapq.heappop(open_set)

        if current in visited:
            continue

        visited.add(current)

        if current == end:
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            path.reverse()
            return g_score, path

        for neighbor, weight in graph.get(current, []):
            if neighbor in visited:
                continue

            tentative_g = g_score + weight

            if neighbor not in g_scores or tentative_g < g_scores[neighbor]:
                g_scores[neighbor] = tentative_g
                came_from[neighbor] = current
                f = tentative_g + heuristic.get(neighbor, 0)
                heapq.heappush(open_set, (f, tentative_g, neighbor))

    return -1, []


# Test cases
if __name__ == "__main__":
    # Test 1: Basic grid pathfinding
    grid1 = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0]
    ]
    result1 = a_star_grid(grid1, (0, 0), (3, 3))
    print(f"Test 1: {result1}")
    assert result1 == 6, f"Expected 6, got {result1}"

    # Test 1b: With path
    length1, path1 = a_star_with_path(grid1, (0, 0), (3, 3))
    print(f"Test 1b: Length={length1}, Path={path1}")
    assert length1 == 6

    # Test 2: No path exists
    grid2 = [[0, 1], [1, 0]]
    result2 = a_star_grid(grid2, (0, 0), (1, 1))
    print(f"Test 2: {result2}")
    assert result2 == -1, f"Expected -1, got {result2}"

    # Test 3: Simple path
    grid3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    result3 = a_star_grid(grid3, (0, 0), (2, 2))
    print(f"Test 3: {result3}")
    assert result3 == 4, f"Expected 4, got {result3}"

    # Test 4: Start equals end
    result4 = a_star_grid(grid3, (0, 0), (0, 0))
    print(f"Test 4: {result4}")
    assert result4 == 0, f"Expected 0, got {result4}"

    # Test 5: Weighted graph
    graph = {
        'A': [('B', 1), ('C', 4)],
        'B': [('C', 2), ('D', 5)],
        'C': [('D', 1)],
        'D': []
    }
    heuristic_values = {'A': 7, 'B': 6, 'C': 2, 'D': 0}
    cost5, path5 = a_star_weighted_graph(graph, 'A', 'D', heuristic_values)
    print(f"Test 5: Cost={cost5}, Path={path5}")
    assert cost5 == 4, f"Expected 4, got {cost5}"
    assert path5 == ['A', 'B', 'C', 'D']

    # Test 6: Large grid
    grid6 = [[0] * 10 for _ in range(10)]
    result6 = a_star_grid(grid6, (0, 0), (9, 9))
    print(f"Test 6: {result6}")
    assert result6 == 18, f"Expected 18, got {result6}"

    print("\nAll tests passed!")
