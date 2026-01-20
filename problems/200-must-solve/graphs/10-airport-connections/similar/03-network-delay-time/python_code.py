"""
Network Delay Time - Python Solution

Find minimum time for signal to reach all nodes using Dijkstra's algorithm.

Time Complexity: O(E log V)
Space Complexity: O(V + E)
"""

from typing import List
from collections import defaultdict
import heapq


def network_delay_time(times: List[List[int]], n: int, k: int) -> int:
    """
    Find minimum time for signal to reach all nodes.

    Args:
        times: List of [source, target, time] edges
        n: Number of nodes (1 to n)
        k: Starting node

    Returns:
        Minimum time for all nodes to receive signal, or -1
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    # Dijkstra's algorithm
    dist = {k: 0}
    pq = [(0, k)]  # (distance, node)

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist.get(u, float('inf')):
            continue

        for v, w in graph[u]:
            new_dist = d + w
            if new_dist < dist.get(v, float('inf')):
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    # Check if all nodes reachable
    if len(dist) < n:
        return -1

    return max(dist.values())


def network_delay_time_bellman_ford(times: List[List[int]], n: int, k: int) -> int:
    """
    Alternative: Bellman-Ford algorithm (handles negative edges).

    Args:
        times: List of [source, target, time] edges
        n: Number of nodes
        k: Starting node

    Returns:
        Minimum time for all nodes to receive signal, or -1
    """
    dist = [float('inf')] * (n + 1)
    dist[k] = 0

    # Relax all edges n-1 times
    for _ in range(n - 1):
        updated = False
        for u, v, w in times:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break

    # Find max distance (excluding index 0)
    max_dist = max(dist[1:])

    return max_dist if max_dist != float('inf') else -1


def network_delay_time_with_path(times: List[List[int]], n: int, k: int) -> tuple:
    """
    Find delay time and the path to the furthest node.

    Args:
        times: List of [source, target, time] edges
        n: Number of nodes
        k: Starting node

    Returns:
        Tuple of (delay_time, furthest_node, path_to_furthest)
    """
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    dist = {k: 0}
    parent = {k: None}
    pq = [(0, k)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist.get(u, float('inf')):
            continue

        for v, w in graph[u]:
            new_dist = d + w
            if new_dist < dist.get(v, float('inf')):
                dist[v] = new_dist
                parent[v] = u
                heapq.heappush(pq, (new_dist, v))

    if len(dist) < n:
        return -1, -1, []

    # Find furthest node
    furthest = max(dist.keys(), key=lambda x: dist[x])

    # Reconstruct path
    path = []
    node = furthest
    while node is not None:
        path.append(node)
        node = parent.get(node)
    path.reverse()

    return dist[furthest], furthest, path


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    times1 = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]
    result1 = network_delay_time(times1, 4, 2)
    print(f"Test 1: {result1}")
    assert result1 == 2, f"Expected 2, got {result1}"

    # Test 2: Simple two nodes
    times2 = [[1, 2, 1]]
    result2 = network_delay_time(times2, 2, 1)
    print(f"Test 2: {result2}")
    assert result2 == 1, f"Expected 1, got {result2}"

    # Test 3: Unreachable node
    times3 = [[1, 2, 1]]
    result3 = network_delay_time(times3, 2, 2)
    print(f"Test 3: {result3}")
    assert result3 == -1, f"Expected -1, got {result3}"

    # Test 4: Bellman-Ford
    result4 = network_delay_time_bellman_ford(times1, 4, 2)
    print(f"Test 4 (Bellman-Ford): {result4}")
    assert result4 == 2

    # Test 5: With path
    delay, furthest, path = network_delay_time_with_path(times1, 4, 2)
    print(f"Test 5: Delay={delay}, Furthest={furthest}, Path={path}")
    assert delay == 2
    assert furthest == 4

    # Test 6: Single node
    result6 = network_delay_time([], 1, 1)
    print(f"Test 6: {result6}")
    assert result6 == 0, f"Expected 0, got {result6}"

    # Test 7: Multiple paths
    times7 = [[1, 2, 1], [1, 3, 4], [2, 3, 2]]
    result7 = network_delay_time(times7, 3, 1)
    print(f"Test 7: {result7}")
    assert result7 == 3, f"Expected 3, got {result7}"  # 1->2->3 is faster than 1->3

    print("\nAll tests passed!")
