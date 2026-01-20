"""
Min Cost to Connect Points (Prim's Approach) - Python Solution

Time Complexity: O(n^2) using dense graph approach
Space Complexity: O(n)
"""

from typing import List


def min_cost_connect_points(points: List[List[int]]) -> int:
    """
    Find minimum cost to connect all points using Prim's algorithm.
    Uses O(n^2) approach since graph is dense.
    """
    n = len(points)
    if n <= 1:
        return 0

    INF = float('inf')

    # Track vertices in MST and minimum edge to connect each vertex
    in_mst = [False] * n
    min_cost = [INF] * n
    min_cost[0] = 0

    total_cost = 0

    for _ in range(n):
        # Find vertex with minimum cost not in MST
        min_val = INF
        u = -1
        for i in range(n):
            if not in_mst[i] and min_cost[i] < min_val:
                min_val = min_cost[i]
                u = i

        if u == -1:
            break

        in_mst[u] = True
        total_cost += min_cost[u]

        # Update costs of adjacent vertices
        for v in range(n):
            if not in_mst[v]:
                dist = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                min_cost[v] = min(min_cost[v], dist)

    return total_cost


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {min_cost_connect_points([[0,0],[2,2],[3,10],[5,2],[7,0]])}")  # Expected: 20
    print(f"Test 2: {min_cost_connect_points([[3,12],[-2,5],[-4,1]])}")  # Expected: 18
    print(f"Test 3: {min_cost_connect_points([[0,0]])}")  # Expected: 0
    print("\nAll tests completed!")
