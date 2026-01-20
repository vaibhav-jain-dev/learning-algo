"""
Cheapest Flights Within K Stops - Python Solution

Time Complexity: O(E * K)
Space Complexity: O(N * K)
"""

import heapq
from typing import List
from collections import defaultdict


def find_cheapest_price(n: int, flights: List[List[int]], src: int,
                        dst: int, k: int) -> int:
    """
    Find cheapest flight path with at most k stops.
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in flights:
        graph[u].append((v, w))

    # Priority queue: (cost, node, stops_remaining)
    pq = [(0, src, k + 1)]
    # Track minimum stops to reach each node
    visited = {}  # node -> min stops remaining when visited

    while pq:
        cost, node, stops = heapq.heappop(pq)

        if node == dst:
            return cost

        if stops <= 0:
            continue

        # Skip if we've visited with more stops remaining
        if node in visited and visited[node] >= stops:
            continue
        visited[node] = stops

        for neighbor, price in graph[node]:
            heapq.heappush(pq, (cost + price, neighbor, stops - 1))

    return -1


def find_cheapest_price_bellman_ford(n: int, flights: List[List[int]],
                                     src: int, dst: int, k: int) -> int:
    """
    Alternative solution using Bellman-Ford variant.
    """
    INF = float('inf')
    prices = [INF] * n
    prices[src] = 0

    for _ in range(k + 1):
        temp = prices.copy()
        for u, v, w in flights:
            if prices[u] != INF and prices[u] + w < temp[v]:
                temp[v] = prices[u] + w
        prices = temp

    return prices[dst] if prices[dst] != INF else -1


# Test cases
if __name__ == "__main__":
    flights1 = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    print(f"Test 1: {find_cheapest_price(4, flights1, 0, 3, 1)}")  # Expected: 700
    print(f"Test 2: {find_cheapest_price(4, flights1, 0, 3, 2)}")  # Expected: 400
    print(f"Test 3: {find_cheapest_price_bellman_ford(4, flights1, 0, 3, 1)}")  # Expected: 700
    print("\nAll tests completed!")
