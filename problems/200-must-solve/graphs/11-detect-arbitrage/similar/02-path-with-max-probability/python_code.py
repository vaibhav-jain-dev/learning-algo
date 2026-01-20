"""
Path with Maximum Probability - Python Solution

Find path with maximum probability using modified Dijkstra.

Time Complexity: O(E log V)
Space Complexity: O(V + E)
"""

from typing import List
from collections import defaultdict
import heapq
import math


def max_probability(n: int, edges: List[List[int]], succProb: List[float],
                   start: int, end: int) -> float:
    """
    Find maximum probability path using modified Dijkstra.

    Args:
        n: Number of nodes
        edges: List of [a, b] edges
        succProb: Probability for each edge
        start: Starting node
        end: Target node

    Returns:
        Maximum probability to reach end from start
    """
    # Build undirected graph
    graph = defaultdict(list)
    for (a, b), prob in zip(edges, succProb):
        graph[a].append((b, prob))
        graph[b].append((a, prob))

    # Max-heap (use negative for max behavior with min-heap)
    max_prob = [0.0] * n
    max_prob[start] = 1.0
    pq = [(-1.0, start)]  # (negative_prob, node)

    while pq:
        neg_prob, node = heapq.heappop(pq)
        prob = -neg_prob

        if node == end:
            return prob

        if prob < max_prob[node]:
            continue

        for neighbor, edge_prob in graph[node]:
            new_prob = prob * edge_prob
            if new_prob > max_prob[neighbor]:
                max_prob[neighbor] = new_prob
                heapq.heappush(pq, (-new_prob, neighbor))

    return 0.0


def max_probability_log(n: int, edges: List[List[int]], succProb: List[float],
                       start: int, end: int) -> float:
    """
    Alternative: Use log transformation to convert to standard Dijkstra.

    log(p1 * p2) = log(p1) + log(p2)
    Maximize product = minimize negative log sum

    Args:
        n: Number of nodes
        edges: List of [a, b] edges
        succProb: Probability for each edge
        start: Starting node
        end: Target node

    Returns:
        Maximum probability
    """
    graph = defaultdict(list)
    for (a, b), prob in zip(edges, succProb):
        if prob > 0:
            log_prob = -math.log(prob)  # Negative log for minimization
            graph[a].append((b, log_prob))
            graph[b].append((a, log_prob))

    # Standard Dijkstra on -log(prob)
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, node = heapq.heappop(pq)

        if node == end:
            return math.exp(-d)

        if d > dist[node]:
            continue

        for neighbor, weight in graph[node]:
            new_dist = d + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))

    return 0.0


def max_probability_bellman_ford(n: int, edges: List[List[int]], succProb: List[float],
                                 start: int, end: int) -> float:
    """
    Bellman-Ford variant for maximum probability.

    Args:
        n: Number of nodes
        edges: List of [a, b] edges
        succProb: Probability for each edge
        start: Starting node
        end: Target node

    Returns:
        Maximum probability
    """
    prob = [0.0] * n
    prob[start] = 1.0

    for _ in range(n - 1):
        updated = False
        for (a, b), p in zip(edges, succProb):
            if prob[a] * p > prob[b]:
                prob[b] = prob[a] * p
                updated = True
            if prob[b] * p > prob[a]:
                prob[a] = prob[b] * p
                updated = True
        if not updated:
            break

    return prob[end]


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    edges1 = [[0, 1], [1, 2], [0, 2]]
    probs1 = [0.5, 0.5, 0.2]
    result1 = max_probability(3, edges1, probs1, 0, 2)
    print(f"Test 1: {result1}")
    assert abs(result1 - 0.25) < 1e-6, f"Expected 0.25, got {result1}"

    # Test 2: Direct path is better
    edges2 = [[0, 1], [1, 2], [0, 2]]
    probs2 = [0.5, 0.5, 0.3]
    result2 = max_probability(3, edges2, probs2, 0, 2)
    print(f"Test 2: {result2}")
    assert abs(result2 - 0.3) < 1e-6, f"Expected 0.3, got {result2}"

    # Test 3: No path
    edges3 = [[0, 1]]
    probs3 = [0.5]
    result3 = max_probability(3, edges3, probs3, 0, 2)
    print(f"Test 3: {result3}")
    assert result3 == 0.0, f"Expected 0.0, got {result3}"

    # Test 4: Log transformation
    result4 = max_probability_log(3, edges1, probs1, 0, 2)
    print(f"Test 4 (Log): {result4}")
    assert abs(result4 - 0.25) < 1e-6

    # Test 5: Bellman-Ford
    result5 = max_probability_bellman_ford(3, edges1, probs1, 0, 2)
    print(f"Test 5 (Bellman-Ford): {result5}")
    assert abs(result5 - 0.25) < 1e-6

    # Test 6: Same start and end should return 1.0 if checking
    result6 = max_probability(3, edges1, probs1, 0, 0)
    print(f"Test 6: {result6}")
    assert result6 == 1.0

    # Test 7: Longer path with higher probability
    edges7 = [[0, 1], [1, 2], [2, 3], [0, 3]]
    probs7 = [0.9, 0.9, 0.9, 0.5]
    result7 = max_probability(4, edges7, probs7, 0, 3)
    print(f"Test 7: {result7}")
    # 0->1->2->3: 0.9*0.9*0.9 = 0.729
    # 0->3: 0.5
    assert abs(result7 - 0.729) < 1e-6

    print("\nAll tests passed!")
