"""
0/1 Knapsack Problem - Python Solution

Find the maximum value that can fit in a knapsack with limited capacity.
Each item can only be selected once.

Time Complexity: O(n * capacity)
Space Complexity: O(n * capacity)
"""

from typing import List, Tuple


def knapsack(items: List[List[int]], capacity: int) -> Tuple[int, List[int]]:
    """
    Solve 0/1 knapsack problem using bottom-up DP.

    Args:
        items: List of [value, weight] pairs
        capacity: Maximum weight capacity

    Returns:
        Tuple of (max_value, list_of_indices)
    """
    if not items or capacity <= 0:
        return (0, [])

    n = len(items)

    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Fill the DP table
    for i in range(1, n + 1):
        value, weight = items[i - 1]

        for w in range(capacity + 1):
            # Don't include current item
            dp[i][w] = dp[i - 1][w]

            # Include current item if it fits
            if weight <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weight] + value)

    # Backtrack to find selected items
    indices = []
    w = capacity

    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            # Item i-1 was included
            indices.append(i - 1)
            w -= items[i - 1][1]  # Subtract weight

    indices.reverse()

    return (dp[n][capacity], indices)


def knapsack_optimized(items: List[List[int]], capacity: int) -> int:
    """
    Space-optimized version (returns only max value).

    Args:
        items: List of [value, weight] pairs
        capacity: Maximum weight capacity

    Returns:
        Maximum value achievable
    """
    if not items or capacity <= 0:
        return 0

    # Only need one row, process from right to left
    dp = [0] * (capacity + 1)

    for value, weight in items:
        # Process from right to left to avoid using same item twice
        for w in range(capacity, weight - 1, -1):
            dp[w] = max(dp[w], dp[w - weight] + value)

    return dp[capacity]


def knapsack_recursive(items: List[List[int]], capacity: int) -> Tuple[int, List[int]]:
    """
    Top-down recursive approach with memoization.

    Args:
        items: List of [value, weight] pairs
        capacity: Maximum weight capacity

    Returns:
        Tuple of (max_value, list_of_indices)
    """
    if not items or capacity <= 0:
        return (0, [])

    n = len(items)
    memo = {}

    def dp(i: int, w: int) -> int:
        """Returns max value using items[i:] with remaining capacity w."""
        if i >= n or w <= 0:
            return 0

        if (i, w) in memo:
            return memo[(i, w)]

        value, weight = items[i]

        # Don't include current item
        result = dp(i + 1, w)

        # Include current item if it fits
        if weight <= w:
            result = max(result, value + dp(i + 1, w - weight))

        memo[(i, w)] = result
        return result

    max_value = dp(0, capacity)

    # Reconstruct solution
    indices = []
    w = capacity

    for i in range(n):
        if (i, w) not in memo:
            continue

        value, weight = items[i]

        # Check if this item was included
        without = memo.get((i + 1, w), 0)
        with_item = value + memo.get((i + 1, w - weight), 0) if weight <= w else 0

        if with_item > without:
            indices.append(i)
            w -= weight

    return (max_value, indices)


def knapsack_with_items_detail(items: List[List[int]], capacity: int) -> dict:
    """
    Returns detailed information about the solution.

    Args:
        items: List of [value, weight] pairs
        capacity: Maximum weight capacity

    Returns:
        Dictionary with solution details
    """
    max_value, indices = knapsack(items, capacity)

    selected_items = [items[i] for i in indices]
    total_weight = sum(item[1] for item in selected_items)
    total_value = sum(item[0] for item in selected_items)

    return {
        'max_value': max_value,
        'indices': indices,
        'selected_items': selected_items,
        'total_weight': total_weight,
        'remaining_capacity': capacity - total_weight
    }


def fractional_knapsack(items: List[List[int]], capacity: int) -> float:
    """
    Fractional knapsack (greedy) - items can be partially selected.
    Included for comparison with 0/1 knapsack.

    Args:
        items: List of [value, weight] pairs
        capacity: Maximum weight capacity

    Returns:
        Maximum value achievable (can be fractional)
    """
    if not items or capacity <= 0:
        return 0.0

    # Sort by value/weight ratio in descending order
    indexed_items = [(i, v, w, v / w if w > 0 else float('inf'))
                     for i, (v, w) in enumerate(items)]
    indexed_items.sort(key=lambda x: -x[3])

    total_value = 0.0
    remaining = capacity

    for _, value, weight, _ in indexed_items:
        if weight <= remaining:
            total_value += value
            remaining -= weight
        else:
            # Take fraction of this item
            total_value += value * (remaining / weight)
            break

    return total_value


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    items1 = [[60, 10], [100, 20], [120, 30]]
    capacity1 = 50
    result1 = knapsack(items1, capacity1)
    print(f"Test 1: items={items1}, capacity={capacity1}")
    print(f"  Result: max_value={result1[0]}, indices={result1[1]}")
    print(f"  Selected items: {[items1[i] for i in result1[1]]}")
    # Expected: 220, [1, 2]

    # Test 2: Another case
    items2 = [[10, 5], [40, 4], [30, 6], [50, 3]]
    capacity2 = 10
    result2 = knapsack(items2, capacity2)
    print(f"\nTest 2: items={items2}, capacity={capacity2}")
    print(f"  Result: max_value={result2[0]}, indices={result2[1]}")
    print(f"  Selected items: {[items2[i] for i in result2[1]]}")
    # Expected: 90, [1, 3]

    # Test 3: Item too heavy
    items3 = [[100, 50]]
    capacity3 = 10
    result3 = knapsack(items3, capacity3)
    print(f"\nTest 3: items={items3}, capacity={capacity3}")
    print(f"  Result: max_value={result3[0]}, indices={result3[1]}")
    # Expected: 0, []

    # Test 4: Empty items
    items4 = []
    capacity4 = 10
    result4 = knapsack(items4, capacity4)
    print(f"\nTest 4: items={items4}, capacity={capacity4}")
    print(f"  Result: max_value={result4[0]}, indices={result4[1]}")
    # Expected: 0, []

    # Test 5: All items fit
    items5 = [[10, 2], [20, 3], [30, 4]]
    capacity5 = 10
    result5 = knapsack(items5, capacity5)
    print(f"\nTest 5: items={items5}, capacity={capacity5}")
    print(f"  Result: max_value={result5[0]}, indices={result5[1]}")
    # Expected: 60, [0, 1, 2]

    # Test 6: Compare methods
    items6 = [[60, 10], [100, 20], [120, 30]]
    capacity6 = 50
    print(f"\nTest 6 - Method comparison for items={items6}, capacity={capacity6}:")
    print(f"  Bottom-up: {knapsack(items6, capacity6)}")
    print(f"  Optimized (value only): {knapsack_optimized(items6, capacity6)}")
    print(f"  Recursive: {knapsack_recursive(items6, capacity6)}")

    # Test 7: Detailed output
    items7 = [[60, 10], [100, 20], [120, 30]]
    capacity7 = 50
    detail = knapsack_with_items_detail(items7, capacity7)
    print(f"\nTest 7 - Detailed output:")
    for key, val in detail.items():
        print(f"  {key}: {val}")

    # Test 8: Compare with fractional knapsack
    items8 = [[60, 10], [100, 20], [120, 30]]
    capacity8 = 50
    print(f"\nTest 8 - 0/1 vs Fractional knapsack:")
    print(f"  0/1 Knapsack: {knapsack(items8, capacity8)[0]}")
    print(f"  Fractional: {fractional_knapsack(items8, capacity8)}")

    print("\nAll tests completed!")
