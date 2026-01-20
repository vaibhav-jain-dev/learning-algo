"""
Cheapest Flights Within K Stops - Python Solution

Find cheapest flight with at most K stops using modified Bellman-Ford.

Time Complexity: O(K * E)
Space Complexity: O(V)
"""

from typing import List
from collections import defaultdict, deque
import heapq


def find_cheapest_price(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    """
    Find cheapest price with at most k stops using Bellman-Ford.

    Args:
        n: Number of cities
        flights: List of [from, to, price]
        src: Source city
        dst: Destination city
        k: Maximum number of stops

    Returns:
        Cheapest price or -1 if no route
    """
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0

    # k stops means k+1 edges
    for _ in range(k + 1):
        # Copy to prevent using multiple edges in one iteration
        prev_dist = dist.copy()

        for u, v, price in flights:
            if prev_dist[u] != INF:
                dist[v] = min(dist[v], prev_dist[u] + price)

    return dist[dst] if dist[dst] != INF else -1


def find_cheapest_price_dijkstra(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    """
    Alternative: Modified Dijkstra with stops tracking.

    Args:
        n: Number of cities
        flights: List of [from, to, price]
        src: Source city
        dst: Destination city
        k: Maximum stops

    Returns:
        Cheapest price or -1
    """
    graph = defaultdict(list)
    for u, v, price in flights:
        graph[u].append((v, price))

    # Priority queue: (cost, node, stops)
    pq = [(0, src, 0)]

    # Track minimum stops to reach each node
    visited = {}  # node -> min_stops

    while pq:
        cost, node, stops = heapq.heappop(pq)

        if node == dst:
            return cost

        if stops > k:
            continue

        # Skip if we've visited this node with fewer stops
        if node in visited and visited[node] <= stops:
            continue
        visited[node] = stops

        for neighbor, price in graph[node]:
            heapq.heappush(pq, (cost + price, neighbor, stops + 1))

    return -1


def find_cheapest_price_bfs(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    """
    BFS approach with level-by-level traversal.

    Args:
        n: Number of cities
        flights: List of [from, to, price]
        src: Source city
        dst: Destination city
        k: Maximum stops

    Returns:
        Cheapest price or -1
    """
    graph = defaultdict(list)
    for u, v, price in flights:
        graph[u].append((v, price))

    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0

    queue = deque([(src, 0)])  # (node, current_cost)
    stops = 0

    while queue and stops <= k:
        for _ in range(len(queue)):
            node, cost = queue.popleft()

            for neighbor, price in graph[node]:
                new_cost = cost + price
                if new_cost < dist[neighbor]:
                    dist[neighbor] = new_cost
                    queue.append((neighbor, new_cost))

        stops += 1

    return dist[dst] if dist[dst] != INF else -1


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    flights1 = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]
    result1 = find_cheapest_price(4, flights1, 0, 3, 1)
    print(f"Test 1: {result1}")
    assert result1 == 700, f"Expected 700, got {result1}"

    # Test 2: Shorter path with more stops
    flights2 = [[0, 1, 100], [1, 2, 100], [0, 2, 500]]
    result2 = find_cheapest_price(3, flights2, 0, 2, 1)
    print(f"Test 2: {result2}")
    assert result2 == 200, f"Expected 200, got {result2}"

    # Test 3: Direct flight only
    result3 = find_cheapest_price(3, flights2, 0, 2, 0)
    print(f"Test 3: {result3}")
    assert result3 == 500, f"Expected 500, got {result3}"

    # Test 4: No route
    flights4 = [[0, 1, 100]]
    result4 = find_cheapest_price(3, flights4, 0, 2, 1)
    print(f"Test 4: {result4}")
    assert result4 == -1, f"Expected -1, got {result4}"

    # Test 5: Dijkstra approach
    result5 = find_cheapest_price_dijkstra(4, flights1, 0, 3, 1)
    print(f"Test 5 (Dijkstra): {result5}")
    assert result5 == 700

    # Test 6: BFS approach
    result6 = find_cheapest_price_bfs(4, flights1, 0, 3, 1)
    print(f"Test 6 (BFS): {result6}")
    assert result6 == 700

    # Test 7: Longer k allows cheaper path
    result7 = find_cheapest_price(4, flights1, 0, 3, 2)
    print(f"Test 7 (k=2): {result7}")
    assert result7 == 400, f"Expected 400, got {result7}"  # 0->1->2->3

    print("\nAll tests passed!")
