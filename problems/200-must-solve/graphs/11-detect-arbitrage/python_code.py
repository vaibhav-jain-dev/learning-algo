"""
Detect Arbitrage - Python Solution

Detect if arbitrage opportunity exists in currency exchange rates.

Time Complexity: O(N^3) where N is the number of currencies
Space Complexity: O(N) for the distances array
"""

from typing import List
import math


def detect_arbitrage(exchange_rates: List[List[float]]) -> bool:
    """
    Detect if arbitrage opportunity exists using Bellman-Ford algorithm.

    Converts the problem to negative cycle detection:
    - Arbitrage exists if product of rates in cycle > 1
    - log(product) > 0 means sum of log(rates) > 0
    - Equivalent to sum of -log(rates) < 0 (negative cycle)

    Args:
        exchange_rates: NxN matrix where rates[i][j] is rate from currency i to j

    Returns:
        True if arbitrage opportunity exists, False otherwise
    """
    n = len(exchange_rates)
    if n == 0:
        return False

    # Convert rates to -log(rate) for negative cycle detection
    # Use any starting currency (0)
    distances = [float('inf')] * n
    distances[0] = 0

    # Relax all edges N-1 times
    for _ in range(n - 1):
        for source in range(n):
            for dest in range(n):
                if exchange_rates[source][dest] > 0:
                    weight = -math.log(exchange_rates[source][dest])
                    new_dist = distances[source] + weight
                    if new_dist < distances[dest]:
                        distances[dest] = new_dist

    # Check for negative cycle (one more relaxation)
    for source in range(n):
        for dest in range(n):
            if exchange_rates[source][dest] > 0:
                weight = -math.log(exchange_rates[source][dest])
                if distances[source] + weight < distances[dest]:
                    return True  # Negative cycle found = arbitrage exists

    return False


def detect_arbitrage_floyd_warshall(exchange_rates: List[List[float]]) -> bool:
    """
    Detect arbitrage using Floyd-Warshall variant.

    Instead of shortest paths, we track the maximum product achievable.

    Args:
        exchange_rates: NxN matrix where rates[i][j] is rate from currency i to j

    Returns:
        True if arbitrage opportunity exists, False otherwise
    """
    n = len(exchange_rates)
    if n == 0:
        return False

    # Create a copy to work with
    rates = [row[:] for row in exchange_rates]

    # Floyd-Warshall to find maximum product paths
    for k in range(n):
        for i in range(n):
            for j in range(n):
                # If going through k gives better rate
                if rates[i][k] * rates[k][j] > rates[i][j]:
                    rates[i][j] = rates[i][k] * rates[k][j]

    # Check diagonal - if any rates[i][i] > 1, arbitrage exists
    for i in range(n):
        if rates[i][i] > 1.0:
            return True

    return False


def detect_arbitrage_with_path(
    exchange_rates: List[List[float]]
) -> tuple[bool, List[int]]:
    """
    Detect arbitrage and return the cycle path if found.

    Args:
        exchange_rates: NxN matrix where rates[i][j] is rate from currency i to j

    Returns:
        Tuple of (arbitrage_exists, path_if_exists)
    """
    n = len(exchange_rates)
    if n == 0:
        return False, []

    distances = [float('inf')] * n
    predecessors = [-1] * n
    distances[0] = 0

    # Relax all edges N-1 times
    for _ in range(n - 1):
        for source in range(n):
            for dest in range(n):
                if exchange_rates[source][dest] > 0:
                    weight = -math.log(exchange_rates[source][dest])
                    if distances[source] + weight < distances[dest]:
                        distances[dest] = distances[source] + weight
                        predecessors[dest] = source

    # Find negative cycle
    cycle_node = -1
    for source in range(n):
        for dest in range(n):
            if exchange_rates[source][dest] > 0:
                weight = -math.log(exchange_rates[source][dest])
                if distances[source] + weight < distances[dest]:
                    cycle_node = dest
                    predecessors[dest] = source
                    break
        if cycle_node != -1:
            break

    if cycle_node == -1:
        return False, []

    # Reconstruct cycle
    # Go back n times to ensure we're in the cycle
    current = cycle_node
    for _ in range(n):
        current = predecessors[current]

    # Now trace the cycle
    cycle_start = current
    path = [current]
    current = predecessors[current]
    while current != cycle_start:
        path.append(current)
        current = predecessors[current]
    path.append(cycle_start)
    path.reverse()

    return True, path


