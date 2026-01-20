"""
Negative Cycle Detection - Python Solution

Detect negative weight cycles using Bellman-Ford algorithm.

Time Complexity: O(V * E)
Space Complexity: O(V)
"""

from typing import List, Tuple, Optional
from collections import defaultdict


def has_negative_cycle(n: int, edges: List[List[int]]) -> bool:
    """
    Detect if graph contains a negative cycle using Bellman-Ford.

    Args:
        n: Number of vertices
        edges: List of [from, to, weight]

    Returns:
        True if negative cycle exists
    """
    # Initialize all distances to 0 to detect cycles from any node
    dist = [0] * n

    # Relax all edges n-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycle: if any edge can still be relaxed
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return True

    return False


def has_negative_cycle_from_source(n: int, edges: List[List[int]], src: int) -> bool:
    """
    Detect negative cycle reachable from a specific source.

    Args:
        n: Number of vertices
        edges: List of [from, to, weight]
        src: Source vertex

    Returns:
        True if negative cycle is reachable from source
    """
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0

    # Relax all edges n-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return True

    return False


def find_negative_cycle(n: int, edges: List[List[int]]) -> Optional[List[int]]:
    """
    Find and return the nodes in a negative cycle.

    Args:
        n: Number of vertices
        edges: List of [from, to, weight]

    Returns:
        List of nodes in cycle, or None if no negative cycle
    """
    dist = [0] * n
    parent = [-1] * n

    # Relax all edges n times
    x = -1
    for _ in range(n):
        x = -1
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                x = v

    if x == -1:
        return None

    # x might not be in cycle, but is reachable from cycle
    # Go back n times to ensure we're in the cycle
    for _ in range(n):
        x = parent[x]

    # Collect cycle nodes
    cycle = [x]
    current = parent[x]
    while current != x:
        cycle.append(current)
        current = parent[current]
    cycle.append(x)  # Complete the cycle
    cycle.reverse()

    return cycle


def detect_arbitrage(exchange_rates: List[List[float]]) -> bool:
    """
    Detect arbitrage opportunity in currency exchange rates.

    Args:
        exchange_rates: Matrix where rates[i][j] is rate from currency i to j

    Returns:
        True if arbitrage opportunity exists
    """
    import math

    n = len(exchange_rates)

    # Convert to negative log (multiplication becomes addition)
    # Arbitrage: product > 1, i.e., -sum(log) < 0
    edges = []
    for i in range(n):
        for j in range(n):
            if i != j and exchange_rates[i][j] > 0:
                weight = -math.log(exchange_rates[i][j])
                edges.append([i, j, weight])

    # Detect negative cycle (which means arbitrage)
    return has_negative_cycle(n, edges)


# Test cases
if __name__ == "__main__":
    # Test 1: Has negative cycle
    edges1 = [[0, 1, 1], [1, 2, 2], [2, 3, -5], [3, 1, 1]]
    result1 = has_negative_cycle(4, edges1)
    print(f"Test 1: {result1}")
    assert result1 == True, f"Expected True, got {result1}"

    # Test 2: No negative cycle
    edges2 = [[0, 1, 1], [1, 2, 2], [2, 0, 3]]
    result2 = has_negative_cycle(3, edges2)
    print(f"Test 2: {result2}")
    assert result2 == False, f"Expected False, got {result2}"

    # Test 3: Simple negative cycle
    edges3 = [[0, 1, -1], [1, 0, -1]]
    result3 = has_negative_cycle(2, edges3)
    print(f"Test 3: {result3}")
    assert result3 == True, f"Expected True, got {result3}"

    # Test 4: From specific source
    result4 = has_negative_cycle_from_source(4, edges1, 0)
    print(f"Test 4 (from source): {result4}")
    assert result4 == True

    # Test 5: Find actual cycle
    cycle = find_negative_cycle(4, edges1)
    print(f"Test 5: Cycle found = {cycle}")
    assert cycle is not None

    # Test 6: No cycle - verify find returns None
    cycle6 = find_negative_cycle(3, edges2)
    print(f"Test 6: Cycle found = {cycle6}")
    assert cycle6 is None

    # Test 7: Arbitrage detection
    # Exchange rates where USD->EUR->GBP->USD > 1
    rates = [
        [1.0, 0.9, 0.75],   # From USD
        [1.12, 1.0, 0.84],  # From EUR
        [1.35, 1.2, 1.0]    # From GBP
    ]
    # USD -> EUR -> GBP -> USD = 0.9 * 0.84 * 1.35 = 1.0206 > 1 (arbitrage!)
    result7 = detect_arbitrage(rates)
    print(f"Test 7 (Arbitrage): {result7}")

    # Test 8: Empty graph
    result8 = has_negative_cycle(3, [])
    print(f"Test 8 (Empty): {result8}")
    assert result8 == False

    # Test 9: Single negative edge (no cycle)
    edges9 = [[0, 1, -5]]
    result9 = has_negative_cycle(2, edges9)
    print(f"Test 9: {result9}")
    assert result9 == False

    print("\nAll tests passed!")
