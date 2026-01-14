"""
Cheapest Flights Within K Stops
Combines: Graph Traversal + Dynamic Programming (Bellman-Ford)
"""

from collections import defaultdict, deque
import heapq
from typing import List

def findCheapestPrice_bellman_ford(n: int, flights: List[List[int]],
                                    src: int, dst: int, k: int) -> int:
    """
    Modified Bellman-Ford: DP approach
    dp[i] = minimum cost to reach node i
    Run k+1 iterations (k stops = k+1 edges)
    """
    INF = float('inf')

    # Current minimum costs
    prices = [INF] * n
    prices[src] = 0

    # Perform k+1 relaxation rounds
    for _ in range(k + 1):
        # Use a copy to avoid using updated values in same iteration
        temp = prices.copy()

        for u, v, cost in flights:
            if prices[u] != INF and prices[u] + cost < temp[v]:
                temp[v] = prices[u] + cost

        prices = temp

    return prices[dst] if prices[dst] != INF else -1


def findCheapestPrice_bfs(n: int, flights: List[List[int]],
                          src: int, dst: int, k: int) -> int:
    """
    BFS with level-by-level processing
    Track minimum cost to reach each node at each level
    """
    INF = float('inf')

    # Build adjacency list
    graph = defaultdict(list)
    for u, v, cost in flights:
        graph[u].append((v, cost))

    # dist[node] = minimum cost to reach node
    dist = [INF] * n
    dist[src] = 0

    # BFS queue: (node, cost)
    queue = deque([(src, 0)])
    stops = 0

    while queue and stops <= k:
        # Process all nodes at current level
        level_size = len(queue)

        for _ in range(level_size):
            node, cost = queue.popleft()

            for neighbor, price in graph[node]:
                new_cost = cost + price

                # Only process if we found a cheaper path
                if new_cost < dist[neighbor]:
                    dist[neighbor] = new_cost
                    queue.append((neighbor, new_cost))

        stops += 1

    return dist[dst] if dist[dst] != INF else -1


def findCheapestPrice_dijkstra(n: int, flights: List[List[int]],
                                src: int, dst: int, k: int) -> int:
    """
    Modified Dijkstra with state (cost, node, stops_used)
    Key insight: We may revisit a node if we can reach it with fewer stops
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, cost in flights:
        graph[u].append((v, cost))

    # min_stops[node] = minimum stops used to reach this node
    # We only need to explore a state if we're using fewer stops
    min_stops = [float('inf')] * n

    # Priority queue: (cost, node, stops_used)
    pq = [(0, src, 0)]

    while pq:
        cost, node, stops = heapq.heappop(pq)

        if node == dst:
            return cost

        # Skip if we've reached this node with fewer stops before
        if stops > min_stops[node] or stops > k:
            continue

        min_stops[node] = stops

        for neighbor, price in graph[node]:
            heapq.heappush(pq, (cost + price, neighbor, stops + 1))

    return -1


def findCheapestPrice_dp_2d(n: int, flights: List[List[int]],
                            src: int, dst: int, k: int) -> int:
    """
    2D DP: dp[i][j] = min cost to reach node j using exactly i flights
    Answer = min(dp[1][dst], dp[2][dst], ..., dp[k+1][dst])
    """
    INF = float('inf')

    # dp[flights_used][node] = minimum cost
    dp = [[INF] * n for _ in range(k + 2)]
    dp[0][src] = 0

    for flights_used in range(1, k + 2):
        # Carry forward previous values (can reach with fewer flights)
        for node in range(n):
            dp[flights_used][node] = dp[flights_used - 1][node]

        # Try each flight
        for u, v, cost in flights:
            if dp[flights_used - 1][u] != INF:
                dp[flights_used][v] = min(
                    dp[flights_used][v],
                    dp[flights_used - 1][u] + cost
                )

    return dp[k + 1][dst] if dp[k + 1][dst] != INF else -1


def visualize_solution(n: int, flights: List[List[int]],
                       src: int, dst: int, k: int):
    """
    Visualize the Bellman-Ford DP approach step by step
    """
    INF = float('inf')

    print(f"\n{'='*60}")
    print(f"Finding cheapest flight: {src} -> {dst} with at most {k} stops")
    print(f"Flights: {flights}")
    print(f"{'='*60}\n")

    prices = [INF] * n
    prices[src] = 0

    print(f"Initial costs: {['INF' if x == INF else x for x in prices]}")

    for i in range(k + 1):
        temp = prices.copy()
        changes = []

        for u, v, cost in flights:
            if prices[u] != INF and prices[u] + cost < temp[v]:
                old = temp[v]
                temp[v] = prices[u] + cost
                changes.append(f"  {u} -> {v}: cost {prices[u]} + {cost} = {temp[v]}")

        prices = temp

        print(f"\nIteration {i + 1} (max {i + 1} flight{'s' if i > 0 else ''}):")
        if changes:
            for c in changes:
                print(c)
        else:
            print("  No improvements")
        print(f"  Costs: {['INF' if x == INF else x for x in prices]}")

    result = prices[dst] if prices[dst] != INF else -1
    print(f"\n{'='*60}")
    print(f"Result: {result}")
    print(f"{'='*60}")

    return result


# Test cases
if __name__ == "__main__":
    test_cases = [
        # (n, flights, src, dst, k, expected)
        (4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1, 700),
        (3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1, 200),
        (3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0, 500),
        (5, [[0,1,5],[1,2,5],[0,3,2],[3,1,2],[1,4,1],[4,2,1]], 0, 2, 2, 7),
        (4, [[0,1,1],[0,2,5],[1,2,1],[2,3,1]], 0, 3, 1, 6),
        (3, [[0,1,100],[1,2,100]], 0, 2, 0, -1),  # No direct flight
    ]

    print("Cheapest Flights Within K Stops")
    print("=" * 60)

    # Run tests for all approaches
    for i, (n, flights, src, dst, k, expected) in enumerate(test_cases):
        print(f"\nTest {i + 1}: n={n}, src={src}, dst={dst}, k={k}")

        result1 = findCheapestPrice_bellman_ford(n, flights, src, dst, k)
        result2 = findCheapestPrice_bfs(n, flights, src, dst, k)
        result3 = findCheapestPrice_dijkstra(n, flights, src, dst, k)
        result4 = findCheapestPrice_dp_2d(n, flights, src, dst, k)

        status1 = "PASS" if result1 == expected else "FAIL"
        status2 = "PASS" if result2 == expected else "FAIL"
        status3 = "PASS" if result3 == expected else "FAIL"
        status4 = "PASS" if result4 == expected else "FAIL"

        print(f"  Bellman-Ford: {result1} [{status1}]")
        print(f"  BFS:          {result2} [{status2}]")
        print(f"  Dijkstra:     {result3} [{status3}]")
        print(f"  2D DP:        {result4} [{status4}]")

    # Detailed visualization for first example
    visualize_solution(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)
