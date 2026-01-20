"""
Network Delay Time - Python Solution

Time Complexity: O((V + E) log V)
Space Complexity: O(V + E)
"""

import heapq
from typing import List
from collections import defaultdict


def network_delay_time(times: List[List[int]], n: int, k: int) -> int:
    """
    Find minimum time for all nodes to receive signal from node k.
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    # Dijkstra's algorithm
    dist = {k: 0}
    pq = [(0, k)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist.get(u, float('inf')):
            continue

        for v, w in graph[u]:
            new_dist = dist[u] + w
            if new_dist < dist.get(v, float('inf')):
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    # Check if all nodes are reachable
    if len(dist) != n:
        return -1

    return max(dist.values())


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {network_delay_time([[2,1,1],[2,3,1],[3,4,1]], 4, 2)}")  # Expected: 2
    print(f"Test 2: {network_delay_time([[1,2,1]], 2, 1)}")  # Expected: 1
    print(f"Test 3: {network_delay_time([[1,2,1]], 2, 2)}")  # Expected: -1
    print("\nAll tests completed!")