def detect_arbitrage_direct(exchange_rates: List[List[float]]) -> bool:
    """
    Direct approach: Try all cycles starting from each currency.

    Less efficient but more intuitive.

    Args:
        exchange_rates: NxN matrix where rates[i][j] is rate from currency i to j

    Returns:
        True if arbitrage opportunity exists, False otherwise
    """
    n = len(exchange_rates)
    if n == 0:
        return False

    def dfs(start: int, current: int, product: float, visited: set, depth: int) -> bool:
        """DFS to find profitable cycle."""
        if depth > n:
            return False

        for next_currency in range(n):
            new_product = product * exchange_rates[current][next_currency]

            if next_currency == start and depth > 1:
                if new_product > 1.0:
                    return True

            if next_currency not in visited:
                visited.add(next_currency)
                if dfs(start, next_currency, new_product, visited, depth + 1):
                    return True
                visited.remove(next_currency)

        return False

    for start in range(n):
        if dfs(start, start, 1.0, {start}, 1):
            return True

    return False


# Test cases
if __name__ == "__main__":
    # Test 1: Example with arbitrage
    rates1 = [
        [1.0, 0.8631, 0.5903],
        [1.1586, 1.0, 0.6849],
        [1.6939, 1.46, 1.0]
    ]
    result1 = detect_arbitrage(rates1)
    print(f"Test 1 (Has arbitrage): {result1}")  # Expected: True
    assert result1 is True

    # Test 2: No arbitrage (consistent rates)
    rates2 = [
        [1.0, 0.5, 0.25],
        [2.0, 1.0, 0.5],
        [4.0, 2.0, 1.0]
    ]
    result2 = detect_arbitrage(rates2)
    print(f"Test 2 (No arbitrage): {result2}")  # Expected: False
    assert result2 is False

    # Test 3: Single currency
    rates3 = [[1.0]]
    result3 = detect_arbitrage(rates3)
    print(f"Test 3 (Single currency): {result3}")  # Expected: False
    assert result3 is False

    # Test 4: Two currencies with arbitrage
    rates4 = [
        [1.0, 2.0],
        [0.6, 1.0]  # 1 * 2.0 * 0.6 = 1.2 > 1
    ]
    result4 = detect_arbitrage(rates4)
    print(f"Test 4 (Two currencies with arbitrage): {result4}")  # Expected: True
    assert result4 is True

    # Test 5: Two currencies without arbitrage
    rates5 = [
        [1.0, 2.0],
        [0.5, 1.0]  # 1 * 2.0 * 0.5 = 1.0, no arbitrage
    ]
    result5 = detect_arbitrage(rates5)
    print(f"Test 5 (Two currencies, no arbitrage): {result5}")  # Expected: False
    assert result5 is False

    # Test Floyd-Warshall version
    print("\n--- Testing Floyd-Warshall Version ---")
    assert detect_arbitrage_floyd_warshall(rates1) is True
    assert detect_arbitrage_floyd_warshall(rates2) is False
    print("Floyd-Warshall tests passed!")

    # Test with path finding
    print("\n--- Testing Path Finding ---")
    has_arb, path = detect_arbitrage_with_path(rates1)
    print(f"Arbitrage found: {has_arb}, Path: {path}")
    assert has_arb is True
    assert len(path) >= 2

    # Verify the path gives profit
    if path:
        product = 1.0
        for i in range(len(path) - 1):
            product *= rates1[path[i]][path[i + 1]]
        print(f"Path product: {product}")

    print("\nAll tests passed!")
